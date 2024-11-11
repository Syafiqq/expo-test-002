import React from 'react';
import {StyleSheet, View} from 'react-native';

const Divider = () => {
  return (
    <View style={styles.container}>
      <View style={styles.hairline}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  hairline: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'black',
  },
});

export default Divider;
