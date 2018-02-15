import React from 'react';
import { connect } from 'react-redux';
import actionMapping from '../actions';
import _ from 'lodash';
import { StyleSheet, Dimensions, FlatList, View, Text  } from 'react-native';
import PageLayout from './PageLayout';

const mapStateToProps = state => ({
        pageList: state.pages.pageList,
        imageCount: state.pages.imageCount,
        currentPage: state.pages.currentPage
    }),
    mapDispatchToProps = actionMapping(['goPage', 'showImageByID', 'receiveImagesAsync']);

class PageList extends React.Component {

    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.imageCount !== nextProps.imageCount) return true;
        if (this.props.currentPage !== nextProps.currentPage) this.goTo(nextProps.currentPage);
        return false;
    }

    renderItem({ item }) {
        return <PageLayout 
            imageList={this.props.pageList[item.key].imageList}
            page={item.key}
            receiveImagesAsync={this.props.receiveImagesAsync}
            showImageByID={this.props.showImageByID}
        />
    }

    onScrollEnd(e) {
        const page = Math.floor(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width);
        this.props.goPage(page);
    }

    goTo(index) {
        if (this.flatList) this.flatList.scrollToIndex({ index });
    }

    render() {
        const { pageList } = this.props,
            screenWidth = Dimensions.get('window').width;
        
        return <FlatList 
            ref={flatList => this.flatList = flatList}
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false} 
            showsVerticalScrollIndicator={false}
            removeClippedSubviews
            initialNumToRender={0}
            windowSize={2}
            onMomentumScrollEnd={e => this.onScrollEnd(e)}
            getItemLayout={(data, index) => (
                {length: screenWidth, offset: screenWidth * index, index}
            )}
            data={pageList.map((page, key) => ({ key }))}
            renderItem={this.renderItem}
        />;
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageList);