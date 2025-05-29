import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm as useFormHook } from "@/hooks/useForm"
import { Send,Loader2 } from "lucide-react"
import { useParams } from "react-router"

function FormPublic() {
  const { publicID } = useParams();

  // const { getForm: { data } } = useFormHook(publicID)
  // console.log(data);

  const form = {
  "_id": "6837acc49235103de0bbdcce",
  "title": "Job Application Form",
  "description": "This form collects detailed information from job applicants. It's designed to capture not just basic personal data but also educational background, work experience, and skills. The form helps HR teams filter suitable candidates for interviews and future roles.",
  "authUser": false,
  "publicUrl": "http://localhost:5173/form/42005c7c-88dc-4bea-bd4f-70a97f04af01",
  "proForm": false,
  "branding": "QuickFormX",
  "isDraft": false,
  "fields": [
    {
      "label": "Full Name",
      "name": "full_1748479172660",
      "required": true,
      "type": "text",
      "placeholder": "Enter full name",
      "options": []
    },
    {
      "label": "email",
      "name": "email_1748479172660",
      "required": true,
      "type": "email",
      "placeholder": "Enter email address",
      "options": []
    },
    {
      "label": "Mobile No.",
      "name": "mobile_1748479172660",
      "required": true,
      "type": "number",
      "placeholder": "Enter mobile no",
      "options": []
    },
    {
      "label": "Education",
      "name": "education_1748479172660",
      "required": true,
      "type": "textarea",
      "placeholder": "Enter your  Education Details here",
      "options": []
    },
    {
      "label": "LInkedin Profile",
      "name": "linkedin_1748479172660",
      "required": true,
      "type": "url",
      "placeholder": "Give me Linkedin Profile Link",
      "options": []
    },
    {
      "label": "Github",
      "name": "github_1748479172660",
      "required": true,
      "type": "url",
      "placeholder": "Give me github prfile link",
      "options": []
    },
    {
      "label": "Any Message",
      "name": "any_1748479172660",
      "required": false,
      "type": "textarea",
      "placeholder": "Any message for query",
      "options": []
    }
  ],
  "userId": "6836336830153646cf416e5a",
  "createdAt": "2025-05-29T00:39:32.399Z",
  "updatedAt": "2025-05-29T00:39:32.399Z",
  "__v": 0,
  "userInfo": {
    "_id": "6836336830153646cf416e5a",
    "name": "Dhiraj Arya",
    "username": "draj22779_1748382568749",
    "avatar": {
      "url": "https://lh3.googleusercontent.com/a/ACg8ocJcIVhZWzYOzxypeZwPeYPc0fWtnP_p7oBgbSTteBxe8B077f7x=s96-c",
      "publicId": ""
    }
  }
};
  

  return (
    <section className='p-6 bg-accent/80 w-full h-screen'>
      <Card className={'max-w-3xl mx-auto '}>
        <CardHeader className={'text-center'}>
          <CardTitle className={'text-lg sm:text-2xl font-bold'}>Contact Page</CardTitle>
          <CardDescription>this is simple</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter className={'flex gap-2 justify-end'}>
          <Button variant={'outline'} type="reset">
            {
              false ? <Loader2 className="animate-spin size-7" /> :
                <span>Cancel</span>

            }
          </Button>
          <Button>
            {
              false ? <Loader2 className="animate-spin size-7" /> : <>
                <Send />
                <span>Submit</span>
              </>
            }
          </Button>
        </CardFooter>
      </Card>
    </section>
  )
}

export default FormPublic