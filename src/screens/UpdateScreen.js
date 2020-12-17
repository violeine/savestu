import React from 'react'
import { View, StyleSheet } from 'react-native'

import CardForm from '../components/CardForm'
import CategoryForm from '../components/CategoryForm'
import TransactionForm from '../components/TransactionForm'

const UpdateScreen = ({ route, navigation }) => {
    const { type, data } = route.params;

    return (
        <>
            {
                type === "card" ?
                    <CardForm data={data} type="update" navigation={navigation} />
                    : type === "category" ?
                        <CategoryForm />
                        : <TransactionForm />
            }
        </>
    );
}

const style = StyleSheet.create({

})

export default UpdateScreen;