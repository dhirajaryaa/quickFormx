import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

function SelectedField({ field }) {
    const toTextField = ["text", "password", "email", "url", "number", "date","file"];
    return (
        <div className="flex flex-col gap-2 bg-background p-3 rounded-lg border" >
            <Label>
                {field.label}
                {field.required && <span className="text-destructive">*</span>}
            </Label>
            {/* for text filed  */}
            {toTextField.includes(field.type) &&
                <Input
                    type={field.type}
                    readOnly
                    disabled
                    placeholder={field.placeholder}
                />
            }
            {/* for text area  */}
            {field.type === "textarea" &&
                <Textarea
                    type={field.type}
                    readOnly
                    className={"resize-none h-18"}
                    disabled
                    placeholder={field.placeholder}
                />
            }
        </div>
    )
}

export default SelectedField
