import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general',

  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1 ,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsCurrent`;
  }

  async updateNews() {
    this.props.setProgress(9);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(40);
    let parsedData = await data.json()
    this.props.setProgress(80);

    // console.log(parsedData);
    this.setState({ articles: parsedData.articles,totalResults: parsedData.totalResults, loading: false,
    })
    this.props.setProgress(100);
    
  }
  async componentDidMount() {
    this.updateNews();
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=42b27414e69d41c9b2532f6e2e05e88a&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({articles: parsedData.articless, totalResults: parsedData.totalResults , loading: false})

  }
  handlePrevClick = async () => {
    // console.log("Previous");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=42b27414e69d41c9b2532f6e2e05e88a&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({
    //     page: this.state.page - 1,
    //     articless: parsedData.articless,
    //     loading: false
    // })
    this.setState({ page: this.state.page - 1 });
    this.updateNews()
  }
  handleNextClick = async () => {
    // console.log("Next");
    // if( (this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))) {                            //pub_500798734c78776464228fc75039f91984ebb

    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=42b27414e69d41c9b2532f6e2e05e88a&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //     this.setState({loading: true});
    //     let data = await fetch(url);
    //     let parsedData = await data.json()
    //     console.log(parsedData);
    //     this.setState({
    //         page: this.state.page + 1,
    //         articless: parsedData.articless,
    //         loading: false
    //     })
    this.setState({ page: this.state.page + 1 })
    this.updateNews()
  }


    // }
  
    fetchMoreData =  async () => {
        this.setState({page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({ articles:this.state.articles.concat(parsedData.articles),totalResults: parsedData.totalResults,

     })
    };
    
  
  render() {
    return (
      <>

        <h2  style={{marginTop: '87px'}} className='text-center'>NewsCurrent - Top  {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
        {/* {this.state.loading && <Spinner/> } */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
            {this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0, 44) : ""} description={element.description ? element.description.slice(0, 86) : ""} imageurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>

          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between ">
          <button disabled={this.state.page <= 1} type="button" class="btn btn-dark" onClick={this.handlePrevClick} > &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr; </button>
        </div> */}
      </>

    )
  }

}


export default News
