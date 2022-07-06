import { MongoClient, Db, Collection } from 'mongodb'

export const collections: { users?: Collection } = {}

const connect = async () => {
    try {
        if (!process.env.MONGO_URI || !process.env.MONGO_DATABASE) {
            throw 'Database error'
        }

        const client: MongoClient = new MongoClient(process.env.MONGO_URI)

        await client.connect()
        console.log('connected')
        const db: Db = client.db(process.env.MONGO_DATABASE)
        const usersCollection: Collection = db.collection('users')
        
        collections.users = usersCollection
        
    } catch (error) {
        console.log('error db connection', error)
    }
}

export default {
    connect,
}
