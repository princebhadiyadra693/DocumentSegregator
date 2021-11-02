let fs = require("fs");

let inputArr = process.argv.slice(2);
let command = inputArr[0];
let path = inputArr[1];

// of Path exist then only segregate otherwise return

if (path == undefined)
{
    path = process.cwd();
}
console.log(command , path);

if(command == "help")
{
    let objOfHelp = require("./command/help");
    objOfHelp.help();
}
else if(command == "organize")
{
    if(fs.existsSync(path) == false)
    {
        console.log("Path does not exist. ");
        return;
    }
   let objOfOrganize = require("./command/organize");
   objOfOrganize.organize(path);
}else{
    console.log("Enter a valid command plz checkout help command ");
}