<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AfficherController;
use App\Http\Controllers\NotifController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/





Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/enregistrer', [AuthController::class, 'enregistrer']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/afficherTable', [AfficherController::class, 'afficherTable']);
Route::post('/demande', [NotifController::class, 'demande']);
Route::get('/show', [NotifController::class, 'show']);
Route::post('/validation', [NotifController::class, 'validation']);
Route::post('/verification', [NotifController::class, 'verification']);
Route::post('/annulerDemande', [NotifController::class, 'annulerDemande']);
