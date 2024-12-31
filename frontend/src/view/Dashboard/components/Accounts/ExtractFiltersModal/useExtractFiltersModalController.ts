import { useState } from "react";
import { MONTHS } from "../../../../../app/config/constants";
import { TransactionType } from "../../../../../enums/TransactionType";

export function useExtractFiltersModalController() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedTransactionType, setSelectedTransactionType] = useState<TransactionType>();

  function handleChangeTransactionType(type: TransactionType) {
    setSelectedTransactionType(type)
  }

  function handleChangeYear(step: number) {
    setSelectedYear(prevState => prevState + step)
  }

  function handleChangeMonth(step: number) {
    setSelectedMonth(prevState => {
      const nextStep = prevState + step;

      if (prevState < MONTHS.length-1 && nextStep >= 0) {
        return nextStep;
      } else {
        return 0;
      }
    });
  }

  return {
    handleChangeYear,
    handleChangeMonth,
    handleChangeTransactionType,
    selectedYear,
    selectedMonth,
    selectedTransactionType
  }
}
