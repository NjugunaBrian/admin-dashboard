"use client"

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { storeSchema } from "@/lib/validators";
import { createStore } from "@/actions/store";

type InputSchema = z.infer<typeof storeSchema>

type StoreFormProps = {
    userId: string,
    setIsOpen: (isOpen: boolean) => void
}

const StoreForm = ({ userId, setIsOpen } : StoreFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm<InputSchema>({
        resolver: zodResolver(storeSchema),
        defaultValues: {
            name: '',
            description: ''
        }
    })

    const onSubmit = async(values: InputSchema) => {
        const { name, description } = values;
        setIsSubmitting(true);

        try {
            const promise = new Promise(async (resolve, reject) => {
                const { data, error } = await createStore({ name, userId, description });
                if (error){
                    reject(error);
                } else {
                    resolve(data?.name);
                }
            });

            const result = await toast.promise(promise, {
                loading: 'Creating store...',
                success: (data) => `${data} store created successfully!`,
                error: (error) => `${error.message}`
            });
            return result;

        } catch {
            toast.error('Failed!');
        } finally {
            setIsSubmitting(false)
            setIsOpen(false);
            form.reset();
        }

    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Store Name</FormLabel>
                        <FormControl>
                            <Input  placeholder="Add store name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Description" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <Button disabled={isSubmitting}>Submit</Button>

                
            </form>
        </Form>
    )
}

export default StoreForm