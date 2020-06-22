<?php

namespace App\Http\Middleware;

use Closure;
use App\Post;

class PostMiddleware
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
        $current_user = $request->user()->id;
        $post_id = $request->route('post_id');

        // check if data exist using id
        $post_data = Post::select('encoded_by')->where('id', $post_id)->first();
        if (!$post_data) {
            // data not found
            return response()->json(['error' => 'Post not found'], 404);
        }
        if ($current_user != $post_data->encoded_by)
        {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $next($request);
    }
}
