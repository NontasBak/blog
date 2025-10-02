import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { blog } from "@/lib/source";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/shadcn/ui/pagination";
import type { Metadata } from "next";

interface HomeProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const posts = blog.getPages().sort((a, b) => {
    const dateA = new Date(a.data.date);
    const dateB = new Date(b.data.date);
    return dateB.getTime() - dateA.getTime(); // Most recent first
  });
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const postsPerPage = 5;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  return (
    <div className="relative min-h-[calc(100vh-56px)] border-x-2 mx-3 md:mx-8 lg:mx-12">
      <div className="absolute inset-0 bg-fd-background">
        <div className="absolute inset-0 bg-[radial-gradient(hsl(0,0%,45.1%)_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
      </div>
      <main className="relative z-10 grow px-4 py-8 container max-w-7xl flex justify-center">
        <div className="w-full max-w-2xl">
          <h1 className="text-4xl font-bold mb-12 text-left font-lora">Latest Blog Posts</h1>
          <div className="flex flex-col gap-8">
            {currentPosts.map((post) => (
              <Link
                key={post.url}
                href={post.url}
                className="group block  backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-fd-border hover:border-fd-ring"
              >
                <div className="p-8">
                  <h2 className="text-2xl font-lora font-bold mb-4 text-fd-foreground group-hover:text-fd-primary transition-colors duration-200">
                    {post.data.title}
                  </h2>
                  <p className="text-fd-muted-foreground leading-relaxed text-base">
                    {post.data.description}
                  </p>
                  <div className="mt-6">
                    <span className="inline-flex items-center text-fd-primary font-medium group-hover:text-fd-foreground transition-colors duration-200">
                      Read more
                      <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <Pagination>
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious href={`?page=${currentPage - 1}`} />
                    </PaginationItem>
                  )}

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink href={`?page=${page}`} isActive={page === currentPage}>
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}

                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext href={`?page=${currentPage + 1}`} />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return {
    title: "Blog Posts - Nontas Bak",
    description: "Blog posts from Nontas Bakoulas",
  };
}
