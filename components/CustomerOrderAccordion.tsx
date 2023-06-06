import tw from "twrnc";
import { useState } from "react";
import { Pressable, Text, View, TextInput } from "react-native";
import { SvgComponent } from "../icons";
import { CustomerTotalOrderType } from "../types";
import { MAX_TIP } from "../constants";

const CustomerOrderAccordion = ({
  title,
  children,
  customerTotalOrder,
  updateTips,
  removeCustomer,
}: {
  title: string;
  children: React.ReactNode;
  updateTips: (tips: number) => void;
  customerTotalOrder: CustomerTotalOrderType;
  removeCustomer: () => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const { itemsCount, subtotal, tips } = customerTotalOrder;
  const [tipsAmount, setTipsAmount] = useState(tips);

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
          <View style={tw`text-lg font-semibold flex-row`}>
            <Text style={tw`text-lg font-semibold`}>Tips: $</Text>
            <TextInput
              value={tipsAmount ? tipsAmount.toString() : "0"}
              onChangeText={(text) => {
                const newTips = Number(text) > MAX_TIP ? MAX_TIP : Number(text);
                setTipsAmount(newTips);
                updateTips(newTips);
              }}
              inputMode="numeric"
              style={tw`rounded-lg text-center text-lg font-semibold w-8 bg-white`}
            />
            <Text style={tw`text-lg font-semibold`}> | </Text>
          </View>
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
