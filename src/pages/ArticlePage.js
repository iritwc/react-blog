import axios from 'axios';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";
import CommentsList from '../components/CommentsList';
import AddCommentForm from '../components/AddCommentForm';
import useUser from '../hooks/useUser';

const ArticlePage = () => {
    const {articleId} = useParams();
    const [articleInfo, setArticleInfo] = useState({upvotes: 0, comments: [], canUpvote: false});
    const { canUpvote } = articleInfo;

    const { user, isLoading } = useUser();
    
    useEffect(() => {
        const loadArticle = async () => {
            const token = user && await user.getIdToken();
            const headers = token ? { authtoken: token } : {};
            const response = await axios.get(`/api/articles/${articleId}`, { headers });
            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo);
        }
        if (!isLoading) {
            loadArticle();
        }
        
    }, [articleId, user, isLoading]);

    const addVote = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const response = await axios.put(`/api/articles/${articleId}/upvote`, null, { headers });
        const updatedArticle = response.data;
        setArticleInfo(updatedArticle);
    }

    const article = articles.find(article=> article.name === articleId);

    if (!article) {
        return <NotFoundPage />
    }
    
    return (
        <>
        <h1>{article.name}</h1>
        <div className='upvotes-section'>
            {user 
                ? <button onClick={addVote}>{canUpvote ? 'Upvote' : 'Already Upvoted'}</button>
                : <button>Log in to upvote</button>
            }
            <p>This article has {articleInfo.upvotes}</p>
        </div>
        {article.content.map((p,i) => (<p key={i}>{p}</p>))}x
        {user 
            ?<AddCommentForm 
                articleName={articleId} 
                onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)} />
                : <button>Log in to add a comment</button>
            }
        <CommentsList comments={articleInfo.comments}/>
        </>
    );
}

export default ArticlePage;