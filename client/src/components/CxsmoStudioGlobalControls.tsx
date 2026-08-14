import { Check, Globe2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { defaultCxsmoGlobal, type CxsmoGlobalContent } from "@/lib/cxsmoContent";
import { trpc } from "@/lib/trpc";
import "@/pages/cxsmo-admin-global.css";

const decode = (payload: string | undefined): CxsmoGlobalContent => { try { return payload ? { ...defaultCxsmoGlobal, ...(JSON.parse(payload) as Partial<CxsmoGlobalContent>) } : defaultCxsmoGlobal; } catch { return defaultCxsmoGlobal; } };

export function CxsmoStudioGlobalControls() {
  const utils = trpc.useUtils();
  const entries = trpc.cxsmoStudio.content.list.useQuery();
  const [content, setContent] = useState<CxsmoGlobalContent>(defaultCxsmoGlobal);
  const [saved, setSaved] = useState(false);
  useEffect(() => { setContent(decode(entries.data?.find((entry) => entry.contentKey === "global")?.payload)); }, [entries.data]);
  const save = trpc.cxsmoStudio.content.save.useMutation({ onSuccess: async () => { setSaved(true); window.setTimeout(() => setSaved(false), 1800); await utils.cxsmoStudio.content.invalidate(); await utils.cxsmoStudio.content.publicList.invalidate(); } });
  return <section className="cx-studio-global"><div><span><Globe2 size={18} /> Sitewide editorial controls</span><p>These owner-only fields feed the public presentation bar and footer. Keep the legal portfolio boundary explicit.</p></div><div className="cx-studio-global__fields"><label>Top presentation notice<textarea value={content.notice} onChange={(event) => setContent({ ...content, notice: event.target.value })} /></label><label>Footer context<input value={content.footerIntro} onChange={(event) => setContent({ ...content, footerIntro: event.target.value })} /></label><label>Footer credit<input value={content.footerCredit} onChange={(event) => setContent({ ...content, footerCredit: event.target.value })} /></label></div><button type="button" onClick={() => save.mutate({ contentKey: "global", payload: JSON.stringify(content), status: "published" })} disabled={save.isPending}>{saved ? <><Check size={15} /> Sitewide copy published</> : <><Save size={15} /> {save.isPending ? "Publishing" : "Publish sitewide copy"}</>}</button></section>;
}
