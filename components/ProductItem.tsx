import tw from "twrnc";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  Pressable,
} from "react-native";
import { SvgComponent } from "../icons";
import { useEffect, useState } from "react";
import { ProductsType } from "../types";

const ProductItem = ({ product, onAmountChange}:{
  product:ProductsType,
  onAmountChange: (amount: number) => void;
}) => {
  const [amount, setAmount] = useState(0);
  const { name, srcImg, price } = product;

  useEffect(() => {
    onAmountChange(amount);
  }, [amount, onAmountChange]);

  const increase = () => {
    setAmount((prevAmount) => Number(prevAmount) + 1);
  };
  const decrease = () => {
    if (amount === 0) return;
    setAmount((prevAmount) => Number(prevAmount) - 1);
  };


  return (
    <View style={tw`flex gap-2 border border-black rounded-xl p-2`}>
      <Text style={tw`text-2xl font-extrabold text-center`}>{name}</Text>
      <View style={tw`flex flex-row justify-center items-center gap-2`}>
        <Pressable onPress={decrease}>
          <SvgComponent icon="remove" width="40px" />
        </Pressable>
        <View style={tw`flex justify-center items-center`}>
          <ImageBackground
            style={tw`rounded-t-lg overflow-hidden w-full h-[150px] flex items-center justify-center`}
            source={ {uri: srcImg}}
          >
            <TextInput
              style={tw`p-1 border text-lg rounded-xl w-[50%] bg-white text-center`}
              value={amount.toString()}
              onChangeText={(text) => setAmount(Number(text))}
              inputMode="numeric"
            />
          </ImageBackground>
          <View
            style={tw`flex flex-row h-10 rounded-b-lg justify-center items-center bg-gray-200 w-full`}
          >
            <Text style={tw`text-xl font-extrabold text-center`}>
              SUB TOTAL:{" "}
            </Text>
            <Text style={tw`text-xl`}>${price*amount}</Text>
          </View>
        </View>
        <Pressable onPress={increase}>
          <SvgComponent width="40px" />
        </Pressable>
      </View>
    </View>
  );
};
export default ProductItem;
