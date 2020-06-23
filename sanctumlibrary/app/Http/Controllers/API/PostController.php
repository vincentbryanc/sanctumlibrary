<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\Post as PostResource;
use App\Post;
use Validator;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return PostResource::collection(
            Post::select('posts.*', 'users.name')
                ->join('users', 'users.id', '=', 'posts.user_id')
                ->get()
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $content = $request->content;
        $user_id = $request->user_id;

        $rules = array(
            'content' =>'required|max:191',
            'user_id' =>'required',
        );

        $error = Validator::make($request->all(), $rules);
        
        if($error->fails())
        {
            return response()->json(['errors' => $error->errors()->all()]);
        }

        // preparing data to be saved on database
        $form_data = array(
            'content' => $content,
            'user_id' => $user_id,
        );

        $post = Post::create($form_data);
        $id = $post->id;
        $post_data = Post::select('posts.*', 'users.name')
                ->join('users', 'users.id', '=', 'posts.user_id')
                ->where('posts.id', '=', $id)
                ->first();
        return new PostResource($post_data);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post_data = Post::where('id', $id)->first();
        if (!$post_data)
            return response()->json(['error' => 'Post not found'], 404);
        else
            $post_data = Post::select('posts.*', 'users.name')
                    ->join('users', 'users.id', '=', 'posts.user_id')
                    ->where('posts.id', '=', $id)
                    ->first();
            return new PostResource($post_data);
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
        $content = $request->content;

        $rules = array(
            'content' =>'required|max:191',
        );

        $error = Validator::make($request->all(), $rules);
        
        if($error->fails())
        {
            return response()->json(['errors' => $error->errors()->all()]);
        }

        // preparing data to be saved on database
        $form_data = array(
            'content' => $content,
        );

        Post::where('id', $id)->update($form_data);
        $post_data = Post::select('posts.*', 'users.name')
                ->join('users', 'users.id', '=', 'posts.user_id')
                ->where('posts.id', '=', $id)
                ->first();
        return new PostResource($post_data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Post::where('id', $id)->delete();
        return response()->json(['success' => 'Data deleted successfully.']);
    }
}
