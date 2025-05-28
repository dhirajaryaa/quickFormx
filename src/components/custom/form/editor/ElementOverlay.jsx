import { Button } from '@/components/ui/button'
function ElementOverlay({ element }) {
    return (
        <Button type="button" variant={'outline'}
            className={`flex flex-col gap-1 items-center justify-center py-8 w-30 cursor-grab`}
        >            {
                element ?
                    <>
                        <element.icon size="16" />
                        <span className="capitalize text-sm">{element?.type}</span>
                    </> : <>No Drag Field</>}
        </Button>
    )
}

export default ElementOverlay
