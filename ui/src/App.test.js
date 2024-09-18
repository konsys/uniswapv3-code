import {
  amountEth,
  amountUsdc,
  calcAmount0,
  calcAmount1,
  calcL,
  calcP,
  liquidity0,
  liquidity1,
  priceToSqrtp,
  priceToTick,
  eth,
  Q96,
} from "./utils";

const liquidity = 1.5178823437515099e21;
const sqrtpCur = priceToSqrtp(5000);
const sqrtpCur1 = priceToSqrtp(5042);

test("milestone 1", () => {
  // L = (x * y)^1/2
  expect(Math.round(calcL(1, 4545) * 100) / 100).toBe(67.42);
  expect(Math.round(calcL(1, 5000) * 100) / 100).toBe(70.71);
  expect(Math.round(calcL(1, 5500) * 100) / 100).toBe(74.16);

  // P^1/2 = (y/x)^1/2
  expect(Math.round(calcP(1, 4545) * 100) / 100).toBe(67.42);
  expect(Math.round(calcP(1, 5000) * 100) / 100).toBe(70.71);
  expect(Math.round(calcP(1, 5500) * 100) / 100).toBe(74.16);

  // L = (x * y)^1/2
  expect(Math.round(calcL(2, 4545) * 100) / 100).toBe(95.34);
  expect(Math.round(calcL(2, 5000) * 100) / 100).toBe(100);
  expect(Math.round(calcL(2, 5500) * 100) / 100).toBe(104.88);

  // P^1/2 = (y/x)^1/2
  expect(Math.round(calcP(2, 4545) * 100) / 100).toBe(47.67);
  expect(Math.round(calcP(2, 5000) * 100) / 100).toBe(50);
  expect(Math.round(calcP(2, 5500) * 100) / 100).toBe(52.44);

  // P(i)^1/2 = 1.0001^1/2
  // i = log(1.0001^1/2) * P(i)^1/2
  expect(priceToTick(4545)).toBe(84222);
  expect(priceToTick(5000)).toBe(85176);
  expect(priceToTick(5500)).toBe(86129);

  const sqrtpLow = priceToSqrtp(4545);
  const sqrtpCur = priceToSqrtp(5000);
  const sqrtpUpp = priceToSqrtp(5500);

  const sqrCur = 5.602277097478614e30;
  expect(sqrtpLow).toBe(5.341294542274603e30);
  expect(sqrtpCur).toBe(sqrCur);
  expect(sqrtpUpp).toBe(5.875717789736565e30);

  const liq0 = liquidity0(amountEth, sqrtpCur, sqrtpUpp);
  const liq1 = liquidity1(amountUsdc, sqrtpCur, sqrtpLow);

  expect(liq0).toBe(1.5194373080147697e21);
  expect(liq1).toBe(liquidity);

  const liq = Math.min(liq0, liq1);
  expect(liq).toBe(liquidity);

  expect(calcAmount0(liq, sqrtpUpp, sqrtpCur)).toBe(998976618347425400);
  expect(calcAmount1(liq, sqrtpLow, sqrtpCur)).toBe(5e21);

  // expect(calcDeltaT(sqrtpCur)).toBe(5003.913912782393)
});

test("milestone 2", () => {
  const amountIn = 0.01337 * eth
  expect(amountIn).toBe(13370000000000000);

  const priceNext = (5598789932670289186088059666432 / (liquidity * Q96 + amountIn));

  expect(priceNext).toBe(6.737244039780869e+80);
});
