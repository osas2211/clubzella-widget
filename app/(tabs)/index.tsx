// import Widget from "@/components/widget/Widget"
import { Image, StyleSheet, Platform, View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Widget } from "clubzella-comic-test-v1"

export default function HomeScreen() {
  return (
    <SafeAreaView edges={["top"]}>
      <View style={{ height: "100%", padding: 20, backgroundColor: "#fff" }}>
        <Text style={{ fontSize: 25 }}>Home</Text>
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
