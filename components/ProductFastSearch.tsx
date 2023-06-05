import tw from "twrnc";
import { useState } from "react";
import { View, TextInput, ScrollView, Pressable, Text } from "react-native";
import { WAITER_MENU } from "../constants";
import ProductItem from "./ProductItem";
import { CustomerOrderType, ProductsType } from "../types";

const ProductFastSearch = ({
  handleModalVisibility,
  updateSelectedProducts,
  currentSelectedProducts = [],
}: {
  handleModalVisibility: (show: boolean) => void;
  updateSelectedProducts: (selectedProducts: any) => void;
  currentSelectedProducts?: CustomerOrderType[];
}) => {
  const [unselectedProducts, setUnselectedProducts] = useState<ProductsType[]>(
    WAITER_MENU.filter(
      (item) =>
        !currentSelectedProducts.find(
          (currentSelectedProducts) => currentSelectedProducts.id === item.id
        )
    )
  );

  const [currentOrder, setCurrentOrder] = useState<CustomerOrderType[]>(
    currentSelectedProducts
  );

  const onChangeSearch = (currentText: string) => {
    if (currentText.length > 0) {
      setUnselectedProducts(
        WAITER_MENU.filter((item) =>
          item.name.toLowerCase().includes(currentText.toLowerCase())
        )
      );
    } else {
      setUnselectedProducts(WAITER_MENU);
    }
  };

  const onAmountChange = (productId: number, newAmount: number) => {
    const currentOrderCopy = [...currentOrder];
    const index = currentOrderCopy.findIndex((item) => item.id === productId);
    if (index !== -1) {
      if (newAmount === 0) {
        currentOrderCopy.splice(index, 1);
      } else {
        currentOrderCopy[index].amount = newAmount;
        currentOrderCopy[index].subtotal =
          currentOrderCopy[index].price * newAmount;
      }
      setCurrentOrder(currentOrderCopy);
    }
  };

  const saveSelectionAndClose = () => {
    updateSelectedProducts(currentOrder);
    handleModalVisibility(false);
  };
  
  return (
    <View style={tw`pt-2 px-1 flex gap-3`}>
      <View style={tw`flex flex-row gap-3 justify-between px-1`}>
        <Pressable
          style={tw`flex items-center justify-center p-2 bg-black rounded-lg w-[50px]`}
          onPress={() => handleModalVisibility(false)}
        >
          <Text style={tw`text-white `}>Back</Text>
        </Pressable>
        <Pressable
          style={tw`flex items-center justify-center p-2 bg-black rounded-lg w-[100px]`}
          onPress={() => saveSelectionAndClose()}
        >
          <Text style={tw`text-white `}>Save</Text>
        </Pressable>
      </View>
      <View style={tw`flex gap-2 p-1 h-screen`}>
        <TextInput
          style={tw`border text-lg rounded-lg w-full p-2s`}
          onChangeText={onChangeSearch}
        />
        <ScrollView contentContainerStyle={tw`flex gap-2`}>
          {unselectedProducts.map((item) => (
            <ProductItem
              key={item.id}
              product={item}
              onAmountChange={(newAmount: number) =>
                onAmountChange(item.id, newAmount)
              }
            />
          ))}
          <View style={tw`p-10`} />
        </ScrollView>
      </View>
    </View>
  );
};

export default ProductFastSearch;
