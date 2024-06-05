import React, {useRef, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import Vector from './Vector';

const App = () => {
  const [centerPos, setCenterPos] = useState<Vector>(Vector.zero);
  const windowDimensions = Dimensions.get('window');
  const initialPos = new Vector(windowDimensions.width / 2, windowDimensions.height / 2.5);
  const [pos, setPos] = useState<Vector>(initialPos);

  const [parkingSlots, setParkingSlots] = useState([
    {id: 1, available: true, x: 60, y: 60, width: 30, height: 50},
    {id: 2, available: false, x: 180, y: 60, width: 30, height: 50},
    {id: 3, available: true, x: 300, y: 60, width: 30, height: 50},
    {id: 4, available: false, x: 60, y: 180, width: 30, height: 50},
    {id: 5, available: true, x: 180, y: 180, width: 30, height: 50},
    {id: 6, available: false, x: 300, y: 180, width: 30, height: 50},
    {id: 7, available: true, x: 60, y: 300, width: 30, height: 50},
    {id: 8, available: false, x: 180, y: 300, width: 30, height: 50},
    {id: 9, available: true, x: 300, y: 300, width: 30, height: 50},
  ]);

  const ref = useRef(null);

  return (
    <View
      style={styles.container}
      onTouchStart={e => {
        if (e.currentTarget !== e.target) return;
        setCenterPos(Vector.zero);
        setPos(new Vector(e.nativeEvent.pageX, e.nativeEvent.pageY));
      }}
      onTouchMove={e => {
        setPos(new Vector(e.nativeEvent.pageX, e.nativeEvent.pageY));
      }}>
      <View
        style={{
          position: 'absolute',
          top: -centerPos.y,
          left: -centerPos.x,
          transform: [{translateX: pos.x - 200}, {translateY: pos.y - 200}],
        }}>
        <View
          ref={ref}
          onTouchStart={e => {
            if (
              e.nativeEvent.locationX >= 0 &&
              e.nativeEvent.locationX <= 400 &&
              e.nativeEvent.locationY >= 0 &&
              e.nativeEvent.locationY <= 400
            ) {
              const vec = new Vector(
                e.nativeEvent.locationX - 200,
                e.nativeEvent.locationY - 200,
              );
              setCenterPos(v => {
                setPos(v2 => v2.minus(v.minus(vec)));
                return vec;
              });
            }
          }}
          style={styles.box}>
          {parkingSlots.map(slot => (
            <View
              key={slot.id}
              style={[
                styles.parkingSlot,
                {
                  left: slot.x,
                  top: slot.y,
                  width: slot.width,
                  height: slot.height,
                  backgroundColor: slot.available ? 'green' : 'gray',
                },
              ]}>
              <Text style={styles.parkingSlotText}>{slot.id}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.modal}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>DMC 한강 호반 써밋</Text>
          <TouchableOpacity style={styles.fullViewButton}>
            <Text style={styles.fullViewButtonText}>전체보기</Text>
          </TouchableOpacity>
          <Text style={styles.parkingText}>주차 가능 대수: 50</Text>
        </View>
        <Text style={styles.modalText}>주차장 현황 조회</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>B1</Text>
            <Text style={styles.countButtonText}>160/341</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>B2</Text>
            <Text style={styles.countButtonText}>309/499</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.announcementButton}>
          <Text style={styles.buttonText}>{'길 안내 > 주차 위치 저장'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height: 400,
    width: 400,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 280,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  fullViewButton: {
    backgroundColor: '#DCDCDC',
    padding: 10,
    borderRadius: 100,
    alignItems: 'center',
    marginLeft: 5,
  },
  fullViewButtonText: {
    color: 'black',
    fontSize: 10,
  },
  parkingText: {
    fontSize: 13,
    color: '#000',
  },
  modalText: {
    fontSize: 13,
    marginBottom: 10,
    color: '#DCDCDC',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'flex-start',
    width: '48%',
    height: 70,
  },
  announcementButton: {
    backgroundColor: '#007BFF',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  countButtonText: {
    color: 'white',
    fontSize: 20,
    paddingTop: 5,
    fontWeight: 'bold',
  },
  parkingSlot: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  parkingSlotText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
