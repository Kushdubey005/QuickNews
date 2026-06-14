import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
  

  constructor(props){
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalArticles: 0
}
  }
  static defaultProps={
    country:'in',
    pageSize:8,
    category:'general'
    
  }
  static propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string

  
  }
  
  async componentDidMount() {
  this.props.setProgress(10);
  const url = `https://gnews.io/api/v4/top-headlines?category=${this.props.category}&lang=en&country=in&max=${this.props.pageSize}&page=1&apikey=${process.env.apikey}`;

  let data = await fetch(url);
  let parsedData = await data.json();

  this.setState({
    articles: parsedData.articles || [],
    totalArticles: parsedData.totalArticles || 0
  });

  this.props.setProgress(100);
  console.log(parsedData);
}
 fetchMore = async () => {
  const nextPage = this.state.page + 1;

  const url = `https://gnews.io/api/v4/top-headlines?category=${this.props.category}&lang=en&country=in&max=${this.props.pageSize}&page=${nextPage}&apikey=${process.env.apikey}`;

  let data = await fetch(url);
  let parsedData = await data.json();

  const uniqueArticles = [
    ...new Map(
      [...this.state.articles, ...(parsedData.articles || [])]
        .map(article => [article.url, article])
    ).values()
  ];

  this.setState({
    page: nextPage,
    articles: uniqueArticles,
    totalArticles: parsedData.totalArticles || 0
  });
};
  // handlePrevClick=async()=>{
  //     let url=`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=7b86719d1d4b409885d30b851d9e5070&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //     let data=await fetch(url);
  //     let parsedData=await data.json()
  //     this.setState({
  //       page:this.state.page - 1,
  //       articles:parsedData.articles
        
  //     })

  // }
  // handleNextClick=async()=>{
    
  //   if(this.state.page + 1>Math.ceil(this.state.totalResult/20)){

  //   }
  //   else{
  //   let url=`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=7b86719d1d4b409885d30b851d9e5070&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //     let data=await fetch(url);
  //     let parsedData=await data.json()
  //     this.setState({
  //       page:this.state.page + 1,
  //       articles:parsedData.articles
  //     })
  //   }

  // }

  render() {
    return (
      
      <div className="container my-4">
        <h1 className="text-center">QuickNews-Top Headlines</h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMore}
          hasMore={this.state.articles.length<this.state.totalArticles}
          loader={<p>Loading...</p>}
          endMessage={<p style={{ textAlign: 'center' }}>All items loaded.</p>}
        >
        <div className="row mx-3 my-5 ">
            {this.state.articles.map((element, index) => {
  console.log(index, element);

  return (
    <div className="col-md-3 my-3" key={element?.url || index}>
      <NewsItem
        title={element?.title ? element.title.slice(0,45) : ""}
        description={element?.description ? element.description.slice(0,88) : ""}
        imageUrl={element?.image}
        newsUrl={element?.url}
      />
    </div>
  );
})}

        
            
            
        </div>
        </InfiniteScroll>
        
        {/* <div className="container">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark mx-3" onClick={this.handlePrevClick}>Previous</button>
        <button disabled={this.state.page + 1>Math.ceil(this.state.totalResult/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next</button>
      </div> */}
      </div>
    )
  }
}

export default News
