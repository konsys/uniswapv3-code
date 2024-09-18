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

test("first swap", () => {
  const sqrCur = 5.602277097478614e30;

  const sqrDeltaP = 2192253463713690532467206957;
  const amountIn = 42 * eth * Q96;
  expect(amountIn / liquidity).toBe(sqrDeltaP);

  const newSqwrt = sqrCur + sqrDeltaP;
  expect(newSqwrt).toBe(5.604469350942327e30);

  const newPrice = (newSqwrt / Q96) ** 2;
  expect(newPrice).toBe(5003.913912782393);

  const newTick = priceToTick(newPrice);
  expect(newTick).toBe(85184);

  const amountIn1 = calcAmount1(liquidity, sqrtpCur, newSqwrt);
  expect(Math.round(amountIn1 / eth)).toBe(42.0);

  const amountIn0 = calcAmount0(liquidity, sqrtpCur, newSqwrt);
  expect(amountIn0 / eth).toBe(0.00839671424216093);
  // const amountOut1 = calcAmount0(liquidity, sqrtpLow, sqrtpCur);

  // print("USDC in:", amount_in / eth)
  // print("ETH out:", amount_out / eth)
  // # USDC in: 42.0
  // # ETH out: 0.008396714242162444
});

test("milestone 2", () => {
  const amountIn = 0.01337 * eth
  expect(amountIn).toBe(13370000000000000);

  expect(priceToTick(4993.5)).toBe(85163);
  // P^1/2 = Q96 * sqrtpCur
  // L = liqudity * Q96
  const priceNext = (liquidity * Q96 * sqrtpCur) / (liquidity * Q96 + amountIn * sqrtpCur);
  expect(priceNext).toBe(5.598789932670289e+30);

  const newPrice = (priceNext / Q96) ** 2;
  expect(newPrice).toBe(4993.777388290041);

  const newTick = priceToTick((priceNext / Q96) ** 2);
  expect(newTick).toBe(85163);

  const ethIn = calcAmount0(liquidity, priceNext, sqrtpCur);
  expect(ethIn / eth).toBe(0.013369999999998142);

  const ethOut = calcAmount1(liquidity, priceNext, sqrtpCur);
  expect(ethOut / eth).toBe(66.80838889019013);
});
