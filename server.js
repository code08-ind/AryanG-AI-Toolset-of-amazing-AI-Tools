const PORT = 8000;
const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
const fs = require('fs');
const multer = require('multer');
const app = express();

app.use(cors());
app.use(express.json());
require('dotenv').config();

const API_KEY = process.env.API_KEY;

const configuration = new Configuration({ apiKey: API_KEY });

const openai = new OpenAIApi(configuration);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage }).single('file');

let filePath;

app.get('/', (req, res) => {
    res.send("Hello Everyone, Welcome to AryanG AI | Toolset of amazing AI Tools");
});

app.post('/completions', async (req, res) => {
    const options = {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: req.body.message }],
            max_tokens: 150,
        })
    };
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.log(error);
    }
});

app.post('/generations', async (req, res) => {
    const options = {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt: req.body.message,
            n: 4,
            size: "512x512",
        })
    };
    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', options);
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.log(error);
    }
});

app.post('/upload', async (req, res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } else if (err) {
            return res.status(200).json(err);
        }
        filePath = req.file.path;
    });
});

app.post('/variations', async (req, res) => {
    try {
        const response = await openai.createImageVariation(
            fs.createReadStream(filePath),
            4,
            "256x256"
        );
        res.send(response.data.data);
    } catch (error) {
        console.log(error);
    }
});

app.post('/query', async (req, res) => {
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: "Create A SQL Request To " + req.body.message
                }
            ]
        });
        res.send(response.data.choices[0].message);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
