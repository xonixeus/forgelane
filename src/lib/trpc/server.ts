import 'server-only'
import { createCallerFactory, createTRPCContext } from '@/server/trpc/init'
import { appRouter } from '@/server/trpc/routers'

const createCaller = createCallerFactory(appRouter)

export const api = createCaller(createTRPCContext)
