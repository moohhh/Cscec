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
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('title');
            $table->text('description');
            $table->unsignedBigInteger('employé_id'); // Reference to employés table
            $table->foreign('employé_id')->references('id')->on('employés'); // Assuming 'id' is the primary key in 'employés'
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
