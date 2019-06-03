import React from 'react';
import './App.css';
import Header from './Header';
import Content from './Content';
import RandomNumber from './RandomNumber';

class App extends React.Component {
  // render() {
  //   return (
  //     <div>
  //       <Header title={this.props.headerTitle} />
  //       <Content title={this.props.contentTitle} title={this.props.contentBody} />
  //     </div>
  //   );
  // }

  constructor(props)
  {
    super(props);
    this.state = {
      value : Math.round(Math.random()*100)
    };
    this.updateValue = this.updateValue.bind(this);
  }
  updateValue(randomValue)
  {
    this.setState({
      value:randomValue
    })
  }
  render (){
    return(
      <div>
        <Header title={this.props.headerTitle} />
        <Content title={this.props.contentTitle} 
                 body={this.props.contentBody} />
        <RandomNumber number = {this.state.value} onUpdate = {this.updateValue} />
      </div>
    );
  }
}
App.defaultProps= {
  headerTitle : 'Default headerTitle',
  contentTitle : 'Default contentTitle',
  contentBody : 'Default contentBody',
}
// App.defaultProps = {
//   headerTitle: 'Default header',
//   contentTitle: 5,
//   contentBody: undefined
// };
export default App;
