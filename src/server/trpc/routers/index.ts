import { router } from '../init'
import { projectsRouter } from './projects'
import { boardsRouter } from './boards'
import { tasksRouter } from './tasks'

export const appRouter = router({
  projects: projectsRouter,
  boards: boardsRouter,
  tasks: tasksRouter,
})

export type AppRouter = typeof appRouter
