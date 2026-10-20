import Link from "next/link";

export type DocumentBlock =
  | { type: "paragraph" | "heading" | "listItem"; text: string }
  | { type: "table"; rows: string[][] };

export type DocumentSection = {
  number: string;
  title: string;
  blocks: DocumentBlock[];
};

type DocumentPageProps = {
  title: string;
  subtitle: string;
  effectiveDate: string;
  version: string;
  pdfHref?: string;
  sections: DocumentSection[];
};

function DocumentBlocks({ blocks }: { blocks: DocumentBlock[] }) {
  return blocks.map((block, index) => {
    if (block.type === "heading") {
      return <h3 key={index} className="mt-8 text-lg font-semibold text-white">{block.text}</h3>;
    }
    if (block.type === "listItem") {
      if (index > 0 && blocks[index - 1].type === "listItem") return null;
      let end = index;
      while (blocks[end]?.type === "listItem") end++;
      return <ul key={index} className="ml-5 list-disc space-y-2 pl-1 marker:text-rose">{blocks.slice(index, end).map((item, itemIndex) => <li key={itemIndex}>{"text" in item ? item.text : ""}</li>)}</ul>;
    }
    if (block.type === "table") {
      return (
        <div key={index} className="my-7 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead className="bg-white/8 text-white">
              <tr>{block.rows[0].map((cell) => <th key={cell} scope="col" className="px-4 py-3 font-semibold">{cell}</th>)}</tr>
            </thead>
            <tbody>{block.rows.slice(1).map((row) => (
              <tr key={row[0]} className="border-t border-white/10">
                {row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-3">{cell}</td>)}
              </tr>
            ))}</tbody>
          </table>
        </div>
      );
    }
    return <p key={index}>{block.text}</p>;
  });
}

export function DocumentPage({ title, subtitle, effectiveDate, version, pdfHref, sections }: DocumentPageProps) {
  return (
    <main className="relative isolate min-h-screen overflow-x-clip pt-36 pb-10 sm:pt-44">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[540px] bg-[radial-gradient(ellipse_at_70%_0%,rgba(161,40,234,0.21),transparent_56%),radial-gradient(ellipse_at_15%_45%,rgba(238,74,159,0.12),transparent_48%)]" />
      <div className="mx-auto max-w-[1380px] px-5 sm:px-8">
        <div className="max-w-3xl">
          <Link href="/" className="text-sm font-medium text-rose transition-colors hover:text-white">← Back to Home</Link>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-rose">Documents & Legal</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-6xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#c9bccf] sm:text-lg">{subtitle}</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#b7a8bf]">
            <span>Effective {effectiveDate}</span><span aria-hidden="true" className="hidden size-1 rounded-full bg-rose sm:block" /><span>Version {version}</span>
          </div>
          {pdfHref && <a href={pdfHref} download className="mt-8 inline-flex min-h-11 items-center rounded-full border border-rose/60 px-6 text-sm font-semibold text-white transition-colors hover:bg-rose/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose">Download official PDF ↗</a>}
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[292px_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="On this page" className="lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-2xl border border-white/10 bg-[#110b1d] p-5">
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#b7a8bf]">On this page</h2>
              <ol className="document-section-index grid max-h-[calc(100dvh-12rem)] gap-1 overflow-y-auto pr-2 text-sm">
                {sections.map((section) => <li key={section.number}><a href={`#section-${section.number}`} className="block rounded-lg px-2 py-1.5 leading-snug text-[#c9bccf] transition-colors hover:bg-white/5 hover:text-white"><span className="mr-2 text-rose">{section.number.padStart(2, "0")}</span>{section.title}</a></li>)}
              </ol>
            </div>
          </nav>

          <article className="min-w-0 rounded-[28px] border border-white/10 bg-[#110b1d]/80 px-5 py-3 shadow-[0_24px_80px_rgba(0,0,0,0.16)] sm:px-9 lg:px-12">
            {sections.map((section) => (
              <section key={section.number} id={`section-${section.number}`} className="scroll-mt-8 border-b border-white/10 py-9 last:border-0 sm:py-11">
                <div className="mb-6 flex items-start gap-4">
                  <span className="mt-1 text-sm font-semibold text-rose">{section.number.padStart(2, "0")}</span>
                  <h2 className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-[30px]">{section.title}</h2>
                </div>
                <div className="space-y-4 text-[15px] leading-[1.85] text-[#d2c7d8] [overflow-wrap:anywhere]"><DocumentBlocks blocks={section.blocks} /></div>
              </section>
            ))}
          </article>
        </div>
      </div>
    </main>
  );
}
