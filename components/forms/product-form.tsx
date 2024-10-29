"use client";

import { useState } from 'react';
import { z } from 'zod';
import Image from "next/image";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Cross1Icon, ImageIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import FileInput from '../elements/file-input';
import { productSchema } from '../../lib/validators';
import { FileResponse } from '@/lib/types';
import { createProduct } from '@/actions/product';

type InputSchema = z.infer<typeof productSchema>

interface ProductFormData extends InputSchema {
    images: string[],
    storeId: string
}

type ProductFormProps = {
    storeId: string,
    formData?: ProductFormData
}

const ProductForm = ({ storeId }: ProductFormProps) => {

    const [isSubmitting, setIsSubmitting]  = useState(false);
    const [fileUrls, setFileUrls] = useState<FileResponse[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const form = useForm<InputSchema>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: '',
            description: '',
            price: '0',
            inventory: '0',
            tags: ''
        }
    })

    const onSubmit = async(values: InputSchema) => {
        const { name, description, price, inventory, tags } = values;
        
        const productForm = { name, description, price, inventory: Number(inventory), tags: [tags], 
            storeId, images: fileUrls.map((fileResponse) => fileResponse.serverData.fileUrl)}
        setIsSubmitting(true);
        
        const data = await createProduct(productForm)
        toast.success("Successfully created product")

        setIsSubmitting(false);
        form.reset();
        setFileUrls([]);


    };

    const addFiles = (files: FileResponse[]) => {
        setFileUrls(files)
    }

    const triggerDialog = (value: boolean) => {
        setDialogOpen(value)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                   control={form.control}
                   name='name'
                   render={({ field }) => (
                    <FormItem>
                        <FormLabel>Store name</FormLabel>
                        <FormControl>
                            <Input placeholder='Add store name' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                   )}
                />
                <FormField
                   control={form.control}
                   name='description'
                   render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Input placeholder='Description' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                   )}
                />

                <div className='flex gap-4'> 
                <FormField
                   control={form.control}
                   name='price'
                   render={({ field }) => (
                    <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                            <Input type='number' placeholder='Price' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                   )}
                />
                <FormField
                   control={form.control}
                   name='inventory'
                   render={({ field }) => (
                    <FormItem>
                        <FormLabel>Inventory</FormLabel>
                        <FormControl>
                            <Input type='number' placeholder='Inventory' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                   )}
                />

                <FormField 
                    control={form.control}
                    name='tags'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <Select onValueChange={field.onChange}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a tag" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="featured">featured</SelectItem>
                                    <SelectItem value="non-featured">non-featured</SelectItem>
                                </SelectContent>
                                
                            </Select>
                            <FormMessage />
                        </FormItem>

                    )}
                />


                </div>

                <div className='flex items-center justify-between'>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button type='button' variant={'ghost'} size={'icon'}>
                                <ImageIcon />
                            </Button>
                        </DialogTrigger>
                        <FileInput addFiles={addFiles} triggerDialog={triggerDialog} />

                    </Dialog>
                </div>

                <ProductImages fileUrls={fileUrls!} />
                <Button disabled={isSubmitting} >Submit</Button>
            </form>

        </Form>
    )
    

}

export default ProductForm

const ProductImages = ({ fileUrls}: { fileUrls: FileResponse[]}) => {
    return(
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Images</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {fileUrls.map((file, index) => (
                    <TableRow key={index}>
                        <TableCell className='font-medium'>
                            <Image src={file.serverData.fileUrl} height={50} width={50} alt="" />                
                        </TableCell>
                        <TableCell>{file.name}</TableCell>
                        <TableCell>
                            <Button variant={"ghost"} size={"icon"}>
                                <Cross1Icon />
                            </Button>
                        </TableCell>

                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )

}