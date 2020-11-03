import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { FAB, Portal, Provider } from 'react-native-paper';


const AddButton = () => {
    const [state, setState] = useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;

    return (
        <Provider>
            <Portal>
                <FAB.Group
                    open={open}
                    icon={open ? 'close' : 'plus'}
                    color='#FFF'
                    fabStyle={open ? styles.activeBgColor : styles.inactiveBgColor}
                    actions={[
                        {
                            label: 'Income',
                            icon: 'plus',
                            color: '#FFF',
                            style: { backgroundColor: '#29e038' },
                            onPress: () => console.log('Pressed Income'),
                        },
                        {
                            label: 'Expense',
                            icon: 'minus',
                            color: '#FFF',
                            style: { backgroundColor: '#f62d2d' },
                            onPress: () => console.log('Pressed Expense'),
                        },
                        {
                            label: 'Transfer',
                            icon: 'arrow-left-right',
                            color: '#FFF',
                            style: { backgroundColor: '#2da6f6' },
                            onPress: () => console.log('Pressed Transfer'),
                        },
                    ]}
                    onStateChange={onStateChange}
                />
            </Portal>
        </Provider>
    );
};

const styles = StyleSheet.create({
    activeBgColor: {
        backgroundColor: '#239e7b',
    },

    inactiveBgColor: {
        backgroundColor: '#2CC197',
    },
})

export default AddButton