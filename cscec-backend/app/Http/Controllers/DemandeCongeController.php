<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DemandeConge;

class DemandeCongeController extends Controller
{
    public function addDemandeConge(Request $request)
    {
        $demande = new DemandeConge([
            'date_debut' => $request->input('date_debut'),
            'date_fin' => $request->input('date_fin'),
            'nombre_jours' => $request->input('nombre_jours'),
            'user_id' => $request->input('user_id'),
            'type_conge' => $request->input('type_conge')

        ]);

        $demande->save();

        return response()->json(['message' => 'Demande created successfully'], 201);
    }

    public function getDemandeConge()
    {
        $demandes = DemandeConge::all();
        return response()->json($demandes);
    }

    public function getDemandeCongeById($id)
    {
        $demande = DemandeConge::find($id);
        return response()->json($demande);
    }

    public function deleteDemandeConge($id)
    {
        $demande = DemandeConge::find($id);
        if ($demande) {
            $demande->delete();
            return response()->json(['message' => 'Demande deleted successfully']);
        }
        return response()->json(['message' => 'Demande not found'], 404);
    }

    public function validateById($id)
    {
        $demande = DemandeConge::find($id);
        if ($demande) {
            $demande->status = 1; // Assuming there is a status field in the table
            $demande->save();
            return response()->json(['message' => 'Demande validated successfully']);
        }
        return response()->json(['message' => 'Demande not found'], 404);
    }
}
