import {defer} from '@shopify/remix-oxygen';
import {Suspense} from 'react';
import {Await, useLoaderData} from '@remix-run/react';
import {AnalyticsPageType} from '@shopify/hydrogen';

import {ProductSwimlane, FeaturedCollections, Hero} from '~/components';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {getHeroPlaceholder} from '~/lib/placeholders';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders, CACHE_SHORT} from '~/data/cache';
import BCTest from '../../public/BC-test.png'

import { Link } from '~/components';
import Landing from '../../public/aromaComp.mp4'
import Brush from '../../public/brush.png'
import Dress from '../../public/Dress.png'
import Look from '../../public/Look.png'

export const headers = routeHeaders;

export async function loader({params, context}) {
  const {language, country} = context.storefront.i18n;

  if (
    params.locale &&
    params.locale.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    // If the locale URL param is defined, yet we still are on `EN-US`
    // the the locale param must be invalid, send to the 404 page
    throw new Response(null, {status: 404});
  }

  const {shop, hero} = await context.storefront.query(HOMEPAGE_SEO_QUERY, {
    variables: {handle: 'freestyle'},
  });

  const seo = seoPayload.home();

  return defer(
    {
      shop,
      primaryHero: hero,
      // These different queries are separated to illustrate how 3rd party content
      // fetching can be optimized for both above and below the fold.
      featuredProducts: context.storefront.query(
        HOMEPAGE_FEATURED_PRODUCTS_QUERY,
        {
          variables: {
            /**
             * Country and language properties are automatically injected
             * into all queries. Passing them is unnecessary unless you
             * want to override them from the following default:
             */
            country,
            language,
          },
        },
      ),
      secondaryHero: context.storefront.query(COLLECTION_HERO_QUERY, {
        variables: {
          handle: 'backcountry',
          country,
          language,
        },
      }),
      featuredCollections: context.storefront.query(
        FEATURED_COLLECTIONS_QUERY,
        {
          variables: {
            country,
            language,
          },
        },
      ),
      tertiaryHero: context.storefront.query(COLLECTION_HERO_QUERY, {
        variables: {
          handle: 'winter-2022',
          country,
          language,
        },
      }),
      analytics: {
        pageType: AnalyticsPageType.home,
      },
      seo,
    },
    {
      headers: {
        'Cache-Control': CACHE_SHORT,
      },
    },
  );
}

