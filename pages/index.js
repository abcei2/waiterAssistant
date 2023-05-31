import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import NavBar from "../components/NavBar";
import { SvgComponent } from "../icons";
import tw from 'twrnc';

const Accordion = ({ title, children }) => {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <View style={tw`border border-gray-400 rounded-md`}>
      <Pressable
        style={tw`flex flex-row justify-between items-center px-4 py-2`}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={tw`text-xl font-semibold`}>{title}</Text>
        <Text style={tw`text-xl font-semibold`}>{expanded ? "-" : "+"}</Text>
      </Pressable>
      {expanded && (
        <View style={tw`px-4 py-2`}>{children}</View>
      )}
    </View>
  );
};
export default function App() {
  const [amount, setAmount] = React.useState(0);
  return (
    <View style={tw`pt-10 bg-green-200 dark:bg-black absolute inset-0`}>
      <Text style={tw`text-2xl font-extrabold text-center`}>Mesa #1</Text>
      <View style={tw`flex flex-row items-center gap-1 pl-2`}>
        <SvgComponent/><Text style={tw`text-xl`}>New table's costumer</Text>
      </View>
      <Accordion title="Entradas">
        <SvgComponent/><Text style={tw`text-xl`}>Add item</Text>
      </Accordion>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  text: {
    fontSize: 16,
  },
});
