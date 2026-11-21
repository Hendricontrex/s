import F from"node:fs"
const{MAKEFUN_INPUT_DIR:I,MAKEFUN_OUTPUT_DIR:O}=process.env;
let g,w,d,c=0,Y=[],T=[],o=[];
let f=s=>{T[s]=c;let u=s;for(let e of d){let q=s+e;if(g[q]!='#'&&!o[q]&&T[q]!=c){Y[q]=s;u=Math.min(u,f(q))}}return u};
let S=(G,B,p)=>{
let Q=[[B,p,'']],X={[B+':'+p]:1},h=0;
for(;Q[h]&&Q.length<2e5;h++){
let[b,v,m]=Q[h];
b.forEach(x=>o[x]=1);
for(let x of b)for(let j in d){
let e=d[j],t=x+e;
if(g[t]=='#'||o[t])continue;
c++,f(v);
if(T[x-e]!=c)continue;
let s='',y=x-e;
for(;y!=v;y=Y[y])s='rdlu'[d.indexOf(y-Y[y])]+s;
let N=b.map(y=>y^x?y:t);N.sort();
o[t]=1;
let k=N+':'+(c++,f(x));
o[t]=0;
if(X[k])continue;
X[k]=1;s=m+s+'rdlu'[j];Q.push([N,x,s]);
if(N+''==G+'')return[s,x];
}
b.forEach(x=>o[x]=0);
}
return null;
};
for(let k=1;k<6;k++){
let n='/i00'+k,A=I+n,D=O+n,t=F.readFileSync(A+'/level.txt')+'';
g=t.replace(/\n/g,'');w=t.indexOf('\n');d=[1,w,-1,-w];
let p=0,i=0,B=[],G=[];
for(let ch of g){
let r=2*(i%w>6)+(i/w>8);
if(ch=='$'||ch=='*')(B[r]??=[]).push(i);
if('.*+'.includes(ch))(G[r]??=[]).push(i);
if(ch=='@'||ch=='+')p=i;
i++;
}
let m='';
for(let k in B){
o.fill(0);
for(let j in B)if(j!=k)B[j].forEach(x=>o[x]=1);
let t=S(G[k].sort(),B[k],p);
if(!t){m='';break}
m+=t[0];p=t[1];B[k]=G[k];
}
F.mkdirSync(D);
F.writeFileSync(D+'/solution.txt',m);
}
