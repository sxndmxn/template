using Microsoft.AspNetCore.Mvc;
using Server.Controllers;

namespace Server.Tests;

public class AircraftSensorControllerTests
{
    private AircraftSensorController CreateController()
    {
        return new AircraftSensorController();
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
        Assert.IsType<ActionResult<IEnumerable<AircraftSensor>>>(result);
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        Assert.NotNull(okResult.Value);
    }

    [Fact]
    public void GetAll_ReturnsAllAircraftSensors()
    {
        // Arrange
        var controller = CreateController();

        // Act
        var result = controller.GetAll();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var sensors = Assert.IsAssignableFrom<IEnumerable<AircraftSensor>>(okResult.Value);
        Assert.NotEmpty(sensors);
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
        var sensors = Assert.IsAssignableFrom<IEnumerable<AircraftSensor>>(okResult.Value).ToList();
        
        for (int i = 0; i < sensors.Count - 1; i++)
        {
            Assert.True(sensors[i].Id <= sensors[i + 1].Id, "Sensors should be ordered by Id");
        }
    }

    #endregion

    #region GetById Tests

    [Fact]
    public void GetById_ReturnsOkResult_WhenSensorExists()
    {
        // Arrange
        var controller = CreateController();
        var existingId = 1;

        // Act
        var result = controller.GetById(existingId);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var sensor = Assert.IsType<AircraftSensor>(okResult.Value);
        Assert.Equal(existingId, sensor.Id);
    }

    [Fact]
    public void GetById_ReturnsNotFound_WhenSensorDoesNotExist()
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
    public void GetById_ReturnsCorrectSensor_ForValidIds(int id)
    {
        // Arrange
        var controller = CreateController();

        // Act
        var result = controller.GetById(id);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var sensor = Assert.IsType<AircraftSensor>(okResult.Value);
        Assert.Equal(id, sensor.Id);
    }

    #endregion

    #region Create Tests

    [Fact]
    public void Create_ReturnsCreatedAtAction_WithValidSensor()
    {
        // Arrange
        var controller = CreateController();
        var newSensor = new AircraftSensor
        {
            AircraftName = "F-14 Tomcat",
            Nation = "USA",
            BattleRating = 11.7m,
            RadarPresent = true,
            RadarType = "pulse_doppler"
        };

        // Act
        var result = controller.Create(newSensor);

        // Assert
        var createdResult = Assert.IsType<CreatedAtActionResult>(result.Result);
        Assert.Equal(nameof(AircraftSensorController.GetById), createdResult.ActionName);
        var returnedSensor = Assert.IsType<AircraftSensor>(createdResult.Value);
        Assert.True(returnedSensor.Id > 0);
        Assert.Equal(newSensor.AircraftName, returnedSensor.AircraftName);
        Assert.Equal(newSensor.Nation, returnedSensor.Nation);
    }

    [Fact]
    public void Create_AssignsNewId_WhenIdIsZero()
    {
        // Arrange
        var controller = CreateController();
        var newSensor = new AircraftSensor
        {
            Id = 0,
            AircraftName = "Tornado F.3",
            Nation = "Britain",
            BattleRating = 11.3m
        };

        // Act
        var result = controller.Create(newSensor);

        // Assert
        var createdResult = Assert.IsType<CreatedAtActionResult>(result.Result);
        var returnedSensor = Assert.IsType<AircraftSensor>(createdResult.Value);
        Assert.True(returnedSensor.Id > 0);
    }

    [Fact]
    public void Create_AssignsNewId_WhenIdAlreadyExists()
    {
        // Arrange
        var controller = CreateController();
        var newSensor = new AircraftSensor
        {
            Id = 1, // This ID already exists
            AircraftName = "J-10",
            Nation = "China",
            BattleRating = 12.0m
        };

        // Act
        var result = controller.Create(newSensor);

        // Assert
        var createdResult = Assert.IsType<CreatedAtActionResult>(result.Result);
        var returnedSensor = Assert.IsType<AircraftSensor>(createdResult.Value);
        Assert.NotEqual(1, returnedSensor.Id); // Should get a different ID
        Assert.True(returnedSensor.Id > 5); // Should be higher than existing IDs (1-5)
    }

