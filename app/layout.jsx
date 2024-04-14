'use client';
import './globals.css';
import Footer from '../components/layout/Footer';
import React, { useEffect, useState } from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Navbar from '../components/layout/Navbar';
import Body from '../components/layout/Body';

export default function RootLayout({ children }) {
  const [tab, setTab] = useState('roadmap');
  const [subject, setSubject] = useState('addition');

  function updateTab(newTab) {
    setTab(newTab);
  }

  function updateSubject(newSubject) {
    setSubject(newSubject);
    setTab('progress');
  }

  return (
    <html lang="en">
      <head>
        <title>Mathathon</title>
      </head>
      <body>
        <UserProvider>
          <main id="app" className='flex-1'>
            <Navbar setTab={updateTab} /> 
            <Body tab={tab} subject={subject} setSubject={updateSubject} /> 
            <Footer />
          </main>
        </UserProvider>
      </body>
    </html>
  );
}
