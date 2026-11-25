"use client"
import React from 'react';
import { useCanvasData, useCanvasImageData } from "@/src/hooks/useReduxData"
import { Button } from "@nextui-org/react";
import { DownloadIcon } from "@/src/components/icons";

import { useRef } from "react"
import { useAppSelector } from "@/src/redux/hooks"
import type { RootStateType } from "@/src/redux/store"

export default function DownloadButton() {

    const { canvas } = useCanvasData()
    const { uploadCount, maxImageUploads } = useCanvasImageData()
    const imageWidth = useAppSelector((state: RootStateType) => state.canvas.imageWidth)

    const downloadImage = () => {
        if (canvas) {
            canvas.discardActiveObject()
            const link = document.createElement("a");
            // 页面上的画布为适应屏幕做了 CSS 缩放，但画布 backstore 始终保持
            // size 面板设置的尺寸，这里按设置宽度反推倍率，保证导出宽高
            // 严格等于 size 设置的宽高，不受显示缩放影响。
            link.href = canvas.toDataURL({
                multiplier: imageWidth / canvas.getWidth(),
            })
            link.download = `collage-${new Date().getTime()}.png`
            document.body.appendChild(link);
            link.click()
            document.body.removeChild(link);
        } else {
        }
    }

    return (
        <>
            <Button className="flex justify-center items-center transition-colors"
                onClick={downloadImage}
                radius="sm"
                color={uploadCount !== maxImageUploads ? "default" : "primary"}
                disabled={uploadCount !== maxImageUploads}
            >
                <DownloadIcon />
                <span className="sm:hidden lg:inline lg:text-sm xl:text-base ml-2 sm:ml-0 lg:ml-2 capitalize">
                    download
                </span>
            </Button>

        </>
    );
}
