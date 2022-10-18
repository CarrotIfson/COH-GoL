export const O = false;
export const l = true;

export const SOME_SEED = [l, O, O, O]; //
export const CUBE_SEED = [O, O, O, O,
                          O, l, l, O,
                          O, l, l, O,
                          O, O, O, O]; //still-life
 
export const BOAT_SEED =  [O, O, O, O, O,
                           O, l, l, O, O,
                           O, l, O, l, O,
                           O, O, l, O, O,
                           O, O, O, O, O]; //still-life

export const BLINKER_SEED = [O, O, O, O, O,
                             O, O, l, O, O,
                             O, O, l, O, O,
                             O, O, l, O, O,
                             O, O, O, O, O]; //oscillator p=2

export const BEACON_SEED = [O, O, O, O, O, O,
                            O, l, l, O, O, O,
                            O, l, O, O, O, O,
                            O, O, O, O, l, O,
                            O, O, O, l, l, O,
                            O, O, O, O, O, O]; //oscillator p=2
 

export const GLIDER_SEED = [O, l, O, O,
                            O, O, l, O,
                            l, l, l, O,
                            O, O, O, O]; //spaceship p=4
export const GLIDER_END  = [O, O, O, O,
                            O, O, l, O,
                            O, O, O, l,
                            O, l, l, l]; //spaceship p=4

export const GLIDER_SEED = [O, l, O, O,
                            O, O, l, O,
                            l, l, l, O,
                            O, O, O, O]; //spaceship p=4

export const HUNDRED_SEED = [O, l, O, O, O, O, O, O, l, O,
                             O, O, l, O, O, O, O, O, l, O,
                             l, l, l, O, O, O, O, O, l, O,
                             O, O, O, O, O, O, O, O, O, O,
                             O, O, O, O, O, O, O, O, O, O, //5
                             O, O, O, O, O, O, O, O, O, O,
                             O, O, O, O, O, O, O, O, O, O,
                             O, O, O, O, O, O, O, O, O, O,
                             l, l, O, O, O, O, O, O, O, O,
                             l, l, O, O, O, O, O, O, O, O]

export const HUNDRED_END = [O, O, O, O, O, O, O, O, l, O,
                            O, O, O, O, O, O, O, O, l, O,
                            O, O, O, l, O, O, O, O, l, O,
                            O, O, O, O, l, O, O, O, O, O,
                            O, O, l, l, l, O, O, O, O, O, //5
                            O, O, O, O, O, O, O, O, O, O,
                            O, O, O, O, O, O, O, O, O, O,
                            O, O, O, O, O, O, O, O, O, O,
                            l, l, O, O, O, O, O, O, O, O,
                            l, l, O, O, O, O, O, O, O, O] //p=8



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

export const E = 0;
export const W = 1;
export const B = 2;



export const SOME_SEED_2P = [E, W, B, E]; //
export const bSOME_SEED_2P = "0120";

export const TEST_LAYOUT = "000010000"

export const CUBE_SEED_2P = [E, E, E, E, E, E, E, E, //7
                             W, W, E, E, E, E, E, E, //15
                             W, W, E, E, E, E, B, B, //23
                             E, E, E, E, E, E, B, B, //23
                             E, E, E, E, E, E, E, E] //31 
export const bCUBE_SEED_2P = "0000000011000000110000220000002200000000";
                            //0----5----5----5----5----5----5----5---- 
export const bCUBE_SEED_2Pv = "0000011001100000"; 

export const BLINKER_SEED_2P = [E, W, E, E, E, E, E, E,
                                E, W, E, E, E, B, B, B,
                                E, W, E, E, E, E, E, E,
                                E, E, E, E, E, E, E, E] //even
export const bBLINKER_SEED_2P = "01000000010002220100000000000000";

export const wbBLINKER_SEED_2P = "020001002000100200010";


export const BLINKER_ODD_2P =  [E, E, E, E, E, E, B, E,
                                W, W, W, E, E, E, B, E,
                                E, E, E, E, E, E, B, E,
                                E, E, E, E, E, E, E, E] //odd
export const bBLINKER_ODD_2P = "00000020111000200000002000000000";

export const HUNDRED_WSEED_2P = [E, W, E, E, E, E, E, E, W, E,
                                 E, E, W, E, E, E, E, E, W, E,
                                 W, W, W, E, E, E, E, E, W, E,
                                 E, E, E, E, E, E, E, E, E, E,
                                 E, E, E, E, E, E, E, E, E, E, //5
                                 W, E, E, E, E, E, E, E, E, E,
                                 E, E, E, E, E, E, E, E, E, E,
                                 E, E, E, E, E, E, E, E, E, E,
                                 W, W, E, E, E, E, W, E, E, E,
                                 W, W, E, E, W, W, E, E, E, E]
