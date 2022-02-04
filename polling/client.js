function PublishForm(form, url) {

  function sendMessage(message) {
    fetch(url, {
      method: 'POST',
      body: message
    });
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

// Receiving messages with polling
function SubscribePane(elem, url) {

  function showMessage(messages) {
    elem.innerHTML = "";
    messages.forEach(message => {
      const childMessageElement = document.createElement('div');
      childMessageElement.append(message)
      elem.append(childMessageElement);
    });
  }


  const poll = async (url, callbackFn, interval) => {

    const executePoll = async () => {
      const respnse = await fetch(url);
      const result = await respnse.json();
      return callbackFn(result);
    };
    setInterval(executePoll, interval);
  };

  poll(url, showMessage, 1000)

}


