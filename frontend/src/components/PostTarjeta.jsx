const PostTarjeta = ({post}) => {
    return (
        <div id="asd" className="border border-[#A19FA1] rounded-3xl p-4">
            <h1>{post.title}</h1>
            <p>{post.views}</p>
        </div>
    );
};

export default PostTarjeta;