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
        backgroundColor: '#FFFFFF',
    },
    boxstyle1: {
        borderRadius: 0,
        backgroundColor: '#E4A0A0',
        alignItems: "center",
        width: 'auto',
    },
    boxstyle2: {
        borderRadius: 0,
    },
  });

export default createEventStyle;
