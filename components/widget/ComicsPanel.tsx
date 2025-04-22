import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  Animated,
  Dimensions,
} from "react-native"
import React, { useEffect, useRef, useState } from "react"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import AntDesign from "@expo/vector-icons/AntDesign"

// @ts-ignore
import comics from "../../assets/images/widget/comics.jpg"

const { height } = Dimensions.get("window")

const ComicsPanel = ({
  visible = false,
  setOpenComicsPanel,
}: {
  setOpenComicsPanel: React.Dispatch<React.SetStateAction<boolean>>
  visible: boolean
}) => {
  const [expand, setExpand] = useState(false)
  const slideAnim = useRef(new Animated.Value(height)).current
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : height,
      duration: 300,
      useNativeDriver: true,
    })
  }, [visible])
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
          <Text style={{ color: "#CECCCC", fontSize: 12 }}>
            The Atlantean Chronicles
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <Pressable onPress={() => setExpand(!expand)}>
              <FontAwesome name="expand" size={18} color="#9C9A9A" />
            </Pressable>
            <Pressable onPress={() => setOpenComicsPanel(!visible)}>
              <AntDesign name="close" size={18} color="#CF2C2C" />
            </Pressable>
          </View>
        </View>
      </Animated.View>

      <ScrollView style={{ height: "100%", width: "100%" }}>
        <Image source={comics} style={{ width: "100%", height: 550 }} />
      </ScrollView>
    </View>
  )
}

export default ComicsPanel
