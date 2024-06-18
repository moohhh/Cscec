<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class demandec extends Model
{
    use HasFactory;
    protected $table = 'demandec';
protected $fillable = [
    'nom',
    'quantite',
    'user_id',
    'status',
];
}
