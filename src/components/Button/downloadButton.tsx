"use client"
import React from 'react';
import { useCanvasData, useCanvasImageData } from "@/src/hooks/useReduxData"
import {Button} from "@nextui-org/react";
import { DownloadIcon } from "@/src/components/icons";

import { useRef } from "react"

export default function DownloadButton() {

    const { canvas } = useCanvasData()
    const { uploadCount, maxImageUploads } = useCanvasImageData()

    const downloadImage = () => {
        if (canvas) {
            canvas.discardActiveObject()
            const link = document.createElement("a"); 
            link.href = canvas.toDataURL()
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
