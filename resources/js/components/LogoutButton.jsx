import { router } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { SidebarMenuButton } from './ui/sidebar';
import { Button } from '@/components/ui/button';

export default function LogoutButton() {
    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <SidebarMenuButton className='w-full'>
                    <LogOut className='size-4' />
                    <span>Logout</span>
                </SidebarMenuButton>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Log out?</AlertDialogTitle>
                    <AlertDialogDescription>
                        You will need to sign in again to access your account.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction onClick={handleLogout} variant="destructive">
                        Log out
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}