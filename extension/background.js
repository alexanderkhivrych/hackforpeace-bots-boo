function extensionScript() {
  const hash = {};

  const styles = `
    display: inline;
    padding: 0 8px;
    background-color: red;
    margin: 8px;
    border-radius: 8px;
    color: white;
  `;

  const buttonStyles = `
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: none;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
    background-color: #9c0000;
    color: white;
    font-size: 16px;
    padding: 8px;
  `;

  const test_user = {
    cap: {
      english: 0.8995513244218455,
      universal: 0.8808312676897403,
    },
    display_scores: {
      english: {
        astroturf: 0.4,
        fake_follower: 3.9,
        financial: 0.6,
        other: 4.7,
        overall: 4.7,
        self_declared: 4.4,
        spammer: 1.8,
      },
      universal: {
        astroturf: 0.2,
        fake_follower: 3,
        financial: 0.1,
        other: 4.4,
        overall: 4.6,
        self_declared: 4.6,
        spammer: 2.5,
      },
    },
  };

  function fetchData(userName) {
    return new Promise((resolve) => {
      const item = JSON.parse(localStorage.getItem(`boobot_${userName}`) || null);
      console.log(`user ${userName} in localstorage eq ${JSON.stringify(item)}`);

      if (item) {
        resolve(item);
      } else if (!hash[userName]) {
        console.log(`fetch user ${userName}`);
        hash[userName] = fetch(`https://hackforpeace-bots-boo.vercel.app/api/check?usernames=${userName}`)
          .then((response) => response.json())
          .then((data) => {
            // data = [test_user];

            localStorage.setItem(
              `boobot_${userName}`,
              JSON.stringify({
                display_scores: {
                  universal: data[0].display_scores.universal,
                },
              })
            );
            resolve(data[0]);
            hash[userName] = null;
          });
      } else {
        hash[userName].then(resolve);
      }
    });
  }

  function getUsers() {
    setTimeout(() => {
      try {
        document.querySelectorAll('a[role="link"] span').forEach((item) => {
          const content = item.innerHTML;

          if (content && content[0] === "@" && !item.getAttribute("boo_bot")) {
            item.setAttribute("boo_bot", 1);
            item.innerHTML = content + " loading...";

            console.log(`detected user ${content}`);
            fetchData(content.substr(1)).then((user) => {
              if (user.display_scores.universal.overall > 2) {
                let label = "This is a bot!";
                let color = "red";
                if (user.display_scores.universal.overall < 3) {
                  label = "Most likely bot";
                  color = "#8e8e00";
                } else if (user.display_scores.universal.overall < 4) {
                  label = "Probably bot";
                  color = "#ab6f00";
                }

                item.innerHTML = content + `<div style="${styles}background-color:${color};">${label}</div>`;
                let parent = item.parentNode;
                for (let i = 0; i < 11; i++) {
                  parent = parent.parentNode;
                }

                let blurredElement = parent.children[1];
                blurredElement.style.filter = "blur(4px)";

                parent.innerHTML = parent.innerHTML + `<button style="${buttonStyles}">I want to see it</button>`;

                let buttonElement = parent.children[2];
                buttonElement.addEventListener(
                  "click",
                  (e) => {
                    e.stopPropagation();

                    buttonElement.parentNode.children[1].style.filter = "blur(0)";
                    buttonElement.style.display = "none";
                  },
                  true
                );
              } else {
                item.innerHTML = content;
              }
            });
          }
        });
      } catch (err) {
        item.setAttribute("boo_bot", "");
        item.innerHTML = content;

        console.log(err);
      } finally {
        getUsers();
      }
    }, 500);
  }

  getUsers();
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == "complete") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: extensionScript,
    });
  }
});
