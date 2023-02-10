function loadData(id) {
  $.ajax({
    type: "get",
    url: "http://localhost:3000/employees/" + id, //===>Requset===>URL Local
    success: function (res) {
      $("#idTxt").val(res.id);
      $("#nameTxt").val(res.Name);
      $("#ageTxt").val(res.Age);
      $("#salaryTxt").val(res.salary);
    },
  });
}

$(function () {
  let id = location.search.split("=")[1];
  loadData(id);
  // put data
  $("#submit").on("click", function () {
    //crate object
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
        url: "http://localhost:3000/employees/" + id,
        type: "put",
        data: newObject,
        success: function (res) {
          window.location.replace("home.html");
        },
      });
    } else {
      $("#error").css({
        display: "block",
      });
    }
  });
});
