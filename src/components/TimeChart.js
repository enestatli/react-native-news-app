import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPolarAxis,
} from 'victory-native';

import BottomSheet from './BottomSheetModal';

//TODO bigger flex to bottomshet

const TimeChart = ({ bs, tb, theme }) => {
  const sampleData2 = [
    { x: 'Monday', y: 2 },
    { x: 'Tuesday', y: 1 },
    { x: 'Wednesday', y: 2 },
    { x: 'Thursday', y: 1 },
    { x: 'Friday', y: 3 },
    { x: 'Saturday', y: 4 },
    { x: 'Sunday', y: 1 },
  ];

  return (
    <BottomSheet visible={bs} closeBottomSheet={tb}>
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              color: theme.colors.icon,
            }}
          >
            Time you spent on reading news
          </Text>
          <Text style={{ fontSize: 18, color: theme.colors.icon }}>
            Dailiy average 2 hours 58 minutes
          </Text>
        </View>
        <VictoryChart polar theme={VictoryTheme.material}>
          {[
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ].map((d, i) => {
            return (
              <VictoryPolarAxis
                dependentAxis
                key={i}
                label={d}
                labelPlacement="perpendicular"
                style={{
                  tickLabels: { fill: 'none' },
                  // tickLabels: { fontSize: 6, padding: 15 },
                  axis: { stroke: theme.colors.icon },
                  axisLabel: {
                    fontSize: 14,
                    padding: 12,
                    fill: theme.colors.icon,
                  },
                  grid: {
                    stroke: ({ tick }) =>
                      tick > 0.5 ? theme.colors.icon : 'grey',
                  },
                  ticks: { stroke: theme.colors.primary, size: 5 },
                }}
                axisValue={d}
              />
            );
          })}
          <VictoryBar
            style={{ data: { fill: theme.colors.primary, width: 20 } }}
            // style={{
            //   data: {
            //     fill: ({ datum }) => (datum.x === 3 ? '#000000' : '#c43a31'),
            //     stroke: ({ index }) => (+index % 2 === 0 ? '#000000' : '#c43a31'),
            //     fillOpacity: 0.7,
            //     strokeWidth: 3,
            //   },
            //   labels: {
            //     fontSize: 15,
            //     fill: ({ datum }) => (datum.x === 5 ? '#000000' : '#c43a31'),
            //   },
            // }}
            data={sampleData2}
            animate={{
              duration: 1555,
              easing: 'bounce',
              onLoad: { duration: 1555 },
            }}
          />
        </VictoryChart>
      </View>
    </BottomSheet>
  );
};

export default TimeChart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
});
