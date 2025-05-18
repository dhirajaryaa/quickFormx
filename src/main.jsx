import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router'
import App from './App'
import { LoginPage, NotFoundPage } from './pages'

const router = createBrowserRouter([
    {
        path: "/",
        Component : App
    },
    { //! not found page 404
        path: "*",
        Component : NotFoundPage
    },

])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
