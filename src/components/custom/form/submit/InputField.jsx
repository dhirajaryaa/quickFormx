import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Controller } from "react-hook-form";

function InputField({ field, errors, register, control, index }) {
  const toTextField = ["text", "password", "email", "url", "number", "file"];
  const error = errors?.[field.name];


  return (
    <div className="grid gap-1" >
      <Label htmlFor={`${field.type}_${index}`} className={'capitalize'}>{field.label} <span className={`text-destructive ${field.required ? "block" : "hidden"}`}>*</span></Label>

      {
        toTextField.includes(field.type) &&
        <Input
          type={field.type}
          id={`${field.type}_${index}`}
          className={'text-sm'}
          {...register(field.name, { required: field.required && `${field.label.toLowerCase()} is required` })}
          placeholder={field.placeholder}
          aria-invalid={error ? true : false}
        />
      }
      {/* for text area  */}
      {field.type === "textarea" &&
        <Textarea
          id={`${field.type}_${index}`}
          type={field.type}
          className={"min-h-18 text-sm"}
          {...register(field.name, { required: field.required && `${field.label.toLowerCase()} is required` })}
          placeholder={field.placeholder}
          aria-invalid={error ? true : false}
        />
      }
      {/* for radio btn  */}
      {
        field.type === 'radio' &&
        <Controller
          name={field.name}
          control={control}
          defaultValue={""}
          rules={{
            validate: (value) => field.required ? !!value || `${field.label} is required` : false
          }}
          render={({ field: radioInput }) => (
            <RadioGroup
              value={radioInput.value || ""}
              onValueChange={radioInput.onChange}
              className={'text-sm'}>
              {
                field?.options?.map((el, idx) => {
                  return <div className="flex items-center space-x-2" key={idx}>
                    <RadioGroupItem value={el.value?.toLowerCase()} id={`${el.value}_${idx}`} className={"bg-accent"} />
                    <Label htmlFor={`${el.value}_${idx}`}>{el.value}</Label>
                  </div>
                })
              }
            </RadioGroup>
          )}
        />
      }
      {/* for select  */}
      {field.type === "select" &&
        <Controller
          control={control}
          name={field.name}
          defaultValue={""}
          rules={{
            validate: (value) => field.required ? !!value || `${field.label} is required` : true
          }}
          render={({ field: selectInput }) => (
            <Select
              value={selectInput.value}
              onValueChange={selectInput.onChange}
            >
              <SelectTrigger className="w-full text-sm">
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {
                  field?.options?.map((el, idx) => {
                    return <SelectItem value={el.value.toLowerCase()} key={idx} className={"capitalize"}>{el.value}</SelectItem>
                  })
                }
              </SelectContent>
            </Select>
          )}
        />
      }
      {/* for checkbox  */}
      {
        field.type === "checkbox" &&
        <Controller
          name={field.name}
          control={control}
          defaultValue={[]}
          rules={{
            validate: (value) => field.required ? (value && value.length > 0) || `${field.label} is required` : false
          }}
          render={({ field: checkboxInput }) => (
            <div className="flex space-x-2 min-h-10 flex-col gap-2">
              {
                field?.options?.map((el, index) => {
                  const handleChange = (checked) => {
                    if (checked) {
                      checkboxInput.onChange([...checkboxInput.value, el.value])
                    }
                    else {
                      checkboxInput.onChange(
                        checkboxInput.value.filter((v) => v !== el.value)
                      )
                    }
                  }
                  return <div className='flex gap-2' key={index}>
                    <Checkbox id={el.value.toLowerCase()}
                      checked={checkboxInput.value?.includes(el.value)}
                      onCheckedChange={handleChange}
                      className={"bg-accent"}
                      value={el.value}
                    />
                    <label
                      htmlFor={el.value.toLowerCase()}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                    >
                      {el.value}
                    </label>
                  </div>
                })
              }
            </div>
          )}
        />
      }
      {/* for data picker */}
      {field.type === "date" &&
        <Controller
          name={field.name}
          control={control}
          defaultValue={null}
          rules={{
            validate: (value) => field.required ? !!value || `${field.label} date is required` : true
          }}
          render={({ field: datePickerInput }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  type="button"
                  className={
                    "w-[250px] justify-start text-left font-normal"
                  }
                >
                  <CalendarIcon />
                  {datePickerInput.value ? format(datePickerInput.value, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={datePickerInput.value || ""}
                  onSelect={date => datePickerInput.onChange(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        />
      }
      {/* Error message */}
      {error && <p className="text-xs text-destructive">{error.message}</p>}
    </div>
  )
}

export default InputField