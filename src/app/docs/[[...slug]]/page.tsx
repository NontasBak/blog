import { getPageImage, source } from "@/lib/source";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "@/components/layout/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import type { Metadata } from "next";
import { createRelativeLink } from "fumadocs-ui/mdx";
import Link from "next/link";
import defaultMdxComponents from "fumadocs-ui/mdx";

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <>
      <DocsPage toc={page.data.toc} full={page.data.full}>
        <div className="container rounded-xl border py-12 md:px-8">
          <h1 className="mb-2 text-3xl font-bold">{page.data.title}</h1>
          <p className="mb-4 text-fd-muted-foreground">{page.data.description}</p>
          <Link href="/blog">Back</Link>
        </div>{" "}
        <DocsTitle className="px-4">{page.data.title}</DocsTitle>
        <DocsDescription>{page.data.description}</DocsDescription>
        <DocsBody className="px-4">
          <MDX components={defaultMdxComponents} />
        </DocsBody>
      </DocsPage>
    </>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<"/docs/[[...slug]]">): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
