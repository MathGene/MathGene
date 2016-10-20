/*
	MathGene Translation/Rendering Library- Version 1.00
    Copyright (C) 2016  George J. Paulos

    MathGene is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    MathGene is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

//external callable functions
function mgTranslate(expression,scale) { //translate between MG, HTML, and LaTex
	if (typeof expression == "undefined") {return {html:"",latex:"",mg:"",} }
	if (typeof scale == "undefined") {scale = 100}
	var mgFmt = texImport(expression);
	return {
		html:	"<span title='MathGene HTML' style='font-family:"+mgConfig.htmlFont+";font-size:"+scale+"%'>"+htmlExport(mgFmt)+"</span>",
		latex:	texExport(mgFmt),
		mg:		mgFmt,
		}
}
function mgOutput(expression,scale) { //output MG, HTML, and LaTex from MG without LaTex import
	if (typeof scale == "undefined") {scale = 100}
	return {
		html:	"<span title='MathGene HTML' style='font-family:"+mgConfig.htmlFont+";font-size:"+scale+"%'>"+htmlExport(expression)+"</span>",
		latex:	texExport(expression),
		mg:		expression,
		}
}

// internal objects
var mgConfig = 
{
	trigBase: 	1, 			//trig base 1=radians. Math.pi/180 for degrees, Math.pi/200 gradians
	divScale:	85, 		//default scale factor for x/y division in percent
	divSymbol: 	"Over", 	//default HTML divide symbol "Slash" or "Over"
	fnFmt: "	fn x", 		//function format "fn(x)" or "fn x"
	invFmt: 	"asin", 	//inverse trig function format "asin" or "sin<sup>-1</sup>"
	cplxFmt: 	"Rect", 	//complex numbers "Rect" or "Polar" 	
	pctFactor: 	100, 		//percent factor 100 for percent, 1 for n.nn decimal
	dPrecision: 16, 		//decimal precision
	Domain: 	"Complex",	//domain Complex or Real
	editMode: 	false, 		//edit mode formatting
	htmlFont:	"Times,Serif", //default HTML font-family
}

var Cv = new Array(11000); //symbol array
var Cs = new Array(11000); //symbol rendering
var Cd = new Array(50); //constant description
var Cu = new Array(50); //constant units

//Initialize constants
Cv[0] = 7.2973525698e-3;	Cu[0]="";				Cs[0]="&#945;"; 										Cd[0]="fine structure const";
Cv[1] = 5.2917721092e-11;	Cu[1]="m";				Cs[1]="&#945;<span style='font-size:50%'>0</span>"; 	Cd[1]="Bohr radius";
Cv[2] = 2.8977721e-3;		Cu[2]="m&#8226;K";		Cs[2]="<i>b</i>"; 										Cd[2]="Wein displacement const.";
Cv[3] = 299792458;			Cu[3]="m/s";			Cs[3]="<i>c</i>"; 										Cd[3]="speed of light";
Cv[4] = 0.577215664901532;	Cu[4]="";				Cs[4]="&#947;";				 							Cd[4]="Euler–Mascheroni constant";

Cv[5] = 3.74177153e-16;		Cu[5]="W/m&#178;";		Cs[5]="c<span style='font-size:50%'>1</span>";			Cd[5]="1<sup>st</sup> radiation constant";
Cv[6] = 1.4387770e-2;		Cu[6]="m&#8226;K";		Cs[6]="c<span style='font-size:50%'>2</span>"; 			Cd[6]="2<sup>nd</sup> radiation constant";
Cv[7] = 8.854187817e-12;	Cu[7]="F/m";			Cs[7]="&#949;<span style='font-size:50%'>0</span>"; 	Cd[7]="vacuum permittivity";
Cv[8] = 2.718281828459045;	Cu[8]="";				Cs[8]="<i>e</i>"; 										Cd[8]="Euler constant";
Cv[9] = 1.602176565e-19;	Cu[9]="J";				Cs[9]="eV"; 											Cd[9]="electron volt";

Cv[10] = 96485.3365;		Cu[10]="C/mol";			Cs[10]="<i>F</i>"; 										Cd[10]="Faraday constant";
Cv[11] = 6.67384e-11;		Cu[11]="m&#179;/kg&#8226;s&#178;";Cs[11]="<i>G</i>"; 							Cd[11]="Newton constant";
Cv[12] = 9.80665;			Cu[12]="m/s&#178;";		Cs[12]="g"; 											Cd[12]="Earth gravity accel";
Cv[13] = 7.7480917346e-5;	Cu[13]="s";				Cs[13]="<i>G<span style='font-size:50%'>0</span><i>"; 	Cd[13]="conductance quantum";
Cv[14] = 6.62606957e-34;	Cu[14]="J&#8226;s";		Cs[14]="<i>h</i>"; 										Cd[14]="Planck constant";

Cv[15] = 1.054571726e-34;	Cu[15]="J&#8226;s";		Cs[15]="<i>&#295;</i>"; 								Cd[15]="<i>h</i>/2&#295;";
Cv[16] = 483597.870e9;		Cu[16]="Hz/V";			Cs[16]="<i>K<span style='font-size:50%'>j</span></i>"; 	Cd[16]="Josephson constant";
Cv[17] = 1.3806488e-23;		Cu[17]="J/K";			Cs[17]="k"; 											Cd[17]="Boltzmann constant";
Cv[18] = 2.4263102389e-12;	Cu[18]="m";				Cs[18]="&#955;"; 										Cd[18]="Compton wavelength";
Cv[19] = 1.616199e-35;		Cu[19]="m";				Cs[19]="<i>l</i><span style='font-size:50%'>P</span>";	Cd[19]="Planck length";

Cv[20] = 12.566370614e-7;	Cu[20]="N/A&#178;";		Cs[20]="&#956;<span style='font-size:50%'>0</span>";	Cd[20]="vacuum permeability";
Cv[21] = 927.400968e-26;	Cu[21]="J/T";			Cs[21]="&#956;<span style='font-size:50%'>B</span>"; 	Cd[21]="Bohr magneton";
Cv[22] = 9.10938291e-31;	Cu[22]="kg";			Cs[22]="<i>M<span style='font-size:50%'>e</span></i>"; 	Cd[22]="electron mass";
Cv[23] = 1.672621777e-27;	Cu[23]="kg";			Cs[23]="<i>M<span style='font-size:50%'>p</span></i>"; 	Cd[23]="proton mass";
Cv[24] = 1.674927351e-27;	Cu[24]="kg";			Cs[24]="<i>M<span style='font-size:50%'>n</span></i>"; 	Cd[24]="neutron mass";

Cv[25] = 2.17651e-8;		Cu[25]="kg";			Cs[25]="<i>M<span style='font-size:50%'>P</span></i>"; 	Cd[25]="Planck mass";
Cv[26] = 1.660538921e-27;	Cu[26]="kg";			Cs[26]="<i>M<span style='font-size:50%'>u</span></i>"; 	Cd[26]="atomic mass constant";
Cv[27] = 6.02214129e23;		Cu[27]="/mol";			Cs[27]="<i>N<span style='font-size:50%'>a</span></i>"; 	Cd[27]="Avogadro constant";
Cv[28] = 2.6867805e25;		Cu[28]="m&#179;";		Cs[28]="n<span style='font-size:50%'>0</span>";			Cd[28]="Loschmidt constant";
Cv[29] = 3.141592653589793;	Cu[29]="";				Cs[29]="&#960;"; 										Cd[29]="Archimedes constant"; 

Cv[30] = 6.283185307179586;	Cu[30]="";				Cs[30]="2&#960;"; 										Cd[30]="2&times;&#960;";
Cv[31] = 1.61803398874989;	Cu[31]="";				Cs[31]="&#966;"; 										Cd[31]="golden ratio";
Cv[32] = 2.0678346161e-15;	Cu[32]="Wb";			Cs[32]="&#966;<span style='font-size:50%'>0</span>"; 	Cd[32]="magnetic flux quantum";
Cv[33] = 101325;			Cu[33]="Pa";			Cs[33]="<i>P<span style='font-size:50%'>atm</span></i>";Cd[33]="standard pressure";
Cv[34] = 1.602176566e-19;	Cu[34]="C";				Cs[34]="q<span style='font-size:50%'>e</span>"; 		Cd[34]="elementary charge";

Cv[35] = 8.3144621;			Cu[35]="J/mol&#8226;K";	Cs[35]="<i>R<span style='font-size:50%'>c</span></i>";	Cd[35]="Universal gas constant";
Cv[36] = 25812.8074434;		Cu[36]="&#937;";		Cs[36]="<i>R<span style='font-size:50%'>k</span></i>"; 	Cd[36]="von Klitzing constant";
Cv[37] = 10973731.568539;	Cu[37]="/m";			Cs[37]="<i>R<span style='font-size:50%'>&#8734;</span></i>";Cd[37]="Rydberg constant";
Cv[38] = 2.8179403267e-15;	Cu[38]="m";				Cs[38]="r<span style='font-size:50%'>e</span>"; 		Cd[38]="classical electron radius";
Cv[39] = 5.670373e-8;		Cu[39]="W/m&#178;&#8226;K&#8308;";Cs[39]="&#963;";								Cd[39]="Stefan-Boltzmann";

Cv[40] = 1.416833e32;		Cu[40]="K";				Cs[40]="<i>T<span style='font-size:50%'>P</span></i>"; 	Cd[40]="Planck temperature";
Cv[41] = 5.39106e-44;		Cu[41]="s";				Cs[41]="<i>t</i><span style='font-size:50%'>P</span>";	Cd[41]="Planck time";
Cv[42] = 2.241409e-2;		Cu[42]="m&#179;/mol";	Cs[42]="<i>V<span style='font-size:50%'>m</span></i>";	Cd[42]="molar volume";
Cv[43] = 376.730313461;		Cu[43]="&#937;";		Cs[43]="<i>Z<span style='font-size:50%'>0</span></i>"; 	Cd[43]="vacuum impedance";
Cv[44] = 0;					Cu[44]="";				Cs[44]="0";												Cd[44]="Null";

Cv[45] = {r:1, i:0, s:"!"};				Cs[45]="!";
Cv[46] = {r:0, i:1};					Cs[46] = "<i>i</i>";
Cv[8230] = 0;
Cv[8734] = "Infinity";

//initialize symbols
for (var iAl=47;iAl<10000;iAl++)	{Cs[iAl]="&#"+(iAl)+";"}
for (var iAl=58;iAl<=127;iAl++) 	{Cs[iAl]=String.fromCharCode(iAl)}//ascii
for (var iAl=48;iAl<=57;iAl++)		{Cs[iAl]="<i>"+String.fromCharCode(iAl)+"</i>"}//0-9
for (var iAl=65;iAl<=90;iAl++)		{Cs[iAl]="<b>"+String.fromCharCode(iAl)+"</b>"}//A-Z bold 
for (var iAl=97;iAl<=22;iAl++)		{Cs[iAl]="<b>"+String.fromCharCode(iAl)+"</b>"}//a-z bold 
for (var iAl=10032;iAl<=10047;iAl++){Cs[iAl]=String.fromCharCode(iAl-10000)}//punc
for (var iAl=10065;iAl<=10090;iAl++){Cs[iAl]="<i>"+String.fromCharCode(iAl-10000)+"</i>"}//A-Z italic
for (var iAl=10097;iAl<=10122;iAl++){Cs[iAl]="<i>"+String.fromCharCode(iAl-10000)+"</i>"}//a-z italic
for (var iAl=10768;iAl<=10879;iAl++){Cs[iAl]="<i>&#"+(iAl-10000)+";</i>"}//italic accents
Cs[11100]="<i>C</i>";//constants of integration
for (var iAl=11101;iAl<=11110;iAl++) {Cs[iAl]="<i>C<sub>"+(iAl-11100)+"</sub></i>"}//constants of integration
Cv[10047] = {s:"/"}; //slash
Cv[247] = {s:"&divide;"}; //quotient
Cs[59] = "; ";
Cs[10013] = "<br>"; //line break
Cs[10044] = ", ";
Cs[60] = " &lt; ";
Cs[61] = " = ";
Cs[62] = " &gt; ";
Cs[8800] = " &#8800; "; //not equal
Cs[8804] = " &#8804; "; //less than or equal
Cs[8805] = " &#8805; "; //greater than or equal
Cs[8773] = " &#8773; "; //congruent
Cs[8747] = "<Xdiv><span style='display:inline-block;'><span style='vertical-align:middle;display:inline-table;'><span style='display:table-row;line-height:90%'>&#8992;</span><span style='display:table-row;line-height:90%'>&#8993;</span></span></span><Xdve>"; //integral
Cs[8748] = " <i>d</i>";//differential
Cs[8750] = "<Xdiv><span style='display:inline-block;'><span style='vertical-align:middle;font-size:200%'>&#8750;</span></span><Xdve>";
Cs[8751] = "<Xdiv><span style='display:inline-block;'><span style='vertical-align:middle;font-size:200%'>&#8751;</span></span><Xdve>";
Cs[8752] = "<Xdiv><span style='display:inline-block;'><span style='vertical-align:middle;font-size:200%'>&#8752;</span></span><Xdve>";
Cs[8592] = " &#8592; ";
Cs[8594] = " &#8594; ";
Cs[9998] = "<span style='color:#880000'>Error</span>";

//HTML/LaTex Translation map for functions
var funcMap =
{
"sin":{ "htmlL1":"'<Xfnc>sin<Xfnx>('",				"htmlR1":"')'",
		"htmlL2":"'<Xfnc>sin<Xfxp> '",				"htmlR2":"' '",
		"trig":true,
		"invfunc":"asn",
		"texfunc":"\\sin",
		"latexL1":"'\\\\sin(<Xfnx>'",				"latexR1":"')'",
		"latexL2":"'\\\\sin<Xfxp> {'",				"latexR2":"'}'",
		},
"cos":{ "htmlL1":"'<Xfnc>cos<Xfnx>('",				"htmlR1":"')'",
		"htmlL2":"'<Xfnc>cos<Xfxp> '",				"htmlR2":"' '",
		"trig":true,
		"invfunc":"acs",
		"texfunc":"\\cos",
		"latexL1":"'\\\\cos(<Xfnx>'",				"latexR1":"')'",
		"latexL2":"'\\\\cos<Xfxp> {'",				"latexR2":"'}'",
		},
"tan":{ "htmlL1":"'<Xfnc>tan<Xfnx>('",				"htmlR1":"')'",	
		"htmlL2":"'<Xfnc>tan<Xfxp> '",				"htmlR2":"' '",	
		"trig":true,
		"invfunc":"atn",
		"texfunc":"\\tan",
		"latexL1":"'\\\\tan(<Xfnx>'",				"latexR1":"')'",
		"latexL2":"'\\\\tan<Xfxp> {'",				"latexR2":"'}'",
		},
"sec":{ "htmlL1":"'<Xfnc>sec<Xfnx>('",				"htmlR1":"')'",
		"htmlL2":"'<Xfnc>sec<Xfxp> '",				"htmlR2":"' '",
		"trig":true,
		"invfunc":"asc",
		"texfunc":"\\sec",
		"latexL1":"'\\\\sec(<Xfnx>'",				"latexR1":"')'",
		"latexL2":"'\\\\sec<Xfxp> {'",				"latexR2":"'}'",
		},
"csc":{ "htmlL1":"'<Xfnc>csc<Xfnx>('",				"htmlR1":"')'",	
		"htmlL2":"'<Xfnc>csc<Xfxp> '",				"htmlR2":"' '",
		"trig":true,
		"invfunc":"acc",
		"texfunc":"\\csc",
		"latexL1":"'\\\\csc(<Xfnx>'",				"latexR1":"')'",
		"latexL2":"'\\\\csc<Xfxp> {'",				"latexR2":"'}'",
		},
"cot":{ "htmlL1":"'<Xfnc>cot<Xfnx>('",				"htmlR1":"')'",	
		"htmlL2":"'<Xfnc>cot<Xfxp> '",				"htmlR2":"' '",	
		"trig":true,
		"invfunc":"act",
		"texfunc":"\\cot",
		"latexL1":"'\\\\cot(<Xfnx>'",				"latexR1":"')'",
		"latexL2":"'\\\\cot<Xfxp> {'",				"latexR2":"'}'",
		},
"snh":{ "htmlL1":"'<Xfnc>sinh<Xfnx>('",				"htmlR1":"')'",	
		"htmlL2":"'<Xfnc>sinh<Xfxp> '",				"htmlR2":"' '",	
		"trig":true,
		"invfunc":"ash",
		"texfunc":"\\sinh",
		"latexL1":"'\\\\sinh(<Xfnx>'",				"latexR1":"')'",
		"latexL2":"'\\\\sinh<Xfxp> {'",				"latexR2":"'}'",
		},
"csh":{ "htmlL1":"'<Xfnc>cosh<Xfnx>('",				"htmlR1":"')'",	
		"htmlL2":"'<Xfnc>cosh<Xfxp> '",				"htmlR2":"' '",	
		"trig":true,
		"invfunc":"ach",
		"texfunc":"\\cosh",
		"latexL1":"'\\\\cosh(<Xfnx>'",				"latexR1":"')'",
		"latexL2":"'\\\\cosh<Xfxp> {'",				"latexR2":"'}'",
		},
"tnh":{ "htmlL1":"'<Xfnc>tanh<Xfnx>('",				"htmlR1":"')'",	
		"htmlL2":"'<Xfnc>tanh<Xfxp> '",				"htmlR2":"' '",	
		"trig":true,
		"invfunc":"ath",
		"texfunc":"\\tanh",
		"latexL1":"'\\\\tanh(<Xfnx>'",				"latexR1":"')'",
		"latexL2":"'\\\\tanh<Xfxp> {'",				"latexR2":"'}'",
		},
"sch":{ "htmlL1":"'<Xfnc>sech<Xfnx>('",				"htmlR1":"')'",
		"htmlL2":"'<Xfnc>sech<Xfxp> '",				"htmlR2":"' '",
		"trig":true,
		"invfunc":"axh",
		"texfunc":"\\sech",
		"latexL1":"'\\\\sech(<Xfnx>'",				"latexR1":"')'",
		"latexL2":"'\\\\sech<Xfxp> {'",				"latexR2":"'}'",
		},
"cch":{ "htmlL1":"'<Xfnc>csch<Xfnx>('",				"htmlR1":"')'",	
		"htmlL2":"'<Xfnc>csch<Xfxp> '",				"htmlR2":"' '",	
		"trig":true,
		"invfunc":"ayh",
		"texfunc":"\\csch",
		"latexL1":"'\\\\csch(<Xfnx>'",				"latexR1":"')'",
		"latexL2":"'\\\\csch<Xfxp> {'",				"latexR2":"'}'",
		},
"cth":{ "htmlL1":"'<Xfnc>coth<Xfnx>('",				"htmlR1":"')'",	
		"htmlL2":"'<Xfnc>coth<Xfxp> '",				"htmlR2":"' '",
		"trig":true,
		"invfunc":"azh",
		"texfunc":"\\coth",
		"latexL1":"'\\\\coth(<Xfnx>'",				"latexR1":"')'",
		"latexL2":"'\\\\coth<Xfxp> {'",				"latexR2":"'}'",
		},
"asn":{ "htmlL1":"'<Xfnc>asin<Xfnx>('",				"htmlR1":"')'",
		"htmlL2":"'<Xfnc>asin '",					"htmlR2":"' <Xfxp>'",
		"htmlInv1":"'<Xfnc>sin<sup>-1</sup><Xfnx>('","htmlInv2":"'<Xfnc>sin<sup>-1</sup> <Xfnx>'",
		"texfunc":"\\arcsin",
		"latexL1":"'\\\\arcsin(<Xfnx>'",			"latexR1":"')'",
		"latexL2":"'\\\\arcsin {'",					"latexR2":"'}'",
		"latexInv1":"'\\\\sin^{-1}(<Xfnx>'",		"latexInv2":"'\\\\sin^{-1} {'",
		},
"acs":{ "htmlL1":"'<Xfnc>acos<Xfnx>('",				"htmlR1":"')'",
		"htmlL2":"'<Xfnc>acos '",					"htmlR2":"' <Xfxp>'",
		"htmlInv1":"'<Xfnc>cos<sup>-1</sup><Xfnx>('","htmlInv2":"'<Xfnc>cos<sup>-1</sup> <Xfnx>'",
		"texfunc":"\\arccos",
		"latexL1":"'\\\\arccos(<Xfnx>'",			"latexR1":"')'",
		"latexL2":"'\\\\arccos {'",					"latexR2":"'}'",
		"latexInv1":"'\\\\cos^{-1}(<Xfnx>'",		"latexInv2":"'\\\\cos^{-1} {'",
		},
"atn":{ "htmlL1":"'<Xfnc>atan<Xfnx>('",				"htmlR1":"')'",
		"htmlL2":"'<Xfnc>atan '",					"htmlR2":"' <Xfxp>'",
		"htmlInv1":"'<Xfnc>tan<sup>-1</sup><Xfnx>('","htmlInv2":"'<Xfnc>tan<sup>-1</sup> <Xfnx>'",
		"texfunc":"\\arctan",
		"latexL1":"'\\\\arctan(<Xfnx>'",			"latexR1":"')'",
		"latexL2":"'\\\\arctan {'",					"latexR2":"'}'",
		"latexInv1":"''",							"latexInv2":"''",
		"latexInv1":"'\\\\tan^{-1}(<Xfnx>'",		"latexInv2":"'\\\\tan^{-1} {'",
		},
"asc":{ "htmlL1":"'<Xfnc>asec<Xfnx>('",				"htmlR1":"')'",
		"htmlL2":"'<Xfnc>asec '",					"htmlR2":"' <Xfxp>'",
		"htmlInv1":"'<Xfnc>sec<sup>-1</sup><Xfnx>('","htmlInv2":"'<Xfnc>sec<sup>-1</sup> <Xfnx>'",
		"texfunc":"\\arcsec",
		"latexL1":"'\\\\arcsec(<Xfnx>'",			"latexR1":"')'",
		"latexL2":"'\\\\arcsec {'",					"latexR2":"'}'",
		"latexInv1":"'\\\\sec^{-1}(<Xfnx>'",		"latexInv2":"'\\\\sec^{-1} {'",
		},
"acc":{ "htmlL1":"'<Xfnc>acsc<Xfnx>('",				"htmlR1":"')'",
		"htmlL2":"'<Xfnc>acsc '",					"htmlR2":"' <Xfxp>'",
		"htmlInv1":"'<Xfnc>csc<sup>-1</sup><Xfnx>('","htmlInv2":"'<Xfnc>csc<sup>-1</sup> <Xfnx>'",
		"texfunc":"\\arccsc",
		"latexL1":"'\\\\arccsc(<Xfnx>'",			"latexR1":"')'",
		"latexL2":"'\\\\arccsc {'",					"latexR2":"'}'",
		"latexInv1":"'\\\\csc^{-1}(<Xfnx>'",		"latexInv2":"'\\\\csc^{-1} {'",
		},
"act":{ "htmlL1":"'<Xfnc>acot<Xfnx>('",				"htmlR1":"')'",
		"htmlL2":"'<Xfnc>acot '",					"htmlR2":"' <Xfxp>'",
		"htmlInv1":"'<Xfnc>cot<sup>-1</sup><Xfnx>('","htmlInv2":"'<Xfnc>cot<sup>-1</sup> <Xfnx>'",
		"texfunc":"\\arccot",
		"latexL1":"'\\\\arccot(<Xfnx>'",			"latexR1":"')'",
		"latexL2":"'\\\\arccot {'",					"latexR2":"'}'",
		"latexInv1":"'\\\\cot^{-1}(<Xfnx>'",		"latexInv2":"'\\\\cot^{-1} {'",
		},
"ash":{ "htmlL1":"'<Xfnc>asinh<Xfnx>('",			"htmlR1":"')'",	
		"htmlL2":"'<Xfnc>asinh '",					"htmlR2":"' <Xfxp>'",
		"htmlInv1":"'<Xfnc>sinh<sup>-1</sup><Xfnx>('","htmlInv2":"'<Xfnc>sinh<sup>-1</sup> <Xfnx>'",
		"texfunc":"\\arcsinh",
		"latexL1":"'\\\\arcsinh(<Xfnx>'",			"latexR1":"')'",
		"latexL2":"'\\\\arcsinh {'",				"latexR2":"'}'",
		"latexInv1":"'\\\\sinh^{-1}(<Xfnx>'",		"latexInv2":"'\\\\sinh^{-1} {'",
		},
"ach":{ "htmlL1":"'<Xfnc>acosh<Xfnx>('",			"htmlR1":"')'",
		"htmlL2":"'<Xfnc>acosh '",					"htmlR2":"' <Xfxp>'",
		"htmlInv1":"'<Xfnc>cosh<sup>-1</sup><Xfnx>('","htmlInv2":"'<Xfnc>cosh<sup>-1</sup> <Xfnx>'",
		"texfunc":"\\arccosh",
		"latexL1":"'\\\\arccosh(<Xfnx>'",			"latexR1":"')'",
		"latexL2":"'\\\\arccosh {'",				"latexR2":"'}'",
		"latexInv1":"'\\\\cosh^{-1}(<Xfnx>'",		"latexInv2":"'\\\\cosh^{-1} {'",
		},
"ath":{ "htmlL1":"'<Xfnc>atanh<Xfnx>('",			"htmlR1":"')'",
		"htmlL2":"'<Xfnc>atanh '",					"htmlR2":"' <Xfxp>'",
		"htmlInv1":"'<Xfnc>tanh<sup>-1</sup><Xfnx>('","htmlInv2":"'<Xfnc>tanh<sup>-1</sup> <Xfnx>'",
		"texfunc":"\\arctanh",
		"latexL1":"'\\\\arctanh(<Xfnx>'",			"latexR1":"')'",
		"latexL2":"'\\\\arctanh {'",				"latexR2":"'}'",
		"latexInv1":"'\\\\tanh^{-1}(<Xfnx>'",		"latexInv2":"'\\\\tanh^{-1} {'",
		},
"axh":{ "htmlL1":"'<Xfnc>asech<Xfnx>('",			"htmlR1":"')'",
		"htmlL2":"'<Xfnc>asech '",					"htmlR2":"' <Xfxp>'",
		"htmlInv1":"'<Xfnc>sech<sup>-1</sup><Xfnx>('","htmlInv2":"'<Xfnc>sech<sup>-1</sup> <Xfnx>'",
		"texfunc":"\\arcsech",
		"latexL1":"'\\\\arcsech(<Xfnx>'",			"latexR1":"')'",
		"latexL2":"'\\\\arcsech {'",				"latexR2":"'}'",
		"latexInv1":"'\\\\sech^{-1}(<Xfnx>'",		"latexInv2":"'\\\\sech^{-1} {'",
		},
"ayh":{ "htmlL1":"'<Xfnc>acsch<Xfnx>('",			"htmlR1":"')'",
		"htmlL2":"'<Xfnc>acsch '",					"htmlR2":"' <Xfxp>'",
		"htmlInv1":"'<Xfnc>csch<sup>-1</sup><Xfnx>('","htmlInv2":"'<Xfnc>csch<sup>-1</sup> <Xfnx>'",
		"texfunc":"\\arccsch",
		"latexL1":"'\\\\arccsch(<Xfnx>'",			"latexR1":"')'",
		"latexL2":"'\\\\arccsch {'",				"latexR2":"'}'",
		"latexInv1":"'\\\\csch^{-1}(<Xfnx>'",		"latexInv2":"'\\\\csch^{-1} {'",
		},
"azh":{ "htmlL1":"'<Xfnc>acoth<Xfnx>('",			"htmlR1":"')'",	
		"htmlL2":"'<Xfnc>acoth '",					"htmlR2":"' <Xfxp>'",
		"htmlInv1":"'<Xfnc>coth<sup>-1</sup><Xfnx>('","htmlInv2":"'<Xfnc>coth<sup>-1</sup> <Xfnx>'",
		"texfunc":"\\arccoth",
		"latexL1":"'\\\\arccoth(<Xfnx>'",			"latexR1":"')'",
		"latexL2":"'\\\\arccoth {'",				"latexR2":"'}'",
		"latexInv1":"'\\\\coth^{-1}(<Xfnx>'",		"latexInv2":"'\\\\coth^{-1} {'",
		},
"sqt":{ "htmlL1":"radL(0,strg)",					"htmlR1":"radR()", //square root
		"htmlL2":"radL(0,strg)",					"htmlR2":"radR()",
		"texfunc":"\\sqrt",
		"latexL1":"'\\\\sqrt{'",					"latexR1":"'}'",
		"latexL2":"'\\\\sqrt{'",					"latexR2":"'}'",
		},
"cbt":{ "htmlL1":"radL(1,strg)",					"htmlR1":"radR()", //cube root
		"htmlL2":"radL(1,strg)",					"htmlR2":"radR()",
		"texfunc":"\\sqrt[3]",
		"latexL1":"'\\\\sqrt[3]{'",					"latexR1":"'}'",
		"latexL2":"'\\\\sqrt[3]{'",					"latexR2":"'}'",
		},
"nrt":{ "htmlL1":"radL(2,strg,mA)",					"htmlR1":"radR()", //nth root
		"htmlL2":"radL(2,strg,mA)",					"htmlR2":"radR()",
		"texfunc":"\\sqrt[]",
		"latexL1":"'\\\\sqrt['+mA+']{'",			"latexR1":"'}'",
		"latexL2":"'\\\\sqrt['+mA+']{'",			"latexR2":"'}'",
		},
"lgn":{ "htmlL1":"'<Xfnc>log<sub>'+mA+'</sub><Xfnx>('",	"htmlR1":"')'", //nth log
		"htmlL2":"'<Xfnc>log<sub>'+mA+'</sub> '",	"htmlR2":"' <Xfxp>'",
		"texfunc":"\\log_",
		"latexL1":"'\\\\log_{'+mA+'}(<Xfnx>'",		"latexR1":"')'",
		"latexL2":"'\\\\log_{'+mA+'}{'",			"latexR2":"'}<Xfxp>'",
		},
"log":{ "htmlL1":"'<Xfnc>log<Xfnx>('",				"htmlR1":"')'", //common log
		"htmlL2":"'<Xfnc>log '",					"htmlR2":"' <Xfxp>'",
		"texfunc":"\\log",
		"latexL1":"'\\\\log(<Xfnx>'",				"latexR1":"')'",
		"latexL2":"'\\\\log {'",					"latexR2":"'}<Xfxp>'",
		},
"lne":{ "htmlL1":"'<Xfnc>ln<Xfnx>('",				"htmlR1":"')'", //natural log
		"htmlL2":"'<Xfnc>ln '",						"htmlR2":"' <Xfxp>'",
		"texfunc":"\\ln",
		"latexL1":"'\\\\ln(<Xfnx>'",				"latexR1":"')'",
		"latexL2":"'\\\\ln {'",						"latexR2":"'}<Xfxp>'",
		},
"int":{ "htmlL1":"brkt('&#8970;',strg)",			"htmlR1":"brkt('&#8971;',strg)", //integer component
		"htmlL2":"brkt('&#8970;',strg)",			"htmlR2":"brkt('&#8971;',strg)",
		"texfunc":"\\lfloor",
		"latexL1":"'\\\\left\\\\lfloor '",			"latexR1":"'\\\\right\\\\rfloor '",
		"latexL2":"'\\\\left\\\\lfloor '",			"latexR2":"'\\\\right\\\\rfloor '",
		},
"abs":{ "htmlL1":"brkt('&#124;',strg)",				"htmlR1":"brkt('&#124;',strg)", //absolute value
		"htmlL2":"brkt('&#124;',strg)",				"htmlR2":"brkt('&#124;',strg)",
		"texfunc":"\\|",
		"latexL1":"'\\\\left|'",					"latexR1":"'\\\\right|'",
		"latexL2":"'\\\\left|'",					"latexR2":"'\\\\right|'",
		},
"erf":{ "htmlL1":"'<Xfnc>erf<Xfnx>('",				"htmlR1":"')'", //error function
		"htmlL2":"'<Xfnc>erf<Xfnx>('",				"htmlR2":"')<Xfxp>'",
		"texfunc":"\\erf",
		"latexL1":"'\\\\erf('",						"latexR1":"')'",
		"latexL2":"'\\\\erf('",						"latexR2":"')<Xfxp>'",
		},
"efc":{ "htmlL1":"'<Xfnc>erfc<Xfnx>('",				"htmlR1":"')'", //inverse error function
		"htmlL2":"'<Xfnc>erfc<Xfnx>('",				"htmlR2":"')'",
		"texfunc":"\\erfc",	
		"latexL1":"'\\\\erfc('",					"latexR1":"')'",
		"latexL2":"'\\\\erfc('",					"latexR2":"')'",
		},
"arg":{ "htmlL1":"'<Xfnc>arg<Xfnx>('",				"htmlR1":"')'", //arg
		"htmlL2":"'<Xfnc>arg<Xfnx>('",				"htmlR2":"')<Xfxp>'",
		"texfunc":"\\arg",
		"latexL1":"'\\\\arg(<Xfnx>'",				"latexR1":"')'",
		"latexL2":"'\\\\arg {'",					"latexR2":"'}<Xfxp>'",
		},
"exp":{ "htmlL1":"'<Xfnc>exp<Xfnx>('",				"htmlR1":"')'", //e^x
		"htmlL2":"'<Xfnc>exp<Xfnx>('",				"htmlR2":"')<Xfxp>'",
		"texfunc":"\\exp",
		"latexL1":"'\\\\exp(<Xfnx>'",				"latexR1":"')'",
		"latexL2":"'\\\\exp {'",					"latexR2":"'}<Xfxp>'",
		},
"con":{ "htmlL1":"conL()",							"htmlR1":"'</span>'", //conjugate
		"htmlL2":"conL()",							"htmlR2":"'</span>'",
		"texfunc":"\\overline",
		"latexL1":"'\\\\overline{'",				"latexR1":"'}'",
		"latexL2":"'\\\\overline{'",				"latexR2":"'}'",
		},
"gam":{ "htmlL1":"'<Xfnc>&#915;<Xfnx>('",			"htmlR1":"')'", //gamma
		"htmlL2":"'<Xfnc>&#915;<Xfnx>('",			"htmlR2":"')'",
		"texfunc":"\\XXX",
		"latexL1":"'\\\\Gamma(<Xfnx>'",				"latexR1":"')'",
		"latexL2":"'\\\\Gamma(<Xfnx>'",				"latexR2":"')'",
		},
"cdf":{ "htmlL1":"'<Xfnc>&#934;<Xfnx>('",			"htmlR1":"')'",	//cumulative density function
		"htmlL2":"'<Xfnc>&#934;<Xfnx>('",			"htmlR2":"')'",
		"texfunc":"\\XXX",
		"latexL1":"'\\\\Phi(<Xfnx>'",				"latexR1":"')'",
		"latexL2":"'\\\\Phi(<Xfnx>'",				"latexR2":"')'",
		},
"pdf":{ "htmlL1":"'<Xfnc>&#966;<sub><i>ln</i></sub><Xfnx>('","htmlR1":"')'", //probability density function
		"htmlL2":"'<Xfnc>&#966;<Xfnx>('",			"htmlR2":"')'",
		"texfunc":"\\XXX",
		"latexL1":"'\\\\phi(<Xfnx>'",				"latexR1":"')'",
		"latexL2":"'\\\\phi(<Xfnx>'",				"latexR2":"')'",
		},
"lcf":{ "htmlL1":"'<Xfnc>&#934;<sub><i>ln</i></sub><Xfnx>('","htmlR1":"')'", //log cumulative density function
		"htmlL2":"'<Xfnc>&#934;<sub><i>ln</i></sub><Xfnx>('","htmlR2":"')'",
		"texfunc":"\\XXX",
		"latexL1":"'\\\\Phi_ln(<Xfnx>'",			"latexR1":"')'",
		"latexL2":"'\\\\Phi_ln(<Xfnx>'",			"latexR2":"')'",
		},
"lpf":{ "htmlL1":"'<Xfnc>&#966;<sub><i>ln</i></sub><Xfnx>('","htmlR1":"')'", //log probability density function
		"htmlL2":"'<Xfnc>&#966;<sub><i>ln</i></sub><Xfnx>('","htmlR2":"')'",
		"texfunc":"\\XXX",
		"latexL1":"'\\\\phi_ln(<Xfnx>'",			"latexR1":"')'",
		"latexL2":"'\\\\phi_ln(<Xfnx>'",			"latexR2":"')'",
		},
"rou":{ "htmlL1":"'<Xfnc>rou<Xfnx>('",				"htmlR1":"')'", //round to nearest int
		"htmlL2":"'<Xfnc>rou<Xfnx>('",				"htmlR2":"')'",
		"texfunc":"\\XXX",
		"latexL1":"'\\\\rou(<Xfnx>'",				"latexR1":"')'",
		"latexL2":"'\\\\rou(<Xfnx>'",				"latexR2":"')'",
		},
"rnd":{ "htmlL1":"'<Xfnc>rnd<Xfnx>('",				"htmlR1":"')'", //random number
		"htmlL2":"'<Xfnc>rnd<Xfnx>('",				"htmlR2":"')'",
		"texfunc":"\\XXX",
		"latexL1":"'\\\\rnd(<Xfnx>'",				"latexR1":"')'",
		"latexL2":"'\\\\rnd(<Xfnx>'",				"latexR2":"')'",
		},
"rex":{ "htmlL1":"'<Xfnc>Re<Xfnx>('",				"htmlR1":"')'", //real component
		"htmlL2":"'<Xfnc>Re<Xfnx>('",				"htmlR2":"')'",
		"texfunc":"\\XXX",
		"latexL1":"'\\\\Re(<Xfnx>'",				"latexR1":"')'",
		"latexL2":"'\\\\Re(<Xfnx>'",				"latexR2":"'}'",
		},
"imx":{ "htmlL1":"'<Xfnc>Im<Xfnx>('",				"htmlR1":"')'", //imaginary component
		"htmlL2":"'<Xfnc>Im<Xfnx>('",				"htmlR2":"')'",
		"texfunc":"\\XXX",
		"latexL1":"'\\\\Im(<Xfnx>'",				"latexR1":"')'",
		"latexL2":"'\\\\Im(<Xfnx>'",				"latexR2":"')'",
		},
"frc":{ "htmlL1":"'<Xfnc>frac<Xfnx>('",				"htmlR1":"')'", //decimal component
		"htmlL2":"'<Xfnc>frac<Xfnx>('",				"htmlR2":"')'",
		"texfunc":"\\XXX",
		"latexL1":"'\\\\frc(<Xfnx>'",				"latexR1":"')'",
		"latexL2":"'\\\\frc(<Xfnx>'",				"latexR2":"')'",
		},
"sbr":{ "htmlL1":"brkt('&#91;',strg)",				"htmlR1":"brkt('&#93;',strg)", //straight bracket
		"htmlL2":"brkt('&#91;',strg)",				"htmlR2":"brkt('&#93;',strg)",
		"texfunc":"\\XXX",
		"latexL1":"'\\\\left\\['",				"latexR1":"'\\\\right\\]'",
		"latexL2":"'\\\\left\\['",				"latexR2":"'\\\\right\\]'",
		},
"cbr":{ "htmlL1":"brkt('&#123;',strg)",				"htmlR1":"brkt('&#125;',strg)", //curly bracket
		"htmlL2":"brkt('&#123;',strg)",				"htmlR2":"brkt('&#125;',strg)",
		"texfunc":"\\XXX",
		"latexL1":"'\\\\left\\\\{'",				"latexR1":"'\\\\right\\\\}'",
		"latexL2":"'\\\\left\\\\{'",				"latexR2":"'\\\\right\\\\}'",
		},
"cei":{ "htmlL1":"brkt('&#8968;',strg)",			"htmlR1":"brkt('&#8969;',strg)", //ceiling
		"htmlL2":"brkt('&#8968;',strg)",			"htmlR2":"brkt('&#8969;',strg)",
		"texfunc":"\\XXX",
		"latexL1":"'\\\\left\\\\lceil '",			"latexR1":"'\\\\right\\\\rceil '",
		"latexL2":"'\\\\left\\\\lceil '",			"latexR2":"'\\\\right\\\\rceil '",
		},
"fac":{ "htmlL1":"''",								"htmlR1":"'!'", //factorial
		"htmlL2":"''",								"htmlR2":"'!'",
		"texfunc":"\\XXX",
		"latexL1":"''",								"latexR1":"'!'",
		"latexL2":"''",								"latexR2":"'!'",
		},
"sum":{ "htmlL1":"sumL(mA,mB)",						"htmlR1":"' '", //summation
		"htmlL2":"sumL(mA,mB)",		 				"htmlR2":"' '",
		"texfunc":"\\XXX",
		"latexL1":"'\\\\sum_{'+mB+'}^{'+mA+'}'",	"latexR1":"' '",
		"latexL2":"'\\\\sum_{'+mB+'}^{'+mA+'}'",	"latexR2":"' '",
		},
"prd":{ "htmlL1":"prdL(mA,mB)",						"htmlR1":"' '", //product
		"htmlL2":"prdL(mA,mB)",						"htmlR2":"''",
		"texfunc":"\\XXX",
		"latexL1":"'\\\\prod_{'+mB+'}^{'+mA+'}'",	"latexR1":"' '",
		"latexL2":"'\\\\prod_{'+mB+'}^{'+mA+'}'",	"latexR2":"' '",
		},
"lim":{ "htmlL1":"limL(mA,mB)",						"htmlR1":"' '", //limit
		"htmlL2":"limL(mA,mB)",						"htmlR2":"''",
		"texfunc":"\\XXX",
		"latexL1":"'\\\\lim_{'+mA+' \\\\to '+mB+'}'","latexR1":"' '",
		"latexL2":"'\\\\lim_{'+mA+' \\\\to '+mB+'}'","latexR2":"' '",
		},
"itg":{ "htmlL1":"itgL(mA,mB)",						"htmlR1":"' '", //definite integral
		"htmlL2":"itgL(mA,mB)",						"htmlR2":"''",
		"texfunc":"\\XXX",
		"latexL1":"'\\\\int_{'+mB+'}^{'+mA+'}'",	"latexR1":"' '",
		"latexL2":"'\\\\int_{'+mB+'}^{'+mA+'}'",	"latexR2":"' '",
		},
"drv":{ "htmlL1":"''",								"htmlR1":"''", //partial derivative from func
		"htmlL2":"''",								"htmlR2":"''",
		"texfunc":"\\XXX",
		"latexL1":"''",								"latexR1":"''", 
		"latexL2":"''",								"latexR2":"''",
		},
"drs":{ "htmlL1":"''",								"htmlR1":"''", //partial second derivative from func
		"htmlL2":"''",								"htmlR2":"''",
		"texfunc":"\\XXX",
		"latexL1":"''",								"latexR1":"''",
		"latexL2":"''",								"latexR2":"''",
		},
"tdv":{ "htmlL1":"''",								"htmlR1":"''", //total derivative from func
		"htmlL2":"''",								"htmlR2":"''",
		"texfunc":"\\XXX",
		"latexL1":"''",								"latexR1":"''",
		"latexL2":"''",								"latexR2":"''",
		},
"tds":{ "htmlL1":"''",								"htmlR1":"''", //total second derivative from func
		"htmlL2":"''",								"htmlR2":"''",
		"texfunc":"\\XXX",
		"latexL1":"''",								"latexR1":"''",
		"latexL2":"''",								"latexR2":"''",
		},
"tdr":{ "htmlL1":"tdrL(mA)",						"htmlR1":"''", //derivative
		"htmlL2":"tdrL(mA)",						"htmlR2":"''",
		"texfunc":"\\XXX",
		"latexL1":"'\\\\frac{d}{d '+mA+'}'",		"latexR1":"''",
		"latexL2":"'\\\\frac{d}{d '+mA+'}'",		"latexR2":"''",
		},
"tdd":{ "htmlL1":"tddL(mA)",						"htmlR1":"''", //second derivative
		"htmlL2":"tddL(mA)",						"htmlR2":"''",
		"texfunc":"\\XXX",
		"latexL1":"'\\\\frac{d^2}{d '+mA+'^2}'",	"latexR1":"''",
		"latexL2":"'\\\\frac{d^2}{d '+mA+'^2}'",	"latexR2":"''",
		},
"sdr":{ "htmlL1":"sdrL(mA,mB)",						"htmlR1":"''", //derivative dy/dx
		"htmlL2":"sdrL(mA,mB)",						"htmlR2":"''",
		"texfunc":"\\XXX",
		"latexL1":"'\\\\frac{d '+mA+'}{d '+mB+'}'",	"latexR1":"''",
		"latexL2":"'\\\\frac{d '+mA+'}{d '+mB+'}'",	"latexR2":"''",
		},
"ddr":{ "htmlL1":"ddrL(mA,mB)",						"htmlR1":"''", //second derivative dy/dx
		"htmlL2":"ddrL(mA,mB)",						"htmlR2":"''",
		"texfunc":"\\XXX",
		"latexL1":"'\\\\frac{d^2 '+mA+'}{d '+mB+'^2}'",	"latexR1":"''",
		"latexL2":"'\\\\frac{d^2 '+mA+'}{d '+mB+'^2}'",	"latexR2":"''",
		},
"idr":{ "htmlL1":"idrL(mA)",						"htmlR1":"''", //partial derivative
		"htmlL2":"idrL(mA)",						"htmlR2":"''",
		"texfunc":"\\XXX",
		"latexL1":"'\\\\frac{\\\\partial}{\\\\partial '+mA+'}'", "latexR1":"''",
		"latexL2":"'\\\\frac{\\\\partial}{\\\\partial '+mA+'}'", "latexR2":"''",
		},
"idd":{ "htmlL1":"iddL(mA)",						"htmlR1":"''", //partial second derivative
		"htmlL2":"iddL(mA)",						"htmlR2":"''",
		"texfunc":"\\XXX",
		"latexL1":"'\\\\frac{\\\\partial^2}{\\\\partial '+mA+'^2}'", "latexR1":"''",
		"latexL2":"'\\\\frac{\\\\partial^2}{\\\\partial '+mA+'^2}'", "latexR2":"''",
		},
"psd":{ "htmlL1":"psdL(mA,mB)",						"htmlR1":"' '", //partial derivative dy/dx
		"htmlL2":"psdL(mA,mB)",						"htmlR2":"' '",
		"texfunc":"\\XXX",
		"latexL1":"'\\\\frac{\\\\partial '+mA+'}{\\\\partial '+mB+'}'",	"latexR1":"''",
		"latexL2":"'\\\\frac{\\\\partial '+mA+'}{\\\\partial '+mB+'}'",	"latexR2":"''",
		},
"pdd":{ "htmlL1":"pddL(mA,mB)",						"htmlR1":"' '", //partial second derivative dy/dx
		"htmlL2":"pddL(mA,mB)",						"htmlR2":"' '",
		"texfunc":"\\XXX",
		"latexL1":"'\\\\frac{\\\\partial^2 '+mA+'}{\\\\partial '+mB+'^2}'",	"latexR1":"''",
		"latexL2":"'\\\\frac{\\\\partial^2 '+mA+'}{\\\\partial '+mB+'^2}'",	"latexR2":"''",
		},
"sbt":{ "htmlL1":"'<sub><sub>'+mA+'</sub></sub>'" ,	"htmlR1":"''", //subscript
		"htmlL2":"'<sub><sub>'+mA+'</sub></sub>'",	"htmlR2":"''",
		"texfunc":"\\XXX",
		"latexL1":"'_{'+mA+'}'",					"latexR1":"''",
		"latexL2":"'_{'+mA+'}'",					"latexR2":"''",
		},
"cup":{ "htmlL1":"cupL(mA,mB)",						"htmlR1":"''",
		"htmlL2":"cupL(mA,mB)",						"htmlR2":"' '",
		"texfunc":"\\XXX",
		"latexL1":"'\\\\cup_{'+mB+'}^{'+mA+'}'",	"latexR1":"''",
		"latexL2":"'\\\\cup_{'+mB+'}^{'+mA+'}'",	"latexR2":"''",
		},
"cap":{ "htmlL1":"capL(mA,mB)",						"htmlR1":"''",
		"htmlL2":"capL(mA,mB)",						"htmlR2":"' '",
		"texfunc":"\\XXX",
		"latexL1":"'\\\\cap_{'+mB+'}^{'+mA+'}'",	"latexR1":"''",
		"latexL2":"'\\\\cap_{'+mB+'}^{'+mA+'}'",	"latexR2":"''",
		},
"vec":{ "htmlL1":"vecL()",							"htmlR1":"vecR()",
		"htmlL2":"vecL()",							"htmlR2":"vecR()",
		"texfunc":"\\vec",
		"latexL1":"'\\\\vec{'",						"latexR1":"'}'",
		"latexL2":"'\\\\vec{'",						"latexR2":"'}'",
		},
"hat":{ "htmlL1":"hatL()",							"htmlR1":"hatR()",
		"htmlL2":"hatL()",							"htmlR2":"hatR()",
		"texfunc":"\\hat",
		"latexL1":"'\\\\hat{'",						"latexR1":"'}'",
		"latexL2":"'\\\\hat{'",						"latexR2":"'}'",
		},
"und":{ "htmlL1":"undL()",							"htmlR1":"'</span>'",
		"htmlL2":"undL()",							"htmlR2":"'</span>'",
		"texfunc":"\\underline",
		"latexL1":"'\\\\underline{'",				"latexR1":"'}'",
		"latexL2":"'\\\\underline{'",				"latexR2":"'}'",
		},
"udt":{ "htmlL1":"udtL()",							"htmlR1":"udtR()",
		"htmlL2":"udtL()",							"htmlR2":"udtR()",
		"texfunc":"\\dot",
		"latexL1":"'\\\\dot{'",						"latexR1":"'}'",
		"latexL2":"'\\\\dot{'",						"latexR2":"'}'",
		},
"tld":{ "htmlL1":"tldL()",							"htmlR1":"tldR()",
		"htmlL2":"tldL()",							"htmlR2":"tldR()",
		"texfunc":"\\tilde",
		"latexL1":"'\\\\tilde{'",					"latexR1":"''",
		"latexL2":"'\\\\tilde{'",					"latexR2":"''",
		},
"cnt":{ "htmlL1":"''",								"htmlR1":"''",
		"htmlL2":"''",								"htmlR2":"''",
		"texfunc":"\\XXX",
		"latexL1":"''",								"latexR1":"''",
		"latexL2":"''",								"latexR2":"''",
		},
"dif":{ "htmlL1":"'<i>d</i>'",						"htmlR1":"''", //differential
		"htmlL2":"'<i>d</i>'",						"htmlR2":"''",
		"texfunc":"\\XXX",
		"latexL1":"''",								"latexR1":"''",
		"latexL2":"''",								"latexR2":"''",
		},
"mat":{ "htmlL1":"matL(parm)",						"htmlR1":"''", //matrix
		"htmlL2":"matL(parm)",						"htmlR2":"''",
		"texfunc":"\\XXX",
		"latexL1":"matX(parm)",						"latexR1":"''",
		"latexL2":"matX(parm)",						"latexR2":"''",
		},
"cAdd":{"htmlL1":"mA+'+'+mB",						"htmlR1":"''",
		"htmlL2":"mA+'+'+mB",						"htmlR2":"''",
		"texfunc":"\\XXX",
		"latexL1":"mA+'+'+mB",						"latexR1":"''",
		"latexL2":"mA+'+'+mB",						"latexR2":"''",
		},
"cSub":{"htmlL1":"mA+'&minus;'+mB",					"htmlR1":"''",
		"htmlL2":"mA+'&minus;'+mB",					"htmlR2":"''",
		"texfunc":"\\XXX",
		"latexL1":"mA+'-'+mB",						"latexR1":"''",
		"latexL2":"mA+'-'+mB",						"latexR2":"''",
		},
"cTms":{"htmlL1":"mA+'&times;'+mB",					"htmlR1":"''",
		"htmlL2":"mA+'&times;'+mB",					"htmlR2":"''",
		"texfunc":"\\XXX",
		"latexL1":"mA+'\\\\times '+mB",				"latexR1":"''",
		"latexL2":"mA+'\\\\times '+mB",				"latexR2":"''",
		},
"cMul":{"htmlL1":"cMulL(mA,mB)",					"htmlR1":"''",
		"htmlL2":"cMulL(mA,mB)",					"htmlR2":"''",
		"texfunc":"\\XXX",
		"latexL1":"mA+' '+mB",						"latexR1":"''",
		"latexL2":"mA+' '+mB",						"latexR2":"''",
		},
"cDiv":{"htmlL1":"cDivL(mA,mB)",					"htmlR1":"''",
		"htmlL2":"cDivL(mA,mB)",					"htmlR2":"''",
		"texfunc":"\\XXX",
		"latexL1":"'<Xdiv>\\\\frac{'+oBrackets(mA)+'}{'+oBrackets(mB)+'}<Xdve>'",	"latexR1":"''",
		"latexL2":"'<Xdiv>\\\\frac{'+oBrackets(mA)+'}{'+oBrackets(mB)+'}<Xdve>'",	"latexR2":"''",
		},
"cPow":{"htmlL1":"cPowL(mA,mB)",					"htmlR1":"''",
		"htmlL2":"cPowL(mA,mB)",					"htmlR2":"''",
		"texfunc":"\\XXX",
		"latexL1":"mA+'^{'+oBrackets(mB)+'}'",		"latexR1":"''",
		"latexL2":"cPowX(mA,mB)",					"latexR2":"''",
		},
"cNeg":{"htmlL1":"'&minus;'+mA",					"htmlR1":"''",
		"htmlL2":"'&minus;'+mA",					"htmlR2":"''",
		"texfunc":"\\XXX",
		"latexL1":"'-'+mA",							"latexR1":"''",
		"latexL2":"'-'+mA",							"latexR2":"''",
		},
"cAng":{"htmlL1":"mA+'&#8736;'+mB",					"htmlR1":"''",
		"htmlL2":"mA+'&#8736;'+mB",					"htmlR2":"''",
		"texfunc":"\\XXX",
		"latexL1":"mA+'\\\\angle '+mB",				"latexR1":"''",
		"latexL2":"mA+'\\\\angle '+mB",				"latexR2":"''",
		},
"cEql":{"htmlL1":"mA+' = '+mB",						"htmlR1":"''",
		"htmlL2":"mA+' = '+mB",						"htmlR2":"''",
		"texfunc":"\\XXX",
		"latexL1":"mA+'='+mB",						"latexR1":"''",
		"latexL2":"mA+'='+mB",						"latexR2":"''",
		},
"cBnd":{"htmlL1":"mA+''+mB",						"htmlR1":"''", //bind function
		"htmlL2":"mA+''+mB",						"htmlR2":"''",
		"texfunc":"\\XXX",
		"latexL1":"mA+' '+mB",						"latexR1":"''",
		"latexL2":"mA+' '+mB",						"latexR2":"''",
		},
}

// internal functions
function strCount(xTarget,xSearch) {xTarget +="";xSearch+="";return xTarget.split(xSearch).length-1} //count occurrences of string
function funcTest(tFunc) {if (typeof eval("funcMap."+tFunc) == "undefined") {return false}; return true} //test for valid function key
function parseParens(xB,bSym) {//parse parens and return inside string, begin index, end index, source string, upper/lower args
	xB += "";
	var oComma = 0,lPar = 0,rPar = 0,bDelim = " ",eDelim = " ";cFind = "";
	for (var iU=bSym;iU<xB.length;iU++) {
		cFind = xB.charAt(iU);
		if (cFind == "," && lPar-1 == rPar) {oComma = iU-bSym}
		if (cFind == "(") {bDelim = "(";eDelim = ")";break}
		if (cFind == "{") {bDelim = "{";eDelim = "}";break}
	}
	for (var iU=bSym;iU<xB.length;iU++) {
		cFind = xB.charAt(iU);
		if (cFind == "," && lPar-1 == rPar) {oComma = iU-bSym}
		if (cFind == bDelim ) {lPar++;if(lPar == 1) {bSym = iU}}
		if (cFind == eDelim ) {rPar++}
		if (lPar > 0 && lPar == rPar) {break}
	}
	var ins = xB.substr(bSym+1,iU-bSym-1)
	return {begin:bSym,end:iU,source:xB,inside:ins,upper:ins.substr(0,oComma-1),lower:ins.substr(oComma)}
}

function oParens(xP) {//remove outside parens
	xP += "";
	if (xP.charAt(0) == "(" && xP.charAt(xP.length-1) == ")") {
		var tparens = parseParens(xP,0);
		if (tparens.end == xP.length-1) {return tparens.inside}
	}
	return xP
}
function dNest(dN) {//count nested large elements
	var dDepth = 0,dSpan = 0;
	for (var iDp=0;iDp<dN.length;iDp++) {
		if (dN.substr(iDp,6) == "<Xdiv>") {dSpan++}		
		if (dN.substr(iDp,6) == "<Xdve>") {dSpan--}
		if (dSpan > dDepth) {dDepth = dSpan}
	}
	return dDepth
}
function parseBrackets(xB,bSym) {//parse brackets and return inside string, begin index, end index, source string
	xB += "";
	var lPar = 0;
	var rPar = 0;
	var bDelim = " ";
	var eDelim = " ";
	var lSym = xB.length;
	for (var iU=bSym;iU<lSym;iU++) {
		if (xB.charAt(iU) == " ") {iU++}
		if (xB.charAt(iU).charCodeAt(0) > 47 && tDelimiter.indexOf(xB.charAt(iU)) == -1){return {begin:bSym,inside:xB.charAt(iU),end:iU,source:xB}}
		if (xB.charAt(iU) == "\\") {
			var dTemp = xB.substr(iU,xB.length);
			for (var nXi=1;nXi<dTemp.length;nXi++) {if (tDelimiter.indexOf(dTemp.charAt(nXi)) > -1){break}}
			dTemp = dTemp.substr(0,nXi);
			return {begin:bSym,inside:dTemp,end:iU+dTemp.length,source:xB}
		}			
		if (xB.charAt(iU) == "(") {bDelim = "(";eDelim = ")";break}
		if (xB.charAt(iU) == "{") {bDelim = "{";eDelim = "}";break}
		if (xB.charAt(iU) == "[") {bDelim = "[";eDelim = "]";break}
	}
	for (var iU=bSym;iU<lSym;iU++) {
		if (xB.charAt(iU) == bDelim ) {lPar++;if(lPar == 1) {bSym = iU}}
		if (xB.charAt(iU) == eDelim ) {rPar++}
		if (lPar > 0 && lPar == rPar) {break}
	}
	return {begin:bSym,inside:xB.substr(bSym+1,iU-bSym-1),end:iU,source:xB}
}
function dedupBrackets(dB) { //remove redundant brackets
	var sCount = strCount(dB,"{");
	for (var nXf=0;nXf<sCount;nXf++) {
		var dparens = parseBrackets(dB,dB.lastIndexOf("{{")+1);
		if (dB.substr(dparens.end,2) == "}}" ) {
			dB = dB.substr(0,dB.lastIndexOf("{{")+1)+dparens.inside+dB.substr(dparens.end+1,dB.length)
		}
	}
	var sCount = strCount(dB,"(");
	for (var nXf=0;nXf<sCount;nXf++) {
		var dparens = parseBrackets(dB,dB.lastIndexOf("((")+1);
		if (dB.substr(dparens.end,2) == "))" ) {
			dB = dB.substr(0,dB.lastIndexOf("((")+1)+dparens.inside+dB.substr(dparens.end+1,dB.length)
		}
	}
	return dB
}
function oBrackets(xP) {//remove outside brackets
	if (xP.charAt(0) == "(" && xP.charAt(xP.length-1) == ")") {
		var tparens = parseBrackets(xP,0);
		if (tparens.end == xP.length-1) {return tparens.inside}
	}
	if (xP.charAt(0) == "{" && xP.charAt(xP.length-1) == "}") {
		var tparens = parseBrackets(xP,0);
		if (tparens.end == xP.length-1) {return tparens.inside}
	}
	return xP
}
//
function htmlExport(hFn) { //convert MG format to HTML
	function dedupParens(xP) {//remove duplicate parens
		xP += "";
		var sCount = strCount(xP,"(");
		for (var nXf=0;nXf<sCount;nXf++) {
			var dparens = parseParens(xP,xP.lastIndexOf("((")+1);
			if (xP.substr(dparens.end,2) == "))" ) {xP = xP.substr(0,xP.lastIndexOf("((")+1)+dparens.inside+xP.substr(dparens.end+1,xP.length)}
		}
		return xP
	}
	function cMulL(xU,xL) {
		if (xL.indexOf("<Xfnc>") == 0) {return xU+" "+xL}
		return xU+""+xL
	}
	function cDivL(xU,xL) {
		if (mgConfig.divSymbol == "Slash") {return xU+"/"+xL}
		else {
			if (!mgConfig.editMode) {xU = oParens(xU);xL = oParens(xL)}
			return "<Xdiv> <span style='text-align:center;vertical-align:middle;display:inline-block;'><span style='display:table-row;'><span style='font-size:"
			+mgConfig.divScale+"%;display:table-cell'>"+xU+"</span></span><span style='display:table-row;vertical-align:top'><span style='font-size:"
			+mgConfig.divScale+"%;display:table-cell;border-top-style:solid;border-top-width:2px;padding:3px;'>"+xL+"</span></span></span> <Xdve>"
		}
	}
	function cPowL(xU,xL) {
		if (!mgConfig.editMode) {xL = oParens(xL)}
		if (dNest(xU) > 2) {return "<table style='text-align:center;display:inline-table;vertical-align:middle'><tr><td>"+xU+"</td><td style='vertical-align:top'><sup>"+xL+"</sup></td></tr></table>"}
		if (xU.indexOf(" <Xfxp>") > -1 && xU.indexOf(" <Xfxp>") ==  xU.length-7) {return "("+xU+")<sup>"+xL+"</sup> "} //(ln x)^2
		if (xU.indexOf("<Xfnc>") == 0 && xU.indexOf("<Xfxp> ") > -1 &&  xU.indexOf("<Xfxp> ") < 11) {return xU.replace("<Xfxp>","<sup>"+xL+"</sup> ")} //sin^2 x
		if (xL.indexOf("<Xdiv>") > -1 && xL.indexOf("<Xdve>") == xL.length-7 && !mgConfig.editMode) {xL = "("+xL+")"}
		if (xU.indexOf("<Xdiv>") == 1 && xU.indexOf("<Xdve>") == xU.length-7 && !mgConfig.editMode) {xU = "("+xU+")"}
		if ((dNest(xU) > 0 || dNest(xL) > 0 ) && mgConfig.divScale > 50) {return xU+"<sup><span style='vertical-align:super'>"+xL+"</span></sup>"} //lift exponent for big symbols
		return xU+"<sup>"+xL+"</sup>"
	}
	function radL(rSymb,xY,xZ) {//radicals
		var tgtRad = ["&#8730;","<span style='vertical-align:top;display:inline-block;position:relative;'><span style='vertical-align:top;position:absolute;'>&#8730;</span><span style='vertical-align:top;position:absolute;font-size:50%;'><sup>&nbsp;3</sup></span>&nbsp;&nbsp;</span>",
					"<span style='vertical-align:top;display:inline-block;position:relative;'><span style='vertical-align:top;position:absolute;'>&#8730;</span><span style='vertical-align:top;position:absolute;font-size:50%;'><sup>&nbsp;"+xZ+"</sup></span>&nbsp;&nbsp;</span>"];
		if (mgConfig.divScale != 50) {
			var xNest = Math.floor(100+(dNest(xY)*mgConfig.divScale*1.2));
			return "<span style='vertical-align:middle;display:inline-block;padding:3px'><span style='vertical-align:top;font-size:"+xNest+"%'>"
					+tgtRad[rSymb]+"</span><span style='vertical-align:top;border-top-style:solid;border-top-width:2px;'><span style='vertical-align:top;'><span style='vertical-align:middle;font-size:90%'>";
		}
		else {return "<span style='display:inline-block;'>"+tgtRad[rSymb]+"</span><span style='border-top-style:solid;border-top-width:2px;'><span style='font-size:90%'>";}
	}
	function radR() {//radicals
		if (mgConfig.divScale == 50) {return "</span></span>"}
		else {return "</span></span></span></span>"}
	}
	function brkt(xS,xO) {//scale brackets
		var iNest = dNest(xO);
		if (mgConfig.divScale == 50 || iNest == 0) {return xS}
		else {return "<span style='vertical-align:middle;display:inline-block;font-weight:100;font-size:"+Math.floor(100+(iNest*mgConfig.divScale*1.3))+"%'>"+xS+"</span>"}
	}
	function overUnder(xA,xB,xS,xFsize) {
		if (xA == "") {xA = "&nbsp;"}
		if (xB == "") {xB = "&nbsp;"}
		return "<Xdiv><span style='display:inline-block;'><span style='vertical-align:middle;text-align:center;display:inline-table;'><span style='display:table-row;font-size:50%'>"
				+xA+"</span><span style='line-height:80%;display:table-row;font-size:"+xFsize+"%'>"+xS+"</span><span style='line-height:150%;display:table-row;font-size:50%'>"
				+xB+"</span></span></span><Xdve>"
	}
	function fAccentU(xA) {return "<Xfnc><span style='display:inline-block;'><span style='text-align:center;vertical-align:middle;display:inline-table;'><span style='display:table-row;line-height:20%;font-size:60%'>"+xA+"</span><span style='line-height:90%;display:table-row;'>"}
	function fAccentL(xB) {return "<Xfnc></span><span style='display:table-row;line-height:20%;font-size:60%'>"+xB+"</span></span></span>"}
	function conL() {return "<Xfnc><span style='border-top-style:solid;border-top-width:2px;padding:4px;font-size:90%'>"}
	function undL() {return "<Xfnc><span style='border-bottom-style:solid;border-bottom-width:2px;padding:4px;font-size:90%'>"}
	function limL(xA,xB) {
		return "<Xfnc><span style='display:inline-block;'><span style='text-align:center;vertical-align:middle;display:inline-table;'><span style='display:table-row;font-size:40%'>&nbsp;</span><span style='line-height:50%;display:table-row;'>lim</span><span style='display:table-row;font-size:60%'>"+xA+"&#8594;"+xB+"</span></span></span>"
	}
	function itgL(xA,xB) { 
		return "<Xdiv><span style='display:inline-block;vertical-align:middle;'><table cellpadding='0' cellspacing='0'><tr><td rowspan='4'><span style='vertical-align:middle;display:inline-table;'><span style='display:table-row;line-height:90%'>&#8992;</span><span style='display:table-row;line-height:90%'>&#8993;</span></span></td><tr><td style='font-size:45%'>"
				+xA+"</td></tr><tr><td>&nbsp;</td></tr><td style='font-size:45%'>"+xB+"</td></tr></table></span><Xdve>"
	}
	function prdL(xA,xB) {return overUnder(xA,xB,"&#8719;",125)}
	function sumL(xA,xB) {return overUnder(xA,xB,"&#8721;",125)}
	function capL(xA,xB) {return overUnder(xA,xB,"&#8745;",150)}
	function cupL(xA,xB) {return overUnder(xA,xB,"&#8746;",150)}
	function vecL()  {return fAccentU("<i>&#8594;</i>")}
	function vecR()  {return fAccentL("<span style='line-height:50%'>&nbsp;</span>")}
	function hatL()  {return fAccentU("<i>&#8963;</i>")}
	function hatR()  {return fAccentL("<span style='line-height:50%'>&nbsp;</span>")}
	function tldL()  {return fAccentU("&#8764;")}
	function tldR()  {return fAccentL("<span style='line-height:50%'>&nbsp;</span>")}
	function udtL()  {return fAccentU("&#8226;")}
	function udtR()  {return fAccentL("<span style='line-height:50%'>&nbsp;</span>")}
	function tdrL(xA)    {var tmpDivSym = mgConfig.divSymbol;mgConfig.divSymbol = "Over";var xTmp = cDivL("<i>d</i>","<i>d</i>"+xA);mgConfig.divSymbol =  tmpDivSym;return xTmp}
	function tddL(xA)    {var tmpDivSym = mgConfig.divSymbol;mgConfig.divSymbol = "Over";var xTmp = cDivL("<i>d</i><sup>2</sup>","<i>d</i>"+xA+"<sup>2</sup>");mgConfig.divSymbol =  tmpDivSym;return xTmp}
	function idrL(xA)    {var tmpDivSym = mgConfig.divSymbol;mgConfig.divSymbol = "Over";var xTmp = cDivL("&#8706;","&#8706;"+xA);mgConfig.divSymbol =  tmpDivSym;return xTmp}
	function iddL(xA)    {var tmpDivSym = mgConfig.divSymbol;mgConfig.divSymbol = "Over";var xTmp = cDivL("&#8706;<sup>2</sup>","&#8706;"+xA+"<sup>2</sup>");mgConfig.divSymbol =  tmpDivSym;return xTmp}
	function sdrL(xA,xB) {var tmpDivSym = mgConfig.divSymbol;mgConfig.divSymbol = "Over";var xTmp = cDivL("<i>d</i>"+xA,"<i>d</i>"+xB);mgConfig.divSymbol =  tmpDivSym;return xTmp}
	function ddrL(xA,xB) {var tmpDivSym = mgConfig.divSymbol;mgConfig.divSymbol = "Over";var xTmp = cDivL("<i>d</i><sup>2</sup>"+xA,"<i>d</i>"+xB+"<sup>2</sup>");mgConfig.divSymbol =  tmpDivSym;return xTmp}
	function psdL(xA,xB) {var tmpDivSym = mgConfig.divSymbol;mgConfig.divSymbol = "Over";var xTmp = cDivL("&#8706;"+xA,"&#8706;"+xB);mgConfig.divSymbol =  tmpDivSym;return xTmp}
	function pddL(xA,xB) {var tmpDivSym = mgConfig.divSymbol;mgConfig.divSymbol = "Over";var xTmp = cDivL("&#8706;<sup>2</sup>"+xA,"&#8706;"+xB+"<sup>2</sup>");mgConfig.divSymbol =  tmpDivSym;return xTmp}
	function matL(xA) {
		var mReturn = "";
		var dScale = xA.length;
		var prefix = "";
		var suffix = "";
		if (typeof xA[0] == "string" && xA[0].substr(0,3) == "<td"){
			for (var iM=0;iM<xA.length;iM++) {
				dScale = dScale + dNest(xA+"")*(mgConfig.divScale/100)
				mReturn = mReturn + "<tr>" + xA[iM] + "</tr>"
				prefix = prefix+"<Xdiv>";
				suffix = suffix+"<Xdve>";
			}
			return prefix+" <table style='text-align:center;display:inline-table;vertical-align:middle'><tr><td style='border-left:2px solid black;border-top:2px solid black;border-bottom:2px solid black'>&nbsp;</td><td><table>" + mReturn + "</table><td style='border-right:2px solid black;border-top:2px solid black;border-bottom:2px solid black'>&nbsp;</td></tr></table> "+suffix
		}
		else {
			for (var iM=0;iM<xA.length;iM++) {mReturn = mReturn + "<td>" + xA[iM] + "</td>"}
			return mReturn
		}
	}
	function lFunc(parm) {mA=parm[0];mB=parm[1];return eval(funcselect(funcKey,fnformatL))}
	function rFunc(parm) {mA=parm[0];mB=parm[1];return eval(funcselect(funcKey,fnformatR))}
	function funcselect(func,key) {return eval("funcMap."+func+"."+key)}
	//
	if (hFn == "NaN" || hFn == "undefined") {return "undefined"}
	hFn = cFunc(hFn); //convert to FUNC
	if (mgConfig.editMode) {hFn = hFn.replace(/\,\)/g,",Cv[9643])").replace(/\(\,/g,"(Cv[9643],").replace(/\,\,/g,",Cv[9643],").replace(/\(\)/g,"(Cv[9643])")} //fill empty fields
	if (!mgConfig.editMode) {hFn = dedupParens(hFn);hFn = oParens(hFn)}
	var fnformatL = "htmlL1";
	var fnformatR = "htmlR1";
	hFn = hFn.replace(/ /g,"").replace(/([a-z][a-z][a-z])\(/ig,"$1{");
	var sCount = strCount(hFn,"{");
	for (var nXf=0;nXf<sCount;nXf++) {
		if (mgConfig.fnFmt == "fn(x)") {fnformatL = "htmlL1";fnformatR = "htmlR1"}
		else {fnformatL = "htmlL2";fnformatR = "htmlR2"}
		var rSymbol = "", lSymbol = "";
		var lPar = 1,rPar = 0,iXf = 0;
		var bSym = hFn.lastIndexOf("{")+1;
		var lSym = hFn.length;
		for (iXf=bSym;iXf<lSym;iXf++) {
			if (hFn.charAt(iXf) == "{" || hFn.charAt(iXf) == "(") {lPar++}
			if (hFn.charAt(iXf) == ")") {rPar++}
			if (lPar == rPar) {break;}
		}
		var strg = hFn.substr(bSym,iXf-bSym);
		if (lPar > rPar) {strg = strg.substr(0,strg.lastIndexOf(")"))+strg.substr(strg.lastIndexOf(")")+1)} //unmatched left parens
		var strgS = strg.split(",");
		if (typeof strgS[0] == "undefined") {strgS[0] = strg}
		for (var tXi=0;tXi<strgS.length;tXi++) {if (typeof strgS[tXi] == "undefined") {strgS[tXi]= ""}}
		var funcKey = hFn.substr(bSym-4,3); //functions
		if (!funcTest(funcKey)) {funcKey = hFn.substr(bSym-5,4)} //operators
		rSymbol = funcselect(funcKey,fnformatR);
		lSymbol = funcselect(funcKey,fnformatL);
		if (typeof funcselect(funcKey,'htmlInv1') != "undefined" && mgConfig.invFmt == "sin<sup>-1</sup>" && mgConfig.fnFmt == "fn(x)") {fnformatL = "htmlInv1"}
		if (typeof funcselect(funcKey,'htmlInv1') != "undefined" && mgConfig.invFmt == "sin<sup>-1</sup>" && mgConfig.fnFmt == "fn x")  {fnformatL = "htmlInv2"}
		var fParams = "";
		if (typeof strgS[0] == "string" && lSymbol.search("mA") == -1 && lSymbol.search("(parm)") == -1){fParams = fParams+strgS[0]}
		if (typeof strgS[1] == "string" && lSymbol.search("mB") == -1 && lSymbol.search("(parm)") == -1){fParams = fParams+strgS[1]}
		var rTmp = "";
		if (mgConfig.fnFmt == "fn x" && iXf < lSym && rSymbol.search(" ") > -1 && fParams.replace(/[\|\(\{](.*)[\|\)\}]/g,"").search(/[+(&minus;)]/) > -1 ) {fParams = "("+fParams+")"} //add parens to inside functions
		if (iXf < lSym) {rTmp = rFunc(strgS)}
		hFn = hFn.substr(0,bSym-(funcKey.length+1))+lFunc(strgS)+fParams+rTmp+hFn.substr(iXf+1,lSym);
	}
	//render symbols
	var sCount = strCount(hFn,"Cv[");
	hFn = hFn.replace(/Cv\[/g,"Cs[");
	for (var nXf=0;nXf<sCount;nXf++) {hFn = hFn.replace(/Cs\[\d+\]/,eval(hFn.match(/Cs\[\d+\]/)+""))}
	//scale and fix parens
	hFn = hFn.replace(/\(/g,"{").replace(/\)/g,"}");
	var sCount = strCount(hFn,"{");
	for (var nXs=0;nXs<sCount;nXs++) { 
		var bSym = hFn.indexOf("{");
		var lSym = hFn.length;
		var iXs = parseParens(hFn,bSym);
		var strg = iXs.inside;
		if (!mgConfig.editMode && hFn.substr(bSym,7) == "{<Xdiv>" && hFn.substr(iXs.end-6,7) == "<Xdve>}"  && hFn.substr(bSym-6,6) != "<Xfnx>" && strg.search(/\<Xdve\>(.*)\<Xdiv\>/) == -1) {
			hFn = hFn.substr(0,bSym)+strg+hFn.substr(iXs.end+1,lSym);
		}
		else if (dNest(strg) > 0) {//expanded parens
			if (strCount(hFn.substr(0,bSym+1),"{") > strCount(hFn.substr(iXs.end,lSym),"}")) {hFn = hFn.substr(0,bSym)+brkt("(",strg)+strg+hFn.substr(iXs.end,lSym);}
			else {hFn = hFn.substr(0,bSym)+brkt("(",strg)+strg+brkt(")",strg)+hFn.substr(iXs.end+1,lSym)}
		}
		else {//normal parens
			if (strCount(hFn.substr(0,bSym+1),"{") > strCount(hFn.substr(iXs.end,lSym),"}"))  {hFn = hFn.substr(0,bSym)+"("+strg+hFn.substr(iXs.end,lSym);}
			else {hFn = hFn.substr(0,bSym)+"("+strg+")"+hFn.substr(iXs.end+1,lSym)}
		}
	}
	hFn = hFn.replace(/\<X\w\w\w\>/g,"");//cleanup tags
	return hFn
}
//
function mgExport(xFn) { //convert from FUNC format to MG format
	function oprExtract(fExt) {//extract inside function in FUNC format, returns func,upper,lower
		var fOps = ["cNeg","cPow","cMul","cTms","cDiv","cAdd","cSub"];
		fExt += "";
		for (var cI=0;cI<fOps.length;cI++) {//operators
			if (fExt.indexOf(fOps[cI]) == 0 ) {
				var strg = parseParens(fExt,fExt.indexOf("("))
				if (fOps[cI] == "cNeg") {return  {func:fOps[cI],upper:(strg.inside),lower:""}}
				return {func:fOps[cI],upper:(strg.upper),lower:(strg.lower)}
			}
		}
		if (fExt.charAt(3) == "(") {
			var funcKey = fExt.substr(0,3) //functions
			if (funcTest(funcKey)) {return {func:funcKey,upper:(parseParens(fExt,3).inside),lower:""}}
		}
		return {func:"",upper:"",lower:""}
	}
	function numTest(xT) {if (+xT == +xT*1) {return true}; return false} //test for numerical string
	function toSciNot(xU) {xU+="";return xU.replace(/(\d+)e(\d+)/g,"$1*10^$2").replace(/(\d+)e\-(\d+)/g,"$1*10^-$2").replace(/(\d+)e\+(\d+)/g,"$1*10^$2")} //convert N.NNe+-NN notation to scientific
	function cAddE(xU,xL) {return xU + "+" + xL} //addition
	function cSubE(xU,xL) {return xU + "-" + xL} //subtraction
	function cTmsE(xU,xL) {return xU + "*" + xL} //multiplication using *
	function cMulE(xU,xL) { //multiplication by term
		xU += "";xL += "";
		xTractU = oprExtract(cFunc(xU));
		xTractL = oprExtract(cFunc(xL));
		if (xTractU.func == "cAdd" || xTractU.func == "cSub" || xTractU.func == "fac") {xU  = "(" + xU + ")"}
		if (xTractL.func == "cAdd" || xTractL.func == "cSub" || xTractL.func == "fac") {xL  = "(" + xL + ")"}	
		if (xU.indexOf("Cv[45]") > -1 && xU.lastIndexOf("Cv[45]") == xU.length-6) {xU  = "(" + xU + ")"}	
		if (xL.indexOf("Cv[45]") > -1 && xL.lastIndexOf("Cv[45]") == xL.length-6) {xL  = "(" + xL + ")"}	
		if (xTractL.func == "cPow" && numTest(xU) &&  numTest(xTractL.upper)) {xL  = "(" + xL + ")"}
		return xU + ""  + xL
	}
	function cDivE(xU,xL) { //division
		xU += "";xL += "";
		xTractU = oprExtract(cFunc(xU));
		xTractL = oprExtract(cFunc(xL));
		if (xTractU.func == "cAdd" || xTractU.func == "cSub" || xTractU.func == "cMul" || xTractU.func == "cDiv" || xTractU.func == "cNeg" || xU.indexOf("Cv[8747]") > -1) {xU  = "(" + xU + ")"}
		if (xTractL.func == "cAdd" || xTractL.func == "cSub" || xTractL.func == "cMul" || xTractL.func == "cDiv" || xTractL.func == "cNeg" || xL.indexOf("Cv[8747]") > -1) {xL  = "(" + xL + ")"}
		return xU + "/" + xL
	}
	function cPowE(xU,xL) { //powers
		xU += "";xL += "";
		xTractU = oprExtract(cFunc(xU));
		xTractL = oprExtract(cFunc(xL));
		if (xTractU.func == "cAdd" || xTractU.func == "cSub" || xTractU.func == "cMul" || xTractU.func == "cDiv" || xTractU.func == "cNeg" || xTractU.func == "fac") {xU  = "(" + xU + ")"}
		if (xTractL.func == "cAdd" || xTractL.func == "cSub" || xTractL.func == "cMul" || xTractL.func == "cDiv" || xTractL.func == "cNeg") {xL  = "(" + xL + ")"}	
		return xU + "^" + xL
	}
	function cAngE(xU,xL) {return xU + "~" + xL} //angle
	function cEqlE(xU,xL) {return xU + "=" + xL} //equal
	function cBndE(xU,xL) {return xU + ""  + xL} //non-multiplying symbol bond
	function nrtE(xU,xL)  {return "nrt(" + xU + "," + xL + ")"} //nth root
	function lgnE(xU,xL)  {return "lgn(" + xU + "," + xL + ")"} //log to nth
	function cNegE(xU) { //negative
		xU += "";
		xTractU = oprExtract(cFunc(xU));
		if (xTractU.func == "cAdd" || xTractU.func == "cSub" || xTractU.func == "cDiv") {return "-(" + xU + ")"}
		return "-" + xU
	}
	function sinE(xU) {return "sin(" + xU + ")"} //sin
	function cosE(xU) {return "cos(" + xU + ")"} //cos
	function tanE(xU) {return "tan(" + xU + ")"} //tan
	function secE(xU) {return "sec(" + xU + ")"} //sec
	function cscE(xU) {return "csc(" + xU + ")"} //cosec
	function cotE(xU) {return "cot(" + xU + ")"} //cotan
	function snhE(xU) {return "snh(" + xU + ")"} //sinh
	function cshE(xU) {return "csh(" + xU + ")"} //cosh
	function tnhE(xU) {return "tnh(" + xU + ")"} //tanh
	function schE(xU) {return "sch(" + xU + ")"} //sech
	function cchE(xU) {return "cch(" + xU + ")"} //cosech
	function cthE(xU) {return "cth(" + xU + ")"} //cotanh
	function asnE(xU) {return "asn(" + xU + ")"} //asin
	function acsE(xU) {return "acs(" + xU + ")"} //acos
	function atnE(xU) {return "atn(" + xU + ")"} //atan
	function ascE(xU) {return "asc(" + xU + ")"} //asec
	function accE(xU) {return "acc(" + xU + ")"} //acosec
	function actE(xU) {return "act(" + xU + ")"} //acotan
	function ashE(xU) {return "ash(" + xU + ")"} //asinh
	function achE(xU) {return "ach(" + xU + ")"} //acosh
	function athE(xU) {return "ath(" + xU + ")"} //atanh
	function axhE(xU) {return "axh(" + xU + ")"} //asech
	function ayhE(xU) {return "ayh(" + xU + ")"} //acosech
	function azhE(xU) {return "azh(" + xU + ")"} //acotanh
	function logE(xU) {return "log(" + xU + ")"} //common log
	function lneE(xU) {return "lne(" + xU + ")"} //natural log
	function sqtE(xU) {return "sqt(" + xU + ")"} //square root
	function cbtE(xU) {return "cbt(" + xU + ")"} //cube root
	function intE(xU) {return "int(" + xU + ")"} //floor
	function ceiE(xU) {return "cei(" + xU + ")"} //ceiling
	function absE(xU) {return "abs(" + xU + ")"} //absolute value
	function erfE(xU) {return "erf(" + xU + ")"} //error function
	function efcE(xU) {return "efc(" + xU + ")"} //inverse error function
	function argE(xU) {return "arg(" + xU + ")"} //arg function
	function expE(xU) {return "exp(" + xU + ")"} //exponential function
	function conE(xU) {return "con(" + xU + ")"} //conjugate
	function gamE(xU) {return "gam(" + xU + ")"} //gamma
	function cdfE(xU) {return "cdf(" + xU + ")"} //cumulative density function
	function pdfE(xU) {return "pdf(" + xU + ")"} //probability density function
	function lcfE(xU) {return "lcf(" + xU + ")"} //log cumulative density function
	function lpfE(xU) {return "lpf(" + xU + ")"} //log probability density function
	function rouE(xU) {return "rou(" + xU + ")"} //round
	function rndE(xU) {return "rnd(" + xU + ")"} //random
	function rexE(xU) {return "rex(" + xU + ")"} //real part
	function imxE(xU) {return "imx(" + xU + ")"} //imaginary part
	function frcE(xU) {return "frc(" + xU + ")"} //decimal component
	function sbrE(xU) {return "sbr(" + xU + ")"} //straight brackets
	function cbrE(xU) {return "cbr(" + xU + ")"} //curly brackets
	function sbtE(xU) {return "sbt(" + xU + ")"} //subscript
	function vecE(xU) {return "vec(" + xU + ")"} //vector accent
	function hatE(xU) {return "hat(" + xU + ")"} //hat accent
	function udtE(xU) {return "udt(" + xU + ")"} //accent
	function tldE(xU) {return "tld(" + xU + ")"} //tilde accent
	function undE(xU) {return "und(" + xU + ")"} //underline
	function invE(xU) {return "inv(" + xU + ")"} //inverse function
	function cntE(xU) {return xU} //container
	function facE(xU) { //factorial
		if (!numTest(xU) && cFunc(xU) != oParens(xU)) {return "(" + oParens(xU) +")Cv[45]"}
		return xU + "Cv[45]"
	}
	function sumE(xU,xL) {return "sum(" + xU + "," + xL + ")"} //summation
	function prdE(xU,xL) {return "prd(" + xU + "," + xL + ")"} //product
	function cupE(xU,xL) {return "cup(" + xU + "," + xL + ")"} //union
	function capE(xU,xL) {return "cap(" + xU + "," + xL + ")"} //intersection
	function limE(xU,xL) {return "lim(" + xU + "," + xL + ")"} //limit
	function difE(xU) {return "Cv[8748]" + xU}   //differential
	function idrE(xU) {return "idr(" + xU + ")"} //partial derivative
	function iddE(xU) {return "idd(" + xU + ")"} //partial second derivative
	function tdrE(xU,xL) {return "tdr(" + xU + "," + xL + ")"} //derivative
	function tddE(xU,xL) {return "tdd(" + xU + "," + xL + ")"} //second derivative
	function sdrE(xU,xL) {return "sdr(" + xU + "," + xL + ")"} //derivative
	function ddrE(xU,xL) {return "ddr(" + xU + "," + xL + ")"} //second derivative
	function psdE(xU,xL) {return "psd(" + xU + "," + xL + ")"} //partial derivative
	function pddE(xU,xL) {return "pdd(" + xU + "," + xL + ")"} //partial second derivative
	function tdvE(xU,dV) {return "(tdr(" + dV + ")" + xU + ")"} //total derivative from FUNC format
	function tdsE(xU,dV) {return "(tdd(" + dV + ")" + xU + ")"} //total second derivative from FUNC format
	function drvE(xU,dV) {return "(idr(" + dV + ")" + xU + ")"} //partial derivative from FUNC format
	function drsE(xU,dV) {return "(idd(" + dV + ")" + xU + ")"} //partial second derivative from FUNC format
	function lmtE(xU,dV,mL) {return "lim(" + dV + "," + mL +")" + xU} //limit from FUNC format
	function smmE(xU,mU,dV,mL) {return "sum(" + mU + "," + dV + "Cv[61]" + mL + ")" + xU} //summation from FUNC format
	function pmmE(xU,mU,dV,mL) {return "prd(" + mU + "," + dV + "Cv[61]" + mL + ")" + xU} //product from FUNC format
	function itgE(xU,xL) {return "itg(" + xU + "," + xL + ")"} //definite integral
	function ntgE(xU,dV,mU,mL) { //integral from FUNC format
		if (typeof mU == "undefined" && typeof mL == "undefined") {return "Cv[8747]" + xU + "Cv[8748]" + dV}	
		return "itg(" + mU + "," + mL + ")" + xU + "Cv[8748]" + dV
	}
	function ntpE(xU,dV,mU,mL) {return ntgE(xU,dV,mU,mL)} //wrapper for unsolved integral
	function matE() {return "mat(" + Array.prototype.slice.call(arguments) + ")"} // matrix object
	//
	if (xFn == "NaN" || xFn == "undefined") {return "undefined"}
	xFn += "";
	xFn = xFn.replace(/\,\)/g,",'')").replace(/\(\,/g,"('',").replace(/\,\,/g,",'',").replace(/\(\)/g,"('')");
	xFn = eval(xFn.replace(/([a-z])\(/g,"$1E(").replace(/(Cv\[\d+\])/g,"'$1'"))+"";
	xFn = xFn.replace(/\+\-/g,"-").replace(/\-\-/g,"");
	xFn = toSciNot(xFn);
	return xFn
}
//
function cFunc(xPr) { //convert from MG format to FUNC format: a+bc/d -> cAdd(a,cDiv(cMul(b,c),d)))
	function cParse(xInp,xOp,xFunc) {//parse operators
		var zDelim = "^-#*/+,=~@";
		var ztmp = "";
		var lPar = 0,rPar = 0;
		if (xOp == "^") {var bSym = xInp.lastIndexOf(xOp)+1}
		else  {var bSym = xInp.indexOf(xOp)+1;}
		var aSym = bSym-2;
		var lSym = xInp.length;
		for (var iCp=bSym;iCp<=lSym;iCp++) {
			ztmp = xInp.charAt(iCp);
			if (ztmp == "(") {lPar++}
			if (ztmp == ")") {rPar++}
			if (lPar < rPar) {break;}
			if (lPar == rPar && xInp.charAt(iCp-1)!= "e") { if (zDelim.indexOf(ztmp) > -1) {break} }
		}
		lPar = 0;rPar = 0;
		for (var dCp=aSym;dCp>=0;dCp--) {
			ztmp = xInp.charAt(dCp);
			if (ztmp == "(") {lPar++}
			if (ztmp == ")") {rPar++}
			if (lPar > rPar) {break;}
			if (lPar == rPar && xInp.charAt(dCp-1)!= "e") { if (zDelim.indexOf(ztmp) > -1) {break} }
		}
		xInp = xInp.substr(0,dCp+1)+xFunc+"("+xInp.substr(dCp+1,aSym-dCp)+","+xInp.substr(bSym,iCp-bSym)+")"+xInp.substr(iCp);
		return xInp;
	}
	function nParse(xInp,xOp) {//parse negatives as cNeg()
		var zDelim = "()^-#*/+,=~@";
		var ztmp = "";
		var iNp = 0,lPar = 0,rPar = 0;
		var bSym = xInp.indexOf(xOp)+xOp.length;
		var lSym = xInp.length;
		for (iNp=bSym;iNp<=lSym;iNp++) {
			ztmp = xInp.charAt(iNp);
			if (ztmp == "(") {lPar++}
			if (ztmp == ")") {rPar++}
			if (lPar < rPar) {break;}
			if (lPar == rPar && xInp.charAt(iNp-1)!= "e") {if (zDelim.indexOf(ztmp) > -1) {break}}
		}
		xInp = xInp.substr(0,bSym-1)+"cNeg("+xInp.substr(bSym,iNp-bSym)+")"+xInp.substr(iNp);
		return xInp;
	}
	//
	xPr += "";
	var nCf = 0;
	var sCount = strCount(xPr,"]sbt(");//var&subscripts into container cnt()
	xPr = xPr.replace(/\]sbt\(/g,"]SBT(");
	xPr = xPr.replace(/Infinity/g,"Cv[8734]");
	for (nCf=0;nCf<sCount;nCf++) {
		var sbtOperand = parseParens(xPr,xPr.indexOf("]SBT("));
		xPr = xPr.replace(/Cv\[(\d+)\]SBT\(/,"cnt(Cv[$1]SBT(").replace("]SBT("+sbtOperand.inside,"]sbt("+oParens(sbtOperand.inside)+")");
	}
	var sCount = strCount(xPr,"Cv[8748]");//differential
	for (var nCf=0;nCf<sCount;nCf++) {xPr = xPr.replace(/Cv\[8748\]Cv\[(\d+)\]\/Cv\[8748\]Cv\[(\d+)\]/,"sdr(Cv[$1],Cv[$2])")}	
	xPr = xPr.replace(/!/g,"Cv[45]"); //factorial
	xPr = xPr.replace(/([\)\]])(\|?)(\d)/g,"$1$2#$3").replace(/([\)\]\d])(\|?)\(/g,"$1$2#(").replace(/([\)\]\d])(\|?)Cv\[/g,"$1$2#Cv[").replace(/([\)\]\d])(\|?)([a-z][a-z][a-z]\()/ig,"$1$2#$3");//terms to # multiply 
	// non-multiplying symbols
	var nBind = ["(Cv\\[8592\\])","(Cv\\[8747\\])","(Cv\\[8748\\])","(Cv\\[60\\])","(Cv\\[61\\])","(Cv\\[62\\])","(Cv\\[8800\\])","(Cv\\[8804\\])",
				"(Cv\\[59\\])","(Cv\\[8805\\])","(Cv\\[8773\\])","(Cv\\[8750\\])","(Cv\\[8751\\])","(Cv\\[8752\\])",
				"(idr\\([^\\)]*\\))","(idd\\([^\\)]*\\))","(tdr\\([^\\)]*\\))","(tdd\\([^\\)]*\\))",
				"(lim\\([^\\)]*\\,[^\\)]*\\))","(itg\\([^\\)]*\\,[^\\)]*\\))","(sdr\\([^\\)]*\\,[^\\)]*\\))","(ddr\\([^\\)]*\\,[^\\)]*\\))",
				"(sum\\([^\\)]*\\,[^\\)]*\\))","(prd\\([^\\)]*\\,[^\\)]*\\))","(psd\\([^\\)]*\\,[^\\)]*\\))","(pdd\\([^\\)]*\\,[^\\)]*\\))",
				"(cap\\([^\\)]*\\,[^\\)]*\\))","(cup\\([^\\)]*\\,[^\\)]*\\))","(dif\\([^\\)]*\\,[^\\)]*\\))","(Cv\\[10044])"];
	for (nCf=0;nCf<nBind.length;nCf++) {//add @ between bind symbols
		var rgx = new RegExp(nBind[nCf]+"(\\|?)#");
		var rgy = new RegExp("#(\\|?)"+nBind[nCf]);
		while (xPr.search(rgx) != -1 || xPr.search(rgy) != -1) {xPr = xPr.replace(rgx,"$1$2@").replace(rgy,"@$1$2")}
	}
	if (xPr.charAt(0) == "+") {xPr = xPr.substr(1)} //remove + at beginning of expression
	var sCount = strCount(xPr,"-");//parse power negatives to cPow(x,cNeg())
	var nCases = ["^-","^|-"];
	for (nCf=0;nCf<sCount;nCf++) {
		for (var iXX=0;iXX<nCases.length;iXX++) {
			if (xPr.indexOf(nCases[iXX]) > -1) {xPr = nParse(xPr,nCases[iXX])}
		}
	}
	sCount = strCount(xPr,"^");//convert powers to cPow()
	for (nCf=0;nCf<sCount;nCf++) {xPr = cParse(xPr,"^","cPow")}
	if (xPr.charAt(0) == "-") {xPr = nParse(xPr,"-")}	
	var sCount = strCount(xPr,"-");//parse negatives to cNeg()
	var nCases = ["~-","~|-","+-","*-","/-","(-",",-","+|-","*|-","/|-","(|-",",|-","=-","=|-","@-","@|-","e|-"];
	for (nCf=0;nCf<sCount;nCf++) {
		for (var iXX=0;iXX<nCases.length;iXX++) {
			if (xPr.indexOf(nCases[iXX]) > -1) {xPr = nParse(xPr,nCases[iXX])}
		}
	}
	sCount = strCount(xPr,"~");//convert angles to cAng()
	for (nCf=0;nCf<sCount;nCf++) {xPr = cParse(xPr,"~","cAng")}		
	var sCount = strCount(xPr,"#");//convert # to cMul() (multiply)
	for (nCf=0;nCf<sCount;nCf++) {xPr = cParse(xPr,"#","cMul")}
	var sCount = strCount(xPr,"/");//convert / to cDiv()
	for (nCf=0;nCf<sCount;nCf++) {xPr = cParse(xPr,"/","cDiv")}
	var sCount = strCount(xPr,"*");//convert * to cTms()
	for (nCf=0;nCf<sCount;nCf++) {xPr = cParse(xPr,"*","cTms")}
	sCount = strCount(xPr,"-") + strCount(xPr,"+");//convert +- to cAdd() or cSub()
	var cIdx = 0;
	var aIdx = 0;
	for (nCf=0;nCf<sCount;nCf++) {
		aIdx = xPr.indexOf("+");
		cIdx = xPr.indexOf("-");
		if (aIdx == -1) {xPr = cParse(xPr,"-","cSub")}
		else if (cIdx == -1) {xPr = cParse(xPr,"+","cAdd")}
		else if (aIdx < cIdx) {xPr = cParse(xPr,"+","cAdd")}
		else {xPr = cParse(xPr,"-","cSub")}
	}
	sCount = strCount(xPr,"=");//convert equal to cEql()
	for (nCf=0;nCf<sCount;nCf++) {xPr = cParse(xPr,"=","cEql")}	
	sCount = strCount(xPr,"@");//convert @ symbol handler to cBnd()
	for (nCf=0;nCf<sCount;nCf++) {xPr = cParse(xPr,"@","cBnd")}
	xPr = xPr.replace(/\[\[/g,"'[[").replace(/\]\]/g,"]]'") //quote matrices
	return xPr;
}

