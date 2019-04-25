function repl(str,sub,rep){
	return str.split(sub).join(rep);
}
function rchar(str,i,rep){
	var res="";
	for (var j=0;j<str.length;j++){
		res+=j==i?rep:str[j];
	}
	return res;
}
function setOutput(){
	var res="";
	var res2="";
	res+="Prog: ";
	res2+="Data: ";
	var tmp=prog;
	tmp=rchar(tmp,pos,tmp[pos]==0?"a":"b");
	if (tmp.includes("a")){
		res+=repl(tmp,"a","<span style='background-color:blue;color:white'>0</span>");
	} else {
		res+=repl(tmp,"b","<span style='background-color:blue;color:white'>1</span>");
	}
	
	
	var res3="Data (ASCII): "+toAscii(data);
	res2+=data;
	res3+="<br>"+"Steps: "+generations;
	outDataA.innerHTML=res3;
	outProg.innerHTML=res;
	outData.innerHTML=res2;
}
function reset(){
	prog=proge.value;
	data=datae.value;
	pos=0;
	generations=0;
	setOutput();
}
function doStep(){
	if (prog[pos]=="0"){
		data=rchar(data,0,"");
	} else {
		pos=(pos+1)%prog.length;
		if (data[0]=="1"){
			data=rchar(data,data.length-1,data[data.length-1]+prog[pos]);
		}
	}
	pos=(pos+1)%prog.length;
	generations++;
	setOutput();
}
function toggleRun(){
	if (running){
		clearInterval(runid);
		rButton.innerHTML="Run";
	} else {
		runid=setInterval(doStep,1000/40);
		rButton.innerHTML="Stop";
	}
	running=!running;
}
function toAscii(bin){
	var res="";
	for (var i=0;i<Math.ceil(bin.length/8);i++){
		var res2=0;
		for (var j=0;j<8;j++){
			if (bin[i*8+j]=="1"){
				res2+=Math.pow(2,(8-j)-1);
			}
		}
		res+=String.fromCharCode(res2);
	}
	return res;
}
var running=false;
var runid=0;
var pos=0;
var generations=0;
var proge=document.getElementById("prog");
var datae=document.getElementById("data");
var out=document.getElementById("out");
var outProg=document.createElement("p");
var outData=document.createElement("p");
var outDataA=document.createElement("p");
var rButton=document.getElementById("run");
out.appendChild(outProg);
out.appendChild(outData);
out.appendChild(outDataA);

var prog=proge.value;
var data=datae.value;
reset();
