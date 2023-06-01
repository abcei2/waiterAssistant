import tw from "twrnc";
import { useState } from "react";
import { View, TextInput, ScrollView, Pressable, Text } from "react-native";
import { WAITER_MENU } from "../constants";
import ProductItem from "./ProductItem";

const ProductFastSearch = ({
  handleModalVisibility,
  updateSelectedProducts,
  currentSelectedProducts = [],
}) => {
  
  const [unselectedProducts, setUnselectedProducts] = useState(
    WAITER_MENU.filter(
      (item) =>
        !currentSelectedProducts.find(
          (currentSelectedProducts) => currentSelectedProducts.id === item.id
        ) // filter out selected items
    ).map((item) => ({ ...item, amount: 0, subtotal: 0 }))
  );

  const onChangeSearch = (currentText) => {
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

  const onAmountChange = (productId, newAmount) => {
    const productsData = [...unselectedProducts];
    const index = productsData.findIndex(
      (item) => item.id === productId
    );
    if (index !== -1) {
      productsData[index].amount = newAmount;
      productsData[index].subtotal = newAmount*productsData[index].price;    
      setUnselectedProducts(productsData);
    }    
  };

  const saveSelectionAndClose = () => {
    updateSelectedProducts(unselectedProducts.filter((item) => item.amount > 0));
    handleModalVisibility(false);
  };

  return (
    <View style={tw`pt-2 px-1 flex gap-3`}>
      <View style={tw`flex flex-row gap-3 justify-between px-1`}>
        <Pressable
          style={tw`flex items-center justify-center p-2 bg-black rounded-lg w-[50px]`}
          onPress={() => handleModalVisibility(false)}
        >
          <Text style={tw`text-white `} resizeMode="contain">
            Back
          </Text>
        </Pressable>
        <Pressable
          style={tw`flex items-center justify-center p-2 bg-black rounded-lg w-[100px]`}
          onPress={() => saveSelectionAndClose()}
        >
          <Text style={tw`text-white `} resizeMode="contain">
            Save
          </Text>
        </Pressable>
      </View>
      <View style={tw`flex gap-2 p-1`}>
        <TextInput
          style={tw`border text-lg rounded-lg w-full p-2s`}
          onChangeText={onChangeSearch}
        />
        <ScrollView contentContainerStyle={tw`flex gap-2`}>
          {unselectedProducts.map((item, index) => (
            <ProductItem
              key={item.id}
              product={item}
              onAmountChange={(newAmount) => onAmountChange(item.id, newAmount)}
            />
          ))}
          <View style={tw`p-10`} />
        </ScrollView>
      </View>
    </View>
  );
};

export default ProductFastSearch;