export const bHUNDRED_WSEED_2P = "0100000010001000001011100000100000000000000000000010000000000000000000000000000011000010001100110000";
export const bHUNDRED_WEND_2P  = "0000000010000000001000010000100000100000001110000000000000000000000000000000000011000000001100000000";




export const HUNDRED_WEND_2P = [E, E, E, E, E, E, E, E, W, E,
                                E, E, E, E, E, E, E, E, W, E,
                                E, E, E, W, E, E, E, E, W, E,
                                E, E, E, E, W, E, E, E, E, E,
                                E, E, W, W, W, E, E, E, E, E, //5
                                E, E, E, E, E, E, E, E, E, E,
                                E, E, E, E, E, E, E, E, E, E,
                                E, E, E, E, E, E, E, E, E, E,
                                W, W, E, E, E, E, E, E, E, E,
                                W, W, E, E, E, E, E, E, E, E] //p=8
                            

export const HUNDRED_BSEED_2P = [E, B, E, E, E, E, E, E, B, E,
                                 E, E, B, E, E, E, E, E, B, E,
                                 B, B, B, E, E, E, E, E, B, E,
                                 E, E, E, E, E, E, E, E, E, E,
                                 E, E, E, E, E, E, E, E, E, E, //5
                                 B, E, E, E, E, E, E, E, E, E,
                                 E, E, E, E, E, E, E, E, E, E,
                                 E, E, E, E, E, E, E, E, E, E,
                                 B, B, E, E, E, E, B, E, E, E,
                                 B, B, E, E, B, B, E, E, E, E]
export const bHUNDRED_BSEED_2P = "0200000020002000002022200000200000000000000000000020000000000000000000000000000022000020002200220000";
                            
export const HUNDRED_BEND_2P = [E, E, E, E, E, E, E, E, B, E,
                                E, E, E, E, E, E, E, E, B, E,
                                E, E, E, B, E, E, E, E, B, E,
                                E, E, E, E, B, E, E, E, E, E,
                                E, E, B, B, B, E, E, E, E, E, //5
                                E, E, E, E, E, E, E, E, E, E,
                                E, E, E, E, E, E, E, E, E, E,
                                E, E, E, E, E, E, E, E, E, E,
                                B, B, E, E, E, E, E, E, E, E,
                                B, B, E, E, E, E, E, E, E, E] //p=8
export const bHUNDRED_BEND_2P = "0000000020000000002000020000200000200000002220000000000000000000000000000000000022000000002200000000";

export const PUFFER_BSEED_2P = [E, E, E, E, E, E, E, B, E, E, E, E, E,
                                E, E, E, E, E, B, E, E, E, B, E, E, E,
                                E, E, E, E, B, E, E, E, E, E, E, E, E,
                                E, E, E, E, B, E, E, E, E, B, E, E, E,
                                E, E, E, E, B, B, B, B, B, E, E, E, E,
                                E, E, E, E, E, E, E, E, E, E, E, E, E,
                                E, E, E, E, E, E, E, E, E, E, E, E, E,
                                E, E, E, E, E, E, E, E, E, E, E, E, E,
                                E, E, E, E, E, B, B, E, E, E, E, E, E,
                                E, E, E, E, B, B, E, B, B, B, E, E, E,
                                E, E, E, E, E, B, B, B, B, E, E, E, E,
                                E, E, E, E, E, E, B, B, E, E, E, E, E, //E
                                E, E, E, E, E, E, E, E, E, E, E, E, E,
                                E, E, E, E, E, E, E, E, E, B, B, E, E, //5
                                E, E, E, E, E, E, E, B, E, E, E, E, B,
                                E, E, E, E, E, E, B, E, E, E, E, E, E,
                                E, E, E, E, E, E, B, E, E, E, E, E, B,
                                E, E, E, E, E, E, B, B, B, B, B, B, E,
                                E, E, E, E, E, E, E, E, E, E, E, E, E] //19x12

export const COLLISION_SEED_2P = [E, W, E, B, E,
                                  E, W, E, B, E,
                                  E, W, E, B, E]    
export const bCOLLISION_SEED_2P = "010200102001020";
export const COLLISION_WWIN_2P = [E, E, E, E, E,
                                  W, W, W, B, B,
                                  E, E, E, E, E] 
export const bCOLLISION_WWIN_2P = "000001112200000";   
export const COLLISION_WEND_2P = [E, W, E, E, E,
                                  E, W, E, E, E,
                                  E, W, E, E, E]  
export const bCOLLISION_WEND_2P = "010000100001000";  
export const COLLISION_BEND_2P = [E, E, E, B, E,
                                  E, E, E, B, E,
                                  E, E, E, B, E] 
