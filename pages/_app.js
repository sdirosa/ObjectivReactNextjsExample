import { ObjectivProvider, ReactTracker } from "@objectiv/tracker-react";

if(process.env.NODE_ENV.startsWith('dev') && typeof window !== undefined) {
  require('@objectiv/developer-tools');
}

export default function MyApp({ Component, pageProps }) {
  const tracker = new ReactTracker({
    applicationId: 'nextjs-demo-app',
    transport: {
      transportName: 'ConsoleLogTransport',
      isUsable: () => true,
      handle: async (...args) => console.log(...args)
    }
  })

  return (
    <ObjectivProvider tracker={tracker}>
      <Component {...pageProps} />
    </ObjectivProvider>
  )
}