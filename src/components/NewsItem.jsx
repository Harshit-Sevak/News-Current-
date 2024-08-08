import React, { Component } from 'react'


export class NewsItem extends Component {



  render() {
    let { title, description, imageurl, newsUrl, author, date ,source } = this.props

    return (
      <div className='my-3'>
        <div className="card" >
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left: '90%',  zindex: '1'}}>
              {source} 

            </span>
          <img src={imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}    

            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary"> By {!author ? "Unkoown" : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} className="btn btn-sm btn-primary">Read more</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
