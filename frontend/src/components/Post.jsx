import PostTarjeta from "./PostTarjeta";

const Post = ({postLista}) => {
    return (
        <div className="p-4 flex flex-col gap-y-4">
            {postLista.map((post) => <PostTarjeta key={post.id} post={post} />)}
        </div>
    )
};

export default Post;