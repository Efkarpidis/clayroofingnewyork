export type ProjectPhoto = {
  id: string
  src: string
  alt: string
  // Future-proof fields for when project info is finalized
  projectName?: string
  neighborhood?: string
  tileType?: string
  tileColor?: string
  year?: string
  category?: string
}

// Clean gallery data - images only, ready for future project details
export const galleryPhotos: ProjectPhoto[] = [
  {
    id: "project-01",
    src: "/gallery/project-01.jpg",
    alt: "Modern two-story home with clay tile roof installation",
  },
  {
    id: "project-02",
    src: "/gallery/project-02.jpg",
    alt: "Mediterranean-style mansion with red clay tile roof",
  },
  {
    id: "project-03",
    src: "/gallery/project-03.jpg",
    alt: "Large brick home with brown clay tile roof",
  },
  {
    id: "project-04",
    src: "/gallery/project-04.jpg",
    alt: "Luxury home with dark clay tile roof installation",
  },
  {
    id: "project-05",
    src: "/gallery/project-05.jpg",
    alt: "Mediterranean-style home with stone exterior and brown clay tile roof",
  },
  {
    id: "project-06",
    src: "/gallery/project-06.jpg",
    alt: "Contemporary home with modern design and gray clay tile roof",
  },
  {
    id: "project-07",
    src: "/gallery/project-07.jpg",
    alt: "Elegant brick home with ornate ironwork and dark slate clay tile roof",
  },
  {
    id: "project-08",
    src: "/gallery/project-08.jpg",
    alt: "Two-story brick home with complex roofline and charcoal clay tiles",
  },
  {
    id: "project-09",
    src: "/gallery/project-09.jpg",
    alt: "Aerial view of brick home with classic reddish-brown S-tile clay roof",
  },
  {
    id: "project-10",
    src: "/gallery/project-10.jpg",
    alt: "Luxury three-story home with classical architecture and reddish-brown clay tile roof",
  },
  {
    id: "project-11",
    src: "/gallery/project-11.jpg",
    alt: "Stone mansion with brown clay tile roof and landscaped grounds",
  },
  {
    id: "project-12",
    src: "/gallery/project-12.jpg",
    alt: "Mediterranean-style home with natural stone exterior and terracotta clay tiles",
  },
  {
    id: "project-13",
    src: "/gallery/project-13.jpg",
    alt: "Luxury home with distinctive dark clay tile roofing and curved architectural elements",
  },
  {
    id: "project-14",
    src: "/gallery/project-14.jpg",
    alt: "Large brick home with reddish-brown clay tile roof and multiple dormers",
  },
  {
    id: "project-15",
    src: "/gallery/project-15.jpg",
    alt: "Elegant brick home with classic terracotta S-tile clay roof and decorative fountain",
  },
  {
    id: "project-16",
    src: "/gallery/project-16.jpg",
    alt: "Contemporary home with sophisticated gray slate clay tile roofing and modern architecture",
  },
  {
    id: "project-17",
    src: "/gallery/project-17.jpg",
    alt: "Two-story brick home with warm reddish-brown clay tile roof and arched windows",
  },
  {
    id: "project-18",
    src: "/gallery/project-18.jpg",
    alt: "Elegant stone mansion with rich brown clay tile roofing and classical details",
  },
  {
    id: "project-19",
    src: "/gallery/project-19.jpg",
    alt: "Luxury home with light stone exterior and dark charcoal slate clay tile roofing",
  },
  {
    id: "project-20",
    src: "/gallery/project-20.jpg",
    alt: "Large brick home under construction with warm brown clay tile roof installation",
  },
  {
    id: "project-21",
    src: "/gallery/project-21.jpg",
    alt: "Large brick home under construction with sophisticated gray charcoal clay tile roofing",
  },
  {
    id: "project-22",
    src: "/gallery/project-22.jpg",
    alt: "Elegant brick home construction featuring modern gray clay tiles and decorative brickwork",
  },
  {
    id: "project-23",
    src: "/gallery/project-23.jpg",
    alt: "Large two-story home with light brick exterior and warm brown S-shaped clay tile roof",
  },
  {
    id: "project-24",
    src: "/gallery/project-24.jpg",
    alt: "Elegant brick mansion with classical columns and brown cognac clay tile roofing",
  },
  {
    id: "project-25",
    src: "/gallery/project-25.jpg",
    alt: "Complex rooftop installation featuring natural gray flat tiles with decorative stone chimneys",
  },
  {
    id: "project-26",
    src: "/gallery/project-26.jpg",
    alt: "Aerial view of luxury home with extensive warm brown S-shaped clay tile roofing and multiple dormers",
  },
  {
    id: "project-27",
    src: "/gallery/project-27.jpg",
    alt: "Mediterranean-style luxury mansion with natural stone exterior and rich burgundy S-shaped clay tile roofing",
  },
  {
    id: "project-28",
    src: "/gallery/project-28.jpg",
    alt: "Contemporary luxury home with sophisticated dark charcoal S-shaped clay tile roofing and curved architectural elements",
  },
  {
    id: "project-29",
    src: "/gallery/project-29.jpg",
    alt: "Mediterranean-style home with vibrant golden yellow exterior and classic reddish-brown terracotta S-shaped clay tile roofing",
  },
  // Existing gallery images
  {
    id: "terracotta-s-tile",
    src: "/gallery/terracotta-s-tile.jpg",
    alt: "Close-up of classic terracotta Spanish S-tiles",
  },
  {
    id: "slate-shake-main",
    src: "/gallery/slate-shake-main.jpg",
    alt: "Custom home with weathered gray slate shake tile roof",
  },
  {
    id: "slate-shake-construction",
    src: "/gallery/slate-shake-construction.jpg",
    alt: "Front view of custom home with slate shake roof under construction",
  },
  {
    id: "slate-shake-dome",
    src: "/gallery/slate-shake-dome.jpg",
    alt: "Detailed view of custom dome roof with diamond-patterned slate tiles",
  },
  {
    id: "maroon-mission-construction-1",
    src: "/gallery/maroon-mission-construction-1.jpg",
    alt: "Aerial view of new construction with deep maroon mission barrel tile roof",
  },
  {
    id: "maroon-mission-construction-2",
    src: "/gallery/maroon-mission-construction-2.jpg",
    alt: "Top-down aerial view of maroon mission tile roof under construction",
  },
  {
    id: "flat-walnut-roof",
    src: "/gallery/flat-walnut-roof.jpg",
    alt: "Large home with complex roofline featuring walnut brown flat profile tiles",
  },
  {
    id: "vintage-red-villa",
    src: "/gallery/vintage-red-villa.jpg",
    alt: "Luxury villa with vintage red mission barrel tile roof",
  },
]

// Future-proof categories for filtering (when project info is available)
export const projectCategories = [
  "All Projects",
  "Residential",
  "Commercial",
  "New Construction",
  "Roof Replacement",
  "Spanish S-Tiles",
  "Flat Tiles",
  "Mission Tiles",
] as const

export type ProjectCategory = (typeof projectCategories)[number]
