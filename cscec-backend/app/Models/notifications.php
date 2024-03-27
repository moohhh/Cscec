<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class notifications extends Model
{
    use HasFactory;
    use Notifiable;

    use HasFactory;

    protected $fillable = [
        'nom',
        'employé_id',
    ];

    // Définir la relation avec l'employé
    public function employé()
    {
        return $this->belongsTo(employés::class);
    }
    protected $table = 'notifications';
}
