#!/usr/bin/env node

const fs = require("fs");

const [,, command, ...args] = process.argv;

switch (command) {
    case "read":
        if (!args[0]) return;
        fs.readFile(args[0], "utf8", (err, data) => {
            if (err) return;
            console.log(data);
        });
        break;

    case "write":
        if (!args[0] || !args[1]) return;
        fs.writeFile(args[0], args.slice(1).join(" "), () => {});
        break;

    case "copy":
        if (!args[0] || !args[1]) return;
        fs.copyFile(args[0], args[1], () => {});
        break;

    case "delete":
        if (!args[0]) return;
        fs.unlink(args[0], () => {});
        break;

    case "list":
        const dir = args[0] || ".";
        fs.readdir(dir, (err, files) => {
            if (err) return;
            files.forEach(f => console.log(f));
        });
        break;
}

