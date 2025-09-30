import Link from "next/link";
import { blog } from "@/lib/source";

export default function Home() {
  const posts = blog.getPages();

  return (
    <div className="relative min-h-[calc(100vh-56px)] border-x-2 mx-3 md:mx-8 lg:mx-12">
      <div className="absolute inset-0 bg-fd-background">
        <div className="absolute inset-0 bg-[radial-gradient(hsl(0,0%,45.1%)_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
      </div>
      <main className="relative z-10 grow container max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Latest Blog Posts</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.url}
              href={post.url}
              className="block bg-fd-secondary rounded-lg shadow-md overflow-hidden p-6"
            >
              <h2 className="text-xl font-semibold mb-2">{post.data.title}</h2>
              <p className="mb-4">{post.data.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
