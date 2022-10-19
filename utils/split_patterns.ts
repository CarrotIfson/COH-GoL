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




 


 
