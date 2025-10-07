"use client";
import React from "react";
import { createCertificate, updateCertificate } from "@/server/certificates";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import FileUpload from "@/components/ui/uploadingbtn";

// 🟦 Props
interface CertificateFormProps {
  certificate?: {
    id: string;
    title: string;
    certificate: string; // URL gambar sertifikat
    provider: string;
  };
}

// 🟨 Validasi Schema
const formSchema = z.object({
  title: z.string().min(2, "Judul sertifikat wajib diisi"),
  certificate: z.string().min(2, "Gambar sertifikat wajib diupload"),
  provider: z.string().min(2, "Penyedia sertifikat wajib diisi"),
});

export default function CertificateForm({ certificate }: CertificateFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // 🟩 Inisialisasi form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: certificate?.title || "",
      certificate: certificate?.certificate || "",
      provider: certificate?.provider || "",
    },
  });

  // 🟥 Submit Handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      if (certificate) {
        await updateCertificate(certificate.id, values);
      } else {
        await createCertificate({
          ...values,
        });
      }

      toast.success(
        `✅ Sertifikat berhasil ${certificate ? "diperbarui" : "ditambahkan"}`
      );

      if (!certificate) form.reset();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("❌ Gagal menyimpan sertifikat");
    } finally {
      setIsLoading(false);
    }
  }

  // 🧩 UI
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
          {/* Upload Gambar Sertifikat */}
          <FormField
            control={form.control}
            name="certificate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gambar Sertifikat</FormLabel>
                <FormControl>
                  <FileUpload
                    onUploadComplete={(url) =>
                      form.setValue("certificate", url)
                    }
                    mode="auto" // bisa diganti "image" atau "pdf"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Judul */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Judul Sertifikat</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Contoh: Front-End Developer Expert"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Provider */}
          <FormField
            control={form.control}
            name="provider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Penyedia Sertifikat</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Contoh: Dicoding, Coursera, Google"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tombol Submit */}
          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : certificate ? (
              "Update Sertifikat"
            ) : (
              "Tambah Sertifikat"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
