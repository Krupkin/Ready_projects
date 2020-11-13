
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require("fs");

const port = process.env.PORT || 5000;

app.use(express.static(__dirname + "/build/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))



app.get(/.*/, function (req, res) {
    res.sendFile(__dirname + '/build/index.html');
});

function parseFuckingData({userDataName, readyAnswers}){
    const name = `${userDataName.name}_${userDataName.secondName}_${userDataName.fatherName}`;
    const innerHtml = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300;700&display=swap" rel="stylesheet">
    <title>${name}</title>
</head>
<body>
    <header>
        <h3 class="header-title-name">${name}</h3>
        <h3 class="header-veracity"> ${readyAnswers.verResultString.veracity} </h3>
    </header>
    <main>
        <div class="result-block">
            <span class="result-block-title">${readyAnswers.OAPresultString.name}</span>
            <div class="result-block-score">
                <span class="score-stan">${readyAnswers.OAPresultString.stans} стени</span>
                <span class="score-mark">(${readyAnswers.OAPresultString.mark} балів)</span>
            </div>
            <span class="OAPresult-answer">${readyAnswers.OAPresultString.anwer}</span>
        </div>

        <div class="result-block">
            <span class="result-block-title">${readyAnswers.PRresultString.name}</span>
            <div class="result-block-score">
                <span class="score-stan">${readyAnswers.PRresultString.stans} стени</span>
                <span class="score-mark">(${readyAnswers.PRresultString.mark} балів)</span>
            </div>
            <span class="OAPresult-answer">${readyAnswers.PRresultString.anwer}</span>
        </div>

        <div class="result-block">
            <span class="result-block-title">${readyAnswers.KPresultString.name}</span>
            <div class="result-block-score">
                <span class="score-stan">${readyAnswers.KPresultString.stans} стени</span>
                <span class="score-mark">(${readyAnswers.KPresultString.mark} балів)</span>
            </div>
            <span class="OAPresult-answer">${readyAnswers.KPresultString.anwer}</span>
        </div>
                
        <div class="result-block">
            <span class="result-block-title">${readyAnswers.MNresultString.name}</span>
            <div class="result-block-score">
                <span class="score-stan">${readyAnswers.MNresultString.stans} стени</span>
                <span class="score-mark">(${readyAnswers.MNresultString.mark} балів)</span>
            </div>
            <span class="OAPresult-answer">${readyAnswers.MNresultString.anwer}</span>
        </div>
                
        <div class="result-block">
            <span class="result-block-title">${readyAnswers.VPSresultString.name}</span>
            <div class="result-block-score">
                <span class="score-stan">${readyAnswers.VPSresultString.stans} стени</span>
                <span class="score-mark">(${readyAnswers.VPSresultString.mark} балів)</span>
            </div>
            <span class="OAPresult-answer">${readyAnswers.VPSresultString.anwer}</span>
        </div>
                
        <div class="result-block">
            <span class="result-block-title">${readyAnswers.DAPresultString.name}</span>
            <div class="result-block-score">
                <span class="score-stan">${readyAnswers.DAPresultString.stans} стени</span>
                <span class="score-mark">(${readyAnswers.DAPresultString.mark} балів)</span>
            </div>
            <span class="OAPresult-answer">${readyAnswers.DAPresultString.anwer}</span>
        </div>
                
        <div class="result-block">
            <span class="result-block-title">${readyAnswers.SresultString.name}</span>
            <div class="result-block-score">
                <span class="score-stan">${readyAnswers.SresultString.stans} стени</span>
                <span class="score-mark">(${readyAnswers.SresultString.mark} балів)</span>
            </div>
            <span class="OAPresult-answer">${readyAnswers.SresultString.anwer}</span>
        </div>
    </main>
    </body>
</html>
    `
    return innerHtml
}

app.post("/api", (req, res) => {
    const result = parseFuckingData(req.body)
    res.send("TEXT").then(
        fs.writeFile(`${req.body.userDataName.name}_${req.body.userDataName.secondName}_${req.body.userDataName.fatherName}.html`, result, function(error){
 
        if(error) throw error; // если возникла ошибка
        console.log("Асинхронная запись файла завершена. Содержимое файла:");
        let data = fs.readFileSync(`${req.body.userDataName.name}_${req.body.userDataName.secondName}_${req.body.userDataName.fatherName}.html`, "utf8");
        console.log(`${req.body.userDataName.name}_${req.body.userDataName.secondName}_${req.body.userDataName.fatherName}`);  // выводим считанные данные
    }));
})

app.listen(port, function(){
    console.log(`Express server listening on port ${port}`)
});