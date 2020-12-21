import React from 'react'
import { View, StyleSheet } from 'react-native'

import CardUpdateForm from '../components/CardUpdateForm'
import CategoryForm from '../components/CategoryForm'
import TransactionForm from '../components/TransactionForm'

const UpdateScreen = ({ route, navigation }) => {
    const { type, data } = route.params;

    return (
        <>
            {
                type === "card" 
                ?
                    <CardUpdateForm data={data} navigation={navigation} />
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