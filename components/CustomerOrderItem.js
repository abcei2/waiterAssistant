import tw from "twrnc";
import { useEffect, useState } from "react";
import { Modal, View, Text, Pressable, ScrollView } from "react-native";
import { SvgComponent } from "../icons";
import ProductFastSearch from "./ProductFastSearch";

export default function CustomerOrderItem({updateCustomerOrder}) {
  const [isVisible, setIsVisible] = useState(false);
  const [productsInfo, setProductsInfo] = useState([
    { name: "Coca Cola", amount: 2, subtotal: 20, price: 10 },
    { name: "Coca Cola", amount: 2, subtotal: 20, price: 10 },
    { name: "Coca Cola", amount: 2, subtotal: 20, price: 10 },
    { name: "Coca Cola", amount: 2, subtotal: 20, price: 10 },
    { name: "Coca Cola", amount: 2, subtotal: 20, price: 10 },
    { name: "Coca Cola", amount: 2, subtotal: 20, price: 10 },
    { name: "Coca Cola", amount: 2, subtotal: 20, price: 10 },
  ]);

  useEffect(() => {
    updateCustomerOrder(productsInfo, 5);
  }, [productsInfo]);

  // const addCustomerProduct = (index, customerProducts, tips=5) => {
  //   setCustomerTotalOrders((prevCustomerTotalOrders) => {
  //     const newCustomerOrders = [...prevCustomerTotalOrders];
  //     newCustomerOrders[index] = {
  //       subtotal: customerProducts.map((prod) => prod.subtotal).reduce((a, b) => a + b),
  //       prodAmt: customerProducts.map((prod) => prod.amount).reduce((a, b) => a + b),
  //       tips,
  //     };
  //     return newCustomerOrders;
  //   });
  // };
  const increaseProductAmount = (index) => {
    setProductsInfo((prevProductsInfo) => {
      const newProductsInfo = [...prevProductsInfo];
      newProductsInfo[index].amount += 1;
      newProductsInfo[index].subtotal += newProductsInfo[index].price;
      return newProductsInfo;
    })
  };
  const decreaseProductAmount = (index) => {
    setProductsInfo((prevProductsInfo) => {
      const newProductsInfo = [...prevProductsInfo];
      if(newProductsInfo[index].amount === 1) {
        newProductsInfo.splice(index, 1) 
      }else{
        newProductsInfo[index].amount -= 1;
        newProductsInfo[index].subtotal -= newProductsInfo[index].price;
      }
      return newProductsInfo;
    })
  };


  return (
    <>
      <Pressable
        onPress={() => setIsVisible(true)}
        style={tw`flex flex-row items-center gap-1 pl-2`}
      >
        <SvgComponent width="30px" />
        <Text style={tw`text-xl`}>Add product</Text>
      </Pressable>

      <ScrollView>
        {productsInfo.map((prodAndAmount, index) => (
          <View
            key={index}
            style={tw`flex flex-row justify-between items-center px-4 py-2`}
          >
            <Text style={tw`text-xl font-semibold`}>{prodAndAmount.name}</Text>

            <View style={tw`flex flex-row items-center gap-1`}>
              <Pressable onPress={()=>decreaseProductAmount(index)} style={tw`rounded-full bg-blue-300 w-[20px] h-[20px] text-lg`}>
                <Text style={tw`text-center font-extrabold`}>-</Text>
              </Pressable>
              <Text style={tw`text-xl font-semibold`}>
                {prodAndAmount.amount}
              </Text>

              <Pressable onPress={()=>increaseProductAmount(index)} style={tw`rounded-full bg-blue-300 w-[20px] h-[20px]`}>
                <Text style={tw`text-center font-extrabold`}>+</Text>
              </Pressable>
            </View>
            <Text style={tw`text-xl font-semibold`}>
              {prodAndAmount.subtotal}
            </Text>
          </View>
        ))}
      </ScrollView>

      <Modal
        animationType={"fade"}
        onRequestClose={() => setIsVisible(false)}
        visible={isVisible}
      >
        <View style={tw`pt-2 px-1 flex gap-3`}>
          <View style={tw`flex gap-3`}>
            <Pressable
              style={tw`px-2 py-1 bg-black rounded-lg wAuto w-[50px]`}
              onPress={() => setIsVisible(false)}
            >
              <Text style={tw`text-white`} resizeMode="contain">
                Back
              </Text>
            </Pressable>
          </View>
          <ProductFastSearch />
        </View>
      </Modal>
    </>
  );
}
