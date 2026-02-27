import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import Jobs from './Pages/Jobs'
import Browse from './Pages/Browse'
import Profile from './Pages/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './Pages/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
const appRouter = createBrowserRouter([
  {
  path:"/",
  element:<Home/>
  },
  {
  path:"/login",
  element:<Login/>
  },
  {
  path:"/signup",
  element:<Signup/>
  },
  {
    path:"/jobs",
    element:<Jobs/>
  },
  {
    path:"/browse",
    element:<Browse/>
  },
  {
    path:"/profile",
    element:<Profile/>
  },
  {
    path:"/description/:id",
    element:<JobDescription/>
  },
  {
    path:"/admin/companies",
    element:<Companies/>,
  },
  {
    path:"/admin/companies/create",
    element:<CompanyCreate/>,
  },
  {
    path:"admin/companies/:id",
    element:<CompanySetup/>,
  }
])
function App() {
  return (
    <>
      <div>
        <RouterProvider router={appRouter}/>
      </div>
        
    </>
  )
}

export default App
