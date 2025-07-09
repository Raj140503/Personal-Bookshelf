import { useState, useEffect } from "react";
import { BookShelf } from "@/components/BookShelf";
import { SearchBooks } from "@/components/SearchBooks";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Search, 
  Library, 
  Heart,
  TrendingUp,
  Calendar,
  Star,
  CheckCircle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

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

const Index = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("library");

  // Sample books to show the design
  useEffect(() => {
    const sampleBooks: Book[] = [
      {
        id: "1",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        cover: "https://covers.openlibrary.org/b/id/8225261-M.jpg",
        rating: 4.2,
        pages: 180,
        publishedYear: 1925,
        genre: "Classic Literature",
        status: "reading",
        progress: 65
      },
      {
        id: "2",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        cover: "https://covers.openlibrary.org/b/id/8226691-M.jpg",
        rating: 4.5,
        pages: 324,
        publishedYear: 1960,
        genre: "Classic Literature",
        status: "finished"
      },
      {
        id: "3",
        title: "1984",
        author: "George Orwell",
        cover: "https://covers.openlibrary.org/b/id/8221016-M.jpg",
        rating: 4.4,
        pages: 328,
        publishedYear: 1949,
        genre: "Dystopian Fiction",
        status: "want-to-read"
      },
      {
        id: "4",
        title: "Pride and Prejudice",
        author: "Jane Austen",
        cover: "https://covers.openlibrary.org/b/id/8134945-M.jpg",
        rating: 4.3,
        pages: 432,
        publishedYear: 1813,
        genre: "Romance",
        status: "reading",
        progress: 30
      }
    ];
    
    setBooks(sampleBooks);
  }, []);

  const handleAddToShelf = (newBook: Book) => {
    const exists = books.find(book => book.id === newBook.id);
    if (exists) {
      toast({
        title: "Book already in library",
        description: "This book is already in your personal library.",
      });
      return;
    }

    setBooks(prev => [...prev, newBook]);
    toast({
      title: "Book added to library",
      description: `"${newBook.title}" has been added to your Want to Read shelf.`,
    });
  };

  const handleStatusChange = (bookId: string, newStatus: Book['status']) => {
    setBooks(prev => 
      prev.map(book => 
        book.id === bookId 
          ? { ...book, status: newStatus, progress: newStatus === 'finished' ? 100 : book.progress }
          : book
      )
    );
    
    const book = books.find(b => b.id === bookId);
    if (book) {
      toast({
        title: "Book status updated",
        description: `"${book.title}" moved to ${newStatus.replace('-', ' ')}.`,
      });
    }
  };

  const handleFavorite = (bookId: string) => {
    setFavorites(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const getLibraryStats = () => {
    const reading = books.filter(book => book.status === 'reading').length;
    const finished = books.filter(book => book.status === 'finished').length;
    const wantToRead = books.filter(book => book.status === 'want-to-read').length;
    const totalPages = books
      .filter(book => book.status === 'finished')
      .reduce((sum, book) => sum + book.pages, 0);
    
    return { reading, finished, wantToRead, totalPages };
  };

  const stats = getLibraryStats();

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-primary rounded-xl shadow-book">
              <Library className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              Personal Bookshelf
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Organize your reading journey, discover new books, and track your literary adventures
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center bg-gradient-card shadow-card hover:shadow-book transition-shadow">
            <BookOpen className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{stats.reading}</div>
            <div className="text-sm text-muted-foreground">Currently Reading</div>
          </Card>
          <Card className="p-4 text-center bg-gradient-card shadow-card hover:shadow-book transition-shadow">
            <CheckCircle className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{stats.finished}</div>
            <div className="text-sm text-muted-foreground">Books Finished</div>
          </Card>
          <Card className="p-4 text-center bg-gradient-card shadow-card hover:shadow-book transition-shadow">
            <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{stats.wantToRead}</div>
            <div className="text-sm text-muted-foreground">Want to Read</div>
          </Card>
          <Card className="p-4 text-center bg-gradient-card shadow-card hover:shadow-book transition-shadow">
            <TrendingUp className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{stats.totalPages.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Pages Read</div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto bg-card border shadow-card">
            <TabsTrigger 
              value="library" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
            >
              <Library className="w-4 h-4" />
              My Library
            </TabsTrigger>
            <TabsTrigger 
              value="search" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
            >
              <Search className="w-4 h-4" />
              Discover Books
            </TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="animate-fade-in">
            <BookShelf
              books={books}
              onStatusChange={handleStatusChange}
              onFavorite={handleFavorite}
              favorites={favorites}
            />
          </TabsContent>

          <TabsContent value="search" className="animate-fade-in">
            <SearchBooks onAddToShelf={handleAddToShelf} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;