
// const express = require('express');
// const redis = require('redis');

// const app = express();
// const port = process.env.PORT || 3000;

// // Create Redis client
// const client = redis.createClient();

// client.on('connect', () => {
//     console.log('Connected to Redis');
// });

// // Middleware
// app.use(express.json());

// // Routes
// // Create a new task
// app.post('/tasks', (req, res) => {
//     const { title, description, status } = req.body;
//     const taskId = `task_${Date.now()}`;

//     client.hmset(taskId, ['title', title, 'description', description, 'status', status], (err, reply) => {
//         if (err) {
//             console.error(err);
//             res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//             res.status(201).json({ message: 'Task created successfully', taskId });
//         }
//     });
// });

// // Get all tasks
// app.get('/tasks', async (req, res) => {
//     try {
//         const taskIds = await new Promise((resolve, reject) => {
//             client.keys('task_*', (err, reply) => {
//                 if (err) {
//                     console.error(err);
//                     reject(err);
//                 } else {
//                     resolve(reply);
//                 }
//             });
//         });

//         const tasks = await Promise.all(taskIds.map(async taskId => {
//             const task = await new Promise((resolve, reject) => {
//                 client.hgetall(taskId, (err, reply) => {
//                     if (err) {
//                         console.error(err);
//                         reject(err);
//                     } else {
//                         resolve(reply);
//                     }
//                 });
//             });
//             return { id: taskId, ...task };
//         }));

//         res.json(tasks);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Delete a task
// app.delete('/tasks/:id', (req, res) => {
//     const taskId = req.params.id;

//     client.del(taskId, (err, reply) => {
//         if (err) {
//             console.error(err);
//             res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//             res.json({ message: 'Task deleted successfully', taskId });
//         }
//     });
// });

// // Update a task
// app.put('/tasks/:id', (req, res) => {
//     const taskId = req.params.id;
//     const { title, description, status } = req.body;

//     console.log('Received title:', title);
//     console.log('Received description:', description);
//     console.log('Received status:', status);

//     client.hmset(taskId, 'title', title, 'description', description, 'status', status, (err, reply) => {
//         if (err) {
//             console.error(err);
//             res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//             if (reply === 0) {
//                 res.status(404).json({ error: 'Task not found' });
//             } else {
//                 res.json({ message: 'Task updated successfully', taskId });
//             }
//         }
//     });
// });

// app.put('/tasks/:id/status', (req, res) => {
//     const taskId = req.params.id;
//     const { status } = req.body;

//     // Check if status is defined
//     if (typeof status === 'undefined') {
//         return res.status(400).json({ error: 'Status is required' });
//     }

//     console.log('Received status:', status);

//     client.hexists(taskId, 'status', (err, reply) => {
//         if (err) {
//             console.error(err);
//             res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//             if (reply === 1) {
//                 // Convert status to string if necessary
//                 const statusString = String(status);
//                 client.hset(taskId, 'status', statusString, (err, reply) => {
//                     if (err) {
//                         console.error(err);
//                         res.status(500).json({ error: 'Internal Server Error' });
//                     } else {
//                         res.json({ message: 'Task status updated successfully', taskId });
//                     }
//                 });
//             } else {
//                 res.status(404).json({ error: 'Task not found' });
//             }
//         }
//     });
// });
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

// index.js

const express = require('express');
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors');
const app = express();
app.use(cors());
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});