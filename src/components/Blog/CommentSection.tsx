
import React, { useState } from 'react';
import { Comment } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/input';
import { ThumbsUp, MessageCircle, CornerDownRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface CommentSectionProps {
  comments: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments: initialComments }) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleLike = (commentId: string) => {
    setComments(prev => 
      prev.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 };
        }
        
        // Check if it's a reply in any comment
        if (comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map(reply => 
              reply.id === commentId ? { ...reply, likes: reply.likes + 1 } : reply
            )
          };
        }
        
        return comment;
      })
    );
    
    toast({
      description: "You liked a comment",
      duration: 1500,
    });
  };
  
  const handleToggleReply = (commentId: string) => {
    setReplyToId(replyToId === commentId ? null : commentId);
    setReplyText('');
  };
  
  const handleSubmitReply = (commentId: string) => {
    if (!replyText.trim()) {
      toast({
        title: "Empty reply",
        description: "Please enter some text for your reply",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newReply: Comment = {
        id: `reply-${Date.now()}`,
        content: replyText,
        author: {
          id: 'current-user',
          name: 'You',
          avatar: 'https://i.pravatar.cc/150?img=12'
        },
        publishedDate: new Date().toISOString(),
        likes: 0
      };
      
      setComments(prev => 
        prev.map(comment => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), newReply]
            };
          }
          return comment;
        })
      );
      
      setReplyText('');
      setReplyToId(null);
      setIsSubmitting(false);
      
      toast({
        title: "Reply added",
        description: "Your reply has been added successfully",
      });
    }, 1000);
  };
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      toast({
        title: "Empty comment",
        description: "Please enter some text for your comment",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const comment: Comment = {
        id: `comment-${Date.now()}`,
        content: newComment,
        author: {
          id: 'current-user',
          name: 'You',
          avatar: 'https://i.pravatar.cc/150?img=12'
        },
        publishedDate: new Date().toISOString(),
        likes: 0,
        replies: []
      };
      
      setComments(prev => [comment, ...prev]);
      setNewComment('');
      setIsSubmitting(false);
      
      toast({
        title: "Comment added",
        description: "Your comment has been added successfully",
      });
    }, 1000);
  };
  
  return (
    <section className="my-10 animate-fade-in">
      <h3 className="text-2xl font-playfair font-bold text-gray-900 dark:text-white mb-6">
        Comments ({comments.length})
      </h3>
      
      {/* New comment form */}
      <form onSubmit={handleSubmitComment} className="mb-10">
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-blog-purple focus:border-blog-purple dark:bg-gray-800"
          rows={3}
          disabled={isSubmitting}
        />
        <div className="flex justify-end mt-2">
          <Button 
            type="submit" 
            className="button-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </Button>
        </div>
      </form>
      
      {/* Comments list */}
      <div className="space-y-8">
        {comments.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-center py-4">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="animate-fade-in">
              <div className="flex space-x-4">
                <img 
                  src={comment.author.avatar} 
                  alt={comment.author.name} 
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {comment.author.name}
                      </h4>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        {new Date(comment.publishedDate).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {comment.content}
                    </p>
                  </div>
                  
                  <div className="flex items-center mt-2 space-x-4">
                    <button 
                      onClick={() => handleLike(comment.id)}
                      className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blog-purple dark:hover:text-blog-light-purple transition-colors text-sm"
                    >
                      <ThumbsUp size={14} className="mr-1" />
                      {comment.likes}
                    </button>
                    <button 
                      onClick={() => handleToggleReply(comment.id)}
                      className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blog-purple dark:hover:text-blog-light-purple transition-colors text-sm"
                    >
                      <MessageCircle size={14} className="mr-1" />
                      Reply
                    </button>
                  </div>
                  
                  {/* Reply form */}
                  {replyToId === comment.id && (
                    <div className="mt-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                      <Textarea
                        placeholder="Write a reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-blog-purple focus:border-blog-purple dark:bg-gray-800"
                        rows={2}
                        disabled={isSubmitting}
                      />
                      <div className="flex justify-end mt-2 space-x-2">
                        <Button 
                          variant="outline" 
                          onClick={() => setReplyToId(null)}
                          disabled={isSubmitting}
                        >
                          Cancel
                        </Button>
                        <Button 
                          onClick={() => handleSubmitReply(comment.id)}
                          className="button-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Posting...' : 'Post Reply'}
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 space-y-4">
                      {comment.replies.map(reply => (
                        <div key={reply.id} className="flex space-x-4 pl-6 border-l-2 border-gray-200 dark:border-gray-700 animate-fade-in">
                          <div className="flex-shrink-0">
                            <img 
                              src={reply.author.avatar} 
                              alt={reply.author.name} 
                              className="w-8 h-8 rounded-full"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                              <div className="flex justify-between mb-1">
                                <h5 className="font-medium text-gray-900 dark:text-white text-sm">
                                  {reply.author.name}
                                </h5>
                                <span className="text-gray-500 dark:text-gray-400 text-xs">
                                  {new Date(reply.publishedDate).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-gray-700 dark:text-gray-300 text-sm">
                                {reply.content}
                              </p>
                            </div>
                            <button 
                              onClick={() => handleLike(reply.id)}
                              className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blog-purple dark:hover:text-blog-light-purple transition-colors text-xs mt-1"
                            >
                              <ThumbsUp size={12} className="mr-1" />
                              {reply.likes}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CommentSection;
