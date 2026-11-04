'use client'

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Instagram, Sparkles, Quote } from 'lucide-react'
import brandData from '../data/brand_bible.json'
import { ReelShowcase } from '../types'

export const ReelsShowcase: React.FC = () => {
  const reels = brandData.reels_showcase as ReelShowcase[]
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [isMuted, setIsMuted] = useState<boolean>(false) // Default unmuted so user hears real audio
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
        const prev = videoRefs.current[playingId]
        if (prev) {
          prev.pause()
          prev.currentTime = 0
        }
      }

      // Try playing with audio enabled
      video.muted = isMuted
      video.volume = 1.0
      const playPromise = video.play()

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setPlayingId(id)
          })
          .catch(() => {
            // Autoplay policy fallback: mute and play
            video.muted = true
            setIsMuted(true)
            video.play().then(() => {
              setPlayingId(id)
            }).catch(e => console.error('Play error', e))
          })
      }
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newMuted = !isMuted
    setIsMuted(newMuted)
    Object.values(videoRefs.current).forEach(video => {
      if (video) {
        video.muted = newMuted
        video.volume = 1.0
      }
    })
  }

  const toggleSingleVideoMute = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const video = videoRefs.current[id]
    if (video) {
      const nextMute = !video.muted
      video.muted = nextMute
      video.volume = 1.0
      setIsMuted(nextMute)
    }
  }

  return (
    <section id="reels" className="py-14 sm:py-18 bg-brand-linen/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header with refined typography & proportions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-olive/10 border border-brand-olive/20 text-brand-olive text-[11px] font-semibold uppercase tracking-wider mb-2">
              <Instagram className="w-3 h-3 text-brand-olive" />
              Directo desde Instagram @rapunzel_organic
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-dark tracking-tight">
              Resultados Reales en Video
            </h2>
            <p className="text-brand-dark/70 text-xs sm:text-sm mt-1.5 leading-relaxed">
              Videos reales con audio de clientas comprobando el crecimiento y aplicación de los tratamientos botánicos.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={toggleMute}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shadow-xs ${
                !isMuted
                  ? 'bg-brand-olive text-white shadow-sm'
                  : 'bg-white border border-brand-sage/30 text-brand-dark hover:border-brand-olive'
              }`}
              title="Activar / Desactivar Sonido"
            >
              {!isMuted ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                  <span>Audio Activado</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-red-500" />
                  <span>Audio Silenciado</span>
                </>
              )}
            </button>
            <a
              href="https://www.instagram.com/rapunzel_organic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-brand-sage/30 text-brand-dark text-xs font-medium hover:border-brand-olive hover:text-brand-olive transition-colors shadow-xs"
            >
              <Instagram className="w-3.5 h-3.5 text-rose-600" />
              <span>@rapunzel_organic</span>
            </a>
          </div>
        </div>

        {/* Video Grid with more balanced spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {reels.map((reel, index) => {
            const isCurrentPlaying = playingId === reel.id
            return (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md border border-brand-sage/20 flex flex-col transition-all"
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
                    preload="metadata"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />

                  {/* Play / Pause Center Overlay Button */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 pointer-events-none ${
                      isCurrentPlaying ? 'opacity-0 group-hover:opacity-100 bg-black/25' : 'opacity-100 bg-black/35'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-brand-dark shadow-md transform transition-transform group-hover:scale-110">
                      {isCurrentPlaying ? (
                        <Pause className="w-5 h-5 fill-current text-brand-olive" />
                      ) : (
                        <Play className="w-5 h-5 fill-current text-brand-olive ml-0.5" />
                      )}
                    </div>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                    <span className="bg-brand-dark/75 backdrop-blur-md text-white text-[9px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-brand-gold" />
                      Reel Verificado
                    </span>
                  </div>

                  {/* Bottom Right Direct Audio Toggle Button */}
                  <button
                    onClick={(e) => toggleSingleVideoMute(reel.id, e)}
                    className="absolute bottom-2.5 right-2.5 z-20 px-2 py-1 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md text-white text-[10px] font-medium flex items-center gap-1 shadow-md transition-all active:scale-95"
                    title={isMuted ? 'Activar sonido' : 'Silenciar'}
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="w-3 h-3 text-red-400" />
                        <span className="text-[10px]">Sin sonido</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3 h-3 text-emerald-400" />
                        <span className="text-[10px] text-emerald-300 font-semibold">Con audio</span>
                      </>
                    )}
                  </button>

                  {/* Subtle helper pill when playing */}
                  {isCurrentPlaying && (
                    <div className="absolute top-2.5 right-2.5 bg-emerald-600/90 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-full animate-pulse pointer-events-none">
                      Reproduciendo
                    </div>
                  )}
                </div>

                {/* Video Info & Real Spoken Quote */}
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between bg-white space-y-3">
                  <div>
                    <h3 className="font-serif font-bold text-brand-dark text-xs sm:text-sm mb-1.5 line-clamp-1">
                      {reel.title}
                    </h3>

                    {/* Spoken transcript quote */}
                    <div className="bg-brand-linen/70 rounded-xl p-2.5 border border-brand-sage/15 text-[11px] text-brand-dark/80 relative">
                      <p className="italic line-clamp-2 leading-relaxed">
                        &ldquo;{reel.quote}&rdquo;
                      </p>
                      <div className="mt-1 text-[10px] font-semibold text-brand-olive text-right">
                        — {reel.speaker}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-brand-sage/10 flex items-center justify-between text-[11px]">
                    <button
                      onClick={() => togglePlay(reel.id)}
                      className="font-semibold text-brand-olive hover:text-brand-oliveDark flex items-center gap-1"
                    >
                      {isCurrentPlaying ? 'Pausar' : 'Ver y escuchar'}
                    </button>
                    <span className="text-brand-dark/40 font-mono text-[10px]">
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
