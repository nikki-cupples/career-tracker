function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-200 to-gray-300 py-6 text-center shadow-inner">
      <div className="flex flex-col items-center">
        {/* Links */}
        <div className="mb-4 flex space-x-4">
          <a
            href="https://www.linkedin.com/in/nikkicupples/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/nikki-cupples"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:underline"
          >
            GitHub
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-500">
          &copy; 2025 Nikki Cupples. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
