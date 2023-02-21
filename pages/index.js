import { MongoClient } from "mongodb"
import Link from "next/link"
import { useEffect, useState } from "react"
import MeetupList from "../components/meetups/MeetupList"

const DUMMY_LIST =  [
        {
            id:'m1',
            image:'https://www.planetware.com/wpimages/2019/02/germany-best-places-to-visit-cologne.jpg',
            title:'First meet up',
            description:'this is the first meet up place'
        },
        {
            id:'m2',
            image:'https://www.planetware.com/wpimages/2021/10/world-tourist-attractions-eiffel-tower-flowers-spring.jpg',
            title:'Second meet up',
            description:'this is the Second meet up place'
        }
    ]

const Homepage = (props) => {
    

  return (
   <>
  <MeetupList meetups={props.meetups}/>
   </>
  )
}

export async function getStaticProps(){
    //fetch api
   const client = await MongoClient.connect("mongodb+srv://abenezer:abenezer@cluster0.xgj2mxp.mongodb.net/?retryWrites=true&w=majority")

   const db = client.db()
  //  console.log(client)
  console.log('connected')
   const meetupCollections = db.collection('meetups')

   const meetups = await meetupCollections.find().toArray()
   console.log(meetups)

      client.close()

    return {
        props:{
            meetups: meetups.map((meetup)=>({
                id:meetup._id.toString(),
                title:meetup.title,
                image:meetup.image,
                address:meetup.address
            }))
        },
        revalidate: 1
    }
}

export default Homepage