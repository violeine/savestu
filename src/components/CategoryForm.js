import React, {useState} from 'react'
import {View, StyleSheet, TextInput, Text, Button} from 'react-native'
import {
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
  } from "../db/category";

  
const CategoryForm = () => {
    const [categories, setCategories] = useState(null);
    const [categoryInput, setCategoryInput] = useState({
      name: "",
      type: "",
    });

    return (
        <>
            <View>
                <Text>createCategory</Text>
                <TextInput
                    placeholder="name category?"
                    value={categoryInput.name}
                    onChangeText={(t) =>
                        setCategoryInput({
                            ...categoryInput,
                            name: t,
                        })
                    }
                    style={styles.inputStyle}
                />
                <TextInput
                    placeholder="type ?"
                    value={categoryInput.type}
                    onChangeText={(t) =>
                        setCategoryInput({
                            ...categoryInput,
                            type: t,
                        })
                    }
                    style={styles.inputStyle}
                />
                <Button
                    title="Create category"
                    onPress={() => {
                        createCategory(categoryInput, setCategories);
                    }}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    inputStyle : {
        borderColor: "gray",
        borderWidth: 1,
        width: 300,
        padding: 5,
        marginBottom: 2,
    }
});

export default CategoryForm;