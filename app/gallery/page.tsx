"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { galleryData, tileTypes, type Photo } from "../gallery-data"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  const filteredProjects = activeFilter === "All" ? galleryData : galleryData.filter((p) => p.tileName === activeFilter)

  return (
    <>
      <div className="bg-white text-neutral-800">
        <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-lg">
          <div className="container mx-auto flex items-center justify-between px-4 py-3">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              Terra Clay
            </Link>
            <nav className="flex items-center gap-2 sm:gap-4">
              <Button asChild variant="ghost" className="text-base">
                <Link href="/contact">Contact</Link>
              </Button>
              <Button asChild variant="default">
                <Link href="/#quote">Request a Quote</Link>
              </Button>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 sm:py-12">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Project Gallery</h1>
            <p className="mt-2 max-w-2xl mx-auto text-lg text-neutral-600">
              Explore our finished projects and find the perfect tile for your home.
            </p>
          </div>

          <div className="my-8 flex flex-wrap items-center justify-center gap-2">
            <Button
              variant={activeFilter === "All" ? "default" : "outline"}
              onClick={() => setActiveFilter("All")}
              className="rounded-full"
            >
              All Projects
            </Button>
            {tileTypes.map((type) => (
              <Button
                key={type}
                variant={activeFilter === type ? "default" : "outline"}
                onClick={() => setActiveFilter(type)}
                className="rounded-full"
              >
                {type}
              </Button>
            ))}
          </div>

          <div className="space-y-12">
            {filteredProjects.map((project) => (
              <section key={project.id}>
                <div className="mb-4">
                  <h2 className="text-2xl font-bold">{project.tileName}</h2>
                  <p className="text-md text-neutral-500">{project.tileColor}</p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {project.photos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedPhoto(photo)}
                      className="group relative block w-full overflow-hidden rounded-lg text-left"
                    >
                      <Image
                        src={photo.src || "/placeholder.svg"}
                        alt={photo.alt}
                        width={800}
                        height={600}
                        className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="font-semibold text-white">{photo.angle}</h3>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>

        <footer className="border-t border-neutral-200 bg-neutral-50">
          <div className="container mx-auto px-4 py-6 text-center text-neutral-500">
            <p>&copy; {new Date().getFullYear()} Terra Clay. All Rights Reserved.</p>
          </div>
        </footer>
      </div>

      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl p-2 sm:p-4">
          {selectedPhoto && (
            <div>
              <Image
                src={selectedPhoto.src || "/placeholder.svg"}
                alt={selectedPhoto.alt}
                width={1600}
                height={1200}
                className="w-full rounded-md object-contain"
              />
              <div className="mt-2 px-2 text-center text-sm text-neutral-600">
                <p>{selectedPhoto.alt}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
