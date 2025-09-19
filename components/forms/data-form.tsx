"use client";

import { createData, updateData } from "@/server/projects";
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
import ImageUpload from "../ui/uploadingbtn";

interface DataformProps {
  data?: {
    id: string;
    img: string;
    title: string;
    category: string[]; // array sesuai DB
  };
}

const formSchema = z.object({
  img: z.string().min(2, "Gambar wajib diisi"),
  title: z.string().min(2, "Judul wajib diisi"),
  category: z.string().min(2, "Kategori wajib diisi"),
});

export default function Dataform({ data }: DataformProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      img: data?.img || "",
      title: data?.title || "",
      category: data?.category?.[0] || "", // ambil kategori pertama
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      // ubah string jadi array (dipisah pakai koma)
      const categories = values.category
        .split(",")
        .map((c) => c.trim())
        .filter((c) => c.length > 0); // buang kosong kalau ada double koma

      if (data) {
        await updateData(data.id, {
          img: values.img,
          title: values.title,
          category: categories,
        });
      } else {
        await createData({
          img: values.img,
          title: values.title,
          category: categories,
        });
      }

      toast.success(
        `Alhamdulillah, data berhasil ${data ? "diupdate" : "ditambahkan"}`
      );

      if (data) {
        form.reset(values); // biar isi tetap ada pas edit
      } else {
        form.reset(); // kosong lagi pas create
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(
        `Ada kesalahan saat ${
          data ? "mengupdate" : "menambahkan"
        } data, silahkan cek lagi`
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
          {/* img */}
          <FormField
            control={form.control}
            name="img"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link image</FormLabel>
                <FormControl>
                <ImageUpload onUploadComplete={(url) => form.setValue("img", url)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* img
          <FormField
            control={form.control}
            name="img"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link image</FormLabel>
                <FormControl>
                  <Input placeholder="link image" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          {/* title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Category 1, Category 2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Submit */}
          <Button disabled={isLoading} type="submit">
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : data ? (
              "Update Data"
            ) : (
              "Tambah Data"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
