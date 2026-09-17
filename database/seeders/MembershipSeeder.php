<?php

namespace Database\Seeders;

use App\Models\Member;
use App\Models\Membership;
use App\Models\Plan;
use Illuminate\Database\Seeder;

class MembershipSeeder extends Seeder
{
    public function run(): void
    {
        $members = Member::all();
        $plans = Plan::all();
        foreach ($members as $member) {
            $plan = $plans->random();
            $startDate = now()->subDays(rand(1, 300));
            Membership::create(['member_id' => $member->id, 'plan_price_id' => $plan->id, 'start_date' => $startDate, 'end_date' => $startDate->copy()->addDays($plan->duration_days), 'status' => 'active']);
        }
    }
}
