import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SEOHead from '@/components/SEOHead';

export default function PrivacyPolicyPage() {
  const { t } = useTranslation();

  return (
    <>
      <SEOHead titleKey="privacy.title" descriptionKey="privacy.description" path="/privacy" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen text-slate-900 dark:text-slate-50"
      >
        <div className="max-w-3xl mx-auto px-4 py-20">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
            {t('privacy.title')}
          </h1>
          <p className="text-slate-400 dark:text-slate-500 text-sm mb-10">
            Last updated: March 4, 2026
          </p>

          <div className="space-y-8 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">1. Introduction</h2>
              <p>
                Welcome to Sleep Type Quiz ("we," "our," or "us"), operated at sleep-type.quizlab.me. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you use our chronotype quiz service.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">2. Information We Collect</h2>
              <p className="mb-3">When you take the quiz, we collect the following data:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li><strong>Quiz responses:</strong> Your answers to the 10 chronotype questions and the resulting chronotype score breakdown.</li>
                <li><strong>Chronotype result:</strong> The category assigned to you (Lion, Bear, Wolf, or Dolphin).</li>
                <li><strong>Language (locale):</strong> Your browser's language preference or selected language.</li>
                <li><strong>User agent:</strong> Browser and device type information for compatibility and analytics purposes.</li>
                <li><strong>Hashed IP address:</strong> A one-way SHA-256 hash of your IP address. We never store your raw IP. This hash is used solely to prevent abuse and duplicate submissions.</li>
              </ul>
              <p className="mt-3">
                We do <strong>not</strong> collect your name, email address, or any other directly identifying personal information unless you voluntarily contact us.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">3. Local Storage</h2>
              <p>
                We use your browser's <strong>localStorage</strong> (not cookies) to remember your language preference and quiz results between sessions. This data is stored entirely on your device and is not transmitted to our servers. You can clear it at any time through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">4. How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>To calculate and display your chronotype result.</li>
                <li>To generate anonymized aggregate statistics about chronotype distribution (displayed on the /stats page).</li>
                <li>To detect and prevent abusive or fraudulent submissions.</li>
                <li>To improve the quiz experience and our service.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">5. Advertising — Google AdSense</h2>
              <p>
                This website uses <strong>Google AdSense</strong> to display advertisements. Google AdSense may use cookies and similar tracking technologies to serve personalized ads based on your visits to this and other websites. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the internet.
              </p>
              <p className="mt-3">
                You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="underline hover:text-indigo-500 transition-colors" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>. You can also opt out via the <a href="https://www.networkadvertising.org/choices/" className="underline hover:text-indigo-500 transition-colors" target="_blank" rel="noopener noreferrer">Network Advertising Initiative opt-out page</a>.
              </p>
              <p className="mt-3">
                For more information on how Google uses data, please visit: <a href="https://policies.google.com/technologies/partner-sites" className="underline hover:text-indigo-500 transition-colors" target="_blank" rel="noopener noreferrer">How Google uses information from sites or apps that use our services</a>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">6. Data Sharing and Third Parties</h2>
              <p>
                We do not sell, trade, or rent your information to third parties. We may share anonymized, aggregated data (e.g., "55% of users are Bears") publicly. Our infrastructure uses the following trusted third-party services:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2 mt-3">
                <li><strong>Vercel:</strong> Hosting and serverless functions (vercel.com)</li>
                <li><strong>Neon:</strong> Serverless PostgreSQL database (neon.tech)</li>
                <li><strong>Google AdSense:</strong> Advertising (google.com/adsense)</li>
                <li><strong>Cloudflare:</strong> DNS and security (cloudflare.com)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">7. Data Retention</h2>
              <p>
                Quiz submission data (chronotype result, scores, locale, user agent, hashed IP) is retained in our database indefinitely for the purpose of aggregate statistics. Because we do not store any directly identifying information, we are unable to retrieve or delete a specific individual's record upon request. If you have concerns, please contact us and we will do our best to assist.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">8. Your Rights (GDPR & CCPA)</h2>
              <p className="mb-3">Depending on your jurisdiction, you may have the following rights:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li><strong>Right to access:</strong> Request information about the data we hold about you.</li>
                <li><strong>Right to deletion:</strong> Request deletion of your personal data (where technically feasible given our anonymized data model).</li>
                <li><strong>Right to opt-out:</strong> Opt out of the sale of personal information (we do not sell data).</li>
                <li><strong>Right to non-discrimination:</strong> We will not discriminate against you for exercising your privacy rights.</li>
              </ul>
              <p className="mt-3">
                To exercise these rights, contact us at: <strong>sleeptypequiz@quizlab.me</strong>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">9. Children's Privacy</h2>
              <p>
                Sleep Type Quiz is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately at <strong>sleeptypequiz@quizlab.me</strong> so we can take appropriate action.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">10. Security</h2>
              <p>
                We implement industry-standard security measures including HTTPS encryption, SHA-256 IP hashing, and security headers (X-Content-Type-Options, X-Frame-Options, XSS Protection). However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the "Last updated" date at the top of this page. Continued use of the service after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">12. Contact Us</h2>
              <p>
                If you have questions or concerns about this Privacy Policy, please contact us at:
              </p>
              <p className="mt-2">
                <strong>Email:</strong> sleeptypequiz@quizlab.me<br />
                <strong>Website:</strong> sleep-type.quizlab.me
              </p>
            </section>
          </div>
        </div>
      </motion.div>
    </>
  );
}
