import { PageHeader } from '@/components/custom';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSubmission } from '@/hooks/useSubmission';
import { formatDate, formatDistance, subDays } from 'date-fns';
import { ListOrdered } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';

function Submission() {
  const { getSubmissions: { data, isLoading } } = useSubmission();
  const submissions = data?.data;

  function getDate(timestamp) {
    // return formatDistance(new Date(timestamp), new Date(), { addSuffix: true });
    return formatDate(new Date(timestamp), "dd-LLL-yyyy")
  }


  return (
    <section className='p-3'>
      <PageHeader title={"Submissions"} />
      <div className='my-2'>
        <Table>
          <TableCaption>A list of your form submissions.</TableCaption>
          <TableHeader>
            <TableRow >
              <TableHead>Id</TableHead>
              <TableHead className='w-2/6'>Form Title</TableHead>
              <TableHead >Date</TableHead>
              <TableHead  >Location</TableHead>
              <TableHead className='text-right'>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              submissions?.map((submission, index) => {
                return <TableRow key={submission._id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell >{submission.formInfo?.title}</TableCell>
                  <TableCell >{getDate(submission.createdAt)}</TableCell>
                  <TableCell >{submission?.clientIp !== "::1" ? submission.clientIp : "127.0.0.1"}</TableCell>
                  <TableCell className='text-right'>
                    <Button size={'sm'} >View<ArrowUpRight /></Button>
                  </TableCell>
                </TableRow>
              })
            }

          </TableBody>
        </Table>
      </div>
    </section>
  )
}

export default Submission