//LaTex Export/Import functions
var Ct = new Array(11000);

Ct[0]="\\alpha "; 										//"fine structure const";
Ct[1]="\\alpha_{0}";	 								//"Bohr radius";
Ct[2]="b"; 												//"Wein displacement const.";
Ct[3]="c"; 												//"speed of light";
Ct[4]="c^2 "; 											//"(speed of light)<sup>2</sup>";

Ct[5]="c_{1}";											//"1<sup>st</sup> radiation constant";
Ct[6]="c_{2}"; 											//"2<sup>nd</sup> radiation constant";
Ct[7]="\\epsilon_{0}";									//"vacuum permittivity";
Ct[8]="e";		 										//"Euler constant";
Ct[9]="eV"; 											//"electron volt";

Ct[10]="F";			 									//"Faraday constant";
Ct[11]="G"; 											//"Newton constant";
Ct[12]="g"; 											//"Earth gravity accel";
Ct[13]="G_{0}"; 										//"conductance quantum";
Ct[14]="h"; 											//"Planck constant";

Ct[15]="\\hbar "; 										//"h-bar";
Ct[16]="K_{j}"; 										//"Josephson constant";
Ct[17]="k"; 											//"Boltzmann constant";
Ct[18]="\\lambda "; 									//"Compton wavelength";
Ct[19]="l_{P}";											//"Planck length";

