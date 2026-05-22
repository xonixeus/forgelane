import { Queue } from 'bullmq'
import IORedis from 'ioredis'

export const redisConnection = new IORedis(process.env.REDIS_URL ?? 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
})

export const notificationQueue = new Queue('notifications', { connection: redisConnection })
