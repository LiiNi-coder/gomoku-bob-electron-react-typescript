const path = require('path');
const url = require('url');
import { spawn } from "child_process";
const iconv = require("iconv-lite");
require('dotenv').config();
export function startM5n(){
    //const spawn = require('child_process').spawn;
    const [server_ip, port, cwd] = [process.env.SERVER_IP, process.env.PORT, process.env.CWD];
    console.log(`[CWD]${cwd}`);
    const child = spawn("M5N.Slave",
        [`${server_ip}:${port}`, `./app`],
        {cwd:cwd, shell:true, timeout:10000, }
        );
    child.stdout.on("data", (data)=>{
        console.log(`[STDOUT]${data}`);
        //console.log(`[STDOUT]:${iconv.decode(data, "euc-kr")}`);
        //console.log(`[STDOUT]:${data.toString("hex")}`);
    });
    child.stderr.on("data", (data)=>{
        console.log(`[STDERR]${data}`);
        //console.log(`[STDERR]:${iconv.decode(data, "euc-kr")}`);
        //console.log(`[STDERR]:${data.toString("hex")}`);
    });
    child.on("close", (code)=>{
        console.log(`childProcess is closed by code ${code}`);
    });
}