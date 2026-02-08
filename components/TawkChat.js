'use client';

import { useEffect } from 'react';

export default function TawkChat() {
  useEffect(() => {
    // Only load Tawk.to if credentials are provided
    const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
    const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

    if (!propertyId || !widgetId) {
      console.log('Tawk.to credentials not found. Please add them to .env.local to enable live chat.');
      return;
    }

    // Load Tawk.to script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      // Remove Tawk.to script and widget when component unmounts
      const tawkScript = document.querySelector(`script[src*="embed.tawk.to"]`);
      if (tawkScript) {
        tawkScript.remove();
      }
      
      // Remove Tawk widget iframe
      const tawkWidget = document.getElementById('tawkchat-container');
      if (tawkWidget) {
        tawkWidget.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
}