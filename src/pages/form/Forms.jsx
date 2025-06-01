import { CreateFormModal, FormSkeleton, PageHeader } from '@/components/custom'
import FormCard from '@/components/custom/form/FormCard';
import { useForm } from '@/hooks/useForm'
import useStore from '@/store';
import { Suspense,useEffect } from 'react';

function Forms() {
    const { getAllForm: { data, isLoading } } = useForm();
    const { forms, setForms } = useStore();

    useEffect(() => {
        if (data) {
            setForms(data?.data);
        }
    }, [data, setForms]);

    return (
        <main className='py-3 px-4'>
            {/* header  */}
            <PageHeader title={"My Forms"} />
            {/* content  */}
            <section className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-4 py-3'>
                {/* create new task */}
                <CreateFormModal />
                <Suspense fallback={[1, 2, 3, 4].map((el) => <FormSkeleton key={el} />)}>
                    {
                        forms?.map((form) =>
                            <FormCard form={form} key={form._id} />)
                    }
                </Suspense>
            </section>
        </main>
    )
}

export default Forms
