import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { buildBalanceSeries } from '../utils/calculations'

function CurrencyTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="px-3 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm">
        <div className="font-medium text-gray-800 dark:text-gray-100">{label}</div>
        <div className="text-emerald-600">${payload[0].value.toLocaleString()}</div>
      </div>
    )
  }
  return null
}

export default function BalanceChart({ transactions }) {
  const data = buildBalanceSeries(transactions)
  return (
    <div className="card card-padding h-72">
      <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">Balance Over Time</h3>
      {data.length === 0 ? (
        <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">No data</div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip content={<CurrencyTooltip />} />
            <Line type="monotone" dataKey="balance" stroke="#10b981" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

