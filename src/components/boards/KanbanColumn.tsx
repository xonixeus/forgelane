'use client'

import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Plus } from 'lucide-react'
import { TaskCard } from './TaskCard'
import type { ColumnWithTasks } from '@/types'

interface KanbanColumnProps {
  column: ColumnWithTasks
}

export function KanbanColumn({ column }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({ id: column.id })

  return (
    <div className="flex flex-col w-72 shrink-0 bg-gray-100 rounded-xl">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: column.color ?? '#94a3b8' }}
          />
          <span className="text-sm font-semibold text-gray-700">{column.name}</span>
          <span className="text-xs text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded-full">
            {column.tasks.length}
          </span>
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <Plus size={16} />
        </button>
      </div>

      <div ref={setNodeRef} className="flex flex-col gap-2 px-3 pb-3 flex-1 min-h-24">
        <SortableContext items={column.tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {column.tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}
