"use client";

import { useState, type FormEvent } from "react";

const fieldClassName =
  "min-h-14 w-full rounded-[18px] border border-[#5a4a63] bg-[#080511] px-6 text-sm text-white placeholder:text-[#877b8c] focus:border-[#dd48aa] focus:outline-none";

export function AboutContactForm() {
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const organization = String(data.get("organization") ?? "").trim();
    const country = String(data.get("country") ?? "").trim();
    const inquiryType = String(data.get("inquiryType") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Avirvox Labs inquiry: ${inquiryType || "General"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nOrganization: ${organization}\nCountry: ${country}\nInquiry type: ${inquiryType}\n\n${message}`,
    );

    setStatus("Opening your email app to send the inquiry.");
    window.location.href = `mailto:Coin@Avirvox.io?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-12" aria-label="Contact Avirvox Labs">
      <div className="grid gap-5 sm:grid-cols-2">
        <label>
          <span className="sr-only">Name</span>
          <input name="name" type="text" autoComplete="name" required placeholder="Name" className={fieldClassName} />
        </label>
        <label>
          <span className="sr-only">Organization</span>
          <input name="organization" type="text" autoComplete="organization" placeholder="Organization" className={fieldClassName} />
        </label>
        <label>
          <span className="sr-only">Email</span>
          <input name="email" type="email" autoComplete="email" required placeholder="Email" className={fieldClassName} />
        </label>
        <label>
          <span className="sr-only">Country</span>
          <input name="country" type="text" autoComplete="country-name" placeholder="Country" className={fieldClassName} />
        </label>
        <label>
          <span className="sr-only">Message</span>
          <input name="message" type="text" required placeholder="Message" className={fieldClassName} />
        </label>
        <label>
          <span className="sr-only">Inquiry Type</span>
          <select name="inquiryType" defaultValue="" className={fieldClassName}>
            <option value="" disabled>Inquiry Type</option>
            <option value="Ecosystem">Ecosystem</option>
            <option value="AVX">AVX</option>
            <option value="Partnership">Partnership</option>
            <option value="Media">Media</option>
            <option value="Other">Other</option>
          </select>
        </label>
      </div>
      <div className="mt-8 text-center">
        <button type="submit" className="min-h-12 min-w-52 rounded-full bg-gradient-to-r from-[#ff9926] via-[#e84e91] to-[#8e25e7] px-8 text-sm font-semibold text-white hover:brightness-110">
          Send Inquiry
        </button>
        <p role="status" className="mt-3 min-h-5 text-xs text-[#c9b8cf]">{status}</p>
      </div>
    </form>
  );
}
