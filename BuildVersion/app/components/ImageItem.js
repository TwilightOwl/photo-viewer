import React from 'react';
import { connect } from 'react-redux';
import actionMapping from '../actions';
import { StyleSheet, Text, View, Image, ActivityIndicator, TouchableWithoutFeedback, Dimensions } from 'react-native';

const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        },
        image: {
            position: 'absolute',
            top: 3,
            left: 3,
            bottom: 3,
            right: 3
        },
    }),
    getMapStateToProps = imageID =>
        state => ({
            imageID,
            loadedData: state.images.loadedImages[imageID],
        }),
    mapDispatchToProps = actionMapping(['showImageByID']),

    ImageItem = props => {
        const { loadedData, imageID } = props;
        return <View style={styles.container}>
            {loadedData
                ? loadedData.image
                    ? <TouchableWithoutFeedback style={styles.image} onPress={() => props.showImageByID(loadedData.image.ID)}>
                        <Image
                            style={styles.image}
                            source={{uri: loadedData.image.URL}}
                            resizeMode="cover"
                        />
                        </TouchableWithoutFeedback>
                    : loadedData.status.isLoading
                        ? <ActivityIndicator />
                        : loadedData.status.error
                            ? <Text>ERR</Text>
                            : null
                : null
            }
        </View>;
    };

const getComponent = imageID => (connect(getMapStateToProps(imageID), mapDispatchToProps)(ImageItem));
export default getComponent;