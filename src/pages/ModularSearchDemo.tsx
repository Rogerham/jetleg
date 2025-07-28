
// Demonstratie pagina die de nieuwe modulaire backend architectuur showcaset
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, Plane, Clock, Users, Euro } from 'lucide-react';
import { useModularFlightSearch } from '@/hooks/useModularFlightSearch';
import { FlightSearchParams, FlightFilters, FlightSortOptions } from '@/backend/models/flight.model';

export default function ModularSearchDemo() {
  // State voor search parameters (Controller laag)
  const [searchParams, setSearchParams] = useState<FlightSearchParams>({
    from: '',
    to: '',
    date: '',
    passengers: '1'
  });

  // State voor filters (Validator laag)
  const [filters, setFilters] = useState<FlightFilters>({
    minPrice: undefined,
    maxPrice: undefined,
    jetType: '',
    operator: ''
  });

  // State voor sorting (Service laag)
  const [sortOptions, setSortOptions] = useState<FlightSortOptions>({
    field: 'departure_time',
    direction: 'asc'
  });

  // Hook gebruikt Controller → Service → Repository → Database flow
  const { data: searchResult, isLoading, error } = useModularFlightSearch(
    searchParams,
    filters,
    sortOptions,
    !!searchParams.from || !!searchParams.to
  );

  const handleSearch = () => {
    console.log('Search triggered with modular architecture');
    // De query wordt automatisch heruitgevoerd door React Query
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Modulaire Backend Architectuur Demo</h1>
        <p className="text-muted-foreground">
          Deze pagina demonstreert de nieuwe gelaagde backend structuur met 
          Controllers → Services → Repositories → Database flow
        </p>
      </div>

      {/* Architecture Info */}
      <Card className="mb-6 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="h-5 w-5" />
            Backend Architectuur Flow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm">
            <Badge variant="outline">Controller</Badge>
            <span>→</span>
            <Badge variant="outline">Validator</Badge>
            <span>→</span>
            <Badge variant="outline">Service</Badge>
            <span>→</span>
            <Badge variant="outline">Repository</Badge>
            <span>→</span>
            <Badge variant="outline">Database</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Elke laag heeft een specifieke verantwoordelijkheid en is volledig gescheiden van de anderen
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search Parameters (Controller laag) */}
        <Card>
          <CardHeader>
            <CardTitle>Zoekparameters</CardTitle>
            <CardDescription>Controller laag - Request handling</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="from">Van</Label>
              <Input
                id="from"
                placeholder="Amsterdam (AMS)"
                value={searchParams.from}
                onChange={(e) => setSearchParams(prev => ({ ...prev, from: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="to">Naar</Label>
              <Input
                id="to"
                placeholder="Parijs (CDG)"
                value={searchParams.to}
                onChange={(e) => setSearchParams(prev => ({ ...prev, to: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="passengers">Passagiers</Label>
              <Select 
                value={searchParams.passengers} 
                onValueChange={(value) => setSearchParams(prev => ({ ...prev, passengers: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6,7,8].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Filters (Validator laag) */}
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Validator laag - Input validatie</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="minPrice">Min prijs (€)</Label>
              <Input
                id="minPrice"
                type="number"
                placeholder="500"
                value={filters.minPrice || ''}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  minPrice: e.target.value ? Number(e.target.value) : undefined 
                }))}
              />
            </div>
            <div>
              <Label htmlFor="maxPrice">Max prijs (€)</Label>
              <Input
                id="maxPrice"
                type="number"
                placeholder="5000"
                value={filters.maxPrice || ''}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  maxPrice: e.target.value ? Number(e.target.value) : undefined 
                }))}
              />
            </div>
            <div>
              <Label htmlFor="operator">Operator</Label>
              <Input
                id="operator"
                placeholder="NetJets"
                value={filters.operator || ''}
                onChange={(e) => setFilters(prev => ({ ...prev, operator: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Sorting (Service laag) */}
        <Card>
          <CardHeader>
            <CardTitle>Sortering</CardTitle>
            <CardDescription>Service laag - Business logica</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="sortField">Sorteer op</Label>
              <Select 
                value={sortOptions.field} 
                onValueChange={(value: any) => setSortOptions(prev => ({ ...prev, field: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="departure_time">Vertrektijd</SelectItem>
                  <SelectItem value="price_per_seat">Prijs</SelectItem>
                  <SelectItem value="flight_duration">Vliegduur</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="sortDirection">Richting</Label>
              <Select 
                value={sortOptions.direction} 
                onValueChange={(value: any) => setSortOptions(prev => ({ ...prev, direction: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Oplopend</SelectItem>
                  <SelectItem value="desc">Aflopend</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSearch} className="w-full">
              Zoeken
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Zoekresultaten</CardTitle>
          <CardDescription>Repository laag - Database resultaten</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Zoeken via modulaire backend...</span>
            </div>
          )}

          {error && (
            <div className="text-red-600">
              Fout: {error instanceof Error ? error.message : 'Onbekende fout'}
            </div>
          )}

          {searchResult && (
            <div className="space-y-4">
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>Totaal beschikbaar: {searchResult.totalCount}</span>
                <span>Na filters: {searchResult.filteredCount}</span>
              </div>
              
              <div className="grid gap-4">
                {searchResult.flights.map((flight) => (
                  <div key={flight.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-semibold">
                          {flight.departure_airport} → {flight.arrival_airport}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {flight.operator}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg flex items-center gap-1">
                          <Euro className="h-4 w-4" />
                          {flight.price_per_seat}
                        </div>
                        <div className="text-sm text-muted-foreground">per persoon</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {flight.flight_duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {flight.available_seats} beschikbaar
                      </div>
                      {flight.jets && (
                        <div>{flight.jets.brand} {flight.jets.model}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Architecture Benefits */}
      <Card className="mt-6 bg-green-50">
        <CardHeader>
          <CardTitle>Voordelen van deze Architectuur</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li><strong>Scheiding van verantwoordelijkheden:</strong> Elke laag heeft een duidelijke rol</li>
            <li><strong>Testbaarheid:</strong> Elke laag kan apart getest worden</li>
            <li><strong>Onderhoudbaarheid:</strong> Wijzigingen zijn geïsoleerd binnen hun laag</li>
            <li><strong>Herbruikbaarheid:</strong> Services en repositories kunnen worden hergebruikt</li>
            <li><strong>Schaalbaarheid:</strong> Nieuwe functies volgen hetzelfde patroon</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
