<?php

namespace App\Http\Middleware;

use Closure;
use Response;

class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->user() && $request->user()->role != 'admin')
        {
            abort(403, 'Unauthorized');
        }
        return $next($request);
    }
}
