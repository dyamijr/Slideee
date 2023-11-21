import { StyleSheet } from 'react-native';

const GroupInviteStyle = StyleSheet.create({
    logoImage: {
        width: 60,
        height: 60,
      },
      inputText:{
        height: 50,
        borderTopRightRadius:  60,
        borderBottomRightRadius:  60,
        borderBottomLeftRadius: 60,
        borderTopLeftRadius: 60,
        marginBottom: 10,
        marginTop: 20,
        width: "70%",
        underlineColorAndroid : "transparent"
        
        }, 
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          
        },
        button: {
          height: 40,
          borderTopRightRadius:  0,
          borderBottomRightRadius:  0,
          borderBottomLeftRadius: 0,
          borderTopLeftRadius: 0,
          marginBottom: 0,
          marginTop: 0,
          marginRight: 15,
          marginLeft: 10,
          width: "30%",
        }
  });

export default GroupInviteStyle;
