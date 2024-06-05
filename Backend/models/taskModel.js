const redisClient = require('./redisClient');

const Task = {
  create: (title, description, status, callback) => {
    const taskId = `task_${Date.now()}`;
    redisClient.hmset(taskId, ['title', title, 'description', description, 'status', status], (err, reply) => {
      if (err) {
        console.error(err);
        callback(err);
      } else {
        callback(null, taskId);
      }
    });
  },

  getAll: (callback) => {
    redisClient.keys('task_*', (err, reply) => {
      if (err) {
        console.error(err);
        callback(err);
      } else {
        const tasks = [];
        reply.forEach(taskId => {
          redisClient.hgetall(taskId, (err, task) => {
            if (err) {
              console.error(err);
            } else {
              tasks.push({ id: taskId, ...task });
            }
            // Check if all tasks have been fetched
            if (tasks.length === reply.length) {
              callback(null, tasks);
            }
          });
        });
      }
    });
  },

  updateStatus: (taskId, status, callback) => {
    redisClient.hexists(taskId, 'status', (err, reply) => {
      if (err) {
        console.error(err);
        callback(err);
      } else {
        if (reply === 1) {
          redisClient.hset(taskId, 'status', status, (err, reply) => {
            if (err) {
              console.error(err);
              callback(err);
            } else {
              callback(null);
            }
          });
        } else {
          callback(new Error('Task not found'));
        }
      }
    });
  },
  update: (taskId, newData, callback) => {
    redisClient.exists(taskId, (err, exists) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      if (!exists) {
        const error = new Error('Task not found');
        console.error(error);
        return callback(error);
      }

      // Convert newData object to array of field-value pairs
      const updateData = Object.entries(newData).reduce((acc, [key, value]) => {
        acc.push(key, value);
        return acc;
      }, []);

      // Perform the HMSET operation to update task details
      redisClient.hmset(taskId, updateData, (err, reply) => {
        if (err) {
          console.error(err);
          callback(err);
        } else {
          callback(null, reply);
        }
      });
    });
  },

  delete: (taskId, callback) => {
    redisClient.del(taskId, (err, reply) => {
      if (err) {
        console.error(err);
        callback(err);
      } else {
        if (reply === 1) {
          callback(null);
        } else {
          callback(new Error('Task not found'));
        }
      }
    });
  }
};

module.exports = Task;