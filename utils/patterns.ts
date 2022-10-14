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


export const CUBE_SEED_2P = [E, E, E, E, E, E, E, E, //7
                             W, W, E, E, E, E, E, E, //15
                             W, W, E, E, E, E, B, B, //23
                             E, E, E, E, E, E, B, B] //31

export const BLINKER_SEED_2P = [E, W, E, E, E, E, E, E,
                                E, W, E, E, E, B, B, B,
                                E, W, E, E, E, E, E, E,
                                E, E, E, E, E, E, E, E] //even

export const BLINKER_ODD_2P =  [E, E, E, E, E, E, B, E,
                                W, W, W, E, E, E, B, E,
                                E, E, E, E, E, E, B, E,
                                E, E, E, E, E, E, E, E] //odd

 


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
export const COLLISION_WWIN_2P = [E, E, E, E, E,
                                  W, W, W, B, B,
                                  E, E, E, E, E]    
export const COLLISION_WEND_2P = [E, W, E, E, E,
                                  E, W, E, E, E,
                                  E, W, E, E, E]  
export const COLLISION_BEND_2P = [E, E, E, B, E,
                                  E, E, E, B, E,
                                  E, E, E, B, E]                             
//////////////////////////////////////////////////////////////////////////////////////////////
// ABANDON ALL HOPE ALL YE WHO ENTER HERE


export const TWENTYTEN_RECT_2P = [ E, E, E, E, E, E, E, E, B, E, E, E, E, E, E, E, E, E, B, E,
                                   E, E, E, E, E, E, E, E, B, E, E, E, E, E, E, E, E, E, B, E,
                                   E, E, E, B, E, E, E, E, B, E, E, E, E, B, E, E, E, E, B, E,
                                   E, E, E, E, B, E, E, E, E, E, E, E, E, E, B, E, E, E, E, E,
                                   E, E, B, B, B, E, E, E, E, E, E, E, B, B, B, E, E, E, E, E, //5//5
                                   E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E,
                                   E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E,
                                   E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E,
                                   B, B, E, E, E, E, E, E, E, E, B, B, E, E, E, E, E, E, E, E,
                                   B, B, E, E, E, E, E, E, E, E, B, B, E, E, E, E, E, E, E, E] //p=8


export const FIFTEEN_SQUARE_2P = [E, E, E, B, E, E, E, E, E, E, E, E, E, B, E,
                                  E, E, E, B, E, E, E, E, E, E, E, E, E, B, E,
                                  E, E, E, B, E, E, E, E, B, E, E, E, E, B, E,
                                  E, E, E, E, E, E, E, E, E, B, E, E, E, E, E,
                                  E, E, E, E, E, E, E, B, B, B, E, E, E, E, E, //5//5
                                  E, E, E, E, E, E, E, E, E, E, E, E, E, E, E,
                                  E, E, E, E, E, E, E, E, E, E, E, E, E, E, E,
                                  E, E, E, E, E, E, E, E, E, E, E, E, E, E, E,
                                  E, E, E, E, E, B, B, E, E, E, E, E, E, E, E,
                                  E, E, E, E, E, B, B, E, E, E, E, E, E, E, E,
                                  E, E, E, B, E, E, E, E, E, E, E, E, E, B, E,
                                  E, E, E, B, E, E, E, E, E, E, E, E, E, B, E,
                                  E, E, E, B, E, E, E, E, B, E, E, E, E, B, E,
                                  E, E, E, E, E, E, E, E, E, B, E, E, E, E, E,
                                  E, E, E, E, E, E, E, B, B, B, E, E, E, E, E] //p=8

