import React from "react";
import "./styles.css";

function InputField (props){
  
      return (
    <input class="field" type="text" placeholder={props.name} id={props.name} name={props.name}/> 
  )
  
}

export default function App() {
  return (
    <div className="App">
      <div class="big">
      <h1> Bookswap </h1>
      <div class = "pic"></div>
      <form action="tbd" class="form">
        {/* <input type = "text"/> */}
        <label>
        <InputField name="Username"/>
        </label>
        <InputField name="Email"/>
        <input type="password" placeholder="Password" name="password" class="field"/>
        <ul class="req">
          <li> - 10 or more characters</li>
          <li> - 1 Upper Case Letter</li>
          <li> - 1 Lower Case Letter</li>
          <li> - 1 Special Character</li>
          <li> - 1 Special Character</li>
          <li> - 1 Number</li>
        </ul>
        <input type="password" placeholder="Re-Enter Password" name="password" class="field"/>
        <InputField name="Address"/>
        <InputField name="Apt #"/>
        <InputField name="Zip"/>
        </form>
        </div>
    </div>
    
  );
}
