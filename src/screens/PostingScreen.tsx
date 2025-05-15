import React from 'react';
import { GameState } from '../types'; // If you need more from GameState
import { formatNumber } from '../utils/formatters';

interface PostingScreenProps {
  followers: number;
  followersPerClick: number;
  postsMade: number;
  onPost: () => void;
}

const PostingScreen: React.FC<PostingScreenProps> = ({ followers, followersPerClick, postsMade, onPost }) => {
  return (
    <div>
      <h2>Spread the "Truth"!</h2>
      <p>Current Followers: {formatNumber(followers)}</p>
      <p>Followers per Post: {formatNumber(followersPerClick)}</p>
      <p>Total Posts Made: {formatNumber(postsMade)}</p>
      <button onClick={onPost} style={{ padding: '20px', fontSize: '1.5em' }}>
        POST CONSPIRACY!
      </button>
      <p style={{marginTop: '20px', fontStyle: 'italic'}}>
        Tip: The more you post, the deeper down the rabbit hole you go... and the more "lucrative" opportunities arise.
      </p>
    </div>
  );
};
export default PostingScreen;