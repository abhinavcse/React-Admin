import React, { Component } from 'react';
export default class Add extends Component {
    render() {
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Category Name</label>
                        <input type="text" className="form-control" id="category_name"
                               placeholder="Enter the Category" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

