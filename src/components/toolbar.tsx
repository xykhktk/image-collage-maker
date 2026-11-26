"use client";
import { ClearIcon, DeleteImageIcon } from "@/src/components/icons";
import { useCanvasAction } from "@/src/hooks/useReduxAction";
import { useCanvasConfigData, useCanvasData } from "@/src/hooks/useReduxData"
import React from "react";
import { useAppSelector } from "@/src/redux/hooks"
import type { RootStateType } from "@/src/redux/store"
import { useAppDispatch } from "@/src/redux/hooks"
import {
  clearAllImages
} from "@/src/redux/selectedImageSlice"
import type { CustomImageObject } from "@/src/types"
import type { FabricObjectWithId } from "@/src/types/canvas"

import {Button} from "@nextui-org/react";

export const Toolbar = () => {
  const { deleteImageAction, clearSelectedImageAction } = useCanvasAction();

  const { canvas } = useCanvasData()
  const { activeTemplateIndex } = useCanvasConfigData()
  const dispatch = useAppDispatch()

  let selectedImageIndex = useAppSelector((state: RootStateType) => state.selection.selectedImageIndex)
  let images = useAppSelector((state: RootStateType) => state.selection.images)

  // 图片被删除后，恢复对应格子的上传提示
  const restoreUploadHint = (cellIndex: number) => {
    if (!canvas) return;

    const hint = canvas.getObjects().find(
      (obj) => (obj as FabricObjectWithId).id === `upload_icon_${activeTemplateIndex}_${cellIndex}`
    );
    if (hint) {
      hint.set({ visible: true });
    }
  };

  const handleDeleteImageClick = () => {
    let activeCanvasObject = canvas?.getActiveObject();

    if(!canvas || !activeCanvasObject){
      return;
    }

    if (selectedImageIndex == null || selectedImageIndex < 0 || (selectedImageIndex + 1) > images.length) {
      return;
    }

    // 删除前取出所属格子下标，删除后恢复该格子的上传提示
    const cellIndex = (activeCanvasObject as CustomImageObject).cellIndex;

    canvas.remove(activeCanvasObject);
    restoreUploadHint(cellIndex);

    let selectedImageId = images[selectedImageIndex].id;
    deleteImageAction(selectedImageId);

    clearSelectedImageAction();
  };

  // 顺时针旋转 90°。centeredRotation 默认开启，图片绕中心转、位置不动
  const handleRotateClick = () => {
    const activeCanvasObject = canvas?.getActiveObject();

    if (!canvas || !activeCanvasObject) {
      return;
    }

    activeCanvasObject.rotate((activeCanvasObject.angle + 90) % 360);
    activeCanvasObject.setCoords();
    canvas.requestRenderAll();
  };

  // 把当前选中的图片还原到刚加载进格子时的状态（位置、缩放、角度、翻转）
  const handleResetClick = () => {
    let activeCanvasObject = canvas?.getActiveObject();

    if(!canvas || !activeCanvasObject){
      return;
    }

    const initialState = (activeCanvasObject as CustomImageObject).initialState;
    if (!initialState) {
      return;
    }

    activeCanvasObject.set(initialState);
    activeCanvasObject.setCoords();
    canvas.requestRenderAll();
  };

  const handleClearClick = () => {
    if(canvas){
      canvas.getObjects().forEach((obj) => {
        if (obj.type === 'image') {
          canvas.remove(obj);
        } else if ((obj as FabricObjectWithId).id?.startsWith("upload_icon_")) {
          // 图片全部移除后，恢复所有格子的上传提示
          obj.set({ visible: true });
        }
      });
      // clearSelectedImageAction();
      dispatch(clearAllImages());
      canvas.requestRenderAll();
    }
  }

  return (
    <div className="flex flex-wrap mb-2">

      {images.length  > 0 && (
          <button
            className="flex justify-center items-center transition-colors "
            onClick={handleClearClick}
          >
            <span className="bg-default p-1 rounded-small w-24 min-w-16">clear</span>
            {/* <ClearIcon className="m-0 p-0" size={16}/> */}
          </button>
      )}

      {selectedImageIndex !== null && (
        <>
          <button
            className="flex justify-center items-center transition-colors bg-transparent hover:bg-transparent"
            onClick={handleRotateClick}
              >
                <span className="bg-default p-1 rounded-small w-24 min-w-16 ml-1">rotate 90°</span>
              </button>
          <button
            className="flex justify-center items-center transition-colors bg-transparent hover:bg-transparent"
            onClick={handleResetClick}
              >
                <span className="bg-default p-1 rounded-small w-24 min-w-16 ml-1">reset</span>
              </button>
          <button
                className="flex justify-center items-center transition-colors bg-transparent hover:bg-transparent"
                onClick={handleDeleteImageClick}
              >
                <span className="bg-default p-1 rounded-small w-24 min-w-16 ml-1">del</span>
                {/* <DeleteImageIcon size={24} /> */}
              </button>
        </>
      )}
    </div>
  );
};
