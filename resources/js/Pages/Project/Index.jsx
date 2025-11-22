import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout.jsx";

import {
    PROJECT_STATUS_CLASS_MAP,
    PROJECT_STATUS_TEXT_MAP,
} from "@/constants.jsx";

import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, projects, queryParams = null, success }) {
    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) queryParams[name] = value;
        else delete queryParams[name];

        router.get(route("projects.index"), queryParams, { preserveScroll: true });
    };

    const onKeyPress = (name, e) => {
        if (e.key === "Enter") {
            searchFieldChanged(name, e.target.value);
        }
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            queryParams.sort_direction =
                queryParams.sort_direction === "asc" ? "desc" : "asc";
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }

        router.get(route("projects.index"), queryParams, { preserveScroll: true });
    };

    const deleteProject = (project) => {
        if (!window.confirm("Are you sure you want to delete the project?")) return;

        router.delete(route("projects.destroy", project.id), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
             user={auth.user}
      header={
        <div className="flex justify-between  items-center">
          <h2 className="font-semibold text-xl text-white leading-tight">
            Projects
          </h2>
          <Link
            href={route("projects.create")}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Add new
          </Link>
        </div>
      }
        >
            <Head title="Projects" />
              <div  className="py-12">

            <div className=" dark:bg-gray-800 max-w-7xl mx-auto sm:px-6 lg:px-8">

                {success && (
                    <div className="bg-emerald-600 text-white py-2 px-4 rounded mb-4 shadow">
                        {success}
                    </div>
                )}

                <div className=" dark:bg-gray-800 shadow-md rounded-lg p-6">

                    {/* TABLE WRAPPER */}
                    <div className="overflow-x-auto rounded-lg border dark:border-gray-700">

                        <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300">

                            {/* MAIN HEADER */}
                            <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                                <tr>
                                    <TableHeading
                                        name="id"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}
                                    >
                                        ID
                                    </TableHeading>

                                    <th className="px-4 py-3">Image</th>

                                    <TableHeading
                                        name="name"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}
                                    >
                                        Name
                                    </TableHeading>

                                    <TableHeading
                                        name="status"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}
                                    >
                                        Status
                                    </TableHeading>

                                    <TableHeading
                                        name="created_at"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}
                                    >
                                        Created At
                                    </TableHeading>

                                    <TableHeading
                                        name="due_date"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}
                                    >
                                        Due Date
                                    </TableHeading>

                                    <th className="px-4 py-3">Created By</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>

                            {/* FILTER ROW */}
                            <thead className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
                                <tr>
                                    <th className="px-4 py-2"></th>
                                    <th className="px-4 py-2"></th>

                                    <th className="px-4 py-2">
                                        <TextInput
                                            className="w-full text-xs"
                                            defaultValue={queryParams.name}
                                            placeholder="Search by name..."
                                            onBlur={(e) =>
                                                searchFieldChanged("name", e.target.value)
                                            }
                                            onKeyPress={(e) => onKeyPress("name", e)}
                                        />
                                    </th>

                                    <th className="px-4 py-2">
                                        <SelectInput
                                            className="w-full text-xs"
                                            defaultValue={queryParams.status}
                                            onChange={(e) =>
                                                searchFieldChanged("status", e.target.value)
                                            }
                                        >
                                            <option value="">All Status</option>
                                            <option value="pending">Pending</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </SelectInput>
                                    </th>

                                    <th className="px-4 py-2"></th>
                                    <th className="px-4 py-2"></th>
                                    <th className="px-4 py-2"></th>
                                    <th className="px-4 py-2"></th>
                                </tr>
                            </thead>

                            {/* TABLE BODY */}
                            <tbody>
                                {projects.data.map((project) => (
                                    <tr
                                        key={project.id}
                                        className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                    >
                                        <td className="px-4 py-3">{project.id}</td>

                                        <td className="px-4 py-3">
                                            <img
                                                src={project.image_path}
                                                className="w-14 rounded shadow-sm"
                                            />
                                        </td>

                                        <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">
                                            <Link
                                                href={route("projects.show", project.id)}
                                                className="hover:underline"
                                            >
                                                {project.name}
                                            </Link>
                                        </td>

                                        <td className="px-4 py-3">
                                            <span
                                                className={
                                                    "px-2 py-1 rounded text-white text-xs " +
                                                    PROJECT_STATUS_CLASS_MAP[project.status]
                                                }
                                            >
                                                {PROJECT_STATUS_TEXT_MAP[project.status]}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3 whitespace-nowrap">
                                            {project.created_at}
                                        </td>

                                        <td className="px-4 py-3 whitespace-nowrap">
                                            {project.due_date}
                                        </td>

                                        <td className="px-4 py-3">
                                            {project.createdBy.name}
                                        </td>

                                        <td className="px-4 py-3 text-right">
                                            <Link
                                                href={route("projects.edit", project.id)}
                                                className="text-blue-500 hover:underline mx-2"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                onClick={() => deleteProject(project)}
                                                className="text-red-500 hover:underline mx-2"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION FOOTER */}
                    <div className="mt-4">
                        <Pagination links={projects.meta.links} />
                    </div>
                </div>
            </div>
              </div>

        </AuthenticatedLayout>
    );
}
