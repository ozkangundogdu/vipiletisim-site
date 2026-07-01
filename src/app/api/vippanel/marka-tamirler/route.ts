import { getAllMarkaTamirler } from "@/lib/marka-tamir";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(getAllMarkaTamirler());
}
