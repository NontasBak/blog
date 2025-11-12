import Link from "next/link";
import type { Metadata } from "next";

export default function HomePage() {
  return (
    <div className="relative min-h-[calc(100vh-56px)] border-x-2 mx-3 md:mx-8 lg:mx-12 flex flex-col">
      <div className="absolute inset-0 bg-fd-background">
        <div className="absolute inset-0 bg-[radial-gradient(hsl(0,0%,45.1%)_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
      </div>
      <main className="relative z-10 flex flex-1 flex-col justify-center items-center px-4">
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-left text-4xl md:text-5xl font-lora text-fd-foreground">
            Hi, I'm <span className="text-fd-primary font-bold">Nontas</span>
          </h1>

          <p className="text-lg text-fd-muted-foreground">Fullstack developer exploring Infosec and AI</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 text-center">
            <Link
              href="/blog"
              className="px-6 py-3 text-fd-foreground hover:text-fd-primary transition-colors underline underline-offset-4"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 text-fd-foreground hover:text-fd-primary transition-colors underline underline-offset-4"
            >
              About
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Home - Nontas Bakοulas",
    description: "Personal website of Epameinondas Bakoulas",
  };
}
