import React from 'react'
import {View, StyleSheet} from 'react-native'
import CardCreateForm from '../components/CardCreateForm'
import CategoryCreateForm from '../components/CategoryCreateForm'
import TransactionCreateForm from '../components/TransactionCreateForm'

const CreateScreen = ({route}) => {
    const {type, transactionData} = route.params;
    
    return (
        <>
            {
                type === "card" 
                ?
                    <CardCreateForm /> 
                : type === "category" ?
                    <CategoryCreateForm />
                : <TransactionCreateForm transactionData={transactionData}/>
            }
        </>
    );
}

const style = StyleSheet.create({

})

export default CreateScreen;