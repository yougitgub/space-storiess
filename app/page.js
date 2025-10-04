import Image from "next/image";
import SpaceScene from "@/components/SpaceScene";
import NavBar from "@/components/NavBar";
import Link from "next/link";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <>
    <div className=" min-h-screen ">
    <NavBar />
      <SpaceScene />
      <div className="absolute top-3/7 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <p className="text-8xl text-shadow-background text-clip"> Stellar Minds  Space</p>
        <p className="text-2xl mt-8">its our Project To Show Space </p>
         <Link href="/stories" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition">Explore Now</Link>
      </div>
  </div>
      <Footer />
    </>
  );
}
