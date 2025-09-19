import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";
import { getData } from "@/server/projects";
import Dataform from "./forms/data-form";
import DeleteDataButton from "./ui/deletedatabutton";

export default async function DataTable() {
  const data = await getData(); // ambil semua data dari tabel `data`

  return (
    <Table>
      <TableCaption>Data Postingan by Rasyid.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Categories</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.img}</TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>
              {item.category?.join(", ") || "No categories"}
            </TableCell>

            <TableCell className="text-right">
              {/* Tombol Edit */}
              <Dialog modal={false}>
                <DialogTrigger>
                  <Button variant="ghost">
                    <Pencil className="size-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Data</DialogTitle>
                    <Dataform data={item} />
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              {/* Tombol Delete */}
              <DeleteDataButton dataId={item.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
// Komponen DataTable menampilkan tabel data dengan opsi edit dan hapus