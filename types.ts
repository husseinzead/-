export interface GroundingChunk {
  web?: {
    // FIX: Made uri and title optional to match the GroundingChunk type from the @google/genai library.
    uri?: string;
    title?: string;
  };
}

export interface CategorizedResults {
  youtubeResults: GroundingChunk[];
  webResults: GroundingChunk[];
}

export interface SearchServiceResponse {
  summary: string;
  groundingChunks: GroundingChunk[];
}

export interface VideoSummary {
  tools: string[];
  steps: string[];
  warnings: string[];
}

export interface VideoDetails {
  title: string;
  author_name: string;
  thumbnail_url: string;
}
