import { View, Text, Image, TouchableOpacity, Animated } from "react-native"
import React, { useState } from "react"
import CircleText from "./CircularText"
import ReadNow from "./ReadNow"
import ComicsPanel from "./ComicsPanel"

const Widget = () => {
  const [openReadNow, setOpenReadNow] = useState(false)
  const [openComicsPanel, setOpenComicsPanel] = useState(false)
  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          zIndex: 1000,
          borderRadius: 50,
          justifyContent: "center",
          // alignItems: "center",
          position: "absolute",
          bottom: 20,
          right: 20,
          // width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ReadNow open={openReadNow} setOpenComicsPanel={setOpenComicsPanel} />
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => setOpenReadNow(!openReadNow)}
          >
            <CircleText />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {openComicsPanel && (
        <ComicsPanel
          visible={openComicsPanel}
          setOpenComicsPanel={setOpenComicsPanel}
        />
      )}
    </>
  )
}

export default Widget
