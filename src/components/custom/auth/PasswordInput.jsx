import { Input } from '@/components/ui/input';
import { EyeClosed } from 'lucide-react';
import { Eye } from 'lucide-react';
import { useState } from 'react'

function PasswordInput({ error, register }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex flex-col relative text-gray-700">
            <div className="relative">
                <Input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    aria-invalid={error ? "true" : "false"}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? <Eye /> : <EyeClosed />}
                </button>
            </div>
            {error && <span className="text-destructive text-xs mt-1">{error.message}</span>}
        </div>
    );
}

export default PasswordInput
