import { FormSelector, PageHeader } from '@/components/custom';
import SubmissionTable from '@/components/custom/submission/SubmissionTable';
import { Button } from '@/components/ui/button';
import { useSubmission } from '@/hooks/useSubmission';
import { RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

function Submission() {
  const [selectForm, setSelectForm] = useState("all");
  const { getSubmissions: { data, isLoading, refetch, isRefetching } } = useSubmission();

  const submissions = data?.data;

  async function refetchSubmissions() {
    await refetch();
    toast.success("Submissions Refreshed✨")
  }


  return (
    <section className='p-3'>
      <PageHeader title={"Submissions"} />
      <div>
        <div className='flex items-center justify-between gap-2 my-2 bg-accent p-2 rounded-lg border'>
          {/* refresh btn  */}
          <Button variant='outline' size='sm' onClick={refetchSubmissions}>
            <RefreshCcw className={`${isRefetching && 'animate-spin'}`} />
          </Button>
          {/* form selector  */}
          <FormSelector forms={submissions} setSelectForm={setSelectForm} selectForm={selectForm} />
        </div>
        {/* table  */}
        <SubmissionTable submissions={submissions || []} />
      </div>
    </section>
  )
}

export default Submission