import React from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';

const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        },
        image: {
            position: 'absolute',
            top: 3,
            left: 3,
            bottom: 3,
            right: 3
        },
    }),

    ImageItem = props => {
        const { status, image, width, height, onTap } = props;
        return <View style={styles.container}>
            {image 
                ? <TouchableWithoutFeedback style={styles.image} onPress={() => onTap(image.ID)}>
                    <Image
                        style={styles.image}
                        source={{uri: image.URL}}
                        resizeMode="cover"
                    />
                    </TouchableWithoutFeedback>
                : status.isLoading
                    ? <ActivityIndicator />
                    : status.error
                        ? <Text>ERR</Text>
                        : null
            }
        </View>;
    };

export default ImageItem;