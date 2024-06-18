<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DemandeConge extends Model
{
    use HasFactory;
    protected $fillable = [
        'date_debut',
        'date_fin',
        'nombre_jours',
        'user_id',
        'supp_id',
        'type_conge'
    ];
}
