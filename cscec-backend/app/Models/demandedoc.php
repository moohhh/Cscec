<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class demandedoc extends Model
{
    use HasFactory;
    protected $table = "demandedoc";
    protected $fillable = [
        'user_id',
        'nom',
        'Message',
        'emp_id',
    ];
}
