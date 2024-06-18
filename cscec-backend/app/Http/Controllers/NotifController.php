<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\employés;
use App\Models\notifications;
use Illuminate\Http\Request;
use App\Notifications\demandeNotification;
use SebastianBergmann\Environment\Console;
use App\Models\Employee;
use App\Models\Notification;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class NotifController extends Controller
{



    public function demande(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'employe_id' => 'required|integer',
            'title' => 'required|string',
            'description' => 'required|string',
        ]);

        // Verify if the Employee exists
        $employe = employés::find($request->employe_id); // Make sure the model name matches your actual model, potentially 'Employé'
        if (!$employe) {
            return response()->json(['message' => 'Employé not found'], 404);
        }

        // Create a new notification
        $demande = new notifications(); // Assuming your model name is Notification
        $demande->title = $request->title;
        $demande->description = $request->description;
        $demande->employé_id = $employe->id;
        $demande->nom = $employe->nom;
        $demande->save();

        return response()->json(['message' => 'Demande created successfully!', 'demande' => $demande], 201);
    }


    public function verification(Request $request)
    {
        $day = $request->query('day');
        $hour = $request->query('hour');

        $notification = notifications::where('data->day', $day)
            ->where('data->hour', $hour)
            ->first();

        if ($notification) {
            $notifiableId = $notification->notifiable_id;
            return response()->json(['notifiable_id' => $notifiableId], 200);
        } else {
            return response()->json(['error' => 'Notification not found for the given day and hour'], 404);
        }
    }



    public function annulerDemande(Request $request)
    {
        // Valider la requête
        $request->validate([
            'nom' => 'required|string',
            'description' => 'required|string',
        ]);
    
        try {
            // Extraire les données de la requête
            $nom = $request->input('nom');
            $description = $request->input('description');
    
            // Trouver la notification associée au nom et à la description spécifiés
            $notification = notifications::where('nom', $nom)
                ->where('description', $description);
    
            // Supprimer la notification
            $notification->delete();
    
            return response()->json(['success' => true, 'message' => 'Notification annulée avec succès']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['success' => false, 'message' => 'Notification non trouvée'], 404);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }
    public function annulerDemandebyid(Request $request)
    {
    
            $validated = $request->validate([
                'id' => 'required|integer',
            ]);
    
            try {
                $doc = notifications::findOrFail($validated['id']);
                $doc->delete();
                return response()->json(['message' => 'demande supprimer avec succès ']);
            } catch (\Exception $e) {
                return response()->json(['message' => 'An error occurred'], 500);
            }
    }
    public function show(Request $request)
    {
        // Récupérer l'identifiant de l'employé de la requête
        $employe_id = $request->input('employe_id');
    
        // Vérifier si l'employé existe
        $employe = employés::find($employe_id);
        if (!$employe) {
            return response()->json(['message' => 'Employé not found'], 404);
        }
    
        // Récupérer toutes les notifications de l'employé
        $notifications = notifications::where('employé_id', $employe_id)
                                        ->orderBy('created_at', 'desc')
                                        ->get();
    
        // Formatter les notifications en utilisant les colonnes réelles de la table
        $formattedNotifications = $notifications->map(function ($notification) {
            return [
                'id' => $notification->id,
                'title' => $notification->title,
                'description' => $notification->description,
                'created_at' => $notification->created_at->toIso8601String(),
                'employé_id' => $notification->employé_id,
                'nom' => $notification->nom, // Ajoutez le nom de l'employé
            ];
        });
    
        // Renvoyer la réponse en JSON
        return response()->json($formattedNotifications);
    }
    
}
