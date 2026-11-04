'use client'

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Instagram, Sparkles, Quote } from 'lucide-react'
import brandData from '../data/brand_bible.json'
import { ReelShowcase } from '../types'

export const ReelsShowcase: React.FC = () => {
  const reels = brandData.reels_showcase as ReelShowcase[]
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [isMuted, setIsMuted] = useState<boolean>(true)
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({})

  const togglePlay = (id: string) => {
    const video = videoRefs.current[id]
    if (!video) return

    if (playingId === id) {
      video.pause()
      setPlayingId(null)
    } else {
      // Pause any previously playing video
      if (playingId && videoRefs.current[playingId]) {
        videoRefs.current[playingId]?.pause()
      }
      video.play().catch(() => {
        // Autoplay policy fallback
      })
      setPlayingId(id)
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newMuted = !isMuted
    setIsMuted(newMuted)
    Object.values(videoRefs.current).forEach(video => {
      if (video) video.muted = newMuted
    })
  }

  return (
    <section id="reels" className="py-20 bg-brand-linen/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-olive/10 border border-brand-olive/20 text-brand-olive text-xs font-semibold uppercase tracking-wider mb-3">
              <Instagram className="w-3.5 h-3.5 text-brand-olive" />
              Directo desde Instagram @rapunzel_organic
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-dark tracking-tight">
              Resultados Reales en Video
            </h2>
            <p className="text-brand-dark/70 text-base mt-2">
              Sin filtros ni promesas vacías: mira cómo nuestras clientas y creadores aplican los tratamientos botánicos y comprueban su crecimiento.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleMute}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-sage/30 bg-white text-xs font-medium text-brand-dark hover:border-brand-olive hover:text-brand-olive transition-colors shadow-sm"
              title="Silenciar / Activar sonido"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-brand-dark/60" />
                  <span>Sonido silenciado</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-brand-olive" />
                  <span className="text-brand-olive font-semibold">Sonido activado</span>
                </>
              )}
            </button>
            <a
              href="https://www.instagram.com/rapunzel_organic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-olive text-white text-xs font-medium hover:bg-brand-oliveDark transition-colors shadow-sm"
            >
              <Instagram className="w-4 h-4" />
              Seguir en Instagram
            </a>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reels.map((reel, index) => {
            const isCurrentPlaying = playingId === reel.id
            return (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-md shadow-brand-dark/5 border border-brand-sage/20 flex flex-col"
              >
                {/* 9:16 Video Container */}
                <div
                  className="relative aspect-[9/16] w-full bg-black overflow-hidden cursor-pointer"
                  onClick={() => togglePlay(reel.id)}
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[reel.id] = el
                    }}
                    src={reel.video_url}
                    poster={reel.thumbnail}
                    loop
                    playsInline
                    muted={isMuted}
                    preload="metadata"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />

                  {/* Play / Pause Overlay Button */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
                      isCurrentPlaying ? 'opacity-0 group-hover:opacity-100 bg-black/20' : 'opacity-100 bg-black/35'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-brand-dark shadow-lg transform transition-transform group-hover:scale-110">
                      {isCurrentPlaying ? (
                        <Pause className="w-6 h-6 fill-current text-brand-olive" />
                      ) : (
                        <Play className="w-6 h-6 fill-current text-brand-olive ml-1" />
                      )}
                    </div>
                  </div>

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="bg-brand-dark/70 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-brand-gold" />
                      Reel Verificado
                    </span>
                    <span className="bg-white/80 backdrop-blur-md text-brand-dark text-[10px] font-bold px-2 py-0.5 rounded-full">
                      @rapunzel_organic
                    </span>
                  </div>
                </div>

                {/* Video Info & Real Spoken Quote */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="font-serif font-bold text-brand-dark text-base mb-2 line-clamp-2">
                      {reel.title}
                    </h3>

                    {/* Spoken transcript quote */}
                    <div className="bg-brand-linen/60 rounded-xl p-3 border border-brand-sage/15 text-xs text-brand-dark/80 relative">
                      <Quote className="w-3.5 h-3.5 text-brand-olive/40 absolute -top-1.5 -left-1.5 bg-white rounded-full p-0.5 border border-brand-sage/20" />
                      <p className="italic line-clamp-3 leading-relaxed">
                        &ldquo;{reel.quote}&rdquo;
                      </p>
                      <div className="mt-1 text-[11px] font-semibold text-brand-olive text-right">
                        — {reel.speaker}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-brand-sage/10 flex items-center justify-between">
                    <button
                      onClick={() => togglePlay(reel.id)}
                      className="text-xs font-semibold text-brand-olive hover:text-brand-oliveDark flex items-center gap-1"
                    >
                      {isCurrentPlaying ? 'Pausar video' : 'Reproducir video'}
                    </button>
                    <span className="text-[11px] text-brand-dark/40 font-mono">
                      #{reel.code}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
