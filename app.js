const os = require('os');
const http = require('http');
const fs = require('fs');
const path = require('path');
const net = require('net');
const { exec, execSync } = require('child_process');
function ensureModule(name) {
    try {
        require.resolve(name);
    } catch (e) {
        console.log(`Module '${name}' not found. Installing...`);
        execSync(`npm install ${name}`, { stdio: 'inherit' });
    }
}
ensureModule('ws');
const { WebSocket, createWebSocketStream } = require('ws');
const NAME = process.env.NAME || os.hostname();
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
console.log("甬哥Github项目  ：github.com/yonggekkk");
console.log("甬哥Blogger博客 ：ygkkk.blogspot.com");
console.log("甬哥YouTube频道 ：www.youtube.com/@ygkkk");
console.log("Nodejs真一键无交互Vless代理脚本");
console.log("当前版本：25.6.9");
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
async function getVariableValue(variableName, defaultValue) {
    const envValue = process.env[variableName];
    if (envValue) {
        return envValue; 
    }
    if (defaultValue) {
        return defaultValue; 
    }
  let input = '';
  while (!input) {
    input = await ask(`请输入${variableName}: `);
    if (!input) {
      console.log(`${variableName}不能为空，请重新输入!`);
    }
  }
  return input;
}
function ask(question) {
    const rl = require('readline').createInterface({ input: process.stdin, output: process.stdout });
    return new Promise(resolve => rl.question(question, ans => { rl.close(); resolve(ans.trim()); }));
}
async function main() {
    const UUID = await getVariableValue('UUID', ''); // 为保证安全隐蔽，建议留空，可在Node.js界面下的环境变量添加处（Environment variables）,点击ADD VARIABLE，修改变量
    console.log('你的UUID:', UUID);

    const PORT = await getVariableValue('PORT', '');// 为保证安全隐蔽，建议留空，可在Node.js界面下的环境变量添加处（Environment variables）,点击ADD VARIABLE，修改变量
    console.log('你的端口:', PORT);

    const DOMAIN = await getVariableValue('DOMAIN', '');// 为保证安全隐蔽，建议留空，可在Node.js界面下的环境变量添加处（Environment variables）,点击ADD VARIABLE，修改变量
    console.log('你的域名:', DOMAIN);

    const COUNTRY = await getVariableValue('COUNTRY', '');// 为保证安全隐蔽，建议留空，可在Node.js界面下的环境变量添加处（Environment variables）,点击ADD VARIABLE，修改变量
    console.log('IP国家:', COUNTRY);

    const WEBNAME = await getVariableValue('WEBNAME', '');// 为保证安全隐蔽，建议留空，可在Node.js界面下的环境变量添加处（Environment variables）,点击ADD VARIABLE，修改变量
    console.log('此产品名:', WEBNAME);

    const YXDOMAIN01 = await getVariableValue('YXDOMAIN01', '');// 为保证安全隐蔽，建议留空，可在Node.js界面下的环境变量添加处（Environment variables）,点击ADD VARIABLE，修改变量
    console.log('优选域名01:', YXDOMAIN01);

    const YXDOMAIN02 = await getVariableValue('YXDOMAIN02', '');// 为保证安全隐蔽，建议留空，可在Node.js界面下的环境变量添加处（Environment variables）,点击ADD VARIABLE，修改变量
    console.log('优选域名02:', YXDOMAIN02);

    const YXDOMAIN03 = await getVariableValue('YXDOMAIN03', '');// 为保证安全隐蔽，建议留空，可在Node.js界面下的环境变量添加处（Environment variables）,点击ADD VARIABLE，修改变量
    console.log('优选域名03:', YXDOMAIN03);

    const YXDOMAIN04 = await getVariableValue('YXDOMAIN04', '');// 为保证安全隐蔽，建议留空，可在Node.js界面下的环境变量添加处（Environment variables）,点击ADD VARIABLE，修改变量
    console.log('优选域名04:', YXDOMAIN04);

    const YXDOMAIN05 = await getVariableValue('YXDOMAIN05', '');// 为保证安全隐蔽，建议留空，可在Node.js界面下的环境变量添加处（Environment variables）,点击ADD VARIABLE，修改变量
    console.log('优选域名05:', YXDOMAIN05);

    const httpServer = http.createServer((req, res) => {
        if (req.url === '/') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Hello, World-YGkkk\n');
        } else if (req.url === `/${UUID}`) {
            let vlessURL;
            if (NAME.includes('server') || NAME.includes('hostypanel')) {
            vlessURL = `vless://${UUID}@${DOMAIN}:443?encryption=none&security=tls&sni=${DOMAIN}&fp=chrome&type=ws&host=${DOMAIN}&path=%2F#Vl-${WEBNAME}-${COUNTRY}
vless://${UUID}@${YXDOMAIN01}:443?encryption=none&security=tls&sni=${DOMAIN}&fp=chrome&type=ws&host=${DOMAIN}&path=%2F#Vl-${WEBNAME}-${YXDOMAIN01}-${COUNTRY}
vless://${UUID}@${YXDOMAIN02}:443?encryption=none&security=tls&sni=${DOMAIN}&fp=chrome&type=ws&host=${DOMAIN}&path=%2F#Vl-${WEBNAME}-${YXDOMAIN02}-${COUNTRY}
vless://${UUID}@${YXDOMAIN03}:443?encryption=none&security=tls&sni=${DOMAIN}&fp=chrome&type=ws&host=${DOMAIN}&path=%2F#Vl-${WEBNAME}-${YXDOMAIN03}-${COUNTRY}
vless://${UUID}@${YXDOMAIN04}:443?encryption=none&security=tls&sni=${DOMAIN}&fp=chrome&type=ws&host=${DOMAIN}&path=%2F#Vl-${WEBNAME}-${YXDOMAIN04}-${COUNTRY}
vless://${UUID}@${YXDOMAIN05}:443?encryption=none&security=tls&sni=${DOMAIN}&fp=chrome&type=ws&host=${DOMAIN}&path=%2F#Vl-${WEBNAME}-${YXDOMAIN05}-${COUNTRY}
`;
        } else {
            vlessURL = `vless://${UUID}@${DOMAIN}:443?encryption=none&security=tls&sni=${DOMAIN}&fp=chrome&type=ws&host=${DOMAIN}&path=%2F#Vl-ws-tls-${NAME}`;
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(vlessURL + '\n');
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found\n');
        }
    });

    httpServer.listen(PORT, () => {
        console.log(`HTTP Server is running on port ${PORT}`);
    });

    const wss = new WebSocket.Server({ server: httpServer });
    const uuid = UUID.replace(/-/g, "");
    wss.on('connection', ws => {
        ws.once('message', msg => {
            const [VERSION] = msg;
            const id = msg.slice(1, 17);
            if (!id.every((v, i) => v == parseInt(uuid.substr(i * 2, 2), 16))) return;
            let i = msg.slice(17, 18).readUInt8() + 19;
            const port = msg.slice(i, i += 2).readUInt16BE(0);
            const ATYP = msg.slice(i, i += 1).readUInt8();
            const host = ATYP == 1 ? msg.slice(i, i += 4).join('.') :
                (ATYP == 2 ? new TextDecoder().decode(msg.slice(i + 1, i += 1 + msg.slice(i, i + 1).readUInt8())) :
                    (ATYP == 3 ? msg.slice(i, i += 16).reduce((s, b, i, a) => (i % 2 ? s.concat(a.slice(i - 1, i + 1)) : s), []).map(b => b.readUInt16BE(0).toString(16)).join(':') : ''));
            ws.send(new Uint8Array([VERSION, 0]));
            const duplex = createWebSocketStream(ws);
            net.connect({ host, port }, function () {
                this.write(msg.slice(i));
                duplex.on('error', () => { }).pipe(this).on('error', () => { }).pipe(duplex);
            }).on('error', () => { });
        }).on('error', () => { });
    });
console.log(`vless-ws-tls节点分享: vless://${UUID}@${DOMAIN}:443?encryption=none&security=tls&sni=${DOMAIN}&fp=chrome&type=ws&host=${DOMAIN}&path=%2F#Vl-ws-tls-${NAME}`);
}
main();
