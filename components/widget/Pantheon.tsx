import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import React from "react"
import { orisha_pantheon } from "./constants/pantheon"
import PantheonCard from "./PantheonCard"
import { pantheonT } from "./types/pantheon"

const Pantheon = ({
  handleSetPantheon,
  openInPantheonPanel,
  setOpenInPantheonPanel,
}: {
  handleSetPantheon: (pantheon: pantheonT) => void
  setOpenInPantheonPanel: React.Dispatch<React.SetStateAction<boolean>>
  openInPantheonPanel: boolean
}) => {
  return (
    <View
      style={{
        gap: 10,
        paddingBottom: 20,
        padding: 12,
        paddingRight: 0,
        paddingTop: 0,
      }}
    >
      <Text style={{ fontWeight: 600 }}>Orisha Pantheon</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 5,
          paddingRight: 10,
        }}
      >
        <FlatList
          data={orisha_pantheon}
          horizontal={true}
          renderItem={({ index, item: pantheon }) => {
            return (
              <TouchableOpacity
                activeOpacity={pantheon?.locked ? 1 : 0.5}
                key={index}
                style={{ width: 100, marginRight: 10 }}
                onPress={() => {
                  if (!pantheon.locked) {
                    handleSetPantheon(pantheon)
                    setOpenInPantheonPanel(!openInPantheonPanel)
                  }
                }}
              >
                <PantheonCard {...pantheon} />
              </TouchableOpacity>
            )
          }}
        />
      </View>
    </View>
  )
}

export default Pantheon

const styles = StyleSheet.create({})
