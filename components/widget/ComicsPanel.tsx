import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  Animated,
  Dimensions,
  TouchableOpacity,
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

const { height } = Dimensions.get("window")

const ComicsPanel = ({
  visible = false,
  setOpenComicsPanel,
}: {
  setOpenComicsPanel: React.Dispatch<React.SetStateAction<boolean>>
  visible: boolean
}) => {
  const [expand, setExpand] = useState(false)
  const [openInComicsPanel, setOpenInComicsPanel] = useState(false)
  const [comic, setComic] = useState({
    cover_img:
      "https://res.cloudinary.com/osaretinfrank/image/upload/v1745843590/m9ee8g5nmdcsyny7f4qt.png",
    episode: 3,
    title: "The return of Sango",
    series: 1,
  })

  const handleSetComic = (comic: any) => {
    setComic(comic)
  }

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
            </View>
            <NewReleases
              handleSetComic={handleSetComic}
              openInComicsPanel={openInComicsPanel}
              setOpenInComicsPanel={setOpenInComicsPanel}
            />
          </View>
        </ScrollView>
      </View>

      {openInComicsPanel && (
        <InComicsPanel
          title={comic?.title}
          visible={openInComicsPanel}
          setOpenInComicsPanel={setOpenInComicsPanel}
        />
      )}
    </>
  )
}

export default ComicsPanel
