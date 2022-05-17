import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import { io } from "socket.io-client";
import { Redirect } from 'react-router';

import TextContainer from '../TextContainer/TextContainer';
import PdfContainer from '../PdfContainer/PdfContainer'

import './Room.css';
import Files from "../Files/Files";
import Input from "../Input/Input";
import axios from 'axios'

let socket;

const Room = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);
  const [flag, setFlag]=useState(0);
  const [selectedFile, setSelectedFile] = useState({})
  const [currentFile, setCurrentFile] = useState({})
  const ENDPOINT = 'http://localhost:8080/';
  const WS_ENDPOINT = 'ws://localhost:8080/';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(WS_ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join-room', { room_id: room }, (error) => {
      if(error) { 
        setFlag(1);
        alert(error);
      }
    });
  }, [WS_ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('switch-file-page', result => {
      const file = result.data
      
      setFiles(oldFiles => [ ...oldFiles, file ]);
      setCurrentFile(file)
    });
    
    
  }, []);

  const onFileChange = event => { 
    // Update the state 
    setSelectedFile(event.target.files[0])
  }; 
   
  const onFileUpload = async () => { 
    
    const formData = new FormData(); 
   
    formData.append( 
      "file", 
      selectedFile, 
      selectedFile.name 
    ); 
   
    const response = await axios.post(ENDPOINT + 'upload', formData); 
    
    socket.emit('switch-file-page', {
      filepath: response.data.data,
      page_number: 1,
      room_id: room
    });

  }; 

    if (flag){
      return (
        <Redirect to="/" />
      )
    }

  const changeCurrentFile = (file) => {
    setCurrentFile(file);
  }

  return (
    <div className="outerContainer">
      <div className="container">
          <Files onClick={changeCurrentFile} files={files} />
          <PdfContainer file={currentFile} />
          <Input setFile={onFileChange} sendFile={onFileUpload} />
      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default Room;
