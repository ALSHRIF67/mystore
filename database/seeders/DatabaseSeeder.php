<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Use updateOrCreate to avoid failing on unique email when seeding multiple times
        User::updateOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'omer',
                'password' => bcrypt('123.321A'),
                'email_verified_at' => now(),
            ]
        );

        // Fixed typo: factory (was "factoy")
        Project::factory()
            ->count(30)
            ->hasTasks(30)
            ->create();
    }
}
