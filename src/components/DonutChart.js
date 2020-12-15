import React, { Component } from 'react';
import { StyleSheet, ScrollView, StatusBar, Text, View } from 'react-native';
import Pie from 'react-native-pie-chart';


export default function DonutChart() {
  const chart_wh = 150;
  const series = [20, 80];
  const sliceColor = ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50', '#FF9800'];

  return (
    <View style={styles.container}>
      <Pie
        chart_wh={chart_wh}
        series={series}
        sliceColor={sliceColor}
        doughnut={true}
        coverRadius={0.8}
        coverFill={'#fff'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});


