var types = require("ast-types");
var Preprossesor = require('Preprossesor');
var astNode = require('astNode');
var b = types.builders;

var Export = new Preprossesor({
    type : 'attribute',
    name : 'creatTable',
    export : ['string', 'string'],
    tranformer : tranform
});



function tranform(module, identifierName){
    var tableName = identifierName.toLowerCase();
    var node = new astNode(module.ast);
    
    node.findOneIdentifier('identifierName');
    
    node.findManyLiterals('numeric', function(node){
        node.value = 'integer'
    })
    
    node.findManyLiterals('string', function(node){
        node.value = 'varchar'
    })
    
}

function template(ObjectName, tableName){
    return {
        "type": "Program",
        "body": [
            {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": ObjectName
                        },
                        "init": {
                            "type": "CallExpression",
                            "callee": {
                                "type": "MemberExpression",
                                "computed": false,
                                "object": {
                                    "type": "Identifier",
                                    "name": "sequelize"
                                },
                                "property": {
                                    "type": "Identifier",
                                    "name": "define"
                                }
                            },
                            "arguments": [
                                {
                                    "type": "Literal",
                                    "value": tableName,
                                    "raw": "'"+tableName+"'"
                                },
                                {
                                    "type": "ObjectExpression",
                                    "properties": []
                                }
                            ]
                        }
                    }
                ],
                "kind": "var"
            }
        ],
        "sourceType": "script"
    };
}