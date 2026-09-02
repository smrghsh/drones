(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ql="169",cs={ROTATE:0,DOLLY:1,PAN:2},ss={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},$d=0,Rc=1,Zd=2,Uu=1,Jd=2,qn=3,Qn=0,tn=1,en=2,fi=0,hs=1,lr=2,Pc=3,Lc=4,Qd=5,Ri=100,ef=101,tf=102,nf=103,sf=104,rf=200,of=201,af=202,lf=203,Ka=204,$a=205,cf=206,hf=207,uf=208,df=209,ff=210,pf=211,mf=212,gf=213,bf=214,Za=0,Ja=1,Qa=2,ms=3,el=4,tl=5,nl=6,il=7,Ou=0,_f=1,vf=2,pi=0,xf=1,yf=2,Sf=3,Mf=4,wf=5,Ef=6,Af=7,Dc="attached",Tf="detached",Fu=300,gs=301,bs=302,Po=303,sl=304,Ho=306,_s=1e3,Nn=1001,Lo=1002,Kt=1003,ku=1004,Qs=1005,Pt=1006,yo=1007,Un=1008,_S=1008,ei=1009,Bu=1010,zu=1011,cr=1012,Yl=1013,Ii=1014,rn=1015,$n=1016,Kl=1017,$l=1018,vs=1020,Hu=35902,Gu=1021,Vu=1022,ln=1023,Wu=1024,ju=1025,us=1026,xs=1027,Go=1028,Zl=1029,Xu=1030,Jl=1031,Ql=1033,So=33776,Mo=33777,wo=33778,Eo=33779,rl=35840,ol=35841,al=35842,ll=35843,cl=36196,hl=37492,ul=37496,dl=37808,fl=37809,pl=37810,ml=37811,gl=37812,bl=37813,_l=37814,vl=37815,xl=37816,yl=37817,Sl=37818,Ml=37819,wl=37820,El=37821,Ao=36492,Al=36494,Tl=36495,qu=36283,Cl=36284,Rl=36285,Pl=36286,hr=2300,ur=2301,Zo=2302,Ic=2400,Nc=2401,Uc=2402,Cf=2500,Rf=0,Yu=1,Ll=2,Pf=3200,Lf=3201,Ku=0,Df=1,dn="",vt="srgb",Ut="srgb-linear",ec="display-p3",Vo="display-p3-linear",Do="linear",mt="srgb",Io="rec709",No="p3",ki=7680,Oc=519,If=512,Nf=513,Uf=514,$u=515,Of=516,Ff=517,kf=518,Bf=519,Dl=35044,vS=35048,Fc="300 es",Zn=2e3,Uo=2001;class Ui{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}}const qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let kc=1234567;const nr=Math.PI/180,ys=180/Math.PI;function mn(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(qt[s&255]+qt[s>>8&255]+qt[s>>16&255]+qt[s>>24&255]+"-"+qt[e&255]+qt[e>>8&255]+"-"+qt[e>>16&15|64]+qt[e>>24&255]+"-"+qt[t&63|128]+qt[t>>8&255]+"-"+qt[t>>16&255]+qt[t>>24&255]+qt[n&255]+qt[n>>8&255]+qt[n>>16&255]+qt[n>>24&255]).toLowerCase()}function Rt(s,e,t){return Math.max(e,Math.min(t,s))}function tc(s,e){return(s%e+e)%e}function zf(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Hf(s,e,t){return s!==e?(t-s)/(e-s):0}function ir(s,e,t){return(1-t)*s+t*e}function Gf(s,e,t,n){return ir(s,e,1-Math.exp(-t*n))}function Vf(s,e=1){return e-Math.abs(tc(s,e*2)-e)}function Wf(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function jf(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Xf(s,e){return s+Math.floor(Math.random()*(e-s+1))}function qf(s,e){return s+Math.random()*(e-s)}function Yf(s){return s*(.5-Math.random())}function Kf(s){s!==void 0&&(kc=s);let e=kc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function $f(s){return s*nr}function Zf(s){return s*ys}function Jf(s){return(s&s-1)===0&&s!==0}function Qf(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function ep(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function tp(s,e,t,n,i){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),m=r((n-e)/2),b=o((n-e)/2);switch(i){case"XYX":s.set(a*h,l*u,l*d,a*c);break;case"YZY":s.set(l*d,a*h,l*u,a*c);break;case"ZXZ":s.set(l*u,l*d,a*h,a*c);break;case"XZX":s.set(a*h,l*b,l*m,a*c);break;case"YXY":s.set(l*m,a*h,l*b,a*c);break;case"ZYZ":s.set(l*b,l*m,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function wn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function ct(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const dt={DEG2RAD:nr,RAD2DEG:ys,generateUUID:mn,clamp:Rt,euclideanModulo:tc,mapLinear:zf,inverseLerp:Hf,lerp:ir,damp:Gf,pingpong:Vf,smoothstep:Wf,smootherstep:jf,randInt:Xf,randFloat:qf,randFloatSpread:Yf,seededRandom:Kf,degToRad:$f,radToDeg:Zf,isPowerOfTwo:Jf,ceilPowerOfTwo:Qf,floorPowerOfTwo:ep,setQuaternionFromProperEuler:tp,normalize:ct,denormalize:wn};class le{constructor(e=0,t=0){le.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Rt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class je{constructor(e,t,n,i,r,o,a,l,c){je.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c)}set(e,t,n,i,r,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],m=n[5],b=n[8],_=i[0],g=i[3],p=i[6],w=i[1],x=i[4],y=i[7],I=i[2],D=i[5],P=i[8];return r[0]=o*_+a*w+l*I,r[3]=o*g+a*x+l*D,r[6]=o*p+a*y+l*P,r[1]=c*_+h*w+u*I,r[4]=c*g+h*x+u*D,r[7]=c*p+h*y+u*P,r[2]=d*_+m*w+b*I,r[5]=d*g+m*x+b*D,r[8]=d*p+m*y+b*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*r,m=c*r-o*l,b=t*u+n*d+i*m;if(b===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/b;return e[0]=u*_,e[1]=(i*c-h*n)*_,e[2]=(a*n-i*o)*_,e[3]=d*_,e[4]=(h*t-i*l)*_,e[5]=(i*r-a*t)*_,e[6]=m*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Jo.makeScale(e,t)),this}rotate(e){return this.premultiply(Jo.makeRotation(-e)),this}translate(e,t){return this.premultiply(Jo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Jo=new je;function Zu(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function dr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function np(){const s=dr("canvas");return s.style.display="block",s}const Bc={};function To(s){s in Bc||(Bc[s]=!0,console.warn(s))}function ip(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function sp(s){const e=s.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function rp(s){const e=s.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const zc=new je().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Hc=new je().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Us={[Ut]:{transfer:Do,primaries:Io,luminanceCoefficients:[.2126,.7152,.0722],toReference:s=>s,fromReference:s=>s},[vt]:{transfer:mt,primaries:Io,luminanceCoefficients:[.2126,.7152,.0722],toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[Vo]:{transfer:Do,primaries:No,luminanceCoefficients:[.2289,.6917,.0793],toReference:s=>s.applyMatrix3(Hc),fromReference:s=>s.applyMatrix3(zc)},[ec]:{transfer:mt,primaries:No,luminanceCoefficients:[.2289,.6917,.0793],toReference:s=>s.convertSRGBToLinear().applyMatrix3(Hc),fromReference:s=>s.applyMatrix3(zc).convertLinearToSRGB()}},op=new Set([Ut,Vo]),at={enabled:!0,_workingColorSpace:Ut,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!op.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;const n=Us[e].toReference,i=Us[t].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return Us[s].primaries},getTransfer:function(s){return s===dn?Do:Us[s].transfer},getLuminanceCoefficients:function(s,e=this._workingColorSpace){return s.fromArray(Us[e].luminanceCoefficients)}};function ds(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Qo(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Bi;class ap{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Bi===void 0&&(Bi=dr("canvas")),Bi.width=e.width,Bi.height=e.height;const n=Bi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Bi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=dr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=ds(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ds(t[n]/255)*255):t[n]=ds(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let lp=0;class Ju{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:lp++}),this.uuid=mn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(ea(i[o].image)):r.push(ea(i[o]))}else r=ea(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function ea(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?ap.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let cp=0;class Nt extends Ui{constructor(e=Nt.DEFAULT_IMAGE,t=Nt.DEFAULT_MAPPING,n=Nn,i=Nn,r=Pt,o=Un,a=ln,l=ei,c=Nt.DEFAULT_ANISOTROPY,h=dn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:cp++}),this.uuid=mn(),this.name="",this.source=new Ju(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new le(0,0),this.repeat=new le(1,1),this.center=new le(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Fu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case _s:e.x=e.x-Math.floor(e.x);break;case Nn:e.x=e.x<0?0:1;break;case Lo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case _s:e.y=e.y-Math.floor(e.y);break;case Nn:e.y=e.y<0?0:1;break;case Lo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Nt.DEFAULT_IMAGE=null;Nt.DEFAULT_MAPPING=Fu;Nt.DEFAULT_ANISOTROPY=1;class tt{constructor(e=0,t=0,n=0,i=1){tt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],m=l[5],b=l[9],_=l[2],g=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(b-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(b+g)<.1&&Math.abs(c+m+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,y=(m+1)/2,I=(p+1)/2,D=(h+d)/4,P=(u+_)/4,B=(b+g)/4;return x>y&&x>I?x<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(x),i=D/n,r=P/n):y>I?y<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(y),n=D/i,r=B/i):I<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(I),n=P/r,i=B/r),this.set(n,i,r,t),this}let w=Math.sqrt((g-b)*(g-b)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(w)<.001&&(w=1),this.x=(g-b)/w,this.y=(u-_)/w,this.z=(d-h)/w,this.w=Math.acos((c+m+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class hp extends Ui{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new tt(0,0,e,t),this.scissorTest=!1,this.viewport=new tt(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Pt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Nt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Ju(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class mi extends hp{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class nc extends Nt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=Nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class xS extends mi{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new nc(null,e,t,n),this.texture.isRenderTargetTexture=!0}}class up extends Nt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=Nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $t{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=r[o+0],m=r[o+1],b=r[o+2],_=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=m,e[t+2]=b,e[t+3]=_;return}if(u!==_||l!==d||c!==m||h!==b){let g=1-a;const p=l*d+c*m+h*b+u*_,w=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const I=Math.sqrt(x),D=Math.atan2(I,p*w);g=Math.sin(g*D)/I,a=Math.sin(a*D)/I}const y=a*w;if(l=l*g+d*y,c=c*g+m*y,h=h*g+b*y,u=u*g+_*y,g===1-a){const I=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=I,c*=I,h*=I,u*=I}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[o],d=r[o+1],m=r[o+2],b=r[o+3];return e[t]=a*b+h*u+l*m-c*d,e[t+1]=l*b+h*d+c*u-a*m,e[t+2]=c*b+h*m+a*d-l*u,e[t+3]=h*b-a*u-l*d-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(r/2),d=l(n/2),m=l(i/2),b=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*m*b,this._y=c*m*u-d*h*b,this._z=c*h*b+d*m*u,this._w=c*h*u-d*m*b;break;case"YXZ":this._x=d*h*u+c*m*b,this._y=c*m*u-d*h*b,this._z=c*h*b-d*m*u,this._w=c*h*u+d*m*b;break;case"ZXY":this._x=d*h*u-c*m*b,this._y=c*m*u+d*h*b,this._z=c*h*b+d*m*u,this._w=c*h*u-d*m*b;break;case"ZYX":this._x=d*h*u-c*m*b,this._y=c*m*u+d*h*b,this._z=c*h*b-d*m*u,this._w=c*h*u+d*m*b;break;case"YZX":this._x=d*h*u+c*m*b,this._y=c*m*u+d*h*b,this._z=c*h*b-d*m*u,this._w=c*h*u-d*m*b;break;case"XZY":this._x=d*h*u-c*m*b,this._y=c*m*u-d*h*b,this._z=c*h*b+d*m*u,this._w=c*h*u+d*m*b;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(h-l)*m,this._y=(r-c)*m,this._z=(o-i)*m}else if(n>a&&n>u){const m=2*Math.sqrt(1+n-a-u);this._w=(h-l)/m,this._x=.25*m,this._y=(i+o)/m,this._z=(r+c)/m}else if(a>u){const m=2*Math.sqrt(1+a-n-u);this._w=(r-c)/m,this._x=(i+o)/m,this._y=.25*m,this._z=(l+h)/m}else{const m=2*Math.sqrt(1+u-n-a);this._w=(o-i)/m,this._x=(r+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Rt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const m=1-t;return this._w=m*o+t*this._w,this._x=m*n+t*this._x,this._y=m*i+t*this._y,this._z=m*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(e=0,t=0,n=0){R.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Gc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Gc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),h=2*(a*t-r*i),u=2*(r*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=i+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ta.copy(this).projectOnVector(e),this.sub(ta)}reflect(e){return this.sub(ta.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Rt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ta=new R,Gc=new $t;class Vt{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(vn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(vn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=vn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,vn):vn.fromBufferAttribute(r,o),vn.applyMatrix4(e.matrixWorld),this.expandByPoint(vn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Rr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Rr.copy(n.boundingBox)),Rr.applyMatrix4(e.matrixWorld),this.union(Rr)}const i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,vn),vn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Os),Pr.subVectors(this.max,Os),zi.subVectors(e.a,Os),Hi.subVectors(e.b,Os),Gi.subVectors(e.c,Os),ii.subVectors(Hi,zi),si.subVectors(Gi,Hi),_i.subVectors(zi,Gi);let t=[0,-ii.z,ii.y,0,-si.z,si.y,0,-_i.z,_i.y,ii.z,0,-ii.x,si.z,0,-si.x,_i.z,0,-_i.x,-ii.y,ii.x,0,-si.y,si.x,0,-_i.y,_i.x,0];return!na(t,zi,Hi,Gi,Pr)||(t=[1,0,0,0,1,0,0,0,1],!na(t,zi,Hi,Gi,Pr))?!1:(Lr.crossVectors(ii,si),t=[Lr.x,Lr.y,Lr.z],na(t,zi,Hi,Gi,Pr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,vn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(vn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Hn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Hn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Hn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Hn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Hn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Hn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Hn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Hn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Hn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Hn=[new R,new R,new R,new R,new R,new R,new R,new R],vn=new R,Rr=new Vt,zi=new R,Hi=new R,Gi=new R,ii=new R,si=new R,_i=new R,Os=new R,Pr=new R,Lr=new R,vi=new R;function na(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){vi.fromArray(s,r);const a=i.x*Math.abs(vi.x)+i.y*Math.abs(vi.y)+i.z*Math.abs(vi.z),l=e.dot(vi),c=t.dot(vi),h=n.dot(vi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const dp=new Vt,Fs=new R,ia=new R;class gn{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):dp.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Fs.subVectors(e,this.center);const t=Fs.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Fs,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ia.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Fs.copy(e.center).add(ia)),this.expandByPoint(Fs.copy(e.center).sub(ia))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Gn=new R,sa=new R,Dr=new R,ri=new R,ra=new R,Ir=new R,oa=new R;class Ts{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Gn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Gn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Gn.copy(this.origin).addScaledVector(this.direction,t),Gn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){sa.copy(e).add(t).multiplyScalar(.5),Dr.copy(t).sub(e).normalize(),ri.copy(this.origin).sub(sa);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Dr),a=ri.dot(this.direction),l=-ri.dot(Dr),c=ri.lengthSq(),h=Math.abs(1-o*o);let u,d,m,b;if(h>0)if(u=o*l-a,d=o*a-l,b=r*h,u>=0)if(d>=-b)if(d<=b){const _=1/h;u*=_,d*=_,m=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),m=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),m=-u*u+d*(d+2*l)+c;else d<=-b?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),m=-u*u+d*(d+2*l)+c):d<=b?(u=0,d=Math.min(Math.max(-r,-l),r),m=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),m=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),m=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(sa).addScaledVector(Dr,d),m}intersectSphere(e,t){Gn.subVectors(e.center,this.origin);const n=Gn.dot(this.direction),i=Gn.dot(Gn)-n*n,r=e.radius*e.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Gn)!==null}intersectTriangle(e,t,n,i,r){ra.subVectors(t,e),Ir.subVectors(n,e),oa.crossVectors(ra,Ir);let o=this.direction.dot(oa),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ri.subVectors(this.origin,e);const l=a*this.direction.dot(Ir.crossVectors(ri,Ir));if(l<0)return null;const c=a*this.direction.dot(ra.cross(ri));if(c<0||l+c>o)return null;const h=-a*ri.dot(oa);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Le{constructor(e,t,n,i,r,o,a,l,c,h,u,d,m,b,_,g){Le.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c,h,u,d,m,b,_,g)}set(e,t,n,i,r,o,a,l,c,h,u,d,m,b,_,g){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=m,p[7]=b,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Le().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Vi.setFromMatrixColumn(e,0).length(),r=1/Vi.setFromMatrixColumn(e,1).length(),o=1/Vi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=o*h,m=o*u,b=a*h,_=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=m+b*c,t[5]=d-_*c,t[9]=-a*l,t[2]=_-d*c,t[6]=b+m*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*h,m=l*u,b=c*h,_=c*u;t[0]=d+_*a,t[4]=b*a-m,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=m*a-b,t[6]=_+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*h,m=l*u,b=c*h,_=c*u;t[0]=d-_*a,t[4]=-o*u,t[8]=b+m*a,t[1]=m+b*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*h,m=o*u,b=a*h,_=a*u;t[0]=l*h,t[4]=b*c-m,t[8]=d*c+_,t[1]=l*u,t[5]=_*c+d,t[9]=m*c-b,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,m=o*c,b=a*l,_=a*c;t[0]=l*h,t[4]=_-d*u,t[8]=b*u+m,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=m*u+b,t[10]=d-_*u}else if(e.order==="XZY"){const d=o*l,m=o*c,b=a*l,_=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+_,t[5]=o*h,t[9]=m*u-b,t[2]=b*u-m,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(fp,e,pp)}lookAt(e,t,n){const i=this.elements;return on.subVectors(e,t),on.lengthSq()===0&&(on.z=1),on.normalize(),oi.crossVectors(n,on),oi.lengthSq()===0&&(Math.abs(n.z)===1?on.x+=1e-4:on.z+=1e-4,on.normalize(),oi.crossVectors(n,on)),oi.normalize(),Nr.crossVectors(on,oi),i[0]=oi.x,i[4]=Nr.x,i[8]=on.x,i[1]=oi.y,i[5]=Nr.y,i[9]=on.y,i[2]=oi.z,i[6]=Nr.z,i[10]=on.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],m=n[13],b=n[2],_=n[6],g=n[10],p=n[14],w=n[3],x=n[7],y=n[11],I=n[15],D=i[0],P=i[4],B=i[8],$=i[12],S=i[1],C=i[5],G=i[9],q=i[13],K=i[2],se=i[6],X=i[10],ce=i[14],Z=i[3],ge=i[7],be=i[11],Ae=i[15];return r[0]=o*D+a*S+l*K+c*Z,r[4]=o*P+a*C+l*se+c*ge,r[8]=o*B+a*G+l*X+c*be,r[12]=o*$+a*q+l*ce+c*Ae,r[1]=h*D+u*S+d*K+m*Z,r[5]=h*P+u*C+d*se+m*ge,r[9]=h*B+u*G+d*X+m*be,r[13]=h*$+u*q+d*ce+m*Ae,r[2]=b*D+_*S+g*K+p*Z,r[6]=b*P+_*C+g*se+p*ge,r[10]=b*B+_*G+g*X+p*be,r[14]=b*$+_*q+g*ce+p*Ae,r[3]=w*D+x*S+y*K+I*Z,r[7]=w*P+x*C+y*se+I*ge,r[11]=w*B+x*G+y*X+I*be,r[15]=w*$+x*q+y*ce+I*Ae,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],m=e[14],b=e[3],_=e[7],g=e[11],p=e[15];return b*(+r*l*u-i*c*u-r*a*d+n*c*d+i*a*m-n*l*m)+_*(+t*l*m-t*c*d+r*o*d-i*o*m+i*c*h-r*l*h)+g*(+t*c*u-t*a*m-r*o*u+n*o*m+r*a*h-n*c*h)+p*(-i*a*h-t*l*u+t*a*d+i*o*u-n*o*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],m=e[11],b=e[12],_=e[13],g=e[14],p=e[15],w=u*g*c-_*d*c+_*l*m-a*g*m-u*l*p+a*d*p,x=b*d*c-h*g*c-b*l*m+o*g*m+h*l*p-o*d*p,y=h*_*c-b*u*c+b*a*m-o*_*m-h*a*p+o*u*p,I=b*u*l-h*_*l-b*a*d+o*_*d+h*a*g-o*u*g,D=t*w+n*x+i*y+r*I;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/D;return e[0]=w*P,e[1]=(_*d*r-u*g*r-_*i*m+n*g*m+u*i*p-n*d*p)*P,e[2]=(a*g*r-_*l*r+_*i*c-n*g*c-a*i*p+n*l*p)*P,e[3]=(u*l*r-a*d*r-u*i*c+n*d*c+a*i*m-n*l*m)*P,e[4]=x*P,e[5]=(h*g*r-b*d*r+b*i*m-t*g*m-h*i*p+t*d*p)*P,e[6]=(b*l*r-o*g*r-b*i*c+t*g*c+o*i*p-t*l*p)*P,e[7]=(o*d*r-h*l*r+h*i*c-t*d*c-o*i*m+t*l*m)*P,e[8]=y*P,e[9]=(b*u*r-h*_*r-b*n*m+t*_*m+h*n*p-t*u*p)*P,e[10]=(o*_*r-b*a*r+b*n*c-t*_*c-o*n*p+t*a*p)*P,e[11]=(h*a*r-o*u*r-h*n*c+t*u*c+o*n*m-t*a*m)*P,e[12]=I*P,e[13]=(h*_*i-b*u*i+b*n*d-t*_*d-h*n*g+t*u*g)*P,e[14]=(b*a*i-o*_*i-b*n*l+t*_*l+o*n*g-t*a*g)*P,e[15]=(o*u*i-h*a*i+h*n*l-t*u*l-o*n*d+t*a*d)*P,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,d=r*c,m=r*h,b=r*u,_=o*h,g=o*u,p=a*u,w=l*c,x=l*h,y=l*u,I=n.x,D=n.y,P=n.z;return i[0]=(1-(_+p))*I,i[1]=(m+y)*I,i[2]=(b-x)*I,i[3]=0,i[4]=(m-y)*D,i[5]=(1-(d+p))*D,i[6]=(g+w)*D,i[7]=0,i[8]=(b+x)*P,i[9]=(g-w)*P,i[10]=(1-(d+_))*P,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=Vi.set(i[0],i[1],i[2]).length();const o=Vi.set(i[4],i[5],i[6]).length(),a=Vi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],xn.copy(this);const c=1/r,h=1/o,u=1/a;return xn.elements[0]*=c,xn.elements[1]*=c,xn.elements[2]*=c,xn.elements[4]*=h,xn.elements[5]*=h,xn.elements[6]*=h,xn.elements[8]*=u,xn.elements[9]*=u,xn.elements[10]*=u,t.setFromRotationMatrix(xn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=Zn){const l=this.elements,c=2*r/(t-e),h=2*r/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i);let m,b;if(a===Zn)m=-(o+r)/(o-r),b=-2*o*r/(o-r);else if(a===Uo)m=-o/(o-r),b=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=b,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=Zn){const l=this.elements,c=1/(t-e),h=1/(n-i),u=1/(o-r),d=(t+e)*c,m=(n+i)*h;let b,_;if(a===Zn)b=(o+r)*u,_=-2*u;else if(a===Uo)b=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=_,l[14]=-b,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Vi=new R,xn=new Le,fp=new R(0,0,0),pp=new R(1,1,1),oi=new R,Nr=new R,on=new R,Vc=new Le,Wc=new $t;class Cn{constructor(e=0,t=0,n=0,i=Cn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],m=i[10];switch(t){case"XYZ":this._y=Math.asin(Rt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Rt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Rt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Rt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Rt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-Rt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Vc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Vc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Wc.setFromEuler(this),this.setFromQuaternion(Wc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Cn.DEFAULT_ORDER="XYZ";class ic{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let mp=0;const jc=new R,Wi=new $t,Vn=new Le,Ur=new R,ks=new R,gp=new R,bp=new $t,Xc=new R(1,0,0),qc=new R(0,1,0),Yc=new R(0,0,1),Kc={type:"added"},_p={type:"removed"},ji={type:"childadded",child:null},aa={type:"childremoved",child:null};class _t extends Ui{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:mp++}),this.uuid=mn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=_t.DEFAULT_UP.clone();const e=new R,t=new Cn,n=new $t,i=new R(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Le},normalMatrix:{value:new je}}),this.matrix=new Le,this.matrixWorld=new Le,this.matrixAutoUpdate=_t.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=_t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ic,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Wi.setFromAxisAngle(e,t),this.quaternion.multiply(Wi),this}rotateOnWorldAxis(e,t){return Wi.setFromAxisAngle(e,t),this.quaternion.premultiply(Wi),this}rotateX(e){return this.rotateOnAxis(Xc,e)}rotateY(e){return this.rotateOnAxis(qc,e)}rotateZ(e){return this.rotateOnAxis(Yc,e)}translateOnAxis(e,t){return jc.copy(e).applyQuaternion(this.quaternion),this.position.add(jc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Xc,e)}translateY(e){return this.translateOnAxis(qc,e)}translateZ(e){return this.translateOnAxis(Yc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Vn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ur.copy(e):Ur.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ks.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Vn.lookAt(ks,Ur,this.up):Vn.lookAt(Ur,ks,this.up),this.quaternion.setFromRotationMatrix(Vn),i&&(Vn.extractRotation(i.matrixWorld),Wi.setFromRotationMatrix(Vn),this.quaternion.premultiply(Wi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Kc),ji.child=e,this.dispatchEvent(ji),ji.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(_p),aa.child=e,this.dispatchEvent(aa),aa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Vn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Vn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Vn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Kc),ji.child=e,this.dispatchEvent(ji),ji.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ks,e,gp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ks,bp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),m=o(e.animations),b=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),m.length>0&&(n.animations=m),b.length>0&&(n.nodes=b)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}_t.DEFAULT_UP=new R(0,1,0);_t.DEFAULT_MATRIX_AUTO_UPDATE=!0;_t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const yn=new R,Wn=new R,la=new R,jn=new R,Xi=new R,qi=new R,$c=new R,ca=new R,ha=new R,ua=new R,da=new tt,fa=new tt,pa=new tt;class fn{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),yn.subVectors(e,t),i.cross(yn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){yn.subVectors(i,t),Wn.subVectors(n,t),la.subVectors(e,t);const o=yn.dot(yn),a=yn.dot(Wn),l=yn.dot(la),c=Wn.dot(Wn),h=Wn.dot(la),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,m=(c*l-a*h)*d,b=(o*h-a*l)*d;return r.set(1-m-b,b,m)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,jn)===null?!1:jn.x>=0&&jn.y>=0&&jn.x+jn.y<=1}static getInterpolation(e,t,n,i,r,o,a,l){return this.getBarycoord(e,t,n,i,jn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,jn.x),l.addScaledVector(o,jn.y),l.addScaledVector(a,jn.z),l)}static getInterpolatedAttribute(e,t,n,i,r,o){return da.setScalar(0),fa.setScalar(0),pa.setScalar(0),da.fromBufferAttribute(e,t),fa.fromBufferAttribute(e,n),pa.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(da,r.x),o.addScaledVector(fa,r.y),o.addScaledVector(pa,r.z),o}static isFrontFacing(e,t,n,i){return yn.subVectors(n,t),Wn.subVectors(e,t),yn.cross(Wn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return yn.subVectors(this.c,this.b),Wn.subVectors(this.a,this.b),yn.cross(Wn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return fn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return fn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return fn.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return fn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return fn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let o,a;Xi.subVectors(i,n),qi.subVectors(r,n),ca.subVectors(e,n);const l=Xi.dot(ca),c=qi.dot(ca);if(l<=0&&c<=0)return t.copy(n);ha.subVectors(e,i);const h=Xi.dot(ha),u=qi.dot(ha);if(h>=0&&u<=h)return t.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(Xi,o);ua.subVectors(e,r);const m=Xi.dot(ua),b=qi.dot(ua);if(b>=0&&m<=b)return t.copy(r);const _=m*c-l*b;if(_<=0&&c>=0&&b<=0)return a=c/(c-b),t.copy(n).addScaledVector(qi,a);const g=h*b-m*u;if(g<=0&&u-h>=0&&m-b>=0)return $c.subVectors(r,i),a=(u-h)/(u-h+(m-b)),t.copy(i).addScaledVector($c,a);const p=1/(g+_+d);return o=_*p,a=d*p,t.copy(n).addScaledVector(Xi,o).addScaledVector(qi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Qu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ai={h:0,s:0,l:0},Or={h:0,s:0,l:0};function ma(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class De{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=vt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,at.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=at.workingColorSpace){return this.r=e,this.g=t,this.b=n,at.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=at.workingColorSpace){if(e=tc(e,1),t=Rt(t,0,1),n=Rt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=ma(o,r,e+1/3),this.g=ma(o,r,e),this.b=ma(o,r,e-1/3)}return at.toWorkingColorSpace(this,i),this}setStyle(e,t=vt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=vt){const n=Qu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ds(e.r),this.g=ds(e.g),this.b=ds(e.b),this}copyLinearToSRGB(e){return this.r=Qo(e.r),this.g=Qo(e.g),this.b=Qo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=vt){return at.fromWorkingColorSpace(Yt.copy(this),e),Math.round(Rt(Yt.r*255,0,255))*65536+Math.round(Rt(Yt.g*255,0,255))*256+Math.round(Rt(Yt.b*255,0,255))}getHexString(e=vt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=at.workingColorSpace){at.fromWorkingColorSpace(Yt.copy(this),t);const n=Yt.r,i=Yt.g,r=Yt.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=at.workingColorSpace){return at.fromWorkingColorSpace(Yt.copy(this),t),e.r=Yt.r,e.g=Yt.g,e.b=Yt.b,e}getStyle(e=vt){at.fromWorkingColorSpace(Yt.copy(this),e);const t=Yt.r,n=Yt.g,i=Yt.b;return e!==vt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(ai),this.setHSL(ai.h+e,ai.s+t,ai.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ai),e.getHSL(Or);const n=ir(ai.h,Or.h,t),i=ir(ai.s,Or.s,t),r=ir(ai.l,Or.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Yt=new De;De.NAMES=Qu;let vp=0;class An extends Ui{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:vp++}),this.uuid=mn(),this.name="",this.type="Material",this.blending=hs,this.side=Qn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ka,this.blendDst=$a,this.blendEquation=Ri,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new De(0,0,0),this.blendAlpha=0,this.depthFunc=ms,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Oc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ki,this.stencilZFail=ki,this.stencilZPass=ki,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==hs&&(n.blending=this.blending),this.side!==Qn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ka&&(n.blendSrc=this.blendSrc),this.blendDst!==$a&&(n.blendDst=this.blendDst),this.blendEquation!==Ri&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ms&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Oc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ki&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ki&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ki&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class pt extends An{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new De(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.combine=Ou,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Kn=xp();function xp(){const s=new ArrayBuffer(4),e=new Float32Array(s),t=new Uint32Array(s),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}const r=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;!(c&8388608);)c<<=1,h-=8388608;c&=-8388609,h+=947912704,r[l]=c|h}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)o[l]=l<<23;o[31]=1199570944,o[32]=2147483648;for(let l=33;l<63;++l)o[l]=2147483648+(l-32<<23);o[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(a[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:r,exponentTable:o,offsetTable:a}}function yp(s){Math.abs(s)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),s=Rt(s,-65504,65504),Kn.floatView[0]=s;const e=Kn.uint32View[0],t=e>>23&511;return Kn.baseTable[t]+((e&8388607)>>Kn.shiftTable[t])}function Sp(s){const e=s>>10;return Kn.uint32View[0]=Kn.mantissaTable[Kn.offsetTable[e]+(s&1023)]+Kn.exponentTable[e],Kn.floatView[0]}const Zc={toHalfFloat:yp,fromHalfFloat:Sp},Dt=new R,Fr=new le;class Bt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Dl,this.updateRanges=[],this.gpuType=rn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Fr.fromBufferAttribute(this,t),Fr.applyMatrix3(e),this.setXY(t,Fr.x,Fr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix3(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix4(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyNormalMatrix(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.transformDirection(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=wn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ct(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=wn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=wn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=wn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=wn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),i=ct(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),i=ct(i,this.array),r=ct(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Dl&&(e.usage=this.usage),e}}class ed extends Bt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class td extends Bt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class xt extends Bt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Mp=0;const hn=new Le,ga=new _t,Yi=new R,an=new Vt,Bs=new Vt,kt=new R;class St extends Ui{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Mp++}),this.uuid=mn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Zu(e)?td:ed)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new je().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return hn.makeRotationFromQuaternion(e),this.applyMatrix4(hn),this}rotateX(e){return hn.makeRotationX(e),this.applyMatrix4(hn),this}rotateY(e){return hn.makeRotationY(e),this.applyMatrix4(hn),this}rotateZ(e){return hn.makeRotationZ(e),this.applyMatrix4(hn),this}translate(e,t,n){return hn.makeTranslation(e,t,n),this.applyMatrix4(hn),this}scale(e,t,n){return hn.makeScale(e,t,n),this.applyMatrix4(hn),this}lookAt(e){return ga.lookAt(e),ga.updateMatrix(),this.applyMatrix4(ga.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Yi).negate(),this.translate(Yi.x,Yi.y,Yi.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new xt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];an.setFromBufferAttribute(r),this.morphTargetsRelative?(kt.addVectors(this.boundingBox.min,an.min),this.boundingBox.expandByPoint(kt),kt.addVectors(this.boundingBox.max,an.max),this.boundingBox.expandByPoint(kt)):(this.boundingBox.expandByPoint(an.min),this.boundingBox.expandByPoint(an.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new gn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){const n=this.boundingSphere.center;if(an.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Bs.setFromBufferAttribute(a),this.morphTargetsRelative?(kt.addVectors(an.min,Bs.min),an.expandByPoint(kt),kt.addVectors(an.max,Bs.max),an.expandByPoint(kt)):(an.expandByPoint(Bs.min),an.expandByPoint(Bs.max))}an.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)kt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(kt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)kt.fromBufferAttribute(a,c),l&&(Yi.fromBufferAttribute(e,c),kt.add(Yi)),i=Math.max(i,n.distanceToSquared(kt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Bt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let B=0;B<n.count;B++)a[B]=new R,l[B]=new R;const c=new R,h=new R,u=new R,d=new le,m=new le,b=new le,_=new R,g=new R;function p(B,$,S){c.fromBufferAttribute(n,B),h.fromBufferAttribute(n,$),u.fromBufferAttribute(n,S),d.fromBufferAttribute(r,B),m.fromBufferAttribute(r,$),b.fromBufferAttribute(r,S),h.sub(c),u.sub(c),m.sub(d),b.sub(d);const C=1/(m.x*b.y-b.x*m.y);isFinite(C)&&(_.copy(h).multiplyScalar(b.y).addScaledVector(u,-m.y).multiplyScalar(C),g.copy(u).multiplyScalar(m.x).addScaledVector(h,-b.x).multiplyScalar(C),a[B].add(_),a[$].add(_),a[S].add(_),l[B].add(g),l[$].add(g),l[S].add(g))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let B=0,$=w.length;B<$;++B){const S=w[B],C=S.start,G=S.count;for(let q=C,K=C+G;q<K;q+=3)p(e.getX(q+0),e.getX(q+1),e.getX(q+2))}const x=new R,y=new R,I=new R,D=new R;function P(B){I.fromBufferAttribute(i,B),D.copy(I);const $=a[B];x.copy($),x.sub(I.multiplyScalar(I.dot($))).normalize(),y.crossVectors(D,$);const C=y.dot(l[B])<0?-1:1;o.setXYZW(B,x.x,x.y,x.z,C)}for(let B=0,$=w.length;B<$;++B){const S=w[B],C=S.start,G=S.count;for(let q=C,K=C+G;q<K;q+=3)P(e.getX(q+0)),P(e.getX(q+1)),P(e.getX(q+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Bt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,m=n.count;d<m;d++)n.setXYZ(d,0,0,0);const i=new R,r=new R,o=new R,a=new R,l=new R,c=new R,h=new R,u=new R;if(e)for(let d=0,m=e.count;d<m;d+=3){const b=e.getX(d+0),_=e.getX(d+1),g=e.getX(d+2);i.fromBufferAttribute(t,b),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,g),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,b),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(b,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,m=t.count;d<m;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)kt.fromBufferAttribute(e,t),kt.normalize(),e.setXYZ(t,kt.x,kt.y,kt.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let m=0,b=0;for(let _=0,g=l.length;_<g;_++){a.isInterleavedBufferAttribute?m=l[_]*a.data.stride+a.offset:m=l[_]*h;for(let p=0;p<h;p++)d[b++]=c[m++]}return new Bt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new St,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],m=e(d,n);l.push(m)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const m=c[u];h.push(m.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,m=u.length;d<m;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Jc=new Le,xi=new Ts,kr=new gn,Qc=new R,Br=new R,zr=new R,Hr=new R,ba=new R,Gr=new R,eh=new R,Vr=new R;class Ye extends _t{constructor(e=new St,t=new pt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(r&&a){Gr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(ba.fromBufferAttribute(u,e),o?Gr.addScaledVector(ba,h):Gr.addScaledVector(ba.sub(t),h))}t.add(Gr)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),kr.copy(n.boundingSphere),kr.applyMatrix4(r),xi.copy(e.ray).recast(e.near),!(kr.containsPoint(xi.origin)===!1&&(xi.intersectSphere(kr,Qc)===null||xi.origin.distanceToSquared(Qc)>(e.far-e.near)**2))&&(Jc.copy(r).invert(),xi.copy(e.ray).applyMatrix4(Jc),!(n.boundingBox!==null&&xi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,xi)))}_computeIntersections(e,t,n){let i;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,m=r.drawRange;if(a!==null)if(Array.isArray(o))for(let b=0,_=d.length;b<_;b++){const g=d[b],p=o[g.materialIndex],w=Math.max(g.start,m.start),x=Math.min(a.count,Math.min(g.start+g.count,m.start+m.count));for(let y=w,I=x;y<I;y+=3){const D=a.getX(y),P=a.getX(y+1),B=a.getX(y+2);i=Wr(this,p,e,n,c,h,u,D,P,B),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const b=Math.max(0,m.start),_=Math.min(a.count,m.start+m.count);for(let g=b,p=_;g<p;g+=3){const w=a.getX(g),x=a.getX(g+1),y=a.getX(g+2);i=Wr(this,o,e,n,c,h,u,w,x,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let b=0,_=d.length;b<_;b++){const g=d[b],p=o[g.materialIndex],w=Math.max(g.start,m.start),x=Math.min(l.count,Math.min(g.start+g.count,m.start+m.count));for(let y=w,I=x;y<I;y+=3){const D=y,P=y+1,B=y+2;i=Wr(this,p,e,n,c,h,u,D,P,B),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const b=Math.max(0,m.start),_=Math.min(l.count,m.start+m.count);for(let g=b,p=_;g<p;g+=3){const w=g,x=g+1,y=g+2;i=Wr(this,o,e,n,c,h,u,w,x,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}}function wp(s,e,t,n,i,r,o,a){let l;if(e.side===tn?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,e.side===Qn,a),l===null)return null;Vr.copy(a),Vr.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(Vr);return c<t.near||c>t.far?null:{distance:c,point:Vr.clone(),object:s}}function Wr(s,e,t,n,i,r,o,a,l,c){s.getVertexPosition(a,Br),s.getVertexPosition(l,zr),s.getVertexPosition(c,Hr);const h=wp(s,e,t,n,Br,zr,Hr,eh);if(h){const u=new R;fn.getBarycoord(eh,Br,zr,Hr,u),i&&(h.uv=fn.getInterpolatedAttribute(i,a,l,c,u,new le)),r&&(h.uv1=fn.getInterpolatedAttribute(r,a,l,c,u,new le)),o&&(h.normal=fn.getInterpolatedAttribute(o,a,l,c,u,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new R,materialIndex:0};fn.getNormal(Br,zr,Hr,d.normal),h.face=d,h.barycoord=u}return h}class gi extends St{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,m=0;b("z","y","x",-1,-1,n,t,e,o,r,0),b("z","y","x",1,-1,n,t,-e,o,r,1),b("x","z","y",1,1,e,n,t,i,o,2),b("x","z","y",1,-1,e,n,-t,i,o,3),b("x","y","z",1,-1,e,t,n,i,r,4),b("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new xt(c,3)),this.setAttribute("normal",new xt(h,3)),this.setAttribute("uv",new xt(u,2));function b(_,g,p,w,x,y,I,D,P,B,$){const S=y/P,C=I/B,G=y/2,q=I/2,K=D/2,se=P+1,X=B+1;let ce=0,Z=0;const ge=new R;for(let be=0;be<X;be++){const Ae=be*C-q;for(let Be=0;Be<se;Be++){const Ge=Be*S-G;ge[_]=Ge*w,ge[g]=Ae*x,ge[p]=K,c.push(ge.x,ge.y,ge.z),ge[_]=0,ge[g]=0,ge[p]=D>0?1:-1,h.push(ge.x,ge.y,ge.z),u.push(Be/P),u.push(1-be/B),ce+=1}}for(let be=0;be<B;be++)for(let Ae=0;Ae<P;Ae++){const Be=d+Ae+se*be,Ge=d+Ae+se*(be+1),J=d+(Ae+1)+se*(be+1),oe=d+(Ae+1)+se*be;l.push(Be,Ge,oe),l.push(Ge,J,oe),Z+=6}a.addGroup(m,Z,$),m+=Z,d+=ce}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ss(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Jt(s){const e={};for(let t=0;t<s.length;t++){const n=Ss(s[t]);for(const i in n)e[i]=n[i]}return e}function Ep(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function nd(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:at.workingColorSpace}const sc={clone:Ss,merge:Jt};var Ap=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Tp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class cn extends An{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ap,this.fragmentShader=Tp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ss(e.uniforms),this.uniformsGroups=Ep(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}let id=class extends _t{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Le,this.projectionMatrix=new Le,this.projectionMatrixInverse=new Le,this.coordinateSystem=Zn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}};const li=new R,th=new le,nh=new le;class Qt extends id{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ys*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(nr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ys*2*Math.atan(Math.tan(nr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){li.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(li.x,li.y).multiplyScalar(-e/li.z),li.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(li.x,li.y).multiplyScalar(-e/li.z)}getViewSize(e,t){return this.getViewBounds(e,th,nh),t.subVectors(nh,th)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(nr*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ki=-90,$i=1;class Cp extends _t{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Qt(Ki,$i,e,t);i.layers=this.layers,this.add(i);const r=new Qt(Ki,$i,e,t);r.layers=this.layers,this.add(r);const o=new Qt(Ki,$i,e,t);o.layers=this.layers,this.add(o);const a=new Qt(Ki,$i,e,t);a.layers=this.layers,this.add(a);const l=new Qt(Ki,$i,e,t);l.layers=this.layers,this.add(l);const c=new Qt(Ki,$i,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===Zn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Uo)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),b=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,m),e.xr.enabled=b,n.texture.needsPMREMUpdate=!0}}class rc extends Nt{constructor(e,t,n,i,r,o,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:gs,super(e,t,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Rp extends mi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new rc(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Pt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new gi(5,5,5),r=new cn({name:"CubemapFromEquirect",uniforms:Ss(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:tn,blending:fi});r.uniforms.tEquirect.value=t;const o=new Ye(i,r),a=t.minFilter;return t.minFilter===Un&&(t.minFilter=Pt),new Cp(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}}const _a=new R,Pp=new R,Lp=new je;class ui{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=_a.subVectors(n,t).cross(Pp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(_a),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Lp.getNormalMatrix(e),i=this.coplanarPoint(_a).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const yi=new gn,jr=new R;class oc{constructor(e=new ui,t=new ui,n=new ui,i=new ui,r=new ui,o=new ui){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Zn){const n=this.planes,i=e.elements,r=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],m=i[8],b=i[9],_=i[10],g=i[11],p=i[12],w=i[13],x=i[14],y=i[15];if(n[0].setComponents(l-r,d-c,g-m,y-p).normalize(),n[1].setComponents(l+r,d+c,g+m,y+p).normalize(),n[2].setComponents(l+o,d+h,g+b,y+w).normalize(),n[3].setComponents(l-o,d-h,g-b,y-w).normalize(),n[4].setComponents(l-a,d-u,g-_,y-x).normalize(),t===Zn)n[5].setComponents(l+a,d+u,g+_,y+x).normalize();else if(t===Uo)n[5].setComponents(a,u,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),yi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),yi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(yi)}intersectsSprite(e){return yi.center.set(0,0,0),yi.radius=.7071067811865476,yi.applyMatrix4(e.matrixWorld),this.intersectsSphere(yi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(jr.x=i.normal.x>0?e.max.x:e.min.x,jr.y=i.normal.y>0?e.max.y:e.min.y,jr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(jr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function sd(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function Dp(s){const e=new WeakMap;function t(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),a.onUploadCallback();let m;if(c instanceof Float32Array)m=s.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?m=s.HALF_FLOAT:m=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=s.SHORT;else if(c instanceof Uint32Array)m=s.UNSIGNED_INT;else if(c instanceof Int32Array)m=s.INT;else if(c instanceof Int8Array)m=s.BYTE;else if(c instanceof Uint8Array)m=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(s.bindBuffer(c,a),u.length===0)s.bufferSubData(c,0,h);else{u.sort((m,b)=>m.start-b.start);let d=0;for(let m=1;m<u.length;m++){const b=u[d],_=u[m];_.start<=b.start+b.count+1?b.count=Math.max(b.count,_.start+_.count-b.start):(++d,u[d]=_)}u.length=d+1;for(let m=0,b=u.length;m<b;m++){const _=u[m];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(s.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}class Tn extends St{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=e/a,d=t/l,m=[],b=[],_=[],g=[];for(let p=0;p<h;p++){const w=p*d-o;for(let x=0;x<c;x++){const y=x*u-r;b.push(y,-w,0),_.push(0,0,1),g.push(x/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let w=0;w<a;w++){const x=w+c*p,y=w+c*(p+1),I=w+1+c*(p+1),D=w+1+c*p;m.push(x,y,D),m.push(y,I,D)}this.setIndex(m),this.setAttribute("position",new xt(b,3)),this.setAttribute("normal",new xt(_,3)),this.setAttribute("uv",new xt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Tn(e.width,e.height,e.widthSegments,e.heightSegments)}}var Ip=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Np=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Up=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Op=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,kp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Bp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,zp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Hp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Gp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Vp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Wp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,jp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Xp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,qp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Yp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Kp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$p=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Zp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Jp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Qp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,em=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,tm=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,nm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,im=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,sm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,rm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,om=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,am=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,lm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,cm="gl_FragColor = linearToOutputTexel( gl_FragColor );",hm=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,um=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,dm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,fm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,pm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,mm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,gm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,bm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,_m=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,vm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,xm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ym=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Sm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Mm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,wm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Em=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Am=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Tm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Cm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Rm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Pm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Lm=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Dm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Im=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Nm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Um=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Om=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,km=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Bm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,zm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Hm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Gm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Vm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Wm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Xm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,qm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ym=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Km=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$m=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Zm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Jm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Qm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,eg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,tg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ng=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ig=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,sg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,rg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,og=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ag=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,lg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,cg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,hg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ug=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,dg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,fg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,pg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,mg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,gg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,bg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,_g=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,vg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,xg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,yg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Sg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Mg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,wg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Eg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ag=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Tg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Cg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Rg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Pg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Lg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Dg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ig=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ng=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ug=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Og=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Bg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,zg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Hg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Gg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Vg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,jg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Xg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,qg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Kg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$g=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Zg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Qg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,eb=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tb=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nb=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,ib=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sb=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rb=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ob=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,ab=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lb=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cb=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,hb=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ub=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,We={alphahash_fragment:Ip,alphahash_pars_fragment:Np,alphamap_fragment:Up,alphamap_pars_fragment:Op,alphatest_fragment:Fp,alphatest_pars_fragment:kp,aomap_fragment:Bp,aomap_pars_fragment:zp,batching_pars_vertex:Hp,batching_vertex:Gp,begin_vertex:Vp,beginnormal_vertex:Wp,bsdfs:jp,iridescence_fragment:Xp,bumpmap_pars_fragment:qp,clipping_planes_fragment:Yp,clipping_planes_pars_fragment:Kp,clipping_planes_pars_vertex:$p,clipping_planes_vertex:Zp,color_fragment:Jp,color_pars_fragment:Qp,color_pars_vertex:em,color_vertex:tm,common:nm,cube_uv_reflection_fragment:im,defaultnormal_vertex:sm,displacementmap_pars_vertex:rm,displacementmap_vertex:om,emissivemap_fragment:am,emissivemap_pars_fragment:lm,colorspace_fragment:cm,colorspace_pars_fragment:hm,envmap_fragment:um,envmap_common_pars_fragment:dm,envmap_pars_fragment:fm,envmap_pars_vertex:pm,envmap_physical_pars_fragment:Em,envmap_vertex:mm,fog_vertex:gm,fog_pars_vertex:bm,fog_fragment:_m,fog_pars_fragment:vm,gradientmap_pars_fragment:xm,lightmap_pars_fragment:ym,lights_lambert_fragment:Sm,lights_lambert_pars_fragment:Mm,lights_pars_begin:wm,lights_toon_fragment:Am,lights_toon_pars_fragment:Tm,lights_phong_fragment:Cm,lights_phong_pars_fragment:Rm,lights_physical_fragment:Pm,lights_physical_pars_fragment:Lm,lights_fragment_begin:Dm,lights_fragment_maps:Im,lights_fragment_end:Nm,logdepthbuf_fragment:Um,logdepthbuf_pars_fragment:Om,logdepthbuf_pars_vertex:Fm,logdepthbuf_vertex:km,map_fragment:Bm,map_pars_fragment:zm,map_particle_fragment:Hm,map_particle_pars_fragment:Gm,metalnessmap_fragment:Vm,metalnessmap_pars_fragment:Wm,morphinstance_vertex:jm,morphcolor_vertex:Xm,morphnormal_vertex:qm,morphtarget_pars_vertex:Ym,morphtarget_vertex:Km,normal_fragment_begin:$m,normal_fragment_maps:Zm,normal_pars_fragment:Jm,normal_pars_vertex:Qm,normal_vertex:eg,normalmap_pars_fragment:tg,clearcoat_normal_fragment_begin:ng,clearcoat_normal_fragment_maps:ig,clearcoat_pars_fragment:sg,iridescence_pars_fragment:rg,opaque_fragment:og,packing:ag,premultiplied_alpha_fragment:lg,project_vertex:cg,dithering_fragment:hg,dithering_pars_fragment:ug,roughnessmap_fragment:dg,roughnessmap_pars_fragment:fg,shadowmap_pars_fragment:pg,shadowmap_pars_vertex:mg,shadowmap_vertex:gg,shadowmask_pars_fragment:bg,skinbase_vertex:_g,skinning_pars_vertex:vg,skinning_vertex:xg,skinnormal_vertex:yg,specularmap_fragment:Sg,specularmap_pars_fragment:Mg,tonemapping_fragment:wg,tonemapping_pars_fragment:Eg,transmission_fragment:Ag,transmission_pars_fragment:Tg,uv_pars_fragment:Cg,uv_pars_vertex:Rg,uv_vertex:Pg,worldpos_vertex:Lg,background_vert:Dg,background_frag:Ig,backgroundCube_vert:Ng,backgroundCube_frag:Ug,cube_vert:Og,cube_frag:Fg,depth_vert:kg,depth_frag:Bg,distanceRGBA_vert:zg,distanceRGBA_frag:Hg,equirect_vert:Gg,equirect_frag:Vg,linedashed_vert:Wg,linedashed_frag:jg,meshbasic_vert:Xg,meshbasic_frag:qg,meshlambert_vert:Yg,meshlambert_frag:Kg,meshmatcap_vert:$g,meshmatcap_frag:Zg,meshnormal_vert:Jg,meshnormal_frag:Qg,meshphong_vert:eb,meshphong_frag:tb,meshphysical_vert:nb,meshphysical_frag:ib,meshtoon_vert:sb,meshtoon_frag:rb,points_vert:ob,points_frag:ab,shadow_vert:lb,shadow_frag:cb,sprite_vert:hb,sprite_frag:ub},pe={common:{diffuse:{value:new De(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new le(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new De(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new De(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new De(16777215)},opacity:{value:1},center:{value:new le(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},sn={basic:{uniforms:Jt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:Jt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new De(0)}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:Jt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new De(0)},specular:{value:new De(1118481)},shininess:{value:30}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:Jt([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new De(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:Jt([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new De(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:Jt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:Jt([pe.points,pe.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:Jt([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:Jt([pe.common,pe.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:Jt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:Jt([pe.sprite,pe.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distanceRGBA:{uniforms:Jt([pe.common,pe.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distanceRGBA_vert,fragmentShader:We.distanceRGBA_frag},shadow:{uniforms:Jt([pe.lights,pe.fog,{color:{value:new De(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};sn.physical={uniforms:Jt([sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new le(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new De(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new le},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new De(0)},specularColor:{value:new De(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new le},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const Xr={r:0,b:0,g:0},Si=new Cn,db=new Le;function fb(s,e,t,n,i,r,o){const a=new De(0);let l=r===!0?0:1,c,h,u=null,d=0,m=null;function b(w){let x=w.isScene===!0?w.background:null;return x&&x.isTexture&&(x=(w.backgroundBlurriness>0?t:e).get(x)),x}function _(w){let x=!1;const y=b(w);y===null?p(a,l):y&&y.isColor&&(p(y,1),x=!0);const I=s.xr.getEnvironmentBlendMode();I==="additive"?n.buffers.color.setClear(0,0,0,1,o):I==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function g(w,x){const y=b(x);y&&(y.isCubeTexture||y.mapping===Ho)?(h===void 0&&(h=new Ye(new gi(1,1,1),new cn({name:"BackgroundCubeMaterial",uniforms:Ss(sn.backgroundCube.uniforms),vertexShader:sn.backgroundCube.vertexShader,fragmentShader:sn.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(I,D,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Si.copy(x.backgroundRotation),Si.x*=-1,Si.y*=-1,Si.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Si.y*=-1,Si.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(db.makeRotationFromEuler(Si)),h.material.toneMapped=at.getTransfer(y.colorSpace)!==mt,(u!==y||d!==y.version||m!==s.toneMapping)&&(h.material.needsUpdate=!0,u=y,d=y.version,m=s.toneMapping),h.layers.enableAll(),w.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Ye(new Tn(2,2),new cn({name:"BackgroundMaterial",uniforms:Ss(sn.background.uniforms),vertexShader:sn.background.vertexShader,fragmentShader:sn.background.fragmentShader,side:Qn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=at.getTransfer(y.colorSpace)!==mt,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||m!==s.toneMapping)&&(c.material.needsUpdate=!0,u=y,d=y.version,m=s.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function p(w,x){w.getRGB(Xr,nd(s)),n.buffers.color.setClear(Xr.r,Xr.g,Xr.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(w,x=1){a.set(w),l=x,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,p(a,l)},render:_,addToRenderList:g}}function pb(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,o=!1;function a(S,C,G,q,K){let se=!1;const X=u(q,G,C);r!==X&&(r=X,c(r.object)),se=m(S,q,G,K),se&&b(S,q,G,K),K!==null&&e.update(K,s.ELEMENT_ARRAY_BUFFER),(se||o)&&(o=!1,y(S,C,G,q),K!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(K).buffer))}function l(){return s.createVertexArray()}function c(S){return s.bindVertexArray(S)}function h(S){return s.deleteVertexArray(S)}function u(S,C,G){const q=G.wireframe===!0;let K=n[S.id];K===void 0&&(K={},n[S.id]=K);let se=K[C.id];se===void 0&&(se={},K[C.id]=se);let X=se[q];return X===void 0&&(X=d(l()),se[q]=X),X}function d(S){const C=[],G=[],q=[];for(let K=0;K<t;K++)C[K]=0,G[K]=0,q[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:G,attributeDivisors:q,object:S,attributes:{},index:null}}function m(S,C,G,q){const K=r.attributes,se=C.attributes;let X=0;const ce=G.getAttributes();for(const Z in ce)if(ce[Z].location>=0){const be=K[Z];let Ae=se[Z];if(Ae===void 0&&(Z==="instanceMatrix"&&S.instanceMatrix&&(Ae=S.instanceMatrix),Z==="instanceColor"&&S.instanceColor&&(Ae=S.instanceColor)),be===void 0||be.attribute!==Ae||Ae&&be.data!==Ae.data)return!0;X++}return r.attributesNum!==X||r.index!==q}function b(S,C,G,q){const K={},se=C.attributes;let X=0;const ce=G.getAttributes();for(const Z in ce)if(ce[Z].location>=0){let be=se[Z];be===void 0&&(Z==="instanceMatrix"&&S.instanceMatrix&&(be=S.instanceMatrix),Z==="instanceColor"&&S.instanceColor&&(be=S.instanceColor));const Ae={};Ae.attribute=be,be&&be.data&&(Ae.data=be.data),K[Z]=Ae,X++}r.attributes=K,r.attributesNum=X,r.index=q}function _(){const S=r.newAttributes;for(let C=0,G=S.length;C<G;C++)S[C]=0}function g(S){p(S,0)}function p(S,C){const G=r.newAttributes,q=r.enabledAttributes,K=r.attributeDivisors;G[S]=1,q[S]===0&&(s.enableVertexAttribArray(S),q[S]=1),K[S]!==C&&(s.vertexAttribDivisor(S,C),K[S]=C)}function w(){const S=r.newAttributes,C=r.enabledAttributes;for(let G=0,q=C.length;G<q;G++)C[G]!==S[G]&&(s.disableVertexAttribArray(G),C[G]=0)}function x(S,C,G,q,K,se,X){X===!0?s.vertexAttribIPointer(S,C,G,K,se):s.vertexAttribPointer(S,C,G,q,K,se)}function y(S,C,G,q){_();const K=q.attributes,se=G.getAttributes(),X=C.defaultAttributeValues;for(const ce in se){const Z=se[ce];if(Z.location>=0){let ge=K[ce];if(ge===void 0&&(ce==="instanceMatrix"&&S.instanceMatrix&&(ge=S.instanceMatrix),ce==="instanceColor"&&S.instanceColor&&(ge=S.instanceColor)),ge!==void 0){const be=ge.normalized,Ae=ge.itemSize,Be=e.get(ge);if(Be===void 0)continue;const Ge=Be.buffer,J=Be.type,oe=Be.bytesPerElement,de=J===s.INT||J===s.UNSIGNED_INT||ge.gpuType===Yl;if(ge.isInterleavedBufferAttribute){const _e=ge.data,Ie=_e.stride,Ne=ge.offset;if(_e.isInstancedInterleavedBuffer){for(let Ke=0;Ke<Z.locationSize;Ke++)p(Z.location+Ke,_e.meshPerAttribute);S.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=_e.meshPerAttribute*_e.count)}else for(let Ke=0;Ke<Z.locationSize;Ke++)g(Z.location+Ke);s.bindBuffer(s.ARRAY_BUFFER,Ge);for(let Ke=0;Ke<Z.locationSize;Ke++)x(Z.location+Ke,Ae/Z.locationSize,J,be,Ie*oe,(Ne+Ae/Z.locationSize*Ke)*oe,de)}else{if(ge.isInstancedBufferAttribute){for(let _e=0;_e<Z.locationSize;_e++)p(Z.location+_e,ge.meshPerAttribute);S.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let _e=0;_e<Z.locationSize;_e++)g(Z.location+_e);s.bindBuffer(s.ARRAY_BUFFER,Ge);for(let _e=0;_e<Z.locationSize;_e++)x(Z.location+_e,Ae/Z.locationSize,J,be,Ae*oe,Ae/Z.locationSize*_e*oe,de)}}else if(X!==void 0){const be=X[ce];if(be!==void 0)switch(be.length){case 2:s.vertexAttrib2fv(Z.location,be);break;case 3:s.vertexAttrib3fv(Z.location,be);break;case 4:s.vertexAttrib4fv(Z.location,be);break;default:s.vertexAttrib1fv(Z.location,be)}}}}w()}function I(){B();for(const S in n){const C=n[S];for(const G in C){const q=C[G];for(const K in q)h(q[K].object),delete q[K];delete C[G]}delete n[S]}}function D(S){if(n[S.id]===void 0)return;const C=n[S.id];for(const G in C){const q=C[G];for(const K in q)h(q[K].object),delete q[K];delete C[G]}delete n[S.id]}function P(S){for(const C in n){const G=n[C];if(G[S.id]===void 0)continue;const q=G[S.id];for(const K in q)h(q[K].object),delete q[K];delete G[S.id]}}function B(){$(),o=!0,r!==i&&(r=i,c(r.object))}function $(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:B,resetDefaultState:$,dispose:I,releaseStatesOfGeometry:D,releaseStatesOfProgram:P,initAttributes:_,enableAttribute:g,disableUnusedAttributes:w}}function mb(s,e,t){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),t.update(h,n,1)}function o(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let m=0;for(let b=0;b<u;b++)m+=h[b];t.update(m,n,1)}function l(c,h,u,d){if(u===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let b=0;b<c.length;b++)o(c[b],h[b],d[b]);else{m.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let b=0;for(let _=0;_<u;_++)b+=h[_];for(let _=0;_<d.length;_++)t.update(b,n,d[_])}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function gb(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(P){return!(P!==ln&&n.convert(P)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(P){const B=P===$n&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==ei&&n.convert(P)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==rn&&!B)}function l(P){if(P==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(d===!0){const P=e.get("EXT_clip_control");P.clipControlEXT(P.LOWER_LEFT_EXT,P.ZERO_TO_ONE_EXT)}const m=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),b=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),w=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),x=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),I=b>0,D=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:m,maxVertexTextures:b,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:w,maxVaryings:x,maxFragmentUniforms:y,vertexTextures:I,maxSamples:D}}function bb(s){const e=this;let t=null,n=0,i=!1,r=!1;const o=new ui,a=new je,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const m=u.length!==0||d||n!==0||i;return i=d,n=u.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,m){const b=u.clippingPlanes,_=u.clipIntersection,g=u.clipShadows,p=s.get(u);if(!i||b===null||b.length===0||r&&!g)r?h(null):c();else{const w=r?0:n,x=w*4;let y=p.clippingState||null;l.value=y,y=h(b,d,x,m);for(let I=0;I!==x;++I)y[I]=t[I];p.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,m,b){const _=u!==null?u.length:0;let g=null;if(_!==0){if(g=l.value,b!==!0||g===null){const p=m+_*4,w=d.matrixWorldInverse;a.getNormalMatrix(w),(g===null||g.length<p)&&(g=new Float32Array(p));for(let x=0,y=m;x!==_;++x,y+=4)o.copy(u[x]).applyMatrix4(w,a),o.normal.toArray(g,y),g[y+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}function _b(s){let e=new WeakMap;function t(o,a){return a===Po?o.mapping=gs:a===sl&&(o.mapping=bs),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Po||a===sl)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Rp(l.height);return c.fromEquirectangularTexture(s,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class ac extends id{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const rs=4,ih=[.125,.215,.35,.446,.526,.582],Pi=20,va=new ac,sh=new De;let xa=null,ya=0,Sa=0,Ma=!1;const Ci=(1+Math.sqrt(5))/2,Zi=1/Ci,rh=[new R(-Ci,Zi,0),new R(Ci,Zi,0),new R(-Zi,0,Ci),new R(Zi,0,Ci),new R(0,Ci,-Zi),new R(0,Ci,Zi),new R(-1,1,-1),new R(1,1,-1),new R(-1,1,1),new R(1,1,1)];class oh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){xa=this._renderer.getRenderTarget(),ya=this._renderer.getActiveCubeFace(),Sa=this._renderer.getActiveMipmapLevel(),Ma=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ch(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=lh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(xa,ya,Sa),this._renderer.xr.enabled=Ma,e.scissorTest=!1,qr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===gs||e.mapping===bs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),xa=this._renderer.getRenderTarget(),ya=this._renderer.getActiveCubeFace(),Sa=this._renderer.getActiveMipmapLevel(),Ma=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Pt,minFilter:Pt,generateMipmaps:!1,type:$n,format:ln,colorSpace:Ut,depthBuffer:!1},i=ah(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ah(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=vb(r)),this._blurMaterial=xb(r,e,t)}return i}_compileMaterial(e){const t=new Ye(this._lodPlanes[0],e);this._renderer.compile(t,va)}_sceneToCubeUV(e,t,n,i){const a=new Qt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(sh),h.toneMapping=pi,h.autoClear=!1;const m=new pt({name:"PMREM.Background",side:tn,depthWrite:!1,depthTest:!1}),b=new Ye(new gi,m);let _=!1;const g=e.background;g?g.isColor&&(m.color.copy(g),e.background=null,_=!0):(m.color.copy(sh),_=!0);for(let p=0;p<6;p++){const w=p%3;w===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):w===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const x=this._cubeSize;qr(i,w*x,p>2?x:0,x,x),h.setRenderTarget(i),_&&h.render(b,a),h.render(e,a)}b.geometry.dispose(),b.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=g}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===gs||e.mapping===bs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=ch()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=lh());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new Ye(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;qr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,va)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=rh[(i-r-1)%rh.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Ye(this._lodPlanes[i],c),d=c.uniforms,m=this._sizeLods[n]-1,b=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Pi-1),_=r/b,g=isFinite(r)?1+Math.floor(h*_):Pi;g>Pi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Pi}`);const p=[];let w=0;for(let P=0;P<Pi;++P){const B=P/_,$=Math.exp(-B*B/2);p.push($),P===0?w+=$:P<g&&(w+=2*$)}for(let P=0;P<p.length;P++)p[P]=p[P]/w;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:x}=this;d.dTheta.value=b,d.mipInt.value=x-n;const y=this._sizeLods[i],I=3*y*(i>x-rs?i-x+rs:0),D=4*(this._cubeSize-y);qr(t,I,D,3*y,2*y),l.setRenderTarget(t),l.render(u,va)}}function vb(s){const e=[],t=[],n=[];let i=s;const r=s-rs+1+ih.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>s-rs?l=ih[o-s+rs-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],m=6,b=6,_=3,g=2,p=1,w=new Float32Array(_*b*m),x=new Float32Array(g*b*m),y=new Float32Array(p*b*m);for(let D=0;D<m;D++){const P=D%3*2/3-1,B=D>2?0:-1,$=[P,B,0,P+2/3,B,0,P+2/3,B+1,0,P,B,0,P+2/3,B+1,0,P,B+1,0];w.set($,_*b*D),x.set(d,g*b*D);const S=[D,D,D,D,D,D];y.set(S,p*b*D)}const I=new St;I.setAttribute("position",new Bt(w,_)),I.setAttribute("uv",new Bt(x,g)),I.setAttribute("faceIndex",new Bt(y,p)),e.push(I),i>rs&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function ah(s,e,t){const n=new mi(s,e,t);return n.texture.mapping=Ho,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function qr(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function xb(s,e,t){const n=new Float32Array(Pi),i=new R(0,1,0);return new cn({name:"SphericalGaussianBlur",defines:{n:Pi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:lc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:fi,depthTest:!1,depthWrite:!1})}function lh(){return new cn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:lc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:fi,depthTest:!1,depthWrite:!1})}function ch(){return new cn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:lc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:fi,depthTest:!1,depthWrite:!1})}function lc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function yb(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Po||l===sl,h=l===gs||l===bs;if(c||h){let u=e.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new oh(s)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const m=a.image;return c&&m&&m.height>0||h&&m&&i(m)?(t===null&&(t=new oh(s)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Sb(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&To("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Mb(s,e,t,n){const i={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const b in d.attributes)e.remove(d.attributes[b]);for(const b in d.morphAttributes){const _=d.morphAttributes[b];for(let g=0,p=_.length;g<p;g++)e.remove(_[g])}d.removeEventListener("dispose",o),delete i[d.id];const m=r.get(d);m&&(e.remove(m),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const b in d)e.update(d[b],s.ARRAY_BUFFER);const m=u.morphAttributes;for(const b in m){const _=m[b];for(let g=0,p=_.length;g<p;g++)e.update(_[g],s.ARRAY_BUFFER)}}function c(u){const d=[],m=u.index,b=u.attributes.position;let _=0;if(m!==null){const w=m.array;_=m.version;for(let x=0,y=w.length;x<y;x+=3){const I=w[x+0],D=w[x+1],P=w[x+2];d.push(I,D,D,P,P,I)}}else if(b!==void 0){const w=b.array;_=b.version;for(let x=0,y=w.length/3-1;x<y;x+=3){const I=x+0,D=x+1,P=x+2;d.push(I,D,D,P,P,I)}}else return;const g=new(Zu(d)?td:ed)(d,1);g.version=_;const p=r.get(u);p&&e.remove(p),r.set(u,g)}function h(u){const d=r.get(u);if(d){const m=u.index;m!==null&&d.version<m.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function wb(s,e,t){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,m){s.drawElements(n,m,r,d*o),t.update(m,n,1)}function c(d,m,b){b!==0&&(s.drawElementsInstanced(n,m,r,d*o,b),t.update(m,n,b))}function h(d,m,b){if(b===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,r,d,0,b);let g=0;for(let p=0;p<b;p++)g+=m[p];t.update(g,n,1)}function u(d,m,b,_){if(b===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)c(d[p]/o,m[p],_[p]);else{g.multiDrawElementsInstancedWEBGL(n,m,0,r,d,0,_,0,b);let p=0;for(let w=0;w<b;w++)p+=m[w];for(let w=0;w<_.length;w++)t.update(p,n,_[w])}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Eb(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Ab(s,e,t){const n=new WeakMap,i=new tt;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let $=function(){P.dispose(),n.delete(a),a.removeEventListener("dispose",$)};d!==void 0&&d.texture.dispose();const m=a.morphAttributes.position!==void 0,b=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],w=a.morphAttributes.color||[];let x=0;m===!0&&(x=1),b===!0&&(x=2),_===!0&&(x=3);let y=a.attributes.position.count*x,I=1;y>e.maxTextureSize&&(I=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const D=new Float32Array(y*I*4*u),P=new nc(D,y,I,u);P.type=rn,P.needsUpdate=!0;const B=x*4;for(let S=0;S<u;S++){const C=g[S],G=p[S],q=w[S],K=y*I*4*S;for(let se=0;se<C.count;se++){const X=se*B;m===!0&&(i.fromBufferAttribute(C,se),D[K+X+0]=i.x,D[K+X+1]=i.y,D[K+X+2]=i.z,D[K+X+3]=0),b===!0&&(i.fromBufferAttribute(G,se),D[K+X+4]=i.x,D[K+X+5]=i.y,D[K+X+6]=i.z,D[K+X+7]=0),_===!0&&(i.fromBufferAttribute(q,se),D[K+X+8]=i.x,D[K+X+9]=i.y,D[K+X+10]=i.z,D[K+X+11]=q.itemSize===4?i.w:1)}}d={count:u,texture:P,size:new le(y,I)},n.set(a,d),a.addEventListener("dispose",$)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,t);else{let m=0;for(let _=0;_<c.length;_++)m+=c[_];const b=a.morphTargetsRelative?1:1-m;l.getUniforms().setValue(s,"morphTargetBaseInfluence",b),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function Tb(s,e,t,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}class rd extends Nt{constructor(e,t,n,i,r,o,a,l,c,h=us){if(h!==us&&h!==xs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===us&&(n=Ii),n===void 0&&h===xs&&(n=vs),super(null,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Kt,this.minFilter=l!==void 0?l:Kt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const od=new Nt,hh=new rd(1,1),ad=new nc,ld=new up,cd=new rc,uh=[],dh=[],fh=new Float32Array(16),ph=new Float32Array(9),mh=new Float32Array(4);function Cs(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=uh[i];if(r===void 0&&(r=new Float32Array(i),uh[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function Ot(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Ft(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Wo(s,e){let t=dh[e];t===void 0&&(t=new Int32Array(e),dh[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function Cb(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Rb(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;s.uniform2fv(this.addr,e),Ft(t,e)}}function Pb(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ot(t,e))return;s.uniform3fv(this.addr,e),Ft(t,e)}}function Lb(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;s.uniform4fv(this.addr,e),Ft(t,e)}}function Db(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ot(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Ft(t,e)}else{if(Ot(t,n))return;mh.set(n),s.uniformMatrix2fv(this.addr,!1,mh),Ft(t,n)}}function Ib(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ot(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Ft(t,e)}else{if(Ot(t,n))return;ph.set(n),s.uniformMatrix3fv(this.addr,!1,ph),Ft(t,n)}}function Nb(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ot(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Ft(t,e)}else{if(Ot(t,n))return;fh.set(n),s.uniformMatrix4fv(this.addr,!1,fh),Ft(t,n)}}function Ub(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Ob(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;s.uniform2iv(this.addr,e),Ft(t,e)}}function Fb(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ot(t,e))return;s.uniform3iv(this.addr,e),Ft(t,e)}}function kb(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;s.uniform4iv(this.addr,e),Ft(t,e)}}function Bb(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function zb(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;s.uniform2uiv(this.addr,e),Ft(t,e)}}function Hb(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ot(t,e))return;s.uniform3uiv(this.addr,e),Ft(t,e)}}function Gb(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;s.uniform4uiv(this.addr,e),Ft(t,e)}}function Vb(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(hh.compareFunction=$u,r=hh):r=od,t.setTexture2D(e||r,i)}function Wb(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||ld,i)}function jb(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||cd,i)}function Xb(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||ad,i)}function qb(s){switch(s){case 5126:return Cb;case 35664:return Rb;case 35665:return Pb;case 35666:return Lb;case 35674:return Db;case 35675:return Ib;case 35676:return Nb;case 5124:case 35670:return Ub;case 35667:case 35671:return Ob;case 35668:case 35672:return Fb;case 35669:case 35673:return kb;case 5125:return Bb;case 36294:return zb;case 36295:return Hb;case 36296:return Gb;case 35678:case 36198:case 36298:case 36306:case 35682:return Vb;case 35679:case 36299:case 36307:return Wb;case 35680:case 36300:case 36308:case 36293:return jb;case 36289:case 36303:case 36311:case 36292:return Xb}}function Yb(s,e){s.uniform1fv(this.addr,e)}function Kb(s,e){const t=Cs(e,this.size,2);s.uniform2fv(this.addr,t)}function $b(s,e){const t=Cs(e,this.size,3);s.uniform3fv(this.addr,t)}function Zb(s,e){const t=Cs(e,this.size,4);s.uniform4fv(this.addr,t)}function Jb(s,e){const t=Cs(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Qb(s,e){const t=Cs(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function e_(s,e){const t=Cs(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function t_(s,e){s.uniform1iv(this.addr,e)}function n_(s,e){s.uniform2iv(this.addr,e)}function i_(s,e){s.uniform3iv(this.addr,e)}function s_(s,e){s.uniform4iv(this.addr,e)}function r_(s,e){s.uniform1uiv(this.addr,e)}function o_(s,e){s.uniform2uiv(this.addr,e)}function a_(s,e){s.uniform3uiv(this.addr,e)}function l_(s,e){s.uniform4uiv(this.addr,e)}function c_(s,e,t){const n=this.cache,i=e.length,r=Wo(t,i);Ot(n,r)||(s.uniform1iv(this.addr,r),Ft(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||od,r[o])}function h_(s,e,t){const n=this.cache,i=e.length,r=Wo(t,i);Ot(n,r)||(s.uniform1iv(this.addr,r),Ft(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||ld,r[o])}function u_(s,e,t){const n=this.cache,i=e.length,r=Wo(t,i);Ot(n,r)||(s.uniform1iv(this.addr,r),Ft(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||cd,r[o])}function d_(s,e,t){const n=this.cache,i=e.length,r=Wo(t,i);Ot(n,r)||(s.uniform1iv(this.addr,r),Ft(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||ad,r[o])}function f_(s){switch(s){case 5126:return Yb;case 35664:return Kb;case 35665:return $b;case 35666:return Zb;case 35674:return Jb;case 35675:return Qb;case 35676:return e_;case 5124:case 35670:return t_;case 35667:case 35671:return n_;case 35668:case 35672:return i_;case 35669:case 35673:return s_;case 5125:return r_;case 36294:return o_;case 36295:return a_;case 36296:return l_;case 35678:case 36198:case 36298:case 36306:case 35682:return c_;case 35679:case 36299:case 36307:return h_;case 35680:case 36300:case 36308:case 36293:return u_;case 36289:case 36303:case 36311:case 36292:return d_}}class p_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=qb(t.type)}}class m_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=f_(t.type)}}class g_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(e,t[a.id],n)}}}const wa=/(\w+)(\])?(\[|\.)?/g;function gh(s,e){s.seq.push(e),s.map[e.id]=e}function b_(s,e,t){const n=s.name,i=n.length;for(wa.lastIndex=0;;){const r=wa.exec(n),o=wa.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){gh(t,c===void 0?new p_(a,s,e):new m_(a,s,e));break}else{let u=t.map[a];u===void 0&&(u=new g_(a),gh(t,u)),t=u}}}class Co{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);b_(r,o,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function bh(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const __=37297;let v_=0;function x_(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function y_(s){const e=at.getPrimaries(at.workingColorSpace),t=at.getPrimaries(s);let n;switch(e===t?n="":e===No&&t===Io?n="LinearDisplayP3ToLinearSRGB":e===Io&&t===No&&(n="LinearSRGBToLinearDisplayP3"),s){case Ut:case Vo:return[n,"LinearTransferOETF"];case vt:case ec:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function _h(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+x_(s.getShaderSource(e),o)}else return i}function S_(s,e){const t=y_(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function M_(s,e){let t;switch(e){case xf:t="Linear";break;case yf:t="Reinhard";break;case Sf:t="Cineon";break;case Mf:t="ACESFilmic";break;case Ef:t="AgX";break;case Af:t="Neutral";break;case wf:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Yr=new R;function w_(){at.getLuminanceCoefficients(Yr);const s=Yr.x.toFixed(4),e=Yr.y.toFixed(4),t=Yr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function E_(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(er).join(`
`)}function A_(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function T_(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function er(s){return s!==""}function vh(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function xh(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const C_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Il(s){return s.replace(C_,P_)}const R_=new Map;function P_(s,e){let t=We[e];if(t===void 0){const n=R_.get(e);if(n!==void 0)t=We[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Il(t)}const L_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function yh(s){return s.replace(L_,D_)}function D_(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Sh(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function I_(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Uu?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Jd?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===qn&&(e="SHADOWMAP_TYPE_VSM"),e}function N_(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case gs:case bs:e="ENVMAP_TYPE_CUBE";break;case Ho:e="ENVMAP_TYPE_CUBE_UV";break}return e}function U_(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case bs:e="ENVMAP_MODE_REFRACTION";break}return e}function O_(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Ou:e="ENVMAP_BLENDING_MULTIPLY";break;case _f:e="ENVMAP_BLENDING_MIX";break;case vf:e="ENVMAP_BLENDING_ADD";break}return e}function F_(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function k_(s,e,t,n){const i=s.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=I_(t),c=N_(t),h=U_(t),u=O_(t),d=F_(t),m=E_(t),b=A_(r),_=i.createProgram();let g,p,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b].filter(er).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b].filter(er).join(`
`),p.length>0&&(p+=`
`)):(g=[Sh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(er).join(`
`),p=[Sh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==pi?"#define TONE_MAPPING":"",t.toneMapping!==pi?We.tonemapping_pars_fragment:"",t.toneMapping!==pi?M_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,S_("linearToOutputTexel",t.outputColorSpace),w_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(er).join(`
`)),o=Il(o),o=vh(o,t),o=xh(o,t),a=Il(a),a=vh(a,t),a=xh(a,t),o=yh(o),a=yh(a),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Fc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Fc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=w+g+o,y=w+p+a,I=bh(i,i.VERTEX_SHADER,x),D=bh(i,i.FRAGMENT_SHADER,y);i.attachShader(_,I),i.attachShader(_,D),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function P(C){if(s.debug.checkShaderErrors){const G=i.getProgramInfoLog(_).trim(),q=i.getShaderInfoLog(I).trim(),K=i.getShaderInfoLog(D).trim();let se=!0,X=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(se=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,I,D);else{const ce=_h(i,I,"vertex"),Z=_h(i,D,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+G+`
`+ce+`
`+Z)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(q===""||K==="")&&(X=!1);X&&(C.diagnostics={runnable:se,programLog:G,vertexShader:{log:q,prefix:g},fragmentShader:{log:K,prefix:p}})}i.deleteShader(I),i.deleteShader(D),B=new Co(i,_),$=T_(i,_)}let B;this.getUniforms=function(){return B===void 0&&P(this),B};let $;this.getAttributes=function(){return $===void 0&&P(this),$};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=i.getProgramParameter(_,__)),S},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=v_++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=I,this.fragmentShader=D,this}let B_=0;class z_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new H_(e),t.set(e,n)),n}}class H_{constructor(e){this.id=B_++,this.code=e,this.usedTimes=0}}function G_(s,e,t,n,i,r,o){const a=new ic,l=new z_,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.reverseDepthBuffer,m=i.vertexTextures;let b=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(S){return c.add(S),S===0?"uv":`uv${S}`}function p(S,C,G,q,K){const se=q.fog,X=K.geometry,ce=S.isMeshStandardMaterial?q.environment:null,Z=(S.isMeshStandardMaterial?t:e).get(S.envMap||ce),ge=Z&&Z.mapping===Ho?Z.image.height:null,be=_[S.type];S.precision!==null&&(b=i.getMaxPrecision(S.precision),b!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",b,"instead."));const Ae=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Be=Ae!==void 0?Ae.length:0;let Ge=0;X.morphAttributes.position!==void 0&&(Ge=1),X.morphAttributes.normal!==void 0&&(Ge=2),X.morphAttributes.color!==void 0&&(Ge=3);let J,oe,de,_e;if(be){const Xt=sn[be];J=Xt.vertexShader,oe=Xt.fragmentShader}else J=S.vertexShader,oe=S.fragmentShader,l.update(S),de=l.getVertexShaderID(S),_e=l.getFragmentShaderID(S);const Ie=s.getRenderTarget(),Ne=K.isInstancedMesh===!0,Ke=K.isBatchedMesh===!0,st=!!S.map,qe=!!S.matcap,O=!!Z,Wt=!!S.aoMap,$e=!!S.lightMap,rt=!!S.bumpMap,Oe=!!S.normalMap,ft=!!S.displacementMap,ke=!!S.emissiveMap,L=!!S.metalnessMap,A=!!S.roughnessMap,V=S.anisotropy>0,te=S.clearcoat>0,ae=S.dispersion>0,ee=S.iridescence>0,Re=S.sheen>0,ve=S.transmission>0,Me=V&&!!S.anisotropyMap,Ze=te&&!!S.clearcoatMap,fe=te&&!!S.clearcoatNormalMap,Ee=te&&!!S.clearcoatRoughnessMap,Fe=ee&&!!S.iridescenceMap,Pe=ee&&!!S.iridescenceThicknessMap,me=Re&&!!S.sheenColorMap,Je=Re&&!!S.sheenRoughnessMap,Ue=!!S.specularMap,Ve=!!S.specularColorMap,F=!!S.specularIntensityMap,ye=ve&&!!S.transmissionMap,k=ve&&!!S.thicknessMap,ne=!!S.gradientMap,xe=!!S.alphaMap,Se=S.alphaTest>0,nt=!!S.alphaHash,wt=!!S.extensions;let jt=pi;S.toneMapped&&(Ie===null||Ie.isXRRenderTarget===!0)&&(jt=s.toneMapping);const ot={shaderID:be,shaderType:S.type,shaderName:S.name,vertexShader:J,fragmentShader:oe,defines:S.defines,customVertexShaderID:de,customFragmentShaderID:_e,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:b,batching:Ke,batchingColor:Ke&&K._colorsTexture!==null,instancing:Ne,instancingColor:Ne&&K.instanceColor!==null,instancingMorph:Ne&&K.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:Ie===null?s.outputColorSpace:Ie.isXRRenderTarget===!0?Ie.texture.colorSpace:Ut,alphaToCoverage:!!S.alphaToCoverage,map:st,matcap:qe,envMap:O,envMapMode:O&&Z.mapping,envMapCubeUVHeight:ge,aoMap:Wt,lightMap:$e,bumpMap:rt,normalMap:Oe,displacementMap:m&&ft,emissiveMap:ke,normalMapObjectSpace:Oe&&S.normalMapType===Df,normalMapTangentSpace:Oe&&S.normalMapType===Ku,metalnessMap:L,roughnessMap:A,anisotropy:V,anisotropyMap:Me,clearcoat:te,clearcoatMap:Ze,clearcoatNormalMap:fe,clearcoatRoughnessMap:Ee,dispersion:ae,iridescence:ee,iridescenceMap:Fe,iridescenceThicknessMap:Pe,sheen:Re,sheenColorMap:me,sheenRoughnessMap:Je,specularMap:Ue,specularColorMap:Ve,specularIntensityMap:F,transmission:ve,transmissionMap:ye,thicknessMap:k,gradientMap:ne,opaque:S.transparent===!1&&S.blending===hs&&S.alphaToCoverage===!1,alphaMap:xe,alphaTest:Se,alphaHash:nt,combine:S.combine,mapUv:st&&g(S.map.channel),aoMapUv:Wt&&g(S.aoMap.channel),lightMapUv:$e&&g(S.lightMap.channel),bumpMapUv:rt&&g(S.bumpMap.channel),normalMapUv:Oe&&g(S.normalMap.channel),displacementMapUv:ft&&g(S.displacementMap.channel),emissiveMapUv:ke&&g(S.emissiveMap.channel),metalnessMapUv:L&&g(S.metalnessMap.channel),roughnessMapUv:A&&g(S.roughnessMap.channel),anisotropyMapUv:Me&&g(S.anisotropyMap.channel),clearcoatMapUv:Ze&&g(S.clearcoatMap.channel),clearcoatNormalMapUv:fe&&g(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ee&&g(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Fe&&g(S.iridescenceMap.channel),iridescenceThicknessMapUv:Pe&&g(S.iridescenceThicknessMap.channel),sheenColorMapUv:me&&g(S.sheenColorMap.channel),sheenRoughnessMapUv:Je&&g(S.sheenRoughnessMap.channel),specularMapUv:Ue&&g(S.specularMap.channel),specularColorMapUv:Ve&&g(S.specularColorMap.channel),specularIntensityMapUv:F&&g(S.specularIntensityMap.channel),transmissionMapUv:ye&&g(S.transmissionMap.channel),thicknessMapUv:k&&g(S.thicknessMap.channel),alphaMapUv:xe&&g(S.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(Oe||V),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:K.isPoints===!0&&!!X.attributes.uv&&(st||xe),fog:!!se,useFog:S.fog===!0,fogExp2:!!se&&se.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:d,skinning:K.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:Be,morphTextureStride:Ge,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:s.shadowMap.enabled&&G.length>0,shadowMapType:s.shadowMap.type,toneMapping:jt,decodeVideoTexture:st&&S.map.isVideoTexture===!0&&at.getTransfer(S.map.colorSpace)===mt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===en,flipSided:S.side===tn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:wt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(wt&&S.extensions.multiDraw===!0||Ke)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return ot.vertexUv1s=c.has(1),ot.vertexUv2s=c.has(2),ot.vertexUv3s=c.has(3),c.clear(),ot}function w(S){const C=[];if(S.shaderID?C.push(S.shaderID):(C.push(S.customVertexShaderID),C.push(S.customFragmentShaderID)),S.defines!==void 0)for(const G in S.defines)C.push(G),C.push(S.defines[G]);return S.isRawShaderMaterial===!1&&(x(C,S),y(C,S),C.push(s.outputColorSpace)),C.push(S.customProgramCacheKey),C.join()}function x(S,C){S.push(C.precision),S.push(C.outputColorSpace),S.push(C.envMapMode),S.push(C.envMapCubeUVHeight),S.push(C.mapUv),S.push(C.alphaMapUv),S.push(C.lightMapUv),S.push(C.aoMapUv),S.push(C.bumpMapUv),S.push(C.normalMapUv),S.push(C.displacementMapUv),S.push(C.emissiveMapUv),S.push(C.metalnessMapUv),S.push(C.roughnessMapUv),S.push(C.anisotropyMapUv),S.push(C.clearcoatMapUv),S.push(C.clearcoatNormalMapUv),S.push(C.clearcoatRoughnessMapUv),S.push(C.iridescenceMapUv),S.push(C.iridescenceThicknessMapUv),S.push(C.sheenColorMapUv),S.push(C.sheenRoughnessMapUv),S.push(C.specularMapUv),S.push(C.specularColorMapUv),S.push(C.specularIntensityMapUv),S.push(C.transmissionMapUv),S.push(C.thicknessMapUv),S.push(C.combine),S.push(C.fogExp2),S.push(C.sizeAttenuation),S.push(C.morphTargetsCount),S.push(C.morphAttributeCount),S.push(C.numDirLights),S.push(C.numPointLights),S.push(C.numSpotLights),S.push(C.numSpotLightMaps),S.push(C.numHemiLights),S.push(C.numRectAreaLights),S.push(C.numDirLightShadows),S.push(C.numPointLightShadows),S.push(C.numSpotLightShadows),S.push(C.numSpotLightShadowsWithMaps),S.push(C.numLightProbes),S.push(C.shadowMapType),S.push(C.toneMapping),S.push(C.numClippingPlanes),S.push(C.numClipIntersection),S.push(C.depthPacking)}function y(S,C){a.disableAll(),C.supportsVertexTextures&&a.enable(0),C.instancing&&a.enable(1),C.instancingColor&&a.enable(2),C.instancingMorph&&a.enable(3),C.matcap&&a.enable(4),C.envMap&&a.enable(5),C.normalMapObjectSpace&&a.enable(6),C.normalMapTangentSpace&&a.enable(7),C.clearcoat&&a.enable(8),C.iridescence&&a.enable(9),C.alphaTest&&a.enable(10),C.vertexColors&&a.enable(11),C.vertexAlphas&&a.enable(12),C.vertexUv1s&&a.enable(13),C.vertexUv2s&&a.enable(14),C.vertexUv3s&&a.enable(15),C.vertexTangents&&a.enable(16),C.anisotropy&&a.enable(17),C.alphaHash&&a.enable(18),C.batching&&a.enable(19),C.dispersion&&a.enable(20),C.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),C.fog&&a.enable(0),C.useFog&&a.enable(1),C.flatShading&&a.enable(2),C.logarithmicDepthBuffer&&a.enable(3),C.reverseDepthBuffer&&a.enable(4),C.skinning&&a.enable(5),C.morphTargets&&a.enable(6),C.morphNormals&&a.enable(7),C.morphColors&&a.enable(8),C.premultipliedAlpha&&a.enable(9),C.shadowMapEnabled&&a.enable(10),C.doubleSided&&a.enable(11),C.flipSided&&a.enable(12),C.useDepthPacking&&a.enable(13),C.dithering&&a.enable(14),C.transmission&&a.enable(15),C.sheen&&a.enable(16),C.opaque&&a.enable(17),C.pointsUvs&&a.enable(18),C.decodeVideoTexture&&a.enable(19),C.alphaToCoverage&&a.enable(20),S.push(a.mask)}function I(S){const C=_[S.type];let G;if(C){const q=sn[C];G=sc.clone(q.uniforms)}else G=S.uniforms;return G}function D(S,C){let G;for(let q=0,K=h.length;q<K;q++){const se=h[q];if(se.cacheKey===C){G=se,++G.usedTimes;break}}return G===void 0&&(G=new k_(s,C,S,r),h.push(G)),G}function P(S){if(--S.usedTimes===0){const C=h.indexOf(S);h[C]=h[h.length-1],h.pop(),S.destroy()}}function B(S){l.remove(S)}function $(){l.dispose()}return{getParameters:p,getProgramCacheKey:w,getUniforms:I,acquireProgram:D,releaseProgram:P,releaseShaderCache:B,programs:h,dispose:$}}function V_(){let s=new WeakMap;function e(o){return s.has(o)}function t(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function W_(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Mh(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function wh(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(u,d,m,b,_,g){let p=s[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:m,groupOrder:b,renderOrder:u.renderOrder,z:_,group:g},s[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=m,p.groupOrder=b,p.renderOrder=u.renderOrder,p.z=_,p.group=g),e++,p}function a(u,d,m,b,_,g){const p=o(u,d,m,b,_,g);m.transmission>0?n.push(p):m.transparent===!0?i.push(p):t.push(p)}function l(u,d,m,b,_,g){const p=o(u,d,m,b,_,g);m.transmission>0?n.unshift(p):m.transparent===!0?i.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||W_),n.length>1&&n.sort(d||Mh),i.length>1&&i.sort(d||Mh)}function h(){for(let u=e,d=s.length;u<d;u++){const m=s[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function j_(){let s=new WeakMap;function e(n,i){const r=s.get(n);let o;return r===void 0?(o=new wh,s.set(n,[o])):i>=r.length?(o=new wh,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function X_(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new De};break;case"SpotLight":t={position:new R,direction:new R,color:new De,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new De,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new De,groundColor:new De};break;case"RectAreaLight":t={color:new De,position:new R,halfWidth:new R,halfHeight:new R};break}return s[e.id]=t,t}}}function q_(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Y_=0;function K_(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function $_(s){const e=new X_,t=q_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new R);const i=new R,r=new Le,o=new Le;function a(c){let h=0,u=0,d=0;for(let $=0;$<9;$++)n.probe[$].set(0,0,0);let m=0,b=0,_=0,g=0,p=0,w=0,x=0,y=0,I=0,D=0,P=0;c.sort(K_);for(let $=0,S=c.length;$<S;$++){const C=c[$],G=C.color,q=C.intensity,K=C.distance,se=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=G.r*q,u+=G.g*q,d+=G.b*q;else if(C.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(C.sh.coefficients[X],q);P++}else if(C.isDirectionalLight){const X=e.get(C);if(X.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const ce=C.shadow,Z=t.get(C);Z.shadowIntensity=ce.intensity,Z.shadowBias=ce.bias,Z.shadowNormalBias=ce.normalBias,Z.shadowRadius=ce.radius,Z.shadowMapSize=ce.mapSize,n.directionalShadow[m]=Z,n.directionalShadowMap[m]=se,n.directionalShadowMatrix[m]=C.shadow.matrix,w++}n.directional[m]=X,m++}else if(C.isSpotLight){const X=e.get(C);X.position.setFromMatrixPosition(C.matrixWorld),X.color.copy(G).multiplyScalar(q),X.distance=K,X.coneCos=Math.cos(C.angle),X.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),X.decay=C.decay,n.spot[_]=X;const ce=C.shadow;if(C.map&&(n.spotLightMap[I]=C.map,I++,ce.updateMatrices(C),C.castShadow&&D++),n.spotLightMatrix[_]=ce.matrix,C.castShadow){const Z=t.get(C);Z.shadowIntensity=ce.intensity,Z.shadowBias=ce.bias,Z.shadowNormalBias=ce.normalBias,Z.shadowRadius=ce.radius,Z.shadowMapSize=ce.mapSize,n.spotShadow[_]=Z,n.spotShadowMap[_]=se,y++}_++}else if(C.isRectAreaLight){const X=e.get(C);X.color.copy(G).multiplyScalar(q),X.halfWidth.set(C.width*.5,0,0),X.halfHeight.set(0,C.height*.5,0),n.rectArea[g]=X,g++}else if(C.isPointLight){const X=e.get(C);if(X.color.copy(C.color).multiplyScalar(C.intensity),X.distance=C.distance,X.decay=C.decay,C.castShadow){const ce=C.shadow,Z=t.get(C);Z.shadowIntensity=ce.intensity,Z.shadowBias=ce.bias,Z.shadowNormalBias=ce.normalBias,Z.shadowRadius=ce.radius,Z.shadowMapSize=ce.mapSize,Z.shadowCameraNear=ce.camera.near,Z.shadowCameraFar=ce.camera.far,n.pointShadow[b]=Z,n.pointShadowMap[b]=se,n.pointShadowMatrix[b]=C.shadow.matrix,x++}n.point[b]=X,b++}else if(C.isHemisphereLight){const X=e.get(C);X.skyColor.copy(C.color).multiplyScalar(q),X.groundColor.copy(C.groundColor).multiplyScalar(q),n.hemi[p]=X,p++}}g>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pe.LTC_FLOAT_1,n.rectAreaLTC2=pe.LTC_FLOAT_2):(n.rectAreaLTC1=pe.LTC_HALF_1,n.rectAreaLTC2=pe.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const B=n.hash;(B.directionalLength!==m||B.pointLength!==b||B.spotLength!==_||B.rectAreaLength!==g||B.hemiLength!==p||B.numDirectionalShadows!==w||B.numPointShadows!==x||B.numSpotShadows!==y||B.numSpotMaps!==I||B.numLightProbes!==P)&&(n.directional.length=m,n.spot.length=_,n.rectArea.length=g,n.point.length=b,n.hemi.length=p,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=y+I-D,n.spotLightMap.length=I,n.numSpotLightShadowsWithMaps=D,n.numLightProbes=P,B.directionalLength=m,B.pointLength=b,B.spotLength=_,B.rectAreaLength=g,B.hemiLength=p,B.numDirectionalShadows=w,B.numPointShadows=x,B.numSpotShadows=y,B.numSpotMaps=I,B.numLightProbes=P,n.version=Y_++)}function l(c,h){let u=0,d=0,m=0,b=0,_=0;const g=h.matrixWorldInverse;for(let p=0,w=c.length;p<w;p++){const x=c[p];if(x.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),u++}else if(x.isSpotLight){const y=n.spot[m];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),m++}else if(x.isRectAreaLight){const y=n.rectArea[b];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),o.identity(),r.copy(x.matrixWorld),r.premultiply(g),o.extractRotation(r),y.halfWidth.set(x.width*.5,0,0),y.halfHeight.set(0,x.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),b++}else if(x.isPointLight){const y=n.point[d];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),d++}else if(x.isHemisphereLight){const y=n.hemi[_];y.direction.setFromMatrixPosition(x.matrixWorld),y.direction.transformDirection(g),_++}}}return{setup:a,setupView:l,state:n}}function Eh(s){const e=new $_(s),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Z_(s){let e=new WeakMap;function t(i,r=0){const o=e.get(i);let a;return o===void 0?(a=new Eh(s),e.set(i,[a])):r>=o.length?(a=new Eh(s),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class J_ extends An{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Pf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Q_ extends An{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const ev=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,tv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function nv(s,e,t){let n=new oc;const i=new le,r=new le,o=new tt,a=new J_({depthPacking:Lf}),l=new Q_,c={},h=t.maxTextureSize,u={[Qn]:tn,[tn]:Qn,[en]:en},d=new cn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new le},radius:{value:4}},vertexShader:ev,fragmentShader:tv}),m=d.clone();m.defines.HORIZONTAL_PASS=1;const b=new St;b.setAttribute("position",new Bt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ye(b,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Uu;let p=this.type;this.render=function(D,P,B){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||D.length===0)return;const $=s.getRenderTarget(),S=s.getActiveCubeFace(),C=s.getActiveMipmapLevel(),G=s.state;G.setBlending(fi),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const q=p!==qn&&this.type===qn,K=p===qn&&this.type!==qn;for(let se=0,X=D.length;se<X;se++){const ce=D[se],Z=ce.shadow;if(Z===void 0){console.warn("THREE.WebGLShadowMap:",ce,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;i.copy(Z.mapSize);const ge=Z.getFrameExtents();if(i.multiply(ge),r.copy(Z.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/ge.x),i.x=r.x*ge.x,Z.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/ge.y),i.y=r.y*ge.y,Z.mapSize.y=r.y)),Z.map===null||q===!0||K===!0){const Ae=this.type!==qn?{minFilter:Kt,magFilter:Kt}:{};Z.map!==null&&Z.map.dispose(),Z.map=new mi(i.x,i.y,Ae),Z.map.texture.name=ce.name+".shadowMap",Z.camera.updateProjectionMatrix()}s.setRenderTarget(Z.map),s.clear();const be=Z.getViewportCount();for(let Ae=0;Ae<be;Ae++){const Be=Z.getViewport(Ae);o.set(r.x*Be.x,r.y*Be.y,r.x*Be.z,r.y*Be.w),G.viewport(o),Z.updateMatrices(ce,Ae),n=Z.getFrustum(),y(P,B,Z.camera,ce,this.type)}Z.isPointLightShadow!==!0&&this.type===qn&&w(Z,B),Z.needsUpdate=!1}p=this.type,g.needsUpdate=!1,s.setRenderTarget($,S,C)};function w(D,P){const B=e.update(_);d.defines.VSM_SAMPLES!==D.blurSamples&&(d.defines.VSM_SAMPLES=D.blurSamples,m.defines.VSM_SAMPLES=D.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),D.mapPass===null&&(D.mapPass=new mi(i.x,i.y)),d.uniforms.shadow_pass.value=D.map.texture,d.uniforms.resolution.value=D.mapSize,d.uniforms.radius.value=D.radius,s.setRenderTarget(D.mapPass),s.clear(),s.renderBufferDirect(P,null,B,d,_,null),m.uniforms.shadow_pass.value=D.mapPass.texture,m.uniforms.resolution.value=D.mapSize,m.uniforms.radius.value=D.radius,s.setRenderTarget(D.map),s.clear(),s.renderBufferDirect(P,null,B,m,_,null)}function x(D,P,B,$){let S=null;const C=B.isPointLight===!0?D.customDistanceMaterial:D.customDepthMaterial;if(C!==void 0)S=C;else if(S=B.isPointLight===!0?l:a,s.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){const G=S.uuid,q=P.uuid;let K=c[G];K===void 0&&(K={},c[G]=K);let se=K[q];se===void 0&&(se=S.clone(),K[q]=se,P.addEventListener("dispose",I)),S=se}if(S.visible=P.visible,S.wireframe=P.wireframe,$===qn?S.side=P.shadowSide!==null?P.shadowSide:P.side:S.side=P.shadowSide!==null?P.shadowSide:u[P.side],S.alphaMap=P.alphaMap,S.alphaTest=P.alphaTest,S.map=P.map,S.clipShadows=P.clipShadows,S.clippingPlanes=P.clippingPlanes,S.clipIntersection=P.clipIntersection,S.displacementMap=P.displacementMap,S.displacementScale=P.displacementScale,S.displacementBias=P.displacementBias,S.wireframeLinewidth=P.wireframeLinewidth,S.linewidth=P.linewidth,B.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const G=s.properties.get(S);G.light=B}return S}function y(D,P,B,$,S){if(D.visible===!1)return;if(D.layers.test(P.layers)&&(D.isMesh||D.isLine||D.isPoints)&&(D.castShadow||D.receiveShadow&&S===qn)&&(!D.frustumCulled||n.intersectsObject(D))){D.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,D.matrixWorld);const q=e.update(D),K=D.material;if(Array.isArray(K)){const se=q.groups;for(let X=0,ce=se.length;X<ce;X++){const Z=se[X],ge=K[Z.materialIndex];if(ge&&ge.visible){const be=x(D,ge,$,S);D.onBeforeShadow(s,D,P,B,q,be,Z),s.renderBufferDirect(B,null,q,be,D,Z),D.onAfterShadow(s,D,P,B,q,be,Z)}}}else if(K.visible){const se=x(D,K,$,S);D.onBeforeShadow(s,D,P,B,q,se,null),s.renderBufferDirect(B,null,q,se,D,null),D.onAfterShadow(s,D,P,B,q,se,null)}}const G=D.children;for(let q=0,K=G.length;q<K;q++)y(G[q],P,B,$,S)}function I(D){D.target.removeEventListener("dispose",I);for(const B in c){const $=c[B],S=D.target.uuid;S in $&&($[S].dispose(),delete $[S])}}}const iv={[Za]:Ja,[Qa]:nl,[el]:il,[ms]:tl,[Ja]:Za,[nl]:Qa,[il]:el,[tl]:ms};function sv(s){function e(){let F=!1;const ye=new tt;let k=null;const ne=new tt(0,0,0,0);return{setMask:function(xe){k!==xe&&!F&&(s.colorMask(xe,xe,xe,xe),k=xe)},setLocked:function(xe){F=xe},setClear:function(xe,Se,nt,wt,jt){jt===!0&&(xe*=wt,Se*=wt,nt*=wt),ye.set(xe,Se,nt,wt),ne.equals(ye)===!1&&(s.clearColor(xe,Se,nt,wt),ne.copy(ye))},reset:function(){F=!1,k=null,ne.set(-1,0,0,0)}}}function t(){let F=!1,ye=!1,k=null,ne=null,xe=null;return{setReversed:function(Se){ye=Se},setTest:function(Se){Se?de(s.DEPTH_TEST):_e(s.DEPTH_TEST)},setMask:function(Se){k!==Se&&!F&&(s.depthMask(Se),k=Se)},setFunc:function(Se){if(ye&&(Se=iv[Se]),ne!==Se){switch(Se){case Za:s.depthFunc(s.NEVER);break;case Ja:s.depthFunc(s.ALWAYS);break;case Qa:s.depthFunc(s.LESS);break;case ms:s.depthFunc(s.LEQUAL);break;case el:s.depthFunc(s.EQUAL);break;case tl:s.depthFunc(s.GEQUAL);break;case nl:s.depthFunc(s.GREATER);break;case il:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ne=Se}},setLocked:function(Se){F=Se},setClear:function(Se){xe!==Se&&(s.clearDepth(Se),xe=Se)},reset:function(){F=!1,k=null,ne=null,xe=null}}}function n(){let F=!1,ye=null,k=null,ne=null,xe=null,Se=null,nt=null,wt=null,jt=null;return{setTest:function(ot){F||(ot?de(s.STENCIL_TEST):_e(s.STENCIL_TEST))},setMask:function(ot){ye!==ot&&!F&&(s.stencilMask(ot),ye=ot)},setFunc:function(ot,Xt,bn){(k!==ot||ne!==Xt||xe!==bn)&&(s.stencilFunc(ot,Xt,bn),k=ot,ne=Xt,xe=bn)},setOp:function(ot,Xt,bn){(Se!==ot||nt!==Xt||wt!==bn)&&(s.stencilOp(ot,Xt,bn),Se=ot,nt=Xt,wt=bn)},setLocked:function(ot){F=ot},setClear:function(ot){jt!==ot&&(s.clearStencil(ot),jt=ot)},reset:function(){F=!1,ye=null,k=null,ne=null,xe=null,Se=null,nt=null,wt=null,jt=null}}}const i=new e,r=new t,o=new n,a=new WeakMap,l=new WeakMap;let c={},h={},u=new WeakMap,d=[],m=null,b=!1,_=null,g=null,p=null,w=null,x=null,y=null,I=null,D=new De(0,0,0),P=0,B=!1,$=null,S=null,C=null,G=null,q=null;const K=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let se=!1,X=0;const ce=s.getParameter(s.VERSION);ce.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(ce)[1]),se=X>=1):ce.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(ce)[1]),se=X>=2);let Z=null,ge={};const be=s.getParameter(s.SCISSOR_BOX),Ae=s.getParameter(s.VIEWPORT),Be=new tt().fromArray(be),Ge=new tt().fromArray(Ae);function J(F,ye,k,ne){const xe=new Uint8Array(4),Se=s.createTexture();s.bindTexture(F,Se),s.texParameteri(F,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(F,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let nt=0;nt<k;nt++)F===s.TEXTURE_3D||F===s.TEXTURE_2D_ARRAY?s.texImage3D(ye,0,s.RGBA,1,1,ne,0,s.RGBA,s.UNSIGNED_BYTE,xe):s.texImage2D(ye+nt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,xe);return Se}const oe={};oe[s.TEXTURE_2D]=J(s.TEXTURE_2D,s.TEXTURE_2D,1),oe[s.TEXTURE_CUBE_MAP]=J(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),oe[s.TEXTURE_2D_ARRAY]=J(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),oe[s.TEXTURE_3D]=J(s.TEXTURE_3D,s.TEXTURE_3D,1,1),i.setClear(0,0,0,1),r.setClear(1),o.setClear(0),de(s.DEPTH_TEST),r.setFunc(ms),$e(!1),rt(Rc),de(s.CULL_FACE),O(fi);function de(F){c[F]!==!0&&(s.enable(F),c[F]=!0)}function _e(F){c[F]!==!1&&(s.disable(F),c[F]=!1)}function Ie(F,ye){return h[F]!==ye?(s.bindFramebuffer(F,ye),h[F]=ye,F===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=ye),F===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=ye),!0):!1}function Ne(F,ye){let k=d,ne=!1;if(F){k=u.get(ye),k===void 0&&(k=[],u.set(ye,k));const xe=F.textures;if(k.length!==xe.length||k[0]!==s.COLOR_ATTACHMENT0){for(let Se=0,nt=xe.length;Se<nt;Se++)k[Se]=s.COLOR_ATTACHMENT0+Se;k.length=xe.length,ne=!0}}else k[0]!==s.BACK&&(k[0]=s.BACK,ne=!0);ne&&s.drawBuffers(k)}function Ke(F){return m!==F?(s.useProgram(F),m=F,!0):!1}const st={[Ri]:s.FUNC_ADD,[ef]:s.FUNC_SUBTRACT,[tf]:s.FUNC_REVERSE_SUBTRACT};st[nf]=s.MIN,st[sf]=s.MAX;const qe={[rf]:s.ZERO,[of]:s.ONE,[af]:s.SRC_COLOR,[Ka]:s.SRC_ALPHA,[ff]:s.SRC_ALPHA_SATURATE,[uf]:s.DST_COLOR,[cf]:s.DST_ALPHA,[lf]:s.ONE_MINUS_SRC_COLOR,[$a]:s.ONE_MINUS_SRC_ALPHA,[df]:s.ONE_MINUS_DST_COLOR,[hf]:s.ONE_MINUS_DST_ALPHA,[pf]:s.CONSTANT_COLOR,[mf]:s.ONE_MINUS_CONSTANT_COLOR,[gf]:s.CONSTANT_ALPHA,[bf]:s.ONE_MINUS_CONSTANT_ALPHA};function O(F,ye,k,ne,xe,Se,nt,wt,jt,ot){if(F===fi){b===!0&&(_e(s.BLEND),b=!1);return}if(b===!1&&(de(s.BLEND),b=!0),F!==Qd){if(F!==_||ot!==B){if((g!==Ri||x!==Ri)&&(s.blendEquation(s.FUNC_ADD),g=Ri,x=Ri),ot)switch(F){case hs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case lr:s.blendFunc(s.ONE,s.ONE);break;case Pc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Lc:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case hs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case lr:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Pc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Lc:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}p=null,w=null,y=null,I=null,D.set(0,0,0),P=0,_=F,B=ot}return}xe=xe||ye,Se=Se||k,nt=nt||ne,(ye!==g||xe!==x)&&(s.blendEquationSeparate(st[ye],st[xe]),g=ye,x=xe),(k!==p||ne!==w||Se!==y||nt!==I)&&(s.blendFuncSeparate(qe[k],qe[ne],qe[Se],qe[nt]),p=k,w=ne,y=Se,I=nt),(wt.equals(D)===!1||jt!==P)&&(s.blendColor(wt.r,wt.g,wt.b,jt),D.copy(wt),P=jt),_=F,B=!1}function Wt(F,ye){F.side===en?_e(s.CULL_FACE):de(s.CULL_FACE);let k=F.side===tn;ye&&(k=!k),$e(k),F.blending===hs&&F.transparent===!1?O(fi):O(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),r.setFunc(F.depthFunc),r.setTest(F.depthTest),r.setMask(F.depthWrite),i.setMask(F.colorWrite);const ne=F.stencilWrite;o.setTest(ne),ne&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),ft(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?de(s.SAMPLE_ALPHA_TO_COVERAGE):_e(s.SAMPLE_ALPHA_TO_COVERAGE)}function $e(F){$!==F&&(F?s.frontFace(s.CW):s.frontFace(s.CCW),$=F)}function rt(F){F!==$d?(de(s.CULL_FACE),F!==S&&(F===Rc?s.cullFace(s.BACK):F===Zd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):_e(s.CULL_FACE),S=F}function Oe(F){F!==C&&(se&&s.lineWidth(F),C=F)}function ft(F,ye,k){F?(de(s.POLYGON_OFFSET_FILL),(G!==ye||q!==k)&&(s.polygonOffset(ye,k),G=ye,q=k)):_e(s.POLYGON_OFFSET_FILL)}function ke(F){F?de(s.SCISSOR_TEST):_e(s.SCISSOR_TEST)}function L(F){F===void 0&&(F=s.TEXTURE0+K-1),Z!==F&&(s.activeTexture(F),Z=F)}function A(F,ye,k){k===void 0&&(Z===null?k=s.TEXTURE0+K-1:k=Z);let ne=ge[k];ne===void 0&&(ne={type:void 0,texture:void 0},ge[k]=ne),(ne.type!==F||ne.texture!==ye)&&(Z!==k&&(s.activeTexture(k),Z=k),s.bindTexture(F,ye||oe[F]),ne.type=F,ne.texture=ye)}function V(){const F=ge[Z];F!==void 0&&F.type!==void 0&&(s.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function te(){try{s.compressedTexImage2D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ae(){try{s.compressedTexImage3D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ee(){try{s.texSubImage2D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Re(){try{s.texSubImage3D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ve(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Me(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ze(){try{s.texStorage2D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function fe(){try{s.texStorage3D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ee(){try{s.texImage2D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Fe(){try{s.texImage3D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Pe(F){Be.equals(F)===!1&&(s.scissor(F.x,F.y,F.z,F.w),Be.copy(F))}function me(F){Ge.equals(F)===!1&&(s.viewport(F.x,F.y,F.z,F.w),Ge.copy(F))}function Je(F,ye){let k=l.get(ye);k===void 0&&(k=new WeakMap,l.set(ye,k));let ne=k.get(F);ne===void 0&&(ne=s.getUniformBlockIndex(ye,F.name),k.set(F,ne))}function Ue(F,ye){const ne=l.get(ye).get(F);a.get(ye)!==ne&&(s.uniformBlockBinding(ye,ne,F.__bindingPointIndex),a.set(ye,ne))}function Ve(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),c={},Z=null,ge={},h={},u=new WeakMap,d=[],m=null,b=!1,_=null,g=null,p=null,w=null,x=null,y=null,I=null,D=new De(0,0,0),P=0,B=!1,$=null,S=null,C=null,G=null,q=null,Be.set(0,0,s.canvas.width,s.canvas.height),Ge.set(0,0,s.canvas.width,s.canvas.height),i.reset(),r.reset(),o.reset()}return{buffers:{color:i,depth:r,stencil:o},enable:de,disable:_e,bindFramebuffer:Ie,drawBuffers:Ne,useProgram:Ke,setBlending:O,setMaterial:Wt,setFlipSided:$e,setCullFace:rt,setLineWidth:Oe,setPolygonOffset:ft,setScissorTest:ke,activeTexture:L,bindTexture:A,unbindTexture:V,compressedTexImage2D:te,compressedTexImage3D:ae,texImage2D:Ee,texImage3D:Fe,updateUBOMapping:Je,uniformBlockBinding:Ue,texStorage2D:Ze,texStorage3D:fe,texSubImage2D:ee,texSubImage3D:Re,compressedTexSubImage2D:ve,compressedTexSubImage3D:Me,scissor:Pe,viewport:me,reset:Ve}}function Ah(s,e,t,n){const i=rv(n);switch(t){case Gu:return s*e;case Wu:return s*e;case ju:return s*e*2;case Go:return s*e/i.components*i.byteLength;case Zl:return s*e/i.components*i.byteLength;case Xu:return s*e*2/i.components*i.byteLength;case Jl:return s*e*2/i.components*i.byteLength;case Vu:return s*e*3/i.components*i.byteLength;case ln:return s*e*4/i.components*i.byteLength;case Ql:return s*e*4/i.components*i.byteLength;case So:case Mo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case wo:case Eo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case ol:case ll:return Math.max(s,16)*Math.max(e,8)/4;case rl:case al:return Math.max(s,8)*Math.max(e,8)/2;case cl:case hl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case ul:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case dl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case fl:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case pl:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case ml:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case gl:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case bl:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case _l:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case vl:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case xl:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case yl:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Sl:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Ml:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case wl:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case El:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Ao:case Al:case Tl:return Math.ceil(s/4)*Math.ceil(e/4)*16;case qu:case Cl:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Rl:case Pl:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function rv(s){switch(s){case ei:case Bu:return{byteLength:1,components:1};case cr:case zu:case $n:return{byteLength:2,components:1};case Kl:case $l:return{byteLength:2,components:4};case Ii:case Yl:case rn:return{byteLength:4,components:1};case Hu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function ov(s,e,t,n,i,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new le,h=new WeakMap;let u;const d=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(L,A){return m?new OffscreenCanvas(L,A):dr("canvas")}function _(L,A,V){let te=1;const ae=ke(L);if((ae.width>V||ae.height>V)&&(te=V/Math.max(ae.width,ae.height)),te<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const ee=Math.floor(te*ae.width),Re=Math.floor(te*ae.height);u===void 0&&(u=b(ee,Re));const ve=A?b(ee,Re):u;return ve.width=ee,ve.height=Re,ve.getContext("2d").drawImage(L,0,0,ee,Re),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ae.width+"x"+ae.height+") to ("+ee+"x"+Re+")."),ve}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ae.width+"x"+ae.height+")."),L;return L}function g(L){return L.generateMipmaps&&L.minFilter!==Kt&&L.minFilter!==Pt}function p(L){s.generateMipmap(L)}function w(L,A,V,te,ae=!1){if(L!==null){if(s[L]!==void 0)return s[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let ee=A;if(A===s.RED&&(V===s.FLOAT&&(ee=s.R32F),V===s.HALF_FLOAT&&(ee=s.R16F),V===s.UNSIGNED_BYTE&&(ee=s.R8)),A===s.RED_INTEGER&&(V===s.UNSIGNED_BYTE&&(ee=s.R8UI),V===s.UNSIGNED_SHORT&&(ee=s.R16UI),V===s.UNSIGNED_INT&&(ee=s.R32UI),V===s.BYTE&&(ee=s.R8I),V===s.SHORT&&(ee=s.R16I),V===s.INT&&(ee=s.R32I)),A===s.RG&&(V===s.FLOAT&&(ee=s.RG32F),V===s.HALF_FLOAT&&(ee=s.RG16F),V===s.UNSIGNED_BYTE&&(ee=s.RG8)),A===s.RG_INTEGER&&(V===s.UNSIGNED_BYTE&&(ee=s.RG8UI),V===s.UNSIGNED_SHORT&&(ee=s.RG16UI),V===s.UNSIGNED_INT&&(ee=s.RG32UI),V===s.BYTE&&(ee=s.RG8I),V===s.SHORT&&(ee=s.RG16I),V===s.INT&&(ee=s.RG32I)),A===s.RGB_INTEGER&&(V===s.UNSIGNED_BYTE&&(ee=s.RGB8UI),V===s.UNSIGNED_SHORT&&(ee=s.RGB16UI),V===s.UNSIGNED_INT&&(ee=s.RGB32UI),V===s.BYTE&&(ee=s.RGB8I),V===s.SHORT&&(ee=s.RGB16I),V===s.INT&&(ee=s.RGB32I)),A===s.RGBA_INTEGER&&(V===s.UNSIGNED_BYTE&&(ee=s.RGBA8UI),V===s.UNSIGNED_SHORT&&(ee=s.RGBA16UI),V===s.UNSIGNED_INT&&(ee=s.RGBA32UI),V===s.BYTE&&(ee=s.RGBA8I),V===s.SHORT&&(ee=s.RGBA16I),V===s.INT&&(ee=s.RGBA32I)),A===s.RGB&&V===s.UNSIGNED_INT_5_9_9_9_REV&&(ee=s.RGB9_E5),A===s.RGBA){const Re=ae?Do:at.getTransfer(te);V===s.FLOAT&&(ee=s.RGBA32F),V===s.HALF_FLOAT&&(ee=s.RGBA16F),V===s.UNSIGNED_BYTE&&(ee=Re===mt?s.SRGB8_ALPHA8:s.RGBA8),V===s.UNSIGNED_SHORT_4_4_4_4&&(ee=s.RGBA4),V===s.UNSIGNED_SHORT_5_5_5_1&&(ee=s.RGB5_A1)}return(ee===s.R16F||ee===s.R32F||ee===s.RG16F||ee===s.RG32F||ee===s.RGBA16F||ee===s.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function x(L,A){let V;return L?A===null||A===Ii||A===vs?V=s.DEPTH24_STENCIL8:A===rn?V=s.DEPTH32F_STENCIL8:A===cr&&(V=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===Ii||A===vs?V=s.DEPTH_COMPONENT24:A===rn?V=s.DEPTH_COMPONENT32F:A===cr&&(V=s.DEPTH_COMPONENT16),V}function y(L,A){return g(L)===!0||L.isFramebufferTexture&&L.minFilter!==Kt&&L.minFilter!==Pt?Math.log2(Math.max(A.width,A.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?A.mipmaps.length:1}function I(L){const A=L.target;A.removeEventListener("dispose",I),P(A),A.isVideoTexture&&h.delete(A)}function D(L){const A=L.target;A.removeEventListener("dispose",D),$(A)}function P(L){const A=n.get(L);if(A.__webglInit===void 0)return;const V=L.source,te=d.get(V);if(te){const ae=te[A.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&B(L),Object.keys(te).length===0&&d.delete(V)}n.remove(L)}function B(L){const A=n.get(L);s.deleteTexture(A.__webglTexture);const V=L.source,te=d.get(V);delete te[A.__cacheKey],o.memory.textures--}function $(L){const A=n.get(L);if(L.depthTexture&&L.depthTexture.dispose(),L.isWebGLCubeRenderTarget)for(let te=0;te<6;te++){if(Array.isArray(A.__webglFramebuffer[te]))for(let ae=0;ae<A.__webglFramebuffer[te].length;ae++)s.deleteFramebuffer(A.__webglFramebuffer[te][ae]);else s.deleteFramebuffer(A.__webglFramebuffer[te]);A.__webglDepthbuffer&&s.deleteRenderbuffer(A.__webglDepthbuffer[te])}else{if(Array.isArray(A.__webglFramebuffer))for(let te=0;te<A.__webglFramebuffer.length;te++)s.deleteFramebuffer(A.__webglFramebuffer[te]);else s.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&s.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&s.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let te=0;te<A.__webglColorRenderbuffer.length;te++)A.__webglColorRenderbuffer[te]&&s.deleteRenderbuffer(A.__webglColorRenderbuffer[te]);A.__webglDepthRenderbuffer&&s.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const V=L.textures;for(let te=0,ae=V.length;te<ae;te++){const ee=n.get(V[te]);ee.__webglTexture&&(s.deleteTexture(ee.__webglTexture),o.memory.textures--),n.remove(V[te])}n.remove(L)}let S=0;function C(){S=0}function G(){const L=S;return L>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+i.maxTextures),S+=1,L}function q(L){const A=[];return A.push(L.wrapS),A.push(L.wrapT),A.push(L.wrapR||0),A.push(L.magFilter),A.push(L.minFilter),A.push(L.anisotropy),A.push(L.internalFormat),A.push(L.format),A.push(L.type),A.push(L.generateMipmaps),A.push(L.premultiplyAlpha),A.push(L.flipY),A.push(L.unpackAlignment),A.push(L.colorSpace),A.join()}function K(L,A){const V=n.get(L);if(L.isVideoTexture&&Oe(L),L.isRenderTargetTexture===!1&&L.version>0&&V.__version!==L.version){const te=L.image;if(te===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(te.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ge(V,L,A);return}}t.bindTexture(s.TEXTURE_2D,V.__webglTexture,s.TEXTURE0+A)}function se(L,A){const V=n.get(L);if(L.version>0&&V.__version!==L.version){Ge(V,L,A);return}t.bindTexture(s.TEXTURE_2D_ARRAY,V.__webglTexture,s.TEXTURE0+A)}function X(L,A){const V=n.get(L);if(L.version>0&&V.__version!==L.version){Ge(V,L,A);return}t.bindTexture(s.TEXTURE_3D,V.__webglTexture,s.TEXTURE0+A)}function ce(L,A){const V=n.get(L);if(L.version>0&&V.__version!==L.version){J(V,L,A);return}t.bindTexture(s.TEXTURE_CUBE_MAP,V.__webglTexture,s.TEXTURE0+A)}const Z={[_s]:s.REPEAT,[Nn]:s.CLAMP_TO_EDGE,[Lo]:s.MIRRORED_REPEAT},ge={[Kt]:s.NEAREST,[ku]:s.NEAREST_MIPMAP_NEAREST,[Qs]:s.NEAREST_MIPMAP_LINEAR,[Pt]:s.LINEAR,[yo]:s.LINEAR_MIPMAP_NEAREST,[Un]:s.LINEAR_MIPMAP_LINEAR},be={[If]:s.NEVER,[Bf]:s.ALWAYS,[Nf]:s.LESS,[$u]:s.LEQUAL,[Uf]:s.EQUAL,[kf]:s.GEQUAL,[Of]:s.GREATER,[Ff]:s.NOTEQUAL};function Ae(L,A){if(A.type===rn&&e.has("OES_texture_float_linear")===!1&&(A.magFilter===Pt||A.magFilter===yo||A.magFilter===Qs||A.magFilter===Un||A.minFilter===Pt||A.minFilter===yo||A.minFilter===Qs||A.minFilter===Un)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(L,s.TEXTURE_WRAP_S,Z[A.wrapS]),s.texParameteri(L,s.TEXTURE_WRAP_T,Z[A.wrapT]),(L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY)&&s.texParameteri(L,s.TEXTURE_WRAP_R,Z[A.wrapR]),s.texParameteri(L,s.TEXTURE_MAG_FILTER,ge[A.magFilter]),s.texParameteri(L,s.TEXTURE_MIN_FILTER,ge[A.minFilter]),A.compareFunction&&(s.texParameteri(L,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(L,s.TEXTURE_COMPARE_FUNC,be[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===Kt||A.minFilter!==Qs&&A.minFilter!==Un||A.type===rn&&e.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||n.get(A).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");s.texParameterf(L,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,i.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy}}}function Be(L,A){let V=!1;L.__webglInit===void 0&&(L.__webglInit=!0,A.addEventListener("dispose",I));const te=A.source;let ae=d.get(te);ae===void 0&&(ae={},d.set(te,ae));const ee=q(A);if(ee!==L.__cacheKey){ae[ee]===void 0&&(ae[ee]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,V=!0),ae[ee].usedTimes++;const Re=ae[L.__cacheKey];Re!==void 0&&(ae[L.__cacheKey].usedTimes--,Re.usedTimes===0&&B(A)),L.__cacheKey=ee,L.__webglTexture=ae[ee].texture}return V}function Ge(L,A,V){let te=s.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(te=s.TEXTURE_2D_ARRAY),A.isData3DTexture&&(te=s.TEXTURE_3D);const ae=Be(L,A),ee=A.source;t.bindTexture(te,L.__webglTexture,s.TEXTURE0+V);const Re=n.get(ee);if(ee.version!==Re.__version||ae===!0){t.activeTexture(s.TEXTURE0+V);const ve=at.getPrimaries(at.workingColorSpace),Me=A.colorSpace===dn?null:at.getPrimaries(A.colorSpace),Ze=A.colorSpace===dn||ve===Me?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,A.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,A.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ze);let fe=_(A.image,!1,i.maxTextureSize);fe=ft(A,fe);const Ee=r.convert(A.format,A.colorSpace),Fe=r.convert(A.type);let Pe=w(A.internalFormat,Ee,Fe,A.colorSpace,A.isVideoTexture);Ae(te,A);let me;const Je=A.mipmaps,Ue=A.isVideoTexture!==!0,Ve=Re.__version===void 0||ae===!0,F=ee.dataReady,ye=y(A,fe);if(A.isDepthTexture)Pe=x(A.format===xs,A.type),Ve&&(Ue?t.texStorage2D(s.TEXTURE_2D,1,Pe,fe.width,fe.height):t.texImage2D(s.TEXTURE_2D,0,Pe,fe.width,fe.height,0,Ee,Fe,null));else if(A.isDataTexture)if(Je.length>0){Ue&&Ve&&t.texStorage2D(s.TEXTURE_2D,ye,Pe,Je[0].width,Je[0].height);for(let k=0,ne=Je.length;k<ne;k++)me=Je[k],Ue?F&&t.texSubImage2D(s.TEXTURE_2D,k,0,0,me.width,me.height,Ee,Fe,me.data):t.texImage2D(s.TEXTURE_2D,k,Pe,me.width,me.height,0,Ee,Fe,me.data);A.generateMipmaps=!1}else Ue?(Ve&&t.texStorage2D(s.TEXTURE_2D,ye,Pe,fe.width,fe.height),F&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,fe.width,fe.height,Ee,Fe,fe.data)):t.texImage2D(s.TEXTURE_2D,0,Pe,fe.width,fe.height,0,Ee,Fe,fe.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){Ue&&Ve&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ye,Pe,Je[0].width,Je[0].height,fe.depth);for(let k=0,ne=Je.length;k<ne;k++)if(me=Je[k],A.format!==ln)if(Ee!==null)if(Ue){if(F)if(A.layerUpdates.size>0){const xe=Ah(me.width,me.height,A.format,A.type);for(const Se of A.layerUpdates){const nt=me.data.subarray(Se*xe/me.data.BYTES_PER_ELEMENT,(Se+1)*xe/me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,k,0,0,Se,me.width,me.height,1,Ee,nt,0,0)}A.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,k,0,0,0,me.width,me.height,fe.depth,Ee,me.data,0,0)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,k,Pe,me.width,me.height,fe.depth,0,me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ue?F&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,k,0,0,0,me.width,me.height,fe.depth,Ee,Fe,me.data):t.texImage3D(s.TEXTURE_2D_ARRAY,k,Pe,me.width,me.height,fe.depth,0,Ee,Fe,me.data)}else{Ue&&Ve&&t.texStorage2D(s.TEXTURE_2D,ye,Pe,Je[0].width,Je[0].height);for(let k=0,ne=Je.length;k<ne;k++)me=Je[k],A.format!==ln?Ee!==null?Ue?F&&t.compressedTexSubImage2D(s.TEXTURE_2D,k,0,0,me.width,me.height,Ee,me.data):t.compressedTexImage2D(s.TEXTURE_2D,k,Pe,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ue?F&&t.texSubImage2D(s.TEXTURE_2D,k,0,0,me.width,me.height,Ee,Fe,me.data):t.texImage2D(s.TEXTURE_2D,k,Pe,me.width,me.height,0,Ee,Fe,me.data)}else if(A.isDataArrayTexture)if(Ue){if(Ve&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ye,Pe,fe.width,fe.height,fe.depth),F)if(A.layerUpdates.size>0){const k=Ah(fe.width,fe.height,A.format,A.type);for(const ne of A.layerUpdates){const xe=fe.data.subarray(ne*k/fe.data.BYTES_PER_ELEMENT,(ne+1)*k/fe.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ne,fe.width,fe.height,1,Ee,Fe,xe)}A.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,fe.width,fe.height,fe.depth,Ee,Fe,fe.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Pe,fe.width,fe.height,fe.depth,0,Ee,Fe,fe.data);else if(A.isData3DTexture)Ue?(Ve&&t.texStorage3D(s.TEXTURE_3D,ye,Pe,fe.width,fe.height,fe.depth),F&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,fe.width,fe.height,fe.depth,Ee,Fe,fe.data)):t.texImage3D(s.TEXTURE_3D,0,Pe,fe.width,fe.height,fe.depth,0,Ee,Fe,fe.data);else if(A.isFramebufferTexture){if(Ve)if(Ue)t.texStorage2D(s.TEXTURE_2D,ye,Pe,fe.width,fe.height);else{let k=fe.width,ne=fe.height;for(let xe=0;xe<ye;xe++)t.texImage2D(s.TEXTURE_2D,xe,Pe,k,ne,0,Ee,Fe,null),k>>=1,ne>>=1}}else if(Je.length>0){if(Ue&&Ve){const k=ke(Je[0]);t.texStorage2D(s.TEXTURE_2D,ye,Pe,k.width,k.height)}for(let k=0,ne=Je.length;k<ne;k++)me=Je[k],Ue?F&&t.texSubImage2D(s.TEXTURE_2D,k,0,0,Ee,Fe,me):t.texImage2D(s.TEXTURE_2D,k,Pe,Ee,Fe,me);A.generateMipmaps=!1}else if(Ue){if(Ve){const k=ke(fe);t.texStorage2D(s.TEXTURE_2D,ye,Pe,k.width,k.height)}F&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Ee,Fe,fe)}else t.texImage2D(s.TEXTURE_2D,0,Pe,Ee,Fe,fe);g(A)&&p(te),Re.__version=ee.version,A.onUpdate&&A.onUpdate(A)}L.__version=A.version}function J(L,A,V){if(A.image.length!==6)return;const te=Be(L,A),ae=A.source;t.bindTexture(s.TEXTURE_CUBE_MAP,L.__webglTexture,s.TEXTURE0+V);const ee=n.get(ae);if(ae.version!==ee.__version||te===!0){t.activeTexture(s.TEXTURE0+V);const Re=at.getPrimaries(at.workingColorSpace),ve=A.colorSpace===dn?null:at.getPrimaries(A.colorSpace),Me=A.colorSpace===dn||Re===ve?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,A.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,A.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);const Ze=A.isCompressedTexture||A.image[0].isCompressedTexture,fe=A.image[0]&&A.image[0].isDataTexture,Ee=[];for(let ne=0;ne<6;ne++)!Ze&&!fe?Ee[ne]=_(A.image[ne],!0,i.maxCubemapSize):Ee[ne]=fe?A.image[ne].image:A.image[ne],Ee[ne]=ft(A,Ee[ne]);const Fe=Ee[0],Pe=r.convert(A.format,A.colorSpace),me=r.convert(A.type),Je=w(A.internalFormat,Pe,me,A.colorSpace),Ue=A.isVideoTexture!==!0,Ve=ee.__version===void 0||te===!0,F=ae.dataReady;let ye=y(A,Fe);Ae(s.TEXTURE_CUBE_MAP,A);let k;if(Ze){Ue&&Ve&&t.texStorage2D(s.TEXTURE_CUBE_MAP,ye,Je,Fe.width,Fe.height);for(let ne=0;ne<6;ne++){k=Ee[ne].mipmaps;for(let xe=0;xe<k.length;xe++){const Se=k[xe];A.format!==ln?Pe!==null?Ue?F&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,xe,0,0,Se.width,Se.height,Pe,Se.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,xe,Je,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ue?F&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,xe,0,0,Se.width,Se.height,Pe,me,Se.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,xe,Je,Se.width,Se.height,0,Pe,me,Se.data)}}}else{if(k=A.mipmaps,Ue&&Ve){k.length>0&&ye++;const ne=ke(Ee[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,ye,Je,ne.width,ne.height)}for(let ne=0;ne<6;ne++)if(fe){Ue?F&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Ee[ne].width,Ee[ne].height,Pe,me,Ee[ne].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,Je,Ee[ne].width,Ee[ne].height,0,Pe,me,Ee[ne].data);for(let xe=0;xe<k.length;xe++){const nt=k[xe].image[ne].image;Ue?F&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,xe+1,0,0,nt.width,nt.height,Pe,me,nt.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,xe+1,Je,nt.width,nt.height,0,Pe,me,nt.data)}}else{Ue?F&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Pe,me,Ee[ne]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,Je,Pe,me,Ee[ne]);for(let xe=0;xe<k.length;xe++){const Se=k[xe];Ue?F&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,xe+1,0,0,Pe,me,Se.image[ne]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,xe+1,Je,Pe,me,Se.image[ne])}}}g(A)&&p(s.TEXTURE_CUBE_MAP),ee.__version=ae.version,A.onUpdate&&A.onUpdate(A)}L.__version=A.version}function oe(L,A,V,te,ae,ee){const Re=r.convert(V.format,V.colorSpace),ve=r.convert(V.type),Me=w(V.internalFormat,Re,ve,V.colorSpace);if(!n.get(A).__hasExternalTextures){const fe=Math.max(1,A.width>>ee),Ee=Math.max(1,A.height>>ee);ae===s.TEXTURE_3D||ae===s.TEXTURE_2D_ARRAY?t.texImage3D(ae,ee,Me,fe,Ee,A.depth,0,Re,ve,null):t.texImage2D(ae,ee,Me,fe,Ee,0,Re,ve,null)}t.bindFramebuffer(s.FRAMEBUFFER,L),rt(A)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,te,ae,n.get(V).__webglTexture,0,$e(A)):(ae===s.TEXTURE_2D||ae>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,te,ae,n.get(V).__webglTexture,ee),t.bindFramebuffer(s.FRAMEBUFFER,null)}function de(L,A,V){if(s.bindRenderbuffer(s.RENDERBUFFER,L),A.depthBuffer){const te=A.depthTexture,ae=te&&te.isDepthTexture?te.type:null,ee=x(A.stencilBuffer,ae),Re=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ve=$e(A);rt(A)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ve,ee,A.width,A.height):V?s.renderbufferStorageMultisample(s.RENDERBUFFER,ve,ee,A.width,A.height):s.renderbufferStorage(s.RENDERBUFFER,ee,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Re,s.RENDERBUFFER,L)}else{const te=A.textures;for(let ae=0;ae<te.length;ae++){const ee=te[ae],Re=r.convert(ee.format,ee.colorSpace),ve=r.convert(ee.type),Me=w(ee.internalFormat,Re,ve,ee.colorSpace),Ze=$e(A);V&&rt(A)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ze,Me,A.width,A.height):rt(A)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ze,Me,A.width,A.height):s.renderbufferStorage(s.RENDERBUFFER,Me,A.width,A.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function _e(L,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,L),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(A.depthTexture).__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),K(A.depthTexture,0);const te=n.get(A.depthTexture).__webglTexture,ae=$e(A);if(A.depthTexture.format===us)rt(A)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,te,0,ae):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,te,0);else if(A.depthTexture.format===xs)rt(A)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,te,0,ae):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function Ie(L){const A=n.get(L),V=L.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==L.depthTexture){const te=L.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),te){const ae=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,te.removeEventListener("dispose",ae)};te.addEventListener("dispose",ae),A.__depthDisposeCallback=ae}A.__boundDepthTexture=te}if(L.depthTexture&&!A.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");_e(A.__webglFramebuffer,L)}else if(V){A.__webglDepthbuffer=[];for(let te=0;te<6;te++)if(t.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer[te]),A.__webglDepthbuffer[te]===void 0)A.__webglDepthbuffer[te]=s.createRenderbuffer(),de(A.__webglDepthbuffer[te],L,!1);else{const ae=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ee=A.__webglDepthbuffer[te];s.bindRenderbuffer(s.RENDERBUFFER,ee),s.framebufferRenderbuffer(s.FRAMEBUFFER,ae,s.RENDERBUFFER,ee)}}else if(t.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=s.createRenderbuffer(),de(A.__webglDepthbuffer,L,!1);else{const te=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ae=A.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ae),s.framebufferRenderbuffer(s.FRAMEBUFFER,te,s.RENDERBUFFER,ae)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ne(L,A,V){const te=n.get(L);A!==void 0&&oe(te.__webglFramebuffer,L,L.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),V!==void 0&&Ie(L)}function Ke(L){const A=L.texture,V=n.get(L),te=n.get(A);L.addEventListener("dispose",D);const ae=L.textures,ee=L.isWebGLCubeRenderTarget===!0,Re=ae.length>1;if(Re||(te.__webglTexture===void 0&&(te.__webglTexture=s.createTexture()),te.__version=A.version,o.memory.textures++),ee){V.__webglFramebuffer=[];for(let ve=0;ve<6;ve++)if(A.mipmaps&&A.mipmaps.length>0){V.__webglFramebuffer[ve]=[];for(let Me=0;Me<A.mipmaps.length;Me++)V.__webglFramebuffer[ve][Me]=s.createFramebuffer()}else V.__webglFramebuffer[ve]=s.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){V.__webglFramebuffer=[];for(let ve=0;ve<A.mipmaps.length;ve++)V.__webglFramebuffer[ve]=s.createFramebuffer()}else V.__webglFramebuffer=s.createFramebuffer();if(Re)for(let ve=0,Me=ae.length;ve<Me;ve++){const Ze=n.get(ae[ve]);Ze.__webglTexture===void 0&&(Ze.__webglTexture=s.createTexture(),o.memory.textures++)}if(L.samples>0&&rt(L)===!1){V.__webglMultisampledFramebuffer=s.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let ve=0;ve<ae.length;ve++){const Me=ae[ve];V.__webglColorRenderbuffer[ve]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,V.__webglColorRenderbuffer[ve]);const Ze=r.convert(Me.format,Me.colorSpace),fe=r.convert(Me.type),Ee=w(Me.internalFormat,Ze,fe,Me.colorSpace,L.isXRRenderTarget===!0),Fe=$e(L);s.renderbufferStorageMultisample(s.RENDERBUFFER,Fe,Ee,L.width,L.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ve,s.RENDERBUFFER,V.__webglColorRenderbuffer[ve])}s.bindRenderbuffer(s.RENDERBUFFER,null),L.depthBuffer&&(V.__webglDepthRenderbuffer=s.createRenderbuffer(),de(V.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ee){t.bindTexture(s.TEXTURE_CUBE_MAP,te.__webglTexture),Ae(s.TEXTURE_CUBE_MAP,A);for(let ve=0;ve<6;ve++)if(A.mipmaps&&A.mipmaps.length>0)for(let Me=0;Me<A.mipmaps.length;Me++)oe(V.__webglFramebuffer[ve][Me],L,A,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Me);else oe(V.__webglFramebuffer[ve],L,A,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0);g(A)&&p(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Re){for(let ve=0,Me=ae.length;ve<Me;ve++){const Ze=ae[ve],fe=n.get(Ze);t.bindTexture(s.TEXTURE_2D,fe.__webglTexture),Ae(s.TEXTURE_2D,Ze),oe(V.__webglFramebuffer,L,Ze,s.COLOR_ATTACHMENT0+ve,s.TEXTURE_2D,0),g(Ze)&&p(s.TEXTURE_2D)}t.unbindTexture()}else{let ve=s.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(ve=L.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ve,te.__webglTexture),Ae(ve,A),A.mipmaps&&A.mipmaps.length>0)for(let Me=0;Me<A.mipmaps.length;Me++)oe(V.__webglFramebuffer[Me],L,A,s.COLOR_ATTACHMENT0,ve,Me);else oe(V.__webglFramebuffer,L,A,s.COLOR_ATTACHMENT0,ve,0);g(A)&&p(ve),t.unbindTexture()}L.depthBuffer&&Ie(L)}function st(L){const A=L.textures;for(let V=0,te=A.length;V<te;V++){const ae=A[V];if(g(ae)){const ee=L.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,Re=n.get(ae).__webglTexture;t.bindTexture(ee,Re),p(ee),t.unbindTexture()}}}const qe=[],O=[];function Wt(L){if(L.samples>0){if(rt(L)===!1){const A=L.textures,V=L.width,te=L.height;let ae=s.COLOR_BUFFER_BIT;const ee=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Re=n.get(L),ve=A.length>1;if(ve)for(let Me=0;Me<A.length;Me++)t.bindFramebuffer(s.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Me,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Re.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Me,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Re.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Re.__webglFramebuffer);for(let Me=0;Me<A.length;Me++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(ae|=s.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(ae|=s.STENCIL_BUFFER_BIT)),ve){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Re.__webglColorRenderbuffer[Me]);const Ze=n.get(A[Me]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Ze,0)}s.blitFramebuffer(0,0,V,te,0,0,V,te,ae,s.NEAREST),l===!0&&(qe.length=0,O.length=0,qe.push(s.COLOR_ATTACHMENT0+Me),L.depthBuffer&&L.resolveDepthBuffer===!1&&(qe.push(ee),O.push(ee),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,O)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,qe))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ve)for(let Me=0;Me<A.length;Me++){t.bindFramebuffer(s.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Me,s.RENDERBUFFER,Re.__webglColorRenderbuffer[Me]);const Ze=n.get(A[Me]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Re.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Me,s.TEXTURE_2D,Ze,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Re.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&l){const A=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[A])}}}function $e(L){return Math.min(i.maxSamples,L.samples)}function rt(L){const A=n.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function Oe(L){const A=o.render.frame;h.get(L)!==A&&(h.set(L,A),L.update())}function ft(L,A){const V=L.colorSpace,te=L.format,ae=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||V!==Ut&&V!==dn&&(at.getTransfer(V)===mt?(te!==ln||ae!==ei)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),A}function ke(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(c.width=L.naturalWidth||L.width,c.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(c.width=L.displayWidth,c.height=L.displayHeight):(c.width=L.width,c.height=L.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=C,this.setTexture2D=K,this.setTexture2DArray=se,this.setTexture3D=X,this.setTextureCube=ce,this.rebindTextures=Ne,this.setupRenderTarget=Ke,this.updateRenderTargetMipmap=st,this.updateMultisampleRenderTarget=Wt,this.setupDepthRenderbuffer=Ie,this.setupFrameBufferTexture=oe,this.useMultisampledRTT=rt}function av(s,e){function t(n,i=dn){let r;const o=at.getTransfer(i);if(n===ei)return s.UNSIGNED_BYTE;if(n===Kl)return s.UNSIGNED_SHORT_4_4_4_4;if(n===$l)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Hu)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Bu)return s.BYTE;if(n===zu)return s.SHORT;if(n===cr)return s.UNSIGNED_SHORT;if(n===Yl)return s.INT;if(n===Ii)return s.UNSIGNED_INT;if(n===rn)return s.FLOAT;if(n===$n)return s.HALF_FLOAT;if(n===Gu)return s.ALPHA;if(n===Vu)return s.RGB;if(n===ln)return s.RGBA;if(n===Wu)return s.LUMINANCE;if(n===ju)return s.LUMINANCE_ALPHA;if(n===us)return s.DEPTH_COMPONENT;if(n===xs)return s.DEPTH_STENCIL;if(n===Go)return s.RED;if(n===Zl)return s.RED_INTEGER;if(n===Xu)return s.RG;if(n===Jl)return s.RG_INTEGER;if(n===Ql)return s.RGBA_INTEGER;if(n===So||n===Mo||n===wo||n===Eo)if(o===mt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===So)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Mo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===wo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Eo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===So)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Mo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===wo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Eo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===rl||n===ol||n===al||n===ll)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===rl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ol)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===al)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ll)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===cl||n===hl||n===ul)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===cl||n===hl)return o===mt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ul)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===dl||n===fl||n===pl||n===ml||n===gl||n===bl||n===_l||n===vl||n===xl||n===yl||n===Sl||n===Ml||n===wl||n===El)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===dl)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===fl)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===pl)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ml)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===gl)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===bl)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===_l)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===vl)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===xl)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===yl)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Sl)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ml)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===wl)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===El)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ao||n===Al||n===Tl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ao)return o===mt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Al)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Tl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===qu||n===Cl||n===Rl||n===Pl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ao)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Cl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Rl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Pl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===vs?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}class lv extends Qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class gt extends _t{constructor(){super(),this.isGroup=!0,this.type="Group"}}const cv={type:"move"};class Ea{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new gt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new gt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new gt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,n),p=this._getHandJoint(c,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),m=.02,b=.005;c.inputState.pinching&&d>m+b?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=m-b&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(cv)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new gt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const hv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,uv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class dv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new Nt,r=e.properties.get(i);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new cn({vertexShader:hv,fragmentShader:uv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ye(new Tn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class fv extends Ui{constructor(e,t){super();const n=this;let i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,m=null,b=null;const _=new dv,g=t.getContextAttributes();let p=null,w=null;const x=[],y=[],I=new le;let D=null;const P=new Qt;P.layers.enable(1),P.viewport=new tt;const B=new Qt;B.layers.enable(2),B.viewport=new tt;const $=[P,B],S=new lv;S.layers.enable(1),S.layers.enable(2);let C=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let oe=x[J];return oe===void 0&&(oe=new Ea,x[J]=oe),oe.getTargetRaySpace()},this.getControllerGrip=function(J){let oe=x[J];return oe===void 0&&(oe=new Ea,x[J]=oe),oe.getGripSpace()},this.getHand=function(J){let oe=x[J];return oe===void 0&&(oe=new Ea,x[J]=oe),oe.getHandSpace()};function q(J){const oe=y.indexOf(J.inputSource);if(oe===-1)return;const de=x[oe];de!==void 0&&(de.update(J.inputSource,J.frame,c||o),de.dispatchEvent({type:J.type,data:J.inputSource}))}function K(){i.removeEventListener("select",q),i.removeEventListener("selectstart",q),i.removeEventListener("selectend",q),i.removeEventListener("squeeze",q),i.removeEventListener("squeezestart",q),i.removeEventListener("squeezeend",q),i.removeEventListener("end",K),i.removeEventListener("inputsourceschange",se);for(let J=0;J<x.length;J++){const oe=y[J];oe!==null&&(y[J]=null,x[J].disconnect(oe))}C=null,G=null,_.reset(),e.setRenderTarget(p),m=null,d=null,u=null,i=null,w=null,Ge.stop(),n.isPresenting=!1,e.setPixelRatio(D),e.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){a=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return u},this.getFrame=function(){return b},this.getSession=function(){return i},this.setSession=async function(J){if(i=J,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",q),i.addEventListener("selectstart",q),i.addEventListener("selectend",q),i.addEventListener("squeeze",q),i.addEventListener("squeezestart",q),i.addEventListener("squeezeend",q),i.addEventListener("end",K),i.addEventListener("inputsourceschange",se),g.xrCompatible!==!0&&await t.makeXRCompatible(),D=e.getPixelRatio(),e.getSize(I),i.renderState.layers===void 0){const oe={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(i,t,oe),i.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),w=new mi(m.framebufferWidth,m.framebufferHeight,{format:ln,type:ei,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let oe=null,de=null,_e=null;g.depth&&(_e=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,oe=g.stencil?xs:us,de=g.stencil?vs:Ii);const Ie={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:r};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(Ie),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),w=new mi(d.textureWidth,d.textureHeight,{format:ln,type:ei,depthTexture:new rd(d.textureWidth,d.textureHeight,de,void 0,void 0,void 0,void 0,void 0,void 0,oe),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Ge.setContext(i),Ge.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function se(J){for(let oe=0;oe<J.removed.length;oe++){const de=J.removed[oe],_e=y.indexOf(de);_e>=0&&(y[_e]=null,x[_e].disconnect(de))}for(let oe=0;oe<J.added.length;oe++){const de=J.added[oe];let _e=y.indexOf(de);if(_e===-1){for(let Ne=0;Ne<x.length;Ne++)if(Ne>=y.length){y.push(de),_e=Ne;break}else if(y[Ne]===null){y[Ne]=de,_e=Ne;break}if(_e===-1)break}const Ie=x[_e];Ie&&Ie.connect(de)}}const X=new R,ce=new R;function Z(J,oe,de){X.setFromMatrixPosition(oe.matrixWorld),ce.setFromMatrixPosition(de.matrixWorld);const _e=X.distanceTo(ce),Ie=oe.projectionMatrix.elements,Ne=de.projectionMatrix.elements,Ke=Ie[14]/(Ie[10]-1),st=Ie[14]/(Ie[10]+1),qe=(Ie[9]+1)/Ie[5],O=(Ie[9]-1)/Ie[5],Wt=(Ie[8]-1)/Ie[0],$e=(Ne[8]+1)/Ne[0],rt=Ke*Wt,Oe=Ke*$e,ft=_e/(-Wt+$e),ke=ft*-Wt;if(oe.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(ke),J.translateZ(ft),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Ie[10]===-1)J.projectionMatrix.copy(oe.projectionMatrix),J.projectionMatrixInverse.copy(oe.projectionMatrixInverse);else{const L=Ke+ft,A=st+ft,V=rt-ke,te=Oe+(_e-ke),ae=qe*st/A*L,ee=O*st/A*L;J.projectionMatrix.makePerspective(V,te,ae,ee,L,A),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function ge(J,oe){oe===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(oe.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(i===null)return;let oe=J.near,de=J.far;_.texture!==null&&(_.depthNear>0&&(oe=_.depthNear),_.depthFar>0&&(de=_.depthFar)),S.near=B.near=P.near=oe,S.far=B.far=P.far=de,(C!==S.near||G!==S.far)&&(i.updateRenderState({depthNear:S.near,depthFar:S.far}),C=S.near,G=S.far);const _e=J.parent,Ie=S.cameras;ge(S,_e);for(let Ne=0;Ne<Ie.length;Ne++)ge(Ie[Ne],_e);Ie.length===2?Z(S,P,B):S.projectionMatrix.copy(P.projectionMatrix),be(J,S,_e)};function be(J,oe,de){de===null?J.matrix.copy(oe.matrixWorld):(J.matrix.copy(de.matrixWorld),J.matrix.invert(),J.matrix.multiply(oe.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(oe.projectionMatrix),J.projectionMatrixInverse.copy(oe.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=ys*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(d===null&&m===null))return l},this.setFoveation=function(J){l=J,d!==null&&(d.fixedFoveation=J),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=J)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(S)};let Ae=null;function Be(J,oe){if(h=oe.getViewerPose(c||o),b=oe,h!==null){const de=h.views;m!==null&&(e.setRenderTargetFramebuffer(w,m.framebuffer),e.setRenderTarget(w));let _e=!1;de.length!==S.cameras.length&&(S.cameras.length=0,_e=!0);for(let Ne=0;Ne<de.length;Ne++){const Ke=de[Ne];let st=null;if(m!==null)st=m.getViewport(Ke);else{const O=u.getViewSubImage(d,Ke);st=O.viewport,Ne===0&&(e.setRenderTargetTextures(w,O.colorTexture,d.ignoreDepthValues?void 0:O.depthStencilTexture),e.setRenderTarget(w))}let qe=$[Ne];qe===void 0&&(qe=new Qt,qe.layers.enable(Ne),qe.viewport=new tt,$[Ne]=qe),qe.matrix.fromArray(Ke.transform.matrix),qe.matrix.decompose(qe.position,qe.quaternion,qe.scale),qe.projectionMatrix.fromArray(Ke.projectionMatrix),qe.projectionMatrixInverse.copy(qe.projectionMatrix).invert(),qe.viewport.set(st.x,st.y,st.width,st.height),Ne===0&&(S.matrix.copy(qe.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),_e===!0&&S.cameras.push(qe)}const Ie=i.enabledFeatures;if(Ie&&Ie.includes("depth-sensing")){const Ne=u.getDepthInformation(de[0]);Ne&&Ne.isValid&&Ne.texture&&_.init(e,Ne,i.renderState)}}for(let de=0;de<x.length;de++){const _e=y[de],Ie=x[de];_e!==null&&Ie!==void 0&&Ie.update(_e,oe,c||o)}Ae&&Ae(J,oe),oe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:oe}),b=null}const Ge=new sd;Ge.setAnimationLoop(Be),this.setAnimationLoop=function(J){Ae=J},this.dispose=function(){}}}const Mi=new Cn,pv=new Le;function mv(s,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,nd(s)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,w,x,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),d(g,p),p.isMeshPhysicalMaterial&&m(g,p,y)):p.isMeshMatcapMaterial?(r(g,p),b(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),_(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,w,x):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===tn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===tn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const w=e.get(p),x=w.envMap,y=w.envMapRotation;x&&(g.envMap.value=x,Mi.copy(y),Mi.x*=-1,Mi.y*=-1,Mi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Mi.y*=-1,Mi.z*=-1),g.envMapRotation.value.setFromMatrix4(pv.makeRotationFromEuler(Mi)),g.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,w,x){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*w,g.scale.value=x*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function m(g,p,w){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===tn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=w.texture,g.transmissionSamplerSize.value.set(w.width,w.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function b(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){const w=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(w.matrixWorld),g.nearDistance.value=w.shadow.camera.near,g.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function gv(s,e,t,n){let i={},r={},o=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,x){const y=x.program;n.uniformBlockBinding(w,y)}function c(w,x){let y=i[w.id];y===void 0&&(b(w),y=h(w),i[w.id]=y,w.addEventListener("dispose",g));const I=x.program;n.updateUBOMapping(w,I);const D=e.render.frame;r[w.id]!==D&&(d(w),r[w.id]=D)}function h(w){const x=u();w.__bindingPointIndex=x;const y=s.createBuffer(),I=w.__size,D=w.usage;return s.bindBuffer(s.UNIFORM_BUFFER,y),s.bufferData(s.UNIFORM_BUFFER,I,D),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,x,y),y}function u(){for(let w=0;w<a;w++)if(o.indexOf(w)===-1)return o.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(w){const x=i[w.id],y=w.uniforms,I=w.__cache;s.bindBuffer(s.UNIFORM_BUFFER,x);for(let D=0,P=y.length;D<P;D++){const B=Array.isArray(y[D])?y[D]:[y[D]];for(let $=0,S=B.length;$<S;$++){const C=B[$];if(m(C,D,$,I)===!0){const G=C.__offset,q=Array.isArray(C.value)?C.value:[C.value];let K=0;for(let se=0;se<q.length;se++){const X=q[se],ce=_(X);typeof X=="number"||typeof X=="boolean"?(C.__data[0]=X,s.bufferSubData(s.UNIFORM_BUFFER,G+K,C.__data)):X.isMatrix3?(C.__data[0]=X.elements[0],C.__data[1]=X.elements[1],C.__data[2]=X.elements[2],C.__data[3]=0,C.__data[4]=X.elements[3],C.__data[5]=X.elements[4],C.__data[6]=X.elements[5],C.__data[7]=0,C.__data[8]=X.elements[6],C.__data[9]=X.elements[7],C.__data[10]=X.elements[8],C.__data[11]=0):(X.toArray(C.__data,K),K+=ce.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,G,C.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function m(w,x,y,I){const D=w.value,P=x+"_"+y;if(I[P]===void 0)return typeof D=="number"||typeof D=="boolean"?I[P]=D:I[P]=D.clone(),!0;{const B=I[P];if(typeof D=="number"||typeof D=="boolean"){if(B!==D)return I[P]=D,!0}else if(B.equals(D)===!1)return B.copy(D),!0}return!1}function b(w){const x=w.uniforms;let y=0;const I=16;for(let P=0,B=x.length;P<B;P++){const $=Array.isArray(x[P])?x[P]:[x[P]];for(let S=0,C=$.length;S<C;S++){const G=$[S],q=Array.isArray(G.value)?G.value:[G.value];for(let K=0,se=q.length;K<se;K++){const X=q[K],ce=_(X),Z=y%I,ge=Z%ce.boundary,be=Z+ge;y+=ge,be!==0&&I-be<ce.storage&&(y+=I-be),G.__data=new Float32Array(ce.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=y,y+=ce.storage}}}const D=y%I;return D>0&&(y+=I-D),w.__size=y,w.__cache={},this}function _(w){const x={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(x.boundary=4,x.storage=4):w.isVector2?(x.boundary=8,x.storage=8):w.isVector3||w.isColor?(x.boundary=16,x.storage=12):w.isVector4?(x.boundary=16,x.storage=16):w.isMatrix3?(x.boundary=48,x.storage=48):w.isMatrix4?(x.boundary=64,x.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),x}function g(w){const x=w.target;x.removeEventListener("dispose",g);const y=o.indexOf(x.__bindingPointIndex);o.splice(y,1),s.deleteBuffer(i[x.id]),delete i[x.id],delete r[x.id]}function p(){for(const w in i)s.deleteBuffer(i[w]);o=[],i={},r={}}return{bind:l,update:c,dispose:p}}class bv{constructor(e={}){const{canvas:t=np(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const m=new Uint32Array(4),b=new Int32Array(4);let _=null,g=null;const p=[],w=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=vt,this.toneMapping=pi,this.toneMappingExposure=1;const x=this;let y=!1,I=0,D=0,P=null,B=-1,$=null;const S=new tt,C=new tt;let G=null;const q=new De(0);let K=0,se=t.width,X=t.height,ce=1,Z=null,ge=null;const be=new tt(0,0,se,X),Ae=new tt(0,0,se,X);let Be=!1;const Ge=new oc;let J=!1,oe=!1;const de=new Le,_e=new Le,Ie=new R,Ne=new tt,Ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let st=!1;function qe(){return P===null?ce:1}let O=n;function Wt(T,f){return t.getContext(T,f)}try{const T={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ql}`),t.addEventListener("webglcontextlost",ne,!1),t.addEventListener("webglcontextrestored",xe,!1),t.addEventListener("webglcontextcreationerror",Se,!1),O===null){const f="webgl2";if(O=Wt(f,T),O===null)throw Wt(f)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let $e,rt,Oe,ft,ke,L,A,V,te,ae,ee,Re,ve,Me,Ze,fe,Ee,Fe,Pe,me,Je,Ue,Ve,F;function ye(){$e=new Sb(O),$e.init(),Ue=new av(O,$e),rt=new gb(O,$e,e,Ue),Oe=new sv(O),rt.reverseDepthBuffer&&Oe.buffers.depth.setReversed(!0),ft=new Eb(O),ke=new V_,L=new ov(O,$e,Oe,ke,rt,Ue,ft),A=new _b(x),V=new yb(x),te=new Dp(O),Ve=new pb(O,te),ae=new Mb(O,te,ft,Ve),ee=new Tb(O,ae,te,ft),Pe=new Ab(O,rt,L),fe=new bb(ke),Re=new G_(x,A,V,$e,rt,Ve,fe),ve=new mv(x,ke),Me=new j_,Ze=new Z_($e),Fe=new fb(x,A,V,Oe,ee,d,l),Ee=new nv(x,ee,rt),F=new gv(O,ft,rt,Oe),me=new mb(O,$e,ft),Je=new wb(O,$e,ft),ft.programs=Re.programs,x.capabilities=rt,x.extensions=$e,x.properties=ke,x.renderLists=Me,x.shadowMap=Ee,x.state=Oe,x.info=ft}ye();const k=new fv(x,O);this.xr=k,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const T=$e.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=$e.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return ce},this.setPixelRatio=function(T){T!==void 0&&(ce=T,this.setSize(se,X,!1))},this.getSize=function(T){return T.set(se,X)},this.setSize=function(T,f,v=!0){if(k.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}se=T,X=f,t.width=Math.floor(T*ce),t.height=Math.floor(f*ce),v===!0&&(t.style.width=T+"px",t.style.height=f+"px"),this.setViewport(0,0,T,f)},this.getDrawingBufferSize=function(T){return T.set(se*ce,X*ce).floor()},this.setDrawingBufferSize=function(T,f,v){se=T,X=f,ce=v,t.width=Math.floor(T*v),t.height=Math.floor(f*v),this.setViewport(0,0,T,f)},this.getCurrentViewport=function(T){return T.copy(S)},this.getViewport=function(T){return T.copy(be)},this.setViewport=function(T,f,v,M){T.isVector4?be.set(T.x,T.y,T.z,T.w):be.set(T,f,v,M),Oe.viewport(S.copy(be).multiplyScalar(ce).round())},this.getScissor=function(T){return T.copy(Ae)},this.setScissor=function(T,f,v,M){T.isVector4?Ae.set(T.x,T.y,T.z,T.w):Ae.set(T,f,v,M),Oe.scissor(C.copy(Ae).multiplyScalar(ce).round())},this.getScissorTest=function(){return Be},this.setScissorTest=function(T){Oe.setScissorTest(Be=T)},this.setOpaqueSort=function(T){Z=T},this.setTransparentSort=function(T){ge=T},this.getClearColor=function(T){return T.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor.apply(Fe,arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha.apply(Fe,arguments)},this.clear=function(T=!0,f=!0,v=!0){let M=0;if(T){let E=!1;if(P!==null){const U=P.texture.format;E=U===Ql||U===Jl||U===Zl}if(E){const U=P.texture.type,N=U===ei||U===Ii||U===cr||U===vs||U===Kl||U===$l,z=Fe.getClearColor(),Y=Fe.getClearAlpha(),W=z.r,j=z.g,H=z.b;N?(m[0]=W,m[1]=j,m[2]=H,m[3]=Y,O.clearBufferuiv(O.COLOR,0,m)):(b[0]=W,b[1]=j,b[2]=H,b[3]=Y,O.clearBufferiv(O.COLOR,0,b))}else M|=O.COLOR_BUFFER_BIT}f&&(M|=O.DEPTH_BUFFER_BIT,O.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),v&&(M|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(M)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",xe,!1),t.removeEventListener("webglcontextcreationerror",Se,!1),Me.dispose(),Ze.dispose(),ke.dispose(),A.dispose(),V.dispose(),ee.dispose(),Ve.dispose(),F.dispose(),Re.dispose(),k.dispose(),k.removeEventListener("sessionstart",Sr),k.removeEventListener("sessionend",Mr),Bn.stop()};function ne(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function xe(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const T=ft.autoReset,f=Ee.enabled,v=Ee.autoUpdate,M=Ee.needsUpdate,E=Ee.type;ye(),ft.autoReset=T,Ee.enabled=f,Ee.autoUpdate=v,Ee.needsUpdate=M,Ee.type=E}function Se(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function nt(T){const f=T.target;f.removeEventListener("dispose",nt),wt(f)}function wt(T){jt(T),ke.remove(T)}function jt(T){const f=ke.get(T).programs;f!==void 0&&(f.forEach(function(v){Re.releaseProgram(v)}),T.isShaderMaterial&&Re.releaseShaderCache(T))}this.renderBufferDirect=function(T,f,v,M,E,U){f===null&&(f=Ke);const N=E.isMesh&&E.matrixWorld.determinant()<0,z=Tr(T,f,v,M,E);Oe.setMaterial(M,N);let Y=v.index,W=1;if(M.wireframe===!0){if(Y=ae.getWireframeAttribute(v),Y===void 0)return;W=2}const j=v.drawRange,H=v.attributes.position;let ie=j.start*W,he=(j.start+j.count)*W;U!==null&&(ie=Math.max(ie,U.start*W),he=Math.min(he,(U.start+U.count)*W)),Y!==null?(ie=Math.max(ie,0),he=Math.min(he,Y.count)):H!=null&&(ie=Math.max(ie,0),he=Math.min(he,H.count));const ue=he-ie;if(ue<0||ue===1/0)return;Ve.setup(E,M,z,v,Y);let we,re=me;if(Y!==null&&(we=te.get(Y),re=Je,re.setIndex(we)),E.isMesh)M.wireframe===!0?(Oe.setLineWidth(M.wireframeLinewidth*qe()),re.setMode(O.LINES)):re.setMode(O.TRIANGLES);else if(E.isLine){let Q=M.linewidth;Q===void 0&&(Q=1),Oe.setLineWidth(Q*qe()),E.isLineSegments?re.setMode(O.LINES):E.isLineLoop?re.setMode(O.LINE_LOOP):re.setMode(O.LINE_STRIP)}else E.isPoints?re.setMode(O.POINTS):E.isSprite&&re.setMode(O.TRIANGLES);if(E.isBatchedMesh)if(E._multiDrawInstances!==null)re.renderMultiDrawInstances(E._multiDrawStarts,E._multiDrawCounts,E._multiDrawCount,E._multiDrawInstances);else if($e.get("WEBGL_multi_draw"))re.renderMultiDraw(E._multiDrawStarts,E._multiDrawCounts,E._multiDrawCount);else{const Q=E._multiDrawStarts,Te=E._multiDrawCounts,Ce=E._multiDrawCount,it=Y?te.get(Y).bytesPerElement:1,Lt=ke.get(M).currentProgram.getUniforms();for(let Xe=0;Xe<Ce;Xe++)Lt.setValue(O,"_gl_DrawID",Xe),re.render(Q[Xe]/it,Te[Xe])}else if(E.isInstancedMesh)re.renderInstances(ie,ue,E.count);else if(v.isInstancedBufferGeometry){const Q=v._maxInstanceCount!==void 0?v._maxInstanceCount:1/0,Te=Math.min(v.instanceCount,Q);re.renderInstances(ie,ue,Te)}else re.render(ie,ue)};function ot(T,f,v){T.transparent===!0&&T.side===en&&T.forceSinglePass===!1?(T.side=tn,T.needsUpdate=!0,Fi(T,f,v),T.side=Qn,T.needsUpdate=!0,Fi(T,f,v),T.side=en):Fi(T,f,v)}this.compile=function(T,f,v=null){v===null&&(v=T),g=Ze.get(v),g.init(f),w.push(g),v.traverseVisible(function(E){E.isLight&&E.layers.test(f.layers)&&(g.pushLight(E),E.castShadow&&g.pushShadow(E))}),T!==v&&T.traverseVisible(function(E){E.isLight&&E.layers.test(f.layers)&&(g.pushLight(E),E.castShadow&&g.pushShadow(E))}),g.setupLights();const M=new Set;return T.traverse(function(E){if(!(E.isMesh||E.isPoints||E.isLine||E.isSprite))return;const U=E.material;if(U)if(Array.isArray(U))for(let N=0;N<U.length;N++){const z=U[N];ot(z,v,E),M.add(z)}else ot(U,v,E),M.add(U)}),w.pop(),g=null,M},this.compileAsync=function(T,f,v=null){const M=this.compile(T,f,v);return new Promise(E=>{function U(){if(M.forEach(function(N){ke.get(N).currentProgram.isReady()&&M.delete(N)}),M.size===0){E(T);return}setTimeout(U,10)}$e.get("KHR_parallel_shader_compile")!==null?U():setTimeout(U,10)})};let Xt=null;function bn(T){Xt&&Xt(T)}function Sr(){Bn.stop()}function Mr(){Bn.start()}const Bn=new sd;Bn.setAnimationLoop(bn),typeof self<"u"&&Bn.setContext(self),this.setAnimationLoop=function(T){Xt=T,k.setAnimationLoop(T),T===null?Bn.stop():Bn.start()},k.addEventListener("sessionstart",Sr),k.addEventListener("sessionend",Mr),this.render=function(T,f){if(f!==void 0&&f.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),f.parent===null&&f.matrixWorldAutoUpdate===!0&&f.updateMatrixWorld(),k.enabled===!0&&k.isPresenting===!0&&(k.cameraAutoUpdate===!0&&k.updateCamera(f),f=k.getCamera()),T.isScene===!0&&T.onBeforeRender(x,T,f,P),g=Ze.get(T,w.length),g.init(f),w.push(g),_e.multiplyMatrices(f.projectionMatrix,f.matrixWorldInverse),Ge.setFromProjectionMatrix(_e),oe=this.localClippingEnabled,J=fe.init(this.clippingPlanes,oe),_=Me.get(T,p.length),_.init(),p.push(_),k.enabled===!0&&k.isPresenting===!0){const U=x.xr.getDepthSensingMesh();U!==null&&Ds(U,f,-1/0,x.sortObjects)}Ds(T,f,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(Z,ge),st=k.enabled===!1||k.isPresenting===!1||k.hasDepthSensing()===!1,st&&Fe.addToRenderList(_,T),this.info.render.frame++,J===!0&&fe.beginShadows();const v=g.state.shadowsArray;Ee.render(v,T,f),J===!0&&fe.endShadows(),this.info.autoReset===!0&&this.info.reset();const M=_.opaque,E=_.transmissive;if(g.setupLights(),f.isArrayCamera){const U=f.cameras;if(E.length>0)for(let N=0,z=U.length;N<z;N++){const Y=U[N];Is(M,E,T,Y)}st&&Fe.render(T);for(let N=0,z=U.length;N<z;N++){const Y=U[N];wr(_,T,Y,Y.viewport)}}else E.length>0&&Is(M,E,T,f),st&&Fe.render(T),wr(_,T,f);P!==null&&(L.updateMultisampleRenderTarget(P),L.updateRenderTargetMipmap(P)),T.isScene===!0&&T.onAfterRender(x,T,f),Ve.resetDefaultState(),B=-1,$=null,w.pop(),w.length>0?(g=w[w.length-1],J===!0&&fe.setGlobalState(x.clippingPlanes,g.state.camera)):g=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function Ds(T,f,v,M){if(T.visible===!1)return;if(T.layers.test(f.layers)){if(T.isGroup)v=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(f);else if(T.isLight)g.pushLight(T),T.castShadow&&g.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Ge.intersectsSprite(T)){M&&Ne.setFromMatrixPosition(T.matrixWorld).applyMatrix4(_e);const N=ee.update(T),z=T.material;z.visible&&_.push(T,N,z,v,Ne.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Ge.intersectsObject(T))){const N=ee.update(T),z=T.material;if(M&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ne.copy(T.boundingSphere.center)):(N.boundingSphere===null&&N.computeBoundingSphere(),Ne.copy(N.boundingSphere.center)),Ne.applyMatrix4(T.matrixWorld).applyMatrix4(_e)),Array.isArray(z)){const Y=N.groups;for(let W=0,j=Y.length;W<j;W++){const H=Y[W],ie=z[H.materialIndex];ie&&ie.visible&&_.push(T,N,ie,v,Ne.z,H)}}else z.visible&&_.push(T,N,z,v,Ne.z,null)}}const U=T.children;for(let N=0,z=U.length;N<z;N++)Ds(U[N],f,v,M)}function wr(T,f,v,M){const E=T.opaque,U=T.transmissive,N=T.transparent;g.setupLightsView(v),J===!0&&fe.setGlobalState(x.clippingPlanes,v),M&&Oe.viewport(S.copy(M)),E.length>0&&Oi(E,f,v),U.length>0&&Oi(U,f,v),N.length>0&&Oi(N,f,v),Oe.buffers.depth.setTest(!0),Oe.buffers.depth.setMask(!0),Oe.buffers.color.setMask(!0),Oe.setPolygonOffset(!1)}function Is(T,f,v,M){if((v.isScene===!0?v.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[M.id]===void 0&&(g.state.transmissionRenderTarget[M.id]=new mi(1,1,{generateMipmaps:!0,type:$e.has("EXT_color_buffer_half_float")||$e.has("EXT_color_buffer_float")?$n:ei,minFilter:Un,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:at.workingColorSpace}));const U=g.state.transmissionRenderTarget[M.id],N=M.viewport||S;U.setSize(N.z,N.w);const z=x.getRenderTarget();x.setRenderTarget(U),x.getClearColor(q),K=x.getClearAlpha(),K<1&&x.setClearColor(16777215,.5),x.clear(),st&&Fe.render(v);const Y=x.toneMapping;x.toneMapping=pi;const W=M.viewport;if(M.viewport!==void 0&&(M.viewport=void 0),g.setupLightsView(M),J===!0&&fe.setGlobalState(x.clippingPlanes,M),Oi(T,v,M),L.updateMultisampleRenderTarget(U),L.updateRenderTargetMipmap(U),$e.has("WEBGL_multisampled_render_to_texture")===!1){let j=!1;for(let H=0,ie=f.length;H<ie;H++){const he=f[H],ue=he.object,we=he.geometry,re=he.material,Q=he.group;if(re.side===en&&ue.layers.test(M.layers)){const Te=re.side;re.side=tn,re.needsUpdate=!0,Er(ue,v,M,we,re,Q),re.side=Te,re.needsUpdate=!0,j=!0}}j===!0&&(L.updateMultisampleRenderTarget(U),L.updateRenderTargetMipmap(U))}x.setRenderTarget(z),x.setClearColor(q,K),W!==void 0&&(M.viewport=W),x.toneMapping=Y}function Oi(T,f,v){const M=f.isScene===!0?f.overrideMaterial:null;for(let E=0,U=T.length;E<U;E++){const N=T[E],z=N.object,Y=N.geometry,W=M===null?N.material:M,j=N.group;z.layers.test(v.layers)&&Er(z,f,v,Y,W,j)}}function Er(T,f,v,M,E,U){T.onBeforeRender(x,f,v,M,E,U),T.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),E.onBeforeRender(x,f,v,M,T,U),E.transparent===!0&&E.side===en&&E.forceSinglePass===!1?(E.side=tn,E.needsUpdate=!0,x.renderBufferDirect(v,f,M,E,T,U),E.side=Qn,E.needsUpdate=!0,x.renderBufferDirect(v,f,M,E,T,U),E.side=en):x.renderBufferDirect(v,f,M,E,T,U),T.onAfterRender(x,f,v,M,E,U)}function Fi(T,f,v){f.isScene!==!0&&(f=Ke);const M=ke.get(T),E=g.state.lights,U=g.state.shadowsArray,N=E.state.version,z=Re.getParameters(T,E.state,U,f,v),Y=Re.getProgramCacheKey(z);let W=M.programs;M.environment=T.isMeshStandardMaterial?f.environment:null,M.fog=f.fog,M.envMap=(T.isMeshStandardMaterial?V:A).get(T.envMap||M.environment),M.envMapRotation=M.environment!==null&&T.envMap===null?f.environmentRotation:T.envMapRotation,W===void 0&&(T.addEventListener("dispose",nt),W=new Map,M.programs=W);let j=W.get(Y);if(j!==void 0){if(M.currentProgram===j&&M.lightsStateVersion===N)return Ns(T,z),j}else z.uniforms=Re.getUniforms(T),T.onBeforeCompile(z,x),j=Re.acquireProgram(z,Y),W.set(Y,j),M.uniforms=z.uniforms;const H=M.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(H.clippingPlanes=fe.uniform),Ns(T,z),M.needsLights=zn(T),M.lightsStateVersion=N,M.needsLights&&(H.ambientLightColor.value=E.state.ambient,H.lightProbe.value=E.state.probe,H.directionalLights.value=E.state.directional,H.directionalLightShadows.value=E.state.directionalShadow,H.spotLights.value=E.state.spot,H.spotLightShadows.value=E.state.spotShadow,H.rectAreaLights.value=E.state.rectArea,H.ltc_1.value=E.state.rectAreaLTC1,H.ltc_2.value=E.state.rectAreaLTC2,H.pointLights.value=E.state.point,H.pointLightShadows.value=E.state.pointShadow,H.hemisphereLights.value=E.state.hemi,H.directionalShadowMap.value=E.state.directionalShadowMap,H.directionalShadowMatrix.value=E.state.directionalShadowMatrix,H.spotShadowMap.value=E.state.spotShadowMap,H.spotLightMatrix.value=E.state.spotLightMatrix,H.spotLightMap.value=E.state.spotLightMap,H.pointShadowMap.value=E.state.pointShadowMap,H.pointShadowMatrix.value=E.state.pointShadowMatrix),M.currentProgram=j,M.uniformsList=null,j}function Ar(T){if(T.uniformsList===null){const f=T.currentProgram.getUniforms();T.uniformsList=Co.seqWithValue(f.seq,T.uniforms)}return T.uniformsList}function Ns(T,f){const v=ke.get(T);v.outputColorSpace=f.outputColorSpace,v.batching=f.batching,v.batchingColor=f.batchingColor,v.instancing=f.instancing,v.instancingColor=f.instancingColor,v.instancingMorph=f.instancingMorph,v.skinning=f.skinning,v.morphTargets=f.morphTargets,v.morphNormals=f.morphNormals,v.morphColors=f.morphColors,v.morphTargetsCount=f.morphTargetsCount,v.numClippingPlanes=f.numClippingPlanes,v.numIntersection=f.numClipIntersection,v.vertexAlphas=f.vertexAlphas,v.vertexTangents=f.vertexTangents,v.toneMapping=f.toneMapping}function Tr(T,f,v,M,E){f.isScene!==!0&&(f=Ke),L.resetTextureUnits();const U=f.fog,N=M.isMeshStandardMaterial?f.environment:null,z=P===null?x.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Ut,Y=(M.isMeshStandardMaterial?V:A).get(M.envMap||N),W=M.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,j=!!v.attributes.tangent&&(!!M.normalMap||M.anisotropy>0),H=!!v.morphAttributes.position,ie=!!v.morphAttributes.normal,he=!!v.morphAttributes.color;let ue=pi;M.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(ue=x.toneMapping);const we=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,re=we!==void 0?we.length:0,Q=ke.get(M),Te=g.state.lights;if(J===!0&&(oe===!0||T!==$)){const ze=T===$&&M.id===B;fe.setState(M,T,ze)}let Ce=!1;M.version===Q.__version?(Q.needsLights&&Q.lightsStateVersion!==Te.state.version||Q.outputColorSpace!==z||E.isBatchedMesh&&Q.batching===!1||!E.isBatchedMesh&&Q.batching===!0||E.isBatchedMesh&&Q.batchingColor===!0&&E.colorTexture===null||E.isBatchedMesh&&Q.batchingColor===!1&&E.colorTexture!==null||E.isInstancedMesh&&Q.instancing===!1||!E.isInstancedMesh&&Q.instancing===!0||E.isSkinnedMesh&&Q.skinning===!1||!E.isSkinnedMesh&&Q.skinning===!0||E.isInstancedMesh&&Q.instancingColor===!0&&E.instanceColor===null||E.isInstancedMesh&&Q.instancingColor===!1&&E.instanceColor!==null||E.isInstancedMesh&&Q.instancingMorph===!0&&E.morphTexture===null||E.isInstancedMesh&&Q.instancingMorph===!1&&E.morphTexture!==null||Q.envMap!==Y||M.fog===!0&&Q.fog!==U||Q.numClippingPlanes!==void 0&&(Q.numClippingPlanes!==fe.numPlanes||Q.numIntersection!==fe.numIntersection)||Q.vertexAlphas!==W||Q.vertexTangents!==j||Q.morphTargets!==H||Q.morphNormals!==ie||Q.morphColors!==he||Q.toneMapping!==ue||Q.morphTargetsCount!==re)&&(Ce=!0):(Ce=!0,Q.__version=M.version);let it=Q.currentProgram;Ce===!0&&(it=Fi(M,f,E));let Lt=!1,Xe=!1,Qe=!1;const He=it.getUniforms(),Ct=Q.uniforms;if(Oe.useProgram(it.program)&&(Lt=!0,Xe=!0,Qe=!0),M.id!==B&&(B=M.id,Xe=!0),Lt||$!==T){rt.reverseDepthBuffer?(de.copy(T.projectionMatrix),sp(de),rp(de),He.setValue(O,"projectionMatrix",de)):He.setValue(O,"projectionMatrix",T.projectionMatrix),He.setValue(O,"viewMatrix",T.matrixWorldInverse);const ze=He.map.cameraPosition;ze!==void 0&&ze.setValue(O,Ie.setFromMatrixPosition(T.matrixWorld)),rt.logarithmicDepthBuffer&&He.setValue(O,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(M.isMeshPhongMaterial||M.isMeshToonMaterial||M.isMeshLambertMaterial||M.isMeshBasicMaterial||M.isMeshStandardMaterial||M.isShaderMaterial)&&He.setValue(O,"isOrthographic",T.isOrthographicCamera===!0),$!==T&&($=T,Xe=!0,Qe=!0)}if(E.isSkinnedMesh){He.setOptional(O,E,"bindMatrix"),He.setOptional(O,E,"bindMatrixInverse");const ze=E.skeleton;ze&&(ze.boneTexture===null&&ze.computeBoneTexture(),He.setValue(O,"boneTexture",ze.boneTexture,L))}E.isBatchedMesh&&(He.setOptional(O,E,"batchingTexture"),He.setValue(O,"batchingTexture",E._matricesTexture,L),He.setOptional(O,E,"batchingIdTexture"),He.setValue(O,"batchingIdTexture",E._indirectTexture,L),He.setOptional(O,E,"batchingColorTexture"),E._colorsTexture!==null&&He.setValue(O,"batchingColorTexture",E._colorsTexture,L));const Et=v.morphAttributes;if((Et.position!==void 0||Et.normal!==void 0||Et.color!==void 0)&&Pe.update(E,v,it),(Xe||Q.receiveShadow!==E.receiveShadow)&&(Q.receiveShadow=E.receiveShadow,He.setValue(O,"receiveShadow",E.receiveShadow)),M.isMeshGouraudMaterial&&M.envMap!==null&&(Ct.envMap.value=Y,Ct.flipEnvMap.value=Y.isCubeTexture&&Y.isRenderTargetTexture===!1?-1:1),M.isMeshStandardMaterial&&M.envMap===null&&f.environment!==null&&(Ct.envMapIntensity.value=f.environmentIntensity),Xe&&(He.setValue(O,"toneMappingExposure",x.toneMappingExposure),Q.needsLights&&$o(Ct,Qe),U&&M.fog===!0&&ve.refreshFogUniforms(Ct,U),ve.refreshMaterialUniforms(Ct,M,ce,X,g.state.transmissionRenderTarget[T.id]),Co.upload(O,Ar(Q),Ct,L)),M.isShaderMaterial&&M.uniformsNeedUpdate===!0&&(Co.upload(O,Ar(Q),Ct,L),M.uniformsNeedUpdate=!1),M.isSpriteMaterial&&He.setValue(O,"center",E.center),He.setValue(O,"modelViewMatrix",E.modelViewMatrix),He.setValue(O,"normalMatrix",E.normalMatrix),He.setValue(O,"modelMatrix",E.matrixWorld),M.isShaderMaterial||M.isRawShaderMaterial){const ze=M.uniformsGroups;for(let lt=0,_n=ze.length;lt<_n;lt++){const ni=ze[lt];F.update(ni,it),F.bind(ni,it)}}return it}function $o(T,f){T.ambientLightColor.needsUpdate=f,T.lightProbe.needsUpdate=f,T.directionalLights.needsUpdate=f,T.directionalLightShadows.needsUpdate=f,T.pointLights.needsUpdate=f,T.pointLightShadows.needsUpdate=f,T.spotLights.needsUpdate=f,T.spotLightShadows.needsUpdate=f,T.rectAreaLights.needsUpdate=f,T.hemisphereLights.needsUpdate=f}function zn(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(T,f,v){ke.get(T.texture).__webglTexture=f,ke.get(T.depthTexture).__webglTexture=v;const M=ke.get(T);M.__hasExternalTextures=!0,M.__autoAllocateDepthBuffer=v===void 0,M.__autoAllocateDepthBuffer||$e.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),M.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,f){const v=ke.get(T);v.__webglFramebuffer=f,v.__useDefaultFramebuffer=f===void 0},this.setRenderTarget=function(T,f=0,v=0){P=T,I=f,D=v;let M=!0,E=null,U=!1,N=!1;if(T){const Y=ke.get(T);if(Y.__useDefaultFramebuffer!==void 0)Oe.bindFramebuffer(O.FRAMEBUFFER,null),M=!1;else if(Y.__webglFramebuffer===void 0)L.setupRenderTarget(T);else if(Y.__hasExternalTextures)L.rebindTextures(T,ke.get(T.texture).__webglTexture,ke.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const H=T.depthTexture;if(Y.__boundDepthTexture!==H){if(H!==null&&ke.has(H)&&(T.width!==H.image.width||T.height!==H.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");L.setupDepthRenderbuffer(T)}}const W=T.texture;(W.isData3DTexture||W.isDataArrayTexture||W.isCompressedArrayTexture)&&(N=!0);const j=ke.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(j[f])?E=j[f][v]:E=j[f],U=!0):T.samples>0&&L.useMultisampledRTT(T)===!1?E=ke.get(T).__webglMultisampledFramebuffer:Array.isArray(j)?E=j[v]:E=j,S.copy(T.viewport),C.copy(T.scissor),G=T.scissorTest}else S.copy(be).multiplyScalar(ce).floor(),C.copy(Ae).multiplyScalar(ce).floor(),G=Be;if(Oe.bindFramebuffer(O.FRAMEBUFFER,E)&&M&&Oe.drawBuffers(T,E),Oe.viewport(S),Oe.scissor(C),Oe.setScissorTest(G),U){const Y=ke.get(T.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+f,Y.__webglTexture,v)}else if(N){const Y=ke.get(T.texture),W=f||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,Y.__webglTexture,v||0,W)}B=-1},this.readRenderTargetPixels=function(T,f,v,M,E,U,N){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let z=ke.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&N!==void 0&&(z=z[N]),z){Oe.bindFramebuffer(O.FRAMEBUFFER,z);try{const Y=T.texture,W=Y.format,j=Y.type;if(!rt.textureFormatReadable(W)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!rt.textureTypeReadable(j)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}f>=0&&f<=T.width-M&&v>=0&&v<=T.height-E&&O.readPixels(f,v,M,E,Ue.convert(W),Ue.convert(j),U)}finally{const Y=P!==null?ke.get(P).__webglFramebuffer:null;Oe.bindFramebuffer(O.FRAMEBUFFER,Y)}}},this.readRenderTargetPixelsAsync=async function(T,f,v,M,E,U,N){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let z=ke.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&N!==void 0&&(z=z[N]),z){const Y=T.texture,W=Y.format,j=Y.type;if(!rt.textureFormatReadable(W))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!rt.textureTypeReadable(j))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(f>=0&&f<=T.width-M&&v>=0&&v<=T.height-E){Oe.bindFramebuffer(O.FRAMEBUFFER,z);const H=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,H),O.bufferData(O.PIXEL_PACK_BUFFER,U.byteLength,O.STREAM_READ),O.readPixels(f,v,M,E,Ue.convert(W),Ue.convert(j),0);const ie=P!==null?ke.get(P).__webglFramebuffer:null;Oe.bindFramebuffer(O.FRAMEBUFFER,ie);const he=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await ip(O,he,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,H),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,U),O.deleteBuffer(H),O.deleteSync(he),U}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,f=null,v=0){T.isTexture!==!0&&(To("WebGLRenderer: copyFramebufferToTexture function signature has changed."),f=arguments[0]||null,T=arguments[1]);const M=Math.pow(2,-v),E=Math.floor(T.image.width*M),U=Math.floor(T.image.height*M),N=f!==null?f.x:0,z=f!==null?f.y:0;L.setTexture2D(T,0),O.copyTexSubImage2D(O.TEXTURE_2D,v,0,0,N,z,E,U),Oe.unbindTexture()},this.copyTextureToTexture=function(T,f,v=null,M=null,E=0){T.isTexture!==!0&&(To("WebGLRenderer: copyTextureToTexture function signature has changed."),M=arguments[0]||null,T=arguments[1],f=arguments[2],E=arguments[3]||0,v=null);let U,N,z,Y,W,j;v!==null?(U=v.max.x-v.min.x,N=v.max.y-v.min.y,z=v.min.x,Y=v.min.y):(U=T.image.width,N=T.image.height,z=0,Y=0),M!==null?(W=M.x,j=M.y):(W=0,j=0);const H=Ue.convert(f.format),ie=Ue.convert(f.type);L.setTexture2D(f,0),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,f.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,f.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,f.unpackAlignment);const he=O.getParameter(O.UNPACK_ROW_LENGTH),ue=O.getParameter(O.UNPACK_IMAGE_HEIGHT),we=O.getParameter(O.UNPACK_SKIP_PIXELS),re=O.getParameter(O.UNPACK_SKIP_ROWS),Q=O.getParameter(O.UNPACK_SKIP_IMAGES),Te=T.isCompressedTexture?T.mipmaps[E]:T.image;O.pixelStorei(O.UNPACK_ROW_LENGTH,Te.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Te.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,z),O.pixelStorei(O.UNPACK_SKIP_ROWS,Y),T.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,E,W,j,U,N,H,ie,Te.data):T.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,E,W,j,Te.width,Te.height,H,Te.data):O.texSubImage2D(O.TEXTURE_2D,E,W,j,U,N,H,ie,Te),O.pixelStorei(O.UNPACK_ROW_LENGTH,he),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ue),O.pixelStorei(O.UNPACK_SKIP_PIXELS,we),O.pixelStorei(O.UNPACK_SKIP_ROWS,re),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Q),E===0&&f.generateMipmaps&&O.generateMipmap(O.TEXTURE_2D),Oe.unbindTexture()},this.copyTextureToTexture3D=function(T,f,v=null,M=null,E=0){T.isTexture!==!0&&(To("WebGLRenderer: copyTextureToTexture3D function signature has changed."),v=arguments[0]||null,M=arguments[1]||null,T=arguments[2],f=arguments[3],E=arguments[4]||0);let U,N,z,Y,W,j,H,ie,he;const ue=T.isCompressedTexture?T.mipmaps[E]:T.image;v!==null?(U=v.max.x-v.min.x,N=v.max.y-v.min.y,z=v.max.z-v.min.z,Y=v.min.x,W=v.min.y,j=v.min.z):(U=ue.width,N=ue.height,z=ue.depth,Y=0,W=0,j=0),M!==null?(H=M.x,ie=M.y,he=M.z):(H=0,ie=0,he=0);const we=Ue.convert(f.format),re=Ue.convert(f.type);let Q;if(f.isData3DTexture)L.setTexture3D(f,0),Q=O.TEXTURE_3D;else if(f.isDataArrayTexture||f.isCompressedArrayTexture)L.setTexture2DArray(f,0),Q=O.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,f.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,f.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,f.unpackAlignment);const Te=O.getParameter(O.UNPACK_ROW_LENGTH),Ce=O.getParameter(O.UNPACK_IMAGE_HEIGHT),it=O.getParameter(O.UNPACK_SKIP_PIXELS),Lt=O.getParameter(O.UNPACK_SKIP_ROWS),Xe=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,ue.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ue.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Y),O.pixelStorei(O.UNPACK_SKIP_ROWS,W),O.pixelStorei(O.UNPACK_SKIP_IMAGES,j),T.isDataTexture||T.isData3DTexture?O.texSubImage3D(Q,E,H,ie,he,U,N,z,we,re,ue.data):f.isCompressedArrayTexture?O.compressedTexSubImage3D(Q,E,H,ie,he,U,N,z,we,ue.data):O.texSubImage3D(Q,E,H,ie,he,U,N,z,we,re,ue),O.pixelStorei(O.UNPACK_ROW_LENGTH,Te),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Ce),O.pixelStorei(O.UNPACK_SKIP_PIXELS,it),O.pixelStorei(O.UNPACK_SKIP_ROWS,Lt),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Xe),E===0&&f.generateMipmaps&&O.generateMipmap(Q),Oe.unbindTexture()},this.initRenderTarget=function(T){ke.get(T).__webglFramebuffer===void 0&&L.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?L.setTextureCube(T,0):T.isData3DTexture?L.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?L.setTexture2DArray(T,0):L.setTexture2D(T,0),Oe.unbindTexture()},this.resetState=function(){I=0,D=0,P=null,Oe.reset(),Ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===ec?"display-p3":"srgb",t.unpackColorSpace=at.workingColorSpace===Vo?"display-p3":"srgb"}}class _v extends _t{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Cn,this.environmentIntensity=1,this.environmentRotation=new Cn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class cc{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Dl,this.updateRanges=[],this.version=0,this.uuid=mn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=mn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=mn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Zt=new R;class En{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyMatrix4(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyNormalMatrix(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.transformDirection(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=wn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ct(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=wn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=wn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=wn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=wn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),i=ct(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),i=ct(i,this.array),r=ct(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Bt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new En(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class hd extends An{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new De(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Ji;const zs=new R,Qi=new R,es=new R,ts=new le,Hs=new le,ud=new Le,Kr=new R,Gs=new R,$r=new R,Th=new le,Aa=new le,Ch=new le;class vv extends _t{constructor(e=new hd){if(super(),this.isSprite=!0,this.type="Sprite",Ji===void 0){Ji=new St;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new cc(t,5);Ji.setIndex([0,1,2,0,2,3]),Ji.setAttribute("position",new En(n,3,0,!1)),Ji.setAttribute("uv",new En(n,2,3,!1))}this.geometry=Ji,this.material=e,this.center=new le(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Qi.setFromMatrixScale(this.matrixWorld),ud.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),es.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Qi.multiplyScalar(-es.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const o=this.center;Zr(Kr.set(-.5,-.5,0),es,o,Qi,i,r),Zr(Gs.set(.5,-.5,0),es,o,Qi,i,r),Zr($r.set(.5,.5,0),es,o,Qi,i,r),Th.set(0,0),Aa.set(1,0),Ch.set(1,1);let a=e.ray.intersectTriangle(Kr,Gs,$r,!1,zs);if(a===null&&(Zr(Gs.set(-.5,.5,0),es,o,Qi,i,r),Aa.set(0,1),a=e.ray.intersectTriangle(Kr,$r,Gs,!1,zs),a===null))return;const l=e.ray.origin.distanceTo(zs);l<e.near||l>e.far||t.push({distance:l,point:zs.clone(),uv:fn.getInterpolation(zs,Kr,Gs,$r,Th,Aa,Ch,new le),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Zr(s,e,t,n,i,r){ts.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(Hs.x=r*ts.x-i*ts.y,Hs.y=i*ts.x+r*ts.y):Hs.copy(ts),s.copy(e),s.x+=Hs.x,s.y+=Hs.y,s.applyMatrix4(ud)}const Rh=new R,Ph=new tt,Lh=new tt,xv=new R,Dh=new Le,Jr=new R,Ta=new gn,Ih=new Le,Ca=new Ts;class yv extends Ye{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Dc,this.bindMatrix=new Le,this.bindMatrixInverse=new Le,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Vt),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Jr),this.boundingBox.expandByPoint(Jr)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new gn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Jr),this.boundingSphere.expandByPoint(Jr)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ta.copy(this.boundingSphere),Ta.applyMatrix4(i),e.ray.intersectsSphere(Ta)!==!1&&(Ih.copy(i).invert(),Ca.copy(e.ray).applyMatrix4(Ih),!(this.boundingBox!==null&&Ca.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Ca)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new tt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Dc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Tf?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Ph.fromBufferAttribute(i.attributes.skinIndex,e),Lh.fromBufferAttribute(i.attributes.skinWeight,e),Rh.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=Lh.getComponent(r);if(o!==0){const a=Ph.getComponent(r);Dh.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(xv.copy(Rh).applyMatrix4(Dh),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class dd extends _t{constructor(){super(),this.isBone=!0,this.type="Bone"}}class hc extends Nt{constructor(e=null,t=1,n=1,i,r,o,a,l,c=Kt,h=Kt,u,d){super(null,o,a,l,c,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Nh=new Le,Sv=new Le;class uc{constructor(e=[],t=[]){this.uuid=mn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Le)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Le;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:Sv;Nh.multiplyMatrices(a,t[r]),Nh.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new uc(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new hc(t,e,e,ln,rn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new dd),this.bones.push(o),this.boneInverses.push(new Le().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class Nl extends Bt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ns=new Le,Uh=new Le,Qr=[],Oh=new Vt,Mv=new Le,Vs=new Ye,Ws=new gn;class dc extends Ye{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Nl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Mv)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Vt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ns),Oh.copy(e.boundingBox).applyMatrix4(ns),this.boundingBox.union(Oh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new gn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ns),Ws.copy(e.boundingSphere).applyMatrix4(ns),this.boundingSphere.union(Ws)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Vs.geometry=this.geometry,Vs.material=this.material,Vs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ws.copy(this.boundingSphere),Ws.applyMatrix4(n),e.ray.intersectsSphere(Ws)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,ns),Uh.multiplyMatrices(n,ns),Vs.matrixWorld=Uh,Vs.raycast(e,Qr);for(let o=0,a=Qr.length;o<a;o++){const l=Qr[o];l.instanceId=r,l.object=this,t.push(l)}Qr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Nl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new hc(new Float32Array(i*this.count),i,this.count,Go,rn));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class fd extends An{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new De(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Oo=new R,Fo=new R,Fh=new Le,js=new Ts,eo=new gn,Ra=new R,kh=new R;class fc extends _t{constructor(e=new St,t=new fd){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Oo.fromBufferAttribute(t,i-1),Fo.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Oo.distanceTo(Fo);e.setAttribute("lineDistance",new xt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),eo.copy(n.boundingSphere),eo.applyMatrix4(i),eo.radius+=r,e.ray.intersectsSphere(eo)===!1)return;Fh.copy(i).invert(),js.copy(e.ray).applyMatrix4(Fh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const m=Math.max(0,o.start),b=Math.min(h.count,o.start+o.count);for(let _=m,g=b-1;_<g;_+=c){const p=h.getX(_),w=h.getX(_+1),x=to(this,e,js,l,p,w);x&&t.push(x)}if(this.isLineLoop){const _=h.getX(b-1),g=h.getX(m),p=to(this,e,js,l,_,g);p&&t.push(p)}}else{const m=Math.max(0,o.start),b=Math.min(d.count,o.start+o.count);for(let _=m,g=b-1;_<g;_+=c){const p=to(this,e,js,l,_,_+1);p&&t.push(p)}if(this.isLineLoop){const _=to(this,e,js,l,b-1,m);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function to(s,e,t,n,i,r){const o=s.geometry.attributes.position;if(Oo.fromBufferAttribute(o,i),Fo.fromBufferAttribute(o,r),t.distanceSqToSegment(Oo,Fo,Ra,kh)>n)return;Ra.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(Ra);if(!(l<e.near||l>e.far))return{distance:l,point:kh.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}const Bh=new R,zh=new R;class wv extends fc{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Bh.fromBufferAttribute(t,i),zh.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Bh.distanceTo(zh);e.setAttribute("lineDistance",new xt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Ev extends fc{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class pc extends An{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new De(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Hh=new Le,Ul=new Ts,no=new gn,io=new R;class pd extends _t{constructor(e=new St,t=new pc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),no.copy(n.boundingSphere),no.applyMatrix4(i),no.radius+=r,e.ray.intersectsSphere(no)===!1)return;Hh.copy(i).invert(),Ul.copy(e.ray).applyMatrix4(Hh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),m=Math.min(c.count,o.start+o.count);for(let b=d,_=m;b<_;b++){const g=c.getX(b);io.fromBufferAttribute(u,g),Gh(io,g,l,i,e,t,this)}}else{const d=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let b=d,_=m;b<_;b++)io.fromBufferAttribute(u,b),Gh(io,b,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Gh(s,e,t,n,i,r,o){const a=Ul.distanceSqToPoint(s);if(a<t){const l=new R;Ul.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Li extends Nt{constructor(e,t,n,i,r,o,a,l,c){super(e,t,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class On{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);const h=n[i],d=n[i+1]-h,m=(o-h)/d;return(i+m)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);const o=this.getPoint(i),a=this.getPoint(r),l=t||(o.isVector2?new le:new R);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new R,i=[],r=[],o=[],a=new R,l=new Le;for(let m=0;m<=e;m++){const b=m/e;i[m]=this.getTangentAt(b,new R)}r[0]=new R,o[0]=new R;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let m=1;m<=e;m++){if(r[m]=r[m-1].clone(),o[m]=o[m-1].clone(),a.crossVectors(i[m-1],i[m]),a.length()>Number.EPSILON){a.normalize();const b=Math.acos(Rt(i[m-1].dot(i[m]),-1,1));r[m].applyMatrix4(l.makeRotationAxis(a,b))}o[m].crossVectors(i[m],r[m])}if(t===!0){let m=Math.acos(Rt(r[0].dot(r[e]),-1,1));m/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(m=-m);for(let b=1;b<=e;b++)r[b].applyMatrix4(l.makeRotationAxis(i[b],m*b)),o[b].crossVectors(i[b],r[b])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class mc extends On{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new le){const n=t,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,m=c-this.aY;l=d*h-m*u+this.aX,c=d*u+m*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Av extends mc{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function gc(){let s=0,e=0,t=0,n=0;function i(r,o,a,l){s=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,m=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,m*=h,i(o,a,d,m)},calc:function(r){const o=r*r,a=o*r;return s+e*r+t*o+n*a}}}const so=new R,Pa=new gc,La=new gc,Da=new gc;class md extends On{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new R){const n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%r]:(so.subVectors(i[0],i[1]).add(i[0]),c=so);const u=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(so.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=so),this.curveType==="centripetal"||this.curveType==="chordal"){const m=this.curveType==="chordal"?.5:.25;let b=Math.pow(c.distanceToSquared(u),m),_=Math.pow(u.distanceToSquared(d),m),g=Math.pow(d.distanceToSquared(h),m);_<1e-4&&(_=1),b<1e-4&&(b=_),g<1e-4&&(g=_),Pa.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,b,_,g),La.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,b,_,g),Da.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,b,_,g)}else this.curveType==="catmullrom"&&(Pa.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),La.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Da.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Pa.calc(l),La.calc(l),Da.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new R().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Vh(s,e,t,n,i){const r=(n-e)*.5,o=(i-t)*.5,a=s*s,l=s*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*s+t}function Tv(s,e){const t=1-s;return t*t*e}function Cv(s,e){return 2*(1-s)*s*e}function Rv(s,e){return s*s*e}function sr(s,e,t,n){return Tv(s,e)+Cv(s,t)+Rv(s,n)}function Pv(s,e){const t=1-s;return t*t*t*e}function Lv(s,e){const t=1-s;return 3*t*t*s*e}function Dv(s,e){return 3*(1-s)*s*s*e}function Iv(s,e){return s*s*s*e}function rr(s,e,t,n,i){return Pv(s,e)+Lv(s,t)+Dv(s,n)+Iv(s,i)}class gd extends On{constructor(e=new le,t=new le,n=new le,i=new le){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new le){const n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(rr(e,i.x,r.x,o.x,a.x),rr(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Nv extends On{constructor(e=new R,t=new R,n=new R,i=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new R){const n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(rr(e,i.x,r.x,o.x,a.x),rr(e,i.y,r.y,o.y,a.y),rr(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class bd extends On{constructor(e=new le,t=new le){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new le){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new le){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Uv extends On{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class _d extends On{constructor(e=new le,t=new le,n=new le){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new le){const n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(sr(e,i.x,r.x,o.x),sr(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class vd extends On{constructor(e=new R,t=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new R){const n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(sr(e,i.x,r.x,o.x),sr(e,i.y,r.y,o.y),sr(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class xd extends On{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new le){const n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(Vh(a,l.x,c.x,h.x,u.x),Vh(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new le().fromArray(i))}return this}}var Ol=Object.freeze({__proto__:null,ArcCurve:Av,CatmullRomCurve3:md,CubicBezierCurve:gd,CubicBezierCurve3:Nv,EllipseCurve:mc,LineCurve:bd,LineCurve3:Uv,QuadraticBezierCurve:_d,QuadraticBezierCurve3:vd,SplineCurve:xd});class Ov extends On{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ol[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const o=r[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new Ol[i.type]().fromJSON(i))}return this}}class Fl extends Ov{constructor(e){super(),this.type="Path",this.currentPoint=new le,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new bd(this.currentPoint.clone(),new le(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const r=new _d(this.currentPoint.clone(),new le(e,t),new le(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,o){const a=new gd(this.currentPoint.clone(),new le(e,t),new le(n,i),new le(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new xd(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,i,r,o),this}absarc(e,t,n,i,r,o){return this.absellipse(e,t,n,n,i,r,o),this}ellipse(e,t,n,i,r,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,r,o,a,l),this}absellipse(e,t,n,i,r,o,a,l){const c=new mc(e,t,n,i,r,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class jo extends St{constructor(e=1,t=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],d=[],m=[];let b=0;const _=[],g=n/2;let p=0;w(),o===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new xt(u,3)),this.setAttribute("normal",new xt(d,3)),this.setAttribute("uv",new xt(m,2));function w(){const y=new R,I=new R;let D=0;const P=(t-e)/n;for(let B=0;B<=r;B++){const $=[],S=B/r,C=S*(t-e)+e;for(let G=0;G<=i;G++){const q=G/i,K=q*l+a,se=Math.sin(K),X=Math.cos(K);I.x=C*se,I.y=-S*n+g,I.z=C*X,u.push(I.x,I.y,I.z),y.set(se,P,X).normalize(),d.push(y.x,y.y,y.z),m.push(q,1-S),$.push(b++)}_.push($)}for(let B=0;B<i;B++)for(let $=0;$<r;$++){const S=_[$][B],C=_[$+1][B],G=_[$+1][B+1],q=_[$][B+1];e>0&&(h.push(S,C,q),D+=3),t>0&&(h.push(C,G,q),D+=3)}c.addGroup(p,D,0),p+=D}function x(y){const I=b,D=new le,P=new R;let B=0;const $=y===!0?e:t,S=y===!0?1:-1;for(let G=1;G<=i;G++)u.push(0,g*S,0),d.push(0,S,0),m.push(.5,.5),b++;const C=b;for(let G=0;G<=i;G++){const K=G/i*l+a,se=Math.cos(K),X=Math.sin(K);P.x=$*X,P.y=g*S,P.z=$*se,u.push(P.x,P.y,P.z),d.push(0,S,0),D.x=se*.5+.5,D.y=X*.5*S+.5,m.push(D.x,D.y),b++}for(let G=0;G<i;G++){const q=I+G,K=C+G;y===!0?h.push(K,K+1,q):h.push(K+1,K,q),B+=3}c.addGroup(p,B,y===!0?1:2),p+=B}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jo(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class _r extends jo{constructor(e=1,t=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new _r(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ia extends Fl{constructor(e){super(e),this.uuid=mn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new Fl().fromJSON(i))}return this}}const Fv={triangulate:function(s,e,t=2){const n=e&&e.length,i=n?e[0]*t:s.length;let r=yd(s,0,i,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c,h,u,d,m;if(n&&(r=Gv(s,e,r,t)),s.length>80*t){a=c=s[0],l=h=s[1];for(let b=t;b<i;b+=t)u=s[b],d=s[b+1],u<a&&(a=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);m=Math.max(c-a,h-l),m=m!==0?32767/m:0}return fr(r,o,t,a,l,m,0),o}};function yd(s,e,t,n,i){let r,o;if(i===Qv(s,e,t,n)>0)for(r=e;r<t;r+=n)o=Wh(r,s[r],s[r+1],o);else for(r=t-n;r>=e;r-=n)o=Wh(r,s[r],s[r+1],o);return o&&Xo(o,o.next)&&(mr(o),o=o.next),o}function Ni(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(Xo(t,t.next)||Mt(t.prev,t,t.next)===0)){if(mr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function fr(s,e,t,n,i,r,o){if(!s)return;!o&&r&&qv(s,n,i,r);let a=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,r?Bv(s,n,i,r):kv(s)){e.push(l.i/t|0),e.push(s.i/t|0),e.push(c.i/t|0),mr(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=zv(Ni(s),e,t),fr(s,e,t,n,i,r,2)):o===2&&Hv(s,e,t,n,i,r):fr(Ni(s),e,t,n,i,r,1);break}}}function kv(s){const e=s.prev,t=s,n=s.next;if(Mt(e,t,n)>=0)return!1;const i=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,h=i<r?i<o?i:o:r<o?r:o,u=a<l?a<c?a:c:l<c?l:c,d=i>r?i>o?i:o:r>o?r:o,m=a>l?a>c?a:c:l>c?l:c;let b=n.next;for(;b!==e;){if(b.x>=h&&b.x<=d&&b.y>=u&&b.y<=m&&os(i,a,r,l,o,c,b.x,b.y)&&Mt(b.prev,b,b.next)>=0)return!1;b=b.next}return!0}function Bv(s,e,t,n){const i=s.prev,r=s,o=s.next;if(Mt(i,r,o)>=0)return!1;const a=i.x,l=r.x,c=o.x,h=i.y,u=r.y,d=o.y,m=a<l?a<c?a:c:l<c?l:c,b=h<u?h<d?h:d:u<d?u:d,_=a>l?a>c?a:c:l>c?l:c,g=h>u?h>d?h:d:u>d?u:d,p=kl(m,b,e,t,n),w=kl(_,g,e,t,n);let x=s.prevZ,y=s.nextZ;for(;x&&x.z>=p&&y&&y.z<=w;){if(x.x>=m&&x.x<=_&&x.y>=b&&x.y<=g&&x!==i&&x!==o&&os(a,h,l,u,c,d,x.x,x.y)&&Mt(x.prev,x,x.next)>=0||(x=x.prevZ,y.x>=m&&y.x<=_&&y.y>=b&&y.y<=g&&y!==i&&y!==o&&os(a,h,l,u,c,d,y.x,y.y)&&Mt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;x&&x.z>=p;){if(x.x>=m&&x.x<=_&&x.y>=b&&x.y<=g&&x!==i&&x!==o&&os(a,h,l,u,c,d,x.x,x.y)&&Mt(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;y&&y.z<=w;){if(y.x>=m&&y.x<=_&&y.y>=b&&y.y<=g&&y!==i&&y!==o&&os(a,h,l,u,c,d,y.x,y.y)&&Mt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function zv(s,e,t){let n=s;do{const i=n.prev,r=n.next.next;!Xo(i,r)&&Sd(i,n,n.next,r)&&pr(i,r)&&pr(r,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(r.i/t|0),mr(n),mr(n.next),n=s=r),n=n.next}while(n!==s);return Ni(n)}function Hv(s,e,t,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&$v(o,a)){let l=Md(o,a);o=Ni(o,o.next),l=Ni(l,l.next),fr(o,e,t,n,i,r,0),fr(l,e,t,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function Gv(s,e,t,n){const i=[];let r,o,a,l,c;for(r=0,o=e.length;r<o;r++)a=e[r]*n,l=r<o-1?e[r+1]*n:s.length,c=yd(s,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(Kv(c));for(i.sort(Vv),r=0;r<i.length;r++)t=Wv(i[r],t);return t}function Vv(s,e){return s.x-e.x}function Wv(s,e){const t=jv(s,e);if(!t)return e;const n=Md(t,s);return Ni(n,n.next),Ni(t,t.next)}function jv(s,e){let t=e,n=-1/0,i;const r=s.x,o=s.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){const d=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=r&&d>n&&(n=d,i=t.x<t.next.x?t:t.next,d===r))return i}t=t.next}while(t!==e);if(!i)return null;const a=i,l=i.x,c=i.y;let h=1/0,u;t=i;do r>=t.x&&t.x>=l&&r!==t.x&&os(o<c?r:n,o,l,c,o<c?n:r,o,t.x,t.y)&&(u=Math.abs(o-t.y)/(r-t.x),pr(t,s)&&(u<h||u===h&&(t.x>i.x||t.x===i.x&&Xv(i,t)))&&(i=t,h=u)),t=t.next;while(t!==a);return i}function Xv(s,e){return Mt(s.prev,s,e.prev)<0&&Mt(e.next,s,s.next)<0}function qv(s,e,t,n){let i=s;do i.z===0&&(i.z=kl(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Yv(i)}function Yv(s){let e,t,n,i,r,o,a,l,c=1;do{for(t=s,s=null,r=null,o=0;t;){for(o++,n=t,a=0,e=0;e<c&&(a++,n=n.nextZ,!!n);e++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,a--):(i=n,n=n.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;t=n}r.nextZ=null,c*=2}while(o>1);return s}function kl(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function Kv(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function os(s,e,t,n,i,r,o,a){return(i-o)*(e-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(i-o)*(n-a)}function $v(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!Zv(s,e)&&(pr(s,e)&&pr(e,s)&&Jv(s,e)&&(Mt(s.prev,s,e.prev)||Mt(s,e.prev,e))||Xo(s,e)&&Mt(s.prev,s,s.next)>0&&Mt(e.prev,e,e.next)>0)}function Mt(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function Xo(s,e){return s.x===e.x&&s.y===e.y}function Sd(s,e,t,n){const i=oo(Mt(s,e,t)),r=oo(Mt(s,e,n)),o=oo(Mt(t,n,s)),a=oo(Mt(t,n,e));return!!(i!==r&&o!==a||i===0&&ro(s,t,e)||r===0&&ro(s,n,e)||o===0&&ro(t,s,n)||a===0&&ro(t,e,n))}function ro(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function oo(s){return s>0?1:s<0?-1:0}function Zv(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&Sd(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function pr(s,e){return Mt(s.prev,s,s.next)<0?Mt(s,e,s.next)>=0&&Mt(s,s.prev,e)>=0:Mt(s,e,s.prev)<0||Mt(s,s.next,e)<0}function Jv(s,e){let t=s,n=!1;const i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function Md(s,e){const t=new Bl(s.i,s.x,s.y),n=new Bl(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Wh(s,e,t,n){const i=new Bl(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function mr(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Bl(s,e,t){this.i=s,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Qv(s,e,t,n){let i=0;for(let r=e,o=t-n;r<t;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}class bc{static area(e){const t=e.length;let n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return bc.area(e)<0}static triangulateShape(e,t){const n=[],i=[],r=[];jh(e),Xh(n,e);let o=e.length;t.forEach(jh);for(let l=0;l<t.length;l++)i.push(o),o+=t[l].length,Xh(n,t[l]);const a=Fv.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function jh(s){const e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function Xh(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}class bi extends St{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new R,d=new R,m=[],b=[],_=[],g=[];for(let p=0;p<=n;p++){const w=[],x=p/n;let y=0;p===0&&o===0?y=.5/t:p===n&&l===Math.PI&&(y=-.5/t);for(let I=0;I<=t;I++){const D=I/t;u.x=-e*Math.cos(i+D*r)*Math.sin(o+x*a),u.y=e*Math.cos(o+x*a),u.z=e*Math.sin(i+D*r)*Math.sin(o+x*a),b.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),g.push(D+y,1-x),w.push(c++)}h.push(w)}for(let p=0;p<n;p++)for(let w=0;w<t;w++){const x=h[p][w+1],y=h[p][w],I=h[p+1][w],D=h[p+1][w+1];(p!==0||o>0)&&m.push(x,y,D),(p!==n-1||l<Math.PI)&&m.push(y,I,D)}this.setIndex(m),this.setAttribute("position",new xt(b,3)),this.setAttribute("normal",new xt(_,3)),this.setAttribute("uv",new xt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bi(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class _c extends St{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],l=[],c=[],h=new R,u=new R,d=new R;for(let m=0;m<=n;m++)for(let b=0;b<=i;b++){const _=b/i*r,g=m/n*Math.PI*2;u.x=(e+t*Math.cos(g))*Math.cos(_),u.y=(e+t*Math.cos(g))*Math.sin(_),u.z=t*Math.sin(g),a.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(b/i),c.push(m/n)}for(let m=1;m<=n;m++)for(let b=1;b<=i;b++){const _=(i+1)*m+b-1,g=(i+1)*(m-1)+b-1,p=(i+1)*(m-1)+b,w=(i+1)*m+b;o.push(_,g,w),o.push(g,p,w)}this.setIndex(o),this.setAttribute("position",new xt(a,3)),this.setAttribute("normal",new xt(l,3)),this.setAttribute("uv",new xt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _c(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class vc extends St{constructor(e=new vd(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};const o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new R,l=new R,c=new le;let h=new R;const u=[],d=[],m=[],b=[];_(),this.setIndex(b),this.setAttribute("position",new xt(u,3)),this.setAttribute("normal",new xt(d,3)),this.setAttribute("uv",new xt(m,2));function _(){for(let x=0;x<t;x++)g(x);g(r===!1?t:0),w(),p()}function g(x){h=e.getPointAt(x/t,h);const y=o.normals[x],I=o.binormals[x];for(let D=0;D<=i;D++){const P=D/i*Math.PI*2,B=Math.sin(P),$=-Math.cos(P);l.x=$*y.x+B*I.x,l.y=$*y.y+B*I.y,l.z=$*y.z+B*I.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function p(){for(let x=1;x<=t;x++)for(let y=1;y<=i;y++){const I=(i+1)*(x-1)+(y-1),D=(i+1)*x+(y-1),P=(i+1)*x+y,B=(i+1)*(x-1)+y;b.push(I,D,B),b.push(D,P,B)}}function w(){for(let x=0;x<=t;x++)for(let y=0;y<=i;y++)c.x=x/t,c.y=y/i,m.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new vc(new Ol[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class e0 extends St{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const t=[],n=new Set,i=new R,r=new R;if(e.index!==null){const o=e.attributes.position,a=e.index;let l=e.groups;l.length===0&&(l=[{start:0,count:a.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){const u=l[c],d=u.start,m=u.count;for(let b=d,_=d+m;b<_;b+=3)for(let g=0;g<3;g++){const p=a.getX(b+g),w=a.getX(b+(g+1)%3);i.fromBufferAttribute(o,p),r.fromBufferAttribute(o,w),qh(i,r,n)===!0&&(t.push(i.x,i.y,i.z),t.push(r.x,r.y,r.z))}}}else{const o=e.attributes.position;for(let a=0,l=o.count/3;a<l;a++)for(let c=0;c<3;c++){const h=3*a+c,u=3*a+(c+1)%3;i.fromBufferAttribute(o,h),r.fromBufferAttribute(o,u),qh(i,r,n)===!0&&(t.push(i.x,i.y,i.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new xt(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function qh(s,e,t){const n=`${s.x},${s.y},${s.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${s.x},${s.y},${s.z}`;return t.has(n)===!0||t.has(i)===!0?!1:(t.add(n),t.add(i),!0)}class SS extends cn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class xc extends An{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new De(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new De(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ku,this.normalScale=new le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Fn extends xc{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new le(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Rt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new De(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new De(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new De(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function ao(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function t0(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function n0(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Yh(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let l=0;l!==e;++l)i[o++]=s[a+l]}return i}function wd(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}class vr{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class i0 extends vr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ic,endingEnd:Ic}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,o=e+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Nc:r=e,a=2*t-n;break;case Uc:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Nc:o=e,l=2*n-t;break;case Uc:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,m=this._weightNext,b=(n-t)/(i-t),_=b*b,g=_*b,p=-d*g+2*d*_-d*b,w=(1+d)*g+(-1.5-2*d)*_+(-.5+d)*b+1,x=(-1-m)*g+(1.5+m)*_+.5*b,y=m*g-m*_;for(let I=0;I!==a;++I)r[I]=p*o[h+I]+w*o[c+I]+x*o[l+I]+y*o[u+I];return r}}class s0 extends vr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}}class r0 extends vr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class kn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ao(t,this.TimeBufferType),this.values=ao(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ao(e.times,Array),values:ao(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new r0(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new s0(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new i0(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case hr:t=this.InterpolantFactoryMethodDiscrete;break;case ur:t=this.InterpolantFactoryMethodLinear;break;case Zo:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return hr;case this.InterpolantFactoryMethodLinear:return ur;case this.InterpolantFactoryMethodSmooth:return Zo}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&t0(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Zo,r=e.length-1;let o=1;for(let a=1;a<r;++a){let l=!1;const c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{const u=a*n,d=u-n,m=u+n;for(let b=0;b!==n;++b){const _=t[u+b];if(_!==t[d+b]||_!==t[m+b]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const u=a*n,d=o*n;for(let m=0;m!==n;++m)t[d+m]=t[u+m]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}kn.prototype.TimeBufferType=Float32Array;kn.prototype.ValueBufferType=Float32Array;kn.prototype.DefaultInterpolation=ur;class Rs extends kn{constructor(e,t,n){super(e,t,n)}}Rs.prototype.ValueTypeName="bool";Rs.prototype.ValueBufferType=Array;Rs.prototype.DefaultInterpolation=hr;Rs.prototype.InterpolantFactoryMethodLinear=void 0;Rs.prototype.InterpolantFactoryMethodSmooth=void 0;class Ed extends kn{}Ed.prototype.ValueTypeName="color";class Ms extends kn{}Ms.prototype.ValueTypeName="number";class o0 extends vr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let h=c+a;c!==h;c+=4)$t.slerpFlat(r,0,o,c-a,o,c,l);return r}}class ws extends kn{InterpolantFactoryMethodLinear(e){return new o0(this.times,this.values,this.getValueSize(),e)}}ws.prototype.ValueTypeName="quaternion";ws.prototype.InterpolantFactoryMethodSmooth=void 0;class Ps extends kn{constructor(e,t,n){super(e,t,n)}}Ps.prototype.ValueTypeName="string";Ps.prototype.ValueBufferType=Array;Ps.prototype.DefaultInterpolation=hr;Ps.prototype.InterpolantFactoryMethodLinear=void 0;Ps.prototype.InterpolantFactoryMethodSmooth=void 0;class Es extends kn{}Es.prototype.ValueTypeName="vector";class a0{constructor(e="",t=-1,n=[],i=Cf){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=mn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(c0(n[o]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(kn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);const h=n0(l);l=Yh(l,1,h),c=Yh(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new Ms(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],h=c.name.match(r);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,m,b,_){if(m.length!==0){const g=[],p=[];wd(m,g,p,b),g.length!==0&&_.push(new u(d,g,p))}},i=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const m={};let b;for(b=0;b<d.length;b++)if(d[b].morphTargets)for(let _=0;_<d[b].morphTargets.length;_++)m[d[b].morphTargets[_]]=-1;for(const _ in m){const g=[],p=[];for(let w=0;w!==d[b].morphTargets.length;++w){const x=d[b];g.push(x.time),p.push(x.morphTarget===_?1:0)}i.push(new Ms(".morphTargetInfluence["+_+"]",g,p))}l=m.length*o}else{const m=".bones["+t[u].name+"]";n(Es,m+".position",d,"pos",i),n(ws,m+".quaternion",d,"rot",i),n(Es,m+".scale",d,"scl",i)}}return i.length===0?null:new this(r,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function l0(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ms;case"vector":case"vector2":case"vector3":case"vector4":return Es;case"color":return Ed;case"quaternion":return ws;case"bool":case"boolean":return Rs;case"string":return Ps}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function c0(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=l0(s.type);if(s.times===void 0){const t=[],n=[];wd(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const di={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class h0{constructor(e,t,n){const i=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const m=c[u],b=c[u+1];if(m.global&&(m.lastIndex=0),m.test(h))return b}return null}}}const u0=new h0;class ti{constructor(e){this.manager=e!==void 0?e:u0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}ti.DEFAULT_MATERIAL_NAME="__DEFAULT";const Xn={};class d0 extends Error{constructor(e,t){super(e),this.response=t}}class qo extends ti{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=di.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Xn[e]!==void 0){Xn[e].push({onLoad:t,onProgress:n,onError:i});return}Xn[e]=[],Xn[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=Xn[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),m=d?parseInt(d):0,b=m!==0;let _=0;const g=new ReadableStream({start(p){w();function w(){u.read().then(({done:x,value:y})=>{if(x)p.close();else{_+=y.byteLength;const I=new ProgressEvent("progress",{lengthComputable:b,loaded:_,total:m});for(let D=0,P=h.length;D<P;D++){const B=h[D];B.onProgress&&B.onProgress(I)}p.enqueue(y),w()}},x=>{p.error(x)})}}});return new Response(g)}else throw new d0(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,m=new TextDecoder(d);return c.arrayBuffer().then(b=>m.decode(b))}}}).then(c=>{di.add(e,c);const h=Xn[e];delete Xn[e];for(let u=0,d=h.length;u<d;u++){const m=h[u];m.onLoad&&m.onLoad(c)}}).catch(c=>{const h=Xn[e];if(h===void 0)throw this.manager.itemError(e),c;delete Xn[e];for(let u=0,d=h.length;u<d;u++){const m=h[u];m.onError&&m.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class Ad extends ti{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=di.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=dr("img");function l(){h(),di.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(u){h(),i&&i(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class f0 extends ti{constructor(e){super(e)}load(e,t,n,i){const r=new rc;r.colorSpace=vt;const o=new Ad(this.manager);o.setCrossOrigin(this.crossOrigin),o.setPath(this.path);let a=0;function l(c){o.load(e[c],function(h){r.images[c]=h,a++,a===6&&(r.needsUpdate=!0,t&&t(r))},void 0,i)}for(let c=0;c<e.length;++c)l(c);return r}}class p0 extends ti{constructor(e){super(e)}load(e,t,n,i){const r=this,o=new hc,a=new qo(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(r.withCredentials),a.load(e,function(l){let c;try{c=r.parse(l)}catch(h){if(i!==void 0)i(h);else{console.error(h);return}}c.image!==void 0?o.image=c.image:c.data!==void 0&&(o.image.width=c.width,o.image.height=c.height,o.image.data=c.data),o.wrapS=c.wrapS!==void 0?c.wrapS:Nn,o.wrapT=c.wrapT!==void 0?c.wrapT:Nn,o.magFilter=c.magFilter!==void 0?c.magFilter:Pt,o.minFilter=c.minFilter!==void 0?c.minFilter:Pt,o.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(o.colorSpace=c.colorSpace),c.flipY!==void 0&&(o.flipY=c.flipY),c.format!==void 0&&(o.format=c.format),c.type!==void 0&&(o.type=c.type),c.mipmaps!==void 0&&(o.mipmaps=c.mipmaps,o.minFilter=Un),c.mipmapCount===1&&(o.minFilter=Pt),c.generateMipmaps!==void 0&&(o.generateMipmaps=c.generateMipmaps),o.needsUpdate=!0,t&&t(o,c)},n,i),o}}class ko extends ti{constructor(e){super(e)}load(e,t,n,i){const r=new Nt,o=new Ad(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class Yo extends _t{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new De(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Na=new Le,Kh=new R,$h=new R;class yc{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new le(512,512),this.map=null,this.mapPass=null,this.matrix=new Le,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new oc,this._frameExtents=new le(1,1),this._viewportCount=1,this._viewports=[new tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Kh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Kh),$h.setFromMatrixPosition(e.target.matrixWorld),t.lookAt($h),t.updateMatrixWorld(),Na.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Na),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Na)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class m0 extends yc{constructor(){super(new Qt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=ys*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class g0 extends Yo{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(_t.DEFAULT_UP),this.updateMatrix(),this.target=new _t,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new m0}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Zh=new Le,Xs=new R,Ua=new R;class b0 extends yc{constructor(){super(new Qt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new le(4,2),this._viewportCount=6,this._viewports=[new tt(2,1,1,1),new tt(0,1,1,1),new tt(3,1,1,1),new tt(1,1,1,1),new tt(3,0,1,1),new tt(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Xs.setFromMatrixPosition(e.matrixWorld),n.position.copy(Xs),Ua.copy(n.position),Ua.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Ua),n.updateMatrixWorld(),i.makeTranslation(-Xs.x,-Xs.y,-Xs.z),Zh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Zh)}}class _0 extends Yo{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new b0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class v0 extends yc{constructor(){super(new ac(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Td extends Yo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(_t.DEFAULT_UP),this.updateMatrix(),this.target=new _t,this.shadow=new v0}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class x0 extends Yo{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class or{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class y0 extends St{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class S0 extends ti{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=di.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{t&&t(c),r.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return di.add(e,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){i&&i(c),di.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});di.add(e,l),r.manager.itemStart(e)}}class MS{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Jh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Jh();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Jh(){return performance.now()}const Sc="\\[\\]\\.:\\/",M0=new RegExp("["+Sc+"]","g"),Mc="[^"+Sc+"]",w0="[^"+Sc.replace("\\.","")+"]",E0=/((?:WC+[\/:])*)/.source.replace("WC",Mc),A0=/(WCOD+)?/.source.replace("WCOD",w0),T0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Mc),C0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Mc),R0=new RegExp("^"+E0+A0+T0+C0+"$"),P0=["material","materials","bones","map"];class L0{constructor(e,t,n){const i=n||ht.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class ht{constructor(e,t,n){this.path=t,this.parsedPath=n||ht.parseTrackName(t),this.node=ht.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new ht.Composite(e,t,n):new ht(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(M0,"")}static parseTrackName(e){const t=R0.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);P0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=ht.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ht.Composite=L0;ht.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ht.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ht.prototype.GetterByBindingType=[ht.prototype._getValue_direct,ht.prototype._getValue_array,ht.prototype._getValue_arrayElement,ht.prototype._getValue_toArray];ht.prototype.SetterByBindingTypeAndVersioning=[[ht.prototype._setValue_direct,ht.prototype._setValue_direct_setNeedsUpdate,ht.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_array,ht.prototype._setValue_array_setNeedsUpdate,ht.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_arrayElement,ht.prototype._setValue_arrayElement_setNeedsUpdate,ht.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_fromArray,ht.prototype._setValue_fromArray_setNeedsUpdate,ht.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class zl extends cc{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){const t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){const t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}}const Qh=new Le;class Cd{constructor(e,t,n=0,i=1/0){this.ray=new Ts(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new ic,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Qh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Qh),this}intersectObject(e,t=!0,n=[]){return Hl(e,this,n,t),n.sort(eu),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)Hl(e[i],this,n,t);return n.sort(eu),n}}function eu(s,e){return s.distance-e.distance}function Hl(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let o=0,a=r.length;o<a;o++)Hl(r[o],e,t,!0)}}class tu{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Rt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Rd{constructor(e,t,n,i){Rd.prototype.isMatrix2=!0,this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=i,this}}const nu=new R,lo=new R;class D0{constructor(e=new R,t=new R){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){nu.subVectors(e,this.start),lo.subVectors(this.end,this.start);const n=lo.dot(lo);let r=lo.dot(nu)/n;return t&&(r=Rt(r,0,1)),r}closestPointToPoint(e,t,n){const i=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(i).add(this.start)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}class I0{constructor(){this.type="ShapePath",this.color=new De,this.subPaths=[],this.currentPath=null}moveTo(e,t){return this.currentPath=new Fl,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,n,i){return this.currentPath.quadraticCurveTo(e,t,n,i),this}bezierCurveTo(e,t,n,i,r,o){return this.currentPath.bezierCurveTo(e,t,n,i,r,o),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(e){function t(p){const w=[];for(let x=0,y=p.length;x<y;x++){const I=p[x],D=new Ia;D.curves=I.curves,w.push(D)}return w}function n(p,w){const x=w.length;let y=!1;for(let I=x-1,D=0;D<x;I=D++){let P=w[I],B=w[D],$=B.x-P.x,S=B.y-P.y;if(Math.abs(S)>Number.EPSILON){if(S<0&&(P=w[D],$=-$,B=w[I],S=-S),p.y<P.y||p.y>B.y)continue;if(p.y===P.y){if(p.x===P.x)return!0}else{const C=S*(p.x-P.x)-$*(p.y-P.y);if(C===0)return!0;if(C<0)continue;y=!y}}else{if(p.y!==P.y)continue;if(B.x<=p.x&&p.x<=P.x||P.x<=p.x&&p.x<=B.x)return!0}}return y}const i=bc.isClockWise,r=this.subPaths;if(r.length===0)return[];let o,a,l;const c=[];if(r.length===1)return a=r[0],l=new Ia,l.curves=a.curves,c.push(l),c;let h=!i(r[0].getPoints());h=e?!h:h;const u=[],d=[];let m=[],b=0,_;d[b]=void 0,m[b]=[];for(let p=0,w=r.length;p<w;p++)a=r[p],_=a.getPoints(),o=i(_),o=e?!o:o,o?(!h&&d[b]&&b++,d[b]={s:new Ia,p:_},d[b].s.curves=a.curves,h&&b++,m[b]=[]):m[b].push({h:a,p:_[0]});if(!d[0])return t(r);if(d.length>1){let p=!1,w=0;for(let x=0,y=d.length;x<y;x++)u[x]=[];for(let x=0,y=d.length;x<y;x++){const I=m[x];for(let D=0;D<I.length;D++){const P=I[D];let B=!0;for(let $=0;$<d.length;$++)n(P.p,d[$].p)&&(x!==$&&w++,B?(B=!1,u[$].push(P)):p=!0);B&&u[x].push(P)}}w>0&&p===!1&&(m=u)}let g;for(let p=0,w=d.length;p<w;p++){l=d[p].s,c.push(l),g=m[p];for(let x=0,y=g.length;x<y;x++)l.holes.push(g[x].h)}return c}}class N0 extends Ui{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ql}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ql);class As{static createButton(e,t={}){const n=document.createElement("button");function i(){let c=null;async function h(m){m.addEventListener("end",u),await e.xr.setSession(m),n.textContent="EXIT VR",c=m}function u(){c.removeEventListener("end",u),n.textContent="ENTER VR",c=null}n.style.display="",n.style.cursor="pointer",n.style.left="calc(50% - 50px)",n.style.width="100px",n.textContent="ENTER VR";const d={...t,optionalFeatures:["local-floor","bounded-floor","layers",...t.optionalFeatures||[]]};n.onmouseenter=function(){n.style.opacity="1.0"},n.onmouseleave=function(){n.style.opacity="0.5"},n.onclick=function(){c===null?navigator.xr.requestSession("immersive-vr",d).then(h):(c.end(),navigator.xr.offerSession!==void 0&&navigator.xr.offerSession("immersive-vr",d).then(h).catch(m=>{console.warn(m)}))},navigator.xr.offerSession!==void 0&&navigator.xr.offerSession("immersive-vr",d).then(h).catch(m=>{console.warn(m)})}function r(){n.style.display="",n.style.cursor="auto",n.style.left="calc(50% - 75px)",n.style.width="150px",n.onmouseenter=null,n.onmouseleave=null,n.onclick=null}function o(){r(),n.textContent="VR NOT SUPPORTED"}function a(c){r(),console.warn("Exception when trying to call xr.isSessionSupported",c),n.textContent="VR NOT ALLOWED"}function l(c){c.style.position="absolute",c.style.bottom="20px",c.style.padding="12px 6px",c.style.border="1px solid #fff",c.style.borderRadius="4px",c.style.background="rgba(0,0,0,0.1)",c.style.color="#fff",c.style.font="normal 13px sans-serif",c.style.textAlign="center",c.style.opacity="0.5",c.style.outline="none",c.style.zIndex="999"}if("xr"in navigator)return n.id="VRButton",n.style.display="none",l(n),navigator.xr.isSessionSupported("immersive-vr").then(function(c){c?i():o(),c&&As.xrSessionIsGranted&&n.click()}).catch(a),n;{const c=document.createElement("a");return window.isSecureContext===!1?(c.href=document.location.href.replace(/^http:/,"https:"),c.innerHTML="WEBXR NEEDS HTTPS"):(c.href="https://immersiveweb.dev/",c.innerHTML="WEBXR NOT AVAILABLE"),c.style.left="calc(50% - 90px)",c.style.width="180px",c.style.textDecoration="none",l(c),c}}static registerSessionGrantedListener(){if(typeof navigator<"u"&&"xr"in navigator){if(/WebXRViewer\//i.test(navigator.userAgent))return;navigator.xr.addEventListener("sessiongranted",()=>{As.xrSessionIsGranted=!0})}}}As.xrSessionIsGranted=!1;As.registerSessionGrantedListener();class Ko{constructor(){this.callbacks={},this.callbacks.base={}}on(e,t){return typeof e>"u"||e===""?(console.warn("wrong names"),!1):typeof t>"u"?(console.warn("wrong callback"),!1):(this.resolveNames(e).forEach(i=>{const r=this.resolveName(i);this.callbacks[r.namespace]instanceof Object||(this.callbacks[r.namespace]={}),this.callbacks[r.namespace][r.value]instanceof Array||(this.callbacks[r.namespace][r.value]=[]),this.callbacks[r.namespace][r.value].push(t)}),this)}off(e){return typeof e>"u"||e===""?(console.warn("wrong name"),!1):(this.resolveNames(e).forEach(n=>{const i=this.resolveName(n);if(i.namespace!=="base"&&i.value==="")delete this.callbacks[i.namespace];else if(i.namespace==="base")for(const r in this.callbacks)this.callbacks[r]instanceof Object&&this.callbacks[r][i.value]instanceof Array&&(delete this.callbacks[r][i.value],Object.keys(this.callbacks[r]).length===0&&delete this.callbacks[r]);else this.callbacks[i.namespace]instanceof Object&&this.callbacks[i.namespace][i.value]instanceof Array&&(delete this.callbacks[i.namespace][i.value],Object.keys(this.callbacks[i.namespace]).length===0&&delete this.callbacks[i.namespace])}),this)}trigger(e,t){if(typeof e>"u"||e==="")return console.warn("wrong name"),!1;let n=null;const i=t instanceof Array?t:[];let r=this.resolveNames(e);if(r=this.resolveName(r[0]),r.namespace==="base")for(const o in this.callbacks)this.callbacks[o]instanceof Object&&this.callbacks[o][r.value]instanceof Array&&this.callbacks[o][r.value].forEach(function(a){a.apply(this,i)});else if(this.callbacks[r.namespace]instanceof Object){if(r.value==="")return console.warn("wrong name"),this;this.callbacks[r.namespace][r.value].forEach(function(o){o.apply(this,i)})}return n}resolveNames(e){let t=e;return t=t.replace(/[^a-zA-Z0-9 ,/.]/g,""),t=t.replace(/[,/]+/g," "),t=t.split(" "),t}resolveName(e){const t={},n=e.split(".");return t.original=e,t.value=n[0],t.namespace="base",n.length>1&&n[1]!==""&&(t.namespace=n[1]),t}}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.17.0
 * @author George Michael Brower
 * @license MIT
 */let Ls=class Ro{constructor(e,t,n,i,r="div"){this.parent=e,this.object=t,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement("div"),this.domElement.classList.add("controller"),this.domElement.classList.add(i),this.$name=document.createElement("div"),this.$name.classList.add("name"),Ro.nextNameID=Ro.nextNameID||0,this.$name.id=`lil-gui-name-${++Ro.nextNameID}`,this.$widget=document.createElement(r),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(e){return this._name=e,this.$name.innerHTML=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.object[this.property]=e,this._callOnChange(),this.updateDisplay(),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}};class U0 extends Ls{constructor(e,t,n){super(e,t,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Gl(s){let e,t;return(e=s.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=s.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=s.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}const O0={isPrimitive:!0,match:s=>typeof s=="string",fromHexString:Gl,toHexString:Gl},gr={isPrimitive:!0,match:s=>typeof s=="number",fromHexString:s=>parseInt(s.substring(1),16),toHexString:s=>"#"+s.toString(16).padStart(6,0)},F0={isPrimitive:!1,match:Array.isArray,fromHexString(s,e,t=1){const n=gr.fromHexString(s);e[0]=(n>>16&255)/255*t,e[1]=(n>>8&255)/255*t,e[2]=(n&255)/255*t},toHexString([s,e,t],n=1){n=255/n;const i=s*n<<16^e*n<<8^t*n<<0;return gr.toHexString(i)}},k0={isPrimitive:!1,match:s=>Object(s)===s,fromHexString(s,e,t=1){const n=gr.fromHexString(s);e.r=(n>>16&255)/255*t,e.g=(n>>8&255)/255*t,e.b=(n&255)/255*t},toHexString({r:s,g:e,b:t},n=1){n=255/n;const i=s*n<<16^e*n<<8^t*n<<0;return gr.toHexString(i)}},B0=[O0,gr,F0,k0];function z0(s){return B0.find(e=>e.match(s))}class H0 extends Ls{constructor(e,t,n,i){super(e,t,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=z0(this.initialValue),this._rgbScale=i,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const r=Gl(this.$text.value);r&&this._setValueFromHexString(r)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class Oa extends Ls{constructor(e,t,n){super(e,t,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",i=>{i.preventDefault(),this.getValue().call(this.object)}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class G0 extends Ls{constructor(e,t,n,i,r,o){super(e,t,n,"number"),this._initInput(),this.min(i),this.max(r);const a=o!==void 0;this.step(a?o:this._getImplicitStep(),a),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=()=>{let p=parseFloat(this.$input.value);isNaN(p)||(this._stepExplicit&&(p=this._snap(p)),this.setValue(this._clamp(p)))},t=p=>{const w=parseFloat(this.$input.value);isNaN(w)||(this._snapClampSetValue(w+p),this.$input.value=this.getValue())},n=p=>{p.code==="Enter"&&this.$input.blur(),p.code==="ArrowUp"&&(p.preventDefault(),t(this._step*this._arrowKeyMultiplier(p))),p.code==="ArrowDown"&&(p.preventDefault(),t(this._step*this._arrowKeyMultiplier(p)*-1))},i=p=>{this._inputFocused&&(p.preventDefault(),t(this._step*this._normalizeMouseWheel(p)))};let r=!1,o,a,l,c,h;const u=5,d=p=>{o=p.clientX,a=l=p.clientY,r=!0,c=this.getValue(),h=0,window.addEventListener("mousemove",m),window.addEventListener("mouseup",b)},m=p=>{if(r){const w=p.clientX-o,x=p.clientY-a;Math.abs(x)>u?(p.preventDefault(),this.$input.blur(),r=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(w)>u&&b()}if(!r){const w=p.clientY-l;h-=w*this._step*this._arrowKeyMultiplier(p),c+h>this._max?h=this._max-c:c+h<this._min&&(h=this._min-c),this._snapClampSetValue(c+h)}l=p.clientY},b=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",m),window.removeEventListener("mouseup",b)},_=()=>{this._inputFocused=!0},g=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",e),this.$input.addEventListener("keydown",n),this.$input.addEventListener("wheel",i,{passive:!1}),this.$input.addEventListener("mousedown",d),this.$input.addEventListener("focus",_),this.$input.addEventListener("blur",g)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=(p,w,x,y,I)=>(p-w)/(x-w)*(I-y)+y,t=p=>{const w=this.$slider.getBoundingClientRect();let x=e(p,w.left,w.right,this._min,this._max);this._snapClampSetValue(x)},n=p=>{this._setDraggingStyle(!0),t(p.clientX),window.addEventListener("mousemove",i),window.addEventListener("mouseup",r)},i=p=>{t(p.clientX)},r=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",r)};let o=!1,a,l;const c=p=>{p.preventDefault(),this._setDraggingStyle(!0),t(p.touches[0].clientX),o=!1},h=p=>{p.touches.length>1||(this._hasScrollBar?(a=p.touches[0].clientX,l=p.touches[0].clientY,o=!0):c(p),window.addEventListener("touchmove",u,{passive:!1}),window.addEventListener("touchend",d))},u=p=>{if(o){const w=p.touches[0].clientX-a,x=p.touches[0].clientY-l;Math.abs(w)>Math.abs(x)?c(p):(window.removeEventListener("touchmove",u),window.removeEventListener("touchend",d))}else p.preventDefault(),t(p.touches[0].clientX)},d=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",u),window.removeEventListener("touchend",d)},m=this._callOnFinishChange.bind(this),b=400;let _;const g=p=>{if(Math.abs(p.deltaX)<Math.abs(p.deltaY)&&this._hasScrollBar)return;p.preventDefault();const x=this._normalizeMouseWheel(p)*this._step;this._snapClampSetValue(this.getValue()+x),this.$input.value=this.getValue(),clearTimeout(_),_=setTimeout(m,b)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",h,{passive:!1}),this.$slider.addEventListener("wheel",g,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),t+-n}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){const t=Math.round(e/this._step)*this._step;return parseFloat(t.toPrecision(15))}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class V0 extends Ls{constructor(e,t,n,i){super(e,t,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this._values=Array.isArray(i)?i:Object.values(i),this._names=Array.isArray(i)?i:Object.keys(i),this._names.forEach(r=>{const o=document.createElement("option");o.innerHTML=r,this.$select.appendChild(o)}),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.updateDisplay()}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.innerHTML=t===-1?e:this._names[t],this}}class W0 extends Ls{constructor(e,t,n){super(e,t,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",i=>{i.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}const j0=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  background-color: var(--background-color);
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean .widget {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background-color: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background-color: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background-color: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  height: var(--title-height);
  line-height: calc(var(--title-height) - 4px);
  font-weight: 600;
  padding: 0 var(--padding);
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  outline: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "▸";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui input {
  -webkit-tap-highlight-color: transparent;
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input::-webkit-outer-spin-button,
.lil-gui input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.lil-gui input[type=number] {
  -moz-appearance: textfield;
}
.lil-gui input[type=checkbox] {
  appearance: none;
  -webkit-appearance: none;
  height: var(--checkbox-size);
  width: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  -webkit-tap-highlight-color: transparent;
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  border: 1px solid var(--widget-color);
  text-align: center;
  line-height: calc(var(--widget-height) - 4px);
}
@media (hover: hover) {
  .lil-gui button:hover {
    background: var(--hover-color);
    border-color: var(--hover-color);
  }
  .lil-gui button:focus {
    border-color: var(--focus-color);
  }
}
.lil-gui button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function X0(s){const e=document.createElement("style");e.innerHTML=s;const t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}let iu=!1;class wc{constructor({parent:e,autoPlace:t=e===void 0,container:n,width:i,title:r="Controls",injectStyles:o=!0,touchStyles:a=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",l=>{(l.code==="Enter"||l.code==="Space")&&(l.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(r),a&&this.domElement.classList.add("allow-touch-styles"),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),!iu&&o&&(X0(j0),iu=!0),n?n.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),i&&this.domElement.style.setProperty("--width",i+"px"),this.domElement.addEventListener("keydown",l=>l.stopPropagation()),this.domElement.addEventListener("keyup",l=>l.stopPropagation())}add(e,t,n,i,r){if(Object(n)===n)return new V0(this,e,t,n);const o=e[t];switch(typeof o){case"number":return new G0(this,e,t,n,i,r);case"boolean":return new U0(this,e,t);case"string":return new W0(this,e,t);case"function":return new Oa(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,o)}addColor(e,t,n=1){return new H0(this,e,t,n)}addFolder(e){return new wc({parent:this,title:e})}load(e,t=!0){return e.controllers&&this.controllers.forEach(n=>{n instanceof Oa||n._name in e.controllers&&n.load(e.controllers[n._name])}),t&&e.folders&&this.folders.forEach(n=>{n._title in e.folders&&n.load(e.folders[n._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof Oa)){if(n._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);t.controllers[n._name]=n.save()}}),e&&this.folders.forEach(n=>{if(n._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);t.folders[n._title]=n.save()}),t}open(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");const n=r=>{r.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const i=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=i+"px"})}),this}title(e){return this._title=e,this.$title.innerHTML=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}class q0{constructor(e=window.location.hash==="#debug"){this.active=e,this.active&&(this.ui=new wc)}}class Y0 extends Ko{constructor(){super(),this.width=window.innerWidth,this.height=window.innerHeight,this.pixelRatio=Math.min(window.devicePixelRatio,2),this.onResize=()=>{this.width=window.innerWidth,this.height=window.innerHeight,this.pixelRatio=Math.min(window.devicePixelRatio,2),this.trigger("resize")},window.addEventListener("resize",this.onResize)}dispose(){window.removeEventListener("resize",this.onResize)}}class K0 extends Ko{constructor(){super(),this.start=Date.now(),this.current=this.start,this.elapsed=0,this.delta=16,this.running=!0,window.requestAnimationFrame(()=>{this.tick()})}tick(){if(!this.running)return;const e=Date.now();this.delta=e-this.current,this.current=e,this.elapsed=this.current-this.start,this.trigger("tick"),window.requestAnimationFrame(()=>{this.tick()})}stop(){this.running=!1}}function su(s,e){if(e===Rf)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===Ll||e===Yu){let t=s.getIndex();if(t===null){const o=[],a=s.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);s.setIndex(o),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===Ll)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}class br extends ti{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new ex(t)}),this.register(function(t){return new tx(t)}),this.register(function(t){return new hx(t)}),this.register(function(t){return new ux(t)}),this.register(function(t){return new dx(t)}),this.register(function(t){return new ix(t)}),this.register(function(t){return new sx(t)}),this.register(function(t){return new rx(t)}),this.register(function(t){return new ox(t)}),this.register(function(t){return new Q0(t)}),this.register(function(t){return new ax(t)}),this.register(function(t){return new nx(t)}),this.register(function(t){return new cx(t)}),this.register(function(t){return new lx(t)}),this.register(function(t){return new Z0(t)}),this.register(function(t){return new fx(t)}),this.register(function(t){return new px(t)})}load(e,t,n,i){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=or.extractUrlBase(e);o=or.resolveURL(c,this.path)}else o=or.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new qo(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const o={},a={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Pd){try{o[et.KHR_BINARY_GLTF]=new mx(e)}catch(u){i&&i(u);return}r=JSON.parse(o[et.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new Cx(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case et.KHR_MATERIALS_UNLIT:o[u]=new J0;break;case et.KHR_DRACO_MESH_COMPRESSION:o[u]=new gx(r,this.dracoLoader);break;case et.KHR_TEXTURE_TRANSFORM:o[u]=new bx;break;case et.KHR_MESH_QUANTIZATION:o[u]=new _x;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function $0(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}const et={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Z0{constructor(e){this.parser=e,this.name=et.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const h=new De(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Ut);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Td(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new _0(h),c.distance=u;break;case"spot":c=new g0(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,Yn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class J0{constructor(){this.name=et.KHR_MATERIALS_UNLIT}getMaterialType(){return pt}extendParams(e,t,n){const i=[];e.color=new De(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Ut),e.opacity=o[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,vt))}return Promise.all(i)}}class Q0{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class ex{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new le(a,a)}return Promise.all(r)}}class tx{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class nx{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class ix{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new De(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Ut)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,vt)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class sx{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class rx{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new De().setRGB(a[0],a[1],a[2],Ut),Promise.all(r)}}class ox{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class ax{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new De().setRGB(a[0],a[1],a[2],Ut),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,vt)),Promise.all(r)}}class lx{constructor(e){this.parser=e,this.name=et.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}}class cx{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class hx{constructor(e){this.parser=e,this.name=et.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}}class ux{constructor(e){this.parser=e,this.name=et.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class dx{constructor(e){this.parser=e,this.name=et.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class fx{constructor(e){this.name=et.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(m){return m.buffer}):o.ready.then(function(){const m=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(m),h,u,d,i.mode,i.filter),m})})}else return null}}class px{constructor(e){this.name=et.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==un.TRIANGLES&&c.mode!==un.TRIANGLE_STRIP&&c.mode!==un.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,m=[];for(const b of u){const _=new Le,g=new R,p=new $t,w=new R(1,1,1),x=new dc(b.geometry,b.material,d);for(let y=0;y<d;y++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,y),l.SCALE&&w.fromBufferAttribute(l.SCALE,y),x.setMatrixAt(y,_.compose(g,p,w));for(const y in l)if(y==="_COLOR_0"){const I=l[y];x.instanceColor=new Nl(I.array,I.itemSize,I.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&b.geometry.setAttribute(y,l[y]);_t.prototype.copy.call(x,b),this.parser.assignFinalMaterial(x),m.push(x)}return h.isGroup?(h.clear(),h.add(...m),h):m[0]}))}}const Pd="glTF",qs=12,ru={JSON:1313821514,BIN:5130562};class mx{constructor(e){this.name=et.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,qs),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Pd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-qs,r=new DataView(e,qs);let o=0;for(;o<i;){const a=r.getUint32(o,!0);o+=4;const l=r.getUint32(o,!0);if(o+=4,l===ru.JSON){const c=new Uint8Array(e,qs+o,a);this.content=n.decode(c)}else if(l===ru.BIN){const c=qs+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class gx{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=et.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const h in o){const u=Vl[h]||h.toLowerCase();a[u]=o[h]}for(const h in e.attributes){const u=Vl[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[e.attributes[h]],m=fs[d.componentType];c[u]=m.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(m){for(const b in m.attributes){const _=m.attributes[b],g=l[b];g!==void 0&&(_.normalized=g)}u(m)},a,c,Ut,d)})})}}class bx{constructor(){this.name=et.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class _x{constructor(){this.name=et.KHR_MESH_QUANTIZATION}}class Ld extends vr{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=i-t,u=(n-t)/h,d=u*u,m=d*u,b=e*c,_=b-c,g=-2*m+3*d,p=m-d,w=1-g,x=p-d+u;for(let y=0;y!==a;y++){const I=o[_+y+a],D=o[_+y+l]*h,P=o[b+y+a],B=o[b+y]*h;r[y]=w*I+x*D+g*P+p*B}return r}}const vx=new $t;class xx extends Ld{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return vx.fromArray(r).normalize().toArray(r),r}}const un={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},fs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},ou={9728:Kt,9729:Pt,9984:ku,9985:yo,9986:Qs,9987:Un},au={33071:Nn,33648:Lo,10497:_s},Fa={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Vl={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ci={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},yx={CUBICSPLINE:void 0,LINEAR:ur,STEP:hr},ka={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Sx(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new xc({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Qn})),s.DefaultMaterial}function wi(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Yn(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Mx(s,e,t){let n=!1,i=!1,r=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const o=[],a=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;o.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;a.push(d)}if(r){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;l.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function wx(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Ex(s){let e;const t=s.extensions&&s.extensions[et.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Ba(t.attributes):e=s.indices+":"+Ba(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+Ba(s.targets[n]);return e}function Ba(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Wl(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Ax(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const Tx=new Le;class Cx{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new $0,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&o<98?this.textureLoader=new ko(this.options.manager):this.textureLoader=new S0(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new qo(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return wi(r,a,i),Yn(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,h]of o.children.entries())r(h,a.children[c])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[et.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,o){n.load(or.resolveURL(t.uri,i.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=Fa[i.type],a=fs[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new Bt(c,o,l))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],l=Fa[i.type],c=fs[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,m=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,b=i.normalized===!0;let _,g;if(m&&m!==u){const p=Math.floor(d/m),w="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let x=t.cache.get(w);x||(_=new c(a,p*m,i.count*m/h),x=new cc(_,m/h),t.cache.add(w,x)),g=new En(x,l,d%m/h,b)}else a===null?_=new c(i.count*l):_=new c(a,d,i.count*l),g=new Bt(_,l,b);if(i.sparse!==void 0){const p=Fa.SCALAR,w=fs[i.sparse.indices.componentType],x=i.sparse.indices.byteOffset||0,y=i.sparse.values.byteOffset||0,I=new w(o[1],x,i.sparse.count*p),D=new c(o[2],y,i.sparse.count*l);a!==null&&(g=new Bt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let P=0,B=I.length;P<B;P++){const $=I[P];if(g.setX($,D[P*l]),l>=2&&g.setY($,D[P*l+1]),l>=3&&g.setZ($,D[P*l+2]),l>=4&&g.setW($,D[P*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=b}return g})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){const i=this,r=this.json,o=r.textures[e],a=r.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(r.samplers||{})[o.sampler]||{};return h.magFilter=ou[d.magFilter]||Pt,h.minFilter=ou[d.minFilter]||Un,h.wrapS=au[d.wrapS]||_s,h.wrapT=au[d.wrapT]||_s,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:o.mimeType});return l=a.createObjectURL(d),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,m){let b=d;t.isImageBitmapLoader===!0&&(b=function(_){const g=new Nt(_);g.needsUpdate=!0,d(g)}),t.load(or.resolveURL(u,r.path),b,void 0,m)})}).then(function(u){return c===!0&&a.revokeObjectURL(l),Yn(u,o),u.userData.mimeType=o.mimeType||Ax(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[et.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[et.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=r.associations.get(o);o=r.extensions[et.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new pc,An.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new fd,An.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||r||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return xc}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let o;const a={},l=r.extensions||{},c=[];if(l[et.KHR_MATERIALS_UNLIT]){const u=i[et.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),c.push(u.extendParams(a,r,t))}else{const u=r.pbrMetallicRoughness||{};if(a.color=new De(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Ut),a.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",u.baseColorTexture,vt)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=en);const h=r.alphaMode||ka.OPAQUE;if(h===ka.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===ka.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==pt&&(c.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new le(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==pt&&(c.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==pt){const u=r.emissiveFactor;a.emissive=new De().setRGB(u[0],u[1],u[2],Ut)}return r.emissiveTexture!==void 0&&o!==pt&&c.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,vt)),Promise.all(c).then(function(){const u=new o(a);return r.name&&(u.name=r.name),Yn(u,r),t.associations.set(u,{materials:e}),r.extensions&&wi(i,u,r),u})}createUniqueName(e){const t=ht.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[et.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return lu(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],h=Ex(c),u=i[h];if(u)o.push(u.promise);else{let d;c.extensions&&c.extensions[et.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=lu(new St,c,t),i[h]={primitive:c,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const h=o[l].material===void 0?Sx(this.cache):this.getDependency("material",o[l].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let m=0,b=h.length;m<b;m++){const _=h[m],g=o[m];let p;const w=c[m];if(g.mode===un.TRIANGLES||g.mode===un.TRIANGLE_STRIP||g.mode===un.TRIANGLE_FAN||g.mode===void 0)p=r.isSkinnedMesh===!0?new yv(_,w):new Ye(_,w),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),g.mode===un.TRIANGLE_STRIP?p.geometry=su(p.geometry,Yu):g.mode===un.TRIANGLE_FAN&&(p.geometry=su(p.geometry,Ll));else if(g.mode===un.LINES)p=new wv(_,w);else if(g.mode===un.LINE_STRIP)p=new fc(_,w);else if(g.mode===un.LINE_LOOP)p=new Ev(_,w);else if(g.mode===un.POINTS)p=new pd(_,w);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&wx(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Yn(p,r),g.extensions&&wi(i,p,g),t.assignFinalMaterial(p),u.push(p)}for(let m=0,b=u.length;m<b;m++)t.associations.set(u[m],{meshes:e,primitives:m});if(u.length===1)return r.extensions&&wi(i,u[0],r),u[0];const d=new gt;r.extensions&&wi(i,d,r),t.associations.set(d,{meshes:e});for(let m=0,b=u.length;m<b;m++)d.add(u[m]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Qt(dt.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new ac(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Yn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),o=i,a=[],l=[];for(let c=0,h=o.length;c<h;c++){const u=o[c];if(u){a.push(u);const d=new Le;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new uc(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const m=i.channels[u],b=i.samplers[m.sampler],_=m.target,g=_.node,p=i.parameters!==void 0?i.parameters[b.input]:b.input,w=i.parameters!==void 0?i.parameters[b.output]:b.output;_.node!==void 0&&(o.push(this.getDependency("node",g)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",w)),c.push(b),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],m=u[1],b=u[2],_=u[3],g=u[4],p=[];for(let w=0,x=d.length;w<x;w++){const y=d[w],I=m[w],D=b[w],P=_[w],B=g[w];if(y===void 0)continue;y.updateMatrix&&y.updateMatrix();const $=n._createAnimationTracks(y,I,D,P,B);if($)for(let S=0;S<$.length;S++)p.push($[S])}return new a0(r,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,h=a.length;c<h;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(m){m.isSkinnedMesh&&m.bind(d,Tx)});for(let m=0,b=u.length;m<b;m++)h.add(u[m]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],o=r.name?i.createUniqueName(r.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let h;if(r.isBone===!0?h=new dd:c.length>1?h=new gt:c.length===1?h=c[0]:h=new _t,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=o),Yn(h,r),r.extensions&&wi(n,h,r),r.matrix!==void 0){const u=new Le;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,r=new gt;n.name&&(r.name=i.createUniqueName(n.name)),Yn(r,n),n.extensions&&wi(t,r,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let h=0,u=l.length;h<u;h++)r.add(l[h]);const c=h=>{const u=new Map;for(const[d,m]of i.associations)(d instanceof An||d instanceof Nt)&&u.set(d,m);return h.traverse(d=>{const m=i.associations.get(d);m!=null&&u.set(d,m)}),u};return i.associations=c(r),r})}_createAnimationTracks(e,t,n,i,r){const o=[],a=e.name?e.name:e.uuid,l=[];ci[r.path]===ci.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(a);let c;switch(ci[r.path]){case ci.weights:c=Ms;break;case ci.rotation:c=ws;break;case ci.position:case ci.scale:c=Es;break;default:switch(n.itemSize){case 1:c=Ms;break;case 2:case 3:default:c=Es;break}break}const h=i.interpolation!==void 0?yx[i.interpolation]:ur,u=this._getArrayFromAccessor(n);for(let d=0,m=l.length;d<m;d++){const b=new c(l[d]+"."+ci[r.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(b),o.push(b)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Wl(t.constructor),i=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof ws?xx:Ld;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Rx(s,e,t){const n=e.attributes,i=new Vt;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new R(l[0],l[1],l[2]),new R(c[0],c[1],c[2])),a.normalized){const h=Wl(fs[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new R,l=new R;for(let c=0,h=r.length;c<h;c++){const u=r[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],m=d.min,b=d.max;if(m!==void 0&&b!==void 0){if(l.setX(Math.max(Math.abs(m[0]),Math.abs(b[0]))),l.setY(Math.max(Math.abs(m[1]),Math.abs(b[1]))),l.setZ(Math.max(Math.abs(m[2]),Math.abs(b[2]))),d.normalized){const _=Wl(fs[d.componentType]);l.multiplyScalar(_)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}s.boundingBox=i;const o=new gn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=o}function lu(s,e,t){const n=e.attributes,i=[];function r(o,a){return t.getDependency("accessor",o).then(function(l){s.setAttribute(a,l)})}for(const o in n){const a=Vl[o]||o.toLowerCase();a in s.attributes||i.push(r(n[o],a))}if(e.indices!==void 0&&!s.index){const o=t.getDependency("accessor",e.indices).then(function(a){s.setIndex(a)});i.push(o)}return at.workingColorSpace!==Ut&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${at.workingColorSpace}" not supported.`),Yn(s,e),Rx(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?Mx(s,e.targets,t):s})}class Px extends ti{constructor(e){super(e)}load(e,t,n,i){const r=this,o=new qo(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(a){const l=r.parse(JSON.parse(a));t&&t(l)},n,i)}parse(e){return new Lx(e)}}class Lx{constructor(e){this.isFont=!0,this.type="Font",this.data=e}generateShapes(e,t=100){const n=[],i=Dx(e,t,this.data);for(let r=0,o=i.length;r<o;r++)n.push(...i[r].toShapes());return n}}function Dx(s,e,t){const n=Array.from(s),i=e/t.resolution,r=(t.boundingBox.yMax-t.boundingBox.yMin+t.underlineThickness)*i,o=[];let a=0,l=0;for(let c=0;c<n.length;c++){const h=n[c];if(h===`
`)a=0,l-=r;else{const u=Ix(h,i,a,l,t);a+=u.offsetX,o.push(u.path)}}return o}function Ix(s,e,t,n,i){const r=i.glyphs[s]||i.glyphs["?"];if(!r){console.error('THREE.Font: character "'+s+'" does not exists in font family '+i.familyName+".");return}const o=new I0;let a,l,c,h,u,d,m,b;if(r.o){const _=r._cachedOutline||(r._cachedOutline=r.o.split(" "));for(let g=0,p=_.length;g<p;)switch(_[g++]){case"m":a=_[g++]*e+t,l=_[g++]*e+n,o.moveTo(a,l);break;case"l":a=_[g++]*e+t,l=_[g++]*e+n,o.lineTo(a,l);break;case"q":c=_[g++]*e+t,h=_[g++]*e+n,u=_[g++]*e+t,d=_[g++]*e+n,o.quadraticCurveTo(u,d,c,h);break;case"b":c=_[g++]*e+t,h=_[g++]*e+n,u=_[g++]*e+t,d=_[g++]*e+n,m=_[g++]*e+t,b=_[g++]*e+n,o.bezierCurveTo(u,d,m,b,c,h);break}}return{offsetX:r.ha*e,path:o}}/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.8.2
*/var pn=Uint8Array,as=Uint16Array,Nx=Int32Array,Dd=new pn([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Id=new pn([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Ux=new pn([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Nd=function(s,e){for(var t=new as(31),n=0;n<31;++n)t[n]=e+=1<<s[n-1];for(var i=new Nx(t[30]),n=1;n<30;++n)for(var r=t[n];r<t[n+1];++r)i[r]=r-t[n]<<5|n;return{b:t,r:i}},Ud=Nd(Dd,2),Od=Ud.b,Ox=Ud.r;Od[28]=258,Ox[258]=28;var Fx=Nd(Id,0),kx=Fx.b,jl=new as(32768);for(var bt=0;bt<32768;++bt){var hi=(bt&43690)>>1|(bt&21845)<<1;hi=(hi&52428)>>2|(hi&13107)<<2,hi=(hi&61680)>>4|(hi&3855)<<4,jl[bt]=((hi&65280)>>8|(hi&255)<<8)>>1}var ar=function(s,e,t){for(var n=s.length,i=0,r=new as(e);i<n;++i)s[i]&&++r[s[i]-1];var o=new as(e);for(i=1;i<e;++i)o[i]=o[i-1]+r[i-1]<<1;var a;if(t){a=new as(1<<e);var l=15-e;for(i=0;i<n;++i)if(s[i])for(var c=i<<4|s[i],h=e-s[i],u=o[s[i]-1]++<<h,d=u|(1<<h)-1;u<=d;++u)a[jl[u]>>l]=c}else for(a=new as(n),i=0;i<n;++i)s[i]&&(a[i]=jl[o[s[i]-1]++]>>15-s[i]);return a},xr=new pn(288);for(var bt=0;bt<144;++bt)xr[bt]=8;for(var bt=144;bt<256;++bt)xr[bt]=9;for(var bt=256;bt<280;++bt)xr[bt]=7;for(var bt=280;bt<288;++bt)xr[bt]=8;var Fd=new pn(32);for(var bt=0;bt<32;++bt)Fd[bt]=5;var Bx=ar(xr,9,1),zx=ar(Fd,5,1),za=function(s){for(var e=s[0],t=1;t<s.length;++t)s[t]>e&&(e=s[t]);return e},Sn=function(s,e,t){var n=e/8|0;return(s[n]|s[n+1]<<8)>>(e&7)&t},Ha=function(s,e){var t=e/8|0;return(s[t]|s[t+1]<<8|s[t+2]<<16)>>(e&7)},Hx=function(s){return(s+7)/8|0},Gx=function(s,e,t){return(t==null||t>s.length)&&(t=s.length),new pn(s.subarray(e,t))},Vx=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Mn=function(s,e,t){var n=new Error(e||Vx[s]);if(n.code=s,Error.captureStackTrace&&Error.captureStackTrace(n,Mn),!t)throw n;return n},Wx=function(s,e,t,n){var i=s.length,r=0;if(!i||e.f&&!e.l)return t||new pn(0);var o=!t,a=o||e.i!=2,l=e.i;o&&(t=new pn(i*3));var c=function(st){var qe=t.length;if(st>qe){var O=new pn(Math.max(qe*2,st));O.set(t),t=O}},h=e.f||0,u=e.p||0,d=e.b||0,m=e.l,b=e.d,_=e.m,g=e.n,p=i*8;do{if(!m){h=Sn(s,u,1);var w=Sn(s,u+1,3);if(u+=3,w)if(w==1)m=Bx,b=zx,_=9,g=5;else if(w==2){var D=Sn(s,u,31)+257,P=Sn(s,u+10,15)+4,B=D+Sn(s,u+5,31)+1;u+=14;for(var $=new pn(B),S=new pn(19),C=0;C<P;++C)S[Ux[C]]=Sn(s,u+C*3,7);u+=P*3;for(var G=za(S),q=(1<<G)-1,K=ar(S,G,1),C=0;C<B;){var se=K[Sn(s,u,q)];u+=se&15;var x=se>>4;if(x<16)$[C++]=x;else{var X=0,ce=0;for(x==16?(ce=3+Sn(s,u,3),u+=2,X=$[C-1]):x==17?(ce=3+Sn(s,u,7),u+=3):x==18&&(ce=11+Sn(s,u,127),u+=7);ce--;)$[C++]=X}}var Z=$.subarray(0,D),ge=$.subarray(D);_=za(Z),g=za(ge),m=ar(Z,_,1),b=ar(ge,g,1)}else Mn(1);else{var x=Hx(u)+4,y=s[x-4]|s[x-3]<<8,I=x+y;if(I>i){l&&Mn(0);break}a&&c(d+y),t.set(s.subarray(x,I),d),e.b=d+=y,e.p=u=I*8,e.f=h;continue}if(u>p){l&&Mn(0);break}}a&&c(d+131072);for(var be=(1<<_)-1,Ae=(1<<g)-1,Be=u;;Be=u){var X=m[Ha(s,u)&be],Ge=X>>4;if(u+=X&15,u>p){l&&Mn(0);break}if(X||Mn(2),Ge<256)t[d++]=Ge;else if(Ge==256){Be=u,m=null;break}else{var J=Ge-254;if(Ge>264){var C=Ge-257,oe=Dd[C];J=Sn(s,u,(1<<oe)-1)+Od[C],u+=oe}var de=b[Ha(s,u)&Ae],_e=de>>4;de||Mn(3),u+=de&15;var ge=kx[_e];if(_e>3){var oe=Id[_e];ge+=Ha(s,u)&(1<<oe)-1,u+=oe}if(u>p){l&&Mn(0);break}a&&c(d+131072);var Ie=d+J;if(d<ge){var Ne=r-ge,Ke=Math.min(ge,Ie);for(Ne+d<0&&Mn(3);d<Ke;++d)t[d]=n[Ne+d]}for(;d<Ie;++d)t[d]=t[d-ge]}}e.l=m,e.p=Be,e.b=d,e.f=h,m&&(h=1,e.m=_,e.d=b,e.n=g)}while(!h);return d!=t.length&&o?Gx(t,0,d):t.subarray(0,d)},jx=new pn(0),Xx=function(s,e){return((s[0]&15)!=8||s[0]>>4>7||(s[0]<<8|s[1])%31)&&Mn(6,"invalid zlib data"),(s[1]>>5&1)==1&&Mn(6,"invalid zlib data: "+(s[1]&32?"need":"unexpected")+" dictionary"),(s[1]>>3&4)+2};function co(s,e){return Wx(s.subarray(Xx(s),-4),{i:2},e,e)}var qx=typeof TextDecoder<"u"&&new TextDecoder,Yx=0;try{qx.decode(jx,{stream:!0}),Yx=1}catch{}class Kx extends p0{constructor(e){super(e),this.type=$n}parse(e){const $=Math.pow(2.7182818,2.2);function S(f,v){let M=0;for(let U=0;U<65536;++U)(U==0||f[U>>3]&1<<(U&7))&&(v[M++]=U);const E=M-1;for(;M<65536;)v[M++]=0;return E}function C(f){for(let v=0;v<16384;v++)f[v]={},f[v].len=0,f[v].lit=0,f[v].p=null}const G={l:0,c:0,lc:0};function q(f,v,M,E,U){for(;M<f;)v=v<<8|Je(E,U),M+=8;M-=f,G.l=v>>M&(1<<f)-1,G.c=v,G.lc=M}const K=new Array(59);function se(f){for(let M=0;M<=58;++M)K[M]=0;for(let M=0;M<65537;++M)K[f[M]]+=1;let v=0;for(let M=58;M>0;--M){const E=v+K[M]>>1;K[M]=v,v=E}for(let M=0;M<65537;++M){const E=f[M];E>0&&(f[M]=E|K[E]++<<6)}}function X(f,v,M,E,U,N){const z=v;let Y=0,W=0;for(;E<=U;E++){if(z.value-v.value>M)return!1;q(6,Y,W,f,z);const j=G.l;if(Y=G.c,W=G.lc,N[E]=j,j==63){if(z.value-v.value>M)throw new Error("Something wrong with hufUnpackEncTable");q(8,Y,W,f,z);let H=G.l+6;if(Y=G.c,W=G.lc,E+H>U+1)throw new Error("Something wrong with hufUnpackEncTable");for(;H--;)N[E++]=0;E--}else if(j>=59){let H=j-59+2;if(E+H>U+1)throw new Error("Something wrong with hufUnpackEncTable");for(;H--;)N[E++]=0;E--}}se(N)}function ce(f){return f&63}function Z(f){return f>>6}function ge(f,v,M,E){for(;v<=M;v++){const U=Z(f[v]),N=ce(f[v]);if(U>>N)throw new Error("Invalid table entry");if(N>14){const z=E[U>>N-14];if(z.len)throw new Error("Invalid table entry");if(z.lit++,z.p){const Y=z.p;z.p=new Array(z.lit);for(let W=0;W<z.lit-1;++W)z.p[W]=Y[W]}else z.p=new Array(1);z.p[z.lit-1]=v}else if(N){let z=0;for(let Y=1<<14-N;Y>0;Y--){const W=E[(U<<14-N)+z];if(W.len||W.p)throw new Error("Invalid table entry");W.len=N,W.lit=v,z++}}}return!0}const be={c:0,lc:0};function Ae(f,v,M,E){f=f<<8|Je(M,E),v+=8,be.c=f,be.lc=v}const Be={c:0,lc:0};function Ge(f,v,M,E,U,N,z,Y,W){if(f==v){E<8&&(Ae(M,E,U,N),M=be.c,E=be.lc),E-=8;let j=M>>E;if(j=new Uint8Array([j])[0],Y.value+j>W)return!1;const H=z[Y.value-1];for(;j-- >0;)z[Y.value++]=H}else if(Y.value<W)z[Y.value++]=f;else return!1;Be.c=M,Be.lc=E}function J(f){return f&65535}function oe(f){const v=J(f);return v>32767?v-65536:v}const de={a:0,b:0};function _e(f,v){const M=oe(f),U=oe(v),N=M+(U&1)+(U>>1),z=N,Y=N-U;de.a=z,de.b=Y}function Ie(f,v){const M=J(f),E=J(v),U=M-(E>>1)&65535,N=E+U-32768&65535;de.a=N,de.b=U}function Ne(f,v,M,E,U,N,z){const Y=z<16384,W=M>U?U:M;let j=1,H,ie;for(;j<=W;)j<<=1;for(j>>=1,H=j,j>>=1;j>=1;){ie=0;const he=ie+N*(U-H),ue=N*j,we=N*H,re=E*j,Q=E*H;let Te,Ce,it,Lt;for(;ie<=he;ie+=we){let Xe=ie;const Qe=ie+E*(M-H);for(;Xe<=Qe;Xe+=Q){const He=Xe+re,Ct=Xe+ue,Et=Ct+re;Y?(_e(f[Xe+v],f[Ct+v]),Te=de.a,it=de.b,_e(f[He+v],f[Et+v]),Ce=de.a,Lt=de.b,_e(Te,Ce),f[Xe+v]=de.a,f[He+v]=de.b,_e(it,Lt),f[Ct+v]=de.a,f[Et+v]=de.b):(Ie(f[Xe+v],f[Ct+v]),Te=de.a,it=de.b,Ie(f[He+v],f[Et+v]),Ce=de.a,Lt=de.b,Ie(Te,Ce),f[Xe+v]=de.a,f[He+v]=de.b,Ie(it,Lt),f[Ct+v]=de.a,f[Et+v]=de.b)}if(M&j){const He=Xe+ue;Y?_e(f[Xe+v],f[He+v]):Ie(f[Xe+v],f[He+v]),Te=de.a,f[He+v]=de.b,f[Xe+v]=Te}}if(U&j){let Xe=ie;const Qe=ie+E*(M-H);for(;Xe<=Qe;Xe+=Q){const He=Xe+re;Y?_e(f[Xe+v],f[He+v]):Ie(f[Xe+v],f[He+v]),Te=de.a,f[He+v]=de.b,f[Xe+v]=Te}}H=j,j>>=1}return ie}function Ke(f,v,M,E,U,N,z,Y,W){let j=0,H=0;const ie=z,he=Math.trunc(E.value+(U+7)/8);for(;E.value<he;)for(Ae(j,H,M,E),j=be.c,H=be.lc;H>=14;){const we=j>>H-14&16383,re=v[we];if(re.len)H-=re.len,Ge(re.lit,N,j,H,M,E,Y,W,ie),j=Be.c,H=Be.lc;else{if(!re.p)throw new Error("hufDecode issues");let Q;for(Q=0;Q<re.lit;Q++){const Te=ce(f[re.p[Q]]);for(;H<Te&&E.value<he;)Ae(j,H,M,E),j=be.c,H=be.lc;if(H>=Te&&Z(f[re.p[Q]])==(j>>H-Te&(1<<Te)-1)){H-=Te,Ge(re.p[Q],N,j,H,M,E,Y,W,ie),j=Be.c,H=Be.lc;break}}if(Q==re.lit)throw new Error("hufDecode issues")}}const ue=8-U&7;for(j>>=ue,H-=ue;H>0;){const we=v[j<<14-H&16383];if(we.len)H-=we.len,Ge(we.lit,N,j,H,M,E,Y,W,ie),j=Be.c,H=Be.lc;else throw new Error("hufDecode issues")}return!0}function st(f,v,M,E,U,N){const z={value:0},Y=M.value,W=me(v,M),j=me(v,M);M.value+=4;const H=me(v,M);if(M.value+=4,W<0||W>=65537||j<0||j>=65537)throw new Error("Something wrong with HUF_ENCSIZE");const ie=new Array(65537),he=new Array(16384);C(he);const ue=E-(M.value-Y);if(X(f,M,ue,W,j,ie),H>8*(E-(M.value-Y)))throw new Error("Something wrong with hufUncompress");ge(ie,W,j,he),Ke(ie,he,f,M,H,j,N,U,z)}function qe(f,v,M){for(let E=0;E<M;++E)v[E]=f[v[E]]}function O(f){for(let v=1;v<f.length;v++){const M=f[v-1]+f[v]-128;f[v]=M}}function Wt(f,v){let M=0,E=Math.floor((f.length+1)/2),U=0;const N=f.length-1;for(;!(U>N||(v[U++]=f[M++],U>N));)v[U++]=f[E++]}function $e(f){let v=f.byteLength;const M=new Array;let E=0;const U=new DataView(f);for(;v>0;){const N=U.getInt8(E++);if(N<0){const z=-N;v-=z+1;for(let Y=0;Y<z;Y++)M.push(U.getUint8(E++))}else{const z=N;v-=2;const Y=U.getUint8(E++);for(let W=0;W<z+1;W++)M.push(Y)}}return M}function rt(f,v,M,E,U,N){let z=new DataView(N.buffer);const Y=M[f.idx[0]].width,W=M[f.idx[0]].height,j=3,H=Math.floor(Y/8),ie=Math.ceil(Y/8),he=Math.ceil(W/8),ue=Y-(ie-1)*8,we=W-(he-1)*8,re={value:0},Q=new Array(j),Te=new Array(j),Ce=new Array(j),it=new Array(j),Lt=new Array(j);for(let Qe=0;Qe<j;++Qe)Lt[Qe]=v[f.idx[Qe]],Q[Qe]=Qe<1?0:Q[Qe-1]+ie*he,Te[Qe]=new Float32Array(64),Ce[Qe]=new Uint16Array(64),it[Qe]=new Uint16Array(ie*64);for(let Qe=0;Qe<he;++Qe){let He=8;Qe==he-1&&(He=we);let Ct=8;for(let ze=0;ze<ie;++ze){ze==ie-1&&(Ct=ue);for(let lt=0;lt<j;++lt)Ce[lt].fill(0),Ce[lt][0]=U[Q[lt]++],Oe(re,E,Ce[lt]),ft(Ce[lt],Te[lt]),ke(Te[lt]);L(Te);for(let lt=0;lt<j;++lt)A(Te[lt],it[lt],ze*64)}let Et=0;for(let ze=0;ze<j;++ze){const lt=M[f.idx[ze]].type;for(let _n=8*Qe;_n<8*Qe+He;++_n){Et=Lt[ze][_n];for(let ni=0;ni<H;++ni){const Rn=ni*64+(_n&7)*8;z.setUint16(Et+0*2*lt,it[ze][Rn+0],!0),z.setUint16(Et+1*2*lt,it[ze][Rn+1],!0),z.setUint16(Et+2*2*lt,it[ze][Rn+2],!0),z.setUint16(Et+3*2*lt,it[ze][Rn+3],!0),z.setUint16(Et+4*2*lt,it[ze][Rn+4],!0),z.setUint16(Et+5*2*lt,it[ze][Rn+5],!0),z.setUint16(Et+6*2*lt,it[ze][Rn+6],!0),z.setUint16(Et+7*2*lt,it[ze][Rn+7],!0),Et+=8*2*lt}}if(H!=ie)for(let _n=8*Qe;_n<8*Qe+He;++_n){const ni=Lt[ze][_n]+8*H*2*lt,Rn=H*64+(_n&7)*8;for(let Cr=0;Cr<Ct;++Cr)z.setUint16(ni+Cr*2*lt,it[ze][Rn+Cr],!0)}}}const Xe=new Uint16Array(Y);z=new DataView(N.buffer);for(let Qe=0;Qe<j;++Qe){M[f.idx[Qe]].decoded=!0;const He=M[f.idx[Qe]].type;if(M[Qe].type==2)for(let Ct=0;Ct<W;++Ct){const Et=Lt[Qe][Ct];for(let ze=0;ze<Y;++ze)Xe[ze]=z.getUint16(Et+ze*2*He,!0);for(let ze=0;ze<Y;++ze)z.setFloat32(Et+ze*2*He,k(Xe[ze]),!0)}}}function Oe(f,v,M){let E,U=1;for(;U<64;)E=v[f.value],E==65280?U=64:E>>8==255?U+=E&255:(M[U]=E,U++),f.value++}function ft(f,v){v[0]=k(f[0]),v[1]=k(f[1]),v[2]=k(f[5]),v[3]=k(f[6]),v[4]=k(f[14]),v[5]=k(f[15]),v[6]=k(f[27]),v[7]=k(f[28]),v[8]=k(f[2]),v[9]=k(f[4]),v[10]=k(f[7]),v[11]=k(f[13]),v[12]=k(f[16]),v[13]=k(f[26]),v[14]=k(f[29]),v[15]=k(f[42]),v[16]=k(f[3]),v[17]=k(f[8]),v[18]=k(f[12]),v[19]=k(f[17]),v[20]=k(f[25]),v[21]=k(f[30]),v[22]=k(f[41]),v[23]=k(f[43]),v[24]=k(f[9]),v[25]=k(f[11]),v[26]=k(f[18]),v[27]=k(f[24]),v[28]=k(f[31]),v[29]=k(f[40]),v[30]=k(f[44]),v[31]=k(f[53]),v[32]=k(f[10]),v[33]=k(f[19]),v[34]=k(f[23]),v[35]=k(f[32]),v[36]=k(f[39]),v[37]=k(f[45]),v[38]=k(f[52]),v[39]=k(f[54]),v[40]=k(f[20]),v[41]=k(f[22]),v[42]=k(f[33]),v[43]=k(f[38]),v[44]=k(f[46]),v[45]=k(f[51]),v[46]=k(f[55]),v[47]=k(f[60]),v[48]=k(f[21]),v[49]=k(f[34]),v[50]=k(f[37]),v[51]=k(f[47]),v[52]=k(f[50]),v[53]=k(f[56]),v[54]=k(f[59]),v[55]=k(f[61]),v[56]=k(f[35]),v[57]=k(f[36]),v[58]=k(f[48]),v[59]=k(f[49]),v[60]=k(f[57]),v[61]=k(f[58]),v[62]=k(f[62]),v[63]=k(f[63])}function ke(f){const v=.5*Math.cos(.7853975),M=.5*Math.cos(3.14159/16),E=.5*Math.cos(3.14159/8),U=.5*Math.cos(3*3.14159/16),N=.5*Math.cos(5*3.14159/16),z=.5*Math.cos(3*3.14159/8),Y=.5*Math.cos(7*3.14159/16),W=new Array(4),j=new Array(4),H=new Array(4),ie=new Array(4);for(let he=0;he<8;++he){const ue=he*8;W[0]=E*f[ue+2],W[1]=z*f[ue+2],W[2]=E*f[ue+6],W[3]=z*f[ue+6],j[0]=M*f[ue+1]+U*f[ue+3]+N*f[ue+5]+Y*f[ue+7],j[1]=U*f[ue+1]-Y*f[ue+3]-M*f[ue+5]-N*f[ue+7],j[2]=N*f[ue+1]-M*f[ue+3]+Y*f[ue+5]+U*f[ue+7],j[3]=Y*f[ue+1]-N*f[ue+3]+U*f[ue+5]-M*f[ue+7],H[0]=v*(f[ue+0]+f[ue+4]),H[3]=v*(f[ue+0]-f[ue+4]),H[1]=W[0]+W[3],H[2]=W[1]-W[2],ie[0]=H[0]+H[1],ie[1]=H[3]+H[2],ie[2]=H[3]-H[2],ie[3]=H[0]-H[1],f[ue+0]=ie[0]+j[0],f[ue+1]=ie[1]+j[1],f[ue+2]=ie[2]+j[2],f[ue+3]=ie[3]+j[3],f[ue+4]=ie[3]-j[3],f[ue+5]=ie[2]-j[2],f[ue+6]=ie[1]-j[1],f[ue+7]=ie[0]-j[0]}for(let he=0;he<8;++he)W[0]=E*f[16+he],W[1]=z*f[16+he],W[2]=E*f[48+he],W[3]=z*f[48+he],j[0]=M*f[8+he]+U*f[24+he]+N*f[40+he]+Y*f[56+he],j[1]=U*f[8+he]-Y*f[24+he]-M*f[40+he]-N*f[56+he],j[2]=N*f[8+he]-M*f[24+he]+Y*f[40+he]+U*f[56+he],j[3]=Y*f[8+he]-N*f[24+he]+U*f[40+he]-M*f[56+he],H[0]=v*(f[he]+f[32+he]),H[3]=v*(f[he]-f[32+he]),H[1]=W[0]+W[3],H[2]=W[1]-W[2],ie[0]=H[0]+H[1],ie[1]=H[3]+H[2],ie[2]=H[3]-H[2],ie[3]=H[0]-H[1],f[0+he]=ie[0]+j[0],f[8+he]=ie[1]+j[1],f[16+he]=ie[2]+j[2],f[24+he]=ie[3]+j[3],f[32+he]=ie[3]-j[3],f[40+he]=ie[2]-j[2],f[48+he]=ie[1]-j[1],f[56+he]=ie[0]-j[0]}function L(f){for(let v=0;v<64;++v){const M=f[0][v],E=f[1][v],U=f[2][v];f[0][v]=M+1.5747*U,f[1][v]=M-.1873*E-.4682*U,f[2][v]=M+1.8556*E}}function A(f,v,M){for(let E=0;E<64;++E)v[M+E]=Zc.toHalfFloat(V(f[E]))}function V(f){return f<=1?Math.sign(f)*Math.pow(Math.abs(f),2.2):Math.sign(f)*Math.pow($,Math.abs(f)-1)}function te(f){return new DataView(f.array.buffer,f.offset.value,f.size)}function ae(f){const v=f.viewer.buffer.slice(f.offset.value,f.offset.value+f.size),M=new Uint8Array($e(v)),E=new Uint8Array(M.length);return O(M),Wt(M,E),new DataView(E.buffer)}function ee(f){const v=f.array.slice(f.offset.value,f.offset.value+f.size),M=co(v),E=new Uint8Array(M.length);return O(M),Wt(M,E),new DataView(E.buffer)}function Re(f){const v=f.viewer,M={value:f.offset.value},E=new Uint16Array(f.columns*f.lines*(f.inputChannels.length*f.type)),U=new Uint8Array(8192);let N=0;const z=new Array(f.inputChannels.length);for(let we=0,re=f.inputChannels.length;we<re;we++)z[we]={},z[we].start=N,z[we].end=z[we].start,z[we].nx=f.columns,z[we].ny=f.lines,z[we].size=f.type,N+=z[we].nx*z[we].ny*z[we].size;const Y=ne(v,M),W=ne(v,M);if(W>=8192)throw new Error("Something is wrong with PIZ_COMPRESSION BITMAP_SIZE");if(Y<=W)for(let we=0;we<W-Y+1;we++)U[we+Y]=Ue(v,M);const j=new Uint16Array(65536),H=S(U,j),ie=me(v,M);st(f.array,v,M,ie,E,N);for(let we=0;we<f.inputChannels.length;++we){const re=z[we];for(let Q=0;Q<z[we].size;++Q)Ne(E,re.start+Q,re.nx,re.size,re.ny,re.nx*re.size,H)}qe(j,E,N);let he=0;const ue=new Uint8Array(E.buffer.byteLength);for(let we=0;we<f.lines;we++)for(let re=0;re<f.inputChannels.length;re++){const Q=z[re],Te=Q.nx*Q.size,Ce=new Uint8Array(E.buffer,Q.end*2,Te*2);ue.set(Ce,he),he+=Te*2,Q.end+=Te}return new DataView(ue.buffer)}function ve(f){const v=f.array.slice(f.offset.value,f.offset.value+f.size),M=co(v),E=f.inputChannels.length*f.lines*f.columns*f.totalBytes,U=new ArrayBuffer(E),N=new DataView(U);let z=0,Y=0;const W=new Array(4);for(let j=0;j<f.lines;j++)for(let H=0;H<f.inputChannels.length;H++){let ie=0;switch(f.inputChannels[H].pixelType){case 1:W[0]=z,W[1]=W[0]+f.columns,z=W[1]+f.columns;for(let ue=0;ue<f.columns;++ue){const we=M[W[0]++]<<8|M[W[1]++];ie+=we,N.setUint16(Y,ie,!0),Y+=2}break;case 2:W[0]=z,W[1]=W[0]+f.columns,W[2]=W[1]+f.columns,z=W[2]+f.columns;for(let ue=0;ue<f.columns;++ue){const we=M[W[0]++]<<24|M[W[1]++]<<16|M[W[2]++]<<8;ie+=we,N.setUint32(Y,ie,!0),Y+=4}break}}return N}function Me(f){const v=f.viewer,M={value:f.offset.value},E=new Uint8Array(f.columns*f.lines*(f.inputChannels.length*f.type*2)),U={version:Ve(v,M),unknownUncompressedSize:Ve(v,M),unknownCompressedSize:Ve(v,M),acCompressedSize:Ve(v,M),dcCompressedSize:Ve(v,M),rleCompressedSize:Ve(v,M),rleUncompressedSize:Ve(v,M),rleRawSize:Ve(v,M),totalAcUncompressedCount:Ve(v,M),totalDcUncompressedCount:Ve(v,M),acCompression:Ve(v,M)};if(U.version<2)throw new Error("EXRLoader.parse: "+zn.compression+" version "+U.version+" is unsupported");const N=new Array;let z=ne(v,M)-2;for(;z>0;){const re=Ze(v.buffer,M),Q=Ue(v,M),Te=Q>>2&3,Ce=(Q>>4)-1,it=new Int8Array([Ce])[0],Lt=Ue(v,M);N.push({name:re,index:it,type:Lt,compression:Te}),z-=re.length+3}const Y=zn.channels,W=new Array(f.inputChannels.length);for(let re=0;re<f.inputChannels.length;++re){const Q=W[re]={},Te=Y[re];Q.name=Te.name,Q.compression=0,Q.decoded=!1,Q.type=Te.pixelType,Q.pLinear=Te.pLinear,Q.width=f.columns,Q.height=f.lines}const j={idx:new Array(3)};for(let re=0;re<f.inputChannels.length;++re){const Q=W[re];for(let Te=0;Te<N.length;++Te){const Ce=N[Te];Q.name==Ce.name&&(Q.compression=Ce.compression,Ce.index>=0&&(j.idx[Ce.index]=re),Q.offset=re)}}let H,ie,he;if(U.acCompressedSize>0)switch(U.acCompression){case 0:H=new Uint16Array(U.totalAcUncompressedCount),st(f.array,v,M,U.acCompressedSize,H,U.totalAcUncompressedCount);break;case 1:const re=f.array.slice(M.value,M.value+U.totalAcUncompressedCount),Q=co(re);H=new Uint16Array(Q.buffer),M.value+=U.totalAcUncompressedCount;break}if(U.dcCompressedSize>0){const re={array:f.array,offset:M,size:U.dcCompressedSize};ie=new Uint16Array(ee(re).buffer),M.value+=U.dcCompressedSize}if(U.rleRawSize>0){const re=f.array.slice(M.value,M.value+U.rleCompressedSize),Q=co(re);he=$e(Q.buffer),M.value+=U.rleCompressedSize}let ue=0;const we=new Array(W.length);for(let re=0;re<we.length;++re)we[re]=new Array;for(let re=0;re<f.lines;++re)for(let Q=0;Q<W.length;++Q)we[Q].push(ue),ue+=W[Q].width*f.type*2;rt(j,we,W,H,ie,E);for(let re=0;re<W.length;++re){const Q=W[re];if(!Q.decoded)switch(Q.compression){case 2:let Te=0,Ce=0;for(let it=0;it<f.lines;++it){let Lt=we[re][Te];for(let Xe=0;Xe<Q.width;++Xe){for(let Qe=0;Qe<2*Q.type;++Qe)E[Lt++]=he[Ce+Qe*Q.width*Q.height];Ce++}Te++}break;case 1:default:throw new Error("EXRLoader.parse: unsupported channel compression")}}return new DataView(E.buffer)}function Ze(f,v){const M=new Uint8Array(f);let E=0;for(;M[v.value+E]!=0;)E+=1;const U=new TextDecoder().decode(M.slice(v.value,v.value+E));return v.value=v.value+E+1,U}function fe(f,v,M){const E=new TextDecoder().decode(new Uint8Array(f).slice(v.value,v.value+M));return v.value=v.value+M,E}function Ee(f,v){const M=Pe(f,v),E=me(f,v);return[M,E]}function Fe(f,v){const M=me(f,v),E=me(f,v);return[M,E]}function Pe(f,v){const M=f.getInt32(v.value,!0);return v.value=v.value+4,M}function me(f,v){const M=f.getUint32(v.value,!0);return v.value=v.value+4,M}function Je(f,v){const M=f[v.value];return v.value=v.value+1,M}function Ue(f,v){const M=f.getUint8(v.value);return v.value=v.value+1,M}const Ve=function(f,v){let M;return"getBigInt64"in DataView.prototype?M=Number(f.getBigInt64(v.value,!0)):M=f.getUint32(v.value+4,!0)+Number(f.getUint32(v.value,!0)<<32),v.value+=8,M};function F(f,v){const M=f.getFloat32(v.value,!0);return v.value+=4,M}function ye(f,v){return Zc.toHalfFloat(F(f,v))}function k(f){const v=(f&31744)>>10,M=f&1023;return(f>>15?-1:1)*(v?v===31?M?NaN:1/0:Math.pow(2,v-15)*(1+M/1024):6103515625e-14*(M/1024))}function ne(f,v){const M=f.getUint16(v.value,!0);return v.value+=2,M}function xe(f,v){return k(ne(f,v))}function Se(f,v,M,E){const U=M.value,N=[];for(;M.value<U+E-1;){const z=Ze(v,M),Y=Pe(f,M),W=Ue(f,M);M.value+=3;const j=Pe(f,M),H=Pe(f,M);N.push({name:z,pixelType:Y,pLinear:W,xSampling:j,ySampling:H})}return M.value+=1,N}function nt(f,v){const M=F(f,v),E=F(f,v),U=F(f,v),N=F(f,v),z=F(f,v),Y=F(f,v),W=F(f,v),j=F(f,v);return{redX:M,redY:E,greenX:U,greenY:N,blueX:z,blueY:Y,whiteX:W,whiteY:j}}function wt(f,v){const M=["NO_COMPRESSION","RLE_COMPRESSION","ZIPS_COMPRESSION","ZIP_COMPRESSION","PIZ_COMPRESSION","PXR24_COMPRESSION","B44_COMPRESSION","B44A_COMPRESSION","DWAA_COMPRESSION","DWAB_COMPRESSION"],E=Ue(f,v);return M[E]}function jt(f,v){const M=Pe(f,v),E=Pe(f,v),U=Pe(f,v),N=Pe(f,v);return{xMin:M,yMin:E,xMax:U,yMax:N}}function ot(f,v){const M=["INCREASING_Y","DECREASING_Y","RANDOM_Y"],E=Ue(f,v);return M[E]}function Xt(f,v){const M=["ENVMAP_LATLONG","ENVMAP_CUBE"],E=Ue(f,v);return M[E]}function bn(f,v){const M=["ONE_LEVEL","MIPMAP_LEVELS","RIPMAP_LEVELS"],E=["ROUND_DOWN","ROUND_UP"],U=me(f,v),N=me(f,v),z=Ue(f,v);return{xSize:U,ySize:N,levelMode:M[z&15],roundingMode:E[z>>4]}}function Sr(f,v){const M=F(f,v),E=F(f,v);return[M,E]}function Mr(f,v){const M=F(f,v),E=F(f,v),U=F(f,v);return[M,E,U]}function Bn(f,v,M,E,U){if(E==="string"||E==="stringvector"||E==="iccProfile")return fe(v,M,U);if(E==="chlist")return Se(f,v,M,U);if(E==="chromaticities")return nt(f,M);if(E==="compression")return wt(f,M);if(E==="box2i")return jt(f,M);if(E==="envmap")return Xt(f,M);if(E==="tiledesc")return bn(f,M);if(E==="lineOrder")return ot(f,M);if(E==="float")return F(f,M);if(E==="v2f")return Sr(f,M);if(E==="v3f")return Mr(f,M);if(E==="int")return Pe(f,M);if(E==="rational")return Ee(f,M);if(E==="timecode")return Fe(f,M);if(E==="preview")return M.value+=U,"skipped";M.value+=U}function Ds(f,v){const M=Math.log2(f);return v=="ROUND_DOWN"?Math.floor(M):Math.ceil(M)}function wr(f,v,M){let E=0;switch(f.levelMode){case"ONE_LEVEL":E=1;break;case"MIPMAP_LEVELS":E=Ds(Math.max(v,M),f.roundingMode)+1;break;case"RIPMAP_LEVELS":throw new Error("THREE.EXRLoader: RIPMAP_LEVELS tiles currently unsupported.")}return E}function Is(f,v,M,E){const U=new Array(f);for(let N=0;N<f;N++){const z=1<<N;let Y=v/z|0;E=="ROUND_UP"&&Y*z<v&&(Y+=1);const W=Math.max(Y,1);U[N]=(W+M-1)/M|0}return U}function Oi(){const f=this,v=f.offset,M={value:0};for(let E=0;E<f.tileCount;E++){const U=Pe(f.viewer,v),N=Pe(f.viewer,v);v.value+=8,f.size=me(f.viewer,v);const z=U*f.blockWidth,Y=N*f.blockHeight;f.columns=z+f.blockWidth>f.width?f.width-z:f.blockWidth,f.lines=Y+f.blockHeight>f.height?f.height-Y:f.blockHeight;const W=f.columns*f.totalBytes,H=f.size<f.lines*W?f.uncompress(f):te(f);v.value+=f.size;for(let ie=0;ie<f.lines;ie++){const he=ie*f.columns*f.totalBytes;for(let ue=0;ue<f.inputChannels.length;ue++){const we=zn.channels[ue].name,re=f.channelByteOffsets[we]*f.columns,Q=f.decodeChannels[we];if(Q===void 0)continue;M.value=he+re;const Te=(f.height-(1+Y+ie))*f.outLineWidth;for(let Ce=0;Ce<f.columns;Ce++){const it=Te+(Ce+z)*f.outputChannels+Q;f.byteArray[it]=f.getter(H,M)}}}}}function Er(){const f=this,v=f.offset,M={value:0};for(let E=0;E<f.height/f.blockHeight;E++){const U=Pe(f.viewer,v)-zn.dataWindow.yMin;f.size=me(f.viewer,v),f.lines=U+f.blockHeight>f.height?f.height-U:f.blockHeight;const N=f.columns*f.totalBytes,Y=f.size<f.lines*N?f.uncompress(f):te(f);v.value+=f.size;for(let W=0;W<f.blockHeight;W++){const j=E*f.blockHeight,H=W+f.scanOrder(j);if(H>=f.height)continue;const ie=W*N,he=(f.height-1-H)*f.outLineWidth;for(let ue=0;ue<f.inputChannels.length;ue++){const we=zn.channels[ue].name,re=f.channelByteOffsets[we]*f.columns,Q=f.decodeChannels[we];if(Q!==void 0){M.value=ie+re;for(let Te=0;Te<f.columns;Te++){const Ce=he+Te*f.outputChannels+Q;f.byteArray[Ce]=f.getter(Y,M)}}}}}}function Fi(f,v,M){const E={};if(f.getUint32(0,!0)!=20000630)throw new Error("THREE.EXRLoader: Provided file doesn't appear to be in OpenEXR format.");E.version=f.getUint8(4);const U=f.getUint8(5);E.spec={singleTile:!!(U&2),longName:!!(U&4),deepFormat:!!(U&8),multiPart:!!(U&16)},M.value=8;let N=!0;for(;N;){const z=Ze(v,M);if(z==0)N=!1;else{const Y=Ze(v,M),W=me(f,M),j=Bn(f,v,M,Y,W);j===void 0?console.warn(`THREE.EXRLoader: Skipped unknown header attribute type '${Y}'.`):E[z]=j}}if(U&-7)throw console.error("THREE.EXRHeader:",E),new Error("THREE.EXRLoader: Provided file is currently unsupported.");return E}function Ar(f,v,M,E,U){const N={size:0,viewer:v,array:M,offset:E,width:f.dataWindow.xMax-f.dataWindow.xMin+1,height:f.dataWindow.yMax-f.dataWindow.yMin+1,inputChannels:f.channels,channelByteOffsets:{},scanOrder:null,totalBytes:null,columns:null,lines:null,type:null,uncompress:null,getter:null,format:null,colorSpace:Ut};switch(f.compression){case"NO_COMPRESSION":N.blockHeight=1,N.uncompress=te;break;case"RLE_COMPRESSION":N.blockHeight=1,N.uncompress=ae;break;case"ZIPS_COMPRESSION":N.blockHeight=1,N.uncompress=ee;break;case"ZIP_COMPRESSION":N.blockHeight=16,N.uncompress=ee;break;case"PIZ_COMPRESSION":N.blockHeight=32,N.uncompress=Re;break;case"PXR24_COMPRESSION":N.blockHeight=16,N.uncompress=ve;break;case"DWAA_COMPRESSION":N.blockHeight=32,N.uncompress=Me;break;case"DWAB_COMPRESSION":N.blockHeight=256,N.uncompress=Me;break;default:throw new Error("EXRLoader.parse: "+f.compression+" is unsupported")}const z={};for(const H of f.channels)switch(H.name){case"Y":case"R":case"G":case"B":case"A":z[H.name]=!0,N.type=H.pixelType}let Y=!1;if(z.R&&z.G&&z.B)Y=!z.A,N.outputChannels=4,N.decodeChannels={R:0,G:1,B:2,A:3};else if(z.Y)N.outputChannels=1,N.decodeChannels={Y:0};else throw new Error("EXRLoader.parse: file contains unsupported data channels.");if(N.type==1)switch(U){case rn:N.getter=xe;break;case $n:N.getter=ne;break}else if(N.type==2)switch(U){case rn:N.getter=F;break;case $n:N.getter=ye}else throw new Error("EXRLoader.parse: unsupported pixelType "+N.type+" for "+f.compression+".");N.columns=N.width;const W=N.width*N.height*N.outputChannels;switch(U){case rn:N.byteArray=new Float32Array(W),Y&&N.byteArray.fill(1,0,W);break;case $n:N.byteArray=new Uint16Array(W),Y&&N.byteArray.fill(15360,0,W);break;default:console.error("THREE.EXRLoader: unsupported type: ",U);break}let j=0;for(const H of f.channels)N.decodeChannels[H.name]!==void 0&&(N.channelByteOffsets[H.name]=j),j+=H.pixelType*2;if(N.totalBytes=j,N.outLineWidth=N.width*N.outputChannels,f.lineOrder==="INCREASING_Y"?N.scanOrder=H=>H:N.scanOrder=H=>N.height-1-H,N.outputChannels==4?(N.format=ln,N.colorSpace=Ut):(N.format=Go,N.colorSpace=dn),f.spec.singleTile){N.blockHeight=f.tiles.ySize,N.blockWidth=f.tiles.xSize;const H=wr(f.tiles,N.width,N.height),ie=Is(H,N.width,f.tiles.xSize,f.tiles.roundingMode),he=Is(H,N.height,f.tiles.ySize,f.tiles.roundingMode);N.tileCount=ie[0]*he[0];for(let ue=0;ue<H;ue++)for(let we=0;we<he[ue];we++)for(let re=0;re<ie[ue];re++)Ve(v,E);N.decode=Oi.bind(N)}else{N.blockWidth=N.width;const H=Math.ceil(N.height/N.blockHeight);for(let ie=0;ie<H;ie++)Ve(v,E);N.decode=Er.bind(N)}return N}const Ns={value:0},Tr=new DataView(e),$o=new Uint8Array(e),zn=Fi(Tr,e,Ns),T=Ar(zn,Tr,$o,Ns,this.type);return T.decode(),{header:zn,width:T.width,height:T.height,data:T.byteArray,format:T.format,colorSpace:T.colorSpace,type:this.type}}setDataType(e){return this.type=e,this}load(e,t,n,i){function r(o,a){o.colorSpace=a.colorSpace,o.minFilter=Pt,o.magFilter=Pt,o.generateMipmaps=!1,o.flipY=!1,t&&t(o,a)}return super.load(e,r,n,i)}}class $x extends Ko{constructor(e=[]){super(),this.sources=e,this.items={},this.toLoad=this.sources.length,this.loaded=0,this.setLoaders(),this.toLoad===0?setTimeout(()=>this.trigger("ready")):this.startLoading()}setLoaders(){this.loaders={},this.loaders.glbLoader=new br,this.loaders.gltfLoader=new br,this.loaders.textureLoader=new ko,this.loaders.cubeTextureLoader=new f0,this.loaders.fontLoader=new Px,this.loaders.exrLoader=new Kx}startLoading(){for(const e of this.sources)e.type==="gltfModel"?this.loaders.gltfLoader.load(e.path,t=>{this.sourceLoaded(e,t)}):e.type==="glbModel"?this.loaders.glbLoader.load(e.path,t=>{this.sourceLoaded(e,t)}):e.type==="texture"?this.loaders.textureLoader.load(e.path,t=>{this.sourceLoaded(e,t)}):e.type==="cubeTexture"?this.loaders.cubeTextureLoader.load(e.path,t=>{this.sourceLoaded(e,t)}):e.type==="font"?this.loaders.fontLoader.load(e.path,t=>{this.sourceLoaded(e,t)}):e.type==="exr"?this.loaders.exrLoader.load(e.path,t=>{this.sourceLoaded(e,t)}):e.type==="simulationData"?fetch(e.path).then(t=>t.text()).then(t=>{this.sourceLoaded(e,t)}):console.warn(`brahma: unknown source type "${e.type}"`,e)}sourceLoaded(e,t){this.items[e.name]=t,this.loaded++,this.trigger("progress",[this.loaded,this.toLoad]),this.loaded===this.toLoad&&this.trigger("ready")}}const cu={type:"change"},Ec={type:"start"},kd={type:"end"},ho=new Ts,hu=new ui,Zx=Math.cos(70*dt.DEG2RAD),It=new R,nn=2*Math.PI,ut={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ga=1e-6;class Jx extends N0{constructor(e,t=null){super(e,t),this.state=ut.NONE,this.enabled=!0,this.target=new R,this.cursor=new R,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:cs.ROTATE,MIDDLE:cs.DOLLY,RIGHT:cs.PAN},this.touches={ONE:ss.ROTATE,TWO:ss.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new R,this._lastQuaternion=new $t,this._lastTargetPosition=new R,this._quat=new $t().setFromUnitVectors(e.up,new R(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new tu,this._sphericalDelta=new tu,this._scale=1,this._panOffset=new R,this._rotateStart=new le,this._rotateEnd=new le,this._rotateDelta=new le,this._panStart=new le,this._panEnd=new le,this._panDelta=new le,this._dollyStart=new le,this._dollyEnd=new le,this._dollyDelta=new le,this._dollyDirection=new R,this._mouse=new le,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=ey.bind(this),this._onPointerDown=Qx.bind(this),this._onPointerUp=ty.bind(this),this._onContextMenu=ly.bind(this),this._onMouseWheel=sy.bind(this),this._onKeyDown=ry.bind(this),this._onTouchStart=oy.bind(this),this._onTouchMove=ay.bind(this),this._onMouseDown=ny.bind(this),this._onMouseMove=iy.bind(this),this._interceptControlDown=cy.bind(this),this._interceptControlUp=hy.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(cu),this.update(),this.state=ut.NONE}update(e=null){const t=this.object.position;It.copy(t).sub(this.target),It.applyQuaternion(this._quat),this._spherical.setFromVector3(It),this.autoRotate&&this.state===ut.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=nn:n>Math.PI&&(n-=nn),i<-Math.PI?i+=nn:i>Math.PI&&(i-=nn),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(It.setFromSpherical(this._spherical),It.applyQuaternion(this._quatInverse),t.copy(this.target).add(It),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=It.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new R(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new R(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=It.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(ho.origin.copy(this.object.position),ho.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ho.direction))<Zx?this.object.lookAt(this.target):(hu.setFromNormalAndCoplanarPoint(this.object.up,this.target),ho.intersectPlane(hu,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ga||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ga||this._lastTargetPosition.distanceToSquared(this.target)>Ga?(this.dispatchEvent(cu),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?nn/60*this.autoRotateSpeed*e:nn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){It.setFromMatrixColumn(t,0),It.multiplyScalar(-e),this._panOffset.add(It)}_panUp(e,t){this.screenSpacePanning===!0?It.setFromMatrixColumn(t,1):(It.setFromMatrixColumn(t,0),It.crossVectors(this.object.up,It)),It.multiplyScalar(e),this._panOffset.add(It)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const i=this.object.position;It.copy(i).sub(this.target);let r=It.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),i=e-n.left,r=t-n.top,o=n.width,a=n.height;this._mouse.x=i/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(nn*this._rotateDelta.x/t.clientHeight),this._rotateUp(nn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(nn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(-nn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(nn*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(-nn*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panStart.set(n,i)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(i,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(nn*this._rotateDelta.x/t.clientHeight),this._rotateUp(nn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new le,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function Qx(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s)))}function ey(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function ty(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(kd),this.state=ut.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function ny(s){let e;switch(s.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case cs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=ut.DOLLY;break;case cs.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=ut.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=ut.ROTATE}break;case cs.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=ut.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=ut.PAN}break;default:this.state=ut.NONE}this.state!==ut.NONE&&this.dispatchEvent(Ec)}function iy(s){switch(this.state){case ut.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case ut.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case ut.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function sy(s){this.enabled===!1||this.enableZoom===!1||this.state!==ut.NONE||(s.preventDefault(),this.dispatchEvent(Ec),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(kd))}function ry(s){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(s)}function oy(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case ss.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=ut.TOUCH_ROTATE;break;case ss.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=ut.TOUCH_PAN;break;default:this.state=ut.NONE}break;case 2:switch(this.touches.TWO){case ss.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=ut.TOUCH_DOLLY_PAN;break;case ss.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=ut.TOUCH_DOLLY_ROTATE;break;default:this.state=ut.NONE}break;default:this.state=ut.NONE}this.state!==ut.NONE&&this.dispatchEvent(Ec)}function ay(s){switch(this._trackPointer(s),this.state){case ut.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case ut.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case ut.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case ut.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=ut.NONE}}function ly(s){this.enabled!==!1&&s.preventDefault()}function cy(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function hy(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class uy{constructor(){var e;this.experience=new Tt,this.sizes=this.experience.sizes,this.scene=this.experience.scene,this.cameraGroup=this.experience.cameraGroup,this.canvas=this.experience.canvas,this.config=((e=this.experience.config)==null?void 0:e.camera)??{},this.setInstance(),this.setOrbitControls()}setInstance(){const{fov:e=35,near:t=.1,far:n=1e3,position:i=[-3.6277092514077784,1.6242714732329864,2.729361431631495],lookAt:r=[0,0,0]}=this.config;this.instance=new Qt(e,this.sizes.width/this.sizes.height,t,n),this.instance.position.set(...i),this.instance.lookAt(new R(...r)),this.cameraGroup.add(this.instance)}setOrbitControls(){var e;this.controls=new Jx(this.instance,this.canvas),this.controls.enableDamping=((e=this.config.orbit)==null?void 0:e.damping)??!1}resize(){this.instance.aspect=this.sizes.width/this.sizes.height,this.instance.updateProjectionMatrix()}update(){this.controls.update()}}class dy{constructor(){this.experience=new Tt,this.canvas=this.experience.canvas,this.sizes=this.experience.sizes,this.scene=this.experience.scene,this.camera=this.experience.camera,this.setInstance()}setInstance(){this.instance=new bv({canvas:this.canvas,antialias:!0}),this.instance.setSize(this.sizes.width,this.sizes.height),this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio,2))}resize(){this.instance.setSize(this.sizes.width,this.sizes.height),this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio,2))}update(){this.instance.render(this.scene,this.camera.instance)}}class fy{constructor(){var e;this.experience=new Tt,this.debug=this.experience.debug,this.parameters={userName:"User",color:"#ffffff"},(e=this.debug)!=null&&e.active&&(this.debugFolder=this.debug.ui.addFolder("user"),this.debugFolder.addColor(this.parameters,"color").onChange(t=>{this.parameters.color=t,console.log(` color parameter changed to ${this.parameters.color}`)}),this.debugFolder.add(this.parameters,"userName").onChange(t=>{this.parameters.userName=t}))}}class py{constructor(){this.experience=new Tt,this.bodies={},this.boxGeometry=new gi(.25,.3,.15),this.handGeometry=new gi(.05,.1,.12),this.sphereGeometry=new bi(.25,8,8),this.sphereGeometry.scale(.3,.5,.3)}purgeEmbodiment(e){if(this.bodies.hasOwnProperty(e)){const t=this.bodies[e];this.experience.scene.remove(t.group),t.material&&t.material.dispose(),t.group.clear(),delete this.bodies[e],console.log(`✅ Purged embodiment: ${e}`)}}containsEmbodiment(e){return this.bodies.hasOwnProperty(e)}instantiateEmbodiment(e,t){var i,r;if(console.log("instantiating embodiment",e),e==this.experience.user.parameters.userName)return;console.log(t),this.bodies[e]={},this.bodies[e].group=new gt,this.bodies[e].material=new pt({color:t}),this.bodies[e].head=new gt,this.bodies[e].head.add(new Ye(this.sphereGeometry,this.bodies[e].material));const n=(r=(i=this.experience.resources)==null?void 0:i.items)==null?void 0:r.goggleModel;if(n){const o=n.scene.clone();o.scale.set(.1,.1,.1),o.position.set(0,0,-.1),o.rotateY(Math.PI),this.bodies[e].head.add(o)}this.bodies[e].head.name="HMD",this.bodies[e].head.position.set(0,.1,0),this.bodies[e].group.add(this.bodies[e].head),this.experience.scene.add(this.bodies[e].group),this.bodies[e].LController=new Ye(this.handGeometry,this.bodies[e].material),this.bodies[e].LController.name="LController",this.bodies[e].LController.position.set(.1,0,0),this.bodies[e].group.add(this.bodies[e].LController),this.bodies[e].RController=new Ye(this.handGeometry,this.bodies[e].material),this.bodies[e].RController.name="RController",this.bodies[e].RController.position.set(-.1,0,0),this.bodies[e].group.add(this.bodies[e].RController)}updateEmbodiment(e,t=new Le,n=new Le,i=new Le){if(e==this.experience.user.parameters.userName)return;let r=this.bodies[e],o=r.group.getObjectByName("HMD");o.position.setFromMatrixPosition(t),o.quaternion.setFromRotationMatrix(t);let a=r.group.getObjectByName("LController");a.position.setFromMatrixPosition(n),a.quaternion.setFromRotationMatrix(n);let l=r.group.getObjectByName("RController");l.position.setFromMatrixPosition(i),l.quaternion.setFromRotationMatrix(i)}}class my{constructor(e={}){var n;this.experience=new Tt,this.user=this.experience.user;const t=((n=this.experience.config)==null?void 0:n.networking)??{};if(this.url=e.url??t.url,this.room=e.room??t.room??"default",!this.url)throw new Error('brahma-xr: no server url. Pass networking: { url: "ws://localhost:8080" } to Experience (or { url } to Networking). Run a server locally with: npx brahma-xr-server');this.interlocutors=new py,this.connected=!1,this.canSendEmbodiment=!1,this.shouldReconnect=!1,this.reconnectDelay=1e3,this.maxReconnectDelay=15e3,this.lastCalloutSend=0,this.calloutThrottle=100}connect(){this.socket&&(this.socket.readyState===WebSocket.CONNECTING||this.socket.readyState===WebSocket.OPEN)||(this.shouldReconnect=!0,this.open())}open(){const e=new URL(this.url);e.searchParams.set("room",this.room),this.socket=new WebSocket(e),this.socket.onopen=()=>{console.log(`brahma: connected to ${this.url} (room "${this.room}")`),this.reconnectDelay=1e3},this.socket.onmessage=t=>{let n;try{n=JSON.parse(t.data)}catch{return}this.handleServerMessage(n)},this.socket.onerror=t=>{console.error("brahma: WebSocket error:",t)},this.socket.onclose=()=>{this.connected=!1,this.canSendEmbodiment=!1,this.shouldReconnect&&(console.log(`brahma: connection lost, reconnecting in ${this.reconnectDelay}ms`),this.reconnectTimeout=setTimeout(()=>this.open(),this.reconnectDelay),this.reconnectDelay=Math.min(this.reconnectDelay*2,this.maxReconnectDelay))}}disconnect(){var e;this.shouldReconnect=!1,clearTimeout(this.reconnectTimeout),(e=this.socket)==null||e.close(),this.connected=!1,this.canSendEmbodiment=!1}handleServerMessage(e){e.type==="welcome"?(this.user.parameters.userName=e.name,this.user.parameters.color=e.color,this.connected=!0,this.canSendEmbodiment=!0,console.log(`brahma: welcome — you are ${e.name}`)):e.type==="roster"?this.receiveEmbodiments(e.interlocutors):e.type==="callout"&&this.receiveCalloutUpdate(e)}sendEmbodiment(e,t,n){if(!this.canSendEmbodiment||!this.socket||this.socket.readyState!==WebSocket.OPEN)return;const i={v:1,type:"pose",name:this.user.parameters.userName,color:this.user.parameters.color,HMDPosition:e.toArray(),LController:t.toArray(),RController:n.toArray()};this.socket.send(JSON.stringify(i))}receiveEmbodiments(e){try{const t=new Set(e.map(n=>n.name));Object.keys(this.interlocutors.bodies).forEach(n=>{t.has(n)||(console.log(`🗑️ Removing disconnected embodiment: ${n}`),this.interlocutors.purgeEmbodiment(n))}),e.forEach(n=>{try{if(n.name===this.user.parameters.userName)return;this.interlocutors.containsEmbodiment(n.name)||(console.log(`Instantiating new embodiment for ${n.name}`),this.interlocutors.instantiateEmbodiment(n.name,new De(parseInt(n==null?void 0:n.color,16)))),n.HMDPosition&&n.LController&&n.RController&&this.interlocutors.updateEmbodiment(n.name,new Le().fromArray(n.HMDPosition),new Le().fromArray(n.LController),new Le().fromArray(n.RController))}catch(i){console.error(`Error processing interlocutor ${n.name}:`,i)}})}catch(t){console.error("Error parsing interlocutor data:",t)}}sendCalloutUpdate(e,t,n=null){if(!this.socket||this.socket.readyState!==WebSocket.OPEN)return;const i=Date.now();if(i-this.lastCalloutSend<this.calloutThrottle)return;this.lastCalloutSend=i;const r={v:1,type:"callout",name:this.user.parameters.userName,visible:e,position:t?[t.x,t.y,t.z]:null,payload:n};this.socket.send(JSON.stringify(r))}receiveCalloutUpdate(e){var t,n;(n=(t=this.experience.world)==null?void 0:t.onCalloutUpdate)==null||n.call(t,e)}}const At={ComponentState:Object.freeze({DEFAULT:"default",TOUCHED:"touched",PRESSED:"pressed"}),ComponentProperty:Object.freeze({BUTTON:"button",X_AXIS:"xAxis",Y_AXIS:"yAxis",STATE:"state"}),ComponentType:Object.freeze({TRIGGER:"trigger",SQUEEZE:"squeeze",TOUCHPAD:"touchpad",THUMBSTICK:"thumbstick",BUTTON:"button"}),ButtonTouchThreshold:.05,AxisTouchThreshold:.1,VisualResponseProperty:Object.freeze({TRANSFORM:"transform",VISIBILITY:"visibility"})};async function Bd(s){const e=await fetch(s);if(e.ok)return e.json();throw new Error(e.statusText)}async function gy(s){if(!s)throw new Error("No basePath supplied");return await Bd(`${s}/profilesList.json`)}async function by(s,e,t=null,n=!0){if(!s)throw new Error("No xrInputSource supplied");if(!e)throw new Error("No basePath supplied");const i=await gy(e);let r;if(s.profiles.some(l=>{const c=i[l];return c&&(r={profileId:l,profilePath:`${e}/${c.path}`,deprecated:!!c.deprecated}),!!r}),!r){if(!t)throw new Error("No matching profile name found");const l=i[t];if(!l)throw new Error(`No matching profile name found and default profile "${t}" missing.`);r={profileId:t,profilePath:`${e}/${l.path}`,deprecated:!!l.deprecated}}const o=await Bd(r.profilePath);let a;if(n){let l;if(s.handedness==="any"?l=o.layouts[Object.keys(o.layouts)[0]]:l=o.layouts[s.handedness],!l)throw new Error(`No matching handedness, ${s.handedness}, in profile ${r.profileId}`);l.assetPath&&(a=r.profilePath.replace("profile.json",l.assetPath))}return{profile:o,assetPath:a}}const _y={xAxis:0,yAxis:0,button:0,state:At.ComponentState.DEFAULT};function vy(s=0,e=0){let t=s,n=e;if(Math.sqrt(s*s+e*e)>1){const o=Math.atan2(e,s);t=Math.cos(o),n=Math.sin(o)}return{normalizedXAxis:t*.5+.5,normalizedYAxis:n*.5+.5}}class xy{constructor(e){this.componentProperty=e.componentProperty,this.states=e.states,this.valueNodeName=e.valueNodeName,this.valueNodeProperty=e.valueNodeProperty,this.valueNodeProperty===At.VisualResponseProperty.TRANSFORM&&(this.minNodeName=e.minNodeName,this.maxNodeName=e.maxNodeName),this.value=0,this.updateFromComponent(_y)}updateFromComponent({xAxis:e,yAxis:t,button:n,state:i}){const{normalizedXAxis:r,normalizedYAxis:o}=vy(e,t);switch(this.componentProperty){case At.ComponentProperty.X_AXIS:this.value=this.states.includes(i)?r:.5;break;case At.ComponentProperty.Y_AXIS:this.value=this.states.includes(i)?o:.5;break;case At.ComponentProperty.BUTTON:this.value=this.states.includes(i)?n:0;break;case At.ComponentProperty.STATE:this.valueNodeProperty===At.VisualResponseProperty.VISIBILITY?this.value=this.states.includes(i):this.value=this.states.includes(i)?1:0;break;default:throw new Error(`Unexpected visualResponse componentProperty ${this.componentProperty}`)}}}class yy{constructor(e,t){if(!e||!t||!t.visualResponses||!t.gamepadIndices||Object.keys(t.gamepadIndices).length===0)throw new Error("Invalid arguments supplied");this.id=e,this.type=t.type,this.rootNodeName=t.rootNodeName,this.touchPointNodeName=t.touchPointNodeName,this.visualResponses={},Object.keys(t.visualResponses).forEach(n=>{const i=new xy(t.visualResponses[n]);this.visualResponses[n]=i}),this.gamepadIndices=Object.assign({},t.gamepadIndices),this.values={state:At.ComponentState.DEFAULT,button:this.gamepadIndices.button!==void 0?0:void 0,xAxis:this.gamepadIndices.xAxis!==void 0?0:void 0,yAxis:this.gamepadIndices.yAxis!==void 0?0:void 0}}get data(){return{id:this.id,...this.values}}updateFromGamepad(e){if(this.values.state=At.ComponentState.DEFAULT,this.gamepadIndices.button!==void 0&&e.buttons.length>this.gamepadIndices.button){const t=e.buttons[this.gamepadIndices.button];this.values.button=t.value,this.values.button=this.values.button<0?0:this.values.button,this.values.button=this.values.button>1?1:this.values.button,t.pressed||this.values.button===1?this.values.state=At.ComponentState.PRESSED:(t.touched||this.values.button>At.ButtonTouchThreshold)&&(this.values.state=At.ComponentState.TOUCHED)}this.gamepadIndices.xAxis!==void 0&&e.axes.length>this.gamepadIndices.xAxis&&(this.values.xAxis=e.axes[this.gamepadIndices.xAxis],this.values.xAxis=this.values.xAxis<-1?-1:this.values.xAxis,this.values.xAxis=this.values.xAxis>1?1:this.values.xAxis,this.values.state===At.ComponentState.DEFAULT&&Math.abs(this.values.xAxis)>At.AxisTouchThreshold&&(this.values.state=At.ComponentState.TOUCHED)),this.gamepadIndices.yAxis!==void 0&&e.axes.length>this.gamepadIndices.yAxis&&(this.values.yAxis=e.axes[this.gamepadIndices.yAxis],this.values.yAxis=this.values.yAxis<-1?-1:this.values.yAxis,this.values.yAxis=this.values.yAxis>1?1:this.values.yAxis,this.values.state===At.ComponentState.DEFAULT&&Math.abs(this.values.yAxis)>At.AxisTouchThreshold&&(this.values.state=At.ComponentState.TOUCHED)),Object.values(this.visualResponses).forEach(t=>{t.updateFromComponent(this.values)})}}class Sy{constructor(e,t,n){if(!e)throw new Error("No xrInputSource supplied");if(!t)throw new Error("No profile supplied");this.xrInputSource=e,this.assetUrl=n,this.id=t.profileId,this.layoutDescription=t.layouts[e.handedness],this.components={},Object.keys(this.layoutDescription.components).forEach(i=>{const r=this.layoutDescription.components[i];this.components[i]=new yy(i,r)}),this.updateFromGamepad()}get gripSpace(){return this.xrInputSource.gripSpace}get targetRaySpace(){return this.xrInputSource.targetRaySpace}get data(){const e=[];return Object.values(this.components).forEach(t=>{e.push(t.data)}),e}updateFromGamepad(){Object.values(this.components).forEach(e=>{e.updateFromGamepad(this.xrInputSource.gamepad)})}}const My="https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles",wy="generic-trigger";class Ey extends _t{constructor(){super(),this.motionController=null,this.envMap=null}setEnvironmentMap(e){return this.envMap==e?this:(this.envMap=e,this.traverse(t=>{t.isMesh&&(t.material.envMap=this.envMap,t.material.needsUpdate=!0)}),this)}updateMatrixWorld(e){super.updateMatrixWorld(e),this.motionController&&(this.motionController.updateFromGamepad(),Object.values(this.motionController.components).forEach(t=>{Object.values(t.visualResponses).forEach(n=>{const{valueNode:i,minNode:r,maxNode:o,value:a,valueNodeProperty:l}=n;i&&(l===At.VisualResponseProperty.VISIBILITY?i.visible=a:l===At.VisualResponseProperty.TRANSFORM&&(i.quaternion.slerpQuaternions(r.quaternion,o.quaternion,a),i.position.lerpVectors(r.position,o.position,a)))})}))}}function Ay(s,e){Object.values(s.components).forEach(t=>{const{type:n,touchPointNodeName:i,visualResponses:r}=t;if(n===At.ComponentType.TOUCHPAD)if(t.touchPointNode=e.getObjectByName(i),t.touchPointNode){const o=new bi(.001),a=new pt({color:255}),l=new Ye(o,a);t.touchPointNode.add(l)}else console.warn(`Could not find touch dot, ${t.touchPointNodeName}, in touchpad component ${t.id}`);Object.values(r).forEach(o=>{const{valueNodeName:a,minNodeName:l,maxNodeName:c,valueNodeProperty:h}=o;if(h===At.VisualResponseProperty.TRANSFORM){if(o.minNode=e.getObjectByName(l),o.maxNode=e.getObjectByName(c),!o.minNode){console.warn(`Could not find ${l} in the model`);return}if(!o.maxNode){console.warn(`Could not find ${c} in the model`);return}}o.valueNode=e.getObjectByName(a),o.valueNode||console.warn(`Could not find ${a} in the model`)})})}function uu(s,e){Ay(s.motionController,e),s.envMap&&e.traverse(t=>{t.isMesh&&(t.material.envMap=s.envMap,t.material.needsUpdate=!0)}),s.add(e)}class Ty{constructor(e=null,t=null){this.gltfLoader=e,this.path=My,this._assetCache={},this.onLoad=t,this.gltfLoader||(this.gltfLoader=new br)}setPath(e){return this.path=e,this}createControllerModel(e){const t=new Ey;let n=null;return e.addEventListener("connected",i=>{const r=i.data;r.targetRayMode!=="tracked-pointer"||!r.gamepad||r.hand||by(r,this.path,wy).then(({profile:o,assetPath:a})=>{t.motionController=new Sy(r,o,a);const l=this._assetCache[t.motionController.assetUrl];if(l)n=l.scene.clone(),uu(t,n),this.onLoad&&this.onLoad(n);else{if(!this.gltfLoader)throw new Error("GLTFLoader not set.");this.gltfLoader.setPath(""),this.gltfLoader.load(t.motionController.assetUrl,c=>{this._assetCache[t.motionController.assetUrl]=c,n=c.scene.clone(),uu(t,n),this.onLoad&&this.onLoad(n)},null,()=>{throw new Error(`Asset ${t.motionController.assetUrl} missing or malformed.`)})}}).catch(o=>{console.warn(o)})}),e.addEventListener("disconnected",()=>{t.motionController=null,t.remove(n),n=null}),t}}class uo{constructor(){this.pressUp=!1,this.pressDown=!1,this.isPressed=!1}update(e){this.pressUp=!this.pressUp&&this.isPressed&&!e,this.pressDown=!this.isPressed&&e,this.isPressed=e}}class Cy{constructor(e){this.x=new uo,this.y=new uo,this.a=new uo,this.b=new uo,e==="left"?(this.top=this.y,this.bottom=this.x):(this.top=this.b,this.bottom=this.a)}update(e){e.length>=5&&(this.bottom.update(e[4].pressed),this.top.update(e[5].pressed))}}class du{constructor(){this.threshold=.5,this.pressUp=!1,this.pressDown=!1,this.isPressed=!1,this.pressAmount=0}update(e){e.value!=null&&(this.pressUp=!this.pressUp&&this.isPressed&&e.value<this.threshold,this.pressDown=!this.isPressed&&e.value>=this.threshold,this.isPressed=e.value>=this.threshold,this.pressAmount=e.value)}}class fu{constructor(e){this.controller=e,this.gamepad=null,this.buttons=new Cy(e.name),this.primaryTrigger=new du,this.primarySqueeze=new du,this.thumbstick={x:0,y:0}}update(){this.gamepad&&(this.buttons.update(this.gamepad.buttons),this.gamepad.buttons.length>=2&&(this.primaryTrigger.update(this.gamepad.buttons[0]),this.primarySqueeze.update(this.gamepad.buttons[1])),this.thumbstick.x=this.gamepad.axes[2]||0,this.thumbstick.y=this.gamepad.axes[3]||0)}pulse(e=100,t=.5){var n;this.gamepad&&((n=this.gamepad.hapticActuators)==null?void 0:n.length)>0&&this.gamepad.hapticActuators[0].pulse(t,e)}}class Ry{constructor(e=4){var t,n;this.experience=new Tt,this.anchorPoint=null,this.isSqueezing=!1,this.speedScalar=e,this.lastTimeTeleported=Date.now(),this.teleportDelay=2e3,this.floors=((n=(t=this.experience.config)==null?void 0:t.locomotion)==null?void 0:n.floors)??[0,-5]}update(){const e=this.experience.controller.pointerController,t=e.padControls;if(t.primarySqueeze.pressDown&&!this.isSqueezing&&(this.anchorPoint=e.position.clone(),this.isSqueezing=!0),this.isSqueezing){const i=e.position.clone().sub(this.anchorPoint);i.multiplyScalar(this.speedScalar),this.experience.cameraGroup.position.sub(i),this.anchorPoint=e.position.clone()}if(t.primarySqueeze.pressUp&&this.isSqueezing&&(this.isSqueezing=!1,this.anchorPoint=null),t.buttons.bottom.pressDown)if(Date.now()>this.lastTimeTeleported+this.teleportDelay){console.log("teleport");const n=this.experience.cameraGroup.position.y;let i=this.floors.findIndex(o=>o===n);i===-1&&(i=this.floors.reduce((o,a,l)=>Math.abs(n-a)<Math.abs(n-this.floors[o])?l:o,0));let r=(i+1)%this.floors.length;this.experience.cameraGroup.position.set(0,this.floors[r],0),this.lastTimeTeleported=Date.now()}else{console.log("already teleported");return}}}class Py{constructor(){this.experience=new Tt,this.grabbedObject=null,this.isGrabbing=!1,this.controllerBoundingBox=new Vt,this.graspOffset=new R,this.graspQuaternionOffset=new $t}update(){const e=this.experience.controller.pointerController,t=e.padControls,n=new R,i=new $t;e.getWorldPosition(n),e.getWorldQuaternion(i);let r=null;t.buttons.top.pressDown,t.buttons.top.pressUp&&this.isGrabbing&&this.stopGrabbing(e),this.isGrabbing&&this.grabbedObject&&(this.grabbedObject.position.copy(n),this.grabbedObject.position.add(this.graspOffset),this.grabbedObject.quaternion.copy(i))}startGrabbing(e,t){this.grabbedObject=e,this.isGrabbing=!0,this.grabbedObject.onGrabStart(),console.log(`${this.grabbedObject.name} is now being grabbed`)}stopGrabbing(e){this.grabbedObject&&(this.grabbedObject.onGrabEnd(),console.log(`${this.grabbedObject.name} has been released`)),this.isGrabbing=!1,this.grabbedObject=null}}class Ly{constructor(){this.experience=new Tt,this.locomotion=new Ry,this.grasp=new Py,this.pointerActivationDelay=50,this.pointerLastActivated=0,this.thumbstickScrubDelay=30,this.thumbstickLastScrubTime=0,this.controller1=this.experience.renderer.instance.xr.getController(0),this.controller2=this.experience.renderer.instance.xr.getController(1),this.controller1.padControls=new fu(this.controller1),this.controller2.padControls=new fu(this.controller2),this.rightController=this.controller1,this.leftController=this.controller2,this.pointerController=this.rightController,this.rightController.name="right",this.leftController.name="left",this.experience.cameraGroup.add(this.leftController),this.experience.cameraGroup.add(this.rightController),this.r_connection=!1,this.l_connection=!1,this.addConnectionListeners();const e=new Ty;this.leftControllerGrip=this.experience.renderer.instance.xr.getControllerGrip(0),this.rightControllerGrip=this.experience.renderer.instance.xr.getControllerGrip(1),this.leftControllerGrip.add(e.createControllerModel(this.leftControllerGrip)),this.rightControllerGrip.add(e.createControllerModel(this.rightControllerGrip)),this.experience.cameraGroup.add(this.leftControllerGrip),this.experience.cameraGroup.add(this.rightControllerGrip),this.init()}update(){this.experience.isXRActive()&&(this.r_connection||this.l_connection)&&(this.leftController.padControls.update(),this.rightController.padControls.update(),this.updatePointer(),this.locomotion.update(),this.grasp.update())}addConnectionListeners(){this.controller1.addEventListener("connected",e=>{e.data.handedness==="right"?e.data.gamepad?(this.r_connection=!0,this.controller1.padControls.gamepad=e.data.gamepad,this.rightController=this.controller1):this.r_connection=!1:e.data.handedness==="left"&&(e.data.gamepad?(this.l_connection=!0,this.controller1.padControls.gamepad=e.data.gamepad,this.leftController=this.controller1):this.l_connection=!1)}),this.controller2.addEventListener("connected",e=>{e.data.handedness==="right"?e.data.gamepad?(this.r_connection=!0,this.controller2.padControls.gamepad=e.data.gamepad,this.rightController=this.controller2):this.r_connection=!1:e.data.handedness==="left"&&(e.data.gamepad?(this.l_connection=!0,this.controller2.padControls.gamepad=e.data.gamepad,this.leftController=this.controller2):this.l_connection=!1)})}init(){console.info("[Controller.js (both controllers)] initialized")}async updatePointer(){var e,t,n,i;if(this.r_connection?this.pointerController=this.rightController:this.l_connection&&(this.pointerController=this.leftController),this.pointerController){this.experience.pointer.setSource("controller",this.pointerController),this.experience.pointer.hover(),(this.pointerController.padControls.primaryTrigger.isPressed||this.pointerController.padControls.buttons.top.isPressed)&&Date.now()-this.pointerLastActivated>this.pointerActivationDelay&&(this.pointerLastActivated=Date.now(),this.experience.pointer.select());const r=this.pointerController.padControls.thumbstick,o=Date.now();Math.abs(r.x)>.5&&o-this.thumbstickLastScrubTime>this.thumbstickScrubDelay&&(r.x>0?(t=(e=this.experience.world)==null?void 0:e.callout)==null||t.advancePoint():(i=(n=this.experience.world)==null?void 0:n.callout)==null||i.decrementPoint(),this.thumbstickLastScrubTime=o)}}}class Dy{constructor(){this.experience=new Tt,this.raycaster=new Cd,this.raycaster.near=.001,this.raycaster.far=1e3,this.raycaster.params={Line:{threshold:.02},Line2:{threshold:.02},Mesh:{threshold:.005}},this.mode=null,this.camera=null,this.mouse=null,this.controller=null,this.currentIntersect=null,this.lastTriggeredObject=null,this.selectionCooldown=250,this.lastSelectionTime=0,this.pointerCone=null,this.createPointerCone()}createPointerCone(){const e=new _r(.002,.3,8),t=new pt({color:16777215,transparent:!0,opacity:.8});this.pointerCone=new Ye(e,t),this.pointerCone.position.z=-.15,this.pointerCone.rotation.x=-Math.PI/2,this.pointerCone.visible=!1}setSource(e,t){this.mode=e,e==="camera"?(this.camera=t.camera,this.mouse=t.mouse,this.controller=null,this.pointerCone.parent&&(this.pointerCone.visible=!1)):e==="controller"&&(this.controller=t,this.camera=null,this.mouse=null,this.pointerCone.parent!==this.controller&&(this.pointerCone.parent&&this.pointerCone.parent.remove(this.pointerCone),this.controller.add(this.pointerCone)),this.pointerCone.visible=!0)}hover(){if(this.mode==="camera"&&this.camera&&this.mouse)this.raycaster.setFromCamera(this.mouse,this.camera);else if(this.mode==="controller"&&this.controller){const n=new Le;n.identity().extractRotation(this.controller.matrixWorld),this.raycaster.ray.origin.setFromMatrixPosition(this.controller.matrixWorld),this.raycaster.ray.direction.set(0,0,-1).applyMatrix4(n)}else return;const e=this.raycaster.intersectObjects(this.experience.selectableObjects,!0);let t=[];for(const n of e){let i=n.object;for(;i&&!i.isPath&&!i.selectable&&i.parent;){if(i.parent.isPath){i=i.parent;break}if(i.parent.selectable){i=i.parent;break}i=i.parent}i.isPath?(n.object=i,t.push(n)):(i.active||i.selectable)&&t.push(n)}if(t.length)if(!this.currentIntersect)this.currentIntersect=t[0],this.enterIntersect(t);else if(this.currentIntersect.object.uuid===t[0].object.uuid){const n=t[0],i=n.object;if(i.isPath&&i.marker){const r=n.pointOnLine||n.point;if(r&&i.setSphere)try{i.setSphere(r)}catch(o){console.error("Error updating marker:",o)}}}else{try{this.currentIntersect.object.onUnhover&&this.currentIntersect.object.onUnhover()}catch(n){console.error("Error calling onUnhover:",n)}this.currentIntersect=t[0],this.enterIntersect(t)}else this.currentIntersect&&this.experience.selectableObjects.forEach(n=>{if(n.hover&&n.onUnhover)try{n.onUnhover()}catch(i){console.error("Error calling onUnhover:",i)}}),this.currentIntersect=null}enterIntersect(e){var t,n,i;try{this.currentIntersect.object.onHover&&this.currentIntersect.object.onHover(),this.mode==="controller"&&((i=(n=(t=this.experience.controller)==null?void 0:t.pointerController)==null?void 0:n.padControls)==null||i.pulse(25,.125))}catch(r){console.error("Error calling onHover:",r)}for(let r=1;r<e.length;r++)try{e[r].object.active&&e[r].object.onUnhover&&e[r].object.onUnhover()}catch(o){console.error("Error calling onUnhover:",o)}}select(){const e=performance.now();if(!(e-this.lastSelectionTime<this.selectionCooldown)){if(this.lastSelectionTime=e,this.lastTriggeredObject&&this.lastTriggeredObject.hideSphere)try{this.lastTriggeredObject.hideSphere()}catch(t){console.error("Error hiding sphere:",t)}if(this.currentIntersect)try{if(this.currentIntersect.object.isPath){const t=this.currentIntersect.pointOnLine||this.currentIntersect.point;this.currentIntersect.object.onSelect&&this.currentIntersect.object.onSelect(t),this.lastTriggeredObject=this.currentIntersect.object}else this.currentIntersect.object.onSelect&&this.currentIntersect.object.onSelect()}catch(t){console.error("Error calling onSelect:",t)}}}}let fo=null;class Tt extends Ko{constructor(e={}){if(super(),fo)return fo;if(fo=this,window.experience=this,this.canvas=e.canvas,!this.canvas)throw new Error("brahma-xr: new Experience({ canvas }) needs a canvas element");this.config={camera:{fov:35,near:.1,far:1e3,position:[-3.6277092514077784,1.6242714732329864,2.729361431631495],lookAt:[0,0,0],orbit:{damping:!1},...e.camera},networking:{url:null,room:"default",...e.networking},locomotion:{floors:[0,-5],...e.locomotion},debug:e.debug??window.location.hash==="#debug",xr:e.xr??!0},this.debug=new q0(this.config.debug),this.user=new fy,this.selectableObjects=[],this.grabbableObjects=[],this.world=null,this.sizes=new Y0,this.time=new K0,this.scene=new _v,this.resources=new $x(e.sources??[]),this.cameraGroup=new gt,this.scene.add(this.cameraGroup),this.camera=new uy,this.renderer=new dy,this.pointer=new Dy,this.pointer.setSource("camera",{camera:this.camera.instance,mouse:new le(0,0)}),this.setDesktopPointerListeners(),this.controller=new Ly,this.config.xr&&(this.renderer.instance.xr.enabled=!0,this.vrButton=As.createButton(this.renderer.instance),document.body.appendChild(this.vrButton)),this.renderer.instance.setAnimationLoop(()=>{var t;this.controller.update(),(t=this.networking)!=null&&t.canSendEmbodiment&&this.networking.sendEmbodiment(this.camera.instance.matrixWorld,this.controller.controller1.matrixWorld,this.controller.controller2.matrixWorld),this.renderer.instance.render(this.scene,this.camera.instance)}),this.sizes.on("resize",()=>{this.camera.resize(),this.renderer.resize(),this.trigger("resize")}),this.time.on("tick",()=>{this.update()}),this.resources.on("ready",()=>{this.trigger("ready")}),this.debug.active&&this.config.networking.url&&this.debug.ui.add({joinSession:()=>this.join()},"joinSession").name("Join Session")}join(){return this.networking||(this.networking=new my),this.networking.connect(),this.networking}update(){var e,t;this.camera.update(),this.isXRActive()||(this.cameraGroup.updateMatrixWorld(),this.camera.instance.updateMatrixWorld(),this.pointer.hover()),(t=(e=this.world)==null?void 0:e.update)==null||t.call(e),this.trigger("tick")}isXRActive(){return this.renderer.instance.xr.isPresenting}setDesktopPointerListeners(){this.onMouseMove=e=>{const t=new le(e.clientX/this.sizes.width*2-1,-(e.clientY/this.sizes.height)*2+1);this.pointer.setSource("camera",{camera:this.camera.instance,mouse:t})},this.onClick=()=>{this.pointer.select()},window.addEventListener("mousemove",this.onMouseMove),window.addEventListener("click",this.onClick)}destroy(){var e,t;this.time.stop(),this.sizes.dispose(),window.removeEventListener("mousemove",this.onMouseMove),window.removeEventListener("click",this.onClick),(e=this.networking)==null||e.disconnect(),this.renderer.instance.setAnimationLoop(null),this.scene.traverse(n=>{if(n instanceof Ye){n.geometry.dispose();for(const i in n.material){const r=n.material[i];r&&typeof r.dispose=="function"&&r.dispose()}}}),this.camera.controls.dispose(),this.renderer.instance.dispose(),this.debug.active&&this.debug.ui.destroy(),(t=this.vrButton)==null||t.remove(),window.experience===this&&delete window.experience,fo=null}}class Iy{constructor(e="Black"){this.experience=new Tt,this.scene=this.experience.scene,this.resources=this.experience.resources,this.scene.background=new De(e),this.setSunLight(),this.setAmbientLight()}setAmbientLight(){this.ambientLight=new x0("#ffffff",3),this.scene.add(this.ambientLight)}setSunLight(){this.sunLight=new Td("#ffffff",2),this.sunLight.castShadow=!0,this.sunLight.shadow.camera.far=15,this.sunLight.shadow.mapSize.set(1024,1024),this.sunLight.shadow.normalBias=.05,this.sunLight.position.set(3.5,2,10.25),this.scene.add(this.sunLight)}}const yt=40,pu=.75,Ac={verticalExaggeration:1};let Jn=null;function Ny(s){Jn=s}function Uy(){return Jn}const Bo=6378137,ps=Math.PI/180;function zd(s,e,t=0){const n=(e-Jn.lon)*ps*Bo*Math.cos(Jn.lat*ps),i=(s-Jn.lat)*ps*Bo;return{e:n,n:i,up:t-Jn.z_center}}function Hd(s,e,t,n=new R){return n.set(s/yt,t/yt,-e/yt)}function Xl(s,e,t,n){const{e:i,n:r,up:o}=zd(s,e,t);return Hd(i,r,o,n)}function Oy(s,e){return{lat:Jn.lat+e/(Bo*ps),lon:Jn.lon+s/(Bo*ps*Math.cos(Jn.lat*ps))}}function Fy(s){return{e:s.x*yt,n:-s.z*yt,up:s.y*yt}}class ky{constructor(){this.experience=new Tt,this.scene=this.experience.scene,this.resources=this.experience.resources,this.debug=this.experience.debug,this.skies={},this.currentSky="daytime",this.geometry=new bi(500,60,40),this.material=new pt({side:tn,colorSpace:vt}),this.mesh=new Ye(this.geometry,this.material),this.scene.add(this.mesh),this.setSkies(),this.resources.on("ready",()=>this.setSkies())}setSkies(){console.log("daytimeSkyTexture:",this.resources.items.daytimeSkyTexture),this.resources.items.daytimeSkyTexture&&(this.skies.daytime=this.resources.items.daytimeSkyTexture,this.resources.items.nighttimeSkyTexture&&(this.skies.nighttime=this.resources.items.nighttimeSkyTexture),this.resources.items.sunsetSkyTexture&&(this.skies.sunset=this.resources.items.sunsetSkyTexture),this.updateSky(),this.setDebug())}updateSky(){const e=this.skies[this.currentSky];e&&(this.material.map=e,this.material.needsUpdate=!0,e.mapping=Po,this.scene.environment=e)}setDebug(){!this.debug.active||this.debugFolder||(this.debugFolder=this.debug.ui.addFolder("Skysphere"),this.debugFolder.add(this,"currentSky",Object.keys(this.skies)).name("Environment").onChange(()=>{this.updateSky()}))}}const Va=3e3,mu=300,By=400;class zy{constructor(){this.experience=new Tt,this.scene=this.experience.scene,this.resources=this.experience.resources;const e=new St,t=new Float32Array(Va*3),n=new Float32Array(Va*3).fill(1);for(let o=0;o<Va*3;o+=3){const a=mu+Math.random()*(By-mu),l=Math.acos(2*Math.random()-1),c=Math.random()*2*Math.PI;t[o]=Math.sin(l)*Math.cos(c)*a,t[o+1]=Math.sin(l)*Math.sin(c)*a,t[o+2]=Math.cos(l)*a}e.setAttribute("position",new Bt(t,3)),e.setAttribute("color",new Bt(n,3));const i=new pc({size:5,sizeAttenuation:!0,color:"white",vertexColors:!0,transparent:!0,alphaTest:.001,depthWrite:!1,blending:lr});this.particles=new pd(e,i),this.particles.frustumCulled=!1,this.scene.add(this.particles);const r=()=>{const o=this.resources.items.starTexture;o&&(i.map=o,i.alphaMap=o,i.needsUpdate=!0)};r(),this.resources.on("ready",r)}update(){}}const gu=`
uniform float uZCenter;
uniform float uHeightScale;
uniform vec2 uOrigin;     // model-frame xz of this mesh's centre
uniform float uSiteSize;  // farm-wide imagery edge, scene units
varying vec2 vUv;
varying float vHeight;
varying vec2 vXZ;
varying vec2 vUvImagery;
void main(){
  vUv = uv;
  vHeight = position.z / uHeightScale + uZCenter;  // vertices are displaced on the CPU
  vXZ = uOrigin + vec2(position.x, -position.y);   // model-frame x/z (plane is rotated -PI/2 about X)
  vUvImagery = vec2(vXZ.x / uSiteSize + 0.5, 0.5 - vXZ.y / uSiteSize);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,Gd=`
uniform sampler2D uImagery;
// Up to two orthomosaics (one per scan showing); later slot wins where they overlap.
uniform sampler2D uOrtho0;
uniform sampler2D uOrthoMask0;
uniform float uOrthoOn0;
uniform vec2 uOrthoMin0;   // model-frame xz
uniform vec2 uOrthoMax0;
uniform sampler2D uOrtho1;
uniform sampler2D uOrthoMask1;
uniform float uOrthoOn1;
uniform vec2 uOrthoMin1;
uniform vec2 uOrthoMax1;
bool orthoAt(sampler2D tex, sampler2D mask, float on, vec2 mn, vec2 mx, vec2 xz, inout vec3 col){
  if (on < 0.5 || any(lessThan(xz, mn)) || any(greaterThan(xz, mx))) return false;
  vec2 t = (xz - mn) / (mx - mn);
  vec2 ouv = vec2(t.x, 1.0 - t.y);   // ortho row 0 = north = min z
  if (texture2D(mask, ouv).r < 0.9) return false;
  col = texture2D(tex, ouv).rgb;
  return true;
}
// gate: (1,1) on draped meshes; the terrain passes its per-scan "ortho on terrain" flags
vec3 groundColor(vec2 xz, vec2 uvImagery, vec2 gate){
  vec3 col = texture2D(uImagery, uvImagery).rgb;
  if (!orthoAt(uOrtho1, uOrthoMask1, uOrthoOn1 * gate.y, uOrthoMin1, uOrthoMax1, xz, col))
    orthoAt(uOrtho0, uOrthoMask0, uOrthoOn0 * gate.x, uOrthoMin0, uOrthoMax0, xz, col);
  return col;
}`,bu=Gd+`
uniform sampler2D uHeight;
uniform float uTexel;
uniform float uMetresPerTexel;
uniform float uExaggeration;
uniform vec3 uSun;
uniform float uImageryMix;
uniform vec2 uOrthoGate;
uniform vec2 uCutMin;     // model-frame xz box carved out of this mesh (the detail patch lives there)
uniform vec2 uCutMax;
uniform sampler2D uImageryRef; // unused on the coarse mesh; keeps the uniform set uniform
varying vec2 vUv;
varying float vHeight;
varying vec2 vXZ;
varying vec2 vUvImagery;
float decode(vec3 c){ return (c.r*255.0*256.0 + c.g*255.0 + c.b*255.0/256.0) - 32768.0; }
void main(){
  if (all(greaterThan(vXZ, uCutMin)) && all(lessThan(vXZ, uCutMax))) discard;
  float zl = decode(texture2D(uHeight, vUv - vec2(uTexel,0.0)).rgb);
  float zr = decode(texture2D(uHeight, vUv + vec2(uTexel,0.0)).rgb);
  float zd = decode(texture2D(uHeight, vUv - vec2(0.0,uTexel)).rgb);
  float zu = decode(texture2D(uHeight, vUv + vec2(0.0,uTexel)).rgb);
  vec3 n = normalize(vec3(-(zr-zl)*uExaggeration, -(zu-zd)*uExaggeration, 2.0*uMetresPerTexel));
  float light = 0.45 + 0.65 * max(dot(n, normalize(uSun)), 0.0);
  vec3 img = groundColor(vXZ, vUvImagery, uOrthoGate);
  vec3 hyps = mix(vec3(0.16,0.24,0.14), vec3(0.75,0.68,0.5), smoothstep(80.0, 175.0, vHeight));
  vec3 col = mix(hyps, img, uImageryMix) * light;
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}`,Hy=`
uniform vec3 uModelOrigin; // world position of the model group
uniform float uSize;       // terrain edge length, scene units
varying vec2 vUv;
varying vec2 vXZ;
varying vec3 vNormalW;
void main(){
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vec3 mp = wp.xyz - uModelOrigin;
  vXZ = mp.xz;
  vUv = vec2(mp.x / uSize + 0.5, 0.5 - mp.z / uSize);
  vNormalW = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,Gy=Gd+`
uniform vec3 uSun;
varying vec2 vUv;
varying vec2 vXZ;
varying vec3 vNormalW;
void main(){
  vec3 n = normalize(vNormalW);
  if (!gl_FrontFacing) n = -n;
  vec3 sun = normalize(uSun);
  float ndl = dot(n, sun);
  float light = 0.32 + 0.85 * max(ndl, 0.0) + 0.15 * max(-n.y, 0.0);  // strong key light, faint bounce on under-faces
  vec3 col = groundColor(vXZ, vUv, vec2(1.0)) * light;
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}`;class Vy extends gt{constructor(){super(),this.experience=new Tt,this.site=Uy(),this.size=this.site.size_m/yt,this._lodPosition=new R,this._lodQuaternion=new $t,this._lodNextPosition=new R,this._lodNextQuaternion=new $t,this._lodLastMotion=performance.now(),this.shapeMode="detail",this.textureMode="survey",this.orthosEnabled=!0,this.setProbe()}setProbe(){this.isPath=!0,this.name="terrain",this.marker=new Ye(new bi(.015,12,10),new pt({color:6211839,depthTest:!1})),this.marker.renderOrder=997,this.marker.visible=!1,this.add(this.marker),this.labelCanvas=document.createElement("canvas"),this.labelCanvas.width=640,this.labelCanvas.height=160,this.labelCtx=this.labelCanvas.getContext("2d"),this.labelTex=new Li(this.labelCanvas),this.labelTex.colorSpace=vt,this.label=new vv(new hd({map:this.labelTex,transparent:!0,depthTest:!1})),this.label.scale.set(1.2,.3,1),this.label.center.set(.5,-.25),this.label.renderOrder=997,this.label.visible=!1,this.marker.add(this.label)}onHover(){this.hover=!0,this.marker.visible=!0,this.label.visible=!0}onUnhover(){this.hover=!1,this.marker.visible=!1,this.label.visible=!1}setSphere(e){const t=this.worldToLocal(e.clone());this.marker.position.copy(t);const n=this.experience.renderer.instance.xr,r=(n.isPresenting?n.getCamera():this.experience.camera.instance).getWorldPosition(new R).distanceTo(e),o=dt.clamp(r*.18,.05,1.2),a=Ac.verticalExaggeration;this.label.scale.set(o,o/4/a,1);const l=dt.clamp(r*.15,.1,1);this.marker.scale.set(l,l/a,l);const{e:c,n:h}=Fy(t),{lat:u,lon:d}=Oy(c,h),m=this.heightAt(c,h),b=this.labelCtx,_=this.labelCanvas.width,g=this.labelCanvas.height;b.clearRect(0,0,_,g),b.fillStyle="rgba(14,18,28,0.9)",b.beginPath(),b.roundRect(0,0,_,g,24),b.fill(),b.strokeStyle="#5ec8ff",b.lineWidth=4,b.beginPath(),b.roundRect(2,2,_-4,g-4,22),b.stroke(),b.fillStyle="#7f8aa3",b.font="22px system-ui, sans-serif",b.fillText("TERRAIN",28,44),b.fillStyle="#f2f5fa",b.font="34px system-ui, sans-serif",b.fillText(`${u.toFixed(6)}, ${d.toFixed(6)}`,28,88),b.fillText(`${m.toFixed(1)} m MSL`,28,132),b.fillStyle="#7f8aa3",b.font="22px system-ui, sans-serif",b.fillText(`E ${c.toFixed(0)} m  N ${h.toFixed(0)} m`,330,132),this.labelTex.needsUpdate=!0}onSelect(){}hideSphere(){}async load(){const[e,t]=await Promise.all([fetch("./farm/height.png").then(_=>_.blob()).then(_=>createImageBitmap(_,{colorSpaceConversion:"none",premultiplyAlpha:"none"})),new ko().loadAsync("./farm/imagery.jpg")]),n=new OffscreenCanvas(e.width,e.height),i=n.getContext("2d",{willReadFrequently:!0});i.drawImage(e,0,0);const r=i.getImageData(0,0,n.width,n.height).data;this.hw=n.width,this.hh=n.height,this.heights=new Float32Array(this.hw*this.hh);for(let _=0;_<this.heights.length;_++)this.heights[_]=r[_*4]*256+r[_*4+1]+r[_*4+2]/256-32768;const o=new Li(n);o.colorSpace=dn,o.minFilter=Pt,o.magFilter=Pt,o.generateMipmaps=!1,t.colorSpace=vt,t.anisotropy=this.experience.renderer.instance.capabilities.getMaxAnisotropy(),this.uniforms={uHeight:{value:o},uImagery:{value:t},uHeightScale:{value:1/yt},uZCenter:{value:this.site.z_center},uTexel:{value:1/this.hw},uMetresPerTexel:{value:this.site.size_m/(this.hw-1)},uExaggeration:{value:1},uSun:{value:new R(-.6,.55,.45)},uImageryMix:{value:1},uOrthoGate:{value:new le(1,1)},uOrigin:{value:new le(0,0)},uSiteSize:{value:this.size},uCutMin:{value:new le(1e9,1e9)},uCutMax:{value:new le(1e9,1e9)},uOrtho0:{value:null},uOrthoMask0:{value:null},uOrthoOn0:{value:0},uOrthoMin0:{value:new le},uOrthoMax0:{value:new le},uOrtho1:{value:null},uOrthoMask1:{value:null},uOrthoOn1:{value:0},uOrthoMin1:{value:new le},uOrthoMax1:{value:new le}},this.orthoSlots=[null,null],this.orthoTex=new Map;const a=this.hw-1,l=new Tn(this.size,this.size,a,a),c=l.attributes.position;for(let _=0;_<c.count;_++)c.setZ(_,(this.heights[_]-this.site.z_center)/yt);c.needsUpdate=!0,l.computeBoundingSphere(),this.mesh=new Ye(l,new cn({vertexShader:gu,fragmentShader:bu,uniforms:this.uniforms})),this.mesh.rotation.x=-Math.PI/2,this.add(this.mesh),this.mesh.raycast=()=>{};const h=128,u=new Tn(this.size,this.size,h,h),d=u.attributes.position,m=u.attributes.uv;for(let _=0;_<d.count;_++){const g=Math.round(m.getX(_)*(this.hw-1)),p=Math.round((1-m.getY(_))*(this.hh-1));d.setZ(_,(this.heights[p*this.hw+g]-this.site.z_center)/yt)}d.needsUpdate=!0,u.computeBoundingSphere(),this.raycastProxy=new Ye(u,new pt({side:en,colorWrite:!1,depthWrite:!1})),this.raycastProxy.rotation.x=-Math.PI/2,this.raycastProxy.name="terrain-raycast-proxy",this.add(this.raycastProxy),this.marker.raycast=()=>{},this.label.raycast=()=>{},this.experience.selectableObjects.push(this);const b=new Ye(new gi(this.size,.02,this.size),new pt({color:1843760}));return b.position.y=(this.site.z_min-this.site.z_center)/yt-.02,b.raycast=()=>{},this.base=b,this.add(b),await this.loadDetail(),this}async loadDetail(){const e=await fetch("./farm/detail.json").then(w=>w.ok?w.json():null).catch(()=>null);if(!e)return;const t=await fetch("./farm/detail_height.png").then(w=>w.blob()).then(w=>createImageBitmap(w,{colorSpaceConversion:"none",premultiplyAlpha:"none"})),n=new OffscreenCanvas(t.width,t.height),i=n.getContext("2d",{willReadFrequently:!0});i.drawImage(t,0,0);const r=i.getImageData(0,0,n.width,n.height).data,o=n.width,a=new Float32Array(o*o);for(let w=0;w<a.length;w++)a[w]=r[w*4]*256+r[w*4+1]+r[w*4+2]/256-32768;const l=new Li(n);l.colorSpace=dn,l.minFilter=l.magFilter=Pt,l.generateMipmaps=!1;const c=e.size_m/yt,h=w=>{const x=new Tn(c,c,w,w),y=x.attributes.position;if(w===o-1)for(let I=0;I<y.count;I++)y.setZ(I,(a[I]-this.site.z_center)/yt);else{const I=x.attributes.uv;for(let D=0;D<y.count;D++){const P=Math.round(I.getX(D)*(o-1)),B=Math.round((1-I.getY(D))*(o-1));y.setZ(D,(a[B*o+P]-this.site.z_center)/yt)}}return y.needsUpdate=!0,x.computeBoundingSphere(),x},u=e.center_e/yt,d=-e.center_n/yt,m={...this.uniforms,uHeight:{value:l},uTexel:{value:1/o},uMetresPerTexel:{value:e.gsd_m},uOrigin:{value:new le(u,d)},uCutMin:{value:new le(1e9,1e9)},uCutMax:{value:new le(1e9,1e9)}},b=new cn({vertexShader:gu,fragmentShader:bu,uniforms:m}),_=new Ye(h(o-1),b),g=new Ye(h(Math.min(o-1,384)),b);_.raycast=()=>{},g.raycast=()=>{},_.rotation.x=-Math.PI/2,g.rotation.x=-Math.PI/2,_.position.set(u,0,d),g.position.copy(_.position),g.visible=!1,this.add(_,g),this.detail={meta:e,heights:a,n:o,mesh:_,lowMesh:g,half:e.size_m/2};const p=e.gsd_m*2/yt;this.uniforms.uCutMin.value.set(u-c/2+p,d-c/2+p),this.uniforms.uCutMax.value.set(u+c/2-p,d+c/2-p),this.detailCutMin=this.uniforms.uCutMin.value.clone(),this.detailCutMax=this.uniforms.uCutMax.value.clone(),console.log(`terrain detail: ${e.size_m} m @ ${e.gsd_m} m (${o}x${o})`)}update(){var a;if(!((a=this.detail)!=null&&a.lowMesh))return;const e=this.experience.renderer.instance,t=e.xr.isPresenting?e.xr.getCamera(this.experience.camera.instance):this.experience.camera.instance;t.getWorldPosition(this._lodNextPosition),t.getWorldQuaternion(this._lodNextQuaternion);const n=this._lodNextPosition.distanceToSquared(this._lodPosition)>1e-8||1-Math.abs(this._lodNextQuaternion.dot(this._lodQuaternion))>1e-8,i=performance.now();n&&(this._lodLastMotion=i),this._lodPosition.copy(this._lodNextPosition),this._lodQuaternion.copy(this._lodNextQuaternion),this.isNavigating=n||i-this._lodLastMotion<180;const r=this.shapeMode==="detail",o=e.xr.isPresenting||this.isNavigating;this.detail.mesh.visible=r&&!o,this.detail.lowMesh.visible=r&&o}setShapeMode(e){this.shapeMode=e,this.scale.y=e==="flat"?1e-4:1;const t=e==="detail";this.detail&&(this.detail.mesh.visible=t,this.detail.lowMesh.visible=!1),t&&this.detailCutMin?(this.uniforms.uCutMin.value.copy(this.detailCutMin),this.uniforms.uCutMax.value.copy(this.detailCutMax)):(this.uniforms.uCutMin.value.set(1e9,1e9),this.uniforms.uCutMax.value.set(1e9,1e9))}setTextureMode(e){this.textureMode=e,this.orthosEnabled=e==="survey",this.uniforms.uImageryMix.value=e==="elevation"?0:1;const t=this.uniforms.uOrthoGate.value;this.orthosEnabled||t.set(0,0)}drapeMaterial(){return new cn({vertexShader:Hy,fragmentShader:Gy,uniforms:{uImagery:this.uniforms.uImagery,...Object.fromEntries(["uOrtho","uOrthoMask","uOrthoOn","uOrthoMin","uOrthoMax"].flatMap(e=>[0,1].map(t=>[e+t,this.uniforms[e+t]]))),uSun:this.uniforms.uSun,uSize:{value:this.size},uModelOrigin:{value:this.parent.getWorldPosition(new R)}},side:en,depthTest:!1})}async setOrthos(e){var i,r;e=e.filter(Boolean).slice(0,2);const t=new ko,n=this.uniforms.uOrthoGate.value;for(let o=0;o<2;o++){const a=((i=e[o])==null?void 0:i.spec)??null;if(n.setComponent(o,this.orthosEnabled&&((r=e[o])==null?void 0:r.onTerrain)!==!1?1:0),!a){this.uniforms["uOrthoOn"+o].value=0,this.orthoSlots[o]=null;continue}if(this.orthoSlots[o]!==a){if(!this.orthoTex.has(a)){const[u,d]=await Promise.all([t.loadAsync(a.file),t.loadAsync(a.mask)]);u.colorSpace=vt,u.anisotropy=this.experience.renderer.instance.capabilities.getMaxAnisotropy(),d.colorSpace=dn,d.minFilter=d.magFilter=Kt,d.generateMipmaps=!1,this.orthoTex.set(a,[u,d])}const[l,c]=this.orthoTex.get(a);this.uniforms["uOrtho"+o].value=l,this.uniforms["uOrthoMask"+o].value=c;const h=a.bounds_m;this.uniforms["uOrthoMin"+o].value.set(h.e_min/yt,-h.n_max/yt),this.uniforms["uOrthoMax"+o].value.set(h.e_max/yt,-h.n_min/yt),this.orthoSlots[o]=a}this.uniforms["uOrthoOn"+o].value=1}}setExaggeration(e){this.uniforms&&(this.uniforms.uExaggeration.value=e)}heightAt(e,t){if(!this.heights)return this.site.z_center;const n=this.detail;if(n&&Math.abs(e-n.meta.center_e)<n.half&&Math.abs(t-n.meta.center_n)<n.half){const d=dt.clamp((e-(n.meta.center_e-n.half))/n.meta.gsd_m,0,n.n-1.001),m=dt.clamp((n.meta.center_n+n.half-t)/n.meta.gsd_m,0,n.n-1.001),b=Math.floor(d),_=Math.floor(m),g=d-b,p=m-_,w=(x,y)=>n.heights[y*n.n+x];return(w(b,_)*(1-g)+w(b+1,_)*g)*(1-p)+(w(b,_+1)*(1-g)+w(b+1,_+1)*g)*p}const i=this.site.size_m,r=dt.clamp((e+i/2)/i*(this.hw-1),0,this.hw-1.001),o=dt.clamp((i/2-t)/i*(this.hh-1),0,this.hh-1.001),a=Math.floor(r),l=Math.floor(o),c=r-a,h=o-l,u=(d,m)=>this.heights[m*this.hw+d];return(u(a,l)*(1-c)+u(a+1,l)*c)*(1-h)+(u(a,l+1)*(1-c)+u(a+1,l+1)*c)*h}}class Tc{constructor({lat:e,lon:t,alt:n,channels:i={},records:r=[]}){this.lat=e,this.lon=t,this.alt=n,this.channels=i,this.records=r,this._positions=null}static from(e,{lat:t="lat",lon:n="lon",alt:i="alt_msl",exclude:r=[]}={}){const o=e.length,a=new Float64Array(o),l=new Float64Array(o),c=new Float32Array(o),h=new Set([t,n,i,...r]),u={};return e.forEach((d,m)=>{a[m]=d[t],l[m]=d[n],c[m]=d[i]??0;for(const b in d)h.has(b)||typeof d[b]!="number"||((u[b]??(u[b]=new(b==="utc"?Float64Array:Float32Array)(o).fill(NaN)))[m]=d[b])}),new Tc({lat:a,lon:l,alt:c,channels:u,records:e})}get length(){return this.lat.length}positions(){if(!this._positions){const e=this.length,t=new Float32Array(e*3),n=new R;for(let i=0;i<e;i++)Xl(this.lat[i],this.lon[i],this.alt[i],n),t[i*3]=n.x,t[i*3+1]=n.y,t[i*3+2]=n.z;this._positions=t}return this._positions}position(e,t=new R){const n=this.positions();return t.set(n[e*3],n[e*3+1],n[e*3+2])}channel(e){return e==="alt"?this.alt:this.channels[e]??null}channelKeys(){return Object.keys(this.channels)}record(e){return this.records[e]}}const _u=new Vt,po=new R;class Vd extends y0{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new xt(e,3)),this.setAttribute("uv",new xt(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const n=new zl(t,6,1);return this.setAttribute("instanceStart",new En(n,3,0)),this.setAttribute("instanceEnd",new En(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const n=new zl(t,6,1);return this.setAttribute("instanceColorStart",new En(n,3,0)),this.setAttribute("instanceColorEnd",new En(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new e0(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vt);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),_u.setFromBufferAttribute(t),this.boundingBox.union(_u))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new gn),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)po.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(po)),po.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(po));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}pe.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new le(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};sn.line={uniforms:sc.merge([pe.common,pe.fog,pe.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class Cc extends cn{constructor(e){super({type:"LineMaterial",uniforms:sc.clone(sn.line.uniforms),vertexShader:sn.line.vertexShader,fragmentShader:sn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const Wa=new tt,vu=new R,xu=new R,zt=new tt,Ht=new tt,Pn=new tt,ja=new R,Xa=new Le,Gt=new D0,yu=new R,mo=new Vt,go=new gn,Ln=new tt;let In,Di;function Su(s,e,t){return Ln.set(0,0,-e,1).applyMatrix4(s.projectionMatrix),Ln.multiplyScalar(1/Ln.w),Ln.x=Di/t.width,Ln.y=Di/t.height,Ln.applyMatrix4(s.projectionMatrixInverse),Ln.multiplyScalar(1/Ln.w),Math.abs(Math.max(Ln.x,Ln.y))}function Wy(s,e){const t=s.matrixWorld,n=s.geometry,i=n.attributes.instanceStart,r=n.attributes.instanceEnd,o=Math.min(n.instanceCount,i.count);for(let a=0,l=o;a<l;a++){Gt.start.fromBufferAttribute(i,a),Gt.end.fromBufferAttribute(r,a),Gt.applyMatrix4(t);const c=new R,h=new R;In.distanceSqToSegment(Gt.start,Gt.end,h,c),h.distanceTo(c)<Di*.5&&e.push({point:h,pointOnLine:c,distance:In.origin.distanceTo(h),object:s,face:null,faceIndex:a,uv:null,uv1:null})}}function jy(s,e,t){const n=e.projectionMatrix,r=s.material.resolution,o=s.matrixWorld,a=s.geometry,l=a.attributes.instanceStart,c=a.attributes.instanceEnd,h=Math.min(a.instanceCount,l.count),u=-e.near;In.at(1,Pn),Pn.w=1,Pn.applyMatrix4(e.matrixWorldInverse),Pn.applyMatrix4(n),Pn.multiplyScalar(1/Pn.w),Pn.x*=r.x/2,Pn.y*=r.y/2,Pn.z=0,ja.copy(Pn),Xa.multiplyMatrices(e.matrixWorldInverse,o);for(let d=0,m=h;d<m;d++){if(zt.fromBufferAttribute(l,d),Ht.fromBufferAttribute(c,d),zt.w=1,Ht.w=1,zt.applyMatrix4(Xa),Ht.applyMatrix4(Xa),zt.z>u&&Ht.z>u)continue;if(zt.z>u){const x=zt.z-Ht.z,y=(zt.z-u)/x;zt.lerp(Ht,y)}else if(Ht.z>u){const x=Ht.z-zt.z,y=(Ht.z-u)/x;Ht.lerp(zt,y)}zt.applyMatrix4(n),Ht.applyMatrix4(n),zt.multiplyScalar(1/zt.w),Ht.multiplyScalar(1/Ht.w),zt.x*=r.x/2,zt.y*=r.y/2,Ht.x*=r.x/2,Ht.y*=r.y/2,Gt.start.copy(zt),Gt.start.z=0,Gt.end.copy(Ht),Gt.end.z=0;const _=Gt.closestPointToPointParameter(ja,!0);Gt.at(_,yu);const g=dt.lerp(zt.z,Ht.z,_),p=g>=-1&&g<=1,w=ja.distanceTo(yu)<Di*.5;if(p&&w){Gt.start.fromBufferAttribute(l,d),Gt.end.fromBufferAttribute(c,d),Gt.start.applyMatrix4(o),Gt.end.applyMatrix4(o);const x=new R,y=new R;In.distanceSqToSegment(Gt.start,Gt.end,y,x),t.push({point:y,pointOnLine:x,distance:In.origin.distanceTo(y),object:s,face:null,faceIndex:d,uv:null,uv1:null})}}}class Xy extends Ye{constructor(e=new Vd,t=new Cc({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let o=0,a=0,l=t.count;o<l;o++,a+=2)vu.fromBufferAttribute(t,o),xu.fromBufferAttribute(n,o),i[a]=a===0?0:i[a-1],i[a+1]=i[a]+vu.distanceTo(xu);const r=new zl(i,2,1);return e.setAttribute("instanceDistanceStart",new En(r,1,0)),e.setAttribute("instanceDistanceEnd",new En(r,1,1)),this}raycast(e,t){const n=this.material.worldUnits,i=e.camera;i===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;In=e.ray;const o=this.matrixWorld,a=this.geometry,l=this.material;Di=l.linewidth+r,a.boundingSphere===null&&a.computeBoundingSphere(),go.copy(a.boundingSphere).applyMatrix4(o);let c;if(n)c=Di*.5;else{const u=Math.max(i.near,go.distanceToPoint(In.origin));c=Su(i,u,l.resolution)}if(go.radius+=c,In.intersectsSphere(go)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),mo.copy(a.boundingBox).applyMatrix4(o);let h;if(n)h=Di*.5;else{const u=Math.max(i.near,mo.distanceToPoint(In.origin));h=Su(i,u,l.resolution)}mo.expandByScalar(h),In.intersectsBox(mo)!==!1&&(n?Wy(this,t):jy(this,i,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport(Wa),this.material.uniforms.resolution.value.set(Wa.z,Wa.w))}}class Wd extends Vd{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setPositions(n),this}setColors(e){const t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setColors(n),this}fromLine(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class qy extends Xy{constructor(e=new Wd,t=new Cc({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}}const Yy=[.13572138,4.6153926,-42.66032258,132.13108234],Ky=[-152.94239396,59.28637943],$y=[.09140261,2.19418839,4.84296658,-14.18503333],Zy=[4.27729857,2.82956604],Jy=[.1066733,12.64194608,-60.58204836,110.36276771],Qy=[-89.90310912,27.34824973];function qa(s,e,t){return e[0]+s*(e[1]+s*(e[2]+s*e[3]))+s**4*(t[0]+s*t[1])}function jd(s,e=new De){const t=dt.clamp(s,0,1);return e.setRGB(dt.clamp(qa(t,Yy,Ky),0,1),dt.clamp(qa(t,$y,Zy),0,1),dt.clamp(qa(t,Jy,Qy),0,1))}function eS(s){const e=s.filter(r=>r!=null&&Number.isFinite(r)).sort((r,o)=>r-o);if(!e.length)return{lo:0,hi:1};const t=r=>e[Math.min(e.length-1,Math.floor(r*(e.length-1)))],n=t(.02),i=t(.98);return i>n?{lo:n,hi:i}:{lo:e[0],hi:e[e.length-1]+(e[0]===e[e.length-1]?1:0)}}function Mu(s,e,t=""){if(e==null||!Number.isFinite(e))return"—";if(s==="gas_ohm")return`${(e/1e3).toFixed(e>=1e5?0:1)} kΩ`;const n=Math.abs(e)>=100?0:1;return`${e.toFixed(n)}${t?" "+t:""}`}let ls=null;function tS(){if(ls)return ls;const s=document.createElement("div");s.id="legend",s.innerHTML='<div class="title"></div><canvas width="256" height="14"></canvas><div class="ticks"><span class="lo"></span><span class="hi"></span></div>',document.body.appendChild(s);const e=s.querySelector("canvas").getContext("2d"),t=new De;for(let n=0;n<256;n++)jd(n/255,t),e.fillStyle=t.getStyle(),e.fillRect(n,0,1,14);return ls={el:s,title:s.querySelector(".title"),lo:s.querySelector(".lo"),hi:s.querySelector(".hi")},ls}function nS({key:s,label:e,unit:t,lo:n,hi:i}){const r=tS();r.title.textContent=e+(t?` (${t})`:""),r.lo.textContent=Mu(s,n,t),r.hi.textContent=Mu(s,i,t),r.el.style.display="block"}function wu(){ls&&(ls.el.style.display="none")}class Xd extends gt{constructor({flight:e,track:t,panel:n,color:i,uiScale:r=1,linewidth:o=3,coneRadius:a=.012}){super(),this.experience=new Tt,this.flight=e,this.track=t,this.panel=n,this.isPath=!0,this.name=e.id+"-path",this.color=new De(i),this.uiScale=r,this.linewidth=o,this.hover=!1,this.emphasis=1,this.colorKey=null,this.positions=t.positions(),this._colors=new Float32Array(this.positions.length),this.geometry=new Wd,this.geometry.setPositions(this.positions),this.material=new Cc({vertexColors:!0,linewidth:o,transparent:!0,opacity:.95}),this.line=new qy(this.geometry,this.material),this.line.computeLineDistances(),this.line.renderOrder=2,this.add(this.line),this.paint(()=>this.color),a>0&&this.buildCones(a),this.marker=new Ye(new bi(.02*r,16,12),new pt({color:16777215})),this.marker.visible=!1,this.add(this.marker),this.setResolution(),this.experience.on("resize",()=>this.setResolution());const l=this.experience.renderer.instance.xr;l.addEventListener("sessionstart",()=>this.setResolution()),l.addEventListener("sessionend",()=>this.setResolution()),this.experience.selectableObjects.push(this)}buildCones(e){const t=this.track.length,n=this.track.channel("heading"),i=this.track.channel("gimbal_pitch"),r=new _r(e,e*2.5,8);r.translate(0,-e*1.25,0),r.rotateX(Math.PI);const o=new dc(r,new pt({color:16777215}),t),a=new Le,l=new $t,c=new R(1,1,1),h=new R(0,1,0),u=new R,d=new R;for(let m=0;m<t;m++){const b=dt.degToRad(Eu(n==null?void 0:n[m],0)),_=dt.degToRad(Eu(i==null?void 0:i[m],-90));u.set(Math.sin(b)*Math.cos(_),Math.sin(_),-Math.cos(b)*Math.cos(_)),l.setFromUnitVectors(h,u.negate()),a.compose(this.track.position(m,d),l,c),o.setMatrixAt(m,a),o.setColorAt(m,this.color)}o.renderOrder=2,this.samples=o,this.add(o)}paint(e){const t=this.track.length,n=this._colors,i=new De;for(let r=0;r<t;r++){const o=e(r,i)??i;n[r*3]=o.r,n[r*3+1]=o.g,n[r*3+2]=o.b}this.geometry.setColors(n)}colorBy(e){var o;if(this.colorKey=!e||e==="none"?null:e,!this.colorKey){this.paint(()=>this.color),wu();return}const t=this.track.channel(e);if(!t)return;const{lo:n,hi:i}=eS(t),r=new De(3817808);if(this.paint((a,l)=>Number.isFinite(t[a])?jd((t[a]-n)/(i-n),l):r),this.visible){const a=e==="alt"?{label:"Altitude",unit:"m MSL"}:((o=this.flight.metrics)==null?void 0:o[e])??{label:e,unit:""};nS({key:e,label:a.label,unit:a.unit,lo:n,hi:i})}}setLineWidth(e){this.linewidth=e,this.material.linewidth=this.hover?e+2:e}setConesVisible(e){this.samples&&(this.samples.visible=e)}highlightWindow(e,t){if(!this.samples)return 0;const n=this.track.channel("utc"),i=new De(16777215),r=this.color.clone().multiplyScalar(.45),o=e!=null;let a=0;for(let l=0;l<this.track.length;l++){const c=n==null?void 0:n[l],h=o&&Number.isFinite(c)&&c>=e&&c<=t;h&&a++,this.samples.setColorAt(l,h?i:o?r:this.color)}return this.samples.instanceColor.needsUpdate=!0,a}pointAt(e,t=new R){const n=this.positions,i=this.track.length,r=Math.min(Math.max(Math.floor(e),0),i-2),o=dt.clamp(e-r,0,1),a=r*3;return t.set(n[a]+(n[a+3]-n[a])*o,n[a+1]+(n[a+4]-n[a+1])*o,n[a+2]+(n[a+5]-n[a+2])*o)}rideDuration(){const e=this.track.length;if(e<2)return 0;const t=this.track.channel("utc"),n=t?t[e-1]-t[0]:NaN;return Number.isFinite(n)&&n>0?n:e-1}ridePointAt(e,t=new R){const n=this.track.length;if(!n)return t.set(0,0,0);if(n===1)return this.track.position(0,t);const i=this.rideDuration(),r=dt.clamp(Number(e)||0,0,i),o=this.track.channel("utc");if(!(o&&Number.isFinite(o[0])&&Number.isFinite(o[n-1])&&o[n-1]>o[0]))return this.pointAt(i>0?r/i*(n-1):0,t);const l=o[0]+r;let c=1,h=n-1;for(;c<h;){const m=c+h>>1;o[m]<l?c=m+1:h=m}const u=o[c-1],d=o[c];return this.pointAt(c-1+(d>u?(l-u)/(d-u):0),t)}timeAt(e){let t=0,n=1/0;const i=new R,r=new R,o=new R,a=new R,l=new R;for(let c=0;c<this.track.length-1;c++){this.track.position(c,i),this.track.position(c+1,r),o.subVectors(r,i),a.subVectors(e,i);const h=o.lengthSq(),u=h>1e-12?dt.clamp(a.dot(o)/h,0,1):0,d=l.copy(i).addScaledVector(o,u).distanceToSquared(e);d<n&&(n=d,t=c+u)}return t}nearestSample(e){const t=this.positions;let n=0,i=1/0;for(let r=0;r<this.track.length;r++){const o=r*3,a=t[o]-e.x,l=t[o+1]-e.y,c=t[o+2]-e.z,h=a*a+l*l+c*c;h<i&&(i=h,n=r)}return{sample:this.track.record(n),position:this.track.position(n),index:n}}bounds(){return new Vt().setFromArray(this.positions).applyMatrix4(this.matrixWorld)}setResolution(){const e=new le;this.experience.renderer.instance.getDrawingBufferSize(e),this.material.resolution.copy(e)}onHover(){this.hover=!0,this.material.linewidth=this.linewidth+2,this.marker.visible=!0}onUnhover(){this.hover=!1,this.material.linewidth=this.linewidth,this.marker.visible=!1,this.panel.hide()}setSphere(e){this.marker.position.copy(this.worldToLocal(e.clone()));const t=this.nearestSample(this.marker.position);this.panel.pinned||this.panel.show(t.sample,this.flight,this.localToWorld(t.position.clone()),this.uiScale)}onSelect(e){var t,n;(n=(t=this.experience.world)==null?void 0:t.setRideTarget)==null||n.call(t,this),this.panel.pinned?(this.panel.setPinned(!1),e&&this.setSphere(e)):(e&&this.setSphere(e),this.panel.setPinned(!0))}hideSphere(){}setActive(e,t=1){this.visible=e,this.emphasis=t;const n=e&&t>=1,i=this.experience.selectableObjects,r=i.indexOf(this);n&&r<0&&i.push(this),!n&&r>=0&&i.splice(r,1),!n&&this.hover&&this.onUnhover(),this.material.opacity=.95*(t<1?.35:1),this.samples&&(this.samples.material.transparent=!0,this.samples.material.opacity=t<1?.35:1,this.samples.material.needsUpdate=!0),this.colorKey&&(e?this.colorBy(this.colorKey):wu())}}function Eu(s,e){return Number.isFinite(s)?s:e}const qd=dt.degToRad(75),iS=2*Math.atan(Math.tan(qd/2)*9/16),Au=15;class sS extends Xd{constructor(e){super({...e,uiScale:.25,linewidth:4,coneRadius:0});const t=this.flight;this.dim=this.color.clone().multiplyScalar(.35),this.segment=-1,this.remoteSegment=-1,this.playAll=!1,this.swathOn=!0,this.paint(()=>this.dim);const n=t.segment_s,i=t.chunks.length,r=new _c(.006,.0015,6,16);this.ticks=new dc(r,new pt({color:this.color,transparent:!0,opacity:.7}),i+1);const o=new Le;for(let a=0;a<=i;a++){const l=this.pointAt(Math.min(a*n,t.duration_s));o.makeRotationX(Math.PI/2).setPosition(l),this.ticks.setMatrixAt(a,o)}this.ticks.raycast=()=>{},this.ticks.renderOrder=2,this.add(this.ticks),this.drone=this.makeDrone(),this.drone.visible=!1,this.add(this.drone),this.glow=new Ye(new St,new pt({color:this.color,transparent:!0,opacity:.35,depthWrite:!1,blending:lr})),this.glow.raycast=()=>{},this.glow.renderOrder=3,this.glow.visible=!1,this.add(this.glow),this.remoteGlow=new Ye(new St,new pt({color:16777215,transparent:!0,opacity:.25,depthWrite:!1,blending:lr})),this.remoteGlow.raycast=()=>{},this.remoteGlow.renderOrder=3,this.remoteGlow.visible=!1,this.add(this.remoteGlow),this.swath=new Ye(new St,new pt({color:this.color,transparent:!0,opacity:.1,depthWrite:!1,depthTest:!1,side:en})),this.swath.raycast=()=>{},this.swath.renderOrder=3,this.swath.visible=!1,this.add(this.swath)}makeDrone(){const e=new gt,t=new Ye(new bi(.008,12,10),new pt({color:16777215}));e.add(t);const n=new _r(.02,.05,12,1,!0);n.rotateX(-Math.PI/2),n.translate(0,0,.025);const i=new Ye(n,new pt({color:this.color,transparent:!0,opacity:.45,side:en,depthWrite:!1}));return e.add(i),e.traverse(r=>r.raycast=()=>{}),e.renderOrder=4,e}recordAt(e){return this.track.record(Math.min(Math.max(Math.round(e),0),this.track.length-1))}forward(e,t=new R){const n=dt.degToRad(e.heading??0),i=dt.degToRad(e.pitch??-20);return t.set(Math.sin(n)*Math.cos(i),Math.cos(n)*Math.cos(i),Math.sin(i))}videoTimeAt(e){return Math.min(this.timeAt(e),this.flight.duration_s)}segmentOf(e){return Math.min(Math.floor(e/this.flight.segment_s),this.flight.chunks.length-1)}setSegment(e,{broadcast:t=!0}={}){var o,a;if(e===this.segment)return;this.segment=e;const n=this.flight.chunks[e],i=e>=0?this.dim.clone().multiplyScalar(.7):this.dim,r=e>=0?Math.ceil(n.t1):0;this.paint(l=>e>=0&&l>=n.t0&&l<=r?this.color:i),this.material.linewidth=e>=0?this.linewidth+2:this.linewidth,e<0?this.glow.visible=this.swath.visible=this.drone.visible=!1:(this.glow.geometry.dispose(),this.glow.geometry=this.tubeFor(n.t0,n.t1,.006),this.glow.visible=!0,this.swath.geometry.dispose(),this.swath.geometry=this.swathFor(n.t0,n.t1),this.swath.visible=this.swathOn,this.setPlayhead(n.t0),this.drone.visible=!0),(a=(o=this.experience.world)==null?void 0:o.onVideoSegment)==null||a.call(o,this,e),t&&this.broadcast()}setRemoteSegment(e){if(e===this.remoteSegment)return;if(this.remoteSegment=e,e<0){this.remoteGlow.visible=!1;return}const t=this.flight.chunks[e];this.remoteGlow.geometry.dispose(),this.remoteGlow.geometry=this.tubeFor(t.t0,t.t1,.009),this.remoteGlow.visible=!0}broadcast(){const e=this.experience.networking;if(!e)return;const t=this.segment,n=t>=0?this.localToWorld(this.pointAt(this.flight.chunks[t].t0)):null;e.sendCalloutUpdate(t>=0,n,{video:this.flight.id,segment:t})}tubeFor(e,t,n){const i=[];for(let o=e;o<=t;o+=.5)i.push(this.pointAt(o));i.push(this.pointAt(t)),i.length<2&&i.push(i[0].clone().addScalar(1e-4));const r=new md(i);return new vc(r,Math.max(8,i.length*2),n,8,!1)}swathFor(e,t){var b;const n=(b=this.experience.world)==null?void 0:b.terrain,i=[];if(!n)return new St;const r=new R,o=new R,a=new R,l=new R,c=new R(0,0,1),h=Math.tan(qd/2),u=Math.tan(iS/2);for(let _=Math.ceil(e);_<=Math.floor(t);_++){const g=this.recordAt(_),p=zd(g.lat,g.lon,g.alt_msl);this.forward(g,r),o.crossVectors(r,c),o.lengthSq()<1e-6&&o.set(1,0,0),o.normalize(),a.crossVectors(o,r).normalize();const w=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([P,B])=>(l.copy(r).addScaledVector(o,P*h).addScaledVector(a,B*u).normalize(),this.groundHit(n,p,l))),[x,y,I,D]=w;i.push(x,y,I,x,I,D)}const d=new Float32Array(i.length*3);i.forEach((_,g)=>{d[g*3]=_.x,d[g*3+1]=_.y,d[g*3+2]=_.z});const m=new St;return m.setAttribute("position",new Bt(d,3)),m}groundHit(e,t,n){const i=e.site;let r=t.e,o=t.n,a=t.up+i.z_center;for(let l=0;l<Au;l+=.5){const c=t.e+n.x*l,h=t.n+n.y*l,u=t.up+i.z_center+n.z*l,d=e.heightAt(c,h);if(d!=null&&u<=d){r=c,o=h,a=d;break}if(r=c,o=h,a=u,l+.5>=Au){const m=e.heightAt(c,h);m!=null&&(a=m)}}return Hd(r,o,a-i.z_center+.4)}setPlayhead(e){this.playhead=e,this.pointAt(e,this.drone.position);const t=this.recordAt(e),n=this.forward(t),i=this.drone.position.clone().add(new R(n.x,n.z,-n.y).multiplyScalar(.1));this.drone.lookAt(i)}onHover(){this.hover=!0,this.marker.visible=!0}onUnhover(){this.hover=!1,this.marker.visible=!1,this.panel.pinned||(this.panel.hide(),this.setSegment(-1))}setSphere(e){if(this.marker.position.copy(this.worldToLocal(e.clone())),this.panel.pinned)return;const t=this.videoTimeAt(this.marker.position),n=this.segmentOf(t);n!==this.segment&&(this.setSegment(n),this.panel.showVideo(this,n,this.localToWorld(this.pointAt(this.flight.chunks[n].t0)),this.uiScale))}onSelect(e){var t,n;(n=(t=this.experience.world)==null?void 0:t.setRideTarget)==null||n.call(t,this),this.panel.pinned?(this.panel.setPinned(!1),e&&this.setSphere(e)):(e&&this.setSphere(e),this.panel.setPinned(!0))}onPlayback(e,t){const n=this.flight.chunks[e];this.setPlayhead(Math.min(n.t0+t,n.t1))}onClipEnded(e){if(!this.playAll)return!1;const t=(e+1)%this.flight.chunks.length;return this.setSegment(t),this.panel.showVideo(this,t,this.localToWorld(this.pointAt(this.flight.chunks[t].t0)),this.uiScale),!0}setActive(e,t=1){super.setActive(e,t);const n=e&&t>=1;this.material.opacity=n?.95:.4,this.ticks.material.opacity=n?.7:.25,n||(this.panel.path===this&&(this.panel.setPinned(!1),this.panel.hide()),this.setSegment(-1))}}const rS="modulepreload",oS=function(s,e){return new URL(s,e).href},Tu={},aS=function(e,t,n){let i=Promise.resolve();if(t&&t.length>0){const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),l=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));i=Promise.allSettled(t.map(c=>{if(c=oS(c,n),c in Tu)return;Tu[c]=!0;const h=c.endsWith(".css"),u=h?'[rel="stylesheet"]':"";if(!!n)for(let b=o.length-1;b>=0;b--){const _=o[b];if(_.href===c&&(!h||_.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${u}`))return;const m=document.createElement("link");if(m.rel=h?"stylesheet":rS,h||(m.as="script"),m.crossOrigin="",m.href=c,l&&m.setAttribute("nonce",l),document.head.appendChild(m),h)return new Promise((b,_)=>{m.addEventListener("load",b),m.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})};var lS=function(){var s="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q;iekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq:P8Yqdbk;3sezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhDcbhqinaqae9pmeaDaeaq9RaqaDfae6Egkcsfgocl4cifcd4hxdndndndnaoc9WGgmTmbcbhPcehsawcjdfhzalhHinaraH9Rax6midnaraHaxfgl9RcK6mbczhoinawcj;cbfaogifgoc9WfhOdndndndndnaHaic9WfgAco4fRbbaAci4coG4ciGPlbedibkaO9cb83ibaOcwf9cb83ibxikaOalRblalRbbgAco4gCaCciSgCE86bbaocGfalclfaCfgORbbaAcl4ciGgCaCciSgCE86bbaocVfaOaCfgORbbaAcd4ciGgCaCciSgCE86bbaoc7faOaCfgORbbaAciGgAaAciSgAE86bbaoctfaOaAfgARbbalRbegOco4gCaCciSgCE86bbaoc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc93faAaCfgARbbaOciGgOaOciSgOE86bbaoc94faAaOfgARbbalRbdgOco4gCaCciSgCE86bbaoc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc97faAaCfgARbbaOciGgOaOciSgOE86bbaoc98faAaOfgORbbalRbiglco4gAaAciSgAE86bbaoc99faOaAfgORbbalcl4ciGgAaAciSgAE86bbaoc9:faOaAfgORbbalcd4ciGgAaAciSgAE86bbaocufaOaAfgoRbbalciGglalciSglE86bbaoalfhlxdkaOalRbwalRbbgAcl4gCaCcsSgCE86bbaocGfalcwfaCfgORbbaAcsGgAaAcsSgAE86bbaocVfaOaAfgORbbalRbegAcl4gCaCcsSgCE86bbaoc7faOaCfgORbbaAcsGgAaAcsSgAE86bbaoctfaOaAfgORbbalRbdgAcl4gCaCcsSgCE86bbaoc91faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc4faOaAfgORbbalRbigAcl4gCaCcsSgCE86bbaoc93faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc94faOaAfgORbbalRblgAcl4gCaCcsSgCE86bbaoc95faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc96faOaAfgORbbalRbvgAcl4gCaCcsSgCE86bbaoc97faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc98faOaAfgORbbalRbogAcl4gCaCcsSgCE86bbaoc99faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc9:faOaAfgORbbalRbrglcl4gAaAcsSgAE86bbaocufaOaAfgoRbbalcsGglalcsSglE86bbaoalfhlxekaOal8Pbb83bbaOcwfalcwf8Pbb83bbalczfhlkdnaiam9pmbaiczfhoaral9RcL0mekkaiam6mialTmidnakTmbawaPfRbbhOcbhoazhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkkazcefhzaPcefgPad6hsalhHaPad9hmexvkkcbhlasceGmdxikalaxad2fhCdnakTmbcbhHcehsawcjdfhminaral9Rax6mialTmdalaxfhlawaHfRbbhOcbhoamhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkamcefhmaHcefgHad6hsaHad9hmbkaChlxikcbhocehsinaral9Rax6mdalTmealaxfhlaocefgoad6hsadao9hmbkaChlxdkcbhlasceGTmekc9:hoxikabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqalmbkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;ebf8Kjjjjbaok;yzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;siliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabavcefciGaiVcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:Ohkxekcjjjj94hkkabavcdfciGaiVcetfak87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:Ohqxekcjjjj94hqkabavcufciGaiVcetfaq87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohqxekcjjjj94hqkabavciGaiVcetfaq87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2geTmbinababydbgdcwtcw91:Yadce91cjjj;8ifcjjj98G::NUdbabclfhbaecufgembkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaiczfhiaeczfheadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklz9Kbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q;Aekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq;t9tqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk;h8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhwcbhDinaDae9pmeawaeaD9RaDawfae6Egqcsfgoc9WGgkci2hxakcethmaocl4cifcd4hPabaDad2fhscbhzdnincehHalhOcbhAdninaraO9RaP6miavcj;cbfaAak2fhCaOaPfhlcbhidnakc;ab6mbaral9Rc;Gb6mbcbhoinaCaofhidndndndndnaOaoco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklbalczfhlkdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklzalczfhlkdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklaalczfhlkdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalclfaYpQbfaXc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalcwfaYpQbfaXc:q:yjjbfRbbfhlxekaialpbbbpkl8Walczfhlkaoc;abfhiaocjefak0meaihoaral9Rc;Fb0mbkkdndnaiak9pmbaici4hoinaral9RcK6mdaCaifhXdndndndndnaOaico4fRbbaocoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpklbxikaXalpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaXalpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaXalpbbbpklbalczfhlkaocdfhoaiczfgiak6mbkkalTmbaAci6hHalhOaAcefgohAaoclSmdxekkcbhlaHceGmdkdnakTmbavcjdfazfhiavazfpbdbhYcbhXinaiavcj;cbfaXfgopblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLaoakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEaoamfpblbg3cep9Ta3aQp9op9Hp9rg3aoaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfhiaXczfgXak6mbkkazclfgzad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfhDc9:hoalmexikkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk;uzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:EPliuo97eue978Jjjjjbca9Rhidndnadcl9hmbdnaec98GglTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalae9pmeaiaeciGgvcdtgdVcbczad9R;8kbaiabalcdtfglad;8qbbdnavTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkalaiad;8qbbskdnaec98GgxTmbcbhvabhdinadczfglalpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oawaopmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgvax6mbkkaxae9pmbaiaeciGgvcitgdfcbcaad9R;8kbaiabaxcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oawaopmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalae9pmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbhdabheinaeaepbbbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepkbbaeczfheadclfgdav6mbkkdnaval9pmbaialciGgdcdtgeVcbc;abae9R;8kbaiabavcdtfgvae;8qbbdnadTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepklbkavaiae;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz9Tbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),n=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var i=WebAssembly.validate(t)?e:s,r,o=WebAssembly.instantiate(a(i),{}).then(function(p){r=p.instance,r.exports.__wasm_call_ctors()});function a(p){for(var w=new Uint8Array(p.length),x=0;x<p.length;++x){var y=p.charCodeAt(x);w[x]=y>96?y-97:y>64?y-39:y+4}for(var I=0,x=0;x<p.length;++x)w[I++]=w[x]<60?n[w[x]]:(w[x]-60)*64+w[++x];return w.buffer.slice(0,I)}function l(p,w,x,y,I,D){var P=r.exports.sbrk,B=x+3&-4,$=P(B*y),S=P(I.length),C=new Uint8Array(r.exports.memory.buffer);C.set(I,S);var G=p($,x,y,S,I.length);if(G==0&&D&&D($,B,y),w.set(C.subarray($,$+x*y)),P($-P(0)),G!=0)throw new Error("Malformed buffer data: "+G)}var c={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp"},h={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},u=[],d=0;function m(p){var w={object:new Worker(p),pending:0,requests:{}};return w.object.onmessage=function(x){var y=x.data;w.pending-=y.count,w.requests[y.id][y.action](y.value),delete w.requests[y.id]},w}function b(p){for(var w="var instance; var ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(a(i))+"]), {}).then(function(result) { instance = result.instance; instance.exports.__wasm_call_ctors(); });self.onmessage = workerProcess;"+l.toString()+g.toString(),x=new Blob([w],{type:"text/javascript"}),y=URL.createObjectURL(x),I=0;I<p;++I)u[I]=m(y);URL.revokeObjectURL(y)}function _(p,w,x,y,I){for(var D=u[0],P=1;P<u.length;++P)u[P].pending<D.pending&&(D=u[P]);return new Promise(function(B,$){var S=new Uint8Array(x),C=d++;D.pending+=p,D.requests[C]={resolve:B,reject:$},D.object.postMessage({id:C,count:p,size:w,source:S,mode:y,filter:I},[S.buffer])})}function g(p){o.then(function(){var w=p.data;try{var x=new Uint8Array(w.count*w.size);l(r.exports[w.mode],x,w.count,w.size,w.source,r.exports[w.filter]),self.postMessage({id:w.id,count:w.count,action:"resolve",value:x},[x.buffer])}catch(y){self.postMessage({id:w.id,count:w.count,action:"reject",value:y})}})}return{ready:o,supported:!0,useWorkers:function(p){b(p)},decodeVertexBuffer:function(p,w,x,y,I){l(r.exports.meshopt_decodeVertexBuffer,p,w,x,y,r.exports[c[I]])},decodeIndexBuffer:function(p,w,x,y){l(r.exports.meshopt_decodeIndexBuffer,p,w,x,y)},decodeIndexSequence:function(p,w,x,y){l(r.exports.meshopt_decodeIndexSequence,p,w,x,y)},decodeGltfBuffer:function(p,w,x,y,I,D){l(r.exports[h[I]],p,w,x,y,r.exports[c[D]])},decodeGltfBufferAsync:function(p,w,x,y,I){return u.length>0?_(p,w,x,h[y],c[I]):o.then(function(){var D=new Uint8Array(p*w);return l(r.exports[h[y]],D,p,w,x,r.exports[c[I]]),D})}}}();async function Cu(s,e){const t=await fetch(s+".parts.json").then(o=>o.ok?o.json():null).catch(()=>null);if(!t){const o=await fetch(s);if(!o.ok)throw new Error(`${s}: ${o.status}`);return o.arrayBuffer()}const n=await Promise.all(Array.from({length:t.parts},(o,a)=>fetch(`${s}.part${String(a).padStart(2,"0")}`).then(async l=>{if(!l.ok)throw new Error(`${s} part ${a}: ${l.status}`);return await l.arrayBuffer()}))),i=new Uint8Array(t.size);let r=0;for(const o of n)i.set(new Uint8Array(o),r),r+=o.byteLength;return i.buffer}const Ei=512,Dn=56,Ai=14;class cS extends gt{constructor(e){super(),this.experience=new Tt,this.model=e,this.items=[],this.rows=new gt,this.add(this.rows),this.scale.setScalar(e.uiScale*.9),this.hoverKey=null,this._camPos=new R,this.build()}build(){const e=this.model.record,t=[["coverage","Coverage mesh (Skydio)"]];e.recon&&t.push(["recon","Photogrammetry mesh"]),e.splat&&t.push(["splat","Gaussian splat"]),t.push(["none","Terrain only"]);const n=[["title",e.name.replace(/ — .*/,""),"title"],...t.map(([r,o])=>[r,o,"radio"]),...e.ortho?[["orthoTerrain","Ortho on terrain","toggle"]]:[]],i=Dn*.6/Ei;n.forEach(([r,o,a],l)=>{const c=document.createElement("canvas");c.width=Ei,c.height=Dn;const h=new Li(c);h.colorSpace=vt;const u=new Ye(new Tn(.6,i),new pt({map:h,transparent:!0,depthTest:!1,depthWrite:!1}));u.renderOrder=996,u.position.y=-l*(i+.004);const d={key:r,label:o,kind:a,mesh:u,canvas:c,ctx:c.getContext("2d"),texture:h};a!=="title"&&(u.selectable=!0,u.onHover=()=>{this.hoverKey=r,this.draw(d)},u.onUnhover=()=>{this.hoverKey===r&&(this.hoverKey=null),this.draw(d)},u.onSelect=()=>this.activate(d),this.experience.selectableObjects.push(u)),this.rows.add(u),this.items.push(d),this.draw(d)})}activate(e){var t;e.kind==="radio"?this.model.setRepresentation(e.key):e.key==="orthoTerrain"&&this.model.setOrthoOnTerrain(!this.model.orthoOnTerrain),this.refresh(),(t=this.experience.networking)==null||t.sendCalloutUpdate(!0,this.getWorldPosition(new R),{menu:this.model.record.id,representation:this.model.representation,orthoTerrain:this.model.orthoOnTerrain})}refresh(){for(const e of this.items)this.draw(e)}draw(e){const t=e.ctx;if(t.clearRect(0,0,Ei,Dn),e.kind==="title")t.fillStyle="rgba(14,18,28,0.92)",Ys(t,0,0,Ei,Dn,14),t.fill(),t.fillStyle="#"+this.model.color.getHexString(),t.font="bold 26px system-ui, sans-serif",t.fillText(e.label,Ai+4,37),t.fillStyle="#7f8aa3",t.font="18px system-ui, sans-serif",t.textAlign="right",t.fillText("3D model",Ei-Ai-4,36),t.textAlign="left";else{const n=e.kind==="radio"?this.model.representation===e.key:this.model.orthoOnTerrain,i=this.hoverKey===e.key,r=e.kind==="radio"&&this.model.loading===e.key;t.fillStyle=i?"rgba(46,60,90,0.95)":"rgba(14,18,28,0.9)",Ys(t,0,0,Ei,Dn,14),t.fill(),n&&(t.strokeStyle="#"+this.model.color.getHexString(),t.lineWidth=4,Ys(t,2,2,Ei-4,Dn-4,12),t.stroke()),t.strokeStyle=n?"#"+this.model.color.getHexString():"#7f8aa3",t.lineWidth=3,e.kind==="radio"?(t.beginPath(),t.arc(Ai+14,Dn/2,10,0,Math.PI*2),t.stroke(),n&&(t.fillStyle=t.strokeStyle,t.beginPath(),t.arc(Ai+14,Dn/2,5,0,Math.PI*2),t.fill())):(Ys(t,Ai+2,Dn/2-11,24,22,5),t.stroke(),n&&(t.fillStyle=t.strokeStyle,Ys(t,Ai+7,Dn/2-6,14,12,3),t.fill())),t.fillStyle=n?"#f2f5fa":"#c9d1e0",t.font=`${n?"bold ":""}24px system-ui, sans-serif`,t.fillText(e.label+(r?"  …loading":""),Ai+40,36)}e.texture.needsUpdate=!0}setVisible(e){this.visible=e;const t=this.experience.selectableObjects;for(const n of this.items){if(n.kind==="title")continue;const i=t.indexOf(n.mesh);e&&i<0&&t.push(n.mesh),!e&&i>=0&&t.splice(i,1)}}update(){if(!this.visible)return;const e=this.experience.renderer.instance.xr;(e.isPresenting?e.getCamera():this.experience.camera.instance).getWorldPosition(this._camPos),this._camPos.y=this.getWorldPosition(new R).y,this.lookAt(this._camPos)}}function Ys(s,e,t,n,i,r){s.beginPath(),s.moveTo(e+r,t),s.arcTo(e+n,t,e+n,t+i,r),s.arcTo(e+n,t+i,e,t+i,r),s.arcTo(e,t+i,e,t,r),s.arcTo(e,t,e+n,t,r),s.closePath()}class hS extends gt{constructor(e){super(),this.experience=new Tt,this.host=e,this.record=e.record,this.color=e.color,this.uiScale=e.uiScale,this.name=this.record.id+"-model",this.reps={},this.representation="coverage",this.loading=null,this.record.mesh&&this.loadCoverage(this.record.mesh);const t=this.experience.renderer.instance.xr;t.addEventListener("sessionstart",()=>this.setSplatQuality("fast")),t.addEventListener("sessionend",()=>this.setSplatQuality(this.preferredSplatQuality??"fast"))}get orthoOnTerrain(){return this.host.orthoOnTerrain}setOrthoOnTerrain(e){this.host.setOrthoOnTerrain(e)}loadCoverage(e){new br().load(e.file,t=>{const n=t.scene;n.traverse(o=>{o.isMesh&&(o.material=this.experience.world.terrain.drapeMaterial(),o.renderOrder=1,o.raycast=()=>{})});const i=new gt;i.rotation.y=dt.degToRad(e.yaw_deg),i.add(n);const r=new gt;r.position.copy(Xl(e.origin.lat,e.origin.lon,e.origin.alt_msl)),r.scale.setScalar(1/yt),r.add(i),this.reps.coverage=r,r.visible=this.representation==="coverage",this.add(r),this.updateMatrixWorld(!0),this.meshBounds=new Vt().setFromObject(n),this.placeMenu(),this.dispatchEvent({type:"meshloaded"})})}placeMenu(){this.menu||(this.menu=new cS(this),this.add(this.menu),this.menu.setVisible(this.host.visible));const e=this.meshBounds??this.host.bounds(),t=this.worldToLocal(new R(e.max.x,e.max.y,e.min.z));this.menu.position.copy(t).add(new R(.12*this.uiScale,.35*this.uiScale,0))}anchorFor(e){const t=new gt;t.position.copy(Xl(e.origin.lat,e.origin.lon,e.origin.alt_msl??0)),t.scale.setScalar(1/yt);const n=new gt,i=e.offset_m??[0,0,0];return n.position.set(i[0],i[2],-i[1]),n.rotation.y=dt.degToRad(e.yaw_deg??0),t.add(n),t.inner=n,t}async setRepresentation(e){var i,r,o;this.representation=e;for(const[a,l]of Object.entries(this.reps))l.visible=a===e;if(this.onChanged(),e==="none"||this.reps[e])return;const t=this.record[e];if(!t)return;this.loading=e,(i=this.menu)==null||i.refresh();const n=this.anchorFor(t);try{if(e==="recon"){const a=await Cu(t.file),l=new br;l.setMeshoptDecoder(lS);const h=(await l.parseAsync(a,t.file.replace(/[^/]*$/,""))).scene;(r=t.frame)!=null&&r.startsWith("enu")&&(h.rotation.x=-Math.PI/2),h.traverse(u=>{u.isMesh&&(u.raycast=()=>{},u.material.side=en,u.renderOrder=1)}),n.inner.add(h)}else if(e==="splat"){const a=this.record.splat_fast?"fast":this.record.splat_vr?"vr":"desktop",l=a==="fast"?this.record.splat_fast:a==="vr"?this.record.splat_vr:t,c=await this.makeSplat(l);this.splatMesh=c,this.splatQuality=a,this.splatAnchor=n,n.inner.add(c)}}catch(a){console.error(`failed to load ${e} for ${this.record.id}`,a),this.loading=null,this.representation="coverage",this.reps.coverage&&(this.reps.coverage.visible=!0),this.onChanged();return}this.reps[e]=n,this.add(n),this.loading=null,n.visible=this.representation===e,(o=this.menu)==null||o.refresh()}async makeSplat(e){var a;const{SplatMesh:t,SplatFileType:n}=await aS(async()=>{const{SplatMesh:l,SplatFileType:c}=await import("./spark.module-Bsj_eoJY.js");return{SplatMesh:l,SplatFileType:c}},[],import.meta.url),i=new Uint8Array(await Cu(e.file)),r=e.file.endsWith(".sog")?n.PCSOGSZIP:e.file.endsWith(".spz")?n.SPZ:n.PLY,o=new t({fileBytes:i,fileType:r,blurAmount:.12,maxStdDev:2.45,minAlpha:1/255});return(a=e.frame)!=null&&a.startsWith("enu")&&(o.rotation.x=-Math.PI/2),o.raycast=()=>{},o}async setSplatQuality(e){var n,i;if(!this.record.splat_vr||!this.splatMesh||this.splatQuality===e)return;this.pendingSplatQuality=e;const t=e==="fast"?this.record.splat_fast??this.record.splat_vr:e==="vr"?this.record.splat_vr:this.record.splat;try{const r=await this.makeSplat(t);if(this.pendingSplatQuality!==e){(n=r.dispose)==null||n.call(r);return}const o=this.splatMesh;this.splatAnchor.inner.remove(o),this.splatAnchor.inner.add(r),this.splatMesh=r,this.splatQuality=e,(i=o.dispose)==null||i.call(o)}catch(r){console.error(`failed to switch splat quality to ${e}`,r)}}onChanged(){var e;(e=this.menu)==null||e.refresh(),this.host.refreshGui()}setVisible(e){var t;this.visible=e,(t=this.menu)==null||t.setVisible(e)}update(){var e;(e=this.menu)==null||e.update()}}class zo extends gt{constructor(e,{panel:t,videoPanel:n,color:i=16757575}={}){super(),this.experience=new Tt,this.record=e,this.kind=e.kind,this.name=e.id,this.color=new De(i),this.orthoOnTerrain=!0;const r=e.kind==="scan";this.uiScale=e.kind==="video"?.25:r?.2:1,this.track=Tc.from(e.track??e.samples??e.waypoints??[]),this.path=e.kind==="video"?new sS({flight:e,track:this.track,panel:n??t,color:this.color}):new Xd({flight:e,track:this.track,panel:t,color:this.color,uiScale:this.uiScale,coneRadius:r?.003:.012}),this.add(this.path),this.model=null,e.mesh&&(this.model=new hS(this),this.add(this.model))}static from(e,t){return new zo(e,t)}static async load(e,t){const n=await fetch(e).then(i=>{if(!i.ok)throw new Error(`${e}: ${i.status}`);return i.json()});return zo.from(n,t)}setVisible(e){var t;this.visible=e,this.path.setActive(e,this.path.emphasis),(t=this.model)==null||t.setVisible(e),this.folder&&(e?this.folder.show():this.folder.hide())}setEmphasis(e){this.path.setActive(this.visible,e)}setOrthoOnTerrain(e){var t,n,i;this.orthoOnTerrain=e,(t=this.experience.world)==null||t.refreshOrthos(),(i=(n=this.model)==null?void 0:n.menu)==null||i.refresh(),this.refreshGui()}bounds(){return this.path.bounds()}addGui(e){var o;const t=this.record,n=this.path,i=this.guiState={focus:()=>{var a;return(a=this.experience.world)==null?void 0:a.focus(n)},lineWidth:n.linewidth,samples:!0,colorBy:"none",representation:((o=this.model)==null?void 0:o.representation)??"none",orthoTerrain:this.orthoOnTerrain,playAll:!1,swath:!0},r=this.folder=e.addFolder(t.name);if(r.close(),r.add(i,"focus").name("Focus camera"),r.add(i,"lineWidth",1,8,.5).name("Line width").onChange(a=>n.setLineWidth(a)),n.samples&&r.add(i,"samples").name("Sample markers").onChange(a=>n.setConesVisible(a)),t.kind!=="video"){const a={"Path colour":"none",Altitude:"alt"};for(const[l,c]of Object.entries(t.metrics??{}))a[c.label||l]=l;r.add(i,"colorBy",a).name("Colour by").onChange(l=>n.colorBy(l))}if(this.model){const a={"Coverage mesh (Skydio)":"coverage"};t.recon&&(a["Photogrammetry mesh"]="recon"),t.splat&&(a["Gaussian splat"]="splat"),a["Terrain only"]="none",r.add(i,"representation",a).name("3D model").onChange(l=>this.model.setRepresentation(l))}return t.ortho&&r.add(i,"orthoTerrain").name("Ortho on terrain").onChange(a=>this.setOrthoOnTerrain(a)),t.kind==="video"&&(r.add(i,"playAll").name("Play whole flight (when pinned)").onChange(a=>n.playAll=a),r.add(i,"swath").name("Ground swath").onChange(a=>{n.swathOn=a,n.swath.visible=a&&n.segment>=0})),this.visible||r.hide(),r}refreshGui(){var e,t,n;if((t=(e=this.experience.world)==null?void 0:e.vrMenu)==null||t.refresh(),!!this.folder){this.guiState.representation=((n=this.model)==null?void 0:n.representation)??"none",this.guiState.orthoTerrain=this.orthoOnTerrain;for(const i of this.folder.controllersRecursive())i.updateDisplay()}}update(){var e;(e=this.model)==null||e.update()}}const Ks=1024,Ti=512;class Yd extends gt{constructor(){super(),this.experience=new Tt,this.canvas=document.createElement("canvas"),this.canvas.width=Ks,this.canvas.height=Ti,this.ctx=this.canvas.getContext("2d"),this.texture=new Li(this.canvas),this.texture.colorSpace=vt;const e=1.2,t=e*(Ti/Ks);this.card=new Ye(new Tn(e,t),new pt({map:this.texture,transparent:!0,depthTest:!1,depthWrite:!1})),this.card.renderOrder=999,this.card.position.y=.22+t/2,this.add(this.card),this.stem=new Ye(new jo(.003,.003,.22,6),new pt({color:16777215,transparent:!0,opacity:.6,depthTest:!1})),this.stem.renderOrder=998,this.stem.position.y=.11,this.add(this.stem),this.baseScale=1,this.images=new Map,this.visible=!1,this.pinned=!1,this.current=null,this._camPos=new R}image(e){if(!this.images.has(e)){const t=new Image;t.onload=()=>{var n;return((n=this.current)==null?void 0:n.image)===e&&this.draw(this.current,this.flight)},t.src=e,this.images.set(e,t)}return this.images.get(e)}show(e,t,n,i=1){var r;this.current=e,this.flight=t,this.baseScale=i,this.scale.set(i,i/Ac.verticalExaggeration,i),(r=this.parent)==null||r.worldToLocal(this.position.copy(n)),this.draw(e,t),this.visible=!0}hide(){this.pinned||(this.visible=!1,this.current=null)}draw(e,t){const n=this.ctx;n.clearRect(0,0,Ks,Ti),n.fillStyle="rgba(14,18,28,0.92)",bo(n,0,0,Ks,Ti,28),n.fill(),n.strokeStyle=this.pinned?"#ffd166":"#5ec8ff",n.lineWidth=6,bo(n,3,3,Ks-6,Ti-6,26),n.stroke(),n.fillStyle="#5ec8ff",n.font="bold 30px system-ui, sans-serif",n.fillText(t.name,36,56),n.fillStyle="#c9d1e0",n.font="24px system-ui, sans-serif",n.fillText(`${t.drone} · ${t.camera}`,36,92);const i=t.panel_fields?t.panel_fields.map(d=>[d.replace(/_/g," "),uS(d,e[d])]):[["Sample",e.id],["Time",`t+${e.t}s  (${t.date.slice(0,10)})`],["Lat / Lon",`${e.lat.toFixed(6)}, ${e.lon.toFixed(6)}`],["Altitude",`${e.alt_msl} m MSL · ${e.alt_agl} m AGL`],["Heading",`${e.heading}°   gimbal ${e.gimbal_pitch}°`],["Battery",`${e.battery}%`],["Notes",e.notes]],r=Math.min(50,Math.floor((Ti-150)/i.length));let o=130;for(const[d,m]of i)n.fillStyle="#7f8aa3",n.font="18px system-ui, sans-serif",n.fillText(d.toUpperCase(),36,o),n.fillStyle="#f2f5fa",n.font="24px system-ui, sans-serif",n.fillText(String(m),36,o+24),o+=r;const a=560,l=110,c=428,h=321;n.fillStyle="#000",bo(n,a,l,c,h,12),n.fill();const u=this.image(e.image);u.complete&&u.naturalWidth?(n.save(),bo(n,a,l,c,h,12),n.clip(),n.drawImage(u,a,l,c,h),n.restore()):(n.fillStyle="#556",n.font="22px system-ui",n.fillText("loading image…",a+130,l+h/2)),n.fillStyle="#7f8aa3",n.font="20px system-ui",n.fillText(e.image.split("/").pop(),a,l+h+28),n.fillStyle=this.pinned?"#ffd166":"#7f8aa3",n.fillText(this.pinned?"PINNED — click to release":"click / trigger to pin",a,Ti-24),this.texture.needsUpdate=!0}setPinned(e){this.pinned=e,this.current&&this.draw(this.current,this.flight)}update(){if(!this.visible)return;const e=this.experience.renderer.instance.xr;(e.isPresenting?e.getCamera():this.experience.camera.instance).getWorldPosition(this._camPos),this._camPos.y=this.getWorldPosition(new R).y,this.lookAt(this._camPos)}}function uS(s,e){return e==null?"—":s==="t"?`t+${e}s`:s==="lat"||s==="lon"?e.toFixed(6):s.startsWith("alt")?`${e} m`:["heading","gimbal_pitch","roll","omega","phi","kappa"].includes(s)?`${e}°`:String(e)}function bo(s,e,t,n,i,r){s.beginPath(),s.moveTo(e+r,t),s.arcTo(e+n,t,e+n,t+i,r),s.arcTo(e+n,t+i,e,t+i,r),s.arcTo(e,t+i,e,t,r),s.arcTo(e,t,e+n,t,r),s.closePath()}const Ya=1024,$s=512;class dS extends Yd{constructor(){super(),this.videos=new Map,this.path=null,this.k=-1,this.playing=null}video(e){if(!this.videos.has(e)){const t=document.createElement("video");if(t.src=e,t.muted=!0,t.playsInline=!0,t.preload="auto",t.crossOrigin="anonymous",t.addEventListener("ended",()=>{var n;this.playing===t&&!((n=this.path)!=null&&n.onClipEnded(this.k))&&(t.currentTime=0,t.play())}),this.videos.set(e,t),this.videos.size>12){const[n,i]=this.videos.entries().next().value;i!==this.playing&&(i.pause(),i.removeAttribute("src"),i.load(),this.videos.delete(n))}}return this.videos.get(e)}showVideo(e,t,n,i=.25){var a,l;const r=e.flight.chunks[t];this.playing&&this.playing!==this.videos.get(r.file)&&this.playing.pause(),this.path=e,this.k=t,this.flight=e.flight,this.current=r,this.baseScale=i,this.scale.set(i,i/(((a=this.parent)==null?void 0:a.scale.y)??1),i),(l=this.parent)==null||l.worldToLocal(this.position.copy(n));const o=this.video(r.file);o.currentTime=0,o.play().catch(()=>{}),this.playing=o;for(const c of[t+1,t-1])e.flight.chunks[c]&&this.video(e.flight.chunks[c].file);this.image(r.poster),this.visible=!0,this.draw()}hide(){var e;this.pinned||(this.visible=!1,(e=this.playing)==null||e.pause(),this.playing=null,this.path=null,this.k=-1,this.current=null)}setPinned(e){this.pinned=e,this.visible&&this.draw()}draw(){const e=this.ctx,t=this.flight,n=this.current,i=this.path;if(!t||!n||!i)return;const r=this.playing,o=r?r.currentTime:0,a=Math.min(n.t0+o,n.t1),l=i.recordAt(a);e.clearRect(0,0,Ya,$s),e.fillStyle="rgba(14,18,28,0.92)",Zs(e,0,0,Ya,$s,28),e.fill(),e.strokeStyle=this.pinned?"#ffd166":"#"+i.color.getHexString(),e.lineWidth=6,Zs(e,3,3,Ya-6,$s-6,26),e.stroke(),e.fillStyle="#"+i.color.getHexString(),e.font="bold 30px system-ui, sans-serif",e.fillText(t.name,36,56),e.fillStyle="#c9d1e0",e.font="24px system-ui, sans-serif",e.fillText(`${t.drone} · ${t.camera}`,36,92);const c=new Date((t.start_utc+a)*1e3),h=c.toISOString().slice(11,19)+" UTC",u=c.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"}),d=[["Segment",`${n.i+1} / ${t.chunks.length}   (${_o(n.t0)} – ${_o(n.t1)})`],["Clock",`${h}  ·  ${u} local`],["Video time",`${_o(a)}  of ${_o(t.duration_s)}`],["Lat / Lon",`${l.lat.toFixed(6)}, ${l.lon.toFixed(6)}`],["Altitude",`${l.alt_msl.toFixed(1)} m MSL`],["Camera",`heading ${l.heading}°   pitch ${l.pitch}°`],["Pose from",l.extrap?"extrapolated (outside photo window)":`scan photo ${l.photo}`]];let m=130;for(const[y,I]of d)e.fillStyle="#7f8aa3",e.font="18px system-ui, sans-serif",e.fillText(y.toUpperCase(),36,m),e.fillStyle="#f2f5fa",e.font="24px system-ui, sans-serif",e.fillText(String(I),36,m+24),m+=44;const b=560,_=110,g=428,p=241;if(e.fillStyle="#000",Zs(e,b,_,g,p,12),e.fill(),e.save(),Zs(e,b,_,g,p,12),e.clip(),r&&r.readyState>=2)e.drawImage(r,b,_,g,p);else{const y=this.image(n.poster);y.complete&&y.naturalWidth&&e.drawImage(y,0,0,y.naturalWidth/5,y.naturalHeight/2,b,_,g,p),e.fillStyle="#556",e.font="22px system-ui",e.fillText("loading clip…",b+140,_+p/2)}e.restore();const w=n.t1>n.t0?(a-n.t0)/(n.t1-n.t0):0;e.fillStyle="rgba(255,255,255,0.15)",e.fillRect(b,_+p+12,g,8),e.fillStyle="#"+i.color.getHexString(),e.fillRect(b,_+p+12,g*w,8);const x=this.image(n.poster);if(x.complete&&x.naturalWidth){const I=g;e.save(),Zs(e,b,_+p+32,I,62*2+4,8),e.clip(),e.drawImage(x,0,0,x.naturalWidth,x.naturalHeight/2,b,_+p+32,I,62),e.drawImage(x,0,x.naturalHeight/2,x.naturalWidth,x.naturalHeight/2,b,_+p+36+62,I,62),e.restore()}e.fillStyle="#7f8aa3",e.font="20px system-ui",e.fillText(`${t.source}  ·  clip ${String(n.i).padStart(3,"0")}.mp4`,36,$s-52),e.fillStyle=this.pinned?"#ffd166":"#7f8aa3",e.fillText(this.pinned?i.playAll?"PINNED · playing whole flight — click to release":"PINNED — click to release":"click / trigger to pin",36,$s-24),this.texture.needsUpdate=!0}update(){super.update(),!(!this.visible||!this.playing||!this.path)&&(this.path.onPlayback(this.k,this.playing.currentTime),this.draw())}}function _o(s){const e=Math.floor(s/60),t=Math.floor(s%60);return`${e}:${String(t).padStart(2,"0")}`}function Zs(s,e,t,n,i,r){s.beginPath(),s.moveTo(e+r,t),s.arcTo(e+n,t,e+n,t+i,r),s.arcTo(e+n,t+i,e,t+i,r),s.arcTo(e,t+i,e,t,r),s.arcTo(e,t,e+n,t,r),s.closePath()}const Js=360,vo=64;class fS extends gt{constructor(e){super(),this.experience=new Tt,this.world=e,this.items=[],this.visible=!1,this._camPos=new R,this._camQuat=new $t,this._forward=new R,this.build()}build(){[["start",()=>this.world.startRide()],["pause",()=>this.world.pauseRide()],["stop",()=>this.world.stopRide()]].forEach(([t,n],i)=>{const r=document.createElement("canvas");r.width=Js,r.height=vo;const o=new Li(r);o.colorSpace=vt;const a=new Ye(new Tn(.34,.06),new pt({map:o,transparent:!0,depthTest:!1,depthWrite:!1}));a.position.x=(i-1)*.36,a.renderOrder=1001,a.selectable=!0;const l={key:t,action:n,mesh:a,canvas:r,texture:o,ctx:r.getContext("2d"),hover:!1};a.onHover=()=>{l.hover=!0,this.draw(l)},a.onUnhover=()=>{l.hover=!1,this.draw(l)},a.onSelect=()=>{this.enabled(l)&&l.action()},this.items.push(l),this.add(a),this.draw(l)})}enabled(e){const t=this.world.ride.state;return e.key==="start"?t!=="playing":e.key==="pause"?t==="playing":t!=="inactive"}label(e){return e.key==="start"?this.world.ride.state==="paused"?"Resume":"Start ride":e.key==="pause"?"Pause":"Stop"}draw(e){const t=e.ctx,n=this.enabled(e);t.clearRect(0,0,Js,vo),t.fillStyle=e.hover&&n?"rgba(46,60,90,0.98)":"rgba(14,18,28,0.92)",Ru(t,0,0,Js,vo,15),t.fill(),t.strokeStyle=n?"#5ec8ff":"#465066",t.lineWidth=4,Ru(t,2,2,Js-4,vo-4,13),t.stroke(),t.fillStyle=n?"#f2f5fa":"#778095",t.font="bold 25px system-ui, sans-serif",t.textAlign="center",t.fillText(this.label(e),Js/2,41),e.texture.needsUpdate=!0}refresh(){for(const e of this.items)this.draw(e)}setVisible(e){this.visible=e;const t=this.experience.selectableObjects;for(const n of this.items){const i=t.indexOf(n.mesh);e&&i<0&&t.push(n.mesh),!e&&i>=0&&t.splice(i,1)}}update(){if(!this.visible)return;const e=this.experience.renderer.instance.xr,t=e.isPresenting?e.getCamera(this.experience.camera.instance):this.experience.camera.instance;t.getWorldPosition(this._camPos),t.getWorldQuaternion(this._camQuat),this._forward.set(0,0,-1).applyQuaternion(this._camQuat),this.position.copy(this._camPos).addScaledVector(this._forward,.7).add(new R(0,-.24,0)),this.quaternion.copy(this._camQuat)}}function Ru(s,e,t,n,i,r){s.beginPath(),s.moveTo(e+r,t),s.arcTo(e+n,t,e+n,t+i,r),s.arcTo(e+n,t+i,e,t+i,r),s.arcTo(e,t+i,e,t,r),s.arcTo(e,t,e+n,t,r),s.closePath()}const is=768,tr=78,Kd=.72,Pu=Kd*tr/is;class pS extends gt{constructor(e){super(),this.experience=new Tt,this.world=e,this.items=[],this.page="main",this.hoveredItem=null,this.triggerArmed=!0,this.rightTriggerActive=!1,this.wasTriggerPressed=!1,this.boundRightController=null,this.raycaster=new Cd,this.raycaster.near=.001,this.raycaster.far=10,this.rayRotation=new Le,this.rayDirection=new R,this.visible=!1,this.onRightTriggerStart=()=>{this.rightTriggerActive=!0,this.selectHovered()},this.onRightTriggerEnd=()=>{this.rightTriggerActive=!1,this.triggerArmed=!0,this.wasTriggerPressed=!1},this.position.set(.055,.105,-.16),this.rotation.set(-.5,0,0),this.scale.setScalar(.34),this.showPage("main");const t=this.experience.renderer.instance.xr;t.addEventListener("sessionstart",()=>this.setVisible(!0)),t.addEventListener("sessionend",()=>this.setVisible(!1)),t.isPresenting&&this.setVisible(!0)}mainDefinitions(){return[this.title("VR CONTROLS"),this.button("chooseFlight","Choose exact flight…",()=>this.showPage("flights"),()=>this.world.activeFlightLabel()),this.button("chooseModel","Choose scan model…",()=>this.showPage("models"),()=>this.world.activeScanModelLabel(),()=>!!this.world.activeScan()),this.button("ortho","Ortho on terrain",()=>this.world.toggleActiveScanOrtho(),()=>{var e;return(e=this.world.activeScan())!=null&&e.orthoOnTerrain?"ON":"OFF"},()=>{var e;return!!((e=this.world.activeScan())!=null&&e.record.ortho)}),this.button("start","Start / resume FPV",()=>this.world.startRide(),null,()=>this.world.ride.state!=="playing"&&this.world.flights.length>0),this.button("pause","Pause FPV",()=>this.world.pauseRide(),null,()=>this.world.ride.state==="playing"),this.button("stop","Stop / return",()=>this.world.stopRide(),null,()=>this.world.ride.state!=="inactive"),this.button("speed","Ride speed",()=>this.world.cycleRideSpeed(),()=>`${this.world.ride.speed.toFixed(2).replace(/0$/,"")}×`),this.button("comfort","Comfort horizon",()=>this.world.toggleRideComfort(),()=>this.world.ride.comfort?"ON":"OFF"),this.button("swath","Ground swath",()=>this.world.toggleGroundSwath(),()=>{var e;return(e=this.world.params)!=null&&e.swath?"ON":"OFF"}),this.button("view","View scale",()=>this.world.cycleViewMode(),()=>this.world.viewPresetLabel()),this.button("vertical","Vertical exaggeration",()=>this.world.cycleExaggeration(),()=>{var e;return`${(((e=this.world.params)==null?void 0:e.exaggeration)??1).toFixed(1)}×`}),this.button("imagery","Imagery mix",()=>this.world.cycleImageryMix(),()=>{var e;return(((e=this.world.params)==null?void 0:e.imagery)??1).toFixed(2)}),this.hint("Aim RIGHT ray · INDEX TRIGGER selects")]}flightDefinitions(){return[this.title("CHOOSE EXACT FLIGHT"),...this.world.flights.map(e=>this.button(`flight:${e.record.id}`,e.record.name,()=>{this.world.selectFlightForRide(e),this.showPage("main")},()=>this.world.ride.path===e.path?"SELECTED":e.visible?"":"HIDDEN")),this.button("back","← Back to controls",()=>this.showPage("main")),this.hint("Choose one route, then Start FPV")]}modelDefinitions(){const e=this.world.activeScan(),t=[this.title(e?`MODEL · ${e.record.name}`:"CHOOSE SCAN MODEL")];if(!e)t.push(this.hint("Choose a scan flight first"));else if(!e.model)t.push(this.hint("No 3D model for this flight"));else{const n=[["coverage","Coverage mesh"]];e.record.recon&&n.push(["recon","Photogrammetry mesh"]),e.record.splat&&n.push(["splat","Gaussian splat"]),n.push(["none","Terrain only"]),t.push(...n.map(([i,r])=>this.button(`model:${i}`,r,()=>e.model.setRepresentation(i),()=>e.model.representation===i?"SELECTED":""))),e.record.ortho&&t.push(this.button("modelOrtho","Ortho on terrain",()=>e.setOrthoOnTerrain(!e.orthoOnTerrain),()=>e.orthoOnTerrain?"ON":"OFF"))}return t.push(this.button("back","← Back to controls",()=>this.showPage("main"))),t.push(this.hint("Right INDEX TRIGGER selects")),t}title(e){return{key:"title",label:e}}hint(e){return{key:"hint",label:e}}button(e,t,n,i=null,r=null){return{key:e,label:t,action:n,value:i,enabled:r}}showPage(e){this.clearItems(),this.page=e,(e==="flights"?this.flightDefinitions():e==="models"?this.modelDefinitions():this.mainDefinitions()).forEach((n,i)=>this.addItem(n,i)),this.refresh()}clearItems(){const e=this.experience.selectableObjects;for(const t of this.items){const n=e.indexOf(t.mesh);n>=0&&e.splice(n,1),this.remove(t.mesh),t.mesh.geometry.dispose(),t.mesh.material.dispose(),t.texture.dispose()}this.items=[],this.hoveredItem=null}addItem(e,t){const n=document.createElement("canvas");n.width=is,n.height=tr;const i=new Li(n);i.colorSpace=vt;const r=new Ye(new Tn(Kd,Pu),new pt({map:i,transparent:!0,depthTest:!1,depthWrite:!1}));r.position.y=-t*(Pu+.007),r.renderOrder=1100,r.frustumCulled=!1;const o={...e,mesh:r,texture:i,context:n.getContext("2d"),hover:!1};o.action&&(r.selectable=!0,r.onHover=()=>this.setHovered(o),r.onUnhover=()=>{this.hoveredItem===o&&this.setHovered(null)},r.onSelect=()=>{},this.visible&&this.experience.selectableObjects.push(r)),this.items.push(o),this.add(r)}isEnabled(e){return e.enabled?!!e.enabled():!0}setHovered(e){if(this.hoveredItem===e)return;const t=this.hoveredItem;this.hoveredItem=e,t&&(t.hover=!1,this.draw(t)),e&&(e.hover=!0,this.draw(e))}selectHovered(){var t,n,i;const e=this.hoveredItem;!(e!=null&&e.action)||!this.triggerArmed||!this.isEnabled(e)||(this.triggerArmed=!1,e.action(),(i=(n=(t=this.experience.controller)==null?void 0:t.rightController)==null?void 0:n.padControls)==null||i.pulse(35,.25),this.refresh())}draw(e){const t=e.context,n=this.isEnabled(e);t.clearRect(0,0,is,tr),t.fillStyle=e.hover&&n?"rgba(41,92,126,0.99)":"rgba(10,17,27,0.96)",Du(t,0,0,is,tr,15),t.fill(),t.strokeStyle=n&&e.action?e.hover?"#b8f2ff":"#66d9ff":"#3d4b5f",t.lineWidth=e.hover&&n?7:3,Du(t,2,2,is-4,tr-4,13),t.stroke();const i=typeof e.value=="function"?e.value():e.value;i&&(t.fillStyle=n?"#91e5ff":"#647083",t.font="bold 25px system-ui, sans-serif",t.textAlign="right",t.fillText(Lu(i,24),is-22,50)),t.textAlign="left",t.fillStyle=e.key==="title"?"#91e5ff":n?"#f3f7fb":"#778294",t.font=e.key==="title"?"bold 27px system-ui, sans-serif":e.key==="hint"?"20px system-ui, sans-serif":"24px system-ui, sans-serif",t.fillText(Lu(e.label,i?27:44),22,50),e.texture.needsUpdate=!0}refresh(){for(const e of this.items)this.draw(e)}setVisible(e){this.visible=e;const t=this.experience.selectableObjects;for(const n of this.items.filter(i=>i.action)){const i=t.indexOf(n.mesh);e&&i<0&&t.push(n.mesh),!e&&i>=0&&t.splice(i,1)}e||this.setHovered(null)}bindRightController(e){var t,n;!e||this.boundRightController===e||((t=this.boundRightController)==null||t.removeEventListener("selectstart",this.onRightTriggerStart),(n=this.boundRightController)==null||n.removeEventListener("selectend",this.onRightTriggerEnd),this.boundRightController=e,e.addEventListener("selectstart",this.onRightTriggerStart),e.addEventListener("selectend",this.onRightTriggerEnd))}updateRay(e){if(!e)return;e.updateWorldMatrix(!0,!1),this.updateWorldMatrix(!0,!0),this.rayRotation.identity().extractRotation(e.matrixWorld),this.raycaster.ray.origin.setFromMatrixPosition(e.matrixWorld),this.rayDirection.set(0,0,-1).applyMatrix4(this.rayRotation).normalize(),this.raycaster.ray.direction.copy(this.rayDirection);const t=this.items.filter(i=>i.action).map(i=>i.mesh),n=this.raycaster.intersectObjects(t,!1)[0];this.setHovered(n?this.items.find(i=>i.mesh===n.object):null)}update(){var o;if(!this.visible)return;const e=this.experience.controller,t=e==null?void 0:e.leftController;t&&this.parent!==t&&t.add(this);const n=e==null?void 0:e.rightController;this.bindRightController(n),this.updateRay(n);const i=(o=n==null?void 0:n.padControls)==null?void 0:o.primaryTrigger,r=!!(this.rightTriggerActive||i!=null&&i.isPressed);r&&!this.wasTriggerPressed&&this.selectHovered(),r||(this.triggerArmed=!0),this.wasTriggerPressed=r}}function Lu(s,e){const t=String(s??"");return t.length<=e?t:`${t.slice(0,e-1)}…`}function Du(s,e,t,n,i,r){s.beginPath(),s.moveTo(e+r,t),s.arcTo(e+n,t,e+n,t+i,r),s.arcTo(e+n,t+i,e,t+i,r),s.arcTo(e,t+i,e,t,r),s.arcTo(e,t,e+n,t,r),s.closePath()}const Iu=[16757575,6211839,16739229,10354539],xo=[{label:"Human scale",mode:"human",zoom:1},{label:"Table diorama",mode:"table",zoom:1},{label:"Drone overview",mode:"fly",zoom:1},{label:"Close-up",mode:"fly",zoom:.45},{label:"High altitude",mode:"fly",zoom:2.2}];class mS{constructor(){this.experience=new Tt,this.scene=this.experience.scene,this.debug=this.experience.debug,this.environment=new Iy("#0b0f1a"),this.sky=new ky,this.stars=new zy,this.stars.particles.visible=!1,this.model=new gt,this.model.position.y=pu,this.scene.add(this.model),this.currentScale=1,this.viewPresetIndex=2,this.flights=[],this.ride={state:"inactive",path:null,time:0,speed:1,comfort:!0,saved:null},this._ridePoint=new R,this._rideAhead=new R,this._rideDirection=new R,this._rideForward=new R(0,0,-1),this._rideOffset=new R,this._rideLookEuler=new Cn(0,0,0,"YXZ"),this._rideLookAbort=null,this.ready=this.load()}async load(){const e=await fetch("./farm/site.json").then(i=>i.json());Ny(e),this.terrain=new Vy,this.model.add(this.terrain),await this.terrain.load(),this.panel=new Yd,this.model.add(this.panel),this.videoPanel=new dS,this.model.add(this.videoPanel),this.rideControls=new fS(this),this.scene.add(this.rideControls);const t=await fetch("./flights/index.json").then(i=>i.json()),n={panel:this.panel,videoPanel:this.videoPanel};this.flights=await Promise.all(t.map((i,r)=>zo.load(i.file,{...n,color:Iu[r%Iu.length]})));for(const i of this.flights)this.model.add(i);return this.updateEmphasis(),this.refreshOrthos(),this.vrMenu=new pS(this),this.scene.add(this.vrMenu),this.setDebug(),document.getElementById("loading").style.display="none",requestAnimationFrame(()=>this.focus(null)),this}setViewMode(e,t=1){var a,l;const n=xo.findIndex(c=>c.mode===e&&c.zoom===t);n>=0&&(this.viewPresetIndex=n);const i=((a=this.params)==null?void 0:a.exaggeration)??1,r=this.experience.camera,o=!this.experience.isXRActive();if(e==="table")this.currentScale=.05,this.model.scale.set(.05,.05*i,.05),this.model.position.set(0,.85,-.8),this.model.updateMatrixWorld(!0),o&&(r!=null&&r.controls)&&(r.controls.target.set(0,.85,-.8),r.instance.position.set(0,1.4,.2),r.instance.lookAt(0,.85,-.8),r.controls.update());else if(e==="human"){if(this.currentScale=1,this.model.scale.set(1,1,1),this.model.position.set(0,0,0),this.model.updateMatrixWorld(!0),o&&(r!=null&&r.controls)){const h=new Vt().setFromObject(this.terrain.mesh).getCenter(new R);r.instance.position.set(h.x,h.y+1.7,h.z+5),r.controls.target.set(h.x,h.y+1.6,h.z),r.instance.lookAt(r.controls.target),r.controls.update()}}else this.currentScale=1,this.model.scale.set(1,i,1),this.model.position.set(0,pu,0),this.model.updateMatrixWorld(!0),o&&this.focus(null,t);(l=this.vrMenu)==null||l.refresh()}viewPresetLabel(){var e;return((e=xo[this.viewPresetIndex])==null?void 0:e.label)??"Drone overview"}cycleViewMode(){this.viewPresetIndex=(this.viewPresetIndex+1)%xo.length;const e=xo[this.viewPresetIndex];this.setViewMode(e.mode,e.zoom)}setFlightVisible(e,t){var n,i;!t&&this.ride.path===e.path&&(this.stopRide(),this.ride.path=null,(n=this.rideControls)==null||n.setVisible(!1)),e.setVisible(t),this.updateEmphasis(),this.refreshOrthos(),(i=this.vrMenu)==null||i.refresh()}updateEmphasis(){for(const e of this.flights){const t=e.kind==="video"&&this.flights.some(n=>n.record.id===e.record.scan&&n.visible);e.setEmphasis(t?.5:1)}}refreshOrthos(){this.terrain.setOrthos(this.flights.filter(e=>e.visible&&e.record.ortho).map(e=>({spec:e.record.ortho,onTerrain:e.orthoOnTerrain})))}setRideTarget(e){var t,n,i;!(e!=null&&e.ridePointAt)||this.ride.state!=="inactive"&&this.ride.path!==e||(this.ride.path=e,(t=this.rideControls)==null||t.setVisible(!0),(n=this.rideControls)==null||n.refresh(),(i=this.vrMenu)==null||i.refresh())}selectFlightForRide(e){e.visible||this.setFlightVisible(e,!0),this.setRideTarget(e.path)}activeFlightLabel(){var t;const e=this.ride.path;return e?((t=this.flights.find(n=>n.path===e))==null?void 0:t.record.name)??e.flight.name:"None yet"}activeScan(){let e=this.ride.path?this.flights.find(t=>t.path===this.ride.path):null;return(e==null?void 0:e.kind)==="video"&&(e=this.flights.find(t=>t.record.id===e.record.scan)),(e==null?void 0:e.kind)==="scan"?e:this.flights.find(t=>t.visible&&t.kind==="scan")}activeScanModelLabel(){const e=this.activeScan();return e?e.model?{coverage:"Coverage mesh",recon:"Photogrammetry",splat:"Gaussian splat",none:"Terrain only"}[e.model.representation]??"No 3D model":"No 3D model":"No scan"}cycleActiveScanModel(){var i;const e=this.activeScan();if(!(e!=null&&e.model))return;const t=["coverage"];e.record.recon&&t.push("recon"),e.record.splat&&t.push("splat"),t.push("none");const n=t.indexOf(e.model.representation);e.model.setRepresentation(t[(n+1)%t.length]),(i=this.vrMenu)==null||i.refresh()}toggleActiveScanOrtho(){var t;const e=this.activeScan();e!=null&&e.record.ortho&&(e.setOrthoOnTerrain(!e.orthoOnTerrain),(t=this.vrMenu)==null||t.refresh())}setRideSpeed(e){var t,n;this.ride.speed=dt.clamp(Number(e)||1,.25,4),this.params&&(this.params.rideSpeed=this.ride.speed),(t=this.rideSpeedControl)==null||t.updateDisplay(),(n=this.vrMenu)==null||n.refresh()}cycleRideSpeed(){const e=[.25,.5,1,2,4],t=e.indexOf(this.ride.speed);this.setRideSpeed(e[(t+1)%e.length])}setRideComfort(e){var t,n;this.ride.comfort=!!e,this.params&&(this.params.rideComfort=this.ride.comfort),(t=this.rideComfortControl)==null||t.updateDisplay(),(n=this.vrMenu)==null||n.refresh()}toggleRideComfort(){this.setRideComfort(!this.ride.comfort)}rideDuration(e=this.ride.path){return e?typeof e.rideDuration=="function"?e.rideDuration():Math.max(0,Number(e.flight.duration_s)||0):0}startRide(){var o,a,l,c;const e=this.ride;if(!e.path){const h=this.flights.find(u=>u.visible&&u.path.ridePointAt)??this.flights[0];h&&this.selectFlightForRide(h)}const t=e.path;if(!t||!this.rideDuration(t)||e.state==="playing")return;if(e.state==="paused"){e.state="playing",this.rideControls.refresh(),(o=this.vrMenu)==null||o.refresh();return}const n=this.experience.cameraGroup,i=this.experience.camera,r=(a=this.experience.controller)==null?void 0:a.locomotion;e.saved={groupPosition:n.position.clone(),groupQuaternion:n.quaternion.clone(),cameraPosition:i.instance.position.clone(),cameraQuaternion:i.instance.quaternion.clone(),controlsEnabled:(l=i.controls)==null?void 0:l.enabled,locomotionUpdate:r==null?void 0:r.update,canvasCursor:this.experience.canvas.style.cursor,canvasTouchAction:this.experience.canvas.style.touchAction},e.xr=this.experience.isXRActive(),e.time=0,e.anchor=new R,e.xr?(n.updateMatrixWorld(!0),this.experience.renderer.instance.xr.getCamera(i.instance).getWorldPosition(e.anchor),n.worldToLocal(e.anchor)):(i.instance.position.set(0,0,0),this._rideLookEuler.set(0,0,0),this.enableRideLook()),i.controls&&(i.controls.enabled=!1),r&&(r.update=()=>{}),e.state="playing",this.updateRidePose(),this.rideControls.refresh(),(c=this.vrMenu)==null||c.refresh()}pauseRide(){var e;this.ride.state==="playing"&&(this.ride.state="paused",this.rideControls.refresh(),(e=this.vrMenu)==null||e.refresh())}enableRideLook(){var a;(a=this._rideLookAbort)==null||a.abort();const e=this.experience.canvas,t=new AbortController;let n=null,i=0,r=0;const o=l=>{l.pointerId===n&&(n=null,e.style.cursor="grab")};e.style.cursor="grab",e.style.touchAction="none",e.addEventListener("pointerdown",l=>{var c;this.ride.state==="inactive"||this.ride.xr||l.button!==0||(n=l.pointerId,i=l.clientX,r=l.clientY,(c=e.setPointerCapture)==null||c.call(e,n),e.style.cursor="grabbing",l.preventDefault())},{signal:t.signal}),e.addEventListener("pointermove",l=>{if(l.pointerId!==n)return;const c=l.clientX-i,h=l.clientY-r;i=l.clientX,r=l.clientY,this._rideLookEuler.y-=c*.004,this._rideLookEuler.x=dt.clamp(this._rideLookEuler.x-h*.004,-Math.PI/2+.02,Math.PI/2-.02),this.applyRideLook(),l.preventDefault()},{signal:t.signal}),e.addEventListener("pointerup",o,{signal:t.signal}),e.addEventListener("pointercancel",o,{signal:t.signal}),this._rideLookAbort=t}applyRideLook(){this.ride.xr||this.experience.camera.instance.quaternion.setFromEuler(this._rideLookEuler)}disableRideLook(e){var t;(t=this._rideLookAbort)==null||t.abort(),this._rideLookAbort=null,this.experience.canvas.style.cursor=(e==null?void 0:e.canvasCursor)??"",this.experience.canvas.style.touchAction=(e==null?void 0:e.canvasTouchAction)??""}stopRide(){var r,o;const e=this.ride;if(e.state==="inactive")return;const t=e.saved,n=this.experience.cameraGroup,i=this.experience.camera;t&&(n.position.copy(t.groupPosition),n.quaternion.copy(t.groupQuaternion),i.instance.position.copy(t.cameraPosition),i.instance.quaternion.copy(t.cameraQuaternion),i.controls&&(i.controls.enabled=t.controlsEnabled,i.controls.update()),(r=this.experience.controller)!=null&&r.locomotion&&t.locomotionUpdate&&(this.experience.controller.locomotion.update=t.locomotionUpdate)),this.disableRideLook(t),e.state="inactive",e.time=0,e.saved=null,this.rideControls.refresh(),(o=this.vrMenu)==null||o.refresh()}updateRidePose(){const e=this.ride,t=e.path,n=this.rideDuration(t);if(!t||e.state==="inactive"||!n)return;const i=dt.clamp(e.time,0,n);t.localToWorld(t.ridePointAt(i,this._ridePoint)),t.localToWorld(t.ridePointAt(Math.min(i+.5,n),this._rideAhead)),this._rideDirection.subVectors(this._rideAhead,this._ridePoint),this._rideDirection.lengthSq()<1e-8&&i>0&&(t.localToWorld(t.ridePointAt(Math.max(0,i-.5),this._rideAhead)),this._rideDirection.subVectors(this._ridePoint,this._rideAhead)),e.comfort&&(this._rideDirection.y=0),this._rideDirection.lengthSq()<1e-8&&this._rideDirection.set(0,0,-1),this._rideDirection.normalize();const r=this.experience.cameraGroup;r.quaternion.setFromUnitVectors(this._rideForward,this._rideDirection),this._ridePoint.y+=.01,e.xr?(this._rideOffset.copy(e.anchor).applyQuaternion(r.quaternion),r.position.copy(this._ridePoint).sub(this._rideOffset)):(r.position.copy(this._ridePoint),this.applyRideLook()),r.updateMatrixWorld(!0)}onVideoSegment(e,t){var o;const n=(o=this.flights.find(a=>a.record.id===e.flight.scan))==null?void 0:o.path;if(!(n!=null&&n.highlightWindow))return;if(t<0){n.highlightWindow(null);return}const i=e.flight.chunks[t],r=e.flight.start_utc;n.highlightWindow(r+i.t0,r+i.t1)}onCalloutUpdate(e){var i,r,o;const t=e==null?void 0:e.payload;if(t!=null&&t.viewMode){this.setViewMode(t.viewMode,t.zoomFactor);return}if(t!=null&&t.menu){const a=(i=this.flights.find(l=>l.record.id===t.menu))==null?void 0:i.model;a&&(t.representation!==a.representation&&a.setRepresentation(t.representation),t.orthoTerrain!==a.orthoOnTerrain&&a.setOrthoOnTerrain(t.orthoTerrain));return}if(!(t!=null&&t.video))return;const n=(r=this.flights.find(a=>a.record.id===t.video))==null?void 0:r.path;(o=n==null?void 0:n.setRemoteSegment)==null||o.call(n,e.visible?t.segment:-1)}setExaggeration(e){var n,i;const t=dt.clamp(Number(e)||1,.5,6);Ac.verticalExaggeration=t,this.model.scale.y=this.currentScale*t,this.terrain.setExaggeration(t);for(const r of[this.panel,this.videoPanel])r.scale.set(r.baseScale,r.baseScale/t,r.baseScale);this.params&&(this.params.exaggeration=t),(n=this.exaggerationControl)==null||n.updateDisplay(),(i=this.vrMenu)==null||i.refresh()}cycleExaggeration(){var i;const e=[.5,1,1.5,2,3,4,5,6],t=((i=this.params)==null?void 0:i.exaggeration)??1,n=e.indexOf(t);this.setExaggeration(e[(n+1)%e.length])}setImageryMix(e){var n,i;const t=dt.clamp(Number(e),0,1);this.terrain.uniforms.uImageryMix.value=t,this.params&&(this.params.imagery=t),(n=this.imageryControl)==null||n.updateDisplay(),(i=this.vrMenu)==null||i.refresh()}cycleImageryMix(){var i;const e=[0,.25,.5,.75,1],t=((i=this.params)==null?void 0:i.imagery)??1,n=e.indexOf(t);this.setImageryMix(e[(n+1)%e.length])}setGroundSwath(e){var n;const t=!!e;this.params&&(this.params.swath=t);for(const i of this.flights.filter(r=>r.kind==="video"))i.path.swathOn=t,i.path.swath.visible=t&&i.path.segment>=0,i.guiState&&(i.guiState.swath=t,i.refreshGui());(n=this.vrMenu)==null||n.refresh()}toggleGroundSwath(){var e;this.setGroundSwath(!((e=this.params)!=null&&e.swath))}focus(e,t=1){const n=this.experience.camera;if(!(n!=null&&n.controls))return;this.model.updateMatrixWorld(!0);const i=e?e.bounds():new Vt().setFromObject(this.terrain.mesh),r=i.getCenter(new R),o=Math.max(i.getSize(new R).length()*.5,.15),a=new R(-.6,.55,.6).normalize();n.controls.target.copy(r),n.instance.position.copy(r).addScaledVector(a,o*1.7*t),n.instance.lookAt(r),n.controls.update()}setDebug(){if(this.params={exaggeration:1,imagery:1,swath:!0,rideSpeed:1,rideComfort:!0},!this.debug.active)return;const e=this.debug.ui,t=e.addFolder("Scale & Perspectives");t.add({human:()=>this.setViewMode("human")},"human").name("🚶 Human Scale (Walking)"),t.add({table:()=>this.setViewMode("table")},"table").name("🪑 Table Diorama (0.05x)"),t.add({drone:()=>this.setViewMode("fly",1)},"drone").name("🚁 Drone Overview (1.0x)"),t.add({zoomIn:()=>this.setViewMode("fly",.45)},"zoomIn").name("🔍 Zoom Close-Up (2.2x Closer)"),t.add({zoomFar:()=>this.setViewMode("fly",2.2)},"zoomFar").name("🌐 High Altitude Overview");const n=e.addFolder("Flight Selector");n.add({unpin:()=>{this.panel.setPinned(!1),this.videoPanel.setPinned(!1)}},"unpin").name("Unpin panel");for(const o of this.flights)this.params["show_"+o.record.id]=o.visible,n.add(this.params,"show_"+o.record.id).name(o.record.name).onChange(a=>this.setFlightVisible(o,a));for(const o of this.flights)o.addGui(n);const i=e.addFolder("FPV ride");this.rideSpeedControl=i.add(this.params,"rideSpeed",.25,4,.25).name("Speed ×").onChange(o=>this.setRideSpeed(o)),this.rideComfortControl=i.add(this.params,"rideComfort").name("Comfort horizon").onChange(o=>this.setRideComfort(o)),i.add({start:()=>this.startRide()},"start").name("Start / resume"),i.add({pause:()=>this.pauseRide()},"pause").name("Pause"),i.add({stop:()=>this.stopRide()},"stop").name("Stop / return");const r=e.addFolder("Terrain");this.exaggerationControl=r.add(this.params,"exaggeration",.5,6,.1).name("Vertical ×").onChange(o=>this.setExaggeration(o)),this.imageryControl=r.add(this.params,"imagery",0,1,.05).name("Imagery mix").onChange(o=>this.setImageryMix(o))}update(){var e,t,n,i;this.ride.state==="playing"&&(this.ride.time+=this.experience.time.delta*.001*this.ride.speed,this.ride.time>=this.rideDuration()?this.stopRide():this.updateRidePose()),(e=this.panel)==null||e.update(),(t=this.videoPanel)==null||t.update();for(const r of this.flights)r.update();(n=this.rideControls)==null||n.update(),(i=this.vrMenu)==null||i.update()}}const gS=[{name:"daytimeSkyTexture",type:"exr",path:"./skies/qwantani_moon_noon_puresky_4k.exr"}],yr=new Tt({canvas:document.querySelector("canvas.webgl"),sources:gS,camera:{position:[-22,18,22],lookAt:[0,.75,0],orbit:{damping:!0}},locomotion:{floors:[0]},debug:!0,networking:{url:"ws://localhost:8080",room:"ucsc-farm-drones"}});yr.world=new mS;window.experience=yr;bS(yr);yr.camera.controls.target.set(0,.75,0);const Nu=document.getElementById("join");Nu.addEventListener("click",()=>{yr.join(),Nu.style.display="none"});function bS(s){s.time.stop();let e=performance.now();s.renderer.instance.setAnimationLoop(t=>{var i;const n=Number.isFinite(t)?t:performance.now();s.time.delta=Math.min(Math.max(n-e,0),100),s.time.current=Date.now(),s.time.elapsed=s.time.current-s.time.start,e=n,s.controller.update(),s.time.trigger("tick"),(i=s.networking)!=null&&i.canSendEmbodiment&&s.networking.sendEmbodiment(s.camera.instance.matrixWorld,s.controller.controller1.matrixWorld,s.controller.controller2.matrixWorld),s.renderer.instance.render(s.scene,s.camera.instance)})}export{xt as A,Vt as B,De as C,nc as D,qo as F,Fc as G,y0 as I,ti as L,Le as M,Kt as N,_t as O,oh as P,$t as Q,Jl as R,cn as S,Nt as T,Ii as U,tt as V,xS as W,R as a,je as b,Ql as c,le as d,Ye as e,St as f,hc as g,en as h,MS as i,Rd as j,Rp as k,_S as l,ln as m,Cp as n,xc as o,SS as p,Bt as q,Nl as r,vS as s,mi as t,vt as u,ei as v,Qt as w,We as x,ac as y,up as z};
//# sourceMappingURL=index-CosV97z_.js.map
