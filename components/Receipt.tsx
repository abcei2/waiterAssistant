import { View, Text } from "react-native";
import tw from "twrnc";
import { CustomerTotalOrderType } from "../types";

const Receipt = ({
  customerTotalOrders,
}: {
  customerTotalOrders: CustomerTotalOrderType[];
}) => {
  const total = customerTotalOrders.reduce(
    (acc, curr) => acc + curr.subtotal,
    0
  );
  const totalTips = customerTotalOrders.reduce(
    (acc, curr) => acc + curr.tips,
    0
  )
  return (
    <View style={tw`bg-white rounded-lg p-4`}>
      <Text style={tw`text-2xl font-extrabold text-center`}>Receipt</Text>
      <View>
        <Text style={tw`text-base font-semibold`}>Total: ${total}</Text>
        <Text style={tw`text-base font-semibold`}>Tips: ${totalTips}</Text>
        <Text style={tw`text-base font-semibold`}>Total + Tips: ${totalTips + total}</Text>
      </View>
      {customerTotalOrders.map((customerTotalOrder, index) => (
        <View key={index} style={tw`rounded-lg border bg-gray-200`}>
          <View style={tw`w-full text-center rounded-t-lg`}>
            <Text style={tw`text-base font-semibold`}>Customer #{index+1}</Text>
          </View>
          <View
            style={tw`flex flex-row justify-between px-2 bg-white rounded-b-lg`}
          >
            <Text style={tw`text-base font-semibold`}>Tips: ${customerTotalOrder.tips}</Text>
            <Text style={tw`text-base font-semibold`}>Subtotal: ${customerTotalOrder.subtotal}</Text>
            <Text style={tw`text-base font-semibold`}>Items: {customerTotalOrder.itemsCount}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Receipt;
