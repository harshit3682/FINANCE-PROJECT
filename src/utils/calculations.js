import { parseISO, format, compareAsc } from 'date-fns'

export function calculateTotalIncome(transactions) {
  return transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
}

export function calculateTotalExpense(transactions) {
  return transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
}

export function calculateBalance(transactions) {
  return calculateTotalIncome(transactions) - calculateTotalExpense(transactions)
}

export function groupByCategory(transactions) {
  return transactions.reduce((acc, t) => {
    const key = t.category || 'Other'
    if (!acc[key]) acc[key] = 0
    acc[key] += t.amount
    return acc
  }, {})
}

export function buildBalanceSeries(transactions) {
  // Sort by date ascending and accumulate
  const sorted = [...transactions].sort((a, b) =>
    compareAsc(parseISO(a.date), parseISO(b.date))
  )
  let running = 0
  return sorted.map((t) => {
    running += t.type === 'income' ? t.amount : -t.amount
    return {
      date: format(parseISO(t.date), 'MMM d'),
      balance: running
    }
  })
}

export function generateInsights(transactions) {
  if (!transactions || transactions.length === 0) {
    return {
      highestSpendingCategory: null,
      monthlyExpenseComparison: null,
      topCategories: []
    }
  }

  const expenses = transactions.filter(t => t.type === 'expense')
  const byCategory = groupByCategory(expenses)
  const highestSpendingCategory = Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1])[0] || null

  // Monthly expense comparison (this month vs previous)
  const byMonth = expenses.reduce((acc, t) => {
    const month = format(parseISO(t.date), 'yyyy-MM')
    if (!acc[month]) acc[month] = 0
    acc[month] += t.amount
    return acc
  }, {})
  const months = Object.keys(byMonth).sort() // ascending
  const last = months[months.length - 1]
  const prev = months[months.length - 2]
  const monthlyExpenseComparison = last
    ? {
        currentMonth: last,
        current: byMonth[last] || 0,
        previous: byMonth[prev] || 0,
        delta: (byMonth[last] || 0) - (byMonth[prev] || 0)
      }
    : null

  const topCategories = Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name, value]) => ({ name, value }))

  return { highestSpendingCategory, monthlyExpenseComparison, topCategories }
}

export function applyFilters(transactions, filters) {
  const { search, type, sortBy, sortDir } = filters
  let result = [...transactions]

  if (type !== 'all') {
    result = result.filter(t => t.type === type)
  }
  if (search?.trim()) {
    const q = search.trim().toLowerCase()
    result = result.filter(t =>
      (t.category || '').toLowerCase().includes(q) ||
      t.date.toLowerCase().includes(q)
    )
  }
  result.sort((a, b) => {
    let cmp = 0
    if (sortBy === 'date') {
      cmp = parseISO(a.date) - parseISO(b.date)
    } else if (sortBy === 'amount') {
      cmp = a.amount - b.amount
    }
    return sortDir === 'asc' ? cmp : -cmp
  })
  return result
}

