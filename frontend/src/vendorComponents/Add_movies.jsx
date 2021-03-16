import React, { Component } from 'react'
import theaterService from '../service/theaterService';
import movieService from '../service/movieService';



class Add_movies extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            
           
            theaterId: this.props.match.params.theaterId,
            movieName: '',
            actor: '',
            actress: '',
            director: '',
            language: '',
            genre: '',
            activeStatus: null

        }
    
    }

    // step 3
   
    
    save = (e) => {
        e.preventDefault();
    
        let movie = {
            movieName: this.state.movieName,
            actor:  this.state.actor,
            actress:  this.state.actress,
            language:  this.state.language,
            director:  this.state.director,
            genre:  this.state.genre,
            activeStatus:  this.state.activeStatus
          
            };
        console.log('movie => ' + JSON.stringify(movie));

        // step 5
      
            movieService.addMovieToTheater(this.state.theaterId,movie).then(res =>{
                console.log(res);
                
            });
           console.log(this.state.theaterId);
          
            this.props.history.push('/view_movies/'+this.state.theaterId);
    }
    
    changemovieNamehandler= (event) => {
        this.setState({movieName: event.target.value});
    }
    changeactorhandler= (event) => {
        this.setState({actor: event.target.value});
    }
    changeactressnamehandler= (event) => {
        this.setState({actress: event.target.value});
    }

    changedirectornameHandler= (event) => {
        this.setState({director: event.target.value});
    }
    changelanguageHandler= (event) => {
        this.setState({language: event.target.value});
    }
    changegenreHandler= (event) => {
        this.setState({genre: event.target.value});
    }
    changeactivestatusHandler= (event) => {
        this.setState({activeStatus: event.target.value});
    }

    cancel = ()=>{
        this.props.history.push('/view_movies/'+this.state.theaterId);
       //this.props.history.push('/login');
    }

  
    
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                              <h1>Add movie</h1> 
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Movie name: </label>
                                            <input placeholder="movie name" name="movieName" className="form-control" 
                                                value={this.state.movieName} onChange={this.changemovieNamehandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Actor: </label>
                                            <input placeholder="actor name" name="actor" className="form-control" 
                                                value={this.state.actor} onChange={this.changeactorhandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Actress: </label>
                                            <input placeholder="actress name" name="actress" className="form-control" 
                                                value={this.state.actress} onChange={this.changeactressnamehandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Director: </label>
                                            <input placeholder="director" name="director" className="form-control" 
                                                value={this.state.director} onChange={this.changedirectornameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Language: </label>
                                            <input placeholder="language" name="language" className="form-control" 
                                                value={this.state.language} onChange={this.changelanguageHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Genre: </label>
                                            <input placeholder="genre" name="genre" className="form-control" 
                                                value={this.state.genre} onChange={this.changegenreHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> ActiveStatus(true/false): </label>
                                            <input placeholder="Activestatus" name="activeStatus" className="form-control" 
                                                value={this.state.activeStatus} onChange={this.changeactivestatusHandler}/>
                                        </div>
                                       

                                        <button className="btn btn-success" onClick={this.save }>Save</button>
                                        <button className="btn btn-danger" onClick={ () => this.cancel()} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default Add_movies