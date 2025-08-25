export interface ComicType {
  id: number
  series_number: number
  status: "active" | "inactive"
  title: string
  descriptions: string
  casts: string
  meta: {
    created_on: string
    created_by: string
  }
  file: {
    id: number
    media_url: string
  }
  comics_episode_published: number
  comics_episode_unpublished: number
}

export interface EpisodePageType {
  comics_episode: {
    id: number
    status: "active"
    title: string
  }
  dimensions: null
  id: number
  page_file: {
    id: number
    media_url: string
  }
  page_number: number
  status: "active"
}

export interface EpisodePageMediaURL {
  main: string
  thumbnail: string
  mobile: string
  avif: string
  sources: {
    avif: [
      {
        srcset: string
        media: string
        type: string
      },
      {
        srcset: string
        media: string
        type: string
      }
    ]
    webp: [
      {
        srcset: string
        media: string
        type: string
      },
      {
        srcset: string
        media: string
        type: string
      }
    ]
  }
}

export interface EpisodeType {
  id: number
  title: string
  episode_number: number
  descriptions: string
  comics_series_id: number
  casts: string
  status: "active" | "inactive"
  meta: {
    created_on: string
    created_by: string
    deleted_flag: number
  }
  cover_file: {
    id: number
    media_url: string
  }
  episode_file: {
    id: number
    media_url: string
  }
}
