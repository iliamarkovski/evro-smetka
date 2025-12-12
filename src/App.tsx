import { Button, InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, Label } from '@/components';
import { useState } from 'react';
import { EURO_TO_BGN_RATE, EURO_SIGN, BGN_SIGN, CUTOFF_DATE } from './constants';
import { calculateChange, cn, handleNumberInput } from '@/utils';

const App = () => {
  const [fullPrice, setFullPrice] = useState('');
  const [paidEuro, setPaidEuro] = useState('');
  const [paidBGN, setPaidBGN] = useState('');

  const change = calculateChange({
    fullPrice: Number(fullPrice),
    paidInEuro: Number(paidEuro),
    paidInBGN: Number(paidBGN),
  });

  const handleReset = () => {
    setFullPrice('');
    setPaidEuro('');
    setPaidBGN('');
  };

  const showBGN = new Date() < CUTOFF_DATE;
  console.log('showBGN: ', showBGN);

  return (
    <div className="bg-background flex min-h-dvh items-center justify-center p-4">
      <div className="bg-card w-full max-w-lg space-y-6 rounded-2xl border px-4 py-6 shadow-md sm:px-6">
        {/* Inputs */}
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="full-price">Цена за плащане в евро</Label>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>€</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                id="full-price"
                type="tel"
                value={fullPrice}
                onChange={(e) => {
                  setFullPrice(handleNumberInput(e.target.value));
                }}
                className="w-full"
                inputMode="decimal"
                pattern="[0-9]*[.,]?[0-9]*"
              />
            </InputGroup>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="paid-euro">
                Платена в <span>евро</span>
              </Label>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>€</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  id="paid-euro"
                  type="tel"
                  value={paidEuro}
                  onChange={(e) => setPaidEuro(handleNumberInput(e.target.value))}
                  className="w-full"
                  inputMode="decimal"
                  pattern="[0-9]*[.,]?[0-9]*"
                />
              </InputGroup>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="paid-bgn">
                Платена в <span>лева</span>
              </Label>
              <InputGroup>
                <InputGroupInput
                  id="paid-bgn"
                  type="tel"
                  value={paidBGN}
                  onChange={(e) => setPaidBGN(handleNumberInput(e.target.value))}
                  className="w-full text-right"
                  inputMode="decimal"
                  pattern="[0-9]*[.,]?[0-9]*"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>лв.</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-2 text-sm">
          <p>
            <strong>Дължима сума: </strong>
            {fullPrice ? (
              <>
                {EURO_SIGN}
                {Number(fullPrice).toFixed(2)}{' '}
                <span className="opacity-">
                  / {(Number(fullPrice) * EURO_TO_BGN_RATE).toFixed(2)}
                  {BGN_SIGN}
                </span>
              </>
            ) : (
              '-'
            )}
          </p>

          <p className={cn({ 'text-primary': change !== null && change < 0 })}>
            <strong>Остава за плащане: </strong>
            {change !== null ? (
              change < 0 ? (
                <>
                  {EURO_SIGN}
                  {Math.abs(change).toFixed(2)}
                  {showBGN && (
                    <span className="opacity-">
                      {' '}
                      / {(Math.abs(change) * EURO_TO_BGN_RATE).toFixed(2)}
                      {BGN_SIGN}
                    </span>
                  )}
                </>
              ) : (
                <>
                  {EURO_SIGN}0.00 / <span className="opacity-">0.00 {BGN_SIGN}</span>
                </>
              )
            ) : (
              '-'
            )}
          </p>

          <p>
            <strong>Платена в лева: </strong>
            {paidBGN ? `${Number(paidBGN).toFixed(2)} ${BGN_SIGN}` : '-'}
          </p>

          <p>
            <strong>Платена в евро: </strong>
            {paidEuro ? `${EURO_SIGN}${Number(paidEuro).toFixed(2)}` : '-'}
          </p>

          <p
            className={cn({
              'text-primary': change !== null && change > 0,
            })}>
            <strong>Ресто: </strong>
            {change !== null && change >= 0 ? (
              <>
                {EURO_SIGN}
                {change.toFixed(2)}
                {showBGN && (
                  <span className="opacity-">
                    {' '}
                    / {(change * EURO_TO_BGN_RATE).toFixed(2)} {BGN_SIGN}
                  </span>
                )}
              </>
            ) : (
              '-'
            )}
          </p>
          <p>
            <strong>Сметката е платена: </strong> {change !== null ? (change >= 0 ? '✅' : '❌') : '-'}
          </p>
        </div>
        <div className="flex justify-end">
          <Button type="button" onClick={handleReset} disabled={!fullPrice && !paidEuro && !paidBGN}>
            Изчисти
          </Button>
        </div>
      </div>
    </div>
  );
};

export { App };
