import { Heart, MessageCircle, Repeat2 } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function Tweet({ author, username, content, likes, retweets, timestamp }) {
  return (
    <div className="border p-4 rounded-lg">
      <div className="flex items-center mb-2">
        <span className="font-bold">{author}</span>
        <span className="text-gray-500 ml-2">@{username}</span>
        <span className="text-gray-500 ml-2">· {timestamp}</span>
      </div>
      <p className="mb-4">{content}</p>
      <div className="flex space-x-4">
        <Button variant="ghost" size="sm">
          <MessageCircle className="w-4 h-4 mr-2" />
          Reply
        </Button>
        <Button variant="ghost" size="sm">
          <Repeat2 className="w-4 h-4 mr-2" />
          {retweets}
        </Button>
        <Button variant="ghost" size="sm">
          <Heart className="w-4 h-4 mr-2" />
          {likes}
        </Button>
      </div>
    </div>
  )
}
