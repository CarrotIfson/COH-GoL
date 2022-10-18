from cgitb import lookup


permutations = []
for a in ['0','1','2']:
    for b in ['0','1','2']:
        for c in ['0','1','2']:
            for d in ['0','1','2']:
                for e in ['0','1','2']:
                    for f in ['0','1','2']:
                        for g in ['0','1','2']:
                            for h in ['0','1','2']:
                                permutations.append(a+b+c+d+e+f+g+h)

 
lookup_table = dict()
for p in permutations:   
    twos = str(p.count("2"))
    ones = str(p.count("1"))
    diff = abs(int(ones)-int(twos))
    #if cell is EMPTY
    if(ones == '3'):
        if(twos == '3'): 
            lookup_table['0'+p] = "3"
            pass
        else:
            lookup_table['0'+p] = "1"
            pass
    elif(twos == '3'):
        lookup_table['0'+p] = "2"
        pass
    else:
        lookup_table['0'+p] = "0"
        pass
       
    #if cell is WHITE
    if(diff == 1 and ones == '1'):
        lookup_table['1'+p] = "0"
    elif(diff not in (2,3)):
        lookup_table['1'+p] = "0"
    else:
        lookup_table['1'+p] = "1"
 
    #if cell is BLACk
    if(diff == 1 and twos == '1'): 
        lookup_table['2'+p] = "0"
    elif(diff not in (2,3)):
        lookup_table['2'+p] = "0"
    else:
        lookup_table['2'+p] = "2"



import json

keys = []
values = []


for key in lookup_table:
    keys.append(key)
    values.append(lookup_table[key])
 
data = {"keys":keys,
        "vals":values}

with open('app.json', 'w') as f:
    json.dump(data, f) 
 