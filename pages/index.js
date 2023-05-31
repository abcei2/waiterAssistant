import tw from 'twrnc';
import { ScrollView, Text, View } from "react-native";
import { SvgComponent } from "../icons";
import OrderItem from "../components/OrderItem";
import Accordion from "../components/Accordion";


export default function App() {
  return (
    <ScrollView style={tw`pt-10 bg-green-200 dark:bg-black absolute inset-0`}>
      <Text style={tw`text-2xl font-extrabold text-center`}>Mesa #1</Text>
      <View style={tw`flex flex-row items-center gap-1 pl-2`}>
        <SvgComponent/><Text style={tw`text-xl`}>New table's costumer</Text>
      </View>
      <Accordion title="Customer #1">
        <OrderItem/>
      </Accordion>      
      <Accordion title="Customer #1">
        <OrderItem/>
      </Accordion>
       
      <Accordion title="Customer #1">
        <OrderItem/>
      </Accordion>
    </ScrollView>
  );
}

