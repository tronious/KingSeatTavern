using System.ComponentModel.DataAnnotations;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Dev", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseCors("Dev");
}

app.UseHttpsRedirection();

app.MapPost("/api/band-inquiries", async (BandInquiryRequest req, IConfiguration config) =>
{
    // Honeypot: if filled, treat as success but do nothing.
    if (!string.IsNullOrWhiteSpace(req.Company))
    {
        return Results.Ok(new { ok = true });
    }

    var validationResults = new List<ValidationResult>();
    if (!Validator.TryValidateObject(req, new ValidationContext(req), validationResults, validateAllProperties: true))
    {
        return Results.BadRequest(new { error = "Validation failed", details = validationResults.Select(v => v.ErrorMessage) });
    }

    if (!string.IsNullOrWhiteSpace(req.BandWebsite) && !Uri.TryCreate(req.BandWebsite, UriKind.Absolute, out _))
    {
        return Results.BadRequest(new { error = "Band website must be a valid URL." });
    }

    var smtpHost = config["Email:Smtp:Host"];
    var smtpPortRaw = config["Email:Smtp:Port"];
    var smtpUser = config["Email:Smtp:User"];
    var smtpPass = config["Email:Smtp:Password"];
    var smtpFrom = config["Email:Smtp:From"];
    var smtpFromName = config["Email:Smtp:FromName"] ?? "King Seat Tavern Website";
    var smtpTo = config["Email:BandInquiries:To"] ?? "THEKINGSEATLLC@GMAIL.COM";

    if (string.IsNullOrWhiteSpace(smtpHost) ||
        string.IsNullOrWhiteSpace(smtpPortRaw) ||
        string.IsNullOrWhiteSpace(smtpUser) ||
        string.IsNullOrWhiteSpace(smtpPass) ||
        string.IsNullOrWhiteSpace(smtpFrom))
    {
        // Don't pretend this worked if email isn't configured.
        return Results.Problem(
            title: "Email is not configured",
            detail: "Set Email:Smtp:Host, Port, User, Password, and From in configuration.",
            statusCode: StatusCodes.Status501NotImplemented);
    }

    if (!int.TryParse(smtpPortRaw, out var smtpPort))
    {
        return Results.Problem(title: "Email configuration invalid", detail: "Email:Smtp:Port must be an integer.");
    }

    var message = new MimeMessage();
    message.From.Add(new MailboxAddress(smtpFromName, smtpFrom));
    message.To.Add(MailboxAddress.Parse(smtpTo));
    message.Subject = $"Band Inquiry: {req.BandName}";

    var bodyText =
$@"New band inquiry submitted from the website.

Band Name: {req.BandName}
Band Website: {req.BandWebsite ?? "(none)"}
Rate: {req.Rate}

Additional Notes:
{req.Notes ?? "(none)"}
";

    message.Body = new TextPart("plain") { Text = bodyText };

    using var client = new SmtpClient();
    // Many SMTP providers require TLS
    await client.ConnectAsync(smtpHost, smtpPort, SecureSocketOptions.Auto);
    await client.AuthenticateAsync(smtpUser, smtpPass);
    await client.SendAsync(message);
    await client.DisconnectAsync(true);

    return Results.Ok(new { ok = true });
})
.WithName("SubmitBandInquiry")
.WithOpenApi();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

sealed class BandInquiryRequest
{
    [Required]
    public string BandName { get; init; } = string.Empty;

    public string? BandWebsite { get; init; }

    [Required]
    public string Rate { get; init; } = string.Empty;

    public string? Notes { get; init; }

    // Honeypot field
    public string? Company { get; init; }
}
