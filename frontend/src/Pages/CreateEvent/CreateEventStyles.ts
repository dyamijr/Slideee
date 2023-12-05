import { StyleSheet } from 'react-native';

const createEventStyle = StyleSheet.create({
  scroll: {
    backgroundColor: 'white',
  },
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
      marginTop: 15,
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
        marginTop: 20,
        borderRadius: 0,
        marginBottom: 20,
    },
    boxstyle3: {
      alignItems: "center",
      width: 'auto',
    }
  });

export default createEventStyle;
