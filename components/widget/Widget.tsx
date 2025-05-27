import { View, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import CircleText from "./CircularText"
import ReadNow from "./ReadNow"
import ComicsPanel from "./ComicsPanel"
import { Dimensions } from "react-native"
import { useFonts } from "expo-font"
import EpisodesPanel from "./EpisodesPanel"
const screen = Dimensions.get("screen")

const Widget = ({ apiKey }: { apiKey: string }) => {
  const [openReadNow, setOpenReadNow] = useState(false)
  const [openComicsPanel, setOpenComicsPanel] = useState(false)
  // const mamaKiloUrl = new URL(
  //   "../../assets/fonts/MamaKilo Decorative.otf",
  //   import.meta.url
  // )
  const [loaded, error] = useFonts({
    MamaKilo: require("../../assets/fonts/MamaKilo_Decorative.otf"),
  })

  return (
    <>
      {!loaded && !error ? (
        <></>
      ) : (
        <>
          {apiKey && (
            <>
              <View
                style={{
                  zIndex: 1000,
                  width: !openReadNow ? 110 : screen.width,
                  position: "absolute",
                  bottom: 20,
                  right: 15,
                  paddingLeft: 30,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {openReadNow && (
                    <ReadNow
                      // open={openReadNow}
                      open={false}
                      setOpenComicsPanel={setOpenComicsPanel}
                    />
                  )}
                  <TouchableOpacity
                    activeOpacity={0.6}
                    // onPress={() => setOpenReadNow(!openReadNow)}
                    onPress={() => setOpenComicsPanel(!openComicsPanel)}
                  >
                    <CircleText />
                  </TouchableOpacity>
                </View>
              </View>
              {/* {openComicsPanel && (
                <ComicsPanel
                  visible={openComicsPanel}
                  setOpenComicsPanel={setOpenComicsPanel}
                  apiKey={apiKey}
                />
              )} */}
              {openComicsPanel && (
                <EpisodesPanel
                  title={"ORISHA WARZ"}
                  visible={openComicsPanel}
                  setOpenEpisodesPanel={setOpenComicsPanel}
                  series_id={0}
                  apiKey={apiKey}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  )
}

export default Widget
