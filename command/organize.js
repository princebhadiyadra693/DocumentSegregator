let fs = require("fs");
let path = require("path");

let types = {
    Media: ["mp4", "mkv"],
    Archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    Documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    App: ['exe', 'dmg', 'pkg', "deb"],
    Others : []
}

function rec(src , mainsrc)
{
    let contentOfAFolder = fs.readdirSync(src);

    for(let i in contentOfAFolder)
    {
        let currFileOrFolderName = contentOfAFolder[i];
        if(currFileOrFolderName == "organize"){
            continue;
        }

        let currFileOrFolderPath = path.join(src , currFileOrFolderName);
        let stateOfAPath = fs.lstatSync(currFileOrFolderPath);
        let isFile = stateOfAPath.isFile();

        if(isFile)
        {
            let extantion = path.extname(currFileOrFolderPath).slice(1);
            let flag = true;
            for(let i in types)
            {
                if(types[i].includes(extantion))
                {
                    flag = false;
                    let srcFilePath = currFileOrFolderPath;
                    let tobeCopiedFileName = path.basename(srcFilePath);
                    let destFilePath = path.join(mainsrc , "organize" , i ,tobeCopiedFileName );
                    fs.copyFileSync(srcFilePath , destFilePath);
                    break;
                }
            }
            if(flag == true)
            {
                let srcFilePath = currFileOrFolderPath;
                let tobeCopiedFileName = path.basename(srcFilePath);
                let destFilePath = path.join(mainsrc , "organize" , "Others" ,tobeCopiedFileName );
                fs.copyFileSync(srcFilePath , destFilePath);
            }
        }
        else{
            rec( path.join(src , currFileOrFolderName) , mainsrc);
        }
    }
}

function organize(src){
    console.log("organize command executed with " + src) ;

    let pathTillOrgannize = path.join(src , "organize");
    fs.mkdirSync(pathTillOrgannize);

    for(let type in types)
    {

        let pathForTypesDirectory = path.join(pathTillOrgannize , type);
        fs.mkdirSync(pathForTypesDirectory);
    }
    
    rec(src , src);

}

module.exports = {
    organize : organize
}