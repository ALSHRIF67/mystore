<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserCrudResource;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of users.
     */
    public function index(Request $request)
    {
        $query = User::query();

        // بحث بالاسم أو البريد
        if ($request->filled('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }

        if ($request->filled('email')) {
            $query->where('email', 'like', '%' . $request->email . '%');
        }

        // ترتيب النتائج
        $sortField = $request->get('sort_field', 'created_at');
        $sortDirection = $request->get('sort_direction', 'desc');

        $users = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->withQueryString();

        return inertia('User/Index', [
            'users' => UserCrudResource::collection($users),
            'queryParams' => $request->query(),
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new user.
     */
    public function create()
    {
        return inertia('User/Create');
    }

    /**
     * Store a newly created user in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $data['email_verified_at'] = now();
        User::create($data);

        return to_route('user.index')->with('success', 'User was created');
    }

    /**
     * Show the form for editing the specified user.
     */
    public function edit(User $user)
    {
        return inertia('User/Edit', [
            'user' => new UserCrudResource($user),
        ]);
    }

    /**
     * Update the specified user in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        if (!empty($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update($data);

        return to_route('user.index')->with('success', "User \"{$user->name}\" was updated");
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy(User $user)
    {
        $name = $user->name;
        $user->delete();

        return to_route('user.index')->with('success', "User \"$name\" was deleted");
    }
}
