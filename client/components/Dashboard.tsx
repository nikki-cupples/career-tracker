import { useState } from 'react'
import Navigation from './JobApplications/Navigation'
import JobBoard from './JobBoards/JobBoard'

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const renderContent = () => {
    switch (activeTab) {
      case 'applications':
        return <Navigation />
      case 'job-board':
        return <JobBoard />
    }
  }
  return (
    <div className="flex min-h-screen justify-center bg-gradient-to-br from-white via-gray-100 to-gray-300 py-20">
      <div className="w-full max-w-5xl rounded-3xl border border-gray-300 bg-gradient-to-br from-white to-gray-200 p-8 shadow-lg">
        {/* Header */}
        <header className="mt-8 text-center">
          <h1 className="text-4xl font-bold text-blue-600">
            My Career Dashboard
          </h1>
          <p className="mt-2 text-gray-700">
            Tracking and management of my job applications.
          </p>
        </header>
        <div className="mx-4 justify-center rounded-lg p-4 md:mx-0">
          <button
            onClick={() => setActiveTab('applications')}
            className={`my-4 mr-2 w-full rounded-lg px-4 py-2 transition-all md:w-auto md:rounded-t-lg ${
              activeTab === 'applications'
                ? 'rounded-md bg-gray-300 px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-400'
                : 'text-gray-400 hover:bg-blue-600 hover:text-white'
            }`}
          >
            Applications
          </button>
          <button
            onClick={() => setActiveTab('job-board')}
            className={`my-4 mr-2 w-full rounded-lg px-4 py-2 transition-all md:w-auto md:rounded-t-lg ${
              activeTab === 'job-board'
                ? 'rounded-md bg-gray-300 px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-400'
                : 'text-gray-400 hover:bg-blue-600 hover:text-white'
            }`}
          >
            Job Boards
          </button>
          <div>{renderContent()}</div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
