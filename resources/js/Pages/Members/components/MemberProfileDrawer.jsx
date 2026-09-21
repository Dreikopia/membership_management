import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { StatusVariant } from "./StatusVariants";
import { Pencil } from "lucide-react";
import MemberEditForm from "./MemberEditForm";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
// Turns "2025-03-14" into "Mar 14, 2025" (same as your table)
const formatDate = (date) =>
    date
        ? new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        })
        : "—";

function InfoRow({ label, value }) {
    return (
        <div className="flex justify-between py-2 text-sm">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-medium">{value ?? "—"}</span>
        </div>
    );
}

export default function MemberProfileDrawer({ member, open, onOpenChange, mode, onModeChange }) {

    function capitalize(value) {
        return value
            ? value.charAt(0).toUpperCase() + value.slice(1)
            : "—";
    }

    const currentMembership = member.memberships[0];
    const initials = `${member.first_name[0]}${member.last_name[0]}`;

    return (
        <Drawer open={open} onOpenChange={onOpenChange} swipeDirection="right">
            <DrawerContent className="w-[600px] max-w-[90vw]">
                <DrawerHeader>
                    <div className="flex items-center gap-4 space-y-2">
                        {/* Circle with the member's initials */}
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
                            {initials}
                        </div>

                        <div className="flex w-full items-center justify-between">
                            <div>
                                <DrawerTitle>
                                    {member.first_name} {member.last_name}
                                </DrawerTitle>

                                <DrawerDescription>
                                    {member.email}
                                </DrawerDescription>
                            </div>

                            {/*edit button when the mode is view*/}

                            <div className="flex items-center gap-2">
                                <Badge variant={StatusVariant[member.status.value]}>
                                    {member.status.label}
                                </Badge>

                                {mode === "view" && (
                                    <Button variant="outline" size="sm" onClick={() => onModeChange("edit")}>
                                        <Pencil className="mr-1 h-3 w-3" /> Edit
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    <Separator className="my-4" />

                </DrawerHeader>

                {mode === "view" ? (
                    <>
                        <div className="flex-1 overflow-y-auto px-4">
                            <h4 className="mb-1 text-sm font-semibold">Member details</h4>
                            <InfoRow label="Member ID" value={member.id} />
                            <InfoRow label="First name" value={member.first_name} />
                            <InfoRow label="Last name" value={member.last_name} />
                            <InfoRow label="Birth Day" value={formatDate(member.date_of_birth)} />
                            <InfoRow label="Phone" value={member.phone} />
                            <InfoRow label="Address" value={member.address} />

                            <Separator className="my-4" />

                            <h4 className="mb-1 text-sm font-semibold">Current membership</h4>
                            <InfoRow
                                label="Plan"
                                value={currentMembership?.plan_price?.plan?.name}
                            />

                            <InfoRow
                                label="Billing Period"
                                value={capitalize(currentMembership?.plan_price?.billing_period)}
                            />
                            <InfoRow
                                label="Start date"
                                value={formatDate(currentMembership?.start_date)}
                            />
                            <InfoRow
                                label="End date"
                                value={formatDate(currentMembership?.end_date)}
                            />

                            {/* Past memberships, only shown if there's more than one */}
                            {member.memberships.length > 1 && (
                                <>
                                    <Separator className="my-4" />
                                    <h4 className="mb-1 text-sm font-semibold">History</h4>
                                    {member.memberships.slice(1).map((m) => (
                                        <InfoRow
                                            key={m.id}
                                            label={m.plan_price?.plan?.name ?? "Plan"}
                                            value={`${formatDate(m.start_date)} – ${formatDate(m.end_date)}`}
                                        />
                                    ))}
                                </>
                            )}
                        </div>
                    </>
                ) : (
                    <MemberEditForm member={member} onDone={() => onModeChange("view")} />
                )}


                <DrawerFooter>
                    <DrawerClose render={<Button variant="outline" />}>
                        Close
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}