import React, { Component } from 'react';
import axios from 'axios';
export default class Listing extends Component {
    constructor()
    {
        super();
        this.state={
            categories:[],
            counter:1,
        }
    }
    componentDidMount() {
        axios.get('http://react.second/data')
            .then(response=>{
                this.setState({categories:response.data})
            });
    }

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Srno</th>
                        <th>Category Name</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.categories.map(category=>{
                        return(
                            <tr>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>{category.active}</td>
                                <td>{category.created_at}</td>
                                <td>{category.updated_at}</td>
                            </tr>
                        )
                            this.setState({counter:2});
                        })

                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

