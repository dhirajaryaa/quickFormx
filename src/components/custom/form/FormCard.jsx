import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/formatDate"
import { ArrowRightIcon, View, Send } from "lucide-react"

function FormCard({ form }) {

    return (
        <Card className="bg-muted/50  shadow hover:shadow-md transition-all duration-200 py-4 cursor-pointer">
            <CardHeader className={"gap-0"}>
                <CardTitle className="flex items-center justify-between">
                    <span className="font-semibold line-clamp-1">{form.title}</span>
                    {form.isDraft ? <Badge variant='destructive'>Draft</Badge> : <Badge className={'bg-green-200 dark:bg-green-400 text-green-900 dark:text-white'}>Public </Badge>}
                </CardTitle>
                <CardDescription className={'flex gap-2 text-xs items-center justify-between text-foreground/60 font-medium pt-2'}>
                    <p>{formatDate(form.updatedAt)}</p>
                    <p className="flex gap-2">
                        <span className="flex gap-1 text-xs">
                            <View className="size-4" /> 2
                        </span>
                        <span className="flex gap-1 text-xs">
                            <Send className="size-4" /> 8
                        </span>
                    </p>
                </CardDescription>
            </CardHeader>
            <CardContent className={"line-clamp-2 text-xs sm:text-sm min-h-8 sm:min-h-10"}>
                {form.description}
            </CardContent>
            <CardFooter className={'py-0'}>
                <Button className={"w-full"}>
                    <span>view submission</span> <ArrowRightIcon />
                </Button>
            </CardFooter>

        </Card>
    )
}

export default FormCard
