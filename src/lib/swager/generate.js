var fs = require('fs');
var CodeGen = require('swagger-typescript-codegen').CodeGen;

var file = './api-docs.json';
var swagger = JSON.parse(fs.readFileSync(file, 'UTF-8'));
var tsSourceCode = CodeGen.getTypescriptCode({ className: 'B2Mark', swagger: swagger });

fs.writeFile(process.argv[2], tsSourceCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
