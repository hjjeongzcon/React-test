import React from 'react';
import './App.css';
import update from 'react-addons-update'

// import Header from './Header';
// import Content from './Content';
// import RandomNumber from './RandomNumber';

// class App extends React.Component {
//   // render() {
//   //   return (
//   //     <div>
//   //       <Header title={this.props.headerTitle} />
//   //       <Content title={this.props.contentTitle} title={this.props.contentBody} />
//   //     </div>
//   //   );
//   // }

//   constructor(props)
//   {
//     super(props);
//     this.state = {
//       value : Math.round(Math.random()*100)
//     };
//     this.updateValue = this.updateValue.bind(this);
//   }
//   updateValue(randomValue)
//   {
//     this.setState({
//       value:randomValue
//     })
//   }
//   render (){
//     return(
//       <div>
//         <Header title={this.props.headerTitle} />
//         <Content title={this.props.contentTitle} 
//                  body={this.props.contentBody} />
//         <RandomNumber number = {this.state.value} onUpdate = {this.updateValue} />
//       </div>
//     );
//   }
// }
// App.defaultProps= {
//   headerTitle : 'Default headerTitle',
//   contentTitle : 'Default contentTitle',
//   contentBody : 'Default contentBody',
// }
// // App.defaultProps = {
// //   headerTitle: 'Default header',
// //   contentTitle: 5,
// //   contentBody: undefined
// // };

// array map
// class App extends React.Component {
//   render() {
//     return (
//       <Contacts />
//     )
//   }
// }
// class Contacts extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       contactData: [
//         { name: "Abet", phone: "010-0000-0001" },
//         { name: "Betty", phone: "010-0000-0002" },
//         { name: "Chalie", phone: "010-0000-0003" },
//         { name: "David", phone: "010-0000-0003" }
//       ]
//     };
//   }
//   render() {
//     return (
//       <div>
//         <h1>Contacts</h1>
//         <ul>
//           {/* 
//           <ContactInfo name="Abet" phone="010-0000-0001" />
//           <ContactInfo name="Betty" phone="010-0000-0002" />
//           <ContactInfo name="Chalie" phone="010-0000-0003" />
//           <ContactInfo name="David" phone="010-0000-0003" /> 
//           */}

//           {this.state.contactData.map(
//             (contact, i) => {
//               return (
//                 <ContactInfo
//                   name={contact.name}
//                   phone={contact.phone}
//                   key={contact.i}
//                 />
//               );
//             })}
//         </ul>
//       </div>
//     )
//   }
// }
// class ContactInfo extends React.Component {
//   render() {
//     return (
//       <li>{this.props.name} {this.props.phone}</li>
//     );
//   }
// }
class App extends React.Component {
  //컴포넌트가 DOM 위에 만들어지기 전에 실행
  componentWillMount() {
    alert("컴포넌트가 DOM 위에 만들어지기 전에 실행")
  }

  //컴포넌트가 만들어지고 첫 렌더링을 다 마친후 실행되는 메소드
  componentDidMount() {
    alert("컴포넌트가 만들어지고 첫 렌더링을 다 마친후 실행되는 메소드")
  }

  //컴포넌트가 prop 을 새로 받았을 때 실행됩니다.
  componentWillReceiveProps(nextProps) {
    console.log("컴포넌트가 prop 을 새로 받았을 때 실행됩니다. " + JSON.stringify(nextProps));
  }

  //컴포넌트가 업데이트 되기 전에 실행됩니다.
  componentWillUpdate(nextProps, nextState) {
    console.log("컴포넌트가 업데이트 되기 전에 실행됩니다. " + JSON.stringify(nextProps) + " " + JSON.stringify(nextState));
  }

  //컴포넌트가 리렌더링을 마친 후 실행됩니다.
  componentDidUpdate(prevProps, prevState) {
    console.log("컴포넌트가 리렌더링을 마친 후 실행됩니다. " + JSON.stringify(prevProps) + " " + JSON.stringify(prevState));
  }

  //컴포넌트가 DOM 에서 사라진 후 실행되는 메소드입니다.
  componentWillUnmount() {
    console.log("컴포넌트가 DOM 에서 사라진 후 실행되는 메소드입니다.");
  }

