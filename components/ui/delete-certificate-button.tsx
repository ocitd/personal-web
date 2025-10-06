"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { deleteCertificate } from "@/server/certificates";

type DeleteCertificateButtonProps = {
  certificateId: string;
  img: string;
};

export default function DeleteCertificateButton({
  certificateId, img
}: DeleteCertificateButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteCertificate(certificateId, img); // panggil server action
      toast.success("✅ Sertifikat berhasil dihapus");
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("❌ Gagal menghapus sertifikat");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Tombol Trigger */}
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 className="size-4 text-red-500" />
        </Button>
      </DialogTrigger>

      {/* Isi Dialog */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus Sertifikat?</DialogTitle>
          <DialogDescription>
            Tindakan ini tidak dapat dibatalkan. Data akan dihapus secara permanen.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Batal
          </Button>
          <Button
            variant="destructive"
            disabled={isLoading}
            onClick={handleDelete}
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "Hapus"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}