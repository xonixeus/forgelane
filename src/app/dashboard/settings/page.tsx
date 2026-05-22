export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your workspace preferences</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">
        <div className="p-5">
          <h2 className="text-sm font-semibold text-gray-900">Account</h2>
          <p className="text-sm text-gray-400 mt-1">Profile and password settings coming soon.</p>
        </div>
        <div className="p-5">
          <h2 className="text-sm font-semibold text-gray-900">Notifications</h2>
          <p className="text-sm text-gray-400 mt-1">Notification preferences coming soon.</p>
        </div>
        <div className="p-5">
          <h2 className="text-sm font-semibold text-gray-900">Integrations</h2>
          <p className="text-sm text-gray-400 mt-1">Third-party integrations coming soon.</p>
        </div>
      </div>
    </div>
  )
}
