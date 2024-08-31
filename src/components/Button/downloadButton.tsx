"use client"
import React, { useState } from 'react';
import { useCanvasData, useCanvasImageData } from "@/src/hooks/useReduxData"
import {Button} from "@nextui-org/react";
// import DownloadIcon from "@/src/components/DownloadIcon";
import { DownloadIcon } from "@/src/components/icons";

import { useRef } from "react"

export default function DownloadButton() {

    const linkRef = useRef<HTMLAnchorElement | null>(null)
    const { canvas } = useCanvasData()
    const { uploadCount, maxImageUploads } = useCanvasImageData()

    const downloadImage = () => {
        if (canvas && linkRef.current) {
            canvas.discardActiveObject()
            linkRef.current.href = canvas.toDataURL()
            linkRef.current.download = `collage-${new Date().getTime()}.png`
            linkRef.current.click()
        } else {
        }
    }

    return (
        <>
            <a ref={linkRef} id="download" className="hidden"></a>
            <Button className="flex justify-center items-center transition-colors"
                    onClick={downloadImage}
                    radius="sm"
                    // variant={uploadCount !== maxImageUploads ? "faded" : "shadow"}
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
