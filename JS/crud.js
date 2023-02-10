function deleteEmp(e, id) {
  // e.preventDefault();
  $.ajax({
    url: "http://localhost:3000/employees/" + id,
    type: "DELETE",
    success: function (re) {
      console.log(re);
      $(".overlay").addClass("invisible");
      // $("#load").trigger("click");
    },
    catch: function (Error) {
      console.log(Error);
    },
  });
}
function SureDelete(id, name) {
  $(".confirm p").text(`Are you sure you want to delete ${name}`);
  $(".overlay").toggleClass("invisible");
  let button = document.createElement("button");
  $(button).text("Delete");
  button.onclick = function (e) {
    deleteEmp(e, id);
  };
  $("#sure").html(button);
}

function loadData(res) {
  $("#employees-table").html("");
  let tr = document.createElement("tr");
  for (let item in res[0]) {
    let th = document.createElement("th");
    $(th).text(item);
    $(tr).append(th);
  }
  let th = document.createElement("th");
  $(th).text("Edit");
  $(tr).append(th);
  th = document.createElement("th");
  $(th).text("Delete");
  $(tr).append(th);
  $("#employees-table").append(tr);
  $("#load").hide();
  for (let i = 0; i < res.length; i++) {
    tr = document.createElement("tr");
    for (let item in res[i]) {
      let td = document.createElement("td");
      $(td).text(res[i][item]);
      $(tr).append(td);
    }
    let td = `<td><a href=edit-employee.html?id=${res[i]["id"]}><i class="fa-solid fa-pen-to-square"></i></a></td>`;
    $(tr).append(td);

    let button = document.createElement("button");
    button.className = "delete";
    button.onclick = function () {
      SureDelete(res[i].id, res[i].Name);
    };
    $(button).append(`<i class="fa-solid fa-trash"></i>`);

    td = document.createElement("td");
    $(td).append(button);

    $(tr).append(td);
    $("#employees-table").append(tr);
  }
}
$(function () {
  $("#load").on("click", function () {
    $.ajax({
      type: "get",
      url: "http://localhost:3000/employees", //===>Requset===>URL Local
      success: function (res) {
        loadData(res);
      },
    });
  });

  // post data
  $("#submit").on("click", function () {
    //create object
    let newObject = {
      id: Number($("#idTxt").val()),
      Name: $("#nameTxt").val(),
      Age: Number($("#ageTxt").val()),
      salary: Number($("#salaryTxt").val()),
    };

    let validated = true;
    for (let i in newObject) {
      if (newObject[i] == "") {
        validated = false;
        break;
      }
    }
    if (validated) {
      //post ajax req
      $.ajax({
        url: "http://localhost:3000/employees",
        type: "post",
        data: newObject,
        success: function (res) {
          window.location.replace("home.html");
        },
        catch: function (Error) {
          console.log(Error);
        },
      }).fail(function ($xhr) {
        let data = $xhr.responseText;
        data = data.substring(7, data.indexOf("\n"));
        $("#error").text(data);
        $("#error").css({
          display: "block",
        });
        console.log(data);
      });
    } else {
      $("#error").css({
        display: "block",
      });
    }
  });
});
