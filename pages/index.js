import Image from 'next/image'
import { Inter } from 'next/font/google'
import { getVideos } from '@/lib/data'
import prisma from '@/lib/prisma'
import Videos from './components/Videos'
import Heading from './components/Heading'
import LoadMore from './components/LoadMore'
import { useState } from 'react'
import { amount } from '@/lib/config'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
export default function Index({initialVideos}) {
  const { data: session, status} = useSession()
  const router = useRouter()
  const [videos, setVideos] = useState(initialVideos)
  const [reachedEnd, setReachedEnd] = useState(initialVideos.length < amount)

  const loading = status === 'loading'
  if(loading) return null

  if(session && !session.user.name){
    router.push('/setup')
  }

  return (
    <main
      className={` min-h-screen  ${inter.className}`}
    >
      
      <Heading />

      {videos.length === 0 && (
        <p className='flex justify-center mt-20'>No Videos Found!</p>
      )}
        <Videos videos={videos}/>
        {!reachedEnd && (
          <LoadMore 
          videos={videos} 
          setVideos={setVideos}
          setReachedEnd={setReachedEnd}/>
        )}
        

    </main>
  )
}


export async function getServerSideProps(){
  let videos = await getVideos({}, prisma)
  videos = JSON.parse(JSON.stringify(videos))

  return {
    props: {
      initialVideos: videos
    }
  }
}