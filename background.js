let socket;
try {
  socket = new WebSocket("ws://localhost:8080");
} catch {};

(window.chrome || window.browser).contextMenus.create({
  id: "downloadVideo",
  title: "YouTube Offline",
  contexts: ["all"],
});

socket.addEventListener("open", () => {
  (window.chrome || window.browser).contextMenus.onClicked.addListener(({ menuItemId }) => {
    if (menuItemId === "downloadVideo") {
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
    };
  });
  (window.chrome || window.browser).commands.onCommand.addListener((command) => {
    if (command === "downloadVideoCommand") {
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
    };
  });
});