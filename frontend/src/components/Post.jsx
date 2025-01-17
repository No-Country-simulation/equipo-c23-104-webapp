import PostTarjeta from "./PostTarjeta";

const Post = ({postLista}) => {
    // npx json-server db.json
    // const llamarDatos = () => {
    //     const url = "http://localhost:3000/posts";

    //     fetch (url)
    //         .then(res => {
    //             if (!res.ok) {
    //                 throw new Error("Error");
    //             }

    //             return res.json();
    //         })
    //         .then(data => {
    //             console.log(data);
    //             document.getElementById("asd").innerHTML = `
    //                 <h1>${data[1].title}</h1>
    //             `;

    //         })
    //         .catch(err => {
    //             console.error("Error", err);
    //         })
    // };
    // llamarDatos();

    return (
        <div className="p-4 flex flex-col gap-y-4">
            {postLista.map((post) => <PostTarjeta key={post.id} post={post} />)}
        </div>
    )
};

export default Post;