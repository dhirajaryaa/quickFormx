import { InputField } from "@/components/custom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { useForm as useFormHook } from "@/hooks/useForm"
import { useParams } from "react-router"

function FormPublic() {
  const { publicID } = useParams();

  const { getForm: { data, isLoading } } = useFormHook(publicID)
  const form = data?.data[0];

  

  // const form = {
  //   "_id": "6837acc49235103de0bbdcce",
  //   "title": "Job Application Form",
  //   "description": "This form collects detailed information from job applicants. It's designed to capture not just basic personal data but also educational background, work experience, and skills. The form helps HR teams filter suitable candidates for interviews and future roles.",
  //   "authUser": false,
  //   "publicUrl": "http://localhost:5173/form/42005c7c-88dc-4bea-bd4f-70a97f04af01",
  //   "proForm": false,
  //   "branding": "QuickFormX",
  //   "isDraft": false,
  //   "fields": [
  //     {
  //       "label": "Full Name",
  //       "name": "full_1748479172660",
  //       "required": true,
  //       "type": "text",
  //       "placeholder": "Enter full name",
  //       "options": []
  //     },
  //     {
  //       "label": "email",
  //       "name": "email_1748479172660",
  //       "required": true,
  //       "type": "email",
  //       "placeholder": "Enter email address",
  //       "options": []
  //     },
  //     {
  //       "label": "Mobile No.",
  //       "name": "mobile_1748479172660",
  //       "required": true,
  //       "type": "number",
  //       "placeholder": "Enter mobile no",
  //       "options": []
  //     },
  //     {
  //       "label": "Education",
  //       "name": "education_1748479172660",
  //       "required": true,
  //       "type": "textarea",
  //       "placeholder": "Enter your  Education Details here",
  //       "options": []
  //     },
  //     {
  //       "label": "LInkedin Profile",
  //       "name": "linkedin_1748479172660",
  //       "required": true,
  //       "type": "url",
  //       "placeholder": "Give me Linkedin Profile Link",
  //       "options": []
  //     },
  //     {
  //       "label": "Github",
  //       "name": "github_1748479172660",
  //       "required": true,
  //       "type": "url",
  //       "placeholder": "Give me github profile link",
  //       "options": []
  //     },
  //     {
  //       "label": "Any Message",
  //       "name": "any_1748479172660",
  //       "required": false,
  //       "type": "textarea",
  //       "placeholder": "Any message for query",
  //       "options": []
  //     },
  //     {
  //       "label": "Preferred Job Role",
  //       "name": "job_role_1748479172660",
  //       "required": true,
  //       "type": "select",
  //       "placeholder": "Select your preferred role",
  //       "options": [
  //         { "value": "Frontend Developer", "checked": false },
  //         { "value": "Backend Developer", "checked": false },
  //         { "value": "Full Stack Developer", "checked": true },
  //         { "value": "UI/UX Designer", "checked": false }
  //       ]
  //     },
  //     {
  //       "label": "Employment Type",
  //       "name": "employment_type_1748479172660",
  //       "required": true,
  //       "type": "radio",
  //       "placeholder": "",
  //       "options": [
  //         { "value": "Full-time", "checked": true },
  //         { "value": "Part-time", "checked": false },
  //         { "value": "Internship", "checked": false },
  //         { "value": "Freelance", "checked": false }
  //       ]
  //     },
  //     {
  //       "label": "Technical Skills",
  //       "name": "skills_1748479172660",
  //       "required": true,
  //       "type": "checkbox",
  //       "placeholder": "",
  //       "options": [
  //         { "value": "HTML", "checked": true },
  //         { "value": "CSS", "checked": true },
  //         { "value": "JavaScript", "checked": true },
  //         { "value": "React", "checked": false },
  //         { "value": "Node.js", "checked": false },
  //         { "value": "Git", "checked": true }
  //       ]
  //     },
  //     {
  //       "label": "Available to Start",
  //       "name": "start_date_1748479172660",
  //       "required": true,
  //       "type": "date",
  //       "placeholder": "Select your available start date",
  //       "options": []
  //     }
  //   ],
  //   "userId": "6836336830153646cf416e5a",
  //   "createdAt": "2025-05-29T00:39:32.399Z",
  //   "updatedAt": "2025-05-29T00:39:32.399Z",
  //   "__v": 0,
  //   "userInfo": {
  //     "_id": "6836336830153646cf416e5a",
  //     "name": "Dhiraj Arya",
  //     "username": "draj22779_1748382568749",
  //     "avatar": {
  //       "url": "https://lh3.googleusercontent.com/a/ACg8ocJcIVhZWzYOzxypeZwPeYPc0fWtnP_p7oBgbSTteBxe8B077f7x=s96-c",
  //       "publicId": ""
  //     }
  //   }
  // };

  // console.log(form);

  // useForm hook 

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
    <section className='sm:p-6 p-0 bg-accent w-full min-h-screen flex items-start sm:items-center justify-center'>
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