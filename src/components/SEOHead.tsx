import { useEffect } from 'react';

export function SEOHead() {
  useEffect(() => {
    // Actualizar título de la página
    document.title = 'SaludConecta - Aplicación de Telemedicina | Prototipo Demo';
    
    // Crear meta tags si no existen
    const createOrUpdateMetaTag = (property: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let metaTag = document.querySelector(`meta[${attribute}="${property}"]`) as HTMLMetaElement;
      
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute(attribute, property);
        document.head.appendChild(metaTag);
      }
      
      metaTag.content = content;
    };

    // Meta tags básicos
    createOrUpdateMetaTag('description', 'SaludConecta es una aplicación moderna de telemedicina con diseño profesional, videollamadas WebRTC, chat en tiempo real y gestión completa de citas médicas.');
    createOrUpdateMetaTag('keywords', 'telemedicina, salud digital, videollamadas médicas, chat médico, citas online, SaludConecta, aplicación médica');
    createOrUpdateMetaTag('author', 'SaludConecta Team');
    createOrUpdateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Open Graph tags para redes sociales
    createOrUpdateMetaTag('og:title', 'SaludConecta - Aplicación de Telemedicina', true);
    createOrUpdateMetaTag('og:description', 'Descubre la nueva aplicación de telemedicina con diseño moderno, videollamadas en tiempo real y gestión completa de citas médicas.', true);
    createOrUpdateMetaTag('og:type', 'website', true);
    createOrUpdateMetaTag('og:url', window.location.href, true);
    createOrUpdateMetaTag('og:site_name', 'SaludConecta', true);
    createOrUpdateMetaTag('og:locale', 'es_ES', true);

    // Twitter Cards
    createOrUpdateMetaTag('twitter:card', 'summary_large_image');
    createOrUpdateMetaTag('twitter:title', 'SaludConecta - App de Telemedicina');
    createOrUpdateMetaTag('twitter:description', 'Aplicación moderna de telemedicina con videollamadas, chat y gestión de citas');

    // Meta tags de aplicación
    createOrUpdateMetaTag('application-name', 'SaludConecta');
    createOrUpdateMetaTag('theme-color', '#2563eb');
    createOrUpdateMetaTag('msapplication-TileColor', '#2563eb');

    // Structured data para SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "SaludConecta",
      "description": "Aplicación de telemedicina con videollamadas, chat y gestión de citas médicas",
      "url": window.location.href,
      "applicationCategory": "MedicalApplication",
      "operatingSystem": "Web Browser",
      "creator": {
        "@type": "Organization",
        "name": "SaludConecta Team"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    };

    // Crear o actualizar script de structured data
    let structuredDataScript = document.querySelector('script[type="application/ld+json"]');
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.type = 'application/ld+json';
      document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(structuredData);

  }, []);

  return null;
}

// Hook para compartir contenido
export function useShare() {
  const shareContent = async () => {
    const shareData = {
      title: 'SaludConecta - Aplicación de Telemedicina',
      text: 'Descubre la nueva aplicación de telemedicina SaludConecta con videollamadas, chat en tiempo real y gestión completa de citas médicas.',
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback para navegadores sin Web Share API
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
        return 'copied';
      }
    } catch (error) {
      console.error('Error al compartir:', error);
      // Fallback manual
      const textToShare = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
      const textArea = document.createElement('textarea');
      textArea.value = textToShare;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return 'copied';
    }
  };

  return { shareContent };
}