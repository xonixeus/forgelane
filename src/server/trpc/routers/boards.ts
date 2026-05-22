import { z } from 'zod'
import { eq, asc } from 'drizzle-orm'
import { router, protectedProcedure } from '../init'
import { boards, columns } from '@/server/db/schema'

export const boardsRouter = router({
  getByProject: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(({ ctx, input }) =>
      ctx.db.select().from(boards).where(eq(boards.projectId, input.projectId))
    ),

  getWithColumns: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) =>
      ctx.db.query.boards.findFirst({
        where: eq(boards.id, input.id),
        with: { columns: { orderBy: asc(columns.order) } },
      })
    ),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1).max(100), projectId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const [board] = await ctx.db.insert(boards).values(input).returning()
      await ctx.db.insert(columns).values([
        { name: 'Todo', boardId: board.id, order: 0, color: '#94a3b8' },
        { name: 'In Progress', boardId: board.id, order: 1, color: '#3b82f6' },
        { name: 'Done', boardId: board.id, order: 2, color: '#22c55e' },
      ])
      return board
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => ctx.db.delete(boards).where(eq(boards.id, input.id))),
})
