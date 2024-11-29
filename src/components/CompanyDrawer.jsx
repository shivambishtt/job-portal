import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer'
import { Button } from './ui/button'

function CompanyDrawer({ postJobFun }) {
    const schema = z.object({
        companyName: z.string().min(1, { message: "Company name is required" }),
        companyLogoURL: z.any().refine((file) => file[0] && (file[0].type === "image/png" || file[0].type === "image/jpeg"), { message: "Only images are allowed" })
    })

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) })
    return (
        <div>


            <Drawer>
                <DrawerTrigger>Open</DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                        <DrawerDescription>This action cannot be undone.</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default CompanyDrawer
