import React from 'react'
import { View, StyleSheet } from 'react-native'

import CardUpdateForm from '../components/CardUpdateForm'
import CategoryUpdateForm from '../components/CategoryUpdateForm'
import TransactionUpdateForm from '../components/TransactionUpdateForm'

const UpdateScreen = ({ route }) => {
    const { type, id } = route.params;

    return (
        <>
            {
                type === "card" 
                ?
                    <CardUpdateForm cardId={id} />
                : type === "category" ?
                    <CategoryUpdateForm categoryId={id}/>
                : <TransactionUpdateForm transactionId={id}/>
            }
        </>
    );
}

const style = StyleSheet.create({

})

export default UpdateScreen;