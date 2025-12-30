using Microsoft.AspNetCore.Mvc;
using Server.Controllers;

namespace Server.Tests;

public class WeatherForecastControllerTests
{
    private WeatherForecastController CreateController()
    {
        return new WeatherForecastController();
    }

    #region GetAll Tests

    [Fact]
    public void GetAll_ReturnsOkResult()
    {
        // Arrange
        var controller = CreateController();

        // Act
        var result = controller.GetAll();

        // Assert
        Assert.IsType<ActionResult<IEnumerable<WeatherForecast>>>(result);
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        Assert.NotNull(okResult.Value);
    }

    [Fact]
    public void GetAll_ReturnsAllForecasts()
    {
        // Arrange
        var controller = CreateController();

        // Act
        var result = controller.GetAll();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var forecasts = Assert.IsAssignableFrom<IEnumerable<WeatherForecast>>(okResult.Value);
        Assert.NotEmpty(forecasts);
    }

    [Fact]
    public void GetAll_ReturnsOrderedById()
    {
        // Arrange
        var controller = CreateController();

        // Act
        var result = controller.GetAll();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var forecasts = Assert.IsAssignableFrom<IEnumerable<WeatherForecast>>(okResult.Value).ToList();
        
        for (int i = 0; i < forecasts.Count - 1; i++)
        {
            Assert.True(forecasts[i].Id <= forecasts[i + 1].Id, "Forecasts should be ordered by Id");
        }
    }

    #endregion

    #region GetById Tests

    [Fact]
    public void GetById_ReturnsOkResult_WhenForecastExists()
    {
        // Arrange
        var controller = CreateController();
        var existingId = 1;

        // Act
        var result = controller.GetById(existingId);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var forecast = Assert.IsType<WeatherForecast>(okResult.Value);
        Assert.Equal(existingId, forecast.Id);
    }

    [Fact]
    public void GetById_ReturnsNotFound_WhenForecastDoesNotExist()
    {
        // Arrange
        var controller = CreateController();
        var nonExistentId = 99999;

        // Act
        var result = controller.GetById(nonExistentId);

        // Assert
        var objectResult = Assert.IsType<ObjectResult>(result.Result);
        Assert.Equal(404, objectResult.StatusCode);
    }

    [Theory]
    [InlineData(1)]
    [InlineData(2)]
    [InlineData(3)]
    public void GetById_ReturnsCorrectForecast_ForValidIds(int id)
    {
        // Arrange
        var controller = CreateController();

        // Act
        var result = controller.GetById(id);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var forecast = Assert.IsType<WeatherForecast>(okResult.Value);
        Assert.Equal(id, forecast.Id);
    }

    #endregion

    #region Create Tests

