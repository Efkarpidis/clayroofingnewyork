export type Photo = {
  src: string
  alt: string
  angle: string // e.g., "Full House", "Corner Detail", "Gable View"
}

export type TileProject = {
  id: string
  tileName: string
  tileColor: string
  photos: Photo[]
}

export const galleryData: TileProject[] = [
  {
    id: "classic-terracotta",
    tileName: "Spanish S-Tile",
    tileColor: "Classic Terracotta",
    photos: [
      {
        src: "/gallery/terracotta-s-tile.jpg",
        alt: "Close-up of classic terracotta Spanish S-tiles under a bright blue sky.",
        angle: "Tile Close-up",
      },
    ],
  },
  {
    id: "slate-shake-gray",
    tileName: "Slate Shake Tile",
    tileColor: "Weathered Gray",
    photos: [
      {
        src: "/gallery/slate-shake-main.jpg",
        alt: "Custom home with a weathered gray slate shake tile roof and stone chimneys.",
        angle: "Turret and Chimneys",
      },
      {
        src: "/gallery/slate-shake-construction.jpg",
        alt: "Front view of a large custom home with a slate shake roof under construction.",
        angle: "Front Elevation",
      },
      {
        src: "/gallery/slate-shake-dome.jpg",
        alt: "Detailed view of a custom dome roof with diamond-patterned slate tiles.",
        angle: "Dome Detail",
      },
    ],
  },
  {
    id: "mission-barrel-maroon",
    tileName: "Mission Barrel Tile",
    tileColor: "Deep Maroon",
    photos: [
      {
        src: "/gallery/maroon-mission-construction-1.jpg",
        alt: "Aerial view of a new construction with a deep maroon mission barrel tile roof.",
        angle: "Aerial View 1",
      },
      {
        src: "/gallery/maroon-mission-construction-2.jpg",
        alt: "Top-down aerial view of a maroon mission tile roof on a house under construction.",
        angle: "Aerial View 2",
      },
    ],
  },
  {
    id: "flat-profile-walnut",
    tileName: "Flat Profile Tile",
    tileColor: "Walnut Brown",
    photos: [
      {
        src: "/gallery/flat-walnut-roof.jpg",
        alt: "Large home with a complex roofline featuring walnut brown flat profile tiles.",
        angle: "Full Roof View",
      },
    ],
  },
  {
    id: "mission-barrel-vintage-red",
    tileName: "Mission Barrel Tile",
    tileColor: "Vintage Red",
    photos: [
      {
        src: "/gallery/vintage-red-villa.jpg",
        alt: "Luxury villa with a vintage red mission barrel tile roof and ornate ironwork.",
        angle: "Villa Exterior",
      },
    ],
  },
]

// Create a list of unique tile types for the filter menu
export const tileTypes = [...new Set(galleryData.map((p) => p.tileName))]
