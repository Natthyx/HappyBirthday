/* eslint-disable react/prop-types */


const ShowCard = ({ image, title, onClick }) => {
    return (
        <div className="show-card" onClick={onClick}>
            <img src={image} alt={title} />
            <h4>{title}</h4>
        </div>
    );
};

export default ShowCard;
