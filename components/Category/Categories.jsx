import React, { useEffect, useLayoutEffect, useState } from "react";
import { ScrollView } from "react-native";
import CategoryCard from "./CategoryCard";
import sanity, { urlFor } from "../../sanity";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  useLayoutEffect(() => {
    sanity.fetch(`*[_type=="category"]`).then((data) => {
      setCategories(data);
    });
  }, []);
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      pagingEnabled={true}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10
      }}
    >
      {categories.map((category) => {
        return (
          <CategoryCard
            key={category._id}
            id={category._id}
            imageURL={urlFor(category.image).url()}
            title={category.name}
          />
        );
      })}
    </ScrollView>
  );
};

export default Categories;
