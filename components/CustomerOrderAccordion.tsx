import tw from "twrnc";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SvgComponent } from "../icons";
import { CustomerTotalOrderType } from "../types";

const CustomerOrderAccordion = ({
  title,
  children,
  customerTotalOrder,
  removeCustomer
}:{
  title: string;
  children: React.ReactNode;
  customerTotalOrder: CustomerTotalOrderType
  removeCustomer: () => void;  
}) => {
  const [expanded, setExpanded] = useState(false);
  const { itemsCount, subtotal, tips } = customerTotalOrder;
  return (
    <Pressable
      style={tw`mx-2 my-1 border rounded-lg px-1 py-2 flex gap-2`}
      onPress={() => setExpanded(!expanded)}
    >
      <Pressable onPress={() => setExpanded(!expanded)}>
        <View style={tw`flex flex-row justify-between w-full px-4`}>
          <Text style={tw`text-lg font-semibold`}>{title} </Text>
          <Pressable onPress={() => removeCustomer()}>
            <SvgComponent width="30px" icon="trash" />
          </Pressable>
          <Text style={tw`text-lg font-semibold`}>{expanded ? "-" : "+"}</Text>
        </View>
        <View style={tw`flex flex-row w-full px-4 justify-center`}>
          <Text style={tw`text-lg font-semibold`}>Tips: ${tips} | </Text>
          <Text style={tw`text-lg font-semibold`}>
            Subtotal: ${subtotal} |{" "}
          </Text>
          <Text style={tw`text-lg font-semibold`}>Items: {itemsCount} </Text>
        </View>
      </Pressable>
      <View
        style={tw`px-4 overflow-hidden ${
          expanded ? "max-h-[400px]" : "max-h-[0px]"
        }`}
      >
        {children}
      </View>
    </Pressable>
  );
};

export default CustomerOrderAccordion;
