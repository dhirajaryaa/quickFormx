import { InputField } from "@/components/custom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { useForm as useFormHook } from "@/hooks/useForm"
import { useParams } from "react-router"

function FormPublic() {
  const { publicID } = useParams();
  const { getPublicForm: { data, isLoading } } = useFormHook(publicID)  
  
  const form = data?.data;

  const { handleSubmit, register, control, formState: { errors }, reset } = useForm();

  function handleFormSubmit(formdata) {

    console.log(formdata);


  }

  if (isLoading) {
    return <section className="w-full h-screen flex items-center justify-center">
      <Loader2 className="size-9 animation-spin" />
    </section>
  }


  return (
    <section className='sm:p-6 px-3 bg-accent w-full min-h-screen flex items-center justify-center'>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={'max-w-xl flex-1'} >
        <Card className={'w-full h-full'}>
          <CardHeader className={'text-center'}>
            <CardTitle className={'text-lg sm:text-2xl font-bold truncate'}>{form.title}</CardTitle>
            <CardDescription className={'line-clamp-2 sm:line-clamp-none'}>{form.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {/* form  */}
            <div className="grid gap-4">

              {
                form?.fields.map((field, index) => {
                  return <InputField field={field} errors={errors} register={register} control={control} key={index} index={index} />
                })
              }
            </div>


          </CardContent>
          <CardFooter className={'flex gap-2 justify-end'}>
            <Button variant={'outline'} type="reset" onClick={reset}>
              {
                false ? <Loader2 className="animate-spin size-7" /> :
                  <span>Cancel</span>

              }
            </Button>
            <Button type='submit'>
              {
                false ? <Loader2 className="animate-spin size-7" /> : <>
                  <Send />
                  <span>Submit</span>
                </>
              }
            </Button>
          </CardFooter>
        </Card>
        {/* branding  */}
        {
          form?.branding === "QuickFormX" &&
          <p className="text-center text-sm text-foreground/75 my-3">Made with <a className="text-foreground font-semibold">{form.branding}</a></p>
        }
      </form>
    </section>
  )
}

export default FormPublic