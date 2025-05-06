import { View, Text, TouchableOpacity } from "react-native"
import React from "react"
import { ComicType } from "./types/comics"
import ComicCard from "./ComicCard"

const AllComics = ({
  handleSetComic,
  openEpisodesPanel,
  setOpenEpisodesPanel,
  comics,
}: {
  handleSetComic: (comic: any) => void
  setOpenEpisodesPanel: React.Dispatch<React.SetStateAction<boolean>>
  openEpisodesPanel: boolean
  comics: ComicType[]
}) => {
  return (
    <>
      <View style={{ gap: 10, paddingBottom: 20 }}>
        <Text style={{ fontWeight: 600 }}>Comics</Text>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            {comics.map((comic, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{ width: "31%" }}
                  onPress={() => {
                    handleSetComic(comic)
                    setOpenEpisodesPanel(!openEpisodesPanel)
                  }}
                >
                  <ComicCard
                    cover_img={comic?.file?.media_url}
                    series={comic?.id}
                    title={comic?.title}
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

export default AllComics
