import type { NextPage } from 'next'
import {ResponsiveDrawer} from '../components/ResponsiveDrawer'
import { useQuery } from '@apollo/client';
import {GET_POSTS} from '../lib/query/posts'
import {Posts} from '../typedef'
import SiteLayout from '../components/SiteLayout';
const Home: NextPage = () => {
  const { loading, data,error } = useQuery<Posts>(
    GET_POSTS
  );

  if(loading) console.log('Hello Data',loading)
  if(data) console.log('Hello 200',data)
  if(error) console.log('Hello Error',error?.networkError?.message)



  return (
    <div>
      <h1>Hello World</h1>
    </div>
  )
}
export default Home
