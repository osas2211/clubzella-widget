import {
  View,
  Text,
  ScrollView,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native"
import React, { useEffect, useRef, useState } from "react"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import AntDesign from "@expo/vector-icons/AntDesign"
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons"

// @ts-ignore
import comics from "../../assets/images/widget/comics.jpg"

const InComicsPanel = ({
  visible = false,
  setOpenInComicsPanel,
  title,
}: {
  setOpenInComicsPanel: React.Dispatch<React.SetStateAction<boolean>>
  visible: boolean
  title?: string
}) => {
  const [expand, setExpand] = useState(true)

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
              onPress={() => setOpenInComicsPanel(!visible)}
            >
              <AntDesign name="close" size={18} color="#CF2C2C" />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <ScrollView style={{ height: "100%", width: "100%" }}>
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
          <Text>Back to comics</Text>
        </TouchableOpacity>
        <Image source={comics} style={{ width: "100%", height: 550 }} />
      </ScrollView>
    </View>
  )
}

export default InComicsPanel
