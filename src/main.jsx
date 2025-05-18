import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import App from './App'
import { LoginPage, NotFoundPage, RegisterPage } from './pages'

const router = createBrowserRouter([
    { //* default page with auth
        path: "/",
        Component: App
    },
    { //? login page
        path: "login",
        Component: LoginPage
    },
    { //? register page
        path: "register",
        Component: RegisterPage
    },
    { //! not found page 404
        path: "*",
        Component: NotFoundPage
    }
])


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
