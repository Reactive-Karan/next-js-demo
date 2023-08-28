import MeetUpDetail from "@/components/meetups/MeetUpDetails";
import { MongoClient, ObjectId } from "mongodb";

const MeetUpDetails = (props) => {
  return (
    <>
      <MeetUpDetail
        title={props.meetingData.title}
        image={props.meetingData.image}
        address={props.meetingData.address}
        description={props.meetingData.description}
      />
    </>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://karanmishra224:k5elXu8FSVQJ0Ije@cluster0.rwkrsip.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://karanmishra224:k5elXu8FSVQJ0Ije@cluster0.rwkrsip.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const convertIdToObjectId = new ObjectId(meetupId);

  const selectedMeetup = await meetupsCollection.findOne({
    _id: convertIdToObjectId,
  });

  client.close();
  console.log(selectedMeetup);
  return {
    props: {
      meetingData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        adress: selectedMeetup.address,
        description: selectedMeetup.description,
        image: selectedMeetup.image,
      },
    },
  };
}

export default MeetUpDetails;
