import React,{useState,useEffect} from 'react';
import './App.css';
import ndjsonStream from "can-ndjson-stream";
import ReactDOM from 'react-dom'
import { TimeSeries } from 'pondjs';

import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from "react-timeseries-charts";

async function data(id) {
  var pkts = new Array();
  const response = await fetch( id,{});
  const json = await ndjsonStream(response.body);
  
  const dt = await json.getReader().read().then(value =>value)
  console.log(dt)
  for(var i=0;i<dt.value.packets.length;i++)
  {
    pkts.push(dt.value.packets[i]) 
  }
 return pkts
}



function App() {

/*for (var i in data.packets) {
  //console.log(json)
}*/

data("data.json").then(pkts =>
{
console.log(pkts[0])
var element = [<div></div>]

/*for(var i=0;i<pkts.length;i++)
{
  element.push(<div>{pkts[i].stream_type.toString()}={pkts[i].Value},{pkts[i].dateTime.toString()}</div>)
}*/
ReactDOM.render(element, document.getElementById('root'));
})


//console.log(org_pkts[0])
  return (
    <div className="Test">
    {
      
    }
    </div>
  );
}

export default App;