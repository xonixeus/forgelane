import { notFound } from 'next/navigation'
import Link from 'next/link'
import { api } from '@/lib/trpc/server'

interface ProjectPageProps {
  params: Promise<{ id: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  const [projects, boards] = await Promise.all([
    api.projects.list(),
    api.boards.getByProject({ projectId: id }),
  ])
  const project = projects.find(p => p.id === id)
  if (!project) notFound()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-lg shrink-0"
          style={{ backgroundColor: project.color }}
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          {project.description && (
            <p className="text-sm text-gray-500 mt-0.5">{project.description}</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Boards</h2>
        {boards.length === 0 ? (
          <p className="text-sm text-gray-400">No boards yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {boards.map(board => (
              <Link
                key={board.id}
                href={`/dashboard/boards/${board.id}`}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-sm transition-all"
              >
                <h3 className="font-semibold text-gray-900">{board.name}</h3>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
