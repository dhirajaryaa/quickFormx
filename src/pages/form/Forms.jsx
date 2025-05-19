import { PageHeader } from '@/components/custom'
import FormCard from '@/components/custom/form/FormCard';
import { Button } from '@/components/ui/button'
import { useForm } from '@/hooks/useForm'
import useStore from '@/store';
import { PlusCircle } from 'lucide-react'
import { useEffect } from 'react';

function Forms() {
    const { getAllForm: { data, isLoading } } = useForm();
    const { forms, setForms } = useStore();

    useEffect(() => {
        if (data) {
            setForms(data?.data);
        }
    }, [data, setForms]);

    return (
        <main className='p-3'>
            {/* header  */}
            <PageHeader title={"Forms"}>
                <Button>
                    <PlusCircle />
                    <span>Create Form</span>
                </Button>
            </PageHeader>
            {/* content  */}
            <section className='flex items-center flex-wrap gap-2 mt-3 mx-auto'>

                {
                    forms?.map((form) => {
                        return <FormCard key={form._id} form={form} />
                    })
                }
            </section>
        </main>
    )
}

export default Forms
