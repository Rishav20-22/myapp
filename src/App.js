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

import dat from './data.json';



// I don't understand state :(


var data_type = ""
var startTime = ""
var endTime = ""

function App() {
  const handleSelect = (e) => {
    
    data_type = e
    console.log(data_type)
    App()
  }

var types_stream =new Set()

var data_array= [];


   for(var i=0;i<dat.info.length;i++)
   {
     //console.log(dat.info[i].Streams[i].data[i]["Value"])
     for(var j=0;j<dat.info[i].Streams.length;j++)
     {
       types_stream.add(dat.info[i].Streams[j].stream_type)
        for(var k=0;k<dat.info[i].Streams[j].data.length;k++)
        {
          if (dat.info[i].Streams[j].stream_type == data_type)
          {data_array.push({
            name: dat.info[i].Streams[j].stream_type,
            y_axis: dat.info[i].Streams[j].data[k]["Value"],
            x_axis: dat.info[i].Streams[j].data[k]["dateTime"]
          })}
          //console.log(dat.info[i].Streams[j].data[k]["dateTime"]+"="+dat.info[i].Streams[j].data[k]["Value"]);
        }
     }
   }
   console.log(types_stream)
   var drop_down_element = []
   types_stream = Array.from(types_stream);
   for(var i=0;i<types_stream.length;i++)
   {
     drop_down_element.push(<Dropdown.Item eventKey={types_stream[i]}>{types_stream[i]}</Dropdown.Item>)
   }
    var element = [
      <div className="side">
      <form  noValidate>
      <TextField
        id="datetime-local"
        label="Start Time"
        type="datetime-local"
        
        //onChange = {handleChange} 
        
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
          {
          drop_down_element
          }
         
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

    
    ReactDOM.render(element, document.getElementById('root'));
  


  
  return (
    <div className="Test">
      {

      }
    </div>
  );
}

export default App;