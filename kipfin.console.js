// Imports
const figlet = require("figlet");
const chalk = require('chalk');
const boxen = require('boxen');
const prompts = require('prompts');
const fs = require('fs');
const path = require('path');

// Consts
const rootPath = __dirname;
const moduleArchitecture = [
    "Components",
    "Common",
    "Entities",
    "Pages",
    "Routes",
    "Services",
    "Store",
    "Utils",
]

printHeader();

(async () => {
    // Entry point
    let response = null;
    do {
        response = await ask("Type command");
        await work(response);
    } while (!isOutResponse(response));
})();


// ===================================================
// Working section
// ===================================================
function work(input) {
    const strInput = String(input);
    const args = strInput.split(" ");
    switch (args[0]) {
        case "create":
            return workCreate(args, input);
        default:
            break;
    }
}

async function workCreate(args, input) {
    let createThing = args[1] || await askList("What to create?", [
        "module", "build"
    ]);
    let createThingName = args[2] || await ask("Type " + createThing + " name");

    printProcess('Creating ' + createThing + " " + chalk.yellow(createThingName));
    create[createThing](createThingName);
}

// ===================================================
// Checkers section
// ===================================================

function isOutResponse(r) {
    return r === null || r === 'q';
}

// ===================================================
// IO section
// ===================================================

async function ask(question, type) {
    const varName = 'value-' + (new Date().getTime());
    const result = await prompts({
        type: type || 'text',
        name: varName,
        message: question
    });
    return Promise.resolve(result[varName]);
}

async function askList(question, options) {
    const varName = 'value-' + (new Date().getTime());
    options = options.map(v => v.title === undefined ? {title: v, value: v} : v);
    const result = await prompts({
        type: 'select',
        message: question,
        name: varName,
        choices: options
    });
    return Promise.resolve(result[varName]);
}

function printHeader() {
    console.clear();
    console.log(chalk.cyan(figlet.textSync('KIPFIN')))
    console.log(chalk.yellow('Powered by Yakov V. Panov (KIPFIN (C) 2020)'))
    console.log();
}

function printBox(text) {
    console.log(boxen(text, {padding: 1}));
}

function printProcess(...text) {
    console.log(chalk.cyan('[] ' + text.join(" ") + " ..."));
}
function printDone(...text) {
    console.log(chalk.green('[ OK ] ' + text.join(" ") + " ..."));
}

// ===================================================
// Utils section
// ===================================================

function getModulePath(moduleName) {
    return path.resolve(__dirname, 'src/modules', moduleName);
}

const create = {
    module(name){

        const modulesPath = getModulePath(name);
        let sourceRoutes = fs.readFileSync(__dirname + '/src/console/moduleRoutes.ts').toString();
        let sourceReadMD = fs.readFileSync(__dirname + '/src/console/module.md').toString();

        sourceRoutes = sourceRoutes.replace('module', name.substr(0, 1).toLowerCase() + name.substr(1));
        sourceReadMD = sourceReadMD.replace('{MODULE_NAME}', name);

        printProcess('Building architecture');
        fs.mkdirSync(path.resolve(modulesPath));
        moduleArchitecture.forEach(value => fs.mkdirSync(path.resolve(modulesPath, value)));

        printProcess('Coping mds');
        fs.writeFileSync(path.resolve(modulesPath, "README.md"), sourceReadMD);

        printProcess('Coping routes');
        fs.writeFileSync(path.resolve(modulesPath, "Routes/index.ts"), sourceRoutes);
        printDone('Everything is done...');
    },

};