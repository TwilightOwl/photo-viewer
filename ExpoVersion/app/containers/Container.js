import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, StatusBar, BackHandler } from 'react-native';
import _ from 'lodash';
import * as actions from '../actions';
import ImageItem from '../components/ImageItem';
import ImageLayout from '../components/ImageLayout';
import PageLayout from '../components/PageLayout';
import ButtonLayout from '../components/ButtonLayout';

//import { Pages } from 'react-native-pages';
//import Pager from './Pager';

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

	

	/*componentDidUpdate() {
    	//console.log('DID UPDATE', this.props.pages.current);
    	//if (this.viewPager) this.viewPager.setPage(this.props.pages.current);
    	//if (this.viewPager) this.viewPager.setPage(1);
  	}*/

	// goToPage(page) {
 	// this.props.goPage(page); 
 	// }

/*
		return (
	      	<Pager horizontal={true}>
	      		<Text>1</Text>
	      		<Text>2</Text>
	      	</Pager>
	    );

		return <View style={styles.container}>
        	<ViewPagerAndroid
				onPageSelected={e => {
					console.log('onPageSelected', e.nativeEvent.position);
					//this.goToPage(e.nativeEvent.position);
					if (e.nativeEvent.position === 0) this.props.goPrevious(); 
					else if (e.nativeEvent.position === 2) this.props.goNext(); 
					//this.props.page.current === 0 ?
          		}}
          		onPageScroll={e => {}}
          		onPageScrollStateChanged={e => {}}
          		style={styles.viewPager}
          		//initialPage={this.props.page.current > 0 ? 1 : 0}
          		initialPage={1}
          		ref={viewPager => { this.viewPager = viewPager; }} 
          	>
          	
          		{	
          			this.props.page.currentPage > 0 || true
          				? <View style={styles.pageStyle} key="previous">
	            			<Text>Previous Page</Text>
          				</View>
          				: null
          		}
          		<View style={styles.pageStyle} key="current">
	            	<Text>Current Page {this.props.page.currentPage}</Text>
	            	<Image style={{ width: 350, height: 350 }}
                    	source={{uri: 'http://placehold.it/600/24f355'}}
                	/>
          		</View>
          		{
          			this.props.page.currentPage < this.props.page.pageCount - 1 || true
          				? <View style={styles.pageStyle} key="next">
	            			<Text>Next Page</Text>
	            			<Image style={{ width: 350, height: 350 }}
                    			source={{uri: 'http://placehold.it/600/d32776'}}
                			/>
          				</View>
          				: null
          		}
        	</ViewPagerAndroid>
        	<View style={styles.buttonContainer}>
	          	<Text>{this.props.page.currentPage}</Text>
          		<Button onPress={this.props.goPrevious} title='<' />
          		<Text> | </Text>
          		<Button onPress={this.props.goNext} title='>' />
        	</View>
      	</View>;


		let data = _.range(200).map(i => ({key: i}));
		return <ListView
  				//data={[{key: 'a'}, {key: 'b'}]}
  				data={data}
  				renderItem={({item}) => <Text>{item.key}</Text>}
  				dataSource={data}
		        renderRow={(rowData) => <Text>{item.key}</Text>}
  				horizontal={true}
			/>
*/

/*
const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
    backgroundColor: '#efe',
    padding:20
    //top: 20,
    //bottom: 170
  },
  pageStyle: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#efe',
  },
  container: {
    flex: 1,
    backgroundColor: '#444',
    paddingTop: 20,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    //position: 'relative'

    // paddingTop: 50,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  content: {
  	position: 'absolute',
    top: 20,
    right: 0,
    left: 0,
    bottom: 35,
    //backgroundColor: '#ddf',
  },
  buttonContainer: {
  	position: 'absolute',
	height: 35,
    right: 0,
    left: 0,
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#444',
  },
  buttonView: {
  	height: 35,
  	flex: 2,
  	marginRight: 1,
  	marginLeft: 1
  },
  button: {
  	color: '#444'
  },

  pageNumberView: {
  	minWidth: 25,
  	alignItems: 'center',
    justifyContent: 'center',
  },

  pageNumber: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff'
  }
});
*/