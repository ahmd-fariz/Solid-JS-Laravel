//import createSignal dan createEffect
import { createSignal, createEffect } from "solid-js";

//import from @solidjs/router
import { A } from "@solidjs/router";

//import services api
import api from "../../services/api";

export default function PostIndex() {
  //init state
  const [posts, setPosts] = createSignal([]);

  //define method "fetchDataPosts"
  // const fetchDataPosts = async () => {
  //   //fetch data from API with Axios
  //   await api.get("/api/buk").then((response) => {
  //     //assign response data to state "posts"
  //     setPosts(response.data.data.data);
  //   });
  // };

  const fetchDataPosts = async () => {
    try {
      // Fetch data from API using Axios
      const response = await api.get("/api/buk");
  
      // Check if response data is available and has 'data' property
      if (response.data && response.data.data) {
        // Assign response data to state "posts"
        setPosts(response.data.data);
      } else {
        // Handle case when response data is not as expected
        console.error("Invalid data format received from API");
      }
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error("Error fetching data from API:", error);
    }
  };
  
  //run hook createEffect
  createEffect(() => {
    //call method "fetchDataPosts"
    fetchDataPosts();
  }, []);

  return (
    <div className="row mt-5">
      <div className="col-md-12">
        <div className="card border-0 shadow rounded">
          <div className="card-body">
            <A
              href="/posts/create"
              className="btn btn-md btn-success rounded shadow border-0 mb-2"
            >
              ADD POST
            </A>
            <table className="table table-bordered">
              <thead className="bg-dark text-white">
                <tr>
                  {/* <th scope="col">Image</th> */}
                  <th scope="col">Judul</th>
                  <th scope="col">Tahun</th>
                  <th scope="col">jumlah</th>
                  <th scope="col">Loker Buku</th>
                  <th scope="col" style={{ width: "15%" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {posts().length > 0 ? (
                  posts().map((post, index) => (
                    <tr key={index}>
                      {/* <td className="text-center">
                        <img
                          src={post.image}
                          alt={post.title}
                          width="200"
                          className="rounded"
                        />
                      </td> */}
                      <td>{post.judul}</td>
                      <td>{post.tahun}</td>
                      <td>{post.jumlah}</td>
                      <td>{post.loker_buku}</td>
                      <td className="text-center">
                        <a
                          href={`/posts/edit/${post.id}`}
                          className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2"
                        >
                          EDIT
                        </a>
                        <a
                          href={`/posts/detail/${post.id}`}
                          className="btn btn-sm btn-warning rounded-sm shadow border-0 me-2"
                        >
                          Detail
                        </a>
                        <button className="btn btn-sm btn-danger rounded-sm shadow border-0">
                          DELETE
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      <div className="alert alert-danger mb-0">
                        Data Belum Tersedia!
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}