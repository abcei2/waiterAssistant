import tw from "twrnc";
import { View, Text, TextInput, ImageBackground } from "react-native";
import { SvgComponent } from "../icons";

const ProductItem = ({ name, srcImg }) => {
  return (
    <View style={tw`flex gap-2 border border-black rounded-xl p-2`}>
      <Text style={tw`text-2xl font-extrabold text-center`}>{name}</Text>
      <View style={tw`flex flex-row justify-center items-center gap-2`}>
        <SvgComponent width="40px" />
        <View style={tw`flex justify-center items-center`}>
          <ImageBackground
            style={tw`rounded-t-lg overflow-hidden w-full h-[150px] flex items-center justify-center`}
            src={srcImg}
          >
            <TextInput
              style={tw`p-1 border text-lg rounded-xl w-[50%] bg-white text-center`}
              value="0"
            />
          </ImageBackground>
          <View
            style={tw`flex flex-row h-10 rounded-b-lg justify-center items-center bg-gray-200 w-full`}
          >
            <Text style={tw`text-xl font-extrabold text-center`}>
              SUB TOTAL:{" "}
            </Text>
            <Text style={tw`text-xl`}>$ 0.00</Text>
          </View>
        </View>
        <SvgComponent width="40px" />
      </View>
    </View>
  );
};
export default ProductItem;
