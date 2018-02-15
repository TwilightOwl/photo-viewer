import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, StatusBar, BackHandler } from 'react-native';
import _ from 'lodash';
import actionMapping from '../actions';
import ImageLayout from '../components/ImageLayout';
import PageList from '../components/PageList';
import ButtonLayout from '../components/ButtonLayout';

const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#444',
        },
        content: {
            position: 'absolute',
            top: 20,
            right: 0,
            left: 0,
            bottom: 35,
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
        currentView: state.view,
        limit: state.pages.limit,
        pageCount: state.pages.pageCount,
        imageCount: state.pages.imageCount
    }),
    mapDispatchToProps = actionMapping([
        'receiveImageCount', 
        'closeCurrentImage'
    ]);

class AppComponent extends React.Component {

    constructor(props) {
        super(props);
        BackHandler.addEventListener('hardwareBackPress', () => {
            if (this.props.currentView === 'PAGE_VIEW') return false;
            this.props.closeCurrentImage();
            return true;
        });
    }

    componentDidMount() {
        this.props.receiveImageCount();
    }

    render() {
        const { currentView, limit, pageCount, imageCount } = this.props;
        return <View style={styles.container}>
            <View style={styles.statusBarLayout}>
                <StatusBar/>
            </View>
            {[ <View key="0" style={styles.content}>
                    <PageList />
                </View>,
                <ButtonLayout key="1" />,
                currentView === 'IMAGE_VIEW' ? <ImageLayout key="2" /> : null
            ]}
        </View>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);