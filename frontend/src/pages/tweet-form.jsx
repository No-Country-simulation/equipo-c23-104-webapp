'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function TweetForm() {
  const [tweet, setTweet] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Tweet submitted:', tweet)
    setTweet('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="What's happening?"
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
        className="w-full"
      />
      <Button type="submit" disabled={tweet.length === 0}>
        Tweet
      </Button>
    </form>
  )
}
