import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Add from './Add';
import Listing from './Listing';
import Edit from './Edit';
export default class Index extends Component {

    constructor(props){
        super(props);
        this.signOut=this.signOut.bind(this);
    }
    signOut(){
        sessionStorage.clear();
        this.props.history.push('/');
    }
    componentDidMount(){
        const isLoggedIn=sessionStorage.getItem('accessToken')
        if(!isLoggedIn){
            this.props.history.push('/')
        }
    }
    render() {
        return (
            <div>
                    <Router>
                        <div>
                            <hr/>
                        <Link to="/category" className="btn btn-primary">Listing</Link>&nbsp;
                        <Link to="/category/Add" className="btn btn-primary">Add</Link>&nbsp;
                        <button type="button" className="btn btn-primary" onClick={
                        (e) => {
                            e.preventDefault()
                            this.signOut()
                        }}>Logout</button>
                        <Route exact path="/category" component={Listing} />
                        <Route exact path="/category/add" component={Add} />
                        <Route exact path="/category/edit/:id" component={Edit} />

                        </div>
                    </Router>
            </div>
        );
    }
}

