<?php

use Illuminate\Support\Facades\Route;

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
    return redirect(url('login'));
});

// Auth::routes(['register'=>false]);
Route::get('login', 'Auth\AuthController@index')->name('login');
Route::post('login', 'Auth\AuthController@login');
Route::post('logout', 'Auth\AuthController@logout')->name('logout');

Route::middleware(['auth:sanctum'])->group(function () {
	Route::get('users', 'UserController@index');
	Route::get('profile', 'ProfileController@index')->middleware('user');
});
