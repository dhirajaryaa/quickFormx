import { useReactTable, createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table"
import { MapPin, Calendar, TextCursorInput, Hash, ArrowUpRight, SquareMousePointer, ArrowUpDownIcon } from "lucide-react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Loader2 } from "lucide-react";



function SubmissionTable({ submissions, isLoading, globalFilter, setGlobalFilter }) {

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
            globalFilter
        },
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div className="flex gap-3 flex-col relative">
            <Table>
                {
                    isLoading &&
                    <div className="w-full absolute top-30 flex items-center justify-center">
                        <Loader2 className="size-8 animate-spin" />
                    </div>
                }
                <TableCaption>
                    {
                        submissions?.length > 0 ?
                            "Here is a list of your form submissions." :
                            "No submissions found for this form."
                    }
                </TableCaption>
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