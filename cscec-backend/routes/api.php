<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AfficherController;
use App\Http\Controllers\ChaffeurController;
use App\Http\Controllers\documantationExternController;
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
Route::post('/getInfo', [AuthController::class, 'getInfo']);
Route::get('/afficherTable', [AfficherController::class, 'afficherTable']);
Route::post('/demande', [NotifController::class, 'demande']);
Route::get('/show', [NotifController::class, 'show']);
Route::post('/validation', [NotifController::class, 'validation']);
Route::post('/verification', [NotifController::class, 'verification']);
Route::get('/annulerDemande', [NotifController::class, 'annulerDemande']);
Route::post('/demandechaffeur', [ChaffeurController::class, 'demandechaffeur']);
Route::get('/afficher', [DocumantationExternController::class, 'afficher']);
Route::post('/supprimer', [DocumantationExternController::class, 'supprimer']);
Route::post('/ajouter', [DocumantationExternController::class, 'ajouter']);
Route::get('/downloadFile', [documantationExternController::class, 'downloadFile']);
Route::post('/downloadFile2', [documantationExternController::class, 'downloadFile2']);
