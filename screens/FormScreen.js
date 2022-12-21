import React from 'react';
import * as RandomApi from '../apis/RandomApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import { Button, Picker, ScreenContainer, withTheme } from '@draftbit/ui';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const FormScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

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
          style={styles(theme).Picker83d183d8}
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
          const handler = async () => {
            try {
              const addResponse = await RandomApi.addPOST(Constants, {
                choose: pickerValue,
                something: textInputValue,
              });
              navigation.navigate('EditScreen', { id: addResponse?.id });
            } catch (err) {
              console.error(err);
            }
          };
          handler();
        }}
        style={styles(theme).Button2d5f6a36}
        title={'Submit'}
      />
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
    Picker83d183d8: { width: '60%' },
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

export default withTheme(FormScreen);
