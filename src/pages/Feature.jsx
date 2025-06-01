import { QrCode } from "lucide-react"

function Feature({ value = 1 }) {
    return (
       <section className="max-w-sm w-full mx-auto mt-40 px-4 py-6 text-center">
  <p className="text-yellow-700 text-xs my-2 underline animate-pulse">
    ⚠️ This application is currently in <span className="font-medium">development mode</span> 💻
  </p>
  <div className="mb-5 flex items-center justify-center space-x-2">
    <QrCode className="size-7 text-primary" />
    <h1 className="text-xl sm:text-2xl font-semibold text-primary">
      Feature Incoming #{value}
    </h1>
  </div>
  <p className="text-muted-foreground text-sm my-4">
    We're working on something exciting behind the scenes! Stay tuned — you'll be among the first to experience it. 🚀
  </p>
</section>

    )
}

export default Feature