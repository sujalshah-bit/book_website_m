import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import './styles/index.css'
import './styles/app.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './components/auth/Signup.jsx';
import Login from './components/auth/Login.jsx';
import LandingPage from './components/landing_section/LandingPage.jsx';
import BookDetail from './components/BookDetail/BookDetail.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/admin/signup",
    element: <Signup text={"Admin"}/>,
  },
  {
    path: "/user/signup",
    element: <Signup text={"User"}/>,
  },
  {
    path: "/book/:id",
    element: <BookDetail/>,
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
