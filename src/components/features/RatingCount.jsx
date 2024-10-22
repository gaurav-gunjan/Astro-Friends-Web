import { StarSvg } from "../../assets/svg";

const RatingCount = ({ rating }) => {
    const generateStars = (rating) => {
        const starCount = Math.round(rating);
        const stars = [];
        for (let i = 0; i < starCount; i++) {
            stars.push(<StarSvg key={i} />);
        }
        return stars;
    };

    return <div className="flex">{generateStars(rating)}</div>;
};

export default RatingCount;