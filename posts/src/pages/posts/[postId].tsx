import { useParams } from 'react-router-dom';

const PostId = () => {
	const { postId } = useParams();

	return <div>{`POST ID: ${postId}`}</div>;
};

export default PostId;
