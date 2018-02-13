import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, ViewPagerAndroid } from 'react-native';
import { getAsObject } from '../reducers/page';
import { pageAction } from '../actions/pageAction';
import { getImageCount } from '../actions/fetchData';

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
    backgroundColor: '#070',
    top: 20,
    bottom: 70
  },
  pageStyle: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#efe',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    // paddingTop: 50,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: '#ddf',
  }
});

class Pagination extends React.Component {

  // constructor(props) {
  //   super(props);
  // }

  onPageSelected(id) {
    //console.log(id)
  }

  click() {
    this.props.imageCount();
    console.log('click');
    //this.goToPage(2);
  }

  goToPage(page) {
    this.props.actPage(page); 
  }

  componentDidMount() {
    //console.log('DID MOUNT', this.props.page);

  }

  componentDidUpdate() {
    //console.log('DID UPDATE', this.props.page);
    if (this.viewPager) this.viewPager.setPage(this.props.page);
  }

  render() {
    //console.log('===RENDER===', this.props.page);
    return (
      <View style={styles.container}>
        {/*<Button
          onPress={() => {}}
          title='Load Data'
        />
        <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />*/}
        <ViewPagerAndroid
          onPageSelected={e => {
            console.log('onPageSelected', e.nativeEvent.position);
            this.goToPage(e.nativeEvent.position);
          }}
          onPageScroll={e => {}}
          onPageScrollStateChanged={e => {}}
          style={styles.viewPager}
          initialPage={0}
          ref={viewPager => { this.viewPager = viewPager; }}
        >
          <View style={styles.pageStyle} key="1">
            <Text>First page</Text>
          </View>
          <View style={styles.pageStyle} key="2">
            <Text>{(() => 'as')()}</Text>
          </View>
          <View style={styles.pageStyle} key="3">
            <Text>3333333333333333333333333333333333333333</Text>
          </View>
        </ViewPagerAndroid>
        <View style={styles.buttonContainer}>
          <Text>AAA</Text>
          <Button
            onPress={() => {
              this.click();
            }}
            title='Load Data'
          />
        </View>
      </View>
    );
  }
}


const mapStateToProps = state => getAsObject(state);

const mapDispatchToProps = dispatch => ({
  actPage: page => dispatch(pageAction(page)),
  imageCount: page => dispatch(getImageCount()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pagination);