Ct[20]="\\mu_{0}";										//"vacuum permeability";
Ct[21]="\\mu_{B}";										//"Bohr magneton";
Ct[22]="M_{e}";										 	//"electron mass";
Ct[23]="M_{p}"; 										//"proton mass";
Ct[24]="M_{n}"; 										//"neutron mass";

Ct[25]="M_{P}"; 										//"Planck mass";
Ct[26]="M_{u}"; 										//"atomic mass constant";
Ct[27]="N_{a}";										 	//"Avogadro constant";
Ct[28]="n_{0}";											//"Loschmidt constant";
Ct[29]="\\pi "; 										//"Archimedes constant"; 

Ct[30]="2 \\pi "; 										//"2&times;&#960;";
Ct[31]="\\phi"; 										//"golden ratio";
Ct[32]="\\phi_{0}";									 	//"magnetic flux quantum";
Ct[33]="P_{atm}";										//"standard pressure";
Ct[34]="q_{e}"; 										//"elementary charge";

Ct[35]="R_{c}";											//"Universal gas constant";
Ct[36]="R_{k}"; 										//"von Klitzing constant";
Ct[37]="R_{\\infty}";									//"Rydberg constant";
Ct[38]="r_{e}"; 										//"classical electron radius";
Ct[39]="\\sigma ";										//"Stefan-Boltzmann";

