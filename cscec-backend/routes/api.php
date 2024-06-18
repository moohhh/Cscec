<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AfficherController;
use App\Http\Controllers\ChaffeurController;
use App\Http\Controllers\documantationExternController;
use App\Http\Controllers\NotifController;
use App\Http\Controllers\ProjetController;
use App\Http\Controllers\EvenementController;
use App\Http\Controllers\ConsomableController;
use App\Http\Controllers\demandedocController;
use App\Http\Controllers\demandehController;
use App\Http\Controllers\DemandeCongeController;
use App\Http\Controllers\demandeCController;
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
Route::post('/enregistrer', [AuthController::class, 'enregistrer']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/getInfo', [AuthController::class, 'getInfo']);
Route::get('/afficherTableprojet', [AfficherController::class, 'afficherTableprojet']);
Route::get('/afficherTableevenemet', [AfficherController::class, 'afficherTableevenemet']);
Route::post('/demande', [NotifController::class, 'demande']);
Route::get('/show', [NotifController::class, 'show']);
Route::post('/validation', [NotifController::class, 'validation']);
Route::post('/verification', [NotifController::class, 'verification']);
Route::post('/annulerDemande', [NotifController::class, 'annulerDemande']);
Route::post('/demandechaffeur', [ChaffeurController::class, 'demandechaffeur']);
Route::get('/afficher', [DocumantationExternController::class, 'afficher']);
Route::post('/supprimer', [DocumantationExternController::class, 'supprimer']);
Route::post('/ajouter', [DocumantationExternController::class, 'ajouter']);
Route::get('/downloadFile', [documantationExternController::class, 'downloadFile']);
Route::post('/downloadFile2', [documantationExternController::class, 'downloadFile2']);
Route::get('/ajouterevenment', [EvenementController::class, 'ajouterevenment']);
Route::post('/ajouterprojet', [ProjetController::class, 'ajouterprojet']);
Route::post('/ajouterevenement',[EvenementController::class,'ajouterevenement']);
Route::post('/supprimerprojet', [ProjetController::class, 'supprimerprojet']);
Route::post('/supprimerevenment', [EvenementController::class, 'supprimerevenment']);
Route::post('/modifiermotdepasse', [AuthController::class, 'modifiermotdepasse']);
Route::post('/afficherlisteemployés', [AfficherController::class, 'afficherlisteemployés']);
Route::post('/modifieremployé', [AuthController::class, 'modifieremployé']);
Route::post('/suprimeremployé', [AuthController::class, 'suprimeremployé']);
Route::post('/annulerDemandebyid', [NotifController::class, 'annulerDemandebyid']);

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
Route::get('/showbyname/{nom}', [ConsomableController::class, 'showbyname']);
Route::post('/addConsomable', [ConsomableController::class, 'addConsomable']);
Route::put('/changequantite/{id}', [ConsomableController::class, 'changequantite']);
Route::delete('/removeConsomable/{id}', [ConsomableController::class, 'removeConsomable']);
Route::get('/showConsomables', [ConsomableController::class, 'showConsomables']);
Route::get('/adddemande', [demandedocController::class, 'adddemande']);
Route::get('/getdemande', [demandedocController::class, 'getdemande']);
Route::get('/getdemandebyid/{id}', [demandedocController::class, 'getdemandebyid']);
Route::put('/deletedemande/{id}', [demandedocController::class, 'deletedemande']);
Route::post('/addDemandeHeur', [demandehController::class, 'addDemandeHeur']);
Route::get('/getDemandeHeur', [demandehController::class, 'getDemandeHeur']);
Route::get('/getDemandeHeurById/{id}', [demandehController::class, 'getDemandeHeurById']);
Route::delete('/deleteDemandeHeur/{id}', [demandehController::class, 'deleteDemandeHeur']);
Route::put('/validateById/{id}', [demandehController::class, 'validateById']);
Route::post('/addDemandeConge', [DemandeCongeController::class, 'addDemandeConge']);
Route::post('/getDemandeConge', [DemandeCongeController::class, 'getDemandeConge']);
Route::get('/getDemandeCongeById/{id}', [DemandeCongeController::class, 'getDemandeCongeById']);
Route::delete('/deleteDemandeConge/{id}', [DemandeCongeController::class, 'deleteDemandeConge']);
Route::put('/validateById/{id}', [DemandeCongeController::class, 'validateById']);
Route::get('/adddemandec', [demandeCController::class, 'adddemandec']);

