// app/components/certificates-table.tsx

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
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import DeleteCertificateButton from "./ui/delete-certificate-button";
import { getAllCertificates } from "@/server/certificates";
import CertificateForm from "./forms/certificate-form";

export default async function CertificatesTable() {
  // Ambil semua data sertifikat dari database
  const certificates = await getAllCertificates();

  return (
    <Table>
      <TableCaption>Daftar Sertifikat.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Title</TableHead>
          <TableHead>Provider</TableHead>
          <TableHead>Certificate</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {certificates.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-muted-foreground">
              Belum ada sertifikat.
            </TableCell>
          </TableRow>
        ) : (
          certificates.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>{item.provider}</TableCell>
              <TableCell className="max-w-[250px] truncate">
                {item.certificate}
              </TableCell>
              <TableCell>
                {new Date(item.createdAt).toLocaleDateString("id-ID")}
              </TableCell>

              <TableCell className="text-right flex justify-end gap-2">
                {/* Tombol Edit */}
                <Dialog modal={false}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Pencil className="size-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Sertifikat</DialogTitle>
                    </DialogHeader>
                    <CertificateForm certificate={item} />
                  </DialogContent>
                </Dialog>

                {/* Tombol Delete */}
                <DeleteCertificateButton certificateId={item.id} img={item.certificate} />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}