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
import Ionicons from "@expo/vector-icons/Ionicons"
import AntDesign from "@expo/vector-icons/AntDesign"
import { ComicType } from "./types/comics"
import EpisodesPanel from "./EpisodesPanel"
import AllComics from "./AllComics"
import { API_URL } from "./constants/API_URL"

const { height, width } = Dimensions.get("window")

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
            alignItems: "center",
            position: "absolute",
            bottom: 20,
            right: 15,
            width: width - 30,
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
                fontSize: 25,
                lineHeight: 25,
                fontFamily: "MamaKilo",
                textTransform: "uppercase",
              }}
            >
              Orisha warz
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
                onPress={() => setOpenComicsPanel(!visible)}
              >
                <AntDesign name="close" size={24} color="#FF4D52" />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        <ScrollView style={{ height: "100%", width: "100%" }}>
          <View style={{ padding: 12, gap: 16 }}>
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
