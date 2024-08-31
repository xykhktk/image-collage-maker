"use client";
import { ClearIcon, DeleteImageIcon } from "@/src/components/icons";
import { useCanvasAction } from "@/src/hooks/useReduxAction";
import { useCanvasData } from "@/src/hooks/useReduxData"
import React from "react";
import { useAppSelector } from "@/src/redux/hooks"
import type { RootStateType } from "@/src/redux/store"
import { useAppDispatch } from "@/src/redux/hooks"
import {
  clearAllImages
} from "@/src/redux/selectedImageSlice"

import {Button} from "@nextui-org/react";

export const Toolbar = () => {
  const { deleteImageAction, clearSelectedImageAction } = useCanvasAction();

  const { canvas } = useCanvasData()
  const dispatch = useAppDispatch()

  let selectedImageIndex = useAppSelector((state: RootStateType) => state.selection.selectedImageIndex)
  let images = useAppSelector((state: RootStateType) => state.selection.images)

  const handleDeleteImageClick = () => {
    let activeCanvasObject = canvas?.getActiveObject();

    if(!canvas || !activeCanvasObject){
      return;
    }

    if (selectedImageIndex == null || selectedImageIndex < 0 || (selectedImageIndex + 1) > images.length) {
      return;
    }

    // const clipPath = activeCanvasObject.clipPath as fabric.Rect;
    canvas.remove(activeCanvasObject);

    let selectedImageId = images[selectedImageIndex].id;
    deleteImageAction(selectedImageId);

    clearSelectedImageAction();
  };

  const handleClearClick = () => {
    if(canvas){
      canvas.getObjects().forEach((obj) => {
        if (obj.type === 'image') {
          canvas.remove(obj);
        }
      });
      // clearSelectedImageAction();
      dispatch(clearAllImages());
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
        <button
                className="flex justify-center items-center transition-colors bg-transparent hover:bg-transparent"
                onClick={handleDeleteImageClick}
              >
                <span className="bg-default p-1 rounded-small w-24 min-w-16 ml-1">del</span>
                {/* <DeleteImageIcon size={24} /> */}
              </button>
      )}
    </div>
  );
};
