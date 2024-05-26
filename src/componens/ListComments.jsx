import { useComment } from "../context/commentContext";
import Comment from "./Comment";

function ListComments() {
    const { commentsByPostId } = useComment();
    return (
        <div>
            {commentsByPostId.map((comment) => (
                <Comment comment={comment} key={comment._id} />
            ))}
        </div>
    );
}

export default ListComments;
