import classes from "./MeetUpDetail.module.css";

const MeetUpDetail = (props) => {
  return (
    <div className={classes.details}>
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </div>
  );
};

export default MeetUpDetail;
