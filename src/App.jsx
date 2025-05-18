import { Button } from "@/components/ui/button"
import { Outlet } from "react-router"
import LayoutProvider from "./layout"

function App() {
    return (
        <>
            <LayoutProvider >
                <div>
                    hello
                </div>
                <Outlet />
            </LayoutProvider>
        </>
    )
}

export default App
