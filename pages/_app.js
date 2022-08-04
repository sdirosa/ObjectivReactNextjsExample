import { LocaleContextPlugin } from "@objectiv/plugin-locale-context";
import { ObjectivProvider, ReactTracker } from "@objectiv/tracker-react";
import { useRouter } from "next/router";

if(process.env.NODE_ENV.startsWith('dev') && typeof window !== undefined) {
  require('@objectiv/developer-tools');
}

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { locale } = router;
  const [languageCode, countryCode] = locale.split('-');

  const tracker = new ReactTracker({
    applicationId: 'nextjs-demo-app',
    transport: {
      transportName: 'ConsoleLogTransport',
      isUsable: () => true,
      handle: async (...args) => console.log(...args)
    },
    plugins:[
      new LocaleContextPlugin({
        languageFactoryFunction: () => languageCode,
        countryFactoryFunction: () => countryCode,
      })
    ]
  })

  return (
    <ObjectivProvider tracker={tracker}>
      <Component {...pageProps} />
    </ObjectivProvider>
  )
}