export const bCOLLISION_BEND_2P = "000200002000020";
//////////////////////////////////////////////////////////////////////////////////////////////
// ABANDON ALL HOPE ALL YE WHO ENTER HERE


export const FIFTEEN_SQUARE_2P = [ W, E, E, B, E, E, E, W, W, E, E, E, E, B, E,
                                   W, E, E, B, E, B, B, W, B, B, E, E, E, B, E,
                                   W, E, E, B, E, B, B, E, B, B, W, B, E, B, E,
                                   E, B, B, E, E, E, B, E, E, W, W, B, E, E, E,
                                   E, B, B, E, E, E, E, B, B, B, E, B, E, E, E,  
                                   E, W, W, E, E, E, W, W, E, E, W, E, W, W, E,
                                   E, B, B, E, E, E, E, W, E, W, W, B, B, E, E,
                                   E, B, W, B, E, E, E, E, E, E, E, B, B, E, W,
                                   E, E, E, E, B, B, B, E, W, W, E, W, W, E, W,
                                   E, B, B, B, B, B, B, W, E, E, E, W, W, E, W,
                                   E, E, E, B, E, E, E, W, E, E, E, E, E, B, E,
                                   B, E, E, B, E, E, E, E, W, E, E, E, E, B, E,
                                   B, E, E, B, W, W, E, W, B, E, E, E, E, B, E,
                                   E, E, E, E, W, E, E, W, E, B, E, E, B, E, E,
                                   E, E, E, E, E, E, E, W, B, B, E, E, B, B, B];
export const bFIFTEEN_SQUARE_2P ="100200011000020100202212200020100202202212020022000200112000022000022202000011000110010110022000010112200021200000002201000022201101101022222210001101000200010000020200200001000020200211012000020000010010200200000000012200222";

export const TWENTY_SQUARE_2P =    [E, E, E, E, E, E, E, E, B, E, E, B, E, E, E, E, E, E, B, E,
                                    W, W, W, E, E, E, E, E, B, E, W, W, W, B, B, E, E, E, B, E,
                                    E, E, E, B, B, W, E, E, B, E, B, B, E, B, E, B, E, E, B, E,
                                    E, E, W, B, B, E, E, E, E, E, B, B, E, E, B, E, W, W, E, E,
                                    E, E, B, B, B, E, E, E, E, E, E, E, B, B, B, E, E, E, E, E,
                                    E, W, W, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, B, E,
                                    E, E, W, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E,
                                    E, E, E, E, E, E, E, W, E, E, E, E, E, E, E, E, B, W, E, W,
                                    B, B, W, E, W, E, E, W, E, E, B, B, E, E, W, E, B, W, E, E,
                                    B, B, E, E, W, W, E, W, E, E, B, B, E, E, W, W, B, W, E, E,
                                    E, E, E, E, E, E, E, E, B, E, E, E, W, W, E, E, E, E, B, E,
                                    W, W, W, E, W, E, E, E, B, E, W, W, W, E, E, E, E, E, B, W,
                                    B, B, B, B, E, W, E, E, B, E, E, E, E, B, E, W, E, E, B, W,
                                    E, E, E, E, B, E, E, E, W, E, E, E, E, E, B, E, E, E, E, E,
                                    E, E, B, B, B, E, E, E, W, W, E, B, B, B, B, E, E, E, E, E,
                                    E, E, E, E, E, E, E, B, B, E, E, W, E, E, E, E, E, E, E, E,
                                    E, E, E, E, E, E, E, E, E, E, E, W, E, E, E, E, E, E, B, B,
                                    E, W, W, W, E, E, E, W, E, E, E, W, E, E, E, E, E, W, E, B,
                                    B, B, E, E, W, B, B, W, E, E, B, B, E, E, W, E, E, W, E, E,
                                    B, B, E, E, W, W, E, W, E, E, B, B, E, E, W, W, E, W, E, E]
export const bTWENTY_SQUARE_2P = "0000000020020000002011100000201112200020000221002022020200200012200000220020110000222000000022200000011000000000000000200010000000000000000000000001000000002101221010010022001021002200110100220011210000000000200011000020111010002011100000212222010020000201002100002000100000200000002220001102222000000000000220010000000000000000000100000022011100010001000001022200122100220010010022001101002200110100";

