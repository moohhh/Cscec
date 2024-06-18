<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\projet;
class ProjetController extends Controller
{
    public function ajouterprojet(Request $request)
    {
        // Validation rules
        $validated = $request->validate([
            'titre' => 'required|string',
            'description' => 'required|string',
            'lien_photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        $imagePath = $request->file('lien_photo')->store('images', 'public');

        $projet = new projet();
        $projet->titre =$validated['titre'];
        $projet->description = $validated['description'];
        $projet->lien_photo = url('storage/' . $imagePath);
        $projet->save();
        return response()->json(['message' => 'Pojet ajoute avec succes']);
    }
  
public function supprimerProjet(Request $request)
{
    $validated = $request->validate([
        'id' => 'required|integer',
    ]);

    try {
        $projet = Projet::findOrFail($validated['id']);
        $projet->delete();
        return response()->json(['message' => 'Project supprime avec succes.'], 200);
    } catch (\Exception $e) {
        Log::error('Error deleting project: ' . $e->getMessage());
        return response()->json(['message' => 'Erreur suppression du projet.'], 500);
    }
}

public function afficherprojet()
{
    // Retrieve data from the database in reverse order
    $donnees = Projet::orderBy('id', 'desc')->get();
    return response()->json($donnees);

}
}