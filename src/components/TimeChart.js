import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPolarAxis,
} from 'victory-native';
import firestore from '@react-native-firebase/firestore';

import BottomSheet from './BottomSheetModal';
import { AuthContext } from '../context';

//TODO bigger flex to bottomshet

const TimeChart = ({ bs, tb, theme }) => {
  const timeRef = firestore().collection('users');
  const { user } = React.useContext(AuthContext);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    //TODO try catch!!!
    (async () => {
      const snap = (await timeRef.doc(user.uid).get()).data();
      if (snap) {
        const data_ = [
          { x: 'Monday', y: 0 },
          { x: 'Tuesday', y: 0 },
          { x: 'Wednesday', y: 0 },
          { x: 'Thursday', y: 0 },
          { x: 'Friday', y: 0 },
          { x: 'Saturday', y: 0 },
          { x: 'Sunday', y: 0 },
        ];
        snap.timeSpent.map((i) => {
          let dayOfTheWeek;
          let total = 0;
          switch (i.dayId) {
            case 1:
              dayOfTheWeek = 'Monday';
              break;
            case 2:
              dayOfTheWeek = 'Tuesday';
              break;
            case 3:
              dayOfTheWeek = 'Wednesday';
              break;
            case 4:
              dayOfTheWeek = 'Thursday';
              break;
            case 5:
              dayOfTheWeek = 'Friday';
              break;
            case 6:
              dayOfTheWeek = 'Saturday';
              break;
            default:
              dayOfTheWeek = 'Sunday';
              break;
          }
          i.totalTime.map((m) => {
            total += m.t;
          });
          const ifq = data_.findIndex((d) => d.x === dayOfTheWeek);
          console.log(ifq);
          data_[ifq].y = total;
          // data_.push({ x: dayOfTheWeek.toString(), y: total });
        });
        setData(data_);
      }
    })();
    console.log(data, 'WORKSSSS');
  }, []);

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
            data={data}
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
