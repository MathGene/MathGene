/*
    MathGene Translation/Rendering Library - Version 1.30
    Copyright (C) 2019  George J. Paulos

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
        html:   "<span title='MathGene HTML' style='font-family:"+mgConfig.htmlFont+";font-size:"+scale+"%'>"+htmlExport(mgFmt)+"</span>",
        latex:  texExport(mgFmt),
        mg:     mgFmt,
        log:    calcLog,
        }
}
function mgOutput(expression,scale) { //output MG, HTML, and LaTex from MG without LaTex import
    if (typeof scale == "undefined") {scale = 100}
    return {
        html:   "<span title='MathGene HTML' style='font-family:"+mgConfig.htmlFont+";font-size:"+scale+"%'>"+htmlExport(expression)+"</span>",
        latex:  texExport(expression),
        mg:     expression,
        log:    calcLog,
        }
}

// internal objects
var mgConfig =
{
    trigBase:   1,          //trig base 1=radians. Math.pi/180 for degrees, Math.pi/200 gradians
    divScale:   85,         //default scale factor for x/y division in percent
    divSymbol:  "Over",     //default HTML divide symbol "Slash" or "Over"
    fnFmt: "    fn x",      //function format "fn(x)" or "fn x"
    invFmt:     "asin",     //inverse trig function format "asin" or "sin<sup>-1</sup>"
    cplxFmt:    "Rect",     //complex numbers "Rect" or "Polar"
    pctFactor:  100,        //percent factor 100 for percent, 1 for n.nn decimal
    dPrecision: 16,         //decimal precision
    Domain:     "Complex",  //domain Complex or Real
    editMode:   false,      //edit mode formatting
    htmlFont:   "Times,Serif", //default HTML font-family
    calcLogLevel: 0         //calculation logger level
}
var calcLog = []; //calculation log
var Cv = new Array(11000); //symbol array
var Cs = new Array(11000); //symbol rendering
var Cd = new Array(50); //constant description
var Cu = new Array(50); //constant units

//Initialize constants
Cv[0] = 7.2973525698e-3;    Cu[0]="";               Cs[0]="&#945;";                                         Cd[0]="fine structure const";
Cv[1] = 5.2917721092e-11;   Cu[1]="m";              Cs[1]="&#945;<span style='font-size:50%'>0</span>";     Cd[1]="Bohr radius";
Cv[2] = 2.8977721e-3;       Cu[2]="m&#8226;K";      Cs[2]="<i>b</i>";                                       Cd[2]="Wein displacement const.";
Cv[3] = 299792458;          Cu[3]="m/s";            Cs[3]="<i>c</i>";                                       Cd[3]="speed of light";
Cv[4] = 0.577215664901532;  Cu[4]="";               Cs[4]="&#947;";                                         Cd[4]="Euler–Mascheroni constant";

Cv[5] = 3.74177153e-16;     Cu[5]="W/m&#178;";      Cs[5]="c<span style='font-size:50%'>1</span>";          Cd[5]="1<sup>st</sup> radiation constant";
Cv[6] = 1.4387770e-2;       Cu[6]="m&#8226;K";      Cs[6]="c<span style='font-size:50%'>2</span>";          Cd[6]="2<sup>nd</sup> radiation constant";
Cv[7] = 8.854187817e-12;    Cu[7]="F/m";            Cs[7]="&#949;<span style='font-size:50%'>0</span>";     Cd[7]="vacuum permittivity";
Cv[8] = 2.718281828459045;  Cu[8]="";               Cs[8]="<i>e</i>";                                       Cd[8]="Euler constant";
Cv[9] = 1.602176565e-19;    Cu[9]="J";              Cs[9]="eV";                                             Cd[9]="electron volt";

Cv[10] = 96485.3365;        Cu[10]="C/mol";         Cs[10]="<i>F</i>";                                      Cd[10]="Faraday constant";
Cv[11] = 6.67384e-11;       Cu[11]="m&#179;/kg&#8226;s&#178;";Cs[11]="<i>G</i>";                            Cd[11]="Newton constant";
Cv[12] = 9.80665;           Cu[12]="m/s&#178;";     Cs[12]="g";                                             Cd[12]="Earth gravity accel";
Cv[13] = 7.7480917346e-5;   Cu[13]="s";             Cs[13]="<i>G<span style='font-size:50%'>0</span><i>";   Cd[13]="conductance quantum";
Cv[14] = 6.62606957e-34;    Cu[14]="J&#8226;s";     Cs[14]="<i>h</i>";                                      Cd[14]="Planck constant";

Cv[15] = 1.054571726e-34;   Cu[15]="J&#8226;s";     Cs[15]="<i>&#295;</i>";                                 Cd[15]="<i>h</i>/2&#295;";
Cv[16] = 483597.870e9;      Cu[16]="Hz/V";          Cs[16]="<i>K<span style='font-size:50%'>j</span></i>";  Cd[16]="Josephson constant";
Cv[17] = 1.3806488e-23;     Cu[17]="J/K";           Cs[17]="k";                                             Cd[17]="Boltzmann constant";
Cv[18] = 2.4263102389e-12;  Cu[18]="m";             Cs[18]="&#955;";                                        Cd[18]="Compton wavelength";
Cv[19] = 1.616199e-35;      Cu[19]="m";             Cs[19]="<i>l</i><span style='font-size:50%'>P</span>";  Cd[19]="Planck length";

Cv[20] = 12.566370614e-7;   Cu[20]="N/A&#178;";     Cs[20]="&#956;<span style='font-size:50%'>0</span>";    Cd[20]="vacuum permeability";
Cv[21] = 927.400968e-26;    Cu[21]="J/T";           Cs[21]="&#956;<span style='font-size:50%'>B</span>";    Cd[21]="Bohr magneton";
Cv[22] = 9.10938291e-31;    Cu[22]="kg";            Cs[22]="<i>M<span style='font-size:50%'>e</span></i>";  Cd[22]="electron mass";
Cv[23] = 1.672621777e-27;   Cu[23]="kg";            Cs[23]="<i>M<span style='font-size:50%'>p</span></i>";  Cd[23]="proton mass";
Cv[24] = 1.674927351e-27;   Cu[24]="kg";            Cs[24]="<i>M<span style='font-size:50%'>n</span></i>";  Cd[24]="neutron mass";

Cv[25] = 2.17651e-8;        Cu[25]="kg";            Cs[25]="<i>M<span style='font-size:50%'>P</span></i>";  Cd[25]="Planck mass";
Cv[26] = 1.660538921e-27;   Cu[26]="kg";            Cs[26]="<i>M<span style='font-size:50%'>u</span></i>";  Cd[26]="atomic mass constant";
Cv[27] = 6.02214129e23;     Cu[27]="/mol";          Cs[27]="<i>N<span style='font-size:50%'>a</span></i>";  Cd[27]="Avogadro constant";
Cv[28] = 2.6867805e25;      Cu[28]="m&#179;";       Cs[28]="n<span style='font-size:50%'>0</span>";         Cd[28]="Loschmidt constant";
Cv[29] = 3.141592653589793; Cu[29]="";              Cs[29]="&#960;";                                        Cd[29]="Archimedes constant";

Cv[30] = 6.283185307179586; Cu[30]="";              Cs[30]="2&#960;";                                       Cd[30]="2&times;&#960;";
Cv[31] = 1.61803398874989;  Cu[31]="";              Cs[31]="&#966;";                                        Cd[31]="golden ratio";
Cv[32] = 2.0678346161e-15;  Cu[32]="Wb";            Cs[32]="&#966;<span style='font-size:50%'>0</span>";    Cd[32]="magnetic flux quantum";
Cv[33] = 101325;            Cu[33]="Pa";            Cs[33]="<i>P<span style='font-size:50%'>atm</span></i>";Cd[33]="standard pressure";
Cv[34] = 1.602176566e-19;   Cu[34]="C";             Cs[34]="q<span style='font-size:50%'>e</span>";         Cd[34]="elementary charge";

Cv[35] = 8.3144621;         Cu[35]="J/mol&#8226;K"; Cs[35]="<i>R<span style='font-size:50%'>c</span></i>";  Cd[35]="Universal gas constant";
Cv[36] = 25812.8074434;     Cu[36]="&#937;";        Cs[36]="<i>R<span style='font-size:50%'>k</span></i>";  Cd[36]="von Klitzing constant";
Cv[37] = 10973731.568539;   Cu[37]="/m";            Cs[37]="<i>R<span style='font-size:50%'>&#8734;</span></i>";Cd[37]="Rydberg constant";
Cv[38] = 2.8179403267e-15;  Cu[38]="m";             Cs[38]="r<span style='font-size:50%'>e</span>";         Cd[38]="classical electron radius";
Cv[39] = 5.670373e-8;       Cu[39]="W/m&#178;&#8226;K&#8308;";Cs[39]="&#963;";                              Cd[39]="Stefan-Boltzmann";

Cv[40] = 1.416833e32;       Cu[40]="K";             Cs[40]="<i>T<span style='font-size:50%'>P</span></i>";  Cd[40]="Planck temperature";
Cv[41] = 5.39106e-44;       Cu[41]="s";             Cs[41]="<i>t</i><span style='font-size:50%'>P</span>";  Cd[41]="Planck time";
Cv[42] = 2.241409e-2;       Cu[42]="m&#179;/mol";   Cs[42]="<i>V<span style='font-size:50%'>m</span></i>";  Cd[42]="molar volume";
Cv[43] = 376.730313461;     Cu[43]="&#937;";        Cs[43]="<i>Z<span style='font-size:50%'>0</span></i>";  Cd[43]="vacuum impedance";
Cv[44] = 0;                 Cu[44]="";              Cs[44]="0";                                             Cd[44]="Null";

Cv[45] = {r:1, i:0, s:"!"};             Cs[45]="!";
Cv[46] = {r:0, i:1};                    Cs[46] = "<i>i</i>";
Cv[8230] = 0;
Cv[8734] = "Infinity";

//initialize symbols
var iAl = 0;
for (iAl=47;iAl<10000;iAl++)    {Cs[iAl]="&#"+(iAl)+";"}
for (iAl=58;iAl<=127;iAl++)     {Cs[iAl]=String.fromCharCode(iAl)}//ascii
for (iAl=48;iAl<=57;iAl++)      {Cs[iAl]="<i>"+String.fromCharCode(iAl)+"</i>"}//0-9
for (iAl=65;iAl<=90;iAl++)      {Cs[iAl]="<b>"+String.fromCharCode(iAl)+"</b>"}//A-Z bold
for (iAl=97;iAl<=122;iAl++)     {Cs[iAl]="<b>"+String.fromCharCode(iAl)+"</b>"}//a-z bold
for (iAl=10032;iAl<=10047;iAl++){Cs[iAl]=String.fromCharCode(iAl-10000)}//punc
for (iAl=10065;iAl<=10090;iAl++){Cs[iAl]="<i>"+String.fromCharCode(iAl-10000)+"</i>"}//A-Z italic
for (iAl=10097;iAl<=10122;iAl++){Cs[iAl]="<i>"+String.fromCharCode(iAl-10000)+"</i>"}//a-z italic
for (iAl=10768;iAl<=10879;iAl++){Cs[iAl]="<i>&#"+(iAl-10000)+";</i>"}//italic accents
Cs[11100]="<i>C</i>";//constants of integration
for (iAl=11101;iAl<=11110;iAl++) {Cs[iAl]="<i>C<sub>"+(iAl-11100)+"</sub></i>"}//constants of integration
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
sin:{
    htmlL1: function (parm) {return '<Xfnc>sin<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>sin<Xfxp> '+parm[0]},
    htmlR2:' ',
    trig:true,
    invfunc:'asn',
    texfunc:'\\sin',
    latexL1: function (parm) {return '\\sin(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\sin<Xfxp> {'+parm[0]},
    latexR2:'}',
    mg: function (parm) {return 'sin('+parm[0]+')'},
    },
cos:{
    htmlL1: function (parm) {return '<Xfnc>cos<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>cos<Xfxp> '+parm[0]},
    htmlR2:' ',
    trig:true,
    invfunc:'acs',
    texfunc:'\\cos',
    latexL1: function (parm) {return '\\cos(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\cos<Xfxp> {'+parm[0]},
    latexR2:'}',
    mg: function (parm) {return 'cos('+parm[0]+')'},
    },
tan:{
    htmlL1: function (parm) {return '<Xfnc>tan<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>tan<Xfxp> '+parm[0]},
    htmlR2:' ',
    trig:true,
    invfunc:'atn',
    texfunc:'\\tan',
    latexL1: function (parm) {return '\\tan(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\tan<Xfxp> {'+parm[0]},
    latexR2:'}',
    mg: function (parm) {return 'tan('+parm[0]+')'},
    },
sec:{
    htmlL1: function (parm) {return '<Xfnc>sec<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>sec<Xfxp> '+parm[0]},
    htmlR2:' ',
    trig:true,
    invfunc:'asc',
    texfunc:'\\sec',
    latexL1: function (parm) {return '\\sec(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\sec<Xfxp> {'+parm[0]},
    latexR2:'}',
    mg: function (parm) {return 'sec('+parm[0]+')'},
    },
csc:{
    htmlL1: function (parm) {return '<Xfnc>csc<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>csc<Xfxp> '+parm[0]},
    htmlR2:' ',
    trig:true,
    invfunc:'acc',
    texfunc:'\\csc',
    latexL1: function (parm) {return '\\csc(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\csc<Xfxp> {'+parm[0]},
    latexR2:'}',
    mg:  function (parm) {return 'csc('+parm[0]+')'},
    },
cot:{
    htmlL1: function (parm) {return '<Xfnc>cot<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>cot<Xfxp> '+parm[0]},
    htmlR2:' ',
    trig:true,
    invfunc:'act',
    texfunc:'\\cot',
    latexL1: function (parm) {return '\\cot(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\cot<Xfxp> {'+parm[0]},
    latexR2:'}',
    mg: function (parm) {return 'cot('+parm[0]+')'},
    },
snh:{
    htmlL1: function (parm) {return '<Xfnc>sinh<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>sinh<Xfxp> '+parm[0]},
    htmlR2:' ',
    trig:true,
    invfunc:'ash',
    texfunc:'\\sinh',
    latexL1: function (parm) {return '\\sinh(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\sinh<Xfxp> {'+parm[0]},
    latexR2:'}',
    mg: function (parm) {return 'snh('+parm[0]+')'},
    },
csh:{
    htmlL1: function (parm) {return '<Xfnc>cosh<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>cosh<Xfxp> '+parm[0]},
    htmlR2:' ',
    trig:true,
    invfunc:'ach',
    texfunc:'\\cosh',
    latexL1: function (parm) {return '\\cosh(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\cosh<Xfxp> {'+parm[0]},
    latexR2:'}',
    mg:  function (parm) {return 'csh('+parm[0]+')'},
    },
tnh:{
    htmlL1: function (parm) {return '<Xfnc>tanh<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>tanh<Xfxp> '+parm[0]},
    htmlR2:' ',
    trig:true,
    invfunc:'ath',
    texfunc:'\\tanh',
    latexL1: function (parm) {return '\\tanh(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\tanh<Xfxp> {'+parm[0]},
    latexR2:'}',
    mg: function (parm) {return 'tnh('+parm[0]+')'},
    },
sch:{
    htmlL1: function (parm) {return '<Xfnc>sech<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>sech<Xfxp> '+parm[0]},
    htmlR2:' ',
    trig:true,
    invfunc:'axh',
    texfunc:'\\sech',
    latexL1: function (parm) {return '\\sech(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\sech<Xfxp> {'+parm[0]},
    latexR2:'}',
    mg:  function (parm) {return 'sch('+parm[0]+')'},
    },
cch:{
    htmlL1: function (parm) {return '<Xfnc>csch<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>csch<Xfxp> '+parm[0]},
    htmlR2:' ',
    trig:true,
    invfunc:'ayh',
    texfunc:'\\csch',
    latexL1: function (parm) {return '\\csch(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\csch<Xfxp> {'+parm[0]},
    latexR2:'}',
    mg:  function (parm) {return 'cch('+parm[0]+')'},
    },
cth:{
    htmlL1: function (parm) {return '<Xfnc>coth<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>coth<Xfxp> '+parm[0]},
    htmlR2:' ',
    trig:true,
    invfunc:'azh',
    texfunc:'\\coth',
    latexL1: function (parm) {return '\\coth(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\coth<Xfxp> {'+parm[0]},
    latexR2:'}',
    mg: function (parm) {return 'cth('+parm[0]+')'},
    },
asn:{
    htmlL1: function (parm) {return '<Xfnc>asin<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>asin '+parm[0]},
    htmlR2:' <Xfxp>',
    htmlInv1: function (parm) {return '<Xfnc>sin<sup>-1</sup><Xfnx>('+parm[0]},
    htmlInv2: function (parm) {return '<Xfnc>sin<sup>-1</sup> <Xfnx>'+parm[0]},
    texfunc:'\\arcsin',
    latexL1: function (parm) {return '\\arcsin(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\arcsin {'+parm[0]},
    latexR2:'}',
    latexInv1: function (parm) {return '\\sin^{-1}(<Xfnx>'+parm[0]},
    latexInv2: function (parm) {return '\\sin^{-1} {'+parm[0]},
    mg:  function (parm) {return 'asn('+parm[0]+')'},
    },
acs:{
    htmlL1: function (parm) {return '<Xfnc>acos<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>acos '+parm[0]},
    htmlR2:' <Xfxp>',
    htmlInv1: function (parm) {return '<Xfnc>cos<sup>-1</sup><Xfnx>('+parm[0]},
    htmlInv2: function (parm) {return '<Xfnc>cos<sup>-1</sup> <Xfnx>'+parm[0]},
    texfunc:'\\arccos',
    latexL1: function (parm) {return '\\arccos(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\arccos {'+parm[0]},
    latexR2:'}',
    latexInv1: function (parm) {return '\\cos^{-1}(<Xfnx>'+parm[0]},
    latexInv2: function (parm) {return '\\cos^{-1} {'+parm[0]},
    mg: function (parm) {return 'acs('+parm[0]+')'},
    },
atn:{
    htmlL1: function (parm) {return '<Xfnc>atan<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>atan '+parm[0]},
    htmlR2:' <Xfxp>',
    htmlInv1: function (parm) {return '<Xfnc>tan<sup>-1</sup><Xfnx>('+parm[0]},
    htmlInv2: function (parm) {return '<Xfnc>tan<sup>-1</sup> <Xfnx>'+parm[0]},
    texfunc:'\\arctan',
    latexL1: function (parm) {return '\\arctan(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\arctan {'+parm[0]},
    latexR2:'}',
    latexInv1: function (parm) {return '\\tan^{-1}(<Xfnx>'+parm[0]},
    latexInv2: function (parm) {return '\\tan^{-1} {'+parm[0]},
    mg:  function (parm) {return 'atn('+parm[0]+')'},
    },
asc:{
    htmlL1: function (parm) {return '<Xfnc>asec<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>asec '+parm[0]},
    htmlR2:' <Xfxp>',
    htmlInv1: function (parm) {return '<Xfnc>sec<sup>-1</sup><Xfnx>('+parm[0]},
    htmlInv2: function (parm) {return '<Xfnc>sec<sup>-1</sup> <Xfnx>'+parm[0]},
    texfunc:'\\arcsec',
    latexL1: function (parm) {return '\\arcsec(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\arcsec {'+parm[0]},
    latexR2:'}',
    latexInv1: function (parm) {return '\\sec^{-1}(<Xfnx>'+parm[0]},
    latexInv2: function (parm) {return '\\sec^{-1} {'+parm[0]},
    mg: function (parm) {return 'asc('+parm[0]+')'},
    },
acc:{
    htmlL1: function (parm) {return '<Xfnc>acsc<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>acsc '+parm[0]},
    htmlR2:' <Xfxp>',
    htmlInv1: function (parm) {return '<Xfnc>csc<sup>-1</sup><Xfnx>('+parm[0]},
    htmlInv2: function (parm) {return '<Xfnc>csc<sup>-1</sup> <Xfnx>'+parm[0]},
    texfunc:'\\arccsc',
    latexL1: function (parm) {return '\\arccsc(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\arccsc {'+parm[0]},
    latexR2:'}',
    latexInv1: function (parm) {return '\\csc^{-1}(<Xfnx>'+parm[0]},
    latexInv2: function (parm) {return '\\csc^{-1} {'+parm[0]},
    mg: function (parm) {return 'acc('+parm[0]+')'},
    },
act:{
    htmlL1: function (parm) {return '<Xfnc>acot<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>acot '+parm[0]},
    htmlR2:' <Xfxp>',
    htmlInv1: function (parm) {return '<Xfnc>cot<sup>-1</sup><Xfnx>('+parm[0]},
    htmlInv2: function (parm) {return '<Xfnc>cot<sup>-1</sup> <Xfnx>'+parm[0]},
    texfunc:'\\arccot',
    latexL1: function (parm) {return '\\arccot(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\arccot {'+parm[0]},
    latexR2:'}',
    latexInv1: function (parm) {return '\\cot^{-1}(<Xfnx>'+parm[0]},
    latexInv2: function (parm) {return '\\cot^{-1} {'+parm[0]},
    mg: function (parm) {return 'act('+parm[0]+')'},
    },
ash:{
    htmlL1: function (parm) {return '<Xfnc>asinh<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>asinh '+parm[0]},
    htmlR2:' <Xfxp>',
    htmlInv1: function (parm) {return '<Xfnc>sinh<sup>-1</sup><Xfnx>('+parm[0]},
    htmlInv2: function (parm) {return '<Xfnc>sinh<sup>-1</sup> <Xfnx>'+parm[0]},
    texfunc:'\\arcsinh',
    latexL1: function (parm) {return '\\arcsinh(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\arcsinh {'+parm[0]},
    latexR2:'}',
    latexInv1: function (parm) {return '\\sinh^{-1}(<Xfnx>'+parm[0]},
    latexInv2: function (parm) {return '\\sinh^{-1} {'+parm[0]},
    mg:  function (parm) {return 'ash('+parm[0]+')'},
    },
ach:{
    htmlL1: function (parm) {return '<Xfnc>acosh<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>acosh '+parm[0]},
    htmlR2:' <Xfxp>',
    htmlInv1: function (parm) {return '<Xfnc>cosh<sup>-1</sup><Xfnx>('+parm[0]},
    htmlInv2: function (parm) {return '<Xfnc>cosh<sup>-1</sup> <Xfnx>'+parm[0]},
    texfunc:'\\arccosh',
    latexL1: function (parm) {return '\\arccosh(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\arccosh {'+parm[0]},
    latexR2:'}',
    latexInv1: function (parm) {return '\\cosh^{-1}(<Xfnx>'+parm[0]},
    latexInv2: function (parm) {return '\\cosh^{-1} {'+parm[0]},
    mg: function (parm) {return 'ach('+parm[0]+')'},
    },
ath:{
    htmlL1: function (parm) {return '<Xfnc>atanh<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>atanh '+parm[0]},
    htmlR2:' <Xfxp>',
    htmlInv1: function (parm) {return '<Xfnc>tanh<sup>-1</sup><Xfnx>('+parm[0]},
    htmlInv2: function (parm) {return '<Xfnc>tanh<sup>-1</sup> <Xfnx>'+parm[0]},
    texfunc:'\\arctanh',
    latexL1: function (parm) {return '\\arctanh(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\arctanh {'+parm[0]},
    latexR2:'}',
    latexInv1: function (parm) {return '\\tanh^{-1}(<Xfnx>'+parm[0]},
    latexInv2: function (parm) {return '\\tanh^{-1} {'+parm[0]},
    mg: function (parm) {return 'ath('+parm[0]+')'},
    },
axh:{
    htmlL1: function (parm) {return '<Xfnc>asech<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>asech '+parm[0]},
    htmlR2:' <Xfxp>',
    htmlInv1: function (parm) {return '<Xfnc>sech<sup>-1</sup><Xfnx>('+parm[0]},
    htmlInv2: function (parm) {return '<Xfnc>sech<sup>-1</sup> <Xfnx>'+parm[0]},
    texfunc:'\\arcsech',
    latexL1: function (parm) {return '\\arcsech(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\arcsech {'+parm[0]},
    latexR2:'}',
    latexInv1: function (parm) {return '\\sech^{-1}(<Xfnx>'+parm[0]},
    latexInv2: function (parm) {return '\\sech^{-1} {'+parm[0]},
    mg: function (parm) {return 'axh('+parm[0]+')'},
    },
ayh:{
    htmlL1: function (parm) {return '<Xfnc>acsch<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>acsch '+parm[0]},
    htmlR2:' <Xfxp>',
    htmlInv1: function (parm) {return '<Xfnc>csch<sup>-1</sup><Xfnx>('+parm[0]},
    htmlInv2: function (parm) {return '<Xfnc>csch<sup>-1</sup> <Xfnx>'+parm[0]},
    texfunc:'\\arccsch',
    latexL1: function (parm) {return '\\arccsch(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\arccsch {'+parm[0]},
    latexR2:'}',
    latexInv1: function (parm) {return '\\csch^{-1}(<Xfnx>'+parm[0]},
    latexInv2: function (parm) {return '\\csch^{-1} {'+parm[0]},
    mg: function (parm) {return 'ayh('+parm[0]+')'},
    },
azh:{
    htmlL1: function (parm) {return '<Xfnc>acoth<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>acoth '+parm[0]},
    htmlR2:' <Xfxp>',
    htmlInv1: function (parm) {return '<Xfnc>coth<sup>-1</sup><Xfnx>('+parm[0]},
    htmlInv2: function (parm) {return '<Xfnc>coth<sup>-1</sup> <Xfnx>'+parm[0]},
    texfunc:'\\arccoth',
    latexL1: function (parm) {return '\\arccoth(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\arccoth {'+parm[0]},
    latexR2:'}',
    latexInv1: function (parm) {return '\\coth^{-1}(<Xfnx>'+parm[0]},
    latexInv2: function (parm) {return '\\coth^{-1} {'+parm[0]},
    mg: function (parm) {return 'azh('+parm[0]+')'},
    },
sqt:{ //square root
    htmlL1: function (parm,strg) {return htmlFuncs['radL'](0,strg)+parm[0]},
    htmlR1: function () {return htmlFuncs['radR']()},
    htmlL2: function (parm,strg) {return funcMap['sqt']['htmlL1'](parm,strg)},
    htmlR2: function () {return htmlFuncs['radR']()},
    texfunc:'\\sqrt',
    latexL1: function (parm) {return '\\sqrt{'+parm[0]},
    latexR1:'}',
    latexL2: function (parm) {return '\\sqrt{'+parm[0]},
    latexR2:'}',
    mg: function (parm) {return 'sqt('+parm[0]+')'},
    },
cbt:{  //cube root
    htmlL1: function (parm,strg) {return htmlFuncs['radL'](1,strg)+parm[0]},
    htmlR1: function () {return htmlFuncs['radR']()},
    htmlL2: function (parm,strg) {return funcMap['cbt']['htmlL1'](parm,strg)},
    htmlR2: function () {return htmlFuncs['radR']()},
    texfunc:'\\sqrt[3]',
    latexL1: function (parm) {return '\\sqrt[3]{'+parm[0]},
    latexR1:'}',
    latexL2: function (parm) {return '\\sqrt[3]{'+parm[0]},
    latexR2:'}',
    mg: function (parm) {return 'cbt('+parm[0]+')'},
    },
nrt:{ //nth root
    htmlL1: function (parm,strg) {return htmlFuncs['radL'](2,strg,parm[0])+parm[1]},
    htmlR1: function () {return htmlFuncs['radR']()},
    htmlL2: function (parm,strg) {return funcMap['nrt']['htmlL1'](parm,strg)},
    htmlR2: function () {return htmlFuncs['radR']()},
    texfunc:'\\sqrt[]',
    latexL1: function (parm) {return '\\sqrt['+parm[0]+']{'+parm[1]},
    latexR1:'}',
    latexL2: function (parm) {return '\\sqrt['+parm[0]+']{'+parm[1]},
    latexR2:'}',
    mg: function (parm) {return 'nrt('+parm[0]+','+parm[1]+')'},
    },
lgn:{ //nth log
    htmlL1: function (parm) {return '<Xfnc>log<sub>'+parm[0]+'</sub><Xfnx>('+parm[1]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>log<sub>'+parm[0]+'</sub> '+parm[1]},
    htmlR2:' <Xfxp>',
    texfunc:'\\log_',
    latexL1: function (parm) {return '\\log_{'+parm[0]+'}(<Xfnx>'+parm[1]},
    latexR1:')',
    latexL2: function (parm) {return '\\log_{'+parm[0]+'}{'+parm[1]},
    latexR2:'}<Xfxp>',
    mg: function (parm) {return 'lgn('+parm[0]+','+parm[1]+')'},
    },
log:{ //natural log
    htmlL1: function (parm) {return '<Xfnc>log<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>log '+parm[0]},
    htmlR2:' <Xfxp>',
    texfunc:'\\log',
    latexL1: function (parm) {return '\\log(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\log {'+parm[0]},
    latexR2:'}<Xfxp>',
    mg: function (parm) {return 'log('+parm[0]+')'},
    },
lne:{ //natural log
    htmlL1: function (parm) {return '<Xfnc>ln<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>ln '+parm[0]},
    htmlR2:' <Xfxp>',
    texfunc:'\\ln',
    latexL1: function (parm) {return '\\ln(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\ln {'+parm[0]},
    latexR2:'}<Xfxp>',
    mg: function (parm) {return 'lne('+parm[0]+')'},
    },
int:{ //integer component
    htmlL1: function (parm,strg) {return htmlFuncs['brkt']('&#8970;',strg)+parm[0]},
    htmlR1: function (parm,strg) {return htmlFuncs['brkt']('&#8971;',strg)},
    htmlL2: function (parm,strg) {return htmlFuncs['brkt']('&#8970;',strg)+parm[0]},
    htmlR2: function (parm,strg) {return htmlFuncs['brkt']('&#8971;',strg)},
    texfunc:'\\lfloor',
    latexL1: function (parm) {return '\\left\\lfloor '+parm[0]},
    latexR1:'\\right\\rfloor ',
    latexL2: function (parm) {return '\\left\\lfloor '+parm[0]},
    latexR2:'\\right\\rfloor ',
    mg: function (parm) {return 'int('+parm[0]+')'},
    },
cei:{  //ceiling
    htmlL1: function (parm,strg) {return htmlFuncs['brkt']('&#8968;',strg)+parm[0]},
    htmlR1: function (parm,strg) {return htmlFuncs['brkt']('&#8969;',strg)},
    htmlL2: function (parm,strg) {return htmlFuncs['brkt']('&#8968;',strg)+parm[0]},
    htmlR2: function (parm,strg) {return htmlFuncs['brkt']('&#8969;',strg)},
    texfunc:'\\XXX',
    latexL1: function (parm) {return '\\left\\lceil '+parm[0]},
    latexR1:'\\right\\rceil ',
    latexL2: function (parm) {return '\\left\\lceil '+parm[0]},
    latexR2:'\\right\\rceil ',
    mg:  function (parm) {return 'cei('+parm[0]+')'},
    },
abs:{ //absolute value
    htmlL1: function (parm,strg) {return htmlFuncs['brkt']('&#124;',strg)+parm[0]},
    htmlR1: function (parm,strg) {return htmlFuncs['brkt']('&#124;',strg)},
    htmlL2: function (parm,strg) {return htmlFuncs['brkt']('&#124;',strg)+parm[0]},
    htmlR2: function (parm,strg) {return htmlFuncs['brkt']('&#124;',strg)},
    texfunc:'\\|',
    latexL1:'\\left|',
    latexR1: function (parm,strg) {return '\\right|'+parm[0]},
    latexL2:'\\left|',
    latexR2: function (parm,strg) {return '\\right|'+parm[0]},
    mg: function (parm,strg) {return 'abs('+parm[0]+')'},
    },
erf:{ //error function
    htmlL1: function (parm) {return '<Xfnc>erf<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>erf<Xfnx>('+parm[0]},
    htmlR2:')<Xfxp>',
    texfunc:'\\erf',
    latexL1: function (parm) {return '\\erf('+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\erf('+parm[0]},
    latexR2:')<Xfxp>',
    mg: function (parm) {return 'erf('+parm[0]+')'},
    },
efc:{  //inverse error function
    htmlL1: function (parm) {return '<Xfnc>erfc<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>erfc<Xfnx>('+parm[0]},
    htmlR2:')',
    texfunc:'\\erfc',
    latexL1: function (parm) {return '\\erfc('+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\erfc('+parm[0]},
    latexR2:')',
    mg: function (parm) {return 'efc('+parm[0]+')'},
    },
arg:{  //arg
    htmlL1: function (parm) {return '<Xfnc>arg<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>arg<Xfnx>('+parm[0]},
    htmlR2:')<Xfxp>',
    texfunc:'\\arg',
    latexL1: function (parm) {return '\\arg(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\arg {'+parm[0]},
    latexR2:'}<Xfxp>',
    mg: function (parm) {return 'arg('+parm[0]+')'},
    },
exp:{ //e^x
    htmlL1: function (parm) {return '<Xfnc>exp<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>exp<Xfnx>('+parm[0]},
    htmlR2:')<Xfxp>',
    texfunc:'\\exp',
    latexL1: function (parm) {return '\\exp(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\exp(<Xfnx>'+parm[0]},
    latexR2:'}<Xfxp>',
    mg: function (parm) {return 'exp('+parm[0]+')'},
    },
con:{ //conjugate
    htmlL1: function (parm) {return "<Xfnc><span style='border-top-style:solid;border-top-width:2px;padding:4px;font-size:90%'>"+parm[0]},
    htmlR1:'</span>',
    htmlL2: function (parm) {return funcMap['con']['htmlL1'](parm)},
    htmlR2:'</span>',
    texfunc:'\\overline',
    latexL1: function (parm) {return '\\overline{'+parm[0]},
    latexR1:'}',
    latexL2: function (parm) {return '\\overline{'+parm[0]},
    latexR2:'}',
    mg: function (parm) {return 'con('+parm[0]+')'},
    },
gam:{ //gamma
    htmlL1: function (parm) {return '<Xfnc>&#915;<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>&#915;<Xfnx>('+parm[0]},
    htmlR2:')',
    texfunc:'\\XXX',
    latexL1: function (parm) {return '\\Gamma(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\Gamma(<Xfnx>'+parm[0]},
    latexR2:')',
    mg: function (parm) {return 'gam('+parm[0]+')'},
    },
cdf:{  //cumulative density function
    htmlL1: function (parm) {return '<Xfnc>&#934;<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>&#934;<Xfnx>('+parm[0]},
    htmlR2:')',
    texfunc:'\\XXX',
    latexL1: function (parm) {return '\\Phi(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\Phi(<Xfnx>'+parm[0]},
    latexR2:')',
    mg: function (parm) {return 'cdf('+parm[0]+')'},
    },
pdf:{ //probability density function
    htmlL1: function (parm) {return '<Xfnc>&#966;<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>&#966;<Xfnx>('+parm[0]},
    htmlR2:')',
    texfunc:'\\XXX',
    latexL1: function (parm) {return '\\phi(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\phi(<Xfnx>'+parm[0]},
    latexR2:')',
    mg: function (parm) {return 'pdf('+parm[0]+')'},
    },
lcf:{ //log cumulative density function
    htmlL1: function (parm) {return '<Xfnc>&#934;<sub><i>ln</i></sub><Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>&#934;<sub><i>ln</i></sub><Xfnx>('+parm[0]},
    htmlR2:')',
    texfunc:'\\XXX',
    latexL1: function (parm) {return '\\Phi_ln(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\Phi_ln(<Xfnx>'+parm[0]},
    latexR2:')',
    mg: function (parm) {return 'lcf('+parm[0]+')'},
    },
lpf:{ //log probability density function
    htmlL1: function (parm) {return '<Xfnc>&#966;<sub><i>ln</i></sub><Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>&#966;<sub><i>ln</i></sub><Xfnx>('+parm[0]},
    htmlR2:')',
    texfunc:'\\XXX',
    latexL1: function (parm) {return '\\phi_ln(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\phi_ln(<Xfnx>'+parm[0]},
    latexR2:')',
    mg: function (parm) {return 'lpf('+parm[0]+')'},
    },
rou:{  //round to nearest int
    htmlL1: function (parm) {return '<Xfnc>rou<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>rou<Xfnx>('+parm[0]},
    htmlR2:')',
    texfunc:'\\XXX',
    latexL1: function (parm) {return '\\rou(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\rou(<Xfnx>'+parm[0]},
    latexR2:')',
    mg: function (parm) {return 'rou('+parm[0]+')'},
    },
rnd:{  //random number
    htmlL1: function (parm) {return '<Xfnc>rnd<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>rnd<Xfnx>('+parm[0]},
    htmlR2:')',
    texfunc:'\\XXX',
    latexL1: function (parm) {return '\\rnd(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\rnd(<Xfnx>'+parm[0]},
    latexR2:')',
    mg: function (parm) {return 'rnd('+parm[0]+')'},
    },
rex:{  //real component
    htmlL1: function (parm) {return '<Xfnc>Re<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>Re<Xfnx>('+parm[0]},
    htmlR2:')',
    texfunc:'\\XXX',
    latexL1: function (parm) {return '\\Re(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\Re(<Xfnx>'+parm[0]},
    latexR2:'}',
    mg: function (parm) {return 'rex('+parm[0]+')'},
    },
imx:{  //imaginary component
    htmlL1: function (parm) {return '<Xfnc>Im<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>Im<Xfnx>('+parm[0]},
    htmlR2:')',
    texfunc:'\\XXX',
    latexL1: function (parm) {return '\\Im(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\Im(<Xfnx>'+parm[0]},
    latexR2:')',
    mg: function (parm) {return 'imx('+parm[0]+')'},
    },
frc:{  //decimal component
    htmlL1: function (parm) {return '<Xfnc>frac<Xfnx>('+parm[0]},
    htmlR1:')',
    htmlL2: function (parm) {return '<Xfnc>frac<Xfnx>('+parm[0]},
    htmlR2:')',
    texfunc:'\\XXX',
    latexL1: function (parm) {return '\\frc(<Xfnx>'+parm[0]},
    latexR1:')',
    latexL2: function (parm) {return '\\frc(<Xfnx>'+parm[0]},
    latexR2:')',
    mg: function (parm) {return 'frc('+parm[0]+')'},
    },
sbr:{ //straight bracket
    htmlL1: function (parm,strg) {return htmlFuncs['brkt']('&#91;',strg)+parm[0]},
    htmlR1: function (parm,strg) {return htmlFuncs['brkt']('&#93;',strg)},
    htmlL2: function (parm,strg) {return htmlFuncs['brkt']('&#91;',strg)+parm[0]},
    htmlR2: function (parm,strg) {return htmlFuncs['brkt']('&#93;',strg)},
    texfunc:'\\XXX',
    latexL1: function (parm) {return '\\left\\['+parm[0]},
    latexR1:'\\right\\]',
    latexL2: function (parm) {return '\\left\\['+parm[0]},
    latexR2:'\\right\\]',
    mg: function (parm) {return  'sbr('+parm[0]+')'},
    },
cbr:{  //curly bracket
    htmlL1: function (parm,strg) {return htmlFuncs['brkt']('&#123;',strg)+parm[0]},
    htmlR1: function (parm,strg) {return htmlFuncs['brkt']('&#125;',strg)},
    htmlL2: function (parm,strg) {return htmlFuncs['brkt']('&#123;',strg)+parm[0]},
    htmlR2: function (parm,strg) {return htmlFuncs['brkt']('&#125;',strg)},
    texfunc:'\\XXX',
    latexL1: function (parm) {return '\\left\\{'+parm[0]},
    latexR1:'\\right\\}',
    latexL2: function (parm) {return '\\left\\{'+parm[0]},
    latexR2:'\\right\\}',
    mg: function (parm) {return 'cbr('+parm[0]+')'},
    },
fac:{ //factorial
    htmlL1: function (parm) {return parm[0]},
    htmlR1:'!',
    htmlL2: function (parm) {return parm[0]},
    htmlR2:'!',
    texfunc:'\\XXX',
    latexL1: function (parm) {return parm[0]},
    latexR1:'!',
    latexL2: function (parm) {return parm[0]},
    latexR2:'!',
    mg: function (parm) {if (!numTest(parm[0]) && cFunc(parm[0]) != oParens(parm[0])) {return xParens(parm[0])+"Cv[45]"};return parm[0]+"Cv[45]"},
    },
sum:{ //summation
    htmlL1: function (parm) {return htmlFuncs['overUnder'](parm[0],parm[1],'&#8721;',125)},
    htmlR1:' ',
    htmlL2: function (parm) {return htmlFuncs['overUnder'](parm[0],parm[1],'&#8721;',125)},
    htmlR2:' ',
    texfunc:'\\XXX',
    latexL1: function (parm) {return '\\sum_{'+parm[1]+'}^{'+parm[0]+'}'},
    latexR1:' ',
    latexL2: function (parm) {return '\\sum_{'+parm[1]+'}^{'+parm[0]+'}'},
    latexR2:' ',
    mg: function (parm) {return 'sum('+parm[0]+','+parm[1]+')'},
    },
smm:{ //summation from FUNC
    htmlL1:'',
    htmlR1:'',
    htmlL2:'',
    htmlR2:'',
    texfunc:'\\XXX',
    latexL1:'',
    latexR1:'',
    latexL2:'',
    latexR2:'',
    mg: function (parm) {return  'sum('+parm[1]+','+parm[2]+'Cv[61]'+parm[3]+')'+parm[0]},
    },
prd:{ //product
    htmlL1: function (parm) {return htmlFuncs['overUnder'](parm[0],parm[1],'&#8719;',125)},
    htmlR1:' ',
    htmlL2: function (parm) {return htmlFuncs['overUnder'](parm[0],parm[1],'&#8719;',125)},
    htmlR2:'',
    texfunc:'\\XXX',
    latexL1: function (parm) {return '\\prod_{'+parm[1]+'}^{'+parm[0]+'}'},
    latexR1:' ',
    latexL2: function (parm) {return '\\prod_{'+parm[1]+'}^{'+parm[0]+'}'},
    latexR2:' ',
    mg: function (parm) {return 'prd('+parm[0]+','+parm[1]+')'},
    },
pmm:{ //product from FUN
    htmlL1:'',
    htmlR1:'',
    htmlL2:'',
    htmlR2:'',
    texfunc:'\\XXX',
    latexL1:'',
    latexR1:'',
    latexL2:'',
    latexR2:'',
    mg: function (parm) {return  'prd('+parm[1]+','+parm[2]+'Cv[61]'+parm[3]+')'+parm[0]},
    },
lim:{ //limit
    htmlL1: function (parm) {return "<Xfnc><span style='display:inline-block;'><span style='text-align:center;vertical-align:middle;display:inline-table;'><span style='display:table-row;font-size:40%'>&nbsp;</span><span style='line-height:50%;display:table-row;'>lim</span><span style='display:table-row;font-size:60%'>"+parm[0]+"&#8594;"+parm[1]+"</span></span></span>"},
    htmlR1:' ',
    htmlL2: function (parm) {return funcMap['lim']['htmlL1'](parm)},
    htmlR2:'',
    texfunc:'\\XXX',
    latexL1: function (parm) {return '\\lim_{'+parm[0]+' \\to '+parm[1]+'}'},
    latexR1:' ',
    latexL2: function (parm) {return '\\lim_{'+parm[0]+' \\to '+parm[1]+'}'},
    latexR2:' ',
    mg: function (parm) {return 'lim('+parm[0]+','+parm[1]+')'},
    },
lmt:{ //limit from FUNC
    htmlL1:'',
    htmlR1:'',
    htmlL2:'',
    htmlR2:'',
    texfunc:'\\XXX',
    latexL1:'',
    latexR1:'',
    latexL2:'',
    latexR2:'',
    mg: function (parm) {return 'lim('+parm[1]+','+parm[2]+')'+parm[0]},
    },
itg:{ //definite integral
    htmlL1: function (parm) {return "<Xdiv><span style='display:inline-block;vertical-align:middle;'><table cellpadding='0' cellspacing='0'><tr><td rowspan='4'><span style='vertical-align:middle;display:inline-table;'><span style='display:table-row;line-height:90%'>&#8992;</span><span style='display:table-row;line-height:90%'>&#8993;</span></span></td><tr><td style='font-size:45%'>"+parm[0]+"</td></tr><tr><td>&nbsp;</td></tr><td style='font-size:45%'>"+parm[1]+"</td></tr></table></span><Xdve>"},
    htmlR1:' ',
    htmlL2: function (parm) {return funcMap['itg']['htmlL1'](parm)},
    htmlR2:'',
    texfunc:'\\XXX',
    latexL1: function (parm) {return '\\int_{'+parm[1]+'}^{'+parm[0]+'}'},
    latexR1:' ',
    latexL2: function (parm) {return '\\int_{'+parm[1]+'}^{'+parm[0]+'}'},
    latexR2:' ',
    mg: function (parm) {return 'itg('+parm[0]+','+parm[1]+')'},
    },
drv:{ //partial derivative from func
    htmlL1:'',
    htmlR1:'',
    htmlL2:'',
    htmlR2:'',
    texfunc:'\\XXX',
    latexL1:'',
    latexR1:'',
    latexL2:'',
    latexR2:'',
    mg: function (parm) {if (typeof parm[2] == "undefined") {return "(idr("+parm[1]+")"+parm[0]+")"};return "(idr("+parm[1]+","+parm[2]+")"+parm[0]+")"},
    },
tdv:{ //total derivative from func
    htmlL1:'',
    htmlR1:'',
    htmlL2:'',
    htmlR2:'',
    texfunc:'\\XXX',
    latexL1:'',
    latexR1:'',
    latexL2:'',
    latexR2:'',
    mg: function (parm) {if (typeof parm[2] == "undefined") {return "(tdr("+parm[1]+")"+parm[0]+")"};return "(tdr("+parm[1]+","+parm[2]+")"+parm[0]+")"},
    },
tdr:{ //derivative
    htmlL1: function (parm) {return htmlFuncs['tdrL'](parm[0],parm[1])},
    htmlR1:'',
    htmlL2: function (parm) {return htmlFuncs['tdrL'](parm[0],parm[1])},
    htmlR2:'',
    texfunc:'\\XXX',
    latexL1: function (parm) {return latexFuncs['tdrX'](parm[0],parm[1])},
    latexR1:'',
    latexL2: function (parm) {return latexFuncs['tdrX'](parm[0],parm[1])},
    latexR2:'',
    mg: function (parm) {if (typeof parm[1] == "undefined") {return "tdr(" + parm[0] + ")"};return "tdr(" + parm[0] + "," + parm[1] + ")"},
    },
idr:{ //partial derivative
    htmlL1: function (parm) {return htmlFuncs['idrL'](parm[0],parm[1])},
    htmlR1:'',
    htmlL2: function (parm) {return htmlFuncs['idrL'](parm[0],parm[1])},
    htmlR2:'',
    texfunc:'\\XXX',
    latexL1: function (parm) {return latexFuncs['idrX'](parm[0],parm[1])},
    latexR1:'',
    latexL2: function (parm) {return latexFuncs['idrX'](parm[0],parm[1])},
    latexR2:'',
    mg: function (parm) {if (typeof parm[1] == "undefined") {return "idr(" + parm[0] + ")"};return "idr(" + parm[0] + "," + parm[1] + ")"},
    },
sdr:{  //derivative dy/dx
    htmlL1: function (parm) {return htmlFuncs['sdrL'](parm[0],parm[1],parm[3])},
    htmlR1:'',
    htmlL2: function (parm) {return htmlFuncs['sdrL'](parm[0],parm[1],parm[3])},
    htmlR2:'',
    texfunc:'\\XXX',
    latexL1: function (parm) {return latexFuncs['sdrX'](parm[0],parm[1],parm[3])},
    latexR1:'',
    latexL2: function (parm) {return latexFuncs['sdrX'](parm[0],parm[1],parm[3])},
    latexR2:'',
    mg: function (parm) {return 'sdr('+parm[0]+','+parm[1]+')'},
    },
psd:{ //partial derivative dy/dx
    htmlL1: function (parm) {return htmlFuncs['psdL'](parm[0],parm[1],parm[3])},
    htmlR1:' ',
    htmlL2: function (parm) {return htmlFuncs['psdL'](parm[0],parm[1],parm[3])},
    htmlR2:' ',
    texfunc:'\\XXX',
    latexL1: function (parm) {return latexFuncs['psdX'](parm[0],parm[1],parm[3])},
    latexR1:'',
    latexL2: function (parm) {return latexFuncs['psdX'](parm[0],parm[1],parm[3])},
    latexR2:'',
    mg: function (parm) {return 'psd('+parm[0]+','+parm[1]+')'},
    },
sbt:{ //subscript
    htmlL1: function (parm) {return '<sub><sub>'+parm[0]+'</sub></sub>'},
    htmlR1:'',
    htmlL2: function (parm) {return '<sub><sub>'+parm[0]+'</sub></sub>'},
    htmlR2:'',
    texfunc:'\\XXX',
    latexL1: function (parm) {return '_{'+parm[0]+'}'},
    latexR1:'',
    latexL2: function (parm) {return '_{'+parm[0]+'}'},
    latexR2:'',
    mg:  function (parm) {return 'sbt('+parm[0]+')'},
    },
cup:{ //cup
    htmlL1: function (parm) {return htmlFuncs['overUnder'](parm[0],parm[1],'&#8746;',150)},
    htmlR1:'',
    htmlL2: function (parm) {return htmlFuncs['overUnder'](parm[0],parm[1],'&#8746;',150)},
    htmlR2:' ',
    texfunc:'\\XXX',
    latexL1: function (parm) {return '\\cup_{'+parm[1]+'}^{'+parm[0]+'}'},
    latexR1:'',
    latexL2: function (parm) {return '\\cup_{'+parm[1]+'}^{'+parm[0]+'}'},
    latexR2:'',
    mg: function (parm) {return 'cup('+parm[0]+','+parm[1]+')'},
    },
cap:{ //cap
    htmlL1: function (parm) {return htmlFuncs['overUnder'](parm[0],parm[1],'&#8745;',150)},
    htmlR1:'',
    htmlL2: function (parm) {return htmlFuncs['overUnder'](parm[0],parm[1],'&#8745;',150)},
    htmlR2:' ',
    texfunc:'\\XXX',
    latexL1: function (parm) {return '\\cup_{'+parm[1]+'}^{'+parm[0]+'}'},
    latexR1:'',
    latexL2: function (parm) {return '\\cup_{'+parm[1]+'}^{'+parm[0]+'}'},
    latexR2:'',
    mg: function (parm) {return 'cap('+parm[0]+','+parm[1]+')'},
    },
vec:{  //vector
    htmlL1: function (parm) {return htmlFuncs['fAccentU']("<i>&#8594;</i>")+parm[0]},
    htmlR1: function () {return htmlFuncs['fAccentL']("<span style='line-height:50%'>&nbsp;</span>")},
    htmlL2: function (parm) {return htmlFuncs['fAccentU']("<i>&#8594;</i>")+parm[0]},
    htmlR2: function () {return htmlFuncs['fAccentL']("<span style='line-height:50%'>&nbsp;</span>")},
    texfunc:'\\vec',
    latexL1: function (parm) {return '\\vec{'+parm[0]},
    latexR1:'}',
    latexL2: function (parm) {return '\\vec{'+parm[0]},
    latexR2:'}',
    mg: function (parm) {return 'vec('+parm[0]+')'},
    },
hat:{ //hat
    htmlL1: function (parm) {return htmlFuncs['fAccentU']("<i>&#8963;</i>")+parm[0]},
    htmlR1: function () {return htmlFuncs['fAccentL']("<span style='line-height:50%'>&nbsp;</span>")},
    htmlL2: function (parm) {return htmlFuncs['fAccentU']("<i>&#8963;</i>")+parm[0]},
    htmlR2: function () {return htmlFuncs['fAccentL']("<span style='line-height:50%'>&nbsp;</span>")},
    texfunc:'\\hat',
    latexL1: function (parm) {return '\\hat{'+parm[0]},
    latexR1:'}',
    latexL2: function (parm) {return '\\hat{'+parm[0]},
    latexR2:'}',
    mg: function (parm) {return 'hat('+parm[0]+')'},
    },
und:{  //underline
    htmlL1: function (parm) {return "<Xfnc><span style='border-bottom-style:solid;border-bottom-width:2px;padding:4px;font-size:90%'>"+parm[0]},
    htmlR1:'</span>',
    htmlL2:  function (parm) {return funcMap['und']['htmlL1'](parm)},
    htmlR2:'</span>',
    texfunc:'\\underline',
    latexL1: function (parm) {return '\\underline{'+parm[0]},
    latexR1:'}',
    latexL2: function (parm) {return '\\underline{'+parm[0]},
    latexR2:'}',
    mg: function (parm) {return 'und('+parm[0]+')'},
    },
udt:{ //over dot
    htmlL1: function (parm) {return htmlFuncs['fAccentU']("&#8226;")+parm[0]},
    htmlR1: function () {return htmlFuncs['fAccentL']("<span style='line-height:50%'>&nbsp;</span>")},
    htmlL2: function (parm) {return htmlFuncs['fAccentU']("&#8226;")+parm[0]},
    htmlR2: function () {return htmlFuncs['fAccentL']("<span style='line-height:50%'>&nbsp;</span>")},
    texfunc:'\\dot',
    latexL1: function (parm) {return '\\dot{'+parm[0]},
    latexR1:'}',
    latexL2: function (parm) {return '\\dot{'+parm[0]},
    latexR2:'}',
    mg: function (parm) {return 'udt('+parm[0]+')'},
    },
tld:{  //over tilde
    htmlL1: function (parm) {return htmlFuncs['fAccentU']("&#8764;")+parm[0]},
    htmlR1: function () {return htmlFuncs['fAccentL']("<span style='line-height:50%'>&nbsp;</span>")},
    htmlL2: function (parm) {return htmlFuncs['fAccentU']("&#8764;")+parm[0]},
    htmlR2: function () {return htmlFuncs['fAccentL']("<span style='line-height:50%'>&nbsp;</span>")},
    texfunc:'\\tilde',
    latexL1: function (parm) {return '\\tilde{'+parm[0]},
    latexR1:'',
    latexL2: function (parm) {return '\\tilde{'+parm[0]},
    latexR2:'',
    mg: function (parm) {return 'tld('+parm[0]+')'},
    },
cnt:{ //container
    htmlL1: function (parm) {return parm[0]},
    htmlR1:'',
    htmlL2: function (parm) {return parm[0]},
    htmlR2:'',
    texfunc:'\\XXX',
    latexL1: function (parm) {return parm[0]},
    latexR1:'',
    latexL2: function (parm) {return parm[0]},
    latexR2:'',
    mg: function (parm) {return parm[0]},
    },
dif:{ //differential
    htmlL1: function (parm) {return '<i>d</i>'+parm[0]},
    htmlR1:'',
    htmlL2: function (parm) {return '<i>d</i>'+parm[0]},
    htmlR2:'',
    texfunc:'\\XXX',
    latexL1: function (parm) {return 'd'+parm[0]},
    latexR1:'',
    latexL2: function (parm) {return 'd'+parm[0]},
    latexR2:'',
    mg: function (parm) {return 'Cv[8748]'+parm[0]},
    },
mat:{ //matrix
    htmlL1: function (parm) {return htmlFuncs['matL'](parm)},
    htmlR1:'',
    htmlL2: function (parm) {return htmlFuncs['matL'](parm)},
    htmlR2:'',
    texfunc:'\\XXX',
    latexL1: function (parm) {return latexFuncs['matX'](parm)},
    latexR1:'',
    latexL2: function (parm) {return latexFuncs['matX'](parm)},
    latexR2:'',
    mg: function (parm) {return "mat(" + Array.prototype.slice.call(parm) + ")"},
    },
det:{ //matrix determinant
    htmlL1: function (parm) {return 'det'+parm[0]},
    htmlR1:'',
    htmlL2: function (parm) {return 'det'+parm[0]},
    htmlR2:'',
    texfunc:'\\det',
    latexL1: function (parm) {return '\\det{'+parm[0]},
    latexR1:'}',
    latexL2: function (parm) {return '\\det{'+parm[0]},
    latexR2:'}',
    mg: function (parm) {return 'det('+parm[0]+')'},
    },
trc:{ //matrix trace
    htmlL1: function (parm) {return 'tr'+parm[0]},
    htmlR1:'',
    htmlL2: function (parm) {return 'tr'+parm[0]},
    htmlR2:'',
    texfunc:'\\tr',
    latexL1: function (parm) {return '\\tr{'+parm[0]},
    latexR1:'}',
    latexL2: function (parm) {return '\\tr{'+parm[0]},
    latexR2:'}',
    mg: function (parm) {return 'trc('+parm[0]+')'},
    },
cAdd:{ //add
    htmlL1: function (parm) {return parm[0]+'+'+parm[1]},
    htmlR1:'',
    htmlL2: function (parm) {return parm[0]+'+'+parm[1]},
    htmlR2:'',
    texfunc:'\\XXX',
    latexL1: function (parm) {return parm[0]+'+'+parm[1]},
    latexR1:'',
    latexL2: function (parm) {return parm[0]+'+'+parm[1]},
    latexR2:'',
    mg: function (parm) {return parm[0]+'+'+parm[1]},
    },
cSub:{  //subtract
    htmlL1: function (parm) {return parm[0]+'&minus;'+parm[1]},
    htmlR1:'',
    htmlL2: function (parm) {return parm[0]+'&minus;'+parm[1]},
    htmlR2:'',
    texfunc:'\\XXX',
    latexL1: function (parm) {return parm[0]+'-'+parm[1]},
    latexR1:'',
    latexL2: function (parm) {return parm[0]+'-'+parm[1]},
    latexR2:'',
    mg: function (parm) {return mgFuncs['cSubE'](parm[0],parm[1])},
    },
cTms:{ //multiply by x
    htmlL1: function (parm) {return parm[0]+'&times;'+parm[1]},
    htmlR1:'',
    htmlL2: function (parm) {return parm[0]+'&times;'+parm[1]},
    htmlR2:'',
    texfunc:'\\XXX',
    latexL1: function (parm) {return parm[0]+'\\times '+parm[1]},
    latexR1:'',
    latexL2: function (parm) {return parm[0]+'\\times '+parm[1]},
    latexR2:'',
    mg: function (parm) {return parm[0]+'*'+parm[1]},
    },
cDot:{ //multiply by dot
    htmlL1: function (parm) {return parm[0]+'&#8226;'+parm[1]},
    htmlR1:'',
    htmlL2: function (parm) {return parm[0]+'&#8226;'+parm[1]},
    htmlR2:'',
    texfunc:'\\XXX',
    latexL1: function (parm) {return parm[0]+'\\cdot '+parm[1]},
    latexR1:'',
    latexL2: function (parm) {return parm[0]+'\\cdot '+parm[1]},
    latexR2:'',
    mg: function (parm) {return parm[0]+'Cv[8226]'+parm[1]},
    },
cMul:{ //multiply
    htmlL1: function (parm) {return htmlFuncs['cMulL'](parm[0],parm[1])},
    htmlR1:'',
    htmlL2: function (parm) {return htmlFuncs['cMulL'](parm[0],parm[1])},
    htmlR2:'',
    texfunc:'\\XXX',
    latexL1: function (parm) {return parm[0]+' '+parm[1]},
    latexR1:'',
    latexL2: function (parm) {return parm[0]+' '+parm[1]},
    latexR2:'',
    mg: function (parm) {return mgFuncs['cMulE'](parm[0],parm[1])},
    },
cDiv:{ //divide
    htmlL1: function (parm) {return htmlFuncs['cDivL'](parm[0],parm[1])},
    htmlR1:'',
    htmlL2: function (parm) {return htmlFuncs['cDivL'](parm[0],parm[1])},
    htmlR2:'',
    texfunc:'\\XXX',
    latexL1: function (parm) {return '<Xdiv>\\frac{'+oBrackets(parm[0])+'}{'+oBrackets(parm[1])+'}<Xdve>'},
    latexR1:'',
    latexL2: function (parm) {return '<Xdiv>\\frac{'+oBrackets(parm[0])+'}{'+oBrackets(parm[1])+'}<Xdve>'},
    latexR2:'',
    mg: function (parm) {return mgFuncs['cDivE'](parm[0],parm[1])},
    },
cPow:{ //x^n
    htmlL1: function (parm) {return htmlFuncs['cPowL'](parm[0],parm[1])},
    htmlR1:'',
    htmlL2: function (parm) {return htmlFuncs['cPowL'](parm[0],parm[1])},
    htmlR2:'',
    texfunc:'\\XXX',
    latexL1: function (parm) {return parm[0]+'^{'+oBrackets(parm[1])+'}'},
    latexR1:'',
    latexL2: function (parm) {return latexFuncs['cPowX'](parm[0],parm[1])},
    latexR2:'',
    mg: function (parm) {return mgFuncs['cPowE'](parm[0],parm[1])},
    },
cNeg:{ //negative
    htmlL1: function (parm) {return '&minus;'+parm[0]},
    htmlR1:'',
    htmlL2: function (parm) {return '&minus;'+parm[0]},
    htmlR2:'',
    texfunc:'\\XXX',
    latexL1: function (parm) {return '-'+parm[0]},
    latexR1:'',
    latexL2: function (parm) {return '-'+parm[0]},
    latexR2:'',
    mg: function (parm) {xTractU = oprExtract(cFunc(parm[0]));if (xTractU.func == "cAdd" || xTractU.func == "cSub" || xTractU.func == "cDiv") {return "-" + xParens(parm[0])};return "-" + parm[0]},
    },
cAng:{ //angle (polar form)
    htmlL1: function (parm) {return parm[0]+'&#8736;'+parm[1]},
    htmlR1:'',
    htmlL2: function (parm) {return parm[0]+'&#8736;'+parm[1]},
    htmlR2:'',
    texfunc:'\\XXX',
    latexL1: function (parm) {return parm[0]+'\\angle '+parm[1]},
    latexR1:'',
    latexL2: function (parm) {return parm[0]+'\\angle '+parm[1]},
    latexR2:'',
    mg: function (parm) {return parm[0]+'~'+parm[1]},
    },
cBnd:{ //bind function
    htmlL1: function (parm) {return parm[0]+''+parm[1]},
    htmlR1:'',
    htmlL2: function (parm) {return parm[0]+''+parm[1]},
    htmlR2:'',
    texfunc:'\\XXX',
    latexL1: function (parm) {return parm[0]+' '+parm[1]},
    latexR1:'',
    latexL2: function (parm) {return parm[0]+' '+parm[1]},
    latexR2:'',
    mg:  function (parm) {return parm[0]+''+parm[1]},
    },
cEql:{  //equal
    htmlL1: function (parm) {return parm[0]+' = '+parm[1]},
    htmlR1:'',
    htmlL2: function (parm) {return parm[0]+' = '+parm[1]},
    htmlR2:'',
    texfunc:'\\XXX',
    latexL1: function (parm) {return parm[0]+'='+parm[1]},
    latexR1:'',
    latexL2: function (parm) {return parm[0]+'='+parm[1]},
    latexR2:'',
    mg: function (parm) {return parm[0]+'='+parm[1]},
    },
cGth:{ //greater than
    htmlL1: function (parm) {return parm[0]+' &gt; '+parm[1]},
    htmlR1:'',
    htmlL2: function (parm) {return parm[0]+' &gt; '+parm[1]},
    htmlR2:'',
    texfunc:'>',
    latexL1: function (parm) {return parm[0]+'>'+parm[1]},
    latexR1:'',
    latexL2: function (parm) {return parm[0]+'>'+parm[1]},
    latexR2:'',
    mg: function (parm) {return parm[0]+'Cv[62]'+parm[1]},
    },
cLth:{ //less than
    htmlL1: function (parm) {return parm[0]+' &lt; '+parm[1]},
    htmlR1:'',
    htmlL2: function (parm) {return parm[0]+' &lt; '+parm[1]},
    htmlR2:'',
    texfunc:'<',
    latexL1: function (parm) {return parm[0]+'<'+parm[1]},
    latexR1:'',
    latexL2: function (parm) {return parm[0]+'<'+parm[1]},
    latexR2:'',
    mg: function (parm) {return parm[0]+'Cv[60]'+parm[1]},
    },
cGeq:{ //greater than or equal
    htmlL1: function (parm) {return parm[0]+' &#8805; '+parm[1]},
    htmlR1:'',
    htmlL2: function (parm) {return parm[0]+' &#8805; '+parm[1]},
    htmlR2:'',
    texfunc:'\\geq',
    latexL1: function (parm) {return parm[0]+'\\geq '+parm[1]},
    latexR1:'',
    latexL2: function (parm) {return parm[0]+'\\geq '+parm[1]},
    latexR2:'',
    mg: function (parm) {return parm[0]+'Cv[8805]'+parm[1]},
    },
cLeq:{ //less than or equal
    htmlL1: function (parm) {return parm[0]+' &#8804; '+parm[1]},
    htmlR1:'',
    htmlL2: function (parm) {return parm[0]+' &#8804; '+parm[1]},
    htmlR2:'',
    texfunc:'\\leq',
    latexL1: function (parm) {return parm[0]+'\\leq '+parm[1]},
    latexR1:'',
    latexL2:function (parm) {return parm[0]+'\\leq '+parm[1]},
    latexR2:'',
    mg: function (parm) {return parm[0]+'Cv[8804]'+parm[1]},
    },
cNql:{ //not equal
    htmlL1: function (parm) {return parm[0]+' &#8800; '+parm[1]},
    htmlR1:'',
    htmlL2: function (parm) {return parm[0]+' &#8800; '+parm[1]},
    htmlR2:'',
    texfunc:'\\neq',
    latexL1: function (parm) {return parm[0]+'\\neq '+parm[1]},
    latexR1:'',
    latexL2: function (parm) {return parm[0]+'\\neq '+parm[1]},
    latexR2:'',
    mg: function (parm) {return parm[0]+'Cv[8800]'+parm[1]},
    },
ntg:{  //integral from func
    htmlL1:'',
    htmlR1:'',
    htmlL2:'',
    htmlR2:'',
    texfunc:'\\XXX',
    latexL1:'',
    latexR1:'',
    latexL2:'',
    latexR2:'',
    mg: function (parm) {if (typeof parm[2]=="undefined" && typeof parm[3]=="undefined") {return "Cv[8747]"+parm[0]+"Cv[8748]"+parm[1]};return "itg("+parm[2]+","+parm[3]+")"+parm[0]+"Cv[8748]"+parm[1]}
},
ntp:{  //integral container from func
    htmlL1:'',
    htmlR1:'',
    htmlL2:'',
    htmlR2:'',
    texfunc:'\\XXX',
    latexL1:'',
    latexR1:'',
    latexL2:'',
    latexR2:'',
    mg: function (parm) {return funcMap['ntg']['mg'](parm)},
},
}
//mg handlers
var mgFuncs = {
cSubE: function (xU,xL) { //subtraction
    xTractL = oprExtract(cFunc(xL));
    if (xTractL.func == "cAdd") {return xU + "-" + xParens(xL)}
    return xU + "-" + xL
    },
cMulE: function (xU,xL) { //multiplication by term
    xTractU = oprExtract(cFunc(xU));
    xTractL = oprExtract(cFunc(xL));
    xL = oParens(xL);xU = oParens(xU);
    if (xTractU.func == "cAdd" || xTractU.func == "cSub" || xTractU.func == "fac") {xU  = xParens(xU)}
    if (xTractL.func == "cAdd" || xTractL.func == "cSub" || xTractL.func == "fac") {xL  = xParens(xL)}
    if (xTractL.func == "cDiv" && xTractU.func == "cDiv") {xU  = xParens(xU);xL  = xParens(xL)}
    if (xU.indexOf("Cv[45]") > -1 && xU.lastIndexOf("Cv[45]") == xU.length-6) {xU  = xParens(xU)}
    if (xL.indexOf("Cv[45]") > -1 && xL.lastIndexOf("Cv[45]") == xL.length-6) {xL  = xParens(xL)}
    if (xTractL.func == "cPow" && numTest(xU) && numTest(xTractL.upper)) {xL  = xParens(xL)}
    return xU + "" + xL
    },
cDivE: function (xU,xL) { //division
    xTractU = oprExtract(cFunc(xU));
    xTractL = oprExtract(cFunc(xL));
    if (xTractU.func == "cAdd" || xTractU.func == "cSub" || xTractU.func == "cMul" || xTractU.func == "cDiv" || xTractU.func == "cNeg" || xU.indexOf("Cv[8747]") > -1) {xU  = xParens(xU)}
    if (xTractL.func == "cAdd" || xTractL.func == "cSub" || xTractL.func == "cMul" || xTractL.func == "cDiv" || xTractL.func == "cNeg" || xL.indexOf("Cv[8747]") > -1) {xL  = xParens(xL)}
    return xU + "/" + xL
    },
cPowE: function (xU,xL) { //powers
    xTractU = oprExtract(cFunc(xU));
    xTractL = oprExtract(cFunc(xL));
    if (xTractU.func == "cAdd" || xTractU.func == "cSub" || xTractU.func == "cMul" || xTractU.func == "cDiv" || xTractU.func == "cNeg" || xTractU.func == "fac") {xU  = xParens(xU)}
    if (xTractL.func == "cAdd" || xTractL.func == "cSub" || xTractL.func == "cMul" || xTractL.func == "cDiv" || xTractL.func == "cNeg") {xL  = xParens(xL)}
    return xU + "^" + xL
    },
}

//html handlers
var htmlFuncs = {
brkt: function (xS,xO) {//scale brackets
    var iNest = dNest(xO);
    if (mgConfig.divScale == 50 || iNest == 0) {return xS}
    else {return "<span style='vertical-align:middle;display:inline-block;font-weight:100;font-size:"+Math.floor(100+(iNest*mgConfig.divScale*1.3))+"%'>"+xS+"</span>"}
    },
overUnder: function (xA,xB,xS,xFsize) {
    if (xA == "") {xA = "&nbsp;"}
    if (xB == "") {xB = "&nbsp;"}
    return "<Xdiv><span style='display:inline-block;'><span style='vertical-align:middle;text-align:center;display:inline-table;'><span style='display:table-row;font-size:50%'>"
            +xA+"</span><span style='line-height:80%;display:table-row;font-size:"+xFsize+"%'>"+xS+"</span><span style='line-height:150%;display:table-row;font-size:50%'>"
            +xB+"</span></span></span><Xdve>"
    },
fAccentU: function (xA) {return "<Xfnc><span style='display:inline-block;'><span style='text-align:center;vertical-align:middle;display:inline-table;'><span style='display:table-row;line-height:20%;font-size:60%'>"+xA+"</span><span style='line-height:90%;display:table-row;'>"},
fAccentL: function (xB) {return "<Xfnc></span><span style='display:table-row;line-height:20%;font-size:60%'>"+xB+"</span></span></span>"},
cMulL: function (xU,xL) {
    if (xL.indexOf("<Xfnc>") == 0) {return xU+" "+xL}
    return xU+""+xL
    },
cDivL: function (xU,xL) {
    if (mgConfig.divSymbol == "Slash") {return xU+"/"+xL}
    else {
        if (!mgConfig.editMode) {xU = oParens(xU);xL = oParens(xL)}
        return "<Xdiv> <span style='text-align:center;vertical-align:middle;display:inline-block;'><span style='display:table-row;'><span style='font-size:"
        +mgConfig.divScale+"%;display:table-cell'>"+xU+"</span></span><span style='display:table-row;vertical-align:top'><span style='font-size:"
        +mgConfig.divScale+"%;display:table-cell;border-top-style:solid;border-top-width:2px;padding:3px;'>"+xL+"</span></span></span> <Xdve>"
    }
    },
cPowL: function (xU,xL) {
    if (!mgConfig.editMode) {xL = oParens(xL)}
    if (dNest(xU) > 2) {return "<table style='text-align:center;display:inline-table;vertical-align:middle'><tr><td>"+xU+"</td><td style='vertical-align:top'><sup>"+xL+"</sup></td></tr></table>"}
    if (xU.indexOf(" <Xfxp>") > -1 && xU.indexOf(" <Xfxp>") ==  xU.length-7) {return "("+xU+")<sup>"+xL+"</sup> "} //(ln x)^2
    if (xU.indexOf("<Xfnc>") == 0 && xU.indexOf("<Xfxp> ") > -1 &&  xU.indexOf("<Xfxp> ") < 11) {return xU.replace("<Xfxp>","<sup>"+xL+"</sup> ")} //sin^2 x
    if (xL.indexOf("<Xdiv>") > -1 && xL.indexOf("<Xdve>") == xL.length-7 && !mgConfig.editMode) {xL = "("+xL+")"}
    if (xU.indexOf("<Xdiv>") == 1 && xU.indexOf("<Xdve>") == xU.length-7 && !mgConfig.editMode) {xU = "("+xU+")"}
    if ((dNest(xU) > 0 || dNest(xL) > 0 ) && mgConfig.divScale > 50) {return xU+"<sup><span style='vertical-align:super'>"+xL+"</span></sup>"} //lift exponent for big symbols
    return xU+"<sup>"+xL+"</sup>"
    },
radL: function (rSymb,xY,xZ) {//radicals
    var tgtRad = ["&#8730;","<span style='vertical-align:top;display:inline-block;position:relative;'><span style='vertical-align:top;position:absolute;'>&#8730;</span><span style='vertical-align:top;position:absolute;font-size:50%;'><sup>&nbsp;3</sup></span>&nbsp;&nbsp;</span>",
                "<span style='vertical-align:top;display:inline-block;position:relative;'><span style='vertical-align:top;position:absolute;'>&#8730;</span><span style='vertical-align:top;position:absolute;font-size:50%;'><sup>&nbsp;"+xZ+"</sup></span>&nbsp;&nbsp;</span>"];
    if (mgConfig.divScale != 50) {
        var xNest = Math.floor(100+(dNest(xY)*mgConfig.divScale*1.2));
        return "<span style='vertical-align:middle;display:inline-block;padding:3px'><span style='vertical-align:top;font-size:"+xNest+"%'>"
                +tgtRad[rSymb]+"</span><span style='vertical-align:top;border-top-style:solid;border-top-width:2px;'><span style='vertical-align:top;'><span style='vertical-align:middle;font-size:90%'>";
    }
    else {return "<span style='display:inline-block;'>"+tgtRad[rSymb]+"</span><span style='border-top-style:solid;border-top-width:2px;'><span style='font-size:90%'>";}
    },
radR: function () {//radicals
    if (mgConfig.divScale == 50) {return "</span></span>"}
    else {return "</span></span></span></span>"}
    },
itgL: function (xA,xB) {
    return "<Xdiv><span style='display:inline-block;vertical-align:middle;'><table cellpadding='0' cellspacing='0'><tr><td rowspan='4'><span style='vertical-align:middle;display:inline-table;'><span style='display:table-row;line-height:90%'>&#8992;</span><span style='display:table-row;line-height:90%'>&#8993;</span></span></td><tr><td style='font-size:45%'>"
            +xA+"</td></tr><tr><td>&nbsp;</td></tr><td style='font-size:45%'>"+xB+"</td></tr></table></span><Xdve>"
    },
tdrL: function (xA,xN) {
    var xTmp = "";
    var tmpDivSym = mgConfig.divSymbol;mgConfig.divSymbol = "Over";
    if (typeof xN =="undefined" || xN == 1) {xTmp = htmlFuncs['cDivL']("<i>d</i>","<i>d</i>"+xA)}
    else {xTmp = htmlFuncs['cDivL']("<i>d</i><sup>"+xN+"</sup>","<i>d</i>"+xA+"<sup>"+xN+"</sup>")}
    mgConfig.divSymbol =  tmpDivSym;
    return xTmp
    },
idrL: function (xA,xN) {
    var xTmp = "";
    var tmpDivSym = mgConfig.divSymbol;mgConfig.divSymbol = "Over";
    if (typeof xN =="undefined" || xN == 1) {xTmp = htmlFuncs['cDivL']("&#8706;","&#8706;"+xA)}
    else {xTmp = htmlFuncs['cDivL']("&#8706;<sup>"+xN+"</sup>","&#8706;"+xA+"<sup>"+xN+"</sup>")}
    mgConfig.divSymbol =  tmpDivSym;
    return xTmp
    },
sdrL: function (xA,xB,xN) {
    var xTmp = "";
    var tmpDivSym = mgConfig.divSymbol;mgConfig.divSymbol = "Over";
    if (typeof xN =="undefined" || xN == 1) {xTmp = htmlFuncs['cDivL']("<i>d</i>"+xA,"<i>d</i>"+xB)}
    else {xTmp = htmlFuncs['cDivL']("<i>d</i><sup>"+xN+"</sup>"+xA,"<i>d</i>"+xB+"<sup>"+xN+"</sup>")}
    mgConfig.divSymbol =  tmpDivSym;
    return xTmp
    },
psdL: function (xA,xB,xN) {
    var xTmp = "";
    var tmpDivSym = mgConfig.divSymbol;mgConfig.divSymbol = "Over";
    if (typeof xN =="undefined" || xN == 1) {xTmp = htmlFuncs['cDivL']("&#8706;"+xA,"&#8706;"+xB)}
    else {xTmp = htmlFuncs['cDivL']("&#8706;<sup>"+xN+"</sup>"+xA,"&#8706;"+xB+"<sup>"+xN+"</sup>")}
    mgConfig.divSymbol =  tmpDivSym;
    return xTmp
    },
matL: function (xA) {
    var mReturn = "",prefix = "",suffix = "",iM = 0;
    var dScale = xA.length;
    if (typeof xA[0] == "string" && xA[0].substr(0,6) == "<Xrow>"){
        for (iM in xA) {
            xA[iM] = xA[iM].replace(/\<Xrow\>/g,"").replace(/\<Xrwe\>/g,"").replace(/\<Xcel\>/g,"<td>").replace(/\<Xcle\>/g,"</td>");
            dScale = dScale + dNest(xA+"")*(mgConfig.divScale/100)
            mReturn = mReturn + "<tr>" + xA[iM] + "</tr>"
            prefix = prefix+"<Xdiv>";
            suffix = suffix+"<Xdve>";
        }
        return prefix+" <table style='text-align:center;display:inline-table;vertical-align:middle'><tr><td style='border-left:2px solid black;border-top:2px solid black;border-bottom:2px solid black'>&nbsp;</td><td><table>" + mReturn + "</table><td style='border-right:2px solid black;border-top:2px solid black;border-bottom:2px solid black'>&nbsp;</td></tr></table> "+suffix
    }
    else {
        for (iM in xA) {mReturn = mReturn + "<Xcel>" + xA[iM] + "<Xcle>"}
        return "<Xrow>" + mReturn + "<Xrwe>"
    }
    },
}
//latex handlers
latexFuncs = {
cPowX: function (xU,xL) {
    if (xU.indexOf("<Xfxp>") > 0 && xU.indexOf("<Xfxp>") < 6 && xU.indexOf("\\") == 0) {return oBrackets(xU).replace("<Xfxp>","^{"+oBrackets(xL)+"}")} //fn^n x
    if (xU.indexOf("\\") == 0) {return "("+oBrackets(xU)+")^{"+oBrackets(xL)+"}"}
    return "{"+oBrackets(xU)+"}^{"+oBrackets(xL)+"}"
    },
idrX: function (xU,xN) {
    if (typeof xN == "undefined") {return '\\frac{\\partial}{\\partial '+xU+'}'}
    return '\\frac{\\partial^'+xN+'}{\\partial '+xU+'^2}'
    },
tdrX: function (xU,xN) {
    if (typeof xN == "undefined") {return '\\frac{d}{d '+xU+'}'}
    return  '\\frac{d^'+xN+'}{d '+xU+'^'+xN+'}'
    },
psdX: function (xU,xL,xN) {
    if (typeof xN == "undefined") {return '\\frac{\\partial '+xU+'}{\\partial '+xL+'}'}
    return  '\\frac{\\partial^'+xN+' '+xU+'}{\\partial '+xL+'^'+xN+'}'
    },
sdrX: function (xU,xL,xN) {
    if (typeof xN == "undefined") {return '\\frac{d '+xU+'}{d '+xL+'}'}
    return '\\frac{d^'+xN+' '+xU+'}{d '+xL+'^'+xN+'}'
    },
matX: function (xA) {
    var mReturn = "";
    if (xA[0].indexOf("<Xrow>") == -1) {
        for (var iC=0;iC<xA.length;iC++) {
            mReturn = mReturn + xA[iC];
            if (iC < xA.length-1) {mReturn = mReturn + "<Xcel>"}
        }
        mReturn = "<Xrow>" + mReturn + "<Xrwe>"
    }
    else {
        mReturn = mReturn + "\\begin{bmatrix}";
        for (var iR=0;iR<xA.length;iR++) {
            xA[iR] = xA[iR].replace(/\<Xcel\>/g,"&").replace(/\<Xrow\>/g,"").replace(/\<Xrwe\>/g,"");
            mReturn = mReturn + xA[iR];
            if (iR < xA.length-1) {mReturn = mReturn + "\\\\"}
        }
        mReturn = mReturn + "\\end{bmatrix}"
    }
    return mReturn
    },
}
// internal functions
function strCount(xTarget,xSearch) {xTarget +="";xSearch+="";return xTarget.split(xSearch).length-1} //count occurrences of string
function parseParens(xB,bSym) {//parse parens and return inside string, begin index, end index, source string, upper/lower args
    xB += "";
    var oComma = 0,lPar = 0,rPar = 0,bDelim = " ",eDelim = " ",cFind = "",ins = "";
    for (var iU=bSym;iU<xB.length;iU++) {
        cFind = xB.charAt(iU);
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
    ins = xB.substr(bSym+1,iU-bSym-1)
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
function xParens(xA) {return "(" + oParens(xA) + ")"}
function parseBrackets(xB,bSym) {//parse brackets and return inside string, begin index, end index, source string
    xB += "";
    var lPar = 0,rPar = 0,bDelim = " ",eDelim = " ",iU = 0,dTemp = "",nXi = 0;
    var lSym = xB.length;
    for (iU=bSym;iU<lSym;iU++) {
        if (xB.charAt(iU) == " ") {iU++}
        if (xB.charAt(iU).charCodeAt(0) > 47 && tDelimiter.indexOf(xB.charAt(iU)) == -1){return {begin:bSym,inside:xB.charAt(iU),end:iU,source:xB}}
        if (xB.charAt(iU) == "\\") {
            dTemp = xB.substr(iU,xB.length);
            for (nXi=1;nXi<dTemp.length;nXi++) {if (tDelimiter.indexOf(dTemp.charAt(nXi)) > -1){break}}
            dTemp = dTemp.substr(0,nXi);
            return {begin:bSym,inside:dTemp,end:iU+dTemp.length,source:xB}
        }
        if (xB.charAt(iU) == "(") {bDelim = "(";eDelim = ")";break}
        if (xB.charAt(iU) == "{") {bDelim = "{";eDelim = "}";break}
        if (xB.charAt(iU) == "[") {bDelim = "[";eDelim = "]";break}
    }
    for (iU=bSym;iU<lSym;iU++) {
        if (xB.charAt(iU) == bDelim ) {lPar++;if(lPar == 1) {bSym = iU}}
        if (xB.charAt(iU) == eDelim ) {rPar++}
        if (lPar > 0 && lPar == rPar) {break}
    }
    return {begin:bSym,inside:xB.substr(bSym+1,iU-bSym-1),end:iU,source:xB}
}
function oBrackets(xP) {//remove outside brackets
    var tparens = parseBrackets(xP,0);
    if (xP.charAt(0) == "(" && xP.charAt(xP.length-1) == ")") {
        if (tparens.end == xP.length-1) {return tparens.inside}
    }
    if (xP.charAt(0) == "{" && xP.charAt(xP.length-1) == "}") {
        if (tparens.end == xP.length-1) {return tparens.inside}
    }
    return xP
}
function oprExtract(fExt) {//extract inside function in FUNC format, returns func,upper,lower
    function fTest(tFunc) {if (typeof funcMap[tFunc] == "undefined") {return false}; return true} //test for valid function key
    fExt = oParens(fExt);
    var opReturn = {func:"",upper:"",lower:""};
    var funcKey = fExt.substr(0,fExt.indexOf("("))
    if (funcKey != "" && fTest(funcKey)) {
        var strg = parseParens(fExt,fExt.indexOf("("));
        if (strg.upper != "") {opReturn = {func:funcKey,upper:strg.upper,lower:strg.lower}} //two operands
        else {opReturn = {func:funcKey,upper:strg.inside,lower:""}} //single operand
    }
    return opReturn
}
function numTest(xT) {if (+xT == +xT*1) {return true}; return false} //test for numerical string
function dNest(dN) {//count nested large elements
    var dDepth = 0,dSpan = 0,iDp = 0;
    for (iDp in dN) {
        if (dN.substr(iDp,6) == "<Xdiv>") {dSpan++}
        if (dN.substr(iDp,6) == "<Xdve>") {dSpan--}
        if (dSpan > dDepth) {dDepth = dSpan}
    }
    return dDepth
}
//conversion routines
function htmlExport(htmlXpr) { //convert MG format to HTML
    function dedupParens(xP) {//remove duplicate parens
        xP += "";
        var nXf = 0,sCount = 0,dparens = "";
        var dCount = strCount(xP,"(");
        for (nXf=0;nXf<dCount;nXf++) {
            dparens = parseParens(xP,xP.lastIndexOf("((")+1);
            if (xP.substr(dparens.end,2) == "))" ) {xP = xP.substr(0,xP.lastIndexOf("((")+1)+dparens.inside+xP.substr(dparens.end+1,xP.length)}
        }
        return xP
    }
    //
    var nXs=0;
    if (htmlXpr == "NaN" || htmlXpr == "undefined") {return "undefined"}
    htmlXpr = cFunc(htmlXpr); //convert to FUNC
    if (mgConfig.editMode) {htmlXpr = htmlXpr.replace(/\,\)/g,",Cv[9643])").replace(/\(\,/g,"(Cv[9643],").replace(/\,\,/g,",Cv[9643],").replace(/\(\)/g,"(Cv[9643])")} //fill empty fields
    if (!mgConfig.editMode) {htmlXpr = dedupParens(htmlXpr);htmlXpr = oParens(htmlXpr)}
    htmlXpr = dFunc(htmlXpr, "html") //process functions
    //render symbols
    sCount = strCount(htmlXpr,"Cv[");
    for (nXs=0;nXs<sCount;nXs++) {htmlXpr = htmlXpr.replace(/Cv\[\d+\]/,Cs[(htmlXpr.match(/Cv\[\d+\]/)+"").replace(/Cv\[(\d+)\]/,"$1")])} //resolve Cv[] symbols
    //scale and fix parens
    htmlXpr = htmlXpr.replace(/\(/g,"{").replace(/\)/g,"}");
    sCount = strCount(htmlXpr,"{");
    for (nXs=0;nXs<sCount;nXs++) {
        var bSym = htmlXpr.indexOf("{");
        var lSym = htmlXpr.length;
        var iXs = parseParens(htmlXpr,bSym);
        var strg = iXs.inside;
        if (!mgConfig.editMode && htmlXpr.substr(bSym,7) == "{<Xdiv>" && htmlXpr.substr(iXs.end-6,7) == "<Xdve>}"  && htmlXpr.substr(bSym-6,6) != "<Xfnx>" && strg.search(/\<Xdve\>(.*)\<Xdiv\>/) == -1) {
            htmlXpr = htmlXpr.substr(0,bSym)+strg+htmlXpr.substr(iXs.end+1,lSym);
        }
        else if (dNest(strg) > 0) {//expanded parens
            if (strCount(htmlXpr.substr(0,bSym+1),"{") > strCount(htmlXpr.substr(iXs.end,lSym),"}")) {htmlXpr = htmlXpr.substr(0,bSym)+htmlFuncs['brkt']("(",strg)+strg+htmlXpr.substr(iXs.end,lSym);}
            else {htmlXpr = htmlXpr.substr(0,bSym)+htmlFuncs['brkt']("(",strg)+strg+htmlFuncs['brkt'](")",strg)+htmlXpr.substr(iXs.end+1,lSym)}
        }
        else {//normal parens
            if (strCount(htmlXpr.substr(0,bSym+1),"{") > strCount(htmlXpr.substr(iXs.end,lSym),"}"))  {htmlXpr = htmlXpr.substr(0,bSym)+"("+strg+htmlXpr.substr(iXs.end,lSym);}
            else {htmlXpr = htmlXpr.substr(0,bSym)+"("+strg+")"+htmlXpr.substr(iXs.end+1,lSym)}
        }
    }
    // format arrays
    htmlXpr = htmlXpr.replace(/\<Xcel\>/g,"").replace(/\<Xrow\>/g,"{").replace(/\<Xrwe\>/g,"}");
    sCount = strCount(htmlXpr,"<Xcle>");
    for (nXs=0;nXs<sCount;nXs++) {
        if (nXs <sCount-1) {htmlXpr = htmlXpr.replace("<Xcle>",", ")}
        else {htmlXpr = htmlXpr.replace("<Xcle>","")}
    }
    htmlXpr = htmlXpr.replace(/\<X\w\w\w\>/g,"");//cleanup tags
    return htmlXpr
}
//
function mgExport(xFn) { //export from FUNC to MG format
    function toSciNot(xU) {xU+="";return xU.replace(/(\d+)e(\d+)/g,"$1*10^$2").replace(/(\d+)e\-(\d+)/g,"$1*10^-$2").replace(/(\d+)e\+(\d+)/g,"$1*10^$2")} //convert N.NNe+-NN notation to scientific
    if (xFn == "NaN" || xFn == "undefined") {return "undefined"}
    xFn += "";
    xFn = xFn.replace(/\,\)/g,",'')").replace(/\(\,/g,"('',").replace(/\,\,/g,",'',").replace(/\(\)/g,"('')");
    xFn = dFunc(xFn, "mg");
    xFn = xFn.replace(/\+\-/g,"-").replace(/\-\-/g,"");
    xFn = toSciNot(xFn);
    return xFn //process functions
}

//
function cFunc(cXpr) { //convert from MG format to FUNC format: a+bc/d -> cAdd(a,cDiv(cMul(b,c),d)))
    function cParse(xInp,xOp,xFunc) {//parse operators
        const zDelim = ["^","-","#","*","/","+",",","~","@","=","<",">",String.fromCharCode(8800),String.fromCharCode(8804),String.fromCharCode(8805),String.fromCharCode(8226)];
        var ztmp = "",bSym = "",lPar = 0,rPar = 0,dCp = 0,iCp = 0;
        if (xOp == "^") {bSym = xInp.lastIndexOf(xOp)+1}
        else  {bSym = xInp.indexOf(xOp)+1;}
        var aSym = bSym-2;
        var lSym = xInp.length;
        for (iCp=bSym;iCp<=lSym;iCp++) {
            ztmp = xInp.charAt(iCp);
            if (ztmp == "(") {lPar++}
            if (ztmp == ")") {rPar++}
            if (lPar < rPar) {break;}
            if (lPar == rPar && xInp.charAt(iCp-1)!= "e") { if (zDelim.indexOf(ztmp) > -1) {break} }
        }
        lPar = 0;rPar = 0;
        for (dCp=aSym;dCp>=0;dCp--) {
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
        const zDelim = ["(",")","^","-","#","*","/","+",",","~","@","=","<",">",String.fromCharCode(8800),String.fromCharCode(8804),String.fromCharCode(8805),String.fromCharCode(8226)];
        var iNp = 0,lPar = 0,rPar = 0,ztmp = "";
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
    // non-multiplying cBnd symbols
    const nBind = ["(Cv\\[8773\\])","(Cv\\[8750\\])","(Cv\\[8751\\])","(Cv\\[8752\\])",
                "(Cv\\[8592\\])","(Cv\\[8747\\])","(Cv\\[8748\\])","(Cv\\[59\\])",
                "(idr\\([^\\)]*\\))","(tdr\\([^\\)]*\\))","(lim\\([^\\)]*\\,[^\\)]*\\))",
                "(itg\\([^\\)]*\\,[^\\)]*\\))","(sdr\\([^\\)]*\\,[^\\)]*\\))","(sum\\([^\\)]*\\,[^\\)]*\\))",
                "(prd\\([^\\)]*\\,[^\\)]*\\))","(psd\\([^\\)]*\\,[^\\)]*\\))","(cap\\([^\\)]*\\,[^\\)]*\\))",
                "(cup\\([^\\)]*\\,[^\\)]*\\))","(dif\\([^\\)]*\\,[^\\)]*\\))","(Cv\\[10044])"];
    //relational operators
    const relOps = {"cEql":"=","cLth":"<","cGth":">","cNql":String.fromCharCode(8800),"cLeq":String.fromCharCode(8804),"cGeq":String.fromCharCode(8805)};//relational operators
    const relOperators = {"Cv[60]":"<","Cv[61]":"=","Cv[62]":">","Cv[8800]":String.fromCharCode(8800),"Cv[8804]":String.fromCharCode(8804),"Cv[8805]":String.fromCharCode(8805)};//relational operators
    //editing
    const pCases = ["^-","^|-"];
    const nCases = ["~-","~|-","+-","*-","/-","(-",",-","+|-","*|-","/|-","(|-",",|-","=-","=|-","@-","@|-","e|-",">-","<-",">|-","<|-",
                  String.fromCharCode(8804)+"-",String.fromCharCode(8804)+"|-",String.fromCharCode(8805)+"-",String.fromCharCode(8805)+"|-",
                  String.fromCharCode(8800)+"-",String.fromCharCode(8800)+"|-",String.fromCharCode(8226)+"-",String.fromCharCode(8226)+"|-"];
    var nCf = 0,iXX = 0,key = 0,sbtOperand = "",cIdx = 0,aIdx = 0,sCount = 0;
    cXpr += "";
    sCount = strCount(cXpr,"]sbt(");//var&subscripts into container cnt()
    cXpr = cXpr.replace(/\]sbt\(/g,"]SBT(");
    cXpr = cXpr.replace(/Infinity/g,"Cv[8734]");
    for (nCf=0;nCf<sCount;nCf++) {
        sbtOperand = parseParens(cXpr,cXpr.indexOf("]SBT("));
        cXpr = cXpr.replace(/Cv\[(\d+)\]SBT\(/,"cnt(Cv[$1]SBT(").replace("]SBT("+sbtOperand.inside,"]sbt("+oParens(sbtOperand.inside)+")");
    }
    sCount = strCount(cXpr,"Cv[8748]");//differential
    for (nCf=0;nCf<sCount;nCf++) {cXpr = cXpr.replace(/Cv\[8748\]Cv\[(\d+)\]\/Cv\[8748\]Cv\[(\d+)\]/,"sdr(Cv[$1],Cv[$2])")}
    cXpr = cXpr.replace(/!/g,"Cv[45]"); //factorial
    cXpr = cXpr.replace(/Cv\[8226\]/g,String.fromCharCode(8226)); //dot operator
    for (key in relOperators) {
        sCount = strCount(cXpr,key);
        for (nCf=0;nCf<sCount;nCf++) {cXpr = cXpr.replace(key,relOperators[key])}
    }
    cXpr = cXpr.replace(/([\)\]])(\|?)(\d)/g,"$1$2#$3").replace(/([\)\]\d])(\|?)\(/g,"$1$2#(").replace(/([\)\]\d])(\|?)Cv\[/g,"$1$2#Cv[").replace(/([\)\]\d])(\|?)([a-z][a-z][a-z]\()/ig,"$1$2#$3");//terms to # multiply
    for (nCf in nBind) {//add @ between bind symbols
        var rgx = new RegExp(nBind[nCf]+"(\\|?)#");
        var rgy = new RegExp("#(\\|?)"+nBind[nCf]);
        while (cXpr.search(rgx) != -1 || cXpr.search(rgy) != -1) {cXpr = cXpr.replace(rgx,"$1$2@").replace(rgy,"@$1$2")}
    }
    if (cXpr.charAt(0) == "+") {cXpr = cXpr.substr(1)} //remove + at beginning of expression
    sCount = strCount(cXpr,"-");//parse power negatives to cPow(x,cNeg())
    for (nCf=0;nCf<sCount;nCf++) {
        for (iXX in pCases) {
            if (cXpr.indexOf(pCases[iXX]) > -1) {cXpr = nParse(cXpr,pCases[iXX])}
        }
    }
    sCount = strCount(cXpr,"^");//convert powers to cPow()
    for (nCf=0;nCf<sCount;nCf++) {cXpr = cParse(cXpr,"^","cPow")}
    if (cXpr.charAt(0) == "-") {cXpr = nParse(cXpr,"-")}
    sCount = strCount(cXpr,"-");//parse negatives to cNeg()
    for (nCf=0;nCf<sCount;nCf++) {
        for (iXX in nCases) {
            if (cXpr.indexOf(nCases[iXX]) > -1) {cXpr = nParse(cXpr,nCases[iXX])}
        }
    }
    sCount = strCount(cXpr,"~");//convert angles to cAng()
    for (nCf=0;nCf<sCount;nCf++) {cXpr = cParse(cXpr,"~","cAng")}
    sCount = strCount(cXpr,"#");//convert # to cMul() (multiply)
    for (nCf=0;nCf<sCount;nCf++) {cXpr = cParse(cXpr,"#","cMul")}
    sCount = strCount(cXpr,"/");//convert / to cDiv()
    for (nCf=0;nCf<sCount;nCf++) {cXpr = cParse(cXpr,"/","cDiv")}
    sCount = strCount(cXpr,"*");//convert * to cTms()
    for (nCf=0;nCf<sCount;nCf++) {cXpr = cParse(cXpr,"*","cTms")}
    sCount = strCount(cXpr,String.fromCharCode(8226));//convert dot to cDot()
    for (nCf=0;nCf<sCount;nCf++) {cXpr = cParse(cXpr,String.fromCharCode(8226),"cDot")}
    sCount = strCount(cXpr,"-") + strCount(cXpr,"+");//convert +- to cAdd() or cSub()
    for (nCf=0;nCf<sCount;nCf++) {
        aIdx = cXpr.indexOf("+");
        cIdx = cXpr.indexOf("-");
        if (aIdx == -1) {cXpr = cParse(cXpr,"-","cSub")}
        else if (cIdx == -1) {cXpr = cParse(cXpr,"+","cAdd")}
        else if (aIdx < cIdx) {cXpr = cParse(cXpr,"+","cAdd")}
        else {cXpr = cParse(cXpr,"-","cSub")}
    }
    sCount = strCount(cXpr,"@");//convert @ symbol handler to cBnd()
    for (nCf=0;nCf<sCount;nCf++) {cXpr = cParse(cXpr,"@","cBnd")}
    for (key in relOps) { //relational operators
        sCount = strCount(cXpr,relOps[key]);
        for (nCf=0;nCf<sCount;nCf++) {
            cXpr = cParse(cXpr,relOps[key],key)
        }
    }
    cXpr = cXpr.replace(/\[\[/g,"'[[").replace(/\]\]/g,"]]'") //quote matrices
    return cXpr;
}
function dFunc(dXpr, prefix) { //map FUNC format to export format
    function parseArgs(xP) { //parse comma-delimited arguments into array
        var args = [];
        var strSplit = xP.split(",");
        args[0] = strSplit[0];
        for (var nXf=1;nXf<strSplit.length;nXf++) {
            if (strCount(args[args.length-1],"(") > strCount(args[args.length-1],")")) {args[args.length-1] = args[args.length-1]+","+strSplit[nXf]} //reassemble inside parens
            else {args.push(strSplit[nXf])}
        }
        return args
    }
    function lFunc(parm,strg) { //process left side function
        if (typeof funcMap[funcKey][fnformatLx] == "function") {return funcMap[funcKey][fnformatLx](parm,strg)}
        return funcMap[funcKey][fnformatLx]
    }
    function rFunc(parm,strg) { //process right side function
        if (typeof funcMap[funcKey][fnformatR] == "function") {return funcMap[funcKey][fnformatR](parm,strg)}
        return funcMap[funcKey][fnformatR]
    }
    function funcTest(tFunc) {if (typeof funcMap[tFunc] == "undefined") {return false}; return true} //test for valid function key
    //
    dXpr = dXpr.replace(/ /g,"").replace(/([a-z][a-z][a-z])\(/ig,"$1@"); //mark left parens with @
    var sCount = strCount(dXpr,"@");
    var bSym = 0, lSym = 0,lPar = 0,rPar = 0,iXf = 0,payload = "",paramS = "",funcKey = "",rTmp = "",fnformatL = "",fnformatR = "",fnformatLx = "",nXf = 0;
    if (prefix == "mg") {fnformatL = prefix;fnformatR = prefix}
    else if (mgConfig.fnFmt == "fn(x)") {fnformatL = prefix+"L1";fnformatR = prefix+"R1"} //fn(x)
    else {fnformatL = prefix+"L2";fnformatR = prefix+"R2"}  //fn x
    for (nXf=0;nXf<sCount;nXf++) {
        fnformatLx = fnformatL;
        lPar = 1,rPar = 0,iXf = 0,rTmp = "";
        bSym = dXpr.lastIndexOf("@")+1; //find inside parens
        lSym = dXpr.length;
        for (iXf=bSym;iXf<lSym;iXf++) {
            if (dXpr.charAt(iXf) == "@" || dXpr.charAt(iXf) == "(") {lPar++}
            if (dXpr.charAt(iXf) == ")") {rPar++}
            if (lPar == rPar) {break;}
        }
        payload = dXpr.substr(bSym,iXf-bSym); //parameters between parens
        if (lPar > rPar) {payload = payload.substr(0,payload.lastIndexOf(")"))+payload.substr(payload.lastIndexOf(")")+1)} //unmatched left parens
        paramS = parseArgs(payload); //parse parms
        funcKey = dXpr.substr(bSym-4,3); //extract functions xxx()
        if (!funcTest(funcKey)) {funcKey = dXpr.substr(bSym-5,4)} //extract operators cXxx()
        if (typeof funcMap[funcKey][prefix+"Inv1"] != "undefined" && mgConfig.invFmt == "sin<sup>-1</sup>" && mgConfig.fnFmt == "fn(x)") {fnformatLx = prefix+"Inv1"} //inverse fn(x)
        if (typeof funcMap[funcKey][prefix+"Inv1"] != "undefined" && mgConfig.invFmt == "sin<sup>-1</sup>" && mgConfig.fnFmt == "fn x")  {fnformatLx = prefix+"Inv2"} //inverse fn x
        if ((funcMap[funcKey][fnformatR] == ' ' || funcMap[funcKey][fnformatR] == ' <Xfxp>') && mgConfig.fnFmt == "fn x" && iXf < lSym && paramS[0].replace(/[\|\(\{](.*)[\|\)\}]/g,"").search(/[+(&minus;)]/) > -1 ) {paramS[0] = "("+paramS[0]+")"} //add parens to inside (fn x) functions
        if (iXf < lSym && prefix != "mg") {rTmp = rFunc(paramS,payload)} //enable right side function if parens match
        dXpr = dXpr.substr(0,bSym-(funcKey.length+1))+lFunc(paramS,payload)+rTmp+dXpr.substr(iXf+1,lSym); //assemble output
    }
    return dXpr
}

//LaTex Export/Import functions
var Ct = new Array(11000);

Ct[0]="\\alpha ";                                       //"fine structure const";
Ct[1]="\\alpha_{0}";                                    //"Bohr radius";
Ct[2]="b";                                              //"Wein displacement const.";
Ct[3]="c";                                              //"speed of light";
Ct[4]="c^2 ";                                           //"(speed of light)<sup>2</sup>";

Ct[5]="c_{1}";                                          //"1<sup>st</sup> radiation constant";
Ct[6]="c_{2}";                                          //"2<sup>nd</sup> radiation constant";
Ct[7]="\\epsilon_{0}";                                  //"vacuum permittivity";
Ct[8]="e";                                              //"Euler constant";
Ct[9]="eV";                                             //"electron volt";

Ct[10]="F";                                             //"Faraday constant";
Ct[11]="G";                                             //"Newton constant";
Ct[12]="g";                                             //"Earth gravity accel";
Ct[13]="G_{0}";                                         //"conductance quantum";
Ct[14]="h";                                             //"Planck constant";

Ct[15]="\\hbar ";                                       //"h-bar";
Ct[16]="K_{j}";                                         //"Josephson constant";
Ct[17]="k";                                             //"Boltzmann constant";
Ct[18]="\\lambda ";                                     //"Compton wavelength";
Ct[19]="l_{P}";                                         //"Planck length";

Ct[20]="\\mu_{0}";                                      //"vacuum permeability";
Ct[21]="\\mu_{B}";                                      //"Bohr magneton";
Ct[22]="M_{e}";                                         //"electron mass";
Ct[23]="M_{p}";                                         //"proton mass";
Ct[24]="M_{n}";                                         //"neutron mass";

Ct[25]="M_{P}";                                         //"Planck mass";
Ct[26]="M_{u}";                                         //"atomic mass constant";
Ct[27]="N_{a}";                                         //"Avogadro constant";
Ct[28]="n_{0}";                                         //"Loschmidt constant";
Ct[29]="\\pi ";                                         //"Archimedes constant";

Ct[30]="2 \\pi ";                                       //"2&times;&#960;";
Ct[31]="\\phi";                                         //"golden ratio";
Ct[32]="\\phi_{0}";                                     //"magnetic flux quantum";
Ct[33]="P_{atm}";                                       //"standard pressure";
Ct[34]="q_{e}";                                         //"elementary charge";

Ct[35]="R_{c}";                                         //"Universal gas constant";
Ct[36]="R_{k}";                                         //"von Klitzing constant";
Ct[37]="R_{\\infty}";                                   //"Rydberg constant";
Ct[38]="r_{e}";                                         //"classical electron radius";
Ct[39]="\\sigma ";                                      //"Stefan-Boltzmann";

Ct[40]="T_{P}";                                         //"Planck temperature";
Ct[41]="t_{P}";                                         //"Planck time";
Ct[42]="V_{m}";                                         //"molar volume";
Ct[43]="Z_{0}";                                         //"vacuum impedance";

for (iAl=48;iAl<10000;iAl++) {Ct[iAl]=""}
for (iAl=58;iAl<=127;iAl++)  {Ct[iAl]="\\textrm{"+String.fromCharCode(iAl)+"}"}//ascii
for (iAl=48;iAl<=57;iAl++)   {Ct[iAl]=String.fromCharCode(iAl)}//0-9
for (iAl=65;iAl<=90;iAl++) {Ct[iAl]="\\textbf{"+String.fromCharCode(iAl)+"}"}//A-Z
for (iAl=97;iAl<=122;iAl++) {Ct[iAl]="\\textbf{"+String.fromCharCode(iAl)+"}"}//a-z
for (iAl=10032;iAl<=10047;iAl++) {Ct[iAl]=String.fromCharCode(iAl-10000)}//punc
for (iAl=10065;iAl<=10090;iAl++) {Ct[iAl]=String.fromCharCode(iAl-10000)}//A-Z italic
for (iAl=10097;iAl<=10122;iAl++) {Ct[iAl]=String.fromCharCode(iAl-10000)}//a-z italic
for (iAl=10768;iAl<=10879;iAl++) {Ct[iAl]=""}//accents
var Greeks =   ["A","B","\\Gamma ","\\Delta ","E","Z","H","\\Theta ","I","K","\\Lambda ","M",
                "N","\\Xi ","O","\\Pi ","","\\Rho ","\\Sigma ","T","\\Upsilon ","\\Phi ","X","\\Psi ","\\Omega ",
                "","","","","","","",
                "\\alpha ","\\beta ","\\gamma ","\\delta ","\\epsilon ","\\zeta ","\\eta ","\\theta ","\\iota ","\\kappa ","\\lambda ","\\mu ",
                "\\nu ","\\xi ","o","\\pi ","","\\rho ","\\sigma ","\\tau ","\\upsilon ","\\phi ","\\chi ","\\psi ","\\omega "];
for (iAl=0;iAl<=Greeks.length;iAl++) {Ct[iAl+913] = Greeks[iAl]}

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
Ct[8592] = "\\leftarrow ";
Ct[8594] = "\\rightarrow ";
Ct[8596] = "\\leftrightarrow ";
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
for (iAl=11101;iAl<=11110;iAl++) {Ct[iAl]="C_{"+(iAl-11100)+"}"}//constants of integration
const tDelimiter = ["_",",","!","=","<",">","|","+","-","*","^","/","{","}","(",")","\\"," "];
//
function texExport(latXpr) { //convert MG format to LaTeX
    latXpr += "";
    if (latXpr == "NaN" || latXpr == "undefined") {return "undefined"}
    latXpr = cFunc(latXpr); //convert to func format
    latXpr = dFunc(latXpr, "latex"); //process functions
    //clean up extra parens
    latXpr = latXpr.replace(/\(/g,"%");
    var sCount = strCount(latXpr,"%");
    for (var nXs=0;nXs<sCount;nXs++) {
        var lPar = 1;
        var rPar = 0;
        var bSym = latXpr.indexOf("%")+1;
        var lSym = latXpr.length;
        for (var iXs=bSym;iXs<lSym;iXs++) {
            if (latXpr.charAt(iXs) == "%" ) {lPar++}
            if (latXpr.charAt(iXs) == ")" ) {rPar++}
            if (lPar == rPar) {break;}
        }
        var strg = latXpr.substr(bSym,iXs-bSym);
        if (latXpr.substr(bSym-1,7) == "%<Xdiv>" && latXpr.substr(iXs-6,7) == "<Xdve>)" && latXpr.substr(iXs+1,1) != "^" && strg.search(/\<Xdve\>(.*)\<Xdiv\>/) == -1) {
            latXpr = latXpr.substr(0,bSym-1)+strg+latXpr.substr(iXs+1,lSym);
        }
        else {
            latXpr = latXpr.substr(0,bSym-1)+"("+strg+")"+latXpr.substr(iXs+1,lSym);
        }
    }
    latXpr = latXpr.replace(/\<Xcel\>/g,",&").replace(/\<Xrow\>/g,"\\left\\{\\begin{array}{1}").replace(/\<Xrwe\>/g,"\\end{array}\\right\\}"); //resolve arrays
    latXpr = latXpr.replace(/\<X\w\w\w\>/g,"").replace(/\%/g,"("); //clean up tags
    //resolve symbols
    sCount = strCount(latXpr,"Cv[");
    for (var nXf=0;nXf<sCount;nXf++) {latXpr = latXpr.replace(/Cv\[\d+\]/,Ct[(latXpr.match(/Cv\[\d+\]/)+"").replace(/Cv\[(\d+)\]/,"$1")])} //resolve Cv[] symbols
    latXpr = latXpr.replace(/\(/g,"\\left(").replace(/\)/g,"\\right)").replace(/\\/g," \\").replace(/  /g," ").replace(/ _/g,"_").replace(/_ /g,"_").replace(/ \^/g,"^").replace(/\^ /g,"^").replace(/ \[/g,"[").replace(/\\ \\/g,"\\\\");//cleanup
    return latXpr;
}
//
function texImport(mgXpr) { //convert LaTeX to MG format
    function dedupBrackets(dB) { //remove redundant brackets
        var sCount = strCount(dB,"{");
        var nXf = 0,dparens = "";
        for (nXf=0;nXf<sCount;nXf++) {
            dparens = parseBrackets(dB,dB.lastIndexOf("{{")+1);
            if (dB.substr(dparens.end,2) == "}}" ) {
                dB = dB.substr(0,dB.lastIndexOf("{{")+1)+dparens.inside+dB.substr(dparens.end+1,dB.length)
            }
        }
        sCount = strCount(dB,"(");
        for (nXf=0;nXf<sCount;nXf++) {
            dparens = parseBrackets(dB,dB.lastIndexOf("((")+1);
            if (dB.substr(dparens.end,2) == "))" ) {
                dB = dB.substr(0,dB.lastIndexOf("((")+1)+dparens.inside+dB.substr(dparens.end+1,dB.length)
            }
        }
        return dB
    }
    function asciiTest(xA) {if ((xA >= 65 && xA <= 90) || (xA >= 97 && xA <= 122)) {return true} return false} //test for ascii symbols
    function funcselect(func,key) {return funcMap[func][key]}
    function matI(xM) {
        var mArray = xM.split("\\\\");
        var mReturn = ""
        for (var iM in mArray) {mArray[iM] = mArray[iM].split("&")}
        for (var iR in mArray) {
            mReturn = mReturn + "mat(" + mArray[iR] + ")"
            if (iR < mArray.length-1) {mReturn = mReturn + ","}
        }
        return "mat(" + mReturn + ")"
    }
    //
    const ulSymbols = ["\\int","\\sum","\\prod","\\cap","\\cup"];
    const ulFuncs  =  ["itg(","sum(","prd(","cap(","cup("];
    const lBrackets = ["{","[","|"];
    const rBrackets = ["}","]","|"];
    var sCount = 0,symTemp = "",tTemp = "",tFunc = 0,nXs = 0,nXf = 0,nXt = 0,nXi = 0,parmU = {},parmL = {},limitL = {},limitU = {},limitX = {},operand = {};
    if (mgXpr == "NaN" || mgXpr == "undefined") {return "undefined"}
    mgXpr += " ";
    mgXpr = mgXpr.replace(/\\big/g,"\\");//fix big
    mgXpr = mgXpr.replace(/\"/g,"\\").replace(/\'/g,"\\");//remove quotes
    mgXpr = mgXpr.replace(/\\(.)/g," \\$1").replace(/ \\\{/g,"\\{").replace(/ \\\}/g,"\\}");//fix slash whitespace
    mgXpr = mgXpr.replace(/\s+\{/g,"{").replace(/\s+\}/g,"}").replace(/\{\s+/g,"{").replace(/\}\s+/g,"}"); //fix brace whitespaces
    mgXpr = mgXpr.replace(/\{matrix\}/g,"{bmatrix}").replace(/\{pmatrix\}/g,"{bmatrix}").replace(/\{vmatrix\}/g,"{bmatrix}").replace(/\{Vmatrix\}/g,"{bmatrix}"); //convert all matrices to bmatrix
    sCount = strCount(mgXpr,"\\begin{bmatrix}"); //convert matrices
    for (nXf=0;nXf<sCount;nXf++) {
        var rTemp = mgXpr.substr(mgXpr.lastIndexOf("\\begin{bmatrix}")+"\\begin{bmatrix}".length,mgXpr.length);
        var mTemp = rTemp.substr(0,rTemp.indexOf("\\end{bmatrix}"));
        mgXpr = mgXpr.replace("\\begin{bmatrix}"+mTemp+"\\end{bmatrix}",matI(mTemp));
    }
    mgXpr = mgXpr.replace(/\s+/g," ").replace(/\\/g," \\").replace(/ _/g,"_").replace(/_ /g,"_").replace(/ \^/g,"^").replace(/\^ /g,"^").replace(/ \[/g,"[").replace(/ \(/g,"(").replace(/\\left /g,"\\left").replace(/\\right /g,"\\right");//fix whitespaces
    sCount = strCount(mgXpr,"\\\\");//convert line breaks
    for (nXf=0;nXf<sCount;nXf++) {mgXpr = mgXpr.replace(/\\\\/," ")}
    mgXpr = mgXpr.replace(/\\,/g," ").replace(/\\:/g," ").replace(/\\;/g," ").replace(/\\!/g," ").replace(/\\ /g,""); //fix special
    if (mgXpr.split("{").length != mgXpr.split("}").length) {Cs[9998] = "<span style='color:red'>Unmatched brackets</span>";return "Cv[9998]"} //check parens
    mgXpr = mgXpr.replace(/\\left\[/g,"sbr(").replace(/\\left\{/g,"cbr(").replace(/\\right\]/g,")").replace(/\\right\}/g,")");//convert brackets
    sCount = strCount(mgXpr,"\\");//convert left/right paren
    for (nXf=0;nXf<sCount;nXf++) {mgXpr = mgXpr.replace(/\\left\(/,"(").replace(/\\right\)/,")").replace(/\\left\\\(/,"(").replace(/\\right\\\)/,")")}
    for (var iBr in lBrackets){//convert left/right brackets
        sCount = strCount(mgXpr,"\\left\\"+lBrackets[iBr]);
        for (nXf=0;nXf<sCount;nXf++) {mgXpr = mgXpr.replace("\\left\\"+lBrackets[iBr],"cbr(").replace("\\right\\"+rBrackets[iBr],")")   }
    }
    sCount = strCount(mgXpr,"\\frac");//convert frac
    for (nXf=0;nXf<sCount;nXf++) {
        var numerator = parseBrackets(mgXpr,mgXpr.indexOf("\\frac")+5);
        var denominator = parseBrackets(mgXpr,numerator.end+1);
        if (numerator.inside.indexOf("+") > -1 || numerator.inside.indexOf("-") > -1){numerator.inside = "("+numerator.inside+")"}
        if (denominator.inside.indexOf("+") > -1 || denominator.inside.indexOf("-") > -1){denominator.inside = "("+denominator.inside+")"}
        mgXpr = mgXpr.substr(0,mgXpr.indexOf("\\frac"))+" ("+numerator.inside+"/"+denominator.inside+") "+mgXpr.substr(denominator.end+1,mgXpr.length);
    }
    sCount = strCount(mgXpr,"\\sqrt[");//convert sqrt_n
    for (nXf=0;nXf<sCount;nXf++) {
        parmU = parseBrackets(mgXpr,mgXpr.indexOf("\\sqrt[")+6);
        parmL = parseBrackets(mgXpr,parmU.end+2);
        mgXpr = mgXpr.substr(0,mgXpr.indexOf("\\sqrt["))+" nrt("+parmU.inside+","+parmL.inside+") "+mgXpr.substr(parmL.end+1,mgXpr.length);
    }
    sCount = strCount(mgXpr,"\\log_");//convert log_n
    for (nXf=0;nXf<sCount;nXf++) {
        parmU = parseBrackets(mgXpr,mgXpr.indexOf("\\log_")+5);
        parmL = parseBrackets(mgXpr,parmU.end+1);
        mgXpr = mgXpr.substr(0,mgXpr.indexOf("\\log_"))+" lgn("+parmU.inside+","+parmL.inside+") "+mgXpr.substr(parmL.end+1,mgXpr.length);
    }
    for (tFunc in funcMap) {//convert functions
        sCount = strCount(mgXpr,funcselect(tFunc,"texfunc"));
        for (nXf=0;nXf<sCount;nXf++) {
            symTemp = mgXpr.substr(mgXpr.indexOf(funcselect(tFunc,"texfunc")),mgXpr.length);
            for (nXi=1;nXi<symTemp.length;nXi++) {if (tDelimiter.indexOf(symTemp.charAt(nXi)) > -1){break}}
            if (symTemp.charAt(nXi) == "^") {//convert inverse fn^-1
                if (symTemp.substr(nXi,5) =="^{-1}") {
                    symTemp = symTemp.substr(1,nXi-1);
                    if (funcselect(tFunc,"texfunc") == "\\"+symTemp && funcselect(tFunc,"trig")) {
                        operand = parseBrackets(mgXpr,mgXpr.indexOf(funcselect(tFunc,"texfunc"))+funcselect(tFunc,"texfunc").length+5);
                        mgXpr = mgXpr.substr(0,mgXpr.indexOf(funcselect(tFunc,"texfunc")))+" "+funcselect(tFunc,"invfunc")+"("+operand.inside+")"+mgXpr.substr(operand.end,mgXpr.length);
                    }
                }
                else {//convert fn powers
                    var superscript = parseBrackets(mgXpr,mgXpr.indexOf(funcselect(tFunc,"texfunc"))+funcselect(tFunc,"texfunc").length+1);
                    operand = parseBrackets(mgXpr,superscript.end+1);
                    mgXpr = mgXpr.substr(0,mgXpr.indexOf(funcselect(tFunc,"texfunc")))+" "+tFunc+"("+operand.inside+")^("+superscript.inside+")"+mgXpr.substr(operand.end+1,mgXpr.length);
                }
            }
            else {//convert all other fn
                symTemp = symTemp.substr(1,nXi-1);
                if (funcselect(tFunc,"texfunc") == "\\"+symTemp) {
                    operand = parseBrackets(mgXpr,mgXpr.indexOf(funcselect(tFunc,"texfunc"))+funcselect(tFunc,"texfunc").length);
                    mgXpr = mgXpr.substr(0,mgXpr.indexOf(funcselect(tFunc,"texfunc")))+" "+tFunc+"("+operand.inside+")"+mgXpr.substr(operand.end+1,mgXpr.length);
                }
            }
        }
    }
    for (nXt in ulSymbols) {//convert u/l functions
        sCount = strCount(mgXpr,ulSymbols[nXt]+"_");
        for (nXf=0;nXf<sCount;nXf++) {
            limitL = parseBrackets(mgXpr,mgXpr.indexOf(ulSymbols[nXt]+"_")+ulSymbols[nXt].length+1);
            limitU = parseBrackets(mgXpr,limitL.end+1);
            limitL.inside = limitL.inside.replace("=","Cv[61]");
            if (mgXpr.charAt(limitL.end+1) == "^") {mgXpr = mgXpr.substr(0,mgXpr.indexOf(ulSymbols[nXt]+"_"))+ulFuncs[nXt]+limitU.inside+","+limitL.inside+") "+mgXpr.substr(limitU.end+1,mgXpr.length)}
            else {mgXpr = mgXpr.substr(0,mgXpr.indexOf(ulSymbols[nXt]+"_"))+ulFuncs[nXt]+","+limitL.inside+") "+mgXpr.substr(limitL.end+1,mgXpr.length)}
        }
        sCount = strCount(mgXpr,ulSymbols[nXt]+"^");
        for (nXf=0;nXf<sCount;nXf++) {
            limitU= parseBrackets(mgXpr,mgXpr.indexOf(ulSymbols[nXt]+"^")+ulSymbols[nXt].length+1);
            limitL = parseBrackets(mgXpr,limitU.end+1);
            limitL.inside = limitL.inside.replace("=","Cv[61]");
            if (mgXpr.charAt(limitU.end+1) == "_") {mgXpr = mgXpr.substr(0,mgXpr.indexOf(ulSymbols[nXt]+"^"))+ulFuncs[nXt]+limitU.inside+","+limitL.inside+") "+mgXpr.substr(limitL.end+1,mgXpr.length)}
            else {mgXpr = mgXpr.substr(0,mgXpr.indexOf(ulSymbols[nXt]+"^"))+ulFuncs[nXt]+limitU.inside+",) "+mgXpr.substr(limitU.end+1,mgXpr.length)}
        }
    }

    sCount = strCount(mgXpr,"\\lim_");//convert /lim
    for (nXf=0;nXf<sCount;nXf++) {
        limitX = parseBrackets(mgXpr,mgXpr.indexOf("\\lim_")+5);
        limitU = [limitX.inside,""];
        if (limitX.inside.indexOf("\\to") > -1) {limitU = limitX.inside.split("\\to")}
        if (limitX.inside.indexOf("\\rightarrow") > -1) {limitU = limitX.inside.split("\\rightarrow")}
        mgXpr = mgXpr.substr(0,mgXpr.indexOf("\\lim_"))+" lim("+limitU[0]+","+limitU[1]+") "+mgXpr.substr(limitX.end+1,mgXpr.length)
    }
    sCount = strCount(mgXpr,"_");//convert subscripts
    for (nXf=0;nXf<sCount;nXf++) {
        tTemp = mgXpr.charAt(mgXpr.indexOf("_")+1)
        if (tTemp == "{" || tTemp == "(") {
            var subscript = parseBrackets(mgXpr,mgXpr.indexOf("_"));
            mgXpr = mgXpr.substr(0,mgXpr.indexOf("_"))+" sbt("+subscript.inside+") "+mgXpr.substr(subscript.end+1,mgXpr.length)
        }
        else {
            for (nXi=mgXpr.indexOf("_")+1;nXi<mgXpr.length;nXi++) {if (tDelimiter.indexOf(mgXpr.charAt(nXi)) > -1){break}}
            if (mgXpr.substr(mgXpr.indexOf("_"),nXi).search(/[a-z][a-z][a-z]\(\)/i) == -1) {mgXpr = mgXpr.substr(0,mgXpr.indexOf("_"))+" sbt("+tTemp+") "+mgXpr.substr(mgXpr.indexOf("_")+2,mgXpr.length)}
            else {mgXpr = mgXpr.replace(/_/,"")}
        }
    }

    sCount = strCount(mgXpr,"^");//convert superscripts
    for (nXf=0;nXf<sCount;nXf++) {
        tTemp = mgXpr.charAt(mgXpr.indexOf("^")+1)
        if (tTemp == "{" || tTemp == "(") {
            var superscr = parseBrackets(mgXpr,mgXpr.indexOf("^")+1);
            if (superscr.inside.length > 1) {mgXpr = mgXpr.substr(0,mgXpr.indexOf("^"))+" ^("+superscr.inside+") "+mgXpr.substr(superscr.end+1,mgXpr.length)}
        }
    }
    sCount = strCount(mgXpr,"\\");//convert symbols
    for (nXf=0;nXf<sCount;nXf++) {
        symTemp = mgXpr.substr(mgXpr.indexOf("\\"),mgXpr.length);
        for (nXi=1;nXi<symTemp.length;nXi++) {if (tDelimiter.indexOf(symTemp.charAt(nXi)) > -1){break}}
        symTemp = symTemp.substr(1,nXi-1);
        for (nXs=1;nXs<=9500;nXs++) {if (typeof Ct[nXs] != "undefined" && (Ct[nXs] == "\\"+symTemp || Ct[nXs] == "\\"+symTemp+" ")) {mgXpr = mgXpr.replace("\\"+symTemp," Cv["+nXs+"]");break} }
    }
    sCount = strCount(mgXpr,"\\");//remove unknown tags
    for (nXf=0;nXf<sCount;nXf++) {
        symTemp = mgXpr.substr(mgXpr.indexOf("\\"),mgXpr.length);
        for (nXi=1;nXi<symTemp.length;nXi++) {if (",!=<>|+-*^/{}()\\ ".indexOf(symTemp.charAt(nXi)) > -1){break}}
        symTemp = symTemp.substr(1,nXi-1);
        mgXpr = mgXpr.replace("\\"+symTemp,"");
    }
    for (nXf=0;nXf<mgXpr.length;nXf++) {//convert variables
        for (tFunc in funcMap) {if (mgXpr.substr(nXf,4) == tFunc+"(") {nXf = nXf+3;break}}
        if (mgXpr.substr(nXf,3) == "Cv[") {nXf = nXf+3}
        var asciiChar = mgXpr.charAt(nXf).charCodeAt(0);
        if (asciiTest(asciiChar)) {mgXpr = mgXpr.substr(0,nXf)+"Cv["+(asciiChar+10000)+"]"+mgXpr.substr(nXf+1,mgXpr.length);nXf = nXf+6}
    }
    mgXpr = mgXpr.replace(/ /g,""); //cleanup spaces
    mgXpr = mgXpr.replace(/\(Cv\[10100\]\)/g,"Cv[10100]");
    sCount = strCount(mgXpr,"Cv[10100]");//convert derivatives
    for (nXf=0;nXf<sCount;nXf++) {
        mgXpr = mgXpr.replace(/\(Cv\[10100\]\/Cv\[10100\]Cv\[(\d+)\]\)/,"tdr(Cv[$1])");
        mgXpr = mgXpr.replace(/\(Cv\[10100\]Cv\[(\d+)\]\/Cv\[10100\]Cv\[(\d+)\]\)/,"sdr(Cv[$1],Cv[$2])");
        //nth derivative
        mgXpr = mgXpr.replace(/\(Cv\[10100\]\^\d+\/Cv\[10100\]Cv\[(\d+)\]\^(\d+)\)/,"tdr(Cv[$1],$2)");
        mgXpr = mgXpr.replace(/\(Cv\[10100\]\^\d+Cv\[(\d+)\]\/Cv\[10100\]Cv\[(\d+)\]\^(\d+)\)/,"sdr(Cv[$1],Cv[$2],$3)");
    }
    mgXpr = mgXpr.replace(/\(Cv\[8706\]\)/g,"Cv[8706]");
    sCount = strCount(mgXpr,"Cv[8706]");//convert partial derivatives
    for (nXf=0;nXf<sCount;nXf++) {
        mgXpr = mgXpr.replace(/\(Cv\[8706\]\/Cv\[8706\]Cv\[(\d+)\]\)/,"idr(Cv[$1])");
        mgXpr = mgXpr.replace(/\(Cv\[8706\]Cv\[(\d+)\]\/Cv\[8706\]Cv\[(\d+)\]\)/,"psd(Cv[$1],Cv[$2])");
        //nth derivative
        mgXpr = mgXpr.replace(/\(Cv\[8706\]\^\d+\/Cv\[8706\]Cv\[(\d+)\]\^(\d+)\)/,"idr(Cv[$1],$2)");
        mgXpr = mgXpr.replace(/\(Cv\[8706\]\^\d+Cv\[(\d+)\]\/Cv\[8706\]Cv\[(\d+)\]\^(\d+)\)/,"psd(Cv[$1],Cv[$2],$3)");
    }
    sCount = strCount(mgXpr,"Cv[10100]");//convert differentials
    for (nXf=0;nXf<sCount;nXf++) {
        mgXpr = mgXpr.replace(/\{Cv\[10100\]\}/,"Cv[10100]").replace(/Cv\[10100\]Cv\[(\d+)\]/,"Cv[8748]Cv[$1]");
    }
    mgXpr = mgXpr.replace(/Cv\[10101\]/g,"Cv[8]").replace(/Cv\[10105\]/g,"Cv[46]").replace(/Cv\[215\]/g,"*"); //special variables
    mgXpr = mgXpr.replace(/ /g,"").replace(/\{/g,"").replace(/\}/g,"").replace(/_/g,"").replace(/\'/g,"Cv[8242]").replace(/\`/g,"Cv[8242]");//cleanup
    mgXpr = dedupBrackets(mgXpr);
    return mgXpr
}

// node.js export
if (typeof module ==  "object") {
    module.exports = {
        mgConfig:   mgConfig,
        Cv:         Cv,
        Cs:         Cs,
        funcMap:    funcMap,
        parseParens:function(xB,bSym) {return parseParens(xB,bSym)},
        cFunc:      function(expression) {return cFunc(expression)},
        mgExport:   function(expression) {return mgExport(expression)},
        htmlExport: function(expression) {return htmlExport(expression)},
        texExport:  function(expression) {return texExport(expression)},
        texImport:  function(expression) {return texImport(expression)},
        mgTranslate:function(expression,scale) {return mgTranslate(expression,scale)},
        mgOutput:   function(expression,scale) {return mgOutput(expression,scale)},
    }
}
//