    [Fact]
    public void Create_CreatedSensorCanBeRetrieved()
    {
        // Arrange
        var controller = CreateController();
        var newSensor = new AircraftSensor
        {
            AircraftName = "Gripen C",
            Nation = "Sweden",
            BattleRating = 12.3m,
            RadarPresent = true
        };

        // Act
        var createResult = controller.Create(newSensor);
        var createdResult = Assert.IsType<CreatedAtActionResult>(createResult.Result);
        var createdSensor = Assert.IsType<AircraftSensor>(createdResult.Value);

        var getResult = controller.GetById(createdSensor.Id);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(getResult.Result);
        var retrievedSensor = Assert.IsType<AircraftSensor>(okResult.Value);
        Assert.Equal(createdSensor.Id, retrievedSensor.Id);
        Assert.Equal(createdSensor.AircraftName, retrievedSensor.AircraftName);
    }

    #endregion

    #region Update Tests

    [Fact]
    public void Update_ReturnsOkResult_WhenSensorExistsAndIdsMatch()
    {
        // Arrange
        var controller = CreateController();
        var existingId = 1;
        var updatedSensor = new AircraftSensor
        {
            Id = existingId,
            AircraftName = "MiG-23MLD",
            Nation = "USSR",
            BattleRating = 11.7m
        };

        // Act
        var result = controller.Update(existingId, updatedSensor);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnedSensor = Assert.IsType<AircraftSensor>(okResult.Value);
        Assert.Equal(existingId, returnedSensor.Id);
        Assert.Equal(updatedSensor.AircraftName, returnedSensor.AircraftName);
    }

    [Fact]
    public void Update_ReturnsOkResult_WhenBodyIdIsZero()
    {
        // Arrange
        var controller = CreateController();
        var existingId = 1;
        var updatedSensor = new AircraftSensor
        {
            Id = 0, // Body ID is 0, should be allowed
            AircraftName = "Updated Name",
            Nation = "USSR",
            BattleRating = 11.5m
        };

        // Act
        var result = controller.Update(existingId, updatedSensor);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnedSensor = Assert.IsType<AircraftSensor>(okResult.Value);
        Assert.Equal(existingId, returnedSensor.Id);
    }

    [Fact]
    public void Update_ReturnsBadRequest_WhenIdsDoNotMatch()
    {
        // Arrange
        var controller = CreateController();
        var routeId = 1;
        var updatedSensor = new AircraftSensor
        {
            Id = 2, // Different from route ID
            AircraftName = "Test",
            Nation = "Test",
            BattleRating = 10.0m
        };

        // Act
        var result = controller.Update(routeId, updatedSensor);

        // Assert
        var objectResult = Assert.IsType<ObjectResult>(result.Result);
        Assert.Equal(400, objectResult.StatusCode);
    }

    [Fact]
    public void Update_ReturnsNotFound_WhenSensorDoesNotExist()
    {
        // Arrange
        var controller = CreateController();
        var nonExistentId = 99999;
        var updatedSensor = new AircraftSensor
        {
            Id = nonExistentId,
            AircraftName = "Test",
            Nation = "Test",
            BattleRating = 10.0m
        };

        // Act
        var result = controller.Update(nonExistentId, updatedSensor);

        // Assert
        var objectResult = Assert.IsType<ObjectResult>(result.Result);
        Assert.Equal(404, objectResult.StatusCode);
    }

    [Fact]
    public void Update_UpdatedSensorCanBeRetrieved()
    {
        // Arrange
        var controller = CreateController();
        var existingId = 2;
        var updatedSensor = new AircraftSensor
        {
            Id = existingId,
            AircraftName = "F-16C Block 50",
            Nation = "USA",
            BattleRating = 13.3m,
            RadarPresent = true
        };

        // Act
        controller.Update(existingId, updatedSensor);
        var getResult = controller.GetById(existingId);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(getResult.Result);
        var retrievedSensor = Assert.IsType<AircraftSensor>(okResult.Value);
        Assert.Equal(updatedSensor.AircraftName, retrievedSensor.AircraftName);
        Assert.Equal(updatedSensor.BattleRating, retrievedSensor.BattleRating);
    }

