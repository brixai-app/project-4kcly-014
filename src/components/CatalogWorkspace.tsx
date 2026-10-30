import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown, Filter, Search, Sliders, X } from 'lucide-react';
import { cn } from "@/lib/utils";
import mockData from "@/data/mockData";
import type { Instrument, InstrumentCategory } from "@/types";

type Props = {
  className?: string;
  onSelectInstrument?: (instrument: Instrument) => void;
};

const categories = ["All", ...(mockData?.categories ?? [])] as const;

function InstrumentCard({
  instrument,
  onSelect,
}: {
  instrument: Instrument;
  onSelect?: (instrument: Instrument) => void;
}) {
  const price = `₹${(instrument?.price ?? 0).toLocaleString("en-IN")}`;
  return (
    <motion.button
      type="button"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onSelect?.(instrument)}
      className="group relative flex w-full flex-col overflow-hidden border border-[#CAD5D7] bg-white text-left shadow-[0_18px_40px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_24px_60px_rgba(0,0,0,0.1)]"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F7F8F6]">
        <img
          src={instrument?.image ?? ""}
          alt={instrument?.name ?? "Instrument"}
          crossOrigin="anonymous"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="min-w-0">
          <p className="truncate text-[10px] font-semibold uppercase tracking-[0.28em] text-[#526166]">
            {instrument?.category ?? ""}
          </p>
          <h3 className="mt-1 min-w-0 truncate text-base font-semibold text-black">
            {instrument?.name ?? ""}
          </h3>
        </div>
        <p className="line-clamp-3 text-sm leading-6 text-[#526166]">
          {instrument?.shortDescription ?? instrument?.description ?? ""}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-black">{price}</span>
          <span className="translate-y-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E63946] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            View details
          </span>
        </div>
      </div>
    </motion.button>
  );
}

export function CatalogWorkspace({ className = "", onSelectInstrument }: Props) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"All" | InstrumentCategory>("All");
  const [sortKey, setSortKey] = useState<"featured" | "price-asc" | "price-desc">("featured");

  useEffect(() => {
    const id = window.setTimeout(() => setDebouncedQuery(query.trim().toLowerCase()), 250);
    return () => window.clearTimeout(id);
  }, [query]);

  const filtered = useMemo(() => {
    const items = (mockData?.instruments ?? []).filter((instrument) => {
      const matchesCategory = activeCategory === "All" || instrument?.category === activeCategory;
      const haystack = `${instrument?.name ?? ""} ${instrument?.description ?? ""} ${instrument?.shortDescription ?? ""}`.toLowerCase();
      const matchesQuery = debouncedQuery.length < 2 || haystack.includes(debouncedQuery);
      return matchesCategory && matchesQuery;
    });

    const sorted = [...items].sort((a, b) => {
      if (sortKey === "price-asc") return (a?.price ?? 0) - (b?.price ?? 0);
      if (sortKey === "price-desc") return (b?.price ?? 0) - (a?.price ?? 0);
      return 0;
    });

    return sorted;
  }, [activeCategory, debouncedQuery, sortKey]);

  const featured = filtered?.slice(0, 1)?.[0];
  const rest = filtered?.slice(1) ?? [];

  return (
    <section className={cn("w-full bg-white", className)}>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-[280px_minmax(0,1fr)] md:px-6 lg:px-8">
        <aside className="flex min-w-0 flex-col gap-4 border border-[#CAD5D7] bg-[#F7F8F6] p-4">
          <div className="flex items-center gap-2">
            <Sliders className="h-4 w-4 text-[#E63946]" />
            <h2 className="min-w-0 truncate text-xs font-semibold uppercase tracking-[0.28em] text-black">
              Catalog filters
            </h2>
          </div>

          <label className="flex min-w-0 items-center gap-2 border border-[#CAD5D7] bg-white px-3 py-2">
            <Search className="h-4 w-4 shrink-0 text-[#526166]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search instruments"
              className="min-w-0 w-full bg-transparent text-sm text-black outline-none placeholder:text-[#526166]"
            />
          </label>

          <div className="flex flex-col gap-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#526166]">Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "min-w-0 border px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] transition-colors",
                    activeCategory === category
                      ? "border-[#E63946] bg-[#E63946] text-black"
                      : "border-[#CAD5D7] bg-white text-black hover:border-black"
                  )}
                >
                  <span className="block truncate">{category}</span>
                </button>
              ))}
            </div>
          </div>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                type="button"
                className="flex w-full items-center justify-between border border-[#CAD5D7] bg-white px-3 py-2 text-left text-xs font-semibold uppercase tracking-[0.24em] text-black"
              >
                <span className="min-w-0 truncate">Sort: {sortKey.replace("-", " ")}</span>
                <ChevronDown className="h-4 w-4 shrink-0" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="start"
                sideOffset={8}
                className="z-50 min-w-[220px] border border-[#CAD5D7] bg-white p-1 shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
              >
                {[
                  ["featured", "Featured"],
                  ["price-asc", "Price: Low to High"],
                  ["price-desc", "Price: High to Low"],
                ].map(([key, label]) => (
                  <DropdownMenu.Item
                    key={key}
                    onSelect={() => setSortKey(key as typeof sortKey)}
                    className="cursor-pointer px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-black outline-none hover:bg-[#F7F8F6]"
                  >
                    {label}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveCategory("All");
              setSortKey("featured");
            }}
            className="flex items-center justify-center gap-2 border border-[#CAD5D7] bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-black transition-colors hover:border-black"
          >
            <X className="h-4 w-4" />
            Reset
          </button>
        </aside>

        <div className="min-w-0">
          <div className="mb-5 flex items-end justify-between gap-4 border-b border-[#CAD5D7] pb-4">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#526166]">Curated selection</p>
              <h2 className="min-w-0 truncate text-2xl font-semibold text-black">Asymmetric masonry field</h2>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#526166]">
              <Filter className="h-4 w-4 text-[#E63946]" />
              {filtered.length} instruments
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="flex min-h-[360px] items-center justify-center border border-dashed border-[#CAD5D7] bg-[#F7F8F6] p-8 text-center">
              <div className="max-w-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#526166]">No results found</p>
                <p className="mt-3 text-sm leading-6 text-[#526166]">
                  Try a broader search or switch categories to reveal more instruments.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {featured ? (
                <div className="md:col-span-2 xl:col-span-2">
                  <InstrumentCard instrument={featured} onSelect={onSelectInstrument} />
                </div>
              ) : null}
              {rest.map((instrument, index) => (
                <div key={instrument?.id ?? index} className={index % 3 === 0 ? "xl:col-span-1" : ""}>
                  <InstrumentCard instrument={instrument} onSelect={onSelectInstrument} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default CatalogWorkspace;