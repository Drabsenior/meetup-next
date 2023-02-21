import { useRouter } from 'next/router'
import React from 'react'
import NewMeetupForm from '../components/meetups/NewMeetupForm'

const newmeetup = () => {
  const router = useRouter()
  async function addMeetUpHandler (enteredMeetupData){
     const response = await fetch('/api/new-meetups',{
      method:'POST',
      body:JSON.stringify(enteredMeetupData),
      headers:{
        "Content-Type":"application/json"
      }
     })
     const data = await response.json()

     console.log(data)
     router.push("/")

    }
  return (
   <NewMeetupForm onAddMeetup={addMeetUpHandler}/>
  )
}

export default newmeetup