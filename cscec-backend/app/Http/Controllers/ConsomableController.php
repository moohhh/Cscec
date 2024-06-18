<?php

namespace App\Http\Controllers;

use App\Models\Consomable;
use Illuminate\Console\View\Components\Alert;
use Illuminate\Http\Request;

class ConsomableController extends Controller
{
    public function addConsomable(Request $request)
    {
        $Consomable = new Consomable;
        $Consomable->nom = $request->input('nom');
        $Consomable->quantite = $request->input('quantite');
        $Consomable->save(); // N'oubliez pas de sauvegarder le nouvel utilisateur
        return "Consomable ajouter";
    }

    public function changequantite(Request $request, $id)
    {
        $Consomable = Consomable::find($id);
        $Consomable->quantite = $request->input('quantite');
        $Consomable->save();
    }
    public function removeConsomable($id)
    {
        $Consomable = Consomable::find($id);
        $Consomable->delete();
    }
    public function showConsomables()
    {
        $Consomables = Consomable::all();
        return response($Consomables);
    }
    public function showbyname($nom)
    {
        $Consomables = Consomable::where('nom', 'like', '%' . $nom . '%')->get();
        return response($Consomables);
    }

}