Ct[40]="T_{P}"; 										//"Planck temperature";
Ct[41]="t_{P}";											//"Planck time";
Ct[42]="V_{m}";											//"molar volume";
Ct[43]="Z_{0}"; 										//"vacuum impedance";

for (var iAl=48;iAl<10000;iAl++) {Ct[iAl]=""}
for (var iAl=58;iAl<=127;iAl++)  {Ct[iAl]="\\textrm{"+String.fromCharCode(iAl)+"}"}//ascii
for (var iAl=48;iAl<=57;iAl++)   {Ct[iAl]=String.fromCharCode(iAl)}//0-9
for (var iAl=65;iAl<=90;iAl++) {Ct[iAl]="\\textbf{"+String.fromCharCode(iAl)+"}"}//A-Z
for (var iAl=97;iAl<=22;iAl++) {Ct[iAl]="\\textbf{"+String.fromCharCode(iAl)+"}"}//a-z
for (var iAl=10032;iAl<=10047;iAl++) {Ct[iAl]=String.fromCharCode(iAl-10000)}//punc
for (var iAl=10065;iAl<=10090;iAl++) {Ct[iAl]=String.fromCharCode(iAl-10000)}//A-Z italic
for (var iAl=10097;iAl<=10122;iAl++) {Ct[iAl]=String.fromCharCode(iAl-10000)}//a-z italic
for (var iAl=10768;iAl<=10879;iAl++) {Ct[iAl]=""}//accents
var Greeks =   ["A","B","\\Gamma ","\\Delta ","E","Z","H","\\Theta ","I","K","\\Lambda ","M",
				"N","\\Xi ","O","\\Pi ","","\\Rho ","\\Sigma ","T","\\Upsilon ","\\Phi ","X","\\Psi ","\\Omega ",
				"","","","","","","",
				"\\alpha ","\\beta ","\\gamma ","\\delta ","\\epsilon ","\\zeta ","\\eta ","\\theta ","\\iota ","\\kappa ","\\lambda ","\\mu ",
				"\\nu ","\\xi ","o","\\pi ","","\\rho ","\\sigma ","\\tau ","\\upsilon ","\\phi ","\\chi ","\\psi ","\\omega "];
