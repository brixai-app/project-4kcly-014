import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import CatalogWorkspace from "@/components/CatalogWorkspace";

export function CatalogPage() {
  const location = useLocation();
  const category = useMemo(() => {
    const params = new URLSearchParams(location?.search ?? "");
    const value = params.get("category") ?? "";
    return value.trim();
  }, [location?.search]);

  return (
    <main className="bg-white">
      <section className="border-b border-[#CAD5D7] bg-[#F7F8F6]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#526166]">
            Catalog
          </p>
          <div className="flex flex-col gap-3">
            <h1 className="max-w-4xl font-[Outfit] text-4xl font-light uppercase tracking-tight text-black sm:text-5xl lg:text-6xl">
              Explore the SurSangeet instrument archive
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-[#526166] sm:text-base">
              Browse a curated selection of strings, percussion, wind, and keyboard instruments through an editorial workspace shaped for discovery.
            </p>
          </div>
        </div>
      </section>
      <CatalogWorkspace className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8" onSelectInstrument={undefined} />
      {category ? (
        <div className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#526166]">
            Active category: <span className="text-black">{category}</span>
          </p>
        </div>
      ) : null}
    </main>
  );
}

export default CatalogPage;