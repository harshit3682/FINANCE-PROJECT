import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import { groupByCategory } from '../utils/calculations'

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#8b5cf6', '#f43f5e']

function DefaultTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const p = payload[0]
    return (
      <div className="px-3 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm">
        <div className="text-gray-800 dark:text-gray-100">{p.name}</div>
        <div className="text-red-600">${p.value.toLocaleString()}</div>
      </div>
    )
  }
  return null
}

export default function CategoryPieChart({ transactions }) {
  const expenses = transactions.filter(t => t.type === 'expense')
  const totals = groupByCategory(expenses)
  const data = Object.entries(totals).map(([name, value]) => ({ name, value }))

  return (
    <div className="card card-padding h-72">
      <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">Expenses by Category</h3>
      {data.length === 0 ? (
        <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">No expense data</div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={90}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<DefaultTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

