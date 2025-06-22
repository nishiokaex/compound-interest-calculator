import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useInvestmentStore } from '../store/investmentStore';

const InputScreen = ({ navigation }) => {
  const { principal, annualRate, years, monthlyAddition, setPrincipal, setAnnualRate, setYears, setMonthlyAddition, calculate } = useInvestmentStore();
  
  const handleCalculate = () => {
    calculate();
    navigation.navigate('Results');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>複利計算機</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>元本（円）</Text>
        <TextInput
          style={styles.input}
          value={principal.toString()}
          onChangeText={(text) => setPrincipal(Number(text) || 0)}
          keyboardType="numeric"
          placeholder="1000000"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>年利率（%）</Text>
        <TextInput
          style={styles.input}
          value={annualRate.toString()}
          onChangeText={(text) => setAnnualRate(Number(text) || 0)}
          keyboardType="numeric"
          placeholder="5"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>投資期間（年）</Text>
        <TextInput
          style={styles.input}
          value={years.toString()}
          onChangeText={(text) => setYears(Number(text) || 0)}
          keyboardType="numeric"
          placeholder="10"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>毎月の追加投資額（円）</Text>
        <TextInput
          style={styles.input}
          value={monthlyAddition.toString()}
          onChangeText={(text) => setMonthlyAddition(Number(text) || 0)}
          keyboardType="numeric"
          placeholder="50000"
        />
      </View>
      
      <TouchableOpacity style={styles.button} onPress={handleCalculate}>
        <Text style={styles.buttonText}>計算する</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 18,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default InputScreen;