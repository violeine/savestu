import React from 'react'
import {View, StyleSheet} from 'react-native'
import CardCreateForm from '../components/CardCreateForm'
import CategoryForm from '../components/CategoryForm'
import TransactionForm from '../components/TransactionForm'

const CreateScreen = ({route, navigation}) => {
    const {type} = route.params;
    
    return (
        <>
            {
                type === "card" 
                ?
                    <CardCreateForm navigation={navigation}/> 
                : type === "category" ?
                    <CategoryForm />
                : <TransactionForm />
            }
        </>
    );
}

const style = StyleSheet.create({

})

export default CreateScreen;