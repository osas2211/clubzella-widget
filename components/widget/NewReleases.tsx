import { View, Text, FlatList, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import ComicsCard from "./ComicsCard"
import InComicsPanel from "./InComicsPanel"

const dummy_comics = [
  {
    cover_img:
      "https://res.cloudinary.com/osaretinfrank/image/upload/v1745843590/m9ee8g5nmdcsyny7f4qt.png",
    episode: 3,
    title: "The return of Sango",
    series: 1,
  },
  {
    cover_img:
      "https://static.wikia.nocookie.net/deathbattlefanon/images/e/ed/Conquest.png/revision/latest?cb=20250329070913",
    episode: 4,
    title: "Orisha gods vs Conquest",
    series: 1,
  },
  {
    cover_img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1V0pxQqY-6n0oPMS6xSIiKd7J4XVXEK-rIQ&s",
    episode: 5,
    title: "The Mamiwater",
    series: 1,
  },
  {
    cover_img:
      "https://preview.redd.it/6hu42nurbf061.jpg?width=640&crop=smart&auto=webp&s=863c1623fa8bb18478ed19e4fedcd4edb03868df",
    episode: 6,
    title: "The Awakening",
    series: 1,
  },
  {
    cover_img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNBAUzg7S9VYT3GhEMdufvGnOfT8FMKLS5TQ&s",
    episode: 7,
    title: "Legend of Bayajida",
    series: 1,
  },
  {
    cover_img: "",
    episode: 8,
    title: "Invincible",
    series: 1,
  },
  {
    cover_img:
      "https://squidmag.wordpress.com/wp-content/uploads/2017/05/scion_immortal_nov_2016-2.jpg?w=940",
    episode: 5,
    title: "",
    series: 1,
  },
]

const NewReleases = ({
  handleSetComic,
  openInComicsPanel,
  setOpenInComicsPanel,
}: {
  handleSetComic: (comic: any) => void
  setOpenInComicsPanel: React.Dispatch<React.SetStateAction<boolean>>
  openInComicsPanel: boolean
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
            {dummy_comics.map((comic, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{ width: "31%" }}
                  onPress={() => {
                    handleSetComic(comic)
                    setOpenInComicsPanel(!openInComicsPanel)
                  }}
                >
                  <ComicsCard {...comic} />
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
