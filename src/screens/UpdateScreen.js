import React from 'react'
import { View, StyleSheet } from 'react-native'

import CardUpdateForm from '../components/CardUpdateForm'
import CategoryUpdateForm from '../components/CategoryUpdateForm'
import TransactionUpdateForm from '../components/TransactionUpdateForm'

const UpdateScreen = ({ route }) => {
    const { type, data } = route.params;

    return (
        <>
            {
                type === "card" 
                ?
                    <CardUpdateForm data={data} />
                : type === "category" ?
                    <CategoryUpdateForm data={data}/>
                : <TransactionUpdateForm data={data}/>
            }
        </>
    );
}

const style = StyleSheet.create({

})

export default UpdateScreen;