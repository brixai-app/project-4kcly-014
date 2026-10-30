import type { Instrument, InstrumentCategory, TeamMember, TimelineMilestone } from "@/types";

export const categories: InstrumentCategory[] = ["Strings", "Percussion", "Wind", "Keyboard"];

export const instruments: Instrument[] = [
  {
    id: "ukulele-001",
    name: "Kala Concert Mahogany Ukulele",
    category: "Strings",
    price: 14500,
    description:
      "A warm, responsive concert ukulele with satin mahogany body, rosewood fingerboard, and clear nylon-string projection suited to intimate melodies and rhythmic accompaniment.",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Warm concert voice with satin mahogany resonance.",
    detailedDescription:
      "The Kala Concert Mahogany Ukulele balances articulate attack with a rounded, intimate sustain. Its compact concert body feels immediate in the hands, while the rosewood fingerboard and satin finish keep the instrument elegant, tactile, and performance-ready.",
    specificationsJson: JSON.stringify([
      { label: "Body", value: "Mahogany" },
      { label: "Fingerboard", value: "Rosewood" },
      { label: "Scale", value: "Concert" },
      { label: "Strings", value: "Nylon" },
    ]),
    relatedIdsJson: JSON.stringify(["sitar-006", "harmonium-008", "tabla-005"]),
  },
  {
    id: "guitar-002",
    name: "Fender Player Stratocaster",
    category: "Strings",
    price: 78500,
    description:
      "A versatile solid-body electric guitar with articulate single-coil clarity, comfortable modern-C neck, and expressive tremolo response for blues, rock, funk, and contemporary fusion.",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Classic single-coil snap with modern playability.",
    detailedDescription:
      "The Fender Player Stratocaster delivers the familiar shimmer and dynamic response that made the silhouette iconic. Its modern-C neck profile, balanced body contouring, and expressive tremolo system support fluid phrasing across studio and stage settings.",
    specificationsJson: JSON.stringify([
      { label: "Body", value: "Alder" },
      { label: "Neck", value: "Modern C" },
      { label: "Pickups", value: "Single-Coil" },
      { label: "Bridge", value: "2-Point Tremolo" },
    ]),
    relatedIdsJson: JSON.stringify(["ukulele-001", "saxophone-007", "sitar-006"]),
  },
  {
    id: "drum-003",
    name: "Yamaha Recording Custom Snare",
    category: "Percussion",
    price: 42900,
    description:
      "A focused birch-shell snare delivering crisp articulation, controlled overtones, and studio-ready sensitivity from delicate ghost notes to commanding backbeats.",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Birch-shell precision for studio articulation.",
    detailedDescription:
      "Engineered for clarity and control, the Yamaha Recording Custom Snare responds with a tight, refined crack and a disciplined overtone profile. It is equally at home in detailed recording environments and high-energy live arrangements.",
    specificationsJson: JSON.stringify([
      { label: "Shell", value: "Birch" },
      { label: "Depth", value: "Studio Standard" },
      { label: "Tone", value: "Focused" },
      { label: "Use", value: "Recording / Live" },
    ]),
    relatedIdsJson: JSON.stringify(["tabla-005", "flute-004", "guitar-002"]),
  },
  {
    id: "flute-004",
    name: "Pearl Quantz 665 Flute",
    category: "Wind",
    price: 112000,
    description:
      "A refined silver-headjoint concert flute with fluid keywork, balanced resistance, and a luminous tone that remains centered throughout its full register.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85",
    shortDescription: "Luminous concert tone with fluid keywork.",
    detailedDescription:
      "The Pearl Quantz 665 Flute offers a polished response and a centered tonal core that supports expressive phrasing. Its balanced resistance and ergonomic mechanism make it a compelling choice for advancing players and ensemble performers.",
    specificationsJson: JSON.stringify([
      { label: "Headjoint", value: "Silver" },
      { label: "Mechanism", value: "Offset G" },
      { label: "Tone", value: "Luminous" },
      { label: "Range", value: "Concert" },
    ]),
    relatedIdsJson: JSON.stringify(["saxophone-007", "harmonium-008", "drum-003"]),
  },
  {
    id: "tabla-005",
    name: "Banaras Hand-Tuned Tabla Set",
    category: "Percussion",
    price: 26500,
    description:
      "A hand-tuned sheesham dayan and copper bayan pairing with resonant bass modulation, articulate bols, and carefully finished syahi for classical and devotional performance.",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=85",
    shortDescription: "Hand-tuned resonance for classical phrasing.",
    detailedDescription:
      "This Banaras tabla set pairs a responsive dayan with a richly voiced bayan, producing nuanced tonal shading and a powerful bass bloom. The carefully finished syahi supports clarity, sustain, and expressive rhythmic dialogue.",
    specificationsJson: JSON.stringify([
      { label: "Dayan", value: "Sheesham" },
      { label: "Bayan", value: "Copper" },
      { label: "Tuning", value: "Hand-Tuned" },
      { label: "Style", value: "Classical" },
    ]),
    relatedIdsJson: JSON.stringify(["drum-003", "harmonium-008", "sitar-006"]),
  },
  {
    id: "sitar-006",
    name: "Ravi Shankar Style Concert Sitar",
    category: "Strings",
    price: 68000,
    description:
      "A full-scale concert sitar with seasoned tun wood, sympathetic strings, and a carefully shaped jawari that produces a deep, singing sustain and shimmering harmonic field.",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=85",
    shortDescription: "Deep sustain and shimmering sympathetic resonance.",
    detailedDescription:
      "The Ravi Shankar Style Concert Sitar is voiced for expansive melodic exploration. Its sympathetic string array and shaped jawari create a luminous harmonic halo, while the seasoned body supports a rich, sustained response.",
    specificationsJson: JSON.stringify([
      { label: "Body", value: "Tun Wood" },
      { label: "Strings", value: "Sympathetic + Main" },
      { label: "Bridge", value: "Jawari" },
      { label: "Scale", value: "Concert" },
    ]),
    relatedIdsJson: JSON.stringify(["ukulele-001", "harmonium-008", "tabla-005"]),
  },
  {
    id: "saxophone-007",
    name: "Yamaha YAS-280 Alto Saxophone",
    category: "Wind",
    price: 118500,
    description:
      "A responsive alto saxophone with stable intonation, ergonomic keywork, and a centered golden tone designed to support advancing players across jazz and ensemble repertoire.",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Centered tone and ergonomic response.",
    detailedDescription:
      "The Yamaha YAS-280 Alto Saxophone is built for confidence and consistency. Its stable intonation, comfortable key layout, and warm, centered voice make it a dependable instrument for developing technique and expressive ensemble work.",
    specificationsJson: JSON.stringify([
      { label: "Key", value: "Eb Alto" },
      { label: "Finish", value: "Lacquer" },
      { label: "Intonation", value: "Stable" },
      { label: "Use", value: "Jazz / Ensemble" },
    ]),
    relatedIdsJson: JSON.stringify(["flute-004", "guitar-002", "harmonium-008"]),
  },
  {
    id: "harmonium-008",
    name: "Paloma Scale-Changer Harmonium",
    category: "Keyboard",
    price: 54500,
    description:
      "A portable nine-scale harmonium with responsive reeds, smooth bellows, and a rich sustaining voice for Hindustani practice, ghazal, kirtan, and ensemble accompaniment.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Portable reed voice with scale-changing flexibility.",
    detailedDescription:
      "The Paloma Scale-Changer Harmonium offers a richly sustaining reed tone and practical scale-changing capability for versatile performance contexts. Its smooth bellows action and compact portability make it a dependable companion for practice and stage use.",
    specificationsJson: JSON.stringify([
      { label: "Reeds", value: "Responsive" },
      { label: "Scales", value: "Nine" },
      { label: "Bellows", value: "Smooth Action" },
      { label: "Use", value: "Practice / Performance" },
    ]),
    relatedIdsJson: JSON.stringify(["tabla-005", "sitar-006", "flute-004"]),
  },
];

