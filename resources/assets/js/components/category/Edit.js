import React, { Component } from 'react';
import axios from 'axios';
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";
export default class Edit extends Component {
    constructor(props)
    {
        super(props);
        this.onChangeCategoryName=this.onChangeCategoryName.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.state={
            category_name:'',
            alert_message:'',
        }

    }
    onChangeCategoryName(e)
    {
        this.setState({
            category_name:e.target.value
        });
    }
    onSubmit(e)
    {
        e.preventDefault();
        const category={
            category_name:this.state.category_name
        }
        axios.put('http://react.second/api/data/update/'+ this.props.match.params.id,category)
            .then(res=>{
                this.setState({alert_message: "success"})
            }).catch(error=>{
                this.setState({alert_message:"error"})
        })
        setTimeout(
            () => {
            this.redirectToList()
        }, 2000)
    }
    redirectToList()
    {
        this.props.history.push('/category')
    }
    componentDidMount() {
        axios.get('http://react.second/api/data/edit/' + this.props.match.params.id)
            .then(response => {
                this.setState({category_name: response.data.name})
            })
                        }
    render() {
        return (
            <div>
                <br/>
                {this.state.alert_message=="success"?<SuccessAlert message={"Category updated successfully"}/>:null}
                {this.state.alert_message=="error"?<ErrorAlert message={"Found error from category updated "}/>:null}
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Category Name</label>
                        <input type="text" className="form-control" onChange={this.onChangeCategoryName} value={this.state.category_name} id="category_name"  placeholder="Enter the Category" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

