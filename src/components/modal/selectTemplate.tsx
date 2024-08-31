import { COLLAGE_TEMPLATES } from "@/src/constants/canvasConfig"
import { useTemplateAction } from "@/src/hooks/useReduxAction"
import { useCanvasConfigData } from "@/src/hooks/useReduxData"
import clsx from "clsx"
import toast from "react-hot-toast"
import { useTheme } from "next-themes";
import {Button} from "@nextui-org/react";

export default function SelectTemplate() {
  const { activeTemplateIndex } = useCanvasConfigData()
  const { changeTemplate } = useTemplateAction()

  const { theme, setTheme } = useTheme();
  const iconColor = theme === 'light' ? 'black' : 'rgb(229, 231, 235)';

  return (

      <div className="z-50">
          <div className="flex flex-wrap place-items-start text-white sm:flex-wrap grid-cols-5">
          {/* <div className="grid grid-cols-5 text-white"> */}
          
              {COLLAGE_TEMPLATES.map((template, index) => {
                  return (
                      <Button
                          key={`template-${index}`}
                          className={clsx(
                              "flex justify-center items-center transition-colors bg-transparent hover:bg-transparent",
                              {
                                  "bg-neutral-800": index === activeTemplateIndex,
                                  "hover:bg-neutral-800": index !== activeTemplateIndex,
                              },
                          )}
                          onClick={() => {
                              changeTemplate(index)
                              toast.success(`Template changed`, {
                                  duration: 650,
                                  id: "toast-template",
                              })
                          }}
                      >
                        <template.icon size={30} color={iconColor}/>
                      </Button>
                  )
              })}
          </div>
      </div>

  )
}
