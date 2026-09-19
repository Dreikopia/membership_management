<?php

namespace App\Enums;

enum MemberStatus: string
{
    case ACTIVE = 'active';
    case EXPIRED = 'expired';
    case EXPIRING = 'expiring';
    case SUSPENDED = 'suspended';
    case INACTIVE = 'inactive';

    public function label()
    {
        return match ($this) {
            self::ACTIVE => 'Active',
            self::EXPIRED => 'Expired',
            self::EXPIRING => 'Expiring',
            self::SUSPENDED => 'Suspended',
            self::INACTIVE => 'Inactive',
        };
    }
}
