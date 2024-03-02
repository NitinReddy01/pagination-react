import { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages,setTotalPages] = useState();
  const [sortByDate,setSortByDate] = useState(false);

  const handlePrevPage = ()=>{
    if(currentPage ===1) return ;
    setCurrentPage(prev=>prev-1);
  }

  const handleNextPage = ()=>{
    if(currentPage>=totalPages) return ;
    setCurrentPage(prev=>prev+1);
  }

  useEffect(() => {
    const getData = async () => {
      try {
        console.log(sortByDate)
        const res = await axios.get(`http://localhost:9000/api/users?filter=${search}&page=${currentPage}&sortBy=${sortByDate}`);
        setUsers(res.data.users);
        setTotalPages(Math.ceil(res.data.totalCount/20));
      } catch (error) {
        console.log(error);
      }
      finally {
        setLoading(false);
      }
    }
    getData();
  }, [currentPage, search,sortByDate])

  return (
    <>
      {loading ? "loading..." : <div className='flex flex-col gap-4 justify-center' >
        <div className='flex justify-evenly'>
          <input placeholder='search' className='w-96 p-2' value={search} onChange={(e) => setSearch(e.target.value)} />

        </div>

        {users.length > 0 ? <>
          <table className='table' >
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">S No</th>
                <th className="border border-gray-300 px-4 py-2">Customer Name</th>
                <th className="border border-gray-300 px-4 py-2">Age</th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">Location</th>
                <th className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={()=>setSortByDate(prev=>!prev)} >Date</th>
                <th className="border border-gray-300 px-4 py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (<tr key={user.sno}>
                  <td className="border border-gray-300 px-4 py-2">{user.sno}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.customer_name}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.age}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.location}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(user.created_at).toLocaleDateString()}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(user.created_at).toLocaleTimeString()}</td>
                </tr>)
              })}
            </tbody>
          </table>
        </> : "No users"}
        <div className='flex gap-6 justify-center' >
            <button className=" border  border-gray-300 w-10 " onClick={handlePrevPage}>
              prev
            </button>
            <button className=" border  border-gray-300 w-8">
              {currentPage}
            </button>
            <button className=" border  border-gray-300 w-10" onClick={handleNextPage} >
              next
            </button>
          </div>
      </div>}
    </>
  )
}

export default App
