import {
  View,
  Text,
  ScrollView,
  Image,
  Animated,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native"
import React, { useEffect, useState } from "react"
import Ionicons from "@expo/vector-icons/Ionicons"
import AntDesign from "@expo/vector-icons/AntDesign"
// @ts-ignore
import NewReleases from "./NewReleases"
import InComicsPanel from "./InComicsPanel"
import { EpisodeType } from "./types/comics"
import { API_URL } from "./constants/API_URL"
import { Link } from "expo-router"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import Pantheon from "./Pantheon"
import InPantheonPanel from "./InPantheonPanel"
import { pantheonT } from "./types/pantheon"

const { height, width } = Dimensions.get("window")

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
  const [openInPantheonPanel, setOpenInPantheonPanel] = useState(false)
  const [episode, setEpisode] = useState<EpisodeType>()
  const [pantheon, setPantheon] = useState<pantheonT>()
  const poster = require("../../assets/images/widget/clubzella-zella-poster.png")

  const handleSetEpisode = (episode: any) => {
    setEpisode(episode)
  }

  const handleSetPantheon = (pantheon: pantheonT) => {
    setPantheon(pantheon)
  }

  const [isLoading, setIsLoading] = useState(true)
  const [episodes, setEpisodes] = useState<EpisodeType[]>([])
  const fetch_url = `${API_URL}/comics/episodes`
  useEffect(() => {
    const response = fetch(fetch_url, {
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

  useEffect(() => {
    if (openInComicsPanel || openInPantheonPanel) {
      setExpand(false)
    } else {
      setExpand(true)
    }
  }, [openInComicsPanel, openInPantheonPanel])

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
            right: 15,
            width: width - 30,
            // height: 140,
            backgroundColor: "#fff",
            height: expand ? height / 1.5 : 140,
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
            <Text
              style={{
                color: "#F5F5F5",
                fontSize: 24,
                lineHeight: 24,
                fontFamily: "MamaKilo",
                textTransform: "uppercase",
              }}
            >
              {title}
            </Text>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setExpand(!expand)}
            >
              <Ionicons name="expand" size={24} color="#fff" />
            </TouchableOpacity>
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
                onPress={() => setOpenEpisodesPanel(!visible)}
              >
                <AntDesign name="close" size={24} color="#FF4D52" />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        <ScrollView style={{ height: "100%", width: "100%" }}>
          <View style={{ gap: 16 }}>
            {expand && (
              <View
                style={{ position: "relative", padding: 12, paddingBottom: 0 }}
              >
                <Image
                  source={poster}
                  style={{ width: "100%", height: 112, borderRadius: 10 }}
                />
                <View
                  style={{
                    position: "absolute",
                    padding: 26,
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <View style={{ marginBlock: "auto" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <Ionicons
                        name="headset-sharp"
                        size={24}
                        color="#5DF092"
                      />
                      <Text
                        style={{ color: "#fff", fontSize: 16, fontWeight: 500 }}
                      >
                        Zella sounds
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: 300,
                        width: "50%",
                        marginTop: 5,
                      }}
                    >
                      Listen to the sound track that make the gods dance.
                    </Text>
                    <Link
                      style={{
                        marginTop: 5,
                      }}
                      href={"/"}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <Text style={{ fontSize: 12, color: "#5DF092" }}>
                          Zellasounds.spotify
                        </Text>
                        <View
                          style={{
                            backgroundColor: "#5DF092",
                            height: 18,
                            width: 18,
                            borderRadius: 18,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <MaterialCommunityIcons
                            name="arrow-top-right"
                            size={14}
                            color="#000"
                          />
                        </View>
                      </View>
                    </Link>
                  </View>
                </View>
              </View>
            )}
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
              <View>
                <View style={{ paddingInline: 12 }}>
                  <NewReleases
                    handleSetEpisode={handleSetEpisode}
                    openInComicsPanel={openInComicsPanel}
                    setOpenInComicsPanel={setOpenInComicsPanel}
                    episodes={episodes}
                  />
                </View>
                {/* <Pantheon
                  handleSetPantheon={handleSetPantheon}
                  openInPantheonPanel={openInPantheonPanel}
                  setOpenInPantheonPanel={setOpenInPantheonPanel}
                /> */}
              </View>
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

      {openInPantheonPanel && (
        <InPantheonPanel
          title={pantheon?.title}
          visible={openInPantheonPanel}
          setOpenInPantheonPanel={setOpenInPantheonPanel}
          apiKey={apiKey}
          pantheon={pantheon as pantheonT}
        />
      )}
    </>
  )
}

export default EpisodesPanel
