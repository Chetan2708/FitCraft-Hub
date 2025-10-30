import type React from "react"

interface Video {
  videoId: string
  title: string
  thumbnails: { url: string }[]
  channelName: string
}

interface ExerciseVideosProps {
  videos: {
    video: Video
  }[]
  name: string
}

const ExerciseVideos: React.FC<ExerciseVideosProps> = ({ videos, name }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 mb-12 hover:bg-white/10 transition-all duration-300">
          <h1 className="text-4xl lg:text-5xl font-bold">
            Watch{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {name.toUpperCase()}
            </span>{" "}
            <span className="text-white">demo videos</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos?.slice(0, 6).map((item, index) => (
            <VideoCard key={index} video={item.video} />
          ))}
        </div>
      </div>
    </div>
  )
}

interface VideoCardProps {
  video: Video
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.videoId}`}
      target="_blank"
      rel="noreferrer"
      className="group block h-full"
    >
      <div className="relative h-full backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl overflow-hidden hover:border-white/40 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/20 group-hover:to-blue-500/20 transition-all duration-500 pointer-events-none"></div>

        {/* Image Container */}
        <div className="relative overflow-hidden h-56">
          <img
            src={video.thumbnails[0].url || "/placeholder.svg"}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <svg className="w-8 h-8 text-white fill-current ml-1" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 relative z-10">
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors duration-300">
            {video.title}
          </h3>
          <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
            {video.channelName}
          </p>
        </div>
      </div>
    </a>
  )
}

export default ExerciseVideos
