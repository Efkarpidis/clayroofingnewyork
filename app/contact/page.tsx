// app/contact/page.tsx
"use client";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import VercelBlobUploader from "@/components/upload/VercelBlobUploader";

type BlobItem = {
  url: string;
  pathname: string;
  size?: number;
  contentType?: string;
  filename?: string;
};

const formatMB = (bytes: number) => Math.round((bytes / (1024 * 1024)) * 10) / 10;

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Please enter your full name." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  company: z.string().optional(),
  contactType: z.enum(["general-contractor", "architect", "homeowner", "manufacturer", "other", "previous-client"], {
    errorMap: () => ({ message: "Please select your contact type." }),
  }),
  tileFamily: z.string().optional(),
  tileColor: z.string().optional(),
  message: z.string().min(10, { message: "Your message must be at least 10 characters long." }),
  privacyAccepted: z.boolean().refine((v) => v === true, {
    message: "You must accept the Privacy Policy to continue.",
  }),
  previousProjectReference: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const FieldWrapper = ({
  id,
  label,
  error,
  children,
  required = false,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
}) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-base font-medium text-neutral-700">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children}
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

const FormInput = (p: React.ComponentProps<"input">) => (
  <input
    {...p}
    className="block w-full h-11 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-base text-neutral-900 shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none hover:border-neutral-300 transition-colors placeholder:text-neutral-400"
  />
);

const FormTextarea = (p: React.ComponentProps<"textarea">) => (
  <textarea
    {...p}
    className="block w-full rounded-md border-neutral-300 bg-white p-3 text-base shadow-sm focus:border-orange-500 focus:ring-orange-500 focus:outline-none focus:ring-2"
  />
);

const FormSelect = ({ children, ...props }: React.ComponentProps<"select">) => (
  <div className="relative">
    <select
      {...props}
      className="block w-full h-11 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-base text-neutral-900 shadow-sm appearance-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none hover:border-neutral-300 transition-colors cursor-pointer"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
        backgroundPosition: "right 12px center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "16px",
        paddingRight: "40px",
      }}
    >
      {children}
    </select>
  </div>
);

const tileColorOptions = {
  Vienna: ["Charcoal", "Terracotta", "Slate Gray", "Request a Color"],
  "S-Mixed": ["Mediterranean Blend", "Tuscan Mix", "Antique Blend", "Request a Color"],
  Selectum: [
    "Brown",
    "Carmine",
    "Cognac",
    "Cognac Rustic",
    "Dark Blue",
    "Dark Green",
    "Galia",
    "Light Green",
    "Provence",
    "Red",
    "Rustic Red",
    "Slate",
    "Request a Color",
  ],
} as const;

