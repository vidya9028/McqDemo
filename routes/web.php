<?php

use App\Http\Controllers\Auth\RedirectAuthenticatedUsersController;
use App\Http\Controllers\McqController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::group(['middleware' => 'auth'], function () {
    Route::inertia('/dashboard', 'Dashboard')->name('dashboard');
    Route::get("/redirectAuthenticatedUsers", [RedirectAuthenticatedUsersController::class, "home"]);
    Route::group(['middleware' => 'isAdmin:admin'], function () {
        Route::inertia('/adminDashboard', 'AdminDashboard')->name('adminDashboard');
        Route::get("getMcqData",[McqController::class, "getMcqData"])->name('getMcqData');
    });
    
    Route::inertia('/userDashboard', 'UserDashboard')->name('userDashboard');
    Route::post("setMcqData",[McqController::class, "setMcqData"])->name('setMcqData');
    
    
});

require __DIR__ . '/auth.php';
