import tw from "twrnc";
import { useState } from "react";
import { View, TextInput, ScrollView } from "react-native";
import { WAITER_MENU } from "../constants";
import ProductItem from "./ProductItem";

const ProductFastSearch = () => {
  const [selectedItems, setSelectedItems] = useState(WAITER_MENU);
  const onChangeSearch = (currentText) => {
    if (currentText.length > 0) {
      setSelectedItems(
        items.filter((item) =>
          item.name.toLowerCase().includes(currentText.toLowerCase())
        )
      );
    } else {
      setSelectedItems(WAITER_MENU);
    }
  };

  return (
    <View style={tw`flex gap-2 p-1`}>
      <TextInput
        style={tw`border text-lg rounded-lg w-full `}
        onChangeText={onChangeSearch}
      />
      <ScrollView contentContainerStyle={tw`flex gap-2`}>
        {selectedItems.map((item) => (
          <ProductItem key={item.id} name={item.name} srcImg={item.srcImg} />
        ))}
        <View style={tw`p-10`} />
      </ScrollView>
    </View>
  );
};

export default ProductFastSearch;
