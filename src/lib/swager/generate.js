var fs = require('fs');
var CodeGen = require('swagger-typescript-codegen').CodeGen;

var file = "./"+process.argv[2]
// './api-docs.json';



var swagger = JSON.parse(fs.readFileSync(file, 'UTF-8'));
var tsSourceCode = CodeGen.getTypescriptCode({ className: process.argv[2].split(".")[0]+"Api", swagger: swagger , beautify : true });

fs.writeFile("./src/lib/swager/"+ process.argv[2]+".ts", tsSourceCode, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
