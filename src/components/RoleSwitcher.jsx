import { useStore } from '../store/useStore'

export default function RoleSwitcher() {
  const role = useStore(s => s.role)
  const setRole = useStore(s => s.setRole)

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-600 dark:text-gray-300">Role:</label>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="px-2 py-1.5 text-sm rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100"
      >
        <option>Viewer</option>
        <option>Admin</option>
      </select>
    </div>
  )
}

