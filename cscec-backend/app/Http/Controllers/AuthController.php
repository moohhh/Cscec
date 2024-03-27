<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User; // Utilisez "Models" au lieu de "Controllers" pour User
use Illuminate\Support\Facades\Hash;
use Symfony\Component\Console\Input\Input;
use App\Models\employés;


use function Laravel\Prompts\password;

class AuthController extends Controller
{
    public function enregistrer(Request $request)
    {
        $user = employés::create([
            "email" => $request->input("email"),
            "password" => Hash::make($request->input("password"))
        ]);
    }
    public function login(Request $request)
    {
        $nom = $request->input('nom');
        $email = $request->input('email');
        $password = $request->input('password');

        // Rechercher l'employé dans la base de données
        $employé = employés::where('email', $email)->where('nom', $nom)->first();

        if (!$employé) {
            return response()->json(["message" => "Employé non enregistré"], 404);
        }

        // Vérifier le mot de passe
        if (!($password == $employé->password)) {
            return response()->json(["message" => "Mot de passe incorrect"], 401);
        }

        // Mettre à jour les informations de l'utilisateur dans la base de données avec les nouvelles informations de connexion
        $employé->nom = $nom;
        $employé->email = $email;
        // Mettre à jour d'autres informations si nécessaire
        $employé->save();

        // Générer le jeton
        $token = $employé->createToken('auth_token')->plainTextToken;

        return response()->json([
            "message" => "Connexion réussie",
            'employé' => $employé,
            'token' => $token,
        ]);
    }
    public function getInfo(Request $request)
    {
        // Récupérer l'employé authentifié à partir du token d'authentification
        $nom = $request->input('nom');
        $email = $request->input('email');

        // Rechercher l'employé dans la base de données
        $employéInfo = employés::where('nom', $nom)
            ->where('email', $email)
            ->first();

        // Vérifier si l'employé a été trouvé
        if (!$employéInfo) {
            return response()->json(["message" => "Employé non trouvé dans la base de données"], 404);
        }

        // Retourner les informations de l'employé
        return response()->json([
            'message' => 'Informations de l\'employé récupérées avec succès',
            'nom' => $employéInfo->nom,
            'email' => $employéInfo->email,
            'id' => $employéInfo->id
            // Ajoutez d'autres informations selon vos besoi'
        ]);
    }
}
