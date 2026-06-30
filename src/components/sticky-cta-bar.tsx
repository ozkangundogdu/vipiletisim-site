import { getSettings } from "@/lib/settings";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.71.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.004 2C6.486 2 2.01 6.477 2.01 11.997c0 2.116.667 4.077 1.802 5.682L2.5 22l4.448-1.267a9.94 9.94 0 0 0 5.056 1.373h.004c5.518 0 9.994-4.477 9.994-9.996C22.002 6.59 17.526 2.114 12.008 2.114l-.004-.114zm0 18.166a8.13 8.13 0 0 1-4.146-1.135l-.298-.177-3.082.878.823-3.005-.194-.31a8.121 8.121 0 0 1-1.247-4.42c0-4.49 3.654-8.143 8.148-8.143 4.493 0 8.146 3.653 8.146 8.143 0 4.491-3.653 8.169-8.15 8.169z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 1.9Z" />
    </svg>
  );
}

export function StickyCtaBar() {
  const settings = getSettings();
  const message = encodeURIComponent(
    "Vipiletisim.com.tr'ye hoşgeldiniz. Hangi konuda bilgi almak istersiniz?"
  );
  const waHref = `https://wa.me/${settings.whatsapp}?text=${message}`;
  const telHref = `tel:+${settings.telefonRaw}`;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 flex h-[52px] md:hidden"
      role="navigation"
      aria-label="Hızlı iletişim"
    >
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 bg-whatsapp text-[14px] font-black text-white active:bg-whatsapp-hover"
      >
        <WhatsAppIcon />
        WhatsApp
      </a>
      <a
        href={telHref}
        className="flex flex-1 items-center justify-center gap-2 bg-brand text-[14px] font-black text-white active:bg-brand-hover"
      >
        <PhoneIcon />
        Hemen Ara
      </a>
    </div>
  );
}
