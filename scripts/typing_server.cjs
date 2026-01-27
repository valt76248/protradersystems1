const http = require('http');
const { exec } = require('child_process');

const PORT = 5005;

function escapeSendKeys(text) {
    return text.replace(/[\{\}\[\]\(\)\+\^\%\~\\]/g, '{$&}')
        .replace(/'/g, "''");
}

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                const { text } = JSON.parse(body);
                if (!text) {
                    res.writeHead(400);
                    return res.end('No text provided');
                }

                console.log(`\n[${new Date().toLocaleTimeString()}] Текст получен. Печать через 1 сек...`);

                setTimeout(() => {
                    console.log(`!!! ПЕЧАТАЮ !!!`);

                    const psScript = `
                [Console]::Beep(440, 100);
                Add-Type -AssemblyName System.Windows.Forms;
                [System.Windows.Forms.SendKeys]::SendWait('${escapeSendKeys(text)}');
            `.replace(/\n/g, ' ');

                    const command = `powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "${psScript}"`;

                    exec(command, (err) => {
                        if (err) console.error('Ошибка:', err);
                        else console.log('Готово!');
                    });
                }, 1000);

                res.writeHead(200);
                res.end('OK');
            } catch (e) {
                res.writeHead(400);
                res.end('Invalid JSON');
            }
        });
    } else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`\n==============================================`);
    console.log(`   ФИНАЛЬНЫЙ СЕРВЕР ПЕЧАТИ (ЗАДЕРЖКА 1 СЕК)`);
    console.log(`==============================================`);
    console.log(`1. Диктуешь голос в Telegram.`);
    console.log(`2. Ставишь курсор на ПК.`);
    console.log(`3. Через 1 секунду после получения - ТЕКСТ ТУТ!`);
    console.log(`==============================================\n`);
});
