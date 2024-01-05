

function PostsPage(props) {

    const imagePost = '.com'

    return (
        <div className="postItem">
        {props.post.title} <br/> 
        {props.post.media_url.includes(imagePost) ? <img src={props.post.media_url} width={500}/> : <p>{props.post.media_url}</p>}
        <br/>
        <small>{props.post.notes}</small>
        </div>
    )
}

export default PostsPage;