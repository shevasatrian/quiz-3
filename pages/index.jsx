
import { Inter } from 'next/font/google'
import { useEffect } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const inter = Inter({ subsets: ['latin'] })
const LayoutComponent = dynamic(() => import("@/layout"), { ssr: true })

export default function Main({ children }) {

  return (
    <>
      <LayoutComponent metaTitle="Home">
        <div className='container mx-auto'>
          Index
        </div>
      </LayoutComponent>
    </>
  )
}
