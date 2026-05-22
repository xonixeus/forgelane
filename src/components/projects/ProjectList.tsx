'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { trpc } from '@/lib/trpc/client'
import { cn } from '@/lib/utils'
import { ProjectCard } from './ProjectCard'
import type { Project } from '@/types'

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6']

interface ProjectListProps {
  initialProjects: Project[]
}

export function ProjectList({ initialProjects }: ProjectListProps) {
  const [showCreate, setShowCreate] = useState(false)
  const [name, setName] = useState('')
  const [color, setColor] = useState('#6366f1')

  const { data: projects, refetch } = trpc.projects.list.useQuery(undefined, {
    initialData: initialProjects,
  })

  const createProject = trpc.projects.create.useMutation({
    onSuccess: () => {
      void refetch()
      setShowCreate(false)
      setName('')
      setColor('#6366f1')
    },
  })

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects?.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}

        {!showCreate && (
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 justify-center p-5 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:border-indigo-300 hover:text-indigo-500 transition-colors text-sm font-medium"
          >
            <Plus size={16} />
            New Project
          </button>
        )}
      </div>

      {showCreate && (
        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4 max-w-md">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">New Project</h3>
            <button
              onClick={() => setShowCreate(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>

          <input
            autoFocus
            type="text"
            placeholder="Project name"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e =>
              e.key === 'Enter' && name && createProject.mutate({ name, color })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Color</span>
            <div className="flex gap-1.5">
              {COLORS.map(c => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={cn(
                    'w-6 h-6 rounded-full transition-transform',
                    color === c && 'scale-125 ring-2 ring-offset-1 ring-gray-400'
                  )}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => name && createProject.mutate({ name, color })}
            disabled={!name || createProject.isPending}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {createProject.isPending ? 'Creating…' : 'Create'}
          </button>
        </div>
      )}
    </div>
  )
}
