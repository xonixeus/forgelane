import type { InferSelectModel } from 'drizzle-orm'
import type { projects, boards, columns, tasks, users, comments } from '@/server/db/schema'

export type Project = InferSelectModel<typeof projects>
export type Board = InferSelectModel<typeof boards>
export type Column = InferSelectModel<typeof columns>
export type Task = InferSelectModel<typeof tasks>
export type User = InferSelectModel<typeof users>
export type Comment = InferSelectModel<typeof comments>

export type ColumnWithTasks = Column & { tasks: Task[] }
