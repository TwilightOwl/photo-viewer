import PropTypes from 'prop-types';
import _ from 'lodash';
import React, { PureComponent, Children } from 'react';
import { View, ScrollView, Animated, Platform, ViewPropTypes, Text, FlatList } from 'react-native';

//import Indicator from '../indicator';
import styles from './Pager.styles';

const floatEpsilon = Math.pow(2, -23);

function equal(a, b) {
  return Math.abs(a - b) <= floatEpsilon * Math.max(Math.abs(a), Math.abs(b));
}

export default class Pages extends PureComponent {
  static defaultProps = {
    pagingEnabled: true,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    scrollEventThrottle: 30,
    scrollsToTop: false,

    indicatorColor: 'rgb(255, 255, 255)',
    indicatorOpacity: 0.30,

    startPage: 0,

    horizontal: true,
    rtl: false,
  };

  static propTypes = {
    style: ViewPropTypes.style,
    containerStyle: ViewPropTypes.style,

    indicatorColor: PropTypes.string,
    indicatorOpacity: PropTypes.number,
    indicatorPosition: PropTypes.oneOf([
      'none',
      'top',
      'right',
      'bottom',
      'left',
    ]),

    startPage: PropTypes.number,
    progress: PropTypes.instanceOf(Animated.Value),

    horizontal: PropTypes.bool,
    rtl: PropTypes.bool,

    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),

    onLayout: PropTypes.func,
    onScrollEnd: PropTypes.func,
    renderPager: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.onLayout = this.onLayout.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onScrollBeginDrag = this.onScrollBeginDrag.bind(this);
    this.onScrollEndDrag = this.onScrollEndDrag.bind(this);

    this.updateRef = this.updateRef.bind(this, 'scroll');
    this.renderPage = this.renderPage.bind(this);

    let { startPage, progress = new Animated.Value(startPage) } = this.props;

    this.progress = startPage;
    this.mounted = false;
    this.scrollState = -1;

