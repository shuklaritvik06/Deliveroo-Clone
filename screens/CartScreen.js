import React, { useEffect, useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { XMarkIcon } from "react-native-heroicons/solid";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";
import { useDispatch, useSelector } from "react-redux";
import { decrementOrder, getItems, getTotal } from "../slices/cartSlice";

const CartScreen = () => {
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const [groupItems, setGroupItems] = useState([]);
  const total = useSelector(getTotal);
  navigator.setOptions({
    headerShown: false
  });
  const items = useSelector(getItems);
  useMemo(() => {
    let temp = [];
    items.forEach((item) => {
      const index = temp.findIndex((i) => i.payload.id === item.payload.id);
      if (index === -1) {
        temp.push({ ...item, quantity: 1 });
      } else {
        temp[index].quantity += 1;
      }
    });
    setGroupItems(temp);
  }, [items]);
  return (
    <>
      <View className="flex-row justify-between pt-12 px-3 pb-4 bg-white shadow items-center">
        <Text> </Text>
        <View className="flex">
          <Text className="text-xl font-bold ml-12">Your Orders</Text>
          <Text className="text-gray-500 ml-11">
            {groupItems[0]?.payload?.restaurant}
          </Text>
        </View>
        <TouchableOpacity
          className="p-2 bg-primary rounded-full"
          onPress={() => navigator.goBack()}
        >
          <XMarkIcon size={30} color="white" />
        </TouchableOpacity>
      </View>

      {items.length > 0 ? (
        <>
          <ScrollView>
            <View className="bg-white mt-8 flex-row items-center p-4">
              <View className="flex-1 flex-row items-center space-x-3">
                <Image
                  source={{
                    uri: "https://links.papareact.com/wru"
                  }}
                  className="h-10 w-10 bg-gray-300 rounded-full"
                />
                <Text>Deliver in 50-75 min</Text>
              </View>
              <Text className="text-primary">Change</Text>
            </View>
            <View className="bg-white mt-8">
              {groupItems?.map((item, index) => {
                return (
                  <View
                    key={index}
                    className="flex-row items-center justify-between p-4"
                  >
                    <View className="flex-row items-center space-x-5">
                      <View className="flex-row items-center space-x-3">
                        <Text className="text-primary opacity-40 text-base">
                          {item.quantity} x{" "}
                        </Text>
                        <Image
                          source={{
                            uri: urlFor(item.payload.image).url()
                          }}
                          className="h-14 w-14 rounded-full"
                        />
                      </View>
                      <View className="flex-1">
                        <Text>{item.payload.name}</Text>
                      </View>
                      <Text className="text-gray-600">
                        <Currency
                          quantity={item.payload.price * item.quantity}
                          className="text-lg"
                          currency="INR"
                        />
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          dispatch(decrementOrder({ payload: item.payload.id }))
                        }
                      >
                        <Text className="text-primary">Remove</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
          <View className="bg-white p-4 space-y-6">
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-500">Subtotal</Text>
              <Text className="text-gray-500">
                <Currency quantity={total} className="text-lg" currency="INR" />
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-500">Delivery Fee</Text>
              <Text className="text-gray-500">
                <Currency quantity={100} className="text-lg" currency="INR" />
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text>Order total</Text>
              <Text className="font-bold">
                <Currency
                  quantity={total + 100}
                  className="text-lg"
                  currency="INR"
                />
              </Text>
            </View>
            <TouchableOpacity
              className="bg-primary p-5 rounded-lg"
              onPress={() => navigator.navigate("Deliver")}
            >
              <Text className="text-center text-xl font-bold text-white">
                Place Order
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View className="flex-1 items-center justify-center">
            <Text className="text-2xl font-bold">Your cart is empty</Text>
            <Text className="text-gray-500">Add items to it now</Text>
          </View>
        </>
      )}
    </>
  );
};

export default CartScreen;
