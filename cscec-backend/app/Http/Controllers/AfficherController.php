<?php

namespace App\Http\Controllers;

use App\Models\publication;
use Illuminate\Http\Request;

class AfficherController extends Controller
{
    public function afficherTable()
    {
        $donnees = publication::all();
        return response()->json($donnees);
    }
}
