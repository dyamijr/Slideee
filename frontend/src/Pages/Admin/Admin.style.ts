import { StyleSheet } from 'react-native';

const adminStyles = StyleSheet.create({
  adminBox: {
    width:'100%',
  },   
  admin: {
      marginLeft: '5%',
      padding: 10,
      marginTop: 10,
      backgroundColor: 'white',
      borderWidth: 5,
      width: '90%',
    },
    inline: {
      display:'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    removeButton: {
      marginTop: 10,
      marginRight: 20,
    },
    adminText: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    adminSubText: {
      fontSize: 15,
    },
  });

  export default adminStyles;