function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<{ message: string; success: boolean; errors?: Record<string, string[]> }>({
    message: "",
    success: false,
  });
  const [isPending, startTransition] = useTransition();
  const [selectedTileFamily, setSelectedTileFamily] = useState<string>("");
  const [selectedContactType, setSelectedContactType] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  const [docResults, setDocResults] = useState<BlobItem[]>([]);
  const [photoResults, setPhotoResults] = useState<BlobItem[]>([]);
  const [verificationCode, setVerificationCode] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const docBytes = docResults.reduce((s, r) => s + (r.size || 0), 0);
  const photoBytes = photoResults.reduce((s, r) => s + (r.size || 0), 0);
  const totalBytes = docBytes + photoBytes;
  const totalCount = docResults.length + photoResults.length;
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    shouldUnregister: false,
    defaultValues: { privacyAccepted: false },
  });
  const watchedTileFamily = watch("tileFamily");
  const watchedContactType = watch("contactType");

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    const tf = url.get("tileFamily");
    const tc = url.get("tileColor");
    if (tf) {
      setValue("tileFamily", tf);
      setSelectedTileFamily(tf);
    }
    if (tc) setValue("tileColor", tc);
    window.scrollTo(0, 0);
  }, [setValue]);

  useEffect(() => {
    if (watchedTileFamily) {
      setSelectedTileFamily(watchedTileFamily);
      setValue("tileColor", "");
    }
  }, [watchedTileFamily, setValue]);

  useEffect(() => {
    if (watchedContactType) setSelectedContactType(watchedContactType);
  }, [watchedContactType]);

  useEffect(() => {
    if (state.success) {
      setShowToast(true);
      reset();
      setSelectedTileFamily("");
      setSelectedContactType("");
      setDocResults([]);
      setPhotoResults([]);
      setTimeout(() => setShowToast(false), 5000);
    }
  }, [state.success, reset]);

  const onSubmit = async (data: ContactFormData) => {
    startTransition(async () => {
      try {
        const formEl = formRef.current;
        if (!formEl) return;
        const fd = new FormData(formEl);
        const res = await fetch("/api/contact", { method: "POST", body: fd });
        const data = await res.json().catch(() => ({ ok: false }));
        if (res.ok && data.ok && fd.get("smsOptIn") === "true" && fd.get("phone")) {
          setShowCodeInput(true); // Show code input for SMS opt-in
        } else if (data.fieldErrors) {
          Object.entries(data.fieldErrors).forEach(([field, messages]: any) => {
            if (messages?.[0]) setError(field as keyof ContactFormData, { type: "server", message: messages[0] });
          });
        }
        setState(data);
      } catch (e) {
        console.error("[Contact] submit error", e);
        setState({ message: "Network error. Please try again.", success: false });
      }
    });
  };

  if (state.success && !showToast) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-green-200 bg-green-50 p-8 text-center">
        <div className="h-12 w-12 rounded-full bg-green-100 p-2 text-green-600 flex items-center justify-center mb-4">
          <Check className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold text-neutral-800 mb-2">Message Sent!</h3>
        <p className="text-neutral-600">Thank you for reaching out. We'll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <>
      {showCodeInput && (
        <FieldWrapper id="verificationCode" label="Enter Verification Code" required error={errors.phone?.message}>
          <FormInput
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="123456"
          />
          <Button
            type="button"
            onClick={async () => {
              const verifyRes = await fetch("/api/contact/verify", {
                method: "POST",
                body: JSON.stringify({ phone: watch("phone"), code: verificationCode }),
                headers: { "Content-Type": "application/json" },
              });
              const verifyData = await verifyRes.json();
              if (verifyRes.ok && verifyData.ok) {
                setShowCodeInput(false);
                setState({ message: "Phone verified. SMS will be sent.", success: true });
              } else {
                setError("phone", { type: "server", message: verifyData.message || "Invalid code" });
              }
            }}
            className="mt-2"
          >
            Verify
          </Button>
        </FieldWrapper>
      )}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <Check className="h-5 w-5" />
          <span>Thanks—your message was sent.</span>
        </div>
      )}
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6" id="quote" noValidate>
        <FieldWrapper id="name" label="Name" required error={errors.name?.message || state.errors?.name?.[0]}>
          <FormInput {...register("name")} placeholder="Cocoa Clay" />
        </FieldWrapper>
        <FieldWrapper id="email" label="Email" required error={errors.email?.message || state.errors?.email?.[0]}>
          <FormInput {...register("email")} type="email" placeholder="cocoa@example.com" />
        </FieldWrapper>
        <FieldWrapper id="phone" label="Phone" error={errors.phone?.message || state.errors?.phone?.[0]}>
          <PhoneInput
            {...register("phone")}
            international
            defaultCountry="US"
            placeholder="(718) 000-0000"
            className="block w-full h-11 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-base text-neutral-900 shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none hover:border-neutral-300 transition-colors placeholder:text-neutral-400"
          />
        </FieldWrapper>
        <FieldWrapper id="company" label="Company" error={errors.company?.message || state.errors?.company?.[0]}>
          <FormInput {...register("company")} placeholder="Cocoa's Roofing Company" />
        </FieldWrapper>
        <FieldWrapper id="contactType" label="I am a" required error={errors.contactType?.message || state.errors?.contactType?.[0]}>
          <FormSelect
            {...register("contactType")}
            onChange={(e) => {
              register("contactType").onChange(e);
            }}
          >
            <option value="">Select...</option>
            <option value="general-contractor">General Contractor</option>
            <option value="homeowner">Homeowner</option>
            <option value="architect">Architect</option>
            <option value="manufacturer">Manufacturer</option>
            <option value="previous-client">Previous Client (Warranty or Service Request)</option>
            <option value="other">Other</option>
          </FormSelect>
        </FieldWrapper>
        <FieldWrapper id="tileFamily" label="Tile Family" error={errors.tileFamily?.message || state.errors?.tileFamily?.[0]}>
          <FormSelect
            {...register("tileFamily")}
            onChange={(e) => {
              register("tileFamily").onChange(e);
              setSelectedTileFamily(e.target.value);
            }}
          >
            <option value="">Select...</option>
            <option value="Vienna">Vienna</option>
            <option value="S-Mixed">S-Mixed</option>
            <option value="Selectum">Selectum</option>
            <option value="Request">Request</option>
          </FormSelect>
        </FieldWrapper>
        {selectedTileFamily && (
          <FieldWrapper id="tileColor" label="Tile Color" error={errors.tileColor?.message || state.errors?.tileColor?.[0]}>
            <FormSelect {...register("tileColor")}>
              <option value="">Select...</option>
              {tileColorOptions[selectedTileFamily as keyof typeof tileColorOptions]?.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </FormSelect>
          </FieldWrapper>
        )}
        <FieldWrapper id="message" label="Message" required error={errors.message?.message || state.errors?.message?.[0]}>
          <FormTextarea {...register("message")} rows={4} placeholder="Type your message here." />
        </FieldWrapper>
        <FieldWrapper id="files" label="Attach Documents">
          <VercelBlobUploader
            multiple
            accept=".pdf,.doc,.docx,.xlsx,.zip,image/*"
            hiddenInputName="uploadedFilesDocs"
            label="Upload Documents"
            onComplete={setDocResults}
          />
          <div className="mt-2 text-xs text-neutral-600">
            <span className="inline-flex items-center rounded-full border border-neutral-300 px-2 py-0.5">
              {docResults.length} file{docResults.length === 1 ? "" : "s"} • {formatMB(docBytes)} MB
            </span>
          </div>
        </FieldWrapper>
        <FieldWrapper id="photos" label="Upload Photo">
          <VercelBlobUploader
            multiple
            accept="image/*"
            hiddenInputName="uploadedFilesPhotos"
            label="Upload Photo"
            onComplete={setPhotoResults}
          />
          <div className="mt-2 text-xs text-neutral-600">
            <span className="inline-flex items-center rounded-full border border-neutral-300 px-2 py-0.5">
              {photoResults.length} photo{photoResults.length === 1 ? "" : "s"} • {formatMB(photoBytes)} MB
            </span>
          </div>
          <div className="mt-2 text-xs text-neutral-600">
            <span className="inline-flex items-center rounded-full border border-neutral-300 px-2 py-0.5">
              Total: {totalCount} file{totalCount === 1 ? "" : "s"} • {formatMB(totalBytes)} MB
            </span>
          </div>
        </FieldWrapper>
        <div className="space-y-2">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="privacyAccepted"
              {...register("privacyAccepted", { valueAsBoolean: true })}
              onChange={(e) => setValue("privacyAccepted", e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-neutral-400 text-orange-600 focus:ring-orange-600"
              defaultChecked={false}
            />
            <label htmlFor="privacyAccepted" className="text-sm text-neutral-700">
              I have read and accept the{" "}
              <a href="/privacy" className="text-orange-600 hover:underline">
                Privacy Policy
              </a>
              <span className="text-red-500 ml-1">*</span>
            </label>
          </div>
          {(errors.privacyAccepted?.message || state.errors?.privacyAccepted?.[0]) && (
            <p className="text-sm text-red-600">
              {errors.privacyAccepted?.message || state.errors?.privacyAccepted?.[0]}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="flex items-center text-sm text-neutral-700">
            <input
              type="checkbox"
              name="smsOptIn"
              value="true"
              className="mr-2 h-4 w-4 rounded border-neutral-400 text-orange-600 focus:ring-orange-600"
            />
            Yes, send me updates via text (Reply STOP to unsubscribe)
          </label>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-orange-700 disabled:bg-orange-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          {isPending ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Sending…
            </>
          ) : (
            "Submit"
          )}
        </button>
        {!state.success && state.message && (
          <p className="text-center text-sm text-red-600">
            {state.message === "Please fix the errors below."
              ? "Please complete the required fields highlighted below."
              : state.message}
          </p>
        )}
      </form>
    </>
  );
}

export default function ContactPage() {
  const [addressCopied, setAddressCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const copyAddressToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("33-15 127th Pl, Corona, NY 11368");
      setAddressCopied(true);
      setTimeout(() => setAddressCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-white text-neutral-800 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">
            Contact Us
          </h1>
          <p className="mt-2 max-w-2xl mx-auto text-base sm:text-lg text-neutral-600">
            Have a question or need a quote? We're here to help.
          </p>
          <p className="mt-1 text-sm text-neutral-500 italic">We proudly back our installations with warranties up to 100 years.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:gap-16 lg:grid-cols-2">
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Get in Touch</h2>
              <p className="text-sm text-neutral-500 mb-4">Tap an option to get in touch</p>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3 px-4 text-base font-medium text-neutral-800 border-neutral-300 bg-white hover:bg-neutral-50">
                  <a href="tel:+12123654386" className="flex items-center gap-3">
                    <img src="/icons/phone-icon.svg" alt="Phone" className="h-5 w-5" />
                    <span>Call: 212-365-4386</span>
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3 px-4 text-base font-medium text-neutral-800 border-neutral-300 bg-white hover:bg-neutral-50">
                  <a href="sms:+12123654386" className="flex items-center gap-3">
                    <img src="/icons/imessage-icon.svg" alt="iMessage" className="h-5 w-5" />
                    <span>Text: 212-365-4386</span>
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3 px-4 text-base font-medium text-neutral-800 border-neutral-300 bg-white hover:bg-neutral-50">
                  <a href="https://wa.me/12123654386" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                    <img src="/icons/whats-app-icon.svg" alt="WhatsApp" className="h-5 w-5" />
                    <span>WhatsApp: 212-365-4386</span>
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3 px-4 text-base font-medium text-neutral-800 border-neutral-300 bg-white hover:bg-neutral-50">
                  <a href="mailto:chris@clayroofingnewyork.com" className="flex items-center gap-3">
                    <img src="/icons/mail-icon.svg" alt="Email" className="h-5 w-5" />
                    <span className="text-sm">Email: chris@clayroofingnewyork.com</span>
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3 px-4 text-base font-medium text-neutral-800 border-neutral-300 bg-white hover:bg-neutral-50">
                  <a href="/api/vcard" download="clay_roofing_new_york.vcf" className="flex items-center gap-3">
                    <img src="/icons/contact-icon.svg" alt="Contact" className="h-5 w-5" />
                    <span>Save our contact</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-neutral-200 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">Send us a message</h2>
            <ContactForm />
          </div>
        </div>
      </main>
      <footer className="border-t border-neutral-200 bg-neutral-50">
        <div className="max-w-7xl mx auto px-4 py-6 space-y-4 text-center text-neutral-500">
          <p>&copy; {new Date().getFullYear()} Clay Roofs New York. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
