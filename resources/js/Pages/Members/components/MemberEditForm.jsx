import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DrawerFooter } from "@/components/ui/drawer";

function Field({ label, id, error, ...inputProps }) {
    return (
        <div className="space-y-1.5">
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} aria-invalid={!!error} {...inputProps} />
            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
}

export default function MemberEditForm({ member, onDone }) {
    const { data, setData, patch, processing, errors, isDirty } = useForm({
        first_name: member.first_name,
        last_name: member.last_name,
        email: member.email ?? "",
        phone: member.phone ?? "",
        date_of_birth: member.date_of_birth?.slice(0, 10) ?? "",
    });

    // Shortcut: gives each Field its id, value, onChange, and error
    const bind = (name) => ({
        id: name,
        value: data[name],
        onChange: (e) => setData(name, e.target.value),
        error: errors[name],
    });

    const submit = (e) => {
        e.preventDefault();
        patch(`/members/${member.id}`, {
            preserveScroll: true,
            onSuccess: () => onDone(),
        });
    };

    return (
        <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
            <div className="flex-1 space-y-4 overflow-y-auto px-4">
                <Field label="First name" {...bind("first_name")} />
                <Field label="Last name" {...bind("last_name")} />
                <Field label="Email" type="email" {...bind("email")} />
                <Field label="Phone" {...bind("phone")} />
                <Field label="Birth date" type="date" {...bind("date_of_birth")} />
            </div>

            <DrawerFooter>
                <Button type="submit" disabled={processing || !isDirty}>
                    {processing ? "Saving..." : "Save changes"}
                </Button>
                <Button type="button" variant="outline" onClick={onDone} disabled={processing}>
                    Cancel
                </Button>
            </DrawerFooter>
        </form>
    );
}