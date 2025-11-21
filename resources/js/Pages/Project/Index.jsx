import { Head } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, projects }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Projects
                </h2>
            }
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="min-w-full divide-y divide-gray-200 text-xs">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-2 py-2">ID</th>
                                        <th className="px-2 py-2">Name</th>
                                        <th className="px-2 py-2">Description</th>
                                        <th className="px-2 py-2">Due Date</th>
                                        <th className="px-2 py-2">Status</th>
                                        <th className="px-2 py-2">Image</th>
                                        <th className="px-2 py-2">Created By</th>
                                        <th className="px-2 py-2">Updated By</th>
                                        <th className="px-2 py-2">Created At</th>
                                        <th className="px-2 py-2">Updated At</th>
                                        <th className="px-2 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {projects.data.map((project) => (
                                        <tr key={project.id}>
                                            <td className="px-2 py-2">{project.id}</td>
                                            <td className="px-2 py-2 font-medium text-gray-900">{project.name}</td>
                                            <td className="px-2 py-2">{project.description}</td>
                                            <td className="px-2 py-2">{project.due_date ? new Date(project.due_date).toLocaleDateString() : ''}</td>
                                            <td className="px-2 py-2">{project.status}</td>
                                            <td className="px-2 py-2">{project.image_path ? <img src={project.image_path} alt="img" className="h-8 w-8 object-cover" /> : ''}</td>
                                            <td className="px-2 py-2">{project.created_by}</td>
                                            <td className="px-2 py-2">{project.updated_by}</td>
                                            <td className="px-2 py-2">{project.created_at ? new Date(project.created_at).toLocaleString() : ''}</td>
                                            <td className="px-2 py-2">{project.updated_at ? new Date(project.updated_at).toLocaleString() : ''}</td>
                                            <td className="px-2 py-2 space-x-2">
                                                <a href={route('projects.edit', project.id)} className="text-blue-600 hover:underline">Edit</a>
                                                <form method="POST" action={route('projects.destroy', project.id)} style={{ display: 'inline' }} onSubmit={e => { if(!confirm('Delete this project?')) e.preventDefault(); }}>
                                                    <input type="hidden" name="_method" value="DELETE" />
                                                    <button type="submit" className="text-red-600 hover:underline ml-2">Delete</button>
                                                </form>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
                <div className="mt-6 flex justify-center">
                    <div className="flex items-center space-x-4">
                        {projects.prev_page_url && (
                            <a href={projects.prev_page_url} className="text-sm text-indigo-600">Previous</a>
                        )}
                        <span className="text-sm text-gray-700">Page {projects.current_page} of {projects.last_page}</span>
                        {projects.next_page_url && (
                            <a href={projects.next_page_url} className="text-sm text-indigo-600">Next</a>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}