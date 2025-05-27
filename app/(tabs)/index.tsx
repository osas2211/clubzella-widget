import { Image, StyleSheet, Platform, View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
// import { Widget } from "clubzella-comic-test-v1"
import Widget from "@/components/widget/Widget"
import { Dimensions } from "react-native"
const screen = Dimensions.get("screen")

export default function HomeScreen() {
  return (
    <SafeAreaView edges={["top"]}>
      <View
        style={{
          // height: screen.height,
          height: "100%",
          padding: 20,
          backgroundColor: "#fff",
          width: screen.width,
        }}
      >
        <Text style={{ fontSize: 25 }}>Home</Text>
        <Widget apiKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl9uYW1lIjoiSm9sbG9mIFN0dWRpbyIsImNhdGVnb3J5IjoiY29taWNzIiwidHlwZSI6Im1lcmNoYW50VG9rZW4iLCJpYXQiOjE3NDY1NTcwMDl9.GoRh9v-Wq2H5vEStMpEwhSQQoWTOsT_sEjHZdMv6G4Y" />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
})
