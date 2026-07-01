import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return Response.json({ error: "Dosya bulunamadı" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return Response.json({ error: "Desteklenmeyen dosya türü. Sadece resim dosyaları kabul edilir." }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return Response.json({ error: "Dosya 5MB'dan büyük olamaz" }, { status: 400 });
  }

  const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "gif", "avif", "svg"];
  const rawExt = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") ?? "";
  const ext = ALLOWED_EXTENSIONS.includes(rawExt) ? rawExt : "jpg";

  const customName = (formData.get("filename") as string | null)?.trim();
  const baseName = customName
    ? customName.replace(/[^a-z0-9-]/g, "").slice(0, 80)
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const safeName = `${baseName || Date.now()}.${ext}`;
  const uploadsDir = path.join(process.cwd(), "public", "uploads");

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(uploadsDir, safeName), buffer);

  return Response.json({ url: `/uploads/${safeName}` });
}
