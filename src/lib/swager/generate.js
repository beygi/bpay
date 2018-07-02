var fs = require('fs');
var CodeGen = require('swagger-typescript-codegen').CodeGen;

var file = './api-docs.json';
var swagger = JSON.parse(fs.readFileSync(file, 'UTF-8'));
var tsSourceCode = CodeGen.getTypescriptCode({ className: 'B2Mark', swagger: swagger });
console.log(tsSourceCode);
