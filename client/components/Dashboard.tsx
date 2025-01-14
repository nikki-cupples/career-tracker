import Navigation from './Navigation'

function Dashboard() {
  return (
    <div className="flex min-h-screen justify-center bg-gradient-to-br from-white via-gray-100 to-gray-300 py-20">
      <div className="w-full max-w-5xl rounded-3xl border border-gray-300 bg-gradient-to-br from-white to-gray-200 p-8 shadow-lg">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-600">
            Applications Dashboard
          </h1>
          <p className="mt-2 text-gray-700">
            Tracking and management of my job applications.
          </p>
        </header>

        <Navigation />
      </div>
    </div>
  )
}

export default Dashboard
