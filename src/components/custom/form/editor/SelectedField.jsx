import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react'

function SelectedField({ field }) {
    console.log(field);

    return (
        <div className='flex flex-col gap-2'>
            <Label>{field.label}</Label>
            <Input readOnly className={'border'} placeholder={field.placeholder}/>
        </div>
    )
}

export default SelectedField
