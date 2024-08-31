"use client"
import React, { useState } from 'react';
import { SetBorderIcon } from "@/src/components/icons";
import SetImageBorder from "@/src/components/modal/setImageBorder";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function SetBorderButton() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            <Button className="flex justify-center items-center transition-colors"  onPress={onOpen} >
                <SetBorderIcon size={20} />
                <span className="sm:hidden lg:inline lg:text-sm xl:text-base ml-2 sm:ml-0 lg:ml-2 capitalize">
                    border
                </span>
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Set image border</ModalHeader>
                            <ModalBody>
                                <SetImageBorder />
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
