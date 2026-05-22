import { initTRPC, TRPCError } from '@trpc/server'
import { cache } from 'react'
import { headers } from 'next/headers'
import { db } from '@/server/db'
import { auth } from '@/server/auth'

export const createTRPCContext = cache(async () => {
  const session = await auth.api.getSession({ headers: await headers() })
  return { db, session }
})

const t = initTRPC.context<typeof createTRPCContext>().create()

export const router = t.router
export const publicProcedure = t.procedure
export const createCallerFactory = t.createCallerFactory

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) throw new TRPCError({ code: 'UNAUTHORIZED' })
  return next({ ctx: { ...ctx, session: ctx.session } })
})
