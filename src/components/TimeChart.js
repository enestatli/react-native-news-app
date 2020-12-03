import React, { useEffect } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPolarAxis,
} from 'victory-native';
import firestore from '@react-native-firebase/firestore';

import BottomSheet from './BottomSheetModal';
import { AuthContext } from '../context';
import { windowHeight } from '../utils/dimensions';

const TimeChart = ({ bs, tb, theme }) => {
  const timeRef = firestore().collection('users');
  const { user } = React.useContext(AuthContext);
  const [data, setData] = React.useState([]);
  const [average, setAverage] = React.useState(0);

  useEffect(() => {
    try {
      if (user) {
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

              data_[ifq].y = total;
            });
            setData(data_);
          }
        })();
      }
    } catch {
      Alert.alert(
        'Error occured',
        'Error while fetching time you spent please try again',
      );
    }
  }, []);

  useEffect(() => {
    if (data) {
      let a = 0;
      data.map((t) => (a += t.y));
      setAverage(a / 7);
    }
  }, [data]);

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
            {Math.floor(average / 3600) !== 0
              ? `Daily average ${Math.floor(average / 3600)} hours ${Math.floor(
                  (average % 3600) / 60,
                )} minutes`
              : `Daily average 0 hours ${Math.floor(
                  (average % 3600) / 60,
                )} minutes`}
          </Text>
        </View>
        <VictoryChart
          polar
          theme={VictoryTheme.material}
          height={windowHeight / 2.4}
        >
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
                  axis: { stroke: theme.colors.icon },
                  axisLabel: {
                    fontSize: 13,
                    padding: 12,
                    fill: theme.colors.foreground,
                  },

                  ticks: {
                    stroke: theme.colors.foreground,
                    size: 35,
                    opacity: 0.8,
                  },
                  grid: { stroke: 'transparent' },
                }}
                axisValue={d}
              />
            );
          })}
          <VictoryBar
            style={{
              data: {
                fill: ({ datum }) =>
                  datum.x === 3
                    ? theme.colors.foreground
                    : theme.colors.primary,
                stroke: ({ index }) =>
                  +index % 2 === 0
                    ? theme.colors.background
                    : theme.colors.foreground,
                fillOpacity: 0.7,
                strokeWidth: 3,
                borderRadius: 12,
                width: 15,
              },
            }}
            data={data}
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
    marginBottom: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
