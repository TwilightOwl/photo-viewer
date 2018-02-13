import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ButtonItem from './ButtonItem';

const styles = StyleSheet.create({
		buttonContainer: {
			position: 'absolute',
			height: 35,
			right: 0,
			left: 0,
			bottom: 0,
			flexDirection: 'row',
			backgroundColor: '#444',
		},
		pageNumberView: {
			minWidth: 25,
			alignItems: 'center',
			justifyContent: 'center',
		},
		pageNumber: {
			textAlign: 'center',
			fontWeight: 'bold',
			fontSize: 18,
			color: '#fff'
		}
	}),

	ButtonLayout = props => {
	    const { currentPage, isFirst, isLast, goFirst, goPrevious, goNext, goLast } = props;
	    return <View style={styles.buttonContainer}>
	    	<ButtonItem isFirst={true} title={isFirst ? ' ' : '<<'} action={goFirst} />
	    	<ButtonItem title={isFirst ? ' ' : '<'} action={goPrevious} />
	    	<View style={styles.pageNumberView}>
				<Text style={styles.pageNumber}>{currentPage}</Text>
			</View>
	    	<ButtonItem title={isLast ? ' ' : '>'} action={goNext} />
	    	<ButtonItem isLast={true} title={isLast ? ' ' : '>>'} action={goLast} />
		</View>;
	};

export default ButtonLayout;