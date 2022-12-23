import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { getItems, getTotal } from "../../slices/cartSlice";
import Currency from "react-currency-formatter";
import { useNavigation } from "@react-navigation/native";

const CartIndicator = ({ title }) => {
  const items = useSelector(getItems);
  const total = useSelector(getTotal);
  const navigate = useNavigation();
  const itemsCount = items.length;
  if (itemsCount === 0) return null;
  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        className="bg-primary rounded-md flex-row items-center mx-5 p-5"
        onPress={() => {
          navigate.navigate("Cart");
        }}
      >
        <View className="bg-secondary py-1 px-2 text-white font-extrabold text-xl">
          <Text className="text-white font-extrabold">{itemsCount}</Text>
        </View>
        <Text className="flex-1 text-white text-lg font-bold  text-center ml-5">
          View Cart
        </Text>
        <Text className="text-white text-lg font-extrabold">
          <Currency quantity={total} currency="INR" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartIndicator;
