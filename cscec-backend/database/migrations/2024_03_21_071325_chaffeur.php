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
        Schema::create('chauffeurs', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->unsignedBigInteger('employe_id'); // Consider using snake_case for consistency
            $table->foreign('employe_id')->references('id')->on('employes')->onDelete('cascade'); // The related table should be 'employes' in snake_case
            $table->date('date'); // Use date type if you only need to store the date
            $table->time('heure'); // Use time type if you only need to store the time
            $table->string('depart');
            $table->string('destination');
            $table->string('telephone');
            $table->string('type');
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chaffeur');
    }
};
