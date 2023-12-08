import { StyleSheet } from 'react-native';

const groupStyles = StyleSheet.create({
  fullbox: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%'
  },  
  textStyle: {
    justifyContent: 'center',
    flexDirection:'row',
  },
  container: {
      alignContent:'center',
      justifyContent: 'center',
      flexDirection:'row',
      backgroundColor: 'white',
    },
    button: {
      margin: 5,
      backgroundColor: 'white',
      borderWidth: 3,
      borderColor: 'black',
      borderRadius: 0,
      width: '35%',
    },
    button2: {
      margin: 5,
      backgroundColor: 'white',
      borderWidth: 3,
      borderColor: 'black',
      borderRadius: 0,
      width: '20%',
    },
  });

  export default groupStyles;
