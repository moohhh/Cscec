<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class demandeh extends Model
{
    use HasFactory;
    protected $table = 'demandeh';
    protected $fillable = [
        'date',
        'hours',
        'description',
        'user_id',
        'status',
    ];
}
