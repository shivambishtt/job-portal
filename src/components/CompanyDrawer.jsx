import React, { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer'
import { Button } from './ui/button'
import { Input } from "../components/ui/input"
import useFetch from '@/hooks/useFetch'
import { fetchCompanies, uploadCompany } from '@/api/companiesAPI'
import { BarLoader } from 'react-spinners'

function CompanyDrawer({ fetchCompanies }) {
    const schema = z.object({
        companyName: z.string().min(1, { message: "Company name is required" }),
        companyLogoURL: z.any().refine((file) => file[0] && (file[0].type === "image/png" || file[0].type === "image/jpeg"), { message: "Only images are allowed" })
    })

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) })

    const {
        loading: companyLoading,
        data: uploadCompanyData,
        error: uploadCompanyError,
        fun: uploadCompanyFun } = useFetch(uploadCompany)

    const onSubmit = async (data) => {
        uploadCompanyFun({
            ...data,
            companyLogoURL: data?.companyLogoURL[0]

        })
    }

    useEffect(() => {
        if (uploadCompanyData?.length > 0) {
            fetchCompanies()
        }
<<<<<<< HEAD
        else{
            console.log("Company not uploaded")
        }
=======
>>>>>>> a6932d823e34cfa243cc0deecfea79752ed516db
    }, [companyLoading])

    return (
        <div>
            <Drawer>
                <DrawerTrigger>
                    <Button type="submit" size="sm" variant="secondary">
                        Add Company
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle className="text-xl">Add a new company</DrawerTitle>
<<<<<<< HEAD
                        <DrawerDescription>This action cannot be undone.</DrawerDescription>
=======
                        {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
>>>>>>> a6932d823e34cfa243cc0deecfea79752ed516db
                    </DrawerHeader>

                    <form className='flex gap-2 p-4'>
                        <Input
                            placeholder="Company name" {...register("companyName")} />

                        <Input
                            cursor="pointer"
                            className="file:text-gray-500"{...register("companyLogoURL")}
                            type="file"
                            accept="image/*" />

                        <Button
                            className="w-40 bg-blue-500 text-white"
                            type="button"
                            variant="primary"
                            onClick={handleSubmit(onSubmit)}
                        >Add
                        </Button>
                    </form>
                    <DrawerFooter>
                        {errors.companyName && <p className='text-red-500'>{errors.companyName.message}</p>}
                        {errors.companyLogoURL && <p className='text-red-500'>{errors.companyLogoURL.message}</p>}
                        {uploadCompanyError?.message && (
                            <p>{uploadCompanyError?.message}</p>
                        )}
                        {companyLoading && <BarLoader width={"100%"} color='#36d7b7' />}
                        <DrawerClose asChild>
                            <Button variant="destructive" type="button">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default CompanyDrawer
