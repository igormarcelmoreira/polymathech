import { createBrowserRouter } from 'react-router-dom'
import App from '@/App'
import Onboarding from '@/pages/Onboarding'
import Login from '@/pages/Login'
import Finish from '@/pages/Finish'
import Register from '@/pages/Register'
import Home from '@/pages/Home'
import CareerTest from '@/pages/CareerTest'
import CareerTestResult from '@/pages/CareerTestResult'
import ChangePassword from '@/pages/ChangePassword'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Onboarding /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'finish', element: <Finish /> },
      { path: 'home', element: <Home /> },
      { path: 'careerTest', element: <CareerTest /> },
      { path: 'careerTestResult', element: <CareerTestResult /> },
      { path: 'changePassword', element: <ChangePassword /> },
    ],
  },
])
