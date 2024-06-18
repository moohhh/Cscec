<?php

namespace App\Http\Controllers;

use App\Models\demandec;
use App\Models\Consomable;
use Illuminate\Http\Request;

class demandeCController extends Controller
{
    public function adddemandeC(Request $request)
    {

        $demande = new demandec([
            'nom' => $request->input('nom'),
            'quantite' => $request->input('quantite'),
            'user_id' => $request->input('user_id'),
            'status' => $request->input('status'),
        ]);
        $demande->save();
    }

    public function getdemandeC()
    {
        $demandes = demandec::all();
        return response($demandes);
    }

    public function deletedemandeC($id)
    {

        $demande = demandec::find($id);
        $demande->delete();
    }
    public function getdemandecbyid($id)
    {
        $demande = demandec::find($id);
        return response($demande);
    }
    public function validatebyid($id)
    {

        $demande = demandec::find($id);
        $demande->status = 1;
        $demande->save();
    }
}