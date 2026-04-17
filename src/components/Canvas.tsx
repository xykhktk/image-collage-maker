"use client";
import { ASPECT_RATIOS } from "@/src/constants/canvasConfig"
import { useCanvasAction } from "@/src/hooks/useReduxAction"
import { useCanvasConfigData } from "@/src/hooks/useReduxData"
import { CustomImageObject } from "@/src/types"
import * as fabric from "fabric"
import { useEffect, useRef } from "react"
import toast from "react-hot-toast"
import { useAppSelector } from "@/src/redux/hooks"
import type { RootStateType } from "@/src/redux/store"
import { UploadIcon } from "./icons"
import { renderToStaticMarkup } from 'react-dom/server';
import { FabricObjectWithId } from "@/src/types/canvas";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  // Get necessary Redux data via hooks
  const { activeTemplateIndex, activeRatioIndex, activeTemplate } =
    useCanvasConfigData()

  const {
    addImageAction,
    clearSelectedImageAction,
    setCanvasAction,
    setSelectedImageAction,
  } = useCanvasAction()

  let imageWidth = useAppSelector((state: RootStateType) => state.canvas.imageWidth)
  let imageHeight = useAppSelector((state: RootStateType) => state.canvas.imageHeight)
  let imageBorderWidth = useAppSelector((state: RootStateType) => state.canvas.imageBorderWidth)

  // Canvas initialization
  useEffect(() => {
    if (canvasRef.current && wrapperRef.current) {
      // 0. Calculate canvas ratio by initial client width
      const panelWidth =
        wrapperRef.current.clientWidth > 1024
          ? 1024 // fixed 640px canvas on >640px devices
          : wrapperRef.current.clientWidth - 16 // 16px margin
      const ratio = ASPECT_RATIOS[activeRatioIndex].getCanvasSize(
        panelWidth,
        wrapperRef.current.clientHeight - 16,
      )

      // 1. Setup canvas
      const canvas = new fabric.Canvas(canvasRef.current, {
        backgroundColor: "#F8F8FF",
        // backgroundColor: "#a8c85F",
        // width: ratio.width,
        // height: ratio.height,
        width: imageWidth,
        height: imageHeight,
        selection: false,
        controlsAboveOverlay: false,
        allowTouchScrolling: true,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: "high",
      })

      // 1.1 Clone canvas
      setCanvasAction(canvas)

      // Helper function to add image to a specific cell
      const addImageToCell = async (file: File, selectedCell: fabric.Rect, cellIndex: number) => {
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async (e) => {
          const dataUrl = e.target?.result as string;
          const img = await fabric.Image.fromURL(dataUrl);
          const imgId = `img_${new Date().getTime()}`;

          // Remove the upload icon when an image is uploaded
          const existingUploadIcon = canvas.getObjects().find((obj: FabricObjectWithId) => obj.id === `upload_icon_${activeTemplateIndex}_${cellIndex}`);
          if (existingUploadIcon) {
            canvas.remove(existingUploadIcon);
          }

          img.set({
            id: imgId,
            left: selectedCell.left,
            top: selectedCell.top,
            selectable: true,
            hasControls: true,
            clipPath: selectedCell,
            perPixelTargetFind: true,
            imageSmoothing: true,
          }) as CustomImageObject;

          const config = activeTemplate.config[cellIndex]; // 获取对应cell的配置
          if (config.scaleTo === "width") {
            img.scaleToWidth(selectedCell.width + 1);
          } else if (config.scaleTo === "height") {
            img.scaleToHeight(selectedCell.height + 1);
          }

          addImageAction({
            id: imgId,
            filters: {
              brightness: 0,
              contrast: 0,
              noise: 0,
              saturation: 0,
              vibrance: 0,
              blur: 0,
            },
          });

          canvas.add(img);
          canvas.setActiveObject(img);
          canvas.renderAll();
          toast.success("Image successfully added.", {
            id: "toast-uploaded",
          });
        };
      };

      // 2. Setup objects & its properties
      activeTemplate.config.forEach((config, index) => {
        const PROPERTIES = config.rectFabric(imageHeight, imageWidth, imageBorderWidth)

        const cell = new fabric.Rect(PROPERTIES)

        // Generate SVG data URL for the UploadIcon
        const uploadIconSvg = encodeURIComponent(
          renderToStaticMarkup(<UploadIcon size={50} color="#cccccc" />)
        );
        const uploadIconDataUrl = `data:image/svg+xml;utf8,${uploadIconSvg}`;

        // Create a fabric.Image from the SVG data URL
        fabric.Image.fromURL(
          uploadIconDataUrl,
          {},
          {
            selectable: false,
            evented: false,
          }
        ).then((img: fabric.Image) => {
          // Scale the icon to fit within the cell if needed
          img.scaleToWidth(cell.width * 0.05);
          if (img.height > cell.height) {
            img.scaleToHeight(cell.height * 0.05);
          }
          // 将图片的原点设置为中心，这样left/top就是中心坐标
          img.set({ originX: 'center', originY: 'center', left: 0, top: 0 });

          // Create the text label
          const uploadText = new fabric.Text("Drop / Click\nto Choose Image", {
            fontSize: 16, // 调整字体大小
            fill: "#cccccc",
            textAlign: "center",
            originX: "center",
            originY: "center",
            left: 0, // 相对于 group 的中心
            top: img.getScaledHeight() / 2 + 20, // 文字在图标下方，+10是间距
            selectable: false,
            evented: false,
          });

          // Create a group for the icon and text
          const uploadGroup = new fabric.Group([img, uploadText], {
            left: cell.left! + cell.width! / 2, // group 相对于画布居中于 cell
            top: cell.top! + cell.height! / 2,
            originX: "center",
            originY: "center",
            selectable: false,
            evented: false,
            // id: `upload_icon_${activeTemplateIndex}_${index}`,
          });
          (uploadGroup as FabricObjectWithId).set({ id: `upload_icon_${activeTemplateIndex}_${index}` });

          canvas.add(cell);
          canvas.add(uploadGroup);
          canvas.renderAll();
        }).catch((error) => {
          console.error("Failed to load upload icon:", error);
        });


        // 3. Define image upload event handler (for click)
        const handleImageUploadOnClick = (selectedCell: fabric.Rect, cellIndex: number) => {
          const input = inputRef.current
          if (input) {
            input.onchange = async (event) => {
              const target = event.target as HTMLInputElement
              const file = target.files && target.files[0]
              if (!file) return

              await addImageToCell(file, selectedCell, cellIndex);

              input.value = ""; // Clear input after use
            }

            input.click()
          }
        }

        // 4. Attach event handler (for click)
        cell.on("mouseup", () => {
          handleImageUploadOnClick(cell, index)
        })

        // 5. Render cell (moved canvas.add(cell) inside the .then() block for better control)
        // canvas.add(cell) // 这一行现在会在上面的 then() 块中执行
      })

      // 6. Render all looped objects (initial render, icons will be added later)
      canvas.renderAll()

      // Drag and Drop Event Handlers
      const handleDragOver = (e: DragEvent) => {
        e.preventDefault(); // Prevent default to allow drop
        e.stopPropagation();
        if (e.dataTransfer) {
          e.dataTransfer.dropEffect = 'copy';
        }
      };

      const handleDrop = async (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          const file = e.dataTransfer.files[0];
          if (!file.type.startsWith('image/')) {
            toast.error("Only image files are allowed.", {
              id: "toast-invalid-file",
            });
            return;
          }

          // Determine which cell the file was dropped on
          const pointer = canvas.getPointer(e);
          const targetObject = canvas.findTarget(e as unknown as MouseEvent);

          let targetCell: fabric.Rect | undefined;
          let targetCellIndex: number | undefined;

          // If a specific object was targeted, check if it's a cell
          if (targetObject && targetObject.type === 'rect') {
            targetCell = targetObject as fabric.Rect;
            // Find the index of the targeted cell
            targetCellIndex = activeTemplate.config.findIndex(
              (config, i) =>
                targetCell?.left === config.rectFabric(imageHeight, imageWidth, imageBorderWidth).left &&
                targetCell?.top === config.rectFabric(imageHeight, imageWidth, imageBorderWidth).top
            );
          }

          // If no specific cell was targeted, or if the target was not a cell, find the first available cell
          if (!targetCell || targetCellIndex === undefined || targetCellIndex === -1) {
            for (let i = 0; i < activeTemplate.config.length; i++) {
              const currentCellConfig = activeTemplate.config[i];
              const rectProps = currentCellConfig.rectFabric(imageHeight, imageWidth, imageBorderWidth);
              const cellRect = new fabric.Rect(rectProps); // Create a temporary rect for hit testing

              // Check if the drop point is within this cell
              if (pointer && pointer.x >= cellRect.left! && pointer.x <= (cellRect.left! + cellRect.width!) &&
                pointer.y >= cellRect.top! && pointer.y <= (cellRect.top! + cellRect.height!)) {
                targetCell = canvas.getObjects().find(obj =>
                  obj.left === rectProps.left &&
                  obj.top === rectProps.top &&
                  obj.type === 'rect'
                ) as fabric.Rect | undefined;
                targetCellIndex = i;
                break;
              }
            }
          }

          // If a cell is identified, add the image
          if (targetCell && targetCellIndex !== undefined) {
            await addImageToCell(file, targetCell, targetCellIndex);
          } else {
            toast.error("Could not place image. Please click a cell or try again.", {
              id: "toast-drop-failed",
            });
          }
        }
      };

      // Attach Drag and Drop handlers
      const currentWrapper = wrapperRef.current;
      currentWrapper.addEventListener("dragover", handleDragOver);
      currentWrapper.addEventListener("drop", handleDrop);

      // 7. Attach event handler on object selection
      const handleImageSelect = (selected: CustomImageObject) => {
        // Set selected image
        setSelectedImageAction(selected.id)
      }

      canvas.on("selection:created", ({ selected }) => {
        handleImageSelect(selected[0] as CustomImageObject)
      })

      canvas.on("selection:updated", ({ selected }) => {
        handleImageSelect(selected[0] as CustomImageObject)
      })

      canvas.on("selection:cleared", () => {
        clearSelectedImageAction()
      })

      // On cell hover
      canvas.on("mouse:over", (e) => {
        e.target?.set("fill", `${e.target.fill}40`)
        e.target?.set("backgroundColor", "#121212")
        canvas.renderAll()
      })

      canvas.on("mouse:out", (e) => {
        const fillColor = e.target?.fill as string
        e.target?.set("fill", fillColor.substring(0, 7))
        e.target?.set("backgroundColor", "")
        canvas.renderAll()
      })

      // Unselect active image event handler
      const unselectObject = (e: MouseEvent) => {
        // Only target parent element
        if (e.target === wrapperRef.current) {
          canvas.discardActiveObject()
          canvas.requestRenderAll()
        }
      }

      // Attach handler
      currentWrapper.addEventListener("click", unselectObject)

      // 8. Clean up the canvas when the component unmounts
      return () => {
        currentWrapper.removeEventListener("dragover", handleDragOver);
        currentWrapper.removeEventListener("drop", handleDrop);
        currentWrapper.removeEventListener("click", unselectObject)
        canvas.dispose()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRatioIndex, activeTemplateIndex, imageWidth, imageHeight, imageBorderWidth])

  return (
    <div className="w-full h-full flex items-center justify-center"
      ref={wrapperRef}
    >
      <canvas ref={canvasRef} />
      <div className="hidden">
        <input ref={inputRef} type="file" accept="image/*" className="hidden" />
      </div>
    </div>
  )
}
