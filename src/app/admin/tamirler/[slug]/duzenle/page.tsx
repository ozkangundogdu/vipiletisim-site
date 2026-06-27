import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/data/services";
import { getCustomServiceBySlug } from "@/lib/custom-services";
import { getRepairContent } from "@/lib/repair-content";
import type { RepairContent } from "@/lib/repair-content";
import { RepairEditor } from "./RepairEditor";

function contentToMarkdown(c: RepairContent, intro: string): string {
  const lines: string[] = [];
  if (intro) {
    lines.push(intro);
    lines.push("");
  }
  lines.push(`## ${c.symptomsHeading}`);
  lines.push("");
  for (const s of c.symptoms) lines.push(`- ${s}`);
  lines.push("");
  lines.push(`## ${c.whyHeading}`);
  lines.push("");
  lines.push(c.why);
  lines.push("");
  lines.push(`## ${c.processHeading}`);
  lines.push("");
  for (let i = 0; i < c.processSteps.length; i++) {
    const step = c.processSteps[i];
    lines.push(`### ${i + 1}. ${step.title}`);
    lines.push("");
    lines.push(step.desc);
    lines.push("");
  }
  lines.push(`## ${c.dataSafeHeading}`);
  lines.push("");
  lines.push(c.dataSafe);
  lines.push("");
  lines.push(`## ${c.priceHeading}`);
  lines.push("");
  lines.push(c.price);
  if (c.expertNote) {
    lines.push("");
    lines.push(`> **Uzman Notu:** ${c.expertNote}`);
  }
  return lines.join("\n");
}

export default async function DuzenlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const hardcoded = getServiceBySlug(slug);
  const custom = !hardcoded ? getCustomServiceBySlug(slug) : null;
  const service = hardcoded ?? custom;

  if (!service) notFound();

  let templateMarkdown = "";
  try {
    const content = getRepairContent(service.model, service.brand as "iphone" | "samsung" | "xiaomi", service.repairKey);
    templateMarkdown = contentToMarkdown(content, content.intro);
  } catch {
    templateMarkdown = `## ${service.title}\n\nBu sayfa için içerik yazın.`;
  }

  return (
    <RepairEditor
        slug={slug}
        serviceTitle={service.title}
        serviceModel={service.model}
        serviceRepairType={service.repairType}
        templateMarkdown={templateMarkdown}
      />
  );
}
