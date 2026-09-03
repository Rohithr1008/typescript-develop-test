/* TaskBoard UI — talks to typed /api/* with Bearer token */

const TOKEN_KEY = "taskboard_token";

/** @typedef {{ id: string, title: string, status: 'todo'|'doing'|'done' }} Task */

function showError(el, msg) {
  el.textContent = msg;
  el.classList.toggle("show", Boolean(msg));
}

async function api(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(path, { ...options, headers });
  const body = await res.json().catch(() => ({ ok: false, error: "Bad JSON", code: "PARSE" }));
  return { status: res.status, body };
}

function setAuthed(session) {
  document.getElementById("loginView").style.display = "none";
  document.getElementById("boardView").style.display = "block";
  document.getElementById("whoBadge").textContent = session.displayName + " (@" + session.username + ")";
  document.getElementById("headerUser").hidden = false;
  document.getElementById("headerUser").textContent = session.displayName;
}

function setLoggedOut() {
  localStorage.removeItem(TOKEN_KEY);
  document.getElementById("loginView").style.display = "block";
  document.getElementById("boardView").style.display = "none";
  document.getElementById("headerUser").hidden = true;
}

/** @param {Task[]} tasks */
function renderTasks(tasks) {
  document.querySelectorAll(".col .list").forEach((list) => {
    list.innerHTML = "";
  });
  document.getElementById("emptyHint").style.display = tasks.length ? "none" : "block";

  for (const task of tasks) {
    const col = document.querySelector(`.col[data-status="${task.status}"] .list`);
    if (!col) continue;
    const card = document.createElement("article");
    card.className = `task status-${task.status}`;
    card.dataset.taskId = task.id;
    card.innerHTML = `
      <div class="title"></div>
      <div class="actions">
        <button type="button" data-act="todo" class="secondary">Todo</button>
        <button type="button" data-act="doing" class="secondary">Doing</button>
        <button type="button" data-act="done" class="secondary">Done</button>
        <button type="button" data-act="delete" class="danger">Delete</button>
      </div>`;
    card.querySelector(".title").textContent = task.title;
    card.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => onTaskAction(task.id, btn.getAttribute("data-act")));
    });
    col.appendChild(card);
  }
}

async function loadTasks() {
  const { status, body } = await api("/api/tasks");
  if (!body.ok) {
    if (status === 401) {
      setLoggedOut();
      return;
    }
    showError(document.getElementById("boardError"), body.error || "Failed to load");
    return;
  }
  showError(document.getElementById("boardError"), "");
  renderTasks(body.data);
}

async function onTaskAction(id, act) {
  if (act === "delete") {
    const { body } = await api(`/api/tasks/${id}`, { method: "DELETE" });
    if (!body.ok) {
      showError(document.getElementById("boardError"), body.error);
      return;
    }
  } else {
    const { body } = await api(`/api/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: act }),
    });
    if (!body.ok) {
      showError(document.getElementById("boardError"), body.error);
      return;
    }
  }
  await loadTasks();
}

document.getElementById("loginBtn").addEventListener("click", async () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const { body } = await api("/api/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  if (!body.ok) {
    showError(document.getElementById("loginError"), body.error || "Login failed");
    return;
  }
  showError(document.getElementById("loginError"), "");
  localStorage.setItem(TOKEN_KEY, body.data.token);
  setAuthed(body.data);
  await loadTasks();
});

document.getElementById("logoutBtn").addEventListener("click", async () => {
  await api("/api/logout", { method: "POST" });
  setLoggedOut();
});

document.getElementById("addBtn").addEventListener("click", async () => {
  const title = document.getElementById("newTitle").value.trim();
  if (!title) {
    showError(document.getElementById("boardError"), "Title is required");
    return;
  }
  const { body } = await api("/api/tasks", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
  if (!body.ok) {
    showError(document.getElementById("boardError"), body.error);
    return;
  }
  document.getElementById("newTitle").value = "";
  showError(document.getElementById("boardError"), "");
  await loadTasks();
});

document.getElementById("resetBtn").addEventListener("click", async () => {
  await api("/api/reset", { method: "POST" });
  // Session tokens wiped with seed — re-login path
  setLoggedOut();
  showError(document.getElementById("loginError"), "Seed restored — log in again.");
});

async function boot() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return;
  const { body } = await api("/api/me");
  if (!body.ok) {
    setLoggedOut();
    return;
  }
  setAuthed({
    displayName: body.data.displayName,
    username: body.data.username,
    token,
  });
  await loadTasks();
}

boot();
