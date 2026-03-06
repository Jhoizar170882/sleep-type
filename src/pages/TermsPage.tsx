import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SEOHead from '@/components/SEOHead';

export default function TermsPage() {
  const { t } = useTranslation();

  return (
    <>
      <SEOHead titleKey="terms.title" descriptionKey="terms.description" path="/terms" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen text-slate-900 dark:text-slate-50"
      >
        <div className="max-w-3xl mx-auto px-4 py-20">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
            {t('terms.title')}
          </h1>
          <p className="text-slate-400 dark:text-slate-500 text-sm mb-10">
            Last updated: March 4, 2026
          </p>

          <div className="space-y-8 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Sleep Type Quiz at sleep-type.quizlab.me ("Service"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">2. Not Medical Advice</h2>
              <p>
                <strong>The Sleep Type Quiz is for informational and entertainment purposes only. It does not constitute medical advice, diagnosis, or treatment.</strong> The chronotype categories (Lion, Bear, Wolf, Dolphin) are based on published chronobiology research but are simplified for accessibility. Results should not be used as a substitute for professional medical or psychological advice.
              </p>
              <p className="mt-3">
                If you have concerns about your sleep health, including insomnia, sleep apnea, or other sleep disorders, please consult a qualified healthcare professional. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">3. Eligibility</h2>
              <p>
                You must be at least 13 years of age to use this Service. By using the Service, you represent and warrant that you meet this age requirement. If you are under 13, you may not use this Service.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">4. Use of the Service</h2>
              <p className="mb-3">You agree to use the Service only for lawful purposes and in a manner that does not infringe the rights of others. You specifically agree not to:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Submit automated, fraudulent, or spam quiz responses.</li>
                <li>Attempt to reverse-engineer, scrape, or reproduce the quiz scoring algorithm without permission.</li>
                <li>Use the Service in any way that could damage, disable, or impair the server infrastructure.</li>
                <li>Attempt to gain unauthorized access to any portion of the Service.</li>
                <li>Use the Service to collect information about other users.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">5. Advertising</h2>
              <p>
                The Service displays advertisements provided by <strong>Google AdSense</strong> and potentially other advertising networks. By using the Service, you acknowledge and agree that advertisements may be displayed to you. Advertisers are responsible for the content of their advertisements, and we do not endorse any advertised products or services.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">6. Intellectual Property</h2>
              <p>
                All content on this Service — including but not limited to quiz questions, result descriptions, chronotype profiles, design, graphics, text, and code — is owned by or licensed to Sleep Type Quiz and is protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p className="mt-3">
                You may share your personal quiz result for personal, non-commercial purposes (e.g., sharing on social media). You may not reproduce, distribute, or create derivative works from our content without prior written permission.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">7. Disclaimer of Warranties</h2>
              <p>
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY ACCURATE.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">8. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, SLEEP TYPE QUIZ AND ITS OPERATORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR GOODWILL, ARISING FROM YOUR USE OF OR INABILITY TO USE THE SERVICE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
              <p className="mt-3">
                Our total liability to you for any claims arising from your use of the Service shall not exceed $10 USD.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">9. Third-Party Links</h2>
              <p>
                The Service may contain links to third-party websites or services. These links are provided for convenience only. We have no control over the content or practices of third-party sites and accept no responsibility for them. Accessing third-party links is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">10. Privacy</h2>
              <p>
                Your use of the Service is also governed by our <a href="/privacy" className="underline hover:text-indigo-500 transition-colors">Privacy Policy</a>, which is incorporated into these Terms by reference.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">11. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes will be effective upon posting to the Service. Your continued use of the Service after any changes constitutes your acceptance of the new Terms. We encourage you to review these Terms periodically.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">12. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with applicable law, without regard to conflict of law principles. Any disputes arising from these Terms or your use of the Service shall be resolved through good-faith negotiation before resorting to formal legal proceedings.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">13. Contact Us</h2>
              <p>
                If you have questions about these Terms of Service, please contact us at:
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
