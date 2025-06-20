import {useState,useEffect} from 'react'

function Userdata() {
    const [blogs,setBlogs] = useState([]);
    const [users,setUsers] = useState([]);
    const [user,setUser] = useState(null);
    const [likes,setLikes] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        async function getData(){
            try{
            const res = await fetch("/api/homepage",{
                  method: "GET",
                  credentials:"include",
              });
              const data = await res.json();
              console.log("check",data.user);
                setBlogs(data.blogs);
                setUsers(data.users);
                setLikes(data.likes);
                setUser(data.user);
              } catch (err){
                console.error("error fetching data");
              } finally {
                setLoading(false);
              }
            }

            getData();

          }, [])
    return {blogs,users,likes,user,loading}
}

export default Userdata