  render() {
    return (
      <Contacts />
    )
  }

}

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactData: [
        { name: "Abet", phone: "010-0000-0001" },
        { name: "Betty", phone: "010-0000-0002" },
        { name: "Charlie", phone: "010-0000-0003" },
        { name: "David", phone: "010-0000-0004" }
      ],
      selectedKey: -1,
      selected: {
        name: "",
        phone: ""
      }
    };
  }

  _insertContact(name, phone) {

    let newState = update(this.state, {
      contactData: {
        $push: [{ "name": name, "phone": phone }]
      }
    });
    this.setState(newState);
  }

  _onSelect(key) {
    if (key === this.state.selectedKey) {
      console.log("key select cancelled");
      this.setState({
        selectedKey: -1,
        selected: {
          name: "",
          phone: ""
        }
      });
      return;
    }
    this.setState({
      selectedKey: key,
      selected: this.state.contactData[key]
    });
    console.log(key + " is Selected");
  }

  _isSelected(key) {
    if (this.state.selectedKey === key) {
      return true;
    }
    else {
      return false;
    }
  }
  _removeContact() {
    if (this.state.selectedKey === -1) {
      console.log("contact not selected");
      return;
    }

    this.setState({
      contactData: update(
        this.state.contactData,
        {
          $splice: [[this.state.selectedKey, 1]]
        }
      ),
      selectedKey: -1
    });
  }

  _editContact(name, phone) {
    this.setState({
      contactData: update(
        this.state.contactData, {
          [this.state.selectedKey]: {
            name: { $set: name },
            phone: { $set: phone }
          }
        }
      ),
      selected: {
        name: name,
        phone: phone
      }
    })
  }

  render() {
    return (
      <div>
        <h1>Contacts</h1>
        <ul>
          {this.state.contactData.map(
            (contact, i) => {
              return (
                <ContactInfo
                  name={contact.name}
                  phone={contact.phone}
                  key={i}
                  contactKey={i}
                  isSelected={this._isSelected.bind(this)(i)}
                  onSelect={this._onSelect.bind(this)}
                />
              );
            })}

        </ul>
        <ContactCreator onInsert={this._insertContact.bind(this)} />
        <ContactRemover onRemove={this._removeContact.bind(this)} />
        <ContactEditer onEdit={this._editContact.bind(this)}
          isSelected={(this.state.selectedKey !== -1)}
          contact={this.state.selected} />
      </div>
    );
  }
}


class ContactInfo extends React.Component {
  handleClick() {
    this.props.onSelect(this.props.contactKey);
  }
  shouldComponentUpdate(nextProps, nestState) {
    return (JSON.stringify(nextProps) !== JSON.stringify(this.props));
  }
  render() {
    console.log("rendered: " + this.props.name);
    let getStyle = isSelect => {
      if (!isSelect) return;

      let style = {
        fontWeight: 'bold',
        backgroundColor: '#4efcd8'
      };

      return style;
    };

    return (
      <li
        style={getStyle(this.props.isSelected)}
        onClick={this.handleClick.bind(this)}>
        {this.props.name} {this.props.phone}
      </li>
    );
  }
}


class ContactCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      name: "",
      phone: "",
    });
  }

  handleChange(e) {
    var nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleClick() {
    this.props.onInsert(this.state.name, this.state.phone);
    this.setState({
      name: "",
      phone: "",
    });
  }

  render() {
    return (
      <div>
        <p>
          <input type="text"
            name="name"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleChange.bind(this)} />

          <input type="text"
            name="phone"
            placeholder="phone"
            value={this.state.phone}
            onChange={this.handleChange.bind(this)} />
          <button onClick={this.handleClick.bind(this)}>Insert</button>
        </p>
      </div>
    );

  }
}

class ContactRemover extends React.Component {
  handleClick() {
    this.props.onRemove();
  }
  render() {
    return (
      <button onClick={this.handleClick.bind(this)}>
        Remove selected contact
      </button>
    );
  }
}


class ContactEditer extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      name: "",
      phone: "",
    });
  }

  handleChange(e) {
    var nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleClick() {
    if (!this.props.isSelected) {
      console.log("contact not selected");
      return;
    }
    this.props.onEdit(this.state.name, this.state.phone);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.contact.name,
      phone: nextProps.contact.phone
    });
  }
  render() {
    return (
      <div>
        <p>
          <input type="text"
            name="name"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleChange.bind(this)} />

          <input type="text"
            name="phone"
            placeholder="phone"
            value={this.state.phone}
            onChange={this.handleChange.bind(this)} />
          <button onClick={this.handleClick.bind(this)}>Edit</button>
        </p>
      </div>
    );

  }
}




export default App;
