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
          width:'100%',
          alignItems: 'center', 
        },
        invitationlist:{
          justifyContent: 'center',
          flexDirection: 'row',
 
          width: 'auto'
        },
        button: {
          alignItems: 'center',
          justifyContent: 'center',
          height: 40,
          borderTopRightRadius:  10,
          borderBottomRightRadius:  10,
          borderBottomLeftRadius: 10,
          borderTopLeftRadius: 10,
          marginBottom: 0,
          marginTop: 0,
          marginRight: 0,
          marginLeft: 5,
          width: "30%",
        },
        groupAsRow : {
          flexDirection: 'row',
        },
        groupAsColumn : {
          flexDirection: 'column',
        }
  });

export default GroupInviteStyle;
