'use client'

import Link from 'next/link'
import { FolderKanban } from 'lucide-react'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

const statusStyles: Record<string, string> = {
  active: 'bg-green-50 text-green-700',
  completed: 'bg-blue-50 text-blue-700',
  archived: 'bg-gray-100 text-gray-500',
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/dashboard/projects/${project.id}`}
      className="block bg-white border border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-sm transition-all group"
    >
      <div className="flex items-start gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: project.color + '20' }}
        >
          <FolderKanban size={18} style={{ color: project.color }} />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors truncate">
            {project.name}
          </h3>
          {project.description && (
            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{project.description}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[project.status]}`}>
          {project.status}
        </span>
      </div>
    </Link>
  )
}
