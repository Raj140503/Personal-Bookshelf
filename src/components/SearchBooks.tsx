import { useState, useEffect } from "react";
import { Search, Filter, Loader2, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SearchResult {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  subject?: string[];
  ratings_average?: number;
}

interface SearchBooksProps {
  onAddToShelf: (book: any) => void;
}

export function SearchBooks({ onAddToShelf }: SearchBooksProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchBooks = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&limit=20`
      );
      const data = await response.json();
      setResults(data.docs || []);
    } catch (error) {
      console.error("Error searching books:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (query) {
        searchBooks(query);
      } else {
        setResults([]);
        setHasSearched(false);
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [query]);

  const handleAddBook = (result: SearchResult) => {
    const book = {
      id: result.key,
      title: result.title,
      author: result.author_name?.[0] || "Unknown Author",
      cover: result.cover_i 
        ? `https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg`
        : "",
      rating: result.ratings_average || 0,
      pages: Math.floor(Math.random() * 400) + 100, // Random pages since API doesn't always provide
      publishedYear: result.first_publish_year || 2020,
      genre: result.subject?.[0] || "Fiction",
      status: 'want-to-read' as const,
    };
    
    onAddToShelf(book);
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="text-center space-y-4">
        <div className="relative">
          <h2 className="text-3xl font-serif font-bold text-foreground">
            Discover Your Next Great Read
          </h2>
          <p className="text-muted-foreground mt-2">
            Search millions of books and add them to your personal library
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          placeholder="Search for books, authors, or ISBN..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 pr-12 h-14 text-lg bg-card border-2 focus:border-primary/50 rounded-xl shadow-card"
        />
        {loading && (
          <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 animate-spin" />
        )}
      </div>

      {/* Search Results */}
      {hasSearched && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-serif font-semibold text-foreground">
              Search Results
              {results.length > 0 && (
                <span className="text-muted-foreground font-normal ml-2">
                  ({results.length} books found)
                </span>
              )}
            </h3>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="p-4 animate-pulse">
                  <div className="flex gap-4">
                    <div className="w-16 h-20 bg-muted rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                      <div className="h-3 bg-muted rounded w-1/4"></div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
              {results.map((result) => (
                <Card key={result.key} className="group hover:shadow-book transition-all duration-300 overflow-hidden bg-gradient-card">
                  <div className="p-4">
                    <div className="flex gap-4">
                      {/* Book Cover */}
                      <div className="w-16 h-20 flex-shrink-0 rounded overflow-hidden bg-gradient-to-br from-book-spine to-book-leather">
                        {result.cover_i ? (
                          <img
                            src={`https://covers.openlibrary.org/b/id/${result.cover_i}-S.jpg`}
                            alt={result.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-primary-foreground/70" />
                          </div>
                        )}
                      </div>

                      {/* Book Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-semibold text-sm leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                          {result.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                          {result.author_name?.[0] || "Unknown Author"}
                        </p>
                        
                        {result.first_publish_year && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Published: {result.first_publish_year}
                          </p>
                        )}

                        {result.subject && result.subject.length > 0 && (
                          <Badge variant="outline" className="text-xs mt-2">
                            {result.subject[0]}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Add Button */}
                    <Button
                      onClick={() => handleAddBook(result)}
                      className="w-full mt-4 bg-gradient-primary hover:opacity-90 transition-opacity"
                      size="sm"
                    >
                      Add to Library
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center bg-gradient-card">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
                No books found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or check for spelling errors
              </p>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}