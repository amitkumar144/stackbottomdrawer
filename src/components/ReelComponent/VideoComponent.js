import {Dimensions, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useMemo, useRef, useState} from 'react';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import {PlayIcon} from '../../assets';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const VideoComponent = ({data, isVisible}) => {
  const [play, setPlay] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [totalVideoDuration, setTotalVideoDuration] = useState(0);
  const videoRef = useRef(null);

  const WINDOW_HEIGHT = Dimensions.get('window').height;
  const WINDOW_WIDTH = Dimensions.get('window').width;

  const videoStyle = useMemo(
    () => styles.video(WINDOW_HEIGHT),
    [WINDOW_HEIGHT],
  );

  // Update slider progress as the video plays
  const onProgress = progress => {
    let currentTime = Math.floor(progress.currentTime) || 0;
    let seekableDuration = Math.floor(progress.seekableDuration);
    if (currentTime <= seekableDuration) {
      setSliderValue(currentTime);
    }
  };

  // Seek video when the user drags slider
  const onSlidingComplete = values => {
    const seekTime = values[0]; // Extract single slider value
    if (videoRef.current) {
      videoRef.current.seek(seekTime);
    }
    setSliderValue(seekTime);
  };

  const onLoad = data => {
    setTotalVideoDuration(data.duration || 0);
  };

  return (
    <TouchableOpacity
      style={{justifyContent: 'center', alignItems: 'center'}}
      activeOpacity={1}
      onPress={() => setPlay(!play)}>
      <Video
        ref={videoRef}
        source={{uri: data.video}}
        repeat
        resizeMode="contain"
        muted={!isVisible}
        playInBackground={false}
        paused={!isVisible || play}
        ignoreSilentSwitch="ignore"
        style={videoStyle}
        onProgress={onProgress}
        onLoad={onLoad}
      />

      {play && (
        <TouchableOpacity
          onPress={() => setPlay(!play)}
          style={styles.iconContainer}>
          <PlayIcon width={70} height={70} />
        </TouchableOpacity>
      )}

      <LinearGradient
        colors={[
          '#000000F0',
          '#000000D0',
          '#000000A0',
          '#00000070',
          '#00000040',
        ]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.5}}
        style={styles.controlsContainer}
      />

      <MultiSlider
        step={1}
        values={[sliderValue]}
        min={0}
        max={totalVideoDuration}
        onValuesChange={values => setSliderValue(values[0])}
        onValuesChangeFinish={onSlidingComplete}
        sliderLength={WINDOW_WIDTH - 10}
        selectedStyle={{backgroundColor: '#FFFFFF'}}
        unselectedStyle={{backgroundColor: '#989898'}}
        trackStyle={{height: 2, borderRadius: 5}}
        markerStyle={{
          height: 15,
          width: 15,
          borderRadius: 10,
          backgroundColor: '#FFFFFF',
        }}
        containerStyle={styles.sliderContainer(WINDOW_WIDTH)}
      />
    </TouchableOpacity>
  );
};

export default VideoComponent;

const styles = StyleSheet.create({
  video: height => ({
    backgroundColor: 'black',
    width: '100%',
    height: Platform.OS === 'ios' ? height : height - 50,
  }),
  controlsContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  iconContainer: {
    position: 'absolute',
    backgroundColor: '#00000080',
    borderRadius: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  sliderContainer: width => ({
    position: 'absolute',
    bottom: 80,
    width: width,
    alignSelf: 'center',
    alignItems: 'center',
  }),
});
