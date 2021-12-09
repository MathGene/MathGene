/*
    MathGene Math Library - Version 2.0
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

// node.js import
if (typeof module ==  "object") {
    var mgTr = require("./mg_translate.js");
    var mgConfig = mgTr.mgConfig;
    var Cv = mgTr.Cv;
    var mgTrans = mgTr.mgTrans;
}

//internal functions-objects
var mgCalc = function() {
    const passthruFunc = { //null functions
    cPow: function (xU,xL) {return "cPow("+xU+","+xL+")"},
    cMul: function (xU,xL) {return "cMul("+xU+","+xL+")"},
    cTms: function (xU,xL) {return "cMul("+xU+","+xL+")"},
    cDot: function (xU,xL) {return "cDot("+xU+","+xL+")"},
    cDiv: function (xU,xL) {return "cDiv("+xU+","+xL+")"},
    cAdd: function (xU,xL) {return "cAdd("+xU+","+xL+")"},
    cSub: function (xU,xL) {return "cSub("+xU+","+xL+")"},
    cBnd: function (xU,xL) {return "cBnd("+xU+","+xL+")"},
    cEql: function (xU,xL) {return "cEql("+xU+","+xL+")"},
    cNql: function (xU,xL) {return "cNql("+xU+","+xL+")"},
    cGth: function (xU,xL) {return "cGth("+xU+","+xL+")"},
    cLth: function (xU,xL) {return "cLth("+xU+","+xL+")"},
    cGeq: function (xU,xL) {return "cGeq("+xU+","+xL+")"},
    cLeq: function (xU,xL) {return "cLeq("+xU+","+xL+")"},
    cAng: function (xU,xL) {return "cAng("+xU+","+xL+")"},
    cNeg: function (xU)    {return "cNeg("+xU+")"},
    nrt: function (xU,xL)  {return "nrt("+xU+","+xL+")"},
    lgn: function (xU,xL)  {return "lgn("+xU+","+xL+")"},
    lne: function (xU) {return "lne("+xU+")"},
    log: function (xU) {return "log("+xU+")"},
    sqt: function (xU) {return "sqt("+xU+")"},
    cbt: function (xU) {return "cbt("+xU+")"},
    sin: function (xU) {return "sin("+xU+")"},
    cos: function (xU) {return "cos("+xU+")"},
    tan: function (xU) {return "tan("+xU+")"},
    cot: function (xU) {return "cot("+xU+")"},
    csc: function (xU) {return "csc("+xU+")"},
    sec: function (xU) {return "sec("+xU+")"},
    snh: function (xU) {return "snh("+xU+")"},
    csh: function (xU) {return "csh("+xU+")"},
    tnh: function (xU) {return "tnh("+xU+")"},
    sch: function (xU) {return "sch("+xU+")"},
    cch: function (xU) {return "cch("+xU+")"},
    cth: function (xU) {return "cth("+xU+")"},
    asn: function (xU) {return "asn("+xU+")"},
    acs: function (xU) {return "acs("+xU+")"},
    atn: function (xU) {return "atn("+xU+")"},
    act: function (xU) {return "act("+xU+")"},
    asc: function (xU) {return "asc("+xU+")"},
    acc: function (xU) {return "acc("+xU+")"},
    ash: function (xU) {return "ash("+xU+")"},
    ach: function (xU) {return "ach("+xU+")"},
    ath: function (xU) {return "ath("+xU+")"},
    axh: function (xU) {return "axh("+xU+")"},
    ayh: function (xU) {return "ayh("+xU+")"},
    azh: function (xU) {return "azh("+xU+")"},
    exp: function (xU) {return "exp("+xU+")"},
    abs: function (xU) {return "abs("+xU+")"},
    erf: function (xU) {return "erf("+xU+")"},
    efc: function (xU) {return "efc("+xU+")"},
    fac: function (xU) {return "fac("+xU+")"},
    gam: function (xU) {return "gam("+xU+")"},
    sbr: function (xU) {return "sbr("+xU+")"},
    cbr: function (xU) {return "cbr("+xU+")"},
    con: function (xU) {return "con("+xU+")"},
    hat: function (xU) {return "hat("+xU+")"},
    und: function (xU) {return "und("+xU+")"},
    udt: function (xU) {return "udt("+xU+")"},
    tld: function (xU) {return "tld("+xU+")"},
    cup: function (xU) {return "cup("+xU+")"},
    cap: function (xU) {return "cap("+xU+")"},
    cnt: function (xU) {return "cnt("+xU+")"},
    sbt: function (xU) {return "sbt("+xU+")"},
    cdf: function (xU) {return "cdf("+xU+")"},
    pdf: function (xU) {return "pdf("+xU+")"},
    lcf: function (xU) {return "lcf("+xU+")"},
    lpf: function (xU) {return "lpf("+xU+")"},
    rou: function (xU) {return "rou("+xU+")"},
    rnd: function (xU) {return "rnd("+xU+")"},
    rex: function (xU) {return "rex("+xU+")"},
    imx: function (xU) {return "imx("+xU+")"},
    int: function (xU) {return "int("+xU+")"},
    cei: function (xU) {return "cei("+xU+")"},
    arg: function (xU) {return "arg("+xU+")"},
    dif: function (xU) {return "dif("+xU+")"},
    idr: function (xU) {return "idr("+xU+")"},
    tdr: function (xU) {return "tdr("+xU+")"},
    itg: function (xU,xL) {return "itg("+xU+","+xL+")"},
    sdr: function (xU,xL,xN) {return "sdr("+xU+","+xL+","+xN+")"},
    psd: function (xU,xL,xN) {return "psd("+xU+","+xL+","+xN+")"},
    sum: function (xU,xL) {return "sum("+xU+","+xL+")"},
    prd: function (xU,xL) {return "prd("+xU+","+xL+")"},
    lim: function (xU,xL) {return "lim("+xU+","+xL+")"},
    lmt: function (xU,xL,xR) {return "lmt("+xU+","+xL+","+xR+")"},
    smm: function (xU,xL,xY,xZ) {return "smm("+xU+","+xL+","+xY+","+xZ+")"},
    pmm: function (xU,xL,xY,xZ) {return "pmm("+xU+","+xL+","+xY+","+xZ+")"},
    tdv: function (dXpr,deeVar,nTh) {return "tdv("+dXpr+","+deeVar+","+nTh+")"},
    drv: function (dXpr,deeVar,nTh) {return "drv("+dXpr+","+deeVar+","+nTh+")"},
    det: function (xU) {return "det("+xU+")"},
    trc: function (xU) {return "trc("+xU+")"},
    cpx: function (xU,xL) {return "cpx("+xU+","+xL+")"},
    mat: function () {return "mat(" + Array.prototype.slice.call(arguments) + ")"},
    vct: function () {return "vct(" + Array.prototype.slice.call(arguments) + ")"},
    vec: function () {return "vec(" + Array.prototype.slice.call(arguments) + ")"},
    ntg: function (nXpr,deeVar,iU,iL) {
        if (typeof iU != "undefined" && typeof iL != "undefined") {return "ntg("+nXpr+","+deeVar+","+iU+","+iL+")"}
        return "ntg("+nXpr+","+deeVar+")"
    },
    ntp: function (nXpr,deeVar,iU,iL) {
        if (typeof iU != "undefined" && typeof iL != "undefined") {return "ntp("+nXpr+","+deeVar+","+iU+","+iL+")"}
        return "ntp("+nXpr+","+deeVar+")"
    },
    smx: function (xU) {return smxS(xU)},
    pxp: function (xU) {return pxpS(xU)},
    vMul: function (xU,xL) {return vMulS(xU,xL)},
    vDiv: function (xU,xL) {return vDivS(xU,xL)},
    vAdd: function (xU,xL) {return vAddS(xU,xL)},
    vSub: function (xU,xL) {return vSubS(xU,xL)},
    vNeg: function (xU) {return vNegS(xU)},
    }
    const solverMap = { //map inverse functions for solver
    sin:{solverU:"asn(lExpr)",ineqU:0},
    cos:{solverU:"acs(lExpr)",ineqU:0},
    tan:{solverU:"atn(lExpr)",ineqU:0},
    sec:{solverU:"asc(lExpr)",ineqU:0},
    csc:{solverU:"acc(lExpr)",ineqU:0},
    cot:{solverU:"act(lExpr)",ineqU:0},
    snh:{solverU:"ash(lExpr)",ineqU:0},
    csh:{solverU:"ach(lExpr)",ineqU:0},
    tnh:{solverU:"ath(lExpr)",ineqU:0},
    sch:{solverU:"axh(lExpr)",ineqU:0},
    cch:{solverU:"ayh(lExpr)",ineqU:0},
    cth:{solverU:"azh(lExpr)",ineqU:0},
    asn:{solverU:"sin(lExpr)",ineqU:0},
    acs:{solverU:"cos(lExpr)",ineqU:0},
    atn:{solverU:"tan(lExpr)",ineqU:0},
    asc:{solverU:"sec(lExpr)",ineqU:0},
    acc:{solverU:"csc(lExpr)",ineqU:0},
    act:{solverU:"cot(lExpr)",ineqU:0},
    ash:{solverU:"snh(lExpr)",ineqU:0},
    ach:{solverU:"csh(lExpr)",ineqU:0},
    ath:{solverU:"tnh(lExpr)",ineqU:0},
    axh:{solverU:"sch(lExpr)",ineqU:0},
    ayh:{solverU:"cch(lExpr)",ineqU:0},
    azh:{solverU:"cth(lExpr)",ineqU:0},
    sqt:{solverU:"cPow(lExpr,2)",ineqU:0},
    cbt:{solverU:"cPow(lExpr,3)",ineqU:0},
    log:{solverU:"cPow(10,lExpr)",ineqU:0},
    lne:{solverU:"cPow('Cv[8]',lExpr)",ineqU:0},
    int:{solverU:"",ineqU:0},
    abs:{solverU:"",ineqU:0},
    erf:{solverU:"efc(lExpr)",ineqU:0},
    efc:{solverU:"erf(lExpr)",ineqU:0},
    arg:{solverU:"",ineqU:0},
    exp:{solverU:"lne(lExpr)",ineqU:0},
    con:{solverU:"con(rExpr)",ineqU:0},
    gam:{solverU:"",ineqU:0},
    cdf:{solverU:"",ineqU:0},
    pdf:{solverU:"",ineqU:0},
    lcf:{solverU:"",ineqU:0},
    lpf:{solverU:"",ineqU:0},
    rou:{solverU:"",ineqU:0},
    rnd:{solverU:"",ineqU:0},
    rex:{solverU:"",ineqU:0},
    imx:{solverU:"",ineqU:0},
    sbr:{solverU:"",ineqU:0},
    cbr:{solverU:"",ineqU:0},
    cei:{solverU:"",ineqU:0},
    sum:{solverU:"",ineqU:0},
    prd:{solverU:"",ineqU:0},
    lim:{solverU:"",ineqU:0},
    fac:{solverU:"undefined",ineqU:0},
    sbt:{solverU:"sbt(rExpr)",ineqU:1},
    cup:{solverU:"cup(rExpr)",ineqU:1},
    cap:{solverU:"cap(rExpr)",ineqU:1},
    vec:{solverU:"vec(rExpr)",ineqU:1},
    vct:{solverU:"vct(rExpr)",ineqU:1},
    hat:{solverU:"hat(rExpr)",ineqU:1},
    und:{solverU:"und(rExpr)",ineqU:1},
    udt:{solverU:"udt(rExpr)",ineqU:1},
    tld:{solverU:"tld(rExpr)",ineqU:1},
    cnt:{solverU:"cnt(rExpr)",ineqU:1},
    drv:{solverU:"ntg(lExpr,deeVarP)",ineqU:0},
    tdv:{solverU:"ntg(lExpr,deeVarP)",ineqU:0},
    nrt:{solverU:"cDiv(lne(strgI),lne(lExpr))",solverL:"cPow(lExpr,strgI)",ineqU:0,ineqL:0},
    lgn:{solverU:"cDiv(lne(strgI),lne(lExpr))",solverL:"cPow(lExpr,strgI)",ineqU:0,ineqL:0},
    cPow:{solverU:"cPow(lExpr,(cDiv(1,strgI)))",solverL:"lgn(strgI,lExpr)",ineqU:0,ineqL:0},
    cNeg:{solverU:"cNeg(lExpr)",ineqU:-1},
    cMul:{solverU:"cDiv(lExpr,strgI)",solverL:"cDiv(lExpr,strgI)",ineqU:"strgI",ineqL:"strgI"},
    cTms:{solverU:"cDiv(lExpr,strgI)",solverL:"cDiv(lExpr,strgI)",ineqU:"strgI",ineqL:"strgI"},
    cDot:{solverU:"cDiv(lExpr,strgI)",solverL:"cDiv(lExpr,strgI)",ineqU:"strgI",ineqL:"strgI"},
    cDiv:{solverU:"cMul(lExpr,strgI)",solverL:"cDiv(strgI,lExpr)",ineqU:"strgI",ineqL:"strgI"},
    cAdd:{solverU:"cSub(lExpr,strgI)",solverL:"cSub(lExpr,strgI)",ineqU:1,ineqL:1},
    cSub:{solverU:"cAdd(lExpr,strgI)",solverL:"cSub(strgI,lExpr)",ineqU:1,ineqL:-1},
    }
    function xprSolve(xSol,cVar) {//solve equation/inequality xSol in FUNC format for variable cVar
        function xprCrawl(lExpr,rExpr,xVar) {
            rExpr = xReduce(rExpr);
            var strgI = "";
            var ineqSwap = 1; //-1 swap inequality, 1 no change, 0 or other undefined
            while (strTest(rExpr,"(")) {
                var getOp = opExtract(rExpr);
                if (typeof solverMap[getOp.func]["solverL"] != "undefined") {
                    if (strTest(getOp.upper,xVar) && strTest(getOp.lower,xVar)) {
                        rExpr = xprFactor(rExpr);
                        break
                    }
                    else if (strTest(getOp.upper,xVar)) {
                        rExpr = getOp.upper;
                        strgI = getOp.lower;
                        lExpr = solverMap[getOp.func]["solverU"].replace(/lExpr/,lExpr).replace(/rExpr/,rExpr).replace(/strgI/,strgI).replace(/deeVarP/,deeVarP).replace(/'/g,"");
                        ineqSwap = cMulS(ineqSwap,String(solverMap[getOp.func]["ineqU"]).replace(/strgI/,strgI));
                    }
                    else if (strTest(getOp.lower,xVar)) {
                        rExpr = getOp.lower;
                        strgI = getOp.upper;
                        lExpr = solverMap[getOp.func]["solverL"].replace(/lExpr/,lExpr).replace(/rExpr/,rExpr).replace(/strgI/,strgI).replace(/deeVarP/,deeVarP).replace(/'/g,"");
                        ineqSwap = cMulS(ineqSwap,String(solverMap[getOp.func]["ineqL"]).replace(/strgI/,strgI));
                    }
                    else {break}
                }
                else {
                    lExpr = solverMap[getOp.func]["solverU"].replace(/lExpr/,lExpr).replace(/rExpr/,rExpr).replace(/strgI/,strgI).replace(/deeVarP/,deeVarP).replace(/'/g,"");
                    rExpr = getOp.upper;
                    if (solverMap[getOp.func]["ineqU"] == "strgI") {ineqSwap = cMulS(ineqSwap,strgI)}
                    else {ineqSwap = cMulS(ineqSwap,solverMap[getOp.func]["ineqU"])}
                }
            }
            return {lExpr:lExpr,rExpr:rExpr,ineqSwap:ineqSwap}
        }
        //
        var sXtract = relExtract(xSol);
        var cRet = "", sReturn = "";
        if (!sXtract.lower || !sXtract.upper) {sReturn = xReduce(xSol)}
        else {
            if (sXtract.lower.split(cVar).length > 2) {sXtract.lower = xprFactor(sXtract.lower)}
            if (sXtract.upper.split(cVar).length > 2) {sXtract.upper = xprFactor(sXtract.upper)}
            solverFlag = true;
            if (strTest(sXtract.lower,cVar)) {
                cRet = xprCrawl("0",cSubS(sXtract.upper,sXtract.lower),cVar);
            }
            else {
                cRet = xprCrawl("0",cSubS(sXtract.lower,sXtract.upper),cVar);
                cRet.ineqSwap = cNegS(cRet.ineqSwap);
            }
            solverFlag = false;
            if (!nbrTest(cRet.ineqSwap)) {cRet.ineqSwap = 0}
            if (sXtract.func == "cEql") {sReturn = cEqlS(cRet.rExpr,xReduce(cRet.lExpr))}
            else if (sXtract.func == "cNql") {sReturn = cNqlS(cRet.rExpr,xReduce(cRet.lExpr))}
            else if (sXtract.func == "cGth" && cRet.ineqSwap > 0) {sReturn = cGthS(cRet.rExpr,xReduce(cRet.lExpr))}
            else if (sXtract.func == "cGth" && cRet.ineqSwap < 0) {sReturn = cLthS(cRet.rExpr,xReduce(cRet.lExpr))}
            else if (sXtract.func == "cLth" && cRet.ineqSwap > 0) {sReturn = cLthS(cRet.rExpr,xReduce(cRet.lExpr))}
            else if (sXtract.func == "cLth" && cRet.ineqSwap < 0) {sReturn = cGthS(cRet.rExpr,xReduce(cRet.lExpr))}
            else if (sXtract.func == "cGeq" && cRet.ineqSwap > 0) {sReturn = cGeqS(cRet.rExpr,xReduce(cRet.lExpr))}
            else if (sXtract.func == "cGeq" && cRet.ineqSwap < 0) {sReturn = cLeqS(cRet.rExpr,xReduce(cRet.lExpr))}
            else if (sXtract.func == "cLeq" && cRet.ineqSwap > 0) {sReturn = cLeqS(cRet.rExpr,xReduce(cRet.lExpr))}
            else if (sXtract.func == "cLeq" && cRet.ineqSwap < 0) {sReturn = cGeqS(cRet.rExpr,xReduce(cRet.lExpr))}
            else {sReturn = "undefined"}
            if (strTest(sReturn,"Cv[9998]")) {sReturn = "Cv[9998]"}
        }
        return sReturn
    }
    function relExtract(fExt) { //extract relational operators in FUNC format, returns func,upper,lower
        fExt = String(fExt);
        var opReturn = {func:"",upper:"",lower:""}
        for (var cI in mgTrans.funcMap) {
                if (mgTrans.funcMap[cI].relop && fExt.indexOf(cI) == 0 ) {
                var strg = mgTrans.parseParens(fExt,fExt.indexOf("("));
                opReturn = {func:cI,upper:strg.upper,lower:strg.lower}
            }
        }
        return opReturn
    }
    function opExtract(fExt) {//extract inside function in FUNC format, returns func,upper,lower
        fExt = String(fExt);
        var opReturn = {func:"",upper:"",lower:""}
        var funcKey = fExt.substr(0,fExt.indexOf("("))
        if (funcKey != "" && typeof passthruFunc[funcKey] != "undefined") {
            var strg = mgTrans.parseParens(fExt,fExt.indexOf("("));
            if (strg.upper) {opReturn = {func:funcKey,upper:xprIterate(strg.upper),lower:xprIterate(strg.lower)}} //two operands
            else {opReturn = {func:funcKey,upper:xprIterate(strg.inside),lower:""}} //single operand
        }
        return opReturn
    }
    function cDissect(xD) { //return array of all components of expression
        var xDsect = String(xD);
        var tDsect = [],vTmp = "",xV = 0,vCount = 0;
        vCount = xDsect.split("Cv[").length-1;
        for (xV=0;xV<vCount;xV++) { //variables and constants
            vTmp = String(xDsect.match(/Cv\[\d+\]/));
            vTmp = vTmp.replace(/Cv\[(\d+)\]/,"$1");
            xDsect = xDsect.replace(/Cv\[\d+\]/,"");
            if (varTest("Cv["+vTmp+"]") || conTest("Cv["+vTmp+"]")) {if (!strTest(tDsect,"Cv["+vTmp+"]")) {tDsect.push("Cv["+vTmp+"]")}}
        }
        vCount = xDsect.length-1;
        for (xV=0;xV<vCount;xV++) { //decimals
            vTmp = String(xDsect.match(/\d+\.\d+/));
            if (vTmp == "null") {break}
            if (!strTest(tDsect,vTmp)) {xDsect = xDsect.replace(vTmp,"");tDsect.push(vTmp)}
        }
        vCount = xDsect.length-1;
        for (xV=0;xV<vCount;xV++) { //integers
            vTmp = String(xDsect.match(/\(\d+/));
            if (vTmp == "null") {break}
            if (!strTest(tDsect,vTmp)) {xDsect = xDsect.replace(vTmp,"(");vTmp = vTmp.replace("(","");tDsect.push(vTmp)}
            vTmp = String(xDsect.match(/\d+\)/));
            if (vTmp == "null") {break}
            if (!strTest(tDsect,vTmp)) {xDsect = xDsect.replace(vTmp,")");vTmp = vTmp.replace(")","");tDsect.push(vTmp)}            
        }
        return tDsect.sort()
    }
    function cInventory(xI) { //return array of all unique variables
        var xInv = String(xI);
        var xVars = [],vTmp = "",xV = 0,vCount = 0;
        vCount = xInv.split("Cv[").length-1;
        for (xV=0;xV<vCount;xV++) {
            vTmp = String(xInv.match(/Cv\[\d+\]/));
            vTmp = vTmp.replace(/Cv\[(\d+)\]/,"$1");
            xInv = xInv.replace(/Cv\[\d+\]/,"");
            if (varTest("Cv["+vTmp+"]")) {if (!strTest(xVars,"Cv["+vTmp+"]")) {xVars.push("Cv["+vTmp+"]")}}
        }
        return xVars.sort();
    }
    function varTest(iDv) { //test if string is a MG variable (Cv[xxx])
        var bReturn = false;
        iDv = String(iDv);
        if (iDv.substr(0,3) == "Cv[") {
            iDv = iDv.replace(/Cv\[(\d+)\]/,"$1");
            if ((iDv > 64 && iDv < 91) || (iDv > 96 && iDv < 123) || (iDv > 10064 && iDv < 10091) || (iDv > 10096 && iDv < 10123) || (iDv > 912 && iDv < 970) || (iDv > 11100 && iDv < 11109)) {bReturn = true}
        }
        return bReturn
    }
    function conTest(iDv) { //test if string is a MG constant (Cv[xxx])
        var bReturn = false;
        iDv = String(iDv);
        if (iDv.substr(0,3) == "Cv[") {
            iDv = iDv.replace(/Cv\[(\d+)\]/,"$1");
            if (iDv >= 0 && iDv <= 44) {bReturn = true}
        }
        return bReturn
    }
    function xprMatch(Xpression,Pattern) { //match exact pattern template to expression Cv[9999] = wildcard
        Xpression = xprIterate(Xpression);
        var pOutput = "";
        var xTractU = opExtract(Xpression);
        var xTractL = opExtract(Pattern);
        for (var xM=0;xM<Xpression.split("(").length;xM++) {
            if (strTest(xTractL.upper,"Cv[9999]")) {
                if (xTractL.upper == "Cv[9999]") {pOutput = xTractU.upper; break}
                xTractU = opExtract(xTractU.upper);
                xTractL = opExtract(xTractL.upper);
            }
            else if (strTest(xTractL.lower,"Cv[9999]")) {
                if (xTractL.lower == "Cv[9999]") {pOutput = xTractU.lower; break}
                xTractU = opExtract(xTractU.lower);
                xTractL = opExtract(xTractL.lower);
            }
        }
        if (Xpression != xprIterate(Pattern.split("Cv[9999]").join(pOutput))) {pOutput = ""}
        return pOutput
    }
    function xprSearch(Xpression,Pattern) { //search for pattern template inside expression Cv[9999] = wildcard
        var sTest = xprMatch(Xpression,Pattern)
        var xTract = opExtract(Xpression);
        if (sTest) {return sTest}
        if (xTract.upper) {sTest = xprSearch(xTract.upper,Pattern)}
        if (sTest) {return sTest}
        if (xTract.lower) {sTest = xprSearch(xTract.lower,Pattern)}
        if (sTest) {return sTest}
        return ""
    }
    function cError(cE) {mgTrans.Cs[9998] = cE;return "Cv[9998]"} //error message return symbol
    function cSubst(sXpr,xI,xO) {sXpr+="";var sCount = sXpr.split(xI).length-1;for (var nXs=0;nXs<sCount;nXs++) {sXpr = sXpr.replace(xI,xO)};return sXpr} //substitution in MG format
    function nbrTest(xT) {if (+xT == +xT*1) {return true}; return false} //test for numerical string
    function nbrEven(xE) {if (cDiv(xE,2) == int(cDiv(xE,2))) {return true};return false} //test for even number
    function strTest(xTarget,xSearch) { //test if xSearch string is in xTarget
        var bReturn = false;
        if (typeof xTarget == "undefined") {bReturn = false}
        else if (xTarget == xSearch) {bReturn = true}
        else if (!nbrTest(xTarget) && xTarget.indexOf(xSearch) > -1) {bReturn = true}
        else {bReturn = false}
        return bReturn
    }
    function matFunc(xA) { //matrix array to FUNC conversion
        var mReturn = xA;
        if (typeof xA[0] == "object") {
            mReturn = [];
            for (var iR in xA) {mReturn[iR] = matFunc(xA[iR])}
            mReturn = "mat(" + mReturn + ")"
        }
        else if (typeof xA == "object") {mReturn = "mat(" + xA + ")"}
        return mReturn
    }
    function matArray(xA) { //matrix FUNC to array conversion
        var mReturn = xA;
        if (typeof xA != "object") {
            mReturn = mgTrans.parseArgs(mgTrans.oParens(String(xA).substr(3)));
            for (var iM in mReturn) {if (String(mReturn[iM]).substr(0,3) == "mat") {mReturn[iM] = matArray(mReturn[iM])}}
        }
        return mReturn
    }
    function vecArray(xA) { //vector FUNC to array conversion
        var vReturn = xA;
        if (typeof xA != "object") {vReturn = mgTrans.parseArgs(mgTrans.oParens(String(xA).substr(3)))}
        return vReturn
    }
    function sortTerms(aS,bS){ //sort terms array alpha with powers in descending polynomial order
        if (strTest(aS,"cPow") || strTest(bS,"cPow")) {
            if (!strTest(bS,"cPow") && strTest(aS,"cPow")) {return 1}
            else if (!strTest(aS,"cPow") && strTest(bS,"cPow")) {return -1}
            else  {
                var aP = String(aS.match(/cPow\(Cv\[\d+\]\,(\d+)\)/)),bP = String(bS.match(/cPow\(Cv\[\d+\]\,(\d+)\)/));
                return aP > bP ? 1 : aP < bP ? -1 : 0;
            }
        }
        return aS < bS ? -1 : aS > bS ? 1 : 0;
    }
    function decToFrac(xU) { //convert decimal to fraction up to 10^5
        for (var xP=0;xP<=5;xP++) {if (abs(cMul(xU,cPow(10,xP))) == abs(int(cMul(xU,cPow(10,xP))))) {break}}
        var fReturn = cDivS(cMul(xU,cPow(10,xP)),cPow(10,xP))
        if (abs(cMul(xU,cPow(10,xP))) != abs(int(cMul(xU,cPow(10,xP))))) {fReturn = xU}
        return fReturn
    }
    function execFunc(expIn,funcObj) { //execute FUNC math
        expIn = mgTrans.oParens(expIn);
        var expReturn = expIn.replace(/([a-z][a-z][a-z])\(/ig,"$1@"); //mark left parens with @
        var sCount = mgTrans.strCount(expReturn,"@"),bSym = 0,nXf = 0,lPar = 0,rPar = 0,iXf = 0,rTmp = "",payload = "",paramS = [],funcKey = "",fReturn = "";
        for (nXf=0;nXf<sCount;nXf++) {
            lPar = 1,rPar = 0,iXf = 0,rTmp = "";
            bSym = expReturn.lastIndexOf("@")+1; //find inside parens
            for (iXf=bSym;iXf<expReturn.length;iXf++) {
                if (expReturn.charAt(iXf) == "@" || expReturn.charAt(iXf) == "(") {lPar++}
                if (expReturn.charAt(iXf) == ")") {rPar++}
                if (lPar == rPar) {break;}
            }
            payload = expReturn.substr(bSym,iXf-bSym); //parameters between parens
            paramS = mgTrans.parseArgs(payload); //parse parms
            funcKey = expReturn.substr(bSym-4,3); //extract functions xxx()
            if (typeof passthruFunc[funcKey] == "undefined") {funcKey = expReturn.substr(bSym-5,4)} //extract operators cXxx()
            if (typeof funcObj[funcKey] == "undefined") {fReturn = passthruFunc[funcKey](mgTrans.oParens(paramS[0]),mgTrans.oParens(paramS[1]),paramS[2],paramS[3])} //execute passthru
            else {fReturn = funcObj[funcKey](mgTrans.oParens(paramS[0]),mgTrans.oParens(paramS[1]),paramS[2],paramS[3])}//execute operation
            if (["mat","vec","vct"].indexOf(funcKey)+1) {fReturn = passthruFunc[funcKey](paramS)} //matrix/array/vector parameters
            expReturn = expReturn.substr(0,(expReturn.lastIndexOf("@")+1)-(funcKey.length+1))+fReturn+expReturn.substr(iXf+1); //assemble output
        }
        return expReturn
    }

    //Expression reduction
    const symFunc = {
    cPow: function (xU,xL) {return cPowS(xU,xL)},
    cMul: function (xU,xL) {return cMulS(xU,xL)},
    cTms: function (xU,xL) {return cTmsS(xU,xL)},
    cDot: function (xU,xL) {return cDotS(xU,xL)},
    cDiv: function (xU,xL) {return cDivS(xU,xL)},
    cAdd: function (xU,xL) {return cAddS(xU,xL)},
    cSub: function (xU,xL) {return cSubS(xU,xL)},
    cNeg: function (xU)    {return cNegS(xU)},
    nrt: function (xU,xL)  {return nrtS(xU,xL)},
    lgn: function (xU,xL)  {return lgnS(xU,xL)},
    lne: function (xU) {return lneS(xU)},
    log: function (xU) {return logS(xU)},
    sqt: function (xU) {return sqtS(xU)},
    cbt: function (xU) {return cbtS(xU)},
    sin: function (xU) {return sinS(xU)},
    cos: function (xU) {return cosS(xU)},
    tan: function (xU) {return tanS(xU)},
    cot: function (xU) {return cotS(xU)},
    csc: function (xU) {return cscS(xU)},
    sec: function (xU) {return secS(xU)},
    snh: function (xU) {return snhS(xU)},
    csh: function (xU) {return cshS(xU)},
    tnh: function (xU) {return tnhS(xU)},
    sch: function (xU) {return schS(xU)},
    cch: function (xU) {return cchS(xU)},
    cth: function (xU) {return cthS(xU)},
    asn: function (xU) {return asnS(xU)},
    acs: function (xU) {return acsS(xU)},
    atn: function (xU) {return atnS(xU)},
    act: function (xU) {return actS(xU)},
    asc: function (xU) {return ascS(xU)},
    acc: function (xU) {return accS(xU)},
    ash: function (xU) {return ashS(xU)},
    ach: function (xU) {return achS(xU)},
    ath: function (xU) {return athS(xU)},
    axh: function (xU) {return axhS(xU)},
    ayh: function (xU) {return ayhS(xU)},
    azh: function (xU) {return azhS(xU)},
    exp: function (xU) {return expS(xU)},
    abs: function (xU) {return absS(xU)},
    erf: function (xU) {return erfS(xU)},
    efc: function (xU) {return efcS(xU)},
    fac: function (xU) {return facS(xU)},
    gam: function (xU) {return gamS(xU)},
    sdr: function (xU,xL) {return sdrS(xU,xL)},
    psd: function (xU,xL) {return psdS(xU,xL)},
    ntg: function (nXpr,deeVar,iU,iL) {return ntgS(nXpr,deeVar,iU,iL)},
    tdv: function (dXpr,deeVar,nTh) {return tdvS(dXpr,deeVar,nTh)},
    drv: function (dXpr,deeVar,nTh) {return drvS(dXpr,deeVar,nTh)},
    smm: function (xU,xL,xY,xZ) {return smmS(xU,xL,xY,xZ)},
    pmm: function (xU,xL,xY,xZ) {return pmmS(xU,xL,xY,xZ)},
    lmt: function (xU,xL,xR) {return lmtS(xU,xL,xR)},
    cpx: function (xU,xL) {return cpxS(xU,xL)},
    cbr: function (xU) {return "("+xU+")"},
    sbr: function (xU) {return "("+xU+")"},
    det: function (xU) {return detS(xU)},
    trc: function (xU) {return trcS(xU)},
    }

    function xprIterate(xIter) {
        xIter = String(xIter);
        var sReturn = "undefined";
        if (!strTest(xIter,"undefined")) {
            if (xIter.search(/,,/) > -1 || xIter.search(/,\)/) > -1 || xIter.search(/\(,/) > -1 || xIter.search(/\(\)/) > -1) {sReturn = cError("Missing operand(s)")}
            else {sReturn = execFunc(xIter,symFunc)}
        }
        return sReturn
    }
    function cReduce(cRdce) { //complete expression reduction
        var sReturn;
        if (nbrTest(cRdce) && cRdce != int(cRdce)) {sReturn = decToFrac(cRdce)} //decimals to fractions
        else {sReturn = iReduce(xReduce(cRdce))}
        return sReturn
    }
    function pxpExecute(xIn) {Pv = [];return xprIterate(xprIterate(xIn.replace(/cMul\(/g,"vMul(").replace(/cDiv\(/g,"vDiv(").replace(/cNeg\(/g,"vNeg(")).replace(/Pv\[(\d+)\]/g,"pxp($1)"))}
    function smxExecute(xIn) {Sv = [];return xprIterate(xprIterate(xIn.replace(/cAdd\(/g,"vAdd(").replace(/cSub\(/g,"vSub(")).replace(/Sv\[(\d+)\]/g,"smx($1)"))}
    function xReduce(xRdce) { //basic expression reduction
        xRdce = smxExecute(xprIterate(xRdce)); //reduce sum-difference terms
        pxpFlag = true; //convert cDiv denominator to cPow(x,-1)
        expFlag = true;
        xRdce = pxpExecute(xprIterate(xRdce)); //reduce product-quotient-exponent terms 1st pass consolidate exponents
        expFlag = false;
        xRdce = pxpExecute(xprIterate(xRdce)); //reduce product-quotient-exponent terms 2nd pass
        pxpFlag = false;
        xRdce = smxExecute(xRdce); //reduce sum-difference terms 2nd pass
        xRdce = pxpExecute(xRdce); //reduce product-quotient-exponent terms 3rd pass
        return xRdce
    }
    function iReduce(iRdce) { //reduce by iterative expansion
        var iInv = cInventory(iRdce),iCount = [],iTemp = "",xFlag = false,iC = 0;
        for (iC in iInv) { //count the number of occurrences of each variable, if any greater than 1, run expansion
            iCount[iC] = iRdce.split(iInv[iC]).length-1;
            if (iCount[iC] > 1) {xFlag = true}
        }
        if (xFlag) {
            iTemp = xReduce(xprExpand(iRdce));
            for (iC in iInv) {if (iTemp.split(iInv[iC]).length-1 > iCount[iC] && iCount[iC] != 0) {return iRdce}} //if variable count is greater then return unchanged
            for (iC in iInv) {if (iTemp.split(iInv[iC]).length-1 < iCount[iC] && iCount[iC] != 0) {return iTemp}} //if variable count is smaller then return expanded result
        }
        else if (iInv.length == 0 && cDissect(iRdce).length > 2) { //no variables
            iTemp = xReduce(xReduce(xprExpand(iRdce)));
            if (cDissect(iTemp).length < cDissect(iRdce).length) {return iTemp} //if total element count is smaller, return expanded result
        }
        return iRdce
    }
    function smxS(xU) { //consolidate sum-difference terms into Sum array Sv, convert subtrahend to negative value: 2a-b+c/d -> [[2a],[-b],[c/d]]
        for (var xI in Sv) {for (var yI=xI;yI<Sv.length;yI++) { //resolve SV dupes
            if (xI != yI && Sv[xI].sort().toString() == Sv[yI].sort().toString()) {
            var rgx = new RegExp("Sv\\["+yI+"\\]","g");
            for (var zI in Sv ) {Sv[zI] = Sv[zI].map(function(mP){return mP.toString().replace(rgx,"Sv["+xI+"]")})}
        }}}
        var tSum = Sv[xU].sort(function(aS,bS){return sortTerms(aS,bS)})
        var sTerms = {Terms:[],Factors:[],Divisors:[]} //collector for segregated terms
        var tReturn = 0,tExtract = "";
        for (var xI in tSum) { //extract factors from tSum array
            tExtract = opExtract(tSum[xI]);
            if      (nbrTest(tSum[xI])) {tReturn = cAdd(tSum[xI],tReturn)} //combine numerical terms into tReturn
            else if (tExtract.func == "cMul" && nbrTest(tExtract.upper)) { //extract term factors
                if  (strTest(sTerms.Terms,tExtract.lower)) {sTerms.Factors[sTerms.Terms.indexOf(tExtract.lower)] = cAddS(sTerms.Factors[sTerms.Terms.indexOf(tExtract.lower)],(+tExtract.upper))} //combine factors of identical terms
                else {sTerms.Terms.push(tExtract.lower);sTerms.Factors.push(+tExtract.upper);sTerms.Divisors.push(1)} //push unique terms
            }
            else if (tExtract.func == "cNeg") { //extract difference terms
                if  (strTest(sTerms.Terms,tExtract.upper)) {sTerms.Factors[sTerms.Terms.indexOf(tExtract.upper)] = cSubS(sTerms.Factors[sTerms.Terms.indexOf(tExtract.upper)],1)} //factor out negative duplicates
                else {sTerms.Terms.push(tExtract.upper);sTerms.Factors.push(-1);sTerms.Divisors.push(1)} //push unique terms
            }
            else if (strTest(sTerms.Terms,tSum[xI])) {(sTerms.Factors[sTerms.Terms.indexOf(tSum[xI])]) = cAddS(sTerms.Factors[sTerms.Terms.indexOf(tSum[xI])],1)} //factor out duplicates
            else    {sTerms.Terms.push(tSum[xI]);sTerms.Factors.push(1);sTerms.Divisors.push(1)} //push unique terms
        }
        for (var xI in sTerms.Terms) { //Extract and consolidate numeric divisors
            tExtract = opExtract(sTerms.Terms[xI]);
            if (tExtract.func == "cDiv") {
                if (nbrTest(tExtract.upper)) {sTerms.Factors[xI] = cMulS(tExtract.upper,sTerms.Factors[xI]);sTerms.Terms[xI] = "cDiv(1,"+tExtract.lower+")"}
                tExtract = opExtract(sTerms.Terms[xI]);
                if (nbrTest(tExtract.lower)) {sTerms.Divisors[xI] = tExtract.lower;sTerms.Terms[xI] = "cDiv("+tExtract.upper+",1)"}
                tExtract = opExtract(sTerms.Terms[xI]);
                var uExtract = opExtract(tExtract.upper);
                var dExtract = opExtract(tExtract.lower);
                if (tExtract.func == "cDiv") {
                    if (uExtract.func == "cMul" && nbrTest(uExtract.upper)) {tExtract.upper = uExtract.lower;sTerms.Factors[xI] = cMulS(uExtract.upper,sTerms.Factors[xI])}
                    if (dExtract.func == "cMul" && nbrTest(dExtract.upper)) {tExtract.lower = dExtract.lower;sTerms.Divisors[xI] = cMulS(dExtract.upper,sTerms.Divisors[xI])}
                }
                sTerms.Terms[xI] = cDivS(tExtract.upper,tExtract.lower);
            }
        }
        for (var xI in sTerms.Terms) { //consolidate common numerators
            for (var yI in sTerms.Terms) {
                if (xI != yI && sTerms.Terms[xI] == sTerms.Terms[yI]) {
                    sTerms.Factors[yI] = cAddS(cMulS(sTerms.Factors[yI],sTerms.Divisors[xI]),cMulS(sTerms.Factors[xI],sTerms.Divisors[yI]));
                    sTerms.Divisors[yI] = cMulS(sTerms.Divisors[xI],sTerms.Divisors[yI]);
                    sTerms.Factors[xI] = 0;sTerms.Divisors[xI] = 1;
                }
            }
        }
        for (var xI in sTerms.Terms) { //consolidate common divisors
            tExtract = opExtract(sTerms.Terms[xI]);
            if (tExtract.func == "cDiv") {
                sTerms.Terms[xI] = tExtract.upper;
                sTerms.Divisors[xI] = cMulS(sTerms.Divisors[xI],tExtract.lower);
                for (var yI in sTerms.Terms) {
                    if (xI != yI && sTerms.Divisors[xI] == sTerms.Divisors[yI]) {
                        sTerms.Terms[yI] = cAddS(cMulS(sTerms.Terms[yI],sTerms.Factors[yI]),cMulS(sTerms.Factors[xI],sTerms.Terms[xI]));
                        sTerms.Factors[yI] = 1;sTerms.Factors[xI] = 0;sTerms.Divisors[xI] = 1;
                    }
                }
            }
        }
        tReturn = String(tReturn); //accumulator
        var fTempA = 0;//sums accumulator
        var fTempB = 0;//differences accumulator
        var fTempC = 0;//constants of integration accumulator
        for (var xI in sTerms.Terms) {
            if (String(sTerms.Terms[xI]).search(/Cv\[111\d+\]/) > -1) {fTempC = cAddS(cDivS(cMulS(sTerms.Factors[xI],sTerms.Terms[xI]),sTerms.Divisors[xI]),fTempC)} //collect constants of integration
            else if (+sTerms.Factors[xI] >0) {fTempA = cAddS(cDivS(cMulS(sTerms.Factors[xI],sTerms.Terms[xI]),sTerms.Divisors[xI]),fTempA)} //collect sums
            else {fTempB = cAddS(fTempB,cDivS(cMulS(cNegS(sTerms.Factors[xI]),sTerms.Terms[xI]),sTerms.Divisors[xI]))} //collect differences
        }
        tReturn = cAddS(cAddS(fTempA,cNegS(fTempB)),tReturn);
        tReturn = String(tReturn);fTempC = String(fTempC);
        tReturn = xprIterate(tReturn.replace(/Sv\[(\d+)\]/g,"smx($1)"));
        tReturn = cAddS(tReturn,fTempC.replace(/Sv\[(\d+)\]/g,"smx($1)"))//constants of integration
        return tReturn
    }
    function pxpS(xU) { //consolidate product-quotient-exponent terms into Product array PV, convert denominator to negative exponent: 2ab/(cd) -> [[2],[a],[b],[c^-1],[d^-1]]
        for (var xI in Pv) {for (var yI=xI;yI<Pv.length;yI++) { //resolve PV dupes
            if (xI != yI && Pv[xI].sort().toString() == Pv[yI].sort().toString()) {
            var rgx = new RegExp("Pv\\["+yI+"\\]","g");
            for (var zI in Pv) {Pv[zI] = Pv[zI].map(function(mP){return mP.toString().replace(rgx,"Pv["+xI+"]")})}
        }}}
        var tPrd = Pv[xU].sort(); //sort alpha
        var pTerms = {Terms:[],Exp:[]} //collector for segregated terms
        var tReturn = 1,tExtract = "";
        for (var xI in tPrd) {//collect and consolidate segregated terms from tPrd array
            tExtract = opExtract(tPrd[xI]);
            if (nbrTest(tPrd[xI])) {tReturn = cMulS(tPrd[xI],tReturn)} //combine numerical terms into tReturn
            else if  (tExtract.func == "cPow") { //collect exponents
                if (strTest(pTerms.Terms,tExtract.upper)) {pTerms.Exp[pTerms.Terms.indexOf(tExtract.upper)] = cAddS(pTerms.Exp[pTerms.Terms.indexOf(tExtract.upper)],tExtract.lower)} //combine duplicates of exponent terms
                else {pTerms.Terms.push(tExtract.upper);pTerms.Exp.push(tExtract.lower)} //push unique terms with exponents
            }
            else if (strTest(pTerms.Terms,tPrd[xI])) {(pTerms.Exp[pTerms.Terms.indexOf(tPrd[xI])]) = cAddS(pTerms.Exp[pTerms.Terms.indexOf(tPrd[xI])],1)} //combine duplicate nonexponent terms into exponents
            else    {pTerms.Terms.push(tPrd[xI]);pTerms.Exp.push(1)} //push unique terms without exponents
        }
        if (!pxpFlag) {
            for (var xI in pTerms.Terms) { // Iterate divisors
                for (var yI in pTerms.Terms) {
                    if (xI != yI && pTerms.Exp[yI] == -1 && pTerms.Exp[xI] == 1 && cDivS(pTerms.Terms[xI],pTerms.Terms[yI]) != "cDiv("+pTerms.Terms[xI]+","+pTerms.Terms[yI]+")") {
                        pTerms.Terms[yI] = cDivS(pTerms.Terms[xI],pTerms.Terms[yI]);
                        pTerms.Exp[yI] = 1;pTerms.Terms[xI] = 1;pTerms.Exp[xI] = 1;
                    }
                }
            }
        }
        tReturn = String(tReturn); //accumulator
        if (strTest(pTerms.Terms,tReturn)) {pTerms.Exp[pTerms.Terms.indexOf(tReturn)] = cAddS(pTerms.Exp[pTerms.Terms.indexOf(tReturn)],1);tReturn = "1"}
        var fTempU = 1,fTempL = 1; //upper and lower accumulators
        for (var xI in pTerms.Terms) { //consolidate terms into accumulaters
            tExtract = opExtract(pTerms.Exp[xI]);
            if  (nbrTest(pTerms.Terms[xI]) && pTerms.Exp[xI] == -1) {//calculate GCF on integer divisors
                var tGcf = cGcf(tReturn,pTerms.Terms[xI]);
                tReturn = cDivS(tReturn,tGcf);
                fTempL = cMulS(fTempL,cDivS(pTerms.Terms[xI],tGcf))
            }
            else if (pTerms.Exp[xI] == 1)  {fTempU = cMulS(fTempU,cPowS(pTerms.Terms[xI],1))} //populate numerator
            else if (pTerms.Exp[xI] > 0)   {fTempU = cMulS(fTempU,cPowS(pTerms.Terms[xI],pTerms.Exp[xI]))} //populate numerator
            else if (pTerms.Exp[xI] < 0)   {fTempL = cMulS(fTempL,cPowS(pTerms.Terms[xI],cNegS(pTerms.Exp[xI])))} //populate denominator
            else if (tExtract.func == "cNeg") {fTempL = cMulS(fTempL,cPowS(pTerms.Terms[xI],tExtract.upper))} //populate denominator
            else    {fTempU = cMulS(fTempU,cPowS(pTerms.Terms[xI],pTerms.Exp[xI]))} //populate exponents
        }
        if      (tReturn < -1) {tReturn = cNegS(xprIterate(cDivS(cMulS(cNegS(tReturn),fTempU),fTempL)))} //move negative from numerator to outside
        else if (expFlag) {tReturn = cMulS(cMulS(tReturn,fTempU),"cPow("+fTempL+",-1)")} //use negative power for denominator if neccesary
        else    {tReturn = cDivS(cMulS(tReturn,fTempU),fTempL)}
        tReturn = String(tReturn);
        tReturn = xprIterate(tReturn.replace(/Pv\[(\d+)\]/g,"pxp($1)"));
        return tReturn
    }
    function SvTest(xTest) {if (xTest == "Sv["+(Sv.length-1)+"]") {return true};return false}
    function PvTest(xTest) {if (xTest == "Pv["+(Pv.length-1)+"]") {return true};return false}
    function SvPointer(xP) { //resolve SV pointers
        var svTemp = String(xP).match(/Sv\[\d+\]/);
        if (xP == svTemp && svTemp != "Sv["+(Sv.length-1)+"]") {return Sv[xP.match(/\d+/)]}
        return [xP]
    }
    function PvPointer(xP) { //resolve PV pointers
        var svTemp = String(xP).match(/Pv\[\d+\]/);
        if (xP == svTemp && svTemp != "Pv["+(Pv.length-1)+"]") {return Pv[xP.match(/\d+/)]}
        return [xP]
    }
    function vAddS(xU,xL) { //parse cAdd into Sv
        if      (SvTest(xU) && !SvTest(xL)) {Sv[Sv.length-1] = Sv[Sv.length-1].concat(SvPointer(xL))}
        else if (SvTest(xL) && !SvTest(xU)) {Sv[Sv.length-1] = Sv[Sv.length-1].concat(SvPointer(xU))}
        else    {Sv.push(SvPointer(xU).concat(SvPointer(xL)))}
        return "Sv["+(Sv.length-1)+"]";
    }
    function vSubS(xU,xL) { //parse cSub into Sv
        var tDif = [], tD = 0;
        if  (SvTest(xU) && !SvTest(xL)) {
            tDif = SvPointer(xL);
            for (tD in tDif) {Sv[Sv.length-1].push(cNegS(tDif[tD]))}
        }
        else if (SvTest(xL) && !SvTest(xU)) {
            tDif = Sv[Sv.length-1];
            Sv[Sv.length-1] = SvPointer(xU);
            for (tD in tDif) {Sv[Sv.length-1].push(cNegS(tDif[tD]))}
        }
        else    {
            Sv.push(SvPointer(xU));
            tDif = SvPointer(xL);
            for (tD in tDif) {Sv[Sv.length-1].push(cNegS(tDif[tD]))}
        }
        return "Sv["+(Sv.length-1)+"]";
    }
    function vMulS(xU,xL) { //parse cMul into Pv
        if      (PvTest(xU) && !PvTest(xL)) {Pv[Pv.length-1] = Pv[Pv.length-1].concat(PvPointer(xL))}
        else if (PvTest(xL) && !PvTest(xU)) {Pv[Pv.length-1] = Pv[Pv.length-1].concat(PvPointer(xU))}
        else    {Pv.push(PvPointer(xU).concat(PvPointer(xL)))}
        return "Pv["+(Pv.length-1)+"]";
    }
    function vDivS(xU,xL) { //parse cDiv into Pv
        var tDiv = [], tD = 0;
        if  (PvTest(xU) && !PvTest(xL)) {
            tDiv = PvPointer(xL);
            for (tD in tDiv) {Pv[Pv.length-1].push(cPowS(tDiv[tD],-1))}
        }
        else if (PvTest(xL) && !PvTest(xU)) {
            tDiv = Pv[Pv.length-1];
            Pv[Pv.length-1] = PvPointer(xU);
            for (tD in tDiv) {Pv[Pv.length-1].push(cPowS(tDiv[tD],-1))}
        }
        else    {
            Pv.push(PvPointer(xU));
            tDiv = PvPointer(xL);
            for (tD in tDiv) {Pv[Pv.length-1].push(cPowS(tDiv[tD],-1))}
        }
        return "Pv["+(Pv.length-1)+"]";
    }
    function vNegS(xU) { //parse cNeg into Pv
        if      (strTest(xU,"Cv[8734]")) {return "cNeg("+xU+")"}
        else if (PvTest(xU)) {Pv[Pv.length-1].push(-1)}
        else    {Pv.push(PvPointer(xU).concat([-1]))}
        return "Pv["+(Pv.length-1)+"]";
    }
    //Polynomials
    function aGcf(xG){ //find GCF of integer array
        var tGcf = new Array(xG.length), xI = 0;
        for (xI in xG) {tGcf[xI]= xG[xI]}
        tGcf = tGcf.sort(function(aS,bS){return abs(aS) > abs(bS) ? -1 : abs(aS) < abs(bS) ? 1 : 0;})[0];//find largest coeff
        for (xI in xG) {
            if (!nbrTest(xG[xI]) || xG[xI] != int(xG[xI]) || typeof xG[xI] == "undefined") {tGcf = 1;break}
            if (xG[xI] != 0) {tGcf = cGcf(tGcf,xG[xI])}
        }
        return tGcf
    }
    function parseTerms(xP) { //parse terms into elements array
        function pMulS(xU,xL) {
            var xTractU = opExtract(xU);
            var xTractL = opExtract(xL);
            if (xTractU.func == "cMul") {pMulS(xTractU.upper,xTractU.lower)}
            if (xTractL.func == "cMul") {pMulS(xTractL.upper,xTractL.lower)}
            if (typeof xU != "undefined" && xU != "" && xTractU.func != "cMul" && xTractU.func != "cNeg") {nTerms.push(xU)}
            if (typeof xL != "undefined" && xL != "" && xTractL.func != "cMul" && xTractL.func != "cNeg") {nTerms.push(xL)}
        }
        var nTerms = [];
        var xTractU = opExtract(xP);
        if (xTractU.func == "cMul") {pMulS(xTractU.upper,xTractU.lower)}
        else {nTerms = [xP]}
        return nTerms.sort()
    }
    function parsePoly(xP) { //parse polynomials into terms array
        const polyFuncs = {
        cAdd: function (xU,xL) {
            if (!strTest(xU,"Cv[9999]")) {nTerms.push(xU)}
            if (!strTest(xL,"Cv[9999]")) {nTerms.push(xL)}
            return "Cv[9999]"
        },
        cSub: function (xU,xL) {
            if (!strTest(xU,"Cv[9999]")) {nTerms.push(xU)}
            if (!strTest(xL,"Cv[9999]")) {nTerms.push(cNegS(xL))}
            return "Cv[9999]"
        },
        }
        var nTerms = [];
        var xTractU = opExtract(xP);
        if (["cMul","cDiv","cNeg","cPow"].indexOf(xTractU.func)+1) {
            if (!strTest(xP,"cAdd") && !strTest(xP,"cSub")) {nTerms.push(xP)}
            else {return [xP]}
        }
        execFunc(xP,polyFuncs);
        return nTerms.sort(function(aS,bS){return sortTerms(aS,bS)})
    }
    function pNomial(pN,pVar) { //parse polynomial into ranked array
        var pnTerms = [],pReturn = [pN],pDegree = 0,pD = 0;
        if (typeof pVar == "undefined") {pVar = pVariable(pN)}
        if (pVar) {
            pReturn = [];
            pnTerms = parsePoly(pN);
            for (pD in pnTerms) {
                if (!strTest(pnTerms[pD],pVar) && !pReturn[0]) {pReturn[0] = pnTerms[pD]}
                else if (pnTerms[pD] == pVar) {pReturn[1] = pnTerms[pD]}
                else {
                    var xTractD = opExtract(pnTerms[pD]);
                    for (var iXf=0;iXf<6;iXf++) {
                        if (xTractD.func == "cPow" && xTractD.upper == pVar) {break}
                        else if (xTractD.func == "cPow" && strTest(xTractD.upper,pVar)) {pReturn = [];break}
                        else if (xTractD.func == "cPow" && strTest(xTractD.lower,pVar)) {pReturn = [];break}
                        else if (xTractD.upper == pVar || xTractD.lower == pVar)  {xTractD = pVar;break}
                        else if (xTractD.func == "cMul" && strTest(xTractD.upper,pVar)) {xTractD = opExtract(xTractD.upper)}
                        else if (xTractD.func == "cMul" && strTest(xTractD.lower,pVar)) {xTractD = opExtract(xTractD.lower)}
                        else if (xTractD.func == "cDiv" && strTest(xTractD.upper,pVar)) {xTractD = opExtract(xTractD.upper)}
                        else if (xTractD.func == "cDiv" && strTest(xTractD.lower,pVar)) {pReturn = [];break}
                        else if (xTractD.func == "cNeg" && strTest(xTractD.upper,pVar)) {xTractD = opExtract(xTractD.upper)}
                        else {pReturn = [];break}
                    }
                    if (xTractD == pVar) {pReturn[1] = pnTerms[pD];pDegree = 1}
                    else if (xTractD.func == "cPow" && xTractD.upper == pVar && nbrTest(xTractD.lower) && xTractD.lower > 0 && xTractD.lower == int(xTractD.lower)) {
                        pReturn[+xTractD.lower] = pnTerms[pD];
                        if (+xTractD.lower > pDegree) {pDegree = xTractD.lower}
                    }
                    else {return [pN]}
                }
            }
            for (pD=0;pD<=pDegree;pD++) {if (!pReturn[pD] || typeof pReturn[pD] == "undefined") {pReturn[pD] = 0} }
        }
        return pReturn
    }
    function pExpand(pE) { //recreate polynomial from pNomial array
        var xReturn = "0";
        for (var pD in pE) {xReturn = cAddS(pE[pD],xReturn)}
        return xReduce(xReturn)
    }
    function pVariable(vP) { //ID dominant polynomial variable
        vP = String(vP);
        var pTest = [],vReturn = "",vInv = cInventory(vP);
        for (var nXs in vInv) {
            var vTmp = vInv[nXs];
            var pTemp = pNomial(vP,vTmp);
            if (pTest.length < pTemp.length) {pTest = pTemp;vReturn = vTmp}
        }
        return vReturn
    }
    function pCoeff(xC) { //return array of polynomial coefficients from input array
        var xCoeff = [];
        for (var xI in xC) {
            var tExtract = opExtract(xC[xI]);
            if      (nbrTest(xC[xI])) {xCoeff[xI] = (+xC[xI])}
            else if (tExtract.func == "cMul" && nbrTest(tExtract.upper)) {xCoeff[xI] = +tExtract.upper}
            else if (tExtract.func == "cNeg" && !nbrTest(tExtract.upper)) {xCoeff[xI] = -1}
            else    {xCoeff[xI] = 1}
        }
        return xCoeff
    }
    function pDivide(xU,xL) { //polynomial division
        var sReturn = "";
        var fGcf = cGcf(aGcf(pCoeff(pNomial(xU))),aGcf(pCoeff(pNomial(xL)))); //calculate GCF
        if (fGcf != 0 && fGcf != 1) {xU = cDivS(xU,fGcf); xL = cDivS(xL,fGcf)} //apply GCF
        var pVar = pVariable(xU);
        var polyU = pNomial(xU,pVar);
        var polyL = pNomial(xL,pVar);
        if (!strTest(xL,pVar)) {pVar = pVariable(xL)} //select primary variable
        if (!strTest(xU,pVar) || pVar == "") {sReturn = "cDiv("+xU+","+xL+")"}
        else if (!strTest(xU,pVariable(xL)) || polyU.length < polyL.length || polyU.length < 2 || polyL.length < 2 || strTest(xU,xL)) {sReturn = "cDiv("+xU+","+xL+")"}
        else if (polyU.length > 1 && polyL.length > 1 && cInventory(polyU[polyU.length-1]).length > 2) {sReturn = "cDiv("+xU+","+xL+")"} //fix for compound terms in numerator
        else {
            var dReturn = "0",tTemp = "";
            var uTemp = xU;
            for (var pT in polyU) {
                tTemp = xReduce(cDivS(polyU[polyU.length-1],polyL[polyL.length-1]));
                uTemp = xReduce(cSubS(uTemp,xprExpand(cMulS(tTemp,xL))));
                dReturn = xReduce(cAddS(dReturn,tTemp));
                polyU = pNomial(uTemp,pVar);
                if (+uTemp == 0 || !strTest(uTemp,pVar) || strTest(uTemp,"cDiv(")) {break}
            }
            sReturn = xReduce(cAddS(dReturn,cDivS(uTemp,xL)));
        }
        return sReturn
    }

    //Algebra
    function cPowS(xU,xL) { //exponent xU^xL
        var xTractU = opExtract(xU);
        var xTractL = opExtract(xL);
        if (xTractU.func == "mat") {
            var mReturn = xU
            if (xL == "Cv[84]" || xL == "Cv[10084]") {mReturn = matFunc(trn(matArray(xU)))} //transpose matrix M^T
            else if (xL != int(xL)) {mReturn = "undefined"}
            else if (xL <= -1) {mReturn = cPowS(invS(xU),cNegS(xL))} //inverse matrix M^-n
            else if (xL == 0)  {mReturn = matFunc(matIdentity(matArray(xU)))} //identity matrix M^0
            else {for (var iM=1;iM<xL;iM++) {mReturn = cMulS(mReturn,xU)}}
            return mReturn
        }
        //infinity handlers for limits
        if (xU == "Cv[8734]") {
            if (xL <= -1) {return 0}
            if (xL > 1) {return "Cv[8734]"}
            if (xL == "Cv[8734]") {return "Cv[8734]"}
            if (xL == "cNeg(Cv[8734])") {return 0}
        }
        if (xU == "cNeg(Cv[8734])") {
            if (xL <= -1) {return 0}
            if (!nbrEven(xL)) {return "cNeg(Cv[8734])"}
            if (nbrEven(xL)) {return "Cv[8734]"}
        }
        if (xL == "Cv[8734]") {
            if (xU > -1 && xU < 1) {return 0}
            if (xU == 1) {return 1}
            if (!nbrEven(xU) && xU <= -1) {return "cNeg(Cv[8734])"}
            return "Cv[8734]"
        }
        if (xL == "cNeg(Cv[8734])") {
            if (xU > -1 && xU < 1) {return "Cv[8734]"}
            if (xU == 1) {return 1}
            return 0
        }
        if (["cAdd","cSub","cTms","cDiv","cMul","cPow"].indexOf(xTractU.func)+1) {xU = "("+xU+")"}
        if (["cAdd","cSub","cTms","cDiv","cMul","cNeg"].indexOf(xTractL.func)+1) {xL = "("+xL+")"}
        if (xTractU.func == "cPow") {return "cPow("+xTractU.upper+","+cMulS(xTractU.lower,xL)+")"}
        if (xL == 0) {return 1}
        if (xL == 1) {return xU}
        if (xU == 1) {return 1}
        if (xU == 0) {return 0}
        if (xTractL.func == "cDiv" && xTractL.upper == 1 && xTractL.lower == 2) {return sqtS(xU)}
        if (xL == .5) {return sqtS(xU)}
        if (nbrTest(xU) && nbrTest(xL) && cPow(xU,xL) < 1e6 && cPow(xU,xL) == int(cPow(xU,xL))) {return (fmtResult(cPow(xU,xL)))}
        if (abs(xL) < 1 && abs(xL) > 0 && cDiv(1,xL) == int(cDiv(1,xL))) {return "cPow("+xU+",cDiv(1,"+cDiv(1,xL)+"))"}
        if (xTractL.func == "cDiv" && xTractL.upper == 1 && xTractL.lower == 3) {return cbtS(xU)}
        if (!pxpFlag && xL == 1.5 && nbrTest(xU)) {return cMulS(xU,sqtS(xU))}
        if (!pxpFlag && nbrTest(xL) && xL != int(xL) && cMul(xL,2) == int(cMul(xL,2))) {return cPowS(xU,cDivS(cMul(xL,2),2))}
        if (!pxpFlag && xL < 0) {return cDivS(1,cPowS(xU,cNegS(xL)))}
        if (!pxpFlag && xTractL.func == "cNeg") {return cDivS(1,cPowS(xU,xTractL.upper))}
        if (xU == "Cv[46]" && xL == int(xL) && mgConfig.Domain == "Complex") {return (fmtResult(cPow(Cv[46],xL)))}
        if (xU == "Cv[8]" && xTractL.func == "lne") {return xTractL.upper}
        if (xU == "Cv[8]" && strTest(xL,"Cv[46]") && xprIterate(xL) == "cMul(Cv[46],Cv[29])") {return -1}
        if (xTractU.func == "cMul" && nbrTest(xL)) {return "cMul(cPow("+xTractU.upper+","+xL+"),cPow("+xTractU.lower+","+xL+"))" }
        if (xTractU.func == "cDiv" && nbrTest(xL)) {return "cDiv(cPow("+xTractU.upper+","+xL+"),cPow("+xTractU.lower+","+xL+"))" }
        if (xTractU.func == "abs" && nbrTest(xL) && cDiv(xL,2) == int(cDiv(xL,2))) {return cPowS(xTractU.upper,xL)}
        if (xTractU.func == "sqt" && xL == 2) {return xTractU.upper}
        if (xTractU.func == "cbt" && xL == 3) {return xTractU.upper}
        return "cPow("+xU+","+xL+")"
    }
    function cMulS(xU,xL) { //multiply xU * xL as terms
        function scalarMult(xM,xC) { //matrix scalar multiply
            xM = matArray(xM);
            var mReturn = xM;
            for (var iR in xM) {mReturn[iR] = cMulS(matFunc(xM[iR]),xC)}
            return matFunc(mReturn)
        }
        var xTractU = opExtract(xU);
        var xTractL = opExtract(xL);
        if (["cAdd","cSub","cDiv"].indexOf(xTractU.func)+1) {xU = "("+xU+")"}
        if (["cAdd","cSub","cDiv"].indexOf(xTractL.func)+1) {xL = "("+xL+")"}
        if (xTractU.func == "mat" && xTractL.func != "mat") {return scalarMult(xU,xL)}
        if (xTractL.func == "mat" && xTractU.func != "mat") {return scalarMult(xL,xU)}
        if (xTractU.func == "mat" && xTractL.func == "mat") { //matrix multiply
            xU = matArray(xU);
            xL = matArray(xL);
            var mReturn = "undefined"
            if (xL.length == xU[0].length) {
                mReturn = matCreate(xU.length,xL[0].length);
                for (var rU in xU) {
                    for (var cL in xL[0]) {
                        for (var cU in xU[0]) {
                            var mTemp = cMulS(matFunc(xU[rU][cU]),matFunc(xL[cU][cL]));
                            if (mReturn[rU][cL] == 0) {mReturn[rU][cL] = mTemp}
                            else {mReturn[rU][cL] = cAddS(mReturn[rU][cL],mTemp)}
                        }
                    }
                }
            }
            return matFunc(mReturn)
        }
        if (xL == "Cv[45]") {return facS(xU)} //factorial
        if (xU == "Cv[45]") {return facS(xL)} //factorial
        if (xL == "Cv[46]" && !nbrTest(xU)) {return cMulS(xL,xU)}
        if (xU == "Cv[46]" && nbrTest(xL))  {return cMulS(xL,xU)}
        if (xTractU.func == "fac" && xTractL.func == "fac" && nbrTest(xTractU.upper) && nbrTest(xTractL.upper)) {return cMulS(fac(xTractU.upper),fac(xTractL.upper))}
        if (xTractU.func == "cNeg") {return cNegS(cMulS(xTractU.upper,xL))}
        if (xTractL.func == "cNeg") {return cNegS(cMulS(xU,xTractL.upper))}
        if (xU == "Cv[8734]" && xL > 0) {return "Cv[8734]"} //infinity handlers for limits
        if (xU == "Cv[8734]" && xL < 0) {return "cNeg(Cv[8734])"}
        if (xU == "Cv[8734]" && conTest(xL)) {return "Cv[8734]"}
        if (xL == "Cv[8734]" && xU > 0) {return "Cv[8734]"}
        if (xL == "Cv[8734]" && xU < 0) {return "cNeg(Cv[8734])"}
        if (xL == "Cv[8734]" && conTest(xU)) {return "Cv[8734]"}
        if (xL == 0 || xU == 0) {return 0}
        if (!factorFlag && !pxpFlag && nbrTest(xU) && xU != int(xU)) {return cMulS(decToFrac(xU),xL)}
        if (!factorFlag && !pxpFlag && nbrTest(xL) && xL != int(xL)) {return cMulS(xU,decToFrac(xL))}
        if (nbrTest(xU) && nbrTest(xL)) {return fmtResult(cMul(xU,xL))}
        if (nbrTest(xU) && xTractL.func == "cPow" && nbrTest(xTractL.upper)) {xL = "("+xL+")"}
        if (xL == 1)  {return xU}
        if (xU == 1)  {return xL}
        if (xL == -1) {return cNegS(xU)}
        if (xU == -1) {return cNegS(xL)}
        if (xU == xL) {return cPowS(xU,2)}
        if (!pxpFlag && xTractU.func == "sqt" && xTractL.func == "sqt") {return "sqt(cMul("+xTractU.upper+","+xTractL.upper+"))"}
        if (xTractU.func == "cPow" && xTractL.func == "cPow" && xTractU.upper == xTractL.upper)  {return cPowS(xTractU.upper,cAddS(xTractU.lower,xTractL.lower))}
        if (xTractL.func == "cPow" && xTractU.func == "cPow" && xTractL.lower == xTractU.lower && !nbrTest(xTractL.lower)) {return cPowS(cMulS(xTractL.upper,xTractU.upper),xTractU.lower)} // reduce
        if (!factorFlag && xTractL.func == "cMul" && nbrTest(xU) && nbrTest(xTractL.upper)) {return cMulS(fmtResult(cMul(xU,xTractL.upper)),xTractL.lower)}
        if (xTractU.func == "abs" && xTractL.func == "abs") {return absS(cMulS(xTractU.upper,xTractL.upper))}
        if (!pxpFlag && xTractU.func == "cDiv" && xTractL.func == "cDiv") {return cDivS(cMulS(xTractU.upper,xTractL.upper),cMulS(xTractU.lower,xTractL.lower))}
        if (!pxpFlag && xTractU.func == "cDiv" && xTractL.func != "cDiv") {return cDivS(cMulS(xL,xTractU.upper),xTractU.lower)}
        if (!pxpFlag && xTractL.func == "cDiv" && xTractU.func != "cDiv") {return cDivS(cMulS(xU,xTractL.upper),xTractL.lower)}
        if (!factorFlag && xTractL.func == "cAdd" && nbrTest(xU)) {return cAddS(cMulS(xU,xTractL.upper),cMulS(xU,xTractL.lower))}
        if (!factorFlag && xTractL.func == "cSub" && nbrTest(xU)) {return cSubS(cMulS(xU,xTractL.upper),cMulS(xU,xTractL.lower))}
        if (xTractU.func == "cMul") {return "cMul("+xTractU.upper+",cMul("+xTractU.lower+","+xL+"))"}
        if (!nbrTest(xU) && nbrTest(xL)) {return "cMul("+xL+","+xU+")"}
        if (xTractU.func != "" && xTractU.lower == "" && xTractL.lower != "" && xTractL.func != "cMul") {return "cMul("+xL+","+xU+")"}
        if (nbrTest(xTractL.upper) && xTractU.func == "cPow" && nbrTest(xTractU.lower)) {return "cMul("+xL+","+xU+")"}
        return "cMul("+xU+","+xL+")"
    }
    function cTmsS(xU,xL) { //multiply xU * xL
        var xTractU = opExtract(xU);
        var xTractL = opExtract(xL);
        if (["vec","vct"].indexOf(xTractU.func)+1 || ["vec","vct"].indexOf(xTractL.func)+1) {return "cTms("+xU+","+xL+")"}
        return cMulS(xU,xL)
    }
    function cDotS(xU,xL) { //multiply xU . xL
        var xTractU = opExtract(xU);
        var xTractL = opExtract(xL);
        if (["vec","vct"].indexOf(xTractU.func)+1 || ["vec","vct"].indexOf(xTractL.func)+1) {return "cDot("+xU+","+xL+")"}
        return cMulS(xU,xL)
    }
    function cDivS(xU,xL) { //divide xU/xL
        var xTractU = opExtract(xU);
        var xTractL = opExtract(xL);
        var xTractB = "",gTmp = "";
        if (["cAdd","cSub"].indexOf(xTractU.func)+1) {xU = "("+xU+")"}
        if (["cAdd","cSub"].indexOf(xTractL.func)+1) {xL = "("+xL+")"}
        if (!pxpFlag && xU < 0) {return cNegS(cDivS(cNegS(xU),xL))}
        if (!pxpFlag && xTractU.func == "cNeg") {return cNegS(cDivS(xTractU.upper,xL))}
        if (xL == 1) {return xU}
        if (xU == 0) {return 0}
        if (xL < 0)  {return cDivS(cNegS(xU),cNegS(xL))}
        if (xU == xL && !strTest(xU,"Cv[8734]")) {return 1} //infinity handlers for limits
        if ((xL == "Cv[8734]" || xL == "cNeg(Cv[8734])") && !strTest(xU,"Cv[8734]")) {return 0}
        if (xU == "cNeg(Cv[8734])" && (xL > 0 || conTest(xL))) {return "cNeg(Cv[8734])"}
        if (xU == "Cv[8734]" && (xL > 0 || conTest(xL))) {return "Cv[8734]"}
        if (xU == "Cv[8734]" && conTest(xL)) {return "Cv[8734]"}
        if (xL == 0) {return "undefined"}
        if (!factorFlag && !pxpFlag && nbrTest(xU) && xU != int(xU)) {return cDivS(decToFrac(xU),xL)}
        if (!factorFlag && !pxpFlag && nbrTest(xL) && xL != int(xL)) {return cDivS(xU,decToFrac(xL))}
        if (nbrTest(xU) && nbrTest(xL) && cDiv(xU,xL) == int(cDiv(xU,xL))) {return fmtResult(cDiv(xU,xL))}
        if (nbrTest(xU) && nbrTest(xL)) {gTmp = cGcf(xU,xL);if (gTmp > 1) {return cDivS(cDiv(xU,gTmp),cDiv(xL,gTmp))}}
        if (xTractU.func == "cMul" && nbrTest(xTractU.upper) && nbrTest(xL)) {
            gTmp = cGcf(xTractU.upper,xL);
            if (gTmp > 1) {return cDivS(cMulS(cDiv(xTractU.upper,gTmp),xTractU.lower),cDiv(xL,gTmp))}
        }
        if (xTractL.func == "cSub") {
            xTractB = opExtract(xTractL.upper);
            if (xTractB.func == "cNeg") {return cNegS(cDivS(xU,cAddS(xTractB.upper,xTractL.lower)))}
        }
        if (xTractL.func == "cPow" && xTractU.func == "cPow" && xTractL.lower == xTractU.lower && !nbrTest(xTractL.lower)) {return cPowS(cDivS(xTractL.upper,xTractU.upper),xTractU.lower)}
        if (!pxpFlag && xTractU.func == "cDiv" && xTractL.func != "") {return cDivS(xTractU.upper,cMulS(xTractU.lower,xL))}
        if (xTractU.func == "sin" && xTractL.func == "cos" && xTractU.upper == xTractL.upper) {return tanS(xTractU.upper)}
        if (xTractU.func == "cos" && xTractL.func == "sin" && xTractU.upper == xTractL.upper) {return cotS(xTractU.upper)}
        if (xTractU.func == "sin" && xTractL.func == "tan" && xTractU.upper == xTractL.upper) {return cosS(xTractU.upper)}
        if (xTractU.func == "tan" && xTractL.func == "sin" && xTractU.upper == xTractL.upper) {return secS(xTractU.upper)}
        if (xTractU.func == "sec" && xTractL.func == "tan" && xTractU.upper == xTractL.upper) {return cscS(xTractU.upper)}
        if (xTractU.func == "tan" && xTractL.func == "sec" && xTractU.upper == xTractL.upper) {return sinS(xTractU.upper)}
        if (xTractU.func == "snh" && xTractL.func == "csh" && xTractU.upper == xTractL.upper) {return tnhS(xTractU.upper)}
        if (xTractU.func == "snh" && xTractL.func == "tnh" && xTractU.upper == xTractL.upper) {return cshS(xTractU.upper)}
        if (xTractU.func == "abs" && xTractL.func == "abs") {return absS(cDivS(xTractU.upper,xTractL.upper))}
        if (xTractL.func == "sec") {return cMulS(xU,"cos("+xTractL.upper+")")}
        if (xTractL.func == "csc") {return cMulS(xU,"sin("+xTractL.upper+")")}
        if (xTractL.func == "cot") {return cMulS(xU,"tan("+xTractL.upper+")")}
        if (xTractL.func == "tan") {return cMulS(xU,"cot("+xTractL.upper+")")}
        if (xTractL.func == "sch") {return cMulS(xU,"csh("+xTractL.upper+")")}
        if (xTractL.func == "cch") {return cMulS(xU,"snh("+xTractL.upper+")")}
        if (xTractL.func == "tnh") {return cMulS(xU,"cth("+xTractL.upper+")")}
        if (xTractL.func == "cth") {return cMulS(xU,"tnh("+xTractL.upper+")")}
        if (xTractL.func == "cPow" && nbrTest(xTractL.lower) && xTractL.lower == int(xTractL.lower)) {
            xTractB = opExtract(xTractL.upper);
            if (xTractB.func == "sin") {return cMulS(xU,cPowS(cscS(xTractB.upper),xTractL.lower))}
            if (xTractB.func == "cos") {return cMulS(xU,cPowS(secS(xTractB.upper),xTractL.lower))}
            if (xTractB.func == "tan") {return cMulS(xU,cPowS(cotS(xTractB.upper),xTractL.lower))}
            if (xTractB.func == "sec") {return cMulS(xU,cPowS(cosS(xTractB.upper),xTractL.lower))}
            if (xTractB.func == "csc") {return cMulS(xU,cPowS(sinS(xTractB.upper),xTractL.lower))}
            if (xTractB.func == "cot") {return cMulS(xU,cPowS(tanS(xTractB.upper),xTractL.lower))}
            if (xTractB.func == "snh") {return cMulS(xU,cPowS(cchS(xTractB.upper),xTractL.lower))}
            if (xTractB.func == "csh") {return cMulS(xU,cPowS(schS(xTractB.upper),xTractL.lower))}
            if (xTractB.func == "tnh") {return cMulS(xU,cPowS(cthS(xTractB.upper),xTractL.lower))}
            if (xTractB.func == "sch") {return cMulS(xU,cPowS(cshS(xTractB.upper),xTractL.lower))}
            if (xTractB.func == "cch") {return cMulS(xU,cPowS(snhS(xTractB.upper),xTractL.lower))}
            if (xTractB.func == "cth") {return cMulS(xU,cPowS(tnhS(xTractB.upper),xTractL.lower))}
        }
        if (xL == 2 && xprMatch(xU,"cSub(1,cos(cMul(2,Cv[9999])))")) {return cPowS(sinS(xprMatch(xU,"cSub(1,cos(cMul(2,Cv[9999])))")),2)}
        if (xL == 2 && xprMatch(xU,"cAdd(cos(cMul(2,Cv[9999])),1)")) {return cPowS(cosS(xprMatch(xU,"cAdd(cos(cMul(2,Cv[9999])),1)")),2)}
        if (xL == 2 && xprMatch(xU,"cSub(1,sin(cMul(2,Cv[9999])))")) {return cPowS(sinS(xprMatch(xU,"cSub(1,sin(cMul(2,Cv[9999])))")),2)}
        if (xL == 2 && xprMatch(xU,"cSub(csh(cMul(2,Cv[9999])),1)")) {return cPowS(snhS(xprMatch(xU,"cSub(csh(cMul(2,Cv[9999])),1)")),2)}
        if (xL == 2 && xprMatch(xU,"cAdd(csh(cMul(2,Cv[9999])),1)")) {return cPowS(cshS(xprMatch(xU,"cAdd(csh(cMul(2,Cv[9999])),1)")),2)}
        if (xTractU.func == "fac" && xTractL.func == "fac" && nbrTest(xTractU.upper) && nbrTest(xTractL.upper)) {return cDivS(fac(xTractU.upper),fac(xTractL.upper))}
        if (pxpFlag && xTractU.func == "cAdd" && (factorFlag)) {return cAddS(cDivS(xTractU.upper,xL),cDivS(xTractU.lower,xL))}
        if (pxpFlag && xTractU.func == "cSub" && (factorFlag)) {return cSubS(cDivS(xTractU.upper,xL),cDivS(xTractU.lower,xL))}
        if (pxpFlag && xTractU.func == "cAdd" && (pNomial(xL).length < 2 || xTractL.func == "cMul")) {return cAddS(cDivS(xTractU.upper,xL),cDivS(xTractU.lower,xL))}
        if (pxpFlag && xTractU.func == "cSub" && (pNomial(xL).length < 2 || xTractL.func == "cMul")) {return cSubS(cDivS(xTractU.upper,xL),cDivS(xTractU.lower,xL))}
        if (["cAdd","cSub"].indexOf(xTractL.func)+1 && !pxpFlag && !factorFlag) {return pDivide(xU,xL)}
        return "cDiv("+xU+","+xL+")"
    }
    function cAddS(xU,xL) { //add xU+xL
        var xTractU = opExtract(xU);
        var xTractL = opExtract(xL);
        var xTractT = "", xTractB = "";
        if (xTractU.func == "mat" && xTractL.func == "mat") { //matrix add
            xU = matArray(xU);
            xL = matArray(xL);
            var mReturn = "undefined";
            if (xU.length == xL.length) {
                mReturn = xU;
                for (var iR in xU) {mReturn[iR] = cAddS(matFunc(xU[iR]),matFunc(xL[iR]))}
            }
            return matFunc(mReturn)
        }
        if (xU == xL) {return cMulS(2,xU)}
        if (!factorFlag && !pxpFlag && nbrTest(xU) && xU != int(xU)) {return cAddS(decToFrac(xU),xL)}
        if (!factorFlag && !pxpFlag && nbrTest(xL) && xL != int(xL)) {return cAddS(xU,decToFrac(xL))}
        if (nbrTest(xL) && xL < 0) {return cSubS(xU,cNegS(xL))}
        if (nbrTest(xU) && nbrTest(xL)) {return fmtResult(cAdd(xU,xL))}
        if (xTractL.func == "cNeg") {return cSubS(xU,xTractL.upper)}
        if ((nbrTest(xU) || conTest(xU)) && xL == "Cv[8734]") {return "Cv[8734]"} //infinity handlers for limits
        if ((nbrTest(xL) || conTest(xL)) && xU == "Cv[8734]") {return "Cv[8734]"}
        if (xL == 0) {return xU}
        if (xU == 0) {return xL}
        if (xU == "Cv[8230]") {return "cAdd("+xL+","+xU+")"}
        if (xL == "Cv[8230]") {return "cAdd("+xU+","+xL+")"}        
        if (xTractL.func == "cMul" && xTractL.upper < 0) {return cSubS(xU,cMulS(cNegS(xTractL.upper),xTractL.lower))}
        if (xTractU.func == "cMul" && xTractU.upper < 0) {return cSubS(xL,cMulS(cNegS(xTractU.upper),xTractU.lower))}
        if (xTractU.func == "cNeg" && String(xL).search(/Cv\[111\d+\]/) == -1) {return cSubS(xL,xTractU.upper)} //constants of integration
        if (nbrTest(xU) && xTractL.func == "cDiv" && nbrTest(xTractL.upper) && nbrTest(xTractL.lower)) {return cDivS(cAddS(cMulS(xU,xTractL.lower),xTractL.upper),xTractL.lower)}
        if (nbrTest(xL) && xTractU.func == "cDiv" && nbrTest(xTractU.upper) && nbrTest(xTractU.lower)) {return cDivS(cAddS(cMulS(xL,xTractU.lower),xTractU.upper),xTractU.lower)}
        if (!pxpFlag && xTractU.func == "cDiv" && xTractL.func == "cDiv" && xTractU.lower == xTractL.lower) {return "cDiv(cAdd("+xTractU.upper+","+xTractL.upper+"),"+xTractU.lower+")"}
        if (!pxpFlag && xprMatch(xTractU.upper,"sqt(Cv[9999])") && xprMatch(xTractL.upper,"sqt(Cv[9999])") && xprMatch(xTractU.lower,"sqt(Cv[9999])") && xprMatch(xTractL.lower,"sqt(Cv[9999])")) {
            return cAddS(sqtS(cDivS(xprMatch(xTractU.upper,"sqt(Cv[9999])"),xprMatch(xTractU.lower,"sqt(Cv[9999])"))),sqtS(cDivS(xprMatch(xTractL.upper,"sqt(Cv[9999])"),xprMatch(xTractL.lower,"sqt(Cv[9999])"))))
        }
        if (xTractU.func == "csh" && xTractL.func == "snh" && xTractU.upper == xTractL.upper) {return cPowS("Cv[8]",xTractU.upper)}
        if (xTractU.func == "snh" && xTractL.func == "csh" && xTractU.upper == xTractL.upper) {return cPowS("Cv[8]",xTractU.upper)}
        if (xTractU.func == "tan" && xTractL.func == "cot") {
            xTractT = opExtract(xTractU.upper);xTractB = opExtract(xTractL.upper);
            if (xTractT.func == "cDiv" && xTractB.func == "cDiv" && xTractT.lower == 2 && xTractB.lower == 2 && xTractT.upper == xTractB.upper) {return cMulS(2,cscS(xTractT.upper))}
        }
        if (xTractU.func == "cPow" && xTractL.func == "cPow" && xTractU.lower == 2 && xTractL.lower == 2) {
            xTractT = opExtract(xTractU.upper);xTractB = opExtract(xTractL.upper);
            if (xTractT.func == "sin" && xTractB.func == "cos" && xTractT.upper == xTractB.upper) {return 1}
            if (xTractT.func == "cos" && xTractB.func == "sin" && xTractT.upper == xTractB.upper) {return 1}
        }
        if (xTractU.func == "cPow" && xTractL.func == "cPow" && xTractU.lower == 2 && xTractL.lower == 2) {
            xTractT = opExtract(xTractU.upper);xTractB = opExtract(xTractL.upper);
            if (xTractT.func == "snh" && xTractB.func == "csh" && xTractT.upper == xTractB.upper) {return cMulS(2,cPowS(cshS(xTractB.upper),2))}
            if (xTractT.func == "csh" && xTractB.func == "snh" && xTractT.upper == xTractB.upper) {return cMulS(2,cPowS(cshS(xTractB.upper),2))}
        }
        if (xTractU.func == "cMul" && xTractL.func == "cMul") {
            var xTractTu = opExtract(xTractU.upper);var xTractTl = opExtract(xTractU.lower);
            var xTractBu = opExtract(xTractL.upper);var xTractBl = opExtract(xTractL.lower);
            if (xTractTu.upper == xTractBl.upper && xTractBu.upper == xTractTl.upper && xTractTu.func == "cos" && xTractTl.func == "sin" && xTractBu.func == "cos" && xTractBl.func == "sin" ) {return sinS(cAddS(xTractTl.upper,xTractTu.upper))}
            if (xTractTu.upper == xTractBl.upper && xTractBu.upper == xTractTl.upper && xTractTu.func == "csh" && xTractTl.func == "snh" && xTractBu.func == "csh" && xTractBl.func == "snh" ) {return snhS(cAddS(xTractTl.upper,xTractTu.upper))}
            if (xTractTu.upper == xTractBu.upper && xTractTl.upper == xTractBl.upper && xTractTu.func == "cos" && xTractTl.func == "cos" && xTractBu.func == "sin" && xTractBl.func == "sin" ) {return cosS(cAddS(xTractTl.upper,xTractTu.upper))}
            if (xTractTu.upper == xTractBu.upper && xTractTl.upper == xTractBl.upper && xTractTu.func == "csh" && xTractTl.func == "csh" && xTractBu.func == "snh" && xTractBl.func == "snh" ) {return cshS(cAddS(xTractTl.upper,xTractTu.upper))}
        }
        if (xTractU.func == "cPow" && xTractU.lower == 2 && xL == 1) {
            xTractT = opExtract(xTractU.upper);
            if (xTractT.func == "cot") {return cPowS(cscS(xTractT.upper),2)}
            if (xTractT.func == "tan") {return cPowS(secS(xTractT.upper),2)}
        }
        if (!factorFlag && xTractU.func == "cDiv" && xTractL.func == "cDiv" && !nbrTest(xTractU.lower) && !nbrTest(xTractL.lower)){ //add fractions
            var lTemp = cDivS(xTractU.lower,xTractL.lower);
            var uTemp = cDivS(xTractL.lower,xTractU.lower);
            if (nbrTest(uTemp)) {return "cDiv("+cAddS(cMulS(uTemp,xTractU.upper),xTractL.upper)+","+xTractL.lower+")"}
            if (nbrTest(lTemp)) {return "cDiv("+cAddS(xTractU.upper,cMulS(lTemp,xTractL.upper))+","+xTractU.lower+")"}
        }
        if (xTractU.func == "fac" && xTractL.func == "fac" && nbrTest(xTractU.upper) && nbrTest(xTractL.upper)) {return cAddS(fac(xTractU.upper),fac(xTractL.upper))}
        if (xTractL.func == "cSub") {xTractB = opExtract(xTractL.upper)
        if (xTractB.func == "cNeg") {return cSubS(cSubS(xU,xTractB.upper),xTractL.lower)}}
        if (xTractU.func == "cAdd") {return "cAdd("+xTractU.upper+",cAdd("+xTractU.lower+","+xL+"))"}
        return "cAdd("+xU+","+xL+")"
    }
    function cSubS(xU,xL) { //subtract xU-xL
        var xTractU = opExtract(xU);
        var xTractL = opExtract(xL);
        var xTractT = "",xTractB = "";
        if (xTractU.func == "mat" && xTractL.func == "mat") {return cAddS(xU,cMulS(xL,-1))} //matrix subtract
        if (xTractL.func == "cAdd") {xL = "("+xL+")"}
        if (xL == 0) {return xU}
        if (xU == 0) {return cNegS(xL)}
        if (xU == xL) {return 0}
        if (!factorFlag && !pxpFlag && nbrTest(xU) && xU != int(xU)) {return cSubS(decToFrac(xU),xL)}
        if (!factorFlag && !pxpFlag && nbrTest(xL) && xL != int(xL)) {return cSubS(xU,decToFrac(xL))}
        if (nbrTest(xL) && xL < 0) {return cAddS(xU,cNegS(xL))}
        if (nbrTest(xU) && nbrTest(xL)) {return fmtResult(cSub(xU,xL))}
        if (xTractL.func == "cNeg") {return cAddS(xU,xTractL.upper)}
        if (xU == "cNeg(Cv[8734])" && xL == "Cv[8734]") {return "cNeg(Cv[8734])"} //infinity handlers for limits
        if ((nbrTest(xU) || conTest(xU)) && xL == "Cv[8734]") {return "cNeg(Cv[8734])"}
        if ((nbrTest(xL) || conTest(xL)) && xU == "Cv[8734]") {return "Cv[8734]"}
        if ((nbrTest(xL) || conTest(xL)) && xU == "cNeg(Cv[8734])") {return "cNeg(Cv[8734])"}
        if (nbrTest(xU) && xTractL.func == "cDiv" && nbrTest(xTractL.upper) && nbrTest(xTractL.lower)) {return cDivS(cSubS(cMulS(xU,xTractL.lower),xTractL.upper),xTractL.lower)}
        if (nbrTest(xL) && xTractU.func == "cDiv" && nbrTest(xTractU.upper) && nbrTest(xTractU.lower)) {return cDivS(cSubS(xTractU.upper,cMulS(xL,xTractU.lower)),xTractU.lower)}
        if (!pxpFlag && xTractU.func == "cDiv" && xTractL.func == "cDiv" && xTractU.lower == xTractL.lower) {return "cDiv(cSub("+xTractU.upper+","+xTractL.upper+"),"+xTractU.lower+")"}
        if (!pxpFlag && xprMatch(xTractU.upper,"sqt(Cv[9999])") && xprMatch(xTractL.upper,"sqt(Cv[9999])") && xprMatch(xTractU.lower,"sqt(Cv[9999])") && xprMatch(xTractL.lower,"sqt(Cv[9999])")) { //normalize square root fractions
            return cSubS(sqtS(cDivS(xprMatch(xTractU.upper,"sqt(Cv[9999])"),xprMatch(xTractU.lower,"sqt(Cv[9999])"))),sqtS(cDivS(xprMatch(xTractL.upper,"sqt(Cv[9999])"),xprMatch(xTractL.lower,"sqt(Cv[9999])"))))
        }
        if (xTractU.func == "csh" && xTractL.func == "snh" && xTractU.upper == xTractL.upper) {return cPowS("Cv[8]",cNegS(xTractU.upper))}
        if (xTractU.func == "cPow" && xTractL.func == "cPow" && xTractU.lower == 2 && xTractL.lower == 2) {
            xTractT = opExtract(xTractU.upper);xTractB = opExtract(xTractL.upper);
            if (xTractT.func == "sin" && xTractB.func == "cos" && xTractT.upper == xTractB.upper) {return cNegS(cosS(cMulS(2,xTractT.upper)))}
            if (xTractT.func == "cos" && xTractB.func == "sin" && xTractT.upper == xTractB.upper) {return cosS(cMulS(2,xTractT.upper))}
        }
        if (xTractL.func == "cPow" && xU == 1) {
            if (xprMatch(xL,"cPow(cos(Cv[9999]),2)")) {return cPowS(sinS(xprMatch(xL,"cPow(cos(Cv[9999]),2)")),2)}
            if (xprMatch(xL,"cPow(sin(Cv[9999]),2)")) {return cPowS(cosS(xprMatch(xL,"cPow(sin(Cv[9999]),2)")),2)}
        }
        if (xTractU.func == "cMul" && xTractL.func == "cMul") {
            xTractT = opExtract(xTractU.upper);xTractB = opExtract(xTractU.lower);
            var xTractX = opExtract(xTractL.upper);var xTractY = opExtract(xTractL.lower);
            if (xTractT.upper == xTractY.upper && xTractX.upper == xTractB.upper && xTractT.func == "cos" && xTractB.func == "sin" && xTractX.func == "cos" && xTractY.func == "sin" ) {return sinS(cSubS(xTractB.upper,xTractT.upper))}
            if (xTractT.upper == xTractY.upper && xTractX.upper == xTractB.upper && xTractT.func == "csh" && xTractB.func == "snh" && xTractX.func == "csh" && xTractY.func == "snh" ) {return snhS(cSubS(xTractB.upper,xTractT.upper))}
            if (xTractT.upper == xTractX.upper && xTractB.upper == xTractY.upper && xTractT.func == "cos" && xTractB.func == "cos" && xTractX.func == "sin" && xTractY.func == "sin" ) {return cosS(cSubS(xTractT.upper,xTractB.upper))}
            if (xTractT.upper == xTractX.upper && xTractB.upper == xTractY.upper && xTractT.func == "csh" && xTractB.func == "csh" && xTractX.func == "snh" && xTractY.func == "snh" ) {return cshS(cSubS(xTractT.upper,xTractB.upper))}
        }
        if (xTractU.func == "cPow" && xTractU.lower == 2 && xL == 1) {
            xTractT = opExtract(xTractU.upper);
            if (xTractT.func == "csc") {return cPowS(cotS(xTractT.upper),2)}
            if (xTractT.func == "sec") {return cPowS(tanS(xTractT.upper),2)}
        }
        if (!factorFlag && !pxpFlag && xTractU.func == "cDiv" && xTractL.func == "cDiv" && !nbrTest(xTractU.lower) && !nbrTest(xTractL.lower)){ //subtract fractions
            var lTemp = cDivS(xTractU.lower,xTractL.lower);
            if (nbrTest(lTemp)) {return "cDiv("+cSubS(xTractU.upper,cMulS(lTemp,xTractL.upper))+","+xTractU.lower+")"}
        }
        if (xTractU.func == "fac" && xTractL.func == "fac" && nbrTest(xTractU.upper) && nbrTest(xTractL.upper)) {return cSubS(fac(xTractU.upper),fac(xTractL.upper))}
        return "cSub("+xU+","+xL+")"
    }
    function cNegS(xU) { //negate -xU
        var xTractU = opExtract(xU);
        var sReturn = "cNeg("+xU+")";
        if (xU == 0) {sReturn = 0}
        else if (xTractU.func == "mat") {sReturn = cMulS(xU,-1)}
        else if (xTractU.func == "cAdd") {sReturn = cSubS(cNegS(xTractU.upper),xTractU.lower)}
        else if (xTractU.func == "cSub") {sReturn = cSubS(xTractU.lower,xTractU.upper)}
        else if (xTractU.func == "cMul" && nbrTest(xTractU.upper)) {sReturn = cMulS(cNeg(xTractU.upper),xTractU.lower)}
        else if (xTractU.func == "cMul" && nbrTest(xTractU.lower)) {sReturn = cMulS(cNeg(xTractU.lower),xTractU.upper)}
        else if (xTractU.func == "cNeg") {sReturn = xTractU.upper}
        else if (!factorFlag && !pxpFlag && nbrTest(xU) && xU != int(xU)) {sReturn = cNegS(decToFrac(xU))}
        else if (nbrTest(xU)) {sReturn = cMul(xU,-1)}
        return sReturn
    }
    function trcS(xU) { //matrix trace
        var sReturn = "undefined";
        if (typeof xU == "object") {sReturn = trc(xU)}
        else if (opExtract(xU).func == "mat") {sReturn = matFunc(trc(matArray(xU)))}
        return sReturn
    }
    function detS(xU) { //matrix determinant
        var sReturn = "undefined";
        if (typeof xU == "object") {sReturn = det(xU)}
        else if (opExtract(xU).func == "mat") {sReturn = matFunc(det(matArray(xU)))}
        return sReturn
    }
    function invS(xU) { //matrix inverse
        var mTemp = matArray(xU);
        var sReturn = "undefined";
        if (getType(mTemp[0][0]) == "matrix") {
            var rowsU = mTemp.length;
            if (rowsU == mTemp[0].length) {
                var mReturn = matCreate(rowsU,rowsU);
                for (var iR in mTemp) {for (var iC in mTemp) {mReturn[iR][iC] = invS(mTemp[iR][iC])}}
                sReturn = matFunc(mReturn);
            }
        }
        else {sReturn = cMulS(cDivS(1,detS(mTemp)),matFunc(trn(matCofac(mTemp))))}
        return sReturn
    }
    function sqtS(xU) { //square root
        var xTractU = opExtract(xU);
        var sReturn = "sqt("+xU+")";
        if (xU == "Cv[8734]") {sReturn = "Cv[8734]"}
        else if (nbrTest(xU) && sqt(xU) == int(sqt(xU))){sReturn = (fmtResult(sqt(xU)))} //calculate integer roots
        else if (pxpFlag && xTractU.func == "cDiv") {sReturn = cDivS(sqtS(xTractU.upper),sqtS(xTractU.lower))}
        else if (pxpFlag && xTractU.func == "cMul") {sReturn = cMulS(sqtS(xTractU.upper),sqtS(xTractU.lower))}
        else if (pxpFlag) {sReturn = "cPow("+xU+",0.5)"}
        else if (xTractU.func == "cPow" && xTractU.lower == 2 && mgConfig.Domain == "Real") {sReturn = absS(xTractU.upper)}
        else if (xTractU.func == "cPow") {sReturn = cPowS(xTractU.upper,cDivS(xTractU.lower,2))}
        return sReturn
    }
    function cbtS(xU) { //cube root
        var xTractU = opExtract(xU);
        var sReturn = "cbt("+xU+")";
        if (xU == "Cv[8734]") {sReturn = "Cv[8734]"}
        else if (xU == "cNeg(Cv[8734])") {sReturn = "cNeg(Cv[8734])"}
        else if (nbrTest(xU) && cbt(xU) == int(cbt(xU))) {sReturn = (fmtResult(cbt(xU)))} //calculate integer roots
        else if (xTractU.func == "cPow") {sReturn = cPowS(xTractU.upper,cDivS(xTractU.lower,3))}
        else if (pxpFlag) {sReturn = "cPow("+xU+",cDiv(1,3))"}
        return sReturn
    }
    function nrtS(xU,xL)  { //xU'th root of xL
        var sReturn;
        if (nbrTest(xU) && nbrTest(xL) && nrt(xU,xL) == int(nrt(xU,xL))) {sReturn = (fmtResult(nrt(xU,xL)))} //calculate integer roots
        else {sReturn = cPowS(xL,cDivS(1,xU))}
        return sReturn
    }
    function lndS(xU) { //log with domain for calculus
        var sReturn;
        if (mgConfig.Domain == "Real") {sReturn = lneS(absS(xU))}
        else {sReturn = lneS(xU)}
        return sReturn
    }
    function lneS(xU) { //natural log
        var xTractU = opExtract(xU);
        var sReturn = "lne("+xU+")";
        if (xU == 0) {sReturn = "cNeg(Cv[8734])"}
        else if (xU == "Cv[8]") {sReturn = 1}
        else if (xU == "Cv[8734]") {sReturn = "Cv[8734]"}
        else if (xTractU.func == "cNeg" && xTractU.upper == "Cv[8]" && mgConfig.Domain == "Complex") {sReturn = "cAdd(1,cMul(Cv[29],Cv[46]))"}
        else if (xU == -1 && mgConfig.Domain == "Complex") {sReturn = "cMul(Cv[29],Cv[46])"}
        else if (nbrTest(xU) && lne(xU) == int(lne(xU)) ) {sReturn = (fmtResult(lne(xU)))} //calculate integer logs
        else if (xTractU.func == "cPow" && xTractU.upper == "Cv[8]") {sReturn = xTractU.lower}
        else if (xTractU.func == "cDiv" && xTractU.upper == 1) {sReturn = cNegS(lneS(xTractU.lower))}
        else if (xTractU.func == "cPow") {sReturn = cMulS(xTractU.lower,lneS(xTractU.upper))}
        return sReturn
    }
    function logS(xU) {return "lne("+xU+")"} //natural log
    function lgnS(xU,xL)  { //log xU to base xL
        var sReturn = "";   
        if (xU == "Cv[8]") {sReturn =  lneS(xL)}
        else if (nbrTest(xU)  && nbrTest(xL) && lgn(xU,xL) == int(lgn(xU,xL))) {sReturn = (fmtResult(lgn(xU,xL)))} //calculate integer logs
        else {sReturn =  cDivS(lneS(xL),lneS(xU))}
        return sReturn
    }
    function efcS(xU) { //inverse erf
        var xTractU = opExtract(xU);
        var sReturn = "efc("+xU+")";
        if (nbrTest(xU)) {sReturn =  (fmtResult(efc(xU)))}
        else if (xTractU.func == "erf") {sReturn =  xTractU.upper}
        return sReturn
    }
    function erfS(xU) { //erf
        var xTractU = opExtract(xU);
        var sReturn = "erf("+xU+")";
        if (nbrTest(xU)) {sReturn = (fmtResult(erf(xU)))}
        else if (xTractU.func == "efc") {sReturn = xTractU.upper}
        return sReturn
    }
    function expS(xU) { //e^xU
        var xTractU = opExtract(xU);
        var sReturn = "exp("+xU+")";
        if (xU == 0) {sReturn =  1}
        else if (xU == 1) {sReturn = "Cv[8]"}
        else if (xTractU.func == "lne") {sReturn = xTractU.upper}
        return sReturn
    }
    //trig exact values
    const iAngle = [
    "cDiv(1,12)","cDiv(5,12)","cDiv(7,12)","cDiv(11,12)","cDiv(13,12)","cDiv(17,12)","cDiv(19,12)","cDiv(23,12)",
    "cDiv(1,10)","cDiv(3,10)","cDiv(7,10)","cDiv(9,10)","cDiv(11,10)","cDiv(13,10)","cDiv(17,10)","cDiv(19,10)",
    "cDiv(1,6)","cDiv(5,6)","cDiv(7,6)","cDiv(11,6)",
    "cDiv(1,4)","cDiv(3,4)","cDiv(5,4)","cDiv(7,4)",
    "cDiv(1,3)","cDiv(2,3)","cDiv(4,3)","cDiv(5,3)",
    "cDiv(1,2)","cDiv(3,2)",
    ];
    const sinAngle = [
    "cDiv(cSub(sqt(6),sqt(2)),4)","cDiv(cAdd(sqt(6),sqt(2)),4)","cDiv(cAdd(sqt(6),sqt(2)),4)","cDiv(cSub(sqt(6),sqt(2)),4)","cDiv(cSub(sqt(2),sqt(6)),4)","cDiv(cSub(cNeg(sqt(2)),sqt(6)),4)","cDiv(cSub(cNeg(sqt(2)),sqt(6)),4)","cDiv(cSub(sqt(2),sqt(6)),4)",
    "cDiv(cSub(sqt(5),1),4)","cDiv(cAdd(sqt(5),1),4)","cDiv(cAdd(sqt(5),1),4)","cDiv(cSub(sqt(5),1),4)","cDiv(cSub(1,sqt(5)),4)","cDiv(cSub(cNeg(sqt(5)),1),4)","cDiv(cSub(cNeg(sqt(5)),1),4)","cDiv(cSub(1,sqt(5)),4)",
    "cDiv(1,2)","cDiv(1,2)","cNeg(cDiv(1,2))","cNeg(cDiv(1,2))",
    "cDiv(1,sqt(2))","cDiv(1,sqt(2))","cNeg(cDiv(1,sqt(2)))","cNeg(cDiv(1,sqt(2)))",
    "cDiv(sqt(3),2)","cDiv(sqt(3),2)","cNeg(cDiv(sqt(3),2))","cNeg(cDiv(sqt(3),2))",
    "1","-1",
    ];
    //trig
    function sinS(xU) {//sin
        var xTractU = opExtract(xU);
        var rAngle = piReduce(xU);
        var sReturn = "sin("+xU+")";
        if (xTractU.func == "asn") {sReturn = xTractU.upper}
        else if (xTractU.func == "cNeg") {sReturn = "cNeg(sin("+xTractU.upper+"))"}
        else if (rAngle == "0") {sReturn = 0}
        else if (rAngle == "1") {sReturn = 0}
        else if (strTest(iAngle,rAngle)) {sReturn = sinAngle[iAngle.indexOf(rAngle)]}
        else if (xU == 0) {sReturn = 0}
        else if (xU == "Cv[8734]") {sReturn = "undefined"}
        return sReturn
    }
    const cosAngle = [
    "cDiv(cAdd(sqt(6),sqt(2)),4)","cDiv(cSub(sqt(6),sqt(2)),4)","cDiv(cSub(sqt(2),sqt(6)),4)","cDiv(cSub(cNeg(sqt(2)),sqt(6)),4)","cDiv(cSub(cNeg(sqt(2)),sqt(6)),4)","cDiv(cSub(sqt(2),sqt(6)),4)","cDiv(cSub(sqt(6),sqt(2)),4)","cDiv(cAdd(sqt(6),sqt(2)),4)",
    "cDiv(sqt(cAdd(cMul(sqt(5),2),10)),4)","cDiv(sqt(cSub(10,cMul(sqt(5),2))),4)","cNeg(cDiv(sqt(cSub(10,cMul(sqt(5),2))),4))","cNeg(cDiv(sqt(cAdd(cMul(sqt(5),2),10)),4))","cNeg(cDiv(sqt(cAdd(cMul(sqt(5),2),10)),4))","cNeg(cDiv(sqt(cSub(10,cMul(sqt(5),2))),4))","cDiv(sqt(cSub(10,cMul(sqt(5),2))),4)","cDiv(sqt(cAdd(cMul(sqt(5),2),10)),4)",
    "cDiv(sqt(3),2)","cNeg(cDiv(sqt(3),2))","cNeg(cDiv(sqt(3),2))","cDiv(sqt(3),2)",
    "cDiv(1,sqt(2))","cNeg(cDiv(1,sqt(2)))","cNeg(cDiv(1,sqt(2)))","cDiv(1,sqt(2))",
    "cDiv(1,2)","cNeg(cDiv(1,2))","cNeg(cDiv(1,2))","cDiv(1,2)",
    "0","0",
    ];
    function cosS(xU) {//cos
        var xTractU = opExtract(xU);
        var rAngle = piReduce(xU);
        var sReturn = "cos("+xU+")";
        if (xTractU.func == "acs") {sReturn = xTractU.upper}
        else if (xTractU.func == "cNeg") {sReturn = "cos("+xTractU.upper+")"}
        else if (rAngle == "0") {sReturn = 1}
        else if (rAngle == "1") {sReturn = -1}
        else if (strTest(iAngle,rAngle)) {sReturn = cosAngle[iAngle.indexOf(rAngle)]}
        else if (xU == 0) {sReturn = 1}
        else if (xU == "Cv[8734]") {sReturn = "undefined"}
        return sReturn
    }
    const tanAngle = [
    "cSub(2,sqt(3))","cAdd(sqt(3),2)","cSub(cNeg(sqt(3)),2)","cSub(sqt(3),2)","cSub(2,sqt(3))","cAdd(sqt(3),2)","cSub(cNeg(sqt(3)),2)","cSub(sqt(3),2)",
    "cDiv(cSub(sqt(10),sqt(2)),cMul(2,sqt(cAdd(5,sqt(5)))))","cDiv(cAdd(sqt(2),sqt(10)),cMul(2,sqt(cSub(5,sqt(5)))))","cNeg(cDiv(cAdd(sqt(2),sqt(10)),cMul(2,sqt(cSub(5,sqt(5))))))","cDiv(cSub(sqt(2),sqt(10)),cMul(2,sqt(cAdd(5,sqt(5)))))","cDiv(cSub(sqt(10),sqt(2)),cMul(2,sqt(cAdd(5,sqt(5)))))","cDiv(cAdd(sqt(2),sqt(10)),cMul(2,sqt(cSub(5,sqt(5)))))","cNeg(cDiv(cAdd(sqt(2),sqt(10)),cMul(2,sqt(cSub(5,sqt(5))))))","cDiv(cSub(sqt(2),sqt(10)),cMul(2,sqt(cAdd(5,sqt(5)))))",
    "cDiv(1,sqt(3))","cNeg(cDiv(1,sqt(3)))","cDiv(1,sqt(3))","cNeg(cDiv(1,sqt(3)))",
    "1","-1","1","-1",
    "sqt(3)","cNeg(sqt(3))","sqt(3)","cNeg(sqt(3))",
    "undefined","undefined",
    ];
    function tanS(xU) {//tan
        var xTractU = opExtract(xU);
        var rAngle = piReduce(xU);
        var sReturn = "tan("+xU+")";
        if (xTractU.func == "atn") {sReturn = xTractU.upper}
        else if (xTractU.func == "cNeg") {sReturn = "cNeg(tan("+xTractU.upper+"))"}
        else if (rAngle == "0") {sReturn = 0}
        else if (rAngle == "1") {sReturn = 0}
        else if (strTest(iAngle,rAngle)) {sReturn = tanAngle[iAngle.indexOf(rAngle)]}
        else if (xU == 0) {sReturn = 0}
        else if (xU == "Cv[8734]") {sReturn = "undefined"}
        return sReturn
    }
    const secAngle = [
    "cSub(sqt(6),sqt(2))","cAdd(sqt(2),sqt(6))","cSub(sqt(2),sqt(6))","cSub(cNeg(sqt(2)),sqt(6))","cSub(sqt(2),sqt(6))","cSub(cNeg(sqt(2)),sqt(6))","cAdd(sqt(2),sqt(6))","cSub(sqt(6),sqt(2))",
    "cDiv(cMul(2,sqt(2)),sqt(cAdd(sqt(5),5)))","cDiv(cMul(2,sqt(2)),sqt(cSub(5,sqt(5))))","cNeg(cDiv(cMul(2,sqt(2)),sqt(cSub(5,sqt(5)))))","cNeg(cDiv(cMul(2,sqt(2)),sqt(cAdd(5,sqt(5)))))","cNeg(cDiv(cMul(2,sqt(2)),sqt(cAdd(5,sqt(5)))))","cNeg(cDiv(cMul(2,sqt(2)),sqt(cSub(5,sqt(5)))))","cDiv(cMul(2,sqt(2)),sqt(cSub(5,sqt(5))))","cDiv(cMul(2,sqt(2)),sqt(cAdd(sqt(5),5)))",
    "cDiv(2,sqt(3))","cNeg(cDiv(2,sqt(3)))","cNeg(cDiv(2,sqt(3)))","cDiv(2,sqt(3))",
    "sqt(2)","cNeg(sqt(2))","cNeg(sqt(2))","sqt(2)",
    "2","-2","-2","2",
    "undefined","undefined",
    ];
    function secS(xU) {//sec
        var xTractU = opExtract(xU);
        var rAngle = piReduce(xU);
        var sReturn = "sec("+xU+")";
        if (xTractU.func == "asc") {sReturn = xTractU.upper}
        else if (xTractU.func == "cNeg") {sReturn = "sec("+xTractU.upper+")"}
        else if (rAngle == "0") {sReturn = 1}
        else if (rAngle == "1") {sReturn = -1}
        else if (strTest(iAngle,rAngle)) {sReturn = secAngle[iAngle.indexOf(rAngle)]}
        else if (xU == 0) {sReturn = 1}
        else if (xU == "Cv[8734]") {sReturn = "undefined"}
        return sReturn
    }
    const cscAngle = [
    "cAdd(sqt(6),sqt(2))","cSub(sqt(6),sqt(2))","cSub(sqt(6),sqt(2))","cAdd(sqt(6),sqt(2))","cSub(cNeg(sqt(6)),sqt(2))","cSub(sqt(2),sqt(6))","cSub(sqt(2),sqt(6))","cSub(cNeg(sqt(6)),sqt(2))",
    "cAdd(sqt(5),1)","cSub(sqt(5),1)","cSub(sqt(5),1)","cAdd(sqt(5),1)","cSub(cNeg(sqt(5)),1)","cSub(1,sqt(5))","cSub(1,sqt(5))","cSub(cNeg(sqt(5)),1)",
    "2","2","-2","-2",
    "sqt(2)","sqt(2)","cNeg(sqt(2))","cNeg(sqt(2))",
    "cDiv(2,sqt(3))","cDiv(2,sqt(3))","cNeg(sqt(2))","cNeg(sqt(2))",
    "1","-1",
    ];
    function cscS(xU) {//cosec
        var xTractU = opExtract(xU);
        var rAngle = piReduce(xU);
        var sReturn = "csc("+xU+")";
        if (xTractU.func == "acc") {sReturn = xTractU.upper}
        else if (xTractU.func == "cNeg") {sReturn = "cNeg(csc("+xTractU.upper+"))"}
        else if (strTest(iAngle,rAngle)) {sReturn = cscAngle[iAngle.indexOf(rAngle)]}
        else if (xU == 0) {sReturn = "undefined"}
        else if (xU == "Cv[8734]") {sReturn = "undefined"}
        return sReturn
    }
    const cotAngle = [
    "cAdd(sqt(3),2)","cSub(2,sqt(3))","cSub(sqt(3),2)","cSub(cNeg(sqt(3)),2)","cAdd(sqt(3),2)","cSub(2,sqt(3))","cSub(sqt(3),2)","cSub(cNeg(sqt(3)),2)",
    "cDiv(cMul(cAdd(sqt(2),sqt(10)),sqt(cAdd(sqt(5),5))),4)","cDiv(cMul(cSub(sqt(10),sqt(2)),sqt(cSub(5,sqt(5)))),4)","cDiv(cMul(cSub(sqt(10),sqt(2)),sqt(cSub(5,sqt(5)))),4)","cDiv(cMul(cAdd(sqt(2),sqt(10)),sqt(cAdd(sqt(5),5))),4)","cDiv(cMul(cAdd(sqt(2),sqt(10)),sqt(cAdd(sqt(5),5))),4)","cDiv(cMul(cSub(sqt(2),sqt(10)),sqt(cSub(5,sqt(5)))),4)","cDiv(cMul(cSub(sqt(2),sqt(10)),sqt(cSub(5,sqt(5)))),4)","cDiv(cMul(cAdd(sqt(2),sqt(10)),sqt(cAdd(sqt(5),5))),4)",
    "sqt(3)","cNeg(sqt(3))","sqt(3)","cNeg(sqt(3))",
    "1","-1","1","-1",
    "cDiv(1,sqt(3))","cNeg(cDiv(1,sqt(3)))","cDiv(1,sqt(3))","cNeg(cDiv(1,sqt(3)))",
    "0", "0",
    ];
    function cotS(xU) {//cot
        var xTractU = opExtract(xU);
        var rAngle = piReduce(xU);
        var sReturn = "cot("+xU+")";
        if (xTractU.func == "act") {sReturn = xTractU.upper}
        else if (xTractU.func == "cNeg") {sReturn = "cNeg(cot("+xTractU.upper+"))"}
        else if (strTest(iAngle,rAngle)) {sReturn = cotAngle[iAngle.indexOf(rAngle)]}
        else if (xU == 0) {sReturn = "undefined"}
        else if (xU == "Cv[8734]") {sReturn = "undefined"}
        return sReturn
    }
    //inverse trig
    function asnS(xU) {//asin
        var xTractU = opExtract(xU);
        var sReturn = "asn("+xU+")";
        if (xU == 0) {sReturn =  0}
        else if (xU == 1) {sReturn =  "cDiv(Cv[29],2)"}
        else if (xU == -1) {sReturn =  "cNeg(cDiv(Cv[29],2))"}
        else if (strTest(sinAngle,xU)) {sReturn =  cMulS(invMult,iAngle[sinAngle.indexOf(xU)])}
        else if (xTractU.func == "sin") {sReturn =  xTractU.upper}
        return sReturn
    }
    function acsS(xU) {//acos
        var xTractU = opExtract(xU);
        var sReturn = "acs("+xU+")";
        if (xU == 0) {sReturn = "cDiv(Cv[29],2)"}
        else if (xU == -1) {sReturn = "Cv[29]"}
        else if (strTest(cosAngle,xU)) {sReturn = cMulS(invMult,iAngle[cosAngle.indexOf(xU)])}
        else if (xTractU.func == "cos") {sReturn = xTractU.upper}
        return sReturn
    }
    function atnS(xU) {//atan
        var xTractU = opExtract(xU);
        var sReturn = "atn("+xU+")";
        if (xU == 0) {sReturn = 0}
        else if (xU == 1) {sReturn = "cDiv(Cv[29],4)"}
        else if (xU == "Cv[8734]") {sReturn = "cDiv(Cv[29],2)"}
        else if (xU == "cNeg(Cv[8734])") {sReturn = "cNeg(cDiv(Cv[29],2))"}
        else if (strTest(tanAngle,xU)) {sReturn = cMulS(invMult,iAngle[tanAngle.indexOf(xU)])}
        else if (xTractU.func == "tan") {sReturn = xTractU.upper}
        return sReturn
    }
    function ascS(xU) {//asec
        var xTractU = opExtract(xU);
        var sReturn = "asc("+xU+")";
        if (xU == "Cv[8734]") {sReturn = "cDiv(Cv[29],2)"}
        else if (xU == "cNeg(Cv[8734])") {sReturn = "cNeg(cDiv(Cv[29],2))"}
        else if (strTest(secAngle,xU)) {sReturn = cMulS(invMult,iAngle[secAngle.indexOf(xU)])}
        else if (xTractU.func == "sec") {sReturn = xTractU.upper}
        return sReturn
    }
    function accS(xU) {//acosec
        var xTractU = opExtract(xU);
        var sReturn = "acc("+xU+")";
        if (xU == 1) {sReturn = "cDiv(Cv[29],2)"}
        else if (xU == "Cv[8734]") {sReturn = 0}
        else if (xU == "cNeg(Cv[8734])") {sReturn = 0}
        else if (strTest(cscAngle,xU)) {sReturn = cMulS(invMult,iAngle[cscAngle.indexOf(xU)])}
        else if (xTractU.func == "csc") {sReturn = xTractU.upper}
        return sReturn
    }
    function actS(xU) {//acotan
        var xTractU = opExtract(xU);
        var sReturn = "act("+xU+")";
        if (xU == 0) {sReturn = "cDiv(Cv[29],2)"}
        else if (xU == 1) {sReturn = "cDiv(Cv[29],4)"}
        else if (xU == "Cv[8734]") {sReturn = 0}
        else if (xU == "cNeg(Cv[8734])") {sReturn = 0}
        else if (strTest(cotAngle,xU)) {sReturn = cMulS(invMult,iAngle[cotAngle.indexOf(xU)])}
        else if (xTractU.func == "cot") {sReturn = xTractU.upper}
        return sReturn
    }
    //hyperbolic
    function snhS(xU) {//sinh
        var xTractU = opExtract(xU);
        var sReturn = "snh("+xU+")";
        if (xU == 0) {sReturn = 0}
        else if (xTractU.func == "ash") {sReturn = xTractU.upper}
        else if (xTractU.func == "cNeg") {sReturn = "cNeg(snh("+xTractU.upper+"))"}
        return sReturn
    }
    function cshS(xU) {//cosh
        var xTractU = opExtract(xU);
        var sReturn = "csh("+xU+")";
        if (xU == 0) {sReturn = 1}
        else if (xTractU.func == "ach") {sReturn = xTractU.upper}
        else if (xTractU.func == "cNeg") {sReturn = "csh("+xTractU.upper+")"}
        return sReturn
    }
    function tnhS(xU) {//tanh
        var xTractU = opExtract(xU);
        var sReturn = "tnh("+xU+")";
        if (xU == 0) {sReturn = 0}
        else if (xTractU.func == "ath") {sReturn = xTractU.upper}
        else if (xTractU.func == "cNeg") {sReturn = "cNeg(tnh("+xTractU.upper+"))"}
        return sReturn
    }
    function schS(xU) {//sech
        var xTractU = opExtract(xU);
        var sReturn = "sch("+xU+")";
        if (xU == 0) {sReturn = 1}
        else if (xTractU.func == "axh") {sReturn = xTractU.upper}
        else if (xTractU.func == "cNeg") {sReturn = "sch("+xTractU.upper+")"}
        return sReturn
    }
    function cchS(xU) {//csch
        var xTractU = opExtract(xU);
        var sReturn = "cch("+xU+")";
        if (xU == 0) {sReturn = "Cv[8734]"}
        else if (xTractU.func == "ayh") {sReturn = xTractU.upper}
        else if (xTractU.func == "cNeg") {sReturn = "cNeg(cch("+xTractU.upper+"))"}
        return sReturn
    }
    function cthS(xU) {//coth
        var xTractU = opExtract(xU);
        var sReturn = "cth("+xU+")";
        if (xU == 0) {sReturn = "Cv[8734]"}
        else if (xTractU.func == "azh") {sReturn = xTractU.upper}
        else if (xTractU.func == "cNeg") {sReturn = "cNeg(cth("+xTractU.upper+"))"}
        return sReturn
    }
    //inverse hyperbolic
    function ashS(xU) {//asinh
        var xTractU = opExtract(xU);
        var sReturn = "ash("+xU+")";
        if (xU == 0) {sReturn = 0}
        else if (xTractU.func == "snh") {sReturn = xTractU.upper}
        return sReturn
    }
    function achS(xU) {//acosh
        var xTractU = opExtract(xU);
        var sReturn = "ach("+xU+")";
        if (xU == 0 && mgConfig.Domain == "Complex") {sReturn = "cMul(cDiv(Cv[46],2),Cv[29])"}
        else if (xU == 0 && mgConfig.Domain == "Real") {sReturn = "undefined"}
        else if (xTractU.func == "csh") {sReturn = xTractU.upper}
        return sReturn
    }
    function athS(xU) {//atanh
        var xTractU = opExtract(xU);
        var sReturn = "ath("+xU+")";
        if (xU == 0) {sReturn = 0}
        else if (xTractU.func == "tnh") {sReturn = xTractU.upper}
        return sReturn
    }
    function axhS(xU) {//asech
        var xTractU = opExtract(xU);
        var sReturn = "axh("+xU+")";
        if (xU == 0) {sReturn = "Cv[8734]"}
        else if (xTractU.func == "sch") {sReturn = xTractU.upper}
        return sReturn
    }
    function ayhS(xU) {//acsch
        var xTractU = opExtract(xU);
        var sReturn = "ayh("+xU+")";
        if (xU == 0) {sReturn = "Cv[8734]"}
        else if (xTractU.func == "cch") {sReturn = xTractU.upper}
        return sReturn
    }
    function azhS(xU) {//acoth
        var xTractU = opExtract(xU);
        var sReturn = "azh("+xU+")";
        if (xU == 0 && mgConfig.Domain == "Complex") {sReturn = "cMul(cDiv(Cv[46],2),Cv[29])"}
        else if (xU == 0 && mgConfig.Domain == "Real") {sReturn = "undefined"}
        else if (xTractU.func == "cth") {sReturn = xTractU.upper}
        return sReturn
    }
    //misc functions
    function absS(xU) {//absolute value
        var xTractU = opExtract(xU);
        var sReturn = "abs("+xU+")";
        if (conTest(xU)) {sReturn = xU}
        else if (nbrTest(xU)) {sReturn = abs(xU)}
        else if (xTractU.func == "abs") {sReturn = absS(xTractU.upper)}
        else if (xTractU.func == "cNeg") {sReturn = absS(xTractU.upper)}
        else if (xTractU.func == "cPow" && cDiv(xTractU.lower,2) == int(cDiv(xTractU.lower,2))) {sReturn = xU}
        return sReturn
    }
    function facS(xU)  {//factorial
        var sReturn = "fac("+xU+")";
        if (xU == 0 || xU == 1) {sReturn = 1}
        return sReturn
    }
    function gamS(xU)  {//gamma
        var sReturn = "gam("+xU+")";
        if (xU == 0 || xU == 1) {sReturn = 1}
        return sReturn
    }
    function sdrS(xU,xL,xN) {//total derivative (dy/dx)
        var sReturn = "tdv("+xU+","+xL+","+xN+")";
        if (typeof xN == "undefined") {sReturn =  "tdv("+xU+","+xL+")"}
        return sReturn
    }
    function psdS(xU,xL,xN) {//partial derivative (dy/dx)
        var sReturn = "drv("+xU+","+xL+","+xN+")";
        if (typeof xN == "undefined") {sReturn =  "drv("+xU+","+xL+")"}
        return sReturn
    }
    function cpxS(xU,xL) {
        var sReturn;
        if (+xL == 0 ) {sReturn = xU}
        else if (+xU == 0 && +xL == 1) {sReturn = "Cv[46]"}
        else {sReturn = cAddS(xU,cMulS(xL,"Cv[46]"))}
        return sReturn
    }
    //passthru
    function cEqlS(xU,xL) {return "cEql("+xU+","+xL+")"}
    function cNqlS(xU,xL) {return "cNql("+xU+","+xL+")"}
    function cGthS(xU,xL) {return "cGth("+xU+","+xL+")"}
    function cLthS(xU,xL) {return "cLth("+xU+","+xL+")"}
    function cGeqS(xU,xL) {return "cGeq("+xU+","+xL+")"}
    function cLeqS(xU,xL) {return "cLeq("+xU+","+xL+")"}
    function difS(xU) {return "dif("+xU+")"}
    //

    function piReduce(xAng) { //normalize degrees/grads to radians
        var xTractD = opExtract(xAng);
        var xTractT = opExtract(xTractD.upper);
        var reducedAng = "";
        if (mgConfig.trigBase == cDiv(Cv[29],180) && nbrTest(xAng)) {reducedAng = cSubS(cDivS(xAng,180),cMul(int(cDiv(xAng,360)),2))}
        if (mgConfig.trigBase == cDiv(Cv[29],200) && nbrTest(xAng)) {reducedAng = cSubS(cDivS(xAng,200),cMul(int(cDiv(xAng,400)),2))}
        if (mgConfig.trigBase == 1) {
            if (xAng == "Cv[29]") {reducedAng = "1"}
            if (xTractD.func == "cMul" && xTractD.lower  == "Cv[29]" && nbrEven(xTractD.upper)) {reducedAng = "0"}
            if (xTractD.func == "cMul" && xTractD.lower  == "Cv[29]" && !nbrEven(xTractD.upper)) {reducedAng = "1"}
            if (xTractD.func == "cDiv" && xTractD.upper  == "Cv[29]" && nbrTest(xTractD.lower)) {reducedAng = "cDiv(1,"+xTractD.lower+")"}
            if (xTractD.func == "cDiv" && nbrTest(xTractD.lower) && xTractT.func == "cMul" && xTractT.lower  == "Cv[29]" && nbrTest(xTractT.upper)) {reducedAng = cSubS(cDivS(xTractT.upper,xTractD.lower),cMul(int(cDiv(xTractT.upper,cMul(xTractD.lower,2))),2))}
        }
        return reducedAng
    }

    // Expand functions
    const expandFunc = {
    cAdd: function (xU,xL) {
        var xTractU = opExtract(xU);
        var xTractL = opExtract(xL);
        var sReturn = "cAdd("+xU+","+xL+")";
        if (xTractU.func == "cDiv" && xTractL.func == "cDiv") {sReturn = "cDiv(cnt(cAdd("+cMulS(xTractU.upper,xTractL.lower)+","+cMulS(xTractL.upper,xTractU.lower)+")),"+cMulS(xTractL.lower,xTractU.lower)+")"}
        return sReturn       
    },
    cSub: function (xU,xL) {
        var xTractU = opExtract(xU);
        var xTractL = opExtract(xL);
        var sReturn = "cSub("+xU+","+xL+")";
        if (xTractU.func == "cDiv" && xTractL.func == "cDiv") {sReturn = "cDiv(cnt(cSub("+cMulS(xTractU.upper,xTractL.lower)+","+cMulS(xTractL.upper,xTractU.lower)+")),"+cMulS(xTractL.lower,xTractU.lower)+")"}
        return sReturn        
    },
    cMul: function (xU,xL) {
        var xTractU = opExtract(xU);
        var xTractL = opExtract(xL);
        var sReturn = "cMul("+xU+","+xL+")";
        if (nbrTest(xU) && xTractL.func == "cPow" && nbrTest(xTractL.upper)) {xL = "("+xL+")"}
        if (xTractU.func == "cAdd") {sReturn = cAddS(expandFunc["cMul"](xTractU.upper,xL),expandFunc["cMul"](xTractU.lower,xL))}
        else if (xTractU.func == "cSub") {sReturn = cSubS(expandFunc["cMul"](xTractU.upper,xL),expandFunc["cMul"](xTractU.lower,xL))}
        else if (xTractL.func == "cAdd") {sReturn = cAddS(expandFunc["cMul"](xTractL.upper,xU),expandFunc["cMul"](xTractL.lower,xU))}
        else if (xTractL.func == "cSub") {sReturn = cSubS(expandFunc["cMul"](xTractL.upper,xU),expandFunc["cMul"](xTractL.lower,xU))}
        return sReturn       
    },
    cDiv: function (xU,xL) {
        var xTractU = opExtract(xU);
        var sReturn = "cDiv("+xU+","+xL+")";
        if (pNomial(xL).length < 2) {
            if (xTractU.func == "cAdd") {sReturn = "cAdd(cnt(cDiv("+xTractU.upper+","+xL+")),cnt(cDiv("+xTractU.lower+","+xL+")))"}
            if (xTractU.func == "cSub") {sReturn = "cSub(cnt(cDiv("+xTractU.upper+","+xL+")),cnt(cDiv("+xTractU.lower+","+xL+")))"}
        }
        return sReturn       
    },
    cPow: function (xU,xL) {
        var xTractU = opExtract(xU);
        var xTractL = opExtract(xL);
        var sReturn = "cPow("+xU+","+xL+")";
        if (xTractU.func == "cAdd" && xL == 2) {sReturn = expandFunc["cMul"](xU,(xU))}
        else if (xTractU.func == "cSub" && xL == 2) {sReturn = expandFunc["cMul"](xU,(xU))}
        else {
            if (["cAdd","cSub","cTms","cDiv","cMul","cPow"].indexOf(xTractU.func)+1) {xU = "("+xU+")"}
            if (["cAdd","cSub","cTms","cDiv","cMul","cNeg"].indexOf(xTractL.func)+1) {xL = "("+xL+")"}
            if (xTractL.func == "cAdd") {sReturn = "cMul(cPow("+xU+","+xTractL.upper+"),cnt(cPow("+xU+","+xTractL.lower+")))"}
            else if (xTractL.func == "cSub") {sReturn = "cDiv(cPow("+xU+","+xTractL.upper+"),cnt(cPow("+xU+","+xTractL.lower+")))"}
            else if (xTractU.func == "cMul") {sReturn = "cMul(cPow("+xTractU.upper+","+xL+"),cnt(cPow("+xTractU.lower+","+xL+")))"}
            else if (xTractU.func == "cDiv") {sReturn = "cDiv(cPow("+xTractU.upper+","+xL+"),cnt(cPow("+xTractU.lower+","+xL+")))"}
        }
        return sReturn
    },
    sqt:  function (xU) {
        var xTractU = opExtract(xU);
        var sReturn = "sqt("+xU+")" ;
        if (xTractU.func == "cMul") {sReturn = "cMul(cnt(sqt("+xTractU.upper+")),cnt(sqt("+xTractU.lower+")))"}
        if (xTractU.func == "cDiv") {sReturn = "cDiv(cnt(sqt("+xTractU.upper+")),cnt(sqt("+xTractU.lower+")))"}
        return sReturn       
    },
    }
    //
    function xprExpand(xE) { //expand (defactor) expression
        return xReduce(execFunc(xE,expandFunc)).replace(/cnt\(/g,"(")
    }
    
    //Calculus
    function parseCalculus(dExp) { //parse calculus from MG format to FUNC: d/dx(x^2) = idr(x)x^2 -> drv(x^2,x)
        dExp = String(dExp);
        var dSplit = dExp.split("=");
        if (dSplit.length > 1) {
            var dReturn = ""
            for (var cI=0;cI<dSplit.length-1;cI++) {dReturn = dReturn+parseCalculus(dSplit[cI])+"="}
            return dReturn+parseCalculus(dSplit[dSplit.length-1])
        }
        iIterations = 0;
        sIterations = 0;
        pIterations = 0;
        xIterations = 0;
        const calcOpsIn  = ["idr(","tdr(","lim(","sum(","prd("];
        const calcOpsOut = ["drv(","tdv(","lmt(","smm(","pmm("];
        var dV = "",invTemp = [],nC = 0;
        var sCount = dExp.split("Cv[8748]").length-1; //differential
        for (nC=0;nC<sCount;nC++) {
            dExp = dExp.replace(/Cv\[8748\]Cv\[(\d+)\]\/Cv\[8748\]Cv\[(\d+)\]/,"sdr(Cv[$1],Cv[$2])")
            dExp = dExp.replace(/Cv\[8748\]Cv\[(\d+)\]/,"dif(Cv[$1])")
        }
        if (strTest(dExp,"Cv[8748]")) {dExp = cError("Illegal differential")}
        else {
            sCount = dExp.split("Cv[8747]").length-1; //indefinite integral
            iConstant = 11100;
            for (nC=0;nC<sCount;nC++) {
                if (!strTest(dExp,"dif(")) {
                    invTemp = cInventory(dExp);
                    if (invTemp.length == 1) {dExp = dExp + "dif(" + invTemp[0] +")"}
                    else {dExp = cError("Missing dx");break}
                }
                dExp = dExp.replace(/Cv\[8747\]/,"tmp(");
                var lPar = 1,rPar = 0;
                for (var iXs=dExp.indexOf("tmp(")+4;iXs<dExp.length;iXs++) {
                    if (dExp.substr(iXs,4) == "ntg(") {lPar++}
                    if (dExp.substr(iXs,4) == "dif(") {rPar++}
                    if (lPar == rPar) {break;}
                }
                dExp = dExp.substr(0,iXs)+"Cv[9999]"+dExp.substr(iXs+4,dExp.length);
                dExp = dExp.replace(/Cv\[9999\]Cv\[(\d+)\]\)/,",Cv[$1])+Cv["+iConstant+"]");
                dExp = dExp.replace(/tmp/,"ntg").replace(/ntg\(,/,"ntg(1,");
                iConstant++;
            }
            sCount = dExp.split("itg(").length-1; //definite integral
            for (nC=0;nC<sCount;nC++) {
                if (!strTest(dExp,"dif(")) {
                    invTemp = cInventory(dExp);
                    if (invTemp.length == 1) {dExp = dExp + "dif(" + invTemp[0] +")"}
                    else {dExp = cError("Missing dx");break}
                }
                dV = mgTrans.parseParens(dExp,dExp.indexOf("itg(")+3)
                if (strTest(dExp,"(,") || strTest(dExp,",)")) {dExp = cError("Missing integral limit(s)");break}
                dExp = dExp.substr(0,dExp.indexOf("itg("))+"ntg("+dExp.substr(dV.end+1,dExp.length);
                dExp = dExp.replace(/dif\(Cv\[(\d+)\]\)/,",Cv[$1],"+dV.inside+")");
            }
            sCount = dExp.split("(").length-1; //derivatives,limits,summation
            for (nC=0;nC<sCount;nC++) {
                var rIndex = -1,rFunc = -1;
                for (var cOp in calcOpsIn) {if (dExp.lastIndexOf(calcOpsIn[cOp]) > rIndex) {rFunc = cOp;rIndex = dExp.lastIndexOf(calcOpsIn[cOp])}}
                if (rFunc == -1) {break}
                dExp = dExp.substr(0,rIndex)+"tmp("+dExp.substr(rIndex+4);
                var lIndex = dExp.substr(dExp.lastIndexOf("tmp("),dExp.length);
                dV = mgTrans.parseParens(lIndex,lIndex.indexOf("tmp(")+3).inside;
                dExp = dExp.replace(lIndex,"tmp("+lIndex.replace("tmp("+dV+")",""));
                var strg = mgTrans.parseParens(dExp,dExp.lastIndexOf("tmp(")+3);
                if (strg.inside.charAt(strg.inside.length-1) == "," || !strg.inside) {dExp = cError("Missing operand(s)");break}
                dExp = dExp.substr(0,dExp.lastIndexOf("tmp("))+calcOpsOut[rFunc]+strg.inside+","+dV+")"+dExp.substr(strg.end,dExp.length);
                if (strTest(dExp,"smm(") || strTest(dExp,"pmm(")) {dExp = dExp.replace("Cv[61]",",")}
            }
        }
        return dExp
    }
    //Derivatives
    const drvFunc = {
    cPowD: function(xU,xL,deeVar) {
        if (strTest(xU,deeVar) && strTest(xL,deeVar)) {return cMulS(cAddS(cMulS(lneS(deeVar),drvS(xL,deeVar)),cDivS(xL,deeVar)),cPowS(xU,xL))}
        if (strTest(xU,deeVar)) {return cMulS(cMulS(xL,(cPowS(xU,cSubS(xL,1)))),drvS(xU,deeVar))}
        return cMulS(cMulS(cPowS(xU,xL),lneS(xU)),drvS(xL,deeVar))
    },
    cMulD: function(xU,xL,deeVar) {
        if (strTest(xU,deeVar) && strTest(xL,deeVar)) {return cAddS(cMulS(drvS(xU,deeVar),xL),cMulS(drvS(xL,deeVar),xU))}
        if (strTest(xU,deeVar)) {return cMulS(drvS(xU,deeVar),xL)}
        return cMulS(drvS(xL,deeVar),xU)
    },
    cDivD: function(xU,xL,deeVar) {
        if (strTest(xU,deeVar) && strTest(xL,deeVar)) {return cDivS(cSubS(cMulS(drvS(xU,deeVar),xL),cMulS(drvS(xL,deeVar),xU)),cPowS(xL,2))}
        if (strTest(xU,deeVar)) {return drvFunc["cMulD"](xU,cDivS(1,xL),deeVar)}
        return cMulS(xU,drvFunc["cPowD"](xL,-1,deeVar))
    },
    cAddD: function(xU,xL,deeVar) {
        if (strTest(xU,deeVar) && strTest(xL,deeVar)) {return cAddS(drvS(xU,deeVar),drvS(xL,deeVar))}
        if (strTest(xU,deeVar)) {return drvS(xU,deeVar)}
        return drvS(xL,deeVar)
    },
    cSubD: function(xU,xL,deeVar) {
        if (strTest(xU,deeVar) && strTest(xL,deeVar)) {return cSubS(drvS(xU,deeVar),drvS(xL,deeVar))}
        if (strTest(xU,deeVar)) {return drvS(xU,deeVar)}
        return cNegS(drvS(xL,deeVar))
    },
    cNegD: function(xU,xL,deeVar) {return cNegS(drvS(xU,deeVar)) },
    lneD: function(xU,xL,deeVar) {return cMulS(cDivS(1,xU),drvS(xU,deeVar)) },
    cbtD: function(xU,xL,deeVar) {return cMulS(cDivS(1,cMulS(3,cPowS(xU,cDivS(2,3)))),drvS(xU,deeVar)) },
    sqtD: function(xU,xL,deeVar) {return cMulS(cDivS(1,cMulS(2,sqtS(xU))),drvS(xU,deeVar)) },
    sinD: function(xU,xL,deeVar) {return cMulS(cosS(xU),drvS(xU,deeVar)) },
    cosD: function(xU,xL,deeVar) {return cMulS(cNegS(sinS(xU)),drvS(xU,deeVar)) },
    tanD: function(xU,xL,deeVar) {return cMulS(cPowS(secS(xU),2),drvS(xU,deeVar)) },
    cscD: function(xU,xL,deeVar) {return cMulS(cNegS(cMulS(cscS(xU),cotS(xU))),drvS(xU,deeVar)) },
    secD: function(xU,xL,deeVar) {return cMulS(cMulS(secS(xU),tanS(xU)),drvS(xU,deeVar)) },
    cotD: function(xU,xL,deeVar) {return cMulS(cNegS(cPowS(cscS(xU),2)),drvS(xU,deeVar)) },
    asnD: function(xU,xL,deeVar) {return cMulS(cDivS(1,sqtS(cSubS(1,cPowS(xU,2)))),drvS(xU,deeVar)) },
    acsD: function(xU,xL,deeVar) {return cMulS(cNegS(cDivS(1,sqtS(cSubS(1,cPowS(xU,2))))),drvS(xU,deeVar)) },
    atnD: function(xU,xL,deeVar) {return cMulS(cDivS(1,cAddS(1,cPowS(xU,2))),drvS(xU,deeVar)) },
    actD: function(xU,xL,deeVar) {return cMulS(cNegS(cDivS(1,cAddS(1,cPowS(xU,2)))),drvS(xU,deeVar)) },
    ascD: function(xU,xL,deeVar) {
        if (mgConfig.Domain == "Real") {return cDivS(1,cMulS(absS(xU),sqtS(cSubS(cPowS(xU,2),1))))}
        return cMulS(cDivS(1,cMulS(cPowS(xU,2),sqtS(cSubS(1,cPowS(xU,"-2"))))),drvS(xU,deeVar))
    },
    accD: function(xU,xL,deeVar) {
        if (mgConfig.Domain == "Real") {return cDivS(-1,cMulS(absS(xU),sqtS(cSubS(cPowS(xU,2),1))))}
        return cMulS(cNegS(cDivS(1,cMulS(cPowS(xU,2),sqtS(cSubS(1,cPowS(xU,"-2")))))),drvS(xU,deeVar))
    },
    snhD: function(xU,xL,deeVar) {return cMulS(cshS(xU),drvS(xU,deeVar))},
    cshD: function(xU,xL,deeVar) {return cMulS(snhS(xU),drvS(xU,deeVar))},
    tnhD: function(xU,xL,deeVar) {return cMulS(cSubS(1,cPowS(tnhS(xU),2)),drvS(xU,deeVar)) },
    schD: function(xU,xL,deeVar) {return cMulS(cNegS(cMulS(tnhS(xU),schS(xU))),drvS(xU,deeVar)) },
    cchD: function(xU,xL,deeVar) {return cMulS(cNegS(cMulS(cthS(xU),cchS(xU))),drvS(xU,deeVar)) },
    cthD: function(xU,xL,deeVar) {return cMulS(cSubS(1,cPowS(cthS(xU),2)),drvS(xU,deeVar)) },
    ashD: function(xU,xL,deeVar) {return cMulS(cDivS(1,sqtS(cAddS(cPowS(xU,2),1))),drvS(xU,deeVar)) },
    achD: function(xU,xL,deeVar) {return cMulS(cDivS(1,sqtS(cSubS(cPowS(xU,2),1))),drvS(xU,deeVar)) },
    athD: function(xU,xL,deeVar) {return cMulS(cDivS(1,cSubS(1,cPowS(xU,2))),drvS(xU,deeVar)) },
    axhD: function(xU,xL,deeVar) {return cMulS(cNegS(cDivS(1,cMulS(xU,sqtS(cSubS(1,cPowS(xU,2)))))),drvS(xU,deeVar)) },
    ayhD: function(xU,xL,deeVar) {return cMulS(cNegS(cDivS(1,cMulS(xU,sqtS(cAddS(1,cPowS(xU,2)))))),drvS(xU,deeVar)) },
    azhD: function(xU,xL,deeVar) {return cMulS(cDivS(1,cSubS(1,cPowS(xU,2))),drvS(xU,deeVar)) },
    erfD: function(xU,xL,deeVar) {return cMulS(cDivS(cMulS(2,cPowS("Cv[8]",cNegS(cPowS(xU,2)))),sqtS("Cv[29]")),drvS(xU,deeVar)) },
    efcD: function(xU,xL,deeVar) {return cMulS(cNegS(cDivS(cMulS(2,cPowS("Cv[8]",cNegS(cPowS(xU,2)))),sqtS("Cv[29]"))),drvS(xU,deeVar)) },
    expD: function(xU,xL,deeVar) {return cMulS(cPowS("Cv[8]",xU),drvS(xU,deeVar)) },
    absD: function(xU,xL,deeVar) {return cMulS("cDiv("+xU+",abs("+xU+"))",drvS(xU,deeVar))},
    ntpD: function(nXpr,deeVar)  {return nXpr},
    }
    function tdvS(dXpr,deeVar,nTh) { //nTh total derivative
        var cInv = cInventory(dXpr);
        var totDeriv = "0";
        if (!nbrTest(nTh)) {nTh = 1}
        if (nTh == 0) {totDeriv = dXpr}
        else if (solverFlag) {totDeriv = tdvS("tdv("+dXpr+")",deeVar,nTh-1)} //return nested derivatives for solver
        else if (cInv.length > 1) {
            for (var nTd in cInv) {totDeriv = cAddS(totDeriv,cMulS(drvS(dXpr,cInv[nTd],nTh),difS(cInv[nTd])))}
        }
        else {totDeriv = drvS(dXpr,deeVar,nTh)}
        return totDeriv
    }
    function drvS(dXpr,deeVar,nTh) { //nTh partial derivative
        function drvExecute(xIn) {
            var args = opExtract(xIn);
            if (typeof drvFunc[args.func+"D"] != "undefined") {return drvFunc[args.func+"D"](args.upper,args.lower,deeVar)}
            else {return passthruFunc[args.func](args.upper,args.lower)}
        }
        //
        if (!nbrTest(nTh)) {nTh = 1}
        if (varTest(deeVar)) {deeVarP = deeVar}
        var sReturn = "";
        if (!solverFlag) {dXpr = cReduce(dXpr)}
        if (nTh == 0) {sReturn = dXpr}
        else if (solverFlag) {sReturn = drvS("drv("+dXpr+")",deeVar,nTh-1)} //return nested derivatives for solver
        else if (dXpr == deeVar) {sReturn = 1} //identity
        else if (!strTest(dXpr,deeVar)) {sReturn = 0} //no derivative variable
        else {sReturn = drvS(cReduce(drvExecute(dXpr)),deeVar,nTh-1)} //recurse derivatives greater than 1st
        return sReturn
    }

    //Integrals
    const ntgFunc = {
    cPowI: function(xU,xL,deeVar) {
        var xTractU = opExtract(xU);
        //special cases
        var aConst = 1;
        if (opExtract(xTractU.upper).func == "cMul") {aConst = xReduce(cDivS(xTractU.upper,deeVar))}
        if (strTest(xU,deeVar) && strTest(xL,deeVar)) {return "undefined"}
        if (deeVar == xU && !strTest(xL,deeVar)) {return cDivS(cPowS(xU,cAddS(xL,1)),cAddS(xL,1))}
        if (deeVar == xL && !strTest(xU,deeVar)) {return cDivS(cPowS(xU,xL),lndS(xU))}
        if (xU == "Cv[8]" && strTest(xL,deeVar) && mgConfig.Domain == "Complex") {
            var bTemp = iReduce(cDivS(xL,cPowS(deeVar,2)));
            if (!strTest(bTemp,deeVar)) {return cMulS(cMulS(cNegS("Cv[46]"),cDivS(sqtS("Cv[29]"),cMulS(2,sqtS(bTemp)))),erfS(cMulS("Cv[46]",cMulS(deeVar,bTemp))))}
        }
        if (xL == 2 && xReduce(cDivS(xTractU.upper,aConst)) == deeVar) {
            if (xTractU.func == "sin") {return cSubS(cDivS(deeVar,2),cDivS(sinS(cMulS(2,cMulS(aConst,deeVar))),cMulS(4,aConst)))}
            if (xTractU.func == "cos") {return cAddS(cDivS(deeVar,2),cDivS(sinS(cMulS(2,cMulS(aConst,deeVar))),cMulS(4,aConst)))}
            if (xTractU.func == "tan") {return cSubS(cMulS(cDivS(1,aConst),tanS(cMulS(aConst,deeVar))),deeVar)}
            if (xTractU.func == "cot") {return cNegS(cDivS(cAddS(cMulS(aConst,deeVar),cotS(cMulS(aConst,deeVar))),aConst))}
            if (xTractU.func == "sec") {return cMulS(cDivS(1,aConst),tanS(cMulS(aConst,deeVar)))}
            if (xTractU.func == "csc") {return cNegS(cMulS(cDivS(1,aConst),cotS(cMulS(aConst,deeVar))))}
            if (xTractU.func == "snh") {return cDivS(cSubS(snhS(cMulS(2,cMulS(aConst,deeVar))),cMulS(2,cMulS(aConst,deeVar))),cMulS(aConst,4))}
            if (xTractU.func == "csh") {return cDivS(cAddS(snhS(cMulS(2,cMulS(aConst,deeVar))),cMulS(2,cMulS(aConst,deeVar))),cMulS(aConst,4))}
            if (xTractU.func == "tnh") {return cSubS(deeVar,cDivS(tnhS(cMulS(aConst,deeVar)),aConst))}
            if (xTractU.func == "sch") {return cDivS(tnhS(cMulS(aConst,deeVar)),aConst)}
            if (xTractU.func == "cch") {return cNegS(cDivS(cthS(cMulS(aConst,deeVar)),aConst))}
            if (xTractU.func == "cth") {return cSubS(deeVar,cDivS(cthS(cMulS(aConst,deeVar)),aConst))}
            if (xTractU.func == "lne") {return cMulS(deeVar,cAddS(cSubS(cPowS(lneS(cMulS(aConst,deeVar)),2),cMulS(2,lneS(cMulS(aConst,deeVar)))),2))}
        }
        if (xL == 3 && xReduce(cDivS(xTractU.upper,aConst)) == deeVar) {
            if (xTractU.func == "sin") {return cSubS(cDivS(cosS(cMulS(3,cMulS(aConst,deeVar))),cMulS(12,aConst)),cDivS(cMulS(3,cosS(cMulS(aConst,deeVar))),cMulS(4,aConst)))}
            if (xTractU.func == "cos") {return cAddS(cDivS(sinS(cMulS(3,cMulS(aConst,deeVar))),cMulS(12,aConst)),cDivS(cMulS(3,sinS(cMulS(aConst,deeVar))),cMulS(4,aConst)))}
            if (xTractU.func == "tan") {return cAddS(cDivS(lndS(cosS(cMulS(aConst,deeVar))),aConst),cDivS(cPowS(secS(cMulS(aConst,deeVar)),2),cMulS(2,aConst)))}
            if (xTractU.func == "lne") {return cMulS(deeVar,cSubS(cAddS(cSubS(cPowS(lneS(cMulS(aConst,deeVar)),3),cMulS(3,cPowS(lneS(cMulS(aConst,deeVar)),2))),cMulS(6,lneS(cMulS(aConst,deeVar)))),6))}
        }
        //general cases
        var iTemp = "";
        if (strTest(xU,deeVar) && !strTest(xL,deeVar)) {
            iTemp = xReduce(cDivS(drvS(cDivS(cPowS(xU,cAddS(xL,1)),cAddS(xL,1)),deeVar),cPowS(xU,xL)));
            if (!strTest(iTemp,deeVar)) {return cDivS(cPowS(xU,cAddS(xL,1)),cMulS(cAddS(xL,1),iTemp))}
        }
        if (!strTest(xU,deeVar) && strTest(xL,deeVar)) {
            iTemp = xReduce(cDivS("cPow("+xU+","+xL+")",drvS("cPow("+xU+","+xL+")",deeVar)));
            if (!strTest(iTemp,deeVar)) {return cMulS(iTemp,"cPow("+xU+","+xL+")")}
        }
        return "undefined"
    },
    cMulI: function(xU,xL,deeVar) {
        var xTractU = opExtract(xU);
        var xTractL = opExtract(xL);
        //general cases
        if (strTest(xU,deeVar) && !strTest(xL,deeVar)) {return cMulS(xL,ntgS(xU,deeVar))}
        if (strTest(xL,deeVar) && !strTest(xU,deeVar)) {return cMulS(xU,ntgS(xL,deeVar))}
        if (xTractL.func == "cMul" && !strTest(xTractL.upper,deeVar)) {return cMulS(xTractL.upper,ntgS(cMulS(xTractL.lower,xU),deeVar))}
        if (xTractL.func == "cMul" && !strTest(xTractL.lower,deeVar)) {return cMulS(xTractL.lower,ntgS(cMulS(xTractL.upper,xU),deeVar))}
        //special cases
        if (xTractL.func == "lne" && strTest(xU,deeVar) && strTest(xL,deeVar)) {
            var iTemp = cSubS(cDivS(cMulS(cPowS(xU,2),lneS(xTractL.upper)),2),cDivS(cPowS(xU,2),4));
            if (xReduce(cMulS(xU,xL)) == drvS(iTemp,deeVar)) {return iTemp}
        }
        if (strTest(xL,deeVar) && strTest(xU,deeVar)) {
            var matchU = xReduce(cDivS(xTractU.upper,deeVar));
            var matchL = xReduce(cDivS(xTractL.upper,deeVar));
            if (!strTest(matchU,deeVar) && !strTest(matchL,deeVar)) {
                if (xTractU.func == "cos" && xTractL.func == "sin") {
                    if (cPowS(matchU,2) == cPowS(matchL,2)) {return cNegS(cDivS(cPowS(cosS(cMulS(matchU,deeVar)),2),cMulS(matchU,2)))}
                    return cNegS(cDivS(cAddS(cMulS(matchU,cMulS(sinS(xTractU.upper),sinS(xTractL.upper))),cMulS(matchL,cMulS(cosS(xTractU.upper),cosS(xTractL.upper)))),cSubS(cPowS(matchL,2),cPowS(matchU,2))))
                }
                if (xTractU.func == "sin" && xTractL.func == "sin") {
                   return cDivS(cSubS(cMulS(matchL,cMulS(sinS(xTractU.upper),cosS(xTractL.upper))),cMulS(matchU,cMulS(cosS(xTractU.upper),sinS(xTractL.upper)))),cSubS(cPowS(matchU,2),cPowS(matchL,2)))
                }
                if (xTractU.func == "cos" && xTractL.func == "cos") {
                   return cDivS(cSubS(cMulS(matchU,cMulS(sinS(xTractU.upper),cosS(xTractL.upper))),cMulS(matchL,cMulS(cosS(xTractU.upper),sinS(xTractL.upper)))),cSubS(cPowS(matchU,2),cPowS(matchL,2)))
                }
            }
            if (xTractU.upper == xTractL.upper) {
                if (xTractU.func == "sec" && xTractL.func == "tan") {return ntgFunc.iSearch(cMulS(xU,xL),"sec",deeVar)}
                if (xTractU.func == "cot" && xTractL.func == "csc") {return ntgFunc.iSearch(cMulS(xU,xL),"csc",deeVar)}
                if (xTractU.func == "sch" && xTractL.func == "tnh") {return ntgFunc.iSearch(cMulS(xU,xL),"sch",deeVar)}
                if (xTractU.func == "cch" && xTractL.func == "cth") {return ntgFunc.iSearch(cMulS(xU,xL),"cch",deeVar)}
            }
            if (strTest(xTractU.lower,deeVar) && strTest(xTractL.upper,deeVar)) {
                var matchP = xReduce(cDivS(xTractU.lower,deeVar));
                if (xTractU.func == "cPow" && xTractL.func == "cos" && xTractU.upper == "Cv[8]" && !strTest(matchP,deeVar) && !strTest(matchL,deeVar)) {
                    return cDivS(cMulS(cPowS("Cv[8]",cMulS(matchP,deeVar)),cAddS(cMulS(matchL,sinS(cMulS(matchL,deeVar))),cMulS(matchP,cosS(cMulS(matchL,deeVar))))),cAddS(cPowS(matchL,2),cPowS(matchP,2)))
                }
                if (xTractU.func == "cPow" && xTractL.func == "sin" && xTractU.upper == "Cv[8]" && !strTest(matchP,deeVar) && !strTest(matchL,deeVar)) {
                    return cDivS(cMulS(cPowS("Cv[8]",cMulS(matchP,deeVar)),cSubS(cMulS(matchP,sinS(cMulS(matchL,deeVar))),cMulS(matchL,cosS(cMulS(matchL,deeVar))))),cAddS(cPowS(matchL,2),cPowS(matchP,2)))
                }
            }
            var sTemp = ntgFunc.xSubst(xU,xL,deeVar);
            if (ntgFunc.ntgTest(sTemp)) {return sTemp}
            sTemp = ntgFunc.iParts(xU,xL,deeVar);
            if (ntgFunc.ntgTest(sTemp)) {return sTemp}
        }
        return "undefined"
    },
    cDivI: function(xU,xL,deeVar) {
        var xTractU = opExtract(xU);
        var xTractL = opExtract(xL);
        var sqTemp = "";
        //special cases
        var xTest = xprMatch(cDivS(xU,xL),cDivS(1,cSubS("Cv[9999]",sqtS(deeVar))));
        if (xTest && !strTest(xTest,deeVar)) {return cSubS(cNegS(cMulS(2,sqtS(deeVar))),cMulS(cMulS(2,xTest),lndS(cSubS(sqtS(deeVar),xTest))))}
        xTest = xprMatch(cDivS(xU,xL),cDivS(1,cAddS(sqtS(deeVar),"Cv[9999]")));
        if (xTest && !strTest(xTest,deeVar)) {return cSubS(cMulS(2,sqtS(deeVar)),cMulS(cMulS(2,xTest),lndS(cAddS(sqtS(deeVar),xTest))))}
        xTest = xprMatch(cDivS(xU,xL),cDivS(1,cSubS(sqtS(deeVar),"Cv[9999]")));
        if (xTest && !strTest(xTest,deeVar)) {return cAddS(cMulS(2,sqtS(deeVar)),cMulS(cMulS(2,xTest),lndS(cSubS(sqtS(deeVar),xTest))))}
        if (cDivS(xU,xL) == cDivS(1,cMulS(cosS(deeVar),sinS(deeVar)))) {return lndS(tanS(deeVar))}
        if (strTest(xL,"sqt") && strTest(xL,deeVar) && strTest(xU,deeVar)) {
            var uTemp = xReduce(cDivS(xU,cMulS(xL,drvS(xL,deeVar))));
            if (drvS(cMulS(uTemp,xL),deeVar) == cDivS(xU,xL)) {return cMulS(uTemp,xL)}
        }
        if (xTractU.func == "sqt" && xTractL.func == "sqt" && xTractU.upper == deeVar) {
            sqTemp = xprMatch(xTractL.upper, "cAdd(Cv[9999],"+deeVar+")");
            if (sqTemp && !strTest(sqTemp,deeVar)) {return cSubS(sqtS(cMulS(deeVar,cAddS(sqTemp,deeVar))),cMulS(sqTemp,lndS(sqtS(cMulS(deeVar,cAddS(sqTemp,deeVar))))))}
            sqTemp = xprMatch(xTractL.upper,"cAdd("+deeVar+",Cv[9999])");
            if (sqTemp && !strTest(sqTemp,deeVar)) {return cSubS(sqtS(cMulS(deeVar,cAddS(sqTemp,deeVar))),cMulS(sqTemp,lndS(sqtS(cMulS(deeVar,cAddS(sqTemp,deeVar))))))}
            sqTemp = xprMatch(xTractL.upper,"cSub("+deeVar+",Cv[9999])");
            if (sqTemp && !strTest(sqTemp,deeVar)) {return cSubS(sqtS(cMulS(deeVar,cAddS(cNegS(sqTemp),deeVar))),cMulS(cNegS(sqTemp),lndS(sqtS(cMulS(deeVar,cAddS(cNegS(sqTemp),deeVar))))))}
            sqTemp = xprMatch(xTractL.upper,"cSub(Cv[9999],"+deeVar+")");
            if (sqTemp && !strTest(sqTemp,deeVar)) {return cSubS(cNegS(sqtS(cMulS(deeVar,cSubS(sqTemp,deeVar)))),cMulS(sqTemp,atnS(cDivS(sqtS(cMulS(deeVar,cSubS(sqTemp,deeVar))),cSubS(sqTemp,deeVar)))))}
        }
        if (strTest(xL,deeVar) && !strTest(xU,deeVar)) {
            sqTemp = xprMatch(xTractL.upper, "cAdd(Cv[9999],"+deeVar+")");
            if (xU != 1) {return cMulS(xU,ntgS(cDivS(1,xL),deeVar))}
            var aTemp = cMulS(xU,lndS(xL));
            var tTest = cDivS(drvS(aTemp,deeVar),cDivS(xU,xL));
            if (!strTest(tTest,deeVar) && ntgFunc.ntgTest(tTest)) {return cDivS(aTemp,tTest)}
            aTemp = xprMatch(xL, "cMul(Cv[9999],"+deeVar+")");
            if (aTemp && !strTest(aTemp,deeVar)) {return cDivS(lndS(deeVar),aTemp)}
            aTemp = xprMatch(xL, "cMul("+deeVar+",Cv[9999])");
            if (aTemp && !strTest(aTemp,deeVar)) {return cDivS(lndS(deeVar),aTemp)}
            aTemp = xprMatch(xL,"cSub(Cv[9999],cPow("+deeVar+",2))");
            if (aTemp && !strTest(sqTemp,deeVar)) {return cDivS(athS(cDivS(deeVar,sqtS(aTemp))),sqtS(aTemp))}
            aTemp = xprMatch(xL,"cAdd(Cv[9999],cPow("+deeVar+",2))");
            if (aTemp && !strTest(sqTemp,deeVar)) {return cDivS(atnS(cDivS(deeVar,sqtS(aTemp))),sqtS(aTemp))}
            aTemp = xprMatch(xL,"cAdd(cPow("+deeVar+",2),Cv[9999])");
            if (aTemp && !strTest(sqTemp,deeVar)) {return cDivS(atnS(cDivS(deeVar,sqtS(aTemp))),sqtS(aTemp))}
            if (xL == "cPow(Cv[8],cPow("+deeVar+",2))" ) {return cDivS(cMulS(erfS(deeVar),sqtS("Cv[29]")),2)}
            if (xL == "cSub(cPow("+deeVar+",2),1)") {return cNegS(athS(deeVar))}
            if (xTractL.func == "cos") {return cMulS(ntgS(secS(xTractL.upper),deeVar),xU)}
            if (xTractL.func == "sin") {return cMulS(ntgS(cscS(xTractL.upper),deeVar),xU)}
            if (xTractL.func == "csh") {return cMulS(ntgS(schS(xTractL.upper),deeVar),xU)}
            if (xTractL.func == "snh") {return cMulS(ntgS(cchS(xTractL.upper),deeVar),xU)}
            if (xTractL.func == "cPow") {iIterations++;return cMulS(xU,ntgFunc["cPowI"](xTractL.upper,cNegS(xTractL.lower),deeVar))}
            if (xTractL.func == "cMul" && !strTest(xL,"sqt")) {iIterations++;return cMulS(xU,ntgFunc["cMulI"]("cDiv(1,"+xTractL.lower+")","cDiv(1,"+xTractL.upper+")",deeVar))}
            if (xTractL.func == "sqt") {
                if (xprMatch(xTractL.upper, "cSub(1,cPow(Cv[9999],2))") == deeVar) {return asnS(deeVar)}
                if (xprMatch(xTractL.upper, "cAdd(cPow(Cv[9999],2),1)") == deeVar) {return ashS(deeVar)}
                if (xprMatch(xTractL.upper, "cSub(cPow(Cv[9999],2),1)") == deeVar) {return achS(deeVar)}
                sqTemp = xprMatch(xTractL.upper, "cSub(Cv[9999],cPow("+deeVar+",2))");
                if (sqTemp && !strTest(sqTemp,deeVar)) {return atnS(cDivS(deeVar,xL))}
                iIterations++;
                sqTemp = cMulS(xU,ntgFunc["cPowI"](xTractL.upper,"cDiv(-1,2)",deeVar));
                if (ntgFunc.ntgTest(sqTemp)) {return sqTemp}
            }
            if (strTest(xL,"sqt")) {
                var iTemp = ntgFunc.iSearch("cDiv("+xU+","+xL+")","erf",deeVar);
                if (ntgFunc.ntgTest(iTemp)) {return iTemp}
                iTemp = ntgFunc.iSearch("cDiv("+xU+","+xL+")","axh",deeVar);
                if (ntgFunc.ntgTest(iTemp)) {return iTemp}
                iTemp = ntgFunc.iSearch("cDiv("+xU+","+xL+")","ayh",deeVar);
                if (ntgFunc.ntgTest(iTemp)) {return iTemp}
                iTemp = ntgFunc.iSearch("cDiv("+xU+","+xL+")","ash",deeVar);
                if (ntgFunc.ntgTest(iTemp)) {return iTemp}
                iTemp = ntgFunc.iSearch("cDiv("+xU+","+xL+")","asc",deeVar);
                if (ntgFunc.ntgTest(iTemp)) {return iTemp}
            }
        }
        //general cases
        var pTemp = "", fTemp = "";
        if (deeVar == xU && !strTest(xL,deeVar)) {return cDivS(cPowS(xU,2),cMulS(xL,2))}
        if (strTest(xU,deeVar) && !strTest(xL,deeVar)) {return cMulS(cDivS(1,xL),ntgS(xU,deeVar))}
        if (strTest(xL,deeVar) && pNomial(xL).length > 2 && iIterations < 2) { //integration by partial fractions
            fTemp = xprFactor("cDiv("+xU+","+xL+")");
            if (!strTest(xU,deeVar) || (!strTest(fTemp,xU) && !strTest(fTemp,xL))) {
                pTemp = ntgS(fTemp,deeVar);
                if (ntgFunc.ntgTest(pTemp)) {return pTemp}
            }
        }
        if (strTest(xL,deeVar) && strTest(xU,deeVar)) {
            pTemp = ntgFunc.xSubst(xU,cPowS(xL,-1),deeVar);
            if (ntgFunc.ntgTest(pTemp)) {return pTemp}
            pTemp = ntgFunc.iParts(xU,cPowS(xL,-1),deeVar);
            if (ntgFunc.ntgTest(pTemp)) {return pTemp}
        }
        return "undefined"
    },
    cAddI: function(xU,xL,deeVar) {return cAddS(ntgS(xU,deeVar),ntgS(xL,deeVar))},
    cSubI: function(xU,xL,deeVar) {return cSubS(ntgS(xU,deeVar),ntgS(xL,deeVar))},
    cNegI: function(xU,xL,deeVar)    {return cNegS(ntgS(xU,deeVar))},
    lneI:  function(xU,xL,deeVar) {//natural log
        var xTractU = opExtract(xU);
        if (deeVar == xU) {return cSubS(cMulS(xU,lneS(xU)),xU)}
        if (xprMatch(xU,"cAdd(cPow(Cv[9999],2),1)")) {
            var mTemp = xprMatch(xU,"cAdd(cPow(Cv[9999],2),1)");
            return cAddS(cMulS(mTemp,cSubS(lneS(xU),2)),cMulS(2,atnS(mTemp)))
        }
        if (xTractU.func == "cMul") {return cAddS(ntgS(lneS(xTractU.upper),deeVar),ntgS(lneS(xTractU.lower),deeVar))}
        if (xTractU.func == "cDiv") {return cSubS(ntgS(lneS(xTractU.upper),deeVar),ntgS(lneS(xTractU.lower),deeVar))}
        return ntgFunc.uSubst(lneS(xU),deeVar)
    },
    sqtI: function(xU,xL,deeVar) {//square root
        if (deeVar == xU) {return cDivS(cMulS(2,cPowS(xU,cDivS(3,2))),3)}
        var uTemp = xprMatch(xU,"cAdd(cPow("+deeVar+",2),Cv[9999])");
        if (uTemp && !strTest(uTemp,deeVar)) {return cDivS(cAddS(cMulS(deeVar,sqtS(cAddS(cPowS(deeVar,2),uTemp))),cMulS(uTemp,lndS(cAddS(uTemp,sqtS(cAddS(cPowS(deeVar,2),uTemp)))))),2)}
        uTemp = xprMatch(xU,"cSub(cPow("+deeVar+",2),Cv[9999])");
        if (uTemp && !strTest(uTemp,deeVar)) {return cDivS(cAddS(cMulS(deeVar,sqtS(cSubS(cPowS(deeVar,2),uTemp))),cMulS(uTemp,lndS(cAddS(uTemp,sqtS(cSubS(cPowS(deeVar,2),uTemp)))))),2)}
        uTemp = ntgS(cPowS(xU,"cDiv(1,2)"),deeVar);
        if (ntgFunc.ntgTest(uTemp)) {return uTemp}
        iIterations = 10;
        return ntgFunc.uSubst(sqtS(xU),deeVar)
    },
    cbtI: function(xU,xL,deeVar) {//cube root
        if (deeVar == xU) {return cDivS(cMulS(3,cPowS(xU,cDivS(4,3))),4)}
        var uTemp = ntgS(cPowS(xU,"cDiv(1,3)"),deeVar);
        if (ntgFunc.ntgTest(uTemp)) {return uTemp}
        iIterations = 10;
        return ntgFunc.uSubst(cbtS(xU),deeVar)
    },
    //trig
    sinI: function(xU,xL,deeVar) {//sin
        var xTractU = opExtract(xU);
        if (deeVar == xU) {return cNegS(cosS(xU))}
        if (xTractU.func == "lne" && xTractU.upper == deeVar) {return cNegS(cDivS(cMulS(deeVar,cSubS(cosS(lneS(deeVar)),sinS(lneS(deeVar)))),2))}
        return ntgFunc.uSubst(sinS(xU),deeVar)
    },
    cosI: function(xU,xL,deeVar) {//cos
        var xTractU = opExtract(xU);
        if (deeVar == xU) {return sinS(xU)}
        if (xTractU.func == "lne" && xTractU.upper == deeVar) {return cDivS(cMulS(deeVar,cAddS(cosS(lneS(deeVar)),sinS(lneS(deeVar)))),2)}
        return ntgFunc.uSubst(cosS(xU),deeVar)
    },
    tanI: function(xU,xL,deeVar) {//tan
        if (deeVar == xU) {return cNegS(lndS(cosS(xU)))}
        return ntgFunc.uSubst(tanS(xU),deeVar)
    },
    cscI: function(xU,xL,deeVar) {//cosec
        if (deeVar == xU) {return cSubS(lndS(sinS(cDivS(xU,2))),lndS(cosS(cDivS(xU,2))))}
        return ntgFunc.uSubst(cscS(xU),deeVar)
    },
    secI: function(xU,xL,deeVar) {//sec
        if (deeVar == xU) {return lndS(cAddS(secS(xU),tanS(xU)))}
        return ntgFunc.uSubst(secS(xU),deeVar)
    },
    cotI: function(xU,xL,deeVar) {//cot
        if (deeVar == xU) {return lndS(sinS(xU))}
        return ntgFunc.uSubst(cotS(xU),deeVar)
    },
    //hyperbolic
    snhI: function(xU,xL,deeVar) {//sinh
        var xTractU = opExtract(xU);
        if (deeVar == xU) {return cshS(xU)}
        if (xTractU.func == "lne" && xTractU.upper == deeVar) {return cDivS(cSubS(cPowS(deeVar,2),cMulS(2,lneS(deeVar))),4)}
        return ntgFunc.uSubst(snhS(xU),deeVar)
    },
    cshI: function(xU,xL,deeVar) {//cosh
        var xTractU = opExtract(xU);
        if (deeVar == xU) {return snhS(xU)}
        if (xTractU.func == "lne" && xTractU.upper == deeVar) {return cDivS(cAddS(cPowS(deeVar,2),cMulS(2,lneS(deeVar))),4)}
        return ntgFunc.uSubst(cshS(xU),deeVar)
    },
    tnhI: function(xU,xL,deeVar) {//tanh
        var xTractU = opExtract(xU);
        if (deeVar == xU) {return lneS(cshS(xU))}
        if (xTractU.func == "lne" && xTractU.upper == deeVar) {return cSubS(deeVar,cMulS(2,atnS(deeVar)))}
        return ntgFunc.uSubst(tnhS(xU),deeVar)
    },
    schI: function(xU,xL,deeVar) {//sech
        if (deeVar == xU) {return cMulS(2,atnS(snhS(cDivS(xU,2))))}
        return ntgFunc.uSubst(schS(xU),deeVar)
    },
    cchI: function(xU,xL,deeVar) {//csch
        if (deeVar == xU) {return lndS(tnhS(cDivS(xU,2)))}
        return ntgFunc.uSubst(cchS(xU),deeVar)
    },
    cthI: function(xU,xL,deeVar) {//coth
        if (deeVar == xU) {return lndS(snhS(xU))}
        return ntgFunc.uSubst(cthS(xU),deeVar)
    },
    //inverse trig
    asnI: function(xU,xL,deeVar) {//asin
        if (deeVar == xU) {return cAddS(cMulS(xU,asnS(xU)),sqtS(cSubS(1,cPowS(xU,2))))}
        return ntgFunc.uSubst(asnS(xU),deeVar)
    },
    acsI: function(xU,xL,deeVar) {//acos
        if (deeVar == xU) {return cSubS(cMulS(xU,acsS(xU)),sqtS(cSubS(1,cPowS(xU,2))))}
        return ntgFunc.uSubst(acsS(xU),deeVar)
    },
    atnI: function(xU,xL,deeVar) {//atan
        if (deeVar == xU) {return cSubS(cMulS(xU,atnS(xU)),cDivS(lneS(cAddS(1,cPowS(xU,2))),2))}
        return ntgFunc.uSubst(atnS(xU),deeVar)
    },
    actI: function(xU,xL,deeVar) {//acotan
        if (deeVar == xU) {return cAddS(cMulS(xU,atnS(xU)),cDivS(lneS(cAddS(1,cPowS(xU,2))),2))}
        return ntgFunc.uSubst(actS(xU),deeVar)
    },
    ascI: function(xU,xL,deeVar) {//asec
        if (deeVar == xU) {return cSubS(cMulS(xU,ascS(xU)),atnS(sqtS(cSubS(1,cDivS(1,cPowS(xU,2))))))}
        return ntgFunc.uSubst(ascS(xU),deeVar)
    },
    accI: function(xU,xL,deeVar) {//acosec
        if (deeVar == xU) {return cSubS(cMulS(xU,acsS(xU)),sqtS(cSubS(1,cPowS(xU,2))))}
        return ntgFunc.uSubst(accS(xU),deeVar)
    },
    //inverse hyperbolic
    ashI: function(xU,xL,deeVar) {//asinh
        if (deeVar == xU) {return cSubS(cMulS(xU,ashS(xU)),sqtS(cAddS(1,cPowS(xU,2))))}
        return ntgFunc.uSubst(ashS(xU),deeVar)
    },
    achI: function(xU,xL,deeVar) {//acosh
        if (deeVar == xU) {return cSubS(cMulS(xU,achS(xU)),sqtS(cSubS(cPowS(xU,2),1)))}
        return ntgFunc.uSubst(achS(xU),deeVar)
    },
    athI: function(xU,xL,deeVar) {//atanh
        if (deeVar == xU) {return cAddS(cMulS(xU,athS(xU)),cDivS(lneS(cSubS(cPowS(xU,2),1)),2))}
        return ntgFunc.uSubst(athS(xU),deeVar)
    },
    axhI: function(xU,xL,deeVar) {//asech
        if (deeVar == xU) {return cSubS(cMulS(xU,axhS(xU)),atnS(cMulS(cDivS(xU,cSubS(xU,1)),sqtS(cDivS(cSubS(1,xU),cAddS(1,xU))))))}
        return ntgFunc.uSubst(axhS(xU),deeVar)
    },
    ayhI: function(xU,xL,deeVar) {//acsch
        if (deeVar == xU) {return cMulS(xU,cAddS(cDivS(cMulS(sqtS(cAddS(cDivS(1,cPowS(xU,2)),1)),ashS(xU)),sqtS(cAddS(cPowS(xU,2),1))),ayhS(xU)))}
        return ntgFunc.uSubst(ayhS(xU),deeVar)
    },
    azhI: function(xU,xL,deeVar) {//acoth
        if (deeVar == xU) {return cAddS(cDivS(lneS(cSubS(1,cPowS(xU,2))),2),cMulS(xU,azhS(xU)))}
        return ntgFunc.uSubst(azhS(xU),deeVar)
    },
    expI: function(xU,xL,deeVar) {//exp
        if (deeVar == xU) {return expS(xU)}
        return ntgFunc.uSubst(expS(xU),deeVar)
    },
    absI: function(xU,xL,deeVar) {//absolute value
        if (deeVar == xU) {return "cDiv(cMul("+xU+",abs("+xU+")),2)"}
        return ntgFunc.uSubst(absS(xU),deeVar)
    },
    erfI: function(xU,xL,deeVar) {//erf
        if (deeVar == xU) {return "cAdd(cMul("+xU+",erf("+xU+")),cDiv(1,cMul(cPow(Cv[8],cPow("+xU+",2)),sqt(Cv[29]))))"}
        return ntgFunc.uSubst(erfS(xU),deeVar)
    },
    efcI: function(xU,xL,deeVar) {//erfc
        if (deeVar == xU) {return cSubS(cMulS(deeVar,efcS(deeVar)),cDivS(cPowS("Cv[8]",cNegS(cPowS(deeVar,2))),sqtS("Cv[29]")))}
        return ntgFunc.uSubst(efcS(xU),deeVar)
    },
    //integration algorithms
    iParts: function (xU,xL,deeVar) { //integration by parts
        function pIntegrate(xTmp,nTmp) {return cSubS(cMulS(xTmp,nTmp),ntgS(cMulS(drvS(xTmp,deeVar),nTmp),deeVar))}
        var xTractU = opExtract(xU);
        var xTractL = opExtract(xL);
        var luDegree = pNomial(xTractL.upper,deeVar).length-2;
        var llDegree = pNomial(xTractL.lower,deeVar).length-2;
        var iReturn = 0, ntgTemp = 0;
        //special cases
        if (xTractL.func == "cPow" && xTractU.func && opExtract(xTractL.lower).func && strTest(xTractL.lower,deeVar)) {
            ntgTemp = ntgS("cMul("+xU+","+xL+")",xTractL.lower);
            iReturn = xReduce(cDivS("cMul("+xU+","+xL+")",drvS(ntgTemp,deeVar)));
            if (ntgFunc.ntgTest(ntgTemp) && !strTest(iReturn,deeVar)) {return cMulS(iReturn,ntgTemp)}
        }
        if (xTractU.func == "cPow" && xTractL.func && opExtract(xTractU.lower).func && strTest(xTractU.lower,deeVar)) {
            ntgTemp = ntgS("cMul("+xU+","+xL+")",xTractU.lower);
            iReturn = xReduce(cDivS("cMul("+xU+","+xL+")",drvS(ntgTemp,deeVar)));
            if (ntgFunc.ntgTest(ntgTemp) && !strTest(iReturn,deeVar)) {return cMulS(iReturn,ntgTemp)}
        }
        if (xTractU.func == "cPow" && xTractL.func && !xTractL.lower && strTest(xTractU.lower,deeVar)) {
            ntgTemp = xReduce(cDivS(xU,xTractL.upper));
            iReturn = pIntegrate(ntgTemp,ntgS("cMul("+ntgTemp+","+xL+")",deeVar));
            if (ntgFunc.ntgTest(iReturn)) {return iReturn}
        }
        if (xTractU.func == "cPow" && xTractL.func && !xTractL.lower && luDegree > 0) {
            iReturn = pIntegrate(xReduce(cDivS(xU,cPowS(deeVar,luDegree))),ntgS("cMul(cPow("+deeVar+","+luDegree+"),"+xL+")",deeVar));
            if (ntgFunc.ntgTest(iReturn)) {return iReturn}
        }
        if (xTractU.func == "cPow" && xTractL.func && xTractL.lower && llDegree > 0) {
            iReturn = pIntegrate(xReduce(cDivS(xU,cPowS(deeVar,llDegree))),ntgS("cMul(cPow("+deeVar+","+llDegree+"),"+xL+")",deeVar));
            if (ntgFunc.ntgTest(iReturn)) {return iReturn}
        }
        //general cases
        iReturn = pIntegrate(xU,ntgS(xL,deeVar));
        if (ntgFunc.ntgTest(iReturn)) {return iReturn}
        return "undefined"
    },
    xSubst:function (xU,xL,deeVar) { //integration by cross substitution
        function cIntegrate(x1,x2,x3) {
            if (x1 && x2 && x3) {
                var drvCheck = drvS(x1,deeVar);
                var factorCheck = xReduce(cDivS(x2,drvCheck));
                if (ntgFunc.ntgTest(factorCheck) && !strTest(factorCheck,deeVar)) {return cMulS(factorCheck,ntgS(x3,x1))}
            }
            return "undefined"
        }
        var xTractU = opExtract(xU);
        var xTractL = opExtract(xL);
        var drvTest = cIntegrate(xTractU.upper,xL,xU);
        if (ntgFunc.ntgTest(drvTest)) {return drvTest}
        drvTest = cIntegrate(xTractL.upper,xU,xL);
        if (ntgFunc.ntgTest(drvTest)) {return drvTest}
        drvTest = cIntegrate(xTractU.lower,xL,xU);
        if (ntgFunc.ntgTest(drvTest)) {return drvTest}
        drvTest = cIntegrate(xTractL.lower,xU,xL);
        if (ntgFunc.ntgTest(drvTest)) {return drvTest}
        return "undefined"
    },
    uSubst: function (xU,deeVar) { //integration of single operand functions
        var xTractU = opExtract(xU);
        // integrate via derivative check
        var iReturn = ntgS(xU,xTractU.upper);
        var tTest = xReduce(cDivS(xU,drvS(iReturn,deeVar)));
        if (ntgFunc.ntgTest(tTest) && !strTest(tTest,deeVar)) {iReturn = cMulS(tTest,iReturn)}
        else {
            // u substitution
            var xVar = relExtract(xprSolve(cEqlS("Cv[9999]",xU),deeVar)).lower;
            iReturn = cSubst(ntgS(cMulS("Cv[9999]",drvS(xVar,"Cv[9999]")),"Cv[9999]"),"Cv[9999]",xU);
            tTest = xReduce(cDivS(xU,drvS(iReturn,deeVar)));
            if (ntgFunc.ntgTest(tTest) && !strTest(tTest,deeVar)) {iReturn = cMulS(tTest,iReturn)}
            else {iReturn = "undefined"}
        }
        return iReturn
    },
    iSearch: function (xU,xF,deeVar) { //integration by derivative search (shotgun approach)
        var tElements = cDissect(xU);
        var tSearch = xReduce(cDivS(xU,drvS(xF+"("+deeVar+")",deeVar)));
        if (!strTest(tSearch,deeVar) && ntgFunc.ntgTest(tSearch)) {return cMulS(xF+"("+deeVar+")",tSearch)}
        for (var tL in tElements) {
            if (tElements[tL] != deeVar && !nbrTest(tElements[tL]) && !strTest(tElements[tL],"undefined") && tElements[tL]) {
                tSearch = xReduce(cDivS(xU,drvS(xF+"("+cAddS(deeVar,tElements[tL])+")",deeVar)));
                if (!strTest(tSearch,deeVar) && ntgFunc.ntgTest(tSearch)) {return cMulS(xF+"("+cAddS(deeVar,tElements[tL])+")",tSearch)}
                tSearch = xReduce(cDivS(xU,drvS(xF+"("+cSubS(deeVar,tElements[tL])+")",deeVar)));
                if (!strTest(tSearch,deeVar) && ntgFunc.ntgTest(tSearch)) {return cMulS(xF+"("+cSubS(deeVar,tElements[tL])+")",tSearch)}
                tSearch = xReduce(cDivS(xU,drvS(xF+"("+cSubS(tElements[tL],deeVar)+")",deeVar)));
                if (!strTest(tSearch,deeVar) && ntgFunc.ntgTest(tSearch)) {return cMulS(xF+"("+cSubS(tElements[tL],deeVar)+")",tSearch)}
                tSearch = xReduce(cDivS(xU,drvS(xF+"("+cMulS(deeVar,tElements[tL])+")",deeVar)));
                if (!strTest(tSearch,deeVar) && ntgFunc.ntgTest(tSearch)) {return cMulS(xF+"("+cMulS(deeVar,tElements[tL])+")",tSearch)}
                tSearch = xReduce(cDivS(xU,drvS(xF+"("+cDivS(deeVar,tElements[tL])+")",deeVar)));
                if (!strTest(tSearch,deeVar) && ntgFunc.ntgTest(tSearch)) {return cMulS(xF+"("+cDivS(deeVar,tElements[tL])+")",tSearch)}
                tSearch = xReduce(cDivS(xU,drvS(xF+"("+cDivS(tElements[tL],deeVar)+")",deeVar)));
                if (!strTest(tSearch,deeVar) && ntgFunc.ntgTest(tSearch)) {return cMulS(xF+"("+cDivS(tElements[tL],deeVar)+")",tSearch)}
            }
        }
        return "undefined"
    },
    ntgTest: function (rTest)   {if (ntgFunc.ntgCheck(rTest) &&  !strTest(rTest,"ntp(") && rTest != 0) {return true}; return false}, //test for ntg success
    ntgCheck: function (rCheck) {if (typeof rCheck == "undefined" || strTest(rCheck,"Cv[9998]") || strTest(rCheck,"undefined")) {return false}; return true},
    }
    function ntgS(nXpr,deeVar,iU,iL) { //integrate (integrand, variable, upper_limit, lower_limit)
        function ntgExecute(xIn) {
            var args = opExtract(xIn);
            if (typeof ntgFunc[args.func+"I"] != "undefined") {return ntgFunc[args.func+"I"](args.upper,args.lower,deeVar)}
            else {return passthruFunc[args.func](args.upper,args.lower)}
        }
        //
        var sReturn = "ntp("+nXpr+","+deeVar+")";
        if (iIterations > 20) {sReturn = "undefined"} //break integration recursion
        else if (typeof iU != "undefined" && typeof iL != "undefined") { //definite integral
            var iTmp = ntgS(xReduce(nXpr),deeVar);
            if (ntgFunc.ntgTest(iTmp)) {sReturn = cReduce(cSubS(lmtS(iTmp,deeVar,iU),lmtS(iTmp,deeVar,iL)))}
            else {sReturn = "ntp("+nXpr+","+deeVar+","+iU+","+iL+")"}
        }
        else if (xReduce(nXpr) == deeVar) {sReturn = cDivS(cPowS(deeVar,2),2)}  //identity
        else if (!strTest(xReduce(nXpr),deeVar)) {sReturn = cMulS(nXpr,deeVar)} //no integration variable
        else { //indefinite integral
            iIterations++;
            var dXpr = ntgExecute(xReduce(nXpr));
            if (ntgFunc.ntgCheck(dXpr)) {sReturn = cReduce(dXpr)}
            else {
                dXpr = ntgExecute(xprExpand(nXpr));
                if (ntgFunc.ntgCheck(dXpr)) {sReturn = cReduce(dXpr)}
            }
        }
        return sReturn
    }

    //Sigma Summation
    function smmS(sXpr,sUpper,dV,sLower) {
        function sumIterate(sXpr,sUpper,dV,sLower) {
            var sReturn = 0;
            if (!nbrTest(sUpper) || !nbrTest(sLower)) {sReturn = "undefined"}
            else if (sUpper-sLower > 1000) {sReturn = "undefined"}
            else {for (var sI=int(sLower);sI<=int(sUpper);sI++) {sReturn = xReduce(cAddS(sReturn,cSubst(sXpr,dV,sI)))}}
            return sReturn
        }
        const smmFunc = {
        cAddM: function(xU,xL) {return xReduce(cAddS(smmS(xU,sUpper,dV,sLower),smmS(xL,sUpper,dV,sLower)))},
        cSubM: function(xU,xL) {return xReduce(cSubS(smmS(xU,sUpper,dV,sLower),smmS(xL,sUpper,dV,sLower)))},
        cMulM: function(xU,xL) {
            if (strTest(xU,dV) && strTest(xL,dV))  {return xReduce(cMulS(smmS(xU,sUpper,dV,sLower),smmS(xL,sUpper,dV,sLower)))}
            if (strTest(xU,dV) && !strTest(xL,dV)) {return xReduce(cMulS(smmS(xU,sUpper,dV,sLower),xL))}
            if (!strTest(xU,dV) && strTest(xL,dV)) {return xReduce(cMulS(xU,smmS(xL,sUpper,dV,sLower)))}
            return "undefined"
        },
        cDivM: function(xU,xL) {
            var xTractU = opExtract(xU);
            var xTractL = opExtract(xL);
            if (xU == 1 && strTest(xL,dV) && nbrTest(sUpper) && nbrTest(sLower))  {return sumIterate(sXpr,sUpper,dV,sLower)}
            if (strTest(xU,dV) && strTest(xL,dV))  {
                if (xTractL.func == "fac" && xprIterate(xTractL.upper) == dV && sUpper == "Cv[8734]" && xTractU.func == "cPow" && xTractU.lower == dV) {
                    return cSubS(cPowS("Cv[8]",xTractU.upper),smmS(cDivS(cPowS(xTractU.upper,dV),facS(dV)),cSubS(sLower,1),dV,0))//exponential
                }
                return xReduce(cDivS(smmS(xU,sUpper,dV,sLower),smmS(xL,sUpper,dV,sLower)))
            }
            if (strTest(xU,dV) && !strTest(xL,dV)) {return xReduce(cDivS(smmS(xU,sUpper,dV,sLower),xL))}
            if (!strTest(xU,dV) && strTest(xL,dV)) {
                if (xTractL.func == "cMul" && !strTest(xTractL.upper,dV)) {return cDivS(smmS(cDivS(xU,xTractL.lower),sUpper,dV,sLower),xTractL.upper)}
                if (xTractL.func == "cMul" && !strTest(xTractL.lower,dV)) {return cDivS(smmS(cDivS(xU,xTractL.upper),sUpper,dV,sLower),xTractL.lower)}
                if (sUpper != "Cv[8734]") {
                    if (xTractL.func == "cPow" && xTractL.lower == dV) {return cDivS(cMulS(cPowS(xTractL.upper,cSubS(cNegS(sUpper),sLower)),cSubS(cPowS(sUpper,cAddS(sUpper,1)),cPowS(xTractL.upper,sLower))),cSubS(xTractL.upper,1))}
                }
                if (sUpper == "Cv[8734]") {
                    if (xTractL.func == "cPow" && xTractL.lower == 2 && xTractL.upper == dV && sLower != 0) {return cSubS(cMulS(xU,cDivS(cPowS("Cv[29]",2),6)),cSubS(sLower,1))}
                    if (xTractL.func == "fac" && xprIterate(xTractL.upper) == dV) {return cMulS(xU,cSubS("Cv[8]",sLower))}
                    if (xTractL.func == "cPow" && nbrTest(xTractL.upper) && xTractL.lower == dV) {return cDivS(cMulS(xU,cPowS(xTractL.upper,cSubS(1,sLower))),cSubS(xTractL.upper,1))}
                }
                return xReduce(cMulS(xU,smmS(cDivS(1,xL),sUpper,dV,sLower)))
            }
            return "undefined"
        },
        cPowM: function(xU,xL) {
            var xTractU = opExtract(xU);
            if (strTest(xU,dV) && xL == 2) {return xReduce(cSubS(cDivS(cMulS(cMulS(sUpper,cAddS(1,sUpper)),cAddS(cMulS(2,sUpper),1)),6), cDivS(cMulS(cMulS(cSubS(sLower,1),cAddS(1,cSubS(sLower,1))),cAddS(cMulS(2,cSubS(sLower,1)),1)),6))) }
            if (strTest(xU,dV) && xL == 3) {return xReduce(cSubS(cDivS(cMulS(cPowS(sUpper,2),cPowS(cAddS(sUpper,1),2)),4) ,cDivS(cMulS(cPowS(cSubS(sLower,1),2),cPowS(cAddS(cSubS(sLower,1),1),2)),4))) }
            if (!strTest(xU,dV) && strTest(xL,dV)) {
                if (sUpper == "Cv[8734]" && xTractU.func == "cDiv") {return xReduce(cMulS(cDivS(1,cSubS(xTractU.lower,1)),xTractU.upper)) }
                return cDivS(cSubS(cPowS(xU,cAddS(sUpper,1)),cPowS(xU,sLower)),cSubS(xU,1))
            }
            return "undefined"
        },
        cNegM: function(xU) {return cNegS(smmS(xU,sUpper,dV,sLower))},
        lneM: function(xU) {return lneS(pmmS(xU,sUpper,dV,sLower))},
        sqtM: function(xU) {return "undefined"},
        cbtM: function(xU) {return "undefined"},
        sinM: function(xU) {return "undefined"},
        cosM: function(xU) {return "undefined"},
        tanM: function(xU) {return "undefined"},
        secM: function(xU) {return "undefined"},
        cscM: function(xU) {return "undefined"},
        ctnM: function(xU) {return "undefined"},
        snhM: function(xU) {return "undefined"},
        cshM: function(xU) {return "undefined"},
        tnhM: function(xU) {return "undefined"},
        schM: function(xU) {return "undefined"},
        cchM: function(xU) {return "undefined"},
        cthM: function(xU) {return "undefined"},
        asnM: function(xU) {return "undefined"},
        acsM: function(xU) {return "undefined"},
        atnM: function(xU) {return "undefined"},
        actM: function(xU) {return "undefined"},
        ascM: function(xU) {return "undefined"},
        accM: function(xU) {return "undefined"},
        ashM: function(xU) {return "undefined"},
        achM: function(xU) {return "undefined"},
        athM: function(xU) {return "undefined"},
        axhM: function(xU) {return "undefined"},
        ayhM: function(xU) {return "undefined"},
        azhM: function(xU) {return "undefined"},
        expM: function(xU) {return "undefined"},
        absM: function(xU) {return "undefined"},
        erfM: function(xU) {return "undefined"},
        efcM: function(xU) {return "undefined"},
        conM: function(xU) {return "undefined"},
        facM: function(xU) {return "undefined"},
        }
        //
        sXpr = String(sXpr);sUpper = String(sUpper);dV = String(dV);sLower = String(sLower);
        var sReturn = "smm("+xReduce(sXpr)+","+sUpper+","+dV+","+sLower+")";
        sIterations++;
        if (sIterations > 30) {sReturn = "smm("+sXpr+","+sUpper+","+dV+","+sLower+")"} //break infinite loop
        else if (strTest(sLower,"Cv[8734]")) {sReturn = "smm("+xReduce(sXpr)+","+sUpper+","+dV+","+sLower+")"}
        else if (sXpr == dV && sUpper != "Cv[8734]" && sLower != 0) {sReturn = xReduce(cDivS(cSubS(cAddS(cAddS(sUpper,cPowS(sUpper,2)),sLower),cPowS(sLower,2)),2))}
        else if (sXpr == dV && sUpper == "Cv[8734]" && sLower != 0) {sReturn = "Cv[8734]"}
        else if (!strTest(sXpr,dV)) {sReturn = xReduce(cMulS(sXpr,cAddS(cSubS(sUpper,sLower),1)))}
        else {
            var sumReturn = "";
            var args = opExtract(sXpr);
            if (typeof smmFunc[args.func+"M"] != "undefined") {sumReturn = smmFunc[args.func+"M"](args.upper,args.lower)}
            else {sumReturn = passthruFunc[args.func](args.upper,args.lower)}
            if (!strTest(sumReturn,"undefined") && !strTest(sumReturn,"NaN")) {sReturn = xReduce(sumReturn)}
            else {
                sumReturn = sumIterate(sXpr,sUpper,dV,sLower);
                if (!strTest(sumReturn,"undefined") && !strTest(sumReturn,"NaN")) {sReturn = xReduce(sumReturn)}
            }
        }
        return sReturn
    }
    //Pi Products
    function pmmS(pXpr,pUpper,dV,pLower) {
        function prdIterate(pXpr,pUpper,dV,pLower) {
            var pReturn = 0;
            if (!nbrTest(pUpper) || !nbrTest(pLower)) {pReturn = "undefined"}
            else if (pUpper-pLower > 1000) {pReturn = "undefined"}
            else {for (var sI=int(pLower);sI<=int(pUpper);sI++) {pReturn = xReduce(cMulS(pReturn,cSubst(pXpr,dV,sI)))}}
            return pReturn
        }
        const pmmFunc = {
        cAddP: function(xU,xL) {
            if (!strTest(xU,dV) && xL == dV)  {return cDivS(facS(cAddS(xU,pUpper)),facS(cSubS(cAddS(xU,pLower),1)))}
            if (xU == dV && !strTest(xL,dV))  {return cDivS(facS(cAddS(xL,pUpper)),facS(cSubS(cAddS(xL,pLower),1)))}
            return "undefined"
        },
        cSubP: function(xU,xL) {
            if (!strTest(xU,dV) && xL == dV)  {return cNegS(cDivS(cMulS(cPowS(-1,cSubS(pUpper,pLower)),facS(cSubS(pUpper,xU))),facS(cSubS(cSubS(pLower,xU),1))))}
            if (xU == dV && !strTest(xL,dV))  {return cDivS(facS(cSubS(xL,pUpper)),facS(cSubS(cAddS(xL,pLower),1)))}
            return "undefined"
        },
        cMulP: function(xU,xL) {
            if (+pLower == 0 && strTest(xU,dV)) {return 0}
            if (+pLower == 0 && strTest(xL,dV)) {return 0}
            return cMulS(pmmS(xU,pUpper,dV,pLower),pmmS(xL,pUpper,dV,pLower))
        },
        cDivP: function(xU,xL) {
            if (+pLower == 0 && strTest(xL,dV)) {return "Cv[8734]"}
            if (+pLower == 0 && strTest(xU,dV)) {return 0}
            return cDivS(pmmS(xU,pUpper,dV,pLower),pmmS(xL,pUpper,dV,pLower))
        },
        cPowP: function(xU,xL) {
            if (!strTest(xU,dV) && strTest(xL,dV))  {return cPowS(xU,smmS(xL,pUpper,dV,pLower))}
            if (xU == dV && !strTest(xL,dV))  {return cPowS(cDivS(facS(pUpper),facS(cSubS(pLower,1))),xL)   }
            return "undefined"
        },
        cNegP: function(xU) {
            if (+pLower == 0 && strTest(xU,dV)) {return 0}
            return cMulS(pmmS(-1,pUpper,dV,pLower),pmmS(xU,pUpper,dV,pLower))
        },
        lneP: function(xU) {return "undefined"},
        sqtP: function(xU) {return "undefined"},
        cbtP: function(xU) {return "undefined"},
        sinP: function(xU) {return "undefined"},
        cosP: function(xU) {return "undefined"},
        tanP: function(xU) {return "undefined"},
        secP: function(xU) {return "undefined"},
        cscP: function(xU) {return "undefined"},
        ctnP: function(xU) {return "undefined"},
        snhP: function(xU) {return "undefined"},
        cshP: function(xU) {return "undefined"},
        tnhP: function(xU) {return "undefined"},
        schP: function(xU) {return "undefined"},
        cchP: function(xU) {return "undefined"},
        cthP: function(xU) {return "undefined"},
        asnP: function(xU) {return "undefined"},
        acsP: function(xU) {return "undefined"},
        atnP: function(xU) {return "undefined"},
        actP: function(xU) {return "undefined"},
        ascP: function(xU) {return "undefined"},
        accP: function(xU) {return "undefined"},
        ashP: function(xU) {return "undefined"},
        achP: function(xU) {return "undefined"},
        athP: function(xU) {return "undefined"},
        axhP: function(xU) {return "undefined"},
        ayhP: function(xU) {return "undefined"},
        azhP: function(xU) {return "undefined"},
        expP: function(xU) {return "undefined"},
        absP: function(xU) {return "undefined"},
        erfP: function(xU) {return "undefined"},
        efcP: function(xU) {return "undefined"},
        conP: function(xU) {return "undefined"},
        facP: function(xU) {return "undefined"},
        }
        //
        pXpr = String(pXpr);pUpper = String(pUpper);dV = String(dV);pLower = String(pLower);
        pIterations++;
        var sReturn = "pmm("+xReduce(pXpr)+","+pUpper+","+dV+","+pLower+")";
        if (pIterations > 30) {sReturn = "pmm("+pXpr+","+pUpper+","+dV+","+pLower+")"} //break infinite loop
        else if (strTest(pLower,"Cv[8734]") || strTest(pUpper,"Cv[8734]")) {sReturn = "pmm("+pXpr+","+pUpper+","+dV+","+pLower+")"}
        else if (pXpr == dV && pLower == 0) {sReturn = 0}
        else if (pXpr == dV) {sReturn = cDivS(facS(pUpper),facS(cSubS(pLower,1)))} //factorial
        else if (!strTest(pXpr,dV)) {sReturn = cPowS(xReduce(pXpr),cAddS(cNegS(pLower),cAddS(pUpper,1)))}
        else {
            var prdReturn = "";
            var args = opExtract(pXpr);
            if (typeof pmmFunc[args.func+"P"] != "undefined") {prdReturn = pmmFunc[args.func+"P"](args.upper,args.lower)}
            else {prdReturn = passthruFunc[args.func](args.upper,args.lower)}
            if (!strTest(prdReturn,"undefined") && !strTest(prdReturn,"NaN")) {sReturn = xReduce(prdReturn)}
            else {
                prdReturn = prdIterate(pXpr,pUpper,dV,pLower);
                if (!strTest(prdReturn,"undefined") && !strTest(prdReturn,"NaN")) {sReturn = xReduce(prdReturn)}
            }
        }
        return sReturn
    }

    //Limits
    const lmtFunc = {
    cAddL: function(xU,xL,lVar,xLim) {return cAddS(lmtS(xU,lVar,xLim),lmtS(xL,lVar,xLim))},
    cSubL: function(xU,xL,lVar,xLim) {
        if (lmtS(xU,lVar,xLim) == "Cv[8734]" && lmtS(xL,lVar,xLim) == "Cv[8734]") {return lneS(lmtFunc["cDivL"](cPowS("Cv[8]",xU),cPowS("Cv[8]",xL),lVar,xLim))} //inf-inf
        return cSubS(lmtS(xU,lVar,xLim),lmtS(xL,lVar,xLim))
    },
    cMulL: function(xU,xL,lVar,xLim) {
        if (lmtS(xU,lVar,xLim) == 0 && lmtS(xL,lVar,xLim) == "Cv[8734]") {return lmtFunc["cDivL"](xU,cDivS(1,xL),lVar,xLim)} //0*inf
        if (lmtS(xL,lVar,xLim) == 0 && lmtS(xU,lVar,xLim) == "Cv[8734]") {return lmtFunc["cDivL"](xL,cDivS(1,xU),lVar,xLim)} //inf*0
        if (lmtS(xU,lVar,xLim) == 0 && lmtS(xL,lVar,xLim) == "cNeg(Cv[8734])") {return lmtFunc["cDivL"](xL,cDivS(1,xU),lVar,xLim)} //0*-inf
        if (lmtS(xL,lVar,xLim) == 0 && lmtS(xU,lVar,xLim) == "cNeg(Cv[8734])") {return lmtFunc["cDivL"](xU,cDivS(1,xL),lVar,xLim)} //-inf*0
        if (!strTest(xU,lVar)) {return cMulS(xU,lmtS(xL,lVar,xLim))} //constant rule
        if (!strTest(xL,lVar)) {return cMulS(xL,lmtS(xU,lVar,xLim))} //constant rule
        return cMulS(lmtS(xU,lVar,xLim),lmtS(xL,lVar,xLim)) //product rule
    },
    cDivL: function(xU,xL,lVar,xLim) {
        var xTractU = opExtract(xU);
        var xTractL = opExtract(xL);
        var polyU = pCoeff(pNomial(xU,lVar));
        var polyL = pCoeff(pNomial(xL,lVar));
        if (xLim == "Cv[8734]" && polyU.length > 2 && polyU.length < polyL.length) {return 0}
        if (xLim == "cNeg(Cv[8734])" && polyU.length > 2 && polyU.length < polyL.length) {return 0}
        if (xLim == "Cv[8734]" && polyU.length > 2 && polyU.length > polyL.length) {return "Cv[8734]"}
        if (xLim == "cNeg(Cv[8734])" && polyU.length > 2 && polyU.length > polyL.length) {
            if (nbrEven(polyU.length)) {return "cNeg(Cv[8734])"} //odd exponent
            return "Cv[8734]" //even exponent
        }
        if (xLim == "Cv[8734]" && polyU.length > 2 && polyU.length == polyL.length) {return cDivS(polyU[polyU.length-1],polyL[polyL.length-1])} //return coefficient ratio
        if (xLim == "cNeg(Cv[8734])" && polyU.length > 2 && polyU.length == polyL.length) {return cDivS(polyU[polyU.length-1],polyL[polyL.length-1])} //return coefficient ratio
        if (xTractL.func == "sqt" && xTractU.func != "sqt") {return sqtS(lmtS(cDivS(xprExpand(cPowS(xU,2)),xTractL.upper),lVar,xLim))}
        if (xTractL.func != "sqt" && xTractU.func == "sqt") {return sqtS(lmtS(cDivS(xTractU.upper,xprExpand(cPowS(xL,2))),lVar,xLim))}
        if (xTractL.func == "cPow" && xTractU.func == "cPow") {return cDivS(lmtFunc["cPowL"](xU,lVar,xLim),lmtFunc["cPowL"](xL,lVar,xLim))}
        if (strTest(lmtS(xU,lVar,xLim),"Cv[8734]") && strTest(lmtS(xL,lVar,xLim),"Cv[8734]") && drvS(xU,lVar) != "undefined" && drvS(xL,lVar) != 0) {return lmtS(cDivS(drvS(xU,lVar),drvS(xL,lVar)),lVar,xLim)} // l'Hopital inf/inf
        if (lmtS(xL,lVar,xLim) == 0 && drvS(xU,lVar) != "undefined" && drvS(xL,lVar) != 0) {return lmtS(cDivS(drvS(xU,lVar),drvS(xL,lVar)),lVar,xLim)} // l'Hopital n/0
        return cDivS(lmtS(xU,lVar,xLim),lmtS(xL,lVar,xLim)) //quotient rule
    },
    cPowL: function(xU,xL,lVar,xLim) {
        var xTractU = opExtract(xU);
        var xTractL = opExtract(xL);
        if (xLim == "Cv[8734]") {//limit definition for e^n as x->inf
            var lTemp = xReduce("cMul(cSub("+xU+",1),"+lVar+")");
            if (xL == lVar && !strTest(lTemp,lVar)) {return cPowS("Cv[8]",lTemp)} 
        }
        if (xLim == 0 && xTractL.func == "cDiv" && xTractL.lower == lVar) { //limit definitions for e^n as x->0
            if (xTractU.func == "cAdd" && xReduce("cSub("+xU+",1)") == lVar) {return cPowS("Cv[8]",xTractL.upper)}
            if (xTractU.func == "cSub" && xReduce("cAdd("+lVar+","+xU+")") == 1) {return cDivS(1,cPowS("Cv[8]",xTractL.upper))}
        }
        if (xTractL.func == "cAdd") {return lmtFunc["cMulL"](cPowS(xU,xTractL.upper),cPowS(xU,xTractL.lower),lVar,xLim)}
        if (xTractL.func == "cSub") {return lmtFunc["cDivL"](cPowS(xU,xTractL.upper),cPowS(xU,xTractL.lower),lVar,xLim)}
        if (lmtS(xL,lVar,xLim) == 0 && lmtS(xU,lVar,xLim) == 0) {return cPowS("Cv[8]",lmtFunc["cDivL"](lne(xU),cDivS(1,xL),lVar,xLim))} //0^0
        if (strTest(lmtS(xU,lVar,xLim),"Cv[8734]") && lmtS(xL,lVar,xLim) == 0) {return cPowS("Cv[8]",lmtFunc["cDivL"](xL,cDivS(1,lne(xU)),lVar,xLim))} //inf^0
        if (lmtS(xU,lVar,xLim) == 1 && strTest(lmtS(xL,lVar,xLim),"Cv[8734]")) {return cPowS("Cv[8]",lmtFunc["cDivL"](lne(xU),cDivS(1,xL),lVar,xLim))} //1^inf
        if (strTest(xLim,xU) && !strTest(xLim,xL)) {return cPowS(lmtS(xU,lVar,xLim),xL)} //power rule
        return cPowS(xU,lmtS(xL,lVar,xLim))
    },
    cNegL: function(xU,xL,lVar,xLim) {return cNegS(lmtS(xU,lVar,xLim))},
    lneL: function(xU,xL,lVar,xLim) {return lneS(lmtS(xU,lVar,xLim))},
    sqtL: function(xU,xL,lVar,xLim) {return sqtS(lmtS(xU,lVar,xLim))},
    cbtL: function(xU,xL,lVar,xLim) {return cbtS(lmtS(xU,lVar,xLim))},
    sinL: function(xU,xL,lVar,xLim) {return sinS(lmtS(xU,lVar,xLim))},
    cosL: function(xU,xL,lVar,xLim) {return cosS(lmtS(xU,lVar,xLim))},
    tanL: function(xU,xL,lVar,xLim) {return tanS(lmtS(xU,lVar,xLim))},
    cscL: function(xU,xL,lVar,xLim) {return lmtS(cDivS(1,sinS(xU)),lVar,xLim)},
    secL: function(xU,xL,lVar,xLim) {return lmtS(cDivS(1,cosS(xU)),lVar,xLim)},
    cotL: function(xU,xL,lVar,xLim) {return cotS(lmtS(xU,lVar,xLim))},
    snhL: function(xU,xL,lVar,xLim) {return snhS(lmtS(xU,lVar,xLim))},
    cshL: function(xU,xL,lVar,xLim) {return cshS(lmtS(xU,lVar,xLim))},
    tnhL: function(xU,xL,lVar,xLim) {return tnhS(lmtS(xU,lVar,xLim))},
    schL: function(xU,xL,lVar,xLim) {return schS(lmtS(xU,lVar,xLim))},
    cchL: function(xU,xL,lVar,xLim) {return cchS(lmtS(xU,lVar,xLim))},
    cthL: function(xU,xL,lVar,xLim) {return cthS(lmtS(xU,lVar,xLim))},
    asnL: function(xU,xL,lVar,xLim) {return asnS(lmtS(xU,lVar,xLim))},
    acsL: function(xU,xL,lVar,xLim) {return acsS(lmtS(xU,lVar,xLim))},
    atnL: function(xU,xL,lVar,xLim) {return atnS(lmtS(xU,lVar,xLim))},
    actL: function(xU,xL,lVar,xLim) {return actS(lmtS(xU,lVar,xLim))},
    ascL: function(xU,xL,lVar,xLim) {return ascS(lmtS(xU,lVar,xLim))},
    accL: function(xU,xL,lVar,xLim) {return accS(lmtS(xU,lVar,xLim))},
    ashL: function(xU,xL,lVar,xLim) {return ashS(lmtS(xU,lVar,xLim))},
    achL: function(xU,xL,lVar,xLim) {return achS(lmtS(xU,lVar,xLim))},
    athL: function(xU,xL,lVar,xLim) {return athS(lmtS(xU,lVar,xLim))},
    axhL: function(xU,xL,lVar,xLim) {return axhS(lmtS(xU,lVar,xLim))},
    ayhL: function(xU,xL,lVar,xLim) {return ayhS(lmtS(xU,lVar,xLim))},
    azhL: function(xU,xL,lVar,xLim) {return azhS(lmtS(xU,lVar,xLim))},
    expL: function(xU,xL,lVar,xLim) {return expS(lmtS(xU,lVar,xLim))},
    absL: function(xU,xL,lVar,xLim) {return absS(lmtS(xU,lVar,xLim))},
    erfL: function(xU,xL,lVar,xLim) {return erfS(lmtS(xU,lVar,xLim))},
    efcL: function(xU,xL,lVar,xLim) {return efcS(lmtS(xU,lVar,xLim))},
    }
    //
    function lmtS(lXpr,lVar,xLim) {
        var sReturn = xReduce(lXpr);
        var args = opExtract(sReturn);
        var polyX = pNomial(sReturn,lVar);
        if (sReturn == lVar) {sReturn =  xLim}
        else if (args.func == "") {sReturn = lXpr}
        else {
            xIterations++;
            if (xIterations < 100) {
                if (polyX.length > 2 && nbrEven(polyX.length-1) && (xLim == "Cv[8734]" || xLim == "cNeg(Cv[8734])")) {sReturn = "Cv[8734]"} //even polynomial
                else if (polyX.length > 2 && nbrEven(polyX.length) && xLim == "Cv[8734]") {sReturn = "Cv[8734]"} //odd polynomial
                else if (polyX.length > 2 && nbrEven(polyX.length) && xLim == "cNeg(Cv[8734])") {sReturn = "cNeg(Cv[8734])"} //odd polynomial
                else if (typeof lmtFunc[args.func+"L"] != "undefined") {sReturn = cReduce(cSubst(lmtFunc[args.func+"L"](args.upper,args.lower,lVar,xLim),lVar,xLim))}
                else {sReturn = passthruFunc[args.func](args.upper,args.lower)}
            }
        }
        return sReturn
    }
    // Taylor series
    function xprSeries(xS,sVar,sCenter,sOrder) {
        if (typeof sCenter == "undefined") {sCenter = 0} //default center = 0
        if (typeof sOrder == "undefined") {sOrder = 6} //default order = 6
        if (sVar == "undefined") {sVar = pVariable(xS)} //select primary variable if not specified
        var sDerivative = xS;
        var sReturn = xReduce(cSubst(xS,sVar,sCenter));
        var sTerm = 0;
        for (var iSeries=1;iSeries<=sOrder;iSeries++) {
            sDerivative = drvS(sDerivative,sVar);
            sTerm = xReduce(cDivS(cMulS(cSubst(sDerivative,sVar,sCenter),cPowS(cSubS(sVar,sCenter),iSeries)),fac(iSeries)));
            sReturn = cAddS(sReturn,sTerm)
        }
        if (strTest(sReturn,"undefined")) {sReturn = xS}
        else {sReturn = "cAdd("+sReturn+",Cv[8230])"}
        return sReturn
    }

    //Exponential trig conversion
    const trigexpFunc = {
    sin: function (xU) {return cDivS(cSubS(cPowS("Cv[8]",cMulS("Cv[46]",xU)),cPowS("Cv[8]",cMulS(cNegS("Cv[46]"),xU))),cMulS("2","Cv[46]"))},
    cos: function (xU) {return cDivS(cAddS(cPowS("Cv[8]",cMulS("Cv[46]",xU)),cPowS("Cv[8]",cMulS(cNegS("Cv[46]"),xU))),"2")},
    tan: function (xU) {return cDivS(cSubS(cPowS("Cv[8]",cMulS("Cv[46]",xU)),cPowS("Cv[8]",cMulS(cNegS("Cv[46]"),xU))),cMulS("Cv[46]",cAddS(cPowS("Cv[8]",cMulS("Cv[46]",xU)),cPowS("Cv[8]",cMulS(cNegS("Cv[46]"),xU)))))},
    sec: function (xU) {return cDivS("2",cAddS(cPowS("Cv[8]",cMulS("Cv[46]",xU)),cPowS("Cv[8]",cMulS(cNegS("Cv[46]"),xU))))},
    csc: function (xU) {return cDivS(cMulS("2","Cv[46]"),cSubS(cPowS("Cv[8]",cMulS("Cv[46]",xU)),cPowS("Cv[8]",cMulS(cNegS("Cv[46]"),xU))))},
    cot: function (xU) {return cDivS(cMulS("Cv[46]",cAddS(cPowS("Cv[8]",cMulS("Cv[46]",xU)),cPowS("Cv[8]",cMulS(cNegS("Cv[46]"),xU)))),cSubS(cPowS("Cv[8]",cMulS("Cv[46]",xU)),cPowS("Cv[8]",cMulS(cNegS("Cv[46]"),xU))))},
    snh: function (xU) {return cDivS(cSubS(cPowS("Cv[8]",xU),cPowS("Cv[8]",cNegS(xU))),"2")},
    csh: function (xU) {return cDivS(cAddS(cPowS("Cv[8]",xU),cPowS("Cv[8]",cNegS(xU))),"2")},
    tnh: function (xU) {return cDivS(cSubS(cPowS("Cv[8]",xU),cDivS(1,cPowS("Cv[8]",xU))),cAddS(cPowS("Cv[8]",xU),cDivS(1,cPowS("Cv[8]",xU))))},
    sch: function (xU) {return cDivS("2",cAddS(cPowS("Cv[8]",xU),cPowS("Cv[8]",cNegS(xU))))},
    cch: function (xU) {return cDivS("2",cSubS(cPowS("Cv[8]",xU),cPowS("Cv[8]",cNegS(xU))))},
    cth: function (xU) {return cDivS(cAddS(cPowS("Cv[8]",xU),cDivS(1,cPowS("Cv[8]",xU))),cSubS(cPowS("Cv[8]",xU),cDivS(1,cPowS("Cv[8]",xU))))},
    asn: function (xU) {return cNegS(cMulS("Cv[46]",lneS(cAddS(cMulS("Cv[46]",xU),sqtS(cSubS(1,cPowS(xU,"2")))))))},
    acs: function (xU) {return cMulS("Cv[46]",lneS(cAddS(xU,cMulS("Cv[46]",sqtS(cSubS(1,cPowS(xU,"2")))))))},
    atn: function (xU) {return cDivS(cMulS("Cv[46]",lneS(cDivS(cAddS("Cv[46]",xU),cSubS("Cv[46]",xU)))),"2")},
    asc: function (xU) {return cNegS(cDivS(lneS(cAddS(cDivS("Cv[46]",xU),sqtS(cSubS(1,cDivS("Cv[46]",cPowS(xU,"2")))))),"2"))},
    acc: function (xU) {return cNegS(cDivS(lneS(cAddS(cDivS("Cv[46]",xU),sqtS(cSubS("Cv[46]",cDivS("Cv[46]",cPowS(xU,"2")))))),"2"))},
    act: function (xU) {return cDivS(cMulS("Cv[46]",lneS(cDivS(cSubS("Cv[46]",xU),cAddS("Cv[46]",xU)))),"2")},
    ash: function (xU) {return lneS(cAddS(xU,sqtS(cAddS(cPowS(xU,"2"),1))))},
    ach: function (xU) {return lneS(cAddS(xU,sqtS(cSubS(cPowS(xU,"2"),1))))},
    ath: function (xU) {return cDivS(cMulS(lneS(cAddS(1,xU)),lneS(cSubS(1,xU))),"2")},
    }
    //
    function xprTrigToExp(xU) { //convert trig to exponential forms
        return xReduce(execFunc(xU,trigexpFunc))
    }
    function xprExpToTrig(xU) { //convert exponential forms to trig
        const expFn = ["sin","cos","tan","sec","csc","cot"]
        const expFnh = ["snh","csh","tnh","sch","cch","cth"]
        var xReturn = xReduce(xU);var xFn = 0;
        var opMatch = xprSearch(xReturn,"cPow(Cv[8],Cv[9999])")
        if (opExtract(opMatch).func == "cMul" && opExtract(opMatch).upper < 0) {opMatch = xReduce(cNegS(opMatch))} //fix for negative numerical coeff
        if (opMatch && !strTest(opMatch,"Cv[46]")) {
            expFnh.forEach(function (xFn) {xReturn = xReturn.replace(xReduce(xprTrigToExp(xFn+"("+opMatch+")")),xFn+"("+opMatch+")")})
        }
        if (opMatch && strTest(opMatch,"Cv[46]")) {
            opMatch = xReduce(cDivS(opMatch,"Cv[46]"))
            expFn.forEach(function(xFn) {xReturn = xReturn.replace(xReduce(xprTrigToExp(xFn+"("+opMatch+")")),xFn+"("+opMatch+")")})
        }
        return xReturn
    }

    // Symbolic Factoring
    const factorFunc = {
    cnt:function (xU) { //factor outside expression
        var pfTerms = parseTerms(xU);
        var pfReturn = 1;
        for (var xC in pfTerms) {
            var fTemp = pFactor(pfTerms[xC]);
            if (pNomial(pfTerms[xC]).length > 2) {pfReturn = xprIterate(cMulS(pfReturn,fTemp))}
            else {pfReturn = xprIterate(cMulS(pfReturn,pfTerms[xC]))}
        }
        return pfReturn
    },
    cAdd: function (xU,xL) {return asFactor(xprExpand("cAdd("+xU+","+xL+")"))},
    cSub: function (xU,xL) {return asFactor(xprExpand("cSub("+xU+","+xL+")"))},
    cMul: function (xU,xL) {return "cMul("+pFactor(xU)+","+pFactor(xL)+")"},
    cPow: function (xU,xL) {return "cPow("+pFactor(xU)+","+pFactor(xL)+")"},
    cDiv: function (xU,xL) {
        if (pNomial(xL).length > pNomial(xU).length) { //proper partial fractions
            var fVar = pVariable(xL);
            var pFac = pFactor(xL);
            var termsL = parseTerms(pFac);
            if (termsL.length == 2 && (!pVariable(xU) || pVariable(xU) == pVariable(xL)) ) {
                var Z1 = relExtract(xprSolve(cEqlS("0",termsL[0]),fVar)).lower;
                var Z2 = relExtract(xprSolve(cEqlS("0",termsL[1]),fVar)).lower;
                var A1 = xReduce(cSubst(xU,fVar,Z1));
                var A2 = xReduce(cSubst(xU,fVar,Z2));
                var B1 = xReduce(cSubst(termsL[0],fVar,Z2));
                var B2 = xReduce(cSubst(termsL[1],fVar,Z1));
                if (Z1 == int(Z1) && Z2 == int(Z2)) {return xReduce(cAddS(cDivS(A2,cMulS(B1,termsL[1])),cDivS(A1,cMulS(B2,termsL[0]))))}
            }
        }
        return "cDiv("+pFactor(xU)+","+pFactor(xL)+")"
    },
    cEql: function (xU,xL) {return "cEql("+pFactor(xU)+","+pFactor(xL)+")"},
    cNql: function (xU,xL) {return "cNql("+pFactor(xU)+","+pFactor(xL)+")"},
    cGth: function (xU,xL) {return "cGth("+pFactor(xU)+","+pFactor(xL)+")"},
    cLth: function (xU,xL) {return "cLth("+pFactor(xU)+","+pFactor(xL)+")"},
    cGeq: function (xU,xL) {return "cGeq("+pFactor(xU)+","+pFactor(xL)+")"},
    cLeq: function (xU,xL) {return "cLeq("+pFactor(xU)+","+pFactor(xL)+")"},
    nrt: function (xU,xL) {return "nrt("+pFactor(xU)+","+pFactor(xL)+")"},
    lgn: function (xU,xL) {return "lgn("+pFactor(xU)+","+pFactor(xL)+")"},
    lne: function (xU) {return "lne("+pFactor(xU)+")"},
    log: function (xU) {return "log("+pFactor(xU)+")"},
    sqt: function (xU) {return "sqt("+pFactor(xU)+")"},
    cbt: function (xU) {return "cbt("+pFactor(xU)+")"},
    sin: function (xU) {return "sin("+pFactor(xU)+")"},
    cos: function (xU) {return "cos("+pFactor(xU)+")"},
    tan: function (xU) {return "tan("+pFactor(xU)+")"},
    cot: function (xU) {return "cot("+pFactor(xU)+")"},
    csc: function (xU) {return "csc("+pFactor(xU)+")"},
    sec: function (xU) {return "sec("+pFactor(xU)+")"},
    snh: function (xU) {return "snh("+pFactor(xU)+")"},
    csh: function (xU) {return "csh("+pFactor(xU)+")"},
    tnh: function (xU) {return "tnh("+pFactor(xU)+")"},
    sch: function (xU) {return "sch("+pFactor(xU)+")"},
    cch: function (xU) {return "cch("+pFactor(xU)+")"},
    cth: function (xU) {return "cth("+pFactor(xU)+")"},
    asn: function (xU) {return "asn("+pFactor(xU)+")"},
    acs: function (xU) {return "acs("+pFactor(xU)+")"},
    atn: function (xU) {return "atn("+pFactor(xU)+")"},
    act: function (xU) {return "act("+pFactor(xU)+")"},
    asc: function (xU) {return "asc("+pFactor(xU)+")"},
    acc: function (xU) {return "acc("+pFactor(xU)+")"},
    ash: function (xU) {return "ash("+pFactor(xU)+")"},
    ach: function (xU) {return "ach("+pFactor(xU)+")"},
    ath: function (xU) {return "ath("+pFactor(xU)+")"},
    axh: function (xU) {return "axh("+pFactor(xU)+")"},
    ayh: function (xU) {return "ayh("+pFactor(xU)+")"},
    azh: function (xU) {return "azh("+pFactor(xU)+")"},
    exp: function (xU) {return "exp("+pFactor(xU)+")"},
    }
    function pFactor(pfFac) { //factor polynomials
        function fAddMul(D2,D1,D0) {
            var iXu = 0;
            if      (D1 > 0 && cMul(D0,D2) > 0) {for (iXu=D1;iXu>=0;iXu--)     {if (cMul(D0,D2) == cMul(iXu,cSub(D1,iXu))) {break}}}
            else if (D1 < 0 && cMul(D0,D2) > 0) {for (iXu=-cMul(D0,D2);iXu<=0;iXu++) {if (cMul(D0,D2) == cMul(iXu,cSub(D1,iXu))) {break}}}
            else    {for (iXu=cMul(D0,D2);iXu<=0;iXu++)  {if (cMul(D0,D2) == cMul(iXu,cSub(D1,iXu))) {break}}}
            return iXu
        }
        var pReturn = 0,xC = 0;
        pfFac = xReduce(pfFac);
        var pVar = pVariable(pfFac);
        var polyU = pNomial(pfFac,pVar);
        if (polyU.length < 2) {return pfFac}
        var fCoeff = pCoeff(polyU); //get common coefficients
        var fGcf = aGcf(fCoeff); //find GCF
        for (xC=0;xC<polyU.length;xC++) {if (fCoeff[xC] != 0) {polyU[xC] = xReduce(cDivS(polyU[xC],cMulS(fCoeff[xC],cPowS(pVar,xC))))}}//reduce terms by coeff/pVar
        for (xC=1;xC<polyU.length;xC++) {if (polyU[xC] != polyU[xC-1] && +polyU[xC-1] != 0) {break}}//factor common terms
        if (xC == polyU.length) { //recalc GCF
            fGcf = cMulS(fGcf,polyU[polyU.length-1])
            for (xC=1;xC<polyU.length;xC++) {polyU[xC] = xReduce(cDivS(polyU[xC],polyU[polyU.length-1]))}
        }
        if (polyU.length >= 3) { //refactor GCF
            for (xC=0;xC<polyU.length;xC++) {if (fCoeff[xC] != 0 ) {fGcf = cMulS(fGcf,cPowS(pVar,xC));break}}
        }       
        var sqrtA = sqt(abs(fCoeff[polyU.length-1])),sqrtB = sqt(abs(fCoeff[0])); //difference of perfect squares
        pReturn = xReduce(cMulS(fGcf,"cMul((cAdd(cMul("+sqrtA+","+cPowS(pVar,cDiv((polyU.length-1),2))+"),"+sqrtB+")),(cSub(cMul("+sqrtA+","+cPowS(pVar,cDiv((polyU.length-1),2))+"),"+sqrtB+")))"));
        if (xprExpand(pReturn) == pfFac) {return pReturn} //test perfect squares calc
        //factor quadratic
        var yVar = 1; //secondary quadratic variable
        if (pNomial(pExpand(polyU)).length == polyU.length) {yVar = pVariable(pExpand(polyU))}
        polyU = pNomial(xReduce(cDivS(pfFac,fGcf)),pVar);
        fCoeff = pCoeff(polyU); //recalc coefficients
        var pRoot = cPowS(pVar,cDiv((polyU.length-1),2));
        var aPb = fAddMul(fCoeff[0],fCoeff[cDiv((polyU.length-1),2)],fCoeff[(polyU.length-1)]);
        var gcfA = cGcf(fCoeff[(polyU.length-1)],aPb);
        var gcfB = cGcf(fCoeff[cDiv((polyU.length-1),2)]-aPb,fCoeff[0]);
        var facA1 = xReduce(cDivS(cAddS(cMulS(pRoot,fCoeff[(polyU.length-1)]),cMulS(aPb,yVar)),gcfA));
        var facB1 = xReduce(cAddS(cMulS(gcfA,pRoot),cMulS(gcfB,yVar)));
        var facB2 = xReduce(cSubS(cMulS(gcfA,pRoot),cMulS(gcfB,yVar)));
        pReturn = cMulS(fGcf,cMulS(facB1,facA1));
        if (xprExpand(pReturn) == pfFac) {return pReturn} //test factored expression 1
        pReturn = cMulS(fGcf,cMulS(facB2,facA1));
        if (xprExpand(pReturn) == pfFac) {return pReturn} //test factored expression 2 
        pReturn = "cMul("+fGcf+","+xReduce(cDivS(pfFac,fGcf))+")";
        if (xprExpand(pReturn) == pfFac && fGcf != 1) {return pReturn} //test factored expression 3
        return pfFac
    }
    function asFactor(asFac) { //factor out vars and coefficients from cAdd and cSub
        var sFac = parsePoly(asFac);
        var sInv = cDissect(asFac);
        var asReturn = asFac;
        if (sFac.length > 1 && sInv.length > 1) {
            var tFactor = 1;
            var fReturn = 0;
            for (var xI in sInv) {
                if (!nbrTest(sInv[xI]) && typeof sInv[xI] != "undefined") {
                    tFactor = cMulS(sInv[xI],tFactor);
                    for (var yI in sFac) {
                        if (!strTest(sFac[yI],sInv[xI])) {tFactor = cDivS(tFactor,sInv[xI]);break}
                        if (strTest(xReduce(cDivS(sFac[yI],sInv[xI])),sInv[xI])) {tFactor = cDivS(tFactor,sInv[xI]);break}
                    }
                }
            }
            tFactor = xReduce(cMulS(tFactor,aGcf(pCoeff(sFac))));
            for (var zI in sFac) {fReturn = cAddS(fReturn,xReduce(cDivS(sFac[zI],tFactor)))} //sum terms
            asReturn = xReduce(cMulS(tFactor,pFactor(fReturn)));
        }
        if (xprExpand(asReturn) != xReduce(asFac)) {asReturn = asFac} //test factored expression
        return asReturn
    }
    //
    function xprFactor(xFac) { //factor expression
        factorFlag = true;
        var facReturn = execFunc("cnt("+xReduce(xFac)+")",factorFunc);
        factorFlag = false;
        if (strTest(facReturn,"undefined")) {facReturn = xFac}
        return facReturn
    }
    
    //Range/domain of expression in FUNC format
    function xprRange(xR)  {
        function nEqual(nZ,nC) { //range not equal
            var zArray = [],zString = "",iZ = 0;
            var zVars = cInventory(nZ+"+"+nC);
            if (zVars.length > 0) {
                for (iZ in zVars) {zArray[iZ] = mgTrans.mgExport(xprSolve(mgTrans.cFunc(nZ+"Cv[8800]"+nC),zVars[iZ]))}
                for (iZ in zVars) {
                    if (!strTest(zArray[iZ],"Cv[8734]")) {
                        zString = zString+zArray[iZ];
                        if (iZ < zArray.length-1) {zString = zString+"Cv[10044]"}
                    }
                }
            }
            return zString
        }
        const rangeDomFunc = {
        cDiv: function (xU,xL) {dArray.push(nEqual(xL,"0"));return "cDiv("+xU+","+xL+")"},
        nrt: function (xU,xL)  {dArray.push(nEqual(xU,"0"));return "nrt("+xU+")"},
        lgn: function (xU,xL)  {dArray.push(nEqual(xL,"0"));dArray.push(nEqual(xU,"0"));return "lgn("+xU+")"},
        lne: function (xU) {if (mgConfig.Domain == "Real") {dArray.push(xU+"Cv[62]0")} else {dArray.push(nEqual("0",xU))};return "lne("+xU+")"},
        log: function (xU) {if (mgConfig.Domain == "Real") {dArray.push(xU+"Cv[62]0")} else {dArray.push(nEqual("0",xU))};return "log("+xU+")"},
        sqt: function (xU) {if (mgConfig.Domain == "Real") {dArray.push(xU+"Cv[8805]0")};return "sqt("+xU+")"},
        tan: function (xU) {dArray.push(nEqual(xU,mgTrans.mgExport(cDivS(invMult,2))));return "tan("+xU+")"},
        cot: function (xU) {dArray.push(nEqual(xU,"0"));return "cot("+xU+")"},
        csc: function (xU) {dArray.push(nEqual(xU,"0"));return "csc("+xU+")"},
        sec: function (xU) {dArray.push(nEqual(xU,mgTrans.mgExport(cDivS(invMult,2))));return "sec("+xU+")"},
        asn: function (xU) {dArray.push(mgTrans.mgExport(cNegS(cDivS(invMult,2)))+"Cv[8804]"+xU+"Cv[8804]"+mgTrans.mgExport(cDivS(invMult,2)));return "asn("+xU+")"},
        acs: function (xU) {dArray.push("0"+"Cv[8804]"+xU+"Cv[8804]"+invMult);return "acs("+xU+")"},
        atn: function (xU) {dArray.push(mgTrans.mgExport(cNegS(cDivS(invMult,2)))+"Cv[8804]"+xU+"Cv[8804]"+mgTrans.mgExport(cDivS(invMult,2)));return "atn("+xU+")"},
        act: function (xU) {dArray.push("0"+"Cv[8804]"+xU+"Cv[8804]"+invMult);return "act("+xU+")"},
        asc: function (xU) {dArray.push("0"+"Cv[8804]"+xU+"Cv[8804]"+invMult);return "asc("+xU+")"},
        acc: function (xU) {dArray.push(mgTrans.mgExport(cNegS(cDivS(invMult,2)))+"Cv[8804]"+xU+"Cv[8804]"+mgTrans.mgExport(cDivS(invMult,2)));return "acc("+xU+")"},
        ach: function (xU) {dArray.push(xU+"Cv[8805]1");return "ach("+xU+")"},
        ath: function (xU) {dArray.push(xU+"Cv[8805]1");return "ath("+xU+")"},
        axh: function (xU) {dArray.push("0Cv[8804]"+xU+"Cv[8804]1");return "axh("+xU+")"},
        azh: function (xU) {dArray.push("-1Cv[8804]"+xU+"Cv[8804]1");return "azh("+xU+")"},
        }
        //
        var xRangDom = "",dArray = [],xArray = [],xC = 0,rString = "",vars = cInventory(xR);
        xRangDom = String(xR);
        for (xC in vars) { //list of variables in domain
            if (xC < vars.length-1) {rString = rString+vars[xC]+"Cv[10044]"} //add comma between terms
            else {rString = rString+vars[xC]}
        }
        if (mgConfig.Domain == "Real" && rString != "") {rString = rString+"Cv[8712]Cv[8477]"}
        if (mgConfig.Domain == "Complex" && rString != "") {rString = rString+"Cv[8712]Cv[8450]"}
        execFunc(xRangDom,rangeDomFunc);
        for (xC in dArray) {// fix dups/blanks
            if (!strTest(xArray,dArray[xC]) && dArray[xC] && !strTest(dArray[xC],"undefined") && !strTest(dArray[xC],"Cv[8734]")) {xArray.push(dArray[xC])}
        }
        xArray.sort();
        if (xArray.length > 0) {rString = rString+"Cv[59]"}
        for (xC in xArray) { //list of variable ranges
            if (xC < xArray.length-1) {rString = rString+xArray[xC]+"Cv[10044]"} //add comma between terms
            else {rString = rString+xArray[xC]}
        }
        return rString
    }

    //Numerical Math Functions
    const numFunc = {
    cPow: function (xU,xL) {return cPow(xU,xL)},
    cMul: function (xU,xL) {return cMul(xU,xL)},
    cTms: function (xU,xL) {return cTms(xU,xL)},
    cDot: function (xU,xL) {return cDot(xU,xL)},
    cDiv: function (xU,xL) {return cDiv(xU,xL)},
    cAdd: function (xU,xL) {return cAdd(xU,xL)},
    cSub: function (xU,xL) {return cSub(xU,xL)},
    cAng: function (xU,xL) {return cAng(xU,xL)},
    cNeg: function (xU)    {return cNeg(xU)},
    nrt: function (xU,xL)  {return nrt(xU,xL)},
    lgn: function (xU,xL)  {return lgn(xU,xL)},
    lne: function (xU) {return lne(xU)},
    log: function (xU) {return log(xU)},
    sqt: function (xU) {return sqt(xU)},
    cbt: function (xU) {return cbt(xU)},
    sin: function (xU) {return sin(xU)},
    cos: function (xU) {return cos(xU)},
    tan: function (xU) {return tan(xU)},
    cot: function (xU) {return cot(xU)},
    csc: function (xU) {return csc(xU)},
    sec: function (xU) {return sec(xU)},
    snh: function (xU) {return snh(xU)},
    csh: function (xU) {return csh(xU)},
    tnh: function (xU) {return tnh(xU)},
    sch: function (xU) {return sch(xU)},
    cch: function (xU) {return cch(xU)},
    cth: function (xU) {return cth(xU)},
    asn: function (xU) {return asn(xU)},
    acs: function (xU) {return acs(xU)},
    atn: function (xU) {return atn(xU)},
    act: function (xU) {return act(xU)},
    asc: function (xU) {return asc(xU)},
    acc: function (xU) {return acc(xU)},
    ash: function (xU) {return ash(xU)},
    ach: function (xU) {return ach(xU)},
    ath: function (xU) {return ath(xU)},
    axh: function (xU) {return axh(xU)},
    ayh: function (xU) {return ayh(xU)},
    azh: function (xU) {return azh(xU)},
    exp: function (xU) {return exp(xU)},
    abs: function (xU) {return abs(xU)},
    erf: function (xU) {return erf(xU)},
    efc: function (xU) {return efc(xU)},
    gam: function (xU) {return gam(xU)},
    det: function (xU) {return det(xU)},
    trc: function (xU) {return trc(xU)},
    cdf: function (xU) {return cdf(xU)},
    pdf: function (xU) {return pdf(xU)},
    lcf: function (xU) {return lcf(xU)},
    lpf: function (xU) {return lpf(xU)},
    rou: function (xU) {return rou(xU)},
    rnd: function (xU) {return rnd(xU)},
    rex: function (xU) {return rex(xU)},
    imx: function (xU) {return imx(xU)},
    int: function (xU) {return int(xU)},
    cei: function (xU) {return cei(xU)},
    arg: function (xU) {return arg(xU)},
    con: function (xU) {return con(xU)},
    }
    function xprNumeric(xNum) { //execute numeric expression
        xNum = String(xNum);
        var nVars = cInventory(xNum);
        xNum = xNum.replace(/Cv\[46\]/g,"cpx(0,1)"); //substitute imaginary constant
        for (var xC=0;xC<46;xC++) { //substitute constants
            var rgx = new RegExp("Cv\\["+xC+"\\]","g");
            xNum = xNum.replace(rgx,String(Cv[xC]))
        }
        for (var xV in nVars) { //substitute variables
            var rgy = new RegExp("Cv\\["+xV+"\\]","g");
            xNum = xNum.replace(rgy,String(Cv[xV]))
        }
        return execFunc(xNum,numFunc)
    }
    function getType(xT) { //return numerical object type
        var tReturn = "undefined";
        if (typeof xT != "undefined") {
            if (nbrTest(xT)) {tReturn = "real"}
            else if (typeof xT == "object") {
                if (nbrTest(xT.r) && mgConfig.Domain == "Complex") {tReturn = "complex"}
                else if (typeof xT[0] == "object") {tReturn = "matrix"}
                else if (typeof xT[0] != "object") {tReturn = "array"}
            }
            else {
                var xTractU = opExtract(xT);
                if (xTractU.func == "cpx" && mgConfig.Domain == "Complex") {tReturn = "complex"}
                else if (xTractU.func == "vct" || xTractU.func =="vec") {tReturn = "vector"}
                else if (xTractU.func == "mat" && opExtract(xTractU.upper).func == "mat") {tReturn = "matrix"}
                else if (xTractU.func == "mat") {tReturn = "array"}
            }
        }
        return tReturn
    }
    function fmtResult(xIn) { //format numerical output
        var nReturn = "undefined";
        if (getType(xIn) == "complex") {
            var cIn = toCplx(xIn),cT = 7;
            if (mgConfig.dPrecision < 7) {cT = mgConfig.dPrecision}
            if (cIn.r == "Infinity" || cIn.i == "Infinity") {nReturn = "Cv[8734]"}
            else if (cIn.r == "-Infinity" || cIn.i == "-Infinity") {nReturn = "cNeg(Cv[8734])"}
            else if (cIn.i == 0) {nReturn = roundDecTo(cIn.r)}
            else if (mgConfig.cplxFmt == "Polar") {
                nReturn = "cAng("+roundDecTo(abs(cIn),cT)+","+roundDecTo(cDiv(arg(cMul(cIn,mgConfig.trigBase)),mgConfig.trigBase),cT)+")";
            }
            else {
                if (abs(cIn.i*1e6) < abs(cIn.r)) {cIn.i = 0}
                if (abs(cIn.r*1e6) < abs(cIn.i)) {cIn.r = 0}
                nReturn = cpx(roundDecTo(cIn.r,cT),roundDecTo(cIn.i,cT));
            }
        }
        else if (getType(xIn) == "matrix" || getType(xIn) == "array") {
            var mReturn = matArray(xIn);
            for (var iR in mReturn) {mReturn[iR] = fmtResult(mReturn[iR])}
            nReturn = matFunc(mReturn);
        }
        else if (getType(xIn) == "vector") {
            var vReturn = vecArray(xIn);
            for (var iR in vReturn) {vReturn[iR] = fmtResult(vReturn[iR])}
            nReturn = vct(vReturn);
        }
        else { //real numbers
            if (xIn == "Infinity") {nReturn = "Cv[8734]"}
            else if (xIn == "-Infinity") {nReturn = "cNeg(Cv[8734])"}
            else if (nbrTest(xIn)) {nReturn = roundDecTo(xIn)}
        }
        return nReturn
    }
    function roundDecTo(xD,xT) { //round decimal to xT digits
        function expNotation(xN) { //format number in N.NNe+-x
            xN = String(xN);
            var eReturn = xN;
            var sgn = "",tmp = 0;
            if (xN != "0") {
                for (var iSc=-323;iSc<308;iSc++) {
                    tmp = cDiv(xN,cPow(10,iSc));
                    if (iSc >= 0) {sgn = "+"}
                    if ((abs(tmp) >= 1)&&(abs(tmp) < 10)) {break}
                }
                eReturn = tmp + "e" + sgn + iSc;
            }
            return eReturn
        }
        var nReturn;
        if (typeof xT == "undefined" ) {xT = mgConfig.dPrecision}
        if (+(xD) < 1 || xD >= 1e12) {xD = expNotation(xD)}
        xD = String(xD);
        var yD = xD.replace(/.*\./,"");
        yD = yD.replace(/e.*/,"")+"000000000000000000";
        var zD = rou(cDiv(yD.substring(xT-1,xT+1),10));
        yD = yD.substring(0,xT-1);
        var uD = '.'+yD+zD;
        for (var nTd=uD.length;nTd>=0;nTd--) {if (uD.charAt(nTd) == "0") {uD = uD.substr(0,nTd)} else {break}}
        if (xD >= 1e12) {nReturn = xD.replace(/\.\d+/,uD)}
        else {nReturn = +(xD.replace(/\.\d+/,uD))}
        return nReturn
    }
    function vct() {return "vct(" + Array.prototype.slice.call(arguments) + ")"} //format vector object
    function cpx(xU,xL) { //format cpx object
        var nReturn = xU;
        if (+xL != 0) {nReturn = "cpx(" + xU + "," + xL + ")"}
        return nReturn
    }
    function toCplx(xU) { //change type to complex
        var nReturn = xU;
        if (getType(xU) == "complex" && typeof xU != "object") {
            var xTractU = opExtract(xU);
            nReturn = {r:(+xTractU.upper),i:(+xTractU.lower)};
        } 
        if (getType(xU) == "real") {nReturn = {r:xU,i:0}}
        return nReturn
    }
    function toReal(xU) { //change type to real, dropping any imaginary components
        var nReturn = xU;
        if (getType(xU) == "complex") {
            if (typeof xU == "object") {nReturn = xU.r}
            else {nReturn = +(opExtract(xU).upper)}
        } 
        return nReturn
    }

    // arithmetic operators

    function cNeg(xU) { //negative
        return cMul(-1,xU)
    }
    function cSub(xU,xL) { //subtract
        return cAdd(xU,cNeg(xL))
    }
    function cAdd(xU,xL) { //add
        var nReturn = "undefined";
        if (getType(xU) == "real" && getType(xL) == "real") {
            return (+xU)+(+xL)
        }
        else if (getType(xU) == "complex" || getType(xL) == "complex") {
            var cA = toCplx(xU),cB = toCplx(xL);
            nReturn = cpx((cAdd(+cA.r,+cB.r)),(cAdd(+cA.i,+cB.i)))
        }
        else if (["matrix","array"].indexOf(getType(xU))+1 && ["matrix","array"].indexOf(getType(xL))+1) {
            xU = matArray(xU);xL = matArray(xL);
            var mReturn = xU;
            if (xU.length == xL.length) {
                for (var iR in xU) {mReturn[iR] = cAdd(xU[iR],xL[iR])}
                nReturn = matFunc(mReturn);
            }
        }
        else if (getType(xU) == "vector" && getType(xL) == "vector") {
            xU = vecArray(xU);xL = vecArray(xL);
            var vReturn = xU;
            if (xU.length == xL.length) {
                for (var iR in xU) {vReturn[iR] = cAdd(xU[iR],xL[iR])}
                nReturn = vct(vReturn)
            }           
        }
        return nReturn
    }
    function cMul(xU,xL) { //multiply by term
        function scalarMult(xM,xC) { //matrix scalar multiply
            xM = matArray(xM);
            var mReturn = xM;
            for (var iR in xM) {mReturn[iR] = cMul(xM[iR],xC)}
            return mReturn
        }
        var nReturn = "undefined";
        if (xL == Cv[45]) {nReturn = fac(xU)} //factorial
        else if (getType(xU) == "real" && getType(xL) == "real") {nReturn = (+xU)*(+xL)}
        else if (["matrix","array"].indexOf(getType(xU))+1 && ["complex","real"].indexOf(getType(xL))+1) {nReturn = matFunc(scalarMult(xU,xL))}
        else if (["matrix","array"].indexOf(getType(xL))+1 && ["complex","real"].indexOf(getType(xU))+1) {nReturn = matFunc(scalarMult(xL,xU))}
        else if (getType(xU) == "vector" && ["complex","real"].indexOf(getType(xL))+1) {nReturn = vct(scalarMult(xU,xL))}
        else if (getType(xL) == "vector" && ["complex","real"].indexOf(getType(xU))+1) {nReturn = vct(scalarMult(xL,xU))}
        else if (getType(xU) == "matrix" && getType(xL) == "matrix") { //matrix multiply
            xU = matArray(xU);xL = matArray(xL);
            var mReturn = "";
            if (xL.length == xU[0].length) {
            mReturn = matCreate(xU.length,xL[0].length);
                for (var rU in xU) {
                    for (var cL in xL[0]) {
                        for (var cU in xU[0]) {
                            var mTemp = cMul(xU[rU][cU],xL[cU][cL]);
                            if (mReturn[rU][cL] == 0) {mReturn[rU][cL] = mTemp}
                            else {mReturn[rU][cL] = cAdd(mReturn[rU][cL],mTemp)}
                        }
                    }
                }
            }
            nReturn = matFunc(mReturn)
        }
        else if (getType(xU) == "complex" || getType(xL) == "complex") {
            var cA = toCplx(xU),cB = toCplx(xL);
            nReturn = cpx(cSub(cMul(cA.r,cB.r),cMul(cA.i,cB.i)), cAdd(cMul(cA.i,cB.r),cMul(cA.r,cB.i)))
        }
        return nReturn
    }
    function cTms(xU,xL) { //multiply by * (cross product)
        var nReturn = "undefined";
        if (getType(xU) == "vector" && getType(xL) == "vector") {
            xU = vecArray(xU);xL = vecArray(xL);
            if (xL.length == xU.length) {
                var vReturn = [];
                if (xL.length == 3) {
                    vReturn[0] = cSub(cMul(xU[1],xL[2]),cMul(xU[2],xL[1]));
                    vReturn[1] = cSub(cMul(xU[2],xL[0]),cMul(xU[0],xL[2]));
                    vReturn[2] = cSub(cMul(xU[0],xL[1]),cMul(xU[1],xL[0]));
                    nReturn = vct(vReturn)
                }
            }     
        }
        else {nReturn = cMul(xU,xL)}
        return nReturn
    }
    function cDot(xU,xL) { //dot product (Cv[8226] operator)
        var nReturn = "undefined";
        if (getType(xU) == "vector" && getType(xL) == "vector") {
            xU = vecArray(xU);xL = vecArray(xL);
            if (xL.length == xU.length) {
                var vReturn = 0;
                for (var cU in xU) {vReturn = cAdd(vReturn,cMul(xU[cU],xL[cU]))}
                nReturn = vReturn
            }
        }
        else {nReturn = cMul(xU,xL)}
        return nReturn
    }
    function cDiv(xU,xL) { //divide
        var nReturn = "undefined";
        if (getType(xU) == "real" && getType(xL) == "real") {nReturn = (+xU)/(+xL)}
        else if (getType(xU) == "complex" || getType(xL) == "complex") {
            var cA = toCplx(xU),cB = toCplx(xL);
            if (abs(cB.r) >= abs(cB.i)) {
                var rX=cDiv(cB.i,cB.r), sX=cAdd(cB.r,cMul(rX,cB.i));
                nReturn = cpx(cDiv(cAdd(cA.r,cMul(cA.i,rX)),sX), cDiv(cSub(cA.i,cMul(cA.r,rX)),sX))
            }
            else {
                var rX=cDiv(cB.r,cB.i), sX=cAdd(cB.i,cMul(rX,cB.r));
                nReturn = cpx(cDiv(cAdd(cMul(cA.r,rX),cA.i),sX), cDiv(cSub(cMul(cA.i,rX),cA.r),sX))
            }
        }
        return nReturn
    }
    function cPow(xU,xL) { //powers xU^xL
        var nReturn = "undefined";
        if (getType(xU) == "matrix" && getType(xL) == "real") {
            xU = matArray(xU);
            if (xL == int(xL)) {
                if (xL <= -1) {nReturn = cPow(inv(xU),cNeg(xL))} //inverse matrix powers
                else if (xL == 0)  {nReturn = matFunc(matIdentity(xU))} //identity matrix
                else {
                    var mReturn = xU;
                    for (var iM=1;iM<xL;iM++) {mReturn = cMul(mReturn,xU)}
                    nReturn = matFunc(mReturn)
                }
            }
        }
        else if (getType(xU) == "real" && getType(xL) == "real" && nbrTest(Math.pow(xU,xL))) {nReturn =  Math.pow(xU,xL)}
        else {
            var cTmp = toCplx(cMul(lne(xU),xL));
            var eTmp = cpx(cMul(Math.pow(Cv[8],cTmp.r),cos(cTmp.i)), cMul(Math.pow(Cv[8],cTmp.r),sin(cTmp.i)))
            nReturn =  cDiv(rou(cMul(eTmp,dRound)),dRound);
        }
        return nReturn
    }

    //matrix operations
    function det(xU) { //matrix determinant
        var mReturn = xU;
        if (getType(xU) == "matrix") {
            xU = matArray(xU);
            mReturn = "undefined";
            var rowsU = xU.length;
            if (rowsU == xU[0].length) {
                mReturn = 0;
                if (rowsU == 2) {mReturn = cSubS(cMulS(det(xU[0][0]),det(xU[1][1])),cMulS(det(xU[0][1]),det(xU[1][0])))}
                else {for (var rU in xU) {mReturn = cAddS(mReturn,cMulS(det(matMinor(xU,0,rU)),matInvSign(xU)[0][rU]))}}
            }
        }
        return mReturn
    }
    function trc(xU) { //matrix trace
        var mReturn = "undefined";
        if (getType(xU) == "matrix") {
            xU = matArray(xU);
            if (xU.length == xU[0].length) {
                mReturn = 0;
                for (var rU in xU) {mReturn = cAddS(mReturn,xU[rU][rU])}
                mReturn = matFunc(mReturn)
            }
        }
        return mReturn
    }
    function trn(xU) { //matrix transpose
        var mReturn = xU;
        if (getType(xU) == "matrix") {
            xU = matArray(xU);
            mReturn = matCreate(xU[0].length,xU.length);
            for (var iR in xU) {for (var iC in xU[0]) {mReturn[iC][iR] = trn(xU[iR][iC])}}
            mReturn = matFunc(mReturn)
        }
        return mReturn
    }
    function inv(xU) { //matrix inverse
        var mReturn = "undefined";
        if (getType(xU[0][0]) == "matrix") {
            xU = matArray(xU);
            var rowsU = xU.length;
            if (rowsU == xU[0].length) {
                mReturn = matCreate(rowsU,rowsU);
                for (var iR in xU) {for (var iC in xU) {mReturn[iR][iC] = inv(xU[iR][iC])}}
                mReturn = matFunc(mReturn)
            }
        }
        else {mReturn = cMul(cDiv(1,det(xU)),trn(matCofac(xU)))}
        return mReturn
    }
    function matCreate(rowsU,colsU) { //create new zero matrix array
        var mReturn = new Array(rowsU);
        for (var rU=0;rU<rowsU;rU++) {mReturn[rU] = new Array(colsU);mReturn[rU] = Array.apply(null, Array(colsU)).map(Number.prototype.valueOf,0)}
        return mReturn
    }
    function matIdentity(xU) { //matrix identity
        var mReturn = 1;
        if (getType(xU) == "matrix") {
            xU = matArray(xU);
            var rowsU = xU.length;
            mReturn = "undefined";
            if (rowsU == xU[0].length) {
                mReturn = matCreate(rowsU,rowsU);
                for (var iR in xU) {
                    for (var iC in xU[0]) {
                        if (iR == iC) {
                            if (getType(xU[iR][iC]) == "matrix") {mReturn[iR][iC] = matIdentity(xU[iR][iC])}
                            else {mReturn[iR][iC] = 1}
                        }
                        else {
                            if (getType(xU[iR][iC]) == "matrix") {mReturn[iR][iC] = matCreate(xU[iR][iC].length,xU[iR][iC][0].length)}
                            else {mReturn[iR][iC] = 0}
                        }
                    }
                }
            }
        }
        return mReturn
    }
    function matInvSign(xU) { //alternate cell invert sign matrix
        var mReturn = xU;
        if (getType(xU) == "matrix") {
            xU = matArray(xU);
            var rowsU = xU.length;
            var rowFac = 1;
            mReturn = matCreate(rowsU,rowsU);
            for (var iR in xU) {
                var colFac = rowFac;
                for (var iC in xU) {
                    mReturn[iR][iC] = cMulS(colFac,xU[iR][iC]);
                    colFac = cNeg(colFac);
                }
                rowFac = cNeg(rowFac);
            }
        }
        return mReturn
    }
    function matCofac(xU) { //matrix cofactor
        var mReturn = xU;
        if (getType(xU) == "matrix") {
            xU = matArray(xU);
            var rowsU = xU.length;
            mReturn = "undefined";
            if (rowsU == xU[0].length) {
                mReturn = matCreate(rowsU,rowsU);
                for (var iR in xU) {
                    for (var iC in xU) {mReturn[iR][iC] = det(matMinor(xU,iR,iC))}
                }
                mReturn = matInvSign(mReturn)
            }
        }
        return mReturn
    }
    function matMinor(xU,row,col) { //generate matrix minors
        xU = matArray(xU);
        var rowsU = xU.length;
        var mReturn = "undefined";
        if (rowsU == xU[0].length) {
            mReturn = new Array(rowsU-1);
            for (var iT=0;iT<rowsU-1;iT++) {mReturn[iT] = []}
            var oRow = 0;
            for (var iR in xU) {
                if (iR != row) {
                    for (var iC in xU) {if (iC != col) {mReturn[oRow].push(xU[iR][iC])}}
                    oRow++;
                }
            }
        }
        return mReturn
    }

    //numerical functions
    function cAng(xU,xL) { //complex polar form
        var nReturn = "undefined";
        if (getType(xU) == "real" && getType(xL) == "real") {nReturn = cMul(xU,cAdd(cos(xL),cMul(Cv[46],sin(xL))))}
        return nReturn
    }
    function arg(xU) { //arg(x)
        var nReturn = "undefined";
        if (getType(xU) == "complex" || getType(xU) == "real" ) {
            var cA = toCplx(xU);
            if (cA.r > 0) {nReturn = atn(cDiv(cA.i,cA.r))}
            else if (cA.r < 0 && cA.i >= 0) {nReturn = cAdd(Cv[29],atn(cDiv(cA.i,cA.r)))}
            else if (cA.r < 0 && cA.i < 0)  {nReturn = cAdd(cNeg(Cv[29]),atn(cDiv(cA.i,cA.r)))}
            else if (cA.r == 0 && cA.i > 0) {nReturn = cDiv(Cv[29],2)}
            else if (cA.r == 0 && cA.i < 0) {nReturn = cNeg(cDiv(Cv[29],2))}
            else {nReturn = 0}
        }
        return nReturn
    }
    function rex(xU) { //real part of complex number
        var nReturn = "undefined";
        if (getType(xU) == "complex") {nReturn = toCplx(xU).r}
        if (getType(xU) == "real") {nReturn = xU}
        return nReturn
    }
    function imx(xU) { //imaginary part of complex number
        var nReturn = "undefined";
        if (getType(xU) == "complex") {nReturn = cpx(0,toCplx(xU).i)}
        if (getType(xU) == "real") {nReturn = 0}
        return nReturn
    }
    function con(xU) { //complex conjugate
        var nReturn = "undefined";
        if (getType(xU) == "complex") {xU = toCplx(xU);nReturn = cpx(xU.r, (cNeg(xU.i)))}
        if (getType(xU) == "real" && mgConfig.Domain == "Complex") {nReturn = cpx(xU, 0)}
        return nReturn
    }
    function exp(xU) { //exp(x)
        var nReturn = "undefined";
        if (getType(xU) == "complex") {xU = toCplx(xU);nReturn = cpx(cMul(cPow(Cv[8],xU.r),cos(xU.i)), cMul(cPow(Cv[8],xU.r),sin(xU.i)))}
        if (getType(xU) == "real") {nReturn = cPow(Cv[8],xU)}
        return nReturn
    }
    function lne(xU) {//natural log
        function cAbs(xA) {
            var cReturn = 0;
            if (abs(xA.r) > abs(xA.i)) {cReturn = cMul(abs(xA.r),sqt(cAdd(1,cMul(cDiv(xA.i,xA.r),cDiv(xA.i,xA.r)))))}
            else {cReturn = cMul(abs(xA.i),sqt(cAdd(1,cMul(cDiv(xA.r,xA.i),cDiv(xA.r,xA.i)))))}
            return cReturn
        }
        var nReturn = "undefined";
        if (getType(xU) == "complex" || xU < 0) {var cA = toCplx(xU);nReturn = cpx(Math.log(cAbs(cA)), arg(cA))}
        else if (getType(xU) == "real")  {nReturn = Math.log(xU)}
        return nReturn
    }
    function log(xU) {return lne(xU)} //natural log
    function lgn(xU,xL) {return cDiv(lne(xL),lne(xU))} //log base n
    function sqt(xU) {//square root
        var nReturn;
        if (nbrTest(cPow(xU,0.5))) {
            if (xU == cPow(rou(cPow(xU,0.5)),2)) {nReturn = rou(cPow(xU,0.5))} //preserve integers
            else {nReturn = cPow(xU,0.5)}
        }
        else {nReturn = cPow(xU,0.5)}
        return nReturn
    }
    function cbt(xU) { //cube root
        var nReturn;
        if (getType(cPow(xU,cDiv(1,3))) == "real") {
            if (xU == cPow(rou(cPow(xU,cDiv(1,3))),3)) {nReturn = rou(cPow(xU,cDiv(1,3)))} //preserve integers
            else {nReturn = cPow(xU,cDiv(1,3))}
        }
        else {nReturn = cPow(xU,cDiv(1,3))}
        return nReturn
    }
    function nrt(xU,xL) { //n'th root
        var nReturn;
        if (getType(xU) == "real" && getType(xL) == "real") {
            if (xL == cPow(rou(cPow(xL,cDiv(1,xU))),xU)) {nReturn = rou(cPow(xL,cDiv(1,xU)))} //preserve integers
            else {nReturn = cPow(xL,cDiv(1,xU))}
        }
        else {nReturn = cPow(xL,cDiv(1,xU))}
        return nReturn
    }
    function abs(xU) {//absolute value
        var nReturn = "undefined";
        if (getType(xU) == "complex") {xU = toCplx(xU);nReturn = sqt(cAdd((cMul(xU.r,xU.r)),(cMul(xU.i,xU.i))))}
        if (getType(xU) == "real") {
            if (xU < 0) {nReturn = cNeg(xU)}
            else {nReturn = xU}
        }
        if (getType(xU) == "vector") {
            xU = vecArray(xU);
            var vReturn = 0;
            for (var xI in xU) {vReturn = cAdd(vReturn,cPow(xU[xI],2))}
            nReturn = sqt(vReturn)
        }
        return nReturn
    }
    function int(xU) { //floor
        var nReturn = "undefined";
        if (getType(xU) == "complex") {xU = toCplx(xU);nReturn = cpx(int(xU.r), int(xU.i))}
        if (getType(xU) == "real") {
            if (xU == rou(xU)) {nReturn = xU}
            else if (xU < rou(xU)) {nReturn = cSub(rou(xU),1)}
            else {nReturn = rou(xU)}
        }
        return nReturn
    }
    function cei(xU) { //ceiling
        var nReturn = "undefined";
        if (getType(xU) == "complex") {xU = toCplx(xU);nReturn = cpx(cei(xU.r), cei(xU.i))}
        if (getType(xU) == "real") {
            if (xU == rou(xU)) {nReturn = xU}
            else if (xU > rou(xU)) {nReturn = cAdd(rou(xU),1)}
            else {nReturn = rou(xU)}
        }
        return nReturn
    }
    function rou(xU) { //round
        var nReturn = "undefined";
        if (getType(xU) == "complex") {xU = toCplx(xU);nReturn = cpx(rou(xU.r), rou(xU.i))}
        if (getType(xU) == "real") {nReturn = Math.round(+xU)}
        return nReturn
    }

    //trig functions
    function  trigRound(xU) { //preserve integers or halves on trig and hyp functions
        var nReturn = xU;
        var tReturn = cDiv(rou(cMul(xU,dRound)),dRound);
        if (tReturn == rou(tReturn) || tReturn == cAdd(int(tReturn),0.5)) {nReturn = tReturn}
        return nReturn
        }
    function sin(xU) { //sine
        var nReturn = "undefined";
        xU = cMul(xU,mgConfig.trigBase)
        if (getType(xU) == "complex") {nReturn = cMul(cMul(-1,Cv[46]),snh(cMul(Cv[46],xU)))}
        if (getType(xU) == "real") {nReturn = trigRound(Math.sin(toReal(xU)))}
        return nReturn
    }
    function cos(xU) { //cosine
        var nReturn = "undefined";
        xU = cMul(xU,mgConfig.trigBase)
        if (getType(xU) == "complex") {nReturn = csh(cMul(Cv[46],xU))}
        if (getType(xU) == "real") {nReturn = trigRound(Math.sin(cSub(cDiv(Cv[29],2),xU)))}
        return nReturn
    }
    function tan(xU) { //tangent
        var nReturn = "undefined";
        if (getType(xU) == "complex") {nReturn = cDiv(sin(xU),cos(xU))}
        if (getType(xU) == "real") {nReturn = trigRound(cDiv(sin(xU),cos(xU)))}
        return nReturn
    }
    function cot(xU) { //cotangent
        var nReturn = "undefined";
        if (getType(xU) == "complex") {nReturn = cDiv(cos(xU),sin(xU))}
        if (getType(xU) == "real") {nReturn = trigRound(cDiv(cos(xU),sin(xU)))}
        return nReturn
    }
    function sec(xU) { //secant
        var nReturn = "undefined";
        if (getType(xU) == "complex") {nReturn = cDiv(1,cos(xU))}
        if (getType(xU) == "real") {nReturn = trigRound(cDiv(1,cos(xU)))}
        return nReturn
    }
    function csc(xU) {//cosec
        var nReturn = "undefined";
        if (getType(xU) == "complex") {nReturn = cDiv(1,sin(xU))}
        if (getType(xU) == "real") {nReturn = trigRound(cDiv(1,sin(xU)))}
        return nReturn
    }
    function asn(xU) {//asin
        var nReturn = "undefined";
        if (getType(xU) == "complex" || xU < -1 || xU > 1) {nReturn = cDiv(cMul(cMul(-1,Cv[46]),lne(cAdd(cMul(Cv[46],xU),sqt(cAdd(1,cMul(-1,cPow(xU,2))))))),mgConfig.trigBase)}
        if (getType(xU) == "real") {nReturn = trigRound(cMul(2,atn(cDiv(xU,cAdd(1,sqt(cSub(1,cPow(xU,2))))))))}
        return nReturn
    }
    function acs(xU) {//acos
        var nReturn = "undefined";
        if (getType(xU) == "complex" || xU < -1 || xU > 1) {nReturn = cDiv(cMul(cMul(-1,Cv[46]),lne(cAdd(xU,cMul(Cv[46],sqt(cAdd(1,cMul(cPow(xU,2),-1))))))),mgConfig.trigBase)}
        if (getType(xU) == "real") {nReturn = trigRound(cMul(2,atn(cDiv(sqt(cSub(1,cPow(xU,2))),cAdd(1,xU)))))}
        return nReturn
    }
    function atn(xU) {//atan
        var nReturn = "undefined";
        if (getType(xU) == "complex") {nReturn = cDiv(cMul(cDiv(Cv[46],2),cAdd(lne(cAdd(1,cMul(-1,cMul(Cv[46],xU)))),cMul(-1,(lne(cAdd(1,cMul(Cv[46],xU))))))),mgConfig.trigBase)}
        if (getType(xU) == "real") {nReturn = trigRound(cDiv(Math.atan(toReal(xU)),mgConfig.trigBase))}
        return nReturn
    }
    function asc(xU) {//asec
        var nReturn = "undefined";
        if (getType(xU) == "complex" || (xU > -1 && xU < 1)) {nReturn = acs(cDiv(1,xU))}
        if (getType(xU) == "real") {nReturn = trigRound(acs(cDiv(1,xU)))}
        return nReturn
    }
    function acc(xU) {//acosec
        var nReturn = "undefined";
        if (getType(xU) == "complex") {nReturn = asn(cDiv(1,xU))}
        if (getType(xU) == "real") {nReturn = trigRound(asn(cDiv(1,xU)))}
        return nReturn
    }
    function act(xU) {//acotan
        var nReturn = "undefined";
        if (getType(xU) == "complex") {nReturn = atn(cDiv(1,xU))}
        if (getType(xU) == "real") {nReturn = trigRound(atn(cDiv(1,xU)))}
        return nReturn
    }
    //hyperbolic functions
    function snh(xU) {//sinh
        var nReturn = "undefined";
        if (getType(xU) == "complex") {nReturn = cDiv(cSub(exp(xU),exp(cNeg(xU))),2)}
        if (getType(xU) == "real") {nReturn =  trigRound(cDiv(cSub(exp(xU),exp(cNeg(xU))),2))}
        return nReturn
    }
    function csh(xU) {//cosh
        var nReturn = "undefined";
        if (getType(xU) == "complex") {nReturn = cDiv(cAdd(exp(xU),exp(cMul(xU,-1))),2)}
        if (getType(xU) == "real") {nReturn =  trigRound(cDiv(cAdd(exp(xU),exp(cNeg(xU))),2))}
        return nReturn
    }
    function tnh(xU) {//tanh
        var nReturn = "undefined";
        if (getType(xU) == "complex") {nReturn = cDiv(snh(xU),csh(xU))}
        if (getType(xU) == "real") {nReturn =  trigRound(cDiv(snh(xU),csh(xU)))}
        return nReturn
    }
    function sch(xU) {//sech
        var nReturn = "undefined";
        if (getType(xU) == "complex") {nReturn = cDiv(1,csh(xU))}
        if (getType(xU) == "real") {nReturn = trigRound(cDiv(2,cAdd(exp(xU),exp(cNeg(xU)))))}
        return nReturn
    }
    function cch(xU) {//csch
        var nReturn = "undefined";
        if (getType(xU) == "complex") {nReturn = cDiv(1,snh(xU))}
        if (getType(xU) == "real") {nReturn = trigRound(cDiv(2,cSub(exp(xU),exp(cNeg(xU)))))}
        return nReturn
    }
    function cth(xU) {//coth
        var nReturn = "undefined";
        if (getType(xU) == "complex") {nReturn = cDiv(1,tnh(xU))}
        if (getType(xU) == "real") {nReturn = trigRound(cDiv(1,tnh(xU)))}
        return nReturn
    }
    //inverse hyperbolic
    function ash(xU) {//asinh
        var nReturn = "undefined";
        if (getType(xU) == "complex") {nReturn = lne(cAdd(xU,sqt(cAdd(cPow(xU,2),1))))}
        if (getType(xU) == "real") {nReturn = trigRound(lne(cAdd(xU,sqt(cAdd(cPow(xU,2),1)))))}
        return nReturn
    }
    function ach(xU) {//acosh
        var nReturn = "undefined";
        if (getType(xU) == "complex") {nReturn = lne(cAdd(xU,cMul(sqt(cAdd(xU,1)),sqt(cAdd(xU,-1)))))}
        if (getType(xU) == "real") {nReturn = trigRound(lne(cAdd(xU,sqt(cSub(cPow(xU,2),1)))))}
        return nReturn
    }
    function ath(xU) {//atanh
        var nReturn = "undefined";
        if (getType(xU) == "complex") {nReturn = cDiv((cAdd(lne(cAdd(1,xU)),cMul(lne(cAdd(1,cMul(-1,xU))),-1))),2)}
        if (getType(xU) == "real") {nReturn = trigRound(cDiv(lne(cDiv(cAdd(xU,1),cSub(1,xU))),2))}
        return nReturn
    }
    function axh(xU) {//asech
        var nReturn = "undefined";
        if (getType(xU) == "complex") {nReturn = lne(cAdd(cDiv(1,xU),sqt(cSub(cDiv(1,cPow(xU,2)),1))))}
        if (getType(xU) == "real") {nReturn = trigRound(lne(cAdd(cDiv(1,xU),sqt(cSub(cDiv(1,cPow(xU,2)),1)))))}
        return nReturn
    }
    function ayh(xU) {//acsch
        var nReturn = "undefined";
        if (getType(xU) == "complex") {nReturn = lne(cAdd(cDiv(1,xU),sqt(cAdd(cDiv(1,cPow(xU,2)),1))))}
        if (getType(xU) == "real") {nReturn = trigRound(lne(cAdd(cDiv(1,xU),sqt(cAdd(cDiv(1,cPow(xU,2)),1)))))}
        return nReturn
    }
    function azh(xU) {//acoth
        var nReturn = "undefined";
        if (getType(xU) == "complex") {nReturn = cDiv(lne(cDiv(cAdd(xU,1),cSub(xU,1))),2)}
        if (getType(xU) == "real") {nReturn = trigRound(cDiv(lne(cDiv(cAdd(xU,1),cSub(xU,1))),2))}
        return nReturn
    }

    //misc functions
    function fac(xU) { //factorial
        var nReturn = "undefined";
        if (getType(xU) == "complex" && xU.i != 0) {nReturn = gam(cAdd(xU,1))}
        if (getType(xU) == "real") {nReturn = gam(cAdd((xU),1))}
        return nReturn
    }
    function gam(xU) { //gamma function
        var nReturn = "undefined";
        if (getType(xU) == "complex") {
            xU = toCplx(xU);
            var gC = 7;
            const pC = [0.99999999999980993,676.5203681218851,-1259.1392167224028,771.32342877765313,-176.61502916214059,12.507343278686905,-0.13857109526572012,9.9843695780195716e-6,1.5056327351493116e-7];
            if (xU.r < 0.5) {nReturn = cDiv(Cv[29],cMul(sin(cMul(Cv[29],xU)),gam(cAdd(1,cMul(-1,xU)))))}
            else {
                xU = cAdd(xU,-1);
                var xI = pC[0];
                for (var iC=1;iC<gC+2;iC++) {xI = cAdd(xI,cDiv(pC[iC],cAdd(xU,iC)))}
                tC = cAdd(cAdd(xU,gC),0.5);
                nReturn = cMul(cMul(cMul(2.5066282746,cPow(tC,cAdd(xU,0.5))),exp(cMul(-1,tC))),xI);
            }
        }
        if (getType(xU) == "real") {
            var acc =1;
            if ((xU>22)||(xU != rou(xU))) {acc = cMul(sqt(cDiv(Cv[30],xU)),cPow(cMul(cDiv(xU,Cv[8]),sqt(cAdd(cMul(xU,snh(cDiv(1,xU))),cDiv(1,(cMul(810,cPow(xU,6))))))),xU))}
            else {for (var g=1;g<=xU-1;g++) {acc = cMul(acc,g)}}
            nReturn = acc;
        }
        return nReturn
    }

    //statistical functions
    function rnd(xU) { //random number
        return cMul(Math.random(),toReal(xU))
    }
    function cdf(xU) { //normalized cumulative density function
        return normCDF(1,toReal(xU),0)
    }
    function pdf(xU) { //normalized probability density function
        return normPDF(1,toReal(xU),0)
    }
    function lcf(xU) { //normalized log cumulative density function
        return lognCDF(1,toReal(xU),0)
    }
    function lpf(xU) { //normalized log probability density function
        return lognPDF(1,toReal(xU),0)
    }
    function erf(xU) {//error function
        xU = toReal(xU);
        var nReturn,fE=0;
        if (xU > 3.2) {nReturn = 1-cPow(3.14,cMul(cNeg(xU),xU))}
        else {for (var fn=0;fn<50;fn++){fE = fE+cPow(-1,fn)*(cPow(xU,2*fn+1)/(fac(fn)*(2*fn+1)))};nReturn = 1.1283796*fE}
        return nReturn
    }
    function efc(xU) {//inverse error function
        return iSolve(function(a){return erf(a)},toReal(xU),0,7)
    }
    function normPDF(sigma,xV,mu) { //probability density function
        sigma = toReal(sigma);xV = toReal(xV);mu = toReal(mu);
        return (1/(sigma*2.5066282)*exp(-(cPow(xV-mu,2)/(2*cPow(sigma,2)))));
    }
    function normCDF(sigma,xV,mu) { //cumulative density function
        sigma = toReal(sigma);xV = toReal(xV);mu = toReal(mu);
        return (1+erf((xV-mu)/(sigma*1.414)))/2;
    }
    function lognPDF(sigma,xV,mu) { //log probability density function
        sigma = toReal(sigma);xV = toReal(xV);mu = toReal(mu);
        return (1/(xV*sigma*2.5066282)*exp(-(cPow(lne(xV)-mu,2)/(2*cPow(sigma,2)))));
    }
    function lognCDF(sigma,xV,mu) { //log cumulative density function
        sigma = toReal(sigma);xV = toReal(xV);mu = toReal(mu);
        return (1+erf(lne(xV)-mu/(sigma*1.414)))/2;
    }
    // financial functions
    // Black-Scholes JSON parameter:{TERM:<term>,RATE:<rate>,STRIKE:<strike price>,SPOT:<spot price>,DIV:<dividend>,STDV:<stdev>}
    function finCALL(parm) {
        var fT = toReal(parm.TERM),fR = toReal(parm.RATE),fK = toReal(parm.STRIKE),fS = toReal(parm.SPOT),fQ = toReal(parm.DIV),sDv = toReal(parm.STDV);
        return roundDecTo(normCDF(1,finD1(fT,fR,fK,fS,fQ,sDv),0)*fS*exp(-(fQ/mgConfig.pctFactor)*fT)-normCDF(1,finD2(fT,fR,fK,fS,fQ,sDv),0)*fK*exp(-(fR/mgConfig.pctFactor)*fT),mgConfig.dPrecision)
    }
    function finPUT(parm) {
        var fT = toReal(parm.TERM),fR = toReal(parm.RATE),fK = toReal(parm.STRIKE),fS = toReal(parm.SPOT),fQ = toReal(parm.DIV),sDv = toReal(parm.STDV);
        return roundDecTo(normCDF(1,-finD2(fT,fR,fK,fS,fQ,sDv),0)*fK*exp(-(fR/mgConfig.pctFactor)*fT)-normCDF(1,-finD1(fT,fR,fK,fS,fQ,sDv),0)*fS*exp(-(fQ/mgConfig.pctFactor)*fT),mgConfig.dPrecision)
    }
    function finCALLdelta(parm) {
        var fT = toReal(parm.TERM),fR = toReal(parm.RATE),fK = toReal(parm.STRIKE),fS = toReal(parm.SPOT),fQ = toReal(parm.DIV),sDv = toReal(parm.STDV);
        return roundDecTo(normCDF(1,finD1(fT,fR,fK,fS,fQ,sDv),0)*exp(-fQ*fT),mgConfig.dPrecision);
    }
    function finPUTdelta(parm) {
        var fT = toReal(parm.TERM),fR = toReal(parm.RATE),fK = toReal(parm.STRIKE),fS = toReal(parm.SPOT),fQ = toReal(parm.DIV),sDv = toReal(parm.STDV);
        return roundDecTo(-normCDF(1,-finD1(fT,fR,fK,fS,fQ,sDv),0)*exp(-fQ*fT),mgConfig.dPrecision);
    }
    function finOPTgamma(parm) {
        var fT = toReal(parm.TERM),fR = toReal(parm.RATE),fK = toReal(parm.STRIKE),fS = toReal(parm.SPOT),fQ = toReal(parm.DIV),sDv = toReal(parm.STDV);
        return roundDecTo((normPDF(1,finD1(fT,fR,fK,fS,fQ,sDv),0)*exp(-fQ*fT))/(fS*sDv*sqt(fT)),mgConfig.dPrecision);
    }
    function finCALLtheta(parm) {
        var fT = toReal(parm.TERM),fR = toReal(parm.RATE),fK = toReal(parm.STRIKE),fS = toReal(parm.SPOT),fQ = toReal(parm.DIV),sDv = toReal(parm.STDV);
        return roundDecTo((-exp(-(fQ/mgConfig.pctFactor)*fT)*(normPDF(1,finD1(fT,fR,fK,fS,fQ,sDv),0)*fS*sDv)/(2*sqt(fT))-(fR/mgConfig.pctFactor)*fK*exp(-(fR/mgConfig.pctFactor)*fT)*normCDF(1,finD2(fT,fR,fK,fS,fQ,sDv),0)+(fQ/mgConfig.pctFactor)*fS*exp(-(fQ/mgConfig.pctFactor)*fT)*normCDF(1,finD1(fT,fR,fK,fS,fQ,sDv),0))/365,mgConfig.dPrecision);
    }
    function finPUTtheta(parm) {
        var fT = toReal(parm.TERM),fR = toReal(parm.RATE),fK = toReal(parm.STRIKE),fS = toReal(parm.SPOT),fQ = toReal(parm.DIV),sDv = toReal(parm.STDV);
        return roundDecTo((-exp(-(fQ/mgConfig.pctFactor)*fT)*(normPDF(1,finD1(fT,fR,fK,fS,fQ,sDv),0)*fS*sDv)/(2*sqt(fT))+(fR/mgConfig.pctFactor)*fK*exp(-(fR/mgConfig.pctFactor)*fT)*normCDF(1,-finD2(fT,fR,fK,fS,fQ,sDv),0)-(fQ/mgConfig.pctFactor)*fS*exp(-(fQ/mgConfig.pctFactor)*fT)*normCDF(1,-finD1(fT,fR,fK,fS,fQ,sDv),0))/365,mgConfig.dPrecision);
    }
    function finOPTvega(parm) {
        var fT = toReal(parm.TERM),fR = toReal(parm.RATE),fK = toReal(parm.STRIKE),fS = toReal(parm.SPOT),fQ = toReal(parm.DIV),sDv = toReal(parm.STDV);
        return roundDecTo(normPDF(1,finD1(fT,fR,fK,fS,fQ,sDv),0)*fS*exp(-(fQ/mgConfig.pctFactor)*fT)*sqt(fT)/100,mgConfig.dPrecision);
    }
    function finCALLrho(parm) {
        var fT = toReal(parm.TERM),fR = toReal(parm.RATE),fK = toReal(parm.STRIKE),fS = toReal(parm.SPOT),fQ = toReal(parm.DIV),sDv = toReal(parm.STDV);
        return roundDecTo(normCDF(1,finD1(fT,fR,fK,fS,fQ,sDv),0)*fK*fT*exp(-(fR/mgConfig.pctFactor)*fT)/100,mgConfig.dPrecision);
    }
    function finPUTrho(parm) {
        var fT = toReal(parm.TERM),fR = toReal(parm.RATE),fK = toReal(parm.STRIKE),fS = toReal(parm.SPOT),fQ = toReal(parm.DIV),sDv = toReal(parm.STDV);
        return roundDecTo(-normCDF(1,-finD1(fT,fR,fK,fS,fQ,sDv),0)*fK*fT*exp(-(fR/mgConfig.pctFactor)*fT)/100,mgConfig.dPrecision);
    }
    function finD1(fT,fR,fK,fS,fQ,sDv){return (lne(fS/fK)+((fR/mgConfig.pctFactor)-(fQ/mgConfig.pctFactor)+.5*cPow(sDv,2))*fT)/(sDv*sqt(fT))}
    function finD2(fT,fR,fK,fS,fQ,sDv){return (lne(fS/fK)+((fR/mgConfig.pctFactor)-(fQ/mgConfig.pctFactor)-.5*cPow(sDv,2))*fT)/(sDv*sqt(fT))}
    // Loan/Bond functions
    //JSON parameter: {PV:<present value>,FV:<future value<,PMT:<payment>,RATE:<rate>,TERM:<term>,IPY:<interest payments per year>}
    function finPV(parm){
        var FVx = toReal(parm.FV),PMTx = toReal(parm.PMT),RATEx = toReal(parm.RATE),TERMx = toReal(parm.TERM),IPYx = toReal(parm.IPY);
        var nReturn = FVx+(IPYx*TERMx*PMTx);
        if (RATEx != 0) {nReturn = (PMTx*(1-1/cPow(1+(RATEx/mgConfig.pctFactor)/IPYx,IPYx*TERMx))/((RATEx/mgConfig.pctFactor)/IPYx))+FVx*(1/cPow(1+((RATEx/mgConfig.pctFactor)/IPYx),IPYx*TERMx))}
        return rou(nReturn*100)/100
    }
    function finFV(parm){
        var PVx = toReal(parm.PV),PMTx = toReal(parm.PMT),RATEx = toReal(parm.RATE),TERMx = toReal(parm.TERM),IPYx = toReal(parm.IPY);
        var nReturn = PVx-(IPYx*TERMx*PMTx);
        if (RATEx != 0) {nReturn = (PVx-(PMTx*(1-1/cPow(1+(RATEx/mgConfig.pctFactor)/IPYx,IPYx*TERMx))/((RATEx/mgConfig.pctFactor)/IPYx)))/(1/cPow(1+((RATEx/mgConfig.pctFactor)/IPYx),IPYx*TERMx))}
        return rou(nReturn*100)/100
    }
    function finPMT(parm) {
        var PVx = toReal(parm.PV),FVx = toReal(parm.FV),RATEx = toReal(parm.RATE),TERMx = toReal(parm.TERM),IPYx = toReal(parm.IPY);
        var nReturn = (PVx-FVx)/(IPYx*TERMx);
        if (RATEx != 0) {nReturn = (PVx-FVx*(1/cPow(1+((RATEx/mgConfig.pctFactor)/IPYx),IPYx*TERMx)))/((1-1/cPow(1+(RATEx/mgConfig.pctFactor)/IPYx,IPYx*TERMx))/((RATEx/mgConfig.pctFactor)/IPYx))}
        return rou(nReturn*100)/100
    }
    function finRATE(parm) {
        var PVx = toReal(parm.PV),FVx = toReal(parm.FV),PMTx = toReal(parm.PMT),TERMx = toReal(parm.TERM),IPYx = toReal(parm.IPY);
        var nReturn = 0,nH = 100,nL = 0,t1 = 0;
        for (var kI=1; kI<=100;kI++) {
            nReturn = (nH+nL)/2;
            t1 = (PMTx*(1-1/cPow(1+nReturn/IPYx,IPYx*TERMx))/(nReturn/IPYx))+FVx*(1/cPow(1+(nReturn/IPYx),IPYx*TERMx));
            if (t1 < PVx) {nH = (nH+nL)/2;} 
            else {nL = (nH+nL)/2;}
        }
        return nReturn.toPrecision(4)*mgConfig.pctFactor
    }
    function finTERM(parm) {
        var PVx = toReal(parm.PV),FVx = toReal(parm.FV),PMTx = toReal(parm.PMT),RATEx = toReal(parm.RATE),IPYx = toReal(parm.IPY);
        var nReturn = 0,nH = 500,nL = 1,t1 = 0, kI = 0;
        if (RATEx == 0) {nReturn = (PVx-FVx)/(IPYx*PMTx)}
        else if (PMTx == 0) {
            for (kI=1; kI<100;kI++) {
                nReturn=(nH+nL)/2;
                t1 = (PVx-FVx*(1/cPow(1+((RATEx/mgConfig.pctFactor)/IPYx),IPYx*nReturn)))/((1-1/cPow(1+(RATEx/mgConfig.pctFactor)/IPYx,IPYx*nReturn))/((RATEx/mgConfig.pctFactor)/IPYx));
                if (t1 > PMTx) {nH = (nH+nL)/2} else {nL = (nH+nL)/2}
            }
        }
        else if (FVx > PVx) {
            for (kI=1; kI<100;kI++) {
                nReturn=(nH+nL)/2;
                t1 = (PVx-FVx*(1/cPow(1+((RATEx/mgConfig.pctFactor)/IPYx),IPYx*nReturn)))/((1-1/cPow(1+(RATEx/mgConfig.pctFactor)/IPYx,IPYx*nReturn))/((RATEx/mgConfig.pctFactor)/IPYx));
                if (t1 > PMTx) {nH = (nH+nL)/2} else {nL = (nH+nL)/2}
            }
        }
        else if (FVx < PVx) {
            for (kI=1; kI<100;kI++) {
            nReturn=(nH+nL)/2;
            t1 = (PMTx*(1-1/cPow(1+(RATEx/mgConfig.pctFactor)/IPYx,IPYx*nReturn))/((RATEx/mgConfig.pctFactor)/IPYx))+FVx*(1/cPow(1+((RATEx/mgConfig.pctFactor)/IPYx),IPYx*nReturn));
            if (t1 > PVx) {nH = (nH+nL)/2} else {nL = (nH+nL)/2}
            }
        }
        else {nReturn = "Cv[8734]"}
        return rou(nReturn*100)/100
    }
    //inverse functions iSolve Example: iSolve(function(a){return fn(a)},100,0,10) nL=low limit, nH=high limit
    function iSolve(expr,result,nL,nH) {//iterative solver
        var nReturn = "undefined";
        if (getType(result) == "real") {
            if (typeof nL =="undefined") {nL = -1e10}
            if (typeof nH =="undefined") {nH = 1e10}
            var t1 = 0, iSlv = nH, ix = 0;
            for (ix=1;ix<100;ix++) {
                iSlv = (nH+nL)/2;
                t1 = toReal(expr(iSlv));
                if (t1 > result) {nH = cDiv(cAdd(nH,nL),2)} else {nL = cDiv(cAdd(nH,nL),2)}
            }
            nReturn = iSlv
        }
        return nReturn
    }
    function cGcf(xU,xL) {//greatest common factor
        var nReturn = "undefined";
        var xMod = 1,Cbr = 0, xTmpL = 0, xTmpH = 0;
        if (getType(xU) == "real" && getType(xL) == "real" ) {
            xU = abs(xU);xL = abs(xL);
            if (xU != 0 && xL != 0 && xU == int(xU) && xL == int(xL)) {
                if (xU > xL) {xTmpL = xL;xTmpH = xU}
                else {xTmpL = xU;xTmpH = xL}
                while (xMod > 0) {
                    xMod = xTmpH-(cMul(int(cDiv(xTmpH,xTmpL)),xTmpL));
                    xTmpH = xTmpL;
                    xTmpL = xMod;
                    Cbr++;
                    if (Cbr > 1000) {break}
                }
                if (Cbr > 1000) {nReturn = 1}
                else if (cDiv(xU,xTmpH) == int(cDiv(xU,xTmpH)) && cDiv(xL,xTmpH) == int(cDiv(xL,xTmpH))) {nReturn = xTmpH}
            }
            else {nReturn = 1}
        }
        return nReturn
    }

    var Sv = [],Pv = [];
    var pxpFlag = false,expFlag = false,factorFlag = false,solverFlag = false;
    var deeVarP = "";
    var dRound = 1e12; //rounding for complex number arithmetic
    var iConstant = 11100; //constant of integration variable index
    var iIterations = 0; //iteration count for integration
    var sIterations = 0; //iteration count for summation
    var pIterations = 0; //iteration count for products
    var xIterations = 0; //iteration count for limits
    var invMult = "Cv[29]";
    if (mgConfig.trigBase == Cv[29]/180) {invMult = "180"}
    if (mgConfig.trigBase == Cv[29]/200) {invMult = "200"}

    return {
        Numeric:    function(xprA) {mgTrans.configCheck();return mgTrans.Output(mgTrans.mgExport(fmtResult(xprNumeric(mgTrans.cFunc(mgTrans.texImport(xprA))))))},
        Simplify:   function(xprA) {mgTrans.configCheck();return mgTrans.Output(mgTrans.mgExport(cReduce(mgTrans.cFunc(parseCalculus(mgTrans.texImport(xprA))))))},
        Solve:      function(xprA,xprB) {mgTrans.configCheck();return mgTrans.Output(mgTrans.mgExport(xprSolve(mgTrans.cFunc(parseCalculus(mgTrans.texImport(xprA))),mgTrans.texImport(xprB))))},
        Substitute: function(xprA,xprB,xprC) {mgTrans.configCheck();return mgTrans.Output(cSubst(mgTrans.texImport(xprA),mgTrans.texImport(xprB),mgTrans.texImport(xprC)))},
        Factor:     function(xprA) {mgTrans.configCheck();return mgTrans.Output(mgTrans.mgExport(xprFactor(mgTrans.cFunc(parseCalculus(mgTrans.texImport(xprA))))))},
        Expand:     function(xprA) {mgTrans.configCheck();return mgTrans.Output(mgTrans.mgExport(xprExpand(mgTrans.cFunc(parseCalculus(mgTrans.texImport(xprA))))))},
        TrigToExp:  function(xprA) {mgTrans.configCheck();return mgTrans.Output(mgTrans.mgExport(xprTrigToExp(mgTrans.cFunc(parseCalculus(mgTrans.texImport(xprA))))))},
        ExpToTrig:  function(xprA) {mgTrans.configCheck();return mgTrans.Output(mgTrans.mgExport(xprExpToTrig(mgTrans.cFunc(parseCalculus(mgTrans.texImport(xprA))))))},
        Range:      function(xprA) {mgTrans.configCheck();return mgTrans.Output(xprRange(mgTrans.cFunc(mgTrans.texImport(xprA))))},
        Series:     function(xprA,xprB,xprC,xprD) {mgTrans.configCheck();return mgTrans.Output(mgTrans.mgExport(xprSeries(mgTrans.cFunc(parseCalculus(mgTrans.texImport(xprA))),mgTrans.texImport(xprB),xprC,xprD)))},
        RoundDec:   function(p1,p2) {return roundDecTo(p1,p2)},
        Inventory:  function(xprA) {return cInventory(xprA)},
        Payment:    function(parm) {return finPMT(parm)},
        Term:       function(parm) {return finTERM(parm)},
        Rate:       function(parm) {return finRATE(parm)},
        PresentValue:function(parm) {return finPV(parm)},
        FutureValue:function(parm) {return finFV(parm)},
        Call:       function(parm) {return finCALL(parm)},
        Put:        function(parm) {return finPUT(parm)},
        CallDelta:  function(parm) {return finCALLdelta(parm)},
        CallRho:    function(parm) {return finCALLrho(parm)},
        CallTheta:  function(parm) {return finCALLtheta(parm)},
        PutDelta:   function(parm) {return finPUTdelta(parm)},
        PutRho:     function(parm) {return finPUTrho(parm)},
        PutTheta:   function(parm) {return finPUTtheta(parm)},
        OptionGamma:function(parm) {return finOPTgamma(parm)},
        OptionVega: function(parm) {return finOPTvega(parm)},
        GCF:        function(p1,p2) {return cGcf(p1,p2)},
        irSolver:   function(p1,p2,p3,p4) {return iSolve(p1,p2,p3,p4)},
    }
} ();
// node.js export
if (typeof module ==  "object") {
    module.exports = {
        mgCalc:         mgCalc,
    }
}

//