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

// 选中控件的基础视觉尺寸（屏幕像素）。画布按 displayScale 缩小显示时，
// 控件尺寸按 1/displayScale 反向补偿，保证屏幕上的视觉大小恒定。
// fabric 默认样式（浅蓝 rgb(178,204,255) + 1px 细线 + 空心方点）
// 在被缩小的画布上几乎不可见，需要加强。
const CONTROL_BASE = {
  cornerSize: 14, // 控制点直径
  touchCornerSize: 28, // 触屏命中区直径
  borderScaleFactor: 1.5, // 选中边框与旋转手柄连接线的宽度
  mtrRatio: 1.25, // 旋转手柄（mtr）相对普通控制点的放大倍数
  mtrOffsetY: 40, // 旋转手柄与图片上边缘的屏幕间距（px）
}
// displayScale 补偿下限，避免极小屏上控件大得离谱
const MIN_DISPLAY_SCALE = 0.25
// 画板四周的留白（“工作台”）：fabric 的选中控件画在 canvas 元素内、
// 超出元素边界即被裁剪，留白给贴边图片的控件提供显示空间。
// 屏幕上固定宽度，需容纳旋转手柄（40px 偏移 + 手柄半径 ≈ 49px），取 56px 留余量
const PADDING_SCREEN = 56
// 虚线参考框样式：标示画板（导出）边界。不参与交互，导出时用 filter 排除
const BOARD_FRAME = {
  color: "#94a3b8",
  strokeWidth: 1.5,
  dash: [6, 6],
}
// 工作台（留白区）棋盘格样式：类似 PS 等软件里表示透明的灰白格子背景
const WORKBENCH = {
  square: 8, // 屏幕上一个格子的边长（px）
  colorA: "#ffffff",
  colorB: "#e5e7eb",
}

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

      // 1.1.1 工作台棋盘格 pattern：源 tile 固定 2×2 格（16px），
      // 屏幕上的格子大小由 patternTransform 按 1/displayScale 补偿，
      // 与控件补偿同一套逻辑（含 MIN_DISPLAY_SCALE 下限）
      const checkerTile = document.createElement("canvas")
      checkerTile.width = WORKBENCH.square * 2
      checkerTile.height = WORKBENCH.square * 2
      const tileCtx = checkerTile.getContext("2d")
      if (tileCtx) {
        tileCtx.fillStyle = WORKBENCH.colorA
        tileCtx.fillRect(0, 0, WORKBENCH.square * 2, WORKBENCH.square * 2)
        tileCtx.fillStyle = WORKBENCH.colorB
        tileCtx.fillRect(0, 0, WORKBENCH.square, WORKBENCH.square)
        tileCtx.fillRect(WORKBENCH.square, WORKBENCH.square, WORKBENCH.square, WORKBENCH.square)
      }
      const checkerPattern = new fabric.Pattern({
        source: checkerTile,
        repeat: "repeat",
      })

      // 1.2 Fit the on-screen canvas inside the visible area.
      // canvas element = 画板 + 四周工作台留白（给选中控件留显示空间），
      // backstore 保持场景坐标，导出时按留白裁剪（见 downloadButton）。
      const CANVAS_MARGIN = 16
      let displayScale = 1

      const calcDisplayScale = (): number => {
        if (!wrapperRef.current) return 1
        const wrapperRect = wrapperRef.current.getBoundingClientRect()
        const availWidth = Math.max(wrapperRect.width - CANVAS_MARGIN * 2, 100)
        // Space below the wrapper (document position, scroll invariant):
        // the hero section + toolbar above plus the whole canvas fit one screen
        const availHeight = Math.max(
          window.innerHeight -
            (wrapperRect.top + window.scrollY) -
            CANVAS_MARGIN,
          320,
        )
        // 扣除画板两侧的工作台留白（屏幕上固定宽度），可用空间只约束画板本身
        const availBoardWidth = Math.max(availWidth - PADDING_SCREEN * 2, 100)
        const availBoardHeight = Math.max(availHeight - PADDING_SCREEN * 2, 240)
        return Math.min(1, availBoardWidth / imageWidth, availBoardHeight / imageHeight)
      }

      // 补偿单个图片的选中控件尺寸（含旋转手柄 mtr），
      // 使其在被缩小的画布上保持视觉大小恒定
      const applyControlsScaleToObject = (obj: fabric.FabricObject) => {
        const s = 1 / Math.max(displayScale, MIN_DISPLAY_SCALE)
        obj.set({
          cornerSize: CONTROL_BASE.cornerSize * s,
          touchCornerSize: CONTROL_BASE.touchCornerSize * s,
          borderScaleFactor: CONTROL_BASE.borderScaleFactor * s,
        })
        // 旋转手柄比普通控制点略大，更容易被发现
        const mtr = obj.controls.mtr
        if (mtr) {
          mtr.sizeX = CONTROL_BASE.cornerSize * CONTROL_BASE.mtrRatio * s
          mtr.sizeY = CONTROL_BASE.cornerSize * CONTROL_BASE.mtrRatio * s
          mtr.touchSizeX = CONTROL_BASE.touchCornerSize * CONTROL_BASE.mtrRatio * s
          mtr.touchSizeY = CONTROL_BASE.touchCornerSize * CONTROL_BASE.mtrRatio * s
          // 手柄与图片的间距同样补偿，屏幕上恒定，小窗口时不会压到图片上
          mtr.offsetY = -CONTROL_BASE.mtrOffsetY * s
        }
        obj.setCoords()
      }

      // 窗口尺寸变化（displayScale 变化）后，对已添加的图片重新补偿
      const applyControlsScaleToAll = () => {
        canvas.getObjects().forEach((obj) => {
          if (obj.type === "image") {
            applyControlsScaleToObject(obj)
          }
        })
      }

      // 虚线参考框：标示画板（导出）边界。evented: false 不参与交互，
      // 导出时通过 toBlob 的 filter 排除。
      // 注意必须置顶：cells 的几何是 -1 起步、+1 外扩（见 canvasConfig），
      // 不透明 fill 会把底层的参考框边线整个盖住（只露出右侧外半截）
      let boardFrame: fabric.Rect | null = null
      const updateBoardFrame = () => {
        const s = 1 / Math.max(displayScale, MIN_DISPLAY_SCALE)
        if (!boardFrame) {
          boardFrame = new fabric.Rect({
            left: 0,
            top: 0,
            width: imageWidth,
            height: imageHeight,
            fill: "",
            stroke: BOARD_FRAME.color,
            selectable: false,
            evented: false,
            excludeFromExport: true,
            objectCaching: false,
          });
          (boardFrame as FabricObjectWithId).set({ id: "board_frame" });
          canvas.add(boardFrame)
        }
        // 线宽与虚线间距按显示比例补偿，屏幕上视觉恒定
        boardFrame.set({
          width: imageWidth,
          height: imageHeight,
          strokeWidth: BOARD_FRAME.strokeWidth * s,
          strokeDashArray: BOARD_FRAME.dash.map((d) => d * s),
        })
      }

      // 任何对象加入后都把参考框重新置顶：cells / 上传提示 / 图片
      // 都是参考框创建之后才 add 的，插入顺序天然排到它之上，而 cells
      // 的不透明 fill 会盖住底层的边线（bringObjectToFront 幂等，不会死循环）
      canvas.on("object:added", () => {
        if (boardFrame) {
          canvas.bringObjectToFront(boardFrame)
        }
      })

      // 工作台背景（棋盘格）+ 画板底色遮罩：
      // canvas.backgroundColor (#F8F8FF) 填充整个元素（含留白），所以用
      // 一个覆盖全元素的棋盘格 Rect 表现留白，再用画板大小的 Rect 盖回
      // 画板底色（cell 间的缝隙不能露出棋盘格）。两者都在最底层、不参与
      // 交互；导出时棋盘格被裁剪区排除，画板底色保留（与导出背景一致）
      let workbenchBg: fabric.Rect | null = null
      let boardBg: fabric.Rect | null = null
      const updateWorkbench = (padding: number, s: number) => {
        if (!workbenchBg) {
          workbenchBg = new fabric.Rect({
            left: -padding,
            top: -padding,
            width: imageWidth + padding * 2,
            height: imageHeight + padding * 2,
            fill: checkerPattern,
            selectable: false,
            evented: false,
            objectCaching: false,
          });
          (workbenchBg as FabricObjectWithId).set({ id: "workbench_checker" });
          canvas.add(workbenchBg);
        } else {
          workbenchBg.set({
            left: -padding,
            top: -padding,
            width: imageWidth + padding * 2,
            height: imageHeight + padding * 2,
          })
        }
        // 格子在屏幕上恒定 8px：场景内 tile = 16 × s
        checkerPattern.patternTransform = [s, 0, 0, s, 0, 0]

        if (!boardBg) {
          boardBg = new fabric.Rect({
            left: 0,
            top: 0,
            width: imageWidth,
            height: imageHeight,
            fill: "#F8F8FF",
            selectable: false,
            evented: false,
            objectCaching: false,
          });
          (boardBg as FabricObjectWithId).set({ id: "board_background" });
          canvas.add(boardBg);
        } else {
          boardBg.set({
            width: imageWidth,
            height: imageHeight,
          })
        }
      }

      const applyDisplayScale = () => {
        displayScale = calcDisplayScale()
        const s = 1 / Math.max(displayScale, MIN_DISPLAY_SCALE)
        // 取整：让 (canvas.getWidth() - imageWidth) / 2 与 vpt 平移量严格相等，
        // 导出裁剪零偏差
        const padding = Math.round(PADDING_SCREEN * s)

        // backstore = 画板 + 四周留白（场景坐标）；CSS 尺寸按显示比例缩放。
        // 留白区域是“工作台”，让贴边图片的选中控件有地方显示
        canvas.setDimensions(
          {
            width: Math.round(imageWidth + padding * 2),
            height: Math.round(imageHeight + padding * 2),
          },
          { backstoreOnly: true },
        )
        canvas.setDimensions(
          {
            width: Math.round((imageWidth + padding * 2) * displayScale),
            height: Math.round((imageHeight + padding * 2) * displayScale),
          },
          { cssOnly: true },
        )
        // 把画板平移到元素中心：场景坐标（cells / 图片 / clipPath）完全不变，
        // 导出时按留白裁剪即可
        canvas.setViewportTransform([1, 0, 0, 1, padding, padding])

        applyControlsScaleToAll()
        updateWorkbench(padding, s)
        updateBoardFrame()
      }
      applyDisplayScale()
      window.addEventListener("resize", applyDisplayScale)

      // Helper function to add image to a specific cell
      const addImageToCell = async (file: File, selectedCell: fabric.Rect, cellIndex: number) => {
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async (e) => {
          const dataUrl = e.target?.result as string;
          const img = await fabric.Image.fromURL(dataUrl);
          const imgId = `img_${new Date().getTime()}`;

          // Hide the cell's upload hint while it holds an image. The hint is
          // hidden (not removed) so it can be restored on delete / clear.
          const existingUploadIcon = canvas.getObjects().find((obj: FabricObjectWithId) => obj.id === `upload_icon_${activeTemplateIndex}_${cellIndex}`);
          if (existingUploadIcon) {
            existingUploadIcon.set({ visible: false });
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
            // 选中控件样式：深蓝实色圆点 + 白描边 + 加粗边框，
            // 替代默认的浅蓝细线空心方点（画布被 CSS 缩小后几乎不可见）。
            // 尺寸由 applyControlsScaleToObject 按 displayScale 补偿
            borderColor: "#3b82f6",
            cornerColor: "#3b82f6",
            cornerStrokeColor: "#ffffff",
            cornerStyle: "circle",
            transparentCorners: false,
          }) as CustomImageObject;

          const config = activeTemplate.config[cellIndex]; // 获取对应cell的配置
          if (config.scaleTo === "width") {
            img.scaleToWidth(selectedCell.width + 1);
          } else if (config.scaleTo === "height") {
            img.scaleToHeight(selectedCell.height + 1);
          }

          // 记录加载完成后的初始变换（缩放已应用），
          // 并标记所属格子，供“重置”还原、删除时恢复上传提示用
          const customImg = img as CustomImageObject;
          customImg.cellIndex = cellIndex;
          customImg.initialState = {
            left: img.left,
            top: img.top,
            scaleX: img.scaleX,
            scaleY: img.scaleY,
            angle: img.angle,
            flipX: img.flipX,
            flipY: img.flipY,
          };

          // 按当前显示比例补偿选中控件的尺寸
          applyControlsScaleToObject(customImg);

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

        // selectable: false — cell 是显示框 + 图片的 clipPath，被拖动会
        // 导致裁剪区错位、图片显示错乱。evented 保持 true：点击上传、
        // 悬停高亮、拖放命中等交互不受影响
        const cell = new fabric.Rect({
          ...PROPERTIES,
          selectable: false,
        })

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
          // Scale the icon to fit within the cell if needed.
          // The 1 / displayScale factor keeps the hint readable when the
          // canvas is displayed smaller than its real size (the hint is
          // removed once a cell is filled, so it never appears in exports).
          const uiScale = 1 / displayScale
          img.scaleToWidth(cell.width * 0.05 * uiScale)
          if (img.height > cell.height) {
            img.scaleToHeight(cell.height * 0.05 * uiScale)
          }
          // 将图片的原点设置为中心，这样left/top就是中心坐标
          img.set({ originX: 'center', originY: 'center', left: 0, top: 0 });

          // Create the text label
          const uploadText = new fabric.Text("Drop / Click\nto Choose Image", {
            fontSize: 16 * uiScale, // 调整字体大小，随显示比例补偿
            fill: "#cccccc",
            textAlign: "center",
            originX: "center",
            originY: "center",
            left: 0, // 相对于 group 的中心
            top: img.getScaledHeight() / 2 + 20 * uiScale, // 文字在图标下方，间距同比例补偿
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

          // 显示比例很小（uiScale 很大）时，把提示组收缩回格子内，避免溢出。
          // group 刚创建、缩放恒为 1，直接设为目标比例即可
          // （fabric v6 的 scale() 是方法不是数值属性，读取缩放用 scaleX）
          const hintFit = Math.min(
            (cell.width * 0.9) / uploadGroup.getScaledWidth(),
            (cell.height * 0.9) / uploadGroup.getScaledHeight(),
          )
          if (Number.isFinite(hintFit) && hintFit < 1) {
            uploadGroup.scale(hintFit)
          }

          // If the cell was filled before this hint finished loading,
          // add the hint hidden so it never covers the uploaded image.
          const cellHasImage = canvas
            .getObjects()
            .some((obj) => obj.type === "image" && (obj as CustomImageObject).cellIndex === index);
          if (cellHasImage) {
            uploadGroup.set({ visible: false });
          }

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
          // （排除画板边界的虚线参考框，它 type 也是 rect）
          if (targetObject && targetObject.type === 'rect' &&
              (targetObject as FabricObjectWithId).id !== "board_frame") {
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
                  obj.type === 'rect' &&
                  // 排除虚线参考框与画板底色遮罩（都在 (0,0)，且同为 rect）
                  (obj as FabricObjectWithId).id !== "board_frame" &&
                  (obj as FabricObjectWithId).id !== "board_background"
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
        window.removeEventListener("resize", applyDisplayScale)
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
