import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'travel_desk',
});

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const [result] = await pool.execute(
      'INSERT INTO users (email, password_hash, first_name, last_name) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, firstName, lastName]
    );
    
    // Generate access token after successful signup
    const access_token = jwt.sign(
      { userId: result.insertId },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    
    res.status(201).json({ 
      message: 'User created successfully',
      access_token 
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    if (!rows[0]) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const validPassword = await bcrypt.compare(password, rows[0].password_hash);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    res.json({ message: 'Logged in successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 