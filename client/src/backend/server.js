const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 連接MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'blockchain'
});

const sha1 = (data) => {
    return crypto.createHash('sha1').update(data).digest('hex');
};

// 驗證登入密碼
app.post('/verify', (req, res) => {
    
    const { Manufacturer_Address, Password } = req.body;
    const hashedPassword = sha1(Password)
    // 查詢地址和密碼是否存在
    connection.query('SELECT * FROM user WHERE UserAddr = ? AND UserPassword = ?', [Manufacturer_Address, hashedPassword], (error, results, fields) => {
        if (error) throw error;
        if (results.length > 0) {
            res.send({ isValid: true });
            console.log(results);
        } else {
            res.send({ isValid: false });
        }
    });
});
// 註冊公司名稱和密碼
app.post('/register', (req, res) => {
    const { CompanyName, CompanyId, Password } = req.body;
    const hashedPassword = sha1(Password)

    connection.query('INSERT INTO user (UserName, UserAddr, UserPassword) VALUES (?, ?, ?)', [CompanyName, CompanyId, hashedPassword], (error, results) => {
        if (error) {
            throw error;
        }
        res.send({ isValid: true });
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
