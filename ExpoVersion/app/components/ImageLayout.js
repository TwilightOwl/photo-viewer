import React from 'react';
import { connect } from 'react-redux';
import actionMapping from '../actions';
import { StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native';

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
    mapStateToProps = state => ({
        currentImage: state.images.currentImage,
        loadedImages: state.images.loadedImages
    }),
    mapDispatchToProps = actionMapping([
        'closeCurrentImage'
    ]);

class ImageLayout extends React.Component {

    shouldComponentUpdate(nextProps) {
        if (this.props.currentImage !== nextProps.currentImage) return true;
        return false;
    }

    render() {
        const { currentImage, loadedImages, closeCurrentImage } = this.props;
        return <View style={styles.container}>
            <TouchableWithoutFeedback 
                style={styles.image} 
                onPress={closeCurrentImage} 
            >
                <Image
                    style={styles.image}
                    source={{ uri: loadedImages[currentImage].image.URL }}
                    resizeMode="center"
                />
            </TouchableWithoutFeedback>
        </View>;
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ImageLayout);