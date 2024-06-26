import React from "react";

interface Video {
  videoId: string;
  title: string;
  thumbnails: { url: string }[];
  channelName: string;
}

interface ExerciseVideosProps {
  videos: {
    video: Video;
  }[];
  name: string;
}

const ExerciseVideos: React.FC<ExerciseVideosProps> = ({ videos, name }) => {
  return (
    <div className="flex flex-col p-10 gap-10 ">
      <div>
        <h1 className="text-3xl">
          Watch{" "}
          <span className="font-bold">
            {name.toUpperCase()}
          </span>{" "}
          demo videos
        </h1>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 ">
        {videos?.slice(0, 6).map((item, index) => (
          <VideoCard key={index} video={item.video} />
        ))}
      </div>
    </div>
  );
};

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <div className="  rounded-2xl shadow-lg max-w-96  m-2 transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <a
        href={`https://www.youtube.com/watch?v=${video.videoId}`}
        target="_blank"
        rel="noreferrer"
        className="block w-full h-full relative"
      >
        <img
          src={video.thumbnails[0].url}
          alt={video.title}
          className="w-full h-56 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{video.title}</h3>
          <p className="text-sm text-gray-600">{video.channelName}</p>
        </div>
      </a>
    </div>
  );
};

export default ExerciseVideos;
