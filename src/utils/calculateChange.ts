import { EURO_TO_BGN_RATE } from '@/constants';

export const calculateChange = ({
  fullPrice,
  paidInEuro = 0,
  paidInBGN = 0,
}: {
  fullPrice?: number;
  paidInEuro?: number;
  paidInBGN?: number;
}) => {
  if (!fullPrice) return null;

  const paidInBGNConvertedToEuro = paidInBGN / EURO_TO_BGN_RATE;
  const totalPaidInEuro = paidInEuro + paidInBGNConvertedToEuro;
  const changeInEuro = totalPaidInEuro - fullPrice;

  return Number(changeInEuro.toFixed(2));
};