export default function Homepage() {
  const {
    secondaryHero,
    tertiaryHero,
    featuredCollections,
    featuredProducts,
  } = useLoaderData();

  // TODO: skeletons vs placeholders
  const skeletons = getHeroPlaceholder([{}, {}, {}]);




  return (
    <>


<div style={{ position: 'relative', overflow: 'hidden' }}>
   <video
     src={Landing}
     alt="Tracks in the snow leading to a person on a mountain top with a red jacket contrasting to an epic blue horizon with a mountain range in the distance."
     style={{ width: '100vw', height: '75vh', objectFit: 'cover' }}
     autoPlay
     loop
     muted
     playsInline
   />

   <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#fff' }}>
     
   </div>
 </div>
      

      {featuredProducts && (
        <Suspense>
          <Await resolve={featuredProducts}>
            {({products}) => {
              if (!products?.nodes) return <></>;
              return (
                <ProductSwimlane
                  products={products.nodes}
                  title="Featured This Week"
                  count={4}
                />
              );
            }}
          </Await>
        </Suspense>
      )}


<div>

  <div style={{ position: 'relative', margin: '2rem', borderRadius: '4px', overflow: 'hidden', maxHeight: '600px' }}>
    <img
      src={BCTest}
      alt="Vintage"
      style={{
        maxWidth: '100%',
        borderRadius: '4px'
      }}
    />
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#fff' }}>
      <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Vintage Collection</h2>
      <p>Just Dropped</p>
      <a href="http://localhost:64003/products" style={{ color: '#fff' }}>Shop Now →</a>
    </div>
  </div>

</div>


 


 <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 m-8">
     <div className="hover-scroll-section">
       <div className="relative">
         <div style={{ paddingBottom: '100%', position: 'relative' }}>
           <img
             src={Brush}
             alt="Vintage Cars"
             style={{
               position: 'absolute',
               top: 0,
               left: 0,
               width: '100%',
               height: '100%',
               objectFit: 'cover',
               borderRadius: '4px',
             }}
           />
         </div>
         <div className="absolute inset-0 flex flex-col justify-center items-center bg-opacity-0 hover:bg-opacity-75 transition-opacity duration-300">
           <h3 className="text-white text-xl font-bold">About Us</h3>
           <Link to={`http://localhost:3000/pages/copy-of-about-us`}>
           <button className="mt-2 px-4 py-2 bg-white text-black rounded hover:bg-gray-800 transition-colors duration-300">
             Learn More
           </button>
           </Link>
         </div>
       </div>
     </div>
     <div className="hover-scroll-section">
       <div className="relative">
         <div style={{ paddingBottom: '100%', position: 'relative' }}>
           <img
             src={Dress}
             alt="Vintage Photography"
             style={{
               position: 'absolute',
               top: 0,
               left: 0,
               width: '100%',
               height: '100%',
               objectFit: 'cover',
               borderRadius: '4px',
             }}
           />
         </div>
         <div className="absolute inset-0 flex flex-col justify-center items-center bg-opacity-0 hover:bg-opacity-75 transition-opacity duration-300">

           <h3 className="text-white text-xl font-bold">Contact Us</h3>
           <Link to={`https://bodchristensen.ca/pages/contact-us`}>
           <button className="mt-2 px-4 py-2 bg-white text-black rounded hover:bg-gray-800 transition-colors duration-300">
             Get in Touch
           </button>
           </Link>

         </div>
       </div>
     </div>
     <div className="hover-scroll-section">
       <div className="relative">
         <div style={{ paddingBottom: '100%', position: 'relative' }}>
           <img
             src={Look}
             alt="Dining Room"
             style={{
               position: 'absolute',
               top: 0,
               left: 0,
               width: '100%',
               height: '100%',
               objectFit: 'cover',
               borderRadius: '4px',
             }}
           />
         </div>
         <div className="absolute inset-0 flex flex-col justify-center items-center bg-opacity-0 hover:bg-opacity-75 transition-opacity duration-300">


           <h3 className="text-white text-xl font-bold">Socials</h3>
           <Link to={`http://localhost:3000/pages/socials`}>
           <button className="mt-2 px-4 py-2 bg-white text-black rounded hover:bg-gray-800 transition-colors duration-300">
             Follow Us
           </button>
           </Link>
         </div>
       </div>
     </div>
   </div>
 
 

      {secondaryHero && (
        <Suspense fallback={<Hero {...skeletons[1]} />}>
          <Await resolve={secondaryHero}>
            {({hero}) => {
              if (!hero) return <></>;
              return <Hero {...hero} />;
            }}
          </Await>
        </Suspense>
      )}



      {featuredCollections && (
        <Suspense>
          <Await resolve={featuredCollections}>
            {({collections}) => {
              if (!collections?.nodes) return <></>;
              return (
                <FeaturedCollections
                  collections={collections.nodes}
                  title=""
                />
              );
            }}
          </Await>
        </Suspense>
      )}



      {tertiaryHero && (
        <Suspense fallback={<Hero {...skeletons[2]} />}>
          <Await resolve={tertiaryHero}>
            {({hero}) => {
              if (!hero) return <></>;
              return <Hero {...hero} />;
            }}
          </Await>
        </Suspense>
      )}
    </>
  );
}




const COLLECTION_CONTENT_FRAGMENT = `#graphql
  fragment CollectionContent on Collection {
    id
    handle
    title
    descriptionHtml
    heading: metafield(namespace: "hero", key: "title") {
      value
    } 
    byline: metafield(namespace: "hero", key: "byline") {
      value
    }
    cta: metafield(namespace: "hero", key: "cta") {
      value
    }
    spread: metafield(namespace: "hero", key: "spread") {
      reference {
        ...Media
      }
    }
    spreadSecondary: metafield(namespace: "hero", key: "spread_secondary") {
      reference {
        ...Media
      }
    }
  }
  ${MEDIA_FRAGMENT}
`;

const HOMEPAGE_SEO_QUERY = `#graphql
  query seoCollectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    hero: collection(handle: $handle) {
      ...CollectionContent
    }
    shop {
      name
      description
    }
  }
  ${COLLECTION_CONTENT_FRAGMENT}
`;

const COLLECTION_HERO_QUERY = `#graphql
  query heroCollectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    hero: collection(handle: $handle) {
      ...CollectionContent
    }
  }
  ${COLLECTION_CONTENT_FRAGMENT}
`;

// @see: https://shopify.dev/api/storefront/2023-04/queries/products
export const HOMEPAGE_FEATURED_PRODUCTS_QUERY = `#graphql
  query homepageFeaturedProducts($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: 8 sortKey: PRICE) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

// @see: https://shopify.dev/api/storefront/2023-04/queries/collections
export const FEATURED_COLLECTIONS_QUERY = `#graphql
  query homepageFeaturedCollections($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collections(
      first: 4,
      sortKey: UPDATED_AT
    ) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
`;
