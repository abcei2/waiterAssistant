import tw from "twrnc";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

const CustomerOrderAccordion = ({
  title,
  children,
  tips,
  subtotal,
  prodAmt,
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Pressable
      style={tw`mx-2 my-1 border rounded-lg `}
      onPress={() => setExpanded(!expanded)}
    >
      <View style={tw`flex flex-row justify-between w-full px-4`}>
        <Text style={tw`text-lg font-semibold`}>{title} </Text>
        <Text style={tw`text-lg font-semibold`}>{expanded ? "-" : "+"}</Text>
      </View>
      <View style={tw`flex flex-row w-full px-4 justify-center`}>
        <Text style={tw`text-lg font-semibold`}>Tips: {tips} | </Text>
        <Text style={tw`text-lg font-semibold`}>Subtotal: {subtotal} | </Text>
        <Text style={tw`text-lg font-semibold`}>Items: {prodAmt} </Text>
      </View>
      <View
        style={tw`px-4 overflow-hidden ${
          expanded ? "max-h-[250px]" : "max-h-[0px]"
        }`}
      >
        {children}
      </View>
    </Pressable>
  );
};

export default CustomerOrderAccordion;
