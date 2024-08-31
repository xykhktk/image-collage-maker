import { useChangeImageBorderWidthAction } from "@/src/hooks/useReduxAction"
import { useCanvasData} from "@/src/hooks/useReduxData"
import {Slider} from "@nextui-org/react";
import { useAppSelector } from "@/src/redux/hooks"
import type { RootStateType } from "@/src/redux/store"


export default function PopTemplate() {
  // const { imageSizeData } = useImageSizeData()
  const { changeImageBorderWidth } = useChangeImageBorderWidthAction()
  const { canvas } = useCanvasData()

  let imageBorderWidth = useAppSelector((state: RootStateType) => state.canvas.imageBorderWidth)

  const handleChange = (newWidth: number ) => {
    // changeImageSize(newWidth, newHeight);

  };

  return (

      <div className="z-50">
            <Slider size="md" step={10} color="foreground" label="width" showSteps={true} maxValue={100} minValue={0} defaultValue={0} className="max-w-md" 
              value={imageBorderWidth}
              onChange={(value) => {
                const newWidth = Array.isArray(value) ? value[0] : value;
                changeImageBorderWidth(newWidth);
                imageBorderWidth = newWidth;
              }}
              onChangeEnd={() => handleChange(imageBorderWidth)}
            />
      </div>

  )
}
