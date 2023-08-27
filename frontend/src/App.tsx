import { useContext, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Outlet } from 'react-router-dom'
import { Store } from './Store'
import NavigationBar from './components/NavigationBar'
import Footer from './components/Footer'

function App() {
  const [marginSize, setMarginSize] = useState(15)

  const updateMarginSize = () => {
    const screenWidth = window.innerWidth

    if (screenWidth < 768) {
      setMarginSize(5)
    } else if (screenWidth > 1068) {
      setMarginSize(12)
    } else if (screenWidth >= 992 && screenWidth <= 1068) {
      setMarginSize(12 - ((12 - 5) * (screenWidth - 992)) / (1068 - 992))
    } else {
      setMarginSize(5 + ((15 - 5) * (screenWidth - 768)) / (992 - 768))
    }
  }

  useEffect(() => {
    updateMarginSize()
    window.addEventListener('resize', updateMarginSize)

    return () => {
      window.removeEventListener('resize', updateMarginSize)
    }
  }, [])

  const {
    state: { mode },
  } = useContext(Store)

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode)
  }, [mode])

  return (
    <div className="page-container">
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <NavigationBar />
      </header>
      <main
        className="content-container"
        style={{ padding: `0 ${marginSize}vw` }}
      >
        <div>
          <Outlet />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App
