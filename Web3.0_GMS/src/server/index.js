const express = require('express');
const app = express();
const PORT = process.env.PORT || 4001;
const db = require('./config/db')
const cors = require("cors");
const bodyParser = require('body-parser');

app.use(cors());
app.get('/', (req, res)=>{
    console.log('/root');
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/a_dashboard/a_home', (req, res)=>{
    // console.log('/a_dashboard/a_home')
    db.query("select * from Teach", (err, data) => {
        if(!err) {
            console.log(data)
        }
        else {
            console.log(err)
        }
        res.send(data)
    })
})

app.get('/a_dashboard/a_studentlist', (req, res)=>{
    // console.log('/a_dashboard/a_studentlist')
    db.query("select * from TakeStudents where profID Like '12345'", (err, data) => {
        if(!err) {
            console.log(data)
        }
        else {
            console.log(err)
        }
        res.send(data)
    })
})

app.get('/dashboard/home', (req, res)=>{
    // console.log('/dashboard/home')
    db.query("select * from Course", (err, data) => {
        if(!err) {
            console.log(data)
        }
        else {
            console.log(err)
        }
        res.send(data)
    })
})
// app.get('/a_dashboard/a_tokenmanage',(req, res)=>{
//     console.log('/a_dashboard/a_tokenmanage')
//     db.query("select * from TokenInfo",(err,data) => {
//         if(!err){
//             console.log(data)
//         }
//         else {
//             console.log(err)
//         }
//         res.send(data)
//     })
// })

app.get('/a_dashboard/a_tokenmanage', (req, res)=>{
    console.log('/a_dashboard/a_tokenmanage')
    db.query("select * from TokenInfo", (err, data) => {
        if(!err) {
            console.log(data)
        }
        else {
            console.log(err)
        }
        res.send(data)
    })
})
app.post('/a_dashboard/a_tokenmanage', (req, res)=>{
    const courseName = req.body.courseName;
    const section = req.body.section;
    const type = req.body.type;
    const tokenName = req.body.tokenName;
    // const submitNum = req.body.submitNum;
    const totalScore = req.body.totalScore;

    console.log('/a_dashboard/a_tokenmanage')
    db.query("INSERT INTO TokenInfo (courseName, section, type, tokenName, totalScore) VALUES(?, ?, ?, ?, ?)", 
            [courseName, section, type, tokenName, totalScore], function(err, rows, fields) {
        if(!err) {
            console.log("DB저장 성공!!!");
            res.sendStatus(200);
        } else {
            console.log("DB저장 실패…")
            res.sendStatus(500);
        }
    });
});
app.delete('/a_dashboard/a_tokenmanage/:id', (req, res) => {
    const tokenId = req.params.id;
    console.log(`Delete Token ID : ${tokenId}`);
    db.query("DELETE FROM TokenInfo WHERE tokenID = ?", [tokenId], (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        console.log(`Deleted Token ID : ${tokenId}`);
        res.sendStatus(200);
      }
    });
});
app.listen(PORT, ()=>{
    console.log(`Server On : http://localhost:${PORT}`)
})