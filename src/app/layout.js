// src/app/layout.js
import localFont from "next/font/local";
import './globals.scss';


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Ethereum Roulette",
  description: "A fun way to double-or-nothing your Eth",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <link
          rel="icon"
          href="/favicon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
  );
}
