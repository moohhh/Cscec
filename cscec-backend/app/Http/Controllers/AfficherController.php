<?php

namespace App\Http\Controllers;

use App\Models\publication;
use Illuminate\Http\Request;

class AfficherController extends Controller
{
    public function afficherTable()
    {
        // Retrieve data from the database in reverse order
        $donnees = publication::orderBy('id', 'desc')->get();
        return response()->json($donnees);
    }
}
