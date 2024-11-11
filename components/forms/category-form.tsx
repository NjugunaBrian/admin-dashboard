"use client";

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { categorySchema } from "@/lib/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { createCategory } from "@/actions/site"


type inputSchema = z.infer<typeof categorySchema>

const CategoryForm = () => {
    const form = useForm<inputSchema>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            title: '',
        }
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (values: inputSchema) => {
        const { title } = values;
        setIsSubmitting(true)
        await createCategory(title)
        form.reset();
        setIsSubmitting(false)

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
                <FormField 
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Input placeholder="Create category" {...field} />
                            </FormControl>
                            <FormMessage /> 
                        </FormItem>
                    )}
                />

                <Button disabled={isSubmitting}>
                    Submit
                </Button>
            </form>

        </Form>
    )

}

export default CategoryForm