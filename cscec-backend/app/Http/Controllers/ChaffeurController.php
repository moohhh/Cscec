<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\chaffeur;
use App\Models\employés;

class ChaffeurController extends Controller
{
    public function demandechaffeur(Request $request)
    {
        try {

            $validated = $request->validate([
                'employé_id' => 'required|integer',
                'date' => 'required|date', // To validate a date
                'heure' => 'required|date_format:H:i', // To validate a time in 24-hour format
                'destination' => 'required|string', // Corrected the typo
                'depart' => 'required|string',
                'type' => 'required|string',
                'telephone' => 'required|string', // Assuming you want to validate telephone
            ]);

            // Make sure the model name matches your actual model, potentially 'Employe'
            $employe = employés::find($request->employé_id); // Corrected the model name
            if (!$employe) {
                return response()->json(['message' => 'Employé not found'], 404);
            }

            // Again, make sure this matches the actual model name, potentially 'Chauffeur'
            $demandeChauffeur = new chaffeur(); // Corrected the model name
            $demandeChauffeur->date = $request->date;
            $demandeChauffeur->heure = $request->heure;
            $demandeChauffeur->destination = $request->destination; // Corrected the typo
            $demandeChauffeur->depart = $request->depart;
            $demandeChauffeur->type = $request->type;
            $demandeChauffeur->telephone = $request->telephone;
            $demandeChauffeur->employé_id = $employe->id;
            $demandeChauffeur->nom = $employe->nom;
            $demandeChauffeur->save();

            return response()->json(['message' => 'Demande created successfully!', 'demande' => $demandeChauffeur], 201);
            // Existing code to create the demande chauffeur
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create demande.', 'error' => $e->getMessage()], 500);
        }
    }
    public function enregistrerdemande(Request $request)
    {
        try {

            $validated = $request->validate([
                'employé_id' => 'required|integer',
                'date' => 'required|date', // To validate a date
                'heure' => 'required|date_format:H:i', // To validate a time in 24-hour format
                'destination' => 'required|string', // Corrected the typo
                'depart' => 'required|string',
                'type' => 'required|string',
                'telephone' => 'required|string', // Assuming you want to validate telephone
            ]);

            // Make sure the model name matches your actual model, potentially 'Employe'
            $employe = employés::find($request->employé_id); // Corrected the model name
            if (!$employe) {
                return response()->json(['message' => 'Employé not found'], 404);
            }

            // Again, make sure this matches the actual model name, potentially 'Chauffeur'
            $demandeChauffeur = new chaffeur(); // Corrected the model name
            $demandeChauffeur->date = $request->date;
            $demandeChauffeur->heure = $request->heure;
            $demandeChauffeur->destination = $request->destination; // Corrected the typo
            $demandeChauffeur->depart = $request->depart;
            $demandeChauffeur->type = $request->type;
            $demandeChauffeur->telephone = $request->telephone;
            $demandeChauffeur->employé_id = $employe->id;
            $demandeChauffeur->nom = $employe->nom;
            $demandeChauffeur->save();

            return response()->json(['message' => 'Demande created successfully!', 'demande' => $demandeChauffeur], 201);
            // Existing code to create the demande chauffeur
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create demande.', 'error' => $e->getMessage()], 500);
        }
    }
}
