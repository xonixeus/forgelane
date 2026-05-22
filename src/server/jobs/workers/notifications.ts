import { Worker } from 'bullmq'
import { redisConnection } from '../queue'

export const notificationWorker = new Worker(
  'notifications',
  async job => {
    console.log(`[worker] processing job ${job.id} (${job.name}):`, job.data)
    // TODO: dispatch email / push notification based on job.name
  },
  { connection: redisConnection }
)

notificationWorker.on('completed', job => console.log(`[worker] job ${job.id} completed`))
notificationWorker.on('failed', (job, err) =>
  console.error(`[worker] job ${job?.id} failed:`, err.message)
)
