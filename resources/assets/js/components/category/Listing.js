import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from "react-js-pagination";
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";
export default class Listing extends Component {
    constructor()
    {
        super();
        this.state={
            categories:[],
            feedback:'',
            activePage:1,
            itemsCountPerPage:1,
            totalItemsCount:3,
            pageRangeDisplayed:3,
            alert_message:'',
        }
        this.handlePageChange=this.handlePageChange.bind(this);
    }
    onDelete(category_id)
    {
        axios.delete('http://react.second/api/data/delete/'+category_id)
            .then(res => {
                this.componentDidMount();
                this.setState({alert_message: "success"});
            }).catch(error=>{
            this.setState({alert_message:"error"});
        });

    }
    componentDidMount() {
        axios.get('http://react.second/api/data')
            .then(response=>{
                this.setState({categories:response.data.data})
            });
    }
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        axios.get('http://react.second/api/data?page='+pageNumber)
            .then(response=>{
                this.setState({
                    categories:response.data.data,
                    itemsCountPerPage:response.data.per_page,
                    totalItemsCount:response.data.total,
                    activePage:response.data.current_page
                })
            });
    }
    render() {
        return (
            <div >
                <br/>
                {this.state.alert_message=="success"?<SuccessAlert message={"Category deleted successfully"}/>:null}
                {this.state.alert_message=="error"?<ErrorAlert message={"Found error from category deleted "}/>:null}
            <table className="table">
                    <thead>
                    <tr>
                        <th>Srno</th>
                        <th>Category Namesddds</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Edit</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.categories.map(category=>{
                        return(
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>{category.active}</td>
                                <td>{category.created_at}</td>
                                <td>{category.updated_at}</td>
                                <td><Link to={`/category/edit/${category.id}`}>Update</Link></td>
                                <td><a href="#" onClick={this.onDelete.bind(this,category.id)} >Delete</a></td>
                            </tr>
                        )

                        })

                    }
                    </tbody>
                </table>
                    <div className="d-flex justify-content-center">
                    <Pagination itemClass='page-item' linkClass='page-link' activePage={this.state.activePage}
                                itemsCountPerPage={this.state.itemsCountPerPage} totalItemsCount={this.state.totalItemsCount}
                                pageRangeDisplayed={this.state.pageRangeDisplayed} onChange={this.handlePageChange}
                    />
                    </div>
            </div>

        );
    }
}

