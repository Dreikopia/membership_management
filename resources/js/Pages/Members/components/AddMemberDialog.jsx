import { useForm } from '@inertiajs/react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const AddMemberDialog = ({ open, onOpenChange, plans }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        plan_price_id: '',
        phone: '',
        address: '',
        date_of_birth: '',
    })

    const handleAddMember = (e) => {
        e.preventDefault()
        post('/members', {
            onSuccess: () => {
                reset()
                onOpenChange(false)
            },
        })
    }
    const selectedPrice = plans
        .flatMap((plan) =>
            plan.prices.map((price) => ({
                ...price,
                planName: plan.name,
            }))
        )
        .find((price) => String(price.id) === String(data.plan_price_id))


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add Member</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleAddMember} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="first_name">First name</Label>
                            <Input
                                id="first_name"
                                value={data.first_name}
                                onChange={(e) => setData('first_name', e.target.value)}
                            />
                            {errors.first_name && <p className="text-sm text-red-500">{errors.first_name}</p>}
                        </div>

                        <div>
                            <Label htmlFor="last_name">Last name</Label>
                            <Input
                                id="last_name"
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                            />
                            {errors.last_name && <p className="text-sm text-red-500">{errors.last_name}</p>}
                        </div>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                        </div>

                        <div>
                            <Label htmlFor="plan_price_id">Membership Plan</Label>

                            <Select
                                value={data.plan_price_id ? String(data.plan_price_id) : undefined}
                                onValueChange={(value) => setData('plan_price_id', value)}
                            >
                                <SelectTrigger id="plan_price_id" className="w-full">
                                    <SelectValue placeholder="Select a plan">
                                        {selectedPrice
                                            ? `${selectedPrice.planName} - ${selectedPrice.billing_period}`
                                            : undefined}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {plans.map((plan) =>
                                        plan.prices.map((price) => (
                                            <SelectItem
                                                key={price.id}
                                                value={String(price.id)}
                                            >
                                                {plan.name} - {price.billing_period}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                            {errors.plan_price_id && (
                                <p className="text-sm text-red-500">
                                    {errors.plan_price_id}
                                </p>
                            )}
                        </div>
                    </div>


                    <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            type="tel"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                        />
                        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                    </div>

                    <div>
                        <Label htmlFor="date_of_birth">Date of Birth</Label>
                        <Input
                            id="date_of_birth"
                            type="date"
                            value={data.date_of_birth}
                            onChange={(e) => setData('date_of_birth', e.target.value)}
                        />
                        {errors.date_of_birth && <p className="text-sm text-red-500">{errors.date_of_birth}</p>}
                    </div>

                    <div>
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                            id="address"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            rows={3}
                        />
                        {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Save Member'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddMemberDialog