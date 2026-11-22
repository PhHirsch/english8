import json,sys
cat=json.load(open("catalog.json"))
url=sys.argv[1] if len(sys.argv)>1 else ""
g=open("game.js.tpl").read().replace("/*CATALOG*/",json.dumps(cat,ensure_ascii=False)).replace("/*API_URL*/",url)
open("/home/claude/english8/game.js","w").write(g)
items={c["id"]:dict({"slot":c["slot"],"price":c["price"]},**({"months":c["months"]} if "months" in c else {})) for c in cat}
s=open("Code.gs.tpl").read().replace("/*ITEMS*/",json.dumps(items))
open("/home/claude/build/Code.gs","w").write(s)
