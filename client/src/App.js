import React, { Component } from "react";
import "./assets/css/bootstrap.css";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddModel: false,
      openEditModel: false,
      openDeleteModel: false,
      maleCheck: false,
      femaleCheck: false,
      selectedId: "",
      snackMsg:"",
      name: "",
      email: "",
      age: "",
      data: []
    };
  }

  componentDidMount() {
    const url = "/user/";

    axios
      .get(url)
      .then(res => {
        this.setState({
          data: res.data.user
        });
      })
      .catch(err => console.log(err));
  }
  handleAdd = () => {
    this.setState({
      openAddModel: true
    });
  };

  handleEdit(id, name, email, age, gender) {
    this.setState({
      selectedId:id,
      name: name,
      email: email,
      age: age,
      maleCheck: gender === "M" ? true : false,
      femaleCheck: gender === "F" ? true : false,
      openEditModel: true
    });
  }

  handleDelete(id) {
    this.setState({
      selectedId:id,
      openDeleteModel: true
    });
  }
  handleModalClose = () => {
    this.setState({
      name: "",
      email: "",
      age: "",
      maleCheck: false,
      femaleCheck: false,
      openAddModel: false,
      openEditModel: false,
      openDeleteModel: false
    });
  };
  handleModalAdd = () => {
    const url = "/user/";
    let postData = {
      name: this.state.name,
      email: this.state.email,
      age: this.state.age,
      gender: this.state.maleCheck === true ? "M" : "F"
    };
    axios
      .post(url, postData)
      .then(res => {
        axios.get(url)
        .then((res)=>{
          this.setState({
            data:res.data.user,
          })
        })
        let x = document.getElementById("snackbar");
          x.className = "show-sucess";
          this.setState({
            snackMsg: res.data.message,
            openAddModel:false
          });
          setTimeout(function() {
            x.className = x.className.replace("show", "");
          }, 5000);
        
      })
      .catch(err => {
        console.log("Err", err);
      });
  };
  handleModalUpdate = () => {
    const url = `/user/${this.state.selectedId}`;
    let postData = {
      name: this.state.name,
      email: this.state.email,
      age: this.state.age,
      gender: this.state.maleCheck === true ? "M" : "F"
    };
    axios
      .put(url, postData)
      .then(res => {
        axios.get(url)
        .then((res)=>{
          this.setState({
            data:res.data.user,
          })
        })
        let x = document.getElementById("snackbar");
          x.className = "show-sucess";
          this.setState({
            snackMsg: res.data.message,
            openEditModel:false
          });
          setTimeout(function() {
            x.className = x.className.replace("show", "");
          }, 5000);
      })
      .catch(err => {
        console.log("Err", err);
      });
  };
  handleModalDelete = () => {
    const url = `/user/${this.state.selectedId}`;
    let postData = {
      name: this.state.name,
      email: this.state.email,
      age: this.state.age,
      gender: this.state.maleCheck === true ? "M" : "F"
    };
    axios
      .delete(url, postData)
      .then(res => {
        axios.get(url)
        .then((res)=>{
          this.setState({
            data:res.data.user,
          })
        })
        let x = document.getElementById("snackbar");
          x.className = "show-sucess";
          this.setState({
            snackMsg: res.data.message,
            openDeleteModel:false
          });
          setTimeout(function() {
            x.className = x.className.replace("show", "");
          }, 5000);
        
      })
      .catch(err => {
        console.log("Err", err);
      });
  };
  render() {
    return (
      <div>
        <div className="header">User Portal</div>
        {/* snack bar*/}
        <div id="snackbar">{this.state.snackMsg}</div>
        {/*snack bar*/}
        {/* ADD MODAL*/}
        {this.state.openAddModel && (
          <div className="modal modal-backdrop" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    onClick={this.handleModalClose}
                  >
                    &times;
                  </button>
                  <h4 className="modal-title">Add User</h4>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-3">
                          <label className="col-form-label">Name:</label>
                        </div>

                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            value={this.state.name}
                            onChange={e => {
                              this.setState({ name: e.target.value });
                            }}
                          />
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-md-3">
                          <label className="col-form-label">Email:</label>
                        </div>
                        <br />
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            value={this.state.email}
                            onChange={e => {
                              this.setState({ email: e.target.value });
                            }}
                          />
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-md-3">
                          <label className="col-form-label">Age:</label>
                        </div>

                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            value={this.state.age}
                            onChange={e => {
                              this.setState({ age: e.target.value });
                            }}
                          />
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-md-3">
                          <label className="col-form-label">Gender:</label>
                        </div>

                        <div className="col-md-9">
                          <label className="radio-inline">
                            <input
                              type="radio"
                              name="optradio"
                              checked={this.state.maleCheck}
                              onChange={() => {
                                this.setState({
                                  maleCheck: true,
                                  femaleCheck: false
                                });
                              }}
                            />
                            Male
                          </label>
                          <label className="radio-inline">
                            <input
                              type="radio"
                              name="optradio"
                              checked={this.state.femaleCheck}
                              onChange={() => {
                                this.setState({
                                  maleCheck: false,
                                  femaleCheck: true
                                });
                              }}
                            />
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-success"
                    onClick={this.handleModalAdd}
                  >
                    Add
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.handleModalClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit MODAL*/}
        {this.state.openEditModel && (
          <div className="modal modal-backdrop" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    onClick={this.handleModalClose}
                  >
                    &times;
                  </button>
                  <h4 className="modal-title">Modify User</h4>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-3">
                          <label className="col-form-label">Name:</label>
                        </div>

                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            value={this.state.name}
                            onChange={e => {
                              this.setState({ name: e.target.value });
                            }}
                          />
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-md-3">
                          <label className="col-form-label">Email:</label>
                        </div>
                        <br />
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            value={this.state.email}
                            onChange={e => {
                              this.setState({ email: e.target.value });
                            }}
                          />
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-md-3">
                          <label className="col-form-label">Age:</label>
                        </div>

                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            value={this.state.age}
                            onChange={e => {
                              this.setState({ age: e.target.value });
                            }}
                          />
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-md-3">
                          <label className="col-form-label">Gender:</label>
                        </div>

                        <div className="col-md-9">
                          <label className="radio-inline">
                            <input
                              type="radio"
                              name="optradio"
                              checked={this.state.maleCheck}
                              onChange={() => {
                                this.setState({
                                  maleCheck: true,
                                  femaleCheck: false
                                });
                              }}
                            />
                            Male
                          </label>
                          <label className="radio-inline">
                            <input
                              type="radio"
                              name="optradio"
                              checked={this.state.femaleCheck}
                              onChange={() => {
                                this.setState({
                                  maleCheck: false,
                                  femaleCheck: true
                                });
                              }}
                            />
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-success"
                    onClick={this.handleModalUpdate}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.handleModalClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete MODAL*/}
        {this.state.openDeleteModel && (
          <div className="modal modal-backdrop" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    onClick={this.handleModalClose}
                  >
                    &times;
                  </button>
                  <h4 className="modal-title">Confirmation</h4>
                </div>
                <div className="modal-body">Are You sure to Delete</div>
                <div className="modal-footer">
                  <button
                    className="btn btn-success"
                    onClick={this.handleModalDelete}
                  >
                    Yes
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.handleModalClose}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/*main body*/}
        <br />
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <button className="btn btn-success" onClick={this.handleAdd}>
                Add User
              </button>
            </div>
          </div>

          <div className="row">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {this.state.data.map(e => {
                  return (
                    <tr key={e._id}>
                      <td>{e.name}</td>
                      <td>{e.email}</td>
                      <td>{e.age}</td>
                      <td>{e.gender}</td>
                      <td>
                        <button
                          className="btn btn-primary push"
                          onClick={this.handleEdit.bind(
                            this,
                            e._id,
                            e.name,
                            e.email,
                            e.age,
                            e.gender
                          )}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={this.handleDelete.bind(this, e._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
