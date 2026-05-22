'use client'

import { useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { KanbanColumn } from './KanbanColumn'
import { TaskCard } from './TaskCard'
import { trpc } from '@/lib/trpc/client'
import type { ColumnWithTasks, Task } from '@/types'

interface KanbanBoardProps {
  boardId: string
  initialColumns: ColumnWithTasks[]
}

export function KanbanBoard({ initialColumns }: KanbanBoardProps) {
  const [columns, setColumns] = useState(initialColumns)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const updateTask = trpc.tasks.update.useMutation()

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  function onDragStart({ active }: DragStartEvent) {
    const task = columns.flatMap(c => c.tasks).find(t => t.id === active.id)
    setActiveTask(task ?? null)
  }

  function onDragEnd({ active, over }: DragEndEvent) {
    setActiveTask(null)
    if (!over || active.id === over.id) return

    const allTasks = columns.flatMap(c => c.tasks)
    const draggedTask = allTasks.find(t => t.id === active.id)
    if (!draggedTask) return

    const targetCol =
      columns.find(c => c.id === over.id) ??
      columns.find(c => c.tasks.some(t => t.id === over.id))
    if (!targetCol || targetCol.id === draggedTask.columnId) return

    setColumns(prev =>
      prev.map(col => {
        if (col.id === draggedTask.columnId) {
          return { ...col, tasks: col.tasks.filter(t => t.id !== draggedTask.id) }
        }
        if (col.id === targetCol.id) {
          return { ...col, tasks: [...col.tasks, { ...draggedTask, columnId: targetCol.id }] }
        }
        return col
      })
    )

    updateTask.mutate({ id: draggedTask.id, columnId: targetCol.id })
  }

  return (
    <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto h-full pb-4">
        <SortableContext items={columns.map(c => c.id)} strategy={horizontalListSortingStrategy}>
          {columns.map(col => (
            <KanbanColumn key={col.id} column={col} />
          ))}
        </SortableContext>
      </div>
      <DragOverlay>{activeTask && <TaskCard task={activeTask} isDragging />}</DragOverlay>
    </DndContext>
  )
}
