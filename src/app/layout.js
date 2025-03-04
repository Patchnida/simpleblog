import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/footer";
import NavBar from "@/components/navbar/navbar";
import { AuthProvider } from "./Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SimpleBlog Website",
  description: "SimpleBlog WEbsite use for read and post the blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex flex-1">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