export const team: TeamMember[] = [
  {
    name: "Aarav Mehta",
    role: "Curator",
    bio: "Shapes the editorial voice of SurSangeet with a focus on instrument heritage, tonal character, and contemporary presentation.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85",
  },
  {
    name: "Ira Nair",
    role: "Visual Director",
    bio: "Builds the magazine-like visual rhythm across layouts, motion, and image sequencing for a vivid browsing experience.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85",
  },
  {
    name: "Kabir Sethi",
    role: "Instrument Specialist",
    bio: "Translates technical specifications into clear, musician-friendly guidance for players exploring new sounds.",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
  },
];

export const timeline: TimelineMilestone[] = [
  { year: "2019", title: "First Listening Room", description: "A small editorial archive of instruments and tonal notes begins." },
  { year: "2021", title: "Expanded Curation", description: "The collection grows across strings, percussion, wind, and keyboard voices." },
  { year: "2023", title: "Motion-Led Rebuild", description: "The experience evolves into a cinematic, responsive showcase with richer storytelling." },
  { year: "2025", title: "SurSangeet", description: "A refined musical instrument showcase centered on imagery, craft, and discovery." },
];

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Catalog", href: "/catalog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const mockData = { categories, instruments, team, timeline, navigation };

export default mockData;
export const sizeGuide: any = [
  { size: 'XS', chest: '34-36', waist: '28-30' },
  { size: 'S', chest: '36-38', waist: '30-32' },
  { size: 'M', chest: '38-40', waist: '32-34' },
  { size: 'L', chest: '40-42', waist: '34-36' },
  { size: 'XL', chest: '42-44', waist: '36-38' },
];

export const editorialContent: any = {
  title: 'Crafted with Purpose',
  subtitle: 'Modern Aesthetics & Timeless Form',
  description: 'Every collection is meticulously designed to merge functional utility with striking visual hierarchy.',
  sections: [],
};
