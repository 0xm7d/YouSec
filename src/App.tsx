import React, { useState } from 'react';
import { AmbientBackground } from './components/layout/AmbientBackground';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { PillarsSection } from './components/sections/PillarsSection';
import { FieldsSection } from './components/sections/FieldsSection';
import { ValuesSection } from './components/sections/ValuesSection';
import { ApplicationForm } from './components/form/ApplicationForm';
import { Footer } from './components/layout/Footer';
import { CodeOfConductModal } from './components/modals/CodeOfConductModal';
import { PrivacyNoticeModal } from './components/modals/PrivacyNoticeModal';

export const App: React.FC = () => {
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-yousec-bg text-yousec-text overflow-x-hidden">
      {/* Background Cyber Ambient Grid & Glows */}
      <AmbientBackground />

      {/* Fixed Header Navbar */}
      <Navbar />

      {/* Main Content Layout */}
      <main className="relative z-10">
        <HeroSection />
        <PillarsSection />
        <FieldsSection />
        <ValuesSection />
        <ApplicationForm />
      </main>

      {/* Footer */}
      <Footer
        onOpenCodeOfConduct={() => setCodeModalOpen(true)}
        onOpenPrivacyNotice={() => setPrivacyModalOpen(true)}
      />

      {/* Global Modals */}
      <CodeOfConductModal
        isOpen={codeModalOpen}
        onClose={() => setCodeModalOpen(false)}
      />
      <PrivacyNoticeModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />
    </div>
  );
};

export default App;
