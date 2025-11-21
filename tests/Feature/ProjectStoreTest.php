<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use App\Models\Project;
use App\Models\User;

class ProjectStoreTest extends TestCase
{
    use RefreshDatabase;

    public function test_project_store_saves_data_and_image()
    {
        Storage::fake('public');

        $user = User::factory()->create();

        $this->actingAs($user);

        $file = UploadedFile::fake()->image('project.jpg');

        $data = [
            'name' => 'Test Project',
            'description' => 'A description',
            'due_date' => '2025-12-31',
            'status' => 'pending',
            'image' => $file,
        ];

        $response = $this->post(route('projects.store'), $data);

        $response->assertRedirect(route('projects.index'));

        $this->assertDatabaseHas('projects', [
            'name' => 'Test Project',
            'created_by' => $user->id,
        ]);

        $project = Project::where('name', 'Test Project')->first();
        $this->assertNotNull($project);

        // image path should be stored and file exists on the fake disk
        Storage::disk('public')->assertExists($project->image_path);
        $this->assertEquals($user->id, $project->created_by);
    }
}
