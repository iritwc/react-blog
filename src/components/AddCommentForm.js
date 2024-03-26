import { useState } from "react";
import axios from "axios";
import useUser from "../hooks/useUser";

const AddCommentForm = ({articleName, onArticleUpdated}) => {

    const [postedBy, setPostedBy] = useState('');
    const [text, setText] = useState('');
    const { user } = useUser();

    const AddComment = async ()=> {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const response = await axios.post(`/api/articles/${articleName}/comments`, {
            postedBy,
            text
        }, { headers});
        const updatedArticle = response.data;
        onArticleUpdated(updatedArticle);
        setPostedBy('');
        setText('');
    }

    return (
        <div className="add-comment-form">
            <h3>Add a comment</h3>
            { user && <p>You are posting as {user.email}</p>}
            <textarea rows="4" cols="50" value={text} onChange={e => setText(e.target.value)}></textarea>
            <button 
                disabled={!text}
                onClick={AddComment}>Add Comment</button>
        </div>
    )
}

export default AddCommentForm;