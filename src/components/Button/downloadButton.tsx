"use client"
import React, { useState } from 'react';
import { useCanvasData, useCanvasImageData } from "@/src/hooks/useReduxData"
import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    RadioGroup,
    Radio,
} from "@nextui-org/react";
import { DownloadIcon } from "@/src/components/icons";
import { useAppSelector } from "@/src/redux/hooks"
import type { RootStateType } from "@/src/redux/store"

type ExportFormat = "jpeg" | "png"

export default function DownloadButton() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [format, setFormat] = useState<ExportFormat>("jpeg")

    const { canvas } = useCanvasData()
    const { uploadCount, maxImageUploads } = useCanvasImageData()
    const imageWidth = useAppSelector((state: RootStateType) => state.canvas.imageWidth)
    const imageHeight = useAppSelector((state: RootStateType) => state.canvas.imageHeight)

    const downloadImage = async (onClose: () => void) => {
        if (!canvas) return
        canvas.discardActiveObject()

        // 页面上的画布为适应屏幕做了 CSS 缩放，但画布 backstore 始终保持
        // size 面板设置的尺寸，这里按设置宽度反推倍率，保证导出宽高
        // 严格等于 size 设置的宽高，不受显示缩放影响。
        // toBlob 走 Blob 而不是 base64 dataURL，大图导出时避免几十 MB
        // base64 字符串的内存开销。PNG 编码时 quality 会被忽略。
        const blob = await canvas.toBlob({
            multiplier: imageWidth / canvas.getWidth(),
            format: format,
            quality: format === "jpeg" ? 0.85 : 1,
        })
        if (!blob) return

        const url = URL.createObjectURL(blob)
        const link = document.createElement("a");
        link.href = url;
        link.download = `collage-${new Date().getTime()}.${format === "jpeg" ? "jpg" : "png"}`
        document.body.appendChild(link);
        link.click()
        document.body.removeChild(link);
        // 稍后释放，避免个别浏览器（如 iOS Safari）下载完成前 object URL 已失效
        setTimeout(() => URL.revokeObjectURL(url), 1000)

        onClose()
    }

    return (
        <>
            <Button className="flex justify-center items-center transition-colors"
                onPress={onOpen}
                radius="sm"
                color={uploadCount !== maxImageUploads ? "default" : "primary"}
                disabled={uploadCount !== maxImageUploads}
            >
                <DownloadIcon />
                <span className="sm:hidden lg:inline lg:text-sm xl:text-base ml-2 sm:ml-0 lg:ml-2 capitalize">
                    download
                </span>
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Download collage</ModalHeader>
                            <ModalBody>
                                <p className="text-small text-default-500">
                                    Export size: {imageWidth} × {imageHeight} px
                                </p>
                                <RadioGroup
                                    label="Image format"
                                    value={format}
                                    onValueChange={(value) => setFormat(value as ExportFormat)}
                                >
                                    <Radio
                                        value="jpeg"
                                        description="Much smaller file, best for photos (recommended)"
                                    >
                                        JPEG
                                    </Radio>
                                    <Radio
                                        value="png"
                                        description="Lossless quality, much larger file"
                                    >
                                        PNG
                                    </Radio>
                                </RadioGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={() => downloadImage(onClose)}>
                                    Download
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
