import { z } from "zod";

export const academicSchema = z.object({
  education_level: z.string().min(1, "Jenjang pendidikan wajib diisi"),
  major: z.string().min(1, "Jurusan wajib diisi"),
  gpa: z.number().min(0).max(4, "GPA harus antara 0 - 4"),
});

export type AcademicFormData = z.infer<typeof academicSchema>;
