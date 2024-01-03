import React, {useState} from 'react';

function PostInput() {

    let [newPost, setNewPost] = useState({title: '', description: '', date: ''})

    const handleTitleChange = (e) => {
        console.log('Title change', e.target.value)
        setNewPost({...newPost, title: e.target.value})
    }

    const handleDescChange = (e) => {
        console.log('Desc change', e.target.value)
        setNewPost({...newPost, description: e.target.value})
    }

    const handleDateChange = (e) => {
        console.log('Date change')
        setNewPost({...newPost, date: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newPost)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type='text' value={newPost.title} onChange={handleTitleChange}/>
                <input type='text' value={newPost.description} onChange={handleDescChange}/>
                <input type='text' value={newPost.date} onChange={handleDateChange}/>
                {/* Dropdown with timelines to select one */}
                <button>Submit new post</button>
            </form>

            <p>{JSON.stringify(newPost)}</p>
        </>

    )

}

export default PostInput;