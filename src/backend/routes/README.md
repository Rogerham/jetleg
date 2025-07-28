
# Routes Layer

Deze map bevat route definities die controllers koppelen aan HTTP endpoints.

## Structuur:
- Elk domein krijgt een eigen route file
- Routes definiëren HTTP methods en paths  
- Routes roepen de juiste controller methods aan

## Voorbeelden:
```typescript
// flight.routes.ts
export const flightRoutes = {
  '/api/flights/search': { method: 'POST', handler: flightController.handleFlightSearch },
  '/api/flights/:id': { method: 'GET', handler: flightController.handleGetFlightById }
};
```
