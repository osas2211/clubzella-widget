import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  Animated,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native"
import React, { useEffect, useRef, useState } from "react"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import AntDesign from "@expo/vector-icons/AntDesign"

// @ts-ignore
import comics from "../../assets/images/widget/comics.jpg"

// @ts-ignore
import poster from "../../assets/images/widget/orisha-warz-poster.png"
import NewReleases from "./NewReleases"
import InComicsPanel from "./InComicsPanel"
import { ComicType, EpisodeType } from "./types/comics"
import { API_URL } from "./constants/API_URL"
import { SimpleLineIcons } from "@expo/vector-icons"

const { height } = Dimensions.get("window")

const EpisodesPanel = ({
  visible = false,
  setOpenEpisodesPanel,
  title,
  series_id,
  apiKey,
}: {
  setOpenEpisodesPanel: React.Dispatch<React.SetStateAction<boolean>>
  visible: boolean
  title: string
  series_id: number
  apiKey: string
}) => {
  const [expand, setExpand] = useState(true)
  const [openInComicsPanel, setOpenInComicsPanel] = useState(false)
  const [episode, setEpisode] = useState<EpisodeType>()

  const handleSetEpisode = (episode: any) => {
    setEpisode(episode)
  }

  const [isLoading, setIsLoading] = useState(true)
  const [episodes, setEpisodes] = useState<EpisodeType[]>([])
  useEffect(() => {
    const response = fetch(`${API_URL}/comics/${series_id}/episodes`, {
      headers: { "merchant-x-secret": `${apiKey}` },
    })
    response.then(async (data) => {
      try {
        const text = await data.text()
        if (text) {
          const episodes_ = JSON.parse(text)?.data as EpisodeType[]
          if (episodes_) {
            setEpisodes(episodes_)
          }
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    })
  }, [])

  return (
    <>
      <View
        style={[
          {
            zIndex: 1100,
            borderRadius: 15,
            justifyContent: "center",
            // alignItems: "center",
            position: "absolute",
            bottom: 20,
            right: 20,
            width: "100%",
            // height: 140,
            backgroundColor: "#fff",
            height: expand ? "90%" : 140,
            elevation: 4,
          },
        ]}
      >
        <Animated.View>
          <View
            style={{
              minHeight: 35,
              width: "100%",
              backgroundColor: "#393535",
              borderTopStartRadius: 15,
              borderTopEndRadius: 15,
              padding: 11,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <Text style={{ color: "#CECCCC", fontSize: 12, fontWeight: 500 }}>
              {title}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setExpand(!expand)}
              >
                <FontAwesome name="expand" size={18} color="#9C9A9A" />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setOpenEpisodesPanel(!visible)}
              >
                <AntDesign name="close" size={18} color="#CF2C2C" />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        <ScrollView style={{ height: "100%", width: "100%" }}>
          <View style={{ padding: 12, gap: 16 }}>
            {/* <TouchableOpacity
              style={{
                padding: 0,
                paddingBottom: 0,
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
              onPress={() => setOpenEpisodesPanel(!visible)}
            >
              <SimpleLineIcons name="arrow-left" size={12} color="black" />
              <Text>Back to comics</Text>
            </TouchableOpacity> */}
            <View style={{ position: "relative" }}>
              <Image
                source={poster}
                style={{ width: "100%", height: 106, borderRadius: 10 }}
              />
              <View
                style={{
                  position: "absolute",
                  padding: 10,
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              >
                <View style={{ marginBlock: "auto" }}>
                  <Text
                    style={{ color: "#fff", fontSize: 12, fontWeight: 500 }}
                  >
                    {/* Orisha Wars - */}
                    {title}
                  </Text>
                  <Text
                    style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}
                  >
                    A Mythic Journey Awaits!
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 12,
                      fontWeight: 300,
                      width: "75%",
                      marginTop: 5,
                    }}
                  >
                    Experience the saga of ancient gods and fierce battles.
                  </Text>
                </View>
              </View>
            </View>
            {isLoading ? (
              <View
                style={{
                  height: expand ? 500 : "auto",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator size={"large"} />
              </View>
            ) : (
              <NewReleases
                handleSetEpisode={handleSetEpisode}
                openInComicsPanel={openInComicsPanel}
                setOpenInComicsPanel={setOpenInComicsPanel}
                episodes={episodes}
              />
            )}
          </View>
        </ScrollView>
      </View>

      {openInComicsPanel && (
        <InComicsPanel
          title={episode?.title}
          visible={openInComicsPanel}
          setOpenInComicsPanel={setOpenInComicsPanel}
          episode_id={episode?.id}
          series_id={episode?.comics_series_id}
          apiKey={apiKey}
        />
      )}
    </>
  )
}

export default EpisodesPanel
