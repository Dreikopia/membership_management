<?php

namespace Database\Seeders;

use App\Enums\BillingPeriod;
use App\Models\Plan;
use App\Models\PlanPrice;
use Illuminate\Database\Seeder;

class PlanPriceSeeder extends Seeder
{
    public function run(): void
    {
        $plans = Plan::all();

        $prices = [
            'Basic' => [
                BillingPeriod::MONTHLY->value => [500, 30],
                BillingPeriod::QUARTERLY->value => [1300, 90],
                BillingPeriod::SEMI_ANNUAL->value => [2400, 180],
                BillingPeriod::ANNUAL->value => [4500, 365],
            ],

            'Premium' => [
                BillingPeriod::MONTHLY->value => [700, 30],
                BillingPeriod::QUARTERLY->value => [1900, 90],
                BillingPeriod::SEMI_ANNUAL->value => [3500, 180],
                BillingPeriod::ANNUAL->value => [6500, 365],
            ],

            'VIP' => [
                BillingPeriod::MONTHLY->value => [1000, 30],
                BillingPeriod::QUARTERLY->value => [2800, 90],
                BillingPeriod::SEMI_ANNUAL->value => [5000, 180],
                BillingPeriod::ANNUAL->value => [9000, 365],
            ],
        ];

        foreach ($plans as $plan) {
            foreach ($prices[$plan->name] as $period => [$price, $duration]) {
                PlanPrice::create([
                    'plan_id' => $plan->id,
                    'billing_period' => $period,
                    'price' => $price,
                    'duration_days' => $duration,
                ]);
            }
        }
    }
}
