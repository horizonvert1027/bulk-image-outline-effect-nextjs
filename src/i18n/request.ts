import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  //   const locale = 'en';
  const headersList = headers();
  const host = headersList.get('host') || '';

  //   headersList.get('host'); // to get domain
  //   headersList.get('next-url'); // to get url
  let locale = 'en';
  console.log(headersList.get('host'))

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});