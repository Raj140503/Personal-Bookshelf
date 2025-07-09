import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, BookOpen, User, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  rating: number;
  pages: number;
  publishedYear: number;
  genre: string;
  status: 'want-to-read' | 'reading' | 'finished';
  progress?: number;
}

interface BookCardProps {
  book: Book;
  onStatusChange: (bookId: string, status: Book['status']) => void;
  onFavorite: (bookId: string) => void;
  isFavorite?: boolean;
}

export function BookCard({ book, onStatusChange, onFavorite, isFavorite = false }: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status: Book['status']) => {
    switch (status) {
      case 'want-to-read': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'reading': return 'bg-green-100 text-green-800 border-green-200';
      case 'finished': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: Book['status']) => {
    switch (status) {
      case 'want-to-read': return 'Want to Read';
      case 'reading': return 'Reading';
      case 'finished': return 'Finished';
      default: return status;
    }
  };

  return (
    <Card 
      className={cn(
        "group relative overflow-hidden bg-gradient-card shadow-card hover:shadow-book transition-all duration-300 cursor-pointer",
        isHovered && "animate-book-hover"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Book Cover */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-book-spine to-book-leather rounded-t-lg">
        {book.cover ? (
          <img 
            src={book.cover} 
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-book-spine to-book-leather flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-primary-foreground/70" />
          </div>
        )}
        
        {/* Progress Bar for Currently Reading */}
        {book.status === 'reading' && book.progress && (
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/20 backdrop-blur-sm">
            <div 
              className="h-full bg-reading-progress transition-all duration-500"
              style={{ width: `${book.progress}%` }}
            />
          </div>
        )}

        {/* Favorite Button */}
        <Button
          size="sm"
          variant="ghost"
          className={cn(
            "absolute top-2 right-2 h-8 w-8 p-0 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white",
            "opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onFavorite(book.id);
          }}
        >
          <Heart className={cn("h-4 w-4", isFavorite ? "fill-red-500 text-red-500" : "text-gray-600")} />
        </Button>

        {/* Status Badge */}
        <Badge 
          className={cn(
            "absolute top-2 left-2 text-xs font-medium border",
            getStatusColor(book.status)
          )}
        >
          {getStatusText(book.status)}
        </Badge>
      </div>

      {/* Book Details */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-serif font-semibold text-lg leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors">
          {book.title}
        </h3>

        {/* Author */}
        <p className="text-muted-foreground text-sm flex items-center gap-1">
          <User className="w-3 h-3" />
          {book.author}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i}
              className={cn(
                "w-4 h-4",
                i < Math.floor(book.rating) 
                  ? "fill-yellow-400 text-yellow-400" 
                  : "text-gray-300"
              )}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-1">
            {book.rating.toFixed(1)}
          </span>
        </div>

        {/* Book Info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            {book.pages} pages
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {book.publishedYear}
          </span>
        </div>

        {/* Genre */}
        <Badge variant="outline" className="text-xs">
          {book.genre}
        </Badge>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <select 
            value={book.status}
            onChange={(e) => onStatusChange(book.id, e.target.value as Book['status'])}
            className="flex-1 text-xs rounded-md border border-input bg-background px-2 py-1 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            onClick={(e) => e.stopPropagation()}
          >
            <option value="want-to-read">Want to Read</option>
            <option value="reading">Currently Reading</option>
            <option value="finished">Finished</option>
          </select>
        </div>
      </div>
    </Card>
  );
}