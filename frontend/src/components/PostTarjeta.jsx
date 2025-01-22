const PostTarjeta = ({post}) => {
    return (
        <div id="asd" className="border border-[#A19FA1] rounded-3xl p-4">
            <h3>{post.nombre}</h3>
            <p>{post.comentario}</p>
        </div>
    );
};

export default PostTarjeta;