import { Head } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, projects, filters = {} }) {
    const currentSort = filters.sort_by || null;
    const currentDir = filters.sort_dir || 'desc';

    function sortLink(column) {
        const base = projects.path || route('projects.index');
        const params = new URLSearchParams();
        const nextDir = currentSort === column && currentDir === 'asc' ? 'desc' : 'asc';
        params.set('sort_by', column);
        params.set('sort_dir', nextDir);
        return `${base}?${params.toString()}`;
    }

    function sortIndicator(column) {
        if (currentSort !== column) return null;
        return currentDir === 'asc' ? ' ▲' : ' ▼';
    }
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
                                        <th className="px-2 py-2">
                                            <a href={sortLink('id')} className="hover:underline">ID{sortIndicator('id')}</a>
                                        </th>
                                        <th className="px-2 py-2">
                                            <a href={sortLink('name')} className="hover:underline">Name{sortIndicator('name')}</a>
                                        </th>
                                        <th className="px-2 py-2">
                                            <a href={sortLink('description')} className="hover:underline">Description{sortIndicator('description')}</a>
                                        </th>
                                        <th className="px-2 py-2">
                                            <a href={sortLink('due_date')} className="hover:underline">Due Date{sortIndicator('due_date')}</a>
                                        </th>
                                        <th className="px-2 py-2">
                                            <a href={sortLink('status')} className="hover:underline">Status{sortIndicator('status')}</a>
                                        </th>
                                        <th className="px-2 py-2">Image</th>
                                        <th className="px-2 py-2">
                                            <a href={sortLink('created_by')} className="hover:underline">Created By{sortIndicator('created_by')}</a>
                                        </th>
                                        <th className="px-2 py-2">
                                            <a href={sortLink('updated_by')} className="hover:underline">Updated By{sortIndicator('updated_by')}</a>
                                        </th>
                                        <th className="px-2 py-2">
                                            <a href={sortLink('created_at')} className="hover:underline">Created At{sortIndicator('created_at')}</a>
                                        </th>
                                        <th className="px-2 py-2">
                                            <a href={sortLink('updated_at')} className="hover:underline">Updated At{sortIndicator('updated_at')}</a>
                                        </th>
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