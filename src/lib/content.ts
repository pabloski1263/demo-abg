import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "content.json");

export interface SiteContent {
  site: { name: string; subtitle: string };
  hero: {
    title: string;
    subtitle: string;
    cta_primary: { text: string; link: string };
    cta_secondary: { text: string; link: string };
    background_image: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: ServiceItem[];
  };
  about: {
    title: string;
    description: string;
    mission: string;
    vision: string;
    image: string;
    values: { title: string; description: string }[];
  };
  stats: {
    items: { value: number; suffix: string; label: string }[];
  };
  team: {
    title: string;
    subtitle: string;
    members: TeamMember[];
  };
  testimonials: {
    title: string;
    items: { text: string; author: string; company: string }[];
  };
  contact: {
    title: string;
    subtitle: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
    map_lat: number;
    map_lng: number;
  };
  clients: {
    title: string;
    logos: { name: string; logo: string }[];
  };
  footer: {
    description: string;
    social: { linkedin: string; twitter: string };
  };
  admin: {
    email: string;
    password: string;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
}

export function getContent(): SiteContent {
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw) as SiteContent;
}

export function saveContent(data: SiteContent): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}
