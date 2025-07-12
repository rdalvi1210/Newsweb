const NewsItem = ({
  title = "Untitled",
  description = "No description available.",
  imageUrl,
  newsUrl = "#",
  author = "Unknown",
  date,
  source = "Unknown",
}) => {
  const defaultImage =
    "https://tse2.mm.bing.net/th?id=OIP.3vwSl2HNBnDvKieP-hxTBQHaFl&pid=Api&P=0&h=180";

  const clampTitleStyle = {
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const clampDescriptionStyle = {
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  return (
    <div className="my-3">
      <div className="card position-relative">
        <span
          className="badge rounded-pill bg-danger position-absolute"
          style={{ right: "0.5rem", top: "0.5rem" }}
        >
          {source}
        </span>
        <img
          src={imageUrl || defaultImage}
          className="card-img-top"
          alt={title}
        />
        <div className="card-body">
          <h5 className="card-title" style={clampTitleStyle}>
            {title}
          </h5>
          <p className="card-text" style={clampDescriptionStyle}>
            {description}
          </p>
          <p className="card-text">
            <small className="text-muted">
              By {author} on{" "}
              {date ? new Date(date).toGMTString() : "Unknown date"}
            </small>
          </p>
          <a
            href={newsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
