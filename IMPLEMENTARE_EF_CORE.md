# Save The Bite - implementare ASP.NET Core MVC + EF Core

Acest proiect extinde aplicatia MVC cu Entity Framework Core Code First, SQL Server LocalDB, repository pattern, servicii de business si trei module CRUD complete: categorii, retete si donatii alimentare.

## Structura si rolul fisierelor

### Configurare proiect

- `Save_the_Bite.csproj` - contine referintele NuGet pentru `Microsoft.EntityFrameworkCore.SqlServer`, `Microsoft.EntityFrameworkCore.Tools` si `Microsoft.EntityFrameworkCore.Design`.
- `appsettings.json` - contine connection string-ul `DefaultConnection` pentru SQL Server LocalDB: `SaveTheBiteDb`.
- `Program.cs` - configureaza MVC, logging Console/Debug, `ApplicationDbContext`, repository-urile si serviciile in Dependency Injection.
- `Views/_ViewImports.cshtml` - importa namespace-urile folosite in view-uri si activeaza Tag Helpers.
- `Views/Shared/_Layout.cshtml` - layout-ul Bootstrap global cu navigatie catre cele trei CRUD-uri.
- `Views/Home/Index.cshtml` - pagina principala cu linkuri spre modulele gestionate din baza de date.
- `wwwroot/css/site.css` - stilizare Bootstrap custom pentru layout, formulare, tabele si carduri.

### Data si migratii

- `Data/ApplicationDbContext.cs` - DbContext-ul aplicatiei; defineste `DbSet` pentru categorii, retete si donatii, relatiile dintre entitati, constrangerile si seed data.
- `Migrations/20260507021000_InitialCreate.cs` - migrarea initiala Code First; creeaza tabelele, cheile externe, indexurile si categoriile initiale.
- `Migrations/20260507021000_InitialCreate.Designer.cs` - modelul EF Core generat pentru migrarea initiala.
- `Migrations/ApplicationDbContextModelSnapshot.cs` - snapshot-ul modelului EF Core folosit pentru migratii viitoare.

### Modele

- `Models/FoodCategory.cs` - modelul pentru categorii de alimente; include validari si colectii de retete/donatii.
- `Models/Recipe.cs` - modelul pentru retete zero-waste; include validari, categorie, ingrediente, pasi, timp, portii si autor.
- `Models/DonationOffer.cs` - modelul pentru donatii alimentare; include validari, categorie, contact, adresa, data expirarii si regula ca data sa nu fie in trecut.
- `Models/DonationStatus.cs` - enum pentru statusul donatiei: noua, rezervata, livrata sau anulata.

### Repository pattern

- `Repositories/Interfaces/IFoodCategoryRepository.cs` - contractul de acces la date pentru categorii.
- `Repositories/Interfaces/IRecipeRepository.cs` - contractul de acces la date pentru retete.
- `Repositories/Interfaces/IDonationOfferRepository.cs` - contractul de acces la date pentru donatii.
- `Repositories/FoodCategoryRepository.cs` - implementarea CRUD pentru categorii folosind `ApplicationDbContext`.
- `Repositories/RecipeRepository.cs` - implementarea CRUD pentru retete si include categoria pentru afisare.
- `Repositories/DonationOfferRepository.cs` - implementarea CRUD pentru donatii si include categoria pentru afisare.

### Servicii de business

- `Services/Interfaces/IFoodCategoryService.cs` - contractul logicii de business pentru categorii.
- `Services/Interfaces/IRecipeService.cs` - contractul logicii de business pentru retete.
- `Services/Interfaces/IDonationOfferService.cs` - contractul logicii de business pentru donatii.
- `Services/FoodCategoryService.cs` - valideaza unicitatea numelui, normalizeaza textul si blocheaza stergerea categoriilor folosite.
- `Services/RecipeService.cs` - valideaza categoria selectata, normalizeaza campurile si gestioneaza datele de creare/actualizare.
- `Services/DonationOfferService.cs` - valideaza categoria, data expirarii si normalizeaza datele de contact.

### ViewModels

