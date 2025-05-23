import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowUp } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from '@/components/ui/checkbox';

function SelectedField({ field, remove, index, move, isPreview }) {
    const toTextField = ["text", "password", "email", "url", "number", "date", "file"];

    const handleMoveUp = () => {
        if (index > 0) {
            move(index, index - 1);
        }
    };

    return (
        <div className="group flex relative flex-col gap-2 bg-background p-3 rounded-lg border" >
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
                    placeholder={field.placeholder}
                />
            }
            {/* for text area  */}
            {field.type === "textarea" &&
                <Textarea
                    type={field.type}
                    readOnly={!isPreview}
                    disabled={!isPreview}
                    className={"resize-none h-18"}
                    placeholder={field.placeholder}
                />
            }
            {/* for radio btn  */}
            {
                field.type === 'radio' &&
                <RadioGroup
                    readOnly={!isPreview}
                    disabled={!isPreview}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="default" id="r1" />
                        <Label htmlFor="r1">Default</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="comfortable" id="r2" />
                        <Label htmlFor="r2">Comfortable</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="compact" id="r3" />
                        <Label htmlFor="r3">Compact</Label>
                    </div>
                </RadioGroup>
            }
            {/* for select  */}
            {field.type === "select" &&
                <Select
                    readOnly={!isPreview}
                    disabled={!isPreview} >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            }
            {/* for checkbox  */}
            {
                field.type === "checkbox" &&
                <div className="flex items-center space-x-2 min-h-10">
                    <Checkbox id="terms"
                        readOnly={!isPreview}
                        disabled={!isPreview} />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Accept terms and conditions
                    </label>
                </div>
            }
            {/* toolbox  */}
            <div className='bg-gradient-to-l to-background/10 from-destructive/40 w-23 h-full opacity-0 group-hover:opacity-100 absolute right-1 top-0 px-5 py-2 flex flex-col gap-1 justify-between items-end pr-2 transition-all duration-150 rounded-r-lg'>
                <Button type="button" size={'sm'} className={'w-8'} onClick={handleMoveUp} disabled={index === 0}>
                    <ArrowUp />
                </Button>
                <Button type="button" className={'w-8'} size={'sm'} variant={'destructive'} onClick={() => remove(index)}>
                    <Trash2 />
                </Button>
            </div>
        </div>
    )
}

export default SelectedField
