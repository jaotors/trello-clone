import type { Metadata } from 'next'

import Modal from '@/components/modal'

import './globals.css'

export const metadata: Metadata = {
  title: 'Trello Clone App',
  description: 'Just a Trello Clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className='bg-[#f5f6f8]'>
        {children}
        <Modal />
      </body>
    </html>
  )
}
