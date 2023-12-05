import { StyleSheet } from 'react-native';

const followersStyles = StyleSheet.create({
  followerBox: {
    width:'100%',
  }, 
  follower: {
      marginLeft: '5%',
      marginTop: 10,
      padding: 10,
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
    inline1: {
    },
    followerText: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    followerSubText: {
      fontSize: 15,
    },
  });

  export default followersStyles;
