import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native"
import React, { useEffect, useState } from "react"
import Ionicons from "@expo/vector-icons/Ionicons"
import AntDesign from "@expo/vector-icons/AntDesign"
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons"
import {
  EpisodePageMediaURL,
  EpisodePageType,
  EpisodeType,
} from "./types/comics"
import { API_URL } from "./constants/API_URL"

const { height, width } = Dimensions.get("screen")

const InComicsPanel = ({
  visible = false,
  setOpenInComicsPanel,
  title,
  episode_id,
  series_id,
  apiKey,
}: {
  setOpenInComicsPanel: React.Dispatch<React.SetStateAction<boolean>>
  visible: boolean
  title?: string
  episode_id?: number
  series_id?: number
  apiKey: string
}) => {
  const [expand, setExpand] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [episode, setEpisode] = useState<EpisodeType>()
  const [episodePages, setEpisodePages] = useState<EpisodePageMediaURL[]>()

  useEffect(() => {
    const response = fetch(
      `${API_URL}/comics/${series_id}/episodes/${episode_id}`,
      {
        headers: { "merchant-x-secret": `${apiKey}` },
      }
    )
    const pages = fetch(
      `${API_URL}/comics/${series_id}/episodes/${episode_id}/pages`,
      {
        headers: { "merchant-x-secret": `${apiKey}` },
      }
    )
    pages.then(async (data) => {
      try {
        const text = await data.text()
        if (text) {
          const episode_pages = JSON.parse(text)?.data as EpisodePageType[]
          // console.log(episode_pages)
          if (episode_pages) {
            setEpisodePages(
              episode_pages.map((data) => {
                return JSON.parse(
                  data.page_file.media_url
                ) as EpisodePageMediaURL
              })
            )
          }
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    })
    response.then(async (data) => {
      try {
        const text = await data.text()
        if (text) {
          const episode_ = JSON.parse(text)?.data as EpisodeType
          // console.log(episode_)
          if (episode_) {
            setEpisode(episode_)
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
    <View
      style={[
        {
          zIndex: 1100,
          borderRadius: 15,
          justifyContent: "center",
          position: "absolute",
          bottom: 20,
          right: 15,
          width: width - 30,
          backgroundColor: "#fff",
          height: expand ? height / 1.36 : 140,
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
              fontSize: 25,
              lineHeight: 25,
              fontFamily: "MamaKilo",
              textTransform: "uppercase",
            }}
          >
            Issue #{episode?.episode_number}
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
              onPress={() => setOpenInComicsPanel(!visible)}
            >
              <AntDesign name="close" size={24} color="#FF4D52" />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <View style={{ height: "100%", width: "100%" }}>
        <TouchableOpacity
          style={{
            padding: 10,
            paddingBottom: 12,
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
          onPress={() => setOpenInComicsPanel(!visible)}
        >
          <SimpleLineIcons name="arrow-left" size={18} color="black" />
          <Text>Back to episodes</Text>
        </TouchableOpacity>
        {/* <Image source={comics} style={{ width: "100%", height: 550 }} /> */}
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
          <>
            {/* <Pdf
              trustAllCerts={false}
              source={{
                uri: episode?.episode_file?.media_url || "",
                cache: true,
              }}
              onLoadComplete={(numberOfPages, filePath) => {
                // console.log(`Number of pages: ${numberOfPages}`)
                setIsLoading(false)
              }}
              onPageChanged={(page, numberOfPages) => {
                // console.log(`Current page: ${page}`)
              }}
              onError={(error) => {
                // console.log(error)
              }}
              onPressLink={(uri) => {
                // console.log(`Link pressed: ${uri}`)
              }}
              style={styles.pdf}
              onLoadProgress={(num) => {
                // setIsLoading(true)
                // console.log(num)
              }}
            /> */}
            {/* <WebView
              source={{
                uri: `https://docs.google.com/gview?embedded=true&url=${
                  episode?.episode_file?.media_url || ""
                }`,
              }}
              style={styles.pdf}
              scalesPageToFit={true}
            /> */}

            {!episodePages?.length ? (
              <Text style={{ textAlign: "center", padding: 20, opacity: 0.5 }}>
                No comics to show here
              </Text>
            ) : (
              <View
                style={{
                  overflow: "hidden",
                  height: expand ? (height - 88) / 1.36 : 90,
                  borderRadius: 10,
                }}
              >
                <FlatList
                  data={episodePages}
                  renderItem={(page) => {
                    return (
                      <Image
                        src={page.item.mobile}
                        key={page.index}
                        style={{
                          width: width - 30,
                          height: width * 1.4,
                          objectFit: "fill",
                        }}
                      />
                    )
                  }}
                />
              </View>
            )}
          </>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25,
  },
  pdf: {
    height: "90%",
    width: "100%",
    borderRadius: 10,
    // flex: 1,
  },
})

export default InComicsPanel
