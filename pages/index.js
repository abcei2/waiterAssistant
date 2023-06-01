import tw from "twrnc";
import { ScrollView, Text, View } from "react-native";
import { SvgComponent } from "../icons";
import CustomerOrderItem from "../components/CustomerOrderItem";
import CustomerOrderAccordion from "../components/CustomerOrderAccordion";
import { useState } from "react";

export default function App() {
  const [customerTotalOrders, setCustomerTotalOrders] = useState([
    { subtotal: 0, tips: 0 },
    { subtotal: 0, tips: 0 },
  ]);

  const updateCustomerOrder = (index, customerProducts, tips = 5) => {
    setCustomerTotalOrders((prevCustomerTotalOrders) => {
      const newCustomerOrders = [...prevCustomerTotalOrders];
      newCustomerOrders[index] = {
        subtotal: customerProducts
          .map((prod) => prod.subtotal)
          .reduce((a, b) => a + b, 0),
        prodAmt: customerProducts
          .map((prod) => prod.amount)
          .reduce((a, b) => a + b, 0),
        tips,
      };
      return newCustomerOrders;
    });
  };

  return (
    <ScrollView style={tw`pt-10 bg-green-200 dark:bg-black absolute inset-0`}>
      <Text style={tw`text-2xl font-extrabold text-center`}>Mesa #1</Text>
      <View style={tw`flex flex-row items-center gap-1 pl-2`}>
        <SvgComponent />
        <Text style={tw`text-xl`}>New table's costumer</Text>
      </View>
      {customerTotalOrders.map((customerTotalOrder, index) => (
        <CustomerOrderAccordion
          title={`Customer #${index + 1}`}
          subtotal={customerTotalOrder.subtotal}
          tips={customerTotalOrder.tips}
          prodAmt={customerTotalOrder.prodAmt}
        >
          <CustomerOrderItem
            updateCustomerOrder={(customerProducts, tips) =>
              updateCustomerOrder(index, customerProducts, tips)
            }
          />
        </CustomerOrderAccordion>
      ))}
    </ScrollView>
  );
}
