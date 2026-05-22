import { api } from '@/lib/trpc/server'

export default async function TasksPage() {
  const projects = await api.projects.list()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
        <p className="text-sm text-gray-500 mt-1">All tasks assigned to you across projects</p>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-sm">No projects yet. Create a project to get started.</p>
        </div>
      ) : (
        <p className="text-sm text-gray-400">Task list view coming soon.</p>
      )}
    </div>
  )
}
