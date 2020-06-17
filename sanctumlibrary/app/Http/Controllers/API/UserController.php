<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\User as UserResource;
use Validator;
use App\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return UserResource::collection(User::all());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $name = $request->name;
        $email = $request->email;
        $password = $request->password;
        $role = $request->role;

        $rules = array(
            'name' =>'required|max:255',
            'email' =>'required|max:255|unique:users',
            'password' =>'required|max:255',
        );

        $error = Validator::make($request->all(), $rules);
        
        if($error->fails())
        {
            return response()->json(['errors' => $error->errors()->all()]);
        }

        // preparing data to be saved on database
        $form_data = array(
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
            'role' => $role,
        );

        User::create($form_data);
        return response()->json(['success' => 'Data added successfully.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = User::where('id', $id)->firstOrFail();
        return response()->json(['data' => $data]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $name = $request->name;
        $email = $request->email;
        $password = $request->password;
        $role = $request->role;

        if($password == null) {
            $rules = array(
                'name' =>'required|max:191',
                'email' =>'required|max:191|unique:users,email,'.$id.'',
                'role' =>'required',
            );
        }
        else {
            $rules = array(
                'name' =>'required|max:191',
                'password' => 'required|max:191|min:6',
                'email' =>'required|max:191|unique:users,email,'.$id.'',
                'role' =>'required',
            );   
        }

        $error = Validator::make($request->all(), $rules);
        
        if($error->fails())
        {
            return response()->json(['errors' => $error->errors()->all()]);
        }

        // preparing data to be saved on database
        if($password == null) {
            $form_data = array(
                'name' => $name,
                'email' => $email,
                'role' => $role,
            );
        }
        else {
            $form_data = array(
                'name' => $name,
                'email' => $email,
                'password' => Hash::make($password),
                'role' => $role,
            );
        }

        User::where('id', $id)->update($form_data);
        return response()->json(['success' => 'Data updated successfully.']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        User::where('id', $id)
            ->delete();
        return response()->json(['success' => 'Data deleted successfully.']);
    }
}