    this.state = {
      width: 0,
      height: 0,
      progress,
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentDidUpdate() {
    if (-1 === this.scrollState) {
      /* Fix scroll position after layout update */
      requestAnimationFrame(() => {
        this.scrollToPage(Math.floor(this.progress), false);
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentWillReceiveProps(props) {
    let { progress } = props;

    if (progress !== this.props.progress) {
      progress.setValue(this.progress);

      this.setState({ progress });
    }
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  onLayout(event) {
    let { width, height } = event.nativeEvent.layout;
    let { onLayout } = this.props;

    if ('function' === typeof onLayout) {
      onLayout(event);
    }

    this.setState({ width, height });
  }

  onScroll(event) {
    console.log('onScroll');
    if (-1 === this.scrollState) {
      return;
    }

    let { horizontal } = this.props;
    let { [horizontal? 'x' : 'y']: offset } = event.nativeEvent.contentOffset;
    let { [horizontal? 'width' : 'height']: base, progress } = this.state;

    progress.setValue(this.progress = base? offset / base : 0);

    let discreteProgress = Math.round(this.progress);

    if (1 === this.scrollState && equal(discreteProgress, this.progress)) {
      this.onScrollEnd();

      this.scrollState = -1;
    }
  }

  onScrollBeginDrag() {
    console.log('onScrollBeginDrag');
    this.scrollState = 0;
  }

  onScrollEndDrag() {
    let { horizontal } = this.props;

    /* Vertical pagination is not working on android, scroll by hands */
    if ('android' === Platform.OS && !horizontal) {
      this.scrollToPage(Math.round(this.progress));
    }

    this.scrollState = 1;
  }

  onScrollEnd() {
    let { onScrollEnd } = this.props;

    if ('function' === typeof onScrollEnd) {
      onScrollEnd(Math.round(this.progress));
    }
  }

  scrollToPage(page, animated = true) {
    let { horizontal } = this.props;
    let { [horizontal? 'width' : 'height']: base } = this.state;

    if (animated) {
      this.scrollState = 1;
    }

    console.log('scrollToPage');

    if (this.mounted && this.scroll) {
      this.scroll.scrollToOffset({
        [horizontal? 'x' : 'y']: page * base,
        animated,
      });
    }
  }

  isDragging() {
    return 0 === this.scrollState;
  }

  isDecelerating() {
    return 1 === this.scrollState;
  }

  renderPage(page, index) {
    let { width, height, progress } = this.state;
    let { children, horizontal, rtl } = this.props;

    let pages = Children.count(children);

    let pageStyle = (horizontal && rtl)?
      styles.rtl:
      null;

    /* Adjust progress by page index */
    progress = Animated.add(progress, -index);

    return (
      <View style={[{ width, height }, pageStyle]}>
        {React.cloneElement(page, { index, pages, progress })}
      </View>
    );
  }

  renderPager(pager) {
    let { renderPager, horizontal, rtl } = this.props;

    if ('function' === typeof renderPager) {
      return renderPager({ horizontal, rtl, ...pager });
    }

    let { indicatorPosition } = pager;

    if ('none' === indicatorPosition) {
      return null;
    }

    let indicatorStyle = (horizontal && rtl)?
      styles.rtl:
      null;

    /*return (
      <View style={[styles[indicatorPosition], indicatorStyle]}>
        <Indicator {...pager} />
      </View>
    );*/
  }

  render() {
    let { progress } = this.state;
    let { horizontal, rtl } = this.props;
    let {
      style,
      containerStyle,
      children,
      indicatorColor,
      indicatorOpacity,
      indicatorPosition = horizontal? 'bottom' : 'right',
      ...props
    } = this.props;

    let pages = Children.count(children);

    let Pager = () =>
      this.renderPager({
        pages,
        progress,
        indicatorColor,
        indicatorOpacity,
        indicatorPosition,
      });

    let scrollStyle = (horizontal && rtl)?
      styles.rtl:
      null;


    //let data = _.range(200).map(i => ({ key: i }));
    //console.log('aaaaaaaaa');

    return (
      <View style={[styles.container, containerStyle]}>
        <Text> </Text>
        <Text> IN </Text>
        <FlatList
          //{...props}
          //style={[styles.container, style, scrollStyle]}
          //onLayout={this.onLayout}
          //onScroll={this.onScroll}
          //onScrollBeginDrag={this.onScrollBeginDrag}
          //onScrollEndDrag={this.onScrollEndDrag}
          //ref={this.updateRef}

          //data={[{key: 'a'}, {key: 'b'}]}
          //renderItem={({item}) => <Text>{item.key}</Text>}
          data={Children.map(children, this.renderPage).map((x, i) => ({ key: i , data: x }))}
          renderItem={({item}) => {
            console.log('d: ', item.data);
            return item.data;
          }}
          //data={data}
          //renderItem={({ item }) => <Text>{item.key}</Text>}

        />
      </View>
    );

    return (<Text>STUBBBBB</Text>)

    return (
      <View style={[styles.container, containerStyle]}>
        <Text>FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFff</Text>
        <FlatList
          {...props}
          style={[styles.container, style, scrollStyle]}
          onLayout={this.onLayout}
          onScroll={this.onScroll}
          onScrollBeginDrag={this.onScrollBeginDrag}
          onScrollEndDrag={this.onScrollEndDrag}
          ref={this.updateRef}

          data={[{key: 'a'}, {key: 'b'}]}
          renderItem={({item}) => <Text>{item.key}</Text>}
          //data={Children.map(children, this.renderPage).map((x, i) => ({ key: i , data: x }))}
          //renderItem={({item}) => {
          //  console.log('d');
          //  return item.data;
          //}}
          //data={data}
          //renderItem={({ item }) => <Text>{item.key}</Text>}

        />
          
        

        {/*<Pager />*/}
      </View>
    );
  }
}