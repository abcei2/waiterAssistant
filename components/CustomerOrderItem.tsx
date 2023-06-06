import tw from "twrnc";
import { useEffect, useState } from "react";
import { Modal, View, Text, Pressable, ScrollView } from "react-native";
import { SvgComponent } from "../icons";
import ProductFastSearch from "./ProductFastSearch";
import { CustomerOrderType } from "../types";

export default function CustomerOrderItem({
  updateCustomerOrder,
  currentSelectedProducts,
}: {
  updateCustomerOrder: (selectedProducts: CustomerOrderType[]) => void;
  currentSelectedProducts: CustomerOrderType[];
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<CustomerOrderType[]>(
    currentSelectedProducts
  );

  useEffect(() => {
    updateCustomerOrder(selectedProducts);
  }, [selectedProducts]);

  const updateSelectedProducts = (newSelectedProducts: CustomerOrderType[]) => {
    setSelectedProducts([...newSelectedProducts]);
  };

  const increaseProductAmount = (index: number) => {
    setSelectedProducts((prevSelectedProducts) => {
      const newSelectedProducts = [...prevSelectedProducts];
      newSelectedProducts[index].amount += 1;
      newSelectedProducts[index].subtotal += newSelectedProducts[index].price;
      return newSelectedProducts;
    });
  };

  const decreaseProductAmount = (index: number) => {
    setSelectedProducts((prevSelectedProducts) => {
      const newSelectedProducts = [...prevSelectedProducts];
      if (newSelectedProducts[index].amount === 1) {
        newSelectedProducts.splice(index, 1);
      } else {
        newSelectedProducts[index].amount -= 1;
        newSelectedProducts[index].subtotal -= newSelectedProducts[index].price;
      }
      return newSelectedProducts;
    });
  };

  const handleModalVisibility = (show: boolean) => {
    setIsVisible(show);
  };

  return (
    <>
      <Pressable
        onPress={() => handleModalVisibility(true)}
        style={tw`flex flex-row items-center gap-1 pl-2`}
      >
        <SvgComponent width="30px" />
        <Text style={tw`text-xl`}>Add product</Text>
      </Pressable>

      <ScrollView>
        <View
          style={tw`flex flex-row justify-around items-center px-4 py-2 gap-2`}
        >
          <ScrollView horizontal style={tw`w-[50%]`}>
            <Text style={tw`text-base font-semibold `}>NAME</Text>
          </ScrollView>
          <View style={tw`flex flex-row items-center gap-1`}>
            <Text style={tw`text-base font-semibold`}>AMOUNT</Text>
          </View>
          <Text style={tw`text-base font-semibold`}>SUBTOTAL</Text>
        </View>
        {selectedProducts.map((productInfo, index) => (
          <View
            key={index}
            style={tw`flex flex-row justify-around items-center px-4 py-2 `}
          >
            <ScrollView horizontal style={tw`max-w-[50%]`}>
              <Text style={tw`text-base font-semibold `}>
                {productInfo.name}
              </Text>
            </ScrollView>

            <View style={tw`flex flex-row items-center gap-2`}>
              <Pressable
                onPress={() => decreaseProductAmount(index)}
                style={tw`rounded-full bg-blue-300 w-[20px] h-[20px] text-base`}
              >
                <Text style={tw`text-center font-extrabold`}>-</Text>
              </Pressable>
              <Text style={tw`text-base font-semibold`}>
                {productInfo.amount}
              </Text>

              <Pressable
                onPress={() => increaseProductAmount(index)}
                style={tw`rounded-full bg-blue-300 w-[20px] h-[20px]`}
              >
                <Text style={tw`text-center font-extrabold`}>+</Text>
              </Pressable>
            </View>
            <Text style={tw`text-base font-semibold`}>
              ${productInfo.subtotal}
            </Text>
          </View>
        ))}
      </ScrollView>

      <Modal
        animationType={"fade"}
        onRequestClose={() => handleModalVisibility(false)}
        visible={isVisible}
      >
        <ProductFastSearch
          handleModalVisibility={handleModalVisibility}
          currentSelectedProducts={selectedProducts}
          updateSelectedProducts={updateSelectedProducts}
        />
      </Modal>
    </>
  );
}
