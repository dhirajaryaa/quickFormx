import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function FormSelector({ forms,setSelectForm,selectForm }) {
  
  return (
    <Select value={selectForm} onValueChange={(data)=>setSelectForm(data)} >
      <SelectTrigger >
        <SelectValue placeholder="Select Form" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Forms</SelectItem>
        {
          forms?.map(({ formInfo },index) => (
            <SelectItem key={index} value={formInfo?.title}>{formInfo?.title}</SelectItem>
          ))
        }
      </SelectContent>
    </Select>
  )
}

export default FormSelector