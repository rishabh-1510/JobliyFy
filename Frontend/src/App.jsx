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
import AdminJobs from './Pages/AdminJobs'
import PostJob from './Pages/Recruiter/PostJob'
import Applicants from './Pages/Recruiter/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRoute>
      <CompanyCreate />
    </ProtectedRoute>,
  },
  {
    path: "admin/companies/:id",
    element: <ProtectedRoute>
      <CompanySetup />
    </ProtectedRoute>,
  },
  {
    path: "admin/jobs",
    element: <ProtectedRoute>
      <AdminJobs />
    </ProtectedRoute>,
  },
  {
    path: "admin/job/create",
    element: <ProtectedRoute>
      <PostJob />
    </ProtectedRoute>,
  },
  {
    path: "admin/jobs/:id/applicants",
    element: <ProtectedRoute>
      <Applicants />
    </ProtectedRoute>,
  }
])
function App() {
  return (
    <>
      <div>
        <RouterProvider router={appRouter} />
      </div>

    </>
  )
}

export default App
