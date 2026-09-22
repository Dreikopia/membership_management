<?php

namespace App\Models;

use App\Enums\MemberStatus;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
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
        'date_of_birth',
        'status',
    ];

    protected $casts = [
        'status' => MemberStatus::class,
    ];

    protected $attributes = [
        'status' => MemberStatus::ACTIVE->value,
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function memberships()
    {
        return $this->hasMany(Membership::class);
    }

    /**
     * Scope the query to members matching the given search term.
     *
     * The term is escaped so that the LIKE wildcards `%` and `_` are matched
     * literally rather than interpreted by MySQL.
     */
    #[Scope]
    protected function search(Builder $query, string $term): Builder
    {
        $escaped = addcslashes($term, '%_\\');

        return $query->where(function (Builder $query) use ($escaped) {
            $query->where('first_name', 'like', "%{$escaped}%")
                ->orWhere('last_name', 'like', "%{$escaped}%")
                ->orWhere('email', 'like', "%{$escaped}%")
                ->orWhere('phone', 'like', "%{$escaped}%");
        });
    }
}
