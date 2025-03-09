
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, ThumbsUp, ThumbsDown, Reply } from 'lucide-react';
import { Comment, Author } from '@/data/mockData';

interface CommentSectionProps {
  comments: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments }) => {
  const [commentText, setCommentText] = useState('');
  const [expanded, setExpanded] = useState<string[]>([]);
  
  const toggleReply = (commentId: string) => {
    setExpanded(prev => 
      prev.includes(commentId) 
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId]
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be the logic to post the comment
    setCommentText('');
  };
  
  const CommentItem = ({ comment, level = 0 }: { comment: Comment, level?: number }) => {
    const [replyText, setReplyText] = useState('');
    const isExpanded = expanded.includes(comment.id);
    
    const handleReplySubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Here would be the logic to post the reply
      setReplyText('');
      toggleReply(comment.id);
    };
    
    return (
      <div className={`animate-fade-in mb-6 ${level > 0 ? 'ml-8 border-l-2 border-gray-200 dark:border-gray-700 pl-4' : ''}`}>
        <div className="flex space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
            <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {comment.author.name}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(comment.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {comment.content}
            </p>
            
            <div className="flex space-x-4 mb-3">
              <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blog-purple dark:hover:text-blog-light-purple transition-colors text-sm">
                <ThumbsUp size={14} className="mr-1" />
                {comment.likes}
              </button>
              <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blog-purple dark:hover:text-blog-light-purple transition-colors text-sm">
                <ThumbsDown size={14} className="mr-1" />
                {comment.dislikes}
              </button>
              <button 
                onClick={() => toggleReply(comment.id)}
                className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blog-purple dark:hover:text-blog-light-purple transition-colors text-sm"
              >
                <Reply size={14} className="mr-1" />
                Reply
              </button>
            </div>
            
            {isExpanded && (
              <form onSubmit={handleReplySubmit} className="mb-4 animate-fade-in">
                <Textarea
                  placeholder="Write a reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full mb-2 resize-none"
                  rows={3}
                />
                <div className="flex justify-end space-x-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => toggleReply(comment.id)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    size="sm"
                    disabled={!replyText.trim()}
                  >
                    Reply
                  </Button>
                </div>
              </form>
            )}
            
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-4">
                {comment.replies.map(reply => (
                  <CommentItem 
                    key={reply.id} 
                    comment={reply} 
                    level={level + 1} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <section className="my-12">
      <h2 className="text-2xl font-playfair font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <MessageCircle className="mr-2" />
        Comments ({comments.length})
      </h2>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <Textarea
          placeholder="Share your thoughts..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="w-full mb-2 resize-none"
          rows={4}
        />
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={!commentText.trim()}
          >
            Post Comment
          </Button>
        </div>
      </form>
      
      <div className="space-y-6">
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </section>
  );
};

export default CommentSection;
