<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\demandedoc;

class demandedocController extends Controller
{
    public function adddemande(Request $request)
    {
        try {
            $demande = new demandedoc([
                'user_id' => $request->input('user_id'), // Assuming 'user_id' is sent from the frontend
                'nom' => $request->input('nom'),
                'Message' => $request->input('message'), // Use 'message' instead of 'Message' to match frontend data
            ]);
            $demande->save();
    
            return response()->json(['message' => 'Demande document created successfully', 'demande' => $demande], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create demande document', 'error' => $e->getMessage()], 500);
        }
    }
    
    public function getdemande()
    {
        $demandes = demandedoc::all();
        return response($demandes);
    }
    public function deletedemande($id)
    {
        $demande = demandedoc::find($id);
        $demande->delete();
    }
    public function getdemandebyid($id)
    {
        $demande = demandedoc::find($id);
        return response($demande);
    }
}
