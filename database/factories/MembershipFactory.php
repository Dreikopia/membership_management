<?php

namespace Database\Factories;

use App\Models\Member;
use App\Models\Membership;
use App\Models\Plan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Membership>
 */
class MembershipFactory extends Factory
{
    protected $model = Membership::class;

    public function definition(): array
    {
        $plan = Plan::inRandomOrder()->first();

        $startDate = fake()->dateTimeBetween('-6 months', 'today');

        return [
            'member_id' => Member::factory(),
            'plan_id' => $plan->id,
            'start_date' => $startDate,
            'end_date' => fake()
                ->dateTimeBetween($startDate, $startDate)
                ->modify("+{$plan->duration_days} days"),
            'status' => 'active',
        ];
    }
}
