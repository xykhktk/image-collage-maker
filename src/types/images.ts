import type { Image } from "fabric"

// 图片加载完成时记录的初始变换（含缩放后的 scaleX/scaleY），
// “重置”按钮用它把图片还原到刚加载进格子的状态
export interface ImageInitialState {
  left: number
  top: number
  scaleX: number
  scaleY: number
  angle: number
  flipX: boolean
  flipY: boolean
}

export type CustomImageObject = Image & {
  id: string
  // 图片所在的格子下标，用于删除图片时恢复该格子的上传提示
  cellIndex: number
  initialState: ImageInitialState
}

export interface UploadedImage {
  id: string
  filters: {
    brightness: number
    contrast: number
    noise: number
    saturation: number
    vibrance: number
    blur: number
  }
}

export interface SelectedImageStateType {
  selectedImageIndex: number | null
  images: UploadedImage[]
}

