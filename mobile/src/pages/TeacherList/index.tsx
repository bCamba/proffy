import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton, ScrollView } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import api from '../../services/api';

import styles from './styles';

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [areFiltersVisible, setAreFiltersVisible] = useState(false);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoriteTeachers = JSON.parse(response);
        const favoriteTeachersIds = favoriteTeachers.map((teacher: Teacher) => {
          return teacher.id
        });

        setFavorites(favoriteTeachersIds);
      }
    });
  }

  useFocusEffect(() => {
    loadFavorites();
  })

  function handleToggleFiltersVisible() {
    setAreFiltersVisible(!areFiltersVisible);
  }

  async function handleFiltersSubmit() {
    loadFavorites();

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    });

    setAreFiltersVisible(false);
    setTeachers(response.data);
  }

  return (
    <View style={styles.container}>
      <PageHeader 
        title="Available Teachers"
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#FFF" />
          </BorderlessButton>
        )}
      >
        { areFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Subject</Text>
            <TextInput 
              style={styles.input}
              value={subject}
              onChangeText={text => setSubject(text)}
              placeholder="Which subject?"
              placeholderTextColor="#c1bccc"
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Week day</Text>
                <TextInput 
                  style={styles.input}
                  value={week_day}
                  onChangeText={text => setWeekDay(text)}
                  placeholder="Which week day?"
                  placeholderTextColor="#c1bccc"
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Time</Text>
                <TextInput 
                  style={styles.input}
                  value={time}
                  onChangeText={text => setTime(text)}
                  placeholder="What time?"
                  placeholderTextColor="#c1bccc"
                />
              </View>
            </View>

            <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
              <TextInput style={styles.submitButtonText}>Filter</TextInput>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView 
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem 
              key={teacher.id} 
              teacher={teacher}
              favorite={favorites.includes(teacher.id)}
            />
        )
        })}
      </ScrollView>
    </View>
  )
}

export default TeacherList;