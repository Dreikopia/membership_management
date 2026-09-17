<?php

namespace App\Http\Controllers;

use App\Http\Requests\storeMemberRequest;
use App\Models\Member;
use App\Models\Plan;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function index()
    {
        $members = Member::with('memberships.plan')
            ->paginate(20);

        return Inertia::render('Members/Index', [
            'members' => $members,
            'plans' => Plan::all(),
        ]);
    }

    public function store(storeMemberRequest $request)
    {
        Member::create($request->validated());

        return redirect()
            ->route('members.index')
            ->with('success', 'Member added successfully.');

    }
}
