import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Text,
} from 'react-native';
import React, {useCallback, useState, useRef} from 'react';
import {data} from '../../screens/CarouselBackgroundAnimation/data';
import {useWindowDimensions} from 'react-native';
import {CloseIcon} from '../../assets';

const ImageView = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const {width, height} = useWindowDimensions();
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
      />

      {/* Image Preview Modal */}
      <Modal visible={selectedIndex !== null} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closePreview}>
            <CloseIcon />
          </TouchableOpacity>

          {selectedIndex !== null && (
            <FlatList
              ref={flatListRef}
              data={data}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              initialScrollIndex={selectedIndex}
              getItemLayout={(data, index) => ({
                length: width,
                offset: width * index,
                index,
              })}
              renderItem={({item}) => (
                <View
                  style={{
                    width,
                    height,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{uri: item}}
                    style={{
                      width: width,
                      height: height,
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              )}
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

export default ImageView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 240,
    right: 20,
    zIndex: 10,
  },
});
