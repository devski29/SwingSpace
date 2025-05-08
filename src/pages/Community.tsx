import React from 'react';

const CommunityPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Community Guidelines</h1>
        <p className="text-sm text-gray-400 mb-8">Effective Date: 07/05/2025</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-4">1. Respectful Interaction</h2>
            <p className="text-gray-300">
              Treat all members with respect. Harassment, discrimination, or hate speech will not be tolerated.
              We aim to maintain a safe and welcoming environment for all users.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">2. Consent</h2>
            <p className="text-gray-300">
              Always obtain clear consent before engaging in any interaction, both online and offline.
              Respect boundaries and privacy preferences set by other users.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">3. Content Standards</h2>
            <p className="text-gray-300 mb-4">
              Do not post content that is illegal, explicit without proper labeling, or violates the rights of others.
              All content must adhere to the following guidelines:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>No illegal or prohibited content</li>
              <li>Proper labeling of adult or sensitive content</li>
              <li>Respect copyright and intellectual property rights</li>
              <li>No sharing of personal information without consent</li>
              <li>No spam or commercial solicitation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">4. Reporting Violations</h2>
            <p className="text-gray-300">
              Report any violations of these guidelines to our moderation team. We are committed to maintaining 
              a safe community. Our team will review all reports promptly and take appropriate action.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">5. Enforcement</h2>
            <p className="text-gray-300 mb-4">
              Violations may result in content removal, account suspension, or termination. 
              Our moderation team may take the following actions:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Content removal</li>
              <li>Temporary account suspension</li>
              <li>Permanent account termination</li>
              <li>IP blocking in severe cases</li>
            </ul>
          </section>

          <section className="bg-primary-dark p-6 rounded-lg border border-gray-800">
            <h2 className="text-xl font-bold mb-4 text-accent-gold">⚠️ Disclaimer</h2>
            <p className="text-gray-300">
              SwingSpace is an adult-oriented platform intended for consensual interactions among adults. 
              We do not verify the identity of users and are not responsible for any interactions that 
              occur on or off the platform. Users are advised to exercise caution and conduct due diligence 
              when engaging with others. SwingSpace disclaims all liability for any damages arising from 
              user interactions.
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

export default CommunityPage;