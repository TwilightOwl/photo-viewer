import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
        },
        image: {
            position: 'absolute',
            top: 3,
            left: 3,
            bottom: 3,
            right: 3
        },
    }),

    ImageLayout = props => {
        const { URL, width, height, onTap } = props;
        return <View style={styles.container}>
            <TouchableOpacity style={styles.image} onPress={onTap} activeOpacity={1}>
                <Image
                    style={styles.image}
                    source={{ uri: URL }}
                    resizeMode="center"
                />
            </TouchableOpacity>
        </View>;
    };

export default ImageLayout;