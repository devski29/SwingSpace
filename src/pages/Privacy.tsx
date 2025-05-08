import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-8">Effective Date: 07/05/2025</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-4">1. Information Collection</h2>
            <p className="text-gray-300">
              We collect personal information you provide, such as your name, email, and profile details. 
              We also collect data on your usage of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">2. Use of Information</h2>
            <p className="text-gray-300 mb-4">Your information is used to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Provide and improve our services.</li>
              <li>Communicate with you.</li>
              <li>Ensure the safety and security of the platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">3. Sharing of Information</h2>
            <p className="text-gray-300">
              We do not sell your personal information. We may share data with third-party 
              service providers as necessary to operate the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">4. Data Security</h2>
            <p className="text-gray-300">
              We implement appropriate security measures to protect your information. However, 
              no system is entirely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">5. Your Rights</h2>
            <p className="text-gray-300">
              You have the right to access, correct, or delete your personal information. 
              Contact us to exercise these rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">6. Cookies</h2>
            <p className="text-gray-300">
              SwingSpace uses cookies to enhance user experience. You can manage cookie 
              preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">7. Changes to Privacy Policy</h2>
            <p className="text-gray-300">
              We may update this Privacy Policy periodically. Continued use of the platform 
              after changes indicates acceptance of the new policy.
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

export default PrivacyPage;