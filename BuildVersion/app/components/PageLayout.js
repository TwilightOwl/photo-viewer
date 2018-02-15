import React from 'react';
import { connect } from 'react-redux';
import actionMapping from '../actions';
import _ from 'lodash';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import getImageItem from './ImageItem';

const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: Dimensions.get('window').width,
            position: 'relative'
        },
        row: { 
            flex: 1, 
            alignSelf: 'stretch', 
            flexDirection: 'row', 
            alignItems: 'center',
            justifyContent: 'center',
        },
        column: { 
            flex: 1, 
            alignSelf: 'stretch', 
            alignItems: 'center',
            justifyContent: 'center',
        }
    });

class PageLayout extends React.PureComponent {

    constructor(props) {
        super(props);
        this.items = {};
    }

    componentDidMount() {
        const { imageList } = this.props;
        if (!imageList || !imageList.length) return;
        const offset = imageList[0],
            limit = imageList.length;
        this.props.receiveImagesAsync(offset, limit);
    }

    getImageItem(imageID) {
        if (!this.items[imageID]) {
            const Component = getImageItem(imageID);
            this.items[imageID] = <Component />
        }
        return this.items[imageID];
    }

    render() {
        const { imageList, page } = this.props,
            rows = 5, 
            columns = 2;
        return <View style={styles.container}>
            {_.range(rows).map(row => 
                <View key={'row-' + row} style={styles.row}>
                    {_.range(columns).map(column => {
                        const imageID = imageList[row * columns + column];
                        return <View key={'column-' + column} style={styles.column}>
                            {this.getImageItem(imageID)}
                        </View>
                    })}
                </View>
            )}
        </View>;
    }
};

export default PageLayout;