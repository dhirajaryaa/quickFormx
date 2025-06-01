import { Button } from '@/components/ui/button';
import { ClipboardPlus } from 'lucide-react';
import { Link } from 'lucide-react';
import { useState } from 'react';

function ClipBoardLink({ link }) {
    const [copy, setCopy] = useState(false);
    const publicUrl = `${import.meta.env.VITE_CLIENT_URL}/form/${link}`;

    function copyToClipboard(url) {
        navigator.clipboard.writeText(url);
        setCopy(true)
        setTimeout(() => setCopy(false), 1500); // reset after 1.5s
    }

    return (

        <Button type="button" size='sm' onClick={() => copyToClipboard(publicUrl)} variant="link" className={`${!copy ? "text-blue-500" : "text-rose-500"} text-xs`} >
            {copy ? <>
                <ClipboardPlus /> Copied!
            </> : <>
                <Link /> Copy
            </>}
        </Button>

    )
}

export default ClipBoardLink