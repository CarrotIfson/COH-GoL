//2P rules
/*  
    If Empty
    1) The cell has exactly three white neighbours and the number of black neighbours
        is different from three. In this case a white token is born in the cell.

        W   e   e       W   e   e
        W   E   B  ->   W   W   B
        W   e   B       W   e   B

    2) The cell has exactly three white and three black neighbours. In this case an
        unbiased coin determines whether a white or black token is born in the cell.

        W   e   B         W   e   B | W   e   B 
        W   E   B  -rdm-> W   W   B | W   B   B 
        W   e   B         W   e   B | W   e   B 

    If Colorized
    1) If the difference between the number of white and black neighbours is two or three,
        then the white token survives.
        W   W   e       W   e   e
        W   W   B  ->   W   W   B
        W   e   B       W   e   B

        B   B   B       B   B   B
        W   W   B  ->   W   W   B
        W   e   B       W   e   B 

        W   E   E       W   E   E
        W   W   E  ->   W   W   E
        W   E   B       W   E   B

    
    2) If the difference between the number of white and black neighbours is one and the
        number of white neighbours is at least two, then the white token survives.

        E   E   E       E   E   E
        W   W   E  ->   W   W   E
        W   E   B       W   E   B

        W   W   B       W   W   B
        W   W   B  ->   W   W   B
        W   E   B       W   E   B

 
        E   E   E       E   E   E
        E   W   B  ->   E   B   B
        W   E   B       W   E   B

*/

export const bCUBE_SEED_1P = "1111";
export const bCUBE_SEED_2P = "2222";
export const bCUBE_SEED    = "11221122";




export const bCUBE_EXP_1P     = "011001100000";
export const bCUBE_EXP_2P     = "022002200000"; 
export const bCUBE_EXP_SEED = "011002200110022000000000";
export const bBLINKER_SEED_1P = "000001110000";
export const bBLINKER_SEED_2P = "002000200020";
export const bBLINKER_SEED    = "000000200111002000000020"; 
export const bBLINKER_SEED_ODD ="001000000010022200100000";

export const bCUBE_BLINKER = "011000200110002000000020";
export const bCUBE_BLINKER_ODD = "011000000110022200000000";


export const bBLINKER_CUBE = "000002200111022000000000";
export const bBLINKER_CUBE_ODD = "001002200010022000100000";
    
export const b1SEED_100P1 = "1011100110110010101000011110111101110010000010111111111000101111000001100010100010110100100011000111";
export const b1SEED_100P2 = "0000202202022222202202000002000002000200022220202202200202002020202220020002000022200200220202200022";

export const b2SEED_100P1 = "1010100001001110101100111100111100001100001001101010000000101001001001111111001010010111111101111101";
export const b2SEED_100P2 = "2200200200202020002000200220202202020022222202200002200022220200020222000022220022202020020200200222";

export const b3SEED_100P1 = "1000011101001000000110101010011001011101001011011000011101000001111100001000111100110011000110110110";
export const b3SEED_100P2 = "2222220020002000022222200220002022220020200202022222000222202202222202200220202220202022222002202000";

export const b4SEED_100P1 = "0000001110110010010011100001010010111101101111011011110001101101100100110010011110000000001100001100";
export const b4SEED_100P2 = "2200022220200202020002000222202200000202020020002020220002220202000020002020200202200000022202222000";

export const b5SEED_100P1 = "0000001000111000010010001111101101111111010010110000000010110110101001111110110110100011110110101001";
export const b5SEED_100P2 = "2220000200002000222200202200200200200220022200220002222202020002222022000202022202202000222000202220";

// ''.join([str(random.randint(0, 1)) for _ in range(100)])
// ''.join([str(random.randint(0, 1)*2) for _ in range(100)])

 


 
