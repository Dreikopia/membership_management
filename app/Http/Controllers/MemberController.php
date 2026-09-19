<?php

namespace App\Http\Controllers;

use App\Enums\MemberStatus;
use App\Http\Requests\StoreMemberRequest;
use App\Models\Member;
use App\Models\Plan;
use App\Models\PlanPrice;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function index()
    {
        $members = Member::with('memberships.planPrice.plan')
            ->latest()
            ->paginate(20);

        $members->through(function ($member) {
            return [
                ...$member->toArray(),
                'status' => [
                    'value' => $member->status->value,
                    'label' => $member->status->label(),
                ],
            ];
        });

        $plans = Plan::with('prices')
            ->where('status', 'active')
            ->get();

        return Inertia::render('Members/Index', [
            'members' => $members,
            'plans' => $plans,
        ]);
    }

    public function store(StoreMemberRequest $request)
    {
        $validated = $request->validated();

        DB::transaction(function () use ($validated) {
            $planPrice = PlanPrice::findOrFail(
                $validated['plan_price_id']
            );

            $member = Auth::user()->members()->create([
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'address' => $validated['address'],
            ]);

            $member->memberships()->create([
                'plan_price_id' => $planPrice->id,
                'start_date' => now(),
                'end_date' => now()->addDays($planPrice->duration_days),
                'status' => MemberStatus::ACTIVE,
            ]);
        });

        return redirect()
            ->route('members.index')
            ->with('success', 'Member added successfully.');
    }
}
