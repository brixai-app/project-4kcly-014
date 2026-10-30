import { createClient } from "@libsql/client";
import type { Instrument } from "../src/types";

const db = createClient({
  url: (globalThis as { __LIBSQL_URL__?: string }).__LIBSQL_URL__ ?? "",
  authToken: (globalThis as { __LIBSQL_TOKEN__?: string }).__LIBSQL_TOKEN__ ?? "",
});

export const instruments: Instrument[] = [
  {
    id: "ukulele-001",
    name: "Kala Concert Mahogany Ukulele",
    category: "Strings",
    price: 14500,
    description:
      "A warm, responsive concert ukulele with satin mahogany body, rosewood fingerboard, and clear nylon-string projection suited to intimate melodies and rhythmic accompaniment.",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Warm concert ukulele with satin mahogany body and clear projection.",
    detailedDescription:
      "Built for lyrical phrasing and rhythmic clarity, this concert ukulele balances a compact feel with a resonant voice. The satin mahogany body adds warmth, while the rosewood fingerboard supports smooth left-hand movement across melodic passages.",
    specificationsJson: JSON.stringify([
      { label: "Body", value: "Mahogany" },
      { label: "Fingerboard", value: "Rosewood" },
      { label: "Strings", value: "Nylon" },
      { label: "Scale", value: "Concert" },
    ]),
    relatedIdsJson: JSON.stringify(["sitar-006", "guitar-002", "harmonium-008"]),
  },
  {
    id: "guitar-002",
    name: "Fender Player Stratocaster",
    category: "Strings",
    price: 78500,
    description:
      "A versatile solid-body electric guitar with articulate single-coil clarity, comfortable modern-C neck, and expressive tremolo response for blues, rock, funk, and contemporary fusion.",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Versatile solid-body electric with articulate single-coil clarity.",
    detailedDescription:
      "This Stratocaster-style instrument is tuned for expressive performance and broad tonal range. Its modern-C neck profile and responsive tremolo system make it equally at home in clean rhythm work, lead phrasing, and dynamic ensemble settings.",
    specificationsJson: JSON.stringify([
      { label: "Body", value: "Alder" },
      { label: "Neck", value: "Modern C" },
      { label: "Pickups", value: "Single-Coil" },
      { label: "Bridge", value: "Tremolo" },
    ]),
    relatedIdsJson: JSON.stringify(["ukulele-001", "saxophone-007", "flute-004"]),
  },
  {
    id: "drum-003",
    name: "Yamaha Recording Custom Snare",
    category: "Percussion",
    price: 42900,
    description:
      "A focused birch-shell snare delivering crisp articulation, controlled overtones, and studio-ready sensitivity from delicate ghost notes to commanding backbeats.",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Focused birch-shell snare with crisp articulation and control.",
    detailedDescription:
      "Designed for precision and recording clarity, this snare responds with a tight attack and refined sustain. The birch shell emphasizes definition, making it a reliable choice for studio sessions and live performance alike.",
    specificationsJson: JSON.stringify([
      { label: "Shell", value: "Birch" },
      { label: "Diameter", value: "14 in" },
      { label: "Depth", value: "5.5 in" },
      { label: "Use", value: "Studio / Live" },
    ]),
    relatedIdsJson: JSON.stringify(["tabla-005", "sitar-006", "guitar-002"]),
  },
  {
    id: "flute-004",
    name: "Pearl Quantz 665 Flute",
    category: "Wind",
    price: 112000,
    description:
      "A refined silver-headjoint concert flute with fluid keywork, balanced resistance, and a luminous tone that remains centered throughout its full register.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85",
    shortDescription: "Refined concert flute with luminous tone and fluid keywork.",
    detailedDescription:
      "The Quantz 665 offers a polished playing experience with a centered tonal core and responsive mechanism. Its silver headjoint supports nuanced articulation and a singing upper register, ideal for orchestral and solo repertoire.",
    specificationsJson: JSON.stringify([
      { label: "Headjoint", value: "Silver" },
      { label: "Keywork", value: "Offset G" },
      { label: "Mechanism", value: "Closed Hole" },
      { label: "Range", value: "Concert" },
    ]),
    relatedIdsJson: JSON.stringify(["saxophone-007", "harmonium-008", "tabla-005"]),
  },
  {
    id: "tabla-005",
    name: "Banaras Hand-Tuned Tabla Set",
    category: "Percussion",
    price: 26500,
    description:
      "A hand-tuned sheesham dayan and copper bayan pairing with resonant bass modulation, articulate bols, and carefully finished syahi for classical and devotional performance.",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=85",
    shortDescription: "Hand-tuned tabla set with resonant bass and articulate bols.",
    detailedDescription:
      "Crafted for expressive rhythmic language, this tabla set combines a responsive dayan with a deep, modulating bayan. The carefully finished syahi supports tonal precision across intricate classical patterns and devotional accompaniment.",
    specificationsJson: JSON.stringify([
      { label: "Dayan", value: "Sheesham" },
      { label: "Bayan", value: "Copper" },
      { label: "Tuning", value: "Hand-Tuned" },
      { label: "Use", value: "Classical / Devotional" },
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
    shortDescription: "Concert sitar with sympathetic strings and shimmering sustain.",
    detailedDescription:
      "This concert sitar is voiced for expansive melodic development and rich resonance. The sympathetic string array and shaped jawari create a layered harmonic field that supports both contemplative alap and rhythmic gat passages.",
    specificationsJson: JSON.stringify([
      { label: "Body", value: "Tun Wood" },
      { label: "Strings", value: "Sympathetic" },
      { label: "Jawari", value: "Hand-Shaped" },
      { label: "Scale", value: "Concert" },
    ]),
    relatedIdsJson: JSON.stringify(["ukulele-001", "tabla-005", "harmonium-008"]),
  },
  {
    id: "saxophone-007",
    name: "Yamaha YAS-280 Alto Saxophone",
    category: "Wind",
    price: 118500,
    description:
      "A responsive alto saxophone with stable intonation, ergonomic keywork, and a centered golden tone designed to support advancing players across jazz and ensemble repertoire.",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Responsive alto saxophone with centered tone and ergonomic keywork.",
    detailedDescription:
      "The YAS-280 is built to encourage confident development with stable intonation and a comfortable key layout. Its centered tone and reliable response make it a strong companion for jazz studies, concert band, and ensemble work.",
    specificationsJson: JSON.stringify([
      { label: "Type", value: "Alto Saxophone" },
      { label: "Finish", value: "Gold Lacquer" },
      { label: "Keywork", value: "Ergonomic" },
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
    shortDescription: "Portable scale-changer harmonium with rich sustaining voice.",
    detailedDescription:
      "This scale-changer harmonium is designed for flexibility and expressive support across multiple performance contexts. Its responsive reeds and smooth bellows action provide a stable, sustaining foundation for practice and live accompaniment.",
    specificationsJson: JSON.stringify([
      { label: "Scales", value: "9" },
      { label: "Reeds", value: "Responsive" },
      { label: "Bellows", value: "Smooth Action" },
      { label: "Use", value: "Practice / Performance" },
    ]),
    relatedIdsJson: JSON.stringify(["tabla-005", "sitar-006", "flute-004"]),
  },
];

export async function getInstruments(): Promise<Instrument[]> {
  return instruments;
}

export async function getInstrumentById(id: string): Promise<Instrument | undefined> {
  return instruments.find((instrument) => instrument.id === id);
}

export default db;