
import express from 'express';
import ndoemailer from 'nodemailer';
import {fileURLToPath} from 'url';
import path from 'path';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(`${__dirname}/static`));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/static/index.html`);
})

app.post('/send', (req, res) => {
    
    const to = req.body.to;
    const subject = req.body.subject;
    const text = req.body.text;

    const transport = ndoemailer.createTransport({
        'service': 'gmail',
        auth: {
            user: 'anonymousmailer1337@gmail.com',
            pass: 'mailer1337'
        }
    });
    
    const options = {
        from: 'anonymousmailer1337@gmail.com',
        to,
        subject,
        text
    }
    
    transport.sendMail(options, (err, info) => {
    
        if(err){
            console.log(err);
        } else{
            res.redirect('/');
        }
    
    })

})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}...`);
})