import { MongoClient } from "mongodb";



// /api/new-meetups
// POST /api/new-meetups

async function handler(req,res){
    if(req.method ==="POST"){
       const data = req.body;
       console.log(data)
   const client = await MongoClient.connect("mongodb+srv://abenezer:abenezer@cluster0.xgj2mxp.mongodb.net/?retryWrites=true&w=majority")

   const db = client.db()
  //  console.log(client)
  console.log('connected')
   const meetupCollections = db.collection('meetups')
    
   const result = await meetupCollections.insertOne(data)
    //  console.log(result)

     client.close()


     res.status(201).json({message:"Inseted succesfully"})
    }

}

export default handler