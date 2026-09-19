<?php

namespace Database\Seeders;

use App\Models\Member;
use App\Models\PlanPrice;
use App\Models\User;
use Illuminate\Database\Seeder;

class MemberSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::firstOrFail();

        $planPrices = PlanPrice::all();

        $members = Member::factory()
            ->count(25)
            ->create([
                'user_id' => $user->id,
            ]);

        foreach ($members as $member) {
            $planPrice = $planPrices->random();

            $member->memberships()->create([
                'plan_price_id' => $planPrice->id,
                'start_date' => now()->subDays(rand(1, 300)),
                'end_date' => now()->addDays($planPrice->duration_days),
                'status' => 'active',
            ]);
        }
    }
}
