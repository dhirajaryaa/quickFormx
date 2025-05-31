import { PageHeader } from '@/components/custom';
import SubmissionTable from '@/components/custom/submission/SubmissionTable';
import { Button } from '@/components/ui/button';
import { useSubmission } from '@/hooks/useSubmission';
import { RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';

function Submission() {
  const { getSubmissions: { data, isLoading, refetch, isRefetching } } = useSubmission();

  const submissions = data?.data;

  async function refetchSubmissions() {
    await refetch();
    toast.success("Submissions Refreshed✨")
  }


  return (
    <section className='p-3'>
      <PageHeader title={"Submissions"} >
        <Button variant='outline' size='sm' onClick={refetchSubmissions}>
          <RefreshCcw className={`${isRefetching && 'animate-spin'}`} />
          <span className='hidden sm:inline-block'>Refresh</span>
        </Button>
      </PageHeader>
      <div className='my-2'>
        {/* table  */}
        <SubmissionTable submissions={submissions || []} isLoading={isLoading} />
      </div>
    </section>
  )
}

export default Submission