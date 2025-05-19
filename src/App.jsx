import { Outlet } from "react-router"
import LayoutProvider from "./layout"
import useStore from "./store"
import { Navigate } from "react-router";

function App() {
    const { user } = useStore.getState();
    if (!user) {
        return <Navigate to={"/login"} replace />
    }

    return (
        <>
            <LayoutProvider >
                <Outlet />
            </LayoutProvider>
        </>
    )
}

export default App
