<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;

use App\Models\documantationextern;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;

class documantationExternController extends Controller
{
    function afficher()
    {
        // Récupérer les données de la table documantationextern et les trier par date de création décroissante
        $documantationextern = documantationextern::orderBy('created_at', 'desc')->get();

        // Formatter les données récupérées
        $formattedData = $documantationextern->map(function ($doc) {
            return [
                'id' => $doc->id,
                'tag' => $doc->tag,
                'type' => $doc->type,
                'lien_photo' => $doc->lien_photo,
                'lien_telechargement' => $doc->lien_telechargement,
                'author' => $doc->author,
                'nom' => $doc->nom, // Supposons que 'nom' est un attribut de votre modèle documantationextern
            ];
        });

        // Renvoyer les données formatées en tant que réponse JSON
        return response()->json($formattedData);
    }
    public function supprimer(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|integer',
        ]);

        try {
            $doc = documantationextern::findOrFail($validated['id']);
            $doc->delete();
            return response()->json(['message' => 'Document deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred'], 500);
        }
    }

    public function ajouter(Request $request)
    {
        // Validation rules
        $validated = $request->validate([
            'nom' => 'required|string',
            'author' => 'required|string',
            'tag' => 'required|string',
            'type' => 'required|string',
            'lien_photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'lien_telechargement' => 'required|file|mimes:pdf|max:20048',
        ]);

        // Store the image in the 'public/images' directory and get the path
        $imagePath = $request->file('lien_photo')->store('images', 'public');
        // Store the file in the 'public/files' directory and get the path
        $filePath = $request->file('lien_telechargement')->store('files', 'public');

        // Instantiate the model
        $doc = new documantationextern(); // Ensure correct spelling and namespace

        // Assign validated data to the model's properties
        $doc->nom = $validated['nom'];
        $doc->author = $validated['author'];
        $doc->tag = $validated['tag'];
        $doc->type = $validated['type'];

        // Save the path of the image and file
        // Ensure 'public/storage' is symlinked to 'storage/app/public'
        $doc->lien_photo = url('storage/' . $imagePath);
        $doc->lien_telechargement = url('storage/' . $filePath);

        // Save the document to the database
        $doc->save();

        // Return a successful response
        return response()->json(['message' => 'Document added successfully']);
    }

    public function downloadFile($filePath)
    {
        if (Storage::disk('public')->exists($filePath)) {
            $fileContents = Storage::disk('public')->get($filePath);
            $mimeType = Storage::disk('public');

            return Response::make($fileContents, 200, [
                'Content-Type' => $mimeType,
                'Content-Disposition' => 'attachment; filename="' . basename($filePath) . '"'
            ]);
        } else {
            return response()->json(['message' => 'File not found.'], 404);
        }
    }
    public function downloadFile2($filename)
    {
        $file = storage_path("app/public/{$filename}");

        if (file_exists($file)) {
            return response()->file($file, [
                'Access-Control-Allow-Origin' => '*', // Adjust as necessary
                'Content-Type' => 'application/pdf',
            ]);
        }

        return response()->json(['message' => 'File not found.'], 404);
    }
}