export const THIRTY_SQUARE_2P =    [E, E, E, E, E, E, E, E, B, E, E, E, E, E, E, E, E, E, B, E, E, E, E, E, E, E, E, E, B, E,
                                    W, W, W, E, E, E, E, E, B, E, W, W, W, E, E, E, E, E, B, E, W, W, W, E, E, E, E, E, B, E,
                                    E, E, E, B, E, W, E, E, B, E, E, E, E, B, E, W, E, E, B, E, E, E, E, B, E, W, E, E, B, E,
                                    E, E, E, E, B, E, E, E, E, E, E, E, E, E, B, E, E, E, E, E, E, E, E, E, B, E, E, E, E, E,
                                    E, E, B, B, B, E, E, E, E, E, E, E, B, B, B, E, E, E, E, E, E, E, B, B, B, E, E, E, E, E,
                                    E, W, W, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E,
                                    E, E, W, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E,
                                    E, E, E, E, E, E, E, W, E, E, E, E, E, E, E, E, B, W, E, E, E, E, E, E, E, E, E, W, E, E,
                                    B, B, E, E, W, E, E, W, E, E, B, B, E, E, W, E, B, W, E, E, B, B, E, E, W, E, E, W, E, E,
                                    B, B, E, E, W, W, E, W, E, E, B, B, E, E, W, W, B, W, E, E, B, B, E, E, W, W, E, W, E, E,
                                    E, E, E, E, E, E, E, E, B, E, E, E, E, E, E, E, E, E, B, E, E, E, E, E, E, E, E, E, B, E,
                                    W, W, W, E, E, E, E, E, B, E, W, W, W, E, E, E, E, E, B, E, W, W, W, E, E, E, E, E, B, E,
                                    B, B, B, B, E, W, E, E, B, E, E, E, E, B, E, W, E, E, B, E, E, E, E, B, E, W, E, E, B, E,
                                    E, E, E, E, B, E, E, E, E, E, E, E, E, E, B, E, E, E, E, E, E, E, W, W, W, E, E, E, E, E,
                                    E, E, B, B, B, E, E, E, E, E, E, E, B, B, B, E, E, E, E, E, E, E, B, B, B, E, E, E, E, E,
                                    E, E, E, E, E, E, E, E, E, E, E, W, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E,
                                    E, E, E, E, E, E, E, E, E, E, E, W, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E,
                                    E, E, E, E, E, E, E, W, E, E, E, W, E, E, E, E, E, W, E, E, E, E, E, E, B, B, E, W, E, E,
                                    B, B, E, E, W, E, E, W, E, E, B, B, E, E, W, E, E, W, E, E, B, B, E, E, B, B, E, W, E, E,
                                    B, B, E, E, W, W, E, W, E, E, B, B, E, E, W, W, E, W, E, E, B, B, E, B, W, W, B, W, E, E,
                                    E, E, E, E, E, E, E, E, B, E, E, E, E, E, E, E, E, E, B, E, E, E, E, B, E, E, E, E, B, E,
                                    W, W, W, E, E, E, E, E, B, E, W, W, W, E, E, E, E, E, B, E, W, W, W, E, B, B, B, E, B, E,
                                    E, E, E, B, E, W, E, E, B, E, E, E, E, B, E, W, E, E, B, E, E, E, E, B, E, W, B, E, B, E,
                                    E, E, E, E, B, E, E, E, E, E, E, E, E, E, B, E, E, E, E, E, E, E, E, E, B, E, E, E, E, E,
                                    E, E, B, B, B, E, W, E, E, E, E, E, B, B, B, E, E, E, E, E, E, W, B, B, B, E, E, E, B, E,
                                    E, E, E, E, W, W, E, E, E, E, E, E, E, E, E, E, E, E, W, W, E, W, E, E, E, E, E, E, B, E,
                                    E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, W, W, E, W, E, B, E, E, E, E, B, E,
                                    E, E, E, E, E, E, E, W, E, E, E, E, E, E, E, E, E, W, E, E, E, E, E, B, E, E, E, W, E, E,
                                    B, B, E, E, W, E, E, W, E, E, B, B, E, E, W, E, E, W, E, E, B, B, E, B, W, E, E, W, E, E,
                                    B, B, E, E, W, W, E, W, E, E, B, B, E, E, W, W, E, W, E, E, B, B, E, E, W, W, E, W, E, E]
export const bTHIRSTY_SQUARE_2P ="000000002000000000200000000020111000002011100000201110000020000201002000020100200002010020000020000000002000000000200000002220000000222000000022200000011000000000000000000000000000001000000000000000000000000000000000010000000021000000000100220010010022001021002200100100220011010022001121002200110100000000002000000000200000000020111000002011100000201110000020222201002000020100200002010020000020000000002000000011100000002220000000222000000022200000000000000001000000000000000000000000000001000000000000000000000000010001000001000000220100220010010022001001002200220100220011010022001101002202112100000000002000000000200002000020111000002011100000201110222020000201002000020100200002012020000020000000002000000000200000002220100000222000000122200020000011000000000000110100000020000000000000000000110102000020000000010000000001000002000100220010010022001001002202100100220011010022001101002200110100";
 