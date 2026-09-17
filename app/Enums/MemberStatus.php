<?php

namespace App\Enums;

enum MemberStatus: string
{
    case ACTIVE = 'active';
    case INACTIVE = 'inactive';
    case EXPIRED = 'expired';
    case SUSPENDED = 'suspended';

    public function label()
    {
        return match ($this) {
            self::ACTIVE => 'Active',
            self::INACTIVE => 'Inactive',
            self::EXPIRED => 'Expired',
            self::SUSPENDED => 'Suspended',
        };
    }
}
