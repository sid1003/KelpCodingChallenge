import { dbConnectionTest } from './db/index.js'
import { app } from './app.js'

const port = process.env.PORT || 8000

dbConnectionTest()
.then(()=>{
    app.listen(port, () => {
        console.log(`\n⚙️  Server is running at port : ${port} \n`);
    })
})
.catch((err) => {
    console.error('Error connecting to the database', err);
})

