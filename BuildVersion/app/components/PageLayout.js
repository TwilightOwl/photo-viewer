import React from 'react';
import _ from 'lodash';
import { StyleSheet, View  } from 'react-native';
import ImageItem from './ImageItem';

const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
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
    }),

    PageLayout = props => {
        const { rows, columns, images, imagesIDList, showImageAction } = props;
        return <View style={styles.container}>
            {_.range(rows).map(row => 
                <View key={'row-' + row} style={styles.row}>
                    {_.range(columns).map(column => {
                        const imageID = imagesIDList[row * columns + column];
                        return <View key={'column-' + column} style={styles.column}>
                            {
                                images[imageID] !== undefined 
                                    ? <ImageItem key={'ImageItem-' + images[imageID]}
                                        status={images[imageID].status}
                                        image={images[imageID].image}
                                        width={50}
                                        height={50}
                                        onTap={showImageAction}
                                    />
                                    : null
                            }
                        </View>
                    })}
                </View>
            )}
        </View>;
    };

export default PageLayout;