import { StyleSheet } from 'react-native';

const searchGroupStyle = StyleSheet.create({
    container : {
        backgroundColor: '#fff',
    },
    boxstyle1: {
        backgroundColor: 'transparent',
        alignItems: "center",
        width: 'auto',
        borderRadius:0,
    },
    boxstyle2 : {
        backgroundColor: 'transparent',
        width: 'auto',
        borderWidth: 1,
        borderRadius:0,
    },
    displayblock: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'Futura-CondensedMedium',
        color: 'black'
    },
    nameblock: {
        fontSize: 18,
        fontStyle: 'italic',
        fontFamily: 'Futura-CondensedMedium',
        color: 'black'
    },
});

export default searchGroupStyle;