for (var iAl=0;iAl<=Greeks.length;iAl++) {Ct[iAl+913] = Greeks[iAl]}

Ct[10040] ="\\left(";
Ct[10041] ="\\right)";
Ct[42] = "\\ast ";
Ct[45] = "!";
Ct[46] = "\\imath ";
Ct[60] = "<";
Ct[61] = "=";
Ct[62] = ">";
Ct[92] = "\\setminus ";
Ct[126] = "\\sim ";
Ct[172] = "\\neg ";
Ct[176] = "\\circ ";
Ct[177] = "\\pm "; 
Ct[215] = "\\times ";
Ct[247] = "\\div ";
Ct[420] = "\\mathfrak{P}";
Ct[8230] = "\\dotsi ";
Ct[8756] = "\\because ";
Ct[8757] = "\\therefore ";
Ct[8758] = "\\vdots ";
Ct[8800] = "\\neq ";
Ct[8804] = "\\leq ";
Ct[8805] = "\\geq ";
Ct[8773] = "\\cong ";
Ct[8719] = "\\prod ";
Ct[8721] = "\\sum ";
Ct[8723] = "\\mp ";
Ct[8747] = "\\int ";
Ct[8748] = " d";
Ct[8750] = "\\oint ";
Ct[8751] = "\\oiint ";
Ct[8752] = "\\oiiint ";
Ct[8733] = "\\propto ";
Ct[8789] = "";
Ct[8734] = "\\infty ";
Ct[8801] = "\\equiv ";
Ct[8594] = "\\to ";
Ct[8592] = "\\gets ";
Ct[8226] = "\\cdot"; 
Ct[8656] = "\\Leftarrow ";
Ct[8658] = "\\Rightarrow ";
Ct[8810] = "\\ll ";
Ct[8811] = "\\gg ";
Ct[8660] = "\\Leftrightarrow ";
Ct[8704] = "\\forall ";
Ct[8707] = "\\exists ";
Ct[8708] = "\\nexists ";
Ct[8706] = "\\partial ";
Ct[8711] = "\\nabla ";
Ct[8727] = "\\ast ";
Ct[8224] = "\\dagger ";
Ct[8225] = "\\ddagger ";
Ct[8240] = "";
Ct[8242] = "\\prime ";
Ct[8243] = "\\prime\\prime ";
Ct[8466] = "\\mathcal{L}";
Ct[8497] = "\\mathcal{F}";
Ct[8461] = "\\mathbb{H}";
Ct[8469] = "\\mathbb{N}";
Ct[8484] = "\\mathbb{Z}";
Ct[8474] = "\\mathbb{Q}";
Ct[8477] = "\\Re ";
Ct[8450] = "\\mathbb{C}";
Ct[1488] = "\\aleph ";
Ct[8743] = "\\wedge ";
Ct[8744] = "\\vee "; 
Ct[8745] = "\\cap "; 
Ct[8746] = "\\cup ";
Ct[8834] = "\\subset ";
Ct[8835] = "\\supset ";
Ct[8712] = "\\in "; 
Ct[8715] = "\\ni ";
Ct[8838] = "\\subseteq ";
Ct[8839] = "\\supseteq ";
Ct[8713] = "\\notin "; 
Ct[8716] = "";
Ct[8728] = "\\circ ";
Ct[8836] = "";
Ct[8837] = "";
Ct[8722] = "-";
Ct[8739] = "\\amp ";
Ct[8739] = "|";
Ct[8853] = "\\oplus ";
Ct[8709] = "\\oslash ";
Ct[8854] = "\\ominus ";
Ct[8736] = "\\angle ";
Ct[8736] = "\\measuredangle ";
Ct[8738] = "\\measuredangle ";
Ct[8737] = "";
Ct[8738] = "";
Ct[8735] = "";
Ct[8741] = "\\| ";
Ct[8855] = "\\otimes ";
Ct[8869] = "\\bot ";
Ct[8943] = "\\cdots ";
Ct[8944] = "\\iddots ";
Ct[8945] = "\\ddots";
Ct[9001] = "\\rangle ";
Ct[9002] = "\\langle ";
Ct[9476] = "\\ldots ";
Ct[11100]="C";//constants of integration
for (var iAl=11101;iAl<=11110;iAl++) {Ct[iAl]="C_{"+(iAl-11100)+"}"}//constants of integration
var tDelimiter = "_,!=<>|+-*^/{}()\\ ";
//
function texExport(xF) { //convert MG format to LaTeX
	function cPowX(xU,xL) {
		if (xU.indexOf("<Xfxp>") > 0 && xU.indexOf("<Xfxp>") < 6 && xU.indexOf("\\") == 0) {return oBrackets(xU).replace("<Xfxp>","^{"+oBrackets(xL)+"}")} //sin^n x
		if (xU.indexOf("\\") == 0) {return "("+oBrackets(xU)+")^{"+oBrackets(xL)+"}"}
		return "{"+oBrackets(xU)+"}^{"+oBrackets(xL)+"}"
	}
	function matX(xA) {
		var mReturn = "";
		if (xA[0].search("&") == -1) {
			for (var iC=0;iC<xA.length;iC++) {
				mReturn = mReturn + xA[iC];
				if (iC < xA.length-1) {mReturn = mReturn + "&"}
			}
		}
		else {
			mReturn = mReturn + "\\begin{bmatrix}"
			for (var iR=0;iR<xA.length;iR++) {
				mReturn = mReturn + xA[iR];
				if (iR < xA.length-1) {mReturn = mReturn + "\\\\"}
			}
			mReturn = mReturn + "\\end{bmatrix}"
		}
		return mReturn 
	}
	function lFunc(parm) {mA=parm[0];mB=parm[1];return eval(funcselect(funcKey,fnformatL))}
	function rFunc(parm) {mA=parm[0];mB=parm[1];return eval(funcselect(funcKey,fnformatR))}
	function funcselect(func,key) {return eval("funcMap."+func+"."+key)}
	//
	
	xF += "";
	if (xF.search("Infinity") > -1) {return xF.replace(/Infinity/g,"\\infty")}
	if (xF == "NaN" || xF == "undefined") {return "undefined"}
	xF = cFunc(xF); //convert to func format
	var fnformatL = "latexL1";
	var fnformatR = "latexR1";	
	xF = xF.replace(/ /g,"").replace(/([a-z][a-z][a-z])\(/ig,"$1%");
	var sCount = strCount(xF,"%");
	for (var nXf=0;nXf<sCount;nXf++) {
		if (mgConfig.fnFmt == "fn(x)") {fnformatL = "latexL1";fnformatR = "latexR1"}
		else {fnformatL = "latexL2";fnformatR = "latexR2"}
		var rSymbol = "", lSymbol = "";
		var lPar = 1,rPar = 0,iXf = 0;
		var bSym = xF.lastIndexOf("%")+1;
		var lSym = xF.length;
		for (iXf=bSym;iXf<lSym;iXf++) {
			if (xF.charAt(iXf) == "%" || xF.charAt(iXf) == "(") {lPar++}
			if (xF.charAt(iXf) == ")") {rPar++}
			if (lPar == rPar) {break;}
		}
		var strg = xF.substr(bSym,iXf-bSym);
		var strgS = strg.split(",");
		if (typeof strgS[0] == "undefined") {strgS[0] = strg}
		for (var tXi=0;tXi<strgS.length;tXi++) {if (typeof strgS[tXi] == "undefined") {strgS[tXi]= ""}}
		var funcKey = xF.substr(bSym-4,3); //functions
		if (!funcTest(funcKey)) {funcKey = xF.substr(bSym-5,4)} //operators
		rSymbol = funcselect(funcKey,fnformatR);
		lSymbol = funcselect(funcKey,fnformatL);
		if (typeof funcselect(funcKey,'latexInv1') != "undefined" && mgConfig.invFmt == "sin<sup>-1</sup>" && mgConfig.fnFmt == "fn(x)") {fnformatL = "latexInv1"}
		if (typeof funcselect(funcKey,'latexInv1') != "undefined" && mgConfig.invFmt == "sin<sup>-1</sup>" && mgConfig.fnFmt == "fn x")  {fnformatL = "latexInv2"}
		var fParams = "";
		if (typeof strgS[0] == "string" && lSymbol.search("mA") == -1 && lSymbol.search("(parm)") == -1){fParams = fParams+strgS[0]}
		if (typeof strgS[1] == "string" && lSymbol.search("mB") == -1 && lSymbol.search("(parm)") == -1){fParams = fParams+strgS[1]}
		var rTmp = "";
		if (iXf < lSym) {rTmp = rFunc(strgS)}
		xF = xF.substr(0,bSym-(funcKey.length+1))+lFunc(strgS)+fParams+rTmp+xF.substr(iXf+1,lSym);
	}
	//clean up extra parens
	xF = xF.replace(/\(/g,"%");
	var sCount = strCount(xF,"%");
	for (var nXs=0;nXs<sCount;nXs++) {
		var lPar = 1;
		var rPar = 0;
		var bSym = xF.indexOf("%")+1;
		var lSym = xF.length;
		for (var iXs=bSym;iXs<lSym;iXs++) {
			if (xF.charAt(iXs) == "%" ) {lPar++}
			if (xF.charAt(iXs) == ")" ) {rPar++}
			if (lPar == rPar) {break;}
		}
		var strg = xF.substr(bSym,iXs-bSym);
		if (xF.substr(bSym-1,7) == "%<Xdiv>" && xF.substr(iXs-6,7) == "<Xdve>)" && xF.substr(iXs+1,1) != "^" && strg.search(/\<Xdve\>(.*)\<Xdiv\>/) == -1) {
			xF = xF.substr(0,bSym-1)+strg+xF.substr(iXs+1,lSym);
		}
		else {
			xF = xF.substr(0,bSym-1)+"("+strg+")"+xF.substr(iXs+1,lSym);	
		}
	}
	xF = xF.replace(/\<X\w\w\w\>/g,"").replace(/\%/g,"("); //clean up tags
	//resolve symbols
	sCount = strCount(xF,"Cv[");
	xF = xF.replace(/Cv\[/g,"Ct[");
	for (var nXf=0;nXf<sCount;nXf++) {xF = xF.replace(/Ct\[\d+\]/,eval(xF.match(/Ct\[\d+\]/)+""))}
	xF = xF.replace(/\(/g,"\\left(").replace(/\)/g,"\\right)").replace(/\\/g," \\").replace(/  /g," ").replace(/ _/g,"_").replace(/_ /g,"_").replace(/ \^/g,"^").replace(/\^ /g,"^").replace(/ \[/g,"[").replace(/\\ \\/g,"\\\\");//cleanup
	return xF;
}
//
function texImport(xF) { //convert LaTeX to MG format
	function asciiTest(xA) {if ((xA >= 65 && xA <= 90) || (xA >= 97 && xA <= 122)) {return true} return false} //test for ascii symbols
	function funcselect(func,key) {return eval("funcMap."+func+"."+key)}
	function matI(xM) {
		var mArray = xM.split("\\\\");
		var mReturn = ""
		for (var iM=0;iM<mArray.length;iM++) {mArray[iM] = mArray[iM].split("&")}
		for (var iR=0;iR<mArray.length;iR++) {
			mReturn = mReturn + "mat(" + mArray[iR] + ")"
			if (iR < mArray.length-1) {mReturn = mReturn + ","}
		}
		return "mat(" + mReturn + ")"
	}
	var ulSymbols = ["\\int","\\sum","\\prod","\\cap","\\cup"];
	var ulFuncs  =  ["itg(","sum(","prd(","cap(","cup("];
	var lBrackets = ["{","[","|"];
	var rBrackets = ["}","]","|"];
	var brkSym  =   ["cbr(","sbr(","abs("];
	if (xF == "NaN" || xF == "undefined") {return "undefined"}
	xF += " ";
	xF = xF.replace(/\\big/g,"\\");//fix big
	xF = xF.replace(/\s+\{/g,"{").replace(/\s+\}/g,"}").replace(/\{\s+/g,"{").replace(/\}\s+/g,"}"); //fix brace whitespaces
	var sCount = strCount(xF,"\\begin{bmatrix}"); //convert matrices
	for (var nXf=0;nXf<sCount;nXf++) {
		var rTemp = xF.split("\\begin{bmatrix}");
		var mTemp = rTemp[1].split("\\end{bmatrix}");
		xF = xF.replace("\\begin{bmatrix}"+mTemp[0]+"\\end{bmatrix}",matI(mTemp[0]));
	}
	xF = xF.replace(/\s+/g," ").replace(/\\/g," \\").replace(/ _/g,"_").replace(/_ /g,"_").replace(/ \^/g,"^").replace(/\^ /g,"^").replace(/ \[/g,"[").replace(/ \(/g,"(").replace(/\\left /g,"\\left").replace(/\\right /g,"\\right");//fix whitespaces
	var sCount = strCount(xF,"\\\\");//convert line breaks
	for (var nXs=0;nXs<sCount;nXs++) {xF = xF.replace(/\\\\/," ")}
	xF = xF.replace(/\\,/g," ").replace(/\\:/g," ").replace(/\\;/g," ").replace(/\\!/g," ").replace(/\\ /g,""); //fix special
	if (xF.split("{").length != xF.split("}").length) {Cs[9998] = "<span style='color:red'>Unmatched brackets</span>";return "Cv[9998]"} //check parens
	xF = xF.replace(/\\left\[/g,"sbr(").replace(/\\left\{/g,"cbr(").replace(/\\right\]/g,")").replace(/\\right\}/g,")");//convert brackets
	var sCount = strCount(xF,"\\");//convert left/right paren
	for (var nXf=0;nXf<sCount;nXf++) {xF = xF.replace(/\\left\(/,"(").replace(/\\right\)/,")").replace(/\\left\\\(/,"(").replace(/\\right\\\)/,")")}
	for (var iBr=0;iBr<lBrackets.length;iBr++){//convert left/right brackets
		var sCount = strCount(xF,"\\left\\"+lBrackets[iBr]);
		for (var nXf=0;nXf<sCount;nXf++) {xF = xF.replace("\\left\\"+lBrackets[iBr],"cbr(").replace("\\right\\"+rBrackets[iBr],")")	}
	}
	var sCount = strCount(xF,"\\frac");//convert frac
	for (var nXs=0;nXs<sCount;nXs++) {
		var numerator = parseBrackets(xF,xF.indexOf("\\frac")+5);
		var denominator = parseBrackets(xF,numerator.end+1);
		if (numerator.inside.indexOf("+") > -1 || numerator.inside.indexOf("-") > -1){numerator.inside = "("+numerator.inside+")"}
		if (denominator.inside.indexOf("+") > -1 || denominator.inside.indexOf("-") > -1){denominator.inside = "("+denominator.inside+")"}
		xF = xF.substr(0,xF.indexOf("\\frac"))+" ("+numerator.inside+"/"+denominator.inside+") "+xF.substr(denominator.end+1,xF.length);
	}
	var sCount = strCount(xF,"\\sqrt[");//convert sqrt_n
	for (var nXf=0;nXf<sCount;nXf++) {
		var parmU = parseBrackets(xF,xF.indexOf("\\sqrt[")+6);
		var parmL = parseBrackets(xF,parmU.end+2);
		xF = xF.substr(0,xF.indexOf("\\sqrt["))+" nrt("+parmU.inside+","+parmL.inside+") "+xF.substr(parmL.end+1,xF.length);
	}
	var sCount = strCount(xF,"\\log_");//convert log_n
	for (var nXf=0;nXf<sCount;nXf++) {
		var parmU = parseBrackets(xF,xF.indexOf("\\log_")+5);
		var parmL = parseBrackets(xF,parmU.end+1);
		xF = xF.substr(0,xF.indexOf("\\log_"))+" lgn("+parmU.inside+","+parmL.inside+") "+xF.substr(parmL.end+1,xF.length);
	}
	for (var tFunc in funcMap) {//convert functions
		var sCount = strCount(xF,funcselect(tFunc,"texfunc"));
		for (var nXf=0;nXf<sCount;nXf++) {
			var symTemp = xF.substr(xF.indexOf(funcselect(tFunc,"texfunc")),xF.length);
			for (var nXi=1;nXi<symTemp.length;nXi++) {if (tDelimiter.indexOf(symTemp.charAt(nXi)) > -1){break}}
			if (symTemp.charAt(nXi) == "^") {//convert inverse fn^-1
				if (symTemp.substr(nXi,5) =="^{-1}") {
					var symTemp = symTemp.substr(1,nXi-1);
					if (funcselect(tFunc,"texfunc") == "\\"+symTemp && funcselect(tFunc,"trig")) {
						var operand = parseBrackets(xF,xF.indexOf(funcselect(tFunc,"texfunc"))+funcselect(tFunc,"texfunc").length+5);
						xF = xF.substr(0,xF.indexOf(funcselect(tFunc,"texfunc")))+" "+funcselect(tFunc,"invfunc")+"("+operand.inside+")"+xF.substr(operand.end,xF.length);
					}				
				}
				else {//convert fn powers
					var superscript = parseBrackets(xF,xF.indexOf(funcselect(tFunc,"texfunc"))+funcselect(tFunc,"texfunc").length+1);
					var operand = parseBrackets(xF,superscript.end+1);
					xF = xF.substr(0,xF.indexOf(funcselect(tFunc,"texfunc")))+" "+tFunc+"("+operand.inside+")^("+superscript.inside+")"+xF.substr(operand.end+1,xF.length);
				}
			}
			else {//convert all other fn
				var symTemp = symTemp.substr(1,nXi-1);
				if (funcselect(tFunc,"texfunc") == "\\"+symTemp) {
					var operand = parseBrackets(xF,xF.indexOf(funcselect(tFunc,"texfunc"))+funcselect(tFunc,"texfunc").length);
					xF = xF.substr(0,xF.indexOf(funcselect(tFunc,"texfunc")))+" "+tFunc+"("+operand.inside+")"+xF.substr(operand.end+1,xF.length);
				}
			}
		}
	}
	for (var nXt=0;nXt<ulSymbols.length;nXt++) {//convert u/l functions
		var sCount = strCount(xF,ulSymbols[nXt]+"_");
		for (var nXf=0;nXf<sCount;nXf++) {
			var limitL= parseBrackets(xF,xF.indexOf(ulSymbols[nXt]+"_")+ulSymbols[nXt].length+1);
			var limitU = parseBrackets(xF,limitL.end+1);
			limitL.inside = limitL.inside.replace("=","Cv[61]");
			if (xF.charAt(limitL.end+1) == "^") {xF = xF.substr(0,xF.indexOf(ulSymbols[nXt]+"_"))+ulFuncs[nXt]+limitU.inside+","+limitL.inside+") "+xF.substr(limitU.end+1,xF.length)}
			else {xF = xF.substr(0,xF.indexOf(ulSymbols[nXt]+"_"))+ulFuncs[nXt]+","+limitL.inside+") "+xF.substr(limitL.end+1,xF.length)}
		}
		var sCount = strCount(xF,ulSymbols[nXt]+"^");
		for (var nXf=0;nXf<sCount;nXf++) {
			var limitU= parseBrackets(xF,xF.indexOf(ulSymbols[nXt]+"^")+ulSymbols[nXt].length+1);
			var limitL = parseBrackets(xF,limitU.end+1);
			limitL.inside = limitL.inside.replace("=","Cv[61]");
			if (xF.charAt(limitU.end+1) == "_") {xF = xF.substr(0,xF.indexOf(ulSymbols[nXt]+"^"))+ulFuncs[nXt]+limitU.inside+","+limitL.inside+") "+xF.substr(limitL.end+1,xF.length)}
			else {xF = xF.substr(0,xF.indexOf(ulSymbols[nXt]+"^"))+ulFuncs[nXt]+limitU.inside+",) "+xF.substr(limitU.end+1,xF.length)}
		}
	}
	
	var sCount = strCount(xF,"\\lim_");//convert /lim
	for (var nXf=0;nXf<sCount;nXf++) {
		var limitX = parseBrackets(xF,xF.indexOf("\\lim_")+5);
		var limitU = [limitX.inside,""];
		if (limitX.inside.indexOf("\\to") > -1) {limitU = limitX.inside.split("\\to")}
		if (limitX.inside.indexOf("\\rightarrow") > -1) {limitU = limitX.inside.split("\\rightarrow")}
		xF = xF.substr(0,xF.indexOf("\\lim_"))+" lim("+limitU[0]+","+limitU[1]+") "+xF.substr(limitX.end+1,xF.length)	
	}
	var sCount = strCount(xF,"_");//convert subscripts
	for (var nXf=0;nXf<sCount;nXf++) {
		var tTemp = xF.charAt(xF.indexOf("_")+1)
		if (tTemp == "{" || tTemp == "(") {
			var subscript = parseBrackets(xF,xF.indexOf("_"));
			xF = xF.substr(0,xF.indexOf("_"))+" sbt("+subscript.inside+") "+xF.substr(subscript.end+1,xF.length)
		}
		else {
			for (var nXi=xF.indexOf("_")+1;nXi<xF.length;nXi++) {if (tDelimiter.indexOf(xF.charAt(nXi)) > -1){break}}
			if (xF.substr(xF.indexOf("_"),nXi).search(/[a-z][a-z][a-z]\(\)/i) == -1) {xF = xF.substr(0,xF.indexOf("_"))+" sbt("+tTemp+") "+xF.substr(xF.indexOf("_")+2,xF.length)}
			else {xF = xF.replace(/_/,"")}
		}
	}

	var sCount = strCount(xF,"^");//convert superscripts
	for (var nXf=0;nXf<sCount;nXf++) {
		var tTemp = xF.charAt(xF.indexOf("^")+1)
		if (tTemp == "{" || tTemp == "(") {
			var superscr = parseBrackets(xF,xF.indexOf("^")+1);
			if (superscr.inside.length > 1) {xF = xF.substr(0,xF.indexOf("^"))+" ^("+superscr.inside+") "+xF.substr(superscr.end+1,xF.length)}
		}
	}
	var sCount = strCount(xF,"\\");//convert symbols
	for (var nXf=0;nXf<sCount;nXf++) {
		var symTemp = xF.substr(xF.indexOf("\\"),xF.length);
		for (var nXi=1;nXi<symTemp.length;nXi++) {if (tDelimiter.indexOf(symTemp.charAt(nXi)) > -1){break}}
		symTemp = symTemp.substr(1,nXi-1);
		for (var iAl=1;iAl<=9500;iAl++) {if (typeof Ct[iAl] != "undefined" && (Ct[iAl] == "\\"+symTemp || Ct[iAl] == "\\"+symTemp+" ")) {xF = xF.replace("\\"+symTemp," Cv["+iAl+"]");break} }
	}
	var sCount = strCount(xF,"\\");//remove unknown tags
	for (var nXf=0;nXf<sCount;nXf++) {
		var symTemp = xF.substr(xF.indexOf("\\"),xF.length);
		for (var nXi=1;nXi<symTemp.length;nXi++) {if (",!=<>|+-*^/{}()\\ ".indexOf(symTemp.charAt(nXi)) > -1){break}}
		symTemp = symTemp.substr(1,nXi-1);
		xF = xF.replace("\\"+symTemp,"");
	}
	for (var nXf=0;nXf<xF.length;nXf++) {//convert variables
		for (var tFunc in funcMap) {if (xF.substr(nXf,4) == tFunc+"(") {nXf = nXf+3;break}}
		if (xF.substr(nXf,3) == "Cv[") {nXf = nXf+3}
		var asciiChar = xF.charAt(nXf).charCodeAt(0);
		if (asciiTest(asciiChar)) {xF = xF.substr(0,nXf)+"Cv["+(asciiChar+10000)+"]"+xF.substr(nXf+1,xF.length);nXf = nXf+6}
	}
	xF = xF.replace(/ /g,""); //cleanup spaces
	xF = xF.replace(/\(Cv\[10100\]\)/g,"Cv[10100]");
	var sCount = strCount(xF,"Cv[10100]");//convert derivatives
	for (var nXf=0;nXf<sCount;nXf++) {
		xF = xF.replace(/\(Cv\[10100\]\/Cv\[10100\]Cv\[(\d+)\]\)/,"tdr(Cv[$1])");
		xF = xF.replace(/\(Cv\[10100\]Cv\[(\d+)\]\/Cv\[10100\]Cv\[(\d+)\]\)/,"sdr(Cv[$1],Cv[$2])");
		//second derivative
		xF = xF.replace(/\(Cv\[10100\]\^2\/Cv\[10100\]Cv\[(\d+)\]\^2\)/,"tdd(Cv[$1])");
		xF = xF.replace(/\(Cv\[10100\]\^2Cv\[(\d+)\]\/Cv\[10100\]Cv\[(\d+)\]\^2\)/,"ddr(Cv[$1],Cv[$2])");		
	}
	xF = xF.replace(/\(Cv\[8706\]\)/g,"Cv[8706]");
	var sCount = strCount(xF,"Cv[8706]");//convert partial derivatives
	for (var nXf=0;nXf<sCount;nXf++) {
		xF = xF.replace(/\(Cv\[8706\]\/Cv\[8706\]Cv\[(\d+)\]\)/,"idr(Cv[$1])");
		xF = xF.replace(/\(Cv\[8706\]Cv\[(\d+)\]\/Cv\[8706\]Cv\[(\d+)\]\)/,"psd(Cv[$1],Cv[$2])");
		//second derivative
		xF = xF.replace(/\(Cv\[8706\]\^2\/Cv\[8706\]Cv\[(\d+)\]\^2\)/,"idd(Cv[$1])");
		xF = xF.replace(/\(Cv\[8706\]\^2Cv\[(\d+)\]\/Cv\[8706\]Cv\[(\d+)\]\^2\)/,"pdd(Cv[$1],Cv[$2])");		
	}	
	var sCount = strCount(xF,"Cv[10100]");//convert differentials
	for (var nXf=0;nXf<sCount;nXf++) {
		xF = xF.replace(/\{Cv\[10100\]\}/,"Cv[10100]").replace(/Cv\[10100\]Cv\[(\d+)\]/,"Cv[8748]Cv[$1]");
	}
	xF = xF.replace(/Cv\[10101\]/g,"Cv[8]").replace(/Cv\[10105\]/g,"Cv[46]").replace(/Cv\[215\]/g,"*"); //special variables
	xF = xF.replace(/ /g,"").replace(/\{/g,"").replace(/\}/g,"").replace(/_/g,"").replace(/\'/g,"Cv[8242]").replace(/\`/g,"Cv[8242]");//cleanup
	xF = dedupBrackets(xF);
	return xF
}

// node.js export
if (typeof module ==  "object") {
	module.exports = {
		mgConfig:	mgConfig,
		Cv:			Cv,
		Cs:			Cs,
		funcMap:	funcMap,
		parseParens:function(xB,bSym) {return parseParens(xB,bSym)},
		cFunc:		function(expression) {return cFunc(expression)},	
		mgExport:	function(expression) {return mgExport(expression)},
		htmlExport:	function(expression) {return htmlExport(expression)},
		texExport:	function(expression) {return texExport(expression)},
		texImport:	function(expression) {return texImport(expression)},
		mgTranslate:function(expression,scale) {return mgTranslate(expression,scale)},
		mgOutput:   function(expression,scale) {return mgOutput(expression,scale)},
	}
}
//