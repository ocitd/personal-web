import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Dataform from "@/components/forms/data-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DataTable from "@/components/projects-table";
import { UserPlus } from "lucide-react";
import LogOut from "@/components/logout";
import { SignupForm } from "@/components/forms/signup-form";
import CertificateForm from "@/components/forms/certificate-form";
import CertificatesTable from "@/components/certificates-table";

export default async function ServerComponent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="flex flex-col gap-6 p-4 md:p-12">
      {/* Judul halaman */}
      <h1 className="text-2xl font-bold">Halo {session.user.name}</h1>

      {/* Tombol tambah user */}
      <Dialog modal={false}>
        <DialogTrigger asChild>
          <Button className="flex gap-2">
            <UserPlus className="size-4" />
            Add data
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add data</DialogTitle>
            <DialogDescription>
            make sure the data is correct ✅
            </DialogDescription>
          </DialogHeader>

          {/* 🟢 Form input user */}
          <Dataform />
        </DialogContent>
      </Dialog>

      {/* 🟢 Table list user */}
      <DataTable />

      
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex gap-2">
            <UserPlus className="size-4" />
            Add Certificate
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Certificate</DialogTitle>
            <DialogDescription>
              make sure the data is correct ✅
            </DialogDescription>
          </DialogHeader>

          {/* 🟢 Form input certificate */}
          <CertificateForm />
        </DialogContent>
      </Dialog>

      {/* table list certificate */}
      <CertificatesTable />
      <SignupForm />
      <LogOut />
    </div>
  );
}
