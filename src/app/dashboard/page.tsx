import { api } from '@/lib/trpc/server'

export default async function DashboardPage() {
  const projects = await api.projects.list()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back to your workspace</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Projects', value: projects.length },
          { label: 'Active', value: projects.filter(p => p.status === 'active').length },
          { label: 'Completed', value: projects.filter(p => p.status === 'completed').length },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
