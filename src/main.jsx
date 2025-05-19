import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import App from './App'
import { Dashboard, LoginPage, NotFoundPage, RegisterPage } from './pages'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from './components/ui/sonner'
import { getAuthUser } from './lib/authChecker'

const router = createBrowserRouter([
    { //* default page with auth
        path: "/",
        Component: App,
        loader: getAuthUser,
        children: [
            { //? default page with auth
                path: "dashboard",
                Component: Dashboard
            }
        ]
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

// query client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <Toaster />
        </QueryClientProvider>
    </StrictMode>,
)
