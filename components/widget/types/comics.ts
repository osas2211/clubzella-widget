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

// export interface ComicType {
//   casts: string
//   comics_series: { id: number; title: string }
//   comics_series_id: number
//   cover_file: {
//     id: number
//     media_url: string
//   }
//   descriptions: string
//   episode_number: number
//   id: number
//   meta: {
//     created_by: string
//     created_on: string
//   }
//   status: "active" | "inactive"
//   title: string
// }

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
