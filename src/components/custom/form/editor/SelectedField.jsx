import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Trash2, ArrowUp } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from '@/components/ui/checkbox';

function SelectedField({ field, remove, index, move, isPreview, setActiveElement }) {
    const toTextField = ["text", "password", "email", "url", "number", "date", "file"];

    function handleActiveElement() {
        if (!isPreview) {
            setActiveElement({ ...field, index })
        }
    }

    const handleMoveUp = () => {
        if (index > 0) {
            move(index, index - 1);
        }
    };

    return (
        <div className="group flex relative flex-col gap-2 bg-background p-3 rounded-lg border text-sm" onClick={handleActiveElement} >
            <Label className={'capitalize'}>
                {field.label}
                {field.required && <span className="text-destructive">*</span>}
            </Label>
            {/* for text filed  */}
            {toTextField.includes(field.type) &&
                <Input
                    type={field.type}
                    readOnly={!isPreview}
                    disabled={!isPreview}
                    className={'text-sm'}
                    placeholder={field.placeholder}
                />
            }
            {/* for text area  */}
            {field.type === "textarea" &&
                <Textarea
                    type={field.type}
                    readOnly={!isPreview}
                    disabled={!isPreview}
                    className={"resize-none h-18 text-sm"}
                    placeholder={field.placeholder}
                />
            }
            {/* for radio btn  */}
            {
                field.type === 'radio' &&
                <RadioGroup
                    readOnly={!isPreview}
                    className={'text-sm'}
                    disabled={!isPreview}>
                    {
                        !field.options.length > 0 ? "Add Properties" :
                            field?.options?.map((el) => {
                                return <div className="flex items-center space-x-2">
                                    <RadioGroupItem value={el.toLowerCase()} id={field.id} />
                                    <Label htmlFor={field.id}>{el}</Label>
                                </div>
                            })
                    }
                </RadioGroup>
            }
            {/* for select  */}
            {field.type === "select" &&
                <Select
                    readOnly={!isPreview}
                    disabled={!isPreview}
                >
                    <SelectTrigger className="w-full text-sm">
                        <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            field?.options?.map((el) => {
                                return <SelectItem value={el} className={"capitalize"}>{el}</SelectItem>
                            })
                        }
                    </SelectContent>
                </Select>
            }
            {/* for checkbox  */}
            {
                field.type === "checkbox" &&
                <div className="flex space-x-2 min-h-10 flex-col gap-2">
                    {
                        !field.options.length > 0 ? "Add Properties" :
                            field?.options?.map((el) => {
                                return <div className='flex gap-2'>
                                    <Checkbox id={el.toLowerCase()}
                                        readOnly={!isPreview}
                                        disabled={!isPreview} />
                                    <label
                                        htmlFor={el.toLowerCase()}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                                    >
                                        {el}
                                    </label>
                                </div>
                            })
                    }
                </div>
            }
            {/* toolbox  */}
            {
                !isPreview &&
                <div className='bg-gradient-to-l to-background/10 from-destructive/40 w-23 h-full opacity-0 group-hover:opacity-100 absolute right-1 top-0 px-5 py-2 flex flex-col gap-1 justify-between items-end pr-2 transition-all duration-150 rounded-r-lg'>
                    <Button
                        type="button"
                        size={'sm'}
                        className={'w-8'}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleMoveUp();
                        }}
                        disabled={index === 0}>
                        <ArrowUp />
                    </Button>
                    <Button type="button"
                        className={'w-8'}
                        size={'sm'}
                        variant={'destructive'}
                        onClick={(e) => {
                            e.stopPropagation();
                            remove(index);
                        }}>
                        <Trash2 />
                    </Button>
                </div>
            }
        </div>
    )
}

export default SelectedField
