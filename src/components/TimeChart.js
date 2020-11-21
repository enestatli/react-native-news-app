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
  // const totalTimeRef = React.useRef(0);
  const [average, setAverage] = React.useState(0);

  React.useEffect(() => {
    try {
      if (user !== null) {
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
              // console.log(ifq);
              data_[ifq].y = total;
            });
            setData(data_);
          }
        })();
      }
    } catch (err) {
      console.log('error while fetching timespent', err.message);
    }
  }, []);

  React.useEffect(() => {
    let a = 0;
    data.map((t) => (a += t.y));
    // console.log('TOTAL:', a);
    setAverage(a / 7);
    // console.log(average / 3600, 'hours', (average % 3600) / 60, 'minutes');
  }, [average]);

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
            {`Dailiy average ${Math.floor(average / 3600)} hours ${Math.floor(
              (average % 3600) / 60,
            )} minutes`}
          </Text>
        </View>
        {/* //TODO make it responsive height,width */}
        <VictoryChart polar theme={VictoryTheme.material} height={300}>
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
