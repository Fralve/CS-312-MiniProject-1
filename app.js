const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// In-memory storage for blog posts
let posts = [];

// Routes

// Home - Display posts and create form
app.get('/', (req, res) => {
    res.render('index', { posts });
});

// Create new post
app.post('/create', (req, res) => {
    const { name, title, content } = req.body;
    const newPost = {
        id: Date.now(), // unique ID
        name,
        title,
        content,
        date: new Date().toLocaleString()
    };
    posts.push(newPost);
    res.redirect('/');
});

// Delete post
app.post('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    posts = posts.filter(post => post.id !== id);
    res.redirect('/');
});

// Edit post form
app.get('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    if (!post) return res.redirect('/');
    res.render('edit', { post });
});

// Update post
app.post('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, title, content } = req.body;
    const post = posts.find(p => p.id === id);
    if (post) {
        post.name = name;
        post.title = title;
        post.content = content;
        post.date = new Date().toLocaleString();
    }
    res.redirect('/');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
