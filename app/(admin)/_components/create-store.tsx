"use client";
import StoreForm from '@/components/forms/store-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react';

type CreateStoreProps = {
    userId: string
}

const CreateStore = ({ userId }: CreateStoreProps) => {

    const [isOpen, setIsOpen] = useState(false);
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} >
            <DialogTrigger asChild>
                <Button className='space-x-1'>
                    <span>Create Store</span>
                    <PlusIcon />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new store</DialogTitle>
                    <DialogDescription>
                        <StoreForm userId={userId} setIsOpen={setIsOpen} />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default CreateStore