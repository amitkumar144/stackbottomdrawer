import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState, useRef} from 'react';
import {data} from '../../screens/CarouselBackgroundAnimation/data';
import ImagePreview from './ImagePreview';

const ImageView = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const flatListRef = useRef(null);

  const openPreview = index => {
    setSelectedIndex(index);
  };

  const closePreview = () => {
    setSelectedIndex(null);
  };

  const renderItem = useCallback(({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => openPreview(index)}>
        <Image source={{uri: item}} style={styles.imageStyle} />
      </TouchableOpacity>
    );
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
        showsHorizontalScrollIndicator={false}
      />

      {selectedIndex !== null && (
        <ImagePreview
          data={data}
          flatListRef={flatListRef}
          selectedIndex={selectedIndex}
          closePreview={closePreview}
        />
      )}
    </View>
  );
};

export default ImageView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignSelf: 'center',
    borderRadius: 14,
    overflow: 'hidden',
  },
  imageStyle: {
    width: 300,
    height: 400,
  },
  contentContainerStyle: {
    gap: 24,
    paddingHorizontal: 24,
  },
});
