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