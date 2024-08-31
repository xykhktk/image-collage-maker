import {
  changeRatioByIndex,
  changeTemplateByIndex,
  setCanvas,
  setImageWidth,
  setImageHeight,
  setImageBorderWidth
} from "@/src/redux/canvasSlice"
import { useAppDispatch } from "@/src/redux/hooks"
import {
  clearAllImages,
  clearSelectedImage,
  newImage,
  setSelectedImage,
  deleteImage,
} from "@/src/redux/selectedImageSlice"
import type { UploadedImage } from "@/src/types"
import type { Canvas } from "fabric"

function useRatioAction() {
  const dispatch = useAppDispatch()
  const changeRatio = (index: number) => {
    dispatch(changeRatioByIndex(index))
    dispatch(clearAllImages())
  }
  return { changeRatio }
}

function useTemplateAction() {
  const dispatch = useAppDispatch()
  const changeTemplate = (index: number) => {
    dispatch(changeTemplateByIndex(index))
    dispatch(clearAllImages())
  }
  return { changeTemplate }
}

function useCanvasAction() {
  const dispatch = useAppDispatch()
  const addImageAction = (imagePayload: UploadedImage) => {
    dispatch(newImage(imagePayload))
  }
  const deleteImageAction = (id: string) => {
    dispatch(deleteImage(id))
  }
  const clearSelectedImageAction = () => {
    dispatch(clearSelectedImage())
  }
  const setCanvasAction = (canvas: Canvas) => {
    dispatch(setCanvas(canvas))
  }
  const setSelectedImageAction = (id: string) => {
    dispatch(setSelectedImage(id))
  }
  return {
    addImageAction,
    deleteImageAction,
    clearSelectedImageAction,
    setCanvasAction,
    setSelectedImageAction,
  }
}

function useChangeImageWidthAction() {
  const dispatch = useAppDispatch()
  const changeImageWidth = (newWidth: number) => {
    dispatch(setImageWidth(newWidth))
  }
  return { changeImageWidth }
}

function useChangeImageHeidhtAction() {
  const dispatch = useAppDispatch()
  const changeImageHeight = (newHeight: number) => {
    dispatch(setImageHeight(newHeight))
  }
  return { changeImageHeight }
}

function useChangeImageBorderWidthAction() {
  const dispatch = useAppDispatch()
  const changeImageBorderWidth = (newWidth: number) => {
    dispatch(setImageBorderWidth(newWidth))
  }
  return { changeImageBorderWidth }
}

export {
  useRatioAction,
  useTemplateAction,
  useCanvasAction,
  useChangeImageWidthAction,
  useChangeImageHeidhtAction,
  useChangeImageBorderWidthAction,
}
