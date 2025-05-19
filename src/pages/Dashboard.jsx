import { PageHeader } from "@/components/custom"
import { Button } from "@/components/ui/button"
import { BarChart3 } from "lucide-react"

function Dashboard() {
    return (
        <main className='p-3'>
            {/* header  */}
            <PageHeader title="Dashboard">
                <Button size="sm" className={"text-xs"}>
                    <BarChart3 />
                    <span className="sm:block hidden">View Analytics</span>
                </Button>
            </PageHeader>
        </main>
    )
}

export default Dashboard
