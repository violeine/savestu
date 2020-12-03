import React from 'react'
import {View, Stylesheet} from 'react-native'
import CardForm from '../components/CardForm'
import CategoryForm from '../components/CategoryForm'
import TransactionForm from '../components/TransactionForm'

const CreateScreen = ({type}) => {
    const {type} = route.params;

    if (type === 'card') {
        return(
            <>
                <CardForm />
            </>
        );
    }
    else if (type === 'category') {
        return(
            <>
                <CategoryForm />
            </>
        );
    }   
    else if (type === 'transaction') {
        return(
            <>
                <TransactionForm />
            </>
        );
    }
}

const styles = Stylesheet.create({

})

export default CreateScreen;