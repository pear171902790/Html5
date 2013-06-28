var fw1=new fw(),sys=new Array(),udf=new Array(),race=new Array(),cRace="red"
fw_ini()
function fw_ini(){
	sys.minePos=""
	sys.vesPos=""
	
	race["red"]=createClass("mine:50;ves:0;man:4;supply:8;keyBuild:,;hq:")
	race["blue"]=createClass("mine:50;ves:0;man:4;supply:8;keyBuild:,;hq:")
	
	udf["mine"]=createClass("type:block;size:1,1;movepos:-1,-16;selpos:-4,16,48,30")
	udf["ves"]=createClass("type:block;size:3,2;movepos:2,3;selpos:-6,0,124,60")

	udf["0_hq"]=createClass("type:build;wh:127,101;size:3,3;movepos:0,-14;selpos:-8,22,140,80;hppos:5,86,130;hp:1500;btime:3;madelist:0_scv")
	udf["0_supply"]=createClass("type:build;wh:87,70;size:2,2;movepos:-2,-9;selpos:-5,18,95,56;hppos:2,62,94;hp:750;btime:2;mine:100;ves:0")
	udf["0_refinery"]=createClass("type:build;wh:125,95;size:3,2;movepos:-2,-32;selpos:-8,22,140,80;hppos:5,86,130;hp:750;btime:2;mine:100;ves:0")
	udf["0_barrack"]=createClass("type:build;wh:125,110;size:3,3;movepos:-2,-18;selpos:-8,34,140,80;hppos:5,86,130;hp:1000;btime:3;mine:150;ves:0;madelist:0_marine,0_firebat,0_medic")
	udf["0_academy"]=createClass("type:build;wh:95,95;size:2,2;movepos:-10,-32;selpos:-2,38,100,60;hppos:2,66,100;hp:600;btime:3;mine:150;ves:0")
	udf["0_gun_tower"]=createClass("type:build;wh:95,58;size:2,2;movepos:-8,2;selpos:-8,22,140,80")
	udf["0_missile"]=createClass("type:build;wh:41,50;size:1,1;movepos:0,-20;selpos:-8,22,140,80")
		
	udf["0_scv"]=createClass("type:unit;kind:ground;mvstyle:shift;speed:4;wh:48;selpos:5,12,36,24;hppos:1,33,35;hp:60;mine:50;ves:0")
	udf["0_marine"]=createClass("type:unit;kind:ground;mvstyle:walk;speed:3;wh:32;selpos:5,15,20,16;hppos:1,20,24;hp:40;mine:50;ves:0;range:4")
	udf["0_firebat"]=createClass("type:unit;kind:ground;mvstyle:walk;speed:3;wh:32;selpos:3,15,26,18;hppos:1,24,26;hp:50;mine:50;ves:25;range:1")
	udf["0_medic"]=createClass("type:unit;kind:ground;mvstyle:walk;speed:3;wh:32;selpos:3,15,26,18;hppos:1,24,26;hp:60;mine:25;ves:25")
	udf["0_tank"]=createClass("type:unit;kind:ground;speed:1;wh:72;selpos:10,16,50,40")
	udf["0_valture"]=createClass("type:unit;kind:ground;speed:1;wh:64;selpos:12,20,36,27")
	udf["0_wraith"]=createClass("type:unit;kind:air;speed:1;wh:48;selpos:12,16,27,20")
}
function createClass(k){
	var ao=new Array(),ak=k.split(";")
	for(var i in ak){
		ak[i]=ak[i].split(":")
		if(!isNaN(ak[i][1]))
			ak[i][1]=parseInt(ak[i][1])
		ao[ak[i][0]]=ak[i][1]
	}
	return ao
}
function showObj(ol){
	var a=ol.split(";"),i,j
	for(i in a){
		a[i]=a[i].split(",")
		for(j in a[i]){
			if(i==0&&a[i][j]!="")
				eval(a[i][j]).style.display=""
			if(i==1&&a[i][j]!="")
				eval(a[i][j]).style.display="none"
		}
	}
}
function fw(){
	//uList定义：[0]-block;[1]-mine;[2]-build;[3]-unit
	this.uList=new Array("","","","")
	//bList定义：[0]-mine;[1]-block and build;[2]-hold unit
	this.bList=new Array("","","")
	
	this.cEndPos=0
	this.maxID=0
	this.selUnit=""
	this.adp="1,0;1,1;0,1;-1,1;-1,0;-1,-1;0,-1;1,-1;1,0;1,1;0,1;-1,1;-1,0;-1,-1;0,-1;1,-1".split(";")
	for(var i=0;i<16;i++){
		this.adp[i]=this.adp[i].split(",")
		this.adp[i][0]=parseInt(this.adp[i][0])
		this.adp[i][1]=parseInt(this.adp[i][1])
	}
	this.iniMap=function(k){
		var l="",lm="",xi,yi,i,j,n
		var a=k.split(";"),uu,a_sz,a_mv,a_sl,a_hp,a_wh
		for(i in a){
			a[i]=a[i].split(",")
			if(a[i][0]=="size"){
				divSize.style.width =a[i][1]*40
				divSize.style.height =a[i][2]*30
			}
			else{
				xi=parseInt(a[i][2])
				yi=parseInt(a[i][3])
				uu=udf[a[i][1]]
				a_sl=uu.selpos.split(",")
				if(uu.type=="block"||uu.type=="build"){
					a_sz=uu.size.split(",")
					a_mv=uu.movepos.split(",")
					for(j=0;j<a_sz[0];j++){
						for(n=0;n<a_sz[1];n++){
							if(uu.type=="block")
								this.bList[0]+=";"+(xi+j)+","+(yi+n)
							if(uu.type=="build")
								this.bList[1]+=";"+(xi+j)+","+(yi+n)
							//this.paint(new pt(xi+j,yi+n),"black")
						}
					}
				}
				if(a[i][1]=="mine")
					sys.minePos+=";"+xi+","+yi
				if(a[i][1]=="ves")
					sys.vesPos+=";"+xi+","+yi
				if(uu.type=="block"){
					this.uList[1]+=",unit_"+a[i][0]
					l+="<span id=unit_"+a[i][0]+" name="+a[i][1]+" uType=block px="+xi+" py="+yi+" pw="+a_sz[0]+" ph="+a_sz[1]+" style='left:"+(xi*40+parseInt(a_mv[0]))+";top:"+(yi*30+parseInt(a_mv[1]))+";z-index:"+yi+"'>"
					l+="<v:oval coordsize='21600,21600' strokecolor=#F2F230 style='visibility:hidden;position:absolute;left:"+a_sl[0]+";top:"+a_sl[1]+";width:"+a_sl[2]+";height:"+a_sl[3]+"'><v:fill opacity =0></v:fill></v:oval>"
					l+="<img src=block/"+a[i][1]+".gif>"
					l+="</span>"
					lm+="<hr id=unit_"+a[i][0]+"_mini color=#00E4FC style=left:"+(xi*2)+";top:"+(yi*2)+";width:"+(a_sz[0]*2)+";height:"+(a_sz[1]*2)+">"
				}
				if(uu.type=="build"){
					a_hp=uu.hppos.split(",")
					a_wh=uu.wh.split(",")
					var s_m=""
					if(a[i][5]!=0&&a[i][1]=="0_refinery")
						s_m="<img src='block/ves_gas.gif' style=left:55;top:-20>"
					this.uList[2]+=",unit_"+a[i][0]
					l+="<span id=unit_"+a[i][0]+" name="+a[i][1]+" uType=build hp="+uu.hp+" chp="+uu.hp+" bType='' bn="+(a[i][5]==0 ? 0 : -1)+"  mn=-1 sx="+a_sz[0]+" sy="+a_sz[1]+" px="+xi+" py="+yi+" pw="+a_sz[0]+" ph="+a_sz[1]+" aimu='' race='"+a[i][4]+"' style='left:"+(xi*40+parseInt(a_mv[0]))+";top:"+(yi*30+parseInt(a_mv[1]))+";z-index:"+yi+"'>"
					l+="<v:oval coordsize='21600,21600' strokecolor="+(a[i][4]==cRace ? "#10FC18" : "#F83A3A")+" style='visibility:hidden;position:absolute;left:"+a_sl[0]+";top:"+a_sl[1]+";width:"+a_sl[2]+";height:"+a_sl[3]+"'><v:fill opacity =0></v:fill><span class=hpbar style='left:"+a_hp[0]+";top:"+a_hp[1]+";width:"+a_hp[2]+"'><hr size=3 color=#249824 style=width:"+(a[i][5]==0 ? 0 : "100%")+"></span></v:oval>"
					l+="<span style=width:"+a_wh[0]+";height:"+a_wh[1]+";overflow:hidden><img src=build/"+a[i][1]+"_"+a[i][4]+".gif style=left:"+(a[i][5]==0 ? -2*a_wh[0] : 0)+"></span>"
					l+="<span>"+s_m+"</span>"
					l+="</span>"
					lm+="<hr id=unit_"+a[i][0]+"_mini color='"+a[i][4]+"' style=left:"+(xi*2)+";top:"+(yi*2)+";width:"+(a_sz[0]*2)+";height:"+(a_sz[1]*2)+">"
					if(a[i][1]=="0_hq"){
						race[a[i][4]].hq=(xi+1)+","+(yi+1)
					}
				}
				if(uu.type=="unit"){
					a_hp=uu.hppos.split(",")
					this.uList[3]+=",unit_"+a[i][0]
					l+="<span id=unit_"+a[i][0]+" name="+a[i][1]+" uType=unit hp="+uu.hp+" chp="+uu.hp+" mvstyle='"+uu.mvstyle+"' px="+xi+" py="+yi+" cw="+uu.wh+" race='"+a[i][4]+"' class='unit_"+uu.kind+"' speed='"+uu.speed+"' path='' aimPos='' aimn=0 aimu='' face='' pose=0 tmMove=0 tmDir=0 style='left:"+(xi*40+(40-uu.wh)/2)+";top:"+(yi*30+(30-uu.wh)/2)+";z-index:"+yi+"'>"
					l+="<v:oval coordsize='21600,21600' strokecolor="+(a[i][4]==cRace ? "#10FC18" : "#F83A3A")+" style='visibility:hidden;position:absolute;left:"+a_sl[0]+";top:"+a_sl[1]+";width:"+a_sl[2]+";height:"+a_sl[3]+"'><v:fill opacity =0></v:fill><span class=hpbar style='left:"+a_hp[0]+";top:"+a_hp[1]+";width:"+a_hp[2]+"'><hr size=3 color=#249824 style=width:100%></span></v:oval>"
					l+="<span style=width:"+uu.wh+";height:"+uu.wh+";overflow:hidden><img src=unit/"+a[i][1]+"_"+a[i][4]+".gif style=top:"+(-parseInt(5*Math.random())*uu.wh)+"></span>"
					l+="<span></span></span>"
					lm+="<hr id=unit_"+a[i][0]+"_mini color='"+a[i][4]+"' style=left:"+(xi*2)+";top:"+(yi*2)+";width:2;height:2>"
				}
			}
		}
		this.maxID=parseInt(a[i][0])+1
		if(sys.minePos.slice(0,1)==";")
			sys.minePos=sys.minePos.slice(1)
		if(sys.vesPos.slice(0,1)==";")
			sys.vesPos=sys.vesPos.slice(1)
		if(this.bList[0].slice(0,1)==";")
			this.bList[0]=this.bList[0].slice(1)
		if(this.bList[1].slice(0,1)==";")
			this.bList[1]=this.bList[1].slice(1)
		if(this.uList[0].slice(0,1)==",")
			this.uList[0]=this.uList[0].slice(1)
		if(this.uList[1].slice(0,1)==",")
			this.uList[1]=this.uList[1].slice(1)
		if(this.uList[2].slice(0,1)==",")
			this.uList[2]=this.uList[2].slice(1)
		if(this.uList[3].slice(0,1)==",")
			this.uList[3]=this.uList[3].slice(1)
		divMain.insertAdjacentHTML("beforeend",l)
		mini_map.insertAdjacentHTML("afterbegin",lm)
	}
	this.delUnit=function(u){
		var u_mini=eval(u.id+"_mini")
		if(this.selUnit==u.id)
			this.selUnit=""
		for(i=0;i<u.pw;i++){
			for(j=0;j<u.ph;j++){
				this.bList[1]=(";"+this.bList[1]+";").replace(";"+(parseInt(u.px)+i)+","+(parseInt(u.py)+j)+";",";").slice(1,-1)
			}
		}
		this.uList[2]=(","+this.uList[2]+",").replace(","+u.id+",",",").slice(1,-1)
		this.uList[3]=(","+this.uList[3]+",").replace(","+u.id+",",",").slice(1,-1)
		this.selUnit=(","+this.selUnit+",").replace(","+u.id+",",",").slice(1,-1)
		u.removeNode(true)
		u_mini.removeNode(true)
	}
	this.uInPos=function(p){
		var u,o,a=(this.uList[1]+","+this.uList[2]+","+this.uList[3]).split(",")
		var pw,ph
		for(var i in a){
			o=eval(a[i])
			pw=o.pw==null ? 1 : o.pw
			ph=o.ph==null ? 1 : o.ph
			if(p.x-o.px<pw&&p.x-o.px>=0&&p.y-o.py<ph&&p.y-o.py>=0){
				u=o
				if(u.name!="ves")
					break
			}
		}
		return u
	}
	this.selRange=function(sp,ep){
		var l="",u,a,i
		if(fw1.selUnit!=""){
			a=fw1.selUnit.split(",")
			for(i in a){
				u=eval(a[i])
				u.children(0).style.visibility="hidden"
			}
		}
		a=this.uList[3].split(",")
		for(i=0;i<a.length;i++){
			u=eval(a[i])
			if(u.race==cRace&&((u.px>=sp.x&&ep.x>=u.px)||(u.px<=sp.x&&ep.x<=u.px))&&((u.py>=sp.y&&ep.y>=u.py)||(u.py<=sp.y&&ep.y<=u.py))){
				u.children(0).style.visibility=""
				l+=u.id+","
			}
		}
		l=l.slice(0,-1)
		if(sp.v==ep.v&&l==""){
			u=this.uInPos(sp)
			if(u!=null){
				u.children(0).style.visibility=""
				l=u.id
			}
		}
		fw1.selUnit=l
	}
	this.setUBlock=function(u){
		var u
		this.bList[2]=""
		al=this.uList[3].split(",")
		for(i in al){
			u=eval(al[i])
			if(u.path==""&&(","+this.selUnit+",").indexOf(","+u.id+",")==-1)
				this.bList[2]+=u.px+","+u.py+";"
		}
		this.bList[2]=";"+this.bList[2]
		if(u!=null)
			this.bList[2]=this.bList[2].replace(";"+u.px+","+u.py+";",";")
	}
	this.go=function(ep0){
		if(this.selUnit=="")
			return
		var sp=new pt(),ep=new pt()
		var al,a,i,s,rv,epu,epuName,u
		this.setUBlock()
		this.cEndPos=0
		al=fw1.selUnit.split(",")
		for(i in al){
			u=eval(al[i])
			epu=this.uInPos(ep0)
			epuName=epu==null ? "" : epu.name
			u.aimPos=""
			u.task=""
			u.aimu=""
			u.children(2).innerHTML=""
			u.children(1).style.display=""
			if(epu!=null){
				if((u.name=="0_firebat"||u.name=="0_marine")&&epu.race!=cRace){
					u.aimu=epu.id
					u.task="attack"
				}
			}
			sp.setv(u.px,u.py)
			this.bList[2]=fw1.bList[2].replace(";"+sp.v+";",";")
			s=""
			if(u.className=="airUnit")
				s="airUnit"
			if(u.name=="0_scv"&&epuName=="mine")
				s="mining"
			rv=this.getEndPos(ep0,s)
			if(rv[0]=="")
				return
			if(rv[1]!="")
				u.aimu=rv[1]
			ep.setv(rv[0])
			if(u.className=="airUnit")
				u.path=ep.v
			else{
				if(this.inBlock(ep))
					return
				l=this.getPath(sp,ep)
				u.path=l
				if(u.name=="0_scv"){
					a="2,0;2,1;1,2;0,2;-1,2;-2,1;-2,0;-2,-1;-1,-2;0,-2;1,-2;2,-1".split(";")
					var n=parseInt(12*Math.random())
					a[n]=a[n].split(",")
					sp.setv(race[u.race].hq)
					sp.setv(sp.x+parseInt(a[n][0]),sp.y+parseInt(a[n][1]))
					if(epuName=="mine"){
						u.aimPos=u.aimu+",400;"+sp.v+";"+ep.v
						u.task="mining"
					}
					if(epuName=="0_refinery"){
						if(epu.bn==-1){
							u.aimPos=epu.id+",100;"+sp.v+";"+ep.v
							u.task="gasing"
						}
					}
				}
			}
		}
	}
	this.setSpark=function(u){
		var s="left:-10;top:0"
		if(u.face==0)
			s="left:5;top:-10"
		if(u.face=="1f")
			s="left:-5;top:-10"
		if(u.face==1)
			s="left:18;top:-10"
		if(u.face==2)
			s="left:18;top:0"
		if(u.face==3)
			s="left:18;top:15"
		if(u.face=="3f")
			s="left:-5;top:15"
		if(u.face==4)
			s="left:0;top:15"
		u.children(2).innerHTML="<img src=unit/0_scv_spark.gif style="+s+">"
	}
	this.setFight=function(u){
		var l="",a_fpos=new Array(),p=new pt(0,0)
		a_fpos=createClass("0_marine_4:0,-3;0_marine_3:5,-1;0_marine_3f:-4,-1;0_marine_2:4,0;0_marine_2f:-4,0;0_marine_1:4,0;0_marine_1f:-4,0;0_marine_0:6,-4;0_firebat_4:6,0;0_firebat_0:-13,-64;0_firebat_1:5,-56;0_firebat_1f:-30,-56;0_firebat_2:4,-35;0_firebat_2f:-65,-35;0_firebat_3:4,0;0_firebat_3f:-57,0")
		if(a_fpos[u.name+"_"+u.face]!=null)
			p.setv(a_fpos[u.name+"_"+u.face])
		l="<img src=unit/"+u.name+"_"+u.race+"_atk0.gif style=left:"+p.x+";top:"+p.y+">"
		if(u.face==1)
			l="<img src=unit/"+u.name+"_"+u.race+"_atk1.gif style=left:"+p.x+";top:"+p.y+">"
		if(u.face=="1f")
			l="<img src=unit/"+u.name+"_"+u.race+"_atk1.gif style=filter:fliph;left:"+p.x+";top:"+p.y+">"
		if(u.face==2)
			l="<img src=unit/"+u.name+"_"+u.race+"_atk2.gif style=left:"+p.x+";top:"+p.y+">"
		if(u.face=="2f")
			l="<img src=unit/"+u.name+"_"+u.race+"_atk2.gif style=filter:fliph;left:"+p.x+";top:"+p.y+">"
		if(u.face=="3")
			l="<img src=unit/"+u.name+"_"+u.race+"_atk3.gif style=left:"+p.x+";top:"+p.y+">"
		if(u.face=="3f")
			l="<img src=unit/"+u.name+"_"+u.race+"_atk3.gif style=filter:fliph;left:"+p.x+";top:"+p.y+">"
		if(u.face=="4")
			l="<img src=unit/"+u.name+"_"+u.race+"_atk4.gif style=left:"+p.x+";top:"+p.y+">"
		u.children(1).style.display="none"
		u.children(2).innerHTML=l
	}
	this.getMinLen=function(u,aimu){
		var n0=1000,pw,ph,n,ep=new pt(),dp=new pt(),a_rv=new Array()
		pw=aimu.pw==null ? 1 : aimu.pw
		ph=aimu.ph==null ? 1 : aimu.ph
		for(var i=0;i<pw;i++){
			for(var j=0;j<ph;j++){
				ep.setv(parseInt(aimu.px)+i,parseInt(aimu.py)+j)
				n=Math.max(Math.abs(ep.x-u.px),Math.abs(ep.y-u.py))
				if(n<n0){
					n0=n
					dp.setv(ep.x==u.px ? 0 : (ep.x>u.px ? 1 : -1),ep.y==u.py ? 0 : (ep.y>u.py ? 1 : -1))
				}
			}
		}
		a_rv[0]=n0
		a_rv[1]=dp.v
		return a_rv
	}
	this.move=function(u){
		var dp=new pt(),sp=new pt(),ep=new pt()
		if(u.path==""){
			sp.setv(u.px,u.py)
			if(u.mvstyle=="walk"){
				u.children(1).scrollLeft=0
			}
			if(u.task=="attack"){
				if((","+this.uList[2]+","+this.uList[3]+",").indexOf(","+u.aimu+",")==-1){
					u.task=""
					u.children(1).style.display=""
					u.children(2).innerHTML=""
				}
				else{
					if(u.children(1).style.display!="none"){
						var aimu=eval(u.aimu)
						dp.setv(this.getMinLen(u,aimu)[1])
						this.setDir(u,dp)
						this.setFight(u)
						//if(aimu.task!="attack"){
						//	aimu.aimu=u.id
						//	aimu.task="attack"
						//}
					}
					eval(u.aimu).chp-=0.2
				}
			}
			if(u.task=="build"){
				o=eval(u.aimu)
				u.tmMove=parseInt(u.tmMove)+1
				if(u.tmMove==10){
					dp.setv(o.px==sp.x ? 0 : (o.px>sp.x ? 1 : -1),o.py==sp.y ? 0 : (o.py>sp.y ? 1 : -1))
					this.setDir(u,dp)
					this.setSpark(u)
				}
				o.bn=parseInt(o.bn)+1
				var per=parseInt(0.3*o.bn/udf[o.name].btime)
				o.children(0).children(1).children(0).style.width=per+"%"
				if(per==50)
					o.children(1).children(0).style.posLeft=-o.children(1).style.posWidth
				if(per>=100){
					o.children(1).children(0).style.posLeft=0
					o.bn=-1
					u.task=""
					u.aimu=""
					if(o.name=="0_academy"){
						race[cRace].keyBuild+=o.name+","
						if(menu_build.children(0).children.length==3){
							menu_build.children(0).children(1).style.filter=""
							menu_build.children(0).children(2).style.filter=""
						}
					}
					if(o.name=="0_supply")
						race[cRace].supply+=8
					if(o.name=="0_barrack")
						menu_work.children(0).children(3).style.filter=""
					refVal()
					u.children(2).innerHTML=""
					if(o.name=="0_refinery")
						o.children(2).innerHTML="<img src='block/ves_gas.gif' style=left:55;top:-20>"
				}
			}
			if(u.aimPos!=""){
				var a=u.aimPos.split(";"),ad,s
				u.aimn=parseInt(u.aimn)
				ad=a[u.aimn].split(",")
				if(isNaN(ad[0])){
					o=eval(ad[0])
					if(u.task=="gasing"){
						if(o.aimu=="")
							o.aimu=u.id
						if(o.aimu!=u.id){
							dp.setv((parseInt(o.px)+1)==sp.x ? 0 : ((parseInt(o.px)+1)>sp.x ? 1 : -1),o.py==sp.y ? 0 : (o.py>sp.y ? 1 : -1))
							this.setDir(u,dp)
							return
						}
					}
					u.tmMove=parseInt(u.tmMove)+1
					if(u.tmMove==5){
						if(u.task=="mining"){
							dp.setv(o.px==sp.x ? 0 : (o.px>sp.x ? 1 : -1),o.py==sp.y ? 0 : (o.py>sp.y ? 1 : -1))
							this.setDir(u,dp)
							this.setSpark(u)
						}
						if(u.task=="gasing")
							u.style.display="none"
					}
					if(u.tmMove<ad[1])
						return
					if(u.task=="gasing"){
						u.style.display=""
						o.aimu=""
					}
					u.children(2).innerHTML=""
				}
				else{
					fw1.bList[2]=""
					ep.setv(a[u.aimn])
					u.path=this.getPath(sp,ep)
				}
				if(u.task=="mining"&&u.aimn==1)
					u.children(1).children(0).style.posLeft=-u.cw
				if(u.task=="gasing"&&u.aimn==1)
					u.children(1).children(0).style.posLeft=-2*u.cw
				if((u.task=="mining")&&u.aimn==2){
					u.children(1).children(0).style.posLeft=0
					race[cRace].mine+=8
					refVal()
				}
				if((u.task=="gasing")&&u.aimn==2){
					u.children(1).children(0).style.posLeft=0
					race[cRace].ves+=8
					refVal()
				}
				u.aimn=(u.aimn+1)%a.length
			}
			return
		}
		u.tmDir=(parseInt(u.tmDir)+1)%4
		u.tmMove=(parseInt(u.tmMove)+1)%5
		ep.setv(u.path.slice(0,(u.path+";").indexOf(";")))
		ep.setv(ep.x*40-(u.cw-40)/2,ep.y*30-(u.cw-30)/2)
		if(Math.abs(ep.x-u.style.posLeft)<u.speed)
			u.style.posLeft=ep.x
		if(Math.abs(ep.y-u.style.posTop)<u.speed)
			u.style.posTop=ep.y
		sp.setv(u.style.posLeft,u.style.posTop)
		dp.setv(ep.x==sp.x ? 0 : (ep.x>sp.x ? 1 : -1),ep.y==sp.y ? 0 : (ep.y>sp.y ? 1 : -1))
		if(u.task=="attack"){
			var aimu=eval(u.aimu)
			if(this.getMinLen(u,aimu)[0]<=udf[u.name].range&&Math.abs(u.px*40-(u.cw-40)/2-u.style.posLeft)<=u.speed&&Math.abs(u.py*30-(u.cw-30)/2-u.style.posTop)<=u.speed){
				u.path=""
				return
			}
		}
		if(dp.v=="0,0"){
			u.path=u.path.slice((u.path+";").indexOf(";")+1)
			if(u.children(1).offsetWidth==u.offsetWidth*3)
				u.children(1).scrollLeft=u.children(1).style.filter=="" ? 0 : 2*u.offsetWidth
			if(u.path==""&&u.uType=="unit"){
				this.searchEnemy()
			}
			return
		}
		this.setDir(u,dp)
		if(dp.x*dp.y==0){
			u.style.posLeft+=dp.x*u.speed
			u.style.posTop+=dp.y*u.speed
		}
		else{
			u.style.posLeft+=dp.x*(u.speed>2 ? u.speed-1 : u.speed)
			if(u.tmDir!=0)
				u.style.posTop+=dp.y*(u.speed>2 ? u.speed-1 : u.speed)
		}
		sp.setv(parseInt((u.style.posLeft+u.cw/2)/40),parseInt((u.style.posTop+u.cw/2)/30))
		u.px=sp.x
		u.py=sp.y
		if(u.className=="unit_ground")
			u.style.zIndex =sp.y
		eval(u.id+"_mini").style.posLeft=sp.x*2
		eval(u.id+"_mini").style.posTop=sp.y*2
	}
	this.searchEnemy=function(){
		var n,u,aimu,a1=this.uList[3].split(","),a2=(this.uList[2]+","+this.uList[3]).split(",")
		for(var i in a1){
			u=eval(a1[i])
			if(u.name!="0_scv"&&u.name!="0_medic"){
				for(var j in a2){
					aimu=eval(a2[j])
					if(aimu.race!=u.race){
						n=this.getMinLen(u,aimu)[0]
						if(n<=6){
							var sp=new pt(u.px,u.py),ep=new pt(aimu.px,aimu.py)
							this.setUBlock(u)
							this.bList[2]=""
							u.path=this.getPath(sp,ep)
							u.aimu=aimu.id
							u.task="attack"
							break
						}
					}
				}
			}
		}
	}
	this.setDir=function(u,dp){
		var n=2,f=""
		if(dp.v=="1,1"||dp.v=="-1,1")
			n=3
		if(dp.v=="0,1")
			n=4
		if(dp.v=="-1,1")
			f="fliph"
		if(dp.v=="-1,0")
			f="fliph"
		if(dp.v=="-1,-1")
			f="fliph"
		if(dp.v=="0,-1")
			n=0
		if(dp.v=="1,-1"||dp.v=="-1,-1")
			n=1
		u.children(1).children(0).style.posTop=-n*u.children(1).style.posWidth
		u.children(1).style.filter=f
		u.face=n+f.slice(0,1)
		if(u.mvstyle=="walk"&&u.tmMove==4){
			u.pose=(parseInt(u.pose)+1)%4
			n=u.pose<2 ? u.pose : (u.pose==2 ? 0 : 2)
			u.children(1).scrollLeft=n*u.children(1).style.posWidth
		}
	}
	this.inBlock=function(p){
		return (";"+this.bList[0]+";"+this.bList[1]+";"+this.bList[2]+";").indexOf(";"+p.v+";")>-1 ? true : false
	}
	this.paint=function(p,c){
		if(p.x>=0&&p.y>=0)
			tbMap.rows(p.y).cells(p.x).bgColor=c
	}	
	this.isPass=function(sp,ep){
		var cp=new pt(sp.v),b=true
		for(var ti=0;ti<500;ti++){
			cp.setv(ep.x==cp.x ? cp.x : (ep.x>cp.x ? cp.x+1 : cp.x-1),ep.y==cp.y ? cp.y : (ep.y>cp.y ? cp.y+1 : cp.y-1))
			if(this.inBlock(cp)){
				b=false
				break
			}
			if(cp.v==ep.v)
				break
		}
		return b
	}
	this.getEndPos=function(ep,ut){
		var rv=new Array("","")
		var cp=new pt(),i,j,ol,o
		var ad,a=new Array("0,0","1,0","1,1","0,1","-1,1","-1,0","-1,-1","0,-1","1,-1","2,0","2,1","2,2","1,2","0,2","-1,2","-2,2","-2,1","-2,0","-2,-1","-2,-2","-1,-2","0,-2","1,-2","2,-2","2,-1")
		for(i=this.cEndPos;i<a.length;i++){
			a[i]=a[i].split(",")
			cp.setv(ep.x+parseInt(a[i][0]),ep.y+parseInt(a[i][1]))
			if(ut=="airUnit"){
				rv[0]=cp.v
				break
			}
			else if(!this.inBlock(cp)&&cp.x>-1&&cp.y>-1){
				if(ut=="mining"){
					ad=this.uList[1].split(",")
					for(j in ad){
						o=eval(ad[j])
						if(Math.abs(cp.x-o.px)+Math.abs(cp.y-o.py)==1){
							rv[0]=cp.v
							rv[1]=o.id
							break
						}
					}
					if(rv[0]!="")
						break
				}
				else{
					rv[0]=cp.v
					break
				}
			}
		}
		this.cEndPos=i+1
		return rv
	}
	this.getPath=function(sp,ep){
		var cp=new pt(sp.v),op=new pt(),np=new pt()
		var l="",s,f=0
		while(cp.v!=ep.v){
			np.setv(ep.x==cp.x ? cp.x : (ep.x>cp.x ? cp.x+1 : cp.x-1),ep.y==cp.y ? cp.y : (ep.y>cp.y ? cp.y+1 : cp.y-1))
			if(this.inBlock(np)&&!this.inBlock(cp)&&f==0){
				l+=cp.v+";"
				op.setv(cp.v)
			}
			if(!this.inBlock(np)&&this.inBlock(cp)){
				s=this.getSeg(op,np)
				f=s=="" ? 1 : 0
				l+=s
			}
			if(!this.inBlock(cp)&&f==0)
				l+=cp.v+";"
			cp.setv(np.v)
		}
		l=sp.v+";"+l
		l=f==0 ? l+ep.v : l.slice(0,-1)
		a=l.split(";")
		l=""
		var tp1=new pt(),tp2=new pt()
		for(i=0;i<a.length-1;i++){
			tp1.setv(a[i])
			n=i
			for(j=i+1;j<a.length;j++){
				tp2.setv(a[j])
				if(this.isPass(tp1,tp2)){
					n=j
				}
			}
			if(i!=0)
				l+=tp1.v+";"
			tp2.setv(a[n])
			l+=tp2.v+";"
			i=n
		}
		l=l.slice(0,-1)
		return l
	}
	this.getSeg=function(sp,ep){
		var bpt=new pt(),cpt=new pt(),bp1=new pt(),bp2=new pt(),cp1=new pt(sp.v),cp2=new pt(sp.v)
		var l="",l1="",l2="",f,open1=true,open2=true
		bp1.setv(ep.x==sp.x ? sp.x : (ep.x>sp.x ? sp.x+1 : sp.x-1),ep.y==sp.y ? sp.y : (ep.y>sp.y ? sp.y+1 : sp.y-1))
		bp2.setv(bp1.v)
		for(var ti=0;ti<100;ti++){
			f=0
			for(i=0;i<14;i++){
				cpt.setv(cp1.x+this.adp[i][0],cp1.y+this.adp[i][1])
				if(bp1.v==cpt.v)
					f=1
				if(f==1&&!this.inBlock(cpt)&&this.adp[i][0]*this.adp[i][1]==0)
					break
				if(this.inBlock(cpt))
					bpt.setv(cpt.v)
			}
			bp1.setv(bpt.v)
			cp1.setv(cpt.v)
			l1+=cp1.v+";"
			f=0
			for(i=13;i>=0;i--){
				cpt.setv(cp2.x+this.adp[i][0],cp2.y+this.adp[i][1])
				if(bp2.v==cpt.v)
					f=1
				if(f==1&&!this.inBlock(cpt)&&this.adp[i][0]*this.adp[i][1]==0)
					break
				bpt.setv(cpt.v)
			}
			bp2.setv(bpt.v)
			cp2.setv(cpt.v)
			if(cp1.v==sp.v&&cp2.v==sp.v)
				break
			l2+=cp2.v+";"
			if(cp1.x<0||cp1.y<0)
				open1=false
			if(cp2.x<0||cp2.y<0)
				open2=false
			if(!open1&&!open2)
				break
			if(cp1.v==ep.v&&open1){
				l=l1
				break
			}
			if(cp2.v==ep.v&&open2){
				l=l2
				break
			}
		}
		return l
	}
}
function pt(x,y){
	this.setv=function(x,y){
		if(y!=null){
			this.x=parseInt(x)
			this.y=parseInt(y)
		}
		else{
			var a=x.split(",")
			this.x=parseInt(a[0])
			this.y=parseInt(a[1])
		}
		this.v=this.x+","+this.y
	}
	if(x!=null)
		this.setv(x,y)
}