import { z } from 'zod'
import { eq, and } from 'drizzle-orm'
import { router, protectedProcedure } from '../init'
import { projects } from '@/server/db/schema'

export const projectsRouter = router({
  list: protectedProcedure.query(({ ctx }) =>
    ctx.db.select().from(projects).where(eq(projects.ownerId, ctx.session.user.id))
  ),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100),
        description: z.string().max(500).optional(),
        color: z.string().regex(/^#[0-9a-f]{6}$/i).default('#6366f1'),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [project] = await ctx.db
        .insert(projects)
        .values({ ...input, ownerId: ctx.session.user.id })
        .returning()
      return project
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).max(100).optional(),
        description: z.string().max(500).optional(),
        color: z.string().regex(/^#[0-9a-f]{6}$/i).optional(),
        status: z.enum(['active', 'archived', 'completed']).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input
      const [project] = await ctx.db
        .update(projects)
        .set({ ...data, updatedAt: new Date() })
        .where(and(eq(projects.id, id), eq(projects.ownerId, ctx.session.user.id)))
        .returning()
      return project
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) =>
      ctx.db
        .delete(projects)
        .where(and(eq(projects.id, input.id), eq(projects.ownerId, ctx.session.user.id)))
    ),
})
