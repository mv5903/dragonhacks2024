'use client';

import './globals.css';
import Footer from '../components/layout/Footer';
import React, { useState } from 'react';
import Progress from '../components/progress/Progress';
import Roadmap from '../components/roadmap/Roadmap';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Navbar from '../components/layout/Navbar';

export default function RootLayout({ children }) {

  const [tab, setTab] = useState('roadmap');

  function updateTab(newTab) {
    setTab(newTab);
  }

  return (
    <html lang="en">
      <head>
        <title>Mathathon</title>
      </head>
      <body className="min-h-full">
        <UserProvider>
          <main id="app" className='flex flex-col h-full'>
            <Navbar setTab={updateTab} />
            <div className='flex-grow'>
              {
                tab === 'roadmap'
                ?
                <Roadmap />
                :
                <Progress />
              }
            </div>
            <Footer />
          </main>
        </UserProvider>
      </body>
    </html>
  );
}
