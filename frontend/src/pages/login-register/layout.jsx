import './globals.css'

export const metadata = {
  title: 'v0 App',
  description: 'Created with v0',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
