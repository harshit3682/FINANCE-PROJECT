export default function SummaryCard({ title, value, accent = 'gray', note }) {
  const color =
    accent === 'green' ? 'text-emerald-600' :
    accent === 'red' ? 'text-red-600' :
    'text-gray-700'

  return (
    <div className="card card-padding hover:shadow-md transition-shadow">
      <div className="text-sm text-gray-500 dark:text-gray-400">{title}</div>
      <div className={`mt-1 text-2xl font-semibold ${color} dark:text-white`}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      {note && <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">{note}</div>}
    </div>
  )
}

