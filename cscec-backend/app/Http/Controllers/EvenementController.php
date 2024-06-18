<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Evenement;
class EvenementController extends Controller
{

    public function ajouterevenement(Request $request)
    {
        // Validation rules
        $validated = $request->validate([
            'titre' => 'required|string',
            'description' => 'required|string',
            'lien_photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        $imagePath = $request->file('lien_photo')->store('images', 'public');

        $evenement = new evenement();
        $evenement->titre =$validated['titre'];
        $evenement->description = $validated['description'];
        $evenement->lien_photo = url('storage/' . $imagePath);
        $evenement->save();
        return response()->json(['message' => 'Evenement ajouté avec succès']);
    }
    public function supprimerevenment(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|integer',
        ]);
    
        try {
            $projet = evenement::findOrFail($validated['id']);
            $projet->delete();
            return response()->json(['message' => ' Evenement supprime avec succès.'], 200);
        } catch (\Exception $e) {
            Log::error('Error deleting evenement: ' . $e->getMessage());
            return response()->json(['message' => 'erreur suppression evenement.'], 500);
        }
    }
public function afficherevenement()
{
    // Retrieve data from the database in reverse order
    $donnees = Evenement::orderBy('id', 'desc')->get();
    return response()->json($donnees);
}
}