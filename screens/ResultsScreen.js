import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Polyline, Text as SvgText, Line } from 'react-native-svg';
import { useInvestmentStore } from '../store/investmentStore';

const ResultsScreen = ({ navigation }) => {
  const { results } = useInvestmentStore();
  
  if (!results) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>計算結果がありません</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>戻る</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const chartWidth = screenWidth - 80;
  const chartHeight = Math.min(screenHeight * 0.4, 400);
  const padding = 40;
  
  const maxValue = Math.max(...results.yearlyData.map(d => d.balance));
  const minValue = 0;
  
  const getX = (year) => padding + (year - 1) * ((chartWidth - 2 * padding) / (results.yearlyData.length - 1));
  const getY = (value) => chartHeight - padding - ((value - minValue) / (maxValue - minValue)) * (chartHeight - 2 * padding);
  
  const balancePoints = results.yearlyData.map(d => `${getX(d.year)},${getY(d.balance)}`).join(' ');
  const investedPoints = results.yearlyData.map(d => `${getX(d.year)},${getY(d.invested)}`).join(' ');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>計算結果</Text>
        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>最終評価額</Text>
          <Text style={styles.resultValue}>¥{Math.round(results.finalBalance).toLocaleString()}</Text>
        </View>
        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>最終利益</Text>
          <Text style={styles.resultValue}>¥{Math.round(results.totalProfit).toLocaleString()}</Text>
        </View>
        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>総投資額</Text>
          <Text style={styles.resultValue}>¥{Math.round(results.totalInvested).toLocaleString()}</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>年次推移</Text>
        <Svg height={chartHeight} width={chartWidth}>
          <Line x1={padding} y1={padding} x2={padding} y2={chartHeight - padding} stroke="#ccc" strokeWidth="1" />
          <Line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="#ccc" strokeWidth="1" />
          
          <Polyline points={balancePoints} fill="none" stroke="#007AFF" strokeWidth="2" />
          <Polyline points={investedPoints} fill="none" stroke="#FF6B6B" strokeWidth="2" />
          
          <SvgText x={chartWidth / 2} y={chartHeight - 10} textAnchor="middle" fontSize="12" fill="#666">年数</SvgText>
          <SvgText x={15} y={chartHeight / 2} textAnchor="middle" fontSize="12" fill="#666" transform={`rotate(-90 15 ${chartHeight / 2})`}>金額（円）</SvgText>
        </Svg>
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#007AFF' }]} />
            <Text style={styles.legendText}>評価額</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#FF6B6B' }]} />
            <Text style={styles.legendText}>投資額</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>パラメータを変更</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  noDataText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  resultsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  resultLabel: {
    fontSize: 16,
    color: '#666',
  },
  resultValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 18,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ResultsScreen;