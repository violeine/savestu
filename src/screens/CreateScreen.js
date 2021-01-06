import React from 'react'
import {View, StyleSheet} from 'react-native'
import CardCreateForm from '../components/CardCreateForm'
import CategoryCreateForm from '../components/CategoryCreateForm'
import TransactionCreateForm from '../components/TransactionCreateForm'
import TranferCreateForm from '../components/TranferCreateForm'
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
                : type === "tranfer" ?
                    <TranferCreateForm />
                : <TransactionCreateForm transactionData={transactionData}/>
            }
        </>
    );
}

const style = StyleSheet.create({

})

export default CreateScreen;