import { useState, useEffect, memo } from "react";
import userStyle from '@/styles/User.module.css';

export function TableUsers({users}){
    return <fieldset>
        <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Email</th>
            <th>Город</th>
            <th>Телефон</th>
            <th>Сайт</th>
            <th>Компания</th>
          </tr>
        </thead>
        <tbody>
          {users.map((users) => (
            <tr key={users.id}>
              <td>{users.name}</td>
              <td>{users.email}</td>
              <td>{users.address?.city}</td> 
              <td>{users.phone}</td>
              <td>{users.website}</td>
              <td>{users.company?.name}</td> 
            </tr>
          ))}
        </tbody>
      </table>
    </fieldset>
}

export function GetUsers(){
    const 
    [users, setUsers] =useState([]),
    [error,setError]= useState(null);
    
    useEffect(()=>{
        async function load() {
            try{
                setUsers([]);
                setError(null);
                const response =await fetch('https://jsonplaceholder.typicode.com/users/'),
                data = await response.json();
                if(!response.ok)
                {
                    const errorData = await response.json();
                    throw new Error(`HTTP error! status: ${response.status}, ${errorData.message}`);
                }
                setUsers(data);
            }
            catch(err){
                setError(err)
            }
        }
        load();
    }, []);
    if(error)
        return <><br/><span className={userStyle.error}>ERROR {error.toString()}</span></>
    if (users)
        return <TableUsers  users={users}/>
    return <>
        <br/>
        <span className={userStyle.loading}>LOADING...</span>
    </>
    
}

