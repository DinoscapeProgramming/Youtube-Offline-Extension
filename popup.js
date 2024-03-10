document.addEventListener(
  "DOMContentLoaded",
  () => {
    let socket;
    try {
      socket = new WebSocket("ws://localhost:8080");
    } catch {};
    socket.addEventListener("open", () => {
      document.getElementById("button").addEventListener(
        "click",
        () => {
          (window.chrome || window.browser).tabs.getSelected(null, (tab) => {
            if (
              !tab.url.split("/")[3]?.startsWith("watch") &&
              !tab.url.split("/")[3]?.startsWith("shorts") &&
              !tab.url.split("/")[3]?.startsWith("playlist")
            ) return;
            if (socket.readyState === WebSocket.CLOSED) {
              try {
                socket = new WebSocket("ws://localhost:8080");
              } catch {};
              socket.addEventListener("open", () => {
                if (socket.readyState !== WebSocket.CLOSED) socket.send(tab.url);
              });
            } else {
              socket.send(tab.url);
            };
          });
        },
        false
      );
    });
  },
  false
);