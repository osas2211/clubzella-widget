import React, { useEffect, useRef } from "react"
import { View, Text, StyleSheet, Image, Animated, Easing } from "react-native"
// @ts-ignore
import club_zella_logo from "../../assets/images/widget/clubzella-logo.png"

const circleText = "Episode 2 of Orisha wars is out - Read now - "
const radius = 40 // Radius of the circle
const center = radius // Center x & y
const avatarSize = 50

export default function CircleText() {
  const rotation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start()
  }, [])

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })
  return (
    <View style={styles.container}>
      {/* Avatar */}
      <View
        style={{
          width: avatarSize,
          height: avatarSize,
          borderRadius: avatarSize / 2,
          position: "absolute",
          top: center - avatarSize / 2,
          left: center - avatarSize / 2,
          zIndex: 10,
          backgroundColor: "#343434",
          justifyContent: "center",

          // marginLeft: -2,
        }}
      >
        <Image source={club_zella_logo} style={{ height: 30, width: 40 }} />
      </View>

      <Animated.View
        style={[
          styles.textRing,
          {
            transform: [{ rotate: rotateInterpolate }],
          },
        ]}
      >
        {/* Circular Text */}
        {circleText.split("").map((char, i, arr) => {
          const angle = (i / arr.length) * 2 * Math.PI
          const x = center + radius * Math.cos(angle) - 3
          const y = center + radius * Math.sin(angle) - 4

          const rotate = (angle * 180) / Math.PI + 90 // Rotate letter toward the circle

          return (
            <Text
              key={i}
              style={{
                position: "absolute",
                left: x,
                top: y,
                transform: [{ rotate: `${rotate}deg` }],
                fontSize: 8,
                color: "#CF7D2C",
                fontWeight: "bold",
              }}
            >
              {char}
            </Text>
          )
        })}
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: radius * 2,
    height: radius * 2,
    alignSelf: "center",
  },
  avatar: {
    height: avatarSize,
    width: avatarSize,
    backgroundColor: "#343434",
    zIndex: 1000,
    borderRadius: avatarSize,
    justifyContent: "center",
    // alignItems: "center",
  },
  textRing: {
    position: "absolute",
    width: radius * 2,
    height: radius * 2,
  },
})
