import {useState,useEffect} from 'react'

function Userdata() {
    const [blogs,setBlogs] = useState([]);
    const [users,setUsers] = useState([]);
    const [user,setUser] = useState(null);
    useEffect(()=>{
        async function getData(){
            try{
            const res = await fetch("/api/homepage",{
                  method: "GET",
                  credentials:"include",
              });
              const data = await res.json();
                setBlogs(data.blogs);
                setUsers(data.users);
                setUser(data.user);
              } catch (err){
                console.error("error fetching data");
              }
            }

            getData();

          }, [])
    return {blogs,users,user}
}

export default Userdata