/*
	MathGene Math Library - Version 1.00
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

// node.js import
if (typeof module ==  "object") {
	var mgTr = require("./mg_translate.js");
	var mgConfig = mgTr.mgConfig;
	var Cv = mgTr.Cv;
	var Cs = mgTr.Cs;
	var funcMap = mgTr.funcMap;
	var parseParens = function(xpr,bSym) {return mgTr.parseParens(xpr,bSym)};
	var cFunc = function(xpr) {return mgTr.cFunc(xpr)};
	var texImport = function(xpr) {return mgTr.texImport(xpr)};
	var texExport = function(xpr) {return mgTr.texExport(xpr)};
	var mgExport = function(xpr) {return mgTr.mgExport(xpr)};
	var htmlExport = function(xpr) {return mgTr.htmlExport(xpr)};
	var mgOutput = function(xpr,scale) {return mgTr.mgOutput(xpr,scale)};
	var mgTranslate = function(xpr,scale) {return mgTr.mgTranslate(xpr,scale)};
}

//external callable functions
function mgNumeric(expression) { //calculate numerical
	return mgOutput(mgCalc.Numeric(texImport(expression)));
}
function mgCalculate(expression) { //calculate numerical (deprecated)
	return mgOutput(mgCalc.Numeric(texImport(expression)));
}
function mgSolve(equation,variable) { //solve equation for variable
	return mgOutput(mgExport(mgCalc.Solve(texImport(equation),texImport(variable))));
}
function mgSimplify(expression) { //simplify or reduce expression and evaluate all calculus
	return mgOutput(mgExport(mgCalc.Simplify(texImport(expression))))
}
function mgSubstitute(expression,substTarget,substSource) { //substitute target with source within expression
	return mgOutput(mgCalc.Substitute(texImport(expression),texImport(substTarget),texImport(substSource)));
}
function mgFactor(expression) { //factor expression
	return mgOutput(mgExport(mgCalc.Factor(texImport(expression))));
}
function mgExpand(expression) { //expand expression
	return mgOutput(mgExport(mgCalc.Expand(texImport(expression))));
}
function mgTrigToExp(expression) { //convert trig functions to exponential form
	return mgOutput(mgExport(mgCalc.TrigToExp(texImport(expression))));
}
function mgRange(expression) { //find range of expression
	return mgOutput(mgCalc.Range(texImport(expression)));
}
function mgDomain(expression) { //find domain of expression
	return mgOutput(mgCalc.Domain(texImport(expression)));
}

//internal functions-objects
var mgCalc = (function() {

	function xprSolve(xSol,cVar) {//solve equation/inequality xSol in FUNC format for variable cVar
		var solverMap = 
		{
		sin:{solverU:"asnS(lExpr)",ineqU:0},
		cos:{solverU:"acsS(lExpr)",ineqU:0},
		tan:{solverU:"atnS(lExpr)",ineqU:0},
		sec:{solverU:"ascS(lExpr)",ineqU:0},
		csc:{solverU:"accS(lExpr)",ineqU:0},
		cot:{solverU:"actS(lExpr)",ineqU:0},
		snh:{solverU:"ashS(lExpr)",ineqU:0},
		csh:{solverU:"achS(lExpr)",ineqU:0},
		tnh:{solverU:"athS(lExpr)",ineqU:0},
		sch:{solverU:"axhS(lExpr)",ineqU:0},
		cch:{solverU:"ayhS(lExpr)",ineqU:0},
		cth:{solverU:"azhS(lExpr)",ineqU:0},
		asn:{solverU:"sinS(lExpr)",ineqU:0},
		acs:{solverU:"cosS(lExpr)",ineqU:0},
		atn:{solverU:"tanS(lExpr)",ineqU:0},
		asc:{solverU:"secS(lExpr)",ineqU:0},
		acc:{solverU:"cscS(lExpr)",ineqU:0},
		act:{solverU:"cotS(lExpr)",ineqU:0},
		ash:{solverU:"snhS(lExpr)",ineqU:0},
		ach:{solverU:"cshS(lExpr)",ineqU:0},
		ath:{solverU:"tnhS(lExpr)",ineqU:0},
		axh:{solverU:"schS(lExpr)",ineqU:0},
		ayh:{solverU:"cchS(lExpr)",ineqU:0},
		azh:{solverU:"cthS(lExpr)",ineqU:0},
		sqt:{solverU:"cPowS(lExpr,2)",ineqU:0},
		cbt:{solverU:"cPowS(lExpr,3)",ineqU:0},
		log:{solverU:"cPowS(10,lExpr)",ineqU:0},
		lne:{solverU:"cPowS('Cv[8]',lExpr)",ineqU:0},
		int:{solverU:"",ineqU:0},
		abs:{solverU:"",ineqU:0},
		erf:{solverU:"efcS(lExpr)",ineqU:0},
		efc:{solverU:"erfS(lExpr)",ineqU:0},
		arg:{solverU:"",ineqU:0},
		exp:{solverU:"lneS(lExpr)",ineqU:0},
		con:{solverU:"conS(rExpr)",ineqU:0},
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
		sbt:{solverU:"sbtS(rExpr)",ineqU:1},
		cup:{solverU:"cupS(rExpr)",ineqU:1},
		cap:{solverU:"capS(rExpr)",ineqU:1},
		vec:{solverU:"vecS(rExpr)",ineqU:1},
		hat:{solverU:"hatS(rExpr)",ineqU:1},
		und:{solverU:"undS(rExpr)",ineqU:1},
		udt:{solverU:"udtS(rExpr)",ineqU:1},
		tld:{solverU:"tldS(rExpr)",ineqU:1},
		cnt:{solverU:"cntS(rExpr)",ineqU:1},
		drv:{solverU:"ntgS(lExpr,deeVarP)",ineqU:0},
		tdv:{solverU:"ntgS(lExpr,deeVarP)",ineqU:0},
		nrt:{solverU:"cDivS(lneS(strgI),lneS(lExpr))",solverL:"cPowS(lExpr,strgI)",ineqU:0,ineqL:0},
		lgn:{solverU:"cDivS(lneS(strgI),lneS(lExpr))",solverL:"cPowS(lExpr,strgI)",ineqU:0,ineqL:0},
		cPow:{solverU:"cPowS(lExpr,(cDivS(1,strgI)))",solverL:"lgnS(strgI,lExpr)",ineqU:0,ineqL:0},
		cNeg:{solverU:"cNegS(lExpr)",ineqU:-1},
		cMul:{solverU:"cDivS(lExpr,strgI)",solverL:"cDivS(lExpr,strgI)",ineqU:"strgI",ineqL:"strgI"},
		cTms:{solverU:"cDivS(lExpr,strgI)",solverL:"cDivS(lExpr,strgI)",ineqU:"strgI",ineqL:"strgI"},
		cDot:{solverU:"cDivS(lExpr,strgI)",solverL:"cDivS(lExpr,strgI)",ineqU:"strgI",ineqL:"strgI"},
		cDiv:{solverU:"cMulS(lExpr,strgI)",solverL:"cDivS(strgI,lExpr)",ineqU:"strgI",ineqL:"strgI"},
		cAdd:{solverU:"cSubS(lExpr,strgI)",solverL:"cSubS(lExpr,strgI)",ineqU:1,ineqL:1},
		cSub:{solverU:"cAddS(lExpr,strgI)",solverL:"cSubS(strgI,lExpr)",ineqU:1,ineqL:-1},
		};
		function cCrawl(lExpr,rExpr,xVar) {
			if (rExpr.split(")").length-1 != rExpr.split("(").length-1) {return cError("Unmatched parentheses/brackets")}
			rExpr = cReduce(rExpr);
			var ineqSwap = 1; //-1 swap inequality, 1 no change, 0 or other undefined
			while (strTest(rExpr,"(")) {
				var getOp = opExtract(rExpr);
				if (typeof solverMap[getOp.func]["solverL"] != "undefined") {
					if (strTest(getOp.upper,xVar) && strTest(getOp.lower,xVar)) {
						rExpr = cFactor(rExpr);
						getOp = opExtract(rExpr);
					}
					if (strTest(getOp.upper,xVar) && strTest(getOp.lower,xVar)) {break}
					else if (strTest(getOp.upper,xVar)) {
						rExpr = getOp.upper;
						var strgI = getOp.lower;
						lExpr = eval(solverMap[getOp.func]["solverU"]);
						ineqSwap = cMulS(ineqSwap,eval(solverMap[getOp.func]["ineqU"]))
					}
					else if (strTest(getOp.lower,xVar)) {		
						rExpr = getOp.lower;
						var strgI = getOp.upper;
						lExpr = eval(solverMap[getOp.func]["solverL"]);
						ineqSwap = cMulS(ineqSwap,eval(solverMap[getOp.func]["ineqL"]))
					}
					else {break}
				}
				else {
					lExpr = eval(solverMap[getOp.func]["solverU"]);
					rExpr = getOp.upper;
					ineqSwap = cMulS(ineqSwap,eval(solverMap[getOp.func]["ineqU"]))
				}
			}
			return {lExpr:lExpr,rExpr:rExpr,ineqSwap:ineqSwap};
		}
		//
		var sXtract = relExtract(xSol);
		if (!sXtract.lower || !sXtract.upper) {return cReduce(xSol)}
		if (sXtract.lower.split(cVar).length > 2) {sXtract.lower = cFactor(sXtract.lower)}
		if (sXtract.upper.split(cVar).length > 2) {sXtract.upper = cFactor(sXtract.upper)}
		solverFlag = true;
		if (strTest(sXtract.lower,cVar)) {
			var cRet = cCrawl("0",cReduce(cSubS(sXtract.upper,sXtract.lower)),cVar);
		}
		else {
			var cRet = cCrawl("0",cReduce(cSubS(sXtract.lower,sXtract.upper)),cVar);
			cRet.ineqSwap = cNegS(cRet.ineqSwap);
		}
		solverFlag = false;
		
		if (!nbrTest(cRet.ineqSwap)) {cRet.ineqSwap = 0}
		var sReturn = "";
		if (sXtract.func == "cEql") {sReturn = cEqlS(cRet.rExpr,cReduce(cRet.lExpr))}
		if (sXtract.func == "cNql") {sReturn = cNqlS(cRet.rExpr,cReduce(cRet.lExpr))}
		if (sXtract.func == "cGth" && cRet.ineqSwap > 0) {sReturn = cGthS(cRet.rExpr,cReduce(cRet.lExpr))}
		if (sXtract.func == "cGth" && cRet.ineqSwap < 0) {sReturn = cLthS(cRet.rExpr,cReduce(cRet.lExpr))}
		if (sXtract.func == "cLth" && cRet.ineqSwap > 0) {sReturn = cLthS(cRet.rExpr,cReduce(cRet.lExpr))}
		if (sXtract.func == "cLth" && cRet.ineqSwap < 0) {sReturn = cGthS(cRet.rExpr,cReduce(cRet.lExpr))}
		if (sXtract.func == "cGeq" && cRet.ineqSwap > 0) {sReturn = cGeqS(cRet.rExpr,cReduce(cRet.lExpr))}
		if (sXtract.func == "cGeq" && cRet.ineqSwap < 0) {sReturn = cLeqS(cRet.rExpr,cReduce(cRet.lExpr))}
		if (sXtract.func == "cLeq" && cRet.ineqSwap > 0) {sReturn = cLeqS(cRet.rExpr,cReduce(cRet.lExpr))}
		if (sXtract.func == "cLeq" && cRet.ineqSwap < 0) {sReturn = cGeqS(cRet.rExpr,cReduce(cRet.lExpr))}
		if (!sReturn) {return "undefined"}
		if (strTest(sReturn,"Cv[9998]")) {return "Cv[9998]"}
		return sReturn
	}
	function relExtract(fExt) { //extract relational operators in FUNC format, returns func,upper,lower
		var rOps = ["cEql","cGth","cGeq","cLth","cLeq","cNql"];
		fExt = strConvert(fExt);
		for (var cI=0;cI<rOps.length;cI++) {
			if (fExt.indexOf(rOps[cI]) == 0 ) {
				var strg = parseParens(fExt,fExt.indexOf("("));
				return {func:rOps[cI],upper:strg.upper,lower:strg.lower}
			}
		}
		return {func:"",upper:"",lower:""}
	}
	function opExtract(fExt) {//extract inside function in FUNC format, returns func,upper,lower
		function fTest(tFunc) {if (typeof funcMap[tFunc] == "undefined") {return false}; return true} //test for valid function key
		fExt = strConvert(fExt);
		var opReturn = {func:"",upper:"",lower:""};
		var funcKey = fExt.substr(0,fExt.indexOf("("))
		if (funcKey && fTest(funcKey)) {
			var strg = parseParens(fExt,fExt.indexOf("("));
			if (strg.upper) {opReturn = {func:funcKey,upper:cIterate(strg.upper),lower:cIterate(strg.lower)}} //two operands
			else {opReturn = {func:funcKey,upper:cIterate(strg.inside),lower:""}} //single operand
		}
		return opReturn
	}
	function cDissect(xDsect) { //return array of all components of expression
		var tDsect = [];
		function dct(xT,xB)  {if (!strTest(tDsect,xT)) {tDsect.push(xT)};if (xB && !strTest(tDsect,xB)) {tDsect.push(xB)}}
		function cdct(xT,xB) {if (!strTest(tDsect,xT)) {tDsect.push(xT)};if (!strTest(tDsect,xB)) {tDsect.push(xB)}}
		xDsect = strConvert(xDsect);
		eval(xDsect.replace(/[a-z][a-z][a-z]\(/gi,"dct(").replace(/(Cv\[\d+\])/g,"'$1'"));
		return tDsect
	}
	function cInventory(xInv) { //return array of indexes of all unique variables 
		xInv = strConvert(xInv);
		var vCount = xInv.split("Cv[").length-1;
		var vTmp;
		var xVars = [];
		for (var xV=0;xV<vCount;xV++) {
			vTmp = strConvert(xInv.match(/Cv\[\d+\]/));
			vTmp = vTmp.replace(/Cv\[(\d+)\]/,"$1");
			xInv = xInv.replace(/Cv\[\d+\]/,"");
			if (varTest(vTmp)) {if (!strTest(xVars,vTmp)) {xVars.push(vTmp)}}
		}
		xVars.sort();
		return xVars
	}
	function varTest(iDv) { //test if string is a calc variable (Cv[xxx])
		iDv = strConvert(iDv);
		iDv = iDv.replace(/Cv\[(\d+)\]/,"$1");
		if ((iDv > 64 && iDv < 91) || (iDv > 96 && iDv < 123) || (iDv > 10064 && iDv < 10091) || (iDv > 10096 && iDv < 10123) || (iDv > 913 && iDv < 969)) {return true}
		return false
	}
	function xprMatch(Xpression,Pattern) { //match expression template Cv[9999] = wildcard
		Xpression = strConvert(Xpression);
		var xTractU = opExtract(cIterate(Xpression));
		var xTractL = opExtract(Pattern);
		if (!xTractU.func || !xTractL.func) {return ""}
		for (var xM=0;xM<10;xM++) {
			if (xTractU.func == xTractL.func) {
				if (strTest(xTractL.upper,"Cv[9999]")) {
					if (xTractU.lower == xTractL.lower) {
						if (xTractL.upper == "Cv[9999]") {return xTractU.upper}
						xTractU = opExtract(xTractU.upper);
						xTractL = opExtract(xTractL.upper);					
					}
					else {return ""}
				}
				else if (strTest(xTractL.lower,"Cv[9999]")) {
					if (xTractU.upper == xTractL.upper) {
						if (xTractL.lower == "Cv[9999]") {return xTractU.lower}
						xTractU = opExtract(xTractU.lower);
						xTractL = opExtract(xTractL.lower);
					}
					else {return ""}			
				}
				else {return ""}
			}
			else {return ""}
		}
	}
	function cError(cE) {Cs[9998] = cE;return "Cv[9998]"} //error message return symbol
	function cSubst(sXpr,xI,xO) {sXpr+="";var sCount = sXpr.split(xI).length-1;for (var nXs=0;nXs<sCount;nXs++) {sXpr = sXpr.replace(xI,xO)};return sXpr} //substitution in MG format
	function nbrTest(xT) {if (+xT == +xT*1) {return true}; return false} //test for numerical string
	function nbrEven(xE) {if (+xE/2 == Math.floor(+xE/2)) {return true};return false} //test for even number
	function strConvert(xS) {return xS + ""} //convert to string
	function strTest(xTarget,xSearch) { //test if xSearch string is in xTarget
		if (typeof xTarget == "undefined") {return false}
		if (nbrTest(xTarget) && xTarget == xSearch) {return true};
		if (!nbrTest(xTarget) && xTarget.indexOf(xSearch) > -1) {return true};
		return false
	}
	function matFunc(xA) { //matrix array to FUNC conversion
		if (typeof xA[0] == "object") {
			var mReturn = [];
			for (var iR=0;iR<xA.length;iR++) {mReturn[iR] = matFunc(xA[iR])}
			return "mat(" + mReturn + ")"
		}
		if (typeof xA == "object") {return "mat(" + xA + ")"}
		return xA
	}
	function matArray(xA) { //matrix FUNC to array
		if (typeof xA == "object") {return xA}
		return eval(xA.replace(/([a-z])\(/g,"$1S(").replace(/matS\(/g,"mat(").replace(/(Cv\[\d+\])/g,"'$1'"))
	}
	
	//Expression reduction
	function cIterate(xIter) {
		xIter = strConvert(xIter);
		if (strTest(xIter,"undefined")) {return "undefined"}
		if (xIter.search(/,,/) > -1 || xIter.search(/,\)/) > -1 || xIter.search(/\(,/) > -1 || xIter.search(/\(\)/) > -1) {return cError("Missing operand(s)")}
		return strConvert(eval(xIter.replace(/([a-z])\(/g,"$1S(").replace(/(Cv\[\d+\])/g,"'$1'").replace(/(Pv\[\d+\])/g,"'$1'").replace(/(Sv\[\d+\])/g,"'$1'")));
	}
	function cReduce(cRdce) {return iReduce(xReduce(cIterate(cRdce)))} //full expression reduction
	function xReduce(xRdce) { //basic expression reduction
		function pxpExecute(xIn) {Pv = [];return cIterate(cIterate(xIn.replace(/cMul\(/g,"vMul(").replace(/cDiv\(/g,"vDiv(").replace(/cNeg\(/g,"vNeg(")).replace(/Pv\[(\d+)\]/g,"pxp($1)"))}
		function smxExecute(xIn) {Sv = [];return cIterate(cIterate(xIn.replace(/cAdd\(/g,"vAdd(").replace(/cSub\(/g,"vSub(")).replace(/Sv\[(\d+)\]/g,"smx($1)"))}
		xRdce = smxExecute(cIterate(xRdce)); //reduce sum-difference terms	
		pxpFlag = true; //convert cDiv denominator to cPow(x,-1)
		xRdce = pxpExecute(cIterate(xRdce)); //reduce product-quotient-exponent terms
		pxpFlag = false;
		xRdce = smxExecute(xRdce); //reduce sum-difference terms 2nd pass
		xRdce = pxpExecute(xRdce); //reduce product-quotient-exponent terms 2nd pass
		return xRdce
	}
	function iReduce(iRdce) { //reduce by iterative expansion
		var iInv = cDissect(iRdce);
		var iCount = [];
		var xFlag = true;
		//count the number of occurrances of each element, if any greater than 1, run expansion 
		for (var iC=0;iC<iInv.length;iC++) {if (nbrTest(iInv[iC]) || !iInv[iC] || !varTest(iInv[iC])) {iCount[iC] = 0} else {iCount[iC] = iRdce.split(iInv[iC]).length-1};if (iCount[iC] > 1) {xFlag = false}}
		if (xFlag) {return iRdce}
		var iTemp = xReduce(iExpand(iRdce));
		for (var iC=0;iC<iInv.length;iC++) {
			if (iTemp.split(iInv[iC]).length-1 > iCount[iC] && iCount[iC] != 0) {break} //if element count is greater then return unchanged
			if (iTemp.split(iInv[iC]).length-1 < iCount[iC] && iCount[iC] != 0) {return iTemp} //if element count is smaller then return expanded result
		}
		return iRdce
	}
	function smxS(xU) { //consolidate sum-difference terms 2a-b+c/d -> [(2a),(-b),(c/d)]
		Sv[xU] = strConvert(Sv[xU]);
		for (var xI=0;xI<Sv.length;xI++) {for (var yI=0;yI<Sv.length;yI++) {if (xI != yI && Sv[xI] == Sv[yI]) {var rgx = new RegExp("Sv\\["+yI+"\\]","g");Sv[xU] = Sv[xU].replace(rgx,"Sv["+xI+"]")}}} //consolidate identical pointers
		var tSum = Sv[xU].split("_").sort(
			function(aS,bS){	
				if (strTest(aS,"cPow") || strTest(bS,"cPow")) {//sort alpha with powers in descending polynomial order
					if (!strTest(bS,"cPow") && strTest(aS,"cPow")) {return 1}
					else if (!strTest(aS,"cPow") && strTest(bS,"cPow")) {return -1}
					else  {
						var aP = aS.match(/cPow\(Cv\[\d+\]\,(\d+)\)/)+"",bP = bS.match(/cPow\(Cv\[\d+\]\,(\d+)\)/)+"";
						return aP > bP ? 1 : aP < bP ? -1 : 0;
					}
				}
				return aS < bS ? -1 : aS > bS ? 1 : 0;
			}
		);
		var sTerms = {Terms:[],Factors:[],Divisors:[]}; //collector for segregated terms
		var tReturn = 0;
		for (var xI=0;xI<tSum.length;xI++) { //extract factors trom tSum array
			var tExtract = opExtract(tSum[xI]);
			if      (nbrTest(tSum[xI])) {tReturn = (+tSum[xI])+tReturn} //combine numerical terms into tReturn
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
		for (var xI=0;xI<sTerms.Terms.length;xI++) { //Extract and consolidate numeric divisors
			var tExtract = opExtract(sTerms.Terms[xI]);		
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
		for (var xI=0;xI<sTerms.Terms.length;xI++) { //consolidate common numerators
			for (var yI=0;yI<sTerms.Terms.length;yI++) {
				if (xI != yI && sTerms.Terms[xI] == sTerms.Terms[yI]) {
					sTerms.Factors[yI] = cAddS(cMulS(sTerms.Factors[yI],sTerms.Divisors[xI]),cMulS(sTerms.Factors[xI],sTerms.Divisors[yI]));
					sTerms.Divisors[yI] = cMulS(sTerms.Divisors[xI],sTerms.Divisors[yI]);
					sTerms.Factors[xI] = 0;sTerms.Divisors[xI] = 1;
				}		
			}
		}
		for (var xI=0;xI<sTerms.Terms.length;xI++) { //consolidate common divisors
			var tExtract = opExtract(sTerms.Terms[xI]);
			if (tExtract.func == "cDiv") {
				sTerms.Terms[xI] = tExtract.upper;
				sTerms.Divisors[xI] = cMulS(sTerms.Divisors[xI],tExtract.lower);
				for (var yI=0;yI<sTerms.Terms.length;yI++) {
					if (xI != yI && sTerms.Divisors[xI] == sTerms.Divisors[yI]) {
						sTerms.Terms[yI] = cAddS(cMulS(sTerms.Terms[yI],sTerms.Factors[yI]),cMulS(sTerms.Factors[xI],sTerms.Terms[xI]));
						sTerms.Factors[yI] = 1;sTerms.Factors[xI] = 0;sTerms.Divisors[xI] = 1;
					}		
				}
			}
		}
		tReturn = strConvert(tReturn); //accumulator
		if (!sTerms.Terms[0]) {return tReturn}
		var fTempA = 0;//sums accumulator
		var fTempB = 0;//differences accumulator
		var fTempC = 0;//constants of integration accumulator
		for (var xI=0;xI<sTerms.Terms.length;xI++) {
			if (strConvert(sTerms.Terms[xI]).search(/Cv\[111\d+\]/) > -1) {fTempC = cAddS(cDivS(cMulS(sTerms.Factors[xI],sTerms.Terms[xI]),sTerms.Divisors[xI]),fTempC)} //collect constants of integration 
			else if (+sTerms.Factors[xI] >0) {fTempA = cAddS(cDivS(cMulS(sTerms.Factors[xI],sTerms.Terms[xI]),sTerms.Divisors[xI]),fTempA)} //collect sums
			else {fTempB = cAddS(fTempB,cDivS(cMulS(cNegS(sTerms.Factors[xI]),sTerms.Terms[xI]),sTerms.Divisors[xI]))} //collect differences
		}
		tReturn = cAddS(cAddS(fTempA,cNegS(fTempB)),tReturn);
		tReturn = strConvert(tReturn);fTempC = strConvert(fTempC);
		tReturn = cIterate(tReturn.replace(/Sv\[(\d+)\]/g,"smx($1)"));
		tReturn = cAddS(tReturn,cIterate(fTempC.replace(/Sv\[(\d+)\]/g,"smx($1)")))//constants of integration
		return tReturn
	}
	function pxpS(xU) { //consolidate product-quotient-exponent terms 2ab/(cd) -> [(2),(a),(b),(c^-1),(d^-1)]
		Pv[xU] = strConvert(Pv[xU]);
		for (var xI=0;xI<Pv.length;xI++) {for (var yI=0;yI<Pv.length;yI++) {if (xI != yI && Pv[xI] == Pv[yI]) {var rgx = new RegExp("Pv\\["+yI+"\\]","g");Pv[xU] = Pv[xU].replace(rgx,"Pv["+xI+"]")}}} //consolidate identical pointers
		var tPrd = Pv[xU].split("_").sort(); //sort alpha
		var pTerms = {Terms:[],Exp:[]}; //collector for segregated terms
		var tReturn = 1;
		for (var xI=0;xI<tPrd.length;xI++) {//collect and consolidate segregated terms from tPrd array
			var tExtract = opExtract(tPrd[xI]);
			if (nbrTest(tPrd[xI])) {tReturn = cMulS(tPrd[xI],tReturn)} //combine numerical terms into tReturn
			else if  (tExtract.func == "cPow") { //collect exponents
				if (strTest(pTerms.Terms,tExtract.upper)) {pTerms.Exp[pTerms.Terms.indexOf(tExtract.upper)] = cAddS(pTerms.Exp[pTerms.Terms.indexOf(tExtract.upper)],tExtract.lower)} //combine duplicates into exponents
				else {pTerms.Terms.push(tExtract.upper);pTerms.Exp.push(tExtract.lower)} //push unique terms with exponents
			}
			else if (strTest(pTerms.Terms,tPrd[xI])) {(pTerms.Exp[pTerms.Terms.indexOf(tPrd[xI])]) = cAddS(pTerms.Exp[pTerms.Terms.indexOf(tPrd[xI])],1)}
			else    {pTerms.Terms.push(tPrd[xI]);pTerms.Exp.push(1)} //push unique terms without exponents
		}
		if (!pxpFlag) {
			for (var xI=0;xI<pTerms.Terms.length;xI++) { // Iterate divisors
				for (var yI=0;yI<pTerms.Terms.length;yI++) {
					if (xI != yI && +pTerms.Exp[yI] == -1 && +pTerms.Exp[xI] == 1 && cDivS(pTerms.Terms[xI],pTerms.Terms[yI]) != "cDiv("+pTerms.Terms[xI]+","+pTerms.Terms[yI]+")") {
						pTerms.Terms[yI] = cDivS(pTerms.Terms[xI],pTerms.Terms[yI]);
						pTerms.Exp[yI] = 1;pTerms.Terms[xI] = 1;pTerms.Exp[xI] = 1;
					}
				}
			}
		}
		tReturn = strConvert(tReturn); //accumulator
		if (!pTerms.Terms[0]) {return tReturn}
		if (strTest(pTerms.Terms,tReturn)) {pTerms.Exp[pTerms.Terms.indexOf(tReturn)] = cAddS(pTerms.Exp[pTerms.Terms.indexOf(tReturn)],1);tReturn = "1"}
		var fTempU = 1,fTempL = 1; //upper and lower accumulators
		for (var xI=0;xI<pTerms.Terms.length;xI++) { //consolidate terms into accumulaters
			var tExtract = opExtract(pTerms.Exp[xI]);
			if  (nbrTest(pTerms.Terms[xI]) && pTerms.Exp[xI] == -1) {//calculate GCF on integers
				var tGcf = cGcf(tReturn,+pTerms.Terms[xI]);
				tReturn = cDivS(tReturn,tGcf);
				fTempL = cMulS(fTempL,cDivS(pTerms.Terms[xI],tGcf))
			}
			else if (+pTerms.Exp[xI] == 1)  {fTempU = cMulS(fTempU,cPowS(pTerms.Terms[xI],1))}
			else if (+pTerms.Exp[xI] > 0)   {fTempU = cMulS(fTempU,cPowS(pTerms.Terms[xI],pTerms.Exp[xI]))}
			else if (+pTerms.Exp[xI] < 0)   {fTempL = cMulS(fTempL,cPowS(pTerms.Terms[xI],cNegS(pTerms.Exp[xI])))}
			else if (tExtract.func == "cNeg") {fTempL = cMulS(fTempL,cPowS(pTerms.Terms[xI],tExtract.upper))}
			else    {fTempU = cMulS(fTempU,cPowS(pTerms.Terms[xI],pTerms.Exp[xI]))}
		}
		tReturn = cDivS(cMulS(tReturn,fTempU),fTempL);
		tReturn = strConvert(tReturn);
		tReturn = cIterate(tReturn.replace(/Pv\[(\d+)\]/g,"pxp($1)"));
		return tReturn
	}
	function SvTest(xTest) {if (xTest == "Sv["+(Sv.length-1)+"]") {return true};return false}
	function PvTest(xTest) {if (xTest == "Pv["+(Pv.length-1)+"]") {return true};return false}
	function SvPointer(xP) { //resolve SV pointers
		var svTemp = strConvert(xP).match(/Sv\[\d+\]/);
		if (xP == svTemp && svTemp != "Sv["+(Sv.length-1)+"]") {return eval(xP)}
		return xP
	}
	function PvPointer(xP) { //resolve PV pointers
		var svTemp = strConvert(xP).match(/Pv\[\d+\]/);
		if (xP == svTemp && svTemp != "Pv["+(Pv.length-1)+"]") {return eval(xP)}
		return xP
	}
	function vAddS(xU,xL) { //parse cAdd into Sv
		if      (SvTest(xU) && !SvTest(xL)) {Sv[Sv.length-1] = Sv[Sv.length-1]+"_"+SvPointer(xL)}
		else if (SvTest(xL) && !SvTest(xU)) {Sv[Sv.length-1] = Sv[Sv.length-1]+"_"+SvPointer(xU)}
		else    {Sv.push(SvPointer(xU)+"_"+SvPointer(xL))}
		return "Sv["+(Sv.length-1)+"]";
	}
	function vSubS(xU,xL) { //parse cSub into Sv
		if (SvTest(xU) && !SvTest(xL)) {Sv[Sv.length-1] = Sv[Sv.length-1]+"_"+cNegS(xL)}
		else if (SvTest(xL) && !SvTest(xU)) {
			var tDif = Sv[Sv.length-1].split("_");
			Sv[Sv.length-1] = SvPointer(xU);
			for (var tD=0;tD<tDif.length;tD++) {Sv[Sv.length-1] = Sv[Sv.length-1]+"_"+cNegS(tDif[tD])}
		}
		else {Sv.push(SvPointer(xU)+"_"+cNegS(xL))}
		return "Sv["+(Sv.length-1)+"]";
	}
	function vMulS(xU,xL) { //parse cMul into Pv
		if      (PvTest(xU) && !PvTest(xL)) {Pv[Pv.length-1] = Pv[Pv.length-1]+"_"+PvPointer(xL)}
		else if (PvTest(xL) && !PvTest(xU)) {Pv[Pv.length-1] = Pv[Pv.length-1]+"_"+PvPointer(xU)}
		else    {Pv.push(PvPointer(xU)+"_"+PvPointer(xL))}
		return "Pv["+(Pv.length-1)+"]";
	}
	function vDivS(xU,xL) { //parse cDiv into Pv
		if (PvTest(xU) && !PvTest(xL)) {
			var xTractL = opExtract(xL);
			if (xTractL.func == "cPow") {Pv[Pv.length-1] = Pv[Pv.length-1]+"_cPow("+xTractL.upper+","+cNegS(xTractL.lower)+")" }
			else {Pv[Pv.length-1] = Pv[Pv.length-1]+"_"+cPowS(xL,-1)}
		}
		else if (PvTest(xL) && !PvTest(xU)) {
			var tDiv= Pv[Pv.length-1].split("_");
			Pv[Pv.length-1] = PvPointer(xU);
			for (var tD=0;tD<tDiv.length;tD++) {
				var xTractL = opExtract(tDiv[tD]);
				if (xTractL.func == "cPow") {Pv[Pv.length-1] = Pv[Pv.length-1]+"_cPow("+xTractL.upper+","+cNegS(xTractL.lower)+")" }
				else {Pv[Pv.length-1] = Pv[Pv.length-1]+"_cPow("+tDiv[tD]+",-1)" }
			}
		}
		else {Pv.push(PvPointer(xU)+"_"+cPowS(xL,-1))}
		return "Pv["+(Pv.length-1)+"]";
	}
	function vNegS(xU) { //parse cNeg into Pv
		if (strTest(xU,"Cv[8734]")) {return "cNeg("+xU+")"}
		else if (PvTest(xU)) {Pv[Pv.length-1] = Pv[Pv.length-1]+"_-1"}
		else {Pv.push(PvPointer(xU)+"_-1")}
		return "Pv["+(Pv.length-1)+"]";
	}
	//Polynomials
	function parseTerms(xP) { //parse terms into elements
		function pTrmS(xU,xL) {
			var xTractU = opExtract(xU);
			var xTractL = opExtract(xL);
			if (xTractU.func == "cMul") {pTrmS(xTractU.upper,xTractU.lower)}
			if (xTractL.func == "cMul") {pTrmS(xTractL.upper,xTractL.lower)}
			if (xTractU.func == "cNeg") {pNegS(xTractU.upper)}
			if (xTractL.func == "cNeg") {pNegS(xTractL.upper)}
			if (typeof xU != "undefined" && xTractU.func != "cMul" && xTractU.func != "cNeg") {nTerms.push(xU)}
			if (typeof xL != "undefined" && xTractL.func != "cMul" && xTractL.func != "cNeg") {nTerms.push(xL)}
		}
		function pNegS(xU) {
			var xTractU = opExtract(xU);
			if (xTractU.func == "cMul") {nTerms.push("-1"),pTrmS(xTractU.upper,xTractU.lower)}
			if (typeof xU != "undefined") {nTerms.push("-1"),nTerms.push(xU)}
		}
		xP = strConvert(xP);
		var nTerms = [];
		var xTractU = opExtract(xP);
		if (xTractU.func != "cMul" && xTractU.func != "cNeg") {return [xP]}
		eval(xP.replace(/([a-z])\(/g,"$1S(").replace(/(Cv\[\d+\])/g,"'$1'").replace(/cMulS\(/,"pTrmS(").replace(/(Pv\[\d+\])/g,"'$1'").replace(/(Sv\[\d+\])/g,"'$1'"));
		return nTerms
	}
	function parsePoly(xP) { //parse polynomials into terms
		function pAddS(xU,xL) {if (typeof xU != "undefined") {nTerms.push(xU)};if (typeof xL != "undefined") {nTerms.push(xL)}}
		function pSubS(xU,xL) {if (typeof xU != "undefined") {nTerms.push(xU)};if (typeof xL != "undefined") {nTerms.push(cNegS(xL))}}
		var nTerms = [];
		var xTractU = opExtract(xP);
		if (xTractU.func == "cMul" || xTractU.func == "cDiv" || xTractU.func == "cNeg" || xTractU.func == "cPow") {
			if (!strTest(xP,"cAdd") && !strTest(xP,"cSub")) {nTerms.push(xP)}
			else {return [xP]}
		}
		xP = strConvert(xP);
		eval(xP.replace(/cAdd\(/g,"pAdd(").replace(/cSub\(/g,"pSub(").replace(/([a-z])\(/g,"$1S(").replace(/(Cv\[\d+\])/g,"'$1'").replace(/(Sv\[\d+\])/g,"'$1'").replace(/(Pv\[\d+\])/g,"'$1'"));
		return nTerms
	}
	function aGcf(xG){ //find GCF of integer array
		var tGcf = new Array(xG.length);
		for (var xI=0;xI<xG.length;xI++) {tGcf[xI]= xG[xI]}
		tGcf = tGcf.sort(function(aS,bS){return Math.abs(aS) > Math.abs(bS) ? -1 : Math.abs(aS) < Math.abs(bS) ? 1 : 0;})[0];//find largest coeff
		for (var xI=0;xI<xG.length;xI++) {
			if (!nbrTest(xG[xI]) || xG[xI] != Math.floor(xG[xI]) || typeof xG[xI] == "undefined") {return 1}
			if (+xG[xI] != 0) {tGcf = cGcf(+tGcf,+xG[xI])}
		}
		return tGcf
	}
	function pNomial(pN,pVar) { //parse polynomial into ranked array
		var pnTerms = [],pReturn = [],pDegree = 0;
		if (typeof pVar == "undefined") {pVar = pVariable(pN)}
		if (!pVar) {return [pN]}
		pnTerms = parsePoly(pN);
		for (var pD=0;pD<pnTerms.length;pD++) {
			if (!strTest(pnTerms[pD],pVar) && !pReturn[0]) {pReturn[0] = pnTerms[pD]}
			else if (pnTerms[pD] == pVar) {pReturn[1] = pnTerms[pD]}
			else {
				var xTractD = opExtract(pnTerms[pD]);
				for (var iXf=0;iXf<6;iXf++) {
					if (xTractD == pVar) {break}
					else if (xTractD.func == "cPow" && xTractD.upper == pVar) {break}
					else if (xTractD.func == "cPow" && strTest(xTractD.upper,pVar)) {return [pN]}
					else if (xTractD.func == "cPow" && strTest(xTractD.lower,pVar)) {return [pN]}
					else if (xTractD.upper == pVar || xTractD.lower == pVar)  {xTractD = pVar;break}
					else if (xTractD.func == "cMul" && xTractD.upper == pVar) {xTractD = pVar;break}
					else if (xTractD.func == "cMul" && xTractD.lower == pVar) {xTractD = pVar;break}
					else if (xTractD.func == "cMul" && strTest(xTractD.upper,pVar)) {xTractD = opExtract(xTractD.upper)}
					else if (xTractD.func == "cMul" && strTest(xTractD.lower,pVar)) {xTractD = opExtract(xTractD.lower)}
					else if (xTractD.func == "cDiv" && strTest(xTractD.upper,pVar)) {xTractD = opExtract(xTractD.upper)}
					else if (xTractD.func == "cDiv" && strTest(xTractD.lower,pVar)) {return [pN]}
					else if (xTractD.func == "cNeg" && strTest(xTractD.upper,pVar)) {xTractD = opExtract(xTractD.upper)}
					else {return [pN]}
				}
				if (xTractD == pVar) {pReturn[1] = pnTerms[pD];pDegree = 1}
				else if (xTractD.func == "cPow" && xTractD.upper == pVar && nbrTest(xTractD.lower) && xTractD.lower > 0 && xTractD.lower == Math.floor(xTractD.lower)) {
					pReturn[+xTractD.lower] = pnTerms[pD];
					if (+xTractD.lower > pDegree) {pDegree = +xTractD.lower}
				}
				else {return [pN]}
			}
		}
		for (var pD=0;pD<=pDegree;pD++) {if (!pReturn[pD] || typeof pReturn[pD] == "undefined") {pReturn[pD] = 0} }
		return pReturn
	}
	function pExpand(pE) { //recreate polynomial from pNomial array
		var xReturn = "0";
		for (var pD=0;pD<pE.length;pD++) {xReturn = cAddS(pE[pD],xReturn)}
		return xReduce(xReturn)
	}
	function pVariable(vP) { //ID dominant polynomial variable
		vP = strConvert(vP);
		var pTest = [];
		var vReturn = "";
		var vInv = cInventory(vP);
		for (var nXs=0;nXs<vInv.length;nXs++) {
			var vTmp = "Cv[" + vInv[nXs] + "]"
            var pTemp = pNomial(vP,vTmp)
            if (pTest.length < pTemp.length) {pTest = pTemp;vReturn = vTmp}
		}
		return vReturn
	}
	function pCoeff(xC) { //return array of polynomial coefficients from input array
		var xCoeff = [];
		for (var xI=0;xI<xC.length;xI++) {
			var tExtract = opExtract(xC[xI]);
			if      (nbrTest(xC[xI])) {xCoeff[xI] = (+xC[xI])}
			else if (tExtract.func == "cMul" && nbrTest(tExtract.upper)) {xCoeff[xI] = +tExtract.upper}
			else if (tExtract.func == "cMul" && nbrTest(tExtract.lower)) {xCoeff[xI] = +tExtract.lower}
			else if (tExtract.func == "cNeg" && nbrTest(tExtract.upper)) {xCoeff[xI] = +tExtract.upper}
			else if (tExtract.func == "cNeg" && !nbrTest(tExtract.upper)) {xCoeff[xI] = -1}
			else    {xCoeff[xI] = 1}
		}
		return xCoeff
	}
	function pDivide(xU,xL) { //polynomial division
		var fGcf = cGcf(aGcf(pCoeff(pNomial(xU))),aGcf(pCoeff(pNomial(xL)))); //calculate GCF 
		if (fGcf != 0 && fGcf != 1) {xU = cDivS(xU,fGcf); xL = cDivS(xL,fGcf)} //apply GCF
		var pVar = pVariable(xU);
		var polyU = pNomial(xU,pVar);
		var polyL = pNomial(xL,pVar);	
		if (!strTest(xL,pVar)) {pVar = pVariable(xL)} //select primary variable
		if (!strTest(xU,pVar) || pVar == "") {return "cDiv("+xU+","+xL+")"}	
		if (!strTest(xU,pVariable(xL)) || polyU.length < polyL.length || polyU.length < 2 || polyL.length < 2 || strTest(xU,xL)) {return "cDiv("+xU+","+xL+")"}
		if (polyU.length > 1 && polyL.length > 1 && cInventory(polyU[polyU.length-1]).length > 2) {return "cDiv("+xU+","+xL+")"} //fix for compound terms in numerator
		var dReturn = "0";
		var pDegree = polyU.length;
		var uTemp = xReduce(xU);
		var tTemp;
		for (var pT=0;pT<pDegree;pT++) {
			tTemp = xReduce(cDivS(polyU[polyU.length-1],polyL[polyL.length-1]));
			uTemp = xReduce(cSubS(uTemp,cExpand(cMulS(tTemp,xL))));
			dReturn = xReduce(cAddS(dReturn,tTemp));
			polyU = pNomial(uTemp,pVar);
			if (+uTemp == 0 || !strTest(uTemp,pVar) || strTest(uTemp,"cDiv(")) {break}
		}
		return xReduce(cAddS(dReturn,cDivS(uTemp,xL)))
	}

	//Algebra
	function cPowS(xU,xL) {
		var xTractU = opExtract(xU);
		var xTractL = opExtract(xL);
		if (xTractU.func == "mat") {
			if (xL == "Cv[84]" || xL == "Cv[10084]") {return matFunc(trn(matArray(xU)))} //transpose matrix M^T
			if (+xL != int(xL)) {return "undefined"}
			if (+xL <= -1) {return cPowS(invS(xU),cNegS(xL))} //inverse matrix M^-n
			if (+xL == 0)  {return matFunc(matIdentity(matArray(xU)))} //identity matrix M^0
			var mReturn = xU
			for (var iM=1;iM<xL;iM++) {mReturn = cMulS(mReturn,xU)}
			return mReturn
		}
		if ((xU == "Cv[8734]" || xL == "Cv[8734]") ) {return "Cv[8734]"}
		if (xTractU.func == "cAdd" || xTractU.func == "cSub" || xTractU.func == "cTms" || xTractU.func == "cDiv" || xTractU.func == "cMul" || xTractU.func == "cPow") {xU = "("+xU+")"}
		if (xTractL.func == "cAdd" || xTractL.func == "cSub" || xTractL.func == "cTms" || xTractL.func == "cDiv" || xTractL.func == "cMul" || xTractL.func == "cNeg") {xL = "("+xL+")"}
		if (xTractU.func == "cPow") {return "cPow("+xTractU.upper+","+cMulS(xTractU.lower,xL)+")"}
		if (+xU == 1) {return 1}
		if (+xL == 1) {return xU}
		if (+xU == 0) {return 0}
		if (+xL == 0) {return 1}
		if (xTractL.func == "cDiv" && +xTractL.upper == 1 && +xTractL.lower == 2) {return sqtS(xU)}
		if (+xL == .5) {return sqtS(xU)}
        if (nbrTest(xU) && nbrTest(xL) && cPow(xU,xL) < 1e6 && cPow(xU,xL) == int(cPow(xU,xL))) {return cFunc(fmtResult(cPow(xU,xL)))}
		if (abs(+xL) < 1 && abs(+xL) > 0 && cDiv(1,xL) == int(cDiv(1,xL))) {return "cPow("+xU+",cDiv(1,"+cDiv(1,xL)+"))"}
		if (xTractL.func == "cDiv" && +xTractL.upper == 1 && +xTractL.lower == 3) {return cbtS(xU)}
		if (!pxpFlag && +xL == 1.5 && nbrTest(xU)) {return cMulS(xU,sqtS(xU))}
		if (!pxpFlag && nbrTest(xL) && +xL != int(+xL) && cMul(+xL,2) == int(cMul(+xL,2))) {return cPowS(xU,cDivS(cMul(+xL,2),2))}
		if (!pxpFlag && +xL < 0 && +xU != 0) {return cDivS(1,cPowS(xU,cNegS(xL)))}
		if (!pxpFlag && xTractL.func == "cNeg") {return cDivS(1,cPowS(xU,xTractL.upper))}
		if (!pxpFlag && xTractL.func == "cDiv" && +xTractL.upper < 0 && +xTractL.lower != 0) {return cDivS(1,cPowS(xU,cDivS(cNegS(xTractL.upper),xTractL.lower)))}
		if (xU == "Cv[46]" && +xL == int(+xL) && mgConfig.Domain == "Complex") {return (cFunc(fmtResult(cPow(Cv[46],xL))))}
		if (xU == "Cv[8]" && xTractL.func == "lne") {return xTractL.upper}
		if (xU == "Cv[8]" && strTest(xL,"Cv[46]") && cIterate(xL) == "cMul(Cv[46],Cv[29])") {return -1}
		if (xTractU.func == "cMul" && nbrTest(xL)) {return "cMul(cPow("+xTractU.upper+","+xL+"),cPow("+xTractU.lower+","+xL+"))" }
		if (xTractU.func == "cDiv" && nbrTest(xL)) {return "cDiv(cPow("+xTractU.upper+","+xL+"),cPow("+xTractU.lower+","+xL+"))" }
		if (xTractU.func == "abs" && nbrTest(xL) && cDiv(+xL,2) == int(cDiv(+xL,2))) {return cPowS(xTractU.upper,xL)}
        if (xTractU.func == "sqt" && +xL == 2) {return xTractU.upper}
        if (xTractU.func == "cbt" && +xL == 3) {return xTractU.upper}
		return "cPow("+xU+","+xL+")"
	}
	function cMulS(xU,xL) {
		function scalarMult(xM,xC) { //matrix scalar multiply
			xM = matArray(xM);
			var mReturn = xM;
			for (var iR=0;iR<xM.length;iR++) {
				for (var iC=0;iC<xM[iR].length;iC++) {mReturn[iR][iC] = cMulS(matFunc(xM[iR][iC]),xC)}
			}
			return matFunc(mReturn)		
		}
		var xTractU = opExtract(xU);
		var xTractL = opExtract(xL);
		if (xTractU.func == "cAdd" || xTractU.func == "cSub" || xTractU.func == "cDiv") {xU = "("+xU+")"}
		if (xTractL.func == "cAdd" || xTractL.func == "cSub" || xTractL.func == "cDiv") {xL = "("+xL+")"}
		if (xTractU.func == "mat" && xTractL.func != "mat") {return scalarMult(xU,xL)}
		if (xTractL.func == "mat" && xTractU.func != "mat") {return scalarMult(xL,xU)}
		if (xTractU.func == "mat" && xTractL.func == "mat") { //matrix multiply
			xU = matArray(xU);
			xL = matArray(xL);
			var rowsU = xU.length;
			var colsU = xU[0].length;
			var rowsL = xL.length;
			var colsL = xL[0].length;
			if (rowsL != colsU) {return "undefined"}
			var mReturn = matCreate(rowsU,colsL);
			for (var rU=0;rU<rowsU;rU++) {
				for (var cL=0;cL<colsL;cL++) {
					for (var cU=0;cU<colsU;cU++) {
						var mTemp = cMulS(matFunc(xU[rU][cU]),matFunc(xL[cU][cL]));
						if (mReturn[rU][cL] == 0) {mReturn[rU][cL] = mTemp}
						else {mReturn[rU][cL] = cAddS(mReturn[rU][cL],mTemp)}
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
		if (+xL == 0 || +xU == 0) {return 0}
		if (xU == "Cv[8734]" || xL == "Cv[8734]" ) {return "Cv[8734]"}
		if (nbrTest(xU) && nbrTest(xL)) {return cMul(xU,xL)}
		if (nbrTest(xU) && xTractL.func == "cPow" && nbrTest(xTractL.upper)) {xL = "("+xL+")"}
		if (+xL == 1)  {return xU}
		if (+xU == 1)  {return xL}
		if (+xL == -1) {return cNegS(xU)}
		if (+xU == -1) {return cNegS(xL)}
		if (xU == xL)  {return cPowS(xU,2)}
		if (!pxpFlag && xTractU.func == "sqt" && xTractL.func == "sqt") {return "sqt(cMul("+xTractU.upper+","+xTractL.upper+"))"}
		if (!pxpFlag && +xU == .5)  {return cDivS(xL,2)}
		if (xTractU.func == "cPow" && xTractL.func == "cPow" && xTractU.upper == xTractL.upper)  {return cPowS(xTractU.upper,cAddS(xTractU.lower,xTractL.lower))}
		if (xTractL.func == "cPow" && xTractU.func == "cPow" && xTractL.lower == xTractU.lower && !nbrTest(xTractL.lower)) {return cPowS(cMulS(xTractL.upper,xTractU.upper),xTractU.lower)} // reduce
		if (!factorFlag && xTractL.func == "cMul" && nbrTest(xU) && nbrTest(xTractL.upper)) {return cMulS(cMul(xU,xTractL.upper),xTractL.lower)}
		if (xTractU.func == "cNeg") {return cNegS(cMulS(xTractU.upper,xL))}
		if (xTractL.func == "cNeg") {return cNegS(cMulS(xU,xTractL.upper))}
		if (xTractU.func == "abs" && xTractL.func == "abs") {return absS(cMulS(xTractU.upper,xTractL.upper))}
		if (!pxpFlag && xTractU.func == "cDiv" && xTractL.func == "cDiv") {return cDivS(cMulS(xTractU.upper,xTractL.upper),cMulS(xTractU.lower,xTractL.lower))}
		if (!pxpFlag && xTractU.func == "cDiv" && xTractL.func != "cDiv") {return cDivS(cMulS(xL,xTractU.upper),xTractU.lower)}
		if (!pxpFlag && xTractL.func == "cDiv" && xTractU.func != "cDiv") {return cDivS(cMulS(xU,xTractL.upper),xTractL.lower)}
		if (!factorFlag && xTractL.func == "cAdd" && nbrTest(xU)) {return cAddS(cMulS(xU,xTractL.upper),cMulS(xU,xTractL.lower))}
		if (!factorFlag && xTractL.func == "cSub" && nbrTest(xU)) {return cSubS(cMulS(xU,xTractL.upper),cMulS(xU,xTractL.lower))}
		if (xTractU.func == "cMul") {return "cMul("+xTractU.upper+",cMul("+xTractU.lower+","+xL+"))"}
		if (nbrTest(xTractL.upper) && xTractU.func == "cPow" && nbrTest(xTractU.lower)) {return cMulS(xL,xU)}
		if (strTest(xU,"Cv[8748]") || strTest(xU,"ntp(")) {return "cMul("+xL+","+xU+")"}
		if (!nbrTest(xU) && nbrTest(xL)) {return "cMul("+xL+","+xU+")"}
		return "cMul("+xU+","+xL+")"
	}
	function cTmsS(xU,xL) {return cMulS(xU,xL)}
	function cDotS(xU,xL) {return cMulS(xU,xL)}
	function cDivS(xU,xL) {
		var xTractU = opExtract(xU);
		var xTractL = opExtract(xL);
		if (xTractU.func == "cAdd" || xTractU.func == "cSub") {xU = "("+xU+")"}
		if (xTractL.func == "cAdd" || xTractL.func == "cSub") {xL = "("+xL+")"}
		if (xU == "Cv[8734]") {return "Cv[8734]"}
		if (xU == "cNeg(Cv[8734])" && !nbrEven(xL)) {return "cNeg(Cv[8734])"}
		if (xU == "cNeg(Cv[8734])" && nbrEven(xL)) {return "Cv[8734]"}
		if (!pxpFlag && !limitFlag && +xU < 0) {return cNegS(cDivS(cNegS(xU),xL))}
		if (!pxpFlag && !limitFlag && xTractU.func == "cNeg") {return cNegS(cDivS(xTractU.upper,xL))}
		if (xL == "Cv[8734]" && !limitFlag) {return "undefined"}	
		if (+xL == 0) {return "undefined"}
		if (+xU == 0) {return 0}
		if (+xL == 1) {return xU}
		if (xU == xL) {return 1}
		if (+xL < 0)  {return cDivS(cNegS(xU),cNegS(xL))}
		if (nbrTest(xU) && nbrTest(xL) && cDiv(xU,xL) == int(cDiv(xU,xL))) {return cDiv(xU,xL)}
		if (nbrTest(xU) && nbrTest(xL)) {var gTmp = cGcf(+xU,+xL);if (gTmp > 1) {return cDivS(cDiv(+xU,gTmp),cDiv(+xL,gTmp))}}		
		if (xTractU.func == "cMul" && nbrTest(xTractU.upper) && nbrTest(xL)) {
			var gTmp = cGcf(+xTractU.upper,+xL);
			if (gTmp > 1) {return cDivS(cMulS(cDiv(+xTractU.upper,gTmp),xTractU.lower),cDiv(+xL,gTmp))}
		}
        if (xTractL.func == "cSub") {
            var xTractB = opExtract(xTractL.upper);
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
		if (+xL == 2 && xprMatch(xU,"cSub(1,cos(cMul(2,Cv[9999])))")) {return cPowS(sinS(xprMatch(xU,"cSub(1,cos(cMul(2,Cv[9999])))")),2)}
		if (+xL == 2 && xprMatch(xU,"cAdd(cos(cMul(2,Cv[9999])),1)")) {return cPowS(cosS(xprMatch(xU,"cAdd(cos(cMul(2,Cv[9999])),1)")),2)}
		if (+xL == 2 && xprMatch(xU,"cSub(1,sin(cMul(2,Cv[9999])))")) {return cPowS(sinS(xprMatch(xU,"cSub(1,sin(cMul(2,Cv[9999])))")),2)}
		if (+xL == 2 && xprMatch(xU,"cSub(csh(cMul(2,Cv[9999])),1)")) {return cPowS(snhS(xprMatch(xU,"cSub(csh(cMul(2,Cv[9999])),1)")),2)}
		if (+xL == 2 && xprMatch(xU,"cAdd(csh(cMul(2,Cv[9999])),1)")) {return cPowS(cshS(xprMatch(xU,"cAdd(csh(cMul(2,Cv[9999])),1)")),2)}
		if (xTractU.func == "fac" && xTractL.func == "fac" && nbrTest(xTractU.upper) && nbrTest(xTractL.upper)) {return cDivS(fac(xTractU.upper),fac(xTractL.upper))}
		if (pxpFlag && xTractU.func == "cAdd" && (factorFlag || limitFlag)) {return cAddS(cDivS(xTractU.upper,xL),cDivS(xTractU.lower,xL))}
		if (pxpFlag && xTractU.func == "cSub" && (factorFlag || limitFlag)) {return cSubS(cDivS(xTractU.upper,xL),cDivS(xTractU.lower,xL))}
		if (!pxpFlag && xTractU.func == "cAdd" && pNomial(xL).length < 2) {return cAddS(cDivS(xTractU.upper,xL),cDivS(xTractU.lower,xL))}
        if (pxpFlag && xTractU.func == "cAdd" && (pNomial(xL).length < 2 || xTractL.func == "cMul")) {return cAddS(cDivS(xTractU.upper,xL),cDivS(xTractU.lower,xL))}
		if (pxpFlag && xTractU.func == "cSub" && (pNomial(xL).length < 2 || xTractL.func == "cMul")) {return cSubS(cDivS(xTractU.upper,xL),cDivS(xTractU.lower,xL))}
        if ((xTractL.func == "cAdd" || xTractL.func == "cSub") && !pxpFlag && !factorFlag) {return pDivide(xU,xL)}
		return "cDiv("+xU+","+xL+")"
	}
	function cAddS(xU,xL) {
		var xTractU = opExtract(xU);
		var xTractL = opExtract(xL);
		if (xTractU.func == "mat" && xTractL.func == "mat") {
			xU = matArray(xU);
			xL = matArray(xL);
			var mReturn = xU;
			for (var iR=0;iR<xU.length;iR++) {
				if (xU[iR].length != xL[iR].length) {return "undefined"}
				for (var iC=0;iC<xU[iR].length;iC++) {mReturn[iR][iC] = cAddS(xU[iR][iC],xL[iR][iC])}
			}
			return matFunc(mReturn)
		}
		if (xU == "Cv[8734]" || xL == "Cv[8734]" ) {return "Cv[8734]"}
		if (xU == "cNeg(Cv[8734])" || xL == "cNeg(Cv[8734])" ) {return "cNeg(Cv[8734])"}
		if (+xL == 0) {return xU}
		if (+xU == 0) {return xL}
		if (xU == xL) {return cMulS(2,xU)}
		if (nbrTest(xL) && +xL < 0) {return cSubS(xU,-xL)}
		if (nbrTest(xU) && nbrTest(xL)) {return cAdd(xU,xL)}
		if (nbrTest(xU) && !nbrTest(xL)) {return cAddS(xL,xU)}	
		if (xTractL.func == "cNeg") {return cSubS(xU,xTractL.upper)}
		if (xTractL.func == "cMul" && +xTractL.upper < 0) {return cSubS(xU,cMulS(-xTractL.upper,xTractL.lower))}
		if (xTractU.func == "cMul" && +xTractU.upper < 0) {return cSubS(xL,cMulS(-xTractU.upper,xTractU.lower))}
		if (xTractU.func == "cNeg" && strConvert(xL).search(/Cv\[111\d+\]/) == -1) {return cSubS(xL,xTractU.upper)} //constants of integration
		if (nbrTest(xU) && xTractL.func == "cDiv" && nbrTest(xTractL.upper) && nbrTest(xTractL.lower)) {return cDivS(cAddS(cMulS(xU,xTractL.lower),xTractL.upper),xTractL.lower)} 
		if (nbrTest(xL) && xTractU.func == "cDiv" && nbrTest(xTractU.upper) && nbrTest(xTractU.lower)) {return cDivS(cAddS(cMulS(xL,xTractU.lower),xTractU.upper),xTractU.lower)} 
		if (xTractU.func == "cDiv" && nbrTest(xTractU.upper) && nbrTest(xTractU.lower) && xTractL.func == "cDiv" && nbrTest(xTractL.upper) && nbrTest(xTractL.lower)) {return cDivS(cAddS(cMulS(xTractU.upper,xTractL.lower),cMulS(xTractL.upper,xTractU.lower)),cMulS(xTractU.lower,xTractL.lower))} 
		if (!pxpFlag && xTractU.func == "cDiv" && xTractL.func == "cDiv" && xTractU.lower == xTractL.lower) {return "cDiv(cAdd("+xTractU.upper+","+xTractL.upper+"),"+xTractU.lower+")"}
		if (!pxpFlag && xprMatch(xTractU.upper,"sqt(Cv[9999])") && xprMatch(xTractL.upper,"sqt(Cv[9999])") && xprMatch(xTractU.lower,"sqt(Cv[9999])") && xprMatch(xTractL.lower,"sqt(Cv[9999])")) {
			return cAddS(sqtS(cDivS(xprMatch(xTractU.upper,"sqt(Cv[9999])"),xprMatch(xTractU.lower,"sqt(Cv[9999])"))),sqtS(cDivS(xprMatch(xTractL.upper,"sqt(Cv[9999])"),xprMatch(xTractL.lower,"sqt(Cv[9999])"))))
		}
		if (xTractU.func == "csh" && xTractL.func == "snh" && xTractU.upper == xTractL.upper) {return cPowS("Cv[8]",xTractU.upper)}
		if (xTractU.func == "snh" && xTractL.func == "csh" && xTractU.upper == xTractL.upper) {return cPowS("Cv[8]",xTractU.upper)}
		if (xTractU.func == "tan" && xTractL.func == "cot") {
			var xTractT = opExtract(xTractU.upper);var xTractB = opExtract(xTractL.upper);
			if (xTractT.func == "cDiv" && xTractB.func == "cDiv" && +xTractT.lower == 2 && +xTractB.lower == 2 && xTractT.upper == xTractB.upper) {return cMulS(2,cscS(xTractT.upper))}
		}
		if (xTractU.func == "cPow" && xTractL.func == "cPow" && +xTractU.lower == 2 && +xTractL.lower == 2) {
			var xTractT = opExtract(xTractU.upper);var xTractB = opExtract(xTractL.upper);
			if (xTractT.func == "sin" && xTractB.func == "cos" && xTractT.upper == xTractB.upper) {return 1}
			if (xTractT.func == "cos" && xTractB.func == "sin" && xTractT.upper == xTractB.upper) {return 1}
		}
		if (xTractU.func == "cPow" && xTractL.func == "cPow" && +xTractU.lower == 2 && +xTractL.lower == 2) {
			var xTractT = opExtract(xTractU.upper);var xTractB = opExtract(xTractL.upper);
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
		if (xTractU.func == "cPow" && +xTractU.lower == 2 && +xL == 1) {
			var xTractT = opExtract(xTractU.upper);
			if (xTractT.func == "cot") {return cPowS(cscS(xTractT.upper),2)}
			if (xTractT.func == "tan") {return cPowS(secS(xTractT.upper),2)}
		}
		if (xTractU.func == "cDiv" && xTractL.func == "cDiv" && !nbrTest(xTractU.lower) && !nbrTest(xTractL.lower)){ //add fractions
			if (xTractU.lower == xTractL.lower && pNomial(xTractL.upper).length < pNomial(xTractU.lower).length && pNomial(xTractU.upper).length < pNomial(xTractU.lower).length) {return "cDiv("+cAddS(xTractU.upper,xTractL.upper)+","+xTractL.lower+")"}
			if (!factorFlag && !limitFlag) { //normalize denominators
				var lTemp = cDivS(xTractU.lower,xTractL.lower);
				var uTemp = cDivS(xTractL.lower,xTractU.lower);
				if (nbrTest(uTemp)) {return "cDiv("+cAddS(cMulS(uTemp,xTractU.upper),xTractL.upper)+","+xTractL.lower+")"}
				if (nbrTest(lTemp)) {return "cDiv("+cAddS(xTractU.upper,cMulS(lTemp,xTractL.upper))+","+xTractU.lower+")"}
			}
		}
		if (xTractU.func == "fac" && xTractL.func == "fac" && nbrTest(xTractU.upper) && nbrTest(xTractL.upper)) {return cAddS(fac(xTractU.upper),fac(xTractL.upper))}
		if (xTractL.func == "cSub") {var xTractB = opExtract(xTractL.upper);if (xTractB.func == "cNeg") {return cSubS(cSubS(xU,xTractB.upper),xTractL.lower)}}
		if (xTractU.func == "cAdd") {return "cAdd("+xTractU.upper+",cAdd("+xTractU.lower+","+xL+"))"}
		return "cAdd("+xU+","+xL+")"
	}
	function cSubS(xU,xL) {
		var xTractU = opExtract(xU);
		var xTractL = opExtract(xL);
		if (xTractU.func == "mat" && xTractL.func == "mat") {return cAddS(xU,cMulS(xL,-1))}
		if (xTractL.func == "cAdd") {xL = "("+xL+")"}
		if (+xL == 0) {return xU}
		if (+xU == 0) {return cNegS(xL)}
		if (xU == xL) {return 0}
		if (nbrTest(xL) && +xL < 0) {return cAddS(xU,-xL)}
		if (nbrTest(xU) && nbrTest(xL)) {return cSub(xU,xL)}
		if (xTractL.func == "cNeg") {return cAddS(xU,xTractL.upper)}
		if (nbrTest(xU) && xTractL.func == "cDiv" && nbrTest(xTractL.upper) && nbrTest(xTractL.lower)) {return cDivS(cSubS(cMulS(xU,xTractL.lower),xTractL.upper),xTractL.lower)} 
		if (nbrTest(xL) && xTractU.func == "cDiv" && nbrTest(xTractU.upper) && nbrTest(xTractU.lower)) {return cDivS(cSubS(xTractU.upper,cMulS(xL,xTractU.lower)),xTractU.lower)} 
		if (xTractU.func == "cDiv" && nbrTest(xTractU.upper) && nbrTest(xTractU.lower) && xTractL.func == "cDiv" && nbrTest(xTractL.upper) && nbrTest(xTractL.lower)) {return cDivS(cSubS(cMulS(xTractU.upper,xTractL.lower),cMulS(xTractL.upper,xTractU.lower)),cMulS(xTractU.lower,xTractL.lower))}
		if (!pxpFlag && xTractU.func == "cDiv" && xTractL.func == "cDiv" && xTractU.lower == xTractL.lower) {return "cDiv(cSub("+xTractU.upper+","+xTractL.upper+"),"+xTractU.lower+")"}
		if (!pxpFlag && xprMatch(xTractU.upper,"sqt(Cv[9999])") && xprMatch(xTractL.upper,"sqt(Cv[9999])") && xprMatch(xTractU.lower,"sqt(Cv[9999])") && xprMatch(xTractL.lower,"sqt(Cv[9999])")) { //normalize square root fractions
			return cSubS(sqtS(cDivS(xprMatch(xTractU.upper,"sqt(Cv[9999])"),xprMatch(xTractU.lower,"sqt(Cv[9999])"))),sqtS(cDivS(xprMatch(xTractL.upper,"sqt(Cv[9999])"),xprMatch(xTractL.lower,"sqt(Cv[9999])"))))
		}
		if (xTractU.func == "csh" && xTractL.func == "snh" && xTractU.upper == xTractL.upper) {return cPowS("Cv[8]",cNegS(xTractU.upper))}
		if (xTractU.func == "cPow" && xTractL.func == "cPow" && +xTractU.lower == 2 && +xTractL.lower == 2) {
			var xTractT = opExtract(xTractU.upper);var xTractB = opExtract(xTractL.upper);
			if (xTractT.func == "sin" && xTractB.func == "cos" && xTractT.upper == xTractB.upper) {return cNegS(cosS(cMulS(2,xTractT.upper)))}
			if (xTractT.func == "cos" && xTractB.func == "sin" && xTractT.upper == xTractB.upper) {return cosS(cMulS(2,xTractT.upper))}
		}
		if (xTractL.func == "cPow" && +xU == 1) {
			if (xprMatch(xL,"cPow(cos(Cv[9999]),2)")) {return cPowS(sinS(xprMatch(xL,"cPow(cos(Cv[9999]),2)")),2)}
			if (xprMatch(xL,"cPow(sin(Cv[9999]),2)")) {return cPowS(cosS(xprMatch(xL,"cPow(sin(Cv[9999]),2)")),2)}
		}
		if (xTractU.func == "cMul" && xTractL.func == "cMul") {
			var xTractT = opExtract(xTractU.upper);var xTractB = opExtract(xTractU.lower);
			var xTractX = opExtract(xTractL.upper);var xTractY = opExtract(xTractL.lower);
			if (xTractT.upper == xTractY.upper && xTractX.upper == xTractB.upper && xTractT.func == "cos" && xTractB.func == "sin" && xTractX.func == "cos" && xTractY.func == "sin" ) {return sinS(cSubS(xTractB.upper,xTractT.upper))}
			if (xTractT.upper == xTractY.upper && xTractX.upper == xTractB.upper && xTractT.func == "csh" && xTractB.func == "snh" && xTractX.func == "csh" && xTractY.func == "snh" ) {return snhS(cSubS(xTractB.upper,xTractT.upper))}
			if (xTractT.upper == xTractX.upper && xTractB.upper == xTractY.upper && xTractT.func == "cos" && xTractB.func == "cos" && xTractX.func == "sin" && xTractY.func == "sin" ) {return cosS(cSubS(xTractT.upper,xTractB.upper))}
			if (xTractT.upper == xTractX.upper && xTractB.upper == xTractY.upper && xTractT.func == "csh" && xTractB.func == "csh" && xTractX.func == "snh" && xTractY.func == "snh" ) {return cshS(cSubS(xTractT.upper,xTractB.upper))}
		}
		if (xTractU.func == "cPow" && +xTractU.lower == 2 && +xL == 1) {
			var xTractT = opExtract(xTractU.upper);
			if (xTractT.func == "csc") {return cPowS(cotS(xTractT.upper),2)}
			if (xTractT.func == "sec") {return cPowS(tanS(xTractT.upper),2)}
		}
		if (!pxpFlag && xTractU.func == "cDiv" && xTractL.func == "cDiv" && !nbrTest(xTractU.lower) && !nbrTest(xTractL.lower)){ //subtract fractions
			if (xTractU.lower == xTractL.lower && pNomial(xTractL.upper).length < pNomial(xTractU.lower).length && pNomial(xTractU.upper).length < pNomial(xTractU.lower).length) {return "cDiv("+cSubS(xTractU.upper,xTractL.upper)+","+xTractL.lower+")"}
			if (!factorFlag && !limitFlag ) { //normalize denominators
				var lTemp = cDivS(xTractU.lower,xTractL.lower);
				var uTemp = cDivS(xTractL.lower,xTractU.lower);
				if (nbrTest(uTemp)) {return "cDiv("+cSubS(cMulS(uTemp,xTractU.upper),xTractL.upper)+","+xTractL.lower+")"}
				if (nbrTest(lTemp)) {return "cDiv("+cSubS(xTractU.upper,cMulS(lTemp,xTractL.upper))+","+xTractU.lower+")"}
			}
		}
		if (xTractU.func == "fac" && xTractL.func == "fac" && nbrTest(xTractU.upper) && nbrTest(xTractL.upper)) {return cSubS(fac(xTractU.upper),fac(xTractL.upper))}
		return "cSub("+xU+","+xL+")"
	}
	function cNegS(xU) {
		var xTractU = opExtract(xU);
		if (xU == 0) {return 0}
		if (xTractU.func == "mat") {return cMulS(xU,-1)}
		if (xTractU.func == "cAdd") {return cSubS(cNegS(xTractU.upper),xTractU.lower)}
		if (xTractU.func == "cSub") {return cSubS(xTractU.lower,xTractU.upper)}
		if (xTractU.func == "cMul" && nbrTest(xTractU.upper)) {return cMulS(-xTractU.upper,xTractU.lower)}
		if (xTractU.func == "cMul" && nbrTest(xTractU.lower)) {return cMulS(-xTractU.lower,xTractU.upper)}
		if (xTractU.func == "cNeg") {return xTractU.upper}
		if (nbrTest(xU)) {return -(xU)}
		return "cNeg("+xU+")"
	}
	function trcS(xU) { //trace
		if (typeof xU == "object") {return trc(xU)}
		if (opExtract(xU).func == "mat") {return trc(matArray(xU))}
		return "undefined"
	}
	function detS(xU) { //determinant
		if (typeof xU == "object") {return det(xU)}
		if (opExtract(xU).func == "mat") {return det(matArray(xU))}
		return "undefined"
	}
	function invS(xU) { //matrix inverse
		var mTemp = matArray(xU);
		if (getType(mTemp[0][0]) == "matrix") {
			var rowsU = mTemp.length;
			if (rowsU != mTemp[0].length) {return "undefined"}
			var mReturn = matCreate(rowsU,rowsU);
			for (var iR=0;iR<rowsU;iR++) {for (var iC=0;iC<rowsU;iC++) {mReturn[iR][iC] = invS(mTemp[iR][iC])}}
			return matFunc(mReturn)			
		}
		return cMulS(cDivS(1,detS(mTemp)),matFunc(trn(matCofac(mTemp))))
	}
	function sqtS(xU) {
		var xTractU = opExtract(xU);
		if (nbrTest(xU) && sqt(xU) == int(sqt(xU))){return cFunc(fmtResult(sqt(xU)))} //calculate integer roots
		if (pxpFlag && xTractU.func == "cDiv") {return cDivS(sqtS(xTractU.upper),sqtS(xTractU.lower))}
		if (pxpFlag && xTractU.func == "cMul") {return cMulS(sqtS(xTractU.upper),sqtS(xTractU.lower))}
		if (pxpFlag) {return "cPow("+xU+",0.5)"}
		if (xTractU.func == "cPow" && +xTractU.lower == 2 && mgConfig.Domain == "Real") {return absS(xTractU.upper)}
		if (xTractU.func == "cPow") {return cPowS(xTractU.upper,cDivS(xTractU.lower,2))}
		if (xTractU.func == "cSub" && xprMatch(xU,"cSub(1,cPow(cos(Cv[9999]),2))")) {return sinS(xprMatch(xU,"cSub(1,cPow(cos(Cv[9999]),2))"))}
		if (xTractU.func == "cSub" && xprMatch(xU,"cSub(1,cPow(sin(Cv[9999]),2))")) {return cosS(xprMatch(xU,"cSub(1,cPow(sin(Cv[9999]),2))"))}
		if (xTractU.func == "cSub" && xprMatch(xU,"cSub(cPow(sec(Cv[9999]),2),1)")) {return tanS(xprMatch(xU,"cSub(cPow(sec(Cv[9999]),2),1)"))}
		if (xTractU.func == "cSub" && xprMatch(xU,"cSub(cPow(csc(Cv[9999]),2),1)")) {return cotS(xprMatch(xU,"cSub(cPow(csc(Cv[9999]),2),1)"))}
		if (xTractU.func == "cAdd" && xprMatch(xU,"cAdd(cPow(tan(Cv[9999]),2),1)")) {return secS(xprMatch(xU,"cAdd(cPow(tan(Cv[9999]),2),1)"))}
		if (xTractU.func == "cAdd" && xprMatch(xU,"cAdd(cPow(cot(Cv[9999]),2),1)")) {return cscS(xprMatch(xU,"cAdd(cPow(cot(Cv[9999]),2),1)"))}
		return "sqt("+xU+")"
	}
	function cbtS(xU) {
		var xTractU = opExtract(xU);
		if (nbrTest(xU) && cbt(xU) == int(cbt(xU)) ) {return cFunc(fmtResult(cbt(xU)))} //calculate integer roots
		if (xTractU.func == "cPow") {return cPowS(xTractU.upper,cDivS(xTractU.lower,3))}
		if (pxpFlag) {return "cPow("+xU+",cDiv(1,3))"}
		return "cbt("+xU+")"
	}
	function nrtS(xU,xL)  {
		var xTractU = opExtract(xU);
		var xTractL = opExtract(xL);
		if (+xU == 2) {return sqtS(xL)}
		if (+xU == 3) {return cbtS(xL)}
		if (nbrTest(xU) && nbrTest(xL) && nrt(xU,xL) == int(nrt(xU,xL))) {return cFunc(fmtResult(nrt(xU,xL)))} //calculate integer roots
		return cPowS(xL,cDivS(1,xU))
	}
    function lndS(xU) { //log with domain for calculus
        if (mgConfig.Domain == "Real") {return lneS(absS(xU))}
        return lneS(xU)
    }
	function lneS(xU) {
		var xTractU = opExtract(xU);
		if (xU == 0) {return "Cv[8734]"}
		if (xU == "Cv[8]") {return 1}
		if (xTractU.func == "cNeg" && xTractU.upper == "Cv[8]" && mgConfig.Domain == "Complex") {return "cAddS(1,cMul(Cv[29],Cv[46]))"}
		if (+xU == -1 && mgConfig.Domain == "Complex") {return "cMul(Cv[29],Cv[46])"} 
		if (nbrTest(xU) && lne(xU) == int(lne(xU)) ) {return cFunc(fmtResult(lne(xU)))} //calculate integer logs
		if (xTractU.func == "cPow" && xTractU.upper == "Cv[8]") {return xTractU.lower}
		if (xTractU.func == "cDiv" && +xTractU.upper == 1) {return cNegS(lneS(xTractU.lower))}
		if (xTractU.func == "cPow") {return cMulS(xTractU.lower,lneS(xTractU.upper))}
		return "lne("+xU+")"
	}
	function logS(xU) {
		var xTractU = opExtract(xU);
		if (xU == 0) {return "Cv[8734]"}
		if (nbrTest(xU) && log(xU) == int(log(xU))) {return cFunc(fmtResult(log(xU)))} //calculate integer logs
		if (xTractU.func == "cPow" && +xTractU.upper == 10) {return xTractU.lower}
		if (xTractU.func == "cPow") {return cMulS(xTractU.upper,logS(xTractU.lower))}
		if (xTractU.func == "cDiv" && +xTractU.upper == 1) {return cNegS(logS(xTractU.lower))}
		return "log("+xU+")"
	}
	function lgnS(xU,xL)  {
		if (+xU == 10) {return logS(xL)}
		if (xU == "Cv[8]") {return lneS(xL)}
		if (nbrTest(xU)  && nbrTest(xL) && lgn(xU,xL) == int(lgn(xU,xL))) {return cFunc(fmtResult(lgn(xU,xL)))} //calculate integer logs
		return cDivS(lneS(xL),lneS(xU))
	}
	function efcS(xU) {
		var xTractU = opExtract(xU);
		if (nbrTest(xU)) {return cFunc(fmtResult(efc(xU)))}
		if (xTractU.func == "erf") {return xTractU.upper}
		return "efc("+xU+")"
	}
	function erfS(xU) {
		var xTractU = opExtract(xU);
		if (nbrTest(xU)) {return cFunc(fmtResult(erf(xU)))}
		if (xTractU.func == "efc") {return xTractU.upper}
		return "erf("+xU+")"
	}
	function expS(xU) {
		var xTractU = opExtract(xU);
		if (nbrTest(xU) && exp(xU) == int(exp(xU))) {return cFunc(fmtResult(exp(xU)))}
		if (xTractU.func == "lne") {return xTractU.upper}
		return "exp("+xU+")"
	}
	//trig functions
	var iAngle = [
	"cDiv(1,12)","cDiv(5,12)","cDiv(7,12)","cDiv(11,12)","cDiv(13,12)","cDiv(17,12)","cDiv(19,12)","cDiv(23,12)",
	"cDiv(1,10)","cDiv(3,10)","cDiv(7,10)","cDiv(9,10)","cDiv(11,10)","cDiv(13,10)","cDiv(17,10)","cDiv(19,10)",
	"cDiv(1,6)","cDiv(5,6)","cDiv(7,6)","cDiv(11,6)",
	"cDiv(1,4)","cDiv(3,4)","cDiv(5,4)","cDiv(7,4)",
	"cDiv(1,3)","cDiv(2,3)","cDiv(4,3)","cDiv(5,3)",
	"cDiv(1,2)","cDiv(3,2)",
	];
	var sinAngle = [
	"cDiv(cSub(sqt(6),sqt(2)),4)","cDiv(cAdd(sqt(6),sqt(2)),4)","cDiv(cAdd(sqt(6),sqt(2)),4)","cDiv(cSub(sqt(6),sqt(2)),4)","cDiv(cSub(sqt(2),sqt(6)),4)","cDiv(cSub(cNeg(sqt(2)),sqt(6)),4)","cDiv(cSub(cNeg(sqt(2)),sqt(6)),4)","cDiv(cSub(sqt(2),sqt(6)),4)",
	"cDiv(cSub(sqt(5),1),4)","cDiv(cAdd(sqt(5),1),4)","cDiv(cAdd(sqt(5),1),4)","cDiv(cSub(sqt(5),1),4)","cDiv(cSub(1,sqt(5)),4)","cDiv(cSub(cNeg(sqt(5)),1),4)","cDiv(cSub(cNeg(sqt(5)),1),4)","cDiv(cSub(1,sqt(5)),4)",
	"cDiv(1,2)","cDiv(1,2)","cNeg(cDiv(1,2))","cNeg(cDiv(1,2))",
	"cDiv(1,sqt(2))","cDiv(1,sqt(2))","cNeg(cDiv(1,sqt(2)))","cNeg(cDiv(1,sqt(2)))",
	"cDiv(sqt(3),2)","cDiv(sqt(3),2)","cNeg(cDiv(sqt(3),2))","cNeg(cDiv(sqt(3),2))",
	"1","-1",
	];
	function sinS(xU) {
		var xTractU = opExtract(xU);
		var rAngle = piReduce(xU);
		if (xTractU.func == "asn") {return xTractU.upper}
		if (xTractU.func == "cNeg") {return "cNeg(sin("+xTractU.upper+"))"}
		if (rAngle == "1") {return 0}
		if (rAngle == "0") {return 0}
		if (strTest(iAngle,rAngle)) {return sinAngle[iAngle.indexOf(rAngle)]}
		if (+xU == 0) {return 0}
		if (nbrTest(xU)) {return cFunc(fmtResult(sin(xU)))}
		return "sin("+xU+")"
	}
	var cosAngle = [
	"cDiv(cAdd(sqt(6),sqt(2)),4)","cDiv(cSub(sqt(6),sqt(2)),4)","cDiv(cSub(sqt(2),sqt(6)),4)","cDiv(cSub(cNeg(sqt(2)),sqt(6)),4)","cDiv(cSub(cNeg(sqt(2)),sqt(6)),4)","cDiv(cSub(sqt(2),sqt(6)),4)","cDiv(cSub(sqt(6),sqt(2)),4)","cDiv(cAdd(sqt(6),sqt(2)),4)",
	"cDiv(sqt(cAdd(cMul(sqt(5),2),10)),4)","cDiv(sqt(cSub(10,cMul(sqt(5),2))),4)","cNeg(cDiv(sqt(cSub(10,cMul(sqt(5),2))),4))","cNeg(cDiv(sqt(cAdd(cMul(sqt(5),2),10)),4))","cNeg(cDiv(sqt(cAdd(cMul(sqt(5),2),10)),4))","cNeg(cDiv(sqt(cSub(10,cMul(sqt(5),2))),4))","cDiv(sqt(cSub(10,cMul(sqt(5),2))),4)","cDiv(sqt(cAdd(cMul(sqt(5),2),10)),4)",
	"cDiv(sqt(3),2)","cNeg(cDiv(sqt(3),2))","cNeg(cDiv(sqt(3),2))","cDiv(sqt(3),2)",
	"cDiv(1,sqt(2))","cNeg(cDiv(1,sqt(2)))","cNeg(cDiv(1,sqt(2)))","cDiv(1,sqt(2))",
	"cDiv(1,2)","cNeg(cDiv(1,2))","cNeg(cDiv(1,2))","cDiv(1,2)",
	"0","0",
	];
	function cosS(xU) {
		var xTractU = opExtract(xU);
		var rAngle = piReduce(xU);
		if (xTractU.func == "acs") {return xTractU.upper}
		if (xTractU.func == "cNeg") {return "cos("+xTractU.upper+")"}	
		if (rAngle == "1") {return -1}
		if (rAngle == "0") {return 1}
		if (strTest(iAngle,rAngle)) {return cosAngle[iAngle.indexOf(rAngle)]}
		if (+xU == 0) {return 1}
		if (nbrTest(xU)) {return cFunc(fmtResult(cos(xU)))}	
		return "cos("+xU+")"
	}
	var tanAngle = [
	"cSub(2,sqt(3))","cAdd(sqt(3),2)","cSub(cNeg(sqt(3)),2)","cSub(sqt(3),2)","cSub(2,sqt(3))","cAdd(sqt(3),2)","cSub(cNeg(sqt(3)),2)","cSub(sqt(3),2)",
	"cDiv(cSub(sqt(10),sqt(2)),cMul(2,sqt(cAdd(5,sqt(5)))))","cDiv(cAdd(sqt(2),sqt(10)),cMul(2,sqt(cSub(5,sqt(5)))))","cNeg(cDiv(cAdd(sqt(2),sqt(10)),cMul(2,sqt(cSub(5,sqt(5))))))","cDiv(cSub(sqt(2),sqt(10)),cMul(2,sqt(cAdd(5,sqt(5)))))","cDiv(cSub(sqt(10),sqt(2)),cMul(2,sqt(cAdd(5,sqt(5)))))","cDiv(cAdd(sqt(2),sqt(10)),cMul(2,sqt(cSub(5,sqt(5)))))","cNeg(cDiv(cAdd(sqt(2),sqt(10)),cMul(2,sqt(cSub(5,sqt(5))))))","cDiv(cSub(sqt(2),sqt(10)),cMul(2,sqt(cAdd(5,sqt(5)))))",
	"cDiv(1,sqt(3))","cNeg(cDiv(1,sqt(3)))","cDiv(1,sqt(3))","cNeg(cDiv(1,sqt(3)))",
	"1","-1","1","-1",
	"sqt(3)","cNeg(sqt(3))","sqt(3)","cNeg(sqt(3))",
	"undefined","undefined",
	];
	function tanS(xU) {
		var xTractU = opExtract(xU);
		var rAngle = piReduce(xU);
		if (xTractU.func == "atn") {return xTractU.upper}
		if (xTractU.func == "cNeg") {return "cNeg(tan("+xTractU.upper+"))"}	
		if (rAngle == "1") {return 0}
		if (rAngle == "0") {return 0}
		if (strTest(iAngle,rAngle)) {return tanAngle[iAngle.indexOf(rAngle)]}
		if (+xU == 0) {return 0}
		if (nbrTest(xU)) {return cFunc(fmtResult(tan(xU)))}
		return "tan("+xU+")"
	}
	var secAngle = [
	"cSub(sqt(6),sqt(2))","cAdd(sqt(2),sqt(6))","cSub(sqt(2),sqt(6))","cSub(cNeg(sqt(2)),sqt(6))","cSub(sqt(2),sqt(6))","cSub(cNeg(sqt(2)),sqt(6))","cAdd(sqt(2),sqt(6))","cSub(sqt(6),sqt(2))",
	"cDiv(cMul(2,sqt(2)),sqt(cAdd(sqt(5),5)))","cDiv(cMul(2,sqt(2)),sqt(cSub(5,sqt(5))))","cNeg(cDiv(cMul(2,sqt(2)),sqt(cSub(5,sqt(5)))))","cNeg(cDiv(cMul(2,sqt(2)),sqt(cAdd(5,sqt(5)))))","cNeg(cDiv(cMul(2,sqt(2)),sqt(cAdd(5,sqt(5)))))","cNeg(cDiv(cMul(2,sqt(2)),sqt(cSub(5,sqt(5)))))","cDiv(cMul(2,sqt(2)),sqt(cSub(5,sqt(5))))","cDiv(cMul(2,sqt(2)),sqt(cAdd(sqt(5),5)))",
	"cDiv(2,sqt(3))","cNeg(cDiv(2,sqt(3)))","cNeg(cDiv(2,sqt(3)))","cDiv(2,sqt(3))",
	"sqt(2)","cNeg(sqt(2))","cNeg(sqt(2))","sqt(2)",
	"2","-2","-2","2",
	"undefined","undefined",
	];
	function secS(xU) {
		var xTractU = opExtract(xU);
		var rAngle = piReduce(xU);
		if (xTractU.func == "asc") {return xTractU.upper}
		if (xTractU.func == "cNeg") {return "sec("+xTractU.upper+")"}	
		if (rAngle == "1") {return -1}
		if (rAngle == "0") {return 1}
		if (strTest(iAngle,rAngle)) {return secAngle[iAngle.indexOf(rAngle)]}
		if (+xU == 0) {return 1}
		if (nbrTest(xU)) {return cFunc(fmtResult(sec(xU)))}
		return "sec("+xU+")"
	}
	var cscAngle = [
	"cAdd(sqt(6),sqt(2))","cSub(sqt(6),sqt(2))","cSub(sqt(6),sqt(2))","cAdd(sqt(6),sqt(2))","cSub(cNeg(sqt(6)),sqt(2))","cSub(sqt(2),sqt(6))","cSub(sqt(2),sqt(6))","cSub(cNeg(sqt(6)),sqt(2))",
	"cAdd(sqt(5),1)","cSub(sqt(5),1)","cSub(sqt(5),1)","cAdd(sqt(5),1)","cSub(cNeg(sqt(5)),1)","cSub(1,sqt(5))","cSub(1,sqt(5))","cSub(cNeg(sqt(5)),1)",
	"2","2","-2","-2",
	"sqt(2)","sqt(2)","cNeg(sqt(2))","cNeg(sqt(2))",
	"cDiv(2,sqt(3))","cDiv(2,sqt(3))","cNeg(sqt(2))","cNeg(sqt(2))",
	"1","-1",
	];
	function cscS(xU) {
		var xTractU = opExtract(xU);
		var rAngle = piReduce(xU);
		if (xTractU.func == "acc") {return xTractU.upper}
		if (xTractU.func == "cNeg") {return "cNeg(csc("+xTractU.upper+"))"}	
		if (rAngle == "0") {return "undefined"}
		if (strTest(iAngle,rAngle)) {return cscAngle[iAngle.indexOf(rAngle)]}
		if (+xU == 0) {return "undefined"}
		if (nbrTest(xU)) {return cFunc(fmtResult(csc(xU)))}
		return "csc("+xU+")"
	}
	var cotAngle = [
	"cAdd(sqt(3),2)","cSub(2,sqt(3))","cSub(sqt(3),2)","cSub(cNeg(sqt(3)),2)","cAdd(sqt(3),2)","cSub(2,sqt(3))","cSub(sqt(3),2)","cSub(cNeg(sqt(3)),2)",
	"cDiv(cMul(cAdd(sqt(2),sqt(10)),sqt(cAdd(sqt(5),5))),4)","cDiv(cMul(cSub(sqt(10),sqt(2)),sqt(cSub(5,sqt(5)))),4)","cDiv(cMul(cSub(sqt(10),sqt(2)),sqt(cSub(5,sqt(5)))),4)","cDiv(cMul(cAdd(sqt(2),sqt(10)),sqt(cAdd(sqt(5),5))),4)","cDiv(cMul(cAdd(sqt(2),sqt(10)),sqt(cAdd(sqt(5),5))),4)","cDiv(cMul(cSub(sqt(2),sqt(10)),sqt(cSub(5,sqt(5)))),4)","cDiv(cMul(cSub(sqt(2),sqt(10)),sqt(cSub(5,sqt(5)))),4)","cDiv(cMul(cAdd(sqt(2),sqt(10)),sqt(cAdd(sqt(5),5))),4)",
	"sqt(3)","cNeg(sqt(3))","sqt(3)","cNeg(sqt(3))",
	"1","-1","1","-1",
	"cDiv(1,sqt(3))","cNeg(cDiv(1,sqt(3)))","cDiv(1,sqt(3))","cNeg(cDiv(1,sqt(3)))",
	"0", "0",
	];
	function cotS(xU) {
		var xTractU = opExtract(xU);
		var rAngle = piReduce(xU);
		if (xTractU.func == "act") {return xTractU.upper}
		if (xTractU.func == "cNeg") {return "cNeg(cot("+xTractU.upper+"))"}	
		if (rAngle == "0") {return "undefined"}
		if (strTest(iAngle,rAngle)) {return cotAngle[iAngle.indexOf(rAngle)]}
		if (+xU == 0) {return "undefined"}
		if (nbrTest(xU)) {return cFunc(fmtResult(cot(xU)))}
		return "cot("+xU+")"
	}
	function asnS(xU) {
		var xTractU = opExtract(xU);
		if (xU == 1) {return "cDiv(Cv[29],2)"}
		if (xU == -1) {return "cNeg(cDiv(Cv[29],2))"}
		if (strTest(sinAngle,xU)) {return cMulS(invMult,iAngle[sinAngle.indexOf(xU)])}
		if (nbrTest(xU)) {return cFunc(fmtResult(asn(xU)))}
		if (xTractU.func == "sin") {return xTractU.upper}
		return "asn("+xU+")"
	}
	function acsS(xU) {
		var xTractU = opExtract(xU);
		if (xU == 0) {return "cDiv(Cv[29],2)"}
		if (xU == -1) {return "Cv[29]"}
		if (strTest(cosAngle,xU)) {return cMulS(invMult,iAngle[cosAngle.indexOf(xU)])}
		if (nbrTest(xU)) {return cFunc(fmtResult(acs(xU)))}
		if (xTractU.func == "cos") {return xTractU.upper}
		return "acs("+xU+")"
	}
	function atnS(xU) {
		var xTractU = opExtract(xU);
		if (xU == 1) {return "cDiv(Cv[29],4)"}
		if (strTest(tanAngle,xU)) {return cMulS(invMult,iAngle[tanAngle.indexOf(xU)])}
		if (nbrTest(xU)) {return cFunc(fmtResult(atn(xU)))}
		if (xTractU.func == "tan") {return xTractU.upper}
		return "atn("+xU+")"
	}
	function ascS(xU) {
		var xTractU = opExtract(xU);
		if (strTest(secAngle,xU)) {return cMulS(invMult,iAngle[secAngle.indexOf(xU)])}
		if (nbrTest(xU)) {return cFunc(fmtResult(asc(xU)))}
		if (xTractU.func == "sec") {return xTractU.upper}
		return "asc("+xU+")"
	}
	function accS(xU) {
		var xTractU = opExtract(xU);
		if (xU == 1) {return "cDiv(Cv[29],2)"}
		if (strTest(cscAngle,xU)) {return cMulS(invMult,iAngle[cscAngle.indexOf(xU)])}
		if (nbrTest(xU)) {return cFunc(fmtResult(acc(xU)))}
		if (xTractU.func == "csc") {return xTractU.upper}
		return "acc("+xU+")"
	}
	function actS(xU) {
		var xTractU = opExtract(xU);
		if (xU == 0) {return "cDiv(Cv[29],2)"}
		if (xU == 1) {return "cDiv(Cv[29],4)"}
		if (strTest(cotAngle,xU)) {return cMulS(invMult,iAngle[cotAngle.indexOf(xU)])}
		if (nbrTest(xU)) {return cFunc(fmtResult(act(xU)))}
		if (xTractU.func == "cot") {return xTractU.upper}
		return "act("+xU+")"
	}

	function snhS(xU) {
		var xTractU = opExtract(xU);
		if (nbrTest(xU)) {return cFunc(fmtResult(snh(xU)))}
		if (xTractU.func == "ash") {return xTractU.upper}
		if (xTractU.func == "cNeg") {return "cNeg(snh("+xTractU.upper+"))"}
		return "snh("+xU+")"
	}
	function cshS(xU) {
		var xTractU = opExtract(xU);
		if (nbrTest(xU)) {return cFunc(fmtResult(csh(xU)))}
		if (xTractU.func == "ach") {return xTractU.upper}
		if (xTractU.func == "cNeg") {return "csh("+xTractU.upper+")"}
		return "csh("+xU+")"
	}
	function tnhS(xU) {
		var xTractU = opExtract(xU);
		if (nbrTest(xU)) {return cFunc(fmtResult(tnh(xU)))}
		if (xTractU.func == "ath") {return xTractU.upper}
		if (xTractU.func == "cNeg") {return "cNeg(tnh("+xTractU.upper+"))"}
		return "tnh("+xU+")"
	}

	function schS(xU) {
		var xTractU = opExtract(xU);
		if (nbrTest(xU)) {return cFunc(fmtResult(sch(xU)))}
		if (xTractU.func == "axh") {return xTractU.upper}
		if (xTractU.func == "cNeg") {return "sch("+xTractU.upper+")"}
		return "sch("+xU+")"
	}
	function cchS(xU) {
		var xTractU = opExtract(xU);
		if (nbrTest(xU)) {return cFunc(fmtResult(cch(xU)))}
		if (xTractU.func == "ayh") {return xTractU.upper}
		if (xTractU.func == "cNeg") {return "cNeg(cch("+xTractU.upper+"))"}
		return "cch("+xU+")"
	}
	function cthS(xU) {
		var xTractU = opExtract(xU);
		if (nbrTest(xU)) {return cFunc(fmtResult(cth(xU)))}
		if (xTractU.func == "azh") {return xTractU.upper}
		if (xTractU.func == "cNeg") {return "cNeg(cth("+xTractU.upper+"))"}
		return "cth("+xU+")"
	}

	function ashS(xU) {
		var xTractU = opExtract(xU);
		if (nbrTest(xU)) {return cFunc(fmtResult(ash(xU)))}
		if (xTractU.func == "snh") {return xTractU.upper}
		return "ash("+xU+")"
	}
	function achS(xU) {
		var xTractU = opExtract(xU);
		if (nbrTest(xU)) {return cFunc(fmtResult(ach(xU)))}
		if (xTractU.func == "csh") {return xTractU.upper}
		return "ach("+xU+")"
	}
	function athS(xU) {
		var xTractU = opExtract(xU);
		if (nbrTest(xU)) {return cFunc(fmtResult(ath(xU)))}
		if (xTractU.func == "tnh") {return xTractU.upper}
		return "ath("+xU+")"
	}

	function axhS(xU) {
		var xTractU = opExtract(xU);
		if (nbrTest(xU)) {return cFunc(fmtResult(axh(xU)))}
		if (xTractU.func == "sch") {return xTractU.upper}
		return "axh("+xU+")"
	}
	function ayhS(xU) {
		var xTractU = opExtract(xU);
		if (nbrTest(xU)) {return cFunc(fmtResult(ayh(xU)))}
		if (xTractU.func == "cch") {return xTractU.upper}
		return "ayh("+xU+")"
	}
	function azhS(xU) {
		var xTractU = opExtract(xU);
		if (nbrTest(xU)) {return cFunc(fmtResult(azh(xU)))}
		if (xTractU.func == "cth") {return xTractU.upper}
		return "azh("+xU+")"
	}
	function absS(xU) {
		var xTractU = opExtract(xU);
		if (nbrTest(xU)) {return abs(xU)}
		if (xTractU.func == "abs") {return xU}
		if (xTractU.func == "cNeg") {return absS(xTractU.upper)}
		if (xTractU.func == "cPow" && +xTractU.lower/2 == Math.floor(+xTractU.lower/2)) {return xU}
		return "abs("+xU+")"
	}
	function facS(xU)  {
		if (+xU == 0 || +xU == 1) {return 1}
		return "fac("+xU+")"
	}
	function gamS(xU)  {
		if (+xU == 0 || +xU == 1) {return 1}
		return "gam("+xU+")"
	}		
	function sdrS(xU,xL) {return "tdv("+xU+","+xL+")"}
	function ddrS(xU,xL) {return "tds("+xU+","+xL+")"}
	function psdS(xU,xL) {return "drv("+xU+","+xL+")"}
	function pddS(xU,xL) {return "drs("+xU+","+xL+")"}
	function matS() {return "mat(" + Array.prototype.slice.call(arguments) + ")"}
	//passthru
	function idrS(xU) {return "idr("+xU+")"}
	function iddS(xU) {return "idd("+xU+")"}
	function tdrS(xU) {return "tdr("+xU+")"}
	function tddS(xU) {return "tdd("+xU+")"}
	function sbrS(xU) {return "("+xU+")"}
	function cbrS(xU) {return "("+xU+")"}
	function prnS(xU) {return "("+xU+")"}
	function conS(xU) {return "con("+xU+")"}
	function vecS(xU) {return "vec("+xU+")"}
	function hatS(xU) {return "hat("+xU+")"}
	function undS(xU) {return "und("+xU+")"}
	function udtS(xU) {return "udt("+xU+")"}
	function tldS(xU) {return "tld("+xU+")"}
	function cntS(xU) {return "cnt("+xU+")"}
	function sbtS(xU) {return "sbt("+xU+")"}
	function difS(xU) {return "dif("+xU+")"}
	function cdfS(xU) {return "cdf("+xU+")"}
	function pdfS(xU) {return "pdf("+xU+")"}
	function lcfS(xU) {return "lcf("+xU+")"}
	function lpfS(xU) {return "lpf("+xU+")"}
	function rouS(xU) {return "rou("+xU+")"}
	function rndS(xU) {return "rnd("+xU+")"}
	function rexS(xU) {return "rex("+xU+")"}
	function frcS(xU) {return "frc("+xU+")"}
	function ceiS(xU) {return "cei("+xU+")"}
	function cBndS(xU,xL) {return "cBnd("+xU+","+xL+")"}
	function cEqlS(xU,xL) {return "cEql("+xU+","+xL+")"}
	function cNqlS(xU,xL) {return "cNql("+xU+","+xL+")"}
	function cGthS(xU,xL) {return "cGth("+xU+","+xL+")"}
	function cLthS(xU,xL) {return "cLth("+xU+","+xL+")"}
	function cGeqS(xU,xL) {return "cGeq("+xU+","+xL+")"}
	function cLeqS(xU,xL) {return "cLeq("+xU+","+xL+")"}
	//

	function piReduce(xAng) {
		var xTractD = opExtract(xAng);
		var xTractT = opExtract(xTractD.upper);
		var reducedAng = "";
		if (mgConfig.trigBase == Math.PI/180 && nbrTest(xAng)) {reducedAng = cSubS(cDivS(xAng,180),Math.floor(xAng/360)*2)}
		if (mgConfig.trigBase == Math.PI/200 && nbrTest(xAng)) {reducedAng = cSubS(cDivS(xAng,200),Math.floor(xAng/400)*2)}
		if (mgConfig.trigBase == 1) { 
			if (xAng == "Cv[29]") {reducedAng = "1"}
			if (xTractD.func == "cMul" && xTractD.lower  == "Cv[29]" && nbrTest(xTractD.upper)) {reducedAng = xTractD.upper-Math.floor(xTractD.upper/2)*2}
			if (xTractD.func == "cDiv" && xTractD.upper  == "Cv[29]" && nbrTest(xTractD.lower)) {reducedAng = "cDiv(1,"+xTractD.lower+")"}
			if (xTractD.func == "cDiv" && nbrTest(xTractD.lower) && xTractT.func == "cMul" && xTractT.lower  == "Cv[29]" && nbrTest(xTractT.upper)) {reducedAng = cSubS(cDivS(xTractT.upper,xTractD.lower),Math.floor(+xTractT.upper/(+xTractD.lower*2))*2)}
		}
		return reducedAng
	}

	//Calculus
	function parseCalculus(dExp) { //parse calculus in MG format to FUNC: d/dx(x^2) = idr(x)x^2 -> drv(x^2,x)
		dExp = strConvert(dExp);
		var dSplit = dExp.split("=");
		if (dSplit.length > 1) {
			var dReturn = ""
			for (var cI=0;cI<dSplit.length-1;cI++) {dReturn = dReturn+parseCalculus(dSplit[cI])+"="}
			return dReturn+parseCalculus(dSplit[dSplit.length-1])
		}
		iIterations = 0;
		sIterations = 0;
		pIterations = 0;
		var calcOpsIn  = ["idr(","idd(","tdr(","tdd(","lim(","sum(","prd("];
		var calcOpsOut = ["drv(","drs(","tdv(","tds(","lmt(","smm(","pmm("];
		var dV = "";
		var sCount = dExp.split("Cv[8748]").length-1; //differential
		for (var nC=0;nC<sCount;nC++) {
			dExp = dExp.replace(/Cv\[8748\]Cv\[(\d+)\]\/Cv\[8748\]Cv\[(\d+)\]/,"sdr(Cv[$1],Cv[$2])")
			dExp = dExp.replace(/Cv\[8748\]Cv\[(\d+)\]/,"dif(Cv[$1])")
		}
		if (strTest(dExp,"Cv[8748]")) {return cError("Illegal differential")}
		var sCount = dExp.split("Cv[8747]").length-1; //indefinite integral
		iConstant = 11100;
		for (var nC=0;nC<sCount;nC++) {
			if (!strTest(dExp,"dif(")) {
				var invTemp = cInventory(dExp);
				if (invTemp.length == 1) {dExp = dExp + "dif(Cv[" + invTemp[0] +"])"}
				else {return cError("Missing dx")}
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
		for (var nC=0;nC<sCount;nC++) {
			if (!strTest(dExp,"dif(")) {
				var invTemp = cInventory(dExp);
				if (invTemp.length == 1) {dExp = dExp + "dif(Cv[" + invTemp[0] +"])"}
				else {return cError("Missing dx")}
			}
			dV = parseParens(dExp,dExp.indexOf("itg(")+3)
			if (strTest(dExp,"(,") || strTest(dExp,",)")) {return cError("Missing integral limit(s)")}
			dExp = dExp.substr(0,dExp.indexOf("itg("))+"ntg("+dExp.substr(dV.end+1,dExp.length);
			dExp = dExp.replace(/dif\(Cv\[(\d+)\]\)/,",Cv[$1],"+dV.inside+")");
		}
		sCount = dExp.split("(").length-1; //derivatives,limits,summation
		for (var nC=0;nC<sCount;nC++) {
			var rIndex = -1;
			var rFunc = -1;
			for (var cOp=0;cOp<calcOpsIn.length;cOp++) {if (dExp.lastIndexOf(calcOpsIn[cOp]) > rIndex) {rFunc = cOp;rIndex = dExp.lastIndexOf(calcOpsIn[cOp])}}
			if (rFunc == -1) {break}
			dExp = dExp.substr(0,rIndex)+"tmp("+dExp.substr(rIndex+4);
			var lIndex = dExp.substr(dExp.lastIndexOf("tmp("),dExp.length);
			dV = parseParens(lIndex,lIndex.indexOf("tmp(")+3).inside;
			dExp = dExp.replace(lIndex,"tmp("+lIndex.replace("tmp("+dV+")",""));
			var strg = parseParens(dExp,dExp.lastIndexOf("tmp(")+3);
			if (strg.inside.charAt(strg.inside.length-1) == "," || !strg.inside) {return cError("Missing operand(s)")}
			dExp = dExp.substr(0,dExp.lastIndexOf("tmp("))+calcOpsOut[rFunc]+strg.inside+","+dV+")"+dExp.substr(strg.end,dExp.length);
			if (strTest(dExp,"smm(") || strTest(dExp,"pmm(")) {dExp = dExp.replace("Cv[61]",",")}
		}
		return dExp
	}
	//Derivatives
	function tdvS(dXpr,deeVar) { //total derivative
		if (deeVar) {deeVarP = deeVar}
		if (solverFlag) {return "tdv("+dXpr+")"}
		var cInv = cInventory(dXpr);
		if (cInv.length > 1) {
			var totDeriv = "0";
			for (var nTd=0;nTd<cInv.length;nTd++) {
				totDeriv = cAddS(totDeriv,cMulS(drvS(dXpr,"Cv["+cInv[nTd]+"]",deeVar),difS("Cv["+cInv[nTd]+"]")))
			}
			return totDeriv
		}
		return drvS(dXpr,deeVar)
	}
	function tdsS(dXpr,deeVar) {return tdvS(tdvS(dXpr,deeVar),deeVar)} //total second derivative
	function drvQ(qXpr,deeVar) {qFlag = true;qXpr= drvS(qXpr,deeVar);qFlag = false; return qXpr} //quick derivative
	function drsS(dXpr,deeVar) {return drvS(drvS(dXpr,deeVar),deeVar) } //partial second derivative
	function drvS(dXpr,deeVar) { //partial derivative
		function cPowD(xU,xL) {
			if (strTest(xU,deeVar) && strTest(xL,deeVar)) {return cMulS(cAddS(cMulS(lneS(deeVar),drvS(xL,deeVar)),cDivS(xL,deeVar)),cPowS(xU,xL))}
			if (strTest(xU,deeVar)) {return cMulS(cMulS(xL,(cPowS(xU,cSubS(xL,1)))),drvS(xU,deeVar))}	
			if (strTest(xL,deeVar)) {return cMulS(cMulS(cPowS(xU,xL),lneS(xU)),drvS(xL,deeVar))}
			return 0
		}
		function cMulD(xU,xL) {
			if (strTest(xU,deeVar) && strTest(xL,deeVar)) {return cAddS(cMulS(drvS(xU,deeVar),xL),cMulS(drvS(xL,deeVar),xU))}
			if (strTest(xU,deeVar)) {return cMulS(drvS(xU,deeVar),xL)}
			if (strTest(xL,deeVar)) {return cMulS(drvS(xL,deeVar),xU)}
			return 0
		}
		function cDivD(xU,xL) {
			if (strTest(xU,deeVar) && strTest(xL,deeVar)) {return cDivS(cSubS(cMulS(drvS(xU,deeVar),xL),cMulS(drvS(xL,deeVar),xU)),cPowS(xL,2))}
			if (strTest(xU,deeVar)) {return cMulD(xU,cDivS(1,xL))}
			if (strTest(xL,deeVar)) {return cMulS(xU,cPowD(xL,-1))}
			return 0
		}
		function cAddD(xU,xL) {
			if (strTest(xU,deeVar) && strTest(xL,deeVar)) {return cAddS(drvS(xU,deeVar),drvS(xL,deeVar))}
			if (strTest(xU,deeVar)) {return drvS(xU,deeVar)}
			if (strTest(xL,deeVar)) {return drvS(xL,deeVar)}
			return 0
		}
		function cSubD(xU,xL) {
			if (strTest(xU,deeVar) && strTest(xL,deeVar)) {return cSubS(drvS(xU,deeVar),drvS(xL,deeVar))}
			if (strTest(xU,deeVar)) {return drvS(xU,deeVar)}
			if (strTest(xL,deeVar)) {return cNegS(drvS(xL,deeVar))}
			return 0
		}
		function cTmsD(xU,xL) {return cMulD(xU,xL) }
		function cDotD(xU,xL) {return cMulD(xU,xL) }
		function cEqlD(xU,xL) {return cEqlS(xU,xL) }
		function nrtD(xU,xL)  {return drvS(cPowD(xL,cDivS(1,xU)),deeVar) }
		function lgnD(xU,xL)  {return drvS(cDivS(lneS(xL),lneS(xU)),deeVar) }
		function cNegD(xU)    {return cNegS(drvS(xU,deeVar)) }
		function lneD(xU) {return cMulS(cDivS(1,xU),drvS(xU,deeVar)) }
		function logD(xU) {return cMulS(cDivS(logS("Cv[8]"),xU),drvS(xU,deeVar)) }
		function cbtD(xU) {return cMulS(cDivS(1,cMulS(3,cPowS(xU,cDivS(2,3)))),drvS(xU,deeVar)) }
		function sqtD(xU) {return cMulS(cDivS(1,cMulS(2,sqtS(xU))),drvS(xU,deeVar)) }
		function sinD(xU) {return cMulS(cosS(xU),drvS(xU,deeVar)) }
		function cosD(xU) {return cMulS(cNegS(sinS(xU)),drvS(xU,deeVar)) }
		function tanD(xU) {return cMulS(cPowS(secS(xU),2),drvS(xU,deeVar)) }
		function cscD(xU) {return cMulS(cNegS(cMulS(cscS(xU),cotS(xU))),drvS(xU,deeVar)) }
		function secD(xU) {return cMulS(cMulS(secS(xU),tanS(xU)),drvS(xU,deeVar)) }
		function cotD(xU) {return cMulS(cNegS(cPowS(cscS(xU),2)),drvS(xU,deeVar)) }
		function asnD(xU) {return cMulS(cDivS(1,sqtS(cSubS(1,cPowS(xU,2)))),drvS(xU,deeVar)) }
		function acsD(xU) {return cMulS(cNegS(cDivS(1,sqtS(cSubS(1,cPowS(xU,2))))),drvS(xU,deeVar)) }
		function atnD(xU) {return cMulS(cDivS(1,cAddS(1,cPowS(xU,2))),drvS(xU,deeVar)) }
		function actD(xU) {return cMulS(cNegS(cDivS(1,cAddS(1,cPowS(xU,2)))),drvS(xU,deeVar)) }
		function ascD(xU) {
			if (mgConfig.Domain == "Real") {return cDivS(1,cMulS(absS(xU),sqtS(cSubS(cPowS(xU,2),1))))}
			return cMulS(cDivS(1,cMulS(cPowS(xU,2),sqtS(cSubS(1,cPowS(xU,"-2"))))),drvS(xU,deeVar)) 
		}
		function accD(xU) {
			if (mgConfig.Domain == "Real") {return cDivS(-1,cMulS(absS(xU),sqtS(cSubS(cPowS(xU,2),1))))}
			return cMulS(cNegS(cDivS(1,cMulS(cPowS(xU,2),sqtS(cSubS(1,cPowS(xU,"-2")))))),drvS(xU,deeVar)) 
		}
		function snhD(xU) {return cMulS(cshS(xU),drvS(xU,deeVar)) }
		function cshD(xU) {return cMulS(snhS(xU),drvS(xU,deeVar)) }
		function tnhD(xU) {return cMulS(cSubS(1,cPowS(tnhS(xU),2)),drvS(xU,deeVar)) }
		function schD(xU) {return cMulS(cNegS(cMulS(tnhS(xU),schS(xU))),drvS(xU,deeVar)) }
		function cchD(xU) {return cMulS(cNegS(cMulS(cthS(xU),cchS(xU))),drvS(xU,deeVar)) }
		function cthD(xU) {return cMulS(cSubS(1,cPowS(cthS(xU),2)),drvS(xU,deeVar)) }
		function ashD(xU) {return cMulS(cDivS(1,sqtS(cAddS(cPowS(xU,2),1))),drvS(xU,deeVar)) }
		function achD(xU) {return cMulS(cDivS(1,sqtS(cSubS(cPowS(xU,2),1))),drvS(xU,deeVar)) }
		function athD(xU) {return cMulS(cDivS(1,cSubS(1,cPowS(xU,2))),drvS(xU,deeVar)) }
		function axhD(xU) {return cMulS(cNegS(cDivS(1,cMulS(xU,sqtS(cSubS(1,cPowS(xU,2)))))),drvS(xU,deeVar)) }
		function ayhD(xU) {return cMulS(cNegS(cDivS(1,cMulS(xU,sqtS(cAddS(1,cPowS(xU,2)))))),drvS(xU,deeVar)) }
		function azhD(xU) {return cMulS(cDivS(1,cSubS(1,cPowS(xU,2))),drvS(xU,deeVar)) }
		function erfD(xU) {return cMulS(cDivS(cMulS(2,cPowS("Cv[8]",cNegS(cPowS(xU,2)))),sqtS("Cv[29]")),drvS(xU,deeVar)) }
		function efcD(xU) {return cMulS(cNegS(cDivS(cMulS(2,cPowS("Cv[8]",cNegS(cPowS(xU,2)))),sqtS("Cv[29]"))),drvS(xU,deeVar)) }
		function expD(xU) {return cMulS(cPowS("Cv[8]",xU),drvS(xU,deeVar)) }
		function absD(xU) {return cMulS("cDiv("+xU+",abs("+xU+"))",drvS(xU,deeVar))}
		function conD(xU) {return "con("+xU+")"}
		function facD(xU) {return "fac("+xU+")"}
		function vecD(xU) {return "vec("+xU+")"}
		function hatD(xU) {return "hat("+xU+")"}
		function undD(xU) {return "und("+xU+")"}
		function udtD(xU) {return "udt("+xU+")"}
		function tldD(xU) {return "tld("+xU+")"}
		function cntD(xU) {return "cnt("+xU+")"}
		function sbtD(xU) {return "sbt("+xU+")"}
		function difD(xU) {return "dif("+xU+")"}
		function ntpD(nXpr,dV,iU,iL) {
			if (dV == deeVar && typeof iU == "undefined" && typeof iL == "undefined") {return nXpr}
			return "drv(ntp("+nXpr+","+dV+","+iU+","+iL+"),"+deeVar+")"
		}
		//
		if (deeVar) {deeVarP = deeVar}	
		if (solverFlag) {return "drv("+dXpr+")"}
		dXpr = strConvert(dXpr);
		if (!qFlag) {dXpr = cReduce(dXpr)}
		if (dXpr == deeVar) {return 1}
		if (!strTest(dXpr,deeVar)) {return 0}
		if (!qFlag) {return cReduce(eval(dXpr.replace(/([a-z])\(/,"$1D(").replace(/([a-z])\(/g,"$1S(").replace(/(Cv\[\d+\])/g,"'$1'").replace(/(Pv\[\d+\])/g,"'$1'").replace(/(Sv\[\d+\])/g,"'$1'")))}
		return eval(dXpr.replace(/([a-z])\(/,"$1D(").replace(/([a-z])\(/g,"$1S(").replace(/(Cv\[\d+\])/g,"'$1'").replace(/(Pv\[\d+\])/g,"'$1'").replace(/(Sv\[\d+\])/g,"'$1'"))
	}

	//Integrals
	function ntpS(nXpr,deeVar,iU,iL) { //wrapper for unsolved integral
		if (typeof iU != "undefined" && typeof iL != "undefined") {return "ntp("+nXpr+","+deeVar+","+iU+","+iL+")"}
		return "ntp("+nXpr+","+deeVar+")"
	}
	function ntgS(nXpr,deeVar,iU,iL) {
		function ntgCheck(rCheck) {if (typeof rCheck == "undefined" || strTest(rCheck,"Cv[9998]") || strTest(rCheck,"undefined")) {return false}; return true}
		function ntgTest(rTest)   {if (ntgCheck(rTest) &&  !strTest(rTest,"ntp(")) {return true}; return false} //test for ntg success
        function cPowI(xU,xL) {
			var xTractU = opExtract(xU);
			var xTractL = opExtract(xL);
			var aConst = 1;
			if (opExtract(xTractU.upper).func == "cMul") {aConst = xReduce(cDivS(xTractU.upper,deeVar))}
			if (strTest(xU,deeVar) && strTest(xL,deeVar)) {return "undefined"}
			if (deeVar == xU && !strTest(xL,deeVar)) {return cDivS(cPowS(xU,cAddS(xL,1)),cAddS(xL,1))}
			if (deeVar == xL && !strTest(xU,deeVar)) {return cDivS(cPowS(xU,xL),lndS(xU))}
			if (xU == "Cv[8]" && strTest(xL,deeVar) && mgConfig.Domain == "Complex") {
				var bTemp = iReduce(cDivS(xL,cPowS(deeVar,2)));
				if (!strTest(bTemp,deeVar)) {return cMulS(cMulS(cNegS("Cv[46]"),cDivS(sqtS("Cv[29]"),cMulS(2,sqtS(bTemp)))),erfS(cMulS("Cv[46]",cMulS(deeVar,bTemp))))}
			}
			if (strTest(xU,deeVar) && !strTest(xL,deeVar)) {
				var iTemp = xReduce(cDivS(drvS(cDivS(cPowS(xU,cAddS(xL,1)),cAddS(xL,1)),deeVar),cPowS(xU,xL)));
				if (!strTest(iTemp,deeVar)) {return cDivS(cPowS(xU,cAddS(xL,1)),cMulS(cAddS(xL,1),iTemp))}
			}
			if (!strTest(xU,deeVar) && strTest(xL,deeVar)) {
				var iTemp = xReduce(cDivS("cPow("+xU+","+xL+")",drvS("cPow("+xU+","+xL+")",deeVar)));
				if (!strTest(iTemp,deeVar)) {return cMulS(iTemp,"cPow("+xU+","+xL+")")}
			}
			if (+xL == 2 && xReduce(cDivS(xTractU.upper,aConst)) == deeVar) {
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
			if (+xL == 3 && xReduce(cDivS(xTractU.upper,aConst)) == deeVar) {
				if (xTractU.func == "sin") {return cSubS(cDivS(cosS(cMulS(3,cMulS(aConst,deeVar))),cMulS(12,aConst)),cDivS(cMulS(3,cosS(cMulS(aConst,deeVar))),cMulS(4,aConst)))}
				if (xTractU.func == "cos") {return cAddS(cDivS(sinS(cMulS(3,cMulS(aConst,deeVar))),cMulS(12,aConst)),cDivS(cMulS(3,sinS(cMulS(aConst,deeVar))),cMulS(4,aConst)))}
				if (xTractU.func == "tan") {return cAddS(cDivS(lndS(cosS(cMulS(aConst,deeVar))),aConst),cDivS(cPowS(secS(cMulS(aConst,deeVar)),2),cMulS(2,aConst)))}
				if (xTractU.func == "lne") {return cMulS(deeVar,cSubS(cAddS(cSubS(cPowS(lneS(cMulS(aConst,deeVar)),3),cMulS(3,cPowS(lneS(cMulS(aConst,deeVar)),2))),cMulS(6,lneS(cMulS(aConst,deeVar)))),6))}
			}
			return "undefined"
		}
		function cMulI(xU,xL) {
			var xTractU = opExtract(xU);
			var xTractL = opExtract(xL);
			if (xTractL.func == "lne" && strTest(xU,deeVar) && strTest(xL,deeVar)) {
				var iTemp = cSubS(cDivS(cMulS(cPowS(xU,2),lneS(xTractL.upper)),2),cDivS(cPowS(xU,2),4));
				if (xReduce(cMulS(xU,xL)) == drvS(iTemp,deeVar)) {return iTemp}
			}
			if (strTest(xU,deeVar) && !strTest(xL,deeVar)) {return cMulS(xL,ntgS(xU,deeVar))}
			if (strTest(xL,deeVar) && !strTest(xU,deeVar)) {return cMulS(xU,ntgS(xL,deeVar))}
            if (xTractU.func == "cMul" && !strTest(xTractU.upper,deeVar)) {return cMulS(xTractU.upper,ntgS(cMulS(xTractU.lower,xL),deeVar))}
            if (xTractU.func == "cMul" && !strTest(xTractU.lower,deeVar)) {return cMulS(xTractU.lower,ntgS(cMulS(xTractU.upper,xL),deeVar))}
            if (xTractL.func == "cMul" && !strTest(xTractL.upper,deeVar)) {return cMulS(xTractL.upper,ntgS(cMulS(xTractL.lower,xU),deeVar))}
            if (xTractL.func == "cMul" && !strTest(xTractL.lower,deeVar)) {return cMulS(xTractL.lower,ntgS(cMulS(xTractL.upper,xU),deeVar))}
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
                    if (xTractU.func == "sec" && xTractL.func == "tan") {return iSearch(cMulS(xU,xL),"sec")}
                    if (xTractU.func == "cot" && xTractL.func == "csc") {return iSearch(cMulS(xU,xL),"csc")}
                    if (xTractU.func == "sch" && xTractL.func == "tnh") {return iSearch(cMulS(xU,xL),"sch")}
                    if (xTractU.func == "cch" && xTractL.func == "cth") {return iSearch(cMulS(xU,xL),"cch")}
                }
                if (xTractU.lower == deeVar && xTractL.upper == deeVar) {
                    if (xTractU.func == "cPow" && xTractL.func == "cos" && xTractU.upper == "Cv[8]") {return cDivS(cMulS(cPowS("Cv[8]",deeVar),cAddS(sinS(deeVar),cosS(deeVar))),2)}
                    if (xTractU.func == "cPow" && xTractL.func == "sin" && xTractU.upper == "Cv[8]") {return cDivS(cMulS(cPowS("Cv[8]",deeVar),cSubS(sinS(deeVar),cosS(deeVar))),2)}	
                }
                var sTemp = xSubst(xU,xL);
				if (ntgTest(sTemp)) {return sTemp}
				sTemp = iParts(xU,xL);
				if (ntgTest(sTemp)) {return sTemp}
			}
			return "undefined"
		}
		function cDivI(xU,xL) {
			var xTractU = opExtract(xU);
			var xTractL = opExtract(xL);
			//special cases
			if (cDivS(xU,xL) == cDivS(cosS(deeVar),cPowS(sinS(deeVar),2))) {return cNegS(cDivS(1,sinS(deeVar)))}
			if (cDivS(xU,xL) == cDivS(cPowS(cosS(deeVar),2),sinS(deeVar))) {return cAddS(lndS(tanS(cDivS(deeVar,2))),cosS(deeVar))}
			if (cDivS(xU,xL) == cDivS(sinS(deeVar),cPowS(cosS(deeVar),2))) {return cDivS(1,cosS(deeVar))}
			if (cDivS(xU,xL) == cDivS(1,cMulS(cPowS(cosS(deeVar),2),sinS(deeVar)))) {return cAddS(cDivS(1,cosS(deeVar)),lndS(tanS(cDivS(deeVar,2))))}
			if (cDivS(xU,xL) == cDivS(1,cMulS(cosS(deeVar),cPowS(sinS(deeVar),2)))) {return cSubS(lndS(tanS(cDivS(deeVar,2))),cDivS(1,sinS(deeVar)))}
			var xTest = xprMatch(cDivS(xU,xL),cDivS(1,cSubS("Cv[9999]",sqtS(deeVar))));
			if (xTest && !strTest(xTest,deeVar)) {return cSubS(cNegS(cMulS(2,sqtS(deeVar))),cMulS(cMulS(2,xTest),lndS(cSubS(sqtS(deeVar),xTest))))}
            xTest = xprMatch(cDivS(xU,xL),cDivS(1,cAddS(sqtS(deeVar),"Cv[9999]")));
            if (xTest && !strTest(xTest,deeVar)) {return cSubS(cMulS(2,sqtS(deeVar)),cMulS(cMulS(2,xTest),lndS(cAddS(sqtS(deeVar),xTest))))}
            xTest = xprMatch(cDivS(xU,xL),cDivS(1,cSubS(sqtS(deeVar),"Cv[9999]")));
            if (xTest && !strTest(xTest,deeVar)) {return cAddS(cMulS(2,sqtS(deeVar)),cMulS(cMulS(2,xTest),lndS(cSubS(sqtS(deeVar),xTest))))}
			if (cDivS(xU,xL) == cDivS(1,cMulS(cosS(deeVar),sinS(deeVar)))) {return lndS(tanS(deeVar))}
			if (strTest(xL,"sqt") && strTest(xL,deeVar) && strTest(xU,deeVar)) {
				var iTemp = xReduce(cDivS(xU,cMulS(xL,drvS(xL,deeVar))));
				if (drvS(cMulS(iTemp,xL),deeVar) == cDivS(xU,xL)) {return cMulS(iTemp,xL)}
			}
			if (xTractU.func == "sqt" && xTractL.func == "sqt" && xTractU.upper == deeVar) {
				var sqTemp = xprMatch(xTractL.upper, "cAdd(Cv[9999],"+deeVar+")");
				if (sqTemp && !strTest(sqTemp,deeVar)) {return cSubS(sqtS(cMulS(deeVar,cAddS(sqTemp,deeVar))),cMulS(sqTemp,lndS(sqtS(cMulS(deeVar,cAddS(sqTemp,deeVar))))))}
				sqTemp = xprMatch(xTractL.upper,"cAdd("+deeVar+",Cv[9999])");
				if (sqTemp && !strTest(sqTemp,deeVar)) {return cSubS(sqtS(cMulS(deeVar,cAddS(sqTemp,deeVar))),cMulS(sqTemp,lndS(sqtS(cMulS(deeVar,cAddS(sqTemp,deeVar))))))}
				sqTemp = xprMatch(xTractL.upper,"cSub("+deeVar+",Cv[9999])");
				if (sqTemp && !strTest(sqTemp,deeVar)) {return cSubS(sqtS(cMulS(deeVar,cAddS(cNegS(sqTemp),deeVar))),cMulS(cNegS(sqTemp),lndS(sqtS(cMulS(deeVar,cAddS(cNegS(sqTemp),deeVar))))))}
				sqTemp = xprMatch(xTractL.upper,"cSub(Cv[9999],"+deeVar+")");
				if (sqTemp && !strTest(sqTemp,deeVar)) {return cSubS(cNegS(sqtS(cMulS(deeVar,cSubS(sqTemp,deeVar)))),cMulS(sqTemp,atnS(cDivS(sqtS(cMulS(deeVar,cSubS(sqTemp,deeVar))),cSubS(sqTemp,deeVar)))))}
			}
			//general cases
			if (deeVar == xU && !strTest(xL,deeVar)) {return cDivS(cPowS(xU,2),cMulS(xL,2))}
			if (deeVar == xL && !strTest(xU,deeVar)) {return cMulS(xU,lndS(cIterate(xL)))}
			if (strTest(xU,deeVar) && !strTest(xL,deeVar)) {return cMulS(cDivS(1,xL),ntgS(xU,deeVar))}
			if (strTest(xL,deeVar) && !strTest(xU,deeVar)) {
				if (+xU != 1) {return cMulS(xU,ntgS(cDivS(1,xL),deeVar))}
				var aTemp = cMulS(xU,lndS(xL));
				var tTest = cDivS(drvS(aTemp,deeVar),cDivS(xU,xL));
				if (!strTest(tTest,deeVar) && ntgTest(tTest)) {return cDivS(aTemp,tTest)}
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
                if (xTractL.func == "cos") {return cMulS(ntgS(secS(xTractL.upper),deeVar),xU)}
				if (xTractL.func == "sin") {return cMulS(ntgS(cscS(xTractL.upper),deeVar),xU)}
				if (xTractL.func == "csh") {return cMulS(ntgS(schS(xTractL.upper),deeVar),xU)}
				if (xTractL.func == "snh") {return cMulS(ntgS(cchS(xTractL.upper),deeVar),xU)}
                if (xTractL.func == "cMul" && !strTest(xL,"sqt")) {iIterations++;return cMulS(xU,cMulI("cDiv(1,"+xTractL.lower+")","cDiv(1,"+xTractL.upper+")"))}
				if (xL == "cPow(Cv[8],cPow("+deeVar+",2))" ) {return cDivS(cMulS(erfS(deeVar),sqtS("Cv[29]")),2)}                
				if (xL == "cSub(cPow("+deeVar+",2),1)") {return cNegS(athS(deeVar))}
				if (xTractL.func == "cPow") {
					var xTractB = opExtract(xTractL.upper);
					if (+xTractL.lower == 2) {
						if (xTractB.func == "sin") {return ntgS(cPowS(cscS(xTractB.upper),2),deeVar) }
						if (xTractB.func == "cos") {return ntgS(cPowS(secS(xTractB.upper),2),deeVar) }
						if (xTractB.func == "tan") {return ntgS(cPowS(cotS(xTractB.upper),2),deeVar) }
						if (xTractB.func == "sec") {return ntgS(cPowS(cosS(xTractB.upper),2),deeVar) }
						if (xTractB.func == "csc") {return ntgS(cPowS(sinS(xTractB.upper),2),deeVar) }
						if (xTractB.func == "cot") {return ntgS(cPowS(tanS(xTractB.upper),2),deeVar) }
						if (xTractB.func == "snh") {return ntgS(cPowS(cchS(xTractB.upper),2),deeVar) }
						if (xTractB.func == "csh") {return ntgS(cPowS(schS(xTractB.upper),2),deeVar) }
						if (xTractB.func == "tnh") {return ntgS(cPowS(cthS(xTractB.upper),2),deeVar) }
						if (xTractB.func == "sch") {return ntgS(cPowS(cshS(xTractB.upper),2),deeVar) }
						if (xTractB.func == "cch") {return ntgS(cPowS(snhS(xTractB.upper),2),deeVar) }
						if (xTractB.func == "cth") {return ntgS(cPowS(tnhS(xTractB.upper),2),deeVar) }
					}
					iIterations++;
                    return cMulS(xU,cPowI(xTractL.upper,cNegS(xTractL.lower)))
				}
                if (xTractL.func == "sqt") {
					if (xprMatch(xTractL.upper, "cSub(1,cPow(Cv[9999],2))") == deeVar) {return asnS(deeVar)}
					if (xprMatch(xTractL.upper, "cAdd(cPow(Cv[9999],2),1)") == deeVar) {return ashS(deeVar)}
					if (xprMatch(xTractL.upper, "cSub(cPow(Cv[9999],2),1)") == deeVar) {return achS(deeVar)}
					var sqTemp = xprMatch(xTractL.upper, "cSub(Cv[9999],cPow("+deeVar+",2))");
					if (sqTemp && !strTest(sqTemp,deeVar)) {return atnS(cDivS(deeVar,xL))}
                    iIterations++;
                    sqTemp = cMulS(xU,cPowI(xTractL.upper,"cDiv(-1,2)"));
					if (ntgTest(sqTemp)) {return sqTemp}
				}
				if (strTest(xL,"sqt")) {
					var iTemp = iSearch("cDiv("+xU+","+xL+")","erf"); 
					if (ntgTest(iTemp)) {return iTemp}
					iTemp = iSearch("cDiv("+xU+","+xL+")","axh"); 
					if (ntgTest(iTemp)) {return iTemp}
					iTemp = iSearch("cDiv("+xU+","+xL+")","ayh"); 
					if (ntgTest(iTemp)) {return iTemp}
					iTemp = iSearch("cDiv("+xU+","+xL+")","ash"); 
					if (ntgTest(iTemp)) {return iTemp}
					iTemp = iSearch("cDiv("+xU+","+xL+")","asc"); 
					if (ntgTest(iTemp)) {return iTemp}
				}
			}
			if (strTest(xL,deeVar) && pNomial(xL).length > 2 && iIterations < 5) { //integration by partial fractions
				var fTemp = cFactor("cDiv("+xU+","+xL+")");
				if (!strTest(xU,deeVar) || (!strTest(fTemp,xU) && !strTest(fTemp,xL))) {
					var pTemp = ntgS(fTemp,deeVar);
					if (ntgTest(pTemp)) {return pTemp}
				}
			}
			if (strTest(xL,deeVar) && strTest(xU,deeVar)) {
                var pTemp = xSubst(xU,cPowS(xL,-1));
				if (ntgTest(pTemp)) {return pTemp}
                pTemp = iParts(xU,cPowS(xL,-1));
				if (ntgTest(pTemp)) {return pTemp}
			}
			return "undefined"
		}
		function cTmsI(xU,xL) {return cMulI(xU,xL)}
		function cDotI(xU,xL) {return cMulI(xU,xL)}
		function cAddI(xU,xL) {return cAddS(ntgS(xU,deeVar),ntgS(xL,deeVar))}
		function cSubI(xU,xL) {return cSubS(ntgS(xU,deeVar),ntgS(xL,deeVar))}
		function cNegI(xU)    {return cNegS(ntgS(xU,deeVar))}
		function lneI(xU) {
			var xTractU = opExtract(xU);
			if (deeVar == xU) {return cSubS(cMulS(xU,lneS(xU)),xU)}
			if (xTractU.func == "cAdd" && xprMatch(xU,"cAdd(cPow(Cv[9999],2),1)")) {
				var mTemp = xprMatch(xU,"cAdd(cPow(Cv[9999],2),1)");
				return cAddS(cMulS(mTemp,cSubS(lneS(xU),2)),cMulS(2,atnS(mTemp)))
			}
			if (xTractU.func == "cMul") {return cAddS(ntgS(lneS(xTractU.upper),deeVar),ntgS(lneS(xTractU.lower),deeVar))}
			if (xTractU.func == "cDiv") {return cSubS(ntgS(lneS(xTractU.upper),deeVar),ntgS(lneS(xTractU.lower),deeVar))}
			return uSubst(lneS(xU))
		}        
		function sqtI(xU) {
			if (deeVar == xU) {return cDivS(cMulS(2,cPowS(xU,cDivS(3,2))),3)}
			var uTemp = xprMatch(xU,"cAdd(cPow("+deeVar+",2),Cv[9999])");
			if (uTemp && !strTest(uTemp,deeVar)) {return cDivS(cAddS(cMulS(deeVar,sqtS(cAddS(cPowS(deeVar,2),uTemp))),cMulS(uTemp,lndS(cAddS(uTemp,sqtS(cAddS(cPowS(deeVar,2),uTemp)))))),2)}
			uTemp = xprMatch(xU,"cAdd(Cv[9999],cPow("+deeVar+",2))");
			if (uTemp && !strTest(uTemp,deeVar)) {return cDivS(cAddS(cMulS(deeVar,sqtS(cAddS(cPowS(deeVar,2),uTemp))),cMulS(uTemp,lndS(cAddS(uTemp,sqtS(cAddS(cPowS(deeVar,2),uTemp)))))),2)}
			uTemp = xprMatch(xU,"cSub(cPow("+deeVar+",2),Cv[9999])");
			if (uTemp && !strTest(uTemp,deeVar)) {return cDivS(cAddS(cMulS(deeVar,sqtS(cSubS(cPowS(deeVar,2),uTemp))),cMulS(uTemp,lndS(cAddS(uTemp,sqtS(cSubS(cPowS(deeVar,2),uTemp)))))),2)}
			uTemp = ntgS(cPowS(xU,"cDiv(1,2)"),deeVar);
			if (ntgTest(uTemp)) {return uTemp}
			return uSubst(sqtS(xU))
		}	
		function cbtI(xU) {
			if (deeVar == xU) {return cDivS(cMulS(3,cPowS(xU,cDivS(4,3))),4)}
			var uTemp = ntgS(cPowS(xU,"cDiv(1,3)"),deeVar);
			if (ntgTest(uTemp)) {return uTemp}
			return uSubst(cbtS(xU))
		}
		function nrtI(xU,xL) {
			if (deeVar == xU) {return cDivS(cPowS(xU,cAddS(cDivS(1,xL))),cAddS(cDivS(1,xL),1))}
			var uTemp = ntgS(cPowS(xU,"cDiv(1,"+xL+")"),deeVar);
			if (ntgTest(uTemp)) {return uTemp}
			return "undefined"
		}
		function logI(xU) {
			if (deeVar == xU) {return cMulS(logS("Cv[8]"),cSubS(cMulS(xU,lneS(xU)),xU))};
			return uSubst(logS(xU))
		}
		function sinI(xU) {
			var xTractU = opExtract(xU);
			if (deeVar == xU) {return cNegS(cosS(xU))};
			if (xTractU.func == "lne" && xTractU.upper == deeVar) {return cNegS(cDivS(cMulS(deeVar,cSubS(cosS(lneS(deeVar)),sinS(lneS(deeVar)))),2))}
			return uSubst(sinS(xU))
		}
		function cosI(xU) {
			var xTractU = opExtract(xU);
			if (deeVar == xU) {return sinS(xU)};
			if (xTractU.func == "lne" && xTractU.upper == deeVar) {return cDivS(cMulS(deeVar,cAddS(cosS(lneS(deeVar)),sinS(lneS(deeVar)))),2)}
			return uSubst(cosS(xU))
		}
		function tanI(xU) {
			if (deeVar == xU) {return cNegS(lndS(cosS(xU)))}
			return uSubst(tanS(xU))
		}
		function cscI(xU) {
			if (deeVar == xU) {return cSubS(lndS(sinS(cDivS(xU,2))),lndS(cosS(cDivS(xU,2))))}
			return uSubst(cscS(xU))
		}
		function secI(xU) {
			if (deeVar == xU) {return lndS(cAddS(secS(xU),tanS(xU)))}
			return uSubst(secS(xU))
		}
		function cotI(xU) {
			if (deeVar == xU) {return lndS(sinS(xU))}
			return uSubst(cotS(xU))
		}
		function snhI(xU) {
			var xTractU = opExtract(xU);
			if (deeVar == xU) {return cshS(xU)}
			if (xTractU.func == "lne" && xTractU.upper == deeVar) {return cDivS(cSubS(cPowS(deeVar,2),cMulS(2,lneS(deeVar))),4)}
			return uSubst(snhS(xU))
		}
		function cshI(xU) {
			var xTractU = opExtract(xU);
			if (deeVar == xU) {return snhS(xU)}
			if (xTractU.func == "lne" && xTractU.upper == deeVar) {return cDivS(cAddS(cPowS(deeVar,2),cMulS(2,lneS(deeVar))),4)}
			return uSubst(cshS(xU))
		}
		function tnhI(xU) {
			var xTractU = opExtract(xU);
			if (deeVar == xU) {return lneS(cshS(xU))}
			if (xTractU.func == "lne" && xTractU.upper == deeVar) {return cSubS(deeVar,cMulS(2,atnS(deeVar)))}
			return uSubst(tnhS(xU))
		}
		function schI(xU) {
			if (deeVar == xU) {return cMulS(2,atnS(snhS(cDivS(xU,2))))}
			return uSubst(schS(xU))
		}
		function cchI(xU) {
			if (deeVar == xU) {return lndS(tnhS(cDivS(xU,2)))}
			return uSubst(cchS(xU))
		}
		function cthI(xU) {
			if (deeVar == xU) {return lndS(snhS(xU))}
			return uSubst(cthS(xU))
		}
		function asnI(xU) {
            if (deeVar == xU) {return cAddS(cMulS(xU,asnS(xU)),sqtS(cSubS(1,cPowS(xU,2))))}
            return uSubst(asnS(xU))
        }
		function acsI(xU) {
            if (deeVar == xU) {return cSubS(cMulS(xU,acsS(xU)),sqtS(cSubS(1,cPowS(xU,2))))}
            return uSubst(acsS(xU))
        }
		function atnI(xU) {
            if (deeVar == xU) {return cSubS(cMulS(xU,atnS(xU)),cDivS(lneS(cAddS(1,cPowS(xU,2))),2))}
            return uSubst(atnS(xU))
        }
		function actI(xU) {
            if (deeVar == xU) {return cAddS(cMulS(xU,atnS(xU)),cDivS(lneS(cAddS(1,cPowS(xU,2))),2))}
            return uSubst(actS(xU))
        }
		function ascI(xU) {
            if (deeVar == xU) {return cSubS(cMulS(xU,ascS(xU)),atnS(sqtS(cSubS(1,cDivS(1,cPowS(xU,2))))))}
            return uSubst(ascS(xU))
        }
		function accI(xU) {
            if (deeVar == xU) {return cSubS(cMulS(xU,acsS(xU)),sqtS(cSubS(1,cPowS(xU,2))))}
            return uSubst(accS(xU))
        }
		function ashI(xU) {
            if (deeVar == xU) {return cSubS(cMulS(xU,ashS(xU)),sqtS(cAddS(1,cPowS(xU,2))))}
            return uSubst(ashS(xU))
        }
		function achI(xU) {
            if (deeVar == xU) {return cSubS(cMulS(xU,achS(xU)),sqtS(cSubS(cPowS(xU,2),1)))}
            return uSubst(achS(xU))
        }
		function athI(xU) {
            if (deeVar == xU) {return cAddS(cMulS(xU,athS(xU)),cDivS(lneS(cSubS(cPowS(xU,2),1)),2))}
            return uSubst(athS(xU))
        }
		function axhI(xU) {
            if (deeVar == xU) {return cSubS(cMulS(xU,axhS(xU)),cDivS(cMulS(cMulS(cMulS(2,sqtS(cDivS(cSubS(1,xU),cAddS(xU,1)))),sqtS(cSubS(1,cPowS(xU,2)))),asnS(cDivS(sqtS(cAddS(xU,1)),sqtS(2)))),cSubS(xU,1)))}
            return uSubst(axhS(xU))
        }
		function ayhI(xU) {
            if (deeVar == xU) {return cMulS(xU,cAddS(cDivS(cMulS(sqtS(cAddS(cDivS(1,cPowS(xU,2)),1)),ashS(xU)),sqtS(cAddS(cPowS(xU,2),1))),cchS(xU)))}
            return uSubst(ayhS(xU))
        }
		function azhI(xU) {
            if (deeVar == xU) {return cAddS(cDivS(lneS(cSubS(1,cPowS(xU,2)))),cMulS(xU,azhS(xU)))}
            return uSubst(azhS(xU))
        }
		function expI(xU) {
            if (deeVar == xU) {return expS(xU)}
            return uSubst(expS(xU))
        }
		function absI(xU) {
            if (deeVar == xU) {return "cDiv(cMul("+xU+",abs("+xU+")),2)"}
            return uSubst(absS(xU))
        }
		function erfI(xU) {
            if (deeVar == xU) {return "cAdd(cMul("+xU+",erf("+xU+")),cDiv(1,cMul(cPow(Cv[8],cPow("+xU+",2)),sqt(Cv[29]))))"}
            return uSubst(erfS(xU))
        }
		function efcI(xU) {
            if (deeVar == xU) {return cSubS(cMulS(deeVar,efcS(deeVar)),cDivS(cPowS("Cv[8]",cNegS(cPowS(deeVar,2))),sqtS("Cv[29]")))}
            return uSubst(efcS(xU))
        }
		function lgnI(xU,xL) {
            if (deeVar == xL) {return cSubS(cMulS(xL,lgnS(xU,xL)),cDivS(xL,lneS(xU)))}
            return "undefined"
        }
		function conI(xU) {return "con("+xU+")"}
		function facI(xU) {return "fac("+xU+")"}
		function vecI(xU) {return "vec("+xU+")"}
		function hatI(xU) {return "hat("+xU+")"}
		function undI(xU) {return "und("+xU+")"}
		function udtI(xU) {return "udt("+xU+")"}
		function tldI(xU) {return "tld("+xU+")"}
		function cntI(xU) {return "cnt("+xU+")"}
		function sbtI(xU) {return "sbt("+xU+")"}
		function matI()   {return "mat(" + Array.prototype.slice.call(arguments) + ")"}
		// integration algorithms
        function iParts(xU,xL) { //integration by parts
            function pIntegrate(xTmp,nTmp) {return cSubS(cMulS(xTmp,nTmp),ntgS(cMulS(drvS(xTmp,deeVar),nTmp),deeVar))}
            var xTractU = opExtract(xU);
			var xTractL = opExtract(xL);
            var uuDegree = pNomial(xTractU.upper,deeVar).length-2;
			var ulDegree = pNomial(xTractU.lower,deeVar).length-2;
            var luDegree = pNomial(xTractL.upper,deeVar).length-2;
			var llDegree = pNomial(xTractL.lower,deeVar).length-2;
			var iReturn = 0;
			var ntgTemp = 0;
            //special cases
			if (xTractL.func == "cPow" && xTractU.func && strTest(xTractL.lower,deeVar)) {
				ntgTemp = ntgS("cMul("+xU+","+xL+")",xTractL.lower);
				iReturn = xReduce(cDivS("cMul("+xU+","+xL+")",drvS(ntgTemp,deeVar)));
				if (ntgTest(ntgTemp) && !strTest(iReturn,deeVar)) {return cMulS(iReturn,ntgTemp)}				
			}
			if (xTractU.func == "cPow" && xTractL.func && strTest(xTractU.lower,deeVar)) {
				ntgTemp = ntgS("cMul("+xU+","+xL+")",xTractU.lower);
				iReturn = xReduce(cDivS("cMul("+xU+","+xL+")",drvS(ntgTemp,deeVar)));
				if (ntgTest(ntgTemp) && !strTest(iReturn,deeVar)) {return cMulS(iReturn,ntgTemp)}
            }
			if (xTractL.func == "cPow" && xTractU.func && !xTractU.lower && strTest(xTractL.lower,deeVar)) {
                ntgTemp = xReduce(cDivS(xL,xTractU.upper));
                iReturn = pIntegrate(ntgTemp,ntgS("cMul("+ntgTemp+","+xU+")",deeVar));
                if (ntgTest(iReturn)) {return iReturn}
            }
            if (xTractU.func == "cPow" && xTractL.func && !xTractL.lower && strTest(xTractU.lower,deeVar)) {
                ntgTemp = xReduce(cDivS(xU,xTractL.upper));
                iReturn = pIntegrate(ntgTemp,ntgS("cMul("+ntgTemp+","+xL+")",deeVar));
                if (ntgTest(iReturn)) {return iReturn}
            }
			if (xTractL.func == "cPow" && xTractU.func && !xTractU.lower && uuDegree > 0) {
                iReturn = pIntegrate(xReduce(cDivS(xL,cPowS(deeVar,uuDegree))),ntgS("cMul(cPow("+deeVar+","+uuDegree+"),"+xU+")",deeVar));
                if (ntgTest(iReturn)) {return iReturn}			
			}
			if (xTractU.func == "cPow" && xTractL.func && !xTractL.lower && luDegree > 0) {
                iReturn = pIntegrate(xReduce(cDivS(xU,cPowS(deeVar,luDegree))),ntgS("cMul(cPow("+deeVar+","+luDegree+"),"+xL+")",deeVar));
                if (ntgTest(iReturn)) {return iReturn}
            }
			if (xTractL.func == "cPow" && xTractU.func && xTractU.lower && ulDegree > 0) {
                iReturn = pIntegrate(xReduce(cDivS(xL,cPowS(deeVar,ulDegree))),ntgS("cMul(cPow("+deeVar+","+ulDegree+"),"+xU+")",deeVar));
                if (ntgTest(iReturn)) {return iReturn}			
			}
			if (xTractU.func == "cPow" && xTractL.func && xTractL.lower && llDegree > 0) {
                iReturn = pIntegrate(xReduce(cDivS(xU,cPowS(deeVar,llDegree))),ntgS("cMul(cPow("+deeVar+","+llDegree+"),"+xL+")",deeVar));
                if (ntgTest(iReturn)) {return iReturn}
            }
            
            //general cases
            iReturn = pIntegrate(xU,ntgS(xL,deeVar));
            if (ntgTest(iReturn)) {return iReturn}
            iReturn = pIntegrate(xL,ntgS(xU,deeVar));
            if (ntgTest(iReturn)) {return iReturn}
            return "undefined"
        }
		function xSubst(xU,xL) { //integration by cross substitution
			function cIntegrate(x1,x2,x3) {
				var drvCheck = drvS(x1,deeVar);
				var factorCheck = xReduce(cDivS(x2,drvCheck));
				if (ntgTest(factorCheck) && !strTest(factorCheck,deeVar)) {return cMulS(factorCheck,ntgS(x3,x1))}
				return "undefined"
			}
			var xTractU = opExtract(xU);
			var xTractL = opExtract(xL);
			var drvTest = cIntegrate(xTractU.upper,xL,xU);
			if (ntgTest(drvTest)) {return drvTest}		
			drvTest = cIntegrate(xTractL.upper,xU,xL);
			if (ntgTest(drvTest)) {return drvTest}
			drvTest = cIntegrate(xTractU.lower,xL,xU);
			if (ntgTest(drvTest)) {return drvTest}
			drvTest = cIntegrate(xTractL.lower,xU,xL);
			if (ntgTest(drvTest)) {return drvTest}
			return "undefined"
		}
		function uSubst(xU) { //fn integration of single operand functions
			// fast test via derivative check
            var iReturn = ntgS(xU,opExtract(xU).upper);
			var tTest = xReduce(cDivS(xU,drvS(iReturn,deeVar)));
			if (ntgTest(tTest) && !strTest(tTest,deeVar)) {return cMulS(tTest,iReturn)}
            // u substitution
            iIterations = iIterations-10;
			var xTractU = opExtract(xU);
			if (xTractU.func && !xTractU.lower) {
				var xVar = relExtract(xprSolve(cEqlS("Cv[9999]",xU),deeVar)).lower;
				iReturn = cSubst(ntgS(cMulS("Cv[9999]",drvS(xVar,"Cv[9999]")),"Cv[9999]"),"Cv[9999]",xU);
                tTest = cReduce(cDivS(xU,drvS(iReturn,deeVar)));
                if (ntgTest(tTest) && !strTest(tTest,deeVar)) {return cMulS(tTest,iReturn)}
			}
			return "undefined"
		}
		function iSearch(xU,xF) { //integration by derivative search (shotgun approach)
			var tElements = cDissect(xU);
			var tSearch = xReduce(cDivS(xU,drvQ(xF+"("+deeVar+")",deeVar)));
			if (!strTest(tSearch,deeVar) && ntgTest(tSearch)) {return cMulS(xF+"("+deeVar+")",tSearch)}
            for (var tL=0;tL<tElements.length;tL++) {
                if (tElements[tL] != deeVar && !nbrTest(tElements[tL]) && !strTest(tElements[tL],"undefined") && tElements[tL]) {
                    tSearch = xReduce(cDivS(xU,drvQ(xF+"("+cAddS(deeVar,tElements[tL])+")",deeVar)));
                    if (!strTest(tSearch,deeVar) && ntgTest(tSearch)) {return cMulS(xF+"("+cAddS(deeVar,tElements[tL])+")",tSearch)}
                    tSearch = xReduce(cDivS(xU,drvQ(xF+"("+cSubS(deeVar,tElements[tL])+")",deeVar)));
                    if (!strTest(tSearch,deeVar) && ntgTest(tSearch)) {return cMulS(xF+"("+cSubS(deeVar,tElements[tL])+")",tSearch)}
                    tSearch = xReduce(cDivS(xU,drvQ(xF+"("+cSubS(tElements[tL],deeVar)+")",deeVar)));
                    if (!strTest(tSearch,deeVar) && ntgTest(tSearch)) {return cMulS(xF+"("+cSubS(tElements[tL],deeVar)+")",tSearch)}
                    tSearch = xReduce(cDivS(xU,drvQ(xF+"("+cMulS(deeVar,tElements[tL])+")",deeVar)));
                    if (!strTest(tSearch,deeVar) && ntgTest(tSearch)) {return cMulS(xF+"("+cMulS(deeVar,tElements[tL])+")",tSearch)}
                    tSearch = xReduce(cDivS(xU,drvQ(xF+"("+cDivS(deeVar,tElements[tL])+")",deeVar)));
                    if (!strTest(tSearch,deeVar) && ntgTest(tSearch)) {return cMulS(xF+"("+cDivS(deeVar,tElements[tL])+")",tSearch)}
                    tSearch = xReduce(cDivS(xU,drvQ(xF+"("+cDivS(tElements[tL],deeVar)+")",deeVar)));
                    if (!strTest(tSearch,deeVar) && ntgTest(tSearch)) {return cMulS(xF+"("+cDivS(tElements[tL],deeVar)+")",tSearch)}
                }
            }
			return "undefined"
		}
		function ntgExecute(xIn) {return eval(strConvert(xIn).replace(/([a-z])\(/,"$1I(").replace(/([a-z])\(/g,"$1S(").replace(/(Cv\[\d+\])/g,"'$1'").replace(/(Pv\[\d+\])/g,"'$1'").replace(/(Sv\[\d+\])/g,"'$1'"))}
		//
        nXpr = strConvert(nXpr);
		if (!ntgTest(nXpr)) {return nXpr}
		if (iIterations > 20) {return "undefined"} //break infinite loop
		iIterations++;
		if (typeof iU != "undefined" && typeof iL != "undefined") { //definite integral
			var iTmp = ntgS(xReduce(nXpr),deeVar);
			if (ntgTest(iTmp)) {
				if (strTest(iU,"Cv[8734]") || strTest(iL,"Cv[8734]")) {return cReduce(cSubS(lmtS(iTmp,deeVar,iU),lmtS(iTmp,deeVar,iL)))} //improper integral
				return cReduce(cSubS(cSubst(iTmp,deeVar,iU),cSubst(iTmp,deeVar,iL)))
			}
			return "ntp("+nXpr+","+deeVar+","+iU+","+iL+")"
		}
		else if (xReduce(nXpr) == deeVar) {return cDivS(cPowS(deeVar,2),2)}  //integral of deeVar
		else if (!strTest(xReduce(nXpr),deeVar)) {return cMulS(nXpr,deeVar)} //integral of null expression
		else { //indefinite integral
			var dXpr = ntgExecute(xReduce(nXpr));
			if (ntgCheck(dXpr)) {return cReduce(dXpr)}
			dXpr = ntgExecute(cExpand(nXpr));
			if (ntgCheck(dXpr)) {return cReduce(dXpr)}
			return "ntp("+nXpr+","+deeVar+")"
		}
	}

	// Expand functions
	function cExpand(xE) { //full expansion
		var xTemp = strConvert(xE);
		xTemp = xReduce(eval(xTemp.replace(/([a-z])\(/g,"$1S(").replace(/(Cv\[\d+\])/g,"'$1'").replace(/lneS/g,"lneX").replace(/sqtS/g,"sqtX").replace(/cPowS/g,"cPowX").replace(/cMulS/g,"cMulX").replace(/cDivS/g,"cDivX").replace(/cAddS/g,"cAddX").replace(/cSubS/g,"cSubX").replace(/(Pv\[\d+\])/g,"'$1'").replace(/(Sv\[\d+\])/g,"'$1'")));
		xTemp = xTemp.replace(/cnt\(/g,"(");
		if (!strTest("undefined",xTemp)) {return xTemp}
		return xE
	}
	function iExpand(xE) { //operator-only expansion
		var xTemp = strConvert(xE);
		xTemp = xReduce(eval(xTemp.replace(/([a-z])\(/g,"$1S(").replace(/(Cv\[\d+\])/g,"'$1'").replace(/cDivS/g,"cDivX").replace(/cMulS/g,"cMulX").replace(/cAddS/g,"cAddX").replace(/cSubS/g,"cSubX").replace(/(Pv\[\d+\])/g,"'$1'").replace(/(Sv\[\d+\])/g,"'$1'")));
		xTemp = xTemp.replace(/cnt\(/g,"(");
		if (!strTest("undefined",xTemp)) {return xTemp}
		return xE
	}
	function cAddX(xU,xL) {
		var xTractU = opExtract(xU);
		var xTractL = opExtract(xL);
		if (xTractU.func == "cDiv" && xTractL.func == "cDiv") {return "cDiv(cnt(cAdd("+cMulS(xTractU.upper,xTractL.lower)+","+cMulS(xTractL.upper,xTractU.lower)+")),"+cMulS(xTractL.lower,xTractU.lower)+")"}
		return "cAdd("+xU+","+xL+")"
	}
	function cSubX(xU,xL) {
		var xTractU = opExtract(xU);
		var xTractL = opExtract(xL);
		if (xTractU.func == "cDiv" && xTractL.func == "cDiv") {return "cDiv(cnt(cSub("+cMulS(xTractU.upper,xTractL.lower)+","+cMulS(xTractL.upper,xTractU.lower)+")),"+cMulS(xTractL.lower,xTractU.lower)+")"}
		return "cSub("+xU+","+xL+")"
	}
	function cPowX(xU,xL) {
		var xTractU = opExtract(xU);
		var xTractL = opExtract(xL);
		if (xTractU.func == "cAdd" && +xL == 2) {return cMulX(xU,(xU))}
		if (xTractU.func == "cSub" && +xL == 2) {return cMulX(xU,(xU))}
		if (xTractU.func == "cAdd" || xTractU.func == "cSub" || xTractU.func == "cTms" || xTractU.func == "cDiv" || xTractU.func == "cMul" || xTractU.func == "cPow") {xU = "("+xU+")"}
		if (xTractL.func == "cAdd" || xTractL.func == "cSub" || xTractL.func == "cTms" || xTractL.func == "cDiv" || xTractL.func == "cMul" || xTractL.func == "cNeg") {xL = "("+xL+")"}
		if (xTractL.func == "cAdd") {return "cMul(cPow("+xU+","+xTractL.upper+"),cnt(cPow("+xU+","+xTractL.lower+")))"}
		if (xTractL.func == "cSub") {return "cDiv(cPow("+xU+","+xTractL.upper+"),cnt(cPow("+xU+","+xTractL.lower+")))"}
		if (xTractU.func == "cMul") {return "cMul(cPow("+xTractU.upper+","+xL+"),cnt(cPow("+xTractU.lower+","+xL+")))"}
		if (xTractU.func == "cDiv") {return "cDiv(cPow("+xTractU.upper+","+xL+"),cnt(cPow("+xTractU.lower+","+xL+")))"}
		return "cPow("+xU+","+xL+")"
	}
	function cMulX(xU,xL) {
		var xTractU = opExtract(xU);
		var xTractL = opExtract(xL);
		if (nbrTest(xU) && xTractL.func == "cPow" && nbrTest(xTractL.upper)) {xL = "("+xL+")"}
		if (xTractU.func == "cAdd") {return cAddS(cMulX(xTractU.upper,xL),cMulX(xTractU.lower,xL))}
		if (xTractU.func == "cSub") {return cSubS(cMulX(xTractU.upper,xL),cMulX(xTractU.lower,xL))}
		if (xTractL.func == "cAdd") {return cAddS(cMulX(xTractL.upper,xU),cMulX(xTractL.lower,xU))}
		if (xTractL.func == "cSub") {return cSubS(cMulX(xTractL.upper,xU),cMulX(xTractL.lower,xU))}
		return "cMul("+xU+","+xL+")"
	}
	function cDivX(xU,xL) {
		var xTractU = opExtract(xU);
		var xTractL = opExtract(xL);
		if (pNomial(xL).length < 2) {
			if (xTractU.func == "cAdd") {return "cAdd(cnt(cDiv("+xTractU.upper+","+xL+")),cnt(cDiv("+xTractU.lower+","+xL+")))"}
			if (xTractU.func == "cSub") {return "cSub(cnt(cDiv("+xTractU.upper+","+xL+")),cnt(cDiv("+xTractU.lower+","+xL+")))"}
		}
		return "cDiv("+xU+","+xL+")"
	}
	function lneX(xU) {
		var xTractU = opExtract(xU);
		if (xTractU.func == "cMul") {return cAddS(lneS(xTractU.upper),lneS(xTractU.lower))}
		if (xTractU.func == "cDiv") {return cSubS(lneS(xTractU.upper),lneS(xTractU.lower))}
		if (xTractU.func == "cPow") {return cMulS(xTractU.lower,lneS(xTractU.upper))}
		if (xTractU.func == "sqt")  {return cDivS(lneS(xTractU.upper),2)}
		if (xTractU.func == "cbt")  {return cDivS(lneS(xTractU.upper),3)}
		return "lne("+xU+")"
	}
	function sqtX(xU) {
		var xTractU = opExtract(xU);
		if (xTractU.func == "cMul") {return "cMul(cnt(sqt("+xTractU.upper+")),cnt(sqt("+xTractU.lower+")))"}
		if (xTractU.func == "cDiv") {return "cDiv(cnt(sqt("+xTractU.upper+")),cnt(sqt("+xTractU.lower+")))"}
		return "sqt("+xU+")"
	}

	//Exponential trig conversion
	function cTrigExp(xU) {
		var trigFn = ["sin","cos","tan","sec","csc","cot","snh","csh","tnh","sch","cch","cth","asn","acs","atn","asc","acc","act","ash","ach","ath"]
		function sinE(xU) {return cDivS(cSubS(cPowS("Cv[8]",cMulS("Cv[46]",xU)),cPowS("Cv[8]",cMulS(cNegS("Cv[46]"),xU))),cMulS("2","Cv[46]"))}
		function cosE(xU) {return cDivS(cAddS(cPowS("Cv[8]",cMulS("Cv[46]",xU)),cPowS("Cv[8]",cMulS(cNegS("Cv[46]"),xU))),"2")}
		function tanE(xU) {return cDivS(cSubS(cPowS("Cv[8]",cMulS("Cv[46]",xU)),cPowS("Cv[8]",cMulS(cNegS("Cv[46]"),xU))),cMulS("Cv[46]",cAddS(cPowS("Cv[8]",cMulS("Cv[46]",xU)),cPowS("Cv[8]",cMulS(cNegS("Cv[46]"),xU)))))  }
		function secE(xU) {return cDivS("2",cAddS(cPowS("Cv[8]",cMulS("Cv[46]",xU)),cPowS("Cv[8]",cMulS(cNegS("Cv[46]"),xU))))}
		function cscE(xU) {return cDivS(cMulS("2","Cv[46]"),cSubS(cPowS("Cv[8]",cMulS("Cv[46]",xU)),cPowS("Cv[8]",cMulS(cNegS("Cv[46]"),xU))))}
		function cotE(xU) {return cDivS(cMulS("Cv[46]",cAddS(cPowS("Cv[8]",cMulS("Cv[46]",xU)),cPowS("Cv[8]",cMulS(cNegS("Cv[46]"),xU)))),cSubS(cPowS("Cv[8]",cMulS("Cv[46]",xU)),cPowS("Cv[8]",cMulS(cNegS("Cv[46]"),xU))))  }
		function snhE(xU) {return cDivS(cSubS(cPowS("Cv[8]",xU),cPowS("Cv[8]",cNegS(xU))),"2")}
		function cshE(xU) {return cDivS(cAddS(cPowS("Cv[8]",xU),cPowS("Cv[8]",cNegS(xU))),"2")}
		function tnhE(xU) {return cDivS(cSubS(cPowS("Cv[8]",xU),cPowS("Cv[8]",cNegS(xU))),cAddS(cPowS("Cv[8]",xU),cPowS("Cv[8]",cNegS(xU))))}
		function schE(xU) {return cDivS("2",cAddS(cPowS("Cv[8]",xU),cPowS("Cv[8]",cNegS(xU))))}
		function cchE(xU) {return cDivS("2",cSubS(cPowS("Cv[8]",xU),cPowS("Cv[8]",cNegS(xU))))}
		function cthE(xU) {return cDivS(cAddS(cPowS("Cv[8]",xU),cPowS("Cv[8]",cNegS(xU))),cSubS(cPowS("Cv[8]",xU),cPowS("Cv[8]",cNegS(xU))))}
		function asnE(xU) {return cNegS(cMulS("Cv[46]",lneS(cAddS(cMulS("Cv[46]",xU),sqtS(cSubS(1,cPowS(xU,"2")))))))}
		function acsE(xU) {return cMulS("Cv[46]",lneS(cAddS(xU,cMulS("Cv[46]",sqtS(cSubS(1,cPowS(xU,"2")))))))}
		function atnE(xU) {return cDivS(cMulS("Cv[46]",lneS(cDivS(cAddS("Cv[46]",xU),cSubS("Cv[46]",xU)))),"2")}
		function ascE(xU) {return cNegS(cDivS(lneS(cAddS(cDivS("Cv[46]",xU),sqtS(cSubS(1,cDivS("Cv[46]",cPowS(xU,"2")))))),"2"))}
		function accE(xU) {return cNegS(cDivS(lneS(cAddS(cDivS("Cv[46]",xU),sqtS(cSubS("Cv[46]",cDivS("Cv[46]",cPowS(xU,"2")))))),"2"))}
		function actE(xU) {return cDivS(cMulS("Cv[46]",lneS(cDivS(cSubS("Cv[46]",xU),cAddS("Cv[46]",xU)))),"2")}
		function ashE(xU) {return lneS(cAddS(xU,sqtS(cAddS(cPowS(xU,"2"),1))))}
		function achE(xU) {return lneS(cAddS(xU,sqtS(cSubS(cPowS(xU,"2"),1))))}
		function athE(xU) {return cDivS(cMulS(lneS(cAddS(1,xU)),lneS(cSubS(1,xU))),"2")}
		//
		xU = strConvert(xU);
		for (var xFn=0;xFn<trigFn.length;xFn++) {
			var rgx = new RegExp(trigFn[xFn]+"S","g");
			xU = eval(xU.replace(/([a-z])\(/g,"$1S(").replace(/(Cv\[\d+\])/g,"'$1'").replace(/(Pv\[\d+\])/g,"'$1'").replace(/(Sv\[\d+\])/g,"'$1'").replace(rgx,trigFn[xFn]+"E"));
		}
		return xU
	}

	//Limits
	function lmtS(lXpr,lVar,xLim) {
		function cAddL(xU,xL) {return cAddS(lmtS(xU,lVar,xLim),lmtS(xL,lVar,xLim))} 
		function cSubL(xU,xL) {return cSubS(lmtS(xU,lVar,xLim),lmtS(xL,lVar,xLim))} 
		function cMulL(xU,xL) {return cMulS(lmtS(xU,lVar,xLim),lmtS(xL,lVar,xLim))}
		function cDivL(xU,xL) {
			if (+xU == 0 && +xL != 0) {return 0}
			var polyU = pNomial(xU);
			var polyL = pNomial(xL);
			if (+xL == 0) {return "Cv[8734]"}
			if (xL == "Cv[8734]" && !strTest(xU,"Cv[8734]")) {return 0}
			if (xL == "cNeg(Cv[8734])" && !strTest(xU,"Cv[8734]")) {return 0}
			if (!strTest(xU,lVar) && !strTest(xL,lVar)) {return cDivS(xU,xL)}
			if (polyU.length >= 1 && polyL.length >= 1 && strConvert(pVariable(xU)) == strConvert(pVariable(xL)) && strTest(xLim,"Cv[8734]")) {
				if (polyU.length == polyL.length) {return cDivS(polyU[polyU.length-1],polyL[polyL.length-1])}
				if (polyU.length > polyL.length) {return xLim}
				if (polyU.length < polyL.length) {return 0}
			}
			if (strTest(xLim,"Cv[8734]") && strTest(xL,lVar) && !strTest(xU,lVar)) {return 0}
			if (lmtS(xL,lVar,xLim) != 0) {return cDivS(lmtS(xU,lVar,xLim),lmtS(xL,lVar,xLim))}
			return cDivS(drvS(xU,lVar),drvS(xL,lVar))
		}
		function cPowL(xU,xL) {
			if (strTest(xLim,"Cv[8734]")) {
				if (strTest(xL,lVar) && xLim == "Cv[8734]" && +xU > 1) {return "Cv[8734]"}
				if (strTest(xL,lVar) && xLim == "Cv[8734]" && +xU > -1 && +xU < 1) {return 0}		
				if (strTest(xU,lVar) && xLim == "Cv[8734]" && +xL > 0 && +xL < 1) {return 0}
				if (strTest(xU,lVar) && xLim == "Cv[8734]" && +xL > 1) {return "Cv[8734]"}			
				if (strTest(xU,lVar) && xLim == "cNeg(Cv[8734])" && +xL > 1 && nbrEven(xL)) {return "Cv[8734]"}
				if (strTest(xU,lVar) && xLim == "cNeg(Cv[8734])" && +xL > 1 && !nbrEven(xL)) {return "cNeg(Cv[8734])"}
				if (strTest(xU,lVar) && xLim == "cNeg(Cv[8734])" && +xL > 1) {return "cNeg(Cv[8734])"}
				if (strTest(xL,lVar) && xLim == "cNeg(Cv[8734])" && +xU > 1) {return 0}			
				if (strTest(xL,lVar) && xLim == "cNeg(Cv[8734])" && +xU > -1 && +xU < 1) {return "Cv[8734]"}
				if (xL == "Cv[8734]" && +xU > 1) {return "Cv[8734]"}
				if (xL == "Cv[8734]" && +xU > -1 && +xU < 1) {return 0}
				if (xL == "cNeg(Cv[8734])" && +xU > 1) {return 0}	
				if (xL == "cNeg(Cv[8734])" && +xU > -1 && +xU < 1) {return "Cv[8734]"}
				return "Cv[8734]"
			}
			if (xL == "Cv[8734]") {return "Cv[8734]"}
			if (xL == "cNeg(Cv[8734])" && !strTest(xU,"Cv[8734]")) {return 0}
			if (xU == "Cv[8734]") {return "Cv[8734]"}
			return cPowS(lmtS(xU,lVar,xLim),lmtS(xL,lVar,xLim))
		}
		function lneL(xU) {
			if (xLim == "Cv[8734]" && lVar == xU) {return "Cv[8734]"};
			if (xLim == "cNeg(Cv[8734])" && lVar == xU) {return "undefined"};
			return lneS(lmtS(xU,lVar,xLim))
		}
		function sqtL(xU) {var lTmp = sqtS(lmtS(xU,lVar,xLim));if (lTmp == "sqt(Cv[8734])" || lTmp == "sqt(cNeg(Cv[8734]))") {return "Cv[8734]"}; return lTmp}
		function cbtL(xU) {var lTmp = cbtS(lmtS(xU,lVar,xLim));if (lTmp == "cbt(Cv[8734])") {return "Cv[8734]"};;if (lTmp == "cbt(cNeg(Cv[8734]))") {return "cNeg(Cv[8734])"} return lTmp}
		function sinL(xU) {var lTmp = sinS(lmtS(xU,lVar,xLim));if (strTest(lTmp,"Cv[8734]")) {return "undefined"}; return lTmp}
		function cosL(xU) {var lTmp = cosS(lmtS(xU,lVar,xLim));if (strTest(lTmp,"Cv[8734]")) {return "undefined"}; return lTmp}
		function tanL(xU) {var lTmp = tanS(lmtS(xU,lVar,xLim));if (strTest(lTmp,"Cv[8734]")) {return "undefined"}; return lTmp}
		function cscL(xU) {return lmtS(cDivS(1,sinS(xU)),lVar,xLim)}
		function secL(xU) {return lmtS(cDivS(1,cosS(xU)),lVar,xLim)}
		function cotL(xU) {if (+xLim == 0 || strTest(xLim,"Cv[8734]")) {return "undefined"}; return cotS(lmtS(xU,lVar,xLim))}
		function snhL(xU) {var lTmp = snhS(lmtS(xU,lVar,xLim));if (strTest(lTmp,"Cv[8734]")) {return "undefined"}; return lTmp}
		function cshL(xU) {var lTmp = cshS(lmtS(xU,lVar,xLim));if (strTest(lTmp,"Cv[8734]")) {return "undefined"}; return lTmp}
		function tnhL(xU) {var lTmp = tnhS(lmtS(xU,lVar,xLim));if (strTest(lTmp,"Cv[8734]")) {return "undefined"}; return lTmp}
		function schL(xU) {var lTmp = schS(lmtS(xU,lVar,xLim));if (strTest(lTmp,"Cv[8734]")) {return "undefined"}; return lTmp}
		function cchL(xU) {var lTmp = cchS(lmtS(xU,lVar,xLim));if (strTest(lTmp,"Cv[8734]")) {return "undefined"}; return lTmp}
		function cthL(xU) {var lTmp = cthS(lmtS(xU,lVar,xLim));if (strTest(lTmp,"Cv[8734]")) {return "undefined"}; return lTmp}
		function asnL(xU) {var lTmp = asnS(lmtS(xU,lVar,xLim));if (strTest(lTmp,"Cv[8734]")) {return "undefined"}; return lTmp}
		function acsL(xU) {var lTmp = acsS(lmtS(xU,lVar,xLim));if (strTest(lTmp,"Cv[8734]")) {return "undefined"}; return lTmp}
		function atnL(xU) {var lTmp = atnS(lmtS(xU,lVar,xLim));if (lTmp == "atn(Cv[8734])") {return cDivS("Cv[29]","2")};if (lTmp == "atn(cNeg(Cv[8734]))") {return cNegS(cDivS("Cv[29]","2"))};return lTmp}
		function actL(xU) {var lTmp = actS(lmtS(xU,lVar,xLim));if (strTest(lTmp,"Cv[8734]")) {return "undefined"}; return lTmp}
		function ascL(xU) {var lTmp = ascS(lmtS(xU,lVar,xLim));if (strTest(lTmp,"Cv[8734]")) {return "undefined"}; return lTmp}
		function accL(xU) {var lTmp = accS(lmtS(xU,lVar,xLim));if (strTest(lTmp,"Cv[8734]")) {return "undefined"}; return lTmp}
		function ashL(xU) {var lTmp = ashS(lmtS(xU,lVar,xLim));if (strTest(lTmp,"Cv[8734]")) {return "undefined"}; return lTmp}
		function achL(xU) {var lTmp = achS(lmtS(xU,lVar,xLim));if (strTest(lTmp,"Cv[8734]")) {return "undefined"}; return lTmp}
		function athL(xU) {var lTmp = athS(lmtS(xU,lVar,xLim));if (strTest(lTmp,"Cv[8734]")) {return "undefined"}; return lTmp}
		function axhL(xU) {var lTmp = axhS(lmtS(xU,lVar,xLim));if (strTest(lTmp,"Cv[8734]")) {return "undefined"}; return lTmp}
		function ayhL(xU) {var lTmp = ayhS(lmtS(xU,lVar,xLim));if (strTest(lTmp,"Cv[8734]")) {return "undefined"}; return lTmp}
		function azhL(xU) {var lTmp = azhS(lmtS(xU,lVar,xLim));if (strTest(lTmp,"Cv[8734]")) {return "undefined"}; return lTmp}
		function expL(xU) {var lTmp = expS(lmtS(xU,lVar,xLim));if (strTest(lTmp,"Cv[8734]")) {return "undefined"}; return lTmp}
		function absL(xU) {var lTmp = absS(lmtS(xU,lVar,xLim));if (strTest(lTmp,"Cv[8734]")) {return "undefined"}; return lTmp}
		function abnL(xU) {var lTmp = abnS(lmtS(xU,lVar,xLim));if (strTest(lTmp,"Cv[8734]")) {return "undefined"}; return lTmp}
		function erfL(xU) {var lTmp = erfS(lmtS(xU,lVar,xLim));if (strTest(lTmp,"Cv[8734]")) {return "undefined"}; return lTmp}
		function efcL(xU) {var lTmp = efcS(lmtS(xU,lVar,xLim));if (strTest(lTmp,"Cv[8734]")) {return "undefined"}; return lTmp}
		function cNegL(xU) {return cNegS(lmtS(xU,lVar,xLim))}
		function nrtL(xU,xL) {return nrtL(xU,lmtS(xL,lVar,xLim))}
		function lgnL(xU,xL) {return lgnL(xU,lmtS(xL,lVar,xLim))}
		function conL(xU) {return "con("+xU+")"}
		function facL(xU) {return "fac("+xU+")"}
		function vecL(xU) {return "vec("+xU+")"}
		function hatL(xU) {return "hat("+xU+")"}
		function undL(xU) {return "und("+xU+")"}
		function udtL(xU) {return "udt("+xU+")"}
		function tldL(xU) {return "tld("+xU+")"}
		function cntL(xU) {return "cnt("+xU+")"}
		function sbtL(xU) {return "sbt("+xU+")"}
		function drvL(xU) {return "drv("+xU+")"}
		function ntpL(nXpr,deeVar,iU,iL) {return ntpS(nXpr,deeVar,iU,iL)}
		function matL() {return "mat(" + Array.prototype.slice.call(arguments) + ")"}
		//
		xLim = strConvert(xLim);lXpr = strConvert(lXpr);
		limitFlag = true;
		lXpr = xReduce(lXpr);
		if (xprMatch(lXpr,"cPow(cAdd(1,cDiv(Cv[9999],"+lVar+")),"+lVar+")") && xLim == "Cv[8734]") {limitFlag = false;return cPowS("Cv[8]",xprMatch(lXpr,"cPow(cAdd(1,cDiv(Cv[9999],"+lVar+")),"+lVar+")"))}
		if (xprMatch(lXpr,"cDiv((cSub(cPow(Cv[9999],"+lVar+"),1)),"+lVar+")")  && +xLim == 0) {limitFlag = false;return lneS(xprMatch(lXpr,"cDiv((cSub(cPow(Cv[9999],"+lVar+"),1)),"+lVar+")"))}	
		if (xprMatch(lXpr,"cPow((cSub(1,cDiv(Cv[9999],"+lVar+"))),"+lVar+")")  && xLim == "Cv[8734]") {limitFlag = false;return "cPow(Cv[8],cNeg("+xprMatch(lXpr,"cPow((cSub(1,cDiv(Cv[9999],"+lVar+"))),"+lVar+")")+"))"}
		if (xprMatch(lXpr,"cPow((cAdd("+lVar+",1)),(cDiv(Cv[9999],"+lVar+")))") && +xLim == 0) {limitFlag = false;return "cPow(Cv[8],"+xprMatch(lXpr,"cPow((cAdd("+lVar+",1)),(cDiv(Cv[9999],"+lVar+")))")+")"} 
		if (xprMatch(lXpr,"cPow((cSub(1,"+lVar+")),(cDiv(Cv[9999],"+lVar+")))") && +xLim == 0) {limitFlag = false;return "cPow(Cv[8],cNeg("+xprMatch(lXpr,"cPow((cSub(1,"+lVar+")),(cDiv(Cv[9999],"+lVar+")))")+"))"} 
		if (lXpr == "cPow((cAdd(sin("+lVar+"),1)),(cDiv(1,"+lVar+")))"  && xLim == "Cv[8734]") {limitFlag = false;return "Cv[8]"}
		if (lXpr == "cDiv((cSub(tan("+lVar+"),sin("+lVar+"))),cPow("+lVar+",2))"  && +xLim == 0) {limitFlag = false;return "cDiv(1,2)"}
		if (lXpr == "cDiv((cSub(1,cos("+lVar+"))),cPow("+lVar+",2))"  && +xLim == 0) {limitFlag = false;return "cDiv(1,2)"}
		if (lXpr == "cDiv(lne("+lVar+"),"+lVar+")"  && xLim == "Cv[8734]") {limitFlag = false;return "0"}
		lXpr = strConvert(eval(lXpr.replace(/([a-z])\(/g,"$1S(").replace(/(Cv\[\d+\])/g,"'$1'").replace(/cDivS/g,"cDivL").replace(/(Pv\[\d+\])/g,"'$1'").replace(/(Sv\[\d+\])/g,"'$1'")));
		lXpr = strConvert(eval(lXpr.replace(/([a-z])\(/g,"$1L(").replace(/(Cv\[\d+\])/g,"'$1'").replace(/(Pv\[\d+\])/g,"'$1'").replace(/(Sv\[\d+\])/g,"'$1'")));
		lXpr = cReduce(cSubst(lXpr,lVar,xLim));
		limitFlag = false;
		return lXpr
	}

	// Factor 
	function cFactor(cFac) {
		function fAddMul(D2,D1,D0) {
			if 		(D1 > 0 && D0*D2 > 0) {for (var iXu=D1;iXu>=0;iXu--)     {if (D0*D2 == iXu*(D1-iXu)) {break}}}
			else if (D1 < 0 && D0*D2 > 0) {for (var iXu=-D0*D2;iXu<=0;iXu++) {if (D0*D2 == iXu*(D1-iXu)) {break}}}
			else 						  {for (var iXu=D0*D2;iXu<=0;iXu++)  {if (D0*D2 == iXu*(D1-iXu)) {break}}}
			return iXu
		}
		function pFactor(xFac) { //factor polynomials
			var pVar = pVariable(xFac);
			var polyU = pNomial(xFac,pVar);
			var tReturn = 0;
			if (polyU.length < 2) {return xFac}
			var fCoeff = pCoeff(polyU); //get common coefficients
			var fGcf = aGcf(fCoeff); //find GCF
			if (fGcf != 1 && fGcf != 0) {for (var xI=0;xI<polyU.length;xI++) {polyU[xI] = xReduce(cDivS(polyU[xI],fGcf))}}//reduce terms by GCF
			fCoeff = pCoeff(polyU); //recalc coeff
			for (var xC=0;xC<polyU.length;xC++) {if (fCoeff[xC] != 0) {polyU[xC] = xReduce(cDivS(polyU[xC],cMulS(fCoeff[xC],cPowS(pVar,xC))))}}//reduce terms by coeff/pVar
			for (var xC=1;xC<polyU.length;xC++) {if (polyU[xC] != polyU[xC-1] && +polyU[xC-1] != 0) {break}}//factor common terms
			if (xC == polyU.length) {
				fGcf = cMulS(fGcf,polyU[polyU.length-1])
				for (var xC=1;xC<polyU.length;xC++) {polyU[xC] = xReduce(cDivS(polyU[xC],polyU[polyU.length-1]))}
			}
			var sqrtA = sqt(abs(fCoeff[polyU.length-1])),sqrtB = sqt(abs(fCoeff[0])); //difference of perfect squares
			tReturn = xReduce(cMulS(fGcf,"cMul((cAdd(cMul("+sqrtA+","+cPowS(pVar,cDiv((polyU.length-1),2))+"),"+sqrtB+")),(cSub(cMul("+sqrtA+","+cPowS(pVar,cDiv((polyU.length-1),2))+"),"+sqrtB+")))"));
			if (xReduce(cExpand(tReturn)) == xReduce(xFac)) {return tReturn}
			var yVar = 1; //extract secondary quadratic variable
			if (pNomial(pExpand(polyU)).length == polyU.length) {yVar = pVariable(pExpand(polyU))}
			//factor extra pVar
			if (polyU.length >= 3) {for (var xC=0;xC<polyU.length;xC++) {if (fCoeff[xC] != 0 ) {fGcf = cMulS(fGcf,cPowS(pVar,xC));break}}}
			//factor quadratic
			polyU = pNomial(xReduce(cDivS(xFac,fGcf)),pVar);
			fCoeff = pCoeff(polyU);
			var pRoot = cPowS(pVar,cDiv((polyU.length-1),2));
			var aPb = fAddMul(fCoeff[0],fCoeff[cDiv((polyU.length-1),2)],fCoeff[(polyU.length-1)]);
			var gcfA = cGcf(fCoeff[(polyU.length-1)],aPb);
			var gcfB = cGcf(fCoeff[cDiv((polyU.length-1),2)]-aPb,fCoeff[0]);	
			var facA1 = xReduce(cDivS(cAddS(cMulS(pRoot,fCoeff[(polyU.length-1)]),cMulS(aPb,yVar)),gcfA));
			var facB1 = xReduce(cAddS(cMulS(gcfA,pRoot),cMulS(gcfB,yVar)));
			var facB2 = xReduce(cSubS(cMulS(gcfA,pRoot),cMulS(gcfB,yVar)));
			tReturn = cMulS(fGcf,cMulS(facB1,facA1));
			if (xReduce(cExpand(tReturn)) == xReduce(xFac)) {return tReturn}
			tReturn = cMulS(fGcf,cMulS(facB2,facA1));
			if (xReduce(cExpand(tReturn)) == xReduce(xFac)) {return tReturn}
			tReturn = "cMul("+xReduce(fGcf)+","+xReduce(cDivS(xFac,fGcf))+")";
			if (cExpand(tReturn) == xReduce(xFac) && fGcf != 1) {return tReturn}
			return xFac
		}
		function mdFactor(pfFac) { //factor cMul and cDiv
			var xTract = opExtract(pfFac);
			if (xTract.func == "cDiv" && pNomial(xTract.lower).length > pNomial(xTract.upper).length) {//proper partial fractions
				var fVar = pVariable(xTract.lower);
				var pFac = pFactor(cExpand(xTract.lower));
				var termsL = parseTerms(pFac);
				if (termsL.length == 2 && (!pVariable(xTract.upper) || pVariable(xTract.upper) == pVariable(xTract.lower)) ) {
					var termsU = parsePoly(xTract.upper);
					var Z1 = relExtract(xprSolve(cEqlS("0",termsL[0]),fVar)).lower;
					var Z2 = relExtract(xprSolve(cEqlS("0",termsL[1]),fVar)).lower;
					var A1 = xReduce(cSubst(xTract.upper,fVar,Z1));
					var A2 = xReduce(cSubst(xTract.upper,fVar,Z2));
					var B1 = xReduce(cSubst(termsL[0],fVar,Z2));
					var B2 = xReduce(cSubst(termsL[1],fVar,Z1));
                    if (Z1 == int(Z1) && Z2 == int(Z2)) {return xReduce(cAddS(cDivS(A2,cMulS(B1,termsL[1])),cDivS(A1,cMulS(B2,termsL[0]))))}
				}
			}
			if (xTract.func == "cDiv" || xTract.func == "cMul" ) {
				var xuTemp = facTerms(facTerms(xTract.upper));
				var xlTemp = facTerms(facTerms(xTract.lower));
				if (xuTemp != xTract.upper || xlTemp != xTract.lower) {return xTract.func+"("+xuTemp+","+xlTemp+")"}			
			}
			return pfFac
		}
		function asFactor(sfFac) { //factor cAdd and cSub
			var xTract = opExtract(sfFac);
			if (xTract.func == "cAdd" || xTract.func == "cSub" ) {
				var sFac = parsePoly(sfFac);
				var nGcf = aGcf(pCoeff(sFac));
				var sInv = cDissect(sfFac);
				if (sFac.length > 1 && sInv.length > 1) {
					var tFactor = 1;
					var fReturn = 0;
					for (var xI=0;xI<sInv.length;xI++) {
						if (!nbrTest(sInv[xI]) && typeof sInv[xI] != "undefined") {
							tFactor = cMulS(sInv[xI],tFactor);
							for (var yI=0;yI<sFac.length;yI++) {
								if (!strTest(sFac[yI],sInv[xI])) {tFactor = cDivS(tFactor,sInv[xI]);break}
								if (strTest(xReduce(cDivS(sFac[yI],sInv[xI])),sInv[xI])) {tFactor = cDivS(tFactor,sInv[xI]);break}
							}
						}
					}
					tFactor = xReduce(cMulS(tFactor,nGcf));
					for (var yI=0;yI<sFac.length;yI++) {
						fReturn = cAddS(fReturn,xReduce(cDivS(sFac[yI],tFactor)))
					}
					return xReduce(cMulS(tFactor,fReturn))
				}
            }
			return sfFac		
		}
		function facTerms(fTrm) { //factor terms and sort
			var pfTerms = parseTerms(fTrm);
			pfTerms.sort(
				function(aS,bS){
					aS = strConvert(aS);bS = strConvert(bS);
					if (strTest(aS,"cAdd") && !strTest(bS,"cAdd") && !strTest(bS,"cSub")) {return 1}
					if (strTest(aS,"cSub") && !strTest(bS,"cSub") && !strTest(bS,"cAdd")) {return 1}
					if (!strTest(aS,"cAdd") && !strTest(aS,"cSub") && strTest(bS,"cAdd")) {return -1}
					if (!strTest(aS,"cSub") && !strTest(aS,"cAdd") && strTest(bS,"cSub")) {return -1}
					if (aS.search(/[a-z][a-z][a-z]\(\)/i) == 0 && bS.search(/[a-z][a-z][a-z]\(\)/i) == -1) {return -1}
					return aS < bS ? -1 : aS > bS ? 1 : 0;
				}
			);
			fTrm = 1;
			for (var xC=0;xC<pfTerms.length;xC++) {
				var fTemp = pFactor(pfTerms[xC])
				if (pNomial(pfTerms[xC]).length > 2) {fTrm = cIterate(cMulS(fTrm,fTemp))}
				else {fTrm = cIterate(cMulS(fTrm,pfTerms[xC]))}
			}
			return fTrm
		}
		//
		cFac = xReduce(cFac);
		factorFlag = true;
        var facTemp = mdFactor(cFac);
        if (facTemp != cFac && !strTest(facTemp, "undefined")) {factorFlag = false;return facTemp}
        facTemp = mdFactor(asFactor(cExpand(cFac)));
        if (facTemp != cFac && !strTest(facTemp, "undefined")) {factorFlag = false;return facTemp}
		facTemp = facTerms(facTerms(cFac));
        if (facTemp != cFac && !strTest(facTemp, "undefined")) {factorFlag = false;return facTemp}
		facTemp = asFactor(cFac);
		if (facTemp != cFac && !strTest(facTemp, "undefined")) {factorFlag = false;return facTemp}
		factorFlag = false;
        return cFac
	}
	//Range of expression in MG format
	function xprRange(xR)  {
		function nEqual(nZ,nC) {
			var zArray = [];
			var zString = "";
			var zVars = cInventory(nZ+"+"+nC);
			if (zVars.length == 0) {return ""}
			for (var iZ=0;iZ<zVars.length;iZ++) {zArray[iZ] = mgExport(xprSolve(cFunc(nZ+"Cv[8800]"+nC),"Cv["+zVars[iZ]+"]"))}
			for (var iZ=0;iZ<zVars.length;iZ++) {
				if (!strTest(zArray[iZ],"Cv[8734]")) {
					zString = zString+zArray[iZ];
					if (iZ < zArray.length-1) {zString = zString+"Cv[10044]"}
				}
			}
			return zString
		}
		function cPowR(xU,xL) {return "cPow("+xU+","+xL+")"}
		function cMulR(xU,xL) {return "cMul("+xU+","+xL+")"}
		function cTmsR(xU,xL) {return "cMul("+xU+","+xL+")"}
		function cDotR(xU,xL) {return "cDot("+xU+","+xL+")"}
		function cDivR(xU,xL) {dArray.push(nEqual(xL,"0"));return "cDiv("+xU+","+xL+")"}
		function cAddR(xU,xL) {return "cAdd("+xU+","+xL+")"}
		function cSubR(xU,xL) {return "cSub("+xU+","+xL+")"}
		function cBndR(xU,xL) {return "cBnd("+xU+","+xL+")"}
		function cEqlR(xU,xL) {return "cEql("+xU+","+xL+")"}
		function cNqlR(xU,xL) {return "cNql("+xU+","+xL+")"}
		function cGthR(xU,xL) {return "cGth("+xU+","+xL+")"}
		function cLthR(xU,xL) {return "cLth("+xU+","+xL+")"}
		function cGeqR(xU,xL) {return "cGeq("+xU+","+xL+")"}
		function cLeqR(xU,xL) {return "cLeq("+xU+","+xL+")"}
		function cNegR(xU)    {return "cNeg("+xU+")"}
		function itgR(xU,xL)  {return "itg("+xU+","+xL+")"}
		function nrtR(xU,xL)  {dArray.push(nEqual(xU,"0"));return "nrt("+xU+")"}
		function lgnR(xU,xL)  {dArray.push(nEqual(xL,"0"));dArray.push(nEqual(xU,"0"));return "lgn("+xU+")"}
		function lneR(xU) {if (mgConfig.Domain == "Real") {dArray.push(xU+"Cv[62]0")} else {dArray.push(nEqual("0",xU))};return "lne("+xU+")"}
		function logR(xU) {if (mgConfig.Domain == "Real") {dArray.push(xU+"Cv[62]0")} else {dArray.push(nEqual("0",xU))};return "log("+xU+")"}
		function sqtR(xU) {if (mgConfig.Domain == "Real") {dArray.push(xU+"Cv[8805]0")};return "sqt("+xU+")"}
		function cbtR(xU) {return "cbt("+xU+")"}
		function sinR(xU) {return "sin("+xU+")"}
		function cosR(xU) {return "cos("+xU+")"}
		function tanR(xU) {dArray.push(nEqual(xU,mgExport(cDivS(invMult,2))));return "tan("+xU+")"}
		function cotR(xU) {dArray.push(nEqual(xU,"0"));return "cot("+xU+")"}
		function cscR(xU) {dArray.push(nEqual(xU,"0"));return "csc("+xU+")"}
		function secR(xU) {dArray.push(nEqual(xU,mgExport(cDivS(invMult,2))));return "sec("+xU+")"}
		function snhR(xU) {return "snh("+xU+")"}
		function cshR(xU) {return "csh("+xU+")"}
		function tnhR(xU) {return "tnh("+xU+")"}
		function schR(xU) {return "sch("+xU+")"}
		function cchR(xU) {return "cch("+xU+")"}
		function cthR(xU) {return "cth("+xU+")"}
		function asnR(xU) {dArray.push(mgExport(cNegS(cDivS(invMult,2)))+"Cv[8804]"+xU+"Cv[8804]"+mgExport(cDivS(invMult,2)));return "asn("+xU+")"}
		function acsR(xU) {dArray.push("0"+"Cv[8804]"+xU+"Cv[8804]"+invMult);return "acs("+xU+")"}
		function atnR(xU) {dArray.push(mgExport(cNegS(cDivS(invMult,2)))+"Cv[8804]"+xU+"Cv[8804]"+mgExport(cDivS(invMult,2)));return "atn("+xU+")"}
		function actR(xU) {dArray.push("0"+"Cv[8804]"+xU+"Cv[8804]"+invMult);return "act("+xU+")"}
		function ascR(xU) {dArray.push("0"+"Cv[8804]"+xU+"Cv[8804]"+invMult);return "asc("+xU+")"}
		function accR(xU) {dArray.push(mgExport(cNegS(cDivS(invMult,2)))+"Cv[8804]"+xU+"Cv[8804]"+mgExport(cDivS(invMult,2)));return "acc("+xU+")"}
		function ashR(xU) {return "ash("+xU+")"}
		function achR(xU) {dArray.push(xU+"Cv[8805]1");return "ach("+xU+")"}
		function athR(xU) {dArray.push(xU+"Cv[8805]1");return "ath("+xU+")"}
		function axhR(xU) {dArray.push("0Cv[8804]"+xU+"Cv[8804]1");return "axh("+xU+")"}
		function ayhR(xU) {return "ayh("+xU+")"}
		function azhR(xU) {dArray.push("-1Cv[8804]"+xU+"Cv[8804]1");return "azh("+xU+")"}
		function expR(xU) {return "exp("+xU+")"}
		function absR(xU) {return "abs("+xU+")"}
		function abnR(xU) {return "abn("+xU+")"}
		function erfR(xU) {return "erf("+xU+")"}
		function efcR(xU) {return "efc("+xU+")"}
		function conR(xU) {return "con("+xU+")"}
		function facR(xU) {return "fac("+xU+")"}
		function vecR(xU) {return "vec("+xU+")"}
		function hatR(xU) {return "hat("+xU+")"}
		function undR(xU) {return "und("+xU+")"}
		function udtR(xU) {return "udt("+xU+")"}
		function tldR(xU) {return "tld("+xU+")"}
		function cntR(xU) {return "cnt("+xU+")"}
		function sbtR(xU) {return "sbt("+xU+")"}
		function difR(xU) {return "dif("+xU+")"}
		function idrR(xU) {return "idr("+xU+")"}
		function tdrR(xU) {return "tdv("+xU+")"}
		function iddR(xU) {return "idd("+xU+")"}
		function tddR(xU) {return "tdd("+xU+")"}
		function sdrR(xU,xL) {return "sdr("+xU+","+xL+")"}
		function ddrR(xU,xL) {return "ddr("+xU+","+xL+")"}
		function psdR(xU,xL) {return "psd("+xU+","+xL+")"}
		function pddR(xU,xL) {return "pdd("+xU+","+xL+")"}
		function sumR(xU,xL,xR) {return "sum("+xU+","+xL+","+xR+")"}
		function prdR(xU,xL,xR) {return "prd("+xU+","+xL+","+xR+")"}
		function limR(xU,xL,xR) {return "lim("+xU+","+xL+","+xR+")"}
		function ntpR(nXpr,deeVar,iU,iL) {return ntpS(nXpr,deeVar,iU,iL)}
		function matR() {return "mat(" + Array.prototype.slice.call(arguments) + ")"}
		//
		xR = strConvert(xR);
		var xRang = "";
		if (strTest(xR,"=")) {xRang = cFunc(xR.split("=")[1])}
		else {xRang = cFunc(xR)}
		var dArray = [];
		eval(xRang.replace(/([a-z])\(/g,"$1R(").replace(/(Cv\[\d+\])/g,"'$1'"));
		var xArray = [];// fix dups/blanks
		for (var xC=0;xC<dArray.length;xC++) {
			if (!strTest(xArray,dArray[xC]) && dArray[xC] && !strTest(dArray[xC],"undefined") && !strTest(dArray[xC],"Cv[8734]")) {xArray.push(dArray[xC])}
		}
		var rString = "";
		for (var xC=0;xC<xArray.length;xC++) {
			rString = rString+xArray[xC];
			if (xC < xArray.length-1) {rString = rString+"Cv[10044]"} //add comma between terms
		}
		return rString
	}

	// Domain of expression in MG format
	function xprDomain(xD)  { 
		function ntgO(nXpr,deeVar,iU,iL) {
			if (mgConfig.Domain == "Complex") {
				for (var iV=0;iV<allVars.length;iV++) {
					if (strTest(iU,allVars[iV]) || strTest(iL,allVars[iV])) {
						if (allVars[iV]) {realVars.push(allVars[iV]);allVars[iV] = ""}
					}
				}
			}
			return "Cv[9999]"
		}
		function lmtO(lXpr,lVar,xLim) {
			if (mgConfig.Domain == "Complex") {
				for (var iV=0;iV<allVars.length;iV++) {
					if (strTest(lVar,allVars[iV]) || strTest(xLim,allVars[iV])) {
						if (allVars[iV]) {realVars.push(allVars[iV]);allVars[iV] = ""}
					}
				}
			}
			return "Cv[9999]"
		}
		function smmO(sXpr,sUpper,dV,sLower) {
			for (var iV=0;iV<allVars.length;iV++) {
				if (strTest(sUpper,allVars[iV]) || strTest(sLower,allVars[iV]) || strTest(dV,allVars[iV])) {
					if (allVars[iV]) {integerVars.push(allVars[iV]);allVars[iV] = ""}
				}
			}
			return "Cv[9999]"
		}
		function pmmO(pXpr,pUpper,dV,pLower) {
			for (var iV=0;iV<allVars.length;iV++) {
				if (strTest(pUpper,allVars[iV]) || strTest(pLower,allVars[iV]) || strTest(dV,allVars[iV])) {
					if (allVars[iV]) {integerVars.push(allVars[iV]);allVars[iV] = ""}
				}
			}
			return "Cv[9999]"
		}
		//
		xD = strConvert(xD);
		if (strTest(xD,"=")) {xDom = cFunc(xD.split("=")[1])}
		else {xDom = cFunc(parseCalculus(xD))}
		var allVars = cInventory(xD);
		for (var iV=0;iV<allVars.length;iV++) {allVars[iV] = "Cv["+allVars[iV]+"]"}
		var realVars = [];
		var integerVars = [];
		eval(xDom.replace(/([a-z])\(/g,"$1S(").replace(/(Cv\[\d+\])/g,"'$1'").replace(/ntgS/g,"ntgO").replace(/smmS/g,"smmO").replace(/pmmS/g,"pmmO").replace(/lmtS/g,"lmtO").replace(/(Pv\[\d+\])/g,"'$1'").replace(/(Sv\[\d+\])/g,"'$1'"));
		var dString = "";
		for (var iV=0;iV<allVars.length;iV++) { //collect master domain vars
			dString = dString + allVars[iV]
			if (iV < allVars.length-1 && allVars[iV]) {dString = dString + "Cv[10044]"} //add comma between terms
		}
		if (mgConfig.Domain == "Complex" && dString) {dString = dString+"Cv[8712]Cv[8450]"}
		var rString = "";
		for (var iV=0;iV<realVars.length;iV++) {
			rString = rString + realVars[iV];
			if (iV < realVars.length-1) {rString = rString + "Cv[10044]"} //add comma between terms
		}
		if (!rString && dString && mgConfig.Domain != "Complex") {dString = dString + "Cv[8712]Cv[8477]"}
		else if (rString && !dString) {dString = rString + "Cv[8712]Cv[8477]"}
		else if (rString && dString) {dString = dString + "Cv[59]" + rString + "Cv[8712]Cv[8477]"}
		var iString = "";
		for (var iV=0;iV<integerVars.length;iV++) {
			iString = iString + integerVars[iV];
			if (iV < integerVars.length-1) {iString = iString + "Cv[10044]"} //add comma between terms
		}
		if (iString && dString) {dString = dString + "Cv[59]" + iString + "Cv[8712]Cv[8484]"}
		if (iString && !dString) {dString = iString + "Cv[8712]Cv[8484]"}
		return dString
	}

	//Summation
	function smmS(sXpr,sUpper,dV,sLower) {
		function sumIterate(sXpr,sUpper,dV,sLower) {
			if (!nbrTest(sUpper) || !nbrTest(sLower)) {return "undefined"}
			if (sUpper-sLower > 1000) {return "undefined"}
			var sReturn = 0;
			for (var sI=int(sLower);sI<=int(sUpper);sI++) {sReturn = cReduce(cAddS(sReturn,cSubst(sXpr,dV,sI))) }
			return sReturn
		}
		function cAddM(xU,xL) {return xReduce(cAddS(smmS(xU,sUpper,dV,sLower),smmS(xL,sUpper,dV,sLower)))}
		function cSubM(xU,xL) {return xReduce(cSubS(smmS(xU,sUpper,dV,sLower),smmS(xL,sUpper,dV,sLower)))} 
		function cMulM(xU,xL) {
			if (strTest(xU,dV) && strTest(xL,dV))  {return xReduce(cMulS(smmS(xU,sUpper,dV,sLower),smmS(xL,sUpper,dV,sLower)))}
			if (strTest(xU,dV) && !strTest(xL,dV)) {return xReduce(cMulS(smmS(xU,sUpper,dV,sLower),xL))}
			if (!strTest(xU,dV) && strTest(xL,dV)) {return xReduce(cMulS(xU,smmS(xL,sUpper,dV,sLower)))}
			return "undefined"
		}
		function cDivM(xU,xL) {
			var xTractU = opExtract(xU);
			var xTractL = opExtract(xL);
			if (+xU == 1 && strTest(xL,dV) && nbrTest(sUpper) && nbrTest(sLower))  {return sumIterate(sXpr,sUpper,dV,sLower)}
			if (strTest(xU,dV) && strTest(xL,dV))  {
				if (xTractL.func == "fac" && cIterate(xTractL.upper) == dV && sUpper == "Cv[8734]" && xTractU.func == "cPow" && xTractU.lower == dV) {
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
					if (xTractL.func == "cPow" && +xTractL.lower == 2 && xTractL.upper == dV && +sLower != 0) {return cSubS(cMulS(xU,cDivS(cPowS("Cv[29]",2),6)),cSubS(sLower,1))}
					if (xTractL.func == "fac" && cIterate(xTractL.upper) == dV) {return cMulS(xU,cSubS("Cv[8]",sLower))} 
					if (xTractL.func == "cPow" && nbrTest(xTractL.upper) && xTractL.lower == dV) {return cDivS(cMulS(xU,cPowS(xTractL.upper,cSubS(1,sLower))),cSubS(xTractL.upper,1))}
				}
				return xReduce(cMulS(xU,smmS(cDivS(1,xL),sUpper,dV,sLower)))
			}
			return "undefined"
		}
		function cPowM(xU,xL) {
			var xTractU = opExtract(xU);
			var xTractL = opExtract(xL);		
			if (strTest(xU,dV) && +xL == 2) {return xReduce(cSubS(cDivS(cMulS(cMulS(sUpper,cAddS(1,sUpper)),cAddS(cMulS(2,sUpper),1)),6), cDivS(cMulS(cMulS(cSubS(sLower,1),cAddS(1,cSubS(sLower,1))),cAddS(cMulS(2,cSubS(sLower,1)),1)),6))) }
			if (strTest(xU,dV) && +xL == 3) {return xReduce(cSubS(cDivS(cMulS(cPowS(sUpper,2),cPowS(cAddS(sUpper,1),2)),4) ,cDivS(cMulS(cPowS(cSubS(sLower,1),2),cPowS(cAddS(cSubS(sLower,1),1),2)),4))) }
			if (!strTest(xU,dV) && strTest(xL,dV)) {
				if (sUpper == "Cv[8734]" && xTractU.func == "cDiv") {return xReduce(cMulS(cDivS(1,cSubS(xTractU.lower,1)),xTractU.upper)) }
				return cDivS(cSubS(cPowS(xU,cAddS(sUpper,1)),cPowS(xU,sLower)),cSubS(xU,1))
			}
			return "undefined"
		}
		function cNegM(xU) {return cNegS(smmS(xU,sUpper,dV,sLower))}
		function nrtM(xU,xL)  {return "undefined"}
		function lneM(xU) {return lneS(pmmS(xU,sUpper,dV,sLower))}
		function logM(xU) {return logS(pmmS(xU,sUpper,dV,sLower))}
		function lgnM(xU,xL)  {return lgnS(pmmS(xL,sUpper,dV,sLower),xU)}
		function cBndM(xU,xL) {return "undefined"}	
		function sqtM(xU) {return "undefined"}
		function cbtM(xU) {return "undefined"}
		function sinM(xU) {return "undefined"}
		function cosM(xU) {return "undefined"}
		function tanM(xU) {return "undefined"}
		function secM(xU) {return "undefined"}
		function cscM(xU) {return "undefined"}
		function ctnM(xU) {return "undefined"}
		function snhM(xU) {return "undefined"}
		function cshM(xU) {return "undefined"}
		function tnhM(xU) {return "undefined"}
		function schM(xU) {return "undefined"}
		function cchM(xU) {return "undefined"}
		function cthM(xU) {return "undefined"}
		function asnM(xU) {return "undefined"}
		function acsM(xU) {return "undefined"}
		function atnM(xU) {return "undefined"}
		function actM(xU) {return "undefined"}
		function ascM(xU) {return "undefined"}
		function accM(xU) {return "undefined"}
		function ashM(xU) {return "undefined"}
		function achM(xU) {return "undefined"}
		function athM(xU) {return "undefined"}
		function axhM(xU) {return "undefined"}
		function ayhM(xU) {return "undefined"}
		function azhM(xU) {return "undefined"}
		function expM(xU) {return "undefined"}
		function absM(xU) {return "undefined"}
		function abnM(xU) {return "undefined"}
		function erfM(xU) {return "undefined"}
		function efcM(xU) {return "undefined"}
		function conM(xU) {return "undefined"}
		function facM(xU) {return "undefined"}
		function vecM(xU) {return "undefined"}
		function hatM(xU) {return "undefined"}
		function undM(xU) {return "undefined"}
		function udtM(xU) {return "undefined"}
		function tldM(xU) {return "undefined"}
		function cntM(xU) {return "undefined"}
		function sbtM(xU) {return "undefined"}
		function difM(xU) {return "undefined"}
		//
		sXpr = strConvert(sXpr);sUpper = strConvert(sUpper);dV = strConvert(dV);sLower = strConvert(sLower);
		if (sIterations > 30) {return "smm("+sXpr+","+sUpper+","+dV+","+sLower+")"} //break infinite loop
		sIterations++;
		if (strTest(sLower,"Cv[8734]")) {return "smm("+cReduce(sXpr)+","+sUpper+","+dV+","+sLower+")"}
		if (sXpr == dV && sUpper != "Cv[8734]" && +sLower != 0) {return cReduce(cDivS(cSubS(cAddS(cAddS(sUpper,cPowS(sUpper,2)),sLower),cPowS(sLower,2)),2))}
		if (sXpr == dV && sUpper == "Cv[8734]" && +sLower != 0) {
			if (+sLower == 0) {return cNegS(cDivS(1,12))}
			return cSubS(cNegS(cDivS(1,12)),cSubS(sLower,1))
		}
		if (!strTest(sXpr,dV)) {return cReduce(cMulS(sXpr,cAddS(cSubS(sUpper,sLower),1)))}
		var sumReturn = eval(sXpr.replace(/([a-z])\(/,"$1M(").replace(/([a-z])\(/g,"$1S(").replace(/(Cv\[\d+\])/g,"'$1'").replace(/(Pv\[\d+\])/g,"'$1'").replace(/(Sv\[\d+\])/g,"'$1'"))
		if (!strTest(sumReturn,"undefined") && !strTest(sumReturn,"NaN")) {return cReduce(sumReturn)}
		sumReturn = sumIterate(sXpr,sUpper,dV,sLower);
		if (!strTest(sumReturn,"undefined") && !strTest(sumReturn,"NaN")) {return cReduce(sumReturn)}
		return "smm("+cReduce(sXpr)+","+sUpper+","+dV+","+sLower+")"
	}
	//Products
	function pmmS(pXpr,pUpper,dV,pLower) {
		function prdIterate(pXpr,pUpper,dV,pLower) {
			if (!nbrTest(pUpper) || !nbrTest(pLower)) {return "undefined"}
			if (pUpper-pLower > 1000) {return "undefined"}
			var pReturn = 0;
			for (var sI=int(pLower);sI<=int(pUpper);sI++) {pReturn = cReduce(cMulS(pReturn,cSubst(pXpr,dV,sI))) }
			return pReturn
		}
		function cAddP(xU,xL) {
			if (!strTest(xU,dV) && xL == dV)  {return cDivS(facS(cAddS(xU,pUpper)),facS(cSubS(cAddS(xU,pLower),1)))}
			if (xU == dV && !strTest(xL,dV))  {return cDivS(facS(cAddS(xL,pUpper)),facS(cSubS(cAddS(xL,pLower),1)))}
			return "undefined"
		}
		function cSubP(xU,xL) {
			if (!strTest(xU,dV) && xL == dV)  {return cNegS(cDivS(cMulS(cPowS(-1,cSubS(pUpper,pLower)),facS(cSubS(pUpper,xU))),facS(cSubS(cSubS(pLower,xU),1))))}
			if (xU == dV && !strTest(xL,dV))  {return cDivS(facS(cSubS(xL,pUpper)),facS(cSubS(cAddS(xL,pLower),1)))}
			return "undefined"
		} 
		function cMulP(xU,xL) {
			if (+pLower == 0 && strTest(xU,dV)) {return 0}
			if (+pLower == 0 && strTest(xL,dV)) {return 0}
			return cMulS(pmmS(xU,pUpper,dV,pLower),pmmS(xL,pUpper,dV,pLower))
		}
		function cDivP(xU,xL) {
			if (+pLower == 0 && strTest(xL,dV)) {return "Cv[8734]"}
			if (+pLower == 0 && strTest(xU,dV)) {return 0}
			return cDivS(pmmS(xU,pUpper,dV,pLower),pmmS(xL,pUpper,dV,pLower))
		}
		function cPowP(xU,xL) {
			if (!strTest(xU,dV) && strTest(xL,dV))  {return cPowS(xU,smmS(xL,pUpper,dV,pLower))}
			if (xU == dV && !strTest(xL,dV))  {return cPowS(cDivS(facS(pUpper),facS(cSubS(pLower,1))),xL)	}			
			return "undefined"
		}
		function cNegP(xU) {
			if (+pLower == 0 && strTest(xU,dV)) {return 0}
			return cMulS(pmmS(-1,pUpper,dV,pLower),pmmS(xU,pUpper,dV,pLower))
		}
		function nrtP(xU,xL) {return "undefined"}
		function lneP(xU) {return "undefined"}
		function logP(xU) {return "undefined"}
		function lgnP(xU,xL)  {return "undefined"}
		function cBndP(xU,xL) {return "undefined"}
		function sqtP(xU) {return "undefined"}
		function cbtP(xU) {return "undefined"}
		function sinP(xU) {return "undefined"}
		function cosP(xU) {return "undefined"}
		function tanP(xU) {return "undefined"}
		function secP(xU) {return "undefined"}
		function cscP(xU) {return "undefined"}
		function ctnP(xU) {return "undefined"}
		function snhP(xU) {return "undefined"}
		function cshP(xU) {return "undefined"}
		function tnhP(xU) {return "undefined"}
		function schP(xU) {return "undefined"}
		function cchP(xU) {return "undefined"}
		function cthP(xU) {return "undefined"}
		function asnP(xU) {return "undefined"}
		function acsP(xU) {return "undefined"}
		function atnP(xU) {return "undefined"}
		function actP(xU) {return "undefined"}
		function ascP(xU) {return "undefined"}
		function accP(xU) {return "undefined"}
		function ashP(xU) {return "undefined"}
		function achP(xU) {return "undefined"}
		function athP(xU) {return "undefined"}
		function axhP(xU) {return "undefined"}
		function ayhP(xU) {return "undefined"}
		function azhP(xU) {return "undefined"}
		function expP(xU) {return "undefined"}
		function absP(xU) {return "undefined"}
		function abnP(xU) {return "undefined"}
		function erfP(xU) {return "undefined"}
		function efcP(xU) {return "undefined"}
		function conP(xU) {return "undefined"}
		function facP(xU) {return "undefined"}
		function vecP(xU) {return "undefined"}
		function hatP(xU) {return "undefined"}
		function undP(xU) {return "undefined"}
		function udtP(xU) {return "undefined"}
		function tldP(xU) {return "undefined"}
		function cntP(xU) {return "undefined"}
		function sbtP(xU) {return "undefined"}
		function difP(xU) {return "undefined"}
		//
		pXpr = strConvert(pXpr);pUpper = strConvert(pUpper);dV = strConvert(dV);pLower = strConvert(pLower);
		if (pIterations > 30) {return "pmm("+pXpr+","+pUpper+","+dV+","+pLower+")"} //break infinite loop
		pIterations++;
		if (strTest(pLower,"Cv[8734]") || strTest(pUpper,"Cv[8734]")) {return "pmm("+cReduce(pXpr)+","+pUpper+","+dV+","+pLower+")"}
		if (pXpr == dV && +pLower == 0) {return 0}
		if (pXpr == dV) {return cDivS(facS(pUpper),facS(cSubS(pLower,1)))} //factorial
		if (!strTest(pXpr,dV)) {return cPowS(cReduce(pXpr),cAddS(cNegS(pLower),cAddS(pUpper,1)))}
		var prdReturn = eval(pXpr.replace(/([a-z])\(/,"$1P(").replace(/([a-z])\(/g,"$1S(").replace(/(Cv\[\d+\])/g,"'$1'").replace(/(Pv\[\d+\])/g,"'$1'").replace(/(Sv\[\d+\])/g,"'$1'"))
		if (!strTest(prdReturn,"undefined") && !strTest(prdReturn,"NaN")) {return cReduce(prdReturn)}
		prdReturn = prdIterate(pXpr,pUpper,dV,pLower);
		if (!strTest(prdReturn,"undefined") && !strTest(prdReturn,"NaN")) {return cReduce(prdReturn)}
		return "pmm("+cReduce(pXpr)+","+pUpper+","+dV+","+pLower+")"
	}

	//Numerical Math Functions
	function fmtResult(xIn) { //format numerical output
		if (getType(xIn) == "real" || getType(xIn) == "complex") {
			var cIn = toCplx(xIn);
			if (cIn.i != 0 && mgConfig.Domain == "Real") {return "undefined"}
			if (mgConfig.dPrecision <= 6) {var cT = mgConfig.dPrecision} else {var cT = 7}
			if (mgConfig.cplxFmt == "Polar") {
				if (cIn.i == 0) {return roundDecTo(cIn.r)}
				else {return cFunc(roundDecTo(abs(cIn),cT)+"~"+roundDecTo(arg(cMul(cIn,mgConfig.trigBase))/mgConfig.trigBase,cT))}
			}
			else {
				if (cIn.r == "NaN" || cIn.i == "NaN") {return "undefined"}
				if (cIn.r == "Infinity" || cIn.i == "Infinity") {return "Cv[8734]"}
				if (cIn.r == "-Infinity" || cIn.i == "-Infinity") {return "-Cv[8734]"}
				if (Math.abs(cIn.i*1e6) < Math.abs(cIn.r)) {cIn.i = 0}
				if (Math.abs(cIn.r*1e6) < Math.abs(cIn.i)) {cIn.r = 0}
				if (+cIn.i == 0) {return roundDecTo(cIn.r)}
				if (+cIn.i == 1 && +cIn.r == 0) {return "Cv[46]"}
				if (+cIn.r == 0) {var tCmpx = roundDecTo(cIn.i,cT)+"Cv[46]"}
				else {var tCmpx = roundDecTo(cIn.r,cT)+"+"+roundDecTo(cIn.i,cT)+"Cv[46]"}
				return cFunc(tCmpx.replace(/\+\-/g,"-").replace(/\-1Cv\[46\]/g,"-Cv[46]").replace(/\+1Cv\[46\]/g,"+Cv[46]"))
			}
		}
		if (getType(xIn) == "matrix") {
			var mReturn = "";
			for (var iR=0;iR<xIn.length;iR++) {
				var mRow = "";
				for (var iC=0;iC<xIn[iR].length;iC++) {
					mRow = mRow + fmtResult(xIn[iR][iC]);
					if (iC < xIn[iR].length-1) (mRow = mRow + ",")
				}
				mReturn = mReturn +"mat(" + mRow + ")";
				if (iR < xIn.length-1) (mReturn = mReturn + ",")
			}
			return "mat(" + mReturn + ")"
		}
		return "undefined"
	}
	function roundDecTo(xD,xT) { //round decimal to xT digits
		function expNotation(xN) { //format number in N.NNe+-x
			xN = strConvert(xN);
			var sgn = "";
			var tmp = 0;
			if (xN == "0") {return xN}
			for (var iSc=-323;iSc<308;iSc++) {
				tmp = xN/Math.pow(10,iSc);
				if (iSc >= 0) {sgn = "+"}
				if ((Math.abs(tmp) >= 1)&&(Math.abs(tmp) < 10)) {return tmp + "e" + sgn + iSc}
			}
		}
		if (typeof xT == "undefined" ) {xT = mgConfig.dPrecision}
		if (xD == "NaN" || xD == "-Infinity" || xD == "Infinity") {return xD}
		if (+(xD) < 1 || xD >= 1e12) {xD = expNotation(xD)}
		xD = strConvert(xD);
		var yD = xD.replace(/.*\./,"");
		yD = yD.replace(/e.*/,"")+"000000000000000000";
		var zD = Math.round(yD.substring(xT-1,xT+1)/10);
		yD = yD.substring(0,xT-1);
		var uD = '.'+yD+zD;
		for (var nTd=uD.length;nTd>=0;nTd--) {if (uD.charAt(nTd) == "0") {uD = uD.substr(0,nTd)} else {break}}
		if (xD >= 1e12) {return xD.replace(/\.\d+/,uD)}
		else {return +(xD.replace(/\.\d+/,uD))}
	}
	function mat() {return Array.prototype.slice.call(arguments)} //matrix parsing
	function toCplx(xTo) {if (getType(xTo) == "complex") {return xTo} else {return {r:(+xTo),i:0}}}
	function toReal(xTo) {if (getType(xTo) == "complex") {return +xTo.r} else {return +xTo}}
	function getType(xT) { //return numerical object type
		if (typeof xT == "undefined") {return "undefined"}
		if (nbrTest(xT)) {return "real"}
		if (nbrTest(xT.r) && mgConfig.Domain == "Complex") {return "complex"}
		if (typeof xT == "boolean") {return "boolean"}
		if (typeof xT == "object" && typeof xT[0] == "object") {return "matrix"}
		if (typeof xT == "object" && typeof xT[0] != "object") {return "array"}
		return "undefined"
	}

	// arithemetic operators
	function cNeg(xU) { //negative
		return cMul(-1,xU)
	}
	function cSub(xU,xL) { //subtract
		if (getType(xU) == "real" && getType(xL) == "real") {
			if (xU == Math.round(xU) && xL == Math.round(xL)) {return Math.round((+xU)-(+xL))}
			return (+xU)-(+xL)
		}
		return cAdd(xU,cMul(-1,xL))
	}
	function cAdd(xU,xL) { //add
		if (getType(xU) == "real" && getType(xL) == "real") {
			if (xU == Math.round(xU) && xL == Math.round(xL)) {return Math.round((+xU)+(+xL))}
			return (+xU)+(+xL)
		}
		if (getType(xU) == "complex" || getType(xL) == "complex") {
			var cA = toCplx(xU); 
			var cB = toCplx(xL); 
			return {r:(+cA.r)+(+cB.r), i:(+cA.i)+(+cB.i), s:xL.s}
		}
		if (getType(xU) == "matrix" && getType(xL) == "matrix" && xU.length == xL.length) {
			var mReturn = xU;
			for (var iR=0;iR<xU.length;iR++) {
				if (xU[iR].length != xL[iR].length) {return "undefined"}
				for (var iC=0;iC<xU[iR].length;iC++) {mReturn[iR][iC] = cAdd(xU[iR][iC],xL[iR][iC])}
			}
			return mReturn
		}
		return "undefined"
	}
	function cMul(xU,xL) { //multiply by term
		function scalarMult(xM,xC) { //matrix scalar multiply
			var mReturn = xM;
			for (var iR=0;iR<xM.length;iR++) {
				for (var iC=0;iC<xM[iR].length;iC++) {mReturn[iR][iC] = cMul(xM[iR][iC],xC)}
			}
			return mReturn		
		}
		if (xL.s == "!") {return fac(xU)} //factorial
		if (xU.s == "/" || xU.s == "&divide;") {return cMul(xU,cDiv(1,xL))} //divide by '/'
		if (getType(xU) == "real" && getType(xL) == "real") {
			if (xU == Math.round(xU) && xL == Math.round(xL)) {return Math.round((+xU)*(+xL))}
			return (+xU)*(+xL)
		}
		if (getType(xU) == "complex" || getType(xL) == "complex") {
			var cA = toCplx(xU);
			var cB = toCplx(xL);
			return {r:cA.r*cB.r-cA.i*cB.i, i:cA.i*cB.r+cA.r*cB.i, s:xL.s}
		}
		if (getType(xU) == "matrix" && getType(xL) != "matrix") {return scalarMult(xU,xL)}
		if (getType(xL) == "matrix" && getType(xU) != "matrix") {return scalarMult(xL,xU)}
		if (getType(xU) == "matrix" && getType(xL) == "matrix") { //matrix multiply
			var rowsU = xU.length;
			var colsU = xU[0].length;
			var rowsL = xL.length;
			var colsL = xL[0].length;
			if (rowsL != colsU) {return "undefined"}
			var mReturn = matCreate(rowsU,colsL);
			for (var rU=0;rU<rowsU;rU++) {
				for (var cL=0;cL<colsL;cL++) {
					for (var cU=0;cU<colsU;cU++) {
						var mTemp = cMul(xU[rU][cU],xL[cU][cL]);
						if (mReturn[rU][cL] == 0) {mReturn[rU][cL] = mTemp}
						else {mReturn[rU][cL] = cAdd(mReturn[rU][cL],mTemp)}
					}
				}
			}
			return mReturn
		}
		return "undefined"
	}
	function cTms(xU,xL) { //multiply by *
		return cMul(xU,xL)
	}
	function cDot(xU,xL) { //multiply by dot
		return cMul(xU,xL)
	}
	function cDiv(xU,xL) { //divide
		if (getType(xU) == "real" && getType(xL) == "real") {return (+xU)/(+xL)}
		if (getType(xU) == "complex" || getType(xL) == "complex") {
			var cA = toCplx(xU); 
			var cB = toCplx(xL);
			if (Math.abs(cB.r)>=Math.abs(cB.i)) {
				var r=cB.i/cB.r;var s=+cB.r+r*cB.i;
				return {r:(+cA.r+cA.i*r)/s, i:(cA.i-cA.r*r)/s, s:xL.s}
			}
			else {
				var r=cB.r/cB.i;var s=+cB.i+r*cB.r;
				return {r:(cA.r*r+cA.i)/s, i:(cA.i*r-cA.r)/s, s:xL.s}
			}
		}
		return "undefined"
	}
	function cPow(xU,xL) { //powers xU^xL
		if (getType(xU) == "real" && getType(xL) == "real" && Math.pow((+xU),(+xL)) == Math.pow((+xU),(+xL))*1) {return Math.pow((+xU),(+xL))}
		if (getType(xU) == "complex" && +xU.i == 0) {xU = +xU.r}
		if (getType(xL) == "complex" && +xL.i == 0) {xL = +xL.r}
		if (+xU == Math.round(+xU) && +xL == Math.round(+xL)) {return Math.pow(+xU,+xL)}
		if (getType(xU) == "matrix" && getType(xL) == "real") {
			if (+xL != int(xL)) {return "undefined"}
			if (+xL <= -1) {return cPow(inv(xU),cNeg(xL))} //inverse matrix powers
			if (+xL == 0)  {return matIdentity(xU)} //identity matrix
			var mReturn = xU;
			for (var iM=1;iM<xL;iM++) {mReturn = cMul(mReturn,xU)}
			return mReturn
		}
		var cTmp = exp(cMul(lne(toCplx(xU)),toCplx(xL)));
		cTmp.r = Math.round(cTmp.r*dRound)/dRound;
		cTmp.i = Math.round(cTmp.i*dRound)/dRound;
		return cTmp;
	}
	
	//matrix operations
	function det(xU) { //matrix determinant
		if (getType(xU) == "matrix") {
			var determinant = 0;
			var rowsU = xU.length;
			if (rowsU != xU[0].length) {return "undefined"}
			if (rowsU == 2) {return cSubS(cMulS(det(xU[0][0]),det(xU[1][1])),cMulS(det(xU[0][1]),det(xU[1][0])))}
			for (var rU=0;rU<rowsU;rU++) {determinant = cAddS(determinant,cMulS(det(matMinor(xU,0,rU)),matInvSign(xU)[0][rU]))}
			return determinant
		}
		return xU
	}
	function trc(xU) { //matrix trace
		if (getType(xU) == "matrix") {
			var rowsU = xU.length;
			if (rowsU != xU[0].length) {return "undefined"}
			var mReturn = 0;
			for (var rU=0;rU<rowsU;rU++) {mReturn = cAddS(mReturn,xU[rU][rU])}
			return mReturn
		}
		return "undefined"		
	}
	function trn(xU) { //matrix transpose 
		if (getType(xU) == "matrix") {
			var rowsU = xU.length;
			var colsU = xU[0].length;
			var mReturn = matCreate(colsU,rowsU);
			for (var iR=0;iR<rowsU;iR++) {for (var iC=0;iC<colsU;iC++) {mReturn[iC][iR] = trn(xU[iR][iC])}}
			return mReturn
		}
		return xU
	}
	function inv(xU) { //matrix inverse
		if (getType(xU[0][0]) == "matrix") {
			var rowsU = xU.length;
			if (rowsU != xU[0].length) {return "undefined"}
			var mReturn = matCreate(rowsU,rowsU);
			for (var iR=0;iR<rowsU;iR++) {for (var iC=0;iC<rowsU;iC++) {mReturn[iR][iC] = inv(xU[iR][iC])}}
			return mReturn			
		}
		return cMul(cDiv(1,det(xU)),trn(matCofac(xU)))
	}
	function matCreate(rowsU,colsU) { //create new zero matrix array
		var mReturn = new Array(rowsU);
		for (var rU=0;rU<rowsU;rU++) {mReturn[rU] = new Array(colsU);mReturn[rU] = Array.apply(null, Array(colsU)).map(Number.prototype.valueOf,0)}
		return mReturn
	}
	function matIdentity(xU) { //matrix identity
		if (getType(xU) == "matrix") {
			var rowsU = xU.length;
			var colsU = xU[0].length;
			if (rowsU != colsU) {return "undefined"}
			var mReturn = matCreate(rowsU,rowsU);
			for (var iR=0;iR<rowsU;iR++) {
				for (var iC=0;iC<colsU;iC++) {
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
			return mReturn
		}
		return 1
	}
	function matInvSign(xU) { //alternate cell invert sign matrix
		if (getType(xU) == "matrix") {
			var rowsU = xU.length;
			var rowFac = 1;
			var mReturn = matCreate(rowsU,rowsU);
			for (var iR=0;iR<rowsU;iR++) {
				var colFac = rowFac;
				for (var iC=0;iC<rowsU;iC++) {
					mReturn[iR][iC] = cMulS(colFac,xU[iR][iC]);
					colFac = -colFac;
				}
				rowFac = -rowFac;
			}
			return mReturn
		}
		return xU
	}
	function matCofac(xU) { //matrix cofactor
		if (getType(xU) == "matrix") {
			var rowsU = xU.length;
			if (rowsU != xU[0].length) {return "undefined"}
			var mReturn = matCreate(rowsU,rowsU);
			for (var iR=0;iR<rowsU;iR++) {
				for (var iC=0;iC<rowsU;iC++) {
					mReturn[iR][iC] = det(matMinor(xU,iR,iC))
				}
			}
			return matInvSign(mReturn)
		}
		return xU		
	}
	function matMinor(xU,row,col) { //generate matrix minors
		var rowsU = xU.length;
		if (rowsU != xU[0].length) {return "undefined"}
		var mReturn = new Array(rowsU-1);
		for (var iC=0;iC<rowsU-1;iC++) {mReturn[iC] = []}
		var oRow = 0;
		for (var iR=0;iR<rowsU;iR++) {
			if (iR != row) {
				for (var iC=0;iC<rowsU;iC++) {if (iC != col) {mReturn[oRow].push(xU[iR][iC])}}
				oRow++;
			}
		}
		return mReturn
	}
	
	//numerical functions
	function cAng(xU,xL) { //complex polar form
		if (getType(xU) == "real" && getType(xL) == "real") {return cMul(xU,cAdd(cos(xL),cMul(Cv[46],sin(xL))))}
		return "undefined"
	}
	function arg(xU) { //arg(x)
		if (getType(xU) == "complex" || getType(xU) == "real" ) {
			var cA = toCplx(xU);
			if (cA.r > 0) {return Math.atan(cA.i/cA.r)}
			if (cA.r < 0 && cA.i >= 0) {return Math.PI+Math.atan(cA.i/cA.r)}	
			if (cA.r < 0 && cA.i < 0) {return -Math.PI+Math.atan(cA.i/cA.r)}	
			if (cA.r == 0 && cA.i > 0) {return Math.PI/2}
			if (cA.r == 0 && cA.i < 0) {return -Math.PI/2}
			return 0
		}
		return "undefined"
	}
	function rex(xU) { //real part of complex number
		if (getType(xU) == "complex") {return xU.r}
		if (getType(xU) == "real") {return xU}
		return "undefined"
	}
	function imx(xU) { //imaginary part of complex number
		if (getType(xU) == "complex") {return {r:0,i:xU.i}}
		if (getType(xU) == "real") {return 0}
		return "undefined"
	}
	function con(xU) { //complex conjugate
		if (getType(xU) == "complex") {return {r:xU.r, i:(-xU.i)}}
		if (getType(xU) == "real" && mgConfig.Domain == "Complex") {return {r:xU, i:0}}
		return "undefined"
	}
	function exp(xU) { //exp(x)
		if (getType(xU) == "complex" && xU.i != 0) {
			var cA = toCplx(xU); 
			return {r:Math.exp(cA.r)*Math.cos(cA.i), i:Math.exp(cA.r)*Math.sin(cA.i), s:xU.s}
		}
		if (getType(xU) == "complex" && xU.i == 0) {return Math.exp(toReal(xU))}
		if (getType(xU) == "real")  {return Math.exp(xU)}
		return "undefined"
	}
	function lne(xU) {//natural log
		function cAbs(xA) {
			if (Math.abs(xA.r) > Math.abs(xA.i)) {return Math.abs(xA.r)*Math.sqrt(1+(xA.i/xA.r)*(xA.i/xA.r))}
			else {return Math.abs(xA.i)*Math.sqrt(1+(xA.r/xA.i)*(xA.r/xA.i)) }
		}
		if (getType(xU) == "complex" || xU < 0) {
			var cA = toCplx(xU); 
			return {r:Math.log(cAbs(cA)), i:arg(cA), s:xU.s}
		}
		if (getType(xU) == "real")  {return Math.log(xU)}
		return "undefined"
	}
	function sqt(xU) {//square root
		if (getType(xU) == "complex" && +xU.i == 0) {xU = +xU.r}
		if (Math.sqrt(xU) == Math.sqrt(xU)*1) {
			if (xU == cPow(rou(Math.sqrt(xU)),2)) {return rou(Math.sqrt(xU))}
			return Math.sqrt(xU)
		}
		return cPow(toCplx(xU),0.5)
	}
	function cbt(xU) { //cube root
		if (getType(xU) == "complex" && +xU.i == 0) {xU = +xU.r}
		if (Math.pow(xU,1/3) == Math.pow(xU,1/3)*1) {return Math.pow(xU,1/3)}
		return cPow(toCplx(xU),1/3)
	}
	function nrt(xU,xL) {return cPow(toCplx(xL),cDiv(1,toCplx(xU)))} //n'th root
	function log(xU) {//common log
		if ((getType(xU) == "complex") || xU < 0) {return cDiv(lne(xU),2.302585092994046) }
		if (getType(xU) == "real") {return Math.log(xU)/2.302585092994046}
		return "undefined"
	}
	function lgn(xU,xL) {return cDiv(lne(xL),lne(xU))} //log base n
	function abs(xU) {//absolute value
		if (getType(xU) == "complex") {return Math.sqrt((xU.r*xU.r)+(xU.i*xU.i))}
		if (getType(xU) == "real") {return Math.abs(xU)}
		return "undefined"
	}
	function int(xU) { //floor
		if (getType(xU) == "complex") {return {r:Math.floor(xU.r), i:Math.floor(xU.i), s:xU.s}}
		if (getType(xU) == "real") {return Math.floor(+xU)}
		return "undefined"
	}
	function cei(xU) { //ceiling
		if (getType(xU) == "complex") {return {r:Math.ceil(xU.r), i:Math.ceil(xU.i), s:xU.s}}
		if (getType(xU) == "real") {return Math.ceil(+xU)}
		return "undefined"
	}
	function rou(xU) { //round
		if (getType(xU) == "complex") {return {r:Math.round(xU.r), i:Math.round(xU.i), s:xU.s}}
		if (getType(xU) == "real") {return Math.round(+xU)}
		return "undefined"
	}
	
	//trig functions
	function cos(xU) { //cosine
		if (getType(xU) == "complex" && xU.i != 0) {return csh(cMul(Cv[46],cMul(xU,mgConfig.trigBase)))}
		if (getType(xU) == "real") {return Math.round(Math.cos(toReal(xU)*mgConfig.trigBase)*dRound)/dRound}
		return "undefined"
	}
	function sin(xU) { //sine
		if (getType(xU) == "complex" && xU.i != 0) {return cMul(cMul(-1,Cv[46]),snh(cMul(Cv[46],cMul(xU,mgConfig.trigBase))))}
		if (getType(xU) == "real") {return Math.round(Math.sin(toReal(xU)*mgConfig.trigBase)*dRound)/dRound}
		return "undefined"
	}
	function tan(xU) { //tangent
		if (getType(xU) == "complex" && xU.i != 0) {return cDiv(sin(xU),cos(xU))}
		if (getType(xU) == "real") {return Math.round(Math.tan(toReal(xU)*mgConfig.trigBase)*dRound)/dRound}
		return "undefined"
	}
	function cot(xU) { //cotangent
		if (getType(xU) == "complex" && xU.i != 0) {return cDiv(cos(xU),sin(xU))}
		if (getType(xU) == "real") {return Math.round(1/Math.tan(toReal(xU)*mgConfig.trigBase)*dRound)/dRound}
		return "undefined"
	}
	function sec(xU) { //secant
		if (getType(xU) == "complex" && xU.i != 0) {return cDiv(1,cos(xU))}
		else {return Math.round(1/Math.cos(toReal(xU)*mgConfig.trigBase)*dRound)/dRound;}
		return "undefined"
	}
	function csc(xU) {//cosec
		if (getType(xU) == "complex" && xU.i != 0) {return cDiv(1,sin(xU))}
		if (getType(xU) == "real") {return Math.round(1/Math.sin(toReal(xU)*mgConfig.trigBase)*dRound)/dRound}
		return "undefined"
	}
	function asn(xU) {//asin
		if (getType(xU) == "complex" || xU < -1 || xU > 1) {return cDiv(cMul(cMul(-1,Cv[46]),lne(cAdd(cMul(Cv[46],xU),sqt(cAdd(1,cMul(-1,cPow(xU,2))))))),mgConfig.trigBase)}
		if (getType(xU) == "real") {return Math.round(Math.asin(toReal(xU))/mgConfig.trigBase*dRound)/dRound;}
		return "undefined"
	}
	function acs(xU) {//acos
		if (getType(xU) == "complex" || xU < -1 || xU > 1) {return cDiv(cMul(cMul(-1,Cv[46]),lne(cAdd(xU,cMul(Cv[46],sqt(cAdd(1,cMul(cPow(xU,2),-1))))))),mgConfig.trigBase)}
		if (getType(xU) == "real") {return Math.round(Math.acos(toReal(xU))/mgConfig.trigBase*dRound)/dRound}
		return "undefined"
	}
	function atn(xU) {//atan
		if (getType(xU) == "complex") {return cDiv(cMul(cDiv(Cv[46],2),cAdd(lne(cAdd(1,cMul(-1,cMul(Cv[46],xU)))),cMul(-1,(lne(cAdd(1,cMul(Cv[46],xU))))))),mgConfig.trigBase)}
		if (getType(xU) == "real") {return Math.round(Math.atan(toReal(xU))/mgConfig.trigBase*dRound)/dRound}
		return "undefined"
	}
	function asc(xU) {//asec
		if (getType(xU) == "complex" || (xU > -1 && xU < 1)) {return acs(cDiv(1,xU))}
		if (getType(xU) == "real") {return Math.round(Math.acos(1/toReal(xU))/mgConfig.trigBase*dRound)/dRound}
		return "undefined"
	}
	function acc(xU) {//acosec
		if (getType(xU) == "complex") {return asn(cDiv(1,xU))}
		if (getType(xU) == "real") {return Math.round(Math.asin(1/toReal(xU))/mgConfig.trigBase*dRound)/dRound}
		return "undefined"
	}
	function act(xU) {//acotan
		if (getType(xU) == "complex") {return atn(cDiv(1,xU))} 
		if (getType(xU) == "real") {return Math.round(Math.atan(1/toReal(xU))/mgConfig.trigBase*dRound)/dRound}
		return "undefined"
	}
	//hyperbolic functions
	function snh(xU) {//sinh
		if (getType(xU) == "complex") {return cDiv(cAdd(exp(xU),cMul(exp(cMul(xU,-1)),-1)),2)}
		if (getType(xU) == "real") {return Math.round((Math.exp(xU)-Math.exp(-xU))/2*dRound)/dRound}
		return "undefined"
	}
	function csh(xU) {//cosh
		if (getType(xU) == "complex") {return cDiv(cAdd(exp(xU),exp(cMul(xU,-1))),2)}
		if (getType(xU) == "real") {return Math.round((Math.exp(xU)+Math.exp(-xU))/2*dRound)/dRound}
		return "undefined"
	}
	function tnh(xU) {//tanh
		if (getType(xU) == "complex") {return cDiv(snh(xU),csh(xU))}
		if (getType(xU) == "real") {return Math.round((Math.exp(xU)-Math.exp(-xU))/(Math.exp(xU)+Math.exp(-xU))*dRound)/dRound}
		return "undefined"
	}
	function sch(xU) {//sech
		if (getType(xU) == "complex") {return cDiv(1,csh(xU))}
		if (getType(xU) == "real") {return Math.round(2/(Math.exp(xU)+Math.exp(-xU))*dRound)/dRound}
		return "undefined"
	}
	function cch(xU) {//csch
		if (getType(xU) == "complex") {return cDiv(1,snh(xU))}
		if (getType(xU) == "real") {return Math.round(2/(Math.exp(xU)-Math.exp(-xU))*dRound)/dRound}
		return "undefined"
	}
	function cth(xU) {//coth
		if (getType(xU) == "complex") {return cDiv(1,tnh(xU))}
		if (getType(xU) == "real") {return Math.round((Math.exp(xU)+Math.exp(-xU))/(Math.exp(xU)-Math.exp(-xU))*dRound)/dRound}
		return "undefined"
	}
	//inverse hyperbolic
	function ash(xU) {//asinh 
		if (getType(xU) == "complex") {return lne(cAdd(xU,sqt(cAdd(cPow(xU,2),1))))}
		if (getType(xU) == "real") {return Math.round(Math.log(+xU+Math.sqrt(Math.pow(xU,2)+1))*dRound)/dRound}
		return "undefined"
	}
	function ach(xU) {//acosh
		if (getType(xU) == "complex") {return lne(cAdd(xU,cMul(sqt(cAdd(xU,1)),sqt(cAdd(xU,-1)))))}
		if (getType(xU) == "real") {return Math.round(Math.log(+xU+Math.sqrt(Math.pow(xU,2)-1))*dRound)/dRound}
		return "undefined"
	}
	function ath(xU) {//atanh
		if (getType(xU) == "complex") {return cDiv((cAdd(lne(cAdd(1,xU)),cMul(lne(cAdd(1,cMul(-1,xU))),-1))),2)} 
		if (getType(xU) == "real") {return Math.round(Math.log((+xU+1)/(1-xU))/2*dRound)/dRound}
		return "undefined"
	}
	function axh(xU) {//asech 
		if (getType(xU) == "complex") {return lne(cAdd(cDiv(1,xU),sqt(cSub(cDiv(1,cPow(xU,2)),1))))}
		if (getType(xU) == "real") {return Math.round(Math.log(1/xU+Math.sqrt(1/Math.pow(xU,2)-1))*dRound)/dRound}
		return "undefined"
	}
	function ayh(xU) {//acsch
		if (getType(xU) == "complex") {return lne(cAdd(cDiv(1,xU),sqt(cAdd(cDiv(1,cPow(xU,2)),1))))}
		if (getType(xU) == "real") {return Math.round(Math.log(1/xU+Math.sqrt(1/Math.pow(xU,2)+1))*dRound)/dRound}
		return "undefined"
	}
	function azh(xU) {//acoth
		if (getType(xU) == "complex") {return cDiv(lne(cDiv(cAdd(xU,1),cSub(xU,1))),2)} 
		if (getType(xU) == "real") {return Math.round((Math.log(1+1/xU)-Math.log(1-1/xU))/2*dRound)/dRound}
		return "undefined"
	}

	//misc functions
	function fac(xU) { //factorial
		if (getType(xU) == "complex" && xU.i != 0) {return gam(cAdd(xU,1))}
		if (getType(xU) == "real") {return gam((+xU)+1)}
		return "undefined"
	}
	function gam(xU) { //gamma function
		if (getType(xU) == "complex") {
			xU = toCplx(xU);
			var gC = 7;
			var pC = [0.99999999999980993,676.5203681218851,-1259.1392167224028,771.32342877765313,-176.61502916214059,12.507343278686905,-0.13857109526572012,9.9843695780195716e-6,1.5056327351493116e-7];
			if (xU.r < 0.5) {return cDiv(Cv[29],cMul(sin(cMul(Cv[29],xU)),gam(cAdd(1,cMul(-1,xU)))))}
			else {
				xU = cAdd(xU,-1);
				var xI = pC[0];
				for (var iC=1;iC<gC+2;iC++) {xI = cAdd(xI,cDiv(pC[iC],cAdd(xU,iC)))}
				tC = cAdd(cAdd(xU,gC),0.5);
				return cMul(cMul(cMul(2.5066282746,cPow(tC,cAdd(xU,0.5))),exp(cMul(-1,tC))),xI)
			}
		}
		if (getType(xU) == "real") {
			var z=1;
			if ((xU>22)||(xU != Math.round(xU))) {z = Math.sqrt(Cv[30]/xU)*Math.pow(xU/Cv[8]*Math.sqrt(xU*snh(1/xU)+1/(810*Math.pow(xU,6))),xU)} 
			else {for (var g=1;g<=xU-1;g++) {z=z*g}} 
			return z
		}
		return "undefined"
	}
	
	//statistical functions
	function rnd(xU) { //random number
		if (getType(xU) == "real") {return Math.random()*xU}
		return "undefined"
	} 
	function cdf(xU) { //normalized cumulative density function
		if (getType(xU) == "complex" && +xU.i == 0) {xU = +xU.r}
		if (getType(xU) == "real") {return normCDF(1,toReal(xU),0)}
		return "undefined"
	}
	function pdf(xU) { //normalized probability density function
		if (getType(xU) == "complex" && +xU.i == 0) {xU = +xU.r}
		if (getType(xU) == "real") {return normPDF(1,toReal(xU),0)}
		return "undefined"
	}
	function lcf(xU) { //normalized log cumulative density function
		if (getType(xU) == "complex" && +xU.i == 0) {xU = +xU.r}
		if (getType(xU) == "real") {return lognCDF(1,toReal(xU),0)}
		return "undefined"
	}
	function lpf(xU) { //normalized log probability density function
		if (getType(xU) == "complex" && +xU.i == 0) {xU = +xU.r}
		if (getType(xU) == "real") {return lognPDF(1,toReal(xU),0)}
		return "undefined"
	}
	function erf(xU) {//error function
		if (getType(xU) == "complex" && +xU.i == 0) {xU = +xU.r}
		if (getType(xU) == "real") {
			var fE=0;
			if (xU>3.2) {return 1-Math.pow(3.14,-xU*xU)}
			else {for (var fn=0;fn<50;fn++){fE = fE+Math.pow(-1,fn)*(Math.pow(xU,2*fn+1)/(fac(fn)*(2*fn+1)))};return 1.1283796*fE};
		}
		return "undefined"
	}
	function efc(xU) {//inverse error function
		if (getType(xU) == "complex" && +xU.i == 0) {xU = +xU.r}
		if (getType(xU) == "real") {return iSolve('erf(iSlv)',toReal(xU),0,7)}
		return "undefined"
	}
	function normPDF(sigma,xV,mu) { //probability density function
		sigma = toReal(sigma);xV = toReal(xV);mu = toReal(mu);
		return (1/(sigma*2.5066282)*Math.exp(-(Math.pow(xV-mu,2)/(2*Math.pow(sigma,2)))));
	}
	function normCDF(sigma,xV,mu) { //cumulative density function
		sigma = toReal(sigma);xV = toReal(xV);mu = toReal(mu);
		return (1+erf((xV-mu)/(sigma*1.414)))/2;
	}
	function lognPDF(sigma,xV,mu) { //log probability density function
		sigma = toReal(sigma);xV = toReal(xV);mu = toReal(mu);
		return (1/(xV*sigma*2.5066282)*Math.exp(-(Math.pow(lne(xV)-mu,2)/(2*Math.pow(sigma,2)))));
	}
	function lognCDF(sigma,xV,mu) { //log cumulative density function
		sigma = toReal(sigma);xV = toReal(xV);mu = toReal(mu);
		return (1+erf(lne(xV)-mu/(sigma*1.414)))/2;
	}
	// financial functions
	// Black-Scholes fT=term,fR=rate,fK=strike,fS=spot,fQ=div;sDv=stdev
	function finCALL(fT,fR,fK,fS,fQ,sDv) {
		fT = toReal(fT);fR = toReal(fR);fK = toReal(fK);fS = toReal(fS);fQ = toReal(fQ);sDv = toReal(sDv);
		return roundDecTo(normCDF(1,finD1(fT,fR,fK,fS,fQ,sDv),0)*fS*Math.exp(-(fQ/mgConfig.pctFactor)*fT)-normCDF(1,finD2(fT,fR,fK,fS,fQ,sDv),0)*fK*Math.exp(-(fR/mgConfig.pctFactor)*fT),mgConfig.dPrecision)
	}
	function finPUT(fT,fR,fK,fS,fQ,sDv) {
		fT = toReal(fT);fR = toReal(fR);fK = toReal(fK);fS = toReal(fS);fQ = toReal(fQ);sDv = toReal(sDv);
		return roundDecTo(normCDF(1,-finD2(fT,fR,fK,fS,fQ,sDv),0)*fK*Math.exp(-(fR/mgConfig.pctFactor)*fT)-normCDF(1,-finD1(fT,fR,fK,fS,fQ,sDv),0)*fS*Math.exp(-(fQ/mgConfig.pctFactor)*fT),mgConfig.dPrecision)
	}
	function finCALLdelta(fT,fR,fK,fS,fQ,sDv) {
		fT = toReal(fT);fR = toReal(fR);fK = toReal(fK);fS = toReal(fS);fQ = toReal(fQ);sDv = toReal(sDv);
		return roundDecTo(normCDF(1,finD1(fT,fR,fK,fS,fQ,sDv),0)*Math.exp(-fQ*fT),mgConfig.dPrecision);
	}
	function finPUTdelta(fT,fR,fK,fS,fQ,sDv) {
		fT = toReal(fT);fR = toReal(fR);fK = toReal(fK);fS = toReal(fS);fQ = toReal(fQ);sDv = toReal(sDv);
		return roundDecTo(-normCDF(1,-finD1(fT,fR,fK,fS,fQ,sDv),0)*Math.exp(-fQ*fT),mgConfig.dPrecision);
	}
	function finOPTgamma(fT,fR,fK,fS,fQ,sDv) {
		fT = toReal(fT);fR = toReal(fR);fK = toReal(fK);fS = toReal(fS);fQ = toReal(fQ);sDv = toReal(sDv);
		return roundDecTo((normPDF(1,finD1(fT,fR,fK,fS,fQ,sDv),0)*Math.exp(-fQ*fT))/(fS*sDv*Math.sqrt(fT)),mgConfig.dPrecision);
	}
	function finCALLtheta(fT,fR,fK,fS,fQ,sDv) {
		fT = toReal(fT);fR = toReal(fR);fK = toReal(fK);fS = toReal(fS);fQ = toReal(fQ);sDv = toReal(sDv);
		return roundDecTo((-Math.exp(-(fQ/mgConfig.pctFactor)*fT)*(normPDF(1,finD1(fT,fR,fK,fS,fQ,sDv),0)*fS*sDv)/(2*Math.sqrt(fT))-(fR/mgConfig.pctFactor)*fK*Math.exp(-(fR/mgConfig.pctFactor)*fT)*normCDF(1,finD2(fT,fR,fK,fS,fQ,sDv),0)+(fQ/mgConfig.pctFactor)*fS*Math.exp(-(fQ/mgConfig.pctFactor)*fT)*normCDF(1,finD1(fT,fR,fK,fS,fQ,sDv),0))/365,mgConfig.dPrecision);
	}
	function finPUTtheta(fT,fR,fK,fS,fQ,sDv) {
		fT = toReal(fT);fR = toReal(fR);fK = toReal(fK);fS = toReal(fS);fQ = toReal(fQ);sDv = toReal(sDv);
		return roundDecTo((-Math.exp(-(fQ/mgConfig.pctFactor)*fT)*(normPDF(1,finD1(fT,fR,fK,fS,fQ,sDv),0)*fS*sDv)/(2*Math.sqrt(fT))+(fR/mgConfig.pctFactor)*fK*Math.exp(-(fR/mgConfig.pctFactor)*fT)*normCDF(1,-finD2(fT,fR,fK,fS,fQ,sDv),0)-(fQ/mgConfig.pctFactor)*fS*Math.exp(-(fQ/mgConfig.pctFactor)*fT)*normCDF(1,-finD1(fT,fR,fK,fS,fQ,sDv),0))/365,mgConfig.dPrecision);
	}
	function finOPTvega(fT,fR,fK,fS,fQ,sDv) {
		fT = toReal(fT);fR = toReal(fR);fK = toReal(fK);fS = toReal(fS);fQ = toReal(fQ);sDv = toReal(sDv);
		return roundDecTo(normPDF(1,finD1(fT,fR,fK,fS,fQ,sDv),0)*fS*Math.exp(-(fQ/mgConfig.pctFactor)*fT)*Math.sqrt(fT)/100,mgConfig.dPrecision);
	}
	function finCALLrho(fT,fR,fK,fS,fQ,sDv) {
		fT = toReal(fT);fR = toReal(fR);fK = toReal(fK);fS = toReal(fS);fQ = toReal(fQ);sDv = toReal(sDv);
		return roundDecTo(normCDF(1,finD1(fT,fR,fK,fS,fQ,sDv),0)*fK*fT*Math.exp(-(fR/mgConfig.pctFactor)*fT)/100,mgConfig.dPrecision);
	}
	function finPUTrho(fT,fR,fK,fS,fQ,sDv) {
		fT = toReal(fT);fR = toReal(fR);fK = toReal(fK);fS = toReal(fS);fQ = toReal(fQ);sDv = toReal(sDv);
		return roundDecTo(-normCDF(1,-finD1(fT,fR,fK,fS,fQ,sDv),0)*fK*fT*Math.exp(-(fR/mgConfig.pctFactor)*fT)/100,mgConfig.dPrecision);
	}
	function finD1(fT,fR,fK,fS,fQ,sDv){return (lne(fS/fK)+((fR/mgConfig.pctFactor)-(fQ/mgConfig.pctFactor)+.5*Math.pow(sDv,2))*fT)/(sDv*Math.sqrt(fT))}
	function finD2(fT,fR,fK,fS,fQ,sDv){return (lne(fS/fK)+((fR/mgConfig.pctFactor)-(fQ/mgConfig.pctFactor)-.5*Math.pow(sDv,2))*fT)/(sDv*Math.sqrt(fT))}
	// Loan/Bond functions
	function finPV(PVx,FVx,PMTx,RATEx,TERMx,IPYx){
		PVx = toReal(PVx);FVx = toReal(FVx);PMTx = toReal(PMTx);RATEx = toReal(RATEx);TERMx = toReal(TERMx);IPYx = toReal(IPYx);
		if (RATEx == 0) {return FVx+(IPYx*TERMx*PMTx)}
		var Ux = (PMTx*(1-1/Math.pow(1+(RATEx/mgConfig.pctFactor)/IPYx,IPYx*TERMx))/((RATEx/mgConfig.pctFactor)/IPYx))+FVx*(1/Math.pow(1+((RATEx/mgConfig.pctFactor)/IPYx),IPYx*TERMx));
		return Math.round(Ux*100)/100
	}
	function finFV(PVx,FVx,PMTx,RATEx,TERMx,IPYx){
		PVx = toReal(PVx);FVx = toReal(FVx);PMTx = toReal(PMTx);RATEx = toReal(RATEx);TERMx = toReal(TERMx);IPYx = toReal(IPYx);
		if (RATEx == 0) {return PVx-(IPYx*TERMx*PMTx)}
		var Ux = (PVx-(PMTx*(1-1/Math.pow(1+(RATEx/mgConfig.pctFactor)/IPYx,IPYx*TERMx))/((RATEx/mgConfig.pctFactor)/IPYx)))/(1/Math.pow(1+((RATEx/mgConfig.pctFactor)/IPYx),IPYx*TERMx));
		return Math.round(Ux*100)/100
	}
	function finPMT(PVx,FVx,PMTx,RATEx,TERMx,IPYx) {
		PVx = toReal(PVx);FVx = toReal(FVx);PMTx = toReal(PMTx);RATEx = toReal(RATEx);TERMx = toReal(TERMx);IPYx = toReal(IPYx);
		if (RATEx == 0) {return (PVx-FVx)/(IPYx*TERMx)}
		var Ux = (PVx-FVx*(1/Math.pow(1+((RATEx/mgConfig.pctFactor)/IPYx),IPYx*TERMx)))/((1-1/Math.pow(1+(RATEx/mgConfig.pctFactor)/IPYx,IPYx*TERMx))/((RATEx/mgConfig.pctFactor)/IPYx));
		return Math.round(Ux*100)/100
	}
	function finRATE(PVx,FVx,PMTx,RATEx,TERMx,IPYx) {
		PVx = toReal(PVx);FVx = toReal(FVx);PMTx = toReal(PMTx);RATEx = toReal(RATEx);TERMx = toReal(TERMx);IPYx = toReal(IPYx);
		var Ux = 0,nH = 100,nL = 0,t1 = 0; 
		for (var kI=1; kI<=100;kI++) {
		Ux = (nH+nL)/2;
		t1 = (PMTx*(1-1/Math.pow(1+Ux/IPYx,IPYx*TERMx))/(Ux/IPYx))+FVx*(1/Math.pow(1+(Ux/IPYx),IPYx*TERMx));
		if (t1 < PVx) {nH = (nH+nL)/2;} else {nL = (nH+nL)/2;}
		}
		return Ux.toPrecision(4)*mgConfig.pctFactor
	}
	function finTERM(PVx,FVx,PMTx,RATEx,TERMx,IPYx) {
		PVx = toReal(PVx);FVx = toReal(FVx);PMTx = toReal(PMTx);RATEx = toReal(RATEx);TERMx = toReal(TERMx);IPYx = toReal(IPYx);
		if (RATEx == 0) {return (PVx-FVx)/(IPYx*PMTx)}
		var Ux = 0,nH = 500,nL = 1,t1 = 0;
		if (PMTx == 0) {
			for (var kI=1; kI<100;kI++) {
				Ux=(nH+nL)/2;
				t1 = (PVx-FVx*(1/Math.pow(1+((RATEx/mgConfig.pctFactor)/IPYx),IPYx*Ux)))/((1-1/Math.pow(1+(RATEx/mgConfig.pctFactor)/IPYx,IPYx*Ux))/((RATEx/mgConfig.pctFactor)/IPYx));
				if (t1 > PMTx) {nH = (nH+nL)/2} else {nL = (nH+nL)/2}	
			}
		}
		else if (FVx > PVx) {
			for (var kI=1; kI<100;kI++) {
				Ux=(nH+nL)/2;
				t1 = (PVx-FVx*(1/Math.pow(1+((RATEx/mgConfig.pctFactor)/IPYx),IPYx*Ux)))/((1-1/Math.pow(1+(RATEx/mgConfig.pctFactor)/IPYx,IPYx*Ux))/((RATEx/mgConfig.pctFactor)/IPYx));
				if (t1 > PMTx) {nH = (nH+nL)/2} else {nL = (nH+nL)/2}	
			}
		}
		else if (FVx < PVx) {
			for (var kI=1; kI<100;kI++) {
			Ux=(nH+nL)/2;
			t1 = (PMTx*(1-1/Math.pow(1+(RATEx/mgConfig.pctFactor)/IPYx,IPYx*Ux))/((RATEx/mgConfig.pctFactor)/IPYx))+FVx*(1/Math.pow(1+((RATEx/mgConfig.pctFactor)/IPYx),IPYx*Ux));
			if (t1 > PVx) {nH = (nH+nL)/2} else {nL = (nH+nL)/2}	
			}
		}
		else {return "Cv[8734]"}
		if (Ux == 500) {return "Cv[8734]"}
		return Math.round(Ux*100)/100
	}
	//use iSlv for iSolve variable Example: iSolve('10*exp(iSlv)',100,0,10) nL=low limit, nH=high limit
	function iSolve(expr,result,nL,nH) {//iterative solver
		var result = toReal(result);
		if (getType(result) != "real") {return "undefined"}
		if (getType(nL) != "real") {nL = 1e-322}
		if (getType(nH) != "real") {nH = 1e301}
		var t1 = 0;
		var iSlv = nL;
		var tLo =  toReal(eval(expr));
		var iSlv = nH;
		var tHi =  toReal(eval(expr));
		if (tHi > tLo) {
			for (var ix=1;ix<100;ix++) {
				iSlv = (nH+nL)/2;
				t1 = toReal(eval(expr));
				if (t1 > result || t1 == "NaN") {nH = (nH+nL)/2} else {nL = (nH+nL)/2}	
			}
		}
		else {
			for (var ix=1;ix<100;ix++) {		
				iSlv = (nH+nL)/2;
				t1 = toReal(eval(expr));
				if (t1 < result || t1 == "NaN") {nH = (nH+nL)/2} else {nL = (nH+nL)/2}	
			}
		}
		return iSlv
	}
	function cGcf(xU,xL) {//greatest common factor
		if (getType(xU) == "real" && getType(xL) == "real" ) {
			xU = Math.abs(xU);xL = Math.abs(xL);
			if (xU == 0 || xL == 0) {return 1}
			var xMod = 1,Cbr = 0;
			if (xU != Math.floor(xU) || xL != Math.floor(xL)) {return 1}
			if (xU == xL) {return xU}
			else if (xU > xL) {var xTmpL = xL;xTmpH = xU}
			else {var xTmpL = xU;xTmpH = xL}
			while (xMod > 0) {
				xMod = xTmpH-(Math.floor(xTmpH/xTmpL)*xTmpL);
				xTmpH = xTmpL;
				xTmpL = xMod;
				Cbr++;
				if (Cbr > 1000) {return 1}
			}
			if ((xU/xTmpH) == Math.floor(xU/xTmpH) && (xL/xTmpH) == Math.floor(xL/xTmpH)) {return xTmpH}
			return 1
		}
		return "undefined"
	}
	// dummy arithmetic handlers
	function ntg(xU,xL) {return "ntg("+xU+","+xL+")"} //integral
	function drv(xU,xL) {return "drv("+xU+","+xL+")"} //derivative
	function dif(xU) {return xU} //differential 
	function sbr(xU) {return xU} //straight brackets
	function cbr(xU) {return xU} //curly brackets
	function prn(xU) {return xU} //parentheses
	function sbt(xU) {return 1} //subscript
	function prd(xU,xL) {return "undefined"} //pi product
	function sum(xU,xL) {return "undefined"} //sigma sum
	function cap(xU,xL) {return "undefined"} //intersection
	function cup(xU,xL) {return "undefined"} //union
	function und(xU) {return xU} //underline
	function vec(xU) {return xU} //vector overhead
	function hat(xU) {return xU} //hat overhead
	function udt(xU) {return xU} //dot overhead
	function tld(xU) {return xU} //tilde overhead
	function cnt(xU) {return xU} //container
	function idr(xU) {return "undefined"} //single derivative
	function tdr(xU) {return "undefined"} //total derivative
	function sdr(xU,xL) {return "undefined"} //single derivative
	function psd(xU,xL) {return "undefined"} //single partial derivative
	function ddr(xU,xL) {return "undefined"} //double derivative
	function pdd(xU,xL) {return "undefined"} //double partial derivative
	function cEql(xU,xL) {return "undefined"}
	function cBnd(xU,xL) {return "undefined"}
	
	var Sv = [],Pv = [];
	var pxpFlag = false,limitFlag = false,qFlag = false,factorFlag = false,solverFlag = false;
	var deeVarP = "";
	var dRound = 1e12; //rounding for complex number arithmetic
	var iConstant = 11100; //constant of integration variable index
	var iIterations = 0; //iteration count for integration
	var sIterations = 0; //iteration count for summation
	var pIterations = 0; //iteration count for products
	var invMult = "Cv[29]";
	if (mgConfig.trigBase == Math.PI/180) {invMult = "180"}
	if (mgConfig.trigBase == Math.PI/200) {invMult = "200"}

	var Numeric    = function(xprA) {return mgExport(fmtResult(eval(cFunc(xprA))))};
	var	Simplify   = function(xprA) {return cReduce(cFunc(parseCalculus(xprA)))	};
	var Solve      = function(xprA,xprB) {return xprSolve(cFunc(parseCalculus(xprA)),xprB)};
	var Substitute = function(xprA,xprB,xprC) {return cSubst(xprA,xprB,xprC)	};
	var Factor     = function(xprA) {return cFactor(cFunc(parseCalculus(xprA)))	};
	var Expand     = function(xprA) {return cExpand(cFunc(parseCalculus(xprA)))	};
	var TrigToExp  = function(xprA) {return cTrigExp(cFunc(parseCalculus(xprA)))};
	var Range      = function(xprA) {return xprRange(xprA)						};
	var Domain     = function(xprA) {return xprDomain(xprA)						};
	var Inventory  = function(xprA) {return cInventory(xprA)					};
	var RoundDec   = function(p1,p2) {return roundDecTo(p1,p2)					};
	var Payment    = function(p1,p2,p3,p4,p5,p6) {return finPMT(p1,p2,p3,p4,p5,p6)};
	var Term       = function(p1,p2,p3,p4,p5,p6) {return finTERM(p1,p2,p3,p4,p5,p6)};
	var Rate       = function(p1,p2,p3,p4,p5,p6) {return finRATE(p1,p2,p3,p4,p5,p6)};
	var PresentValue=function(p1,p2,p3,p4,p5,p6) {return finPV(p1,p2,p3,p4,p5,p6)};
	var FutureValue= function(p1,p2,p3,p4,p5,p6) {return finFV(p1,p2,p3,p4,p5,p6)};
	var Call       = function(p1,p2,p3,p4,p5,p6) {return finCALL(p1,p2,p3,p4,p5,p6)};
	var Put        = function(p1,p2,p3,p4,p5,p6) {return finPUT(p1,p2,p3,p4,p5,p6)};
	var	CallDelta  = function(p1,p2,p3,p4,p5,p6) {return finCALLdelta(p1,p2,p3,p4,p5,p6)};
	var	CallRho    = function(p1,p2,p3,p4,p5,p6) {return finCALLrho(p1,p2,p3,p4,p5,p6)};
	var	CallTheta  = function(p1,p2,p3,p4,p5,p6) {return finCALLtheta(p1,p2,p3,p4,p5,p6)};
	var	PutDelta   = function(p1,p2,p3,p4,p5,p6) {return finPUTdelta(p1,p2,p3,p4,p5,p6)};
	var	PutRho     = function(p1,p2,p3,p4,p5,p6) {return finPUTrho(p1,p2,p3,p4,p5,p6)};
	var	PutTheta   = function(p1,p2,p3,p4,p5,p6) {return finPUTtheta(p1,p2,p3,p4,p5,p6)};
	var OptionGamma= function(p1,p2,p3,p4,p5,p6) {return finOPTgamma(p1,p2,p3,p4,p5,p6)};
	var OptionVega = function(p1,p2,p3,p4,p5,p6) {return finOPTvega(p1,p2,p3,p4,p5,p6)};
	var irSolver   = function(p1,p2,p3,p4) {return iSolve(p1,p2,p3,p4) 	};
	var GCF        = function(p1,p2) {return cGcf(p1,p2)}
	
	return {
		Numeric:Numeric,
		Simplify: Simplify,
		Solve:Solve,
		Substitute:Substitute,
		Factor:Factor,
		Expand:Expand,
		TrigToExp:TrigToExp,
		Range:Range,
		Domain:Domain,
		RoundDec:RoundDec,
		Inventory:Inventory,
		Payment:Payment,
		Term:Term,
		Rate:Rate,
		PresentValue:PresentValue,
		FutureValue:FutureValue,
		Call:Call,
		Put:Put,
		CallDelta:CallDelta,
		CallRho:CallRho,
		CallTheta:CallTheta,
		PutDelta:PutDelta,
		PutRho:PutRho,
		PutTheta:PutTheta,
		OptionGamma:OptionGamma,
		OptionVega:OptionVega,
		irSolver:irSolver,
		GCF:GCF,
	}
}) ();
// node.js export
if (typeof module ==  "object") {
	module.exports = {
		mgNumeric:		function(expression) {return mgNumeric(expression)},
		mgCalculate:	function(expression) {return mgCalculate(expression)},
		mgSolve:		function(equation,variable) {return mgSolve(equation,variable)},
		mgSubstitute:	function(expression,substTarget,substSource) {return mgSubstitute(expression,substTarget,substSource)},
		mgSimplify:		function(expression) {return mgSimplify(expression)},
		mgFactor:		function(expression) {return mgFactor(expression)},
		mgExpand:		function(expression) {return mgExpand(expression)},
		mgTrigToExp:	function(expression) {return mgTrigToExp(expression)},
		mgRange:		function(expression) {return mgRange(expression)},
		mgDomain:		function(expression) {return mgDomain(expression)},
		mgCalc:			mgCalc,
	}
}

//