import { InputField } from "@/components/custom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { useForm as useFormHook } from "@/hooks/useForm"
import { useParams } from "react-router"
import { useSubmission } from "@/hooks/useSubmission"
import { toast } from "sonner"
import { submissionSchema } from "@/schema/submission"
import { zodResolver } from "@hookform/resolvers/zod"
import { RefreshCcw } from "lucide-react"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router"
import { z } from "zod";
import ReactConfetti from "react-confetti"

function FormPublic() {
  const { publicID } = useParams();
  const navigate = useNavigate();

  const verifyingID = z.string().uuid("Invalid form ID format").safeParse(publicID);

  const { getPublicForm: { data, isLoading, refetch, isRefetching } } = useFormHook(verifyingID.data);

  const form = data?.data;

  const { handleSubmit, register, control, formState: { errors }, reset } = useForm({
    resolver: zodResolver(submissionSchema(form?.fields || []))
  });
  const { saveUserSubmission: { mutateAsync, isPending, isSuccess } } = useSubmission();

  async function handleFormSubmit(formdata) {
    const transformData = Object.entries(formdata).map(([name, value]) => ({ name, value }))
    const response = await mutateAsync({ formId: form._id, data: transformData });

    if (response.statusCode >= 400) {
      toast.error(response.message || "Something went wrong while saving.");
      return;
    } else {
      toast.success(response.message);
      reset();
    }
  }

  if (isLoading) {
    return <section className="w-full h-screen flex items-center justify-center">
      <Loader2 className="size-9 animate-spin" />
    </section>
  }


  return (
    <>
      <section className='sm:p-6 px-3 bg-accent w-full min-h-screen flex items-center justify-center'>
        {
          form ?
            <form onSubmit={handleSubmit(handleFormSubmit)} className={'max-w-xl flex-1'} >
              <Card className={'w-full h-full'}>
                <CardHeader className={'text-center'}>
                  <CardTitle className={'text-lg sm:text-2xl font-bold truncate'}>{form?.title}</CardTitle>
                  <CardDescription className={'line-clamp-2 sm:line-clamp-none'}>{form?.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {
                      form?.fields.map((field, index) => {
                        return <InputField field={field} errors={errors} register={register} control={control} key={index} index={index} />
                      })}
                  </div>
                </CardContent>
                <CardFooter className={'flex gap-2 justify-end'}>
                  <Button variant={'outline'} type="reset" onClick={reset}>Reset Form</Button>
                  <Button type='submit'>
                    {
                      isPending ? <Loader2 className="animate-spin size-7" /> : <>
                        <Send />
                        <span>Submit</span>
                      </>
                    }
                  </Button>
                </CardFooter>
              </Card>
              {
                form?.branding === "QuickFormX" &&
                <p className="text-center text-sm text-foreground/75 my-3">Made with <a target="_blank" href="https://quickformx.dhirajarya.xyz" className="text-foreground font-semibold">{form.branding}</a></p>
              }
            </form> :
            <div className="max-w-xl mx-auto text-center space-y-4">
              <div className="text-2xl font-semibold">⚠️ Form Not Found</div>
              <p className="text-base">
                We couldn’t load your form from the database. This might be due to a network issue or the form may have been deleted.
              </p>
              <div className="flex justify-center gap-4">
                <Button variant={'outline'} onClick={() => navigate(-1)}>
                  <ArrowLeft /> Go Back
                </Button>
                <Button onClick={refetch}>
                  <RefreshCcw className={`${isRefetching && "animate-spin"}`} />
                  Retry
                </Button>
              </div>
            </div>
        }
      </section>

      {
        isSuccess &&
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
        />
      }
    </>
  )
}

export default FormPublic