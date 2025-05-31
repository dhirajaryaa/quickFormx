import { useReactTable, createColumnHelper } from "@tanstack/react-table"
import { MapPin } from "lucide-react";
import { Calendar } from "lucide-react";
import { TextCursorInput } from "lucide-react";
import { Hash } from "lucide-react";
import { useState } from "react";
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
import { formatDate } from "date-fns";
import { ArrowUpRight } from "lucide-react";
import { flexRender, getCoreRowModel, getSortedRowModel } from "@tanstack/react-table";
import { SquareMousePointer } from "lucide-react";
import { ArrowUpDownIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";



function SubmissionTable({ submissions, isLoading }) {

    function getDate(timestamp) {
        return formatDate(new Date(timestamp), "dd-LLL-yyyy")
    }

    const columnsHelper = createColumnHelper();

    const columns = [
        // id 
        columnsHelper.accessor("_id", {
            cell: (info) => info.row.index + 1,
            header: () => (
                <span className="flex items-center gap-1">
                    <Hash size={15} />Sr.No.
                </span>
            )
        }),
        // form name 
        columnsHelper.accessor("formInfo.title", {
            cell: (info) => info.getValue(),
            header: () => (
                <span className="flex items-center gap-2">
                    <TextCursorInput size={15} />Form Name
                </span>
            )
        }),
        // date
        columnsHelper.accessor("createdAt", {
            cell: (info) => getDate(info.getValue()),
            header: () => (
                <span className="flex items-center gap-2">
                    <Calendar size={15} />Date
                </span>
            )
        }),
        // location
        columnsHelper.accessor("clientIp", {
            cell: (info) => info.getValue() === "::1" ? "127.0.0.1" : info.getValue(),
            header: () => (
                <span className="flex items-center gap-2">
                    <MapPin size={15} />IP Address
                </span>
            )
        }),
        // action
        columnsHelper.accessor("action", {
            cell: (info) => (
                <Button size="sm" className="text-xs">
                    View
                    <ArrowUpRight size={14} className="ml-1" />
                </Button>
            ),
            header: () => (
                <span className="flex items-center gap-2">
                    <SquareMousePointer size={15} />Action
                </span>
            )
        }),
    ];

    const [sorting, setSorting] = useState([]);
    const table = useReactTable({
        data: submissions,
        columns,
        state: {
            sorting,
        },
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel()
    });
    // console.log(table.getCoreRowModel)

    return (
        <div className="flex gap-3 flex-col">
            <Table>
                <TableCaption>A list of your form submissions.</TableCaption>
                <TableHeader className={'bg-accent'}>
                    {
                        table.getHeaderGroups().map((headersGroup) => (
                            <TableRow key={headersGroup.id} >
                                {headersGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        <div
                                            {...{
                                                className: header.column.getCanSort()
                                                    ? "cursor-pointer select-none flex items-center gap-2" : "",
                                                onClick: header.column.getToggleSortingHandler()
                                            }}>
                                            {
                                                flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )
                                            }
                                            <ArrowUpDownIcon size={15} className="text-foreground/50" />
                                        </div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))
                    }
                </TableHeader>
                <TableBody>
                    {isLoading && (
                        <TableRow className="w-full h-12 bg-red-500">
                            <td colSpan={5}>
                                <Skeleton className="w-full h-12" />
                            </td>
                        </TableRow>
                    )}
                    {/* data show  */}
                    {table?.getRowModel()?.rows?.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells()?.map((cell) => (
                                <TableCell key={cell.id}>{
                                    flexRender(cell.column.columnDef.cell,
                                        cell.getContext()
                                    )
                                }</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default SubmissionTable