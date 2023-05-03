import Image from 'next/image'
import { Inter } from 'next/font/google'
import { getVideos } from '@/lib/data'
import prisma from '@/lib/prisma'
import Videos from './components/Videos'

const inter = Inter({ subsets: ['latin'] })

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
export default function Index({videos}) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <header className='h-14 flex pt-5 px-5 pb-2'>
        <div className='text-xl'>
          <p>YouTube clone</p>
        </div>

        <div className='grow'></div>
      </header>

      {videos.length === 0 && (
        <p className='flex justify-center mt-20'>No Videos Found!</p>
      )}
        <Videos videos={videos}/>
      <a href='/api/auth/signin'>login</a>

    </main>
  )
}


export async function getServerSideProps(){
  let videos = await getVideos({}, prisma)
  videos = JSON.parse(JSON.stringify(videos))

  return {
    props: {videos}
  }
}