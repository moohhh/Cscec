<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('demandeh', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->integer('hours');
            $table->text('description');
            $table->integer('user_id')->unsigned();
            $table->boolean('status')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('demandeh');
    }
};