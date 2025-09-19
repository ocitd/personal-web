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
import { Button } from "./button";
import { Loader2, Trash2 } from "lucide-react";
import { deleteData } from "@/server/projects";

type DeleteDataButtonProps = {
  dataId: string;
};

export default function DeleteDataButton({ dataId }: DeleteDataButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteData(dataId); // 🟢 panggil server action
      toast.success("✅ Data berhasil dihapus");
      setIsOpen(false); // tutup dialog
      router.refresh(); // refresh halaman
    } catch (error) {
      console.error(error);
      toast.error("❌ Gagal menghapus data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Trigger button */}
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 className="size-4 text-red-500" />
        </Button>
      </DialogTrigger>

      {/* Modal content */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>sure?</DialogTitle>
          <DialogDescription>
            cannot be undone.
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
