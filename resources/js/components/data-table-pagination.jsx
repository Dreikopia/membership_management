import { router } from '@inertiajs/react'
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

function getPageNumbers(current, last) {
    if (last <= 5) {
        return Array.from({ length: last }, (_, i) => i + 1)
    }
    if (current <= 3) return [1, 2, 3, '...', last]
    if (current >= last - 2) return [1, '...', last - 2, last - 1, last]
    return [1, '...', current, '...', last]
}

export function DataTablePagination({ meta }) {
    const { current_page, last_page, per_page, from, to, total, path } = meta

    const goTo = (page, perPage = per_page) => {
        router.get(
            path,
            { page, per_page: perPage },
            { preserveState: true, preserveScroll: true }
        )
    }

    const pages = getPageNumbers(current_page, last_page)

    return (
        <div className="flex items-center justify-between px-2 py-4">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                    <span>Rows per page</span>
                    <Select
                        value={String(per_page)}
                        onValueChange={(value) => goTo(1, Number(value))}
                    >
                        <SelectTrigger className="text-xs h-5 w-[60px] px-2">
                            <SelectValue />

                        </SelectTrigger>

                        <SelectContent>
                            {[10, 15, 25, 50, 100].map((size) => (
                                <SelectItem
                                    key={size}
                                    value={String(size)}
                                >
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <span>
                    {from ?? 0}-{to ?? 0} of {total} rows
                </span>
            </div>

            <div className="flex items-center gap-1">
                <Button

                    variant="outline"
                    size="icon"
                    className="h-6 w-6"
                    disabled={current_page === 1}
                    onClick={() => goTo(1)}
                >
                    <ChevronsLeft className="h-4 w-4" />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6"
                    disabled={current_page === 1}
                    onClick={() => goTo(current_page - 1)}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {pages.map((page, index) =>
                    page === '...' ? (
                        <span key={`dots-${index}`} className="px-2 text-muted-foreground">
                            …
                        </span>
                    ) : (
                        <Button
                            key={page}
                            variant={page === current_page ? 'default' : 'ghost'}
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => goTo(page)}
                        >
                            {page}
                        </Button>
                    )
                )}

                <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6"
                    disabled={current_page === last_page}
                    onClick={() => goTo(current_page + 1)}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6"
                    disabled={current_page === last_page}
                    onClick={() => goTo(last_page)}
                >
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}