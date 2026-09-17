<?php

namespace App\Models;

use App\Enums\MemberStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'address',
        'status',
    ];

    protected $casts = [
        'status' => MemberStatus::class,
    ];

    protected $attributes = [
        'status' => MemberStatus::ACTIVE->value,
    ];

    public function memberships()
    {
        return $this->hasMany(Membership::class);
    }
}
