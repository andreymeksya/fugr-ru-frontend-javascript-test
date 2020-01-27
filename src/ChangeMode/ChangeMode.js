import React from 'react';

class ChangeMode extends React.Component {
  render() {
    const smallUrl = `http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`;
    const bigUrl = `http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`;
    return (
        <div style={{display:'flex', justifyContent:'center', margin: '10px', padding: '50px 0'}}>
            <button style={{width: "150px"}} onClick={()=>this.props.onSelect(smallUrl)} type="button" class="btn btn-outline-secondary">32</button>
            <button style={{width: "150px"}} onClick={()=>this.props.onSelect(bigUrl)} type="button" class="btn btn-outline-secondary">1000</button>
        </div>
    );
  }
}

export default ChangeMode;