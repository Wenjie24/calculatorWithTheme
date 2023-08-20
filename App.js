import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Touchable } from 'react-native';

export default function App() {
  const [CalculationStatement, SetCalculationStatement] = useState('');
  const [Answer, SetAnswer] = useState('');
  const [Theme, SetTheme] = useState(true)

  const MainButton = (props) => {
    return (
    <TouchableOpacity style={[styles.mainButtonContainer, { backgroundColor: containerBackgroundColor }]} disabled={props.disabled} onPress={() => MainControllerHandler(props.label)}>
    <Text style={[styles.mainButtonText, {color: textColor}]}>{props.label}</Text>
    </TouchableOpacity>
    );
  };
  const FunctionButton = (props) => {
    return (
    <TouchableOpacity style={[styles.FunctionButtonContainer, { backgroundColor: containerBackgroundColor }]} value={props.label} onPress={() => MainControllerHandler(props.label)}>
    <Text style={[styles.mainButtonText, {color: textColor}]}>{props.label}</Text>
    </TouchableOpacity>
    );
  };

  const MainControllerHandler = (value) => {
    if (value == 'Dark' || value == 'Light') {
      SetTheme(!Theme);
    };


    if (value == 'AC') {
      SetCalculationStatement('');
      SetAnswer('');
      return
    } else if (value == 'C') {
      SetCalculationStatement('');

    } else if (value == '<') {
      SetCalculationStatement(CalculationStatement.slice(0,-1));
    } else if (['1','2','3','4','5','6','7','8','9','0', '/','*','-','+','.','Ans'].includes(value)) {
      // If valid input

      if (CalculationStatement.length != 25) {
        // If No calculationStatment but have answer
        if (CalculationStatement == '' && Answer != '') {
          console.log("Start with valid input");
          if (['*','-','+','/','.'].includes(value)) {
            // If Have answer and is using operation, 
            SetCalculationStatement(Answer+value);
            return
            
          };
          if (value == 'Ans') {
            SetCalculationStatement(Answer);
            return
          };
          
        };
        
        // If there's calculationsatement 
        SetCalculationStatement(CalculationStatement+value);
      }



    }

    if (value == '=') {

      if (CalculationStatement != '') {
        try {
          SetAnswer(eval(CalculationStatement));
          SetCalculationStatement('');
        } catch (error) {
          console.log('Error as occured: ', error)
          // If got error
          let temp_calculation_statement = CalculationStatement;
          SetCalculationStatement('Error!');
          setTimeout(()=> SetCalculationStatement(temp_calculation_statement), 500)
          
        };
        
      };
      
    };



  };

  useEffect(() => {
    {CalculationStatement != '' ? SetAnswer('') : ''};
  });


  // Dark & Light Theme
  const containerBackgroundColor = Theme ? '#333333' : '#FFFFFF';
  const controllerBackgroundColor = Theme ? "#202020" : '#E6E6E6';
  const textColor = Theme ? 'white' : 'black';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: containerBackgroundColor }]}>

      <View style={styles.CalculationContainer}>
          {/* Calculation */}
          <Text adjustsFontSizeToFit={true} numberOfLines={1} style={[styles.BeforeCalculation, {color: textColor}]}>{CalculationStatement}</Text>

          {/* Answer */}
          <Text adjustsFontSizeToFit={true} numberOfLines={1} style={[styles.AfterCalculation, {color: textColor}]}>{Answer}</Text>
      </View>
      
 


      <View style={[styles.MainControllerContainer, {backgroundColor: controllerBackgroundColor}]}>
        {/* Main Button */}

        {/* First Row */}
        <View style={styles.Row}>
          <MainButton label="AC"/>
          <MainButton label="C"/>
          <MainButton label="/" disabled={Answer == '' && CalculationStatement == ''}/>
          <MainButton label="<"/>
        </View>

        {/* Second Row */}
        <View style={styles.Row}>
          <MainButton label="7"/>
          <MainButton label="8"/>
          <MainButton label="9"/>
          <MainButton label="*" disabled={Answer == '' && CalculationStatement == ''}/>
        </View>

        {/* Third Row */}
        <View style={styles.Row}>
          <MainButton label="4"/>
          <MainButton label="5"/>
          <MainButton label="6"/>
          <MainButton label="-" disabled={Answer == '' && CalculationStatement == ''}/>
        </View>

        {/* Fourth Row */}
        <View style={styles.Row}>
          <MainButton label="1"/>
          <MainButton label="2"/>
          <MainButton label="3"/>
          <MainButton label="+" disabled={Answer == '' && CalculationStatement == ''}/> 
        </View>

        {/* Fifth Row */}
        <View style={styles.Row}>
          <MainButton label={Answer ? 'Ans' : '!Ans'}/>
          <MainButton label="0"/>
          <MainButton label="."/>
          <MainButton label="=" disabled={CalculationStatement == ''}/> 
        </View>

        {/* Sixth Row */}
        <View style={styles.Row}>
          <FunctionButton label={Theme ? 'Dark' : 'Light'}/>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainButtonContainer: {
    width: 74,
    height: 71,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12/2,
    marginVertical: 12/2
  },
  FunctionButtonContainer: {
    width: 332,
    height: 71,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12/2,
    marginHorizontal: 12/2

  },
  mainButtonText : {
    fontSize: 32,
    fontWeight: '100'
  },
  Row: {
    flexDirection: 'row'
  },
  MainControllerContainer: {

    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    height: 550,
    justifyContent: 'center'
  },
  BeforeCalculation: {
    fontSize: 24,
    textAlign: 'right',
    fontWeight: '400'
  },
  AfterCalculation: {
    fontSize: 58,
    textAlign: 'right',
    fontWeight: '600'
  },
  CalculationContainer: {
    position: 'absolute',
    top: 65,
    right: 29,
    width: '80%',
    height: 140,
    flexWrap: 'warp',
    justifyContent: 'center'

  }
});
