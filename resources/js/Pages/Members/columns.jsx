import { Badge } from "@/components/ui/badge";
const statusVariants = {
    active: "default",
    inactive: "secondary",
    expired: "destructive",
    suspended: "outline",
};

export const columns = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "first_name",
        header: "First Name",
    },
    {
        accessorKey: "last_name",
        header: "Last Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "plan_name",
        header: "Plan",
        cell: ({ row }) =>
            row.original.memberships[0]?.plan_price?.plan?.name ?? "—",
    },
    {
        accessorKey: "end_date",
        header: "End Date",
        cell: ({ row }) => {
            const endDate = row.original.memberships[0]?.end_date;

            if (!endDate) return "—";

            return new Date(endDate).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
            });
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const { value, label } = row.original.status;

            return (
                <Badge variant={statusVariants[value]}>
                    {label}
                </Badge>
            );
        },
    },
    {
        accessorKey: "actions",
        header: "Actions",
    },
]