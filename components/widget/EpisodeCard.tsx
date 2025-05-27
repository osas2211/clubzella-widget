import { View, Text, Image } from "react-native"
import React from "react"

// @ts-ignore
import noImage from "../../assets/images/widget/no-image.png"

const EpisodeCard = ({
  cover_img = "",
  episode = 0,
  title = "",
  series = 0,
  episode_number = 0,
}) => {
  return (
    <View style={{ gap: 5, width: "100%" }}>
      {cover_img ? (
        <Image
          src={cover_img}
          style={{
            height: 128,
            width: "100%",
            objectFit: "cover",
            borderRadius: 5,
          }}
          // loadingIndicatorSource={noImage}
        />
      ) : (
        <Image
          source={cover_img || noImage}
          style={{ height: 128, width: "100%" }}
          // loadingIndicatorSource={noImage}
        />
      )}
      <Text>
        <Text style={{ fontWeight: 600, fontSize: 11 }}>
          Episode {episode_number}:{" "}
        </Text>
        <Text style={{ fontSize: 10 }}>{title}</Text>
      </Text>
    </View>
  )
}

export default EpisodeCard
