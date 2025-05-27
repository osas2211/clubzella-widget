import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native"
import React, { useState } from "react"
import Ionicons from "@expo/vector-icons/Ionicons"
import AntDesign from "@expo/vector-icons/AntDesign"
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons"
import { pantheonT } from "./types/pantheon"

const { height, width } = Dimensions.get("screen")

const InPantheonPanel = ({
  visible = false,
  setOpenInPantheonPanel,
  title,
  apiKey,
  pantheon,
}: {
  setOpenInPantheonPanel: React.Dispatch<React.SetStateAction<boolean>>
  visible: boolean
  title?: string
  apiKey: string
  pantheon: pantheonT
}) => {
  const [expand, setExpand] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

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
          right: 15,
          width: width - 30,
          // height: 140,
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
            {title}
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
              onPress={() => setOpenInPantheonPanel(!visible)}
            >
              <AntDesign name="close" size={24} color="#FF4D52" />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <View style={{ height: "100%", width: "100%" }}>
        <ImageBackground
          source={require("../../assets/images/widget/pantheon/pantheon-bg.jpg")}
          style={{
            width: "100%",
            height: "99%",
            position: "absolute",
            borderEndEndRadius: 100,
          }}
        />

        <TouchableOpacity
          style={{
            padding: 10,
            paddingBottom: 12,
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
          onPress={() => setOpenInPantheonPanel(!visible)}
        >
          <SimpleLineIcons name="arrow-left" size={18} color="#fff" />
          <Text style={{ color: "#fff" }}>Back to menu</Text>
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
            <ScrollView>
              <View style={{ gap: 30, padding: 12, marginBottom: 20 }}>
                <View
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={pantheon.cover_image as any}
                    style={{ height: 250, width: "60%", objectFit: "contain" }}
                  />
                </View>
                <View style={{ gap: 10 }}>
                  <Text style={styles.label}>
                    <Text style={styles.bold}>Power:</Text> {pantheon?.power}
                  </Text>

                  <Text style={styles.label}>
                    <Text style={styles.bold}>Last seen:</Text>{" "}
                    {pantheon?.lastSeen}
                  </Text>

                  <Text style={styles.label}>
                    <Text style={styles.bold}>Category:</Text>
                    {"  "}
                    {pantheon?.category}
                  </Text>

                  <Text style={styles.label}>
                    <Text style={styles.bold}>Personality:</Text>
                    {pantheon?.personality}
                  </Text>

                  <Text style={styles.label}>
                    <Text style={styles.bold}>Backstory:</Text>{" "}
                    {pantheon?.backstory}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    color: "#CECCCC",
    fontSize: 14,
    lineHeight: 22,
  },
  bold: {
    fontWeight: "bold",
    color: "#fff",
  },
})

export default InPantheonPanel
