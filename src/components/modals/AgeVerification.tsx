import React from 'react';
import { AlertTriangle } from 'lucide-react';
import ActionButton from '../buttons/ActionButton';

interface AgeVerificationProps {
  onVerify: (isAdult: boolean) => void;
}

const AgeVerification: React.FC<AgeVerificationProps> = ({ onVerify }) => {
  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
      <div className="card max-w-md w-full">
        <div className="p-4 sm:p-6">
          <div className="flex items-center mb-3 text-accent-gold">
            <AlertTriangle size={20} className="mr-2" />
            <h2 className="text-xl font-bold">Age Verification Required</h2>
          </div>

          <div className="space-y-3 mb-4">
            <p className="text-sm text-gray-300">
              Welcome to SwingSpace. This website contains adult content and is intended for 
              ADULTS ONLY (18+).
            </p>

            <div className="bg-primary-dark p-3 rounded-lg">
              <p className="text-xs text-gray-300 mb-2">
                By entering this site, you certify that you:
              </p>
              <ul className="list-disc pl-4 text-xs text-gray-300 space-y-0.5">
                <li>Are at least 18 years old</li>
                <li>Are legally permitted to view adult content in your jurisdiction</li>
                <li>Wish to view such content of your own free will</li>
                <li>Will not expose minors to this content</li>
              </ul>
            </div>

            <p className="text-xs text-gray-400">
              This site uses cookies. By entering, you accept our use of cookies as described 
              in our Privacy Policy and Cookie Policy.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <ActionButton
              onClick={() => onVerify(false)}
              variant="ghost"
              size="sm"
              className="order-2 sm:order-1"
            >
              Exit Site
            </ActionButton>
            <ActionButton
              onClick={() => onVerify(true)}
              variant="primary"
              size="sm"
              className="order-1 sm:order-2"
            >
              I am 18 or older - Enter Site
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeVerification;