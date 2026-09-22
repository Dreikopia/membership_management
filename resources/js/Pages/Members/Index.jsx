import { Button } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { Input } from '@/components/ui/input'
import { router } from '@inertiajs/react'
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import { DataTable } from "@/components/data-table";
import { Columns } from './partials/Columns';
import AddMemberDialog from './components/AddMemberDialog'
import { DataTablePagination } from '@/components/data-table-pagination'
import { useDebouncedValue } from '@/hooks/use-debounced-value'

const Index = ({ members, plans, search = '' }) => {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState(search)
    const [isSearching, setIsSearching] = useState(false)

    const debouncedQuery = useDebouncedValue(query, 700)

    useEffect(() => {
        if (debouncedQuery === search) {
            return
        }

        router.get(
            '/members',
            { search: debouncedQuery, page: 1 },
            {
                preserveState: true,
                preserveScroll: true,
                onStart: () => setIsSearching(true),
                onFinish: () => setIsSearching(false),
            }
        )
    }, [debouncedQuery, search])

    return (
        <div className='px-6'>
            <Header title="Members"
                action={
                    <Tooltip>
                        <TooltipTrigger
                            render={
                                <Button
                                    className="cursor-pointer"
                                    onClick={() => setOpen(true)}
                                />
                            }
                        >
                            Add Member
                        </TooltipTrigger>

                        <TooltipContent>
                            Add a new member
                        </TooltipContent>
                    </Tooltip>
                }>
            </Header>

            <div className="flex justify-center py-6 px-6">
                <div className="w-full max-w-6xl">
                    <div className="relative mb-4 max-w-sm">
                        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search members..."
                            className="pl-8"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            aria-label="Search members"
                        />
                    </div>

                    <div className={isSearching ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
                        <DataTable columns={Columns} data={members.data} />

                        <DataTablePagination
                            meta={members}
                            params={{ search }}
                        />
                    </div>
                </div>
            </div>

            <AddMemberDialog open={open} onOpenChange={setOpen} plans={plans} />
        </div>
    )
}

export default Index
