import { visit } from "unist-util-visit";
import type { Root, Paragraph, PhrasingContent } from "mdast";
import { findPhrase } from "./text-match";
import type { SelectedLink } from "./types";

type PluginOptions = {
  links: SelectedLink[];
};

/**
 * remark/unified attacher. `decideInternalLinks` tarafından önceden
 * belirlenmiş anchor + hizmet eşleşmelerini mdast ağacında gerçek link
 * node'larına çevirir. Hiçbir ham HTML string birleştirilmez ve
 * dangerouslySetInnerHTML kullanılmaz — çıktı React tarafından normal
 * şekilde escape edilerek render edilir.
 */
export function remarkApplyLinks({ links }: PluginOptions) {
  return (tree: Root) => {
    if (links.length === 0) return;
    const remaining = [...links];

    visit(tree, "paragraph", (node: Paragraph) => {
      if (remaining.length === 0) return;

      for (let i = 0; i < node.children.length; i++) {
        if (remaining.length === 0) break;

        const child = node.children[i];
        if (child.type !== "text") continue;

        const linkIndex = remaining.findIndex((l) => findPhrase(child.value, l.anchorText) !== null);
        if (linkIndex === -1) continue;

        const link = remaining[linkIndex];
        const m = findPhrase(child.value, link.anchorText);
        if (!m) continue;

        const before = child.value.slice(0, m.start);
        const after = child.value.slice(m.end);

        const replacement: PhrasingContent[] = [];
        if (before) replacement.push({ type: "text", value: before });
        replacement.push({
          type: "link",
          url: link.service.url,
          title: link.service.title,
          children: [{ type: "text", value: m.matchedText }],
        });
        if (after) replacement.push({ type: "text", value: after });

        node.children.splice(i, 1, ...replacement);
        i += replacement.length - 1;
        remaining.splice(linkIndex, 1);
      }
    });
  };
}
