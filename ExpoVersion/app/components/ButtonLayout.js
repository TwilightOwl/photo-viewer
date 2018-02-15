import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import actionMapping from '../actions';
import ButtonItem from './ButtonItem';

const styles = StyleSheet.create({
		buttonContainer: {
			position: 'absolute',
			height: 35,
			right: 0,
			left: 0,
			bottom: 0,
			flexDirection: 'row',
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
	mapStateToProps = state => ({
        pageCount: state.pages.pageCount,
        currentPage: state.pages.currentPage
    }),
    mapDispatchToProps = actionMapping(['goFirst', 'goPrevious', 'goNext', 'goLast']),

	ButtonLayout = props => {
		const { pageCount, currentPage, goFirst, goPrevious, goNext, goLast } = props,
			isFirst = currentPage <= 0,
            isLast = currentPage >= pageCount - 1;
	    return <View style={styles.buttonContainer}>
	    	<ButtonItem isFirst={true} title={isFirst ? ' ' : '<<'} action={goFirst} />
	    	<ButtonItem title={isFirst ? ' ' : '<'} action={goPrevious} />
	    	<View style={styles.pageNumberView}>
				<Text style={styles.pageNumber}>{currentPage + 1}</Text>
			</View>
	    	<ButtonItem title={isLast ? ' ' : '>'} action={goNext} />
	    	<ButtonItem isLast={true} title={isLast ? ' ' : '>>'} action={goLast} />
		</View>;
	};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonLayout);