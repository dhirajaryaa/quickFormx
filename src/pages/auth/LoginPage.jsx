import { GoogleLogin, Logo, PasswordInput } from '@/components/custom'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schema/login'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'


function LoginPage() {
    const navigate = useNavigate()
    const { loginHandler: {isPending, mutateAsync,error } } = useAuth()
    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: zodResolver(loginSchema)
    })
  async  function handleLogin({ email, password }) {
    const res = await mutateAsync({ identifier: email, password })
    if(res.statusCode >= 400){
        toast.error(res.message)
    }else{
        navigate("/dashboard")
    }
    }

    return (
        <main className='flex items-center justify-center w-full h-screen flex-col gap-4 bg-muted p-4'>
            {/* <Logo /> */}
            <div className={"flex flex-col gap-6"}>
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="mb-3">
                            <Logo />
                        </CardTitle>
                        <CardDescription>
                            Login with your Email or Google account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className='grid-gap-6' onSubmit={handleSubmit(handleLogin)}>
                            {/* google login  */}
                            <GoogleLogin />
                            <div className="my-2 relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        {...register("email")}
                                        aria-invalid={errors.email ? "true" : "false"}
                                    />
                                    {
                                        errors.email && <span className='text-destructive text-xs'>{errors.email.message}</span>
                                    }
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <PasswordInput error={errors.password} register={register} />
                                </div>
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                            </div>
                            <div className="text-center text-sm mt-2">
                                Don&apos;t have an account?
                                <Link to="/register" className="ml-2 underline underline-offset-4">
                                    Register
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <div className="text-balance text-center text-xs max-w-md text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
                    By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                    and <a href="#">Privacy Policy</a>.
                </div>
            </div>


        </main>
    )
}

export default LoginPage
