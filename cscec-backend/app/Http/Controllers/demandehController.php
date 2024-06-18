<?php

namespace App\Http\Controllers;

use App\Models\demandeh;
use Illuminate\Http\Request;

class demandehController extends Controller
{
    public function addDemandeHeur(Request $request)
    {
        $demande = new demandeh([
            'date' => $request->input('date'),
            'hours' => $request->input('hours'),
            'description' => $request->input('description'),
            'user_id' => $request->input('user_id'),
        ]);
        $demande->save();

        return response()->json(['message' => 'Demande created successfully']);
    }

    public function getDemandeHeur()
    {
        $demandes = demandeh::all();
        return response($demandes);
    }

    public function deleteDemandeHeur($id)
    {
        $demande = demandeh::find($id);
        $demande->delete();

        return response()->json(['message' => 'Demande deleted successfully']);
    }

    public function getDemandeHeurById($id)
    {
        $demande = demandeh::find($id);
        return response($demande);
    }

    public function validateById($id)
    {
        $demande = demandeh::find($id);
        $demande->status = 1;
        $demande->save();
        return response()->json(['message' => 'Demande validated successfully']);
    }
}
