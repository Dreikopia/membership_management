<?php

namespace Database\Seeders;

use App\Models\Member;
use App\Models\Membership;
use App\Models\PlanPrice;
use Illuminate\Database\Seeder;

class MemberSeeder extends Seeder
{
    public function run(): void
    {
        $members = Member::factory()->count(25)->create();

        $planPrices = PlanPrice::all();

        foreach ($members as $member) {
            $planPrice = $planPrices->random();

            Membership::create([
                'member_id' => $member->id,
                'plan_price_id' => $planPrice->id,
                'start_date' => now()->subDays(rand(1, 300)),
                'end_date' => now()->addDays(rand(1, 365)),
                'status' => 'active',
            ]);
        }
    }
}
