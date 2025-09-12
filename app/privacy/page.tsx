"use client"

import React from "react"

export default function PrivacyPage() {
  return (
    <div className="bg-white text-neutral-800 min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Effective Date: <strong>January 1, 2025</strong> · Last Updated:{" "}
            <strong>September 12, 2025</strong>
          </p>
        </header>

        {/* Intro */}
        <section className="mb-8 space-y-4">
          <p>
            Clay Roofing New York (“Company,” “we,” “our,” or “us”) values your
            privacy and is committed to protecting your personal information.
            This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website{" "}
            <a
              href="https://clayroofingnewyork.com"
              className="text-orange-600 hover:underline"
            >
              clayroofingnewyork.com
            </a>{" "}
            (the “Site”).
          </p>
          <p>
            By using our Site, you agree to the practices described in this
            Privacy Policy. If you do not agree, please discontinue use of our
            Site.
          </p>
        </section>

        {/* Sections */}
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-2">
              1. Information We Collect
            </h2>
            <ul className="list-disc list-inside space-y-2 text-neutral-700">
              <li>
                <strong>Personal Information You Provide:</strong> Name, email
                address, phone number, home address, and any other details
                submitted through contact forms, quote requests, or email
                communication.
              </li>
              <li>
                <strong>Project Information:</strong> Details about your roofing
                project, property location, and preferences when requesting an
                estimate or consultation.
              </li>
              <li>
                <strong>Automatically Collected Information:</strong> IP
                address, browser type, device type, operating system, pages
                visited, and time/date of your visit.
              </li>
              <li>
                <strong>Cookies and Tracking Technologies:</strong> We may use
                cookies, analytics tools, and similar technologies to understand
                how users interact with our Site and to improve functionality.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-2 text-neutral-700">
              <li>To respond to inquiries and provide roofing estimates or services.</li>
              <li>To communicate with you about appointments, services, or updates.</li>
              <li>To process transactions or agreements related to our services.</li>
              <li>To improve our website, marketing, and customer experience.</li>
              <li>To comply with legal obligations or resolve disputes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. Sharing of Information</h2>
            <p>
              We do not sell your personal information. However, we may share
              your information in the following situations:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700">
              <li>
                <strong>Service Providers:</strong> With trusted contractors,
                vendors, or partners who help us operate our business (e.g.,
                email hosting, analytics, or payment processors).
              </li>
              <li>
                <strong>Legal Compliance:</strong> When required to comply with
                laws, regulations, legal processes, or government requests.
              </li>
              <li>
                <strong>Business Transfers:</strong> In the event of a merger,
                acquisition, or sale of assets, your information may be
                transferred to the new entity.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
            <p>
              We use reasonable administrative, technical, and physical
              safeguards to protect your information. However, no method of
              transmission over the internet is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              5. Your Choices and Rights
            </h2>
            <p>
              Depending on your location, you may have certain rights regarding
              your personal information, such as:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700">
              <li>
                Requesting access to or a copy of the data we hold about you.
              </li>
              <li>Requesting correction or deletion of your personal data.</li>
              <li>
                Opting out of marketing communications by contacting us
                directly.
              </li>
            </ul>
            <p>
              To exercise these rights, please contact us at{" "}
              <a
                href="mailto:chris@clayroofingnewyork.com"
                className="text-orange-600 hover:underline"
              >
                chris@clayroofingnewyork.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. Third-Party Links</h2>
            <p>
              Our Site may contain links to third-party websites. We are not
              responsible for the privacy practices or content of those third
              parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">7. Children’s Privacy</h2>
            <p>
              Our services are not directed to children under the age of 13, and
              we do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              8. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. The revised
              version will be posted on this page with an updated “Last Updated”
              date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
            <address className="not-italic text-neutral-700 space-y-1">
              <p>
                <strong>Clay Roofing New York</strong>
              </p>
              <p>Email: chris@clayroofingnewyork.com</p>
              <p>Phone: (212) 365-4386</p>
              <p>Address: 33-15 127th Pl, Corona, NY 11368</p>
            </address>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-neutral-200 text-center text-neutral-500 text-sm">
          <p>© {new Date().getFullYear()} Clay Roofing New York. All rights reserved.</p>
        </footer>
      </main>
    </div>
  )
}
