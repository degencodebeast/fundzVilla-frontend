import Image from "next/image";
import { Inter } from "next/font/google";
import { Features, Footer, Hero, Navbar, Social, Sponsors } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Navbar />
      <main
        className={`main-color flex min-h-screen flex-col items-center justify-between p-24 `}
      >
        <Hero />
        <Social />
        <Features />
        <Sponsors />

        <Footer />
      </main>
    </>
  );
}
