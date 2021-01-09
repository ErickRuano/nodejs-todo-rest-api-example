const auth = require('./auth.routes')
const join = require('./join.routes')
const webhook = require('./webhooks/webhook.routes')
const organization  = require('./organization.routes')
const user  = require('./user.routes')
const task  = require('./task.routes')
const task_log  = require('./task_log.routes')

module.exports = {
    auth,
    join,
    webhook,
    organization,
    user,
    task,
    task_log
}