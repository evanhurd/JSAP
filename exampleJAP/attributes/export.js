var types = require("ast-types");
var Preprossesor = require('Preprossesor');
var astNode = require('astNode');
var b = types.builders;

var Export = new Preprossesor({
    type : 'attribute',
    name : 'export',
    export : ['string', 'string'],
    tranformer : tranform
});



function tranform(module, identifierName, modulePath){
    var declare = declareExportTemplate(identifierName, modulePath);
    var call = callExportTemplate(identifierName, modulePath);
    var node = new astNode(module.ast);
    
    module.ast.Program.body.push(declare);
    
    var block = node.findOneIdentifier('identifierName').getBlock();
    block.body.push(call);
}

function declareExportTemplate(identifierName, modulePath){
    //var export = putModule('identifierName');
    return {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "_"+identifierName+"_export"
                    },
                    "init": {
                        "type": "CallExpression",
                        "callee": {
                            "type": "Identifier",
                            "name": "putModule"
                        },
                        "arguments": [
                            {
                                "type": "Literal",
                                "value": modulePath,
                                "raw": "'"+modulePath+"'"
                            }
                        ]
                    }
                }
            ],
            "kind": "var"
        };
}


function callExportTemplate(identifierName){
    return {
            "type": "ExpressionStatement",
            "expression": {
                "type": "CallExpression",
                "callee": {
                    "type": "Identifier",
                    "name": "_"+identifierName+"_export"
                },
                "arguments": [
                    {
                        "type": "Identifier",
                        "name": identifierName
                    }
                ]
            }
        };
}

