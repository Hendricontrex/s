import*as F from"node:fs"
const{MAKEFUN_INPUT_DIR:I,MAKEFUN_OUTPUT_DIR:O}=process.env;
let g,w,d,c=0,Y=[],T=[],o=[];
let f=s=>{let u=s,K=[s];Y[s]=s;T[s]=++c;while(K.length){let p=K.pop();if(p<u)u=p;for(let e of d){let q=p+e;if(g[q]!='#'&&!o[q]&&T[q]!=c)T[q]=c,Y[q]=p,K.push(q)}}return u};
let S=(G,B,p)=>{
let Q=[B],V=[p],M=[''],X={},h=0;
for(;h<Q.length&&Q.length<2e5;h++){
let b=Q[h],m=M[h];
b.forEach(x=>o[x]=1);
for(let x of b){
for(let j in d){
let e=d[j],t=x+e;
if(g[t]=='#'||o[t])continue;
f(V[h]);
if(T[x-e]!=c)continue;
let s='',q=x-e;
for(;q!=V[h];q=Y[q])s='rdlu'[d.indexOf(q-Y[q])]+s;
let N=b.slice();N[b.indexOf(x)]=t;N.sort((a,b)=>a-b);
o[t]=1;
let k=N+':'+f(x);
o[t]=0;
if(X[k])continue;
X[k]=1;Q.push(N);V.push(x);s=m+s+'rdlu'[j];M.push(s);
if(N.join()==G.join())return[s,x];
}}
b.forEach(x=>o[x]=0);
}
return null;
};
let V=(B,G,p)=>{
let R=[],A={},z=x=>T[x]==c;
o.fill(0);
for(let i=p-p%w;i<p-p%w+w;i++)o[i]=1;
for(let x of B){
if(A[x]!=null)continue;
f(x);
let b=B.filter(z),v=G.filter(z);
for(let y of b)A[y]=R.length;
R.push([b,v]);
}
let m='';
for(let k in R){
o.fill(0);
for(let j in R)if(j!=k)for(let x of R[j][j<k?1:0])o[x]=1;
let t=S(R[k][1],R[k][0],p);
if(!t)return'';
m+=t[0];p=t[1];
}
return m;
};
for(let k=1;k<6;k++){
let id='i00'+k,t=F.readFileSync(I+'/'+id+'/level.txt','utf8');
g=t.replace(/\n/g,'');w=t.indexOf('\n');d=[1,w,-1,-w];
let B=[],G=[],p=0,i=0;
for(let ch of g){if('$*'.includes(ch))B.push(i);if('.*+'.includes(ch))G.push(i);if('@+'.includes(ch))p=i;i++}
let m=V(B,G,p);
F.mkdirSync(O+'/'+id);
F.writeFileSync(O+'/'+id+'/solution.txt',m);
}
