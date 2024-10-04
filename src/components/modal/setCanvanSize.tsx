import { useChangeImageWidthAction, useChangeImageHeidhtAction } from "@/src/hooks/useReduxAction"
import { useCanvasData} from "@/src/hooks/useReduxData"
import {Slider} from "@nextui-org/react";
import { useAppSelector } from "@/src/redux/hooks"
import type { RootStateType } from "@/src/redux/store"
import { useAppDispatch } from "@/src/redux/hooks"
import {  clearAllImages } from "@/src/redux/selectedImageSlice"


export default function SetCanvanSize() {
  // const { imageSizeData } = useImageSizeData()
  const { changeImageWidth } = useChangeImageWidthAction()
  const { changeImageHeight } = useChangeImageHeidhtAction()
  const { canvas } = useCanvasData()
  const dispatch = useAppDispatch()

  let imageWidth = useAppSelector((state: RootStateType) => state.canvas.imageWidth)
  let imageHeight = useAppSelector((state: RootStateType) => state.canvas.imageHeight)


  const handleChange = (newWidth: number, newHeight: number ) => {
    // changeImageSize(newWidth, newHeight);
    dispatch(clearAllImages());
  };

  return (

      <div className="z-50">
            <Slider size="md" step={128} color="foreground" label="width" showSteps={true} maxValue={2048} minValue={256} defaultValue={1024} className="max-w-md" 
              value={imageWidth}
              onChange={(value) => {
                const newWidth = Array.isArray(value) ? value[0] : value;
                changeImageWidth(newWidth);
                imageWidth = newWidth;
              }}
              onChangeEnd={() => handleChange(imageWidth, imageHeight)}
            />
            <Slider size="md" step={128} color="foreground" label="height" showSteps={true} maxValue={2048} minValue={256} defaultValue={1024} className="max-w-md" 
              value={imageHeight}
              onChange={(value) => {
                const newHeight = Array.isArray(value) ? value[0] : value;;
                changeImageHeight(newHeight);
                imageHeight = newHeight;
              }}
              onChangeEnd={() => handleChange(imageWidth, imageHeight)}
            />
      </div>

  )
}
