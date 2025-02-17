import math

min_tick = -887272
max_tick = 887272

q96 = 2**96
eth = 10**18
usdc_decimals = 10**6



def price_to_tick(p):
    return math.floor(math.log(p, 1.0001))

def price_to_sqrtp(p):
    return int(math.sqrt(p) * q96)

def tick_to_sqrtp(t):
    return int((1.0001 ** (t / 2)) * q96)

def tick_to_price(t):
    return (1.0001 ** (t / 2)) ** 2

def liquidity0(amount, pa, pb):
    if pa > pb:
        pa, pb = pb, pa
    return (amount * (pa * pb) / q96) / (pb - pa)

def liquidity1(amount, pa, pb):
    if pa > pb:
        pa, pb = pb, pa
    return amount * q96 / (pb - pa)

def calc_amount0(liq, pa, pb):
    if pa > pb:
        pa, pb = pb, pa
    return int(liq * q96 * (pb - pa) / pb / pa)

def calc_amount1(liq, pa, pb):
    if pa > pb:
        pa, pb = pb, pa
    return int(liq * (pb - pa) / q96)


# Liquidity provision
price_low = 4545
price_cur = 5000
price_upp = 5500

print(f"Price range: {price_low}-{price_upp}; current price: {price_cur}")

# int(math.sqrt(p) * q96)
sa = price_to_sqrtp(price_low)
sp = price_to_sqrtp(price_cur)
sb = price_to_sqrtp(price_upp)

print(f"\nSquare price low: {sa}; \nSquare price current: {sp}; \nSquare price upper: {sb}; \nq96: {q96}")
# int((p ** 1 / 2) * q96)

amount_eth = 1 * eth
amount_usdc = 5000 * eth

liq0 = liquidity0(amount_eth, sp, sb)
# (amount * (pa * pb) / q96) / (pb - pa)

liq1 = liquidity1(amount_usdc, sp, sa)
# amount * q96 / (pb - pa)

liq = int(min(liq0, liq1))
print(f"liq0 ETH: {liq0}; liq1 USDC: {liq1};")
ratio = liq1 / liq0
print(f"\nDeposit: {amount_eth/eth*ratio} ETH, {amount_usdc/eth} USDC; liquidity: {liq}")


print("Current tick:", price_to_tick(price_cur))
print("Upper tick:", price_to_tick(price_upp))
print("Lower tick:", price_to_tick(price_low))
# math.floor(math.log(p, 1.0001))

# Swap USDC for ETH
amount_in = 42 * eth

print(f"\nSelling {amount_in/eth} USDC")

price_diff = (amount_in * q96) // liq
price_next = sp + price_diff

print("Price diff:", price_diff)
print("Price next:", price_next)
print("New price:", (price_next / q96) ** 2)
print("New sqrtP:", price_next, price_next / q96)
print("New tick:", price_to_tick((price_next / q96) ** 2))


amount_in = calc_amount1(liq, price_next, sp)
amount_out = calc_amount0(liq, price_next, sp)

print("USDC in:", amount_in / eth)
print("ETH out:", amount_out / eth)

# Swap ETH for USDC
amount_in = 0.008403 * eth

print(f"\nSelling {amount_in/eth} ETH")

price_next = int((liq * q96 * sp) // (liq * q96 + amount_in * sp))
price_next_source = (price_next / q96) ** 2
new_tick = price_to_tick(price_next_source)
print("New price:", price_next_source)
print("New sqrtP:", price_next)
print("New tick:", new_tick)
print("Price from tick ----------->>>>:", tick_to_price(new_tick))

amount_in = calc_amount0(liq, price_next, sp)
amount_out = calc_amount1(liq, price_next, sp)
print(f"\nliquidity: {liq}")

print("ETH in:", amount_in / eth)
print("USDC out:", amount_out / eth)

# tick = 85176
# word_pos = tick >> 8 # or tick // 2**8
# bit_pos = tick % 256
# print(f"\nWord {word_pos}, bit {bit_pos}")
# # Word 332, bit 184

# mask = 2**bit_pos # or 1 << bit_pos
# print(f"\n", format(mask, '#0258b'))  

# word = (2**256) - 1 # set word to all ones
# print(f"\n", format(word ^ mask, '#0258b'))  
