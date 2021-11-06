import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apollo'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import SiteLayout from '../components/SiteLayout';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)
  const apolloClient = useApollo(pageProps)
  return getLayout(
  <ApolloProvider client={apolloClient}>
    <SiteLayout>
<Component {...pageProps} />
    </SiteLayout>
      
    </ApolloProvider>)
}

export default MyApp

