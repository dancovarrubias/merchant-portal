'use client';
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';

export default function ContactPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  return (
    <>
      <PageLayout
        title="Contacto"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      >
        <div className="space-y-4">
          <p className="text-text-secondary">
            Sección de contacto en construcción.
          </p>
        </div>
      </PageLayout>
    </>
  );
}