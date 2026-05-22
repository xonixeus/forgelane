import { pgTable, text, timestamp, integer } from 'drizzle-orm/pg-core'
import { projects } from './projects'

export const boards = pgTable('board', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  projectId: text('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const columns = pgTable('column', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  boardId: text('board_id')
    .notNull()
    .references(() => boards.id, { onDelete: 'cascade' }),
  order: integer('order').notNull().default(0),
  color: text('color').default('#94a3b8'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
