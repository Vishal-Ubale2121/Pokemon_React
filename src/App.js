import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Search from './Search/Search';
import History from './History/History';

class App extends Component {

  state = {}

  render() {
    return (
      <BrowserRouter>
        <>
          <Menu
            color={'black'}
            inverted
            widths={3}>
            <Menu.Item
              name='Home'
              font ="Arial-Black"
              as={Link}
              to='/' />
            <Menu.Item
              name='Vishal Ubale'
              as={Link}
              to='/'
            />
          </Menu>
          <Route path="/" exact component={Search} />
          <Route path="/history" component={History} />
        </>
      </BrowserRouter>
    );
  }
}

export default App;
