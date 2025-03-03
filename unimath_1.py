import math

min_tick = -887272
max_tick = 887272

q96 = 2**96
eth = 10**18
usdc_decimals = 10**6

#
# Calculate x and y given liquidity and price range
#
def calculate_x(L, sp, sa, sb):
    sp = max(min(sp, sb), sa)     # if the price is outside the range, use the range endpoints instead
    return L * (sb - sp) / (sp * sb)

def calculate_y(L, sp, sa, sb):
    sp = max(min(sp, sb), sa)     # if the price is outside the range, use the range endpoints instead
    return L * (sp - sa)

def get_liquidity_0(x, sa, sb):
    return x * sa * sb / (sb - sa)
    # (amount * (pa * pb) / q96) / (pb - pa)

def get_liquidity_1(y, sa, sb):
    return y / (sb - sa)

def get_liquidity(x, y, sp, sa, sb):
    if sp <= sa:
        liquidity = get_liquidity_0(x, sa, sb)
    elif sp < sb:
        liquidity0 = get_liquidity_0(x, sp, sb)
        liquidity1 = get_liquidity_1(y, sa, sp)
        liquidity = min(liquidity0, liquidity1)
    else:
        liquidity = get_liquidity_1(y, sa, sb)
    return liquidity


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



#
# Two different ways how to calculate p_a. calculate_a1() uses liquidity as an input, calculate_a2() does not.
#
def calculate_a1(L, sp, sb, x, y):
    # https://www.wolframalpha.com/input/?i=solve+L+%3D+y+%2F+%28sqrt%28P%29+-+a%29+for+a
    # sqrt(a) = sqrt(P) - y / L
    return (sp - y / L) ** 2

def calculate_a2(sp, sb, x, y):
    # https://www.wolframalpha.com/input/?i=solve+++x+sqrt%28P%29+sqrt%28b%29+%2F+%28sqrt%28b%29++-+sqrt%28P%29%29+%3D+y+%2F+%28sqrt%28P%29+-+a%29%2C+for+a
    # sqrt(a) = (y/sqrt(b) + sqrt(P) x - y/sqrt(P))/x
    #    simplify:
    # sqrt(a) = y/(sqrt(b) x) + sqrt(P) - y/(sqrt(P) x)
    sa = y / (sb * x) + sp - y / (sp * x)
    return sa ** 2

#
# Two different ways how to calculate p_b. calculate_b1() uses liquidity as an input, calculate_b2() does not.
#
def calculate_b1(L, sp, sa, x, y):
    # https://www.wolframalpha.com/input/?i=solve+L+%3D+x+sqrt%28P%29+sqrt%28b%29+%2F+%28sqrt%28b%29+-+sqrt%28P%29%29+for+b
    # sqrt(b) = (L sqrt(P)) / (L - sqrt(P) x)
    return ((L * sp) / (L - sp * x)) ** 2

def calculate_b2(sp, sa, x, y):
    # find the square root of b:
    # https://www.wolframalpha.com/input/?i=solve+++x+sqrt%28P%29+b+%2F+%28b++-+sqrt%28P%29%29+%3D+y+%2F+%28sqrt%28P%29+-+sqrt%28a%29%29%2C+for+b
    # sqrt(b) = (sqrt(P) y)/(sqrt(a) sqrt(P) x - P x + y)
    P = sp ** 2
    return (sp * y / ((sa * sp - P) * x + y)) ** 2

#
# Calculating c and d
#
def calculate_c(p, d, x, y):
    return y / ((d - 1) * p * x + y)

def calculate_d(p, c, x, y):
    return 1 + y * (1 - c) / (c * p * x)

def calculate_next_price(L, sp, deltaY):
    return int((L * q96 * sp) / (L * q96 + deltaY * sp))

def get_price_next_y(L, sp, amount_in):
    price_diff = amount_in / L
    print("________ {price_diff}", price_diff, sp)
    price_next = sp + price_diff
    return price_next

# Liquidity provision
a = 4545
p = 5000
b = 5500

sp = math.sqrt(p)
sa = math.sqrt(a)
sb =  math.sqrt(b)


L = get_liquidity(1, 5000, sp, sa, sb)
x = calculate_x(L, sp, sa, sb)
y = calculate_y(L, sp, sa, sb)

print(f"x: {x}")
print(f"y: {y}")
print(f"usdc: {y + x * y}")
print(f"liq: {L} \n") 

sp1 =  math.sqrt(4546)
x = calculate_x(L, sp1, sa, sb)
y = calculate_y(L, sp1, sa, sb)

print(f"x1: {x}")
print(f"y1: {y}")
print(f"usdc: {y + x * y} \n")

sp1 =  math.sqrt(5499)
x = calculate_x(L, sp1, sa, sb)
y = calculate_y(L, sp1, sa, sb)

print(f"x1: {x}")
print(f"y1: {y}")
print(f"usdc: {y + x * y} \n")

# print(f"pTick: { price_to_tick(5000)}")
# print(f"aTick: { price_to_tick(4545)}")
# print(f"bTick: { price_to_tick(5500)}\n")

# a = calculate_a1(L, sp, sb, x, y)
# print(f"a1: { a }")
# a = calculate_a2(sp, sb, x, y)
# print(f"a2: { a }")

# b = calculate_b1(L, sp, sb, x, y)
# print(f"b1: { b }")
# b = calculate_b2(sp, sa, x, y) 
# print(f"b2: { b }") 

# c = sb / sp
# d = sa / sp

# c = calculate_c(p, d, x, y)
# print(f"c: { c }")
# d = calculate_d(p, c, x, y)
# print(f"d: { d }") 

# amount_in = math.sqrt(42)

# pn = get_price_next_y(L, sp, amount_in)
# print(f"pn: {pn}")

# x = calculate_x(L, pn, sa, sb)
# y = calculate_y(L, pn, sa, sb)

# L1 = get_liquidity_1(math.sqrt(5042), sa, sb)
# L2 = get_liquidity_1(math.sqrt(5000), sa, sb)
# print(f"xNew: {x}")
# print(f"yNew: {y}")
# print(f"L1: {L1}", f"L: {L}", f"L2: {L2}", sp)