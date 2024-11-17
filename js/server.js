const express = require('express');
const mongoose = require('mongoose');
const app = express();

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB 연결 성공'))
    .catch(err => console.error('MongoDB 연결 실패:', err));

// 사용자 스키마 정의
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// POST 요청 핸들링
app.use(express.json());

// 회원가입
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save(); // 데이터베이스에 저장
        res.status(201).send('회원가입 성공!');
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).send('이미 존재하는 사용자입니다.');
        } else {
            res.status(500).send('서버 오류: ' + error.message);
        }
    }
});

// 로그인
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password }); // 데이터베이스에서 조회
    if (!user) {
        return res.status(400).send('아이디 또는 비밀번호가 잘못되었습니다.');
    }
    res.status(200).send('로그인 성공!');
});

app.listen(3000, () => console.log('서버 실행 중: http://localhost:3000'));
