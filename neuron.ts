import { signals } from "./init";
import { neuronType } from "./type";

const initializationWeight = (n: number) =>
  Array.from({ length: n }, Math.random);

const getD = (x: number[]) => x[x.length - 1];

//чистая функция нейрона
//активационная функция Ферми
const neuronFn = ({ signal, weight, beta, w0 }: neuronType) => {
  const u = signal.reduce((a, b, i) => a + b * weight[i], w0 * -1);
  const y = 1 / (1 + Math.exp(beta * u));
  return y;
};

const getNeuronTrained = (signals: number[][]) => {
  const w0 = 0.1;
  const beta = 0.9;
  const n = 0.8;
  const e = 0.01;

  const teachProcedure = (signal: number[], weight: number[]) => {
    const y = neuronFn({ signal, weight, w0, beta });
    const d = getD(signal);
    if (Math.abs(d - y) > e) {
      const b = beta * (d - y) * y * (1 - y);
      weight.forEach((x, i) => {
        weight[i] = x - n * b * signal[i];
      });
      teachProcedure(signal, weight);
    }
  };

  const getWeightTrained = () => {
    const weight = initializationWeight(signals[0].length);
    signals.forEach((x) => teachProcedure(x, weight));
    return weight;
  };

  const weight = getWeightTrained();

  return (signal: number[]) => neuronFn({ signal, w0, beta, weight });
};

const neuronTrained = getNeuronTrained(signals);

const getRes = (signals: number[]) => {
  const r = neuronTrained(signals);
  return `${signals.join("")} | ${r > 0.6 ? "Нечётное" : "Чётное  "} | ${r}`;
};

[
  ...signals,
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 1, 1, 1, 1, 0],
  [0, 0, 0, 1, 1, 1, 1, 1],
].forEach((x) => console.log(getRes(x)));
