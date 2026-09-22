import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import React, { useState } from 'react'
import Header from '@/components/Header'
import { DataTable } from "@/components/data-table"
import { columns } from "./components/columns"
import AddMemberDialog from './components/AddMemberDialog'
import { DataTablePagination } from '@/components/data-table-pagination'

const Index = ({ members, plans }) => {
    const [open, setOpen] = useState(false)

    return (
        <div className='px-6'>
            <Header title="Members"
                action={
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button className='cursor-pointer' onClick={() => setOpen(true)}>
                                <Plus />
                                Add Member
                            </Button>
                        </TooltipTrigger >
                        <TooltipContent>
                            Add member
                        </TooltipContent>
                    </Tooltip>
                } />

            <div className="flex justify-center py-6 px-6">
                <div className="w-full max-w-6xl">
                    <DataTable columns={columns} data={members.data} />
                    <DataTablePagination meta={members} />
                </div>
            </div>

            <AddMemberDialog open={open} onOpenChange={setOpen} plans={plans} />
        </div>
    )
}

export default Index