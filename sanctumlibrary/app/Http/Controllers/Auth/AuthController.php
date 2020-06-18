<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;
use Auth;

class AuthController extends Controller
{
	public function index(Request $request) 
    {
		return view('auth.login');
	}

    public function login(Request $request) 
    {
        $this->validateLogin($request);

        $email = $request->email;
        $password = $request->password;
        $response = Http::post('http://api.sanctum.com/api/login', [
		    'email' => $email,
		    'password' => $password,
		]);
		echo $response;
		// return redirect()->intended('users');
		/*if($response->message) {
			echo 'These credentials do not match our records.';
		} else {
			echo "Login here";
		}*/
    }

    protected function validateLogin(Request $request)
    {
        $request->validate([
            $this->username() => 'required|string',
            'password' => 'required|string',
        ]);
    }

    public function username()
    {
        return 'email';
    }

    public function logout()
    {
        Auth::guard('web')->logout();
        return redirect('/');
    }
}
