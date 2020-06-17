<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('login', 'API\AuthController@login');

Route::middleware(['auth:sanctum'])->group(function () {
	Route::get('users', 'API\UserController@index');
	Route::get('user/{user_id}', 'API\UserController@show');
	Route::post('user', 'API\UserController@store')->middleware('admin');
	Route::post('user/{user_id}', 'API\UserController@update')->middleware('admin');
	Route::delete('user/{user_id}', 'API\UserController@destroy')->middleware('admin');

	Route::post('profile/{user_id}', 'API\ProfileController@update')->middleware('user');
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
