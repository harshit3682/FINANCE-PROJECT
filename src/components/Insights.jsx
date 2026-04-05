import { generateInsights } from '../utils/calculations'

export default function Insights({ transactions }) {
  const { highestSpendingCategory, monthlyExpenseComparison, topCategories } = generateInsights(transactions)

  return (
    <div className="card card-padding h-full">
      <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">Insights</h3>
      <div className="mt-4 space-y-4 text-sm">
        <div>
          <div className="text-gray-500 dark:text-gray-400">Highest spending category</div>
          <div className="mt-1 text-gray-900 dark:text-gray-100">
            {highestSpendingCategory
              ? `${highestSpendingCategory[0]}: $${highestSpendingCategory[1].toLocaleString()}`
              : 'Not enough data'}
          </div>
        </div>
        <div>
          <div className="text-gray-500 dark:text-gray-400">Monthly expense comparison</div>
          <div className="mt-1 text-gray-900 dark:text-gray-100">
            {monthlyExpenseComparison ? (
              <>
                <span className="font-medium">{monthlyExpenseComparison.currentMonth}</span> vs{' '}
                <span className="font-medium">{monthlyExpenseComparison.previous || '—'}</span>:
                <span className={`ml-1 ${monthlyExpenseComparison.delta >= 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                  {monthlyExpenseComparison.delta >= 0 ? '+' : '-'}${Math.abs(monthlyExpenseComparison.delta).toLocaleString()}
                </span>
              </>
            ) : 'Not enough data'}
          </div>
        </div>
        <div>
          <div className="text-gray-500 dark:text-gray-400">Top categories</div>
          <ul className="mt-1 text-gray-900 dark:text-gray-100 list-disc ml-4">
            {topCategories.length > 0 ? topCategories.map(c => (
              <li key={c.name}>{c.name}: ${c.value.toLocaleString()}</li>
            )) : <li>No expense data</li>}
          </ul>
        </div>
      </div>
    </div>
  )
}