    [Fact]
    public void Create_ReturnsCreatedAtAction_WithValidForecast()
    {
        // Arrange
        var controller = CreateController();
        var newForecast = new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(10)),
            TemperatureC = 22,
            Summary = "Pleasant"
        };

        // Act
        var result = controller.Create(newForecast);

        // Assert
        var createdResult = Assert.IsType<CreatedAtActionResult>(result.Result);
        Assert.Equal(nameof(WeatherForecastController.GetById), createdResult.ActionName);
        var returnedForecast = Assert.IsType<WeatherForecast>(createdResult.Value);
        Assert.True(returnedForecast.Id > 0);
        Assert.Equal(newForecast.TemperatureC, returnedForecast.TemperatureC);
        Assert.Equal(newForecast.Summary, returnedForecast.Summary);
    }

    [Fact]
    public void Create_AssignsNewId_WhenIdIsZero()
    {
        // Arrange
        var controller = CreateController();
        var newForecast = new WeatherForecast
        {
            Id = 0,
            Date = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(10)),
            TemperatureC = 22,
            Summary = "Pleasant"
        };

        // Act
        var result = controller.Create(newForecast);

        // Assert
        var createdResult = Assert.IsType<CreatedAtActionResult>(result.Result);
        var returnedForecast = Assert.IsType<WeatherForecast>(createdResult.Value);
        Assert.True(returnedForecast.Id > 0);
    }

    [Fact]
    public void Create_AssignsNewId_WhenIdAlreadyExists()
    {
        // Arrange
        var controller = CreateController();
        var newForecast = new WeatherForecast
        {
            Id = 1, // This ID already exists
            Date = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(10)),
            TemperatureC = 22,
            Summary = "Pleasant"
        };

        // Act
        var result = controller.Create(newForecast);

        // Assert
        var createdResult = Assert.IsType<CreatedAtActionResult>(result.Result);
        var returnedForecast = Assert.IsType<WeatherForecast>(createdResult.Value);
        Assert.NotEqual(1, returnedForecast.Id); // Should get a different ID
        Assert.True(returnedForecast.Id > 5); // Should be higher than existing IDs (1-5)
    }

    [Fact]
    public void Create_CreatedForecastCanBeRetrieved()
    {
        // Arrange
        var controller = CreateController();
        var newForecast = new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(10)),
            TemperatureC = 22,
            Summary = "Pleasant"
        };

        // Act
        var createResult = controller.Create(newForecast);
        var createdResult = Assert.IsType<CreatedAtActionResult>(createResult.Result);
        var createdForecast = Assert.IsType<WeatherForecast>(createdResult.Value);

        var getResult = controller.GetById(createdForecast.Id);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(getResult.Result);
        var retrievedForecast = Assert.IsType<WeatherForecast>(okResult.Value);
        Assert.Equal(createdForecast.Id, retrievedForecast.Id);
        Assert.Equal(createdForecast.TemperatureC, retrievedForecast.TemperatureC);
        Assert.Equal(createdForecast.Summary, retrievedForecast.Summary);
    }

    #endregion

    #region Update Tests

    [Fact]
    public void Update_ReturnsOkResult_WhenForecastExistsAndIdsMatch()
    {
        // Arrange
        var controller = CreateController();
        var existingId = 1;
        var updatedForecast = new WeatherForecast
        {
            Id = existingId,
            Date = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(20)),
            TemperatureC = 28,
            Summary = "Very Warm"
        };

        // Act
        var result = controller.Update(existingId, updatedForecast);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnedForecast = Assert.IsType<WeatherForecast>(okResult.Value);
        Assert.Equal(existingId, returnedForecast.Id);
        Assert.Equal(updatedForecast.TemperatureC, returnedForecast.TemperatureC);
        Assert.Equal(updatedForecast.Summary, returnedForecast.Summary);
    }

    [Fact]
    public void Update_ReturnsOkResult_WhenBodyIdIsZero()
    {
        // Arrange
        var controller = CreateController();
        var existingId = 1;
        var updatedForecast = new WeatherForecast
        {
            Id = 0, // Body ID is 0, should be allowed
            Date = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(20)),
            TemperatureC = 28,
            Summary = "Very Warm"
        };

        // Act
        var result = controller.Update(existingId, updatedForecast);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnedForecast = Assert.IsType<WeatherForecast>(okResult.Value);
        Assert.Equal(existingId, returnedForecast.Id);
    }

    [Fact]
    public void Update_ReturnsBadRequest_WhenIdsDoNotMatch()
    {
        // Arrange
        var controller = CreateController();
        var routeId = 1;
        var updatedForecast = new WeatherForecast
        {
            Id = 2, // Different from route ID
            Date = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(20)),
            TemperatureC = 28,
            Summary = "Very Warm"
        };

        // Act
        var result = controller.Update(routeId, updatedForecast);

        // Assert
        var objectResult = Assert.IsType<ObjectResult>(result.Result);
        Assert.Equal(400, objectResult.StatusCode);
    }

    [Fact]
    public void Update_ReturnsNotFound_WhenForecastDoesNotExist()
    {
        // Arrange
        var controller = CreateController();
        var nonExistentId = 99999;
        var updatedForecast = new WeatherForecast
        {
            Id = nonExistentId,
            Date = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(20)),
            TemperatureC = 28,
            Summary = "Very Warm"
        };

        // Act
        var result = controller.Update(nonExistentId, updatedForecast);

        // Assert
        var objectResult = Assert.IsType<ObjectResult>(result.Result);
        Assert.Equal(404, objectResult.StatusCode);
    }

    [Fact]
    public void Update_UpdatedForecastCanBeRetrieved()
    {
        // Arrange
        var controller = CreateController();
        var existingId = 2;
        var updatedForecast = new WeatherForecast
        {
            Id = existingId,
            Date = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(20)),
            TemperatureC = 15,
            Summary = "Cool"
        };

        // Act
        controller.Update(existingId, updatedForecast);
        var getResult = controller.GetById(existingId);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(getResult.Result);
        var retrievedForecast = Assert.IsType<WeatherForecast>(okResult.Value);
        Assert.Equal(updatedForecast.TemperatureC, retrievedForecast.TemperatureC);
        Assert.Equal(updatedForecast.Summary, retrievedForecast.Summary);
    }

    #endregion

    #region Delete Tests

    [Fact]
    public void DeleteById_ReturnsNoContent_WhenForecastExists()
    {
        // Arrange
        var controller = CreateController();
        
        // First create a forecast to delete
        var newForecast = new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(15)),
            TemperatureC = 20,
            Summary = "Mild"
        };
        var createResult = controller.Create(newForecast);
        var createdResult = Assert.IsType<CreatedAtActionResult>(createResult.Result);
        var createdForecast = Assert.IsType<WeatherForecast>(createdResult.Value);

        // Act
        var deleteResult = controller.DeleteById(createdForecast.Id);

        // Assert
        Assert.IsType<NoContentResult>(deleteResult);
    }

    [Fact]
    public void DeleteById_ReturnsNotFound_WhenForecastDoesNotExist()
    {
        // Arrange
        var controller = CreateController();
        var nonExistentId = 99999;

        // Act
        var result = controller.DeleteById(nonExistentId);

        // Assert
        var objectResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(404, objectResult.StatusCode);
    }

    [Fact]
    public void DeleteById_DeletedForecastCannotBeRetrieved()
    {
        // Arrange
        var controller = CreateController();
        
        // First create a forecast to delete
        var newForecast = new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(15)),
            TemperatureC = 20,
            Summary = "Mild"
        };
        var createResult = controller.Create(newForecast);
        var createdResult = Assert.IsType<CreatedAtActionResult>(createResult.Result);
        var createdForecast = Assert.IsType<WeatherForecast>(createdResult.Value);

        // Act
        controller.DeleteById(createdForecast.Id);
        var getResult = controller.GetById(createdForecast.Id);

        // Assert
        var objectResult = Assert.IsType<ObjectResult>(getResult.Result);
        Assert.Equal(404, objectResult.StatusCode);
    }

    [Fact]
    public void DeleteById_OnlyDeletesSpecifiedForecast()
    {
        // Arrange
        var controller = CreateController();
        
        // Create two forecasts
        var forecast1 = new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(10)),
            TemperatureC = 20,
            Summary = "Mild"
        };
        var forecast2 = new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(11)),
            TemperatureC = 25,
            Summary = "Warm"
        };
        
        var createResult1 = controller.Create(forecast1);
        var createdForecast1 = Assert.IsType<WeatherForecast>(
            Assert.IsType<CreatedAtActionResult>(createResult1.Result).Value);
        
        var createResult2 = controller.Create(forecast2);
        var createdForecast2 = Assert.IsType<WeatherForecast>(
            Assert.IsType<CreatedAtActionResult>(createResult2.Result).Value);

        // Act - Delete only the first forecast
        controller.DeleteById(createdForecast1.Id);

        // Assert - First should be deleted
        var getResult1 = controller.GetById(createdForecast1.Id);
        var objectResult1 = Assert.IsType<ObjectResult>(getResult1.Result);
        Assert.Equal(404, objectResult1.StatusCode);

        // Assert - Second should still exist
        var getResult2 = controller.GetById(createdForecast2.Id);
        var okResult2 = Assert.IsType<OkObjectResult>(getResult2.Result);
        Assert.NotNull(okResult2.Value);
    }

    #endregion

    #region Integration/End-to-End Tests

    [Fact]
    public void CRUD_Operations_WorkTogether()
    {
        // Arrange
        var controller = CreateController();
        var newForecast = new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(30)),
            TemperatureC = 18,
            Summary = "Chilly"
        };

        // Act & Assert - Create
        var createResult = controller.Create(newForecast);
        var createdForecast = Assert.IsType<WeatherForecast>(
            Assert.IsType<CreatedAtActionResult>(createResult.Result).Value);
        Assert.True(createdForecast.Id > 0);

        // Act & Assert - Read
        var getResult = controller.GetById(createdForecast.Id);
        var retrievedForecast = Assert.IsType<WeatherForecast>(
            Assert.IsType<OkObjectResult>(getResult.Result).Value);
        Assert.Equal(createdForecast.Id, retrievedForecast.Id);

        // Act & Assert - Update
        retrievedForecast.TemperatureC = 25;
        retrievedForecast.Summary = "Warm";
        var updateResult = controller.Update(retrievedForecast.Id, retrievedForecast);
        var updatedForecast = Assert.IsType<WeatherForecast>(
            Assert.IsType<OkObjectResult>(updateResult.Result).Value);
        Assert.Equal(25, updatedForecast.TemperatureC);
        Assert.Equal("Warm", updatedForecast.Summary);

        // Act & Assert - Delete
        var deleteResult = controller.DeleteById(updatedForecast.Id);
        Assert.IsType<NoContentResult>(deleteResult);

        // Verify deletion
        var verifyDeleteResult = controller.GetById(updatedForecast.Id);
        var notFoundResult = Assert.IsType<ObjectResult>(verifyDeleteResult.Result);
        Assert.Equal(404, notFoundResult.StatusCode);
    }

    #endregion
}
