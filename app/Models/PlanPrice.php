<?php

namespace App\Models;

use App\Enums\BillingPeriod;
use Illuminate\Database\Eloquent\Model;

class PlanPrice extends Model
{
    protected $fillable = [
        'plan_id',
        'billing_period',
        'price',
        'duration_days',
    ];

    protected function casts(): array
    {
        return [
            'billing_period' => BillingPeriod::class,
            'price' => 'decimal:2',
        ];
    }

    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }
}
