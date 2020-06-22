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

Route::post('login', 'API\AuthController@login')->name('login');
Route::get('unauthorized', 'API\AuthController@unauthorized')->name('unauthorized');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('posts', 'API\PostController@index');
	Route::get('post/{post_id}', 'API\PostController@show');
	Route::post('post', 'API\PostController@store');
	Route::put('post/{post_id}', 'API\PostController@update')->middleware('post');
	Route::delete('post/{post_id}', 'API\PostController@destroy')->middleware('post');

	Route::get('users', 'API\UserController@index');
	Route::get('user/{user_id}', 'API\UserController@show');
	Route::post('user', 'API\UserController@store')->middleware('admin');
	Route::post('user/{user_id}', 'API\UserController@update')->middleware('admin');
	Route::delete('user/{user_id}', 'API\UserController@destroy')->middleware('admin');

	Route::post('profile/{user_id}', 'API\ProfileController@update')->middleware('user');
});