"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2, LogOutIcon } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function LogOut() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await authClient.signOut();
      toast.success("Logged out");
      router.push("/login");
    } catch (error) {
      toast.error("Logout gagal");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleLogout} disabled={isLoading}>
      {isLoading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <div className="flex gap-2 items-center">
          <span>Log Out</span>
          <LogOutIcon />
        </div>
      )}
    </Button>
  );
}
