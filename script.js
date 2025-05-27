const socket = new WebSocket(`ws://${location.host}/ws`);

const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
  mode: "python",
  lineNumbers: true
});

let isRemoteChange = false;

editor.on("change", (instance, changeObj) => {
  if (!isRemoteChange) {
    socket.send(instance.getValue());
  }
});

socket.onmessage = (event) => {
  isRemoteChange = true;
  editor.setValue(event.data);
  isRemoteChange = false;
};
