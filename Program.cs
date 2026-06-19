using Microsoft.EntityFrameworkCore;
using Save_the_Bite.Data;
using Save_the_Bite.Repositories;
using Save_the_Bite.Repositories.Interfaces;
using Save_the_Bite.Services;
using Save_the_Bite.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Pastram logging-ul pe Console/Debug ca aplicatia sa ruleze fara drepturi speciale pentru Windows Event Log.
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

// Add services to the container.
builder.Services.AddControllersWithViews();

// EF Core primeste conexiunea LocalDB din appsettings.json.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Controller-ele folosesc servicii, iar serviciile folosesc repository-uri.
builder.Services.AddScoped<IFoodCategoryRepository, FoodCategoryRepository>();
builder.Services.AddScoped<IRecipeRepository, RecipeRepository>();
builder.Services.AddScoped<IDonationOfferRepository, DonationOfferRepository>();
builder.Services.AddScoped<IFoodCategoryService, FoodCategoryService>();
builder.Services.AddScoped<IRecipeService, RecipeService>();
builder.Services.AddScoped<IDonationOfferService, DonationOfferService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
