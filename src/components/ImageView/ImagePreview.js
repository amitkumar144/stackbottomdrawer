import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {CloseIcon, RotateIcon} from '../../assets';

const ImagePreview = ({flatListRef, data, selectedIndex, closePreview}) => {
  const [rotationMap, setRotationMap] = useState({});
  const {width, height} = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(selectedIndex || 0);

  const rotateImage = () => {
    setRotationMap(prev => ({
      ...prev,
      [currentIndex]: prev[currentIndex] === 90 ? 0 : 90,
    }));
  };

  const renderItem = useCallback(
    ({item, index}) => {
      const rotation = rotationMap[index] || 0;
      return (
        <View key={index} style={styles.imageContainer(width, height)}>
          <Image
            source={{uri: item}}
            style={styles.image(width, height, rotation)}
          />
        </View>
      );
    },
    [rotationMap],
  );

  const onMomentumScrollEnd = event => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(newIndex);
  };

  const getItemLayout = (data, index) => ({
    length: width,
    offset: width * index,
    index,
  });

  return (
    <Modal visible={selectedIndex !== null} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={closePreview}>
          <CloseIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.rotateButton} onPress={rotateImage}>
          <RotateIcon />
        </TouchableOpacity>

        <FlatList
          ref={flatListRef}
          data={data}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          initialScrollIndex={selectedIndex}
          getItemLayout={getItemLayout}
          onMomentumScrollEnd={onMomentumScrollEnd}
          renderItem={renderItem}
        />
      </View>
    </Modal>
  );
};

export default ImagePreview;

const styles = StyleSheet.create({
  imageContainer: (width, height) => ({
    width: width - 40,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  }),
  image: (width, height, rotation) => ({
    width: rotation % 180 === 0 ? width - 40 : height - 40,
    height: rotation % 180 === 0 ? height - 40 : width - 40,
    resizeMode: 'contain',
    transform: [{rotate: `${rotation}deg`}],
    borderRadius: 20,
  }),
  closeButton: {
    position: 'absolute',
    top: 70,
    right: 20,
    zIndex: 10,
  },
  rotateButton: {
    position: 'absolute',
    top: 70,
    left: 20,
    zIndex: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000D0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
