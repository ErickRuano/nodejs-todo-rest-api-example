const organization = require('./organization.json')
const user = require('./user.json')
const task = require('./task.json')
const task_log = require('./task_log.json')


module.exports = [
    { id : "organization", data : organization },
    { id : "user", data : user },
    { id : "task", data : task },
    { id : "task_log", data : task_log },
]