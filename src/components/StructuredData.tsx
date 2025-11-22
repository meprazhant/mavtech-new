import Script from 'next/script';

/**
 * SEO JSON-LD structured data component for local business
 * This helps Google understand your business better for local searches
 */
export default function StructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://mavtech.com.np",
        "name": "MavTech",
        "description": "Leading software development company in Bhadrapur, Jhapa, Nepal. We provide professional web development, mobile app development, UI/UX design, and custom software solutions.",
        "url": "https://mavtech.com.np",
        "telephone": "+977-XXXXXXXXXX", // Add your phone number
        "email": "contact@mavtech.com.np", // Add your email
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Your Street Address", // Add your street address
            "addressLocality": "Bhadrapur",
            "addressRegion": "Jhapa",
            "addressCountry": "NP",
            "postalCode": "XXXXX" // Add your postal code
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 26.5444, // Replace with your actual coordinates
            "longitude": 88.1337 // Replace with your actual coordinates
        },
        "areaServed": [
            {
                "@type": "City",
                "name": "Bhadrapur"
            },
            {
                "@type": "State",
                "name": "Jhapa"
            },
            {
                "@type": "Country",
                "name": "Nepal"
            }
        ],
        "sameAs": [
            "https://www.facebook.com/mavtech", // Add your social media URLs
            "https://www.linkedin.com/company/mavtech",
            "https://twitter.com/mavtech",
            "https://www.instagram.com/mavtech"
        ],
        "priceRange": "$$",
        "openingHours": "Mo-Fr 09:00-18:00",
        "logo": "https://mavtech.com.np/images/ogImage.png", // Add your logo URL
        "image": "https://mavtech.com.np/images/ogImage.png",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "reviewCount": "50" // Update with actual review count
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Software Development Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Web Development",
                        "description": "Custom web application development services"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Mobile App Development",
                        "description": "iOS and Android mobile application development"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "UI/UX Design",
                        "description": "Professional user interface and user experience design"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Custom Software Development",
                        "description": "Tailored software solutions for businesses"
                    }
                }
            ]
        }
    };

    return (
        <Script
            id="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}
