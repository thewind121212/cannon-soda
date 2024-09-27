import React from "react";
import "./globals.css";
import localFont from "next/font/local";
import Header from "@/components/Header";
import ViewCanvas from "@/components/ViewCanvas";
import Footer from "@/components/layout/Footer";

const alpino = localFont({
  src: "../../../public/fonts/Alpino-Variable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-alpino",
});

/* Our app sits here to not cause any conflicts with payload's root layout  */
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html className={alpino.variable}>
      <body className="overflow-x-hidden bg-yellow-300">
        <Header />
        <main>
          {children}
          <ViewCanvas />
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default Layout;
