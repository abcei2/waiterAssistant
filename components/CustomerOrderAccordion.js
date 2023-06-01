import tw from 'twrnc';
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

const CustomerOrderAccordion = ({ title, children, amount, subtotal }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={{}}>
      <Pressable
        style={tw`flex flex-row justify-between items-center px-4 py-2`}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={tw`text-xl font-semibold`}>{title}</Text>
        <Text style={tw`text-xl font-semibold`}>{title}</Text>
        <Text style={tw`text-xl font-semibold`}>{expanded ? "-" : "+"}</Text>
      </Pressable>
      {expanded && <View style={tw`px-4 py-2`}>{children}</View>}
    </View>
  );
};

export default CustomerOrderAccordion;