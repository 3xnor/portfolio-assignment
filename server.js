// server.js
const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

// EJS 설정
app.set('view engine', 'ejs');
app.use(express.static('public'));

// DB 연결 
const db = mysql.createConnection({
    host: 'localhost',      
    user: 'root',           
    password: 'rootroot',   
    database: 'my_portfolio'
});

db.connect((err) => {
    if (err) {
        console.error('DB 연결 실패...: ', err);
        return;
    }
    console.log('DB 연결 성공했습니다!');
});

// 메인 페이지 라우트
app.get('/', (req, res) => {
    // 프로필과 프로젝트 데이터를 다 가져옵니다
    const query1 = 'SELECT * FROM profile LIMIT 1';
    const query2 = 'SELECT * FROM projects';

    db.query(query1, (err, profileResult) => {
        if (err) throw err;
        db.query(query2, (err, projectsResult) => {
            if (err) throw err;
            res.render('index', { 
                profile: profileResult[0], 
                projects: projectsResult 
            });
        });
    });
});

app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 대기 중입니다!`);
});