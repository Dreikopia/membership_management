import GuestLayout from '@/Layouts/GuestLayout';
import { useForm } from '@inertiajs/react';
import { Mail, Lock } from 'lucide-react';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import React from 'react';

const Login = () => {

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/login', {
            onFinish: () => reset('password')
        });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">

            <h1 className='text-2xl font-bold mb-4 text-center'>Log in</h1>

            <div>
                <Label htmlFor="email">Email</Label>
                <InputGroup>
                    <InputGroupAddon align="inline-start">
                        <Mail className="size-4" />
                    </InputGroupAddon>
                    <InputGroupInput
                        id="email"
                        placeholder="Email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                </InputGroup>
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
                <Label htmlFor="password">Password</Label>
                <InputGroup>
                    <InputGroupAddon align="inline-start">
                        <Lock className="size-4" />
                    </InputGroupAddon>
                    <InputGroupInput
                        id="password"
                        placeholder="Password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                </InputGroup>
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            <Button type="submit" disabled={processing} className="w-full">
                {processing ? 'Logging in...' : 'Login'}
            </Button>

        </form>
    )
}

Login.layout = (page) => {
    return (
        <GuestLayout>
            {page}
        </GuestLayout>
    );
};


export default Login