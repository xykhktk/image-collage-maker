"use client"
import React, { useState } from 'react';
import { SetSizeIcon } from "@/src/components/icons";
import SetCanvanSize from "@/src/components/modal/setCanvanSize";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function SetConvanSizeButton() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            <Button className="flex justify-center items-center transition-colors"  onPress={onOpen} >
                <SetSizeIcon size={20} />
                <span className="sm:hidden lg:inline lg:text-sm xl:text-base ml-2 sm:ml-0 lg:ml-2 capitalize">
                size
                </span>
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Set image size</ModalHeader>
                            <ModalBody>
                                <SetCanvanSize />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </>
    );
}
