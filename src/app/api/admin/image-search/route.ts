export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return Response.json({ error: "Arama terimi gerekli" }, { status: 400 });
  }

  const key = process.env.SERPER_API_KEY;
  if (!key) {
    return Response.json({ error: "API yapılandırması eksik" }, { status: 500 });
  }

  const res = await fetch("https://google.serper.dev/images", {
    method: "POST",
    headers: {
      "X-API-KEY": key,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ q: query, num: 10 }),
  });

  const data = await res.json();

  if (!res.ok) {
    return Response.json({ error: data.message ?? "Arama başarısız" }, { status: res.status });
  }

  const images = (data.images ?? []).map((item: Record<string, unknown>) => ({
    url: item.imageUrl,
    thumb: item.thumbnailUrl,
    title: item.title,
    source: item.source,
  }));

  return Response.json({ images });
}
