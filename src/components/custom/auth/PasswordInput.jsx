import { Input } from '@/components/ui/input';
import { EyeClosed } from 'lucide-react';
import { Eye } from 'lucide-react';
import { useState } from 'react'

function PasswordInput(props) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex relative text-gray-700">
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
                {showPassword ? <Eye /> : <EyeClosed />}
            </button>

            <Input {...props} type={showPassword ? "text" : "password"} />
        </div>
    );
}

export default PasswordInput
