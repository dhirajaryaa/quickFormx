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
import { registerSchema } from '@/schema/register'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'
import { Loader2 } from 'lucide-react'


function RegisterPage() {
    const navigate = useNavigate();
    const { registerHandler: { isPending, mutateAsync } } = useAuth();
    const { register, formState: { errors }, handleSubmit, setError } = useForm({
        resolver: zodResolver(registerSchema)
    })
    async function handleRegister({ name, username, email, password }) {
        const res = await mutateAsync({ email, password, name, username })
        if (res.statusCode >= 400) { // error
            toast.error(res.message);
            setError("root", { type: "custom", message: res.message });
        } else { // success
            navigate("/login");
            toast.error(`Email send on ${email} verify account first!`);
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
                            Register with your Email or Google account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(handleRegister)}>
                            {/* google login  */}
                            <GoogleLogin label="Register" />
                            <div className="my-2 relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                            <div className="grid gap-4 grid-cols-2">
                                {/* name */}
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        {...register("name")}
                                        aria-invalid={errors.name ? "true" : "false"}
                                    />
                                    {
                                        errors.name && <span className='text-destructive text-xs'>{errors.name.message}</span>
                                    }
                                </div>
                                {/* username */}
                                <div className="grid gap-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        {...register("username")}
                                        aria-invalid={errors.username ? "true" : "false"}
                                    />
                                    {
                                        errors.username && <span className='text-destructive text-xs'>{errors.username.message}</span>
                                    }
                                </div>
                                {/* email  */}
                                <div className="grid gap-2 col-span-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        {...register("email")}
                                        aria-invalid={errors.email ? "true" : "false"}
                                    />
                                    {
                                        errors.email && <span className='text-destructive text-xs'>{errors.email.message}</span>
                                    }
                                </div>

                                {/* password */}
                                <div className="grid gap-2 col-span-2">
                                    <Label htmlFor="password">Password</Label>
                                    <PasswordInput error={errors.password} register={register} />
                                </div>
                                <Button type="submit" className="w-full col-span-2" disabled={isPending}>
                                    {isPending ? <Loader2 className='size-7 animate-spin' /> : "Register"}
                                </Button>
                                {
                                    errors.root && <span className='text-destructive text-sm text-center col-span-2'>{errors.root.message}</span>
                                }
                            </div>
                            <div className="text-center text-sm mt-2">
                                Already have an account?
                                <Link to="/login" className="ml-2 underline underline-offset-4">
                                    Login
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

export default RegisterPage;
