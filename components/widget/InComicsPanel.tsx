import {
  View,
  Text,
  ScrollView,
  Image,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native"
import React, { useEffect, useRef, useState } from "react"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import AntDesign from "@expo/vector-icons/AntDesign"
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons"

// @ts-ignore
import comics from "../../assets/images/widget/comics.jpg"
import { EpisodeType } from "./types/comics"
import { API_URL } from "./constants/API_URL"
import { WebView } from "react-native-webview"

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
  useEffect(() => {
    const response = fetch(
      `${API_URL}/comics/${series_id}/episodes/${episode_id}`,
      {
        headers: { "merchant-x-secret": `${apiKey}` },
      }
    )
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
          <Text
            style={{
              color: "#CECCCC",
              fontSize: 12,
              fontWeight: 500,
              width: "70%",
            }}
          >
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
              onPress={() => setOpenInComicsPanel(!visible)}
            >
              <AntDesign name="close" size={18} color="#CF2C2C" />
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
          <WebView
            source={{
              uri: `https://docs.google.com/gview?embedded=true&url=${
                episode?.episode_file?.media_url || ""
              }`,
            }}
            style={styles.pdf}
            scalesPageToFit={true}
          />
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
    maxHeight: 545,
    width: Dimensions.get("window").width,
    borderRadius: 10,
  },
})

export default InComicsPanel