export const THIRTY_SQUARE_2P = [E, E, E, E, E, E, E, E, B, E, E, E, E, E, E, E, E, E, B, W, E, E, E, E, E, E, E, E, B, E,
                                 E, E, E, E, E, E, E, E, B, E, E, E, W, W, W, E, E, E, B, E, E, E, E, E, E, E, E, E, B, E,
                                 E, E, E, B, E, E, E, E, B, E, E, E, E, B, E, E, E, E, B, E, E, E, E, B, E, E, E, E, B, E,
                                 E, E, E, E, B, E, E, E, E, E, E, E, E, E, B, E, E, E, E, E, E, E, E, E, B, E, E, E, E, E,
                                 E, E, B, B, B, E, E, E, E, E, E, E, B, B, B, E, E, E, E, E, E, E, B, B, B, E, E, E, E, E, //5
                                 E, E, E, E, E, E, E, E, E, W, W, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E,
                                 E, E, E, E, E, E, E, E, E, W, W, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E,
                                 E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E,
                                 B, B, E, E, E, E, E, E, E, E, B, B, E, E, E, E, E, E, E, E, B, B, E, E, E, E, E, E, E, E,
                                 B, B, E, E, E, E, E, E, E, E, B, B, E, E, E, E, E, E, E, E, B, B, E, E, E, E, E, E, E, E,
                                 E, E, E, E, E, E, E, E, B, E, E, E, E, E, E, E, E, E, B, E, E, E, E, E, E, E, E, E, B, E,
                                 E, E, E, E, E, E, E, E, B, E, E, E, E, E, E, E, E, E, B, E, E, E, E, E, E, E, E, E, B, E,
                                 E, E, E, B, E, E, E, E, B, E, E, E, E, B, E, E, E, E, B, E, E, E, E, B, E, E, E, E, B, E,
                                 E, E, E, E, B, E, E, E, E, E, E, E, E, E, B, E, E, E, E, E, E, E, E, E, B, E, E, E, E, E,
                                 E, E, B, B, B, E, E, E, E, E, E, E, B, B, B, E, E, E, E, E, E, E, B, B, B, E, E, E, E, E, //5
                                 E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, W, E, E, E, E, E, E, E, E, W, E, E, E, E, E,
                                 E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, W, E, E, E, E, E, E, E, E, E, W, E, E, E, E,
                                 E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, W, E, E, E, E, E, E, E, E, E, W, E, E, E, E,
                                 B, B, E, E, W, E, E, E, E, E, B, B, E, E, E, E, E, E, E, E, B, B, E, W, W, E, E, E, E, E,
                                 B, B, E, E, E, W, E, E, E, E, B, B, E, E, E, E, E, E, E, E, B, B, E, E, E, E, E, E, E, E,
                                 E, E, E, E, E, E, E, E, B, E, E, E, E, E, E, E, E, E, B, E, E, E, E, E, E, E, E, E, B, E,
                                 E, E, E, E, E, E, W, E, B, E, E, E, E, E, E, E, E, W, B, E, E, E, E, E, E, E, E, E, B, E,
                                 E, E, E, B, E, E, W, E, B, E, E, E, E, B, E, E, W, E, B, E, E, E, E, B, E, E, E, E, B, E,
                                 E, E, E, E, B, E, W, E, E, E, E, E, E, E, B, E, E, E, E, E, E, E, E, E, B, E, E, E, E, E,
                                 E, E, B, B, B, E, E, E, E, E, E, E, B, B, B, E, E, E, E, E, E, E, B, B, B, E, E, E, E, E, //5
                                 E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, W, E,
                                 E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, W, W, E, E, E, E, E, E, E, E, E, E, W, E,
                                 E, E, E, W, E, E, E, E, E, E, E, E, E, E, E, E, W, W, E, E, E, E, E, E, E, E, E, E, W, E,
                                 B, B, E, E, E, E, E, E, E, E, B, B, E, E, E, E, E, E, E, E, B, B, E, E, E, E, E, E, E, E,
                                 B, B, E, E, E, E, E, E, E, E, B, B, E, E, E, E, E, E, E, E, B, B, E, E, E, E, E, E, E, E] //p=8

 