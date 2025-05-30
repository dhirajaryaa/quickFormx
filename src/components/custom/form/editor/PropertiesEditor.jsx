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
            setFormState({
                ...activeElement,
                options: activeElement.options || [],
            });
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
                    {/* Label */}
                    <div className="grid items-center gap-1">
                        <Label htmlFor="label">Label</Label>
                        <Input
                            id="label"
                            value={formState.label || ""}
                            className="text-sm"
                            onChange={(e) => handleChange("label", e.target.value)}
                        />
                    </div>

                    {/* Placeholder */}
                    <div className="grid items-center gap-1">
                        <Label htmlFor="placeholder">Placeholder</Label>
                        <Input
                            id="placeholder"
                            value={formState.placeholder || ""}
                            className="text-sm"
                            onChange={(e) => handleChange("placeholder", e.target.value)}
                        />
                    </div>

                    {/* Required */}
                    <div className="flex justify-between items-center gap-4 text-sm">
                        <Label htmlFor="required">Required</Label>
                        <Switch
                            id="required"
                            checked={formState.required || false}
                            onCheckedChange={(checked) => handleChange("required", checked)}
                        />
                    </div>

                    {/* Options (only for radio, select, checkbox) */}
                    {["radio", "select", "checkbox"].includes(formState.type) && (
                        <div className="grid gap-2">
                            <Label>Options</Label>
                            {formState.options?.map((opt, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <Input
                                        value={opt.value}
                                        onChange={(e) => {
                                            const updatedOptions = [...formState.options,];
                                            updatedOptions[idx] = { ...updatedOptions[idx], value: e.target.value };
                                            handleChange("options", updatedOptions);
                                        }}
                                        className="text-sm"
                                    />
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => {
                                            const updatedOptions = formState.options.filter((_, i) => i !== idx);
                                            handleChange("options", updatedOptions);
                                        }}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}

                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                    handleChange("options", [...(formState.options || []), { value: "" }])
                                }
                            >
                                Add Option
                            </Button>
                        </div>
                    )}
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
