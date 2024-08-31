"use client"
import React, { useState } from 'react';
import { TemplateIcon } from "@/src/components/icons";
import SelectTemplate from "@/src/components/modal/selectTemplate";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function TemplateButton() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            <Button className="flex justify-center items-center transition-colors"  onPress={onOpen} >
                <TemplateIcon />
                <span className="sm:hidden lg:inline lg:text-sm xl:text-base ml-2 sm:ml-0 lg:ml-2 capitalize">
                    template
                </span>
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Select a template</ModalHeader>
                            <ModalBody>
                                <SelectTemplate />
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
