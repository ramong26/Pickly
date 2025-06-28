import mongoose from "mongoose";

// 유튜브 비디오 스키마
const YoutubeVideoSchema = new mongoose.Schema(
  {
    query: { type: String, required: true, unique: true },
    videoData: {
      videoId: String,
      title: String,
      thumbnail: String,
      publishedAt: String,
    },
  },
  { timestamps: true }
);

export const YoutubeVideoModel =
  mongoose.models.YoutubeVideo ||
  mongoose.model("YoutubeVideo", YoutubeVideoSchema, "youtubevideos");

// OpenAI  영화 추출 스키마
const OpenAIMovieSchema = new mongoose.Schema({
  query: String,
  result: String,
  createdAt: Date,
});

export const OpenAIMovieQuery =
  mongoose.models.OpenAIMovieQuery ||
  mongoose.model("OpenAIMovieQuery", OpenAIMovieSchema, "openaimoviequeries");

// OpenAI 음악 추출 스키마
const OpenAIMusicSchema = new mongoose.Schema({
  query: String,
  result: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const OpenAIMusicQuery =
  mongoose.models.OpenAIMusicQuery ||
  mongoose.model("OpenAIMusicQuery", OpenAIMusicSchema, "openaimusicqueries");

// OpenAI 장소 추출 스키마
const OpenAIPlaceSchema = new mongoose.Schema({
  query: String,
  result: String,
  createdAt: Date,
});

export const OpenAIPlaceQuery =
  mongoose.models.OpenAIPlaceQuery ||
  mongoose.model("OpenAIPlaceQuery", OpenAIPlaceSchema, "openaiplacequeries");
