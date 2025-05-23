"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";

function PropertiesEditor({ activeElement, update, setActiveElement }) {
    const [open, setOpen] = useState(false);
    const [formState, setFormState] = useState({});

    const editableTypes = [
        "text",
        "email",
        "password",
        "number",
        "url",
        "date",
        "checkbox",
        "radio",
        "file",
        "textarea",
        "select",
    ];

    const isEditable = editableTypes.includes(activeElement?.type);

    useEffect(() => {
        if (isEditable && activeElement) {
            setFormState({ ...activeElement });
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [activeElement]);

    const handleChange = (field, value) => {
        setFormState((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        const { index, ...dataWithoutIndex } = formState;
        update(index, dataWithoutIndex);
        setOpen(false);
        setActiveElement(null);
    };


    if (!isEditable) return null;

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit Properties</SheetTitle>
                    <SheetDescription>
                        Make changes to the selected element. Click "Save" when you're done.
                    </SheetDescription>
                </SheetHeader>

                <div className="grid gap-4 p-4">
                    <div className="grid items-center gap-1">
                        <Label htmlFor="label" className="text-right">Label</Label>
                        <Input
                            id="label"
                            value={formState.label || ""}
                                   className={'text-sm'}
                            onChange={(e) => handleChange("label", e.target.value)}
                        />
                    </div>

                    <div className="grid items-center gap-1">
                        <Label htmlFor="placeholder" className="text-right">Placeholder</Label>
                        <Input
                            id="placeholder"
                            value={formState.placeholder || ""}
                            className={'text-sm'}
                            onChange={(e) => handleChange("placeholder", e.target.value)}
                        />
                    </div>

                    <div className="flex justify-between items-center px-3 gap-4 text-sm">
                        <Label htmlFor="required" className="text-right">Required</Label>
                        <Switch
                            id="required"
                            checked={formState.required || false}
                            onCheckedChange={(checked) => handleChange("required", checked)}
                        />
                    </div>
                </div>

                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="button" onClick={handleSave}>
                            Save Changes
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export default PropertiesEditor;
