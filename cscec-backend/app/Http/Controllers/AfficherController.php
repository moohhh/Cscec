<?php

namespace App\Http\Controllers;

use App\Models\publication;
use Illuminate\Http\Request;
use App\Models\projet;
use App\Models\evenement;
use App\Models\employés;
class AfficherController extends Controller
{
    public function afficherTableprojet()
    {
        // Retrieve data from the database in reverse order
        $donnees = projet::orderBy('id', 'desc')->get();
        return response()->json($donnees);

    }
    public function afficherTableevenemet()
    {
        // Retrieve data from the database in reverse order
        $donnees = evenement::orderBy('id', 'desc')->get();
        return response()->json($donnees);

    }
    public function afficherlisteemployés(){
        // Retrieve data from the database
        $donnees = employés::all();
        return response()->json($donnees); 
    }
    
}

