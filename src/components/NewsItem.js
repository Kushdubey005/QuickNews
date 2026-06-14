import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl } = this.props;

    return (
      <div>
        <div className="card" style={{ width: "18rem", height: "26rem" }}>
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://img.magnific.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
            }
            className="card-img-top"
            alt="News"
            style={{ height: "180px", objectFit: "cover" }}
          />

          <div className="card-body">
            <h5 className="card-title">
              {title ? title.slice(0, 60) : "No Title"}
            </h5>

            <p className="card-text">
              {description
                ? description.slice(0, 100)
                : "No Description Available"}
            </p>

            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem