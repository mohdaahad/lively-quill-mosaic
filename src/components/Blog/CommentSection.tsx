
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Heart, Reply } from 'lucide-react';
import { Comment as MockDataComment } from '@/data/mockData';

interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  publishedDate: string;
  likes: number;
  replies?: Comment[];
}

interface CommentSectionProps {
  comments: MockDataComment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments }) => {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const { toast } = useToast();
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      toast({
        description: "Comment posted successfully!",
        duration: 1500,
      });
      setNewComment('');
    }
  };
  
  const handleSubmitReply = (commentId: string) => {
    if (replyContent.trim()) {
      toast({
        description: "Reply posted successfully!",
        duration: 1500,
      });
      setReplyContent('');
      setReplyingTo(null);
    }
  };
  
  // Map MockDataComment to the internal Comment format for rendering
  const mapComment = (comment: MockDataComment): Comment => ({
    id: comment.id,
    content: comment.content,
    author: comment.author,
    publishedDate: comment.publishedDate,
    likes: comment.likes,
    replies: comment.replies ? comment.replies.map(mapComment) : undefined
  });
  
  const mappedComments = comments.map(mapComment);
  
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-playfair font-bold text-gray-900 dark:text-white mb-6">
        Comments ({comments.length})
      </h2>
      
      <form onSubmit={handleSubmitComment} className="mb-8">
        <Textarea 
          placeholder="Write a comment..." 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-4"
        />
        <Button type="submit" disabled={!newComment.trim()}>
          Post Comment
        </Button>
      </form>
      
      <div className="space-y-6">
        {mappedComments.map((comment) => (
          <div key={comment.id} className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {comment.author.name}
                  </h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(comment.publishedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {comment.content}
                </p>
                
                <div className="flex items-center space-x-4">
                  <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blog-purple dark:hover:text-blog-light-purple transition-colors">
                    <Heart size={16} className="mr-1" />
                    {comment.likes}
                  </button>
                  
                  <button 
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blog-purple dark:hover:text-blog-light-purple transition-colors"
                  >
                    <Reply size={16} className="mr-1" />
                    Reply
                  </button>
                </div>
                
                {replyingTo === comment.id && (
                  <div className="mt-4">
                    <Textarea 
                      placeholder={`Reply to ${comment.author.name}...`}
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      className="mb-2"
                    />
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleSubmitReply(comment.id)}
                        disabled={!replyContent.trim()}
                      >
                        Post Reply
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => setReplyingTo(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
                
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 ml-6 space-y-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                          <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <div className="flex items-center mb-1">
                            <h5 className="font-medium text-gray-900 dark:text-white mr-2">
                              {reply.author.name}
                            </h5>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(reply.publishedDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-300">
                            {reply.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommentSection;
