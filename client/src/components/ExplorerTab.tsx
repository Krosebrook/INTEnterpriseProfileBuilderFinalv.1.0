import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PlatformCard } from "./PlatformCard";
import { platforms } from "@/lib/platformData";
import { Search, X, Filter, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExplorerTabProps {
  selectedPlatforms: string[];
  onToggleSelect: (id: string) => void;
}

const categories = ["All", "Foundation", "Specialized", "Enterprise", "Developer", "Productivity"];
const tiers = ["All", "Tier 1", "Tier 2", "Tier 3"];

export function ExplorerTab({ selectedPlatforms, onToggleSelect }: ExplorerTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTier, setActiveTier] = useState("All");

  const filteredPlatforms = useMemo(() => {
    return platforms.filter((platform) => {
      const matchesSearch = 
        platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        platform.verdict.toLowerCase().includes(searchQuery.toLowerCase()) ||
        platform.targetUsers.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeCategory === "All" || platform.category === activeCategory;
      const matchesTier = activeTier === "All" || platform.priority === activeTier;

      return matchesSearch && matchesCategory && matchesTier;
    });
  }, [searchQuery, activeCategory, activeTier]);

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
    setActiveTier("All");
  };

  const hasActiveFilters = searchQuery || activeCategory !== "All" || activeTier !== "All";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="relative max-w-2xl mx-auto w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search platforms by name, use case, or target users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 h-12 text-base rounded-xl"
            data-testid="input-search"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
              onClick={() => setSearchQuery("")}
              data-testid="button-clear-search"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Category:</span>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  className="cursor-pointer hover-elevate transition-all"
                  onClick={() => setActiveCategory(category)}
                  data-testid={`filter-category-${category.toLowerCase().replace(" ", "-")}`}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <LayoutGrid className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Priority:</span>
            <div className="flex flex-wrap gap-1.5">
              {tiers.map((tier) => (
                <Badge
                  key={tier}
                  variant={activeTier === tier ? "default" : "outline"}
                  className="cursor-pointer hover-elevate transition-all"
                  onClick={() => setActiveTier(tier)}
                  data-testid={`filter-tier-${tier.toLowerCase().replace(" ", "-")}`}
                >
                  {tier}
                </Badge>
              ))}
            </div>
          </div>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground"
              data-testid="button-clear-filters"
            >
              <X className="w-4 h-4 mr-1" />
              Clear filters
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filteredPlatforms.length}</span> of{" "}
          <span className="font-semibold text-foreground">{platforms.length}</span> platforms
        </p>
        {selectedPlatforms.length > 0 && (
          <Badge variant="secondary" className="font-mono">
            {selectedPlatforms.length}/4 selected for comparison
          </Badge>
        )}
      </div>

      {filteredPlatforms.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No platforms found</h3>
          <p className="text-muted-foreground max-w-md">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <Button variant="outline" onClick={clearFilters} className="mt-4" data-testid="button-reset-filters">
            Reset all filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlatforms.map((platform) => (
            <PlatformCard
              key={platform.id}
              platform={platform}
              isSelected={selectedPlatforms.includes(platform.id)}
              onToggleSelect={onToggleSelect}
              maxSelectionsReached={selectedPlatforms.length >= 4}
            />
          ))}
        </div>
      )}
    </div>
  );
}
