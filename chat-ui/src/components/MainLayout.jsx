import { Outlet } from 'react-router-dom'
import Header from './Header'
import Navbars from './Navbars'
import Footer from './Footer'

function MainLayout() {
  return (
    <div className="blog-site">
      <Header />
      <Navbars />
      <div className="page-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout