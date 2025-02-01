import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function UserProfile() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-bold">John Doe</h2>
            <p className="text-gray-500">@johndoe</p>
          </div>
        </div>
        <div className="mt-4">
          <p><span className="font-bold">250</span> Following</p>
          <p><span className="font-bold">1.2K</span> Followers</p>
        </div>
      </CardContent>
    </Card>
  )
}
