<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PlanFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement([
                'Monthly',
                'Quarterly',
                'Semi-Annual',
                'Annual',
            ]),

            'description' => fake()->sentence(),

            'price' => fake()->randomElement([
                500,
                1300,
                2400,
                4500,
            ]),

            'duration_days' => fake()->randomElement([
                30,
                90,
                180,
                365,
            ]),
        ];
    }
}
