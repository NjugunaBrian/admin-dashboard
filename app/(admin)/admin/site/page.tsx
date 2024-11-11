import { getCategories } from "@/actions/site";
import CategoryForm from "@/components/forms/category-form";
import SubcategoryForm from "@/components/forms/subcategory-form";
import ContentShell from "@/components/shells/content-shell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import AccordionButton from "../../_components/accordion-button";


const Site = async() => {
    const categories = await getCategories();

    return (
        <ContentShell title='Site' subtitle='Customize your site.' className='max-w-[900px]'>
            <Dialog>
                <DialogTrigger>
                    <Button>Add Category <PlusIcon className='ml-2' /></Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create a new category.</DialogTitle>
                        <DialogDescription>
                            <CategoryForm />
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <div>
                <Accordion type='multiple' className="w-full">
                    {categories && categories.length > 1 && categories.map((cat, index) => (
                        <AccordionItem value={`item-${index + 1}`} key={index}>
                            <AccordionTrigger className='capitalize text-secondary-foreground'>
                                <p className="flex items-center gap-2">
                                    {cat.title}
                                    <Dialog>
                                        <DialogTrigger>
                                            <Button size={'icon'} variant={'ghost'} className='z-100'><Pencil1Icon /></Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Add category item</DialogTitle>
                                                <DialogDescription>
                                                    <SubcategoryForm categoryId={cat.categoryId} />
                                                </DialogDescription>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                </p>

                            </AccordionTrigger>

                            {cat.subcategories.length > 0 && cat.subcategories.map((subcat, index) => (
                                <div key={index}>
                                    <AccordionContent>
                                        <div className="focus:text-secondary-foreground flex items-center gap-2">
                                            <p>{subcat.title}</p>
                                            <AccordionButton subcategoryId={subcat.subcategoryId} />
                                        </div>
                                        <div className='text-muted-foreground focus:text-secondary-foreground'>
                                            {subcat.description}
                                        </div>
                                    </AccordionContent>

                                </div>
                            ))}
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

        </ContentShell>
    )

}

export default Site