import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

const styles = StyleSheet.create({
		buttonView: {
	  		height: 35,
	  		flex: 2,
	  		marginRight: 1,
	  		marginLeft: 1,
	  		backgroundColor: '#444',
	  	}
	}),

	ButtonItem = props => {
	    const { isFirst = false, isLast = false, title, action } = props;
	    return <View style={[ styles.buttonView, 
	    		isFirst ? { marginLeft: 0 } : {},
	    		isLast ? { marginRight: 0 } : {}
	    	]}>
			{ title.trim() ? <Button color={'#444'} onPress={action} title={title}/> : null }
		</View>;
	};

export default ButtonItem;