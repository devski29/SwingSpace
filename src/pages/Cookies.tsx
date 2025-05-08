import React from 'react';

const CookiesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
        <p className="text-sm text-gray-400 mb-8">Effective Date: 07/05/2025</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-4">1. What Are Cookies?</h2>
            <p className="text-gray-300">
              Cookies are small data files stored on your device that help us enhance your experience on SwingSpace.
              These files contain information about your preferences and browsing habits, making your interaction
              with our platform more seamless and personalized.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">2. How We Use Cookies</h2>
            <p className="text-gray-300 mb-4">We use cookies to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Remember your login status and preferences</li>
              <li>Analyze site traffic and user behavior</li>
              <li>Improve our services and user experience</li>
              <li>Provide personalized content and recommendations</li>
              <li>Ensure the security of your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">3. Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-accent-gold">Essential Cookies</h3>
                <p className="text-gray-300">
                  Required for basic platform functionality. These cannot be disabled as they are necessary
                  for SwingSpace to work properly.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-accent-gold">Preference Cookies</h3>
                <p className="text-gray-300">
                  Store your preferences and settings to enhance your experience on future visits.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-accent-gold">Analytics Cookies</h3>
                <p className="text-gray-300">
                  Help us understand how users interact with SwingSpace, allowing us to improve our services.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">4. Managing Cookies</h2>
            <p className="text-gray-300 mb-4">
              You can control cookie settings through your browser preferences. Most web browsers allow you to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>View your cookie files and delete them individually</li>
              <li>Block third-party cookies</li>
              <li>Block cookies from particular sites</li>
              <li>Block all cookies</li>
              <li>Delete all cookies when you close your browser</li>
            </ul>
            <p className="text-gray-300 mt-4">
              Please note that disabling cookies may affect the functionality of SwingSpace and limit your
              ability to use certain features of our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">5. Updates to Cookie Policy</h2>
            <p className="text-gray-300">
              We may update this Cookie Policy from time to time to reflect changes in our practices
              or for operational, legal, or regulatory reasons. We encourage you to periodically
              review this page to stay informed about our use of cookies.
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

export default CookiesPage;