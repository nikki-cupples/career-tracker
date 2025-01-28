import { useNavigate } from 'react-router-dom'

function Error() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-300 p-6">
      <div className="w-full max-w-lg rounded-3xl border border-gray-300 bg-gradient-to-br from-white to-gray-200 p-8 text-center shadow-lg">
        {/* Error Message */}
        <h1 className="mb-4 text-3xl font-bold text-blue-600">
          Oops! Something went wrong.
        </h1>
        <p className="mb-6 text-gray-600">
          We could not find the page you were looking for, please try again
          later.
        </p>

        {/* Go Back Button */}
        <button
          onClick={() => navigate('/')}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white shadow-md transition-all hover:bg-blue-700"
        >
          Go Back Home
        </button>
      </div>
    </div>
  )
}

export default Error
