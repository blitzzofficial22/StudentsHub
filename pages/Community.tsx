import React, { useState } from 'react';
import { UserProfile, Post } from '../types';
import { ThumbsUp, MessageSquare, Plus } from 'lucide-react';

const DUMMY_POSTS: Post[] = [
  {
    id: '1',
    authorId: 'u1',
    authorName: 'Sarah Jenkins',
    content: 'Can someone explain the difference between respiratory acidosis and alkalosis simply?',
    tags: ['Respiratory', 'Pathophysiology'],
    upvotes: 12,
    timestamp: Date.now() - 3600000,
    comments: []
  },
  {
    id: '2',
    authorId: 'u2',
    authorName: 'Mike Chen',
    content: 'Found a great mnemonic for cranial nerves: Oh Oh Oh To Touch And Feel Very Good Velvet Ah Heaven',
    tags: ['Anatomy', 'Tips'],
    upvotes: 45,
    timestamp: Date.now() - 86400000,
    comments: []
  }
];

const Community: React.FC<{ user: UserProfile }> = ({ user }) => {
  const [posts, setPosts] = useState<Post[]>(DUMMY_POSTS);
  const [newPostContent, setNewPostContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      authorId: user.uid,
      authorName: user.displayName || 'Anonymous',
      content: newPostContent,
      tags: ['General'],
      upvotes: 0,
      timestamp: Date.now(),
      comments: []
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Community Hub</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-700"
        >
          <Plus size={20} /> Ask Question
        </button>
      </div>

      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                  {post.authorName[0]}
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">{post.authorName}</p>
                  <p className="text-xs text-gray-500">{new Date(post.timestamp).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <p className="text-gray-800 mb-4">{post.content}</p>

            <div className="flex items-center gap-6 text-gray-500 text-sm">
              <button className="flex items-center gap-2 hover:text-brand-600">
                <ThumbsUp size={18} /> {post.upvotes}
              </button>
              <button className="flex items-center gap-2 hover:text-brand-600">
                <MessageSquare size={18} /> {post.comments.length} Answers
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">Post to Community</h3>
            <form onSubmit={handlePostSubmit}>
              <textarea 
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="What's your question?"
                className="w-full h-32 border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-brand-500 focus:outline-none resize-none"
              />
              <div className="flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;