    #endregion

    #region Delete Tests

    [Fact]
    public void DeleteById_ReturnsNoContent_WhenSensorExists()
    {
        // Arrange
        var controller = CreateController();
        
        // First create a sensor to delete
        var newSensor = new AircraftSensor
        {
            AircraftName = "Test Aircraft",
            Nation = "Test",
            BattleRating = 10.0m
        };
        var createResult = controller.Create(newSensor);
        var createdResult = Assert.IsType<CreatedAtActionResult>(createResult.Result);
        var createdSensor = Assert.IsType<AircraftSensor>(createdResult.Value);

        // Act
        var deleteResult = controller.DeleteById(createdSensor.Id);

        // Assert
        Assert.IsType<NoContentResult>(deleteResult);
    }

    [Fact]
    public void DeleteById_ReturnsNotFound_WhenSensorDoesNotExist()
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
    public void DeleteById_DeletedSensorCannotBeRetrieved()
    {
        // Arrange
        var controller = CreateController();
        
        // First create a sensor to delete
        var newSensor = new AircraftSensor
        {
            AircraftName = "Test Aircraft",
            Nation = "Test",
            BattleRating = 10.0m
        };
        var createResult = controller.Create(newSensor);
        var createdResult = Assert.IsType<CreatedAtActionResult>(createResult.Result);
        var createdSensor = Assert.IsType<AircraftSensor>(createdResult.Value);

        // Act
        controller.DeleteById(createdSensor.Id);
        var getResult = controller.GetById(createdSensor.Id);

        // Assert
        var objectResult = Assert.IsType<ObjectResult>(getResult.Result);
        Assert.Equal(404, objectResult.StatusCode);
    }

    #endregion

    #region Integration/End-to-End Tests

    [Fact]
    public void CRUD_Operations_WorkTogether()
    {
        // Arrange
        var controller = CreateController();
        var newSensor = new AircraftSensor
        {
            AircraftName = "JAS 39C Gripen",
            Nation = "Sweden",
            BattleRating = 12.3m,
            RadarPresent = true,
            RadarType = "pulse_doppler"
        };

        // Act & Assert - Create
        var createResult = controller.Create(newSensor);
        var createdSensor = Assert.IsType<AircraftSensor>(
            Assert.IsType<CreatedAtActionResult>(createResult.Result).Value);
        Assert.True(createdSensor.Id > 0);

        // Act & Assert - Read
        var getResult = controller.GetById(createdSensor.Id);
        var retrievedSensor = Assert.IsType<AircraftSensor>(
            Assert.IsType<OkObjectResult>(getResult.Result).Value);
        Assert.Equal(createdSensor.Id, retrievedSensor.Id);

        // Act & Assert - Update
        retrievedSensor.BattleRating = 12.7m;
        retrievedSensor.AircraftName = "JAS 39C Gripen (Updated)";
        var updateResult = controller.Update(retrievedSensor.Id, retrievedSensor);
        var updatedSensor = Assert.IsType<AircraftSensor>(
            Assert.IsType<OkObjectResult>(updateResult.Result).Value);
        Assert.Equal(12.7m, updatedSensor.BattleRating);
        Assert.Equal("JAS 39C Gripen (Updated)", updatedSensor.AircraftName);

        // Act & Assert - Delete
        var deleteResult = controller.DeleteById(updatedSensor.Id);
        Assert.IsType<NoContentResult>(deleteResult);

        // Verify deletion
        var verifyDeleteResult = controller.GetById(updatedSensor.Id);
        var notFoundResult = Assert.IsType<ObjectResult>(verifyDeleteResult.Result);
        Assert.Equal(404, notFoundResult.StatusCode);
    }

    #endregion
}
