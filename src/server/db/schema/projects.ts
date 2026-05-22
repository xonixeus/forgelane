import { pgTable, text, timestamp, pgEnum } from 'drizzle-orm/pg-core'
import { users } from './auth'

export const projectStatusEnum = pgEnum('project_status', ['active', 'archived', 'completed'])

export const projects = pgTable('project', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  description: text('description'),
  color: text('color').notNull().default('#6366f1'),
  status: projectStatusEnum('status').notNull().default('active'),
  ownerId: text('owner_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})
