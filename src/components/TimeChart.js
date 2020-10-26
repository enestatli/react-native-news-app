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

  const data = [
    { x: 1, y: 2, label: 'Monday' },
    { x: 2, y: 1, label: 'Tuesday' },
    { x: 3, y: 2, label: 'Wednesday' },
    { x: 3, y: 1, label: 'Thursday' },
    { x: 3, y: 3, label: 'Friday' },
    { x: 3, y: 4, label: 'Saturday' },
    { x: 3, y: 1, label: 'Sunday' },
  ];

  const CustomLabel = ({ ...props }) => {
    return (
      <G>
        <VictoryLabel {...props} />
        <VictoryTooltip
          renderInPortal={false}
          {...props}
          x={200}
          y={250}
          orientation="top"
          pointerLength={0}
          cornerRadius={50}
          flyoutWidth={100}
          flyoutHeight={100}
          flyoutStyle={{ fill: 'black' }}
        />
      </G>
    );
  };

  CustomLabel.defaultEvents = VictoryTooltip.defaultEvents;

  return (
    <BottomSheet visible={bs} closeBottomSheet={tb}>
      {/* <VictoryBar /> */}
      <View style={styles.container}>
        {/* <VictoryChart width={350} theme={VictoryTheme.material}>
          <VictoryBar data={data} x="quarter" y="earnings" />
        </VictoryChart> */}
        {/* <VictoryPie
          data={data}
          // labelRadius={({ innerRadius }) => innerRadius + 15}
          // radius={({ datum }) => 80 + datum.y * 20}
          padAngle={({ datum }) => datum.y}
          innerRadius={100}
          style={{
            labels: { fill: 'red', fontSize: 12, fontWeight: 'normal' },
          }}
        /> */}
        {/* <Svg width={300} height={300}>
          <Circle cx={150} cy={150} r={50} fill="#c43a31" />
          <VictoryPie
            standalone={false}
            width={300}
            height={300}
            innerRadius={75}
            data={data}
          />
        </Svg> */}
        <VictoryPie
          style={{ labels: { fill: 'white' } }}
          innerRadius={100}
          labelRadius={120}
          labels={({ datum }) => `# ${datum.y}`}
          labelComponent={<CustomLabel />}
          data={[
            { x: 1, y: 5 },
            { x: 2, y: 4 },
            { x: 3, y: 2 },
            { x: 4, y: 3 },
            { x: 5, y: 1 },
            { x: 5, y: 1 },
            { x: 5, y: 1 },
          ]}
        />
      </View>
    </BottomSheet>
  );
};

export default TimeChart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
});
