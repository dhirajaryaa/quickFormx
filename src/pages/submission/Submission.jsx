import { PageHeader } from '@/components/custom';
import SubmissionTable from '@/components/custom/submission/SubmissionTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSubmission } from '@/hooks/useSubmission';
import { Search } from 'lucide-react';
import { RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

function Submission() {
  const [globalFilter, setGlobalFilter] = useState("");

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
      <section className='w-full mt-2'>
        {/* search */}
        <div className='relative w-full p-1'>
          <Input
            placeholder="Search ..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value || "")}
            className='w-full sm:w-2/6 pl-10 rounded-md focus:ring-1 focus:outline-none'
          />
          <Search
            className='absolute top-1/2 left-3 transform -translate-y-1/2 text-foreground/50'
          />
        </div>

      </section>
      <div className='my-2'>
        {/* table */}
        <SubmissionTable
          submissions={submissions || []}
          isLoading={isLoading}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
    </section>
  )
}

export default Submission