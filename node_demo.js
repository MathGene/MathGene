/*
  MathGene Node.js demo
  This is a sample Node.js demo file.
  
  Execute using:
  node node_demo.js

  MathGene has no Node.js depencencies.
  mg_translate.js can be used standalone for HTML math formatting.
  mg_calculate.js requires mg_translate.js and provides math calculation and symbolic processing.
  
*/

//presumes MathGene files are in working directory.
var translate = module.require('./mg_translate.js')
var calculate = module.require('./mg_calculate.js')
var mgCalc = calculate.mgCalc;

console.log("MathGene Node.js Demo")

console.log("\n-- HTML generated from Latex '\\phi_n(\\kappa) =\\frac{1}{4\\pi^2\\kappa^2} \\int_0^\\infty\\frac{\\sin(\\kappa R)}{\\kappa R}\\frac{\\partial}{\\partial R}\\left[R^2\\frac{\\partial D_n(R)}{\\partial R}\\right]\\,dR}':\n")
console.log(translate.mgTrans.Translate("\\phi_n(\\kappa) =\\frac{1}{4\\pi^2\\kappa^2} \\int_0^\\infty\\frac{\\sin(\\kappa R)}{\\kappa R}\\frac{\\partial}{\\partial R}\\left[R^2\\frac{\\partial D_n(R)}{\\partial R}\\right]\\,dR").html)

console.log("\n-- Simplify '\\frac{y \\cos {x y} \\sin {x y}}{y \\cos^{2} {x y}}':\n")
console.log(calculate.mgCalc.Simplify("\\frac{y \\cos {x y} \\sin {x y}}{y \\cos^{2} {x y}}").latex)

console.log("\n-- Evaluate Integral '\\int  \\sqrt{5+ \\sqrt{x}} d x':\n")
console.log(calculate.mgCalc.Simplify("\\int  \\sqrt{5+ \\sqrt{x}} d x").latex)

console.log("\n-- Evaluate Summation '\\sum_{x = 4}^{ \\infty }  \\frac{n^{x}}{x !}'\n")
console.log(calculate.mgCalc.Simplify("\\sum_{x = 4}^{ \\infty }  \\frac{n^{x}}{x !}").latex)

console.log("\n-- Solve equation '\\frac{1}{ \\sigma  \\sqrt{2 \\pi }} e^{ \\frac{- \\left(x-m \\right)^{2}}{2 \\sigma^{2}}}=p' for m:\n")
console.log(calculate.mgCalc.Solve("\\frac{1}{ \\sigma  \\sqrt{2 \\pi }} e^{ \\frac{- \\left(x-m \\right)^{2}}{2 \\sigma^{2}}}=p","m").latex)

console.log("\n-- Factor '9 x^{2}+24 x y+16 y^{2}':\n")
console.log(calculate.mgCalc.Factor("9 x^2+24 x y+16 y^2").latex)

console.log("\n-- Calculate complex numerical '\\frac{8-8 \\imath }{2+ \\imath }':\n")
console.log(calculate.mgCalc.Numeric("\\frac{8-8 \\imath }{2+ \\imath }").latex)

console.log("\n-- Calculate matrix dot product '\\begin{bmatrix}3&4&2 \\end{bmatrix} \\times \\begin{bmatrix}13&9&7&15 \\\\8&7&4&6 \\\\6&4&0&3 \\end{bmatrix}':\n")
console.log(calculate.mgCalc.Numeric("\\begin{bmatrix}3&4&2 \\end{bmatrix} \\times \\begin{bmatrix}13&9&7&15 \\\\8&7&4&6 \\\\6&4&0&3 \\end{bmatrix}").latex)

console.log("\n-- Calculate mortgage payment $250,000 30y@4%")
console.log(mgCalc.Payment(250000,0,0,4,360,12)) 
