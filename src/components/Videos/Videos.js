import React    from "react";
import {Searchbar} from './Searchbar'
import {Filters} from './Filters'
import './Videos.css'

let apiKey = process.env.REACT_APP_API_KEY;

export class Videos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      result:null
    };
  }

  componentDidMount() {
    fetch("https://www.googleapis.com/youtube/v3/search?key="+apiKey+"&channelId=UCsMica-v34Irf9KVTh6xx-g&part=snippet,id&order=date&maxResults=12")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items,
            result: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  search = (query) => {
    console.log(query);
    fetch("https://www.googleapis.com/youtube/v3/search?key="+apiKey+"&channelId=UCsMica-v34Irf9KVTh6xx-g&part=snippet,id&order=date&maxResults=12&q="+query)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items,
            result: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
      console.log(this.state.items)
}

render() {
  const { error, isLoaded, items } = this.state;
  let videos = <div></div>
  if(items && items.length>0)
  {
    console.log(this.state.result);
    videos =  this.state.items.map(video => 

      <div className="col-3">
        <div className="card" key={video.etag}>
        <img src={video.snippet.thumbnails.high.url} className="card-img-top" alt={video.snippet.title}/>
        <div className="card-body">
          <h5 className="card-title">{video.snippet.title}</h5>
          <p className="card-text">{video.snippet.description}</p>
          <a href={"https://www.youtube.com/watch?v=" +video.id.videoId} className="btn btn-primary">Watch Video</a>
        </div>
      </div>
      </div>

      );
  }
  else
  {
    console.log(error);
  }
    return (
      <div className="container-fluid">
        <div className="row">
          {/* 
          <div className="col-lg-2">

          <Filters></Filters>
            
          </div> */}
          <div className="col-lg-12">
            
            <div className="container">
              <div className="row">
                  <div className="col-12">
                  <Searchbar callbackFromParent={this.search}></Searchbar>
                  </div>
              </div>
            <div className="row">
            {videos}
            </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}