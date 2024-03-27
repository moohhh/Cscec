<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('documantationextern', function (Blueprint $table) {
            $table->id();
            $table->string('nom', 255); // Name of the document
            $table->string('author', 255); // Author of the document
            $table->string('tag', 255); // Tag for categorization
            $table->string('type', 255); // Type of document, e.g., PDF, DOCX
            $table->text('lien_photo'); // Link to the photo, changed to text to accommodate potentially longer URLs
            $table->text('lien_telechargement'); // Download link, changed to text for the same reason as above
            $table->timestamps(); // Automatically managed created_at and updated_at timestamps
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documantationextern');
    }
};
