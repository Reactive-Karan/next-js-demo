import MeetupList from "@/components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

const DUMMY_LIST = [
  {
    id: "m1",
    title: "A first Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Rome_Skyline_%288012016319%29_%28cropped%29.jpg/1920px-Rome_Skyline_%288012016319%29_%28cropped%29.jpg",
    address: "Some address 123, Berlin Topless city, Germany",
    description: "This is a first Meetup",
  },
  {
    id: "m2",
    title: "A second Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Rome_Skyline_%288012016319%29_%28cropped%29.jpg/1920px-Rome_Skyline_%288012016319%29_%28cropped%29.jpg",
    address: "Some address 123, Berlin Topless city, Germany",
    description: "This is a first Meetup",
  },
  {
    id: "m3",
    title: "A third Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Rome_Skyline_%288012016319%29_%28cropped%29.jpg/1920px-Rome_Skyline_%288012016319%29_%28cropped%29.jpg",
    address: "Some address 123, Berlin Topless city, Germany",
    description: "This is a first Meetup",
  },
];

export default function Home(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="This is a huge list of react meetups"
        />
      </Head>
      <MeetupList meetups={props.meetUps} />;
    </>
  );
}

//Dont need to revalidate the data on manual basis but need to wait for the data to be called and rendered
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetUps: DUMMY_LIST,
//     },
//   };
// }

//Can take advantages of caching
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://karanmishra224:k5elXu8FSVQJ0Ije@cluster0.rwkrsip.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetUps: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    //Regenerates the data of the server
    revalidate: 10,
  };
}
