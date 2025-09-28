import { notFound } from "next/navigation";
import Link from "next/link";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { blog } from "@/lib/source";
import { TOCProvider, TOCScrollArea } from "@/components/ui/toc";
import ClerkTOCItems from "@/components/ui/toc-clerk";
import { CollapsibleTOC } from "@/components/ui/collapsible-toc";
import type { Metadata } from "next";

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);

  if (!page) notFound();
  const Mdx = page.data.body;

  return (
    <>
      <div className="container rounded-xl border py-12 md:px-8">
        <h1 className="mb-2 text-3xl font-bold">{page.data.title}</h1>
        <p className="mb-4 text-fd-muted-foreground">{page.data.description}</p>
        <Link href="/blog">Back</Link>
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
          <div className="flex flex-col gap-4 text-sm mt-8">
            <div>
              <p className="mb-1 text-fd-muted-foreground">Written by</p>
              <p className="font-medium">{page.data.author}</p>
            </div>
            <div>
              <p className="mb-1 text-sm text-fd-muted-foreground">At</p>
              <p className="font-medium">{new Date(page.data.date).toDateString()}</p>
            </div>
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
