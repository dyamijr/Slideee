import { StyleSheet } from 'react-native';

const createEventStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    collaborators: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent:"center",
      alignItems: 'center',
    },
    titleblock: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    descriptionblock: {
      fontSize: 13,
      fontStyle: 'italic'
    },
    emptyspace: {
        fontSize: 5,
    },
    boxstyle: {
        borderRadius: 0,
    },
    boxstyle1: {
        alignItems: "center",
        width: 'auto',
    }
  });

export default createEventStyle;
