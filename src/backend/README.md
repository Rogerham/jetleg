
# Backend Architecture

Deze backend-architectuur volgt een gelaagde aanpak met duidelijke scheiding van verantwoordelijkheden:

## Mappenstructuur

```
src/backend/
├── controllers/     # HTTP request handlers en API endpoints
├── services/        # Business logica en core functionaliteit
├── repositories/    # Data access layer - Supabase queries
├── models/          # TypeScript interfaces en types
├── validators/      # Input validatie en data transformatie
├── utils/           # Herbruikbare utility functies
├── config/          # Configuratie en constanten
└── middleware/      # Request/response processing
```

## Principes

1. **Controllers**: Behandelen HTTP requests, valideren input, roepen services aan
2. **Services**: Bevatten business logica, orchestreren tussen repositories
3. **Repositories**: Directe database interactie via Supabase client
4. **Models**: TypeScript types en interfaces voor data structures
5. **Validators**: Input validatie en data transformatie
6. **Utils**: Herbruikbare functies zonder business logica

## Voorbeeldflow

```
Request → Controller → Validator → Service → Repository → Database
                                      ↓
Response ← Controller ← Service ← Repository ← Database
```
