function Loading() {
  return (
    <div className="flex h-screen flex-col items-center justify-start space-y-8 bg-gray-100 p-6">
      {/* Skeleton search bar */}
      <div className="h-16 w-full animate-pulse rounded-lg bg-gray-300"></div>

      {/* Skeleton job cards */}
      <div className="w-full space-y-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="h-32 w-full animate-pulse rounded-lg bg-gray-300"
          ></div>
        ))}
      </div>
    </div>
  )
}

export default Loading
