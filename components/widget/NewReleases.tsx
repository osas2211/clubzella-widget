import { View, Text, FlatList, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import EpisodeCard from "././EpisodeCard"
import InComicsPanel from "./InComicsPanel"
import { ComicType, EpisodeType } from "./types/comics"

const NewReleases = ({
  handleSetEpisode,
  openInComicsPanel,
  setOpenInComicsPanel,
  episodes,
}: {
  handleSetEpisode: (comic: any) => void
  setOpenInComicsPanel: React.Dispatch<React.SetStateAction<boolean>>
  openInComicsPanel: boolean
  episodes: EpisodeType[]
}) => {
  return (
    <>
      <View style={{ gap: 10, paddingBottom: 20 }}>
        <Text style={{ fontWeight: 600 }}>New Releases</Text>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            {episodes.map((episode, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{ width: "31%" }}
                  onPress={() => {
                    handleSetEpisode(episode)
                    setOpenInComicsPanel(!openInComicsPanel)
                  }}
                >
                  <EpisodeCard
                    cover_img={episode?.cover_file?.media_url}
                    episode={episode?.id}
                    series={episode?.comics_series_id}
                    title={episode?.title}
                    episode_number={episode.episode_number}
                  />
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      </View>
    </>
  )
}

export default NewReleases
