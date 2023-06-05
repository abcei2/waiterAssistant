import tw from "twrnc";
import { Pressable, ScrollView, Text } from "react-native";
import { SvgComponent } from "../icons";
import CustomerOrderItem from "../components/CustomerOrderItem";
import CustomerOrderAccordion from "../components/CustomerOrderAccordion";
import { useState } from "react";
import { CustomerOrderType, CustomerTotalOrderType } from "../types";

export default function Table() {
  const [customerTotalOrders, setCustomerTotalOrders] = useState<CustomerTotalOrderType[]>([]);

  const updateCustomerOrder = (index:number, customerProducts:CustomerOrderType[], tips = 5) => {
    setCustomerTotalOrders((prevCustomerTotalOrders) => {
      const newCustomerOrders = [...prevCustomerTotalOrders];
      newCustomerOrders[index] = {
        subtotal: customerProducts
          .map((prod) => prod.subtotal)
          .reduce((a, b) => a + b, 0),
        itemsCount: customerProducts
          .map((prod) => prod.amount)
          .reduce((a, b) => a + b, 0),
        tips,
      };
      return newCustomerOrders;
    });
  };

  const newCustomer = () => {
    setCustomerTotalOrders((prevCustomerTotalOrders) => [
      ...prevCustomerTotalOrders,
      { subtotal: 0, tips: 0, itemsCount: 0, price: 0, name: "", id: 0 },
    ]);
  };

  const removeCustomer = (index:number) => {
    setCustomerTotalOrders((prevCustomerTotalOrders) => {
      const newCustomerOrders = [...prevCustomerTotalOrders];
      newCustomerOrders.splice(index, 1);
      return newCustomerOrders;
    });
  };

  return (
    <ScrollView style={tw`pt-10 bg-green-200 dark:bg-black absolute inset-0`}>
      <Text style={tw`text-2xl font-extrabold text-center`}>Mesa #1</Text>
      <Pressable
        onPress={newCustomer}
        style={tw`flex flex-row items-center gap-1 pl-2`}
      >
        <SvgComponent />
        <Text style={tw`text-xl`}>{"New table's costumer"}</Text>
      </Pressable>
      {customerTotalOrders.map((customerTotalOrder, index) => (
        <CustomerOrderAccordion
          key={index}
          title={`Customer #${index + 1}`}
          customerTotalOrder={customerTotalOrder}          
          removeCustomer={() => removeCustomer(index)}
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
