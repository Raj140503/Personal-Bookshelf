import { useState, useMemo } from "react";
import { BookCard } from "./BookCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  Grid3X3, 
  List,
  SortAsc,
  Filter
} from "lucide-react";
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

interface BookShelfProps {
  books: Book[];
  onStatusChange: (bookId: string, status: Book['status']) => void;
  onFavorite: (bookId: string) => void;
  favorites: string[];
}

type ViewMode = 'grid' | 'list';
type SortBy = 'title' | 'author' | 'rating' | 'year';

export function BookShelf({ books, onStatusChange, onFavorite, favorites }: BookShelfProps) {
  const [activeShelf, setActiveShelf] = useState<Book['status']>('reading');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortBy>('title');

  const shelves = [
    {
      id: 'reading' as const,
      label: 'Currently Reading',
      icon: BookOpen,
      color: 'text-green-600 bg-green-100',
      description: 'Books you are actively reading'
    },
    {
      id: 'want-to-read' as const,
      label: 'Want to Read',
      icon: Clock,
      color: 'text-blue-600 bg-blue-100',
      description: 'Books on your reading wishlist'
    },
    {
      id: 'finished' as const,
      label: 'Finished',
      icon: CheckCircle,
      color: 'text-purple-600 bg-purple-100',
      description: 'Books you have completed'
    }
  ];

  const filteredAndSortedBooks = useMemo(() => {
    const filtered = books.filter(book => book.status === activeShelf);
    
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'rating':
          return b.rating - a.rating;
        case 'year':
          return b.publishedYear - a.publishedYear;
        default:
          return 0;
      }
    });
  }, [books, activeShelf, sortBy]);

  const activeShelfInfo = shelves.find(shelf => shelf.id === activeShelf);

  const getShelfStats = (status: Book['status']) => {
    return books.filter(book => book.status === status).length;
  };

  return (
    <div className="space-y-6">
      {/* Shelf Navigation */}
      <div className="space-y-4">
        <h2 className="text-3xl font-serif font-bold text-foreground">
          My Personal Library
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {shelves.map((shelf) => {
            const count = getShelfStats(shelf.id);
            const Icon = shelf.icon;
            
            return (
              <Card
                key={shelf.id}
                className={cn(
                  "p-6 cursor-pointer transition-all duration-300 hover:shadow-book group bg-gradient-card",
                  activeShelf === shelf.id 
                    ? "ring-2 ring-primary shadow-book" 
                    : "hover:shadow-card"
                )}
                onClick={() => setActiveShelf(shelf.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={cn("p-3 rounded-lg", shelf.color)}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                      {shelf.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {shelf.description}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-lg font-semibold px-3 py-1">
                    {count}
                  </Badge>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Shelf Content */}
      {activeShelfInfo && (
        <div className="space-y-6">
          {/* Shelf Header */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className={cn("p-2 rounded-lg", activeShelfInfo.color)}>
                <activeShelfInfo.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-foreground">
                  {activeShelfInfo.label}
                </h3>
                <p className="text-muted-foreground">
                  {filteredAndSortedBooks.length} books
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {/* Sort */}
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className="text-sm rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="title">Sort by Title</option>
                <option value="author">Sort by Author</option>
                <option value="rating">Sort by Rating</option>
                <option value="year">Sort by Year</option>
              </select>

              {/* View Mode */}
              <div className="flex rounded-lg border border-input overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Books Grid/List */}
          {filteredAndSortedBooks.length > 0 ? (
            <div 
              className={cn(
                "animate-fade-in",
                viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                  : "space-y-4"
              )}
            >
              {filteredAndSortedBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onStatusChange={onStatusChange}
                  onFavorite={onFavorite}
                  isFavorite={favorites.includes(book.id)}
                />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center bg-gradient-card">
              <activeShelfInfo.icon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
                Your {activeShelfInfo.label.toLowerCase()} shelf is empty
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {activeShelf === 'reading' && "Start reading a book to see it here."}
                {activeShelf === 'want-to-read' && "Search for books and add them to your reading list."}
                {activeShelf === 'finished' && "Mark books as finished to see them here."}
              </p>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}