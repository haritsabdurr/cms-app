import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserUpdate = () => {
  const urlGet = `http://192.168.17.144:8888/users`;

  const [users, setUsers] = useState([]);
  const { id } = useParams();

  const FetchUsers = async () => {
    // const id = props.match.params.id;
    const response = await axios.get(`${urlGet}/${id}`).then((response) => {
      console.log(response.data.Data);
      setUsers(response.data.Data);
    });
  };

  useEffect(() => {
    FetchUsers();
  }, []);
  return <div></div>;
};

export default UserUpdate;
