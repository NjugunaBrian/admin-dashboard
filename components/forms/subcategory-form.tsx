"use client";

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { subcategorySchema } from "@/lib/validators"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { TrashIcon } from "@radix-ui/react-icons"
import { createSubcategory, deleteCategory } from "@/actions/site"
import { Textarea } from "../ui/textarea"

type InputSchema = z.infer<typeof subcategorySchema>

const SubcategoryForm = ({ categoryId }: { categoryId: string }) => {
    const form = useForm<InputSchema>({
        resolver: zodResolver(subcategorySchema),
        defaultValues: {
            title: '',
            description: '',
        }
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async(values: InputSchema) => {
        const { title, description } = values
        setIsSubmitting(true)
        await createSubcategory({ title, description, categoryId })
        setIsSubmitting(false)

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
                <FormField
                   control={form.control}
                   name='title'
                   render={({ field }) => (
                    <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input placeholder='title' {...field} />
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
                            <Textarea placeholder='description' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                   )}
                />
                <div className='flex items-center gap-2'>
                    <Button disabled={isSubmitting}>
                        Submit
                    </Button>
                    <Button type='button' variant={'ghost'} onClick={() => deleteCategory(categoryId)} className='hover:bg-transparent border border-transparent hover:border-[#ff4c4c] hover:text-[#ff4c4c]'>
                        <TrashIcon />
                    </Button>

                </div>

            </form>

        </Form>
    )

}

export default SubcategoryForm