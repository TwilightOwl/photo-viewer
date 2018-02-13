import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './app/store';
import AppComponent from './app/containers/Container';

const app = () => (
    <Provider store={configureStore({})}>
        <AppComponent />
    </Provider>
);

export default app;


// import React from 'react';

// import { StyleSheet, Text, View } from 'react-native';

// export default class App extends React.Component {

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//         <Text>Changes you make will automatically reload.</Text>
//         <Text>Shake your phone to open the developer menu!!!!!!!!!!!!!.</Text>
//         <Text>{JSON.stringify({'a':3})}</Text>  
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#adf',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });