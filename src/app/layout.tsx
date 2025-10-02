import "@/app/global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({
  subsets: ["latin"],
});

const lilex = localFont({
  src: "../../public/fonts/Lilex-Variable.ttf",
  display: "block",
  variable: "--font-lilex",
});

const lora = localFont({
  src: "../../public/fonts/Lora-Variable.ttf",
  display: "block",
  variable: "--font-lora",
});

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.className} ${lilex.variable} ${lora.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen font-lilex">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
