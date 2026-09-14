<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    public function run(): void
    {
        Plan::create([
            'name' => 'Monthly',
            'description' => '30-day gym membership.',
            'price' => 500,
            'duration_days' => 30,
        ]);

        Plan::create([
            'name' => 'Quarterly',
            'description' => '90-day gym membership.',
            'price' => 1300,
            'duration_days' => 90,
        ]);

        Plan::create([
            'name' => 'Semi-Annual',
            'description' => '180-day gym membership.',
            'price' => 2400,
            'duration_days' => 180,
        ]);

        Plan::create([
            'name' => 'Annual',
            'description' => '365-day gym membership.',
            'price' => 4500,
            'duration_days' => 365,
        ]);
    }
}
