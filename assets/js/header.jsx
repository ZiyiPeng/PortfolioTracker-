//adapted from Nat Tuck's lecture note
import React from 'react';
import _ from 'lodash';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import api from './api'

function Header(props) {
  let {session} = props;
  let session_info;
  if (session == null) {
    session_info =
    <div>
      <p>name:     <input type="name" className="form-control" id="user-name" placeholder="name" value="peng"/></p>
      <p>password: <input type="password" className="form-control" id="password" placeholder="password" value="P@ssw0rd"/></p>
      <p><button className="btn btn-secondary" onClick={()=>login()}>Login</button>
      <Link className="btn btn-secondary" to={"/create_user_form"}> register </Link></p>
    </div>;
  }
  else {
    let user = props.users.find(function(ee){return ee.id == props.session.user_id;});
    api.get_portfolio(user.portfolio_id);
    api.get_portfolio_stats(user.portfolio_id)
    session_info =
    <div className="container">
      <div className="row ">
      <span className="col align-self-start">Logged in as {user.username}</span>
      <span className="col-md-3 offset-md-3"><Link to={"/"} onClick={() => api.delete_session()}>logout</Link></span>
      </div>
      <div>
        <p><Link to={"/portfolio"}>portfolio</Link></p>
        <p><Link to={"/stock"}>stock</Link></p>
      </div>
    </div>;
  }

  return <div>
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
        <h1>Stock Project</h1>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link active"><Link to={"/portfolio"}>Portfolio</Link></a>
            </li>
            <li className="nav-item">
              <a className="nav-link"><Link to={"/stock"}>Stock</Link></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/users">Profile</a>
            </li>
            

          </ul>

          <ul className="navbar-nav ml-auto">
            <li>
              <a className="nav-link"><Link to={"/"} onClick={() => api.delete_session()}>logout</Link></a>
            </li>
          </ul>
        </div>

      </nav>

      {session_info}
    </div>
  </div>;
}

function login() {
  let name = $("#user-name").val();
  let password = $("#password").val();
  api.create_session(name, password);
}



function state2props(state) {
  return { session: state.session,
    users: state.users
  };
}

export default connect(state2props)(Header);
