import Link from "next/link";
import type { Metadata } from "next";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <h1 className="mb-4 text-2xl font-bold">Hello World</h1>
      <p className="text-fd-muted-foreground">
        You can open{" "}
        <Link href="/blog" className="text-fd-foreground font-semibold underline">
          /blog
        </Link>{" "}
        and see the blog posts.
      </p>
    </main>
  );
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return {
    title: "Home - Nontas Bak",
    description: "Welcome to the personal website of Nontas Bakoulas",
  };
}
