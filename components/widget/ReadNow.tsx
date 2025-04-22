import { View, Text, TouchableOpacity } from "react-native"
import React from "react"
import SlideInPanel from "./SlideInPanel"
import { Image } from "react-native"

// @ts-ignore
import cover from "../../assets/images/widget/cover.png"

const ReadNow = ({
  open = false,
  setOpenComicsPanel,
}: {
  open: boolean
  setOpenComicsPanel: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <SlideInPanel visible={open}>
      <View style={{ width: "100%" }}>
        <View
          style={{
            minHeight: 55,
            backgroundColor: "#4F4F4FCC",
            width: "100%",
            borderRadius: 10,
            padding: 8,
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 6,
              alignItems: "center",
              height: "100%",
              maxWidth: "60%",
            }}
          >
            <Image
              source={cover}
              style={{ height: "100%", width: 37, borderRadius: 5 }}
            />
            <View>
              <Text style={{ fontSize: 11, color: "#fff", fontWeight: 600 }}>
                Episode 3
              </Text>
              <Text style={{ fontSize: 11, color: "#CECCCC" }}>
                The Atlantean Chronicles
              </Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              padding: 4,
              borderRadius: 5,
              backgroundColor: "#CF7D2C",
            }}
            onPress={() => setOpenComicsPanel(true)}
          >
            <Text style={{ fontSize: 10, color: "#fff" }}>Read now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SlideInPanel>
  )
}

export default ReadNow
