'use client';

interface Review {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  time: number;
}

interface ReviewsSchemaProps {
  reviews: Review[];
  averageRating: number;
  totalRatings: number;
}

export default function ReviewsSchema({ reviews, averageRating, totalRatings }: ReviewsSchemaProps) {
  // Create LocalBusiness schema with reviews
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "מעוז לוסטיג - מומחה שיווק דיגיטלי",
    "alternateName": "Maoz Digital",
    "description": "מומחה שיווק דיגיטלי לחנויות איקומרס - בניית אתרים, קמפיינים בגוגל ובמטא, אופטימיזציה למכירות",
    "url": "https://maozdigital.com",
    "telephone": "+972-50-123-4567", // להחליף למספר הטלפון האמיתי
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "ישראל",
      "addressCountry": "IL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "32.0853",
      "longitude": "34.7818"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": averageRating,
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": totalRatings
    },
    "review": reviews.map((review) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author_name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": review.text,
      "datePublished": new Date(review.time).toISOString(),
      "publisher": {
        "@type": "Organization",
        "name": "Google"
      }
    })),
    "priceRange": "$$",
    "serviceArea": {
      "@type": "Country",
      "name": "ישראל"
    },
    "areaServed": "ישראל",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "שירותי שיווק דיגיטלי",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "בניית אתרים",
          "description": "בניית אתרי אינטרנט מקצועיים ומותאמים לעסק"
        },
        {
          "@type": "OfferCatalog", 
          "name": "קמפיינים בגוגל",
          "description": "הקמה וניהול קמפיינים ברשת הפרסום של גוגל"
        },
        {
          "@type": "OfferCatalog",
          "name": "שיווק במטא וטיקטוק",
          "description": "קמפיינים ממומנים ברשתות החברתיות"
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(localBusinessSchema, null, 2)
      }}
    />
  );
}
