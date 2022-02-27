/*
    MathGene Translation/Rendering Library - Version 2.0
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

// external objects
var mgConfig =
{
    trigBase:   1,          //trig base 1=radians. Math.pi/180 for degrees, Math.pi/200 gradians
    divScale:   85,         //default scale factor for x/y division in percent
    divSymbol:  "Over",     //default HTML divide symbol "Slash" or "Over"
    fnFmt:      "fn(x)",    //function format "fn(x)" or "fn x"
    invFmt:     "asin",     //inverse trig function format "asin" or "sin<sup>-1</sup>"
    cplxFmt:    "Rect",     //complex numbers "Rect" or "Polar"
    pctFactor:  100,        //percent factor 100 for percent, 1 for n.nn decimal
    dPrecision: 16,         //decimal precision
    Domain:     "Complex",  //domain Complex or Real
    editMode:   false,      //edit mode formatting
    htmlFont:   "Times,Serif", //default HTML font-family
}

var Cv = new Array(11000); //symbol array

// internal functions
var mgTrans = function() {
    //Initialize symbol arrays
    var Cs = new Array(11000); //html symbols
    var Cd = new Array(50); //constant description
    var Cu = new Array(50); //constant units
    var Ct = new Array(11000); //latex symbols
    //Initialize constants
    Cv[0] = 7.2973525698e-3;    Cu[0]="";               Cs[0]="&#945;";                                         Cd[0]="fine structure const";
    Cv[1] = 5.2917721092e-11;   Cu[1]="m";              Cs[1]="&#945;<span style='font-size:50%'>0</span>";     Cd[1]="Bohr radius";
    Cv[2] = 2.8977721e-3;       Cu[2]="m&#8226;K";      Cs[2]="<i>b</i>";                                       Cd[2]="Wein displacement const.";
    Cv[3] = 299792458;          Cu[3]="m/s";            Cs[3]="<i>c</i>";                                       Cd[3]="speed of light";
    Cv[4] = 0.577215664901532;  Cu[4]="";               Cs[4]="&#947;";                                         Cd[4]="Euler-Mascheroni constant";

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

    Cv[45] = "Cv[45]";          Cs[45]="!";
    Cv[46] = {r:0, i:1};        Cs[46] = "<i>i</i>"; //imaginary constant
    Cv[8230] = 0;

    //Initialize html symbols
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

    //Initialize LaTex ExportImport symbols
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
                    "N","\\Xi ","O","\\Pi ","\\Rho ","","\\Sigma ","T","\\Upsilon ","\\Phi ","X","\\Psi ","\\Omega ",
                    "","","","","","","",
                    "\\alpha ","\\beta ","\\gamma ","\\delta ","\\epsilon ","\\zeta ","\\eta ","\\theta ","\\iota ","\\kappa ","\\lambda ","\\mu ",
                    "\\nu ","\\xi ","o","\\pi ","\\rho ","","\\sigma ","\\tau ","\\upsilon ","\\phi ","\\chi ","\\psi ","\\omega "];
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
    // expanded parens
    var xParenL = "<table style='text-align:center;display:inline-table;vertical-align:middle;'><tr><td style='border-left:2px solid black;border-top:2px solid black;border-bottom:2px solid black;border-radius: 10px 0 0 10px;'>&nbsp;<td><table><tr><td style='line-height: 70%'>";
    var xParenR = "</tr></td></table></td><td style='border-right:2px solid black;border-top:2px solid black;border-bottom:2px solid black;border-radius: 0 10px 10px 0;'>&nbsp;</td></tr></table>";
    
    //HTML/LaTex Translation map for functions
    const funcMap =
    {
    cDiv:{ //divide
        htmlL1: function (parm) {return htmlFuncs['cDivL'](parm[0],parm[1])},
        htmlR1:'',
        htmlL2: function (parm) {return htmlFuncs['cDivL'](parm[0],parm[1])},
        htmlR2:'',
        texfunc:['\\frac'],
        texparms: function(parm){
                                var numerator = parseBrackets(parm,parm.indexOf("\\frac")+5);
                                var denominator = parseBrackets(parm,numerator.end+1);
                                if (numerator.inside.indexOf("+") > -1 || numerator.inside.indexOf("-") > -1){numerator.inside = "("+numerator.inside+")"}
                                if (denominator.inside.indexOf("+") > -1 || denominator.inside.indexOf("-") > -1){denominator.inside = "("+denominator.inside+")"}
                                return {upper:numerator.inside,lower:denominator.inside,end:denominator.end,delim:"/",func:' '} 
                                },
        latexL1: function (parm) {return '<Xdiv>\\frac{'+oBrackets(parm[0])+'}{'+oBrackets(parm[1])+'}<Xdve>'},
        latexR1:'',
        latexL2: function (parm) {return '<Xdiv>\\frac{'+oBrackets(parm[0])+'}{'+oBrackets(parm[1])+'}<Xdve>'},
        latexR2:'',
        mg: function (parm) {return mgFuncs['cDivE'](parm[0],parm[1])},
        },
    asn:{
        htmlL1: function (parm) {return '<Xfnc>asin<Xfnx>('+parm[0]},
        htmlR1:')',
        htmlL2: function (parm) {return '<Xfnc>asin '+parm[0]},
        htmlR2:' <Xfxp>',
        htmlInv1: function (parm) {return '<Xfnc>sin<sup>-1</sup><Xfnx>('+parm[0]},
        htmlInv2: function (parm) {return '<Xfnc>sin<sup>-1</sup> <Xfnx>'+parm[0]},
        trig:true,
        texfunc:['\\sin^{-1}','\\arcsin'],
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
        trig:true,
        texfunc:['\\cos^{-1}','\\arccos'],
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
        trig:true,
        texfunc:['\\tan^{-1}','\\arctan'],
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
        trig:true,
        texfunc:['\\sec^{-1}','\\arcsec'],
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
        trig:true,
        texfunc:['\\csc^{-1}','\\arccsc'],
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
        trig:true,
        texfunc:['\\cot^{-1}','\\arccot'],
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
        trig:true,
        texfunc:['\\sinh^{-1}','\\arcsinh'],
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
        trig:true,
        texfunc:['\\cosh^{-1}','\\arccosh'],
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
        trig:true,
        texfunc:['\\tanh^{-1}','\\arctanh'],
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
        trig:true,
        texfunc:['\\sech^{-1}','\\arcsech'],
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
        trig:true,
        texfunc:['\\csch^{-1}','\\arccsch'],
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
        trig:true,
        texfunc:['\\coth^{-1}','\\arccoth'],
        latexL1: function (parm) {return '\\arccoth(<Xfnx>'+parm[0]},
        latexR1:')',
        latexL2: function (parm) {return '\\arccoth {'+parm[0]},
        latexR2:'}',
        latexInv1: function (parm) {return '\\coth^{-1}(<Xfnx>'+parm[0]},
        latexInv2: function (parm) {return '\\coth^{-1} {'+parm[0]},
        mg: function (parm) {return 'azh('+parm[0]+')'},
        },
    snh:{
        htmlL1: function (parm) {return '<Xfnc>sinh<Xfnx>('+parm[0]},
        htmlR1:')',
        htmlL2: function (parm) {return '<Xfnc>sinh<Xfxp> '+parm[0]},
        htmlR2:' ',
        trig:true,
        invfunc:'ash',
        texfunc:['\\sinh'],
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
        texfunc:['\\cosh'],
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
        texfunc:['\\tanh'],
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
        texfunc:['\\sech'],
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
        texfunc:['\\csch'],
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
        texfunc:['\\coth'],
        latexL1: function (parm) {return '\\coth(<Xfnx>'+parm[0]},
        latexR1:')',
        latexL2: function (parm) {return '\\coth<Xfxp> {'+parm[0]},
        latexR2:'}',
        mg: function (parm) {return 'cth('+parm[0]+')'},
        },
    sin:{
        htmlL1: function (parm) {return '<Xfnc>sin<Xfnx>('+parm[0]},
        htmlR1:')',
        htmlL2: function (parm) {return '<Xfnc>sin<Xfxp> '+parm[0]},
        htmlR2:' ',
        trig:true,
        invfunc:'asn',
        texfunc:['\\sin'],
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
        texfunc:['\\cos'],
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
        texfunc:['\\tan'],
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
        texfunc:['\\sec'],
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
        texfunc:['\\csc'],
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
        texfunc:['\\cot'],
        latexL1: function (parm) {return '\\cot(<Xfnx>'+parm[0]},
        latexR1:')',
        latexL2: function (parm) {return '\\cot<Xfxp> {'+parm[0]},
        latexR2:'}',
        mg: function (parm) {return 'cot('+parm[0]+')'},
        },

    cbt:{  //cube root
        htmlL1: function (parm,strg) {return htmlFuncs['radL'](1,strg)+parm[0]},
        htmlR1: function () {return htmlFuncs['radR']()},
        htmlL2: function (parm,strg) {return funcMap['cbt']['htmlL1'](parm,strg)},
        htmlR2: function () {return htmlFuncs['radR']()},
        texfunc:['\\sqrt[3]'],
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
        texfunc:['\\sqrt['],
        texparms: function (parm){var parmU = parseBrackets(parm,parm.indexOf("\\sqrt[")+6);
                                 var parmL = parseBrackets(parm,parmU.end+2);
                                 return {upper:parmU.inside,lower:parmL.inside,end:parmL.end,delim:",",func:'nrt'}
                                 },
        latexL1: function (parm) {return '\\sqrt['+parm[0]+']{'+parm[1]},
        latexR1:'}',
        latexL2: function (parm) {return '\\sqrt['+parm[0]+']{'+parm[1]},
        latexR2:'}',
        mg: function (parm) {return 'nrt('+parm[0]+','+parm[1]+')'},
        },
    sqt:{ //square root
        htmlL1: function (parm,strg) {return htmlFuncs['radL'](0,strg)+parm[0]},
        htmlR1: function () {return htmlFuncs['radR']()},
        htmlL2: function (parm,strg) {return funcMap['sqt']['htmlL1'](parm,strg)},
        htmlR2: function () {return htmlFuncs['radR']()},
        texfunc:['\\sqrt'],
        latexL1: function (parm) {return '\\sqrt{'+parm[0]},
        latexR1:'}',
        latexL2: function (parm) {return '\\sqrt{'+parm[0]},
        latexR2:'}',
        mg: function (parm) {return 'sqt('+parm[0]+')'},
        },
    lgn:{ //nth log
        htmlL1: function (parm) {return '<Xfnc>log<sub>'+parm[0]+'</sub><Xfnx>('+parm[1]},
        htmlR1:')',
        htmlL2: function (parm) {return '<Xfnc>log<sub>'+parm[0]+'</sub> '+parm[1]},
        htmlR2:' <Xfxp>',
        texfunc:['\\log_'],
        texparms: function (parm){var parmU = parseBrackets(parm,parm.indexOf("\\log_")+5);
                                 var parmL = parseBrackets(parm,parmU.end+1);
                                 return {upper:parmU.inside,lower:parmL.inside,end:parmL.end,delim:",",func:'lgn'}
                                 },
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
        texfunc:['\\log'],
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
        texfunc:['\\ln'],
        latexL1: function (parm) {return '\\ln(<Xfnx>'+parm[0]},
        latexR1:')',
        latexL2: function (parm) {return '\\ln {'+parm[0]},
        latexR2:'}<Xfxp>',
        mg: function (parm) {return 'lne('+parm[0]+')'},
        },
    int:{ //integer component
        htmlL1: function (parm,strg) {return "<table style='text-align:center;display:inline-table;vertical-align:middle;'><tr><td style='border-left:3px solid black;border-bottom:1px solid black;'>&nbsp;</td><td><table><tr><td style='line-height: 50%'>"+parm[0]},
        htmlR1: function (parm,strg) {return "</tr></td></table></td><td style='border-right:3px solid black;border-bottom:1px solid black;'>&nbsp;</td></tr></table>"},
        htmlL2: function (parm,strg) {return funcMap['int']['htmlL1'](parm,strg)},
        htmlR2: function (parm,strg) {return funcMap['int']['htmlR1'](parm,strg)},
        texfunc:['\\lfloor'],
        latexL1: function (parm) {return '\\left\\lfloor '+parm[0]},
        latexR1:'\\right\\rfloor ',
        latexL2: function (parm) {return '\\left\\lfloor '+parm[0]},
        latexR2:'\\right\\rfloor ',
        mg: function (parm) {return 'int('+parm[0]+')'},
        },
    cei:{  //ceiling
        htmlL1: function (parm,strg) {return "<table style='text-align:center;display:inline-table;vertical-align:middle;'><tr><td style='border-left:3px solid black;border-top:1px solid black;'>&nbsp;<td><table><tr><td style='line-height: 50%'>"+parm[0]},
        htmlR1: function (parm,strg) {return "</tr></td></table></td><td style='border-right:3px solid black;border-top:1px solid black;'>&nbsp;</td></tr></table>"},
        htmlL2: function (parm,strg) {return funcMap['cei']['htmlL1'](parm,strg)},
        htmlR2: function (parm,strg) {return funcMap['cei']['htmlR1'](parm,strg)},
        texfunc:[],
        latexL1: function (parm) {return '\\left\\lceil '+parm[0]},
        latexR1:'\\right\\rceil ',
        latexL2: function (parm) {return '\\left\\lceil '+parm[0]},
        latexR2:'\\right\\rceil ',
        mg:  function (parm) {return 'cei('+parm[0]+')'},
        },
    abs:{ //absolute value
        htmlL1: function (parm,strg) {return "<span style='text-align:center;display:inline-table;vertical-align:middle;border-left:2px solid black;border-right:2px solid black;line-height:70%;'>"+parm[0]},
        htmlR1: function (parm,strg) {return "</span>"},
        htmlL2: function (parm,strg) {return funcMap['abs']['htmlL1'](parm,strg)},
        htmlR2: function (parm,strg) {return funcMap['abs']['htmlR1'](parm,strg)},
        texfunc:['\\|'],
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
        texfunc:['\\erf'],
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
        texfunc:['\\erfc'],
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
        texfunc:['\\arg'],
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
        texfunc:['\\exp'],
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
        texfunc:['\\overline'],
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
        texfunc:[],
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
        texfunc:[],
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
        texfunc:[],
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
        texfunc:[],
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
        texfunc:[],
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
        texfunc:[],
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
        texfunc:[],
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
        texfunc:[],
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
        texfunc:[],
        latexL1: function (parm) {return '\\Im(<Xfnx>'+parm[0]},
        latexR1:')',
        latexL2: function (parm) {return '\\Im(<Xfnx>'+parm[0]},
        latexR2:')',
        mg: function (parm) {return 'imx('+parm[0]+')'},
        },
    sbr:{ //straight bracket
        htmlL1: function (parm,strg) {return "<table style='text-align:center;display:inline-table;vertical-align:middle;'><tr><td style='border-left:3px solid black;border-top:1px solid black;border-bottom:1px solid black;'>&nbsp;<td><table><tr><td style='line-height: 50%'>"+parm[0]},
        htmlR1: function (parm,strg) {return "</tr></td></table></td><td style='border-right:3px solid black;border-top:1px solid black;border-bottom:1px solid black;'>&nbsp;</td></tr></table>"},
        htmlL2: function (parm,strg) {return funcMap['sbr']['htmlL1'](parm,strg)},
        htmlR2: function (parm,strg) {return funcMap['sbr']['htmlR1'](parm,strg)},
        texfunc:[],
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
        texfunc:[],
        latexL1: function (parm) {return '\\left\\{'+parm[0]},
        latexR1:'\\right\\}',
        latexL2: function (parm) {return '\\left\\{'+parm[0]},
        latexR2:'\\right\\}',
        mg: function (parm) {return 'cbr('+parm[0]+')'},
        },
    fac:{ //factorial from FUNC
        mg: function (parm) {if (!numTest(parm[0]) && mgTrans.cFunc(parm[0]) != oParens(parm[0])) {return xParens(parm[0])+"Cv[45]"};return parm[0]+"Cv[45]"},
        },
    sum:{ //summation
        htmlL1: function (parm) {return htmlFuncs['overUnder'](parm[0],parm[1],'&#8721;',125)},
        htmlR1:' ',
        htmlL2: function (parm) {return htmlFuncs['overUnder'](parm[0],parm[1],'&#8721;',125)},
        htmlR2:' ',
        texfunc:['\\sum_','\\sum^'],
        texparms: function(parm) {return ulFuncs(parm,'\\sum','sum')},
        latexL1: function (parm) {return '\\sum_{'+parm[1]+'}^{'+parm[0]+'}'},
        latexR1:' ',
        latexL2: function (parm) {return '\\sum_{'+parm[1]+'}^{'+parm[0]+'}'},
        latexR2:' ',
        mg: function (parm) {return 'sum('+parm[0]+','+parm[1]+')'},
        },
    smm:{ //summation from FUNC
        mg: function (parm) {return  'sum('+parm[1]+','+parm[2]+'Cv[61]'+parm[3]+')'+parm[0]},
        },
    prd:{ //product
        htmlL1: function (parm) {return htmlFuncs['overUnder'](parm[0],parm[1],'&#8719;',125)},
        htmlR1:' ',
        htmlL2: function (parm) {return htmlFuncs['overUnder'](parm[0],parm[1],'&#8719;',125)},
        htmlR2:'',
        texfunc:['\\prod_','\\prod^'],
        texparms: function(parm) {return ulFuncs(parm,'\\prod','prd')},
        latexL1: function (parm) {return '\\prod_{'+parm[1]+'}^{'+parm[0]+'}'},
        latexR1:' ',
        latexL2: function (parm) {return '\\prod_{'+parm[1]+'}^{'+parm[0]+'}'},
        latexR2:' ',
        mg: function (parm) {return 'prd('+parm[0]+','+parm[1]+')'},
        },
    pmm:{ //product from FUNC
        mg: function (parm) {return  'prd('+parm[1]+','+parm[2]+'Cv[61]'+parm[3]+')'+parm[0]},
        },
    itg:{ //definite integral
        htmlL1: function (parm) {return "<Xdiv><span style='display:inline-block;vertical-align:middle;'><table cellpadding='0' cellspacing='0'><tr><td rowspan='4'><span style='vertical-align:middle;display:inline-table;'><span style='display:table-row;line-height:90%'>&#8992;</span><span style='display:table-row;line-height:90%'>&#8993;</span></span></td><tr><td style='font-size:45%'>"+parm[0]+"</td></tr><tr><td>&nbsp;</td></tr><td style='font-size:45%'>"+parm[1]+"</td></tr></table></span><Xdve>"},
        htmlR1:' ',
        htmlL2: function (parm) {return funcMap['itg']['htmlL1'](parm)},
        htmlR2:'',
        texfunc:['\\int_','\\int^'],
        texparms: function(parm) {return ulFuncs(parm,'\\int','itg')},
        latexL1: function (parm) {return '\\int_{'+parm[1]+'}^{'+parm[0]+'}'},
        latexR1:' ',
        latexL2: function (parm) {return '\\int_{'+parm[1]+'}^{'+parm[0]+'}'},
        latexR2:' ',
        mg: function (parm) {return 'itg('+parm[0]+','+parm[1]+')'},
        },
    drv:{ //partial derivative from FUNC
        mg: function (parm) {if (typeof parm[2] == "undefined") {return "(idr("+parm[1]+")"+parm[0]+")"};return "(idr("+parm[1]+","+parm[2]+")"+parm[0]+")"},
        },
    tdv:{ //total derivative from FUNC
        mg: function (parm) {if (typeof parm[2] == "undefined") {return "(tdr("+parm[1]+")"+parm[0]+")"};return "(tdr("+parm[1]+","+parm[2]+")"+parm[0]+")"},
        },
    tdr:{ //derivative
        htmlL1: function (parm) {return htmlFuncs['tdrL'](parm[0],parm[1])},
        htmlR1:'',
        htmlL2: function (parm) {return htmlFuncs['tdrL'](parm[0],parm[1])},
        htmlR2:'',
        texfunc:[],
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
        texfunc:[],
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
        texfunc:[],
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
        texfunc:[],
        latexL1: function (parm) {return latexFuncs['psdX'](parm[0],parm[1],parm[3])},
        latexR1:'',
        latexL2: function (parm) {return latexFuncs['psdX'](parm[0],parm[1],parm[3])},
        latexR2:'',
        mg: function (parm) {return 'psd('+parm[0]+','+parm[1]+')'},
        },
    cup:{ //cup
        htmlL1: function (parm) {return htmlFuncs['overUnder'](parm[0],parm[1],'&#8746;',150)},
        htmlR1:'',
        htmlL2: function (parm) {return htmlFuncs['overUnder'](parm[0],parm[1],'&#8746;',150)},
        htmlR2:' ',
        texfunc:['\\cup_','\\cup^'],
        texparms: function(parm) {return ulFuncs(parm,'\\cup','cup')},
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
        texfunc:['\\cap_','\\cap^'],
        texparms: function(parm) {return ulFuncs(parm,'\\cap','cap')},
        latexL1: function (parm) {return '\\cup_{'+parm[1]+'}^{'+parm[0]+'}'},
        latexR1:'',
        latexL2: function (parm) {return '\\cup_{'+parm[1]+'}^{'+parm[0]+'}'},
        latexR2:'',
        mg: function (parm) {return 'cap('+parm[0]+','+parm[1]+')'},
        },
    hat:{ //hat
        htmlL1: function (parm) {return htmlFuncs['fAccentU']("<i>&#8963;</i>")+parm[0]},
        htmlR1: function () {return htmlFuncs['fAccentL']("<span style='line-height:50%'>&nbsp;</span>")},
        htmlL2: function (parm) {return htmlFuncs['fAccentU']("<i>&#8963;</i>")+parm[0]},
        htmlR2: function () {return htmlFuncs['fAccentL']("<span style='line-height:50%'>&nbsp;</span>")},
        texfunc:['\\hat'],
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
        texfunc:['\\underline'],
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
        texfunc:['\\dot'],
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
        texfunc:['\\tilde'],
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
        texfunc:[],
        latexL1: function (parm) {return parm[0]},
        latexR1:'',
        latexL2: function (parm) {return parm[0]},
        latexR2:'',
        mg: function (parm) {return parm[0]},
        },
    dif:{ //differential from FUNC
        mg: function (parm) {return 'Cv[8748]'+parm[0]},
        },
    mat:{ //matrix
        htmlL1: function (parm) {return htmlFuncs['matL'](parm)},
        htmlR1:'',
        htmlL2: function (parm) {return htmlFuncs['matL'](parm)},
        htmlR2:'',
        texfunc:[],
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
        texfunc:['\\det'],
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
        texfunc:['\\tr'],
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
        texfunc:[],
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
        texfunc:[],
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
        texfunc:[],
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
        texfunc:[],
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
        texfunc:[],
        latexL1: function (parm) {return parm[0]+' '+parm[1]},
        latexR1:'',
        latexL2: function (parm) {return parm[0]+' '+parm[1]},
        latexR2:'',
        mg: function (parm) {return mgFuncs['cMulE'](parm[0],parm[1])},
        },
    cNeg:{ //negative
        htmlL1: function (parm) {return htmlFuncs['cNegL'](parm[0])},
        htmlR1:'',
        htmlL2: function (parm) {return htmlFuncs['cNegL'](parm[0])},
        htmlR2:'',
        texfunc:[],
        latexL1: function (parm) {return '-'+parm[0]},
        latexR1:'',
        latexL2: function (parm) {return '-'+parm[0]},
        latexR2:'',
        mg: function (parm) {xTractU = oprExtract(mgTrans.cFunc(parm[0]));if (["cAdd","cSub","cDiv"].indexOf(xTractU.func)+1) {return "-" + xParens(parm[0])};return "-" + parm[0]},
        },
    cAng:{ //angle (polar form)
        htmlL1: function (parm) {return parm[0]+'&#8736;'+parm[1]},
        htmlR1:'',
        htmlL2: function (parm) {return parm[0]+'&#8736;'+parm[1]},
        htmlR2:'',
        texfunc:[],
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
        texfunc:[],
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
        relop:true,
        texfunc:[],
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
        relop:true,
        texfunc: function() {return ">"},
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
        relop:true,
        texfunc: function() {return "<"},
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
        relop:true,
        texfunc: function() {return "\\geq"},
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
        relop:true,
        texfunc: function() {return "\\leq"},
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
        relop:true,
        texfunc: function() {return "\\neq"},
        latexL1: function (parm) {return parm[0]+'\\neq '+parm[1]},
        latexR1:'',
        latexL2: function (parm) {return parm[0]+'\\neq '+parm[1]},
        latexR2:'',
        mg: function (parm) {return parm[0]+'Cv[8800]'+parm[1]},
        },
    ntg:{  //integral from FUNC
        mg: function (parm) {if (typeof parm[2]=="undefined" && typeof parm[3]=="undefined") {return "Cv[8747]"+parm[0]+"Cv[8748]"+parm[1]};return "itg("+parm[2]+","+parm[3]+")"+parm[0]+"Cv[8748]"+parm[1]}
    },
    ntp:{  //integral container from FUNC
        mg: function (parm) {return funcMap['ntg']['mg'](parm)},
    },
    lim:{ //limit
        htmlL1: function (parm) {return "<Xfnc><span style='display:inline-block;'><span style='text-align:center;vertical-align:middle;display:inline-table;'><span style='display:table-row;font-size:40%'>&nbsp;</span><span style='line-height:50%;display:table-row;'>lim </span><span style='display:table-row;font-size:60%'>"+parm[0]+"&#8594;"+parm[1]+"</span></span></span>"},
        htmlR1:' ',
        htmlL2: function (parm) {return funcMap['lim']['htmlL1'](parm)},
        htmlR2:'',
        texfunc:['{ \\lim} \\limits_','\\lim_'],
        texparms: function(parm){
                                var limitX = {},limitU = {};
                                if (parm.indexOf("{ \\lim} \\limits_") > -1) {limitX = parseBrackets(parm,parm.indexOf("{ \\lim} \\limits_")+15)}
                                else {limitX = parseBrackets(parm,parm.indexOf("\\lim_")+5)}
                                limitU = [limitX.inside,""];
                                if (limitX.inside.indexOf("\\to") > -1) {limitU = limitX.inside.split("\\to")}
                                if (limitX.inside.indexOf("\\rightarrow") > -1) {limitU = limitX.inside.split("\\rightarrow")}
                                return {upper:limitU[0],lower:limitU[1],end:limitX.end,delim:",",func:'lim'}       
                                },
        latexL1: function (parm) {return '\\lim_{'+parm[0]+' \\to '+parm[1]+'}'},
        latexR1:' ',
        latexL2: function (parm) {return '\\lim_{'+parm[0]+' \\to '+parm[1]+'}'},
        latexR2:' ',
        mg: function (parm) {return 'lim('+parm[0]+','+parm[1]+')'},
        },
    lmt:{ //limit from FUNC
        mg: function (parm) {return 'lim('+parm[1]+','+parm[2]+')'+parm[0]},
        },
    sbt:{ //subscript
        htmlL1: function (parm) {return '<sub><sub>'+parm[0]+'</sub></sub>'},
        htmlR1:'',
        htmlL2: function (parm) {return '<sub><sub>'+parm[0]+'</sub></sub>'},
        htmlR2:'',
        texfunc:['_'],
        latexL1: function (parm) {return '_{'+parm[0]+'}'},
        latexR1:'',
        latexL2: function (parm) {return '_{'+parm[0]+'}'},
        latexR2:'',
        mg:  function (parm) {return 'sbt('+parm[0]+')'},
        },
    cPow:{ //x^n
        htmlL1: function (parm) {return htmlFuncs['cPowL'](parm[0],parm[1])},
        htmlR1:'',
        htmlL2: function (parm) {return htmlFuncs['cPowL'](parm[0],parm[1])},
        htmlR2:'',
        texfunc:[],
        latexL1: function (parm) {return parm[0]+'^{'+oBrackets(parm[1])+'}'},
        latexR1:'',
        latexL2: function (parm) {return latexFuncs['cPowX'](parm[0],parm[1])},
        latexR2:'',
        mg: function (parm) {return mgFuncs['cPowE'](parm[0],parm[1])},
        },
    vec:{  //arrow (row) vector vec(a,b,...)
        htmlL1: function (parm) {return htmlFuncs['vecL'](parm)},
        htmlR1: '',
        htmlL2: function (parm) {return htmlFuncs['vecL'](parm)},
        htmlR2: '',
        texfunc:['\\vec'],
        latexL1: function (parm) {return '\\vec{'+parm},
        latexR1:'}',
        latexL2: function (parm) {return '\\vec{'+parm},
        latexR2:'}',
        mg: function (parm) {return 'vec('+parm+')'},
        },
    vct:{ //column vector vct(a,b,...)
        htmlL1: function (parm) {return htmlFuncs['vctL'](parm)},
        htmlR1: '',
        htmlL2: function (parm) {return htmlFuncs['vctL'](parm)},
        htmlR2: '',
        texfunc:[],
        latexL1: function (parm) {return latexFuncs['vctX'](parm)},
        latexR1:'',
        latexL2: function (parm) {return latexFuncs['vctX'](parm)},
        latexR2:'',
        mg: function (parm) {return 'vct('+parm+')'},
        },
    cpx:{ //complex number from FUNC
        mg: function (parm) {return mgFuncs['cpxE'](parm[0],parm[1])},
        },
    }
    //mg handlers
    const mgFuncs = {
    cSubE: function (xU,xL) { //subtraction
        xTractL = oprExtract(mgTrans.cFunc(xL));
        if (xTractL.func == "cAdd") {return xU + "-" + xParens(xL)}
        return xU + "-" + xL
        },
    cMulE: function (xU,xL) { //multiplication by term
        xTractU = oprExtract(mgTrans.cFunc(xU));
        xTractL = oprExtract(mgTrans.cFunc(xL));
        xL = oParens(xL);xU = oParens(xU);
        if (["cAdd","cSub","fac"].indexOf(xTractU.func)+1) {xU  = xParens(xU)}
        if (["cAdd","cSub","fac"].indexOf(xTractL.func)+1) {xL  = xParens(xL)}
        if (xTractL.func == "cDiv" && xTractU.func == "cDiv") {xU  = xParens(xU);xL  = xParens(xL)}
        if (xU.indexOf("Cv[45]") > -1 && xU.lastIndexOf("Cv[45]") == xU.length-6) {xU  = xParens(xU)}
        if (xL.indexOf("Cv[45]") > -1 && xL.lastIndexOf("Cv[45]") == xL.length-6) {xL  = xParens(xL)}
        if (xTractL.func == "cPow" && numTest(xU) && numTest(xTractL.upper)) {xL  = xParens(xL)}
        return xU + "" + xL
        },
    cDivE: function (xU,xL) { //division
        xTractU = oprExtract(mgTrans.cFunc(xU));
        xTractL = oprExtract(mgTrans.cFunc(xL));
        if (["cAdd","cSub","cDiv","cMul","cNeg"].indexOf(xTractU.func)+1 || xU.indexOf("Cv[8747]") > -1) {xU  = xParens(xU)}
        if (["cAdd","cSub","cDiv","cMul","cNeg"].indexOf(xTractL.func)+1 || xL.indexOf("Cv[8747]") > -1) {xL  = xParens(xL)}
        return xU + "/" + xL
        },
    cPowE: function (xU,xL) { //powers
        xTractU = oprExtract(mgTrans.cFunc(xU));
        xTractL = oprExtract(mgTrans.cFunc(xL));
        if (["cAdd","cSub","cDiv","cMul","cNeg","fac"].indexOf(xTractU.func)+1) {xU  = xParens(xU)}
        if (["cAdd","cSub","cDiv","cMul","cNeg"].indexOf(xTractL.func)+1) {xL  = xParens(xL)}
        return xU + "^" + xL
        },
    cpxE: function (xU,xL) {
        if (xU == 0 && xL == 1) {return "Cv[46]"}
        if (xU == 0 && xL == -1) {return "-Cv[46]"}
        if (xU == 0 && xL != 0) {return xL + "Cv[46]"}
        if (xU != 0 && xL == 1) {return xU + "+Cv[46]"}
        if (xU != 0 && xL == -1) {return xU + "-Cv[46]"}
        if (xU != 0 && xL > 0) {return xU + "+" + xL + "Cv[46]"}
        if (xU != 0 && xL < 0) {return xU + "-" + (-xL) + "Cv[46]"}
        return xU
        },
    }

    //html handlers
    const htmlFuncs = {
    brkt: function (xS,xO) {//scale brackets xS=symbol xO=inside expression
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
    fAccentU: function (xA) {return "<span style='display:inline-block;'><span style='text-align:center;vertical-align:middle;display:inline-table;'><span style='display:table-row;line-height:20%;font-size:60%'>"+xA+"</span><span style='line-height:90%;display:table-row;'>"},
    fAccentL: function (xB) {return "</span><span style='display:table-row;line-height:20%;font-size:60%'>"+xB+"</span></span></span>"},
    cMulL: function (xU,xL) {
        if (xL.indexOf("<Xfnc>") == 0) {return xU+" "+xL}
        return xU + "" + xL
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
    cNegL: function (xU) {
        if (strCount(xU,"(") > 0 || strCount(xU,"Cv[1110") > 0) {return "&minus;"+xU}
        if (strCount(xU,"+") > 0 || strCount(xU,"&minus;") > 0) {return "&minus;("+xU+")"}
        return "&minus;"+xU
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
                dScale = dScale + dNest(String(xA))*(mgConfig.divScale/100)
                mReturn = mReturn + "<tr>" + xA[iM] + "</tr>"
                prefix = prefix+"<Xdiv>";
                suffix = suffix+"<Xdve>";
            }
            return prefix+" <table style='text-align:center;display:inline-table;vertical-align:middle'><tr><td style='border-left:2px solid black;border-top:2px solid black;border-bottom:2px solid black'>&nbsp;</td><td><table>" + mReturn + "</table></td><td style='border-right:2px solid black;border-top:2px solid black;border-bottom:2px solid black'>&nbsp;</td></tr></table> "+suffix
        }
        else {
            for (iM in xA) {mReturn = mReturn + "<Xcel>" + xA[iM] + "<Xcle>"}
            return "<Xrow>" + mReturn + "<Xrwe>"
        }
        },
    vecL: function (xA) {
            var vOver = "";
            for (var xI=1;xI<xA.length;xI++) {vOver = vOver+"&#8212;"}
            vOver = vOver+"&#8594;";
            return htmlFuncs['fAccentU'](vOver) + xA + htmlFuncs['fAccentL']("<span style='line-height:50%'>&nbsp;</span>")
        },
    vctL: function (xA) {
            var mReturn = "",iM = 0;
            for (iM in xA) {mReturn = mReturn + "<tr><td>" + xA[iM] + "</tr></td>"}
            return xParenL + "<table>" + mReturn + "</table>" + xParenR
        },
    }
    //latex handlers
    const latexFuncs = {
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
    vctX: function (xA) {
        var mReturn = "";
            mReturn = mReturn + "\\begin{pmatrix}";
            for (var iR=0;iR<xA.length;iR++) {
                if (iR < xA.length-1) {mReturn = mReturn + xA[iR] + "\\\\"}
                else {mReturn = mReturn + xA[iR]}
            }
            mReturn = mReturn + "\\end{pmatrix}"
        return mReturn
        },
    }
    //parsing delimiters
    const tDelimiter = ["_",",","!","=","<",">","|","+","-","*","^","/","{","}","(",")","\\"," "];
    //non-multiplying cBnd symbols
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
    //misc functions
    function strCount(xTarget,xSearch) {return String(xTarget).split(String(xSearch)).length-1} //count occurrences of string
    function numTest(xT) {if (+xT == +xT*1) {return true}; return false} //test for numerical string
    function toSciNot(xU) {return String(xU).replace(/(\d+)e(\d+)/g,"$1*10^$2").replace(/(\d+)e\-(\d+)/g,"$1*10^-$2").replace(/(\d+)e\+(\d+)/g,"$1*10^$2")} //convert N.NNe+-NN notation to scientific
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
    function parseParens(xB,beginI) {//parse parens and return inside string, begin index, end index, source string, upper/lower args
        xB = String(xB);
        var oComma = 0,lPar = 0,rPar = 0,bDelim = " ",eDelim = " ",cFind = "",ins = "";
        for (var iU=beginI;iU<xB.length;iU++) {
            cFind = xB.charAt(iU);
            if (cFind == "(") {bDelim = "(";eDelim = ")";break}
            if (cFind == "{") {bDelim = "{";eDelim = "}";break}
        }
        for (var iU=beginI;iU<xB.length;iU++) {
            cFind = xB.charAt(iU);
            if (cFind == "," && lPar-1 == rPar) {oComma = iU-beginI}
            if (cFind == bDelim ) {lPar++;if(lPar == 1) {beginI = iU}}
            if (cFind == eDelim ) {rPar++}
            if (lPar > 0 && lPar == rPar) {break}
        }
        ins = xB.substr(beginI+1,iU-beginI-1)
        return {begin:beginI,end:iU,source:xB,inside:ins,upper:ins.substr(0,oComma-1),lower:ins.substr(oComma)}
    }
    function oParens(xP) {//remove outside parens
        xP = String(xP);
        if (xP.charAt(0) == "(" && xP.charAt(xP.length-1) == ")") {
            var tparens = parseParens(xP,0);
            if (tparens.end == xP.length-1) {return tparens.inside}
        }
        return xP
    }
    function xParens(xA) {return "(" + oParens(xA) + ")"}
    function parseBrackets(xB,beginI) {//parse brackets and return inside string, begin index, end index, source string
        xB = String(xB);
        var lPar = 0,rPar = 0,bDelim = " ",eDelim = " ",iU = 0,dTemp = "",nXi = 0;
        for (iU=beginI;iU<xB.length;iU++) {
            if (xB.charAt(iU) == " ") {iU++}
            if (xB.charAt(iU).charCodeAt(0) > 47 && tDelimiter.indexOf(xB.charAt(iU)) == -1){return {begin:beginI,inside:xB.charAt(iU),end:iU,source:xB}}
            if (xB.charAt(iU) == "\\") {
                dTemp = xB.substr(iU,xB.length);
                for (nXi=1;nXi<dTemp.length;nXi++) {if (tDelimiter.indexOf(dTemp.charAt(nXi)) > -1){break}}
                dTemp = dTemp.substr(0,nXi);
                return {begin:beginI,inside:dTemp,end:iU+dTemp.length,source:xB}
            }
            if (xB.charAt(iU) == "(") {bDelim = "(";eDelim = ")";break}
            if (xB.charAt(iU) == "{") {bDelim = "{";eDelim = "}";break}
            if (xB.charAt(iU) == "[") {bDelim = "[";eDelim = "]";break}
        }
        for (iU=beginI;iU<xB.length;iU++) {
            if (xB.charAt(iU) == bDelim ) {lPar++;if(lPar == 1) {beginI = iU}}
            if (xB.charAt(iU) == eDelim ) {rPar++}
            if (lPar > 0 && lPar == rPar) {break}
        }
        return {begin:beginI,inside:xB.substr(beginI+1,iU-beginI-1),end:iU,source:xB}
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
        fExt = oParens(fExt);
        var opReturn = {func:"",upper:"",lower:""};
        var funcKey = fExt.substr(0,fExt.indexOf("("))
        if (funcKey != "" && typeof mgTrans.funcMap[funcKey] != "undefined") {
            var strg = parseParens(fExt,fExt.indexOf("("));
            if (strg.upper != "") {opReturn = {func:funcKey,upper:strg.upper,lower:strg.lower}} //two operands
            else {opReturn = {func:funcKey,upper:strg.inside,lower:""}} //single operand
        }
        return opReturn
    }
    function dNest(dN) {//count nested large elements
        var dDepth = 0,dSpan = 0,iDp = 0;
        for (iDp in dN) {
            if (dN.substr(iDp,6) == "<Xdiv>") {dSpan++}
            if (dN.substr(iDp,6) == "<Xdve>") {dSpan--}
            if (dSpan > dDepth) {dDepth = dSpan}
        }
        return dDepth
    }
    function dedupParens(xP) {//remove duplicate parens
        var dpReturn = String(xP);
        var nXf = 0,sCount = 0,dparens = "";
        var dCount = strCount(dpReturn,"(");
        for (nXf=0;nXf<dCount;nXf++) {
            dparens = parseParens(dpReturn,dpReturn.lastIndexOf("((")+1);
            if (dpReturn.substr(dparens.end,2) == "))" ) {dpReturn = dpReturn.substr(0,dpReturn.lastIndexOf("((")+1)+dparens.inside+dpReturn.substr(dparens.end+1)}
        }
        return dpReturn
    }
    function ulFuncs(parm,latfunc,func) { //parse U/L latex functions
        var limitU = {},limitL = {};
        if (parm.indexOf(latfunc+"_") > -1) {
            limitL = parseBrackets(parm,parm.indexOf(latfunc+"_")+5);
            if (parm.charAt(limitL.end+1) == "^") {limitU = parseBrackets(parm,limitL.end+1)}
            else {limitU = {inside:"",end:limitL.end}}
            limitL.inside = limitL.inside.replace("=","Cv[61]");
            return {upper:limitU.inside,lower:limitL.inside,end:limitU.end,delim:",",func:func} 
        }
        else {
            limitU = parseBrackets(parm,parm.indexOf(latfunc+"^")+5);
            if (parm.charAt(limitU.end+1) == "_") {limitL = parseBrackets(parm,limitU.end+1)}
            else {limitL = {inside:"",end:limitU.end}}
            limitL.inside = limitL.inside.replace("=","Cv[61]");
            return {upper:limitU.inside,lower:limitL.inside,end:limitL.end,delim:",",func:func} 
        }
    }
    //conversion routines
    function htmlExport(htmlXpr) { //convert MG format to HTML
        if (htmlXpr == "NaN" || htmlXpr == "undefined") {return "undefined"}
        var nXs=0;
        var htmlReturn = cFunc(htmlXpr); //convert to FUNC
        if (mgConfig.editMode) {htmlReturn = htmlReturn.replace(/\,\)/g,",Cv[9643])").replace(/\(\,/g,"(Cv[9643],").replace(/\,\,/g,",Cv[9643],").replace(/\(\)/g,"(Cv[9643])")} //fill empty fields
        if (!mgConfig.editMode) {htmlReturn = dedupParens(htmlReturn);htmlReturn = oParens(htmlReturn)}
        htmlReturn = dFunc(htmlReturn, "html") //process functions
        //render symbols
        sCount = strCount(htmlReturn,"Cv[");
        for (nXs=0;nXs<sCount;nXs++) {htmlReturn = htmlReturn.replace(/Cv\[\d+\]/,Cs[(String(htmlReturn.match(/Cv\[\d+\]/))).replace(/Cv\[(\d+)\]/,"$1")])} //resolve Cv[] symbols
        //scale and fix parens
        htmlReturn = htmlReturn.replace(/\(/g,"{").replace(/\)/g,"}");
        sCount = strCount(htmlReturn,"{");
        for (nXs=0;nXs<sCount;nXs++) {
            var bSym = htmlReturn.indexOf("{");
            var iXs = parseParens(htmlReturn,bSym);
            var strg = iXs.inside;
            if (!mgConfig.editMode && htmlReturn.substr(bSym,7) == "{<Xdiv>" && htmlReturn.substr(iXs.end-6,7) == "<Xdve>}"  && htmlReturn.substr(bSym-6,6) != "<Xfnx>" && strg.search(/\<Xdve\>(.*)\<Xdiv\>/) == -1) { //edit mode
                htmlReturn = htmlReturn.substr(0,bSym)+strg+htmlReturn.substr(iXs.end+1);
            }
            else if (dNest(strg) == 1) { //expanded parens
                if (strCount(htmlReturn.substr(0,bSym+1),"{") > strCount(htmlReturn.substr(iXs.end),"}")) {htmlReturn = htmlReturn.substr(0,bSym)+htmlFuncs['brkt']("(",strg)+strg+htmlReturn.substr(iXs.end);} //left paren only
                else {htmlReturn = htmlReturn.substr(0,bSym)+htmlFuncs['brkt']("(",strg)+strg+htmlFuncs['brkt'](")",strg)+htmlReturn.substr(iXs.end+1)}
            }
            else if (dNest(strg) > 1) { //extra tall parens
                if (strCount(htmlReturn.substr(0,bSym+1),"{") > strCount(htmlReturn.substr(iXs.end),"}")) { //left paren only
                    htmlReturn = htmlReturn.substr(0,bSym)+xParenL+strg+"</tr></td></table></td></tr></table>"+htmlReturn.substr(iXs.end+1)
                }
                else { //both parens
                    htmlReturn = htmlReturn.substr(0,bSym)+xParenL+strg+xParenR+htmlReturn.substr(iXs.end+1)
                }               
            }
            else { //normal parens
                if (strCount(htmlReturn.substr(0,bSym+1),"{") > strCount(htmlReturn.substr(iXs.end),"}"))  {htmlReturn = htmlReturn.substr(0,bSym)+"("+strg+htmlReturn.substr(iXs.end);} //left paren only
                else {htmlReturn = htmlReturn.substr(0,bSym)+"("+strg+")"+htmlReturn.substr(iXs.end+1)}
            }
        }
        // format arrays
        htmlReturn = htmlReturn.replace(/\<Xcel\>/g,"").replace(/\<Xrow\>/g,xParenL).replace(/\<Xrwe\>/g,xParenR);
        //format matrices
        sCount = strCount(htmlReturn,"<Xcle>");
        for (nXs=0;nXs<sCount;nXs++) {
            if (nXs <sCount-1) {htmlReturn = htmlReturn.replace("<Xcle>",", ")}
            else {htmlReturn = htmlReturn.replace("<Xcle>","")}
        }
        htmlReturn = htmlReturn.replace(/\<X\w\w\w\>/g,"");//cleanup tags
        return htmlReturn
    }
    //
    function mgExport(funcIn) { //export from FUNC to MG format
        if (funcIn == "NaN" || funcIn == "undefined") {return "undefined"}
        return toSciNot(dFunc(funcIn,"mg").replace(/\+\-/g,"-").replace(/\-\-/g,""));
    }
    function cParse(xInp,xOp,xFunc) { //parse operators
        const zDelim = ["^","-","#","*","/","+",",","~","@","=","<",">",String.fromCharCode(8800),String.fromCharCode(8804),String.fromCharCode(8805),String.fromCharCode(8226)];
        var ztmp = "",bSym = "",lPar = 0,rPar = 0,dCp = 0,iCp = 0;
        var cReturn = String(xInp);
        if (xOp == "^") {bSym = cReturn.lastIndexOf(xOp)+1}
        else  {bSym = cReturn.indexOf(xOp)+1;}
        var aSym = bSym-2;
        for (iCp=bSym;iCp<=cReturn.length;iCp++) {
            ztmp = cReturn.charAt(iCp);
            if (ztmp == "(") {lPar++}
            if (ztmp == ")") {rPar++}
            if (lPar < rPar) {break;}
            if (lPar == rPar && cReturn.charAt(iCp-1)!= "e") {if (zDelim.indexOf(ztmp) > -1) {break} }
        }
        lPar = 0;rPar = 0;
        for (dCp=aSym;dCp>=0;dCp--) {
            ztmp = cReturn.charAt(dCp);
            if (ztmp == "(") {lPar++}
            if (ztmp == ")") {rPar++}
            if (lPar > rPar) {break;}
            if (lPar == rPar && cReturn.charAt(dCp-1)!= "e") {if (zDelim.indexOf(ztmp) > -1) {break} }
        }
        cReturn = cReturn.substr(0,dCp+1)+xFunc+"("+cReturn.substr(dCp+1,aSym-dCp)+","+cReturn.substr(bSym,iCp-bSym)+")"+cReturn.substr(iCp);
        return cReturn;
    }
    function nParse(xInp,xOp) { //parse negatives as cNeg()
        const zDelim = ["(",")","^","-","#","*","/","+",",","~","@","=","<",">",String.fromCharCode(8800),String.fromCharCode(8804),String.fromCharCode(8805),String.fromCharCode(8226)];
        var iNp = 0,lPar = 0,rPar = 0,ztmp = "";
        var nReturn = String(xInp);
        var bSym = nReturn.indexOf(xOp)+xOp.length;
        for (iNp=bSym;iNp<=nReturn.length;iNp++) {
            ztmp = nReturn.charAt(iNp);
            if (ztmp == "(") {lPar++}
            if (ztmp == ")") {rPar++}
            if (lPar < rPar) {break;}
            if (lPar == rPar && nReturn.charAt(iNp-1)!= "e") {if (zDelim.indexOf(ztmp) > -1) {break}}
        }
        nReturn = nReturn.substr(0,bSym-1)+"cNeg("+nReturn.substr(bSym,iNp-bSym)+")"+nReturn.substr(iNp);
        return nReturn;
    }
    //
    function cFunc(mgIn) { //convert from MG format to FUNC format: a+bc/d -> cAdd(a,cDiv(cMul(b,c),d)))
        var nCf = 0,iXX = 0,key = 0,sbtOperand = "",cIdx = 0,aIdx = 0,sCount = 0;
        var funcReturn = String(mgIn).replace(/Infinity/g,"Cv[8734]");
        if (funcReturn.charAt(0) == "+") {funcReturn = funcReturn.substr(1)} //remove + at beginning of expression
        sCount = strCount(funcReturn,"]sbt(");//var&subscripts into container cnt()
        funcReturn = funcReturn.replace(/\]sbt\(/g,"]SBT(");
        for (nCf=0;nCf<sCount;nCf++) {
            sbtOperand = parseParens(funcReturn,funcReturn.indexOf("]SBT("));
            funcReturn = funcReturn.replace(/Cv\[(\d+)\]SBT\(/,"cnt(Cv[$1]SBT(").replace("]SBT("+sbtOperand.inside,"]sbt("+oParens(sbtOperand.inside)+")");
        }
        sCount = strCount(funcReturn,"Cv[8748]");//differential
        for (nCf=0;nCf<sCount;nCf++) {funcReturn = funcReturn.replace(/Cv\[8748\]Cv\[(\d+)\]\/Cv\[8748\]Cv\[(\d+)\]/,"sdr(Cv[$1],Cv[$2])")}
        funcReturn = funcReturn.replace(/!/g,"Cv[45]").replace(/Cv\[8226\]/g,String.fromCharCode(8226)); //factorial and dot operator
        for (key in relOperators) {
            sCount = strCount(funcReturn,key);
            for (nCf=0;nCf<sCount;nCf++) {funcReturn = funcReturn.replace(key,relOperators[key])}
        }
        funcReturn = funcReturn.replace(/([\)\]])(\|?)(\d)/g,"$1$2#$3").replace(/([\)\]\d])(\|?)\(/g,"$1$2#(").replace(/([\)\]\d])(\|?)Cv\[/g,"$1$2#Cv[").replace(/([\)\]\d])(\|?)([a-z][a-z][a-z]\()/ig,"$1$2#$3");//terms to # multiply
        for (nCf in nBind) {//add @ between bind symbols
            var rgx = new RegExp(nBind[nCf]+"(\\|?)#");
            var rgy = new RegExp("#(\\|?)"+nBind[nCf]);
            while (funcReturn.search(rgx) != -1 || funcReturn.search(rgy) != -1) {funcReturn = funcReturn.replace(rgx,"$1$2@").replace(rgy,"@$1$2")}
        }
        sCount = strCount(funcReturn,"-");//parse power negatives to cPow(x,cNeg())
        for (nCf=0;nCf<sCount;nCf++) {
            for (iXX in pCases) {
                if (funcReturn.indexOf(pCases[iXX]) > -1) {funcReturn = nParse(funcReturn,pCases[iXX])}
            }
        }
        sCount = strCount(funcReturn,"^");//convert powers to cPow()
        for (nCf=0;nCf<sCount;nCf++) {funcReturn = cParse(funcReturn,"^","cPow")}
        if (funcReturn.charAt(0) == "-") {funcReturn = nParse(funcReturn,"-")}
        sCount = strCount(funcReturn,"-");//parse negatives to cNeg()
        for (nCf=0;nCf<sCount;nCf++) {
            for (iXX in nCases) {
                if (funcReturn.indexOf(nCases[iXX]) > -1) {funcReturn = nParse(funcReturn,nCases[iXX])}
            }
        }
        sCount = strCount(funcReturn,"~");//convert angles to cAng()
        for (nCf=0;nCf<sCount;nCf++) {funcReturn = cParse(funcReturn,"~","cAng")}
        sCount = strCount(funcReturn,"#");//convert # to cMul() (multiply)
        for (nCf=0;nCf<sCount;nCf++) {funcReturn = cParse(funcReturn,"#","cMul")}
        sCount = strCount(funcReturn,"/");//convert / to cDiv()
        for (nCf=0;nCf<sCount;nCf++) {funcReturn = cParse(funcReturn,"/","cDiv")}
        sCount = strCount(funcReturn,"*");//convert * to cTms()
        for (nCf=0;nCf<sCount;nCf++) {funcReturn = cParse(funcReturn,"*","cTms")}
        sCount = strCount(funcReturn,String.fromCharCode(8226));//convert dot to cDot()
        for (nCf=0;nCf<sCount;nCf++) {funcReturn = cParse(funcReturn,String.fromCharCode(8226),"cDot")}
        sCount = strCount(funcReturn,"-") + strCount(funcReturn,"+");//convert +- to cAdd() or cSub()
        for (nCf=0;nCf<sCount;nCf++) {
            aIdx = funcReturn.indexOf("+");
            cIdx = funcReturn.indexOf("-");
            if (aIdx == -1) {funcReturn = cParse(funcReturn,"-","cSub")}
            else if (cIdx == -1) {funcReturn = cParse(funcReturn,"+","cAdd")}
            else if (aIdx < cIdx) {funcReturn = cParse(funcReturn,"+","cAdd")}
            else {funcReturn = cParse(funcReturn,"-","cSub")}
        }
        sCount = strCount(funcReturn,"@");//convert @ symbol handler to cBnd()
        for (nCf=0;nCf<sCount;nCf++) {funcReturn = cParse(funcReturn,"@","cBnd")}
        for (key in relOps) { //relational operators
            sCount = strCount(funcReturn,relOps[key]);
            for (nCf=0;nCf<sCount;nCf++) {
                funcReturn = cParse(funcReturn,relOps[key],key)
            }
        }
        return funcReturn;
    }
    function dFunc(funcIn, prefix) { //map FUNC format to export format
        function xFunc(key,parm,strg,fnformat) { //process funcMap function
            if (typeof funcMap[key][fnformat] == "function") {return funcMap[key][fnformat](parm,strg)}
            return funcMap[key][fnformat]
        }
        // 
        var bSym = 0,lPar = 0,rPar = 0,iXf = 0,nXf = 0,sCount = 0,payload = "",paramS = "",funcKey = "",rTmp = "",fnformatL = "",fnformatR = "",fnformatLx = "";
        if (prefix == "mg") {fnformatL = prefix;fnformatR = prefix}
        else if (mgConfig.fnFmt == "fn(x)") {fnformatL = prefix+"L1";fnformatR = prefix+"R1"} //fn(x)
        else {fnformatL = prefix+"L2";fnformatR = prefix+"R2"}  //fn x
        var expReturn = String(funcIn).replace(/ /g,"").replace(/([a-z][a-z][a-z])\(/ig,"$1@"); //mark left parens with @
        sCount = strCount(expReturn,"@");
        for (nXf=0;nXf<sCount;nXf++) {
            fnformatLx = fnformatL;
            lPar = 1,rPar = 0,iXf = 0,rTmp = "";
            bSym = expReturn.lastIndexOf("@")+1; //find inside parens
            for (iXf=bSym;iXf<expReturn.length;iXf++) {
                if (expReturn.charAt(iXf) == "@" || expReturn.charAt(iXf) == "(") {lPar++}
                if (expReturn.charAt(iXf) == ")") {rPar++}
                if (lPar == rPar) {break;}
            }
            payload = expReturn.substr(bSym,iXf-bSym); //parameters between parens
            if (lPar > rPar) {payload = payload.substr(0,payload.lastIndexOf(")"))+payload.substr(payload.lastIndexOf(")")+1)} //unmatched left parens
            paramS = parseArgs(payload); //parse parms
            funcKey = expReturn.substr(bSym-4,3); //extract functions xxx()
            if (typeof funcMap[funcKey] == "undefined") {funcKey = expReturn.substr(bSym-5,4)} //extract operators cXxx()
            if (typeof funcMap[funcKey][prefix+"Inv1"] != "undefined" && mgConfig.invFmt == "sin<sup>-1</sup>" && mgConfig.fnFmt == "fn(x)") {fnformatLx = prefix+"Inv1"} //inverse fn(x)
            if (typeof funcMap[funcKey][prefix+"Inv1"] != "undefined" && mgConfig.invFmt == "sin<sup>-1</sup>" && mgConfig.fnFmt == "fn x")  {fnformatLx = prefix+"Inv2"} //inverse fn x
            if ((funcMap[funcKey][fnformatR] == ' ' || funcMap[funcKey][fnformatR] == ' <Xfxp>') && mgConfig.fnFmt == "fn x" && iXf < expReturn.length && paramS[0].replace(/[\|\(\{](.*)[\|\)\}]/g,"").search(/[+(&minus;)]/) > -1 ) {paramS[0] = "("+paramS[0]+")"} //add parens to inside (fn x) functions
            if (iXf < expReturn.length && prefix != "mg") {rTmp = xFunc(funcKey,paramS,payload,fnformatR)} //enable right side function if parens match
            expReturn = expReturn.substr(0,bSym-(funcKey.length+1))+xFunc(funcKey,paramS,payload,fnformatLx)+rTmp+expReturn.substr(iXf+1); //assemble output
        }
        return expReturn
    }
    // latex conversions
    function texExport(mgIn) { //convert MG format to LaTeX
        if (mgIn == "NaN" || mgIn == "undefined") {return "undefined"}
        var lxReturn = cFunc(mgIn); //convert to func format
        lxReturn = dFunc(lxReturn, "latex"); //process functions
        //clean up extra parens
        lxReturn = lxReturn.replace(/\(/g,"%"); //mark left parens with %
        var sCount = strCount(lxReturn,"%");
        for (var nXs=0;nXs<sCount;nXs++) {
            var lPar = 1;
            var rPar = 0;
            var bSym = lxReturn.indexOf("%")+1;
            for (var iXs=bSym;iXs<lxReturn.length;iXs++) {
                if (lxReturn.charAt(iXs) == "%" ) {lPar++}
                if (lxReturn.charAt(iXs) == ")" ) {rPar++}
                if (lPar == rPar) {break;}
            }
            var strg = lxReturn.substr(bSym,iXs-bSym);
            if (lxReturn.substr(bSym-1,7) == "%<Xdiv>" && lxReturn.substr(iXs-6,7) == "<Xdve>)" && lxReturn.substr(iXs+1,1) != "^" && strg.search(/\<Xdve\>(.*)\<Xdiv\>/) == -1) {
                lxReturn = lxReturn.substr(0,bSym-1)+strg+lxReturn.substr(iXs+1);
            }
            else {
                lxReturn = lxReturn.substr(0,bSym-1)+"("+strg+")"+lxReturn.substr(iXs+1);
            }
        }
        lxReturn = lxReturn.replace(/\<Xcel\>/g,",&").replace(/\<Xrow\>/g,"\\begin{pmatrix}").replace(/\<Xrwe\>/g,"\\end{pmatrix}"); //resolve arrays
        lxReturn = lxReturn.replace(/\<X\w\w\w\>/g,"").replace(/\%/g,"("); //clean up tags
        //resolve symbols
        sCount = strCount(lxReturn,"Cv[");
        for (var nXf=0;nXf<sCount;nXf++) {lxReturn = lxReturn.replace(/Cv\[\d+\]/,Ct[(String(lxReturn.match(/Cv\[\d+\]/))).replace(/Cv\[(\d+)\]/,"$1")])} //resolve Cv[] symbols
        lxReturn = lxReturn.replace(/\(/g,"\\left(").replace(/\)/g,"\\right)").replace(/\\/g," \\").replace(/  /g," ").replace(/ _/g,"_").replace(/_ /g,"_").replace(/ \^/g,"^").replace(/\^ /g,"^").replace(/ \[/g,"[").replace(/\\ \\/g,"\\\\");//cleanup
        return lxReturn;
    }
    //
    function texImport(latIn) { //convert LaTeX to MG format
        function ltxtomg(xpr,bSym,inside,end) {return xpr.substr(0,xpr.indexOf(bSym)) + inside + xpr.substr(end,xpr.length)} //replace latex with mg
        function asciiTest(xA) {if ((xA >= 65 && xA <= 90) || (xA >= 97 && xA <= 122)) {return true} return false} //test for ascii symbols
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
        var liReturn = String(latIn);
        const lBrackets = ["{","[","|"];
        const rBrackets = ["}","]","|"];
        var sCount = 0,symTemp = "",tTemp = "",funcKey = 0,nXs = 0,nXf = 0,nXi = 0,xF = 0,operand = {},texFunc = "";
        if (liReturn == "NaN" || liReturn == "undefined") {return "undefined"}
        liReturn += " ";
        liReturn = liReturn.replace(/\\big/g,"\\");//remove big tags
        liReturn = liReturn.replace(/\"/g,"\\").replace(/\'/g,"\\");//remove quotes
        liReturn = liReturn.replace(/\\(.)/g," \\$1").replace(/ \\\{/g,"\\{").replace(/ \\\}/g,"\\}");//fix slash whitespace
        liReturn = liReturn.replace(/\s+\{/g,"{").replace(/\s+\}/g,"}").replace(/\{\s+/g,"{").replace(/\}\s+/g,"}"); //fix brace whitespaces
        liReturn = liReturn.replace(/\{matrix\}/g,"{bmatrix}").replace(/\{pmatrix\}/g,"{bmatrix}").replace(/\{vmatrix\}/g,"{bmatrix}").replace(/\{Vmatrix\}/g,"{bmatrix}"); //convert all matrices to bmatrix
        sCount = strCount(liReturn,"\\begin{bmatrix}"); //convert matrices
        for (nXf=0;nXf<sCount;nXf++) {
            var rTemp = liReturn.substr(liReturn.lastIndexOf("\\begin{bmatrix}")+"\\begin{bmatrix}".length);
            var mTemp = rTemp.substr(0,rTemp.indexOf("\\end{bmatrix}"));
            liReturn = liReturn.replace("\\begin{bmatrix}"+mTemp+"\\end{bmatrix}",matI(mTemp));
        }
        liReturn = liReturn.replace(/\s+/g," ").replace(/\\/g," \\").replace(/ _/g,"_").replace(/_ /g,"_").replace(/ \^/g,"^").replace(/\^ /g,"^").replace(/ \[/g,"[").replace(/ \(/g,"(").replace(/\\left /g,"\\left").replace(/\\right /g,"\\right");//fix whitespaces
        sCount = strCount(liReturn,"\\\\");//convert line breaks
        for (nXf=0;nXf<sCount;nXf++) {liReturn = liReturn.replace(/\\\\/," ")}
        liReturn = liReturn.replace(/\\,/g," ").replace(/\\:/g," ").replace(/\\;/g," ").replace(/\\!/g," ").replace(/\\ /g,""); //fix special
        if (liReturn.split("{").length != liReturn.split("}").length) {Cs[9998] = "<span style='color:red'>Unmatched brackets</span>";return "Cv[9998]"} //check parens
        liReturn = liReturn.replace(/\\left\[/g,"sbr(").replace(/\\left\{/g,"cbr(").replace(/\\right\]/g,")").replace(/\\right\}/g,")");//convert brackets
        sCount = strCount(liReturn,"\\");//convert left/right paren
        for (nXf=0;nXf<sCount;nXf++) {liReturn = liReturn.replace(/\\left\(/,"(").replace(/\\right\)/,")").replace(/\\left\\\(/,"(").replace(/\\right\\\)/,")")}
        for (var iBr in lBrackets){//convert left/right brackets
            sCount = strCount(liReturn,"\\left\\"+lBrackets[iBr]);
            for (nXf=0;nXf<sCount;nXf++) {liReturn = liReturn.replace("\\left\\"+lBrackets[iBr],"cbr(").replace("\\right\\"+rBrackets[iBr],")")   }
        }
        for (funcKey in funcMap) {//convert functions
            for (xF in funcMap[funcKey]["texfunc"]) {
                texFunc = funcMap[funcKey]["texfunc"][xF] //latex function symbol
                sCount = strCount(liReturn,texFunc); //iterate through all latex functions and perform conversion on each
                for (nXf=0;nXf<sCount;nXf++) {
                    symTemp = liReturn.substr(liReturn.indexOf(texFunc)); //string from start of func
                    if (symTemp.charAt(texFunc.length) == "^") {//convert fn^x
                        var superscript = parseBrackets(liReturn,liReturn.indexOf(texFunc)+texFunc.length+1);
                        operand = parseBrackets(liReturn,superscript.end+1);
                        liReturn = ltxtomg(liReturn, texFunc, funcKey+"("+operand.inside+")^("+superscript.inside+")", operand.end+1)
                    }
                    else if (typeof funcMap[funcKey]["texparms"] == "function") { //two parameter functions
                        var texparms = funcMap[funcKey]["texparms"](liReturn);
                        liReturn = ltxtomg(liReturn, texFunc, " "+texparms.func+"("+texparms.upper+texparms.delim+texparms.lower+") ", texparms.end+1)
                    }
                    else { //one parameter functions
                        operand = parseBrackets(liReturn,liReturn.indexOf(texFunc)+texFunc.length)
                        liReturn = ltxtomg(liReturn, texFunc, " "+funcKey+"("+operand.inside+")", operand.end+1)
                    }
                }
            }
        }
        sCount = strCount(liReturn,"^");//fix superscripts
        for (nXf=0;nXf<sCount;nXf++) {
            tTemp = liReturn.charAt(liReturn.indexOf("^")+1)
            if (tTemp == "{" || tTemp == "(") {
                var superscr = parseBrackets(liReturn,liReturn.indexOf("^")+1);
                if (superscr.inside.length > 1) {
                    liReturn = ltxtomg(liReturn, "^", " ^("+superscr.inside+") ", superscr.end+1)
                }
            }
        }
        sCount = strCount(liReturn,"\\");//convert symbols
        for (nXf=0;nXf<sCount;nXf++) {
            symTemp = liReturn.substr(liReturn.indexOf("\\"));
            for (nXi=1;nXi<symTemp.length;nXi++) {if (tDelimiter.indexOf(symTemp.charAt(nXi)) > -1){break}}
            symTemp = symTemp.substr(1,nXi-1);
            for (nXs=1;nXs<=9500;nXs++) {if (typeof Ct[nXs] != "undefined" && (Ct[nXs] == "\\"+symTemp || Ct[nXs] == "\\"+symTemp+" ")) {liReturn = liReturn.replace("\\"+symTemp," Cv["+nXs+"]");break} }
        }
        sCount = strCount(liReturn,"\\");//remove unknown tags
        for (nXf=0;nXf<sCount;nXf++) {
            symTemp = liReturn.substr(liReturn.indexOf("\\"));
            for (nXi=1;nXi<symTemp.length;nXi++) {if (",!=<>|+-*^/{}()\\ ".indexOf(symTemp.charAt(nXi)) > -1){break}}
            symTemp = symTemp.substr(1,nXi-1);
            liReturn = liReturn.replace("\\"+symTemp,"");
        }
        for (nXf=0;nXf<liReturn.length;nXf++) {//convert variables
            for (funcKey in funcMap) {if (liReturn.substr(nXf,4) == funcKey+"(") {nXf = nXf+3;break}}
            if (liReturn.substr(nXf,3) == "Cv[") {nXf = nXf+3}
            var asciiChar = liReturn.charAt(nXf).charCodeAt(0);
            if (asciiTest(asciiChar)) {
                liReturn = liReturn.substr(0,nXf)+"Cv["+(asciiChar+10000)+"]"+liReturn.substr(nXf+1);
                nXf = nXf+6
            }
        }
        liReturn = liReturn.replace(/ /g,""); //cleanup spaces
        liReturn = liReturn.replace(/\(Cv\[10100\]\)/g,"Cv[10100]"); //remove parens from differential
        sCount = strCount(liReturn,"Cv[10100]");//convert derivatives
        for (nXf=0;nXf<sCount;nXf++) {
            liReturn = liReturn.replace(/\(Cv\[10100\]\/Cv\[10100\]Cv\[(\d+)\]\)/,"tdr(Cv[$1])");
            liReturn = liReturn.replace(/\(Cv\[10100\]Cv\[(\d+)\]\/Cv\[10100\]Cv\[(\d+)\]\)/,"sdr(Cv[$1],Cv[$2])");
            //nth derivative
            liReturn = liReturn.replace(/\(Cv\[10100\]\^\d+\/Cv\[10100\]Cv\[(\d+)\]\^(\d+)\)/,"tdr(Cv[$1],$2)");
            liReturn = liReturn.replace(/\(Cv\[10100\]\^\d+Cv\[(\d+)\]\/Cv\[10100\]Cv\[(\d+)\]\^(\d+)\)/,"sdr(Cv[$1],Cv[$2],$3)");
        }
        liReturn = liReturn.replace(/\(Cv\[8706\]\)/g,"Cv[8706]");
        sCount = strCount(liReturn,"Cv[8706]");//convert partial derivatives
        for (nXf=0;nXf<sCount;nXf++) {
            liReturn = liReturn.replace(/\(Cv\[8706\]\/Cv\[8706\]Cv\[(\d+)\]\)/,"idr(Cv[$1])");
            liReturn = liReturn.replace(/\(Cv\[8706\]Cv\[(\d+)\]\/Cv\[8706\]Cv\[(\d+)\]\)/,"psd(Cv[$1],Cv[$2])");
            //nth derivative
            liReturn = liReturn.replace(/\(Cv\[8706\]\^\d+\/Cv\[8706\]Cv\[(\d+)\]\^(\d+)\)/,"idr(Cv[$1],$2)");
            liReturn = liReturn.replace(/\(Cv\[8706\]\^\d+Cv\[(\d+)\]\/Cv\[8706\]Cv\[(\d+)\]\^(\d+)\)/,"psd(Cv[$1],Cv[$2],$3)");
        }
        sCount = strCount(liReturn,"Cv[10100]");//convert differentials
        for (nXf=0;nXf<sCount;nXf++) {
            liReturn = liReturn.replace(/\{Cv\[10100\]\}/,"Cv[10100]").replace(/Cv\[10100\]Cv\[(\d+)\]/,"Cv[8748]Cv[$1]");
        }
        liReturn = liReturn.replace(/Cv\[10101\]/g,"Cv[8]").replace(/Cv\[10105\]/g,"Cv[46]").replace(/Cv\[215\]/g,"*"); //special variables
        liReturn = liReturn.replace(/ /g,"").replace(/\{/g,"").replace(/\}/g,"").replace(/_/g,"").replace(/\'/g,"Cv[8242]").replace(/\`/g,"Cv[8242]");//cleanup
        liReturn = dedupParens(liReturn);
        return liReturn
    }
    // check config
    function configCheck() {
        if (mgConfig.trigBase != 1 && mgConfig.trigBase != Math.pi/180 && mgConfig.trigBase != Math.pi/200) {mgConfig.trigBase = 1; console.log("* Invalid value for mgConfig.trigBase, setting to default *")}
        if (mgConfig.divScale < 0 || mgConfig.divScale  > 100) {mgConfig.divScale = 85; console.log("* Invalid value for mgConfig.divScale, setting to default *")}
        if (mgConfig.divSymbol != "Over" && mgConfig.divSymbol != "Slash") {mgConfig.divSymbol = "Over"; console.log("* Invalid value for mgConfig.divSymbol, setting to default *")}
        if (mgConfig.fnFmt != "fn x" && mgConfig.fnFmt != "fn(x)") {mgConfig.fnFmt = "fn x"; console.log("* Invalid value for mgConfig.fnFmt, setting to default *")}
        if (mgConfig.invFmt != "asin" && mgConfig.invFmt != "sin<sup>-1</sup>") {mgConfig.invFmt = "asin"; console.log("* Invalid value for mgConfig.invFmt, setting to default *")}
        if (mgConfig.cplxFmt != "Rect" && mgConfig.cplxFmt != "Polar") {mgConfig.cplxFmt = "Rect"; console.log("* Invalid value for mgConfig.cplxFmt, setting to default *")}
        if (mgConfig.pctFactor != 100 && mgConfig.pctFactor != 1) {mgConfig.pctFactor = 100; console.log("* Invalid value for mgConfig.pctFactor, setting to default *")}
        if (mgConfig.dPrecision < 0 || mgConfig.dPrecision > 16) {mgConfig.dPrecision = 16; console.log("* Invalid value for mgConfig.dPrecision, setting to default *")}
        if (mgConfig.Domain != "Complex" && mgConfig.Domain != "Real") {mgConfig.Domain = "Complex"; console.log("* Invalid value for mgConfig.Domain, setting to default *")}
        if (mgConfig.editMode != true && mgConfig.editMode != false) {mgConfig.editMode = false; console.log("* Invalid value for mgConfig.editMode, setting to default *")}
    }
    return {
        funcMap:    funcMap,
        Cs:         Cs,
        Cu:         Cu,
        Cd:         Cd,
        configCheck:function() {configCheck()},
        strCount:   function(xTarget,xSearch) {return strCount(xTarget,xSearch)},
        parseParens:function(xB,bSym) {return parseParens(xB,bSym)},
        parseArgs:  function(parm) {return parseArgs(parm)},
        oParens:    function(parm) {return oParens(parm)},
        cFunc:      function(parm) {return cFunc(parm)},
        mgExport:   function(parm) {return mgExport(parm)},
        htmlExport: function(parm) {return htmlExport(parm)},
        texExport:  function(parm) {return texExport(parm)},
        texImport:  function(parm) {return texImport(parm)},
        Translate:  function(expression,scale)    {
            configCheck();
            if (typeof scale == "undefined") {scale = 100}
            var mgFmt = mgTrans.texImport(expression);
            return {
                html:   "<span title='MathGene HTML' style='font-family:"+mgConfig.htmlFont+";font-size:"+scale+"%'>"+mgTrans.htmlExport(mgFmt)+"</span>",
                latex:  mgTrans.texExport(mgFmt),
                mg:     mgFmt,
                }
        },
        Output:     function(expression,scale)    {
            configCheck();
            if (typeof scale == "undefined") {scale = 100}
            return {
                html:   "<span title='MathGene HTML' style='font-family:"+mgConfig.htmlFont+";font-size:"+scale+"%'>"+mgTrans.htmlExport(expression)+"</span>",
                latex:  mgTrans.texExport(expression),
                mg:     expression,
                }
        },      
        }
} ();
// node.js export
if (typeof module ==  "object") {
    module.exports = {
        mgConfig:   mgConfig,
        Cv:         Cv,
        mgTrans:    mgTrans,
    }
}
//