import Dashboard from './Dashboard/Dashboard.tsx'
import Footer from './Footer/Footer.tsx'

function App() {
  return (
    <>
      <div className="app">
        <div className="flex min-h-screen flex-col">
          <div className="flex-grow">
            <Dashboard />
          </div>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
