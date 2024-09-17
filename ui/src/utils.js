export const xSize = 5000;
export const ySize = 1;
export const Q96 = 2 ** 96;

export const eth = 10 ** 18;
export const amountEth = 1 * eth;
export const amountUsdc = 5000 * eth;

export function calcPByY(y, L) {
  return Math.sqrt(y / L);
}

export function calcP(x, y) {
  return Math.sqrt(y / x);
}

export const calcL = (x, y) => {
  return Math.sqrt(y * x);
};

export const computeSellX = (deltaX = 10, r = 1) => {
  return (ySize * r * deltaX) / (xSize + r * deltaX);
};

export const computeBuyX = (deltaY = 10, r = 1) => {
  return (xSize * deltaY) / (r * (ySize - deltaY));
};

export const priceToTick = (p) => {
  return Math.floor(getBaseLog(p, 1.0001));
};

export function getBaseLog(x, y) {
  return Math.log(x) / Math.log(y);
}

export function priceToSqrtp(p) {
  return Math.sqrt(p) * Q96;
}

export function liquidity0(amount, pa, pb) {
  let a = pa;
  let b = pb;
  if (pa > pb) {
    a = pb;
    b = pa;
  }
  return (amount * (a * b)) / Q96 / (b - a);
}

export function liquidity1(amount, pa, pb) {
  let a = pa;
  let b = pb;
  if (pa > pb) {
    a = pb;
    b = pa;
  }
  return (amount * Q96) / (b - a);
}

export function calcAmount0(liq, pa, pb) {
  let a = pa;
  let b = pb;
  if (pa > pb) {
    a = pb;
    b = pa;
  }
  return (liq * Q96 * (b - a)) / a / b;
}

export function calcAmount1(liq, pa, pb) {
  let a = pa;
  let b = pb;
  if (pa > pb) {
    a = pb;
    b = pa;
  }
  return (liq * (b - a)) / Q96;
}

export function calcDeltaT(sqrtpCur) {
  // const amountIn = 42 * 10 ** 18;
  const amountIn = 42 * 1;
  const priceDiff = amountIn * Q96; // liq
  const priceNext = sqrtpCur + priceDiff;
  // return (priceNext / Q96) ** 2
  return priceNext;
  // return amountIn * Q96 / 1.5194373080147697e+21
}
