import {
  SelectedImageStateType,
  UploadedImage,
} from "@/src/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const defaultState: SelectedImageStateType = {
  selectedImageIndex: null,
  images: [],
}

export const selectedImageSlice = createSlice({
  name: "selection",
  initialState: defaultState,
  reducers: {
    newImage: (state, action: PayloadAction<UploadedImage>) => {
      state.images = [...state.images, action.payload]
    },
    deleteImage: (state, action: PayloadAction<string>) => {
      state.images = state.images.filter(
        (image) => image.id !== action.payload
      );
    },
    setSelectedImage: (state, action: PayloadAction<string>) => {
      const selectedIndex = state.images.findIndex(
        (image) => image.id === action.payload,
      )
      state.selectedImageIndex = selectedIndex !== -1 ? selectedIndex : null
    },
    clearSelectedImage: (state) => {
      state.selectedImageIndex = null
    },
    clearAllImages: (state) => {
      state.selectedImageIndex = null
      state.images = []
    },
  },
})

export const {
  newImage,
  setSelectedImage,
  clearSelectedImage,
  clearAllImages,
  deleteImage,
} = selectedImageSlice.actions

export default selectedImageSlice.reducer
