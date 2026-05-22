import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from '@/server/auth'

export default async function HomePage() {
  const session = await auth.api.getSession({ headers: await headers() })
  redirect(session ? '/dashboard' : '/login')
}
