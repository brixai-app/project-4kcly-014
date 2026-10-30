import { useEffect } from "react";
import AboutStory from "@/components/AboutStory";

export function AboutPage() {
  useEffect(() => {
    document.title = "About | SurSangeet";
  }, []);

  return (
    <main id="about" className="w-full">
      <AboutStory className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8" />
    </main>
  );
}

export default AboutPage;