import { Button } from '@/components/ui/button'
import { FilePlus } from 'lucide-react'

function CreateFormBtn() {
  return (
    <Button className={"h-35 sm:h-auto border border-dashed flex flex-col bg-accent/50 shadow hover:shadow-md text-foreground/70 transition-all duration-200 cursor-pointer"} variant='ghost' >
                    <FilePlus className='size-5 sm:size-7' />
                    <span className='font-bold text-sm sm:text-xl '>Create New Form</span>
                </Button>
  )
}

export default CreateFormBtn
