import { MongoClient, ObjectId } from 'mongodb'
import React from 'react'
import MeetupDetail from '../components/meetups/MeetupDetail'

const Detailmeetup = (props) => {
  return (
    <MeetupDetail title={props.meetupdata.title} image={props.meetupdata.image} address={props.meetupdata.address} description={props.meetupdata.description}/>
  )

}
export async function getStaticPaths(){
   const client = await MongoClient.connect("mongodb+srv://abenezer:abenezer@cluster0.xgj2mxp.mongodb.net/?retryWrites=true&w=majority")

   const db = client.db()
  //  console.log(client)
  console.log('connected')
   const meetupCollections = db.collection('meetups')

   const meetups = await meetupCollections.find({},{_id:1}).toArray()
   client.close()
    return{
      fallback:true,
      paths: meetups.map((id)=>({
        params:{meetupId:id._id.toString()}
      }))
    }

}
export async function getStaticProps(context){

  const meetupId=context.params.meetupId
  //fetch data for a single item 
   const client = await MongoClient.connect("mongodb+srv://abenezer:abenezer@cluster0.xgj2mxp.mongodb.net/?retryWrites=true&w=majority")

   const db = client.db()
   
   const meetupCollections = db.collection('meetups')

   const selectedMeetup = await meetupCollections.findOne({_id: new ObjectId(meetupId)})
  console.log(selectedMeetup)

  return {
    props:{
      meetupdata:{
        id:selectedMeetup._id.toString(),
        title:selectedMeetup.title,
        image:selectedMeetup.image,
        address:selectedMeetup.address,
        description:selectedMeetup.description
      }
    }
  }
}

export default Detailmeetup