import { exec } from 'child_process';
import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Random ID generator
function makeID(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

function convertToCSS(){
    // Generate a random ID to avoid conflicts
    const id = makeID(5);
    return new Promise((resolve, reject) => {
        exec(`npx tailwindcss -o ./css-${id}.css`, async (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                reject(error);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }

            const filePath = join(__dirname, `css-${id}.css`);

            try {
                await fs.access(filePath); // Check if file exists
                let data = await fs.readFile(filePath, 'utf8');

                // Trim the first 100 lines
                // This is a workaround for the fact that tailwindcss outputs a lot of unnecessary CSS variables
                let lines = data.split('\n');
                lines = lines.slice(100);
                data = lines.join('\n');
                console.log("Data: \n", data);

                // Write the trimmed data back to the file
                await fs.writeFile(filePath, data, 'utf8');

                resolve(data);
            } catch (err) {
                console.error("Error reading file:", err);
                reject(err);
            }
        });
    });
}

const app = express();
// app.use(express.json());
app.use(express.text());

app.post("/api/convert", async function (req, res) {

    if(!req.body) return res.sendStatus(400);

    const html = req.body;

    const filePath = join(__dirname, `html-${makeID(5)}.html`);
    try {
        await fs.writeFile(filePath, html, 'utf8');
    } catch (err) {
        console.error("Error reading file:", err);
    }

    let css = '';
    try {
        css = await convertToCSS();
    }
    catch(err) {
        console.error("Error converting to Tailwind:", err);
    }

    await res.send(css);

});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});