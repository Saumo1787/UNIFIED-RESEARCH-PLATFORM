require('dotenv').config();

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access token missing' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Middleware to check admin role
function authorizeAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
}

if (!process.env.MONGO_URI) {
  console.error('MONGO_URI environment variable is not set.');
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET environment variable is not set.');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Connected to MongoDB'));

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'user' }
});

const iprSchema = new mongoose.Schema({
  title: String,
  domain: String,
  abstract: String,
  inventor: String,
  filingDate: Date,
  publicationDate: Date,
  patentNumber: String,
  status: { type: String, enum: ['filed', 'published', 'rejected'], default: 'filed' }
});

const User = mongoose.model('User', userSchema);
const Ipr = mongoose.model('Ipr', iprSchema);

app.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log('Signup request received:', { name, email, role }); // Logging input data
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new User({ name, email, password: hashedPassword, role: role || 'user' });
    await user.save();
    console.log('User saved successfully:', user); // Logging saved user
    res.status(201).send('User registered successfully');
  } catch (err) {
    console.error('Signup error:', err);
    if (err.code === 11000) {
      res.status(400).send('User with this email already exists');
    } else {
      res.status(500).send(err.message || 'Internal server error');
    }
  }
});

app.get('/ipr', authenticateToken, async (req, res) => {
  try {
    const iprs = await Ipr.find().sort({ filingDate: -1 });
    res.json(iprs);
  } catch (err) {
    console.error('Error fetching IPRs:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/ipr', authenticateToken, async (req, res) => {
  const { title, domain, abstract, inventor, filingDate, patentNumber, status } = req.body;

  try {
    const newIpr = new Ipr({
      title,
      domain,
      abstract,
      inventor: inventor || req.user.name || 'N/A',
      filingDate: filingDate ? new Date(filingDate) : new Date(),
      patentNumber: patentNumber || '',
      status: status || 'filed'
    });
    await newIpr.save();
    res.status(201).json(newIpr);
  } catch (err) {
    console.error('Error saving new IPR:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/ipr/:id/status', authenticateToken, authorizeAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const ipr = await Ipr.findById(id);
    if (!ipr) {
      return res.status(404).json({ message: 'IPR not found' });
    }
    ipr.status = status;
    await ipr.save();
    res.json({ message: 'IPR status updated', ipr });
  } catch (err) {
    console.error('Error updating IPR status:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Invalid credentials');
  }

  const token = jwt.sign({ id: user._id, role: user.role, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

const PORT = process.env.PORT || 5500;

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password field
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
