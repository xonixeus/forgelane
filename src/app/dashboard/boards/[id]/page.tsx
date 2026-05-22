import { notFound } from 'next/navigation'
import { api } from '@/lib/trpc/server'
import { KanbanBoard } from '@/components/boards/KanbanBoard'

interface BoardPageProps {
  params: Promise<{ id: string }>
}

export default async function BoardPage({ params }: BoardPageProps) {
  const { id } = await params
  const board = await api.boards.getWithColumns({ id })
  if (!board) notFound()

  const columnsWithTasks = await Promise.all(
    (board.columns ?? []).map(async col => ({
      ...col,
      tasks: await api.tasks.getByColumn({ columnId: col.id }),
    }))
  )

  return (
    <div className="flex flex-col h-full gap-4">
      <h1 className="text-2xl font-bold text-gray-900 shrink-0">{board.name}</h1>
      <div className="flex-1 overflow-hidden">
        <KanbanBoard boardId={id} initialColumns={columnsWithTasks} />
      </div>
    </div>
  )
}
