<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    public function run(): void
    {
        Plan::create([
            'name' => 'Basic',
            'description' => 'Standard membership plan.',
            'status' => 'active',
        ]);

        Plan::create([
            'name' => 'Premium',
            'description' => 'Enhanced membership plan.',
            'status' => 'active',
        ]);

        Plan::create([
            'name' => 'VIP',
            'description' => 'Exclusive membership plan.',
            'status' => 'active',
        ]);
    }
}
