import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import App from './App'
import { Feature, FormEditor, FormPublic, LoginPage, NotFoundPage, RegisterPage, Submission } from './pages'
import { lazy } from 'react'
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Forms = lazy(() => import('@/pages/form/Forms'))
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from './components/ui/sonner'
import { getAuthUser } from './lib/authChecker'
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'

const router = createBrowserRouter([
    { //* default page with auth
        path: "/",
        Component: App,
        loader: getAuthUser,
        children: [
            { //? default page with auth
                path: "dashboard",
                Component: Dashboard
            },
            { //? form page with auth
                path: "forms",
                Component: Forms
            },
            { //? create form page with auth
                path: "forms/create",
                Component: FormEditor
            },
            { //? edit form page with auth
                path: "forms/:formId/edit",
                Component: FormEditor
            },
            { //? for view submission
                path: "submissions",
                Component: Submission
            },
            { //? for view analytics
                path: "analytics",
                Component: Feature
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
    { //? public form
        path: "form/:publicID",
        Component: FormPublic
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
            <Suspense fallback={
                <div className='w-full h-screen flex items-center justify-center'><Loader2 className='size-10 animate-spin' /></div>
            }>
                <RouterProvider router={router} />
            </Suspense>
            <Toaster />
        </QueryClientProvider>
    </StrictMode>,
)
