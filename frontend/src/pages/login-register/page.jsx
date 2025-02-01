import { Tweet } from './components/tweet'
import { TweetForm } from './components/tweet-form'
import { UserProfile } from './components/user-profile'

const tweets = [
  { id: 1, author: 'John Doe', username: 'johndoe', content: 'Hello, Twitter!', likes: 5, retweets: 2, timestamp: '2m' },
  { id: 2, author: 'Jane Smith', username: 'janesmith', content: 'Just finished a great book!', likes: 10, retweets: 3, timestamp: '1h' },
  { id: 3, author: 'Bob Johnson', username: 'bobjohnson', content: 'Beautiful day for a walk!', likes: 7, retweets: 1, timestamp: '3h' },
]

export default function Home() {
  return (
    <div className="container mx-auto max-w-2xl">
      <header className="py-4 mb-4 border-b">
        <h1 className="text-2xl font-bold">Twitter Replica</h1>
      </header>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <TweetForm />
          <div className="space-y-4 mt-4">
            {tweets.map((tweet) => (
              <Tweet key={tweet.id} {...tweet} />
            ))}
          </div>
        </div>
        <div>
          <UserProfile />
        </div>
      </div>
    </div>
  )
}
