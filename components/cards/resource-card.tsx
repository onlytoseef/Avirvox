import { FiArrowRight } from "react-icons/fi";
import { resourceCards } from "@/lib/content/about-page";

type Resource = (typeof resourceCards)[number];

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <article
      className="flex min-h-[325px] w-[min(380px,82vw)] shrink-0 snap-start flex-col rounded-[30px] border border-[#58475d] bg-[#090511] p-8 sm:w-[380px]"
    >
      <h3 className="text-[clamp(1.5rem,2vw,2rem)] leading-[1.1] font-semibold text-white">
        {resource.title}
      </h3>
      <p className="mt-4 max-w-[300px] text-sm leading-[1.45] text-[#ddd1e0]">
        {resource.description}
      </p>
      <a
        href={resource.href}
        className="mt-auto inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-[#726078] px-5 text-sm font-medium text-white transition-colors hover:border-[#e64ca8]"
      >
        {resource.action}
        <FiArrowRight className="text-[#df4ba6]" aria-hidden="true" />
      </a>
    </article>
  );
}
