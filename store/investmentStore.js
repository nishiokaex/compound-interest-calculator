import { create } from 'zustand';

const calculateCompoundInterest = (principal, annualRate, years, monthlyAddition) => {
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = years * 12;
  const yearlyData = [];
  
  let currentBalance = principal;
  let totalInvested = principal;
  
  for (let year = 1; year <= years; year++) {
    for (let month = 1; month <= 12; month++) {
      currentBalance = currentBalance * (1 + monthlyRate) + monthlyAddition;
      totalInvested += monthlyAddition;
    }
    
    yearlyData.push({
      year,
      balance: currentBalance,
      invested: totalInvested,
      profit: currentBalance - totalInvested
    });
  }
  
  return {
    finalBalance: currentBalance,
    totalInvested,
    totalProfit: currentBalance - totalInvested,
    yearlyData
  };
};

export const useInvestmentStore = create((set, get) => ({
  principal: 1000000,
  annualRate: 5,
  years: 10,
  monthlyAddition: 50000,
  results: null,
  setPrincipal: (value) => set({ principal: value }),
  setAnnualRate: (value) => set({ annualRate: value }),
  setYears: (value) => set({ years: value }),
  setMonthlyAddition: (value) => set({ monthlyAddition: value }),
  calculate: () => {
    const { principal, annualRate, years, monthlyAddition } = get();
    const results = calculateCompoundInterest(principal, annualRate, years, monthlyAddition);
    set({ results });
  }
}));