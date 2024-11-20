import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Boxes, BriefcaseBusiness, Download, School } from 'lucide-react'

function ApplicationCard({ application, isCandidate = false }) {
    // simply ye function jo hai hume isey esa design karna hai ki ispe koi agar click kare to wo download hojaye
    const handleDownload = () => {
        const link = document.createElement("a")
        link.href = application?.resume
        link.target = "_blank";
        link.click()
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between">
                    {isCandidate ? `${application?.job?.jobTitle} at ${application?.job?.companyName}` : `${application?.name}`}
                    <Download
                        size={18}
                        className="bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer"
                        onClick={handleDownload}
                    />
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 flex-1">
                <div className='flex flex-col md:flex-row justify-between' >
                    <div
                        className='flex gap-2 items-center'>
                        <BriefcaseBusiness size={15} /> {application?.experience} years of experience
                    </div>
                    <div
                        className='flex gap-2 items-center' >
                        <School size={15} />{application?.education}
                    </div>
                    <div
                        className='flex gap-2 items-center'>
                        <Boxes size={15} /> Skills: {application?.skills}
                    </div>
                </div>
                <hr />
            </CardContent>
            <CardFooter>
                <span>{new Date(application?.created_at).toLocaleString()}</span>
            </CardFooter>
        </Card>
    )
}

export default ApplicationCard
