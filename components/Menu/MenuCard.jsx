import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { urlFor } from "../../sanity";
import Currency from "react-currency-formatter";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementOrder,
  getItemWithId,
  incrementOrder
} from "../../slices/cartSlice";
import { DELIVEROO_COLOR } from "../../globals/global";

const MenuCard = ({
  restaurant,
  id,
  image,
  name,
  description,
  price,
  lat,
  long
}) => {
  function addItemtoCart() {
    dispatch(
      incrementOrder({
        type: "ADD_TO_CART",
        payload: {
          id,
          image,
          name,
          description,
          price,
          restaurant,
          lat,
          long
        }
      })
    );
  }
  function removeItemfromCart() {
    dispatch(
      decrementOrder({
        type: "REMOVE_ITEM",
        payload: id
      })
    );
  }
  const items = useSelector((state) => getItemWithId(state, id));
  const dispatch = useDispatch();
  const [isPressed, setisPressed] = useState(false);
  return (
    <>
      <TouchableOpacity
        className={`flex-row py-3 ${
          !isPressed && "border-b-[0.5px] border-gray-200"
        }`}
        onPress={() => {
          setisPressed(!isPressed);
        }}
      >
        <View className="flex-1 pr-2">
          <Text className="text-lg mb-1">{name}</Text>
          <Text className="text-gray-400">{description}</Text>
          <Text className="text-gray-400">
            <Currency quantity={price} currency="INR" />
          </Text>
        </View>
        <View>
          <Image
            source={{
              uri: urlFor(image).url()
            }}
            style={{
              borderWidth: 1,
              borderColor: "#F3F3F4"
            }}
            className="h-20 w-20"
          />
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View className="bg-white px-2">
          <View className="flex-row items-center space-x-2">
            <TouchableOpacity
              onPress={removeItemfromCart}
              disabled={!(items.length > 0)}
            >
              <MinusCircleIcon
                size={35}
                color={items.length > 0 ? `${DELIVEROO_COLOR}` : "gray"}
              />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addItemtoCart}>
              <PlusCircleIcon size={35} color={DELIVEROO_COLOR} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default MenuCard;
