import { useState } from "react";
import { router } from "@inertiajs/react";
import { MoreHorizontal } from "lucide-react";
import MemberProfileDrawer from "./MemberProfileDrawer";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ActionsCell({ member }) {

    const [showProfile, setShowProfile] = useState(false);
    const [profileMode, setProfileMode] = useState('view');

    const openProfile = (mode) => {
        setProfileMode(mode);
        setShowProfile(true);
    };

    const [showDelete, setShowDelete] = useState(false);
    const isSuspended = member.status.value === "suspended";



    const handleToggleSuspend = () => {
        router.patch(`/members/${member.id}/toggle-suspend`);
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuGroup>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        <DropdownMenuItem onClick={() => openProfile("view")}>
                            View profile
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => openProfile("edit")}>
                            Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={handleToggleSuspend}>
                            {isSuspended ? "Reactivate" : "Suspend"}
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => setShowDelete(true)}
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* AlertDialog is outside DropdownMenu */}
            <AlertDialog
                open={showDelete}
                onOpenChange={setShowDelete}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Delete this member?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            {member.first_name} {member.last_name} will be
                            permanently removed. This can't be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>

            <MemberProfileDrawer
                member={member}
                open={showProfile}
                onOpenChange={setShowProfile}
                mode={profileMode}
                onModeChange={setProfileMode}
            />
        </>
    );
}