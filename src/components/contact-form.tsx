"use client";

import { useState } from "react";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", device: "", message: "" });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const lines = [
      "Merhaba, iletişim formundan yazıyorum.",
      "",
      `Ad Soyad: ${form.name}`,
      `Telefon: ${form.phone}`,
      form.device ? `Cihaz/Model: ${form.device}` : null,
      `Mesaj: ${form.message}`,
    ]
      .filter((l) => l !== null)
      .join("\n");
    window.open(
      `https://wa.me/905052754540?text=${encodeURIComponent(lines)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  const inputClass =
    "h-11 w-full rounded-[4px] border border-zinc-300 bg-white px-4 text-[14px] text-zinc-800 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 placeholder:text-zinc-400";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="mb-1.5 block text-[13px] font-bold text-zinc-700">
            Ad Soyad <span className="text-brand" aria-hidden="true">*</span>
          </label>
          <input
            id="c-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Adınız ve soyadınız"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="c-phone" className="mb-1.5 block text-[13px] font-bold text-zinc-700">
            Telefon <span className="text-brand" aria-hidden="true">*</span>
          </label>
          <input
            id="c-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="05xx xxx xx xx"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="c-device" className="mb-1.5 block text-[13px] font-bold text-zinc-700">
          Cihaz / Model
        </label>
        <input
          id="c-device"
          name="device"
          type="text"
          value={form.device}
          onChange={handleChange}
          placeholder="Örn: iPhone 14 Pro, Samsung Galaxy S23"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="c-message" className="mb-1.5 block text-[13px] font-bold text-zinc-700">
          Mesaj <span className="text-brand" aria-hidden="true">*</span>
        </label>
        <textarea
          id="c-message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Cihazınızdaki arızayı kısaca açıklayın…"
          className="w-full resize-none rounded-[4px] border border-zinc-300 bg-white px-4 py-3 text-[14px] text-zinc-800 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 placeholder:text-zinc-400"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2.5 rounded-[4px] bg-whatsapp px-6 py-3.5 text-[15px] font-black text-white transition hover:bg-whatsapp-hover"
      >
        <WhatsAppIcon />
        WhatsApp ile Gönder
      </button>

      <p className="text-[12px] leading-relaxed text-zinc-400">
        Formu göndererek WhatsApp&#39;a yönlendirileceksiniz. Mesajınız otomatik olarak hazırlanacaktır.
      </p>
    </form>
  );
}
