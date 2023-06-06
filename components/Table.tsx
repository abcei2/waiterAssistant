import tw from "twrnc";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SvgComponent } from "../icons";
import CustomerOrderItem from "../components/CustomerOrderItem";
import CustomerOrderAccordion from "../components/CustomerOrderAccordion";
import { useState } from "react";
import { CustomerOrderType, CustomerTotalOrderType } from "../types";
import Receipt from "./Receipt";

export default function Table() {
  const [showReceipt, setShowReceipt] = useState(false);
  const [customerTotalOrders, setCustomerTotalOrders] = useState<
    CustomerTotalOrderType[]
  >([]);

  const updateTips = (index: number, tips: number) => {
    setCustomerTotalOrders((prevCustomerTotalOrders) => {
      const newCustomerOrders = [...prevCustomerTotalOrders];
      newCustomerOrders[index] = {
        ...newCustomerOrders[index],
        tips: tips,
      };
      return newCustomerOrders;
    });
  };

  const updateCustomerOrder = (
    index: number,
    customerProducts: CustomerOrderType[]
  ) => {
    setCustomerTotalOrders((prevCustomerTotalOrders) => {
      const newCustomerOrders = [...prevCustomerTotalOrders];
      newCustomerOrders[index] = {
        subtotal: customerProducts
          .map((prod) => prod.subtotal)
          .reduce((a, b) => a + b, 0),
        itemsCount: customerProducts
          .map((prod) => prod.amount)
          .reduce((a, b) => a + b, 0),
        tips: newCustomerOrders[index].tips,
        customerSummary: customerProducts,
      };
      return newCustomerOrders;
    });
  };

  const newCustomer = () => {
    setCustomerTotalOrders((prevCustomerTotalOrders) => [
      ...prevCustomerTotalOrders,
      {
        subtotal: 0,
        tips: 0,
        itemsCount: 0,
        price: 0,
        name: "",
        id: 0,
        customerSummary: [],
      },
    ]);
  };

  const removeCustomer = (index: number) => {
    setCustomerTotalOrders((prevCustomerTotalOrders) => {
      const newCustomerOrders = [...prevCustomerTotalOrders];
      newCustomerOrders.splice(index, 1);
      return newCustomerOrders;
    });
  };

  return (
    <View style={tw`pt-10 bg-green-200 flex items-center absolute inset-0`}>
      <ScrollView style={tw`w-full md:w-[60%]`}>
        <Text style={tw`text-2xl font-extrabold text-center md:pb-4`}>Table #1</Text>
        <View style={tw` w-full flex-row justify-between gap-2 px-2`}>
          <Pressable
            onPress={showReceipt ? () => setShowReceipt(false) : newCustomer}
            style={tw`flex flex-row items-center gap-1 `}
          >
            <SvgComponent icon={showReceipt ? "back" : "add"} />
            <Text style={tw`text-xl`}>
              {showReceipt ? "Back" : "New costumer"}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setShowReceipt(true)}
            style={tw`flex flex-row items-center gap-1 `}
          >
            <SvgComponent icon="download" />
            <Text style={tw`text-xl`}>{"Receipt"}</Text>
          </Pressable>
        </View>
        {showReceipt ? (
          <Receipt customerTotalOrders={customerTotalOrders} />
        ) : (
          <>
            {customerTotalOrders.map((customerTotalOrder, index) => (
              <CustomerOrderAccordion
                key={index}
                title={`Customer #${index + 1}`}
                customerTotalOrder={customerTotalOrder}
                updateTips={(tips: number) => updateTips(index, tips)}
                removeCustomer={() => removeCustomer(index)}
              >
                <CustomerOrderItem
                  currentSelectedProducts={customerTotalOrder.customerSummary}
                  updateCustomerOrder={(customerProducts) =>
                    updateCustomerOrder(index, customerProducts)
                  }
                />
              </CustomerOrderAccordion>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}
