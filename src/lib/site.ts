export const site = {
  name: "Pooja Packers & Movers",
  altName: "Pooja Package Transporter",
  phoneDisplay: "+91 98711 65432",
  phoneHref: "tel:+919871165432",
  whatsappHref: "https://wa.me/919871165432",
  email: "hello@poojapackersmovers.in",
  addressLines: ["Pooja Packers & Movers", "Delhi Cantt, New Delhi", "Delhi 110010, India"],
  hours: "Mon – Sun · 8:00 AM – 9:00 PM",
  yearsLabel: "8+ Years of Trust",
} as const;

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
] as const;

export const services = [
  {
    slug: "home-shifting",
    title: "Home Shifting",
    summary:
      "Complete household relocation — packed room by room, moved with the same care we would give our own homes.",
    details: [
      "Room-by-room packing & labelling",
      "Furniture dismantling and reassembly",
      "Appliance and electronics protection",
      "Unpacking and placement at your new home",
    ],
  },
  {
    slug: "office-relocation",
    title: "Office Relocation",
    summary:
      "Planned around your working hours so files, workstations and IT come back online without lost days.",
    details: [
      "After-hours and weekend moves",
      "Workstation and IT equipment handling",
      "Document and archive inventory",
      "Floor-plan based unloading",
    ],
  },
  {
    slug: "vehicle-transport",
    title: "Vehicle Transport",
    summary:
      "Cars and two-wheelers moved on enclosed and open carriers, strapped and monitored end to end.",
    details: [
      "Car and bike carrier options",
      "Wheel-lock and strap securing",
      "Pre-loading condition record",
      "Door-to-door delivery",
    ],
  },
  {
    slug: "commercial-logistics",
    title: "Commercial Logistics",
    summary:
      "Palletised goods, retail stock and project cargo moved from Delhi to destinations across India.",
    details: [
      "Part and full truck loads",
      "Warehouse handling support",
      "Stock-safe stacking and wrapping",
      "Scheduled dispatch planning",
    ],
  },
] as const;

export const processSteps = [
  {
    no: "01",
    title: "Survey & Quote",
    copy: "We understand what is moving, how far and what needs special attention — then share a clear, free quote.",
  },
  {
    no: "02",
    title: "Careful Packing",
    copy: "Quality materials, correct techniques and honest labelling so every carton is known before it moves.",
  },
  {
    no: "03",
    title: "Safe Transport",
    copy: "Loaded by trained hands, secured with straps and padding, and driven with your timeline in mind.",
  },
  {
    no: "04",
    title: "Delivery & Setup",
    copy: "Unloaded where you want it, furniture reassembled, packing material cleared away.",
  },
] as const;

export const testimonials = [
  {
    quote:
      "They packed our three-bedroom flat in Dwarka in a single day. Nothing was scratched, and every box was labelled by room.",
    name: "Ritu Sharma",
    detail: "Home shifting · Dwarka to Gurugram",
  },
  {
    quote:
      "Our office move happened over a weekend. Monday morning the team was working as if nothing had changed.",
    name: "Anand Mehta",
    detail: "Office relocation · Okhla to Noida",
  },
  {
    quote:
      "My car reached Bangalore exactly when they said it would, in the same condition it left Delhi in.",
    name: "Faizan Qureshi",
    detail: "Vehicle transport · Delhi to Bangalore",
  },
] as const;

export const routeCities = [
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
] as const;
