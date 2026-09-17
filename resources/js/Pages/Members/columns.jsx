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
        cell: ({ row }) => row.original.memberships[0]?.plan?.name ?? "—",
    },
    {
        accessorKey: "end_date",
        header: "End Date",
        cell: ({ row }) => {
            const endDate = row.original.memberships[0]?.end_date;

            if (!endDate) return "—";

            return new Date(endDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
            });
        },
    },
    {
        accessorKey: "status",
        header: "Status",
    },
]