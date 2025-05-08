import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        <p className="text-sm text-gray-400 mb-8">Effective Date: 07/05/2025</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-300">
              By accessing or using SwingSpace, you agree to be bound by these Terms of Service and our Privacy Policy. 
              If you do not agree, please refrain from using our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">2. Eligibility</h2>
            <p className="text-gray-300">
              Users must be at least 18 years old to access SwingSpace. By using the platform, 
              you confirm that you meet this age requirement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">3. User Conduct</h2>
            <p className="text-gray-300 mb-4">
              You agree to use SwingSpace responsibly and not to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Violate any applicable laws or regulations.</li>
              <li>Post or share content that is unlawful, harmful, or offensive.</li>
              <li>Harass, threaten, or abuse other users.</li>
              <li>Impersonate any person or entity.</li>
              <li>Engage in any activity that could harm the platform or its users.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">4. Content Ownership</h2>
            <p className="text-gray-300">
              Users retain ownership of the content they post but grant SwingSpace a non-exclusive, 
              royalty-free license to use, display, and distribute such content on the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">5. Termination</h2>
            <p className="text-gray-300">
              SwingSpace reserves the right to suspend or terminate your account if you violate 
              these Terms of Service or engage in conduct detrimental to the community.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">6. Disclaimers</h2>
            <p className="text-gray-300">
              SwingSpace is provided "as is" without warranties of any kind. We do not guarantee 
              the accuracy or reliability of any content posted by users.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-300">
              SwingSpace shall not be liable for any indirect, incidental, or consequential 
              damages arising from your use of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">8. Changes to Terms</h2>
            <p className="text-gray-300">
              We may update these Terms of Service from time to time. Continued use of SwingSpace 
              after changes constitutes acceptance of the new terms.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-400">
            Last updated: May 7, 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;