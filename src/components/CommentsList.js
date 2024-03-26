const CommentsList = ({comments}) => (
    <>
        <h3>Comments: </h3>
        { comments.map( (comment, i) => (
            <div className="comment" key={i + ': ' +comment.postedBy + ': ' + comment.text}>
                <h3>{comment.postedBy}</h3>
                <p>{comment.text}</p>
            </div>)
        )}
    </>
);

export default CommentsList;