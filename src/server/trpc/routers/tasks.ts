import { z } from 'zod'
import { eq, asc } from 'drizzle-orm'
import { router, protectedProcedure } from '../init'
import { tasks } from '@/server/db/schema'

export const tasksRouter = router({
  getByColumn: protectedProcedure
    .input(z.object({ columnId: z.string() }))
    .query(({ ctx, input }) =>
      ctx.db
        .select()
        .from(tasks)
        .where(eq(tasks.columnId, input.columnId))
        .orderBy(asc(tasks.order))
    ),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(200),
        description: z.string().optional(),
        columnId: z.string(),
        projectId: z.string(),
        priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
        dueDate: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db
        .select({ id: tasks.id })
        .from(tasks)
        .where(eq(tasks.columnId, input.columnId))
      const [task] = await ctx.db
        .insert(tasks)
        .values({ ...input, order: existing.length })
        .returning()
      return task
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1).max(200).optional(),
        description: z.string().optional(),
        columnId: z.string().optional(),
        priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
        dueDate: z.date().nullable().optional(),
        order: z.number().int().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input
      const [task] = await ctx.db
        .update(tasks)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(tasks.id, id))
        .returning()
      return task
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => ctx.db.delete(tasks).where(eq(tasks.id, input.id))),
})
