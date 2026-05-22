import { api } from '@/lib/trpc/server'
import { ProjectList } from '@/components/projects/ProjectList'

export default async function ProjectsPage() {
  const projects = await api.projects.list()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <p className="text-sm text-gray-500 mt-1">{projects.length} projects</p>
      </div>
      <ProjectList initialProjects={projects} />
    </div>
  )
}
