'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Calendar, Flag } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import type { Task } from '@/types'

const priorityColor: Record<string, string> = {
  low: 'text-gray-400',
  medium: 'text-yellow-500',
  high: 'text-orange-500',
  urgent: 'text-red-500',
}

interface TaskCardProps {
  task: Task
  isDragging?: boolean
}

export function TaskCard({ task, isDragging }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSorting,
  } = useSortable({ id: task.id })

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
      className={cn(
        'bg-white rounded-lg border border-gray-200 p-3 cursor-grab active:cursor-grabbing shadow-sm select-none',
        'hover:border-indigo-300 hover:shadow-md transition-all',
        (isDragging || isSorting) && 'opacity-40 shadow-lg'
      )}
    >
      <p className="text-sm font-medium text-gray-900 leading-snug">{task.title}</p>

      {task.description && (
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{task.description}</p>
      )}

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-1">
          <Flag size={12} className={priorityColor[task.priority]} />
          <span className="text-xs text-gray-400 capitalize">{task.priority}</span>
        </div>

        {task.dueDate && (
          <div className="flex items-center gap-1">
            <Calendar size={12} className="text-gray-400" />
            <span className="text-xs text-gray-400">
              {format(new Date(task.dueDate), 'MMM d')}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
