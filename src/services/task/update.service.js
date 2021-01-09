taskUpdateLog= async (ctx, record)=>{
    const create = {
        data : {
            task : {
                connect : {
                    id : record.id
                }
            },
            record,
            action : "UPDATE"
        }
    }
    if('session' in ctx){
        Object.assign(create.data, { user : { connect : { id : ctx.session.user.id } } })
    }
    return await ctx.db.taskLog.create(create)
}


const taskDBUpdate = async (ctx, data)=>{
    let query = {
        ...ctx.query,
        where : {
            id : ctx.target
        },
        data : {
        ...data,
        updatedAt : new Date()
        }
    }

    const task = await ctx.db.task.update(query)
    const logged = await taskUpdateLog(ctx, task)

    return task
}

const updateService = async (ctx)=>{

        try{

            let dataItem = JSON.parse(JSON.stringify(ctx.data))


            const task = await taskDBUpdate(ctx, dataItem)

            return task
         
           

        }catch(err){

            return {
                statusCode : 400,
                message : "One or more of your requests failed",
                error : err
            }
        }

    
  
}

module.exports = {
    updateService
}