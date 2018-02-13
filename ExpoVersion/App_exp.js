import React from 'react';
import { Provider } from 'react-redux';
import store from './app/store';
import FirstContainer from './app_exp/containers/FirstContainer';
import Pagination from './app_exp/containers/Pagination';

//const store = configureStore({});

const app = () => (
    <Provider store={store}>
        <Pagination />
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