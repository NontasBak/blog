import { notFound } from "next/navigation";
import Link from "next/link";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { blog } from "@/lib/source";
import { TOCProvider, TOCScrollArea } from "@/components/ui/toc";
import ClerkTOCItems from "@/components/ui/toc-clerk";
import { CollapsibleTOC } from "@/components/ui/collapsible-toc";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);

  if (!page) notFound();
  const Mdx = page.data.body;

  return (
    <>
      <div className="container border-2 border-fd-primary rounded-xl text-fd-accent-foreground py-16 md:px-12 mt-8">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">{page.data.title}</h1>
          <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-6 text-lg text-fd-secondary-foreground/80">
            <div className="flex items-center gap-2">
              <span className="text-sm uppercase tracking-wide font-medium">By</span>
              <span className="font-semibold text-fd-secondary-foreground">{page.data.author}</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-primary-foreground/60"></div>
            <div className="flex items-center gap-2">
              <span className="text-sm uppercase tracking-wide font-medium">Published</span>
              <time className="font-semibold text-primary-foreground">
                {new Date(page.data.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-primary-foreground/70 hover:text-primary-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
      {/*<CollapsibleTOC toc={page.data.toc} />*/}
      <div className="container flex px-4 py-8 gap-8">
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-16">
            <TOCProvider toc={page.data.toc}>
              <TOCScrollArea>
                <ClerkTOCItems />
              </TOCScrollArea>
            </TOCProvider>
          </div>
        </aside>
        <article className="flex flex-col min-w-0 flex-1">
          <div className="prose min-w-0">
            <Mdx components={defaultMdxComponents} />
          </div>
        </article>
      </div>
    </>
  );
}

export function generateStaticParams(): { slug: string }[] {
  return blog.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const page = blog.getPage([params.slug]);

  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
