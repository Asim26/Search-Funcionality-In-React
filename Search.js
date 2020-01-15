import React, { Component } from 'react'
                        
export default class Search extends Component {
    constructor(){
        super();

        this.state={
            searchData:null,  //query based data collection
            noData:false,  // empty data flag
            query:"", //User Entered / Searched Query
            result:""  
        }
    }
    

    search=(e)=>{
        console.log(e.target.value);
       this.setState({query:e.target.value});      
    }

    handleSubmit=(e)=>{
       e.preventDefault();
    //    this.setState({result:this.state.query});
    fetch("http://localhost:3000/posts?q=" + this.state.query).then((data)=>{
            data.json().then((resp)=>{
                console.warn("resp",resp)
                this.setState({searchData:resp})
                if(resp.length>0)
                {
                    this.setState({searchData:resp,noData:false})
                }
                else
                {
                    this.setState({noData:true,searchData:null})
                }
            })
        })
 
       this.setState({result:this.state.searchData});

    }

    render() {
        return (
            <div>
                 <h1>RSearch</h1>

                 <form onSubmit={this.handleSubmit}>

                        <input type="text" value={this.state.query} onChange={this.search} />

                        {/* <h1>{this.state.query}</h1> */}

                        {/* <h2> {this.state.result} </h2> */}
                        
                        <button>Search</button>
                 </form>


                  <div>
                   {
                       this.state.searchData?
                       <div>
                           { 
                               this.state.searchData.map((item)=>
                               <div><h1>{item.author}</h1>
                                    <h1>{item.id}</h1>
                                    <h1>{item.title}</h1>
                                </div>
                               )
                           }
                       </div>
                       :""
                    }   
                    {
                        this.state.noData?<h3>No data Found</h3>:null
                    }   
                              
                </div>
      
                 
            </div>
        )
    }
}
