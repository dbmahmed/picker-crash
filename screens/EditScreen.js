import React from 'react';
import * as RandomApi from '../apis/RandomApi.js';
import { Button, Picker, ScreenContainer, withTheme } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const EditScreen = props => {
  const { theme } = props;
  const { navigation } = props;

  const [pickerValue, setPickerValue] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');

  return (
    <ScreenContainer
      style={styles(theme).screen}
      scrollable={false}
      hasSafeArea={false}
    >
      <RandomApi.FetchGetGET
        id={1}
        onData={fetchData => {
          try {
            setTextInputValue(fetchData?.something);
            setPickerValue(fetchData?.choose);
          } catch (err) {
            console.error(err);
          }
        }}
      >
        {({ loading, error, data, refetchGet }) => {
          const fetchData = data;
          if (!fetchData || loading) {
            return <ActivityIndicator />;
          }

          if (error) {
            return (
              <Text style={{ textAlign: 'center' }}>
                There was a problem fetching this data
              </Text>
            );
          }

          return (
            <>
              <View style={styles(theme).View88c44c3e}>
                <Text style={styles(theme).Texte9f9757c}>{'Something'}</Text>
                <TextInput
                  onChangeText={newTextInputValue => {
                    try {
                      setTextInputValue(newTextInputValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={styles(theme).TextInput03ad5433}
                  value={textInputValue}
                  editable={true}
                  placeholder={'Enter a value...'}
                />
              </View>

              <View style={styles(theme).View28ebd9ed}>
                <Text style={styles(theme).Texte9f9757c}>{'Choose'}</Text>
                <Picker
                  onValueChange={newPickerValue => {
                    try {
                      setPickerValue(newPickerValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={styles(theme).Pickeracdc8b7b}
                  options={['Option 1', 'Option 2', 'Option 3']}
                  value={pickerValue}
                  placeholder={'Select an option'}
                  leftIconMode={'inset'}
                  type={'solid'}
                  iconSize={24}
                />
              </View>
              <Button
                onPress={() => {
                  try {
                    navigation.goBack();
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={styles(theme).Button2d5f6a36}
                title={'Back'}
              />
            </>
          );
        }}
      </RandomApi.FetchGetGET>
    </ScreenContainer>
  );
};

const styles = theme =>
  StyleSheet.create({
    Button2d5f6a36: {
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      fontFamily: 'System',
      fontWeight: '700',
      textAlign: 'center',
    },
    Fetch431eb058: { minHeight: 40 },
    Pickeracdc8b7b: { color: theme.colors['Strong'], width: '60%' },
    TextInput03ad5433: {
      borderBottomWidth: 1,
      borderColor: theme.colors.divider,
      borderLeftWidth: 1,
      borderRadius: 8,
      borderRightWidth: 1,
      borderTopWidth: 1,
      paddingBottom: 8,
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 8,
    },
    Texte9f9757c: { color: theme.colors.strong },
    View28ebd9ed: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
      marginTop: 20,
    },
    View88c44c3e: { flexDirection: 'row', justifyContent: 'space-between' },
    screen: { justifyContent: 'center', paddingLeft: 20, paddingRight: 20 },
  });

export default withTheme(EditScreen);
