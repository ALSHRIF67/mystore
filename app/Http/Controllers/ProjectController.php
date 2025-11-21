<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Return paginated projects with tasks count for the Projects page
        $allowedSorts = [
            'id', 'name', 'description', 'due_date', 'status', 'image_path',
            'created_by', 'updated_by', 'created_at', 'updated_at', 'tasks_count',
        ];

        $sortBy = request()->query('sort_by', 'created_at');
        $sortDir = strtolower(request()->query('sort_dir', 'desc')) === 'asc' ? 'asc' : 'desc';

        $query = Project::with(['creator', 'updater'])->withCount('tasks');

        if (in_array($sortBy, $allowedSorts)) {
            // tasks_count is produced by withCount; allow ordering by it
            if ($sortBy === 'tasks_count') {
                $query->orderBy('tasks_count', $sortDir);
            } else {
                $query->orderBy($sortBy, $sortDir);
            }
        } else {
            // default ordering
            $query->latest();
        }

        $projects = $query->paginate(10)->appends([
            'sort_by' => $sortBy,
            'sort_dir' => $sortDir,
        ]);

        return Inertia::render('Project/Index', [
            'projects' => $projects,
            'filters' => [
                'sort_by' => $sortBy,
                'sort_dir' => $sortDir,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
