<?php

namespace App\Http\Controllers;

use App\Enums\MemberStatus;
use App\Http\Requests\StoreMemberRequest;
use App\Http\Requests\UpdateMemberRequest;
use App\Models\Member;
use App\Models\Plan;
use App\Models\PlanPrice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function index(Request $request)
    {
        // 0. Search term (validated: at most 100 characters)
        $search = $request->validate([
            'search' => ['nullable', 'string', 'max:100'],
        ])['search'] ?? '';

        // 1. Decide how many rows to show per page
        $perPage = in_array($request->integer('per_page'), [10, 15, 25, 50, 100])
            ? $request->integer('per_page')
            : 15;

        // 2. Get ONE page of members (not all of them)
        $members = Member::with('memberships.planPrice.plan')
            ->when($search !== '', fn ($query) => $query->search($search))
            ->latest()
            ->paginate($perPage)
            ->withQueryString();

        // 3. Add the status label to each member on this page
        $members->through(function ($member) {
            return [
                ...$member->toArray(),
                'status' => [
                    'value' => $member->status->value,
                    'label' => $member->status->label(),
                ],
            ];
        });

        // 4. Active plans (unrelated to pagination)
        $plans = Plan::with('prices')
            ->where('status', 'active')
            ->get();

        // 5. Send everything to React
        return Inertia::render('Members/Index', [
            'members' => $members,
            'plans' => $plans,
            'search' => $search,
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
                'date_of_birth' => $validated['date_of_birth'],
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

    public function update(UpdateMemberRequest $request, Member $member)
    {
        $member->update($request->validated());

        return back()->with('success', 'Member Updated');
    }
}
