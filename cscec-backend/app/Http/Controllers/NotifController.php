<?php

namespace App\Http\Controllers;

use App\Models\employés;
use App\Models\Salle; // Assurez-vous d'importer le modèle de salle
use App\Notifications\demandeNotification; // Importez votre classe de notification
use Illuminate\Http\Request;
use App\Models\notifications;


class NotifController extends Controller
{
    public function demande(Request $request)
    {
        // Vérifiez les autorisations de réservation, effectuez les validations nécessaires, etc.

        // Créez une nouvelle instance de salle

        // Récupérez un employé pour envoyer la notification (vous pouvez adapter cette logique en fonction de votre application)
        $employee = employés::first(); // Récupérez un employé à partir de votre base de données

        // Envoyez la notification
        $employee->notify(new demandeNotification($employee, $request->all()));
        $donnees = notifications::orderBy('id', 'desc')->get();

        // Vous pouvez également renvoyer une réponse appropriée ou rediriger l'utilisateur vers une autre page
        return back()->with("success", "Notification sent successfully!");
    }
    public function show(Request $request)
    {
        // Récupérer un employé depuis votre base de données
        $employee = employés::first();

        // Récupérer les notifications de l'employé
        $notifications = $employee->notifications;

        // Préparez un tableau de données pour renvoyer à votre composant React
        $formattedNotifications = $notifications->map(function ($notification) {
            return [
                'id' => $notification->id,
                'data' => $notification->data,
                'created_at' => $notification->created_at,
                // Ajoutez d'autres propriétés de notification si nécessaire
            ];
        });

        // Retournez les données formatées
        return response()->json($formattedNotifications);
    }


    public function validation(Request $request)
    {
        // Récupérez les données de la demande
        $day = $request->input('day');
        $hour = $request->input('hour');
        $action = $request->input('action'); // Valider ou refuser

        // Recherchez la notification en fonction du jour et de l'heure dans la colonne data
        $notification = notifications::whereJsonContains('data->day', $day)
            ->whereJsonContains('data->hour', $hour)
            ->first();

        if (!$notification) {
            // Si la notification n'est pas trouvée, retournez une réponse appropriée avec un code d'erreur
            return response()->json(['error' => 'Notification not found'], 404);
        }

        // Mettez à jour le champ notifiable_id avec la valeur souhaitée (ici 2)
        $notification->notifiable_id = 2;

        // Sauvegardez la notification mise à jour
        $notification->save();

        // Retournez une réponse appropriée
        return response()->json(['message' => 'Notification updated successfully'], 200);
    }
    public function verification(Request $request)
    {
        // Récupérer le day et l'heure de la requête
        $day = $request->query('day');
        $hour = $request->query('hour');

        // Recherchez la notification en fonction du jour et de l'heure
        $notification = notifications::where('data->day', $day)
            ->where('data->hour', $hour)
            ->first();

        if ($notification) {
            // Récupérer le notifiable_id associé à la notification
            $notifiableId = $notification->notifiable_id;

            // Retourner le notifiable_id dans la réponse JSON
            return response()->json(['notifiable_id' => $notifiableId], 200);
        } else {
            // Si aucune notification correspondante n'est trouvée
            return response()->json(['error' => 'Notification not found for the given day and hour'], 404);
        }
    }
    public function annulerDemande(Request $request)
    {
        try {
            // Get the day and hour from the request
            $day = $request->input('day');
            $hour = $request->input('hour');

            // Find and cancel the reservation request based on day and hour
            $notification = notifications::where('data->day', $day)
                ->where('data->hour', $hour)
                ->firstOrFail();
            $notification->delete();

            // Successful response
            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            // Handle errors
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }
}
