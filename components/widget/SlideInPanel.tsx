import React, { useRef, useEffect, ReactNode } from "react"
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native"

const { width } = Dimensions.get("window")

export default function SlideInPanel({
  visible = false,
  children,
}: {
  visible?: boolean
  children: ReactNode
  component_width?: string
}) {
  const slideAnim = useRef(new Animated.Value(width)).current
  const opacityAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : width,
      duration: 300,
      useNativeDriver: true,
    }).start()
    Animated.timing(opacityAnim, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [visible])

  return (
    <Animated.View
      style={[
        styles.panel,
        {
          transform: [{ translateX: slideAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      {children}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  panel: {
    // position: "absolute",
    width: "73%",
    zIndex: 1000,
  },
})
