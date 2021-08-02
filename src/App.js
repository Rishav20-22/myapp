import React, { useRef,useState, useEffect } from 'react';
import './App.css';
import ndjsonStream from "can-ndjson-stream";
import ReactDOM from 'react-dom'
import { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


// I don't understand state :(
async function data(id) {
  var pkts = new Array();
  const response = await fetch(id, {});
  const json = await ndjsonStream(response.body);

  const dt = await json.getReader().read().then(value => value)
  console.log(dt)
  for (var i = 0; i < dt.value.packets.length; i++) {
    pkts.push(dt.value.packets[i])
  }
  return pkts
}

var value = ""
var startTime = ""
var endTime = ""

function App() {


  data("data.json").then(pkts => {

    const handleSelect = (e) => {
      console.log(e);
      value = e
      App()
    }

    var data_array = new Array()
    for (var i = 0; i < pkts.length; i++) {
      if (pkts[i].stream_type == value) {
        data_array.push({
          name: pkts[i].stream_type,
          y_axis: pkts[i].Value,
          x_axis: pkts[i].dateTime
        })
       
      }

    }
    const handleChange = e => {
      console.log(e.target.value);
      console.log(e)
    };

    var element = [
      <div className="side">
      <form  noValidate>
      <TextField
        id="datetime-local"
        label="Start Time"
        type="datetime-local"
        
        onChange = {handleChange} 
        
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
    <form  noValidate>
      <TextField
        id="datetime-local"
        label="End Time"
        type="datetime-local"
        
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
    
      <div className="App-container">

        <DropdownButton
          alignRight
          title="Stream Type"
          id="dropdown-menu-align-left"
          onSelect={handleSelect}
        >
          <Dropdown.Item eventKey="E4_Gsr">E4_Gsr</Dropdown.Item>
          <Dropdown.Item eventKey="E4_Bvp">E4_Bvp</Dropdown.Item>

          <Dropdown.Divider />

        </DropdownButton>
      </div>
      </div>,
      <LineChart
        width={1400}
        height={700}
        data={data_array}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x_axis" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="y_axis" stroke="#8884d8" activeDot={{ r: 8 }} />

      </LineChart>
      
      ]

    /*for(var i=0;i<pkts.length;i++)
    {
      element.push(<div>{pkts[i].stream_type.toString()}={pkts[i].Value},{pkts[i].dateTime.toString()}</div>)
    }*/
    ReactDOM.render(element, document.getElementById('root'));
  })


  
  return (
    <div className="Test">
      {

      }
    </div>
  );
}

export default App;