

function PostsPage(props) {

    return (
        <>
        {props.post.title} <br/> 
        <img src={props.post.media_url} width={500}/>
        </>
    )
}

export default PostsPage;