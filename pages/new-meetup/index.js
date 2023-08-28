import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import React from "react";

const NewMeetUp = () => {
  const addMeetupHandler = async (meetUpData) => {
    const response = await fetch(`/api/new-meetup`, {
      method: "POST",
      body: JSON.stringify(meetUpData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
  };
  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default NewMeetUp;
