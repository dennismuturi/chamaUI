import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

import { Providers } from './redux/provider'

export const metadata = {
  title: 'Next chama',
  description: 'Chama App',
}

 function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
       <Providers>
        {children}
        </Providers>
        </body>
    </html>
  )
}

export default RootLayout