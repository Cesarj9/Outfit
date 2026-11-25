import json,csv,sys
r=json.loads(sys.stdin.read())
d=json.load(open('pokelike_db.json')); d['partidas'].append(r); json.dump(d,open('pokelike_db.json','w'),ensure_ascii=False,indent=1)
h=open('historial_partidas.csv').readline().strip().split(',')
with open('historial_partidas.csv','a',newline='') as f: csv.DictWriter(f,fieldnames=h,extrasaction='ignore').writerow(r)
