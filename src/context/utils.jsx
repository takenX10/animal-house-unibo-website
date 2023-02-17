

const SERVER_URL = process.env.NODE_ENV === "development" ? "http://localhost:8000" : "";
// import ip from 'ip'
// const SERVER_URL = "http://192.168.107.31:8000"
// let SERVER_URL = "http://localhost:8000"

export function isEqualPath(path, test) {
  if (test.includes(":")) {
    // remove first / 
    test = test.substring(1);
    path = path.substring(1);
    // check if first part is equal
    let subtest = test.replace(test.substring(test.indexOf("/")), "")
    let subpath = path.replace(path.substring(path.indexOf("/")), "")
    return subpath == subtest
  }
  return path == test
}

async function check_login() {
  let res = await fetch(`${SERVER_URL}/backoffice/is_logged_in`, { method: "POST", credentials: 'include' });
  res = await res.json();
  return res.success;
}

async function get_my_id() {
  let res = await fetch(`${SERVER_URL}/backoffice/get_my_id`, { credentials: 'include' });
  res = await res.json();
  return res.id;
}

function raw_logout() {
  document.cookie = "AUTHSESSION=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
function logout(ctxDispatch) {
  raw_logout();
  ctxDispatch({ type: 'USER_SIGNOUT' });
}

async function save_score(score, scoreboard) {
  try {
    let data = {
      score: score,
      leaderboard: scoreboard
    };
    if (await check_login()) {
      let res = await fetch(`${SERVER_URL}/backoffice/insert_leaderboard`, {
        method: "PUT",
        credentials: "include",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      res = await res.json();
      if (!res.success) {
        alert(res.message);
      } else {
        // alert("Scoreboard updated");
      }
    } else {
      alert("Not logged in, so the score can't be saved!");
    }
  } catch (e) {
    alert(e);
  }
}

async function deletePost(id) {
  try {
    let res = await fetch(`${SERVER_URL}/backoffice/delete_post`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id })
    });
    res = await res.json();
    if (!res.success) {
      alert("Can't delete post");
    }
  } catch (e) {
    alert(e);
  }
}

async function isAdmin() {
  try {
    let res = await fetch(`${SERVER_URL}/api/backoffice/is_admin`, { method: "POST", credentials: "include" });
    res = await res.json();
    return res.success;
  } catch (e) {
    // alert(e);
    console.log(e);
    return false;
  }
}


function getDayLabel(epoch) {
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let d = new Date(epoch);
  return `${days[d.getDay()]} ${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
}
function getHourLabel(epoch) {
  let d = new Date(epoch);
  return `${d.getHours()}:${d.getSeconds()}`
}

export { SERVER_URL, getDayLabel, getHourLabel, check_login, get_my_id, raw_logout, logout, deletePost, save_score, isAdmin };
