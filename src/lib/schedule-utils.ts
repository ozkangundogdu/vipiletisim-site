export type ScheduleResult = {
  slug: string;
  title: string;
  oldDate: string;
  newDate: string;
};

export type ScheduleOpts = {
  startDate: string;
  startHour: number;
  endHour: number;
  activeDays: boolean[];  // [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
  mode: "daily" | "interval";
  postsPerDay: number;
  intervalHours: number;
};

function jsDay(d: Date): number {
  return (d.getDay() + 6) % 7; // Mon=0 … Sun=6
}

function addMinutes(d: Date, m: number): Date {
  return new Date(d.getTime() + m * 60000);
}

function nextActiveDay(d: Date, activeDays: boolean[]): Date {
  const next = new Date(d);
  next.setDate(next.getDate() + 1);
  while (!activeDays[jsDay(next)]) next.setDate(next.getDate() + 1);
  return next;
}

export function buildSchedule(
  items: { slug: string; title: string; publishedAt: string }[],
  opts: ScheduleOpts
): ScheduleResult[] {
  const { startDate, startHour, endHour, activeDays, mode, postsPerDay, intervalHours } = opts;

  if (!activeDays.some(Boolean) || items.length === 0) return [];

  const intervalMin =
    mode === "daily"
      ? Math.round(((endHour - startHour) * 60) / postsPerDay)
      : intervalHours * 60;

  let current = new Date(`${startDate}T${String(startHour).padStart(2, "0")}:00:00`);
  while (!activeDays[jsDay(current)]) {
    current = nextActiveDay(current, activeDays);
    current.setHours(startHour, 0, 0, 0);
  }

  const results: ScheduleResult[] = [];

  for (const item of items) {
    if (current.getHours() >= endHour) {
      current = nextActiveDay(current, activeDays);
      current.setHours(startHour, 0, 0, 0);
    }

    results.push({
      slug: item.slug,
      title: item.title,
      oldDate: item.publishedAt,
      newDate: current.toISOString().slice(0, 16),
    });

    current = addMinutes(current, intervalMin);

    if (
      current.getHours() > endHour ||
      (current.getHours() === endHour && current.getMinutes() > 0)
    ) {
      current = nextActiveDay(current, activeDays);
      current.setHours(startHour, 0, 0, 0);
    }
  }

  return results;
}

export function fmtDate(iso: string): string {
  const d = new Date(iso);
  return (
    d.toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric" }) +
    " " +
    d.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })
  );
}

export function defaultStartDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}
