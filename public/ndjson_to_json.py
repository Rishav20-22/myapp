f1=open("data.json","r")
input=f1.read()
#print(input)
x =input. replace('\n',',')
#print(input)
f2=open("data.json","w")
a = "{ \"packets\":"+"["+x+"]"+"}"
f2.write(a)
f1.close()