/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function NoteCard(props){
    return(
        <div className="note-card">
        <Link to={`/note/${props.id}`}>
        <img className="note-img" src={props.cover} alt="note" />
        <div className="note-con">
        <span className="note-title">{props.title}</span>
        <h6 className="note-date">{props.date}</h6></div>
        </Link>
        </div>
    )
}

export default  NoteCard;