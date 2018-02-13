import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, StatusBar, BackHandler } from 'react-native';
import _ from 'lodash';
import * as actions from '../actions';
import ImageItem from '../components/ImageItem';
import ImageLayout from '../components/ImageLayout';
import PageLayout from '../components/PageLayout';
import ButtonLayout from '../components/ButtonLayout';

const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        content: {
            position: 'absolute',
            top: 20,
            right: 0,
            left: 0,
            bottom: 35,
            backgroundColor: '#444',
        },
        statusBarLayout: {
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            height: 40,
            backgroundColor: '#444',
        }
    }),
    mapStateToProps = state => ({
        pages: { ...state.pages },
        images: { ...state.images }
    }),
    mapDispatchToProps = dispatch => 
        Object.keys(actions)
            .reduce((acc, key) => ({ ...acc, [key]: (...args) => dispatch(actions[key](...args)) }), {});   

class AppComponent extends React.Component {

    constructor(props) {
        super(props);
        BackHandler.addEventListener('hardwareBackPress', () => {
            if (!this.props.images.currentImage) {
                this.props.closeCurrentImage();
                return true;
            }
            return false;
        });
    }

    componentDidMount() {
        this.props.receiveImageCount();
        this.props.receiveImagesAsync(this.props.pages.offset, this.props.pages.limit);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.pages.offset !== nextProps.pages.offset ||
            this.props.pages.limit !== nextProps.pages.limit) {
            this.props.receiveImagesAsync(nextProps.pages.offset, nextProps.pages.limit);
        }
    }

    render() {
        const { offset, limit, currentPage, pageCount } = this.props.pages,
            { currentImage, loadedImages } = this.props.images;

        return <View style={styles.container}>
                <View style={styles.statusBarLayout}>
                    <StatusBar/>
                </View>
                {currentImage
                    ? <ImageLayout width={300} height={300} 
                        URL={loadedImages[currentImage].image.URL} onTap={this.props.closeCurrentImage}/>
                    : [
                        <View key="0" style={styles.content}>
                            <PageLayout rows={5} columns={2} 
                                images={loadedImages} 
                                imagesIDList={_.range(offset, offset + limit)}
                                showImageAction={this.props.showImageByID}
                            />
                        </View>,
                        <ButtonLayout  key="1"
                            currentPage={currentPage} 
                            isFirst={currentPage <= 0}
                            isLast={currentPage >= pageCount - 1}
                            goFirst={this.props.goFirst}
                            goPrevious={this.props.goPrevious}
                            goNext={this.props.goNext}
                            goLast={this.props.goLast}
                        />
                    ]
                }
        </View>;

        
        return <View style={styles.container}>
            <View style={styles.content}>
                {currentImage
                    ? <ImageLayout width={300} height={300} 
                        URL={loadedImages[currentImage].image.URL} onTap={this.props.closeCurrentImage}/>
                    : <PageLayout rows={5} columns={2} 
                        images={loadedImages} 
                        imagesIDList={_.range(offset, offset + limit)}
                        showImageAction={this.props.showImageByID}
                    />
                }
            </View>
            <ButtonLayout 
                currentPage={currentPage} 
                isFirst={currentPage <= 0}
                isLast={currentPage >= pageCount - 1}
                goFirst={this.props.goFirst}
                goPrevious={this.props.goPrevious}
                goNext={this.props.goNext}
                goLast={this.props.goLast}
            />
        </View>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);