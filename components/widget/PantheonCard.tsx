import { View, Text, Image, StyleSheet } from "react-native"
import React from "react"
import { pantheonT } from "./types/pantheon"
import { EvilIcons } from "@expo/vector-icons"

const PantheonCard = ({ ...props }: pantheonT) => {
  const isLocked = props.locked
  return (
    <View style={{ gap: 5, width: "100%" }}>
      <View style={{ position: "relative" }}>
        <Image
          source={props.cover_image as any}
          style={{
            height: 120,
            width: "100%",
            objectFit: "cover",
            borderRadius: 5,
          }}
        />
        {isLocked && (
          <View style={styles.lockedStyle}>
            <EvilIcons name="lock" size={24} color="#fff" />
            <Text style={{ color: "#fff", fontSize: 10 }}>Coming Soon</Text>
          </View>
        )}
      </View>
      <Text>
        <Text style={{ fontSize: 10 }}>{props.title}</Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  lockedStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#000000B2",
    width: "100%",
    height: "100%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
})

export default PantheonCard
