"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Loader2, Upload } from "lucide-react";
import { useUploadAvatar } from "../hooks/use-profile";
import { useQueryClient } from "@tanstack/react-query";

interface AvatarUploadProps {
  avatarUrl: string | null;
  displayName: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

const GRADIENT_COLORS = [
  "from-indigo-400 to-violet-500",
  "from-emerald-400 to-teal-500",
  "from-rose-400 to-pink-500",
  "from-amber-400 to-orange-500",
];

function getGradient(name: string) {
  return GRADIENT_COLORS[name.charCodeAt(0) % GRADIENT_COLORS.length];
}

export default function AvatarUpload({ avatarUrl, displayName, onSuccess, onError }: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  // localUrl: URL yang baru dikonfirmasi dari server (bukan preview blob)
  const [localUrl, setLocalUrl] = useState<string | null>(null);
  const [previewBlob, setPreviewBlob] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const uploadAvatar = useUploadAvatar();
  const queryClient = useQueryClient();

  const processFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) { onError("Hanya file gambar yang diizinkan."); return; }
    if (file.size > 5 * 1024 * 1024) { onError("Ukuran file maksimal 5MB."); return; }

    // Tampilkan preview blob lokal agar terasa responsif
    const reader = new FileReader();
    reader.onload = (e) => setPreviewBlob(e.target?.result as string);
    reader.readAsDataURL(file);

    try {
      const result = await uploadAvatar.mutateAsync(file);
      // Gunakan URL dari server (bukan blob) agar persisten
      if (result?.avatar_url) setLocalUrl(result.avatar_url);
      setPreviewBlob(null);
      // Paksa refetch semua query yang berkaitan dengan profil
      await queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      onSuccess("Foto profil berhasil diperbarui! ✨");
    } catch {
      onError("Gagal mengupload foto. Coba lagi.");
      setPreviewBlob(null);
    }
  }, [uploadAvatar, onSuccess, onError, queryClient]);

  // Prioritas tampilan: blob preview > URL dari server > URL dari props
  const currentUrl = previewBlob ?? localUrl ?? avatarUrl;
  const isUploading = uploadAvatar.isPending;
  const gradient = getGradient(displayName);

  return (
    <div className="flex flex-col items-center gap-3">
      <input
        ref={fileInputRef}
        id="avatar-file-input"
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f); e.target.value = ""; }}
      />

      {/* Avatar container */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`group relative cursor-pointer rounded-full ${isDragging ? "ring-4 ring-indigo-400 ring-offset-2" : ""}`}
        onClick={() => fileInputRef.current?.click()}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files?.[0]; if (f) processFile(f); }}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
      >
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-400 via-violet-400 to-fuchsia-400 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-60" />

        {/* Avatar */}
        <div className="relative h-28 w-28 rounded-full ring-4 ring-white shadow-xl">
          <AnimatePresence mode="wait">
            {currentUrl ? (
              <motion.img
                key="avatar-img"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: isUploading ? 0.5 : 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                src={currentUrl}
                alt={displayName}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <motion.div
                key="avatar-initials"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br ${gradient}`}
              >
                <span className="text-3xl font-bold text-white">{getInitials(displayName)}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Overlay */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center rounded-full bg-slate-900/60 transition-opacity duration-200 ${isDragging || isUploading ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
            {isUploading ? (
              <Loader2 className="h-7 w-7 animate-spin text-white" />
            ) : isDragging ? (
              <Upload className="h-7 w-7 text-white" />
            ) : (
              <Camera className="h-7 w-7 text-white" />
            )}
            {!isUploading && <span className="mt-1 text-[9px] font-semibold uppercase tracking-widest text-white/80">{isDragging ? "Lepas" : "Ubah"}</span>}
          </div>
        </div>

        {/* Badge */}
        {!isUploading && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg ring-2 ring-white"
          >
            <Camera className="h-3.5 w-3.5 text-white" />
          </motion.div>
        )}
      </motion.div>

      <p className="text-[11px] font-medium text-slate-400">Klik atau seret foto ke sini</p>
      <p className="text-[10px] text-slate-300">JPEG · PNG · WEBP · max 5MB</p>
    </div>
  );
}
