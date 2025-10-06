// Archived on October 06, 2025
import { Button } from "@/components/ui/button";

export const RemovedContactOptions = () => (
  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 sm:p-8 space-y-6">
    <div>
      <h2 className="text-xl font-semibold text-neutral-900 mb-4">Get in Touch</h2>
      <p className="text-sm text-neutral-500 mb-4">Tap an option to get in touch</p>
      <div className="space-y-4">
        <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3 px-4 text-base font-medium text-neutral-800 border-neutral-300 bg-white hover:bg-neutral-50">
          <a href="tel:+1-212-365-4386" className="flex items-center gap-3">
            <img src="/icons/phone-icon.svg" alt="Phone" className="h-5 w-5" />
            <span>Tap here to call</span>
          </a>
        </Button>
        <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3 px-4 text-base font-medium text-neutral-800 border-neutral-300 bg-white hover:bg-neutral-50">
          <a href="sms:+1-212-365-4386" className="flex items-center gap-3">
            <img src="/icons/imessage-icon.svg" alt="iMessage" className="h-5 w-5" />
            <span>Tap here to text</span>
          </a>
        </Button>
        <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3 px-4 text-base font-medium text-neutral-800 border-neutral-300 bg-white hover:bg-neutral-50">
          <a href="https://wa.me/+1-212-365-4386" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
            <img src="/icons/whats-app-icon.svg" alt="WhatsApp" className="h-5 w-5" />
            <span>Tap here to WhatsApp</span>
          </a>
        </Button>
        <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3 px-4 text-base font-medium text-neutral-800 border-neutral-300 bg-white hover:bg-neutral-50">
          <a href="mailto:chris@clayroofingnewyork.com" className="flex items-center gap-3">
            <img src="/icons/mail-icon.svg" alt="Email" className="h-5 w-5" />
            <span>Tap here to email</span>
          </a>
        </Button>
        <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3 px-4 text-base font-medium text-neutral-800 border-neutral-300 bg-white hover:bg-neutral-50">
          <a href="/api/vcard" download="clay_roofing_new_york.vcf" className="flex items-center gap-3">
            <img src="/images/CRNY_Logo_1.png" alt="Contact" className="h-5 w-5" />
            <span>Tap here to save our contact</span>
          </a>
        </Button>
      </div>
    </div>
  </div>
);
