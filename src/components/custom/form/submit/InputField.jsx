import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Controller } from "react-hook-form";

function InputField({ field, errors, register, index, control }) {
  const toTextField = ["text", "password", "email", "url", "number", "file"];
  const error = errors?.[field.name];

  function handleCheckBoxChange(e){
console.log(e);

  }



  return (
    <div className="grid gap-1" >
      <Label htmlFor={field.id} className={'capitalize'}>{field.label} <span className={`text-destructive ${field.required ? "block" : "hidden"}`}>*</span></Label>

      {
        toTextField.includes(field.type) &&
        <Input
          type={field.type}
          className={'text-sm'}
          {...register(field.name, { required: field.required && `${field.label.toLowerCase()} is required` })}
          placeholder={field.placeholder}
          aria-invalid={error ? true : false}
        />
      }
      {/* for text area  */}
      {field.type === "textarea" &&
        <Textarea
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
          render={({ field: radioInput }) => (
            <RadioGroup
              value={radioInput.value || ""}
              onValueChange={radioInput.onChange}
              className={'text-sm'}>
              {
                field?.options?.map((el, idx) => {
                  return <div className="flex items-center space-x-2" key={idx}>
                    <RadioGroupItem value={el.value.toLowerCase()} id={field.id} className={"bg-accent"} />
                    <Label htmlFor={field.id}>{el.value}</Label>
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
          render={({ field: selectInput }) => (
            <Select
              value={selectInput.value || ""}
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
          render={({ field: checkboxInput }) => (
            <div className="flex space-x-2 min-h-10 flex-col gap-2">
              {
                field?.options?.map((el, index) => {
                  console.log(el);
                  
                  return <div className='flex gap-2' key={index}>
                    <Checkbox id={el.value.toLowerCase()}
                      checked={!!el.checked}
                      onCheckedChange={handleCheckBoxChange}
                      className={"bg-accent"} />
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
      {/* Error message */}
      {error && <p className="text-xs text-destructive">{error.message}</p>}
    </div>
  )
}

export default InputField