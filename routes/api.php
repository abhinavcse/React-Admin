<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/data','Api\CategoryController@index');
Route::post('/data','Api\CategoryController@store');
Route::delete('/data/delete/{id}','Api\CategoryController@destroy');
Route::get('/data/edit/{id}','Api\CategoryController@edit');
Route::put('/data/update/{id}','Api\CategoryController@update');
Route::group([
    'prefix' => 'Auth'
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
});
