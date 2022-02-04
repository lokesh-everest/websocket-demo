const socket = io("http://localhost:3000");

socket.emit("connection", {
  id: socket.id
});

function PublishForm(form, url) {
  function sendMessage(message) {
    socket.emit(url, message)
  }

  form.onsubmit = function () {
    let message = form.message.value;
    if (message) {
      form.message.value = '';
      sendMessage(message);
    }
    return false;
  };
}

function showMessage(message) {
  let messageElem = document.createElement('div');
  let elem = document.getElementById('subscribe')
  console.log(message);
  messageElem.append(message);
  elem.append(messageElem);
}

socket.on("receive", (data) => {
  showMessage(data);
})