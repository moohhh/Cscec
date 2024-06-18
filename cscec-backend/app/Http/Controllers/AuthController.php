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
    // Validate incoming data
    $validatedData = $request->validate([
        'nom' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:employés,email',
        'password' => 'required|string|min:6',
        'grade' => 'required|string|max:255',
        'mp_status' => 'required|string|max:255',
    ]);

    try {
        // Create new employee record
        $employé = new employés();
        $employé->nom = $validatedData['nom'];
        $employé->email = $validatedData['email'];
        $employé->password = Hash::make($validatedData['password']);
        $employé->grade = $validatedData['grade'];
        $employé->mp_status = $validatedData['mp_status'];
        $employé->save();

        return response()->json(['message' => 'Employee created successfully'], 201);
    } catch (\Exception $e) {
        // Log the error for debugging
        Log::error('Error creating employee: ' . $e->getMessage());
        
        // Return error response
        return response()->json(['message' => 'Failed to create employee. Please try again.'], 500);
    }
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
        if (!Hash::check($password, $employé->password)) {
            return response()->json(["message" => "Mot de passe incorrect"], 401);
        }
        

        // Mettre à jour les informations de l'utilisateur dans la base de données avec les nouvelles informations de connexion
        $employé->nom = $nom;
        $employé->email = $email;
        // Mettre à jour d'autres informations si nécessaire
        $employé->save();
        if($employé->mp_status == "0"){
            $newpassword = rand(100000, 999999);

            $employé->password = Hash::make($newpassword);
            $employé->mp_status = "1";
            $employé->save();

        }
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

        if (!$employéInfo) {
            return response()->json(["message" => "Employé non trouvé dans la base de données"], 404);
        }

        return response()->json([
            'message' => 'Informations de l\'employé récupérées avec succès',
            'nom' => $employéInfo->nom,
            'email' => $employéInfo->email,
            'grade' => $employéInfo->grade,
            'mp_status' => $employéInfo->mp_status,
            'id' => $employéInfo->id
        ]);
    }
    public function modifiermotdepasse(Request $request){
        $nom = $request->input('nom');
        $email = $request->input('email');
        $newpassword = $request->input('newpassword');
    
        $employé = employés::where('nom', $nom)
            ->where('email', $email)
            ->first();
    
        if (!$employé) {
            return response()->json(["message" => "Employé non enregistré"], 404);
        }   
    
        if ($newpassword === null) {
            return response()->json(["message" => "Mot de passe invalide"], 401);
        } 
        elseif (strlen($newpassword) < 6) {
            return response()->json(["message" => "Le mot de passe doit contenir au moins 6 caractères."], 401);
        }
        elseif (Hash::check($newpassword, $employé->password)) {
            return response()->json(["message" => "Ce mot de passe est identique à l'ancien mot de passe."], 401);
        }
        
        else {
            $employé->password = Hash::make($newpassword);
            $employé->mp_status = "2";
            $employé->save();
            return response()->json(["message" => "Mot de passe modifié avec succès."], 200);
        }
    }
    
    public function modifieremployé(Request $request){
        $nom = $request->input('nom');
        $email = $request->input('email');
        $newpassword = $request->input('newpassword');
        $newgrade = $request->input('grade');
        $employé = employés::where('nom', $nom)
            ->where('email', $email)
            ->first();
        if (!$employé) {
            return response()->json(["message" => "Employé non enregistré"], 404);
        }   
        $employé->password = Hash::make($newpassword);
        $employé->grade = $newgrade;
        $employé->email = $email;
        $employé->nom = $nom;
        $employé->save();
    }
    public function suprimeremployé(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|integer',
        ]);

        try {
            $doc = employés::findOrFail($validated['id']);
            $doc->delete();
            return response()->json(['message' => 'Document supprimer avec succès ']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred'], 500);
        }
    }    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(["message" => "Deconnexion spécie avec succès"], 200);
    }
    
}