- `ViewModels/RecipeFormViewModel.cs` - transporta reteta si lista de categorii pentru formularele Create/Edit.
- `ViewModels/DonationOfferFormViewModel.cs` - transporta donatia si lista de categorii pentru formularele Create/Edit.

### Controllers

- `Controllers/FoodCategoriesController.cs` - CRUD complet pentru categorii; foloseste `IFoodCategoryService`.
- `Controllers/RecipesController.cs` - CRUD complet pentru retete; foloseste `IRecipeService` si `IFoodCategoryService`.
- `Controllers/DonationOffersController.cs` - CRUD complet pentru donatii; foloseste `IDonationOfferService` si `IFoodCategoryService`.

Controller-ele nu acceseaza direct `ApplicationDbContext`; accesul la baza de date este facut prin repository-uri, apelate doar din servicii.

### Views CRUD

- `Views/FoodCategories/Index.cshtml` - listeaza categoriile in tabel responsive.
- `Views/FoodCategories/Create.cshtml` - formular Bootstrap pentru creare categorie.
- `Views/FoodCategories/Edit.cshtml` - formular Bootstrap pentru editare categorie.
- `Views/FoodCategories/Details.cshtml` - pagina de detalii categorie.
- `Views/FoodCategories/Delete.cshtml` - confirmare stergere categorie.
- `Views/Recipes/Index.cshtml` - listeaza retetele in carduri Bootstrap, cu numele categoriei afisat.
- `Views/Recipes/Create.cshtml` - formular Bootstrap pentru creare reteta.
- `Views/Recipes/Edit.cshtml` - formular Bootstrap pentru editare reteta.
- `Views/Recipes/Details.cshtml` - pagina de detalii reteta.
- `Views/Recipes/Delete.cshtml` - confirmare stergere reteta.
- `Views/DonationOffers/Index.cshtml` - listeaza donatiile in tabel responsive, cu categorie si status.
- `Views/DonationOffers/Create.cshtml` - formular Bootstrap pentru creare donatie.
- `Views/DonationOffers/Edit.cshtml` - formular Bootstrap pentru editare donatie.
- `Views/DonationOffers/Details.cshtml` - pagina de detalii donatie.
- `Views/DonationOffers/Delete.cshtml` - confirmare stergere donatie.

## Pachete NuGet necesare

In Visual Studio 2022, instaleaza pachetele:

```powershell
Install-Package Microsoft.EntityFrameworkCore.SqlServer -Version 8.0.26
Install-Package Microsoft.EntityFrameworkCore.Tools -Version 8.0.26
Install-Package Microsoft.EntityFrameworkCore.Design -Version 8.0.26
```

Pachetele sunt deja adaugate in `.csproj`, deci Visual Studio le restaureaza automat la build.

## Comenzi Package Manager Console

Deschide `Tools > NuGet Package Manager > Package Manager Console` si selecteaza proiectul `Save_the_Bite`.

```powershell
Add-Migration InitialCreate
Update-Database
```

`Add-Migration InitialCreate` genereaza fisierele din folderul `Migrations`. In proiect exista deja migrarea initiala (`20260507021000_InitialCreate.cs`), deci ruleaza aceasta comanda doar daca regenerezi migrarea de la zero.

`Update-Database` aplica migrarea in SQL Server LocalDB si creeaza baza de date `SaveTheBiteDb`.

## Cum rulezi si testezi CRUD-ul

1. Deschide `Save_the_Bite.sln` in Visual Studio 2022.
2. Verifica in `appsettings.json` connection string-ul `DefaultConnection`.
3. Ruleaza `Update-Database` in Package Manager Console.
4. Porneste aplicatia cu `F5` sau `Ctrl+F5`.
5. Testeaza rutele:
   - `/FoodCategories` - creeaza, editeaza, vizualizeaza si sterge categorii.
   - `/Recipes` - creeaza, editeaza, vizualizeaza si sterge retete; formularul afiseaza numele categoriei, nu ID-ul.
   - `/DonationOffers` - creeaza, editeaza, vizualizeaza si sterge donatii; formularul afiseaza numele categoriei si statusurile.

Pentru validari, incearca sa trimiti formulare goale, un email invalid sau o data de expirare din trecut. Mesajele apar direct in formular.
