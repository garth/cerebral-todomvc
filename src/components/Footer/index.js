import React from 'react'
import { connect, Link } from 'cerebral-view-react'
import counts from '../../computed/counts.js'
import cn from 'classnames'

function CompletedButton({ completedCount, onClick }) {
  return (
    <button id='clear-completed' onClick={onClick}>
      Clear completed ({completedCount})
    </button>
  )
}

export default connect({
  filter: 'app.footer.filter',
  counts: counts()
}, {
  filterClicked: 'app.footer.filterClicked',
  clearCompletedClicked: 'app.footer.clearCompletedClicked'
}, function Footer ({ filter, counts, signals, filterClicked, clearCompletedClicked }) {
  return (
    <footer id='footer'>
      <span id='todo-count'><strong>{counts.remainingCount} {counts.remainingCountPlural}</strong></span>
      <ul id='filters'>
        <li>
          <Link className={cn({ selected: filter === 'all' })} signal={filterClicked}>All</Link>
        </li>
        <li>
          <Link className={cn({ selected: filter === 'active' })} signal={filterClicked} params={{filter: 'active'}}>Active</Link>
        </li>
        <li>
          <Link className={cn({ selected: filter === 'completed' })} signal={filterClicked} params={{filter: 'completed'}}>Completed</Link>
        </li>
      </ul>
      {counts.completedCount ? <CompletedButton completedCount={counts.completedCount} onClick={() => clearCompletedClicked()} /> : null}
    </footer>
  )
})
