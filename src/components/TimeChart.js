import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryTooltip,
  VictoryLabel,
  VictoryPie,
  VictoryContainer,
  VictoryPolarAxis,
} from 'victory-native';
import BottomSheet from './BottomSheetModal';

const TimeChart = ({ bs, tb }) => {
  // const [bottomSheet, setBottomSheet] = React.useState(false);

  // const toggleBottom = () => {
  //   setBottomSheet(!bottomSheet);
  // };
  console.log(new Date().getFullYear());
  console.log(new Date().getMonth().toString());
  console.log(new Date().getDate().toString());

  const sampleData = [
    { x: 'Monday', y: 2, label: 'Monday' },
    { x: 'Tuesday', y: 1, label: 'Tuesday' },
    { x: 'Wednesday', y: 2, label: 'Wednesday' },
    { x: 'Thursday', y: 1, label: 'Thursday' },
    { x: 'Friday', y: 3, label: 'Friday' },
    { x: 'Saturday', y: 4, label: 'Saturday' },
    { x: 'Sunday', y: 1, label: 'Sunday' },
  ];

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
      <View style={styles.container}>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
            Time you spent on reading news
          </Text>
          <Text style={{ fontSize: 18 }}>
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
                  axis: { stroke: '#777' },
                  axisLabel: { fontSize: 14, padding: 20 },
                  grid: {
                    stroke: ({ tick }) => (tick > 0.5 ? '#777' : 'grey'),
                  },
                  ticks: { stroke: 'red', size: 5 },
                }}
                axisValue={d}
              />
            );
          })}
          <VictoryBar
            style={{ data: { fill: 'tomato', width: 20 } }}
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
              duration: 555,
              easing: 'bounce',
              onLoad: { duration: 555 },
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
    // marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
});
