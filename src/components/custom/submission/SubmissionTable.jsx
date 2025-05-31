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
import { MoreHorizontalIcon } from "lucide-react";
import { flexRender, getCoreRowModel } from "@tanstack/react-table";
import { SquareMousePointer } from "lucide-react";



function SubmissionTable({ submissions }) {

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

    const [data] = useState(() => [...submissions]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    });
    // console.log(table.getCoreRowModel)

    return (
        <div className="flex gap-3 flex-col">
            <Table>
                <TableCaption>A list of your form submissions.</TableCaption>
                <TableHeader>
                    {
                        table.getHeaderGroups().map((headersGroup) => (
                            <TableRow key={headersGroup.id} >
                                {headersGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {
                                            flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )
                                        }
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))
                    }
                </TableHeader>
                <TableBody>
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