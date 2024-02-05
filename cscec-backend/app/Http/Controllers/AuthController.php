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
        $email = $request->input('email');
        $password = $request->input('password');

        // Check if the employé exists
        $employé = employés::where('email', $email)->first();

        if (!$employé) {
            return response()->json(["message" => "Employé non enregistré"], 404);
        }

        // Verify the password
        if (!Hash::check($password, $employé->password)) {
            return response()->json(["message" => "Mot de passe incorrect"], 401);
        }

        // Generate the token
        $token = $employé->createToken('auth_token')->plainTextToken;

        return response()->json([
            "message" => "succee",
            'employé' => $employé,
            'token' => $token,
        ]);
    }
}
