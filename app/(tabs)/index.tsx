import { Image, StyleSheet, Platform, View, Text } from "react-native"
import Widget from "@/components/widget/Widget"
import { SafeAreaView } from "react-native-safe-area-context"

export default function HomeScreen() {
  return (
    <SafeAreaView edges={["top"]}>
      <View style={{ height: "100%", padding: 20, backgroundColor: "#fff" }}>
        <Text style={{ fontSize: 25 }}>Home</Text>
        <Widget apiKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl9uYW1lIjoiRnJhbmsiLCJjYXRlZ29yeSI6ImNvbWljcyIsInR5cGUiOiJtZXJjaGFudFRva2VuIiwiaWF0IjoxNzQ2NDg1NTE5fQ.9laLv4D617vzihTAZuoBtfVZ7K8jTaxzWboOpJg5y3g" />
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
