'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Paperclip, MessageCircle } from "lucide-react"

export interface TrelloCardProps {
  title: string
  description?: string
  labels?: Array<{ text: string; color: string }>
  dueDate?: string
  attachments?: number
  comments?: number
  assignee?: {
    name: string
    avatar: string
  }
}

export default function TrelloCardComponent({
  title,
  description,
  labels = [],
  dueDate,
  attachments = 0,
  comments = 0,
  assignee,
}: TrelloCardProps) {
  return (
    <Card className="w-full max-w-[300px] shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="p-4">
        <div className="flex flex-wrap gap-1 mb-2">
          {labels.map((label, index) => (
            <Badge
              key={index}
              variant="secondary"
              className={`${label.color} text-white text-xs font-normal`}
            >
              {label.text}
            </Badge>
          ))}
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {description && <p className="text-sm text-gray-600 mb-2">{description}</p>}
        {dueDate && (
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Due {dueDate}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {attachments > 0 && (
            <div className="flex items-center text-gray-600">
              <Paperclip className="h-4 w-4 mr-1" />
              <span className="text-xs">{attachments}</span>
            </div>
          )}
          {comments > 0 && (
            <div className="flex items-center text-gray-600">
              <MessageCircle className="h-4 w-4 mr-1" />
              <span className="text-xs">{comments}</span>
            </div>
          )}
        </div>
        {assignee && (
          <Avatar className="h-6 w-6">
            <AvatarImage src={assignee.avatar} alt={assignee.name} />
            <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
          </Avatar>
        )}
      </CardFooter>
    </Card>
  )
}