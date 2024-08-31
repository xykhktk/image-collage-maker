import { CanvasStateType } from "@/src/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { Canvas } from "fabric"

const defaultState: CanvasStateType = {
  canvas: null,
  ratio: 0,
  template: 0,
  tab: "template",
  imageWidth: 1024,
  imageHeight: 1024,
  imageBorderWidth : 0,
}

export const canvasSlice = createSlice({
  name: "canvas",
  initialState: defaultState,
  reducers: {
    changeTemplateByIndex: (state, action: PayloadAction<number>) => {
      state.template = action.payload
    },
    changeRatioByIndex: (state, action: PayloadAction<number>) => {
      state.ratio = action.payload
    },
    setCanvas: (state, action: PayloadAction<Canvas>) => {
      // @ts-ignore
      state.canvas = action.payload
    },
    setImageWidth: (state, action: PayloadAction<number>) => {
      state.imageWidth = action.payload
    },
    setImageHeight: (state, action: PayloadAction<number>) => {
      state.imageHeight = action.payload
    },
    setImageBorderWidth: (state, action: PayloadAction<number>) => {
      state.imageBorderWidth = action.payload
    },
  },
})

export const {
  changeTemplateByIndex,
  changeRatioByIndex,
  setCanvas,
  setImageWidth,
  setImageHeight,
  setImageBorderWidth,
} = canvasSlice.actions

export default canvasSlice.reducer
