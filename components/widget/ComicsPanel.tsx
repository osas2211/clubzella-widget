import {
  View,
  Text,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native"
import React, { useEffect, useState } from "react"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import AntDesign from "@expo/vector-icons/AntDesign"
import { ComicType } from "./types/comics"
import EpisodesPanel from "./EpisodesPanel"
import AllComics from "./AllComics"
import { API_URL } from "./constants/API_URL"

const { height } = Dimensions.get("window")

const ComicsPanel = ({
  visible = false,
  setOpenComicsPanel,
  apiKey,
}: {
  setOpenComicsPanel: React.Dispatch<React.SetStateAction<boolean>>
  visible: boolean
  apiKey: string
}) => {
  const [expand, setExpand] = useState(false)
  const [openEpisodesPanel, setOpenEpisodesPanel] = useState(false)
  const [comic, setComic] = useState<ComicType>()

  const handleSetComic = (comic: ComicType) => {
    setComic(comic)
  }

  const [isLoading, setIsLoading] = useState(true)
  const [comics, setComics] = useState<ComicType[]>([])
  useEffect(() => {
    const response = fetch(`${API_URL}/comics`, {
      headers: { "merchant-x-secret": `${apiKey}` },
    })
    response.then(async (data) => {
      try {
        const text = await data.text()
        if (text) {
          const comics_ = JSON.parse(text)?.data as ComicType[]
          if (comics_) {
            setComics(comics_)
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
              Orisha warz
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
                onPress={() => setOpenComicsPanel(!visible)}
              >
                <AntDesign name="close" size={18} color="#CF2C2C" />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        <ScrollView style={{ height: "100%", width: "100%" }}>
          <View style={{ padding: 12, gap: 16 }}>
            {/* <View style={{ position: "relative" }}>
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
                    style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}
                  >
                    Orisha Wars -
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
            </View> */}
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
              <AllComics
                comics={comics}
                setOpenEpisodesPanel={setOpenEpisodesPanel}
                openEpisodesPanel={openEpisodesPanel}
                handleSetComic={handleSetComic}
              />
            )}
          </View>
        </ScrollView>
      </View>

      {openEpisodesPanel && (
        <EpisodesPanel
          title={comic?.title || ""}
          visible={openEpisodesPanel}
          setOpenEpisodesPanel={setOpenEpisodesPanel}
          series_id={comic?.id || 0}
          apiKey={apiKey}
        />
      )}
    </>
  )
}

export default ComicsPanel
