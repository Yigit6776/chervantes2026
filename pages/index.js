import Head from "next/head";
import Image from "next/image";
import { Adamina, Geist, Geist_Mono } from "next/font/google";
import styles from "../styles/Home.module.css";
import Admin from "./admin";
import Home2 from "./home2";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
    <div>

     <Home2/>

  
    </div>
    

    </>
  );
}
