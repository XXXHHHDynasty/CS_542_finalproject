$("form").on("submit", save_user_input)  // On submit start process

// Takes user input and sends it to backend
function save_user_input(event) {
    input = $("input").val();  // user input
    console.log(input);
    // $.ajax({
    //     type:"POST",
    //     url: "/data",
    //     data: JSON.stringify(input)
    // });

    const request = new XMLHttpRequest();  // POST
        request.open("POST", "/data")
        data = input
        request.send(data)


}

// Get data from backend and store in table
document.onload = $.getJSON('./data_front', function(data){
    let text = "<table border='1'>"
    for (let x in data) {
      text += "<tr><td>" + Object.values(data[x]) + "</td></tr>";
    }
    text += "</table>"    
    document.getElementById("demo").innerHTML = text;
  });