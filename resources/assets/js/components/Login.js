import React, { Component } from 'react';
import axios from 'axios';
export default class Login extends Component {
    constructor(props){
        super(props);
        this.login=this.login.bind(this);
        this.updateEmail=this.updateEmail.bind(this);
        this.updatePassword=this.updatePassword.bind(this);
        this.state={
            email:'',
            password:'',
            errors:[],
        };
    }
    componentDidMount(){
        const isLoggedIn=sessionStorage.getItem('accessToken')
        if(isLoggedIn){
            this.props.history.push('/category')
        } else{
            this.props.history.push('/')
        }
    }

    updateEmail(){
       this.setState({'email':event.target.value});
    }
    updatePassword(){
        this.setState({'password':event.target.value});
    }
    login(){
        axios.post(`/api/Auth/login`,this.state).then(res => {
            if(res.data.errors.lenght){
                this.setState({'errors':res.data.errors})
            }else if(res.data.code==200){
                sessionStorage.setItem('accessToken',res.data.access_token)
                this.props.history.push('/category')
            }
        })
    }
    
    render() {
        return (
            <div className="jumbotron">
               <form>
               <div className="form-group">
                    <label >Email address</label>
                    <input type="email" onChange={this.updateEmail}  
                    className="form-control" id="inputEmail" placeholder="Enter email"  />
                    </div>
                    <div className="form-group">
                    <label >Password</label>
                    <input type="password" onChange={this.updatePassword} 
                    className="form-control" id="inputPassword" 
                    placeholder="Enter password"  />
                </div>
                    <button type="button" className="btn btn-primary" onClick={
                        (e) => {
                            e.preventDefault();
                            this.login()
                        }}>Login</button>
                </form>
            </div>
        );